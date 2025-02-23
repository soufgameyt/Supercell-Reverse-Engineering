const base = Module.findBaseAddress("libg.so");
const readPtr = Module.findExportByName('libc.so', 'read');


const connect = Interceptor.attach(Module.findExportByName(null, 'getaddrinfo'), {
    onEnter: function(args) {
        this.path = args[0].readUtf8String();
        if (this.path === base.add(0x055AD86).readUtf8String()) {
            this.z = args[0] = Memory.allocUtf8String("127.0.0.1");
        }
    }
});

var buf;
var check = 0;
			
const reader = Interceptor.attach(readPtr, {
	onEnter: function(args) {
		if(args[2] == 32) {
			check = 1;
			buf = args[1];
		}
	},
	onLeave: function(args) {
		if(check == 1) {
			Memory.writeByteArray(buf, [0xBB, 0x14, 0xD6, 0xFD, 0x2B, 0x7C, 0x98, 0x23, 0xEA, 0xED, 0xB4, 0x33, 0x8C, 0xB7, 0x23, 0x7F, 0x61, 0xE4, 0x22, 0xD2, 0x3C, 0x49, 0x77, 0xF7, 0x4A, 0xDA, 0x05, 0x27, 0x02, 0xC0, 0xC6, 0x2D]);
			check = 0;
		}
	}
});
