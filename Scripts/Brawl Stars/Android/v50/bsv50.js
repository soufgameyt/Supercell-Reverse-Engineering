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
		Interceptor.attach(Libg.offset(0x45D5E0), { // ServerConnection::connectTo
			onEnter(args) {
				args[1].add(8).readPointer().writeUtf8String("0.0.0.0");
				SetupMessaging.init();
			}
		});
	}
}

const SetupMessaging = {
    init() {
        Armceptor.replace(Libg.offset(0x73E9EC), [0x00, 0x00, 0x50, 0xE1]); // Messaging::encryptAndWrite
        Armceptor.replace(Libg.offset(0x73E284), [0x05, 0x00, 0xA0, 0xE3]); // State
        Armceptor.replace(Libg.offset(0x23C118), [0x00, 0x40, 0xA0, 0xE3]); // PepperCrypto::secretbox_open
        Armceptor.replace(Libg.offset(0x73E1B0), [0x02, 0x80, 0xA0, 0xE1]); // Messaging::sendPepperAuthentification
    }
}

const Hook = {
	init() {
		const ReceiveMessage = Interceptor.attach(Libg.offset(0x4501B8), { // MessageManager::receiveMessage
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
		Interceptor.replace(Libg.offset(0x5B601C), new NativeCallback(function() { // LogicVersion::isDeveloperBuild
        	return 1;
    	}, "int", []));

		Interceptor.replace(Libg.offset(0x5B5FE4), new NativeCallback(function() { // LogicVersion::isProd
        	return 0;
    	}, "int", []));

    	Interceptor.replace(Libg.offset(0x5B5FDC), new NativeCallback(function() { // LogicVersion::isDev
        	return 1;
    	}, "int", []));

        Interceptor.replace(Libg.offset(0x572010), new NativeCallback(function() { // BattleMode::isInTrainingCave
            return 1;
        }, "int", []));

        Interceptor.replace(Libg.offset(0x247AE8), new NativeCallback(function() { // BattleMode::isInTrainingCave
            return 1;
        }, "int", []));

		Libg.offset(0xE88604).writeU8(1) // BattleMode::developerHudOn

		Interceptor.attach(Libg.offset(0x543F6C), { // HomePage::startGame
	    	onEnter(args) {
	    		args[3] = ptr(3);
				args[8] = ptr(1);
            }
        });

		Interceptor.attach(Libg.offset(0x6FC580), { // LogicBattleModeClient::addVisionUpdate
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