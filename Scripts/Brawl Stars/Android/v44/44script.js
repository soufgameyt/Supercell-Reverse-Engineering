const Libg = {
    init() {
        let module = Process.findModuleByName("libg.so");
        Libg.begin = module.base;
        Libg.size = module.size;
        Libg.end = Libg.begin.add(Libg.size);
    },
    offset(addr) {
        return Libg.begin.add(addr);
    }
}

const Armceptor = {
    replace(ptr, arr) {
		Memory.protect(ptr, arr.length, "rwx");
		Memory.writeByteArray(ptr, arr);
		Memory.protect(ptr, arr.length, "rx");
	},
	nop(ptr) {
		Armceptor.replace(ptr, [0x00, 0xF0, 0x20, 0xE3]);
	},
	ret(ptr) {
		Armceptor.replace(ptr, [0x1E, 0xFF, 0x2F, 0xE1]);
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

const ArxanKiller = {
    init() {
        Armceptor.jumpout(Libg.offset(0x88E230), Libg.offset(0x892070)); // g_createGameInstance
        Armceptor.jumpout(Libg.offset(0x811D0C), Libg.offset(0x812960)); // UnknownProt
        Armceptor.jumpout(Libg.offset(0x4635AC), Libg.offset(0x4644E8)); // GameMain::init
        Armceptor.jumpout(Libg.offset(0x7DCB40), Libg.offset(0x7DDDE0)); // InputSystem::update
        Armceptor.jumpout(Libg.offset(0x730DA4), Libg.offset(0x731CE8)); // ResourceManager::init
        Armceptor.jumpout(Libg.offset(0x54A9F0), Libg.offset(0x54BA08)); // LoginMessage::encode
        Armceptor.jumpout(Libg.offset(0x1E4678), Libg.offset(0x1E5B0C)); // UnknownProt

        Interceptor.replace(Module.findExportByName("libc.so", "openat"), new NativeCallback(function() { // OpenAt
            return -1;
        }, 'int', []));
        Interceptor.replace(Libg.offset(0x7FAF88), new NativeCallback(function() {}, "void", ["int"])); // AntiCheat::guard_callback
    }
}

const Connect = {
    init() {
        Interceptor.attach(Libg.offset(0x9ED4B0), { 
            onEnter(args) {
                args[1].add(8).readPointer().writeUtf8String("0.0.0.0");
                SetupMessaging.init();
            }
        });
    }
}

const SetupMessaging = { 
    init() {
        Armceptor.replace(Libg.offset(0x847370), [0x00, 0x00, 0x50, 0xE1]); // Messaging::encryptAndWrite
        Armceptor.replace(Libg.offset(0xA185D4), [0x05, 0x00, 0xA0, 0xE3]); // State
        Armceptor.replace(Libg.offset(0x6AD718), [0x00, 0x40, 0xA0, 0xE3]); // PepperCrypto::secretbox_open
        Armceptor.replace(Libg.offset(0xC05C54), [0x02, 0x80, 0xA0, 0xE1]); // Messaging::sendPepperAuthentification
    }
}

const Hook = {
    init() {
        const ReceiveMessage = Interceptor.attach(Libg.offset(0x51C5E8), { // MessageManager::receiveMessage
            onEnter(args) {
                const Msg = args[1];
                const MsgType = new NativeFunction(Memory.readPointer(Memory.readPointer(Msg).add(20)), "int", ["pointer"])(Msg);
                if (MsgType === 20104) { // LoginOkMessage
                    Misc();
                    ReceiveMessage.detach();
                }
            }
        });
    }
}

const Misc = {
    init() {
        Interceptor.replace(Libg.offset(0x802DF8), new NativeCallback(function() { // LogicVersion::isProd
            return 0;
        }, 'int', []));

        Interceptor.replace(Libg.offset(0xC0FE5C), new NativeCallback(function() { // LogicVersion::isDeveloperBuild
            return 1;
        }, 'int', []));

        Interceptor.replace(Libg.offset(0x1D1FBC), new NativeCallback(function() { // LogicVersion::isDev
            return 1;
        }, 'int', []));

        Interceptor.attach(Libg.offset(0x38A884), { // HomePage::startGame
	    	onEnter(args) {
	    		args[3] = ptr(3);
            }
        });

        Interceptor.attach(Libg.offset(0xB4F300), { // LogicBattleModeClient::addVisionUpdate
            onEnter(args) {
                args[1].add(104).writeInt(args[1].add(92).readInt());
                args[1].add(108).writeInt(1); // IsBrawlTV
            }
        });
    }
}

rpc.exports.init = function() {
    Libg.init();
    ArxanKiller.init();
    Connect.init();
    Hook.init();
}