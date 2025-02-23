const _0x121ee4 = function () {
    let _0x4ad1d8 = true;
    return function (_0x35c379, _0x1043cf) {
      const _0x1d972d = _0x4ad1d8 ? function () {
        if (_0x1043cf) {
          const _0x37f131 = _0x1043cf.apply(_0x35c379, arguments);
          _0x1043cf = null;
          return _0x37f131;
        }
      } : function () {};
      _0x4ad1d8 = false;
      return _0x1d972d;
    };
  }();
  const _0x560fb6 = _0x121ee4(this, function () {
    return _0x560fb6.toString().search("(((.+)+)+)+$").toString().constructor(_0x560fb6).search("(((.+)+)+)+$");
  });
  _0x560fb6();
  const Libg = {
    init() {
      Libg.module = Process.findModuleByName("libg.so");
      Libg.size = Libg.module.size;
      Libg.begin = Libg.module.base;
      Libg.end = Libg.begin.add(Libg.size);
      Libg.AntiCheat = {
        addr: {}
      };
      Libg.AntiCheat.addr.guard_callback = Libg.begin.add(0x82F868);
      Libg.AntiCheat.addr.update = Libg.begin.add(0xAC92F0);
    },
    offset(value) {
      return Libg.begin.add(value);
    }
  };
  function PatcherFunctions() {
    Interceptor.attach(Libg.begin.add(0x434CBC), {
      onEnter(args) {
        args[3] = ptr(3);
      }
    });
  }
  const PepperKiller = {
    init() {
      Memory.protect(Libg.begin.add(0xC345DC), 4, "rwx");
      Memory.writeByteArray(Libg.begin.add(0xC345DC), [0, 0, 80, 225]);
      Memory.protect(Libg.begin.add(0x29BF54), 4, "rwx");
      Memory.writeByteArray(Libg.begin.add(0x29BF54), [5, 0, 160, 227]);
      Memory.protect(Libg.begin.add(0xAD0A84), 4, "rwx");
      Memory.writeByteArray(Libg.begin.add(0xAD0A84), [30, 255, 47, 225]);
      Memory.protect(Libg.begin.add(0x29BE80), 4, "rwx");
      Memory.writeByteArray(Libg.begin.add(0x29BE80), [2, 128, 160, 225]);
    }
  };
  const Connect = {
    init() {
      Interceptor.attach(Libg.begin.add(0xA539D0), {
        onEnter(args) {
          args[1].add(8).readPointer().writeUtf8String("192.168.100.6");
          PepperKiller.init();
        }
      });
    }
  };
  rpc.exports.init = function () {
    Libg.init();
    Connect.init();
  };