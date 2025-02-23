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
    const ServerConnection_connectTo = base.add(0x4F87E4);

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

    const receiveMessage =Interceptor.attach(base.add(0x3642A0), { // MessageManager::receiveMessage
        onEnter(args) {
            const message = args[1];
            const messageType = new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(20)), 'int', ['pointer'])(message);
            if (messageType === 20104) {
                misc();
                receiveMessage.detach();
            }
        }
	});
}

function initMessaging() {
    const base = Module.findBaseAddress('libg.so');

    Armceptor.ret(base.add(0x81D7D4)); // Messaging::decryptData
    Interceptor.attach(base.add(0x6707F4), { // Messaging::sendPepperAuthentication
        onEnter(args) {
            this.messaging = args[0];
            args[0].add(16).writeU32(5);
            args[1] = args[2];
        },
        onLeave(re) {
            this.messaging.add(16).writeU32(5);
        }
    });
    Interceptor.attach(base.add(0x2174A4), function() { // Messaging::encryptAndWrite
       this.context.r0 = 0x2774;
    });
}


function destroy_protections() {
    const base = Module.findBaseAddress('libg.so');
    const createGameInstanceJump = base.add(0x33CC04);
    const createGameInstanceClean = base.add(0x33CC80);
    const loginMessageEncodeJump = base.add(0x493304);
    const loginMessageEncodeClean = base.add(0x493EA8);
    const inputSystemUpdateJump = base.add(0x68DE6C);
    const inputSystemUpdateClean = base.add(0x68EE94);
    const gameMainCtorJump = base.add(0x66DCEC);
    const gameMainCtorClean = base.add(0x66E0A0);
    const combatHUDUltiButtonActivatedJump = base.add(0x7D8858);
    const combatHUDUltiButtonActivatedClean = base.add(0x7D8C34);
    const messagingConnectJump = base.add(0x39AD0C);
    const messagingConnectClean = base.add(0x39C55C);
    const resourceManagerInitJump = base.add(0x68A718);
    const resourceManagerInitClean = base.add(0x68B1F8);
    const openat = Module.findExportByName(null, 'openat');


    Interceptor.attach(createGameInstanceJump, function() {
        console.log("а негры тоже пидорасы x1");
        this.context.r0 = createGameInstanceClean;
	});

    Interceptor.attach(gameMainCtorJump, function() {
        console.log("а негры тоже пидорасы x2");
        this.context.r0 = gameMainCtorClean;
	});

    Interceptor.attach(inputSystemUpdateJump, function() {
        console.log("а негры тоже пидорасы x3");
        this.context.r0 = inputSystemUpdateClean;
	});

    Interceptor.attach(resourceManagerInitJump, function() {
        console.log("а негры тоже пидорасы x4");
        this.context.r0 = resourceManagerInitClean;
	});

    /*Interceptor.attach(messagingConnectJump, function() { DO NOT TOUCH
        console.log("а негры тоже пидорасы x6");
        this.context.r0 = messagingConnectClean;
	});*/

    Interceptor.attach(loginMessageEncodeJump, function() {
        console.log("а негры тоже пидорасы x5");
        this.context.r0 = loginMessageEncodeClean;
	});

    Interceptor.attach(combatHUDUltiButtonActivatedJump, function() {
        console.log("а негры тоже пидорасы x6");
        this.context.r0 = combatHUDUltiButtonActivatedClean;
	});

    Interceptor.replace(base.add(0x8339F4), new NativeCallback(function() {}, 'void', ['int'])); // AntiCheat::guard_callback

    Interceptor.replace(base.add(0x6B7CD0), new NativeCallback(function() { // AntiCheat::getAntihackFlags
        return 0;
    }, 'int', []));

    Interceptor.replace(openat, new NativeCallback(function() { // openat
        return 0;
	}, 'int', []));
}

function init() {
    destroy_protections();
    connect("127.0.0.1"); // ip
    hook();
    console.log("Successfully injected!"); 
}

rpc.exports.init = init;
