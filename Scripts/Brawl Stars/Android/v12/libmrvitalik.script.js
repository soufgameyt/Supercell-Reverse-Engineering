var cache = {
    modules: {},
    options: {}
};

const base = Module.findBaseAddress("libg.so");
const readPtr = Module.findExportByName('libc.so', 'read');
const ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
const inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);

function setup() {
	Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
		onEnter: function(args) {
			if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
				var host = Memory.allocUtf8String(cache.options.redirectHost);
				Memory.writeInt(args[1].add(4), inet_addr(host));
			}
		}
	});
	
	var buf;
	var check = 0;
	var lfd;

	const openf = Interceptor.attach(Module.findExportByName("libc.so", "open"), {
		onEnter: function(args) {
			this.r = (Memory.readUtf8String(args[0]) == "/dev/urandom");
		},
		onLeave: function(retval) {
			if(this.r) {
				lfd = retval.toInt32();
			}
		}
	});
			
	const reader = Interceptor.attach(readPtr, {
		onEnter: function(args) {
			if(lfd == args[0].toInt32() && args[2] == 32) {
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
}

rpc.exports = {
    init: function(stage, options) {
        cache.options = options || {};
        setup();
    }
};
