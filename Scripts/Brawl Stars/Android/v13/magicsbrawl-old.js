const base = Module.findBaseAddress("libg.so");
const malloc = new NativeFunction(Module.findExportByName("libc.so", "malloc"), "pointer", ["int"]);
const pthread_mutex_unlock = new NativeFunction(Module.findExportByName("libc.so", "pthread_mutex_unlock"), "int", ["pointer"]);
const ntohs = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
const getaddrinfo = new NativeFunction(Module.findExportByName("libc.so", "getaddrinfo"), "int", ["pointer", "pointer", "pointer", "pointer"]);
const scString = new NativeFunction(base.add(5157760), "pointer", ["pointer", "pointer"]);
const _0x316977 = new NativeFunction(base.add(5021392), "void", ["pointer", "pointer", "pointer"]);
const _0x2339f9 = new NativeFunction(base.add(2635392), "pointer", ["pointer", "pointer", "int", "int"]);
const serverHost = "magic.royalegame.win";
const serverPort = 9334;

function str2ptr(str) {
	var ptr = malloc(str.length + 1);
	ptr.writeUtf8String(str);
	return ptr;
}
function setKeyVersion(arg0) {
	base.add(6466788).writeU16(arg0);
}

function connect() {
	Interceptor.replace(Module.findExportByName("libc.so", "getaddrinfo"), new NativeCallback(function(arg0, arg1, arg2, arg3) {
		if (Memory.readUtf8String(arg0) == "game.brawlstarsgame.com") {
			arg0 = Memory.allocUtf8String(serverHost);
			console.log("game.brawlstarsgame.com replate to retro.royalegame.win");
		}
		return getaddrinfo(arg0, arg1, arg2, arg3);
    }, 'int', ['pointer', 'pointer', 'pointer', 'pointer']));
}

function _0x3a2b32() {
	var a = base.add(9879600).readPointer();
	var b = a.add(44).readPointer();
	var c = malloc(20);
	var d = malloc(20);
	scString(c, str2ptr("Url"));
	scString(d, str2ptr("https://connect.nulls.gg/"));
	_0x316977(b, c, d);
}

function _0x5358ca() {
	let dolbaeb = Interceptor.attach(base.add(246452), {
		onEnter(a) {
			if (this.returnAddress.equals(base.add(4696876))) {
				dolbaeb.detach();
				_0x3a2b32();
			}
		}
	});
}

function _0x1c9d52() {
	Interceptor.attach(base.add(2624988), {
		onEnter(args) {
			Interceptor.detachAll();
			replaceKey();
		}
	});
}

function replaceKey() {
	setKeyVersion(7);
	base.add(9919268).writeU8(1);
	
	var bonus = Interceptor.attach(Module.findExportByName("libc.so", "connect"), {
		onEnter(args) {
			if (ntohs(args[1].add(2).readU16()) == 9339) {
				args[1].add(2).writeU16(ntohs(serverPort));
				
				var raptornik = Interceptor.attach(base.add(1409880), {
					onEnter(args) {
					    this.key = args[0];
					},
					onLeave(retval) {
						raptornik.detach();
						this.key.writeByteArray([139, 94, 37, 171, 218, 27, 155, 208, 10, 22, 89, 202, 230, 84, 241, 96, 208, 235, 207, 12, 163, 119, 132, 75, 193, 228, 27, 103, 127, 34, 183, 125]);
					}
				});
				
				bonus.detach();
			
				var dolbaeb = Interceptor.attach(base.add(246536), {
					onEnter(args) {
						if (this.returnAddress.sub(base) == 366228) {
							dolbaeb.detach();
							
							var pthread_join = new NativeFunction(Module.findExportByName("libc.so", "pthread_join"), "int", ["pointer", "pointer"]);
							Interceptor.attach(base.add(1966304), function () {
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
	_0x5358ca();
	replaceKey();
	connect();
}