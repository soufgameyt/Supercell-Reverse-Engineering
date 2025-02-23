// this script disable encryption and redirect to your server.
const base = Process.findModuleByName('libg.so').base;

const ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);

const inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);

const rc4_encrypt = 0x1DE7DC + 1; // RC4Encrypter::encrypt

const rc4_decrypt = 0x1DE780 + 1; // RC4Encrypter::decrypt

Interceptor.attach(base.add(rc4_encrypt), {
    onEnter(args) {
        args[2] = ptr(0);
    }
});

Interceptor.attach(base.add(rc4_decrypt), {
    onEnter(args) {
        args[2] = ptr(0);
    }
});

Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
    onEnter: function(args) {

        if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
            Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String("127.0.0.1")));

        }

    }

});
