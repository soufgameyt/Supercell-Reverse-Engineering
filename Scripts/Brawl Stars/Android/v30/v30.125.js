function ba2hex(bufArray) {
    var uint8arr = new Uint8Array(bufArray);
    if (!uint8arr)
        return "";
    var hexStr = "";
    for (var i = 0; i < uint8arr.length; i++) {
        var hex = (uint8arr[i] & 0xff).toString(16);
        hex = (hex.length === 1) ? "0" + hex : hex;
        hexStr += hex;
    }
    return hexStr.toUpperCase();
}

const Libg = {
    init() {
        let module = Process.findModuleByName("libg.so");
        Libg.begin = module.base;
        Libg.size = module.size;
        Libg.end = Libg.begin.add(Libg.size);

        Memory.protect(Libg.begin, Libg.size, "rwx");
    }, offset(addr) {
        return Libg.begin.add(addr);
    }
};

const ntohs = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
const inet_addr = new NativeFunction(Module.findExportByName("libc.so", "inet_addr"), "int", ["pointer"]);

const patchConnection = {
    init() {
        Interceptor.attach(Module.findExportByName("libc.so", "connect"), {
            onEnter(args) {
			    if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
			    	Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String("192.168.0.103")));	
                }
            }
        });
    }
};

const patchKeyVersion = {
    init() {
        Memory.writeByteArray(Libg.offset(0x660010), [0x07, 0x00, 0x00, 0x00]); // PepperKey::VERSION
    }
};

const patchServerPk = {
    init() {
        Memory.writeByteArray(Libg.offset(0x660014), [0xB1, 0xD2, 0x2E, 0x1C, 0x52, 0xD5, 0xB8, 0xE0, 0x45, 0x54, 0x81, 0xAF, 0x76, 0xA1, 0x1E, 0xD0, 0x0F, 0x01, 0x6D, 0xC8, 0xC2, 0x42, 0xC8, 0xD0, 0x96, 0x65, 0x6C, 0xB3, 0x48, 0xA9, 0x4A, 0x78]); // PepperKey::SERVER_PUBLIC_KEY
    }
};
			
const patchClientSk = {
    init() {
        var buf, check = 0;

        Interceptor.attach(Module.findExportByName("libc.so", "read"), {
	        onEnter(args) {
	        	if (args[2] == 32) {
	        		check = 1;
	        		buf = args[1];
	        	}
	        }, onLeave(retval) {
	        	if (check == 1) {
	        		Memory.writeByteArray(buf, [0x7B, 0x1A, 0x03, 0x30, 0xAA, 0x10, 0x93, 0x24, 0xB5, 0x37, 0xF2, 0x8C, 0x00, 0xDC, 0xFA, 0xB9, 0xB3, 0xBA, 0x87, 0x63, 0x25, 0x01, 0x7A, 0x52, 0xDB, 0x74, 0x19, 0x9B, 0xC7, 0x7C, 0x2B, 0xE8]); // client_sk
	        		check = 0;
	        	}
	        }
        });
    }
};

const hookKey = { // first passed client_pk, then server_pk
    init() {
        var k;

        Interceptor.attach(Libg.offset(0x4E98E8), { // blake2b_update
            onEnter(args) {
                k = args[1];
            }, onLeave(retval) {
                console.log(`
                    blake2b_update ~ leave

                    a1=${ba2hex(Memory.readByteArray(k, 32))};
                `);
            }
        });
    }
};

rpc.exports.init = function() {
    Libg.init();

    patchConnection.init();
    patchKeyVersion.init();

    hookKey.init();

    patchClientSk.init();
    // patchServerPk.init();
}
