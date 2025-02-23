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
		Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
            onEnter(args) {
              this.str = args[0] = Memory.allocUtf8String('127.0.0.1');
              args[1].writeUtf8String('9339');
              //PepperKiller.init();
              console.log('Connecting to ' + args[0].readUtf8String() + args[1].readUtf8String());
            }
          });
	}
}

const SetupMessaging = {
    init() {
        Armceptor.replace(Libg.offset(0x78000C), [0x00, 0x00, 0x50, 0xE1]); // Messaging::encryptAndWrite
        Armceptor.replace(Libg.offset(0x77F8A4), [0x05, 0x00, 0xA0, 0xE3]); // State
        Armceptor.replace(Libg.offset(0x239E1C), [0x00, 0x40, 0xA0, 0xE3]); // PepperCrypto::secretbox_open
        Armceptor.replace(Libg.offset(0x77F7D0), [0x02, 0x80, 0xA0, 0xE1]); // Messaging::sendPepperAuthentification
    }
}

const Hook = {
	init() {
		const ReceiveMessage = Interceptor.attach(Libg.offset(0x466D00), { // MessageManager::receiveMessage
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
		Interceptor.replace(Libg.offset(0x5E713C), new NativeCallback(function() { // LogicVersion::isDeveloperBuild
        	return 1;
    	}, "int", []));

		Interceptor.replace(Libg.offset(0x5E70FC), new NativeCallback(function() { // LogicVersion::isProd
        	return 0;
    	}, "int", []));

    	Interceptor.replace(Libg.offset(0x5E70FC), new NativeCallback(function() { // LogicVersion::isDev
        	return 1;
    	}, "int", []));

        

		Interceptor.attach(Libg.offset(0x56FBF8), { // HomePage::startGame
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