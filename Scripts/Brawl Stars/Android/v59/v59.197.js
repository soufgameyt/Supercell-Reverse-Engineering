const base = Module.findBaseAddress("libg.so")
const base_size = Process.findModuleByName("libg.so").size
Memory.protect(base, base_size, "rwx");

const Armceptor = {
    replace(ptr, arr) {
        Memory.protect(ptr, arr.length, "rwx");
        Memory.writeByteArray(ptr, arr);
        Memory.protect(ptr, arr.length, "rx");
    },
    jumpout(addr, target) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new ArmWriter(code, {
                pc: addr
            });
            writer.putBranchAddress(target);
            writer.flush();
        });
    },
    ret(ptr) {
        Armceptor.replace(ptr, [0x1E, 0xFF, 0x2F, 0xE1]);
    }
}

const Connect = {
    init() {
        Interceptor.attach(Module.findExportByName(null, "getaddrinfo"),
            {
                onEnter(args) {
                    if (args[1].readUtf8String() == "9339" || args[0].readUtf8String() === "game.brawlstarsgame.com") {
                        console.log(`${args[0].readUtf8String()} patching`);
                        args[0].writeUtf8String("192.168.0.2");
                        PepperCryptoKiller();
                        enablePatches();
                    }
                }
            })
    }
}

function enablePatches() {
    Interceptor.attach(base.add(0x58ABA8), {
        onEnter(args) {
            args[3] = ptr(3)
        }
    })

    base.add(0x5ECC0C).writeS8(1);
    base.add(0x5ECBD0).writeS8(0);
}

Interceptor.attach(base.add(0x6FAC5C), {
    onEnter(args) {
        cache.loginMessage = args[0]
    },
    onLeave(args1) {
        console.log(1111)
    }
})

function StringDecode(_0x4f0d09) {
    if (_0x4f0d09.add(4).readInt() >= 8) {
      return _0x4f0d09.add(8).readPointer().readUtf8String();
    }
    return _0x4f0d09.add(8).readUtf8String();
  }
  
function PepperCryptoKiller() {
    Armceptor.ret(base.add(0x9B16E0)); // Messaging::decryptData

    Interceptor.attach(base.add(0x9B205C), { // Messaging::sendPepperAuthentication
		onEnter(args) {
			this.messaging = args[0];
			args[0].add(16).writeU32(5);
			args[1] = args[2];
		},
		onLeave(re) {
			this.messaging.add(16).writeU32(5);
		}
	});

	Interceptor.attach(base.add(0x9B28FC), function() { // Messaging::encryptAndWrite
		this.context.r0 = 0x2774;
	 });
}

Connect.init();