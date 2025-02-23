//By unknowlib
  const base = Module.findBaseAddress("libg.so");
  const Libg = {
    'init'() {
      Libg.module = Process.findModuleByName("libg.so");
      Libg.size = Libg.module.size;
      Libg.begin = Libg.module.base;
      Libg.end = ptr(Libg.begin.toInt32() + Libg.size);
    },
	offset(value) {
		return Libg.begin.add(value);
	}
};
const Log = {
  Line(_0x5d5a1d) {
      console.log(_0x5d5a1d);
  }
};
  const Armceptor = {
    'replace'(ptr, arr) {
        Memory.protect(ptr, arr.length, "rwx");
		Memory.writeByteArray(ptr, arr);
		Memory.protect(ptr, arr.length, "rx");
    },
    'replaceStr'(address, value) {
        Memory.protect(address, value.length, "rwx");
        Memory.writeUtf8String(address, value);
      Memory.protect(address, value.length, 'rx');
    },
    'jumpout'(addr, target) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			writer.putBranchAddress(target);
			writer.flush();
      });
    },
    'ret'(ptr) {
      Armceptor.replace(ptr, [0x1e, 0xff, 0x2f, 0xe1]);
    }
  };
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
    WriteToMemory(base.add(OldStringObj.off), "Pointer", ptr(NewStringPtr-base.add(OldStringObj.dcd)));
    return NewStringPtr;
}
  const Connect = {
    'init'() {
      Interceptor.attach(Libg.begin.add(0x4212d8), {
        'onEnter'(args) {
          args[1].add(8).readPointer().writeUtf8String("127.0.0.1");
          Log.Line("[ServerConnection::connectTo] Connecting to 127.0.0.1");
          SetupMessaging.init();
        }
      });
    }
  };
  const SetupMessaging = {
    'init'() {
      Armceptor.ret(base.add(0x6d90a0));
      Interceptor.attach(base.add(0x6d9a1c), {
        'onEnter'(args) {
          this.messaging = args[0x0];
          args[0x0].add(0x10).writeU32(0x5);
          args[0x1] = args[0x2];
        },
        'onLeave'(re) {
          this.messaging.add(0x10).writeU32(0x5);
        }
      });
      Interceptor.attach(base.add(0x6da18c), function () {
        this.context.r0 = 0x2774;
      });
    }
  };
  function FormatLog(level, message) {
    let formattedLogStr = "";
    date = new Date();
    formattedLogStr+=date.toLocaleString();
    switch(level) {
        case 0:
            formattedLogStr+=" [ERROR]";
            break;
        case 1:
            formattedLogStr+=" [WARNING]";
            break;
        case 2:
            formattedLogStr+=" [VERBOSE]";
            break;
    }
    formattedLogStr+=` ${message}\n`;
    return formattedLogStr;
}
  const Hook = {
    'init'() {}
  };
  const Misc = {
    'init'() {
      Interceptor.attach(Libg.begin.add(0x518898), {
        'onEnter'(args) {
            args[3] = ptr(3);
        }
      });
      Interceptor.attach(Libg.begin.add(0x6fca7c), {
        'onEnter'(args) {
            args[0x7] = ptr(0x1);
        }
      });
      Interceptor.replace(Libg.begin.add(0x76ad5c), new NativeCallback(function (ErrorStr) {
        Log.line(FormatLog(0x0, ErrorStr.readUtf8String()));
      }, 'void', ["pointer"]));
      Interceptor.replace(Libg.begin.add(0x76ac7c), new NativeCallback(function (WarningStr) {
        if (WarningStr.readUtf8String() != 'Unsupported pixel format 263 passed to GLImage::determineFormat.') {
            Log.Line(FormatLog(1, WarningStr.readUtf8String()));
        }
      }, "void", ['pointer']));
      WriteToMemory(Libg.begin.add(0x56cd04), "Byte", 0x0);
      WriteToMemory(Libg.begin.add(0x56ccdc), "Byte", 0x0);
      WriteToMemory(Libg.begin.add(0x56ccec), 'Byte', 0x1);
      WriteToMemory(Libg.begin.add(0x56cd0c), "Byte", 0x1);
      WriteToMemory(Libg.begin.add(0xc710d8), 'Byte', 0x1);
      WriteToMemory(Libg.begin.add(0xc70658), "Byte", 0x0);
      WriteToMemory(Libg.begin.add(0xc710cc), "Byte", 0x0);
    }
  };
  const DestroyProtections = {
    'init'() {
        const ironsource = Process.findModuleByName('libironsource-ads.so').base;
        Interceptor.replace(ironsource.add(0x1178), new NativeCallback(function () {
        }, 'void', []));
        Interceptor.replace(ironsource.add(0xF9C), new NativeCallback(function () {
        }, 'void', []));
    }
  };
  rpc.exports.init = function () {
    Libg.init();
    DestroyProtections.init();
    Connect.init();
    Hook.init();
    Misc.init();
  };