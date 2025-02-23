var cache = {

};

cache.modules = {}
cache.options = {}

const DECRYPT_POINTER = 0x95D4D8;
const ENCRYPT_AND_WRITE_POINTER = 0x301FB4;
const SEND_PEPPER_AUTHENTIFICATION_POINTER = 0xA6BDA4; 
const STATE_PTR = 0xA6BE78;

var base = Module.findBaseAddress('libg.so');
var ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
var inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
var connect = new NativeFunction(Module.findExportByName('libc.so', 'connect'), 'int', ['int', 'pointer', 'uint']);

var Utils = {
    jumpout: function(address, target) {
        Memory.patchCode(address, 4, code => {
            const cw = new ArmWriter(code, {});
            cw.putBranchAddress(target);
            cw.flush();
        });
    },
    ret: function(address) {
        Memory.patchCode(address, 4, code => {
            const cw = new ArmWriter(code, {});
            cw.putRet();
            cw.flush();
        });
    },
    nop: function(address) {
        Memory.patchCode(address, 4, code => {
            const cw = new ArmWriter(code, {});
            cw.putNop();
            cw.flush();
        });
    }
}

var Core = {
    redirectConnection: function(address, port) {
        Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
            onEnter: function(args) {
                if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                    Memory.writeU16(args[1].add(2), ntohs(port));
                    Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String(address)));
                    Core.setupMessaging();
                }
            }
        });
    },
    setupProtectionBypass: function() {
        Interceptor.replace(base.add(0x5157D8), new NativeCallback(function() {}, 'void', ['int']));
        Interceptor.replace(Module.findExportByName(null, 'openat'), new NativeCallback(function() {
            return -1
        }, 'int', []));

        Utils.jumpout(base.add(0x241520), base.add(0x2455D0));
        Utils.jumpout(base.add(0x956564), base.add(0x9574F8));
        Utils.jumpout(base.add(0x215998), base.add(0x216924));
        Utils.jumpout(base.add(0x216AB8), base.add(0x217A90));
        Utils.jumpout(base.add(0x2FA6A4), base.add(0x2FB610));
        Utils.jumpout(base.add(0x1B2550), base.add(0x1B26D4));
        Utils.jumpout(base.add(0x78B75C), base.add(0x78CF2C));
        Utils.jumpout(base.add(0xAA7C04), base.add(0xAA904C));
        Utils.jumpout(base.add(0xAA99B4), base.add(0xAAAEF4));
        Utils.jumpout(base.add(0xAAC3B8), base.add(0xAAD774));
        Utils.jumpout(base.add(0x945558), base.add(0x945554));
    },
    setupMessaging: function() {
        Core.attachMiscFunctions();

        Memory.protect(base.add(ENCRYPT_AND_WRITE_POINTER), 4, "rwx");
        base.add(ENCRYPT_AND_WRITE_POINTER).writeByteArray([0x00, 0x00, 0x50, 0xE1]);

        Memory.protect(base.add(STATE_PTR), 4, "rwx");
        base.add(STATE_PTR).writeByteArray([0x05, 0x00, 0xA0, 0xE3]);

        Memory.protect(base.add(DECRYPT_POINTER), 4, "rwx");
        base.add(DECRYPT_POINTER).writeByteArray([0x00, 0x40, 0xA0, 0xE3]);

        Memory.protect(base.add(SEND_PEPPER_AUTHENTIFICATION_POINTER), 4, "rwx");
        base.add(SEND_PEPPER_AUTHENTIFICATION_POINTER).writeByteArray([0x02, 0x80, 0xA0, 0xE1]);
    },
    attachMiscFunctions: function() {

        Interceptor.replace(base.add(0xA3E040), new NativeCallback(function() {
            return 0
        }, 'int', []));

        Interceptor.replace(base.add(0x172AD0), new NativeCallback(function() {
            return 1 
        }, 'int', []));

        Interceptor.attach(base.add(0xB8CB78), {
            onEnter: function(args) {
                this.context.r3 = 3;
            }
        });
    }
}

rpc.exports = {
    init: function(stage, options) {
        cache.options = options || {};
        Interceptor.detachAll();
        Core.setupProtectionBypass();
        Core.redirectConnection(cache.options.address, cache.options.port);
    }
};