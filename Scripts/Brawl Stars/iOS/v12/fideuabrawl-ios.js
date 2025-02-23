// https://github.com/Super-brawl-team
const Libg = {
	init() {
		this.base = Module.findBaseAddress('Brawl Stars');
		
		this.NativeFont = {
			addr: {}
		};
		
		
	},
	offset(off) {
		return this.base.add(off);
	}
}
var cache = {
    modules: {},
    options: {}
};
const base = Module.findBaseAddress("Brawl Stars");
const readPtr = Module.findExportByName("libSystem.B.dylib", 'read');
const ntohs = new NativeFunction(Module.findExportByName("libSystem.B.dylib", 'ntohs'), 'uint16', ['uint16']);
const inet_addr = new NativeFunction(Module.findExportByName("libSystem.B.dylib", 'inet_addr'), 'int', ['pointer']);
var malloc = new NativeFunction(Module.findExportByName("libSystem.B.dylib", 'malloc'), 'pointer', ['int']);

function setup() {
	Interceptor.attach(Module.findExportByName("libSystem.B.dylib", 'connect'), {
		onEnter: function(args) {
			if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
				var host = Memory.allocUtf8String("192.168.1.184");
				Memory.writeInt(args[1].add(4), inet_addr(host));
				cryptoKeyChange()
			}
		}
	});
	
	

	//const openf = Interceptor.attach(Module.findExportByName("libSystem.B.dylib", "open"), {
	//	onEnter: function(args) {
     //       console.log(Memory.readUtf8String(args[0]))
	//		this.r = (Memory.readUtf8String(args[0]) == "/dev/urandom");
	//	},
	//	onLeave: function(retval) {
		//	if(this.r) {
	////			lfd = retval.toInt32();
	//		}
	//	}
//	});
			
	
}
function cryptoKeyChange() {
    const arc4random_buf = Module.findExportByName("libSystem.B.dylib", "arc4random_buf");

if (arc4random_buf) {
    const hook = Interceptor.attach(arc4random_buf, {
        onEnter: function (args) {
            this.buffer = args[0]; // The buffer being filled with random data
            console.log("current client key:"  + this.buffer)
            this.size = args[1].toInt32(); // Size of the buffer
        },
        onLeave: function (retval) {
            if (this.size === 32) { // Check if the random buffer is 32 bytes
                Memory.writeByteArray(this.buffer, [0xBB, 0x14, 0xD6, 0xFD, 0x2B, 0x7C, 0x98, 0x23, 0xEA, 0xED, 0xB4, 0x33, 0x8C, 0xB7, 0x23, 0x7F, 0x61, 0xE4, 0x22, 0xD2, 0x3C, 0x49, 0x77, 0xF7, 0x4A, 0xDA, 0x05, 0x27, 0x02, 0xC0, 0xC6, 0x2D]);
                console.log("Overwritten arc4random_buf with predefined values.");
				hook.detach()
            }
        }
    });
} else {
    console.error("arc4random_buf not found.");
}
}

rpc.exports = {
    init: function(stage, options) {
        cache.options = options || {};
        setup();
        //Libg.init();
        //AddFiler.init("sc/debug.sc");
        //cryptoKeyChange()

    }
};