/// <reference path="frida-gum.d.ts" />

const Libg = {
    init() {
        let module = Process.findModuleByName('libg.so');
        Libg.begin = module.base;
        Libg.size = module.size;
        Libg.end = Libg.begin.add(Libg.size);

        Libg.AntiCheat = {
            addr: {}
        };

        Libg.AntiCheat.addr.guard_callback = Libg.offset(0x82F868);
        Libg.AntiCheat.addr.update = Libg.offset(0xAC92F0);
    },
    offset(addr) {
        return Libg.begin.add(addr);
    }
};

const Armceptor = {
	nop: function(addr) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putNop();
			writer.flush();
		});
	},
    ret: function(addr) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putRet();
			writer.flush();
		});
	},
	jumpOffset: function(addr, target) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putBImm(target);
			writer.flush();
		});
	},
	jumpout: function(addr, target) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			
			writer.putBranchAddress(target);
			writer.flush();
		});
	}
}

const ArxanKiller = {
    init() {
        ArxanKiller.kill_lv1_checksum_bitcode_checksum_guard();
        ArxanKiller.kill_lv1_debugger_antidebug_guard_proc_tracerpid();
        ArxanKiller.kill_lv1_checksum_bitcode_2_checksum_guard();
        ArxanKiller.kill_titan_lv2_checksum_checksum_guard();
        ArxanKiller.kill_lv2_checksum_exec_prob_timer();
        ArxanKiller.kill_lv1_stack_verify();
    },
    kill_lv1_checksum_bitcode_checksum_guard() {
        Armceptor.jumpout(Libg.offset(0x555DB4), Libg.offset(0x563E6C));
    },
    kill_lv1_debugger_antidebug_guard_proc_tracerpid() {
        Interceptor.replace(Module.findExportByName('libc.so', 'openat'), new NativeCallback(function(dirfd, pathname) {
            console.log("don't even try to open " + pathname.readUtf8String());
            return -1;
        }, 'int', ['int', 'pointer']));
    },
    kill_lv1_checksum_bitcode_2_checksum_guard() {
        Armceptor.jumpout(Libg.offset(0x99304C), Libg.offset(0x994118));
    },
    kill_titan_lv2_checksum_checksum_guard() {
        Armceptor.jumpout(Libg.offset(0x6B4B3C), Libg.offset(0x6B5F7C));
    },
    kill_lv2_checksum_exec_prob_timer() {
        Armceptor.jumpout(Libg.offset(0x9E9278), Libg.offset(0x9EA548));
    },
    kill_lv1_stack_verify() {
        Interceptor.replace(Libg.AntiCheat.addr.guard_callback, new NativeCallback(function(a1) {
            console.log("guard_callback(" + a1 + ") was called at " + this.returnAddress.sub(Libg.begin));
        }, 'void', ['int']));

        Armceptor.ret(Libg.AntiCheat.addr.update);
    }
}

rpc.exports.init = function() {
    Libg.init();
    ArxanKiller.init();
}
