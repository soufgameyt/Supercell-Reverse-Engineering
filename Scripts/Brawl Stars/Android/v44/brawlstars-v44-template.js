var cache = {

};

cache.modules = {}
cache.options = {}

// Pointers \\

// Pointers \\

// Config \\
var guard = false;
// Config \\

var base = Module.findBaseAddress('libg.so');
var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
var ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
var inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
var free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);
var memmove = new NativeFunction(Module.findExportByName('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']);
var socket = new NativeFunction(Module.findExportByName('libc.so', 'socket'), 'int', ['int', 'int', 'int']);
var connect = new NativeFunction(Module.findExportByName('libc.so', 'connect'), 'int', ['int', 'pointer', 'uint']);
var close = new NativeFunction(Module.findExportByName('libc.so', 'close'), 'int', ['int']);
var libc_send = new NativeFunction(Module.findExportByName('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']);
var libc_sendto = new NativeFunction(Module.findExportByName('libc.so', 'sendto'), 'int', ['int', 'pointer', 'int', 'int', 'pointer', 'int']);

var Core = {
    redirectConnection: function(address, port) {
        Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
            onEnter: function(args) {
                if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                    Memory.writeU16(args[1].add(2), ntohs(port));
                    Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String(address)));
                    base = Module.findBaseAddress('libg.so'); // Second time because frida cli moment
                    if (guard == false) {
                        Core.setupProtectionBypass(); // Init protections bypass
                        Core.setupMessaging(); // Init the redirection of packets and encryption remover
                    }
                }
            }
        });
    },
    setupProtectionBypass: function() {
        Interceptor.replace(base.add(0x0), new NativeCallback(function() { // Forgot that protection
            
        }, 'void', []));

        Interceptor.attach(base.add(0x0), { // Anticheat GuardCallback
            onEnter: function(args) {
                this.context.r0 = 100; // Random Value to no trigger any checks
            }
        });

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Anticheat Update Loop       

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Login Message Encoding

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Unknown 1

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Unknown 2 

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // GameMain

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // CreateGameInstance      

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Input System Update Loop

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Ulti Pressed
    },
    setupMessaging: function() {
        guard = true;
        Core.attachMiscFunctions(); // Init other functions that are not needed but nice to have

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // I forgot this one bruh

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // And this one too :\

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Pepper Encrypt

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // State manual change

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Pepper Decrypt

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Send Pepper Authentification
    },
    attachMiscFunctions: function() {
        Interceptor.attach(base.add(0x0), { // HomePage StartGame
            onEnter: function(args) {
                this.context.r3 = 3; // Offline Battles value
            }
        });
    }
}

rpc.exports = {
    init: function(stage, options) {
        cache.options = options || {};
        Interceptor.detachAll();

        Memory.protect(base.add(0x0), 4, "rwx");
        base.add(0x0).writeByteArray([0x00, 0x00, 0x00, 0x00]); // Signature Check || disable if using frida cli

        Core.redirectConnection("10.0.0.0", 9339); // put your ip and desired port
    }
};