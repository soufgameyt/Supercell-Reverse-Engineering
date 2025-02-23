// https://t.me/shadowbrawl

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
    },
    ret(ptr) {
        Armceptor.replace(ptr, [0x1E, 0xFF, 0x2F, 0xE1]);
    }
}

const Connect = {
    init() {
        Interceptor.attach(Module.findExportByName(null, "getaddrinfo"),
            {
                onEnter(args) {
                    if (args[1].readUtf8String() == "9339" || args[0].readUtf8String() === "game.brawlstarsgame.com") {
                        console.log(`${args[0].readUtf8String()} patching`);
                        args[0].writeUtf8String("127.0.0.1");
                        SetupMessaging.init()
                    }
                }
            })
    }
}

const SetupMessaging = {
    init() {
        Armceptor.replace(Libg.offset(0x9B28F8), [0x00, 0x00, 0x50, 0xE1]); // Messaging::encryptAndWrite
        Armceptor.replace(Libg.offset(0x9B2148), [0x05, 0x00, 0xA0, 0xE3]); // State // v59 sub_9B205C
        Armceptor.ret(Libg.offset(0x9B16E0)); // Messaging::decryptData // v59 sub_9B16E0
        Armceptor.replace(Libg.offset(0x9B2074), [0x02, 0x80, 0xA0, 0xE1]); // Messaging::sendPepperAuthentification // v59 sub_9B205C
    }
}

Libg.init();
Connect.init();