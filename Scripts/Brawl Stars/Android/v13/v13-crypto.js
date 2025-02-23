const HOST = "130.61.188.127";
const PORT = "9339";
const DEBUG_MENU_CTOR = 0x380614;
const STAGE_ADD_CHILD = 0x3F5BB8;
const STAGE_ADDRESS = 0x96C2F4;
const ADD_FILE = 0x24F5C0;

var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);

const hook = Interceptor.attach;
var IsDebugMenuOpened = 0;

function createStringPtr(message) {
    var charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr
}

const Libg = {
	init() {
		this.base = Module.findBaseAddress('libg.so');
		
		this.NativeFont = {
			addr: {}
		};
		
		this.NativeFont.addr.formatString = this.offset(0x44C26C);
		this.isLicenseCheckRequired = this.offset(0x3F5598); // weird thing in v13 and lower
		this.HomePageStartGame = this.offset(0x3ED6DC);
		this.DebugMenuButton = malloc(1500);
		this.DebugMenu = malloc(2000);
	},
	offset(off) {
		return this.base.add(off);
	}
}

const CLIENT_SECRET_KEY = [0xBB, 0x14, 0xD6, 0xFD, 0x2B, 0x7C, 0x98, 0x23, 0xEA, 0xED, 0xB4, 0x33, 0x8C, 0xB7, 0x23, 0x7F, 0x61, 0xE4, 0x22, 0xD2, 0x3C, 0x49, 0x77, 0xF7, 0x4A, 0xDA, 0x05, 0x27, 0x02, 0xC0, 0xC6, 0x2D];
const EncryptionPatcher = {
	init() {
		/*Interceptor.replace(Libg.isLicenseCheckRequired, new NativeCallback(function() {
			return 0;
		}, 'int', [])); // needed, so huawei users won't stuck at 50% (safetynet checks)*/
		
		Interceptor.attach(Libg.offset(0x158358), { //  randombytes
            onEnter(args) {
                this.buffer = args[0];
            },
            onLeave(retval) {
				console.log(this.buffer);
				console.log(this.buffer.readByteArray);
                this.buffer.writeByteArray(CLIENT_SECRET_KEY);
                log("client secret replaced");
            }
        });
	}
}

const AddFiler = {
	init(scfile) {
		const AddFile = new NativeFunction(Libg.offset(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int']);
		hook(Libg.offset(0x24F5C0), {
			onEnter(args) {
				AddFile(args[0], createStringPtr(scfile), -1, -1, -1, -1);
				log(`ScLoader::AddFile - Sc File with name ${scfile} was been loaded!`);
			}
		});
	}
}

const DebugPatcher = {
	init() {
		const StageAdd = new NativeFunction(Libg.offset(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
		const DebugMenuCtor = new NativeFunction(Libg.offset(DEBUG_MENU_CTOR), 'pointer', ['pointer']);
		const StageRemove = new NativeFunction(Libg.offset(0xD7474), 'void', ['pointer', 'pointer']);
		const DebugMenuUpdate = new NativeFunction(Libg.offset(0x2A7268), "int", ["pointer", "float"]);
		const fSetText = new NativeFunction(Libg.offset(0x61AF4), 'pointer', ['pointer', 'pointer']);

		
		setTimeout(function() {
			DebugMenuCtor(Libg.DebugMenu);
		}, 6000);

		setTimeout(function() {
    		new NativeFunction(Libg.offset(0x14D970), 'void', ['pointer'])(Libg.DebugMenuButton);
    		let movieClip = new NativeFunction(Libg.offset(0x3E11F8), 'pointer', ['pointer', 'pointer', 'bool'])(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_button"), 1);
    		new NativeFunction(Libg.offset(0x13D4A0), 'void', ['pointer', 'pointer'])(Libg.DebugMenuButton, movieClip);

    		StageAdd(Libg.offset(STAGE_ADDRESS).readPointer(), Libg.DebugMenuButton);
    		new NativeFunction(Libg.offset(0x13C884), 'void', ['pointer', 'float', 'float'])(Libg.DebugMenuButton, 30, 515);
    		fSetText(Libg.DebugMenuButton, createStringPtr("D"));
    	}, 6000);

    	hook(Libg.offset(0x3B46BC), {
			onEnter(args) {
				if (args[0].toInt32() == Libg.DebugMenuButton.toInt32()) {
					if (IsDebugMenuOpened == 0) {
						IsDebugMenuOpened = 1;
						StageAdd(Libg.base.add(STAGE_ADDRESS).readPointer(), Libg.DebugMenu);
					}
					else if (IsDebugMenuOpened == 1) {
						IsDebugMenuOpened = 0;
						StageRemove(Libg.base.add(STAGE_ADDRESS).readPointer(), Libg.DebugMenu);
					}
				}
			}
		});

		setTimeout(function() {
			setInterval(function() {
				DebugMenuUpdate(Libg.DebugMenu, 20);
			}, 5);
		}, 6000);

		log("Debug module initialized");
	}
}

const Redirection = {
	init(targetHost, targetPort) {
		hook(Module.findExportByName('libc.so', 'getaddrinfo'), {
			onEnter(args) {
				log(`Hit getaddrinfo at ${this.returnAddress.sub(Libg.base)} with ${args[0].readUtf8String()}`);
				
				this.str = args[0] = Memory.allocUtf8String(targetHost);
				args[1].writeUtf8String(targetPort);
			}
		});
		
		log("Redirection module initialized");
	}
}

const GamePatcher = {
	init() {
		GamePatcher.enableColorCodes();
		GamePatcher.enableHomePageStartGame();
		
		log("GamePatcher module initialized");
	},
	enableColorCodes() {
		hook(Libg.NativeFont.addr.formatString, {
			onEnter(args) {
				args[7] = ptr(1);
			}
		});
		
		this.logFeature("Color Codes");
	},
	enableHomePageStartGame() {
		hook(Libg.HomePageStartGame, {
			onEnter(args) {
				args[3] = ptr(3);
			}
		});
		
		this.logFeature("enableHomePageStartGame");
	},
	logFeature(name) {
		log(`GamePatcher: feature ${name} was enabled.`);
	}
}

const ArxanPatcher = {
	init() {
		RuntimePatcher.jmp(Libg.offset(0x5B708), Libg.offset(0x5C664)); // TcpSocket::create - crc check
		RuntimePatcher.jmp(Libg.offset(0x30DD58), Libg.offset(0x30EBBC)); // LoginMessage::encode
		RuntimePatcher.jmp(Libg.offset(0x7B78C), Libg.offset(0x7C9C0)); // InputSystem::update
		RuntimePatcher.jmp(Libg.offset(0x4723C0), Libg.offset(0x4735C0)); // CombatHUD::ultiButtonActivated
		
		hook(Libg.offset(0x4E1494), function() {
			this.context.r1 = 228;
			this.context.r2 = 228;
		})
		
		log("Arxan patching module initialized");
	}
}

rpc.exports.init = function() {
	console.log("init()");

	Libg.init();
	ArxanPatcher.init();
	Redirection.init(HOST, PORT);
	EncryptionPatcher.init();
	GamePatcher.init();
	AddFiler.init("sc/debug.sc");
	DebugPatcher.init();
}

function log(msg) {
	console.log("[*] " + msg);
}

const RuntimePatcher = {
	nop: function(addr) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putNop();
			writer.flush();
		});
	},
    ret: function(addr) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putRet();
			writer.flush();
		});
	},
	jmp: function(addr, target) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putBranchAddress(target);
			writer.flush();
		});
	}
}