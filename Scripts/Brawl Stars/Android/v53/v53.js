// deobfuscated by souf
const base = Module.findBaseAddress("libg.so");
const ntohs = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
const inet_addr = new NativeFunction(Module.findExportByName("libc.so", "inet_addr"), "int", ["pointer"]);

const ServerPublicKeyAddr = base.add(0x167AA0); // v53.176
const TidConnectingToServerStr = base.add(0x132186); // v53.176 | String: "TID_CONNECTING_TO_SERVER"
const LogicVersion_isDeveloperBuild = base.add(0x60CADC); // v53.176
const LogicVersion_isProd = base.add(0x60CAA4); // v53.176
const LogicVersion_isDev = base.add(0x60CA9C); // v53.176
const HomePage_startGame = base.add(0x591DC4); // v53.176

function WriteToMemory(address, valueType, value) {
    switch (valueType.toLowerCase()) {
        case "bytearray":
            Memory.protect(address, value.length, "rwx");
            Memory.writeByteArray(address, value);
            Memory.protect(address, value.length, "rx");
            break;
        case "string":
            Memory.protect(address, value.length, "rwx");
            Memory.writeUtf8String(address, value);
            Memory.protect(address, value.length, "rx");
            break;
        case "byte":
            Memory.protect(address, 1, "rwx");
            Memory.writeS8(address, value);
            Memory.protect(address, 1, "rx");
            break;
    }
}

const LkPrtctrd = {
    KillAds() {
        Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource5startEPKcbbS1_"), new NativeCallback(function() {}, "void", []));
        Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource11setMetadataEPKcS1_"), new NativeCallback(function() {}, "void", []));
        Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource13isAdAvailableEv"), new NativeCallback(function() {
            return 0;
        }, "void", []));
    },

    RedirectConnection(host, port) {
        Interceptor.attach(Module.findExportByName("libc.so", "connect"), {
            onEnter(args) {
                if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                    Memory.writeU16(args[1].add(2), ntohs(s.redirectPort);
                    Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String(s.redirectHost)));
                }
            }
        });
    },
    PublicKeyChange() {
        WriteToMemory(ServerPublicKeyAddr, "ByteArray", [176, 34, 250, 182, 83, 219, 239, 33, 143, 194, 166, 186, 14, 16, 90, 40, 105, 220, 235, 204, 35, 85, 91, 245, 70, 17, 164, 194, 135, 106, 27, 51, 150, 95, 152, 1, 95, 36, 141, 253, 43, 150, 246, 11, 175, 41, 206, 70, 38, 38, 240, 134, 173, 29, 183, 166, 251, 25, 9, 72, 207, 201, 216, 105]);
    },
    TidConnectingToServerChange() {
        WriteToMemory(TidConnectingToServerStr, "String", "BSL-V53|Connecting...");
    },
    ClientEnvironmentChange() {
        WriteToMemory(LogicVersion_isDeveloperBuild, "Byte", 1);
        WriteToMemory(LogicVersion_isDev, "Byte", 1);
        WriteToMemory(LogicVersion_isProd, "Byte", 0);
    },
    OfflineBattles() {
        Interceptor.attach(HomePage_startGame, {
            onEnter(args) {
                args[3] = ptr(3);
                args[8] = ptr(1);
            }
        });
    }
};

rpc.exports.init = function(stage, options) {
    LkPrtctrd.KillAds();
    LkPrtctrd.RedirectConnection(s.redirectHost, s.redirectPort);
    LkPrtctrd.PublicKeyChange();
    LkPrtctrd.TidConnectingToServerChange();
    LkPrtctrd.ClientEnvironmentChange();
    LkPrtctrd.OfflineBattles();
};
