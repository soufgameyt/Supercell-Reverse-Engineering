const base = Module.findBaseAddress('libg.so');
const ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
const inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);

const ServerConnection_connectTo = base.add(); // v53.176
const ServerPublicKeyAddr = base.add() // v53.176
const TidConnectingToServerStr = base.add(); // v53.176 | String: "TID_CONNECTING_TO_SERVER"
const LogicVersion_isDeveloperBuild = base.add(); // v53.176
const LogicVersion_isProd = base.add(); // v53.176
const LogicVersion_isDev = base.add(); // v53.176
const HomePage_startGame = base.add(); // v53.176

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
    KillAds(){
        Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource5startEPKcbbS1_"), new NativeCallback(function () { }, "void", []));
        Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource11setMetadataEPKcS1_"), new NativeCallback(function () { }, "void", []));
        Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource13isAdAvailableEv"), new NativeCallback(function () {
            return 0;
        }, "void", []));
    },

    RedirectConnection(host,port){
        Interceptor.attach(Module.findExportByName("libc.so", "connect"), {
            onEnter(args) {
                if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                    Memory.writeU16(args[1].add(2), ntohs(I));
                    Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String(s.redirectHost)));
                }
            }
        });
    },

    CryptoPatcher(){
        writeToMemory(publicKeyAdress, "ByteArray", ["сам меняй байты  шваль"]);
    },

    TidConnectingToServerChange(a){
        WriteToMemory(TidConnectingToServerStr, 'String', 'BSL-V53 | Connecting...');
    },

    ClientEnvironmentChange(){
        writeToMemory(LogicVersion_isDeveloperBuild, "Byte", 1);
        writeToMemory(LogicVersion_isDev, "Byte", 1);
        writeToMemory(LogicVersion_isProd, "Byte", 0);
    },

    OfflineBattles(){

    },
}

rpc.exports.init = function (stage, options) {
    LkPrtctrd.KillAds();
    LkPrtctrd.RedirectConnection(s.redirectHost, s.redirectPort);
    LkPrtctrd.CryptoPatcher();
    LkPrtctrd.TidConnectingToServerChange();
    LkPrtctrd.ClientEnvironmentChange();
    LkPrtctrd.OfflineBattles();
};