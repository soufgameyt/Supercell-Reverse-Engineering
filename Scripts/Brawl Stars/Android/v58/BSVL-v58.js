// Script Made By : @soufgamev2 - Channel : https://t.me/shadowbrawl
// Please Credit me if you use or share this
const Libg = {
	init() {
		Libg.module = Process.findModuleByName("libg.so");  
		Libg.size = Libg.module.size;
		Libg.begin = Libg.module.base;
		Libg.end = ptr(Libg.begin.toInt32() + Libg.size);
        Logger.Print("[DEBUG] Libg.module: " + Libg.module);
        Logger.Print("[DEBUG] Libg.size: " + Libg.size);
        Logger.Print("[DEBUG] Libg.begin: " + Libg.begin);
        Logger.Print("[DEBUG] Libg.end: " + Libg.end);
        
	},
	offset(value) {
		return Libg.begin.add(value);
	}
}

const ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
const inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);

const Logger = {
    Print(text) {
        console.warn(text)
    }
}

const Armceptor = {
    replace(ptr, arr) {
		Memory.protect(ptr, arr.length, "rwx");
		Memory.writeByteArray(ptr, arr);
		Memory.protect(ptr, arr.length, "rx");
	},
    replaceStr(ptr, value) {
        Memory.protect(ptr, value.length, "rwx");
        Memory.writeUtf8String(ptr, value);
        Memory.protect(ptr, value.length, "rx");
    },
	jumpout(addr, target) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			writer.putBranchAddress(target);
			writer.flush();
		});
	}
}

const Connect = {
	init(host, port) {
        Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
            onEnter(args) {
                if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                    Memory.writeU16(args[1].add(2), ntohs(port));
                    Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String(host)));
                }
            }
        });
    }
}

const CryptoPatcher = {
    init() {
        Armceptor.replace(Libg.offset(0x97C93C), [0x00, 0x00, 0x50, 0xE1]); // Messaging::encryptAndWrite
        Armceptor.replace(Libg.offset(0x97C188), [0x05, 0x00, 0xA0, 0xE3]); // State
        Armceptor.replace(Libg.offset(0x97B720), [0x1E, 0xFF, 0x2F, 0xE1]); // PepperCrypto::secretbox_open
        Armceptor.replace(Libg.offset(0x97C0B4), [0x02, 0x80, 0xA0, 0xE1]); // Messaging::sendPepperAuthentification
    }
}

const Misc = {
    init() {
        /*Interceptor.attach(Libg.offset(0x0), { // HomePage::StartGame , lost the offset and the lib ...
            onEnter(args) {
                args[3] = ptr(3)
                args[8] = ptr(1);
            }
        })*/
    }
}

rpc.exports.init = function() {
    Logger.Print("[*][Libg::Init] Started!")
    Libg.init();
    Logger.Print("[*][Connect::Init]")
    Connect.init("127.0.0.1", 9339);
    Logger.Print("[*][CryptoPatcher::Init]")
    CryptoPatcher.init();
    Logger.Print("[*][Misc::Init]")
    Misc.init();
    Logger.Print("[*][Libg::Init] Finished!")
}