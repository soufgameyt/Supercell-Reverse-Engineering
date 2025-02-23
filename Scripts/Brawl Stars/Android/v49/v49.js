const Libg = {
	init() {
		Libg.module = Process.findModuleByName("libg.so");
		Libg.size = Libg.module.size;
		Libg.begin = Libg.module.base;
		Libg.end = ptr(Libg.begin.toInt32() + Libg.size);
	},
	offset(value) {
		return Libg.begin.add(value);
	}
}

const Armceptor = {
    replace(ptr, arr) {
		Memory.protect(ptr, arr.length, "rwx");
		Memory.writeByteArray(ptr, arr);
		Memory.protect(ptr, arr.length, "rx");
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
	init() {
		Interceptor.attach(Libg.offset(0x43D5FC), { // ServerConnection::connectTo
			onEnter(args) {
				args[1].add(8).readPointer().writeUtf8String("192.168.0.102");
				SetupMessaging.init();
			}
		});
	}
}

const SetupMessaging = {
    init() {
        Armceptor.replace(Libg.offset(0x71355C), [0x00, 0x00, 0x50, 0xE1]); // Messaging::encryptAndWrite
        Armceptor.replace(Libg.offset(0x712DF4), [0x05, 0x00, 0xA0, 0xE3]); // State
        Armceptor.replace(Libg.offset(0x2238C8), [0x00, 0x40, 0xA0, 0xE3]); // PepperCrypto::secretbox_open
        Armceptor.replace(Libg.offset(0x712D20), [0x02, 0x80, 0xA0, 0xE1]); // Messaging::sendPepperAuthentification
    }
}

const Hook = {
	init() {
		const ReceiveMessage = Interceptor.attach(Libg.offset(0x42FD00), { // MessageManager::receiveMessage
			onEnter(args) {
				const Msg = args[1];
				const MsgType = new NativeFunction(Memory.readPointer(Memory.readPointer(Msg).add(20)), "int", ["pointer"])(Msg);
                if (MsgType === 20104) { // LoginOkMessage
                    Misc.init();
                    ReceiveMessage.detach();
				}
			}
		});
	}
}

const Misc = {
	init() {
		Interceptor.replace(Libg.offset(0x59405C), new NativeCallback(function() { // LogicVersion::isDeveloperBuild
        	return 1;
    	}, "int", []));

		Interceptor.replace(Libg.offset(0x593FEC), new NativeCallback(function() { // LogicVersion::isProd
        	return 0;
    	}, "int", []));

    	Interceptor.replace(Libg.offset(0x593FE4), new NativeCallback(function() { // LogicVersion::isDev
        	return 1;
    	}, "int", []));

        Interceptor.replace(Libg.offset(0x54CA6C), new NativeCallback(function() { // BattleMode::isInTrainingCave
            return 1;
        }, "int", []));

        Interceptor.replace(Libg.offset(0x22E474), new NativeCallback(function() { // BattleMode::isInTrainingCave
            return 1;
        }, "int", []));

		Libg.offset(0xE88604).writeU8(1) // BattleMode::developerHudOn

		Interceptor.attach(Libg.offset(0x5209F8), { // HomePage::startGame
	    	onEnter(args) {
	    		args[3] = ptr(3);
				args[8] = ptr(1);
            }
        });

		Interceptor.attach(Libg.offset(0x6D11E0), { // LogicBattleModeClient::addVisionUpdate
            onEnter(args) {
                args[1].add(108).writeInt(args[1].add(96).readInt());
				args[1].add(112).writeInt(1); // IsBrawlTv
            }
        });
	}
}

rpc.exports.init = function() {
    Libg.init();
    Connect.init();
    Hook.init();
}