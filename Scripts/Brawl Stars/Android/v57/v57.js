
const base = Module.findBaseAddress("libg.so")
const base_size = Process.findModuleByName("libg.so").size
Memory.protect(base, base_size, "rwx");

const getmovieclip = new NativeFunction(base.add(0x7483BC), 'pointer', ['pointer', 'pointer']);
const StringCtor = new NativeFunction(base.add(0x96DB4C), 'pointer', ['pointer', 'pointer']);
const addfile = new NativeFunction(base.add(0x7DECE0), 'pointer', ['pointer', 'pointer']);
const setChildVisible = new NativeFunction(base.add(0x775164), "void", ["pointer", "pointer", "bool"]);
const stageaddchild = new NativeFunction(base.add(0x78C4A8), 'void', ['pointer', 'pointer']);
const TextField_setText = new NativeFunction(base.add(0x7A4524), "void", ["pointer", "pointer"]);
const LogicConfData_getIntValue = new NativeFunction(base.add(0x6CEFA4), 'int', ['pointer', 'int', 'int']);
const SettingsScreen_SettingsScreen = new NativeFunction(base.add(0x8F89A0), 'void', ['pointer']);

const o1 = base.add(0xD75354);
const LoginMessage = 0x6A5324;

var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['uint']);
var free = new NativeFunction(Module.findExportByName("libc.so", "free"), "void", ["pointer"]);

var cache = {}

var logs = "";
var logsCount = 0;

const Armceptor = {
    replace(ptr, arr) {
		Memory.protect(ptr, arr.length, "rwx");
		Memory.writeByteArray(ptr, arr);
		Memory.protect(ptr, arr.length, "rx");
	},
    replaceStr(ptr, value) {
        Memory.protect(ptr, value.length, "rwx");
        Memory.writeUtf8String(ptr, value);
        Memory.protect(ptr, value.length, "rx");
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

function log(log, type) {
	if (type === 'warning') {
		console.warn('[*] ' + log);
	}
	if (type === 'error') {
		console.error('[*] ' + log);
	}
    logs += '\n<c3>[*]</c> ' + '<c3>' + log + '</c>';
    logsCount += 1;
    if (logsCount >= 25)
    {
        logs = logs.substring(logs.indexOf('\n') + 1);
    }
} 


String.prototype.ptr = function () {
    return Memory.allocUtf8String(this);
};
  
String.prototype.scptr = function () {
    let scptrmem = malloc(20);
    StringCtor(scptrmem, this.ptr());
    return scptrmem;
};

function stringDecode(str) {
    if (str.add(4).readInt() >= 8) {
      return str.add(8).readPointer().readUtf8String();
    }
    return str.add(8).readUtf8String();
}

function WriteToMemory(address, valueType, value) {
	switch (valueType.toLowerCase()) {
		case "u8":
			Memory.protect(address, 1, "rwx");
			Memory.writeU8(address, value);
			break;
		case "byte":
			Memory.protect(address, 1, "rwx");
			Memory.writeS8(address, value);
			break;
		case "bytearray":
			Memory.protect(address, value.length, "rwx");
			Memory.writeByteArray(address, value);
			break;
		case "string":
			Memory.protect(address, value.length, "rwx");
			Memory.writeUtf8String(address, value);
			break;
	}
}

const Utils = {
    getMovieClip(scfile, clipname) {
		return getmovieclip(Memory.allocUtf8String(scfile), Memory.allocUtf8String(clipname))
	},
    setXY(mem, x, y) {
		mem.add(28).writeFloat(x)
		mem.add(32).writeFloat(y)
	}
}

var loader = Interceptor.attach(base.add(0x7DECE0), {
    onEnter(args) {
        loader.detach()
        console.warn('sc/debug.sc' + " loaded!")
        addfile(args[0], 'sc/debug.sc'.scptr())
    }
})

function debugText() {
    let debugText = Utils.getMovieClip('sc/debug.sc', 'debug_menu_text');
    cache.debugMenuTxt = new NativeFunction(base.add(0x774CF4), 'pointer', ['pointer', 'pointer'])(debugText, 'Text'.ptr())
    cache.debugMenuTxt.add(28).writeFloat(10)
	cache.debugMenuTxt.add(32).writeFloat(10)
    cache.debugMenuTxt.add(12).writeFloat(1.1)
    cache.debugMenuTxt.add(24).writeFloat(1.1)
    setChildVisible(debugText, 'Text'.ptr(), 1);
    stageaddchild(o1.readPointer(), cache.debugMenuTxt)
}

Interceptor.attach(base.add(0x43F27C), { // ServerConnection::connectTo
    onEnter(args) {
		let ip = '172.20.10.2'
        args[1].add(8).readPointer().writeUtf8String(ip);
		PepperCryptoKiller();
		log('[ServerConnection::connectTo] Connecting for ' + ip, 'warning')
    }
});

Interceptor.attach(base.add(0x6DE20C), {
	onEnter(args) {
		cache.CustomEvent = args[1]
		console.log(args[1] + ' ' + args[0])
	}
})

Interceptor.attach(base.add(LoginMessage), {
    onEnter(args) {
        cache.loginMessage = args[0]
    },
    onLeave(args1) {
		try 
		{
			cache.loginMessage.AccountID = cache.loginMessage.add(128).readPointer().readInt() + "-" + cache.loginMessage.add(128).readPointer().add(4).readInt()
		    cache.loginMessage.PassToken = stringDecode(cache.loginMessage.add(132).readPointer())
            cache.loginMessage.ResourceSha = stringDecode(cache.loginMessage.add(160).readPointer())
            cache.loginMessage.Device = stringDecode(cache.loginMessage.add(164).readPointer())
            cache.loginMessage.OSVersion = stringDecode(cache.loginMessage.add(188).readPointer())
            cache.loginMessage.IMEI = cache.loginMessage.add(192).readPointer()
            log('AccountID: ' + cache.loginMessage.AccountID + "\n[*] PassToken: " + cache.loginMessage.PassToken + "\n[*] ResourceSha: " + cache.loginMessage.ResourceSha + "\n[*] Device: " + cache.loginMessage.Device + "\n[*] OSVersion: " + cache.loginMessage.OSVersion + "\n[*] IMEI: " + cache.loginMessage.IMEI, 'warning')
		}
		catch(error) {
			log(error, 'error')
		}
    }
})

function PepperCryptoKiller() {
	Armceptor.ret(base.add(0x95B1E0)); // Messaging::decryptData

    Interceptor.attach(base.add(0x95BB5C), { // Messaging::sendPepperAuthentication
		onEnter(args) {
			this.messaging = args[0];
			args[0].add(16).writeU32(5);
			args[1] = args[2];
		},
		onLeave(re) {
			this.messaging.add(16).writeU32(5);
		}
	});

	Interceptor.attach(base.add(0x95C3FC), function() { // Messaging::encryptAndWrite
		this.context.r0 = 0x2774;
	 });
}

Interceptor.replace(LogicConfData_getIntValue, new NativeCallback(function(self, valueID, defaultValue) {
	if (valueID == 1) {
		log('valueID: ' + valueID + ' defaultValue: ' + defaultValue, 'warning')
		return 41000001;
	}
	return LogicConfData_getIntValue(self, valueID, defaultValue);
}, 'int', ['pointer', 'int', 'int']));

Interceptor.attach(base.add(0x588D88), {
	onLeave(retVal) {
		console.warn('[HomeMode::enter] Menu!')
        var nativeFont = Interceptor.attach(base.add(0x7439D0), { // NativeFont::formatString
            onEnter(args) {
                args[7] = ptr(1);
            }
        });
		Interceptor.attach(base.add(0x54FA18), {
			onEnter(args) {
				args[3] = ptr(3)
			}
		})
		WriteToMemory(base.add(0x5B2270), 'Byte', 1);
		WriteToMemory(base.add(0x5B2240), 'Byte', 1);
        WriteToMemory(base.add(0x5B2248), 'Byte', 0);
        Memory.writeUtf8String(base.add(0x12CB8F), 'retard')
        debugText();
        //TextField_setText(cache.debugMenuTxt, logs.scptr())
	}
})