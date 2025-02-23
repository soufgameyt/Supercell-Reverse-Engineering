const Core = {
	init() {
		Libg.init();
		ArxanKiller.init();
		HostPatcher.init();
		CryptoPatcher.init();
	}
};

const HostPatcher = {
	init() {
		Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
			onEnter(args) {
				if (args[0].readUtf8String() == "game.brawlstarsgame.com") {
					args[0].writeUtf8String("127.0.0.1"); // SET YOUR IP HERE
					args[1].writeUtf8String("9339"); // SET YOUR PORT HERE
				}
			}
		});
		
		Armceptor.replace(Libg.offset(0x5D364), [0x39, 0x15, 0x00, 0xE3]);
		Armceptor.replace(Libg.offset(0x5D368), [0xE4, 0x20, 0xA0, 0xE3]);
	}
}

const malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
const free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);

const Libg = {
	init() {
		let module = Process.getModuleByName('libg.so');
		Libg.begin = module.base;
		Libg.size = module.size;
		Libg.end = Libg.begin.add(Libg.size);
		
		const LOGIC_RANDOM_CTOR = Libg.offset(0x1CB6B8);
		const LOGIC_RANDOM_RAND = Libg.offset(0x6A42D0);
		
		const fLogicRandomCtor = new NativeFunction(LOGIC_RANDOM_CTOR, 'void', ['pointer', 'int']);
		const fLogicRandomRand = new NativeFunction(LOGIC_RANDOM_RAND, 'int', ['pointer', 'int']);
		
		Libg.LogicRandom = {
			new(seed) {
				let a = malloc(16);
				fLogicRandomCtor(a, seed);
				return a;
			},
			rand(instance, a2) {
				return fLogicRandomRand(instance, a2);
			}
		};
	},
	offset(off) {
		return Libg.begin.add(off);
	}
};

class LogicRandom {
	constructor(randomseed) {
		this.instance = Libg.LogicRandom.new(randomseed);
	}
	
	rand(maxValue) {
		return Libg.LogicRandom.rand(this.instance, maxValue);
	}
	
	destruct() {
		free(this.instance);
	}
}

const KEY_VERSION = 14;
const RANDOM_SHIFT = 12;

const CryptoPatcher = {
	init() {
		const time = new NativeFunction(Module.findExportByName('libc.so', 'time'), 'int', ['int']);
		const srand48 = new NativeFunction(Module.findExportByName('libc.so', 'srand48'), 'void', ['int']);
		const lrand48 = new NativeFunction(Module.findExportByName('libc.so', 'lrand48'), 'uint64', []);
		srand48(time(0));
		CryptoPatcher.keyseed = lrand48() % 2147483647;

		Interceptor.attach(Libg.offset(0x6374B8), {
			onEnter(args) {
				args[0].add(80).writeInt(3); // protocol (3 (true))
				args[0].add(84).writeInt(KEY_VERSION); // key version
				args[0].add(92).writeInt(CryptoPatcher.keyseed);
			}
		});
		
		Interceptor.replace(Libg.offset(0x667050), new NativeCallback(function(sk) {
			var random = new LogicRandom(CryptoPatcher.keyseed);
			
			var c = 0;
			for (var i = 0; i < RANDOM_SHIFT; i++) {
				c = random.rand(256);
			}
			
			for (var i = 0; i < 32; i++) {
				var k = random.rand(256) ^ c;
				sk.add(i).writeU8(k);
			}
			
			random.destruct();
		}, 'void', ['pointer']));
		
		Armceptor.replace(Libg.offset(0x1FA7FC), [0x03, 0x10, 0x81, 0xE2]); // nextNonce to +3
	}
}

const ArxanKiller = {
	init() {
		Armceptor.replace(Libg.offset(0x4851FC), [0xA6, 0x0F, 0x00, 0xEA]); // g_createGameInstance
		Armceptor.replace(Libg.offset(0x35BE60), [0xF2, 0x03, 0x00, 0xEA]); // TcpSocket::create
		Armceptor.replace(Libg.offset(0x3A2C18), [0x32, 0x04, 0x00, 0xEA]); // LoginMessage::encode
		Armceptor.replace(Libg.offset(0x3E48D8), [0xB5, 0x04, 0x00, 0xEA]); // InputSystem::update
		Armceptor.replace(Libg.offset(0x49A658), [0x16, 0x05, 0x00, 0xEA]); // CombatHUD::ultiButtonActivated
		Armceptor.replace(Libg.offset(0x1E9AD8), [0x00, 0xF0, 0x20, 0xE3]); // Messaging::onReceive - snprintf("%s/%s/stat")
	}
};

const Armceptor = {
	nop: function(addr) {
		Armceptor.replace(addr, [0x00, 0xF0, 0x20, 0xE3]);
	},
	replace: function(address, newInsn) {
		Memory.protect(address, newInsn.length, 'rwx');
		address.writeByteArray(newInsn);
		Memory.protect(address, newInsn.length, 'rx');
	},
    ret: function(addr) {
		Armceptor.replace(addr, [0x1E, 0xFF, 0x2F, 0xE1]);
	},
	jumpOffset: function(addr, target) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putBImm(target);
			writer.flush();
		});
	},
	jumpout: function(addr, target) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putBranchAddress(target);
			writer.flush();
		});
	}
}

function strPtr(str) {
	var a = malloc(str.length + 1);
	a.writeUtf8String(str);
	a.add(str.length).writeU8(0);
	return a;
}

rpc.exports.init = Core.init;