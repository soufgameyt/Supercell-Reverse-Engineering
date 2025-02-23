const base = Module.findBaseAddress('libg.so');

const LobbyInfoWithoutPlayersOnlineStr = {off: 0x5329B0, dcd: 0x5328A8};

var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);

var textOpen = "        ";

var cache = {
	modules: {},
	options: {}
};

const Libg = {
	init() {
		Libg.module = Process.findModuleByName('libg.so');
		Libg.size = Libg.module.size;
		Libg.begin = Libg.module.base;
		Libg.end = ptr(Libg.begin.toInt32() + Libg.size);
	},
	offset(value) {
		return Libg.begin.add(value);
	}
}

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
        case "ushort":
            Memory.protect(address, 2, "rwx");
            Memory.writeU16(address, value);
            break;
        case "short":
            Memory.protect(address, 2, "rwx");
            Memory.writeS16(address, value);
            break;
        case "uint":
            Memory.protect(address, 4, "rwx");
            Memory.writeU32(address, value);
            break;
        case "int":
            Memory.protect(address, 4, "rwx");
            Memory.writeS32(address, value);
            break;
        case "float":
            Memory.protect(address, 4, "rwx");
            Memory.writeFloat(address, value);
            break;
        case "pointer":
            Memory.protect(address, 4, "rwx");
            Memory.writePointer(address, value);
            break;
        case "ulong":
            Memory.protect(address, 8, "rwx");
            Memory.writeU64(address, value);
            break;
        case "long":
            Memory.protect(address, 8, "rwx");
            Memory.writeS64(address, value);
            break;
        case "double":
            Memory.protect(address, 8, "rwx");
            Memory.writeDouble(address, value);
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

function RelocateCString(OldStringObj, NewStringLength) {
    var NewStringPtr = malloc(NewStringLength);
    WriteToMemory(Libg.offset(OldStringObj.off), "Pointer", ptr(NewStringPtr-Libg.offset(OldStringObj.dcd)));
    return NewStringPtr;
}

const MiscFunctionsPatcher = {
    init() {
        Interceptor.replace(Libg.offset(0x5816B4), new NativeCallback(function() {
            return 0;
        }, 'int', []));

        Interceptor.replace(Libg.offset(0x5816AC), new NativeCallback(function() {
            return 1;
        }, 'int', []));

        var NewLobbyInfoWithoutPlayersOnlineStr = RelocateCString(LobbyInfoWithoutPlayersOnlineStr, 200);
        WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStr, 'String', textOpen + `TG:@lOMBMODS SUBSCRIBE PLEASE💓
		COLLAB WITH @GLBSTUDIO`)
    }
}

const connect = {
    init() {
        Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
            onEnter(args) {
                this.str = args[0] = Memory.allocUtf8String("158.101.197.69");
                args[1].writeUtf8String("8224");
            }
        });
    }
}

rpc.exports.init = function() {
    Libg.init();
    connect.init();
    MiscFunctionsPatcher.init();
    console.log("Injected!");
}