//this script was made by bread, but im NOT SURE IN THAT.

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
	}
}


function connect(address) {
    const base = Module.findBaseAddress('libg.so');
    const ServerConnection_connectTo = base.add(0xE7D44);

    Interceptor.attach(ServerConnection_connectTo, {
        onEnter(args) {
            if (args[1].add(8).readPointer().readUtf8String() === "game.brawlstarsgame.com") {
                console.log("блять об прод споткнулся");
                args[1].add(8).readPointer().writeUtf8String(address);
                initMessaging();
            }
        }
    });
}

function misc() {
    const base = Module.findBaseAddress('libg.so');

    Interceptor.replace(base.add(0x4CB9E0), new NativeCallback(function() {
        return 1;
    }, 'int', []));

    Interceptor.replace(base.add(0x7CC82C), new NativeCallback(function() {
        if (this.returnAddress.equals(base.add(0x910C34)) || this.returnAddress.equals(base.add(0x910BEC))) {
            return 0;
        }
        return 1;
    }, 'int', []));

	Interceptor.attach(base.add(0x1E1B18), { // BattleScreen::shouldShowChatButton
		onLeave(retval) {
			retval.replace(1);
		}
	});

    Interceptor.attach(base.add(0x517310), { // HomePage::shouldShowTeamItems
		onLeave(retval) {
			retval.replace(1);
		}
	});

    Interceptor.attach(base.add(0x511000), {
		onEnter(args) {
			args[3] = ptr(3);
		}
	});
}

function hook() {
    const base = Module.findBaseAddress('libg.so');

    const receiveMessage =Interceptor.attach(base.add(0x3ADF80), { // MessageManager::receiveMessage
        onEnter(args) {
            const message = args[1];
            const messageType = new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(20)), 'int', ['pointer'])(message);
            if (messageType === 20104) {
                //misc();
                receiveMessage.detach();
            }
        }
	});
}

function initMessaging() {
    const base = Module.findBaseAddress('libg.so');

    //Armceptor.ret(base.add(0x81D7D4)); // Messaging::decryptData
    Interceptor.attach(base.add(0x5CE744), { // Messaging::sendPepperAuthentication
        onEnter(args) {
            this.messaging = args[0];
            args[0].add(16).writeU32(5);
            args[1] = args[2];
        },
        onLeave(re) {
            this.messaging.add(16).writeU32(5);
        }
    });
    Interceptor.attach(base.add(0x69E7D8), function() { // Messaging::encryptAndWrite
       this.context.r0 = 0x2774;
    });
}


function destroy_protections() {
    const base = Module.findBaseAddress('libg.so');
    const openat = Module.findExportByName(null, 'openat');

    Interceptor.replace(base.add(0x254A78), new NativeCallback(function() {}, 'void', ['int'])); // AntiCheat::guard_callback

    Interceptor.replace(base.add(0x3FAA6C), new NativeCallback(function() { // AntiCheat::getAntihackFlags
        return 0;
    }, 'int', []));
}

function init() {
    destroy_protections();
    connect("127.0.0.1"); // ip
    //hook();
    console.log("Successfully injected!"); 
}

rpc.exports.init = init;