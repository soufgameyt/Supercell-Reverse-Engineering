
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
        ptr.writeByteArray(arr);
	},
    replaceStr(ptr, value) {
        ptr.writeUtf8String(value);
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

const Misc = {
    init() {
        Interceptor.replace(Libg.offset(DebuggerFnc.error), new NativeCallback(function(ErrorStr) {
            Log.line(FormatLog(0, ErrorStr.readUtf8String()));
        }, 'void', ['pointer']));

        Interceptor.replace(Libg.offset(DebuggerFnc.warning), new NativeCallback(function(WarningStr) {
            if (WarningStr.readUtf8String() != 'Unsupported pixel format 263 passed to GLImage::determineFormat.') {
                Log.Line(FormatLog(1, WarningStr.readUtf8String()));
            }
        }, 'void', ['pointer']));

        Libg.offset(0x56CD04).writeS8(0); // LogicVersion::isChinaVersion
        Libg.offset(0x56CCDC).writeS8(0); // LogicVersion::isProd
        Libg.offset(0x56CCEC).writeS8(1); // LogicVersion::isDev
        Libg.offset(0x56CD0C).writeS8(1); // LogicVersion::isDeveloperBuild
    }
}

rpc.exports.init = function() {
    Libg.init();
}
