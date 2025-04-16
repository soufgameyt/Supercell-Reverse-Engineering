// Script Made By Souf (pls dont claim it as yours) (not tested but should work btw)
const base = Module.findBaseAddress("Hay Day");
const base_size = base.size;

const LogicDefine_OfflineMode = base.add(0x2C8111);

const Logger = {
    Print(text) {
        console.warn("[*] " + text)
    },
    Debug(text) {
        console.warn("[DEBUG] " + text)
    }
}
const LogicDefine = {
    OfflineMode() {
        Interceptor.replace(LogicDefine_OfflineMode, new NativeCallback(function() {
            return 1;
        }, 'int', []));
    }
}

rpc.exports.init = function() {
    LogicDefine.OfflineMode();
    Logger.Debug("[LogicDefine::OFFLINE_MODE] Offline Mode Enabled!");
}
