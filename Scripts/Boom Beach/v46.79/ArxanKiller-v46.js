setTimeout(() => {

    const Libg = {
        init() {
            let module = Process.findModuleByName('libg.so');
            Libg.begin = module.base;
            Libg.size = module.size;
            Libg.end = Libg.begin.add(Libg.size);
            console.log("**** Initialization complete ****\n");
        },
        offset(addr) {
            return Libg.begin.add(addr);
        }
    };

    const Armceptor = {
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
        },
        replace: function(addr, bytes) {
            Memory.patchCode(addr, Process.pageSize, function(code) {
                var writer = new ArmWriter(code, {
                    pc: addr
                });
                writer.putBytes(bytes)
                writer.flush();
            });
        },
    }

    const ArxanKiller = {
        init() {
            console.log("Starting ArxanKiller...");
            ArxanKiller.frida();
            ArxanKiller.GameMain_GameMain();
            ArxanKiller.Messaging_onReceive();
            ArxanKiller.PiranhaMessage_encode();
            ArxanKiller.LoginMessage_encode_prot1();
            ArxanKiller.LoginMessage_encode_prot2();
            ArxanKiller.GameMain_upDate();
            ArxanKiller.GameMain_createGameInstance();
            ArxanKiller.Undefined();
            console.log("\n**** All protections successfully killed ****");
        },
        frida() {
            console.log("Frida Protection Patched");
            Interceptor.replace(Module.findExportByName('libc.so', 'openat'), new NativeCallback(function() {
                return -1;
            }, 'int', []));
        },
        GameMain_GameMain() {
            Armceptor.jumpout(Libg.offset(0xA92790), Libg.offset(0xA927F8));
            console.log("GameMain_GameMain Patched");
        },
        Messaging_onReceive() {
            Armceptor.jumpout(Libg.offset(0x859CF0), Libg.offset(0x85C300));
            console.log("Messaging_onReceive Patched");
        },
        PiranhaMessage_encode() {
            Armceptor.jumpout(Libg.offset(0x3A4518), Libg.offset(0x3A44DC));
            console.log("PiranhaMessage_encode Patched");
        },
        LoginMessage_encode_prot1() {
            Armceptor.jumpout(Libg.offset(0x5058B8), Libg.offset(0x506950));
            console.log("LoginMessage_encode_1 Patched");
        },
        LoginMessage_encode_prot2() {
            Armceptor.jumpout(Libg.offset(0x506B4C), Libg.offset(0x506BB4));
            console.log("LoginMessage_encode_2 Patched");
        },
        GameMain_upDate() {
            Armceptor.jumpout(Libg.offset(0x8735DC), Libg.offset(0x8739E0));
            Armceptor.jumpout(Libg.offset(0x874FA8), Libg.offset(0x8758F8));
            console.log("GameMain_upDate Patched");
        },
        GameMain_createGameInstance() {
            Armceptor.jumpout(Libg.offset(0x1C6B8C), Libg.offset(0x1CACfC));
            
            console.log("GameMain_createGameInstance Patched");
        },
        Undefined(){
            Armceptor.jumpout(Libg.offset(0x5993D4), Libg.offset(0x59A4A8));
            Armceptor.jumpout(Libg.offset(0x14b658), Libg.offset(0x14b820));
            console.log("Two undefined prot patched");
        }
    }

    rpc.exports.init = function() {
        console.log("\n--------------------------------------------\n");
        Libg.init();
        ArxanKiller.init();
        Mod.init();
    }

}, 0)
