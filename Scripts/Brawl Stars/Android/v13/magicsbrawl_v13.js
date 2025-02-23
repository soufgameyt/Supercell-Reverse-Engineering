const base = Module.findBaseAddress("libg.so");
const malloc = new NativeFunction(Module.findExportByName("libc.so", "malloc"), "pointer", ["int"]);
const pthread_mutex_unlock = new NativeFunction(Module.findExportByName("libc.so", "pthread_mutex_unlock"), "int", ["pointer"]);
const ntohs = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
const getaddrinfo = new NativeFunction(Module.findExportByName("libc.so", "getaddrinfo"), "int", ["pointer", "pointer", "pointer", "pointer"]);
const scString = new NativeFunction(base.add(0x4EB380), "pointer", ["pointer", "pointer"]);
const dildo = new NativeFunction(base.add(0x4C9ED0), "void", ["pointer", "pointer", "pointer"]);
function str2ptr(str) {
	var ptr = malloc(str.length + 1);
	ptr.writeUtf8String(str);
	return ptr;
}
function setKeyVersion(ver) {
	base.add(0x62ACE4).writeU16(ver);
}
function connect() {
	Interceptor.replace(Module.findExportByName("libc.so", "getaddrinfo"), new NativeCallback(function(arg0, arg1, arg2, arg3) {
		if (Memory.readUtf8String(arg0) == "game.brawlstarsgame.com") {
			arg0 = Memory.allocUtf8String("magic.royalegame.win");
		}
		return getaddrinfo(arg0, arg1, arg2, arg3);
    }, 'int', ['pointer', 'pointer', 'pointer', 'pointer']));
}
function scid() {
	var a = base.add(0x96C030).readPointer();
	var b = a.add(44).readPointer();
	var c = malloc(20);
	var d = malloc(20);
	scString(c, str2ptr("Url"));
	scString(d, str2ptr("https://connect.nulls.gg/"));
	dildo(b, c, d);
}
function niggers() {
	let dolbaeb = Interceptor.attach(base.add(0x3C2B4), {
		onEnter(a) {
			if (this.returnAddress.equals(base.add(0x47AB2C))) {
				dolbaeb.detach();
				scid();
			}
		}
	});
}
function replaceKey() {
	setKeyVersion(7);
	base.add(0x975B24).writeU8(1);
	
	var bonus = Interceptor.attach(Module.findExportByName("libc.so", "connect"), {
		onEnter(args) {
			if (ntohs(args[1].add(2).readU16()) == 9339) {
				args[1].add(2).writeU16(ntohs(9334));
				
				var raptornik = Interceptor.attach(base.add(0x158358), {
					onEnter(args) {
					    this.key = args[0];
					},
					onLeave(retval) {
						raptornik.detach();
						this.key.writeByteArray([0x8B, 0x5E, 0x25, 0xAB, 0xDA, 0x1B, 0x9B, 0xD0, 0xA, 0x16, 0x59, 0xCA, 0xE6, 0x84, 0x54, 0xF1, 0x60, 0xD0, 0xEB, 0xCF, 0xC, 0xA3, 0x77, 0x84, 0x75, 0x4B, 0xE4, 0x1B, 0x67, 0x7F, 0x22, 0xB7, 0x7D]);
					}
				});
				
				bonus.detach();
				var dolbaeb = Interceptor.attach(base.add(0x3C308), {
					onEnter(args) {
						if (this.returnAddress.sub(base) == 0x59694) {
							dolbaeb.detach();
							var pthread_join = new NativeFunction(Module.findExportByName("libc.so", "pthread_join"), "int", ["pointer", "pointer"]);
							Interceptor.attach(base.add(0x1E00E0), function () {
								var pthread = this.context.r5.readPointer().add(16).readPointer();
								pthread_join(pthread, ptr(0));
							});
						}
					}
				});
			}
		}
	});
}
rpc.exports.init = function() {
	niggers();
	replaceKey();
	connect();
}