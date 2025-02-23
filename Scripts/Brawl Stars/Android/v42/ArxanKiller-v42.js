const Libg = {
	init() {
		Libg.module = Process.findModuleByName('libg.so');
		Libg.size = Libg.module.size;
		Libg.begin = Libg.module.base;
		Libg.end = ptr(Libg.begin.toInt32() + Libg.size);
		
		Libg.AntiCheat = {};
		Libg.AntiCheat.addr = {};
		Libg.AntiCheat.addr.guard_callback = Libg.offset(0xA802EC);
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
	nop(ptr) {
		Armceptor.replace(ptr, [0x00, 0xF0, 0x20, 0xE3]);
	},
	ret(ptr) {
		Armceptor.replace(ptr, [0x1E, 0xFF, 0x2F, 0xE1]); // put BX LR
	}
}

const DoNotTrack = {
	init() {
		Armceptor.ret(Libg.offset(0x635750)); // 30000
		Armceptor.ret(Libg.offset(0x4BFFEC)); // 17338
	}
}

const ArxanKiller = {
	init() {
		ArxanKiller.kill_lv1_crc_checks();
		ArxanKiller.kill_anticheat();
	},
	kill_lv1_crc_checks() {
		Armceptor.replace(Libg.offset(0x3109B4), [0xBA, 0x36, 0x00, 0xEA]);
		Armceptor.replace(Libg.offset(0xADBC90), [0x27, 0x04, 0x00, 0xEA]);
		Armceptor.replace(Libg.offset(0x2CC538), [0xEF, 0x04, 0x00, 0xEA]);
		Armceptor.replace(Libg.offset(0x85B8D0), [0x90, 0x04, 0x00, 0xEA]);
		Armceptor.nop(Libg.offset(0x8D9B50));
		
		Armceptor.replace(Libg.offset(0x386550), [0x00, 0x00, 0xA0, 0xE3]);
		Armceptor.replace(Libg.offset(0x386848), [0x00, 0x00, 0xA0, 0xE3]);
	},
	kill_anticheat() {
		Interceptor.replace(Libg.AntiCheat.addr.guard_callback, new NativeCallback(function(action) {
			console.log("guard callback was called at " + this.returnAddress.sub(Libg.begin) + " with action " + action);
		}, 'void', ['int']));
	}
}

function init() {
	Libg.init();
	ArxanKiller.init();
	DoNotTrack.init();
}

rpc.exports.init = init;