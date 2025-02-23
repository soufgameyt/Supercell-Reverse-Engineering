const _0x3bda8e = {};
const _0x1602d8 = Module.findBaseAddress("libg.so");
const _0x359857 = Process.findModuleByName("libg.so").size;
_0x3bda8e.changeRegion = false;
_0x3bda8e.isChanged = false;
_0x3bda8e.reqCheck = true;
_0x3bda8e.fps = 0;
_0x3bda8e.isInWheel = true;
Memory.protect(_0x1602d8, _0x359857, "rwx");
const _0x54091c = {
  env: "vip",
  version: "54.243",
  branch: "beta-1",
  packageName: "gene.brawl.vip",
  scriptVersion: 95,
  isVip() {
    return _0x54091c.env == "vip";
  }
};
const _0xc4786d = {
  major: 54,
  build: 243,
  minor: 1,
  protocol: 2,
  appstore: 2,
  devicetype: 2,
  keyversion: 43
};
const _0x4a7c02 = {
  replaced: {},
  nop(_0xd41ba0) {
    this.replaced[_0xd41ba0] = _0xd41ba0.readByteArray(4);
    Memory.patchCode(_0xd41ba0, 4, function (_0x33997f) {
      const _0x2ac568 = {
        pc: _0xd41ba0
      };
      let _0x5639c8 = new ArmWriter(_0x33997f, _0x2ac568);
      _0x5639c8.putNop();
      _0x5639c8.flush();
    });
  },
  ret(_0x1405c0) {
    this.replaced[_0x1405c0] = _0x1405c0.readByteArray(4);
    Memory.patchCode(_0x1405c0, 4, function (_0x54f3b3) {
      const _0x970a16 = {
        pc: _0x1405c0
      };
      let _0x256f9d = new ArmWriter(_0x54f3b3, _0x970a16);
      _0x256f9d.putRet();
      _0x256f9d.flush();
    });
  },
  jumpout(_0x1753c3, _0x27828c) {
    this.replaced[_0x1753c3] = _0x1753c3.readByteArray(4);
    Memory.patchCode(_0x1753c3, 4, function (_0x5bb15f) {
      const _0x2d2ea1 = {
        pc: _0x1753c3
      };
      let _0x51700c = new ArmWriter(_0x5bb15f, _0x2d2ea1);
      _0x51700c.putBranchAddress(_0x27828c);
      _0x51700c.flush();
    });
  },
  bytes(_0x924176, _0x2ae488) {
    Memory.protect(_0x924176, _0x2ae488.length, "rwx");
    _0x924176.writeByteArray(_0x2ae488);
  },
  revert(_0x33ffb3) {
    if (Object.keys(this.replaced).includes(_0x33ffb3)) {
      _0x4a7c02.bytes(_0x33ffb3, this.replaced[_0x33ffb3]);
    }
  },
  protectRwx(_0x47ea45, _0x5a1b4d) {
    Memory.protect(_0x47ea45, _0x5a1b4d, "rwx");
  },
  writeString(_0x1f210b, _0x29f942) {
    this.protectRwx(_0x1f210b, _0x29f942.length);
    _0x1f210b.writeUtf8String(_0x29f942);
  }
};
const _0x421ad6 = Module.findExportByName("libc.so", "malloc");
const _0x1ea166 = Process.arch;
const _0x2c92f7 = _0x1ea166 == "arm64" ? 8 : 4;
const _0x42b834 = 41;
const _0x3d4cdb = 51;
const _0x5bb2b4 = _0x1602d8.add(7946204);
const _0x44ce92 = _0x1602d8.add(2696844);
const _0x1fbf88 = _0x1602d8.add(2697984);
const _0x3f2e9f = _0x1602d8.add(7345096);
const _0x121725 = _0x1602d8.add(7723500);
const _0x83d4dc = _0x1602d8.add(7259748);
const _0x429681 = _0x1602d8.add(5612628);
const _0x4cafb7 = _0x1602d8.add(13061944);
const _0xf0daf2 = _0x1602d8.add(7523056);
const _0x469fc8 = _0x1602d8.add(7707536);
const _0x59706d = _0x1602d8.add(7707608);
const _0x267260 = _0x1602d8.add(7523480);
const _0x1c3d27 = _0x1602d8.add(2697540);
const _0x567913 = _0x1602d8.add(5518696);
const _0x1b71a6 = _0x1602d8.add(6712292);
const _0x11477e = _0x1602d8.add(6035316);
const _0x70209a = _0x1602d8.add(4170000);
const _0x5cf13b = _0x1602d8.add(13044272);
const _0x1c4512 = _0x1602d8.add(2700116);
const _0x57956a = _0x1602d8.add(7726792);
const _0x5e1416 = _0x1602d8.add(7579648);
const _0x4c54c6 = _0x1602d8.add(7502688);
const _0x37342a = _0x1602d8.add(7504052);
const _0x83ab24 = _0x1602d8.add(7503928);
const _0x21d5af = _0x1602d8.add(7504188);
const _0x865a01 = _0x1602d8.add(7504264);
const _0x35f528 = _0x1602d8.add(7728968);
const _0x3d66ba = _0x1602d8.add(7730960);
const _0x44fe8e = _0x1602d8.add(7730972);
const _0x3cd852 = _0x1602d8.add(7730936);
const _0x11dcbe = _0x1602d8.add(7731732);
const _0x126b8c = _0x1602d8.add(7730464);
const _0x22e723 = _0x1602d8.add(7730312);
const _0x6a6785 = _0x1602d8.add(7730344);
const _0xf7328a = _0x1602d8.add(7730992);
const _0x20b032 = _0x1602d8.add(7519360);
const _0x5a6c0e = _0x1602d8.add(7524192);
const _0x2ac28d = _0x1602d8.add(10756624);
const _0x41140f = _0x1602d8.add(5784124);
const _0x29289f = _0x1602d8.add(5784052);
const _0x248d3e = _0x1602d8.add(5539200);
const _0x3b5976 = _0x1602d8.add(13046348);
const _0x2a643b = _0x1602d8.add(5535500);
const _0x2a3542 = _0x1602d8.add(13035268);
const _0xdd3e79 = _0x1602d8.add(7580244);
const _0x190f2e = _0x1602d8.add(0);
const _0x17ad5d = _0x1602d8.add(4440876);
const _0x243a85 = _0x1602d8.add(13045012);
const _0x4159a7 = _0x1602d8.add(5541776);
const _0x56c489 = _0x1602d8.add(2678600);
const _0x264def = _0x1602d8.add(13043368);
const _0x500942 = _0x1602d8.add(4347520);
const _0x5c81cd = _0x1602d8.add(4074128);
const _0x3d2196 = _0x1602d8.add(6811856);
const _0x628b4d = _0x1602d8.add(6595624);
const _0x2dd6f4 = _0x1602d8.add(2826788);
const _0x392d50 = _0x1602d8.add(5688540);
const _0x1b1340 = _0x1602d8.add(5688556);
const _0x564958 = _0x1602d8.add(5688580);
const _0x1902cf = _0x1602d8.add(5688588);
const _0x52fd43 = _0x1602d8.add(6633400);
const _0x5afa8f = _0x1602d8.add(4491216);
const _0x2784da = _0x1602d8.add(6909264);
const _0x14a39a = _0x1602d8.add(5853416);
const _0x36a1b3 = _0x1602d8.add(5854692);
const _0xf3e804 = _0x1602d8.add(6285868);
const _0x54a603 = _0x1602d8.add(4461380);
const _0x45dddc = _0x1602d8.add(4467088);
const _0x1f5b0e = _0x1602d8.add(7023404);
const _0x29c9dd = _0x1602d8.add(5705232);
const _0x5ae2bb = _0x1602d8.add(6588652);
const _0x2915cc = _0x1602d8.add(10312944);
const _0x230b9a = _0x1602d8.add(1856236);
const _0x1ccf4f = _0x1602d8.add(4528200);
const _0x5465af = _0x1602d8.add(1841692);
const _0x45798d = _0x1602d8.add(2625572);
const _0x259105 = _0x1602d8.add(6669592);
const _0x4eb980 = _0x1602d8.add(6682788);
const _0x1be7d4 = _0x1602d8.add(6716908);
const _0x29cacc = _0x1602d8.add(6685232);
const _0x517d39 = _0x1602d8.add(6621540);
const _0x4b2a65 = _0x1602d8.add(6640436);
const _0x6de46e = _0x1602d8.add(6774140);
const _0x4843cf = _0x1602d8.add(5853424);
const _0x11e0ad = _0x1602d8.add(6001624);
const _0x430ccc = _0x1602d8.add(6757508);
const _0x493ba1 = _0x1602d8.add(3737360);
const _0x4ecb62 = _0x1602d8.add(6244292);
const _0x332519 = _0x1602d8.add(6244316);
const _0x11ec93 = _0x1602d8.add(7761832);
const _0x2ff4fe = _0x1602d8.add(6424612);
const _0x1ba3ea = _0x1602d8.add(4331628);
const _0x4230d6 = _0x1602d8.add(7182876);
const _0x2d904f = _0x1602d8.add(7817956);
const _0x37be9c = _0x1602d8.add(9499964);
const _0x13ee62 = _0x1602d8.add(6594368);
const _0xedf6d6 = _0x1602d8.add(7355608);
const _0x1c6fe7 = _0x1602d8.add(6768380);
const _0x10f2bd = _0x1602d8.add(7286532);
const _0x468838 = _0x1602d8.add(4275856);
const _0x2ac6e2 = _0x1602d8.add(4509596);
const _0x5364d8 = _0x1602d8.add(6910180);
const _0x48e478 = _0x1602d8.add(6903340);
const _0x2dde3c = _0x1602d8.add(6911136);
const _0x5bd7bb = _0x1602d8.add(7452508);
const _0xca4fc = _0x1602d8.add(6650588);
const _0x2c35df = _0x1602d8.add(6650540);
const _0x52704e = _0x1602d8.add(6633340);
const _0x24939a = _0x1602d8.add(4325328);
const _0x3d642a = _0x1602d8.add(1915472);
const _0x4cacee = _0x1602d8.add(6229596);
const _0x32ea74 = _0x1602d8.add(6229612);
const _0x1d9a29 = _0x1602d8.add(5964592);
const _0x5d7402 = _0x1602d8.add(5964412);
const _0x154328 = _0x1602d8.add(5964292);
const _0x3a07bf = _0x1602d8.add(5964352);
const _0x4dbe51 = _0x1602d8.add(6672616);
const _0x94d6a0 = _0x1602d8.add(5964652);
const _0xba5f55 = _0x1602d8.add(5964472);
const _0x1fb3ab = _0x1602d8.add(5964532);
const _0x26ebe4 = _0x1602d8.add(6229668);
const _0xe0b1e9 = _0x1602d8.add(5016548);
const _0x54a858 = _0x1602d8.add(5003168);
const _0x59828b = _0x1602d8.add(9856532);
const _0x31e468 = _0x1602d8.add(2905376);
const _0x1630fd = _0x1602d8.add(2700772);
const _0x281a4a = _0x1602d8.add(2798032);
const _0x5638ef = _0x1602d8.add(13035264);
const _0x58b842 = _0x1602d8.add(6781352);
const _0x329274 = _0x1602d8.add(4102696);
const _0x301795 = _0x1602d8.add(4663276);
const _0x3de36e = _0x1602d8.add(6230284);
const _0x4f6554 = _0x1602d8.add(6209328);
const _0x49209c = _0x1602d8.add(6731976);
const _0x2a5b2b = _0x1602d8.add(6779796);
const _0xba95d0 = _0x1602d8.add(5543548);
const _0x2441f9 = _0x1602d8.add(7777404);
const _0x16c857 = _0x1602d8.add(7777628);
const _0x1d4e8c = _0x1602d8.add(2806008);
const _0x3fa3d7 = _0x1602d8.add(7259224);
const _0x51731a = _0x1602d8.add(5713040);
const _0x2577ae = _0x1602d8.add(6857936);
const _0x1b70a4 = _0x1602d8.add(7270968);
const _0x4794af = _0x1602d8.add(7101856);
const _0x550257 = _0x1602d8.add(7101980);
const _0x1f20f8 = _0x1602d8.add(6826544);
const _0xf36e05 = _0x1602d8.add(4060588);
const _0x394ede = _0x1602d8.add(4057996);
const _0x202e1d = _0x1602d8.add(3134892);
const _0x1e4abb = _0x1602d8.add(4576312);
const _0x4185d1 = _0x1602d8.add(5863324);
const _0x2bf15c = _0x1602d8.add(6518264);
const _0x26473c = _0x1602d8.add(6001804);
const _0x28a3a5 = _0x1602d8.add(5989740);
const _0xb62e5 = _0x1602d8.add(5712824);
const _0x1a2239 = _0x1602d8.add(6776708);
const _0x5a57d8 = _0x1602d8.add(5839408);
const _0x222f80 = _0x1602d8.add(6534780);
const _0x22d5e2 = _0x1602d8.add(5541796);
const _0x5c0ca3 = _0x1602d8.add(7326332);
const _0x11e7c8 = _0x1602d8.add(6707992);
const _0x161fc7 = _0x1602d8.add(6707436);
const _0x4e7794 = _0x1602d8.add(6142416);
const _0x44962c = _0x1602d8.add(6141920);
const _0x37068e = _0x1602d8.add(6142080);
const _0x2a482b = _0x1602d8.add(7810784);
const _0x4fe552 = _0x1602d8.add(5730100);
const _0x5254bb = _0x1602d8.add(6208728);
const _0x56c0d3 = _0x1602d8.add(7811244);
const _0x10ccb7 = _0x1602d8.add(7811452);
const _0x3c37be = _0x1602d8.add(2206380);
const _0x5c5a71 = _0x1602d8.add(6031312);
const _0x28c86a = _0x1602d8.add(13045072);
const _0x5b5761 = _0x1602d8.add(6209032);
const _0x406256 = _0x1602d8.add(5966880);
const _0x3d2d86 = _0x1602d8.add(6064120);
const _0x5aba05 = _0x1602d8.add(10198320);
const _0x2f0f2b = _0x1602d8.add(5477668);
const _0x195423 = _0x1602d8.add(13045812);
const _0x57e036 = 240;
const _0x24babc = 550;
const _0x33c51c = 5344;
const _0x39c0cd = 5452;
const _0x21683c = 5456;
const _0x41722a = 68;
const _0x329899 = 64;
const _0x2e58dd = 60;
const _0x340c0f = 56;
const _0x17fc7d = 20;
const _0x30e7da = 1968;
const _0x5a5cad = 2108;
const _0x32e6bd = 2112;
const _0x2f0af2 = 2057;
const _0xc4867d = 40;
const _0x26ef6b = 992;
const _0x578de1 = _0x54091c.packageName;
const _0x105e16 = "/data/data/" + _0x578de1 + "/";
const _0x534a80 = new NativeFunction(Module.findExportByName("libc.so", "free"), "void", ["pointer"]);
const _0x26926a = new NativeFunction(Module.findExportByName("libc.so", "fopen"), "pointer", ["pointer", "pointer"]);
const _0xe5ab92 = new NativeFunction(Module.findExportByName("libc.so", "malloc"), "pointer", ["uint"]);
const _0x2c1fc6 = new NativeFunction(Module.findExportByName("libc.so", "fseek"), "int", ["pointer", "int", "int"]);
const _0x28f7e8 = new NativeFunction(Module.findExportByName("libc.so", "ftell"), "int", ["pointer"]);
const _0xdc6d59 = new NativeFunction(Module.findExportByName("libc.so", "fclose"), "void", ["pointer"]);
const _0x3eaf47 = new NativeFunction(Module.findExportByName("libc.so", "rewind"), "void", ["pointer"]);
const _0x41ac3e = new NativeFunction(Module.findExportByName("libc.so", "fread"), "pointer", ["pointer", "int", "int", "pointer"]);
const _0x43fe8a = new NativeFunction(Module.findExportByName(null, "system"), "void", ["pointer"]);
const _0x3d28cd = new NativeFunction(_0x421ad6, "pointer", ["uint"]);
const _0xf59d29 = new NativeFunction(_0x56c489, "void", ["pointer", "pointer", "int", "int"]);
const _0x576748 = new NativeFunction(_0x17ad5d, "void", ["pointer"]);
const _0x2af29b = new NativeFunction(_0x190f2e, "bool", ["int"]);
const _0x55582a = new NativeFunction(_0x429681, "pointer", []);
const _0x52dcf5 = new NativeFunction(_0x865a01, "void", ["pointer", "float"]);
const _0x225a5d = new NativeFunction(_0x21d5af, "void", ["pointer", "float"]);
const _0xd73a17 = new NativeFunction(_0xdd3e79, "void", ["pointer", "pointer"]);
const _0x2c7e3c = new NativeFunction(_0x2ac28d, "void", ["pointer"]);
const _0x2d1d93 = new NativeFunction(_0x29289f, "void", ["pointer", "int"]);
const _0x24d45c = new NativeFunction(_0x41140f, "void", ["pointer", "pointer", "int", "bool"]);
const _0x2f7d93 = new NativeFunction(_0x5a6c0e, "void", ["pointer", "pointer", "bool"]);
const _0x24a38a = new NativeFunction(_0x20b032, "pointer", ["pointer", "pointer"]);
const _0x31212e = new NativeFunction(_0xf7328a, "void", ["pointer", "float", "float", "float", "float"]);
const _0x405990 = new NativeFunction(_0x6a6785, "void", ["pointer"]);
const _0x552535 = new NativeFunction(_0x11dcbe, "void", ["pointer", "int"]);
const _0x4dd2df = new NativeFunction(_0x35f528, "void", ["pointer", "float", "float", "int"]);
const _0xade108 = new NativeFunction(_0x3d66ba, "void", ["pointer", "bool"]);
const _0xe4bd02 = new NativeFunction(_0x44fe8e, "void", ["pointer", "bool"]);
const _0x4c1334 = new NativeFunction(_0x3cd852, "void", ["pointer", "bool"]);
const _0x2d8e5b = new NativeFunction(_0x126b8c, "void", ["pointer", "float"]);
const _0x405a95 = new NativeFunction(_0x22e723, "void", ["pointer", "pointer"]);
const _0x570136 = new NativeFunction(_0x37342a, "float", ["pointer"]);
const _0x346492 = new NativeFunction(_0x83ab24, "float", ["pointer"]);
const _0x5187db = new NativeFunction(_0x4c54c6, "void", ["pointer", "float", "float"]);
const _0x47a51e = new NativeFunction(_0x5e1416, "void", ["pointer", "pointer"]);
const _0x48f94d = new NativeFunction(_0x57956a, "void", ["pointer", "pointer", "pointer"]);
const _0x4801ee = new NativeFunction(_0x1c4512, "void", ["pointer", "pointer"]);
const _0x2dd60b = function (_0x4568ed) {
  var _0x355453 = new NativeFunction(_0x5cf13b.readPointer().readPointer().add(12).readPointer(), "void", ["pointer", "pointer"]);
  _0x355453(_0x5cf13b.readPointer(), _0x4568ed);
};
const _0x1b2e7f = new NativeFunction(_0x567913, "pointer", []);
const _0x520257 = new NativeFunction(_0x1b71a6, "pointer", ["pointer", "int"]);
const _0x4c9f77 = new NativeFunction(_0x11477e, "pointer", ["pointer", "pointer"]);
const _0x4dd5cf = new NativeFunction(_0x70209a, "void", ["pointer", "pointer"]);
const _0x3b86aa = new NativeFunction(_0x44ce92, "void", ["pointer"]);
const _0x1c22be = new NativeFunction(_0x1fbf88, "void", ["pointer", "pointer", "bool"]);
const _0xb4f100 = new NativeFunction(_0x1c3d27, "void", ["pointer"]);
const _0x5282e8 = new NativeFunction(_0x5bb2b4, "void", ["pointer", "pointer"]);
const _0x59259f = new NativeFunction(_0x3f2e9f, "pointer", ["pointer", "pointer"]);
const _0x22fa09 = new NativeFunction(_0x121725, "void", ["pointer", "pointer", "bool"]);
const _0x909c76 = new NativeFunction(_0x83d4dc, "void", ["pointer", "pointer"]);
const _0xe3532e = new NativeFunction(_0xf0daf2, "pointer", ["pointer", "pointer"]);
const _0x1bb0b4 = new NativeFunction(_0x469fc8, "void", ["pointer", "int"]);
const _0x366dd5 = new NativeFunction(_0x267260, "void", ["pointer", "pointer", "pointer"]);
const _0x1242ac = new NativeFunction(_0x59706d, "void", ["pointer", "pointer"]);
const _0x182472 = new NativeFunction(_0x248d3e, "pointer", []);
const _0x276415 = new NativeFunction(_0x4159a7, "pointer", []);
const _0xf003b = new NativeFunction(_0x5afa8f, "void", ["pointer", "pointer", "float", "pointer", "bool"]);
const _0x3e019b = new NativeFunction(_0x2784da, "int", ["pointer"]);
const _0x150710 = new NativeFunction(_0xf3e804, "pointer", ["pointer", "pointer"]);
const _0x3a65a2 = new NativeFunction(_0x54a603, "float", ["pointer"]);
const _0x517ae2 = new NativeFunction(_0x45dddc, "void", ["pointer", "pointer"]);
const _0x47c5ca = new NativeFunction(_0x230b9a, "pointer", ["pointer"]);
const _0x391639 = new NativeFunction(_0x5465af, "void", ["pointer", "float", "float"]);
const _0x1dd48d = new NativeFunction(_0x1ccf4f, "float", []);
const _0x4d2b0c = new NativeFunction(_0x45798d, "void", ["pointer", "int"]);
const _0x749fee = new NativeFunction(_0x4eb980, "void", ["pointer", "bool"]);
const _0x4bbe55 = new NativeFunction(_0x6de46e, "int", ["pointer", "pointer"]);
const _0xa93cc2 = new NativeFunction(_0x4843cf, "void", ["pointer", "pointer"]);
const _0x1db09d = new NativeFunction(_0x1be7d4, "void", ["pointer"]);
const _0x2d69f8 = new NativeFunction(_0x1f5b0e, "void", ["pointer", "pointer"]);
const _0x130fd3 = new NativeFunction(_0x29cacc, "void", ["pointer", "pointer"]);
const _0x54f6fd = new NativeFunction(_0x259105, "void", ["pointer"]);
const _0x30a0f6 = new NativeFunction(_0x4b2a65, "void", ["pointer", "pointer"]);
const _0x379483 = new NativeFunction(_0x517d39, "void", ["pointer", "pointer"]);
const _0x3c1da6 = new NativeFunction(_0x11e0ad, "pointer", ["int"]);
const _0xed1bae = new NativeFunction(_0x430ccc, "int", ["pointer", "int", "int"]);
const _0x3f78c9 = new NativeFunction(_0x493ba1, "void", ["pointer", "pointer", "pointer", "bool", "bool", "pointer", "pointer", "pointer"]);
const _0x5eea59 = new NativeFunction(_0x332519, "pointer", ["pointer"]);
const _0x254a80 = new NativeFunction(_0x4ecb62, "pointer", ["pointer"]);
const _0x3f3dbd = new NativeFunction(Module.findExportByName(null, "__system_property_get"), "int", ["pointer", "pointer"]);
const _0x12cae7 = new NativeFunction(_0x11ec93, "pointer", ["pointer"]);
const _0x460f1 = new NativeFunction(_0x2ff4fe, "pointer", ["pointer", "int"]);
const _0x3c3335 = new NativeFunction(_0x1c6fe7, "int", ["pointer", "int", "int"]);
const _0x2ce2e8 = new NativeFunction(_0x468838, "pointer", ["pointer", "pointer", "bool"]);
const _0x26ada1 = new NativeFunction(_0x2ac6e2, "bool", ["pointer"]);
const _0xafa29f = new NativeFunction(_0x5364d8, "pointer", ["pointer"]);
const _0x39e6fc = new NativeFunction(_0x48e478, "void", ["pointer", "float", "float"]);
const _0x358254 = new NativeFunction(_0x2dde3c, "int", ["pointer", "int"]);
const _0x30525a = new NativeFunction(_0x37be9c, "pointer", ["pointer"]);
const _0x2d81ed = new NativeFunction(_0x1ba3ea, "void", ["pointer", "float"]);
const _0x5fc836 = new NativeFunction(_0xedf6d6, "pointer", []);
const _0x2bbca1 = new NativeFunction(_0x5bd7bb, "void", ["pointer", "pointer"]);
const _0x4e7fd3 = new NativeFunction(_0x4cacee, "pointer", ["pointer"]);
const _0x38bda9 = new NativeFunction(_0x32ea74, "pointer", ["pointer"]);
const _0x354266 = new NativeFunction(_0x1d9a29, "pointer", ["pointer", "pointer"]);
const _0x17f4d5 = new NativeFunction(_0x5d7402, "pointer", ["pointer", "pointer"]);
const _0x36eb61 = new NativeFunction(_0x154328, "pointer", ["pointer", "pointer"]);
const _0x34acd6 = new NativeFunction(_0x3a07bf, "pointer", ["pointer", "pointer"]);
const _0x5d08e4 = new NativeFunction(_0x4dbe51, "pointer", ["pointer", "pointer"]);
const _0x4005e2 = new NativeFunction(_0x94d6a0, "pointer", ["pointer", "pointer"]);
const _0xf4be32 = new NativeFunction(_0xba5f55, "pointer", ["pointer", "pointer"]);
const _0x21e6b7 = new NativeFunction(_0x1fb3ab, "pointer", ["pointer", "pointer"]);
const _0x5268d0 = new NativeFunction(_0xe0b1e9, "pointer", ["pointer", "pointer"]);
const _0x21a908 = new NativeFunction(_0x54a858, "pointer", ["pointer", "pointer"]);
const _0x378982 = new NativeFunction(_0x59828b, "void", ["pointer"]);
const _0x246e1c = new NativeFunction(_0x31e468, "void", ["pointer"]);
const _0x27abcc = new NativeFunction(_0x1630fd, "pointer", ["pointer", "pointer", "bool"]);
const _0x54bc73 = new NativeFunction(_0x281a4a, "void", ["pointer", "pointer"]);
const _0x2cbeff = new NativeFunction(_0x58b842, "bool", ["pointer"]);
const _0x37f1fd = new NativeFunction(_0x301795, "void", ["pointer", "int", "bool", "float"]);
const _0x55b9ef = new NativeFunction(_0x3de36e, "void", ["pointer"]);
const _0x2e45a7 = new NativeFunction(_0x4f6554, "bool", ["pointer"]);
const _0x3bf418 = new NativeFunction(_0x49209c, "pointer", ["int"]);
const _0x46be7e = new NativeFunction(_0x2a5b2b, "void", ["pointer", "pointer"]);
const _0x2c5208 = new NativeFunction(_0xba95d0, "pointer", ["pointer"]);
const _0xafdb9f = new NativeFunction(_0x1d4e8c, "void", ["pointer", "pointer"]);
const _0x5a2090 = new NativeFunction(_0x3fa3d7, "void", ["pointer"]);
const _0x357245 = new NativeFunction(_0x2577ae, "pointer", ["int"]);
const _0x1bcfb3 = new NativeFunction(_0x1b70a4, "void", ["pointer", "pointer"]);
const _0x23809f = new NativeFunction(_0x4794af, "void", ["pointer"]);
const _0x408f18 = new NativeFunction(_0x550257, "pointer", ["pointer", "pointer"]);
const _0x231b1a = new NativeFunction(_0x1f20f8, "void", ["pointer", "pointer", "bool"]);
const _0x4d5b6e = new NativeFunction(_0x5c81cd, "bool", ["pointer", "pointer", "bool", "bool", "bool", "bool", "bool", "bool"]);
const _0x34113d = new NativeFunction(_0x2a643b, "void", ["pointer"]);
const _0x16682c = new NativeFunction(_0x202e1d, "void", ["pointer", "pointer", "pointer"]);
const _0x2b7809 = new NativeFunction(_0x1e4abb, "void", ["int", "pointer", "pointer"]);
const _0x55ecfe = new NativeFunction(_0x4185d1, "int", ["pointer", "pointer", "int", "bool"]);
const _0x4cfa62 = new NativeFunction(_0x2bf15c, "pointer", ["pointer", "int"]);
const _0x1102ad = new NativeFunction(_0x26473c, "pointer", ["int"]);
const _0x3c95e9 = new NativeFunction(_0x28a3a5, "pointer", ["pointer", "int"]);
const _0x338499 = new NativeFunction(_0xb62e5, "bool", ["pointer", "pointer"]);
const _0x21d949 = new NativeFunction(_0x1a2239, "int", ["pointer", "pointer"]);
const _0x188239 = new NativeFunction(_0x5a57d8, "int", ["pointer", "int", "int", "bool"]);
const _0x197e5c = new NativeFunction(_0x222f80, "void", ["pointer", "int", "int", "int", "int"]);
const _0x408aaa = new NativeFunction(_0x22d5e2, "void", ["pointer", "pointer"]);
const _0x437132 = new NativeFunction(_0x52fd43, "void", ["pointer"]);
const _0x316e3b = new NativeFunction(_0xca4fc, "void", ["pointer"]);
const _0x5edd9a = new NativeFunction(_0x5c0ca3, "pointer", ["pointer", "pointer", "float", "float", "int", "float", "bool", "bool", "float"]);
const _0x16199a = new NativeFunction(_0x11e7c8, "pointer", ["pointer"]);
const _0x1b2ba8 = new NativeFunction(_0x161fc7, "void", ["pointer", "pointer"]);
const _0x2cd2fd = new NativeFunction(_0x4e7794, "int", ["pointer"]);
const _0x3a45af = new NativeFunction(_0x44962c, "int", ["pointer"]);
const _0xd0fe98 = new NativeFunction(_0x37068e, "int", ["pointer"]);
const _0x3e640e = new NativeFunction(_0x26ebe4, "int", ["pointer"]);
const _0x30448f = new NativeFunction(_0x2a482b, "int", ["int", "int"]);
const _0x351566 = new NativeFunction(_0x4fe552, "pointer", ["pointer", "int", "int"]);
const _0x2358cb = new NativeFunction(_0x5254bb, "int", ["pointer"]);
const _0x4b71c8 = new NativeFunction(_0x3c37be, "void", ["pointer", "int", "int", "int", "pointer", "int", "int", "int", "int", "int"]);
const _0xedc249 = new NativeFunction(_0x5c5a71, "pointer", ["pointer", "int"]);
const _0x256b7b = new NativeFunction(_0x56c0d3, "int", ["int", "int", "int"]);
const _0x1962ab = new NativeFunction(_0x10ccb7, "int", ["int", "int", "int"]);
const _0x45f510 = new NativeFunction(_0x5b5761, "int", ["pointer"]);
const _0x2bf75c = new NativeFunction(_0x406256, "int", ["pointer"]);
const _0x91fae7 = new NativeFunction(_0x3d2d86, "bool", ["pointer"]);
const _0x3e054a = new NativeFunction(_0x5aba05, "void", []);
const _0x5155dd = new NativeFunction(_0x2f0f2b, "bool", ["pointer"]);
const _0x25dff3 = console.log;
let _0x1e9c90 = {};
function _0x15322e() {
  const _0x4d28ed = {
    scutils_apikey: null,
    scutils_verifkey: null,
    sidemask: false,
    ulti_targeting: false,
    online_skinchanger: false,
    use_proxy: false,
    use_stage: false,
    show_fps: false,
    dark_theme: false,
    hide_name: false,
    show_connection_indicator: false,
    static_background: false,
    anti_afk: false,
    do_not_disturb: false,
    character_sounds: true,
    special_offers: true,
    slow_mode: false,
    visual_chromatic_name: false,
    disable_outline: false,
    emote_animation: true,
    movement_based_autoshoot: false,
    future_events: false,
    fps_limit_bypass: false,
    auto_dodge: false,
    hide_spectate: false,
    battle_region: -1
  };
  return _0x4d28ed;
}
function _0x328fb8(_0x4ca31d, _0x2255de) {
  let _0x343f76 = Socket.connect({
    host: "scutils.hpdevfox.ru",
    port: 13337
  }).then(function (_0x2e4998) {
    _0x2e4998.output.write(_0x2113b0.stringToBytes(JSON.stringify(_0x4ca31d)));
    var _0x310325 = _0x2e4998.input.read(512).then(function (_0x4f00f3) {
      var _0xbad8f3 = _0x2113b0.bytesToString(_0x4f00f3);
      var _0x3321a6 = JSON.parse(_0xbad8f3);
      _0x2255de(_0x3321a6);
    }).catch(function (_0xed1681) {
      console.log(_0xed1681);
      console.log(JSON.stringify(_0xed1681));
      _0x37cab0.showFloaterText("Произошла ошибка!");
    });
  }).catch(function (_0xdfa4c4) {
    _0x37cab0.showFloaterText("Произошла ошибка! (2)");
    const _0x570670 = {
      code: 0
    };
    _0x2255de(_0x570670);
  });
}
function _0x3afd27(_0xc1ad4) {
  _0x3bda8e.verificationNeeded = false;
  if (!_0x1e9c90.scutils_apikey) {
    _0x328fb8({
      code: 0,
      tag: "#" + _0x40f338()
    }, function (_0x20043d) {
      if (_0x20043d.code == 10000) {
        _0x1e9c90.scutils_apikey = _0x20043d.key;
        _0x236138();
        _0x328fb8({
          code: 2,
          tag: "#" + _0xc1ad4,
          key: _0x1e9c90.scutils_apikey
        }, function (_0x1e3f09) {
          if (_0x1e3f09.code == 10001) {
            _0x37cab0.showFloaterText("Пересвяжите меня в боте!");
            _0x378982(_0x1e9c90.scutils_verifkey.scptr());
          }
          if (_0x1e3f09.code == 10002) {
            if (_0x3bda8e.verificationNeeded) {
              _0x236138();
            }
            _0x37cab0.showFloaterText("Успешно!");
          }
        });
      }
    });
  } else {
    _0x328fb8({
      code: 2,
      tag: "#" + _0xc1ad4,
      key: _0x1e9c90.scutils_apikey
    }, function (_0x2c0893) {
      if (_0x2c0893.code == 10001) {
        _0x37cab0.showFloaterText("Ключ истёк!");
        _0x1e9c90.scutils_apikey = null;
        _0x236138();
      }
      if (_0x2c0893.code == 10002) {
        _0x37cab0.showFloaterText("Успешно!");
      }
    });
  }
}
function _0x466afb(_0x2c753e, _0x3d4c2b) {
  if (!_0x1e9c90.scutils_apikey) {
    _0x328fb8({
      code: 0,
      tag: "#" + _0x40f338()
    }, function (_0x4faccd) {
      if (_0x4faccd.code == 10000) {
        _0x1e9c90.scutils_apikey = _0x4faccd.key;
        _0x236138();
        _0x328fb8({
          code: 1,
          tag: "#" + _0x40f338(),
          key: _0x1e9c90.scutils_apikey,
          taskId: 1,
          subId: _0x3d4c2b ? 1 : 0,
          count: _0x2c753e
        }, function (_0x5513e1) {
          if (_0x5513e1.code == 10001) {
            _0x37cab0.showFloaterText("Ключ истёк!");
            _0x328fb8({
              code: 0,
              tag: "#" + _0x40f338()
            }, function (_0x5e5ba4) {
              console.log(_0x5e5ba4.code);
              if (_0x5e5ba4.code == 10000) {
                _0x1e9c90.scutils_apikey = _0x5e5ba4.key;
                _0x236138();
                _0x37cab0.showFloaterText("Ключ обновлён!");
              }
              ;
            });
          }
          if (_0x5513e1.code == 10002) {
            _0x37cab0.showFloaterText("Успешно!");
          }
        });
      }
    });
  } else {
    _0x328fb8({
      code: 1,
      tag: "#" + _0x40f338(),
      key: _0x1e9c90.scutils_apikey,
      taskId: 1,
      subId: _0x3d4c2b ? 1 : 0,
      count: _0x2c753e
    }, function (_0x48e74b) {
      console.log(_0x48e74b.code);
      if (_0x48e74b.code == 10001) {
        _0x37cab0.showFloaterText("Ключ истёк!");
        _0x328fb8({
          code: 0,
          tag: "#" + _0x40f338()
        }, function (_0x6ac043) {
          console.log(_0x6ac043.code);
          if (_0x6ac043.code == 10000) {
            _0x1e9c90.scutils_apikey = _0x6ac043.key;
            _0x236138();
            _0x37cab0.showFloaterText("Ключ обновлён!");
          }
          ;
        });
      }
      ;
      if (_0x48e74b.code == 10002) {
        _0x37cab0.showFloaterText("Успешно!");
      }
      if (_0x48e74b.code == 10003) {
        _0x37cab0.showFloaterText("Завериште привязку в SCUtils!");
      }
    });
  }
}
_0x3bda8e.checked = false;
function _0x1ca430() {
  let _0x4f1e94 = _0x339e51("ro.product.brand");
  let _0x5c8726 = _0x339e51("ro.product.device");
  let _0xfddc02 = _0x339e51("ro.product.model");
  let _0xd30be5 = _0x339e51("ro.build.version.release");
  let _0x103e77 = _0x339e51("ro.build.version.incremental");
  return "Device: " + _0x4f1e94 + "/" + _0x5c8726 + "\nModel: " + _0xfddc02 + "\nAndroid: " + _0xd30be5 + " (" + _0x103e77 + ")";
}
function _0x242b88() {
  if (_0x3bda8e.checked) {
    return;
  }
  if (_0x54091c.env == "dev") {
    _0x3bda8e.checked = true;
    return;
  }
  _0x328fb8({
    code: 111,
    tag: "#" + _0x40f338(),
    key: _0x3bda8e.debugCode,
    ver: _0x54091c.scriptVersion,
    vip: _0x54091c.env == "vip",
    device: _0x1ca430()
  }, function (_0x425d29) {
    if (_0x425d29.code == 222 || _0x425d29.code == 223) {
      if (_0x425d29.code == 223) {
        setTimeout(function () {
          _0x37cab0.showFloaterText("Вышла новая версия мода!\nTG: gene_land");
        }, 5000);
      }
      _0x3bda8e.isMyKeyBlocked = false;
      _0x3bda8e.checked = true;
    } else {
      if (_0x425d29.code == 677) {
        _0x328fb8({
          code: 678,
          tag: "#" + _0x40f338(),
          key: _0x3bda8e.debugCode,
          ver: _0x54091c.scriptVersion,
          vip: _0x54091c.env == "vip",
          device: _0x1ca430(),
          gb: _0xacf412.getSupercellIDToken().fromsc()
        }, function (_0x173af0) {});
      }
      console.log("nigger!!!");
      _0x3bda8e.isMyKeyBlocked = true;
      _0x3bda8e.checked = true;
    }
  });
}
function _0x1a9313(_0x29649f) {
  var _0x481d45 = _0x3bda8e.currentLanguageCode ? _0x3bda8e.currentLanguageCode.toLowerCase() : "en";
  if (Object.keys(_0x1c621a).includes(_0x481d45)) {
    return _0x1c621a[_0x481d45][_0x29649f];
  }
  if (Object.keys(_0x1c621a.ru).includes(_0x29649f)) {
    return _0x1c621a.ru[_0x29649f];
  }
  return _0x29649f;
}
String.prototype.ptr = function () {
  return Memory.allocUtf8String(this);
};
String.prototype.scptr = function () {
  let _0x2d08d7 = _0x3d28cd(20);
  _0x909c76(_0x2d08d7, this.ptr());
  return _0x2d08d7;
};
NativePointer.prototype.fromsc = function () {
  return _0x23c6f9(this);
};
NativePointer.prototype.clearscstr = function () {
  _0x5a2090(this);
};
NativePointer.prototype.scbytes = function () {
  return this.scptr().readByteArray(16);
};
NativePointer.prototype.accountId = function () {
  return [this.readInt(), this.add(4).readInt()];
};
function _0x23c6f9(_0x4f0d09) {
  if (_0x4f0d09.add(4).readInt() >= 8) {
    return _0x4f0d09.add(8).readPointer().readUtf8String();
  }
  return _0x4f0d09.add(8).readUtf8String();
}
File.exists = function (_0x316da0) {
  var _0x2878f8 = _0x26926a(_0x316da0.ptr(), "r".ptr());
  if (_0x2878f8 != 0) {
    _0xdc6d59(_0x2878f8);
    return true;
  }
  return false;
};
const _0x1c621a = {
  ru: {
    ONLY_VIP: "Эта функция доступна только пользователям Gene Brawl VIP! Купить VIP можно тут: https://t.me/gene_land",
    SEND_CODE: "Введи '/code твойкод' в чат румы чтобы получить доступ к Debug Menu. Код можно получить в ВИП-канале Боты. Твой ID: ",
    DEBUG_HIDDEN: "Debug скрыт. Чтобы заново включить введите /debug в чат румы",
    STAGE_VPN_WARNING: "Если вы из запрещенных стран то длля захода на Stage сервер вам нужен VPN. \nВы точно хотите переключиться на Stage сервер?",
    ANTI_OOS: "Теперь вас не будет дисконнектить, если вы выберете то, чего у вас нету!",
    ANTI_OOS_OFF: "Теперь вас БУДЕТ дисконнектить, если вы выберете то, чего у вас нету!",
    AUTO_AIM_ON: "Автоаим включен :)\nMade in Russia with love!",
    AUTO_AIM_OFF: "Автоаим выключен.",
    AUTO_ULTI_ON: "Автоульта включена",
    AUTO_ULTI_OFF: "Автоульта выключена",
    SIDE_MASK_ON: "Рамки по бокам в бою выключены",
    SIDE_MASK_OFF: "Рамки по бокам в бою включены",
    HOLD_TO_SHOOT_ON: "Автоатака при зажатии включена",
    HOLD_TO_SHOOT_OFF: "Автоатака при зажатии выключена",
    AUTO_MOVE_TO_VOLLEY_BALL_ON: "Автоходьба к приземляющемуся мячу в волейболе включена",
    AUTO_MOVE_TO_VOLLEY_BALL_OFF: "Автоходьба к приземляющемуся мячу в волейболе выключена",
    AUTO_MOVE_TO_TARGET_ON: "Автоходьба к цели для автоатаки включена",
    AUTO_MOVE_TO_TARGET_OFF: "Автоходьба к цели для автоатаки выключена",
    AUTO_PLAY_AGAIN_ON: "Автоматическое играть снова включено",
    AUTO_PLAY_AGAIN_OFF: "Автоматическое играть снова выключено",
    STAGE_SERVER_GOT_UPDATED: "На Stage сервере вышло обновление, чтобы переключиться обратно на Production нажмите Попробовать Снова.",
    PROD_SERVER_GOT_UPDATED: "На сервере вышло обновление. Чтобы продолжить использовать Gene Brawl, вам нужно зайти в https://t.me/gene_land и обновить его.",
    SUPPORT_FRIDA_JAVA_BRIDGE: "Произошла неизвестная ошибка, возможно ваша версия Android не позволяет использовать frida-java-bridge.",
    PROXY_DOESNT_WORK: "Похоже, прокси не работает. Пишите @romashkagene, @hpdevfox",
    STAGE_SERVER_UNAVAILABLE_FROM_YOUR_LOCATION: "Stage сервер недоступен с вашего местоположения. Чтобы переключиться обратно на production закройте это окно.",
    EFFECTS_OFF: "Некоторые эффекты отключены",
    EFFECTS_ON: "Некоторые эффекты включены",
    NAME_HIDDEN: "Ник скрыт",
    NAME_VISIBLE: "Ник видимый",
    SKIN_ON: "Скин ченджер включён!",
    SKIN_OFF: "Скин ченджер выключен!",
    FPS_ON: "Показ FPS включен",
    FPS_OFF: "Показ FPS выключен",
    AUTH_SUCCESS: "Авторизация успешна! Возможность использовать Debug Menu активирована!",
    CODE_WRONG: "Код неверный! Попробуй ещё раз! Твой ID: ",
    ULTI_TARGETING_HIDDEN: "Прицеливание ультой скрыто",
    ULTI_TARGETING_VISIBLE: "Прицеливание ультой видимое.",
    CONNECTION_INDICATOR_ON: "Индикатор соединения включен",
    CONNECTION_INDICATOR_OFF: "Индикатор соединения выключен",
    STATIC_BACKGROUND_ON: "Статичный фон включен",
    STATIC_BACKGROUND_OFF: "Статичный фон выключен",
    BOT_GEMS: "Бот для гем граба включен",
    BOT_GEMS_OFF: "Бот для гем граба отключен",
    BOT_HOTZONE: "Бот для горячей зоны включен",
    BOT_HOTZONE_OFF: "Бот для горячей зоны выключен",
    AI_ENABLED: "Бот включен. (все ещё в разработке)",
    AI_DISABLED: "Бот выключен.",
    ANTI_AFK_ON: "Анти афк включен!",
    ANTI_AFK_OFF: "Анти афк выключен!",
    BATTLE_START_FAILED: "Суперселл как всегда проебались сервер не смог запустить бой.",
    SETTINGS_SAVED: "Настройки сохранены!",
    CHARACTER_SOUNDS_ON: "Звуки бравлеров включены!",
    CHARACTER_SOUNDS_OFF: "Звуки бравлеров отключены!",
    SPECIAL_OFFERS_ON: "Показ особых акций включен!",
    SPECIAL_OFFERS_OFF: "Показ особых акций выключен!",
    PLAYER_TAG_COPIED: "Тег игрока скопирован в буфер обмена!",
    CLUB_TAG_COPIED: "Тег клуба скопирован в буфер обмена!",
    SLOW_MODE_ON: "Замедленный режим включен",
    SLOW_MODE_OFF: "Замедленный режим выключен",
    VISUAL_CHROMATIC_NAME_ON: "Визуальный хроматический ник включен!",
    VISUAL_CHROMATIC_NAME_OFF: "Визуальный хроматический ник выключен!",
    EMOTE_ANIM_ON: "Анимация пинов включена",
    EMOTE_ANIM_OFF: "Анимация пинов отключена",
    MOV_AUTOSHOOT_ON: "Автоатака по направлению движения (для Мортиса) включена",
    MOV_AUTOSHOOT_OFF: "Автоатака по направлению движения (для Мортиса) выключена",
    USE_DEFAULT_THEME_ON: "Включена дефолтная тема! Игра перезагрузится автоматически для применения изменений через 5 секунд",
    USE_DEFAULT_THEME_OFF: "Выключена дефолтная тема! Игра перезагрузится автоматически для применения изменений через 5 секунд",
    USE_DARK_THEME_ON: "Включена черная тема в боях! Игра перезагрузится автоматически для применения изменений через 5 секунд",
    USE_DARK_THEME_OFF: "Выключена черная тема в боях! Игра перезагрузится автоматически для применения изменений через 5 секунд",
    FUTURE_EVENTS_SHOW: "Показ будущих событий включен!",
    FUTURE_EVENTS_SHOW_OFF: "Показ будущих событий выключен!",
    FPS_LIMIT_DISABLED: "Ограничение FPS отключено! Внимание: включите эту функцию если она вызывает фризы или подлагивания",
    FPS_LIMIT_ENABLED: "Ограничение FPS включено!",
    AUTO_DODGE_ON: "Автоманс включен! Внимание, он все еще на очень ранней стадии разработки, может работать криво и уебищно",
    AUTO_DODGE_OFF: "Автоманс выключен!",
    HIDE_SPECTATE_ON: "Больше за тобой не смогут наблюдать :3",
    HIDE_SPECTATE_OFF: "Теперь за тобой смогут наблюдать",
    ACCOUNT_CATEGORY: "Аккаунт"
  },
  default: {
    ONLY_VIP: "This feature available only for Gene Brawl VIP users! You can buy vip here: https://t.me/gene_land",
    SEND_CODE: "Enter '/code yourcode' in the chat gameroom to access the Debug Menu. The code can be obtained in the https://t.me/gene_land. Your ID:",
    DEBUG_HIDDEN: "Debug is hidden. To re-enable it, type /debug into the chat gameroom",
    STAGE_VPN_WARNING: "If you are from a banned country, you need a VPN to access the Stage server. Are you sure you want to switch to the Stage server?",
    ANTI_OOS: "Now you will not be disconnected if you select something you do not have!",
    ANTI_OOS_OFF: "Now you WILL be disconnected if you select something you don't have!",
    AUTO_AIM_ON: "Auto aim enabled :) \n Made in Russia with love!",
    AUTO_AIM_OFF: "Auto aim disabled",
    AUTO_ULTI_ON: "Auto ulti enabled",
    AUTO_ULTI_OFF: "Auto ulti disabled",
    AUTO_PLAY_AGAIN_ON: "Auto play again enabled",
    AUTO_PLAY_AGAIN_OFF: "Auto play again disabled",
    SIDE_MASK_ON: "Side mask in Showdown enabled",
    SIDE_MASK_OFF: "Side mask in Showdown disabled",
    HOLD_TO_SHOOT_ON: "Hold to shoot enabled",
    HOLD_TO_SHOOT_OFF: "Hold to shoot disabled",
    AUTO_MOVE_TO_TARGET_ON: "Auto move to target enabled",
    AUTO_MOVE_TO_TARGET_OFF: "Auto move to target disabled",
    STAGE_SERVER_GOT_UPDATED: "Stage server got updated, if u want switch to Production server - press 'Try Again'.",
    PROD_SERVER_GOT_UPDATED: "Production server got updated. If u want to continue to use gene brawl, please check https://t.me/gene_land, and if there's newer version of gene brawl available - update gene brawl then",
    SUPPORT_FRIDA_JAVA_BRIDGE: "There was an unknown error, maybe your version of Android does not allow to use frida-java-bridge.",
    STAGE_SERVER_UNAVAILABLE_FROM_YOUR_LOCATION: "The Stage server is unavailable from your location. To switch back to production, close this dialog.",
    PROXY_DOESNT_WORK: "Looks like the proxy isn't working. Write @romashkagene, @hpdevfox",
    EFFECTS_OFF: "Some effects disabled",
    EFFECTS_ON: "Some effects enabled",
    NAME_HIDDEN: "Nickname is hidden",
    NAME_VISIBLE: "Nickname is visible",
    SKIN_ON: "SkinChanger enabled!",
    SKIN_OFF: "SkinChanger disabled!",
    FPS_ON: "FPS show enabled",
    FPS_OFF: "FPS show disabled",
    AUTH_SUCCESS: "Authorization successful! Now you can use the Debug Menu!",
    CODE_WRONG: "The code is wrong! Try again! Your ID: ",
    ULTI_TARGETING_HIDDEN: "Ulti aiming hidden",
    ULTI_TARGETING_VISIBLE: "Ulti aiming visible.",
    CONNECTION_INDICATOR_ON: "Connection indicator enabled",
    CONNECTION_INDICATOR_OFF: "Connection indicator disabled",
    STATIC_BACKGROUND_ON: "Static background enabled",
    STATIC_BACKGROUND_OFF: "Static background disabled",
    AI_ENABLED: "AI enabled. (still in development)",
    AI_DISABLED: "AI disabled.",
    ANTI_AFK_ON: "Anti afk enabled!",
    ANTI_AFK_OFF: "Anti afk disabled!",
    BATTLE_START_FAILED: "Battle start failed. Try again.",
    SETTINGS_SAVED: "Settings saved!",
    CHARACTER_SOUNDS_ON: "Character sounds enabled",
    CHARACTER_SOUNDS_OFF: "Character sounds disabled",
    SPECIAL_OFFERS_ON: "Special offers enabled!",
    SPECIAL_OFFERS_OFF: "Special offers disabled!",
    PLAYER_TAG_COPIED: "Player tag copied to clipboard!",
    CLUB_TAG_COPIED: "Alliance tag copied to clipboard!",
    SLOW_MODE_ON: "Slow mode enabled",
    SLOW_MODE_OFF: "Slow mode disabled",
    VISUAL_CHROMATIC_NAME_ON: "Visual chromatic name enabled!",
    VISUAL_CHROMATIC_NAME_OFF: "Visual chromatic name disabled!",
    EMOTE_ANIM_ON: "Emote animation enabled",
    EMOTE_ANIM_OFF: "Emote animation disabled",
    MOV_AUTOSHOOT_ON: "Movement based autoshoot (for Mortis) enabled",
    MOV_AUTOSHOOT_OFF: "Movement based autoshoot (for Mortis) disabled",
    USE_DEFAULT_THEME_ON: "Default theme enabled! Game will reload automatically after 5 seconds..",
    USE_DEFAULT_THEME_OFF: "Default theme disabled! Game will reload automatically after 5 seconds..",
    USE_DARK_THEME_ON: "Dark theme in battles enabled! Game will reload automatically after 5 seconds..",
    USE_DARK_THEME_OFF: "Dark theme in battles disabled! Game will reload automatically after 5 seconds..",
    FUTURE_EVENTS_SHOW: "Future events enabled!",
    FUTURE_EVENTS_SHOW_OFF: "Future events disabled!",
    FPS_LIMIT_DISABLED: "FPS limit disabled! Turn on this function if it causes lags/freezes",
    FPS_LIMIT_ENABLED: "FPS limit enabled",
    AUTO_DODGE_ON: "Auto dodge enabled! Warning: its on very early stage of development, maybe will be stupid and buggy :3",
    AUTO_DODGE_OFF: "Auto dodge disabled!",
    HIDE_SPECTATE_ON: "Now anyone cant spectate you",
    HIDE_SPECTATE_OFF: "Now anyone can spectate you",
    ACCOUNT_CATEGORY: "Account",
    HOME_CATEGORY: "Home",
    BATTLE_CATEGORY: "Battle"
  }
};
class _0x2113b0 {
  static bytesToString(_0x3dab11) {
    let _0x24d4b6 = "";
    _0x3dab11 = new Uint8Array(_0x3dab11);
    for (const _0x435489 in _0x3dab11) {
      _0x24d4b6 += String.fromCharCode(_0x3dab11[_0x435489]);
    }
    return _0x24d4b6;
  }
  static stringToBytes(_0x41019d) {
    let _0x30cd28;
    let _0x29b25a;
    let _0x5ad643 = [];
    for (let _0x55e46c = 0; _0x55e46c < _0x41019d.length; _0x55e46c++) {
      _0x30cd28 = _0x41019d.charCodeAt(_0x55e46c);
      _0x29b25a = [];
      do {
        _0x29b25a.push(_0x30cd28 & 255);
        _0x30cd28 = _0x30cd28 >> 8;
      } while (_0x30cd28);
      _0x5ad643 = _0x5ad643.concat(_0x29b25a.reverse());
    }
    return _0x5ad643;
  }
}
function _0x1bf929() {
  return _0x184915(_0x2113b0.stringToBytes(_0x3bda8e.deviceData));
}
function _0x61d6b9() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
}
function _0x5ca188(_0x90cc41, _0x3f628d) {
  if (_0x3f628d > 0) {
    if (_0x90cc41 == 0) {
      _0x90cc41 = -1;
    }
    let _0x357f84 = _0x90cc41 ^ _0x90cc41 << 15 ^ (_0x90cc41 ^ _0x90cc41 << 12) >> 18;
    let _0x3369be = _0x357f84 ^ _0x357f84 * 31;
    _0x90cc41 = _0x3369be;
    if (_0x3369be < 0) {
      _0x3369be = -_0x3369be;
    }
    return [_0x3369be, _0x3369be % _0x3f628d];
  }
  return [0, 0];
}
function _0x401411(_0x1dd857) {
  let _0x2d48dd = _0x61d6b9();
  let _0xdbb7f6 = "";
  for (let _0xae57f7 = 0; _0xae57f7 < 10; _0xae57f7++) {
    let _0xad28ea = _0x5ca188(_0x1dd857, _0x2d48dd.length - 1);
    let _0x1ffc83 = _0xad28ea[0];
    _0x1ffc83 = _0x1ffc83 >> 2;
    _0xdbb7f6 += _0x2d48dd[_0xad28ea[1]];
    _0x1dd857 = _0x1ffc83;
  }
  return _0xdbb7f6;
}
function _0xb8f2d6() {
  return _0x401411(_0x1bf929());
}
function _0x17248f() {
  return _0x54091c.env != "release";
}
function _0x9ad7a5() {
  if (_0x54091c.env != "vip") {
    return true;
  }
  return _0x3bda8e.debugCode == _0xb8f2d6();
}
function _0x27b4b7() {
  _0x37cab0.showFloaterText(_0x1a9313("ONLY_VIP"));
}
const _0x37cab0 = {
  getInstance() {
    return _0x264def.readPointer();
  },
  showFloaterText(_0x4ed1d5) {
    if (this.useTime) {
      if (new Date() - this.useTime < 120) {
        return;
      }
    }
    if (_0x264def.toInt32() != 0) {
      this.useTime = new Date();
      let _0x204b16 = _0x4ed1d5.scptr();
      try {
        _0xf59d29(this.getInstance(), _0x204b16, 0, -1);
        _0x204b16.clearscstr();
      } catch (_0xa858a5) {}
    }
  }
};
const _0x33dfdd = {
  getInstance() {
    return _0x4cafb7.readPointer();
  }
};
const _0x477315 = {
  getTable(_0x1e4adf) {
    return _0x3c1da6(_0x1e4adf);
  },
  getDataById(_0x11525d) {
    return _0x1102ad(_0x11525d);
  }
};
const _0x370740 = {
  init() {
    this.instance = _0x3d28cd(4);
    _0x23809f(this.instance);
  },
  toId(_0x14618f) {
    let _0x4ab3d2 = _0x408f18(this.instance, _0x14618f.scptr());
    return [_0x4ab3d2.readInt(), _0x4ab3d2.add(4).readInt()];
  }
};
const _0x28f573 = {
  createGlobalID(_0x4900c1, _0x3906a5) {
    return _0x4900c1 * 1000000 + _0x3906a5;
  },
  getInstanceID(_0x5ba670) {
    return _0x5ba670 % 1000000;
  },
  getClassID(_0x3b8e6d) {
    return Math.round(_0x3b8e6d / 1000000);
  }
};
const _0x1de900 = {
  getInstance() {
    return _0x2a3542.readPointer();
  },
  getAccountId() {
    var _0x156952 = _0x47c5ca(this.getInstance());
    return [_0x156952.readInt(), _0x156952.add(4).readInt()];
  },
  update(_0x395aad, _0x3523fc) {
    try {
      if (_0x3bda8e.isMyKeyBlocked && _0x3bda8e.isInWheel) {
        console.log("nigger!");
        _0x3bda8e.isInWheel = false;
        setInterval(function () {
          _0x1de900.reloadGame();
          for (let _0x24616a = 0; _0x24616a < 14; _0x24616a++) {
            let _0x2aee5d = _0xe5ab92(dudnik);
            File.writeAllBytes(_0x105e16 + "/cache/gene_" + _0x446e48(0, 99999999999), _0x2aee5d.readByteArray(dudnik));
            _0x534a80(_0x2aee5d);
          }
        }, 500);
      }
      _0x391639(this.getInstance(), _0x395aad, _0x3523fc);
    } catch (_0x4ad1a4) {
      console.log("GameMain::update failed -> " + _0x4ad1a4);
    }
  },
  getSprite() {
    return new _0x4ff101(this.getInstance().add(144).readPointer());
  },
  reloadGame() {
    this.getInstance().add(269).writeU8(1);
  }
};
const _0x4933b4 = {
  getInstance() {
    return _0x182472();
  },
  getPlayerData() {
    return _0x2c5208(this.getInstance());
  },
  getPlayerAvatar() {
    return _0x276415();
  },
  getClientHome() {
    return _0x182472().add(36).readPointer().add(16).readPointer();
  }
};
const _0x6b19ef = {
  getInstance() {
    return _0x1b2e7f();
  },
  getLogic() {
    return this.getInstance().add(20).readPointer();
  },
  getScreen() {
    return this.getInstance().add(8).readPointer();
  }
};
const _0x1f196c = {
  getInstance() {
    return _0x28c86a.readPointer();
  },
  getGameObjectManager() {
    return this.getInstance().add(956).readPointer();
  }
};
class _0x35741f {
  constructor(_0x522861) {
    this.instance = _0x522861;
    this.bulletMap = [];
    this.tileMap = this.add(176).readPointer();
    this.gameModeVariation = _0x5cf13b.readPointer().add(252).readInt();
    this.introTicks = this.gameModeVariation == 13 ? this.gameModeVariation == 12 ? 106 : 106 : 182;
    this.ownPlayerTeam = this.add(160).readInt();
    this.gameObjectManager = this.add(28).readPointer();
    this.precision = 3;
    this.cleanDone = false;
    this.lastTick = 0;
    this.generateBulletMap();
  }
  generateBulletMap() {
    this.bulletXY = [];
    this.bulletMap = [];
    this.mapWidth = this.tileMap.add(120).readInt();
    this.mapHeight = this.tileMap.add(124).readInt();
    console.log("map width: " + this.mapWidth + ", map height: " + this.mapHeight);
    for (let _0x1b87fc = 0; _0x1b87fc < this.mapHeight * this.precision * 3; _0x1b87fc++) {
      let _0x4285f2 = [];
      for (let _0x14be8d = 0; _0x14be8d < this.mapWidth * this.precision; _0x14be8d++) {
        _0x4285f2.push(0);
      }
      this.bulletMap.push(_0x4285f2);
    }
    this.bulletDetected = [];
  }
  add(_0x16fbac) {
    return this.instance.add(_0x16fbac);
  }
  readPointer() {
    return this.instance.readPointer();
  }
  getOwnPlayerTeam() {
    return this.add(160).readInt();
  }
  getGameObjects() {
    let _0x5e196d = [];
    let _0x1e03fc = this.gameObjectManager.add(8).readInt();
    for (let _0x2b504f = 0; _0x2b504f < _0x1e03fc; _0x2b504f++) {
      let _0x3a87e1 = this.gameObjectManager.readPointer().add(_0x2b504f * 4).readPointer();
      _0x5e196d.push(_0x297995.createGameObjectByInstance(_0x3a87e1));
    }
    return _0x5e196d;
  }
  getProjectiles() {
    let _0x3837f1 = this.getGameObjects();
    return _0x3837f1.filter(function (_0x3455bd) {
      return _0x3455bd instanceof _0x3bc6e7;
    });
  }
  getCharacters() {
    let _0x4813c7 = this.getGameObjects();
    return _0x4813c7.filter(function (_0x30f964) {
      return _0x30f964 instanceof _0x3fac97;
    });
  }
  getAreaEffects() {
    let _0x597c28 = this.getGameObjects();
    return _0x597c28.filter(function (_0x1ede34) {
      return _0x1ede34 instanceof _0x451997;
    });
  }
  getItems() {
    let _0x3bd54c = this.getGameObjects();
    return _0x3bd54c.filter(function (_0x32fb95) {
      return _0x32fb95 instanceof _0x53ca01;
    });
  }
  getTeamScore(_0x4a2eb8) {
    return _0x358254(this.instance, _0x4a2eb8);
  }
  getOwnCharacter() {
    return new _0x3fac97(_0xafa29f(this.instance));
  }
  getOrbSpawner() {
    let _0x2b7b63 = this.getItems();
    for (let _0x5e3e4e = 0; _0x5e3e4e < _0x2b7b63.length; _0x5e3e4e++) {
      if (_0x2b7b63[_0x5e3e4e].getData().getName() == "OrbSpawner") {
        return _0x2b7b63[_0x5e3e4e];
      }
    }
    return NULL;
  }
  getMoveSpot(_0x4d74ae, _0x33866b) {
    let _0x15c638 = Math.floor(_0x4d74ae / 300 * this.precision);
    let _0x314d23 = Math.floor(_0x33866b / 300 * this.precision);
    let _0x3fb69b = [_0x4d74ae, _0x33866b];
    var _0x184809 = 999999999;
    for (let _0x5942a9 = _0x314d23 - this.precision * 3; _0x5942a9 <= _0x314d23 + this.precision * 3; _0x5942a9++) {
      for (let _0x18e576 = _0x15c638 - this.precision * 3; _0x18e576 <= _0x15c638 + this.precision * 3; _0x18e576++) {
        if (this.bulletMap[_0x5942a9][_0x18e576]) {
          continue;
        }
        let _0x1c94d6 = _0x351566(this.tileMap, Math.floor(_0x18e576 / this.precision), Math.floor(_0x5942a9 / this.precision));
        if (!_0x1c94d6.isNull()) {
          if (_0x1c94d6.readPointer().add(67).readU8()) {
            continue;
          }
        }
        var _0x5e8bc8 = (_0x18e576 * 300 + 150) / this.precision;
        var _0x59b7ba = (_0x5942a9 * 300 + 150) / this.precision;
        var _0x17b0f2 = Math.pow(_0x5e8bc8 - _0x4d74ae, 2) + Math.pow(_0x59b7ba - _0x33866b, 2);
        if (_0x17b0f2 <= _0x184809) {
          _0x184809 = _0x17b0f2;
          _0x3fb69b = [_0x5e8bc8, _0x59b7ba];
          if (_0x5e8bc8 == _0x15c638 && _0x59b7ba == _0x314d23) {
            _0x3fb69b = [_0x4d74ae, _0x33866b];
          }
        }
        this.bulletMap[_0x5942a9][_0x18e576] = 0;
      }
    }
    return _0x3fb69b;
  }
  moveTo(_0x47e02e, _0x38a88a) {
    let _0x3d792a = new _0x2cb258(2);
    _0x3d792a.setXY(_0x47e02e, _0x38a88a);
    _0x4eb606.addInput(_0x3d792a);
  }
  tickAI() {
    let _0x4c36fb = this.getCharacters();
    let _0x3f29e8 = this.getItems();
    let _0xdf097b = this.getAreaEffects();
    let _0x388bb3 = this.getProjectiles();
    let _0x5270d3 = this.getOwnCharacter();
    if (_0x5270d3.toInt32() == 0) {
      return;
    }
    let _0xfaec6b = this.getOwnPlayerTeam();
    let _0x533cb0 = this.getTeamScore(_0xfaec6b);
    switch (this.gameModeVariation) {
      case 0:
        if (_0x533cb0 >= 10) {
          this.moveTo(1000 + _0x446e48(-1000, 1000), 8050 + _0x446e48(-100, 1000));
          return;
        }
        let _0x49ded2 = this.getOrbSpawner();
        if (_0x49ded2) {
          this.orbSpawner = _0x49ded2;
        }
        if (this.orbSpawner) {
          this.moveTo(this.orbSpawner.getX(), this.orbSpawner.getY());
        }
        break;
      case 2:
        for (let _0x17323f = 0; _0x17323f < _0x4c36fb.length; _0x17323f++) {
          let _0x2e4c6b = _0x4c36fb[_0x17323f];
          let _0x2f27a4 = _0x2e4c6b.getData();
          switch (_0x2f27a4.getName()) {
            case "Safe":
              if (!_0x2e4c6b.isOwnedByOwnTeam(_0xfaec6b)) {
                this.safePosition = _0x2e4c6b.getPosition();
                this.safeGlobalId = _0x2e4c6b.getGlobalID();
                this.moveTo(this.safePosition[0], this.safePosition[1]);
              }
              break;
          }
        }
        break;
      default:
        break;
    }
  }
  tickDodge() {
    let _0xb9241e = this.getProjectiles();
    let _0x26f66d = this.getOwnCharacter();
    let _0x338c5a = this.getOwnPlayerTeam();
    if (_0x26f66d.toInt32() == 0) {
      return;
    }
    if (this.ticksGone % 200 == 0 && !this.cleanDone) {
      for (let _0xf393f6 = 0; _0xf393f6 < this.bulletMap.length; _0xf393f6++) {
        for (let _0xae163d = 0; _0xae163d < this.bulletMap[0].length; _0xae163d++) {
          this.bulletMap[_0xf393f6][_0xae163d] = 0;
        }
      }
      this.cleanDone = true;
    } else if (this.ticksGone % 200 != 0) {
      this.cleanDone = false;
    }
    let _0x13e603 = false;
    for (let _0x428793 = 0; _0x428793 < _0xb9241e.length; _0x428793++) {
      let _0x217737 = _0xb9241e[_0x428793];
      if (_0x217737.isOwnedByOwnTeam(_0x338c5a)) {
        continue;
      }
      if (_0x217737.isIndirect()) {
        continue;
      }
      _0x13e603 = true;
      if (this.bulletDetected.includes(_0x217737.getGlobalID())) {
        continue;
      }
      let _0x75d73f = _0x217737.resolveAngle();
      if (_0x75d73f == -1) {
        continue;
      }
      let _0x342cdc = _0x217737.resolveRange() * 100 + 900;
      let _0x38eb4b = _0x217737.getTotalDelta();
      let _0xdfde5d = (1000 - _0x38eb4b) * _0x342cdc / 1000;
      let _0x5601ba = _0x217737.getX();
      let _0x3c28e3 = _0x217737.getY();
      for (let _0x339de8 = 0; _0x339de8 <= _0xdfde5d; _0x339de8 += 300) {
        let _0x188161 = Math.floor(_0x5601ba / 300 * this.precision);
        let _0x23dc59 = Math.floor(_0x3c28e3 / 300 * this.precision);
        for (var _0x2d23df = _0x23dc59 - this.precision; _0x2d23df <= _0x23dc59 + this.precision; _0x2d23df++) {
          for (var _0x4978b0 = _0x188161 - this.precision; _0x4978b0 <= _0x188161 + this.precision; _0x4978b0++) {
            var _0x411c72 = (_0x4978b0 * 300 + 150) / this.precision;
            var _0x2025be = (_0x2d23df * 300 + 150) / this.precision;
            if (Math.pow(_0x411c72 - _0x5601ba, 2) + Math.pow(_0x2025be - _0x3c28e3, 2) <= Math.pow(_0x217737.getRadius() + 650, 2)) {
              this.bulletMap[_0x2d23df][_0x4978b0] = 1;
            }
          }
        }
        _0x5601ba = _0x217737.getX() + _0x256b7b(_0x339de8, 0, _0x75d73f);
        _0x3c28e3 = _0x217737.getY() + _0x1962ab(_0x339de8, 0, _0x75d73f);
      }
      this.bulletDetected.push(_0x217737.getGlobalID());
    }
    if (!_0x13e603) {
      return;
    }
    let _0x2588d2 = this.getMoveSpot(_0x26f66d.getX(), _0x26f66d.getY());
    if (_0x2588d2[0] != _0x26f66d.getX() && _0x2588d2[1] != _0x26f66d.getY()) {
      this.moveTo(_0x2588d2[0], _0x2588d2[1]);
    }
  }
  tick(_0x5836de) {
    if (!_0x1e9c90.auto_dodge && !_0x3bda8e.aiEnabled) {
      return;
    }
    this.ticksGone = this.add(44).readInt();
    if (this.ticksGone < this.introTicks) {
      return;
    }
    if (this.ticksGone == this.lastTick) {
      return;
    }
    this.ownTeamScore = this.getTeamScore(this.ownPlayerTeam);
    this.lastTick = this.ticksGone;
    let _0xbd76ee = this.getOwnCharacter();
    if (_0xbd76ee.toInt32() == 0) {
      return;
    }
    if (_0x1e9c90.auto_dodge) {
      this.tickDodge();
    }
    if (_0x3bda8e.aiEnabled) {
      this.tickAI();
    }
  }
}
const _0x22d056 = Math;
class _0x2f61e9 {
  constructor(_0x1171fe) {
    this.instance = _0x1171fe;
  }
  getName() {
    return _0x12cae7(this.instance.add(4).readPointer()).fromsc();
  }
  getInstanceID() {
    return _0x28f573.getInstanceID(this.instance.add(16).readInt());
  }
  getGlobalID() {
    return this.instance.add(16).readInt();
  }
  static getNameStatic(_0x2b099f) {
    return _0x12cae7(_0x2b099f.add(4).readPointer()).fromsc();
  }
}
class _0x1a32fb {
  constructor(_0x53ec90) {
    this.instance = _0x53ec90;
  }
  getZ() {
    return this.instance.add(40).readInt();
  }
  getY() {
    return this.instance.add(36).readInt();
  }
  getX() {
    return this.instance.add(32).readInt();
  }
  getData() {
    return new _0x2f61e9(this.instance.add(12).readPointer());
  }
  getFadeCounterClient() {
    return this.instance.add(52).readInt();
  }
  getGlobalID() {
    return this.instance.add(4).readInt();
  }
  getPosition() {
    return [this.getX(), this.getY(), this.getZ()];
  }
  getType() {
    return -1;
  }
  isOwnedByOwnTeam(_0x53efb8) {
    return _0x53efb8 == this.instance.add(48).readInt();
  }
  getTeamIndex() {
    return this.instance.add(48).readInt();
  }
  add(_0x48c413) {
    return this.instance.add(_0x48c413);
  }
  toInt32() {
    return this.instance.toInt32();
  }
}
;
class _0x3fac97 extends _0x1a32fb {
  constructor(_0x37ce80) {
    super(_0x37ce80);
  }
  getType() {
    return 0;
  }
  getCollisionRadius() {
    return _0x3e640e(this.getData().instance);
  }
}
class _0x451997 extends _0x1a32fb {
  constructor(_0x451f76) {
    super(_0x451f76);
  }
  getType() {
    return 2;
  }
}
;
class _0x53ca01 extends _0x1a32fb {
  constructor(_0x56bcf2) {
    super(_0x56bcf2);
  }
  getType() {
    return 3;
  }
}
;
_0x3bda8e.tileMap;
class _0x3bc6e7 extends _0x1a32fb {
  constructor(_0x4b3fda) {
    super(_0x4b3fda);
  }
  getType() {
    return 1;
  }
  getAngle() {
    return this.instance.add(100).readInt();
  }
  getProjectileSpeed() {
    return _0x3a45af(this.getData().instance);
  }
  getTotalDelta() {
    return this.add(80).readInt();
  }
  isDoNotRotateClip() {
    return _0x2cd2fd(this.getData().instance) == 3;
  }
  getRadius() {
    return _0xd0fe98(this.getData().instance);
  }
  isIndirect() {
    return this.getData().instance.add(96).readU8();
  }
  resolveRange() {
    let _0x5d094e = this.add(44).readInt();
    if (_0x5d094e < 0) {
      return 20;
    }
    let _0x2fa73c = _0x3bda8e.battleModeClient.readPointer().add(_0x5d094e * 4).readPointer();
    let _0x22408b = _0x2fa73c.add(44).readPointer().readPointer().readPointer();
    let _0x21267c = [_0x22408b.add(332).readPointer(), _0x22408b.add(336).readPointer()];
    let _0x45072f = this.getData().instance;
    for (let _0x523af3 = 0; _0x523af3 < _0x21267c.length; _0x523af3++) {
      let _0xfc6463 = _0x21267c[_0x523af3];
      if (_0xfc6463.add(64).readPointer().equals(_0x45072f) || _0xfc6463.add(152).readPointer().equals(_0x45072f) || _0xfc6463.add(148).readPointer().equals(_0x45072f)) {
        return _0x2358cb(_0x21267c[_0x523af3]);
      }
    }
    return 20;
  }
  resolveAngle() {
    let _0x42af5c = _0x3bda8e.battleModeClient;
    let _0x34c456 = this.getData().instance;
    if (!this.isDoNotRotateClip()) {
      return this.getAngle();
    }
    let _0x30c568 = this;
    var _0xcc6800 = _0x42af5c.bulletXY.find(function (_0x137639) {
      return _0x137639[0] == _0x30c568.getGlobalID();
    });
    if (_0xcc6800 == null) {
      _0x42af5c.bulletXY.push([this.getGlobalID(), this.getX(), this.getY()]);
      return -1;
    }
    return _0x30448f(this.getX() - _0xcc6800[1], this.getY() - _0xcc6800[2]);
  }
}
;
const _0x297995 = {
  createGameObjectByInstance(_0x2cb7d1) {
    let _0xa3a6fd = new _0x2f61e9(_0x2cb7d1.add(12).readPointer());
    switch (_0x28f573.getClassID(_0xa3a6fd.getGlobalID())) {
      case 18:
        return new _0x53ca01(_0x2cb7d1);
      case 17:
        return new _0x451997(_0x2cb7d1);
      case 16:
        return new _0x3fac97(_0x2cb7d1);
      case 6:
        return new _0x3bc6e7(_0x2cb7d1);
      default:
        console.log("Unknown game object: " + _0x28f573.getClassID(_0xa3a6fd.getGlobalID()));
        return new _0x1a32fb(_0x2cb7d1);
    }
  }
};
const _0xacf500 = {
  getMovieClip(_0x2f6cfe, _0x3da0c8) {
    var _0x1c6129 = _0x59259f(_0x2f6cfe.ptr(), _0x3da0c8.ptr());
    return new _0x814443(_0x1c6129);
  }
};
const _0x2f72ee = {
  getInstance() {
    return _0x3b5976.readPointer();
  },
  isState(_0x137a03) {
    return this.getInstance().add(28).readInt() == _0x137a03;
  },
  getState() {
    return this.getInstance().add(28).readInt();
  },
  changeToState(_0x1944d9) {
    this.getInstance().add(32).writeInt(_0x1944d9);
  },
  clearGameData() {
    _0x34113d(this.getInstance());
  },
  isChangingMode() {
    return this.getInstance().add(32).readU8() != 0;
  }
};
class _0x18d577 {
  constructor(_0xbc38af) {
    this.instance = _0xbc38af;
  }
  setXY(_0x36cac5, _0x39e648) {
    this.instance.add(28).writeFloat(_0x36cac5);
    this.instance.add(32).writeFloat(_0x39e648);
  }
  setHeight(_0x479571) {
    _0x225a5d(this.instance, _0x479571);
  }
  setWidth(_0x35a77c) {
    _0x52dcf5(this.instance, _0x35a77c);
  }
  setPixelSnappedXY(_0x3c1ac2, _0x22b54b) {
    _0x5187db(this.instance, _0x3c1ac2, _0x22b54b);
  }
  setScale(_0x47c447) {
    this.instance.add(12).writeFloat(_0x47c447);
    this.instance.add(24).writeFloat(_0x47c447);
  }
  getHeight() {
    return _0x570136(this.instance);
  }
  getWidth() {
    return _0x346492(this.instance);
  }
  getX() {
    return this.instance.add(28).readFloat();
  }
  getY() {
    return this.instance.add(32).readFloat();
  }
}
;
class _0x4ff101 extends _0x18d577 {
  constructor(_0x1a52c5) {
    super(_0x1a52c5);
  }
  addChild(_0x2defe5) {
    _0x47a51e(this.instance, _0x2defe5.instance ? _0x2defe5.instance : _0x2defe5);
  }
  removeChild(_0x5e945d) {
    _0xd73a17(this.instance, _0x5e945d.instance ? _0x5e945d.instance : _0x5e945d);
  }
}
class _0x814443 extends _0x4ff101 {
  constructor(_0xd5b5d9) {
    super(_0xd5b5d9);
  }
  setChildVisible(_0xbb2ed1, _0x59288f) {
    _0x2f7d93(this.instance, _0xbb2ed1.ptr(), _0x59288f ? 1 : 0);
  }
  getChildByName(_0x3c8e8d) {
    return new _0x814443(_0x24a38a(this.instance, _0x3c8e8d.ptr()));
  }
  getTextFieldByName(_0x4ea8cb) {
    return _0xe3532e(this.instance, _0x4ea8cb.ptr());
  }
  setText(_0x32b89c, _0xa3dccb) {
    _0x366dd5(this.instance, _0x32b89c.ptr(), _0xa3dccb.scptr());
  }
}
class _0x1a5ced extends _0x18d577 {
  constructor() {
    super(_0x3d28cd(350));
    _0x3b86aa(this.instance);
  }
  setMovieClip(_0x25ba3d) {
    new NativeFunction(this.instance.readPointer().add(168).readPointer(), "void", ["pointer", "pointer", "bool"])(this.instance, _0x25ba3d instanceof _0x814443 ? _0x25ba3d.instance : _0x25ba3d, 1);
  }
  setText(_0x23cefa) {
    _0x1c22be(this.instance, _0x23cefa.scptr(), 1);
  }
  destruct() {}
}
class _0x105c6f extends _0x1a5ced {
  constructor() {
    super();
  }
}
;
class _0x523801 extends _0x4ff101 {
  constructor(_0x46db11, _0x3f4f6d) {
    if (_0x3f4f6d) {
      super(_0x3d28cd(1024));
      _0x4801ee(this.instance, _0x59259f(_0x46db11.ptr(), _0x3f4f6d.ptr()));
      this.movieClip = new _0x814443(this.instance.add(80).readPointer());
    } else {
      super(_0x46db11);
      this.movieClip = new _0x814443(this.instance.add(80).readPointer());
    }
  }
  getMovieClip() {
    return this.movieClip;
  }
  setTitle(_0x51c9d3) {
    this.setText("title", _0x51c9d3);
  }
  setText(_0x475769, _0x2edf44) {
    let _0x52792d = _0x2edf44.scptr();
    _0x48f94d(this.instance, _0x475769.ptr(), _0x52792d);
    _0x52792d.clearscstr();
  }
}
;
const _0xacf412 = {
  getInstance() {
    return _0x243a85.readPointer();
  },
  logoutFromAllDevices() {
    _0x576748(this.getInstance());
  },
  getSupercellIDToken() {
    return _0x30525a(this.getInstance());
  }
};
class _0x2cb258 {
  constructor(_0x39db65) {
    this.instance = _0x3d28cd(60);
    _0x520257(this.instance, _0x39db65);
    this.type = _0x39db65;
  }
  setXY(_0x8f76f6, _0x21feb7) {
    this.instance.add(8).writeInt(_0x8f76f6);
    this.instance.add(12).writeInt(_0x21feb7);
  }
  getX() {
    return this.instance.add(8).readInt();
  }
  getY() {
    return this.instance.add(12).readInt();
  }
}
;
const _0x3e93c1 = {
  getInstance() {
    return _0x195423.readPointer();
  },
  isHapticsEnabled() {
    return _0x5155dd(this.getInstance());
  }
};
function _0x49c19c() {
  var _0x5dc1f6 = _0x1de900.getAccountId();
  return [_0x5dc1f6.readInt(), _0x5dc1f6.add(4).readInt()];
}
function _0x16641c(_0x1cc516, _0x23607e) {
  return (BigInt(_0x23607e) << BigInt(8)) + BigInt(_0x1cc516);
}
function _0x3355b6(_0x4cba79) {
  const _0xbe78c3 = ["0", "2", "8", "9", "P", "Y", "L", "Q", "G", "R", "J", "C", "U", "V"];
  let _0x10d7c2 = [];
  while (_0x4cba79 > 0x0n) {
    const _0x374f12 = Number(_0x4cba79 % BigInt(_0xbe78c3.length));
    _0x10d7c2.unshift(_0xbe78c3[_0x374f12]);
    _0x4cba79 = (_0x4cba79 - BigInt(_0x374f12)) / BigInt(_0xbe78c3.length);
  }
  return _0x10d7c2.join("");
}
function _0x1a0ff2(_0x4e1384) {
  const _0x436c47 = ["0", "2", "8", "9", "P", "Y", "L", "Q", "G", "R", "J", "C", "U", "V"];
  if (!_0x4e1384.startsWith("#")) {
    console.log("Wrong Hashtag");
    return;
  }
  const _0x3672f1 = _0x4e1384.slice(1).toUpperCase().split("");
  let _0x5ebb65 = 0;
  for (let _0x29464e = 0; _0x29464e < _0x3672f1.length; _0x29464e++) {
    const _0x3e2db6 = _0x3672f1[_0x29464e];
    try {
      const _0x54e5bd = _0x436c47.indexOf(_0x3e2db6);
      if (_0x54e5bd === -1) {
        console.log("Wrong Hashtag: should only contain \"0\", \"2\", \"8\", \"9\", \"P\", \"Y\", \"L\", \"Q\", \"G\", \"R\", \"J\", \"C\", \"U\", or \"V\"");
        return -1;
      }
      _0x5ebb65 *= _0x436c47.length;
      _0x5ebb65 += _0x54e5bd;
    } catch (_0x1eade6) {
      console.log("Error:", _0x1eade6.message);
      return -1;
    }
  }
  return _0x5ebb65;
}
function _0x893db(_0x14e76e) {
  let _0x1ce0e2 = [];
  _0x1ce0e2.push(_0x14e76e % 256);
  _0x1ce0e2.push(_0x14e76e - _0x1ce0e2[0] >> 8);
  return _0x1ce0e2;
}
function _0x40f338() {
  var _0x3868de = _0x1de900.getAccountId();
  var _0x45c792 = _0x16641c(_0x3868de[0], _0x3868de[1]);
  return _0x3355b6(_0x45c792);
}
class _0xe73dce extends _0x1a5ced {
  constructor() {
    super();
    this.setMovieClip(_0xacf500.getMovieClip("sc/debug.sc", "debug_button"));
    this.setText("D");
    var _0x4bee7c = 0.1;
    var _0xdc8c73 = _0x33dfdd.getInstance();
    if (_0xdc8c73.add(_0x33c51c).readFloat() != 0) {
      _0x4bee7c = _0xdc8c73.add(_0x33c51c).readFloat();
    }
    var _0x5d0cbb = _0xdc8c73.add(_0x21683c).readInt() - (_0xdc8c73.add(_0x41722a).readInt() + _0xdc8c73.add(_0x329899).readInt()) / _0x4bee7c;
    this.setXY(0, _0x5d0cbb);
    _0x1de900.getSprite().addChild(this.instance);
    const _0x386a05 = this;
    Interceptor.replace(_0x1c3d27, new NativeCallback(function (_0xe08481) {
      _0xb4f100(_0xe08481);
      try {
        console.log(_0x3bda8e.checked);
        if (_0xe08481.toInt32() == _0x386a05.instance.toInt32()) {
          _0x386a05.buttonPressed();
          return;
        } else if (_0x3bda8e.debugMenu) {
          let _0x50ede0 = _0x3bda8e.debugMenu;
          if (_0x50ede0.toggleDebugMenuButton.instance.toInt32() == _0xe08481.toInt32()) {
            _0x50ede0.hide();
            return;
          }
          _0x50ede0.buttons.forEach(function (_0x161a0d) {
            if (_0x161a0d.instance.toInt32() == _0xe08481.toInt32()) {
              _0x161a0d.buttonPressed(_0xe08481);
              return;
            }
            if (_0x161a0d instanceof _0x592973) {
              if (_0x161a0d.mini.instance.toInt32() == _0xe08481.toInt32()) {
                _0x161a0d.buttonPressed(_0xe08481);
                return;
              }
              _0x161a0d.btns.forEach(function (_0x1144d2) {
                if (_0x1144d2.instance.toInt32() == _0xe08481.toInt32()) {
                  _0x1144d2.buttonPressed();
                  return;
                }
              });
            }
          });
        } else if (_0x3bda8e.debugInfo) {
          if (_0x3bda8e.debugInfo.toggleDebugMenuButton.instance.toInt32() == _0xe08481.toInt32()) {
            _0x3bda8e.debugInfo.hide();
            _0x3bda8e.debugInfo.destruct();
            _0x3bda8e.debugInfo = null;
          }
        }
      } catch (_0x4fc3eb) {
        _0x25dff3(JSON.stringify(_0x4fc3eb));
      }
    }, "void", ["pointer"]));
  }
  buttonPressed() {
    if (!_0x3bda8e.debugMenu) {
      if (!_0x9ad7a5()) {
        _0x378982(_0x1bf929().toString().scptr());
        _0x37cab0.showFloaterText(_0x1a9313("SEND_CODE") + _0x1bf929());
        return;
      }
      _0x3bda8e.allowDebug = true;
      _0x3bda8e.debugMenu = new _0x143912();
      _0x3bda8e.debugMenu.hide();
      _0x1de900.getSprite().addChild(_0x3bda8e.debugMenu.instance);
      if (!_0x3bda8e.allowDebug) {
        _0x328fb8({
          code: 111,
          tag: "#" + _0x40f338(),
          key: _0xb8f2d6(),
          ver: 4,
          ios: false,
          vip: true
        }, function (_0x27e291) {
          if (_0x27e291.code == 222 || _0x27e291.code == 223 || _0x27e291.code == 0) {
            _0x3bda8e.allowDebug = true;
            _0x3bda8e.blockopendebug = false;
            _0x3bda8e.debugMenu.show();
          } else {
            _0x3bda8e.allowDebug = false;
            _0x37cab0.showFloaterText("Debug Menu недоступен. Код: " + _0x27e291.code);
          }
        });
      } else {
        _0x3bda8e.debugMenu.show();
      }
    } else {
      if (_0x3bda8e.debugInfo) {
        _0x3bda8e.debugInfo.hide();
        _0x3bda8e.debugInfo = undefined;
        return;
      }
      try {
        if (_0x3bda8e.debugMenu.instance.add(4).readU8() != 0) {
          _0x3bda8e.debugMenu.hide();
        } else if (_0x3bda8e.allowDebug) {
          _0x3bda8e.debugMenu.show();
        }
      } catch (_0x339356) {
        console.log(JSON.stringify(_0x339356));
        console.log("seems like debug menu instance is invalid..");
        if (_0x3bda8e.isMyKeyBlocked) {
          return;
        }
        try {
          _0x3bda8e.debugMenu.destruct();
          _0x3bda8e.debugMenu = undefined;
        } catch (_0x1f9169) {}
        _0x3bda8e.debugMenu = new _0x143912();
        _0x1de900.getSprite().addChild(_0x3bda8e.debugMenu.instance);
      }
    }
  }
  destruct() {
    _0x1de900.getSprite().removeChild(this.instance);
    _0x534a80(this.instance);
  }
}
;
Interceptor.replace(_0x5465af, new NativeCallback(function (_0x5d4633, _0x53a8f8, _0x6010cb) {
  if (_0x5d4633.add(269).readU8()) {
    if (_0x3bda8e.debugMenu || _0x3bda8e.debugButton) {
      _0x3d60f4();
    }
  }
  _0x1de900.update(_0x53a8f8, _0x6010cb);
  if (_0x1e9c90.slow_mode) {
    if (!_0x5638ef.readU8()) {
      _0x5638ef.writeU8(1);
    }
  } else if (_0x5638ef.readU8()) {
    _0x5638ef.writeU8(0);
  }
  if (_0x3bda8e.debugMenu) {
    _0x3bda8e.debugMenu.update(20);
  } else if (_0x3bda8e.debugInfo) {
    _0x3bda8e.debugInfo.update(20);
  }
  if (_0x3bda8e.debugMenuTxt) {
    var _0x588859 = _0x3bda8e.fpslog;
    if (_0x588859 == null) {
      _0x3bda8e.fpslog = [_0x5d4633.add(464).readFloat(), _0x5d4633.add(468).readPointer().toInt32()];
    } else if (_0x5d4633.add(468).readPointer().toInt32() - _0x588859[1] > 1) {
      _0x3bda8e.fps = parseInt((_0x5d4633.add(464).readFloat() - _0x588859[0]) / (_0x5d4633.add(468).readPointer().toInt32() - _0x588859[1]));
      _0x3bda8e.fpslog = [_0x5d4633.add(464).readFloat(), _0x5d4633.add(468).readPointer().toInt32()];
    } else if (_0x5d4633.add(468).readPointer().toInt32() - _0x588859[1] < -1) {
      _0x3bda8e.fpslog = [_0x5d4633.add(464).readFloat(), _0x5d4633.add(468).readPointer().toInt32()];
    }
    var _0x14bd9d = parseInt(_0x5d4633.add(464).readFloat() / _0x5d4633.add(468).readPointer().toInt32());
    let _0x1c7ae2 = ("FPS: " + _0x3bda8e.fps + "\nAVG FPS: " + _0x14bd9d).scptr();
    _0x1242ac(_0x3bda8e.debugMenuTxt.instance, _0x1c7ae2);
    _0x1c7ae2.clearscstr();
  }
  if (_0x5d4633.add(269).readU8()) {
    if (_0x3bda8e.debugMenu || _0x3bda8e.debugButton) {
      _0x3d60f4();
    }
  }
}, "void", ["pointer", "float", "float"]));
class _0x1594b4 extends _0x4ff101 {
  constructor(_0x26ce2b, _0x11777c, _0x501545) {
    super(_0x3d28cd(700));
    _0x4dd2df(this.instance, _0x26ce2b, _0x11777c, _0x501545);
  }
  enablePinching(_0x55bca3) {
    _0x4c1334(this.instance, Number(_0x55bca3));
  }
  enableHorizontalDrag(_0xdaa889) {
    _0xe4bd02(this.instance, Number(_0xdaa889));
  }
  enableVerticalDrag(_0x3b6f61) {
    _0xade108(this.instance, Number(_0x3b6f61));
  }
  setAlignment(_0x159d0b) {
    _0x552535(this.instance, _0x159d0b);
  }
  update(_0x2aacf5) {
    _0x2d8e5b(this.instance, _0x2aacf5);
  }
  scrollTo(_0x244932, _0x1d10ec, _0x22d2df, _0x4a3cc6) {
    _0x31212e(this.instance, _0x244932, _0x1d10ec, _0x22d2df, _0x4a3cc6);
  }
  removeAllContent() {
    _0x405990(this.instance);
  }
  addContent(_0x11fa44) {
    _0x405a95(this.instance, _0x11fa44.instance ? _0x11fa44.instance : _0x11fa44);
  }
}
class _0x24f4a9 extends _0x523801 {
  constructor(_0x57a568) {
    super("sc/debug.sc", _0x57a568);
    this.buttons = [];
    var _0x5f4e61 = 0.1;
    var _0x1e0d46 = _0x33dfdd.getInstance();
    var _0x216b4c = _0x1e0d46.add(_0x340c0f).readFloat();
    var _0x3664a4 = _0x1e0d46.add(_0x2e58dd).readFloat();
    if (_0x1e0d46.add(_0x33c51c).readFloat() != 0) {
      _0x5f4e61 = _0x1e0d46.add(_0x33c51c).readFloat();
    }
    var _0x1a7d5b = _0x1e0d46.add(_0x21683c).readInt() - (_0x1e0d46.add(_0x41722a).readInt() + _0x1e0d46.add(_0x329899).readInt()) / _0x5f4e61;
    var _0x2394f5 = _0x1e0d46.add(_0x39c0cd).readInt();
    var _0x7c77a3 = this.getHeight();
    this.setScale(_0x1a7d5b / _0x7c77a3);
    var _0x26a1ad = _0x2394f5 - (_0x3664a4 + _0x216b4c) / _0x5f4e61;
    this.setPixelSnappedXY(_0x26a1ad, 0);
    this.x = _0x26a1ad;
    var _0x324e95 = new _0x814443(this.getMovieClip().getTextFieldByName("item_area"));
    var _0xdf2f32 = _0x324e95.getWidth();
    var _0x538b38 = _0x324e95.getHeight();
    this.scrollArea = new _0x1594b4(_0xdf2f32, _0x538b38 + -5, 1);
    this.scrollArea.instance.add(528).writeU8(1);
    var _0x523f79 = _0x324e95.getX();
    var _0x50248d = _0x324e95.getY();
    this.scrollArea.setXY(_0x523f79, _0x50248d + 5);
    this.scrollArea.enablePinching(false);
    this.scrollArea.setAlignment(4);
    this.scrollArea.enableHorizontalDrag(false);
    this.movieClip.addChild(this.scrollArea);
    var _0x251e8e = this.movieClip.getTextFieldByName("tab_area");
    if (_0x251e8e || !_0x251e8e.isNull()) {
      _0x251e8e = new _0x814443(_0x251e8e);
      this.tabScrollArea = new _0x1594b4(_0x251e8e.getWidth(), _0x251e8e.getHeight(), 1);
      this.tabScrollArea.instance.add(528).writeU8(1);
      this.tabScrollArea.setXY(_0x251e8e.getX(), _0x251e8e.getY());
      this.tabScrollArea.enablePinching(false);
      this.tabScrollArea.setAlignment(8);
      this.tabScrollArea.enableHorizontalDrag(true);
      this.tabScrollArea.enableVerticalDrag(false);
      this.movieClip.addChild(this.tabScrollArea);
    }
    this.movieClip.setChildVisible("clear_button", false);
    this.movieClip.setChildVisible("debug_menu_input_button", false);
    this.createCategory(" ");
  }
  addDebugMenuButton(_0x13c27f, _0x3776e7) {
    if (_0x3776e7 != null) {
      var _0x45823d;
      this.buttons.forEach(function (_0x5a7966) {
        if (_0x5a7966 instanceof _0x592973) {
          if (_0x5a7966.name == _0x3776e7) {
            _0x45823d = _0x5a7966;
            return;
          }
        }
      });
      if (!_0x45823d) {
        _0x45823d = this.createCategory(_0x3776e7);
      }
      _0x45823d.btns.push(_0x13c27f);
    } else {
      this.buttons.push(_0x13c27f);
    }
    this.layoutUpdate = true;
  }
  show() {
    this.instance.add(4).writeU8(1);
  }
  hide() {
    this.instance.add(4).writeU8(0);
  }
  update(_0x26ea18) {
    if (this.layoutUpdate) {
      this.updateLayout();
    }
    this.scrollArea.update(_0x26ea18);
    if (this.tabScrollArea) {
      this.tabScrollArea.update(_0x26ea18);
    }
  }
  updateLayout() {
    const _0xc1a7c2 = this;
    if (this.tabScrollArea) {
      this.tabScrollArea.removeAllContent();
    }
    this.scrollArea.removeAllContent();
    if (this.tabScrollArea) {
      let _0x2f9d5d = 0;
      this.buttons.forEach(function (_0x29b8ca) {
        if (_0x29b8ca instanceof _0x592973) {
          _0x29b8ca.mini.setXY(_0x2f9d5d * 45 + 20, 25);
          _0xc1a7c2.tabScrollArea.addContent(_0x29b8ca.mini);
          _0x2f9d5d += 1;
        }
      });
    }
    var _0x51f730 = 0;
    this.buttons.forEach(function (_0x3e3ccd) {
      if (_0x3e3ccd instanceof _0x592973) {
        if (_0x3e3ccd.getButtonsByState().length > 0) {
          let _0x1b3d5e = _0x3e3ccd.getWidth();
          let _0xa9031d = _0x3e3ccd.getHeight();
          _0x3e3ccd.setXY(_0x1b3d5e * 0.5, _0x51f730 + _0xa9031d * 0.5);
          _0xc1a7c2.scrollArea.addContent(_0x3e3ccd);
          _0x51f730 += 8 + _0xa9031d;
          if (_0x3e3ccd.show) {
            _0x3e3ccd.getButtonsByState().forEach(function (_0x3d1a35) {
              let _0x4410a0 = _0x3d1a35.getWidth();
              let _0x1a7f45 = _0x3d1a35.getHeight();
              _0x3d1a35.setXY(_0x4410a0 * 0.5, _0x51f730 + _0x1a7f45 * 0.5);
              _0xc1a7c2.scrollArea.addContent(_0x3d1a35);
              _0x51f730 += 8 + _0x1a7f45;
            });
          }
        }
      } else {
        let _0x48ac4a = _0x3e3ccd.getWidth();
        let _0x4f3d91 = _0x3e3ccd.getHeight();
        _0x3e3ccd.setXY(_0x48ac4a * 0.5, _0x51f730 + _0x4f3d91 * 0.5);
        _0xc1a7c2.scrollArea.addContent(_0x3e3ccd);
        _0x51f730 += 8 + _0x4f3d91;
      }
    });
    this.layoutUpdate = false;
  }
  createCategory(_0x2d4be2) {
    let _0x5e1ff7 = new _0x592973(_0x2d4be2);
    this.buttons.push(_0x5e1ff7);
    return _0x5e1ff7;
  }
  setTitle(_0x4970d7) {
    this.setText("title", _0x4970d7);
  }
  destruct() {
    this.scrollArea.removeAllContent();
    if (this.tabScrollArea) {
      this.tabScrollArea.removeAllContent();
    }
    this.movieClip.removeChild(this.scrollArea);
    if (this.tabScrollArea) {
      this.movieClip.removeChild(this.tabScrollArea);
    }
    _0x1de900.getSprite().removeChild(this.instance);
    _0x534a80(this.instance);
  }
}
;
class _0x2d5431 extends _0x24f4a9 {
  constructor() {
    super("debug_menu");
    this.setTitle("Debug Info");
    this.toggleDebugMenuButton = new _0x105c6f();
    this.toggleDebugMenuButton.setMovieClip(this.movieClip.getChildByName("close_button"));
    this.movieClip.addChild(this.toggleDebugMenuButton.instance);
    this.Y = 0;
  }
  addLine(_0x337644) {
    var _0x5a8f48 = _0xacf500.getMovieClip("sc/debug.sc", "debug_menu_text");
    var _0x1f60b8 = _0x5a8f48.getTextFieldByName("Text");
    _0x1242ac(_0x1f60b8, _0x337644.scptr());
    _0x5a8f48.instance.add(32).writeFloat(this.Y);
    this.scrollArea.addContent(_0x5a8f48);
    this.Y += _0x5a8f48.getHeight() + 3;
  }
  hide() {
    this.instance.add(4).writeU8(0);
  }
  destruct() {
    super.destruct();
    this.toggleDebugMenuButton.destruct();
  }
}
;
class _0x592973 extends _0x1a5ced {
  constructor(_0x113c3a) {
    super();
    this.setMovieClip(_0xacf500.getMovieClip("sc/debug.sc", "debug_menu_category"));
    if (_0x113c3a != null) {
      this.setText("+ " + _0x113c3a);
    }
    this.mini = new _0x1a5ced();
    this.mini.setMovieClip(_0xacf500.getMovieClip("sc/debug.sc", "debug_menu_category_mini"));
    if (_0x113c3a != null) {
      this.mini.setText(_0x113c3a.substring(0, 3));
    }
    this.name = _0x113c3a;
    this.btns = [];
    this.show = false;
  }
  buttonPressed(_0x110619) {
    let _0x559225 = _0x3bda8e.debugMenu;
    if (_0x110619.toInt32() == this.instance.toInt32() || _0x110619.toInt32() == this.mini.instance.toInt32()) {
      let _0x73339a = this.instance.add(32).readFloat();
      let _0x469ca9 = this.getHeight();
      _0x559225.scrollArea.scrollTo(0, _0x73339a + -5 + (_0x559225.scrollArea.instance.add(76).readFloat() - _0x469ca9) * 0.5, 1, 0.2);
    }
    this.show = this.show ? false : true;
    if (this.show) {
      this.setText("- " + this.name);
    } else {
      this.setText("+ " + this.name);
    }
    _0x559225.layoutUpdate = true;
  }
  getButtonsByState() {
    let _0x3990d3 = [];
    let _0x2257be = _0x2f72ee.getState();
    this.btns.forEach(function (_0x25d6db) {
      switch (_0x25d6db.btnType) {
        case 0:
          _0x3990d3.push(_0x25d6db);
          break;
        case 1:
          if (_0x2257be == 5) {
            _0x3990d3.push(_0x25d6db);
          }
          break;
        case 2:
          if (_0x2257be == 4) {
            _0x3990d3.push(_0x25d6db);
          }
          break;
      }
    });
    return _0x3990d3;
  }
  destruct() {
    this.btns.forEach(function (_0xb1e11f) {
      _0xb1e11f.destruct();
      _0xb1e11f = null;
    });
    this.btns = null;
    _0x534a80(this.instance);
    this.mini.destruct();
    this.mini = null;
  }
}
;
class _0xa12669 extends _0x1a5ced {
  constructor(_0x308134, _0x41a58d, _0x41957c, _0x5d51a3, _0x4482db) {
    super();
    this.setMovieClip(_0xacf500.getMovieClip("sc/debug.sc", "debug_menu_item"));
    console.log("here");
    this.setText(_0x308134);
    this.name = _0x308134;
    this.action = _0x41a58d;
    this.intParameter = _0x41957c;
    this.btnType = _0x5d51a3;
    this.categoryName = _0x4482db;
  }
  buttonPressed() {
    if (this.action <= 0) {
      if (_0x3bda8e.debugMenu) {
        _0x3bda8e.debugMenu.buttonClicked(this);
        return;
      }
    }
    if (_0x2f72ee.isState(4)) {
      var _0x190391 = _0x4933b4.getInstance();
      var _0x44ba2d = _0x3d28cd(80);
      _0x2d1d93(_0x44ba2d, 0);
      _0x44ba2d.add(24).writeInt(this.action);
      _0x44ba2d.add(28).writeInt(this.intParameter);
      _0x44ba2d.add(32).writeByteArray("tojoko".scptr().readByteArray(16));
      _0x24d45c(_0x44ba2d, _0x190391.add(36).readPointer(), 3, 0);
      _0x534a80(_0x44ba2d);
    }
  }
  destruct() {
    this.name = null;
    _0x534a80(this.instance);
  }
}
;
class _0x143912 extends _0x24f4a9 {
  constructor() {
    super("debug_menu");
    this.setTitle("Debug Menu");
    this.toggleDebugMenuButton = new _0x105c6f();
    this.toggleDebugMenuButton.setMovieClip(this.movieClip.getChildByName("close_button"));
    this.movieClip.addChild(this.toggleDebugMenuButton);
    this.createDebugMenuButton("Restart Game", -1, -1, 0, null);
    this.createDebugMenuButton("Save settings", -1, -1, 0, null);
    this.createDebugMenuButton("Debug Info", -1, -1, 2, "Preview");
    this.createDebugMenuButton("Supercell ID - Log out from all devices", -1, -1, 2, "SC ID");
    this.createDebugMenuButton("Add resources", 1, -1, 2, "Account");
    this.createDebugMenuButton("Add gems", 14, 800, 2, "Account");
    this.createDebugMenuButton("Set high yo", -1, -1, 2, "Account");
    this.createDebugMenuButton("Anti-OutOfSync", -1, -1, 2, "Account");
    this.createDebugMenuButton("Hide/show name", -1, -1, 2, "Account");
    this.createDebugMenuButton("Remove all coins", 19, -1, 2, "Account");
    this.createDebugMenuButton("Remove all gems", 18, -1, 2, "Account");
    this.createDebugMenuButton("Unlock All to lvl 7", 113, 7, 2, "Account");
    this.createDebugMenuButton("Unlock All to lvl 9", 113, 9, 2, "Account");
    this.createDebugMenuButton("Unlock opened gadgets", 114, 1, 2, "Account");
    this.createDebugMenuButton("Unlock opened star powers", 114, 2, 2, "Account");
    this.createDebugMenuButton("Unlock One", 72, -1, 2, "Account");
    this.createDebugMenuButton("Unlock & Max One", 72, 1, 2, "Account");
    this.createDebugMenuButton("Unlock All", 23, -1, 2, "Account");
    this.createDebugMenuButton("Unlock & Max All", 23, 1, 2, "Account");
    this.createDebugMenuButton("Unlock & Max All without star powers", 23, 2, 2, "Account");
    this.createDebugMenuButton("Unlock Event Slots", 63, -1, 2, "Account");
    this.createDebugMenuButton("Hide/show side mask", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Hide/show FPS", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Dark theme", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Auto aim", -1, -1, 0, "Battle");
    this.createDebugMenuButton("Auto ulti", -1, -1, 0, "Battle");
    this.createDebugMenuButton("Hold to shoot", -1, -1, 0, "Battle");
    this.createDebugMenuButton("Auto move to target", -1, -1, 0, "Battle");
    this.createDebugMenuButton("Auto play again", -1, -1, 0, "Battle");
    this.createDebugMenuButton("Send an empty emote", -1, -1, 1, "Battle");
    this.createDebugMenuButton("Add power", 54, 50, 2, "Account");
    this.createDebugMenuButton("Add score", 25, 125, 2, "Account");
    this.createDebugMenuButton("Decrease score", 26, -50, 2, "Account");
    this.createDebugMenuButton("Add Brawl Pass points this season", 81, 50, 2, "Brawl Pass");
    this.createDebugMenuButton("Add Championship Challenge Win", 84, 1, 2, "Challenge");
    this.createDebugMenuButton("Add Championship Challenge Loss", 95, 1, 2, "Challenge");
    this.createDebugMenuButton("Set CC/Esports Qualified", 102, 1, 2, "Challenge");
    this.createDebugMenuButton("Remove CC/Esports Qualified", 103, 1, 2, "Challenge");
    this.createDebugMenuButton("Force China GFX Tweaks", -1, -1, 0, "PRC / China");
    this.createDebugMenuButton("Hide/show debug items", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Hide/show connection indicator", -1, -1, 0, "GFX");
    if (!_0x1e9c90.use_stage && !_0x1e9c90.use_nulls) {
      this.createDebugMenuButton("Switch to stage server", -1, -1, 0, "Servers");
    } else {
      this.createDebugMenuButton("Switch to production server", -1, -1, 0, "Servers");
    }
    if (!_0x1e9c90.use_nulls && _0x54091c.env == "dev") {
      this.createDebugMenuButton("Switch to Null's server", -1, -1, 0, "Servers");
    }
    this.createDebugMenuButton("Claim 35 milestones", 154, -1, 2, "Account");
    this.createDebugMenuButton("Unlock Gears", 117, -1, 2, "Gears");
    this.createDebugMenuButton("Unlock current brawl pass season", 159, 0, 2, "Brawl Pass");
    this.createDebugMenuButton("Unlock current brawl pass plus season", 159, -1, 2, "Brawl Pass");
    this.createDebugMenuButton("Online skin changer", -1, -1, 0, "Account");
    this.createDebugMenuButton("Hide/show ulti aiming", -1, -1, 0, "Battle");
    if (!_0x1e9c90.use_stage && _0x54091c.env != "release") {
      this.createDebugMenuButton("Add 100 spectators", -1, -1, 0, "SC Utils");
      this.createDebugMenuButton("Add 10 spectators", -1, -1, 0, "SC Utils");
      this.createDebugMenuButton("Add 1 spectator", -1, -1, 0, "SC Utils");
      this.createDebugMenuButton("Brawl TV", -1, -1, 0, "SC Utils");
    }
    this.createDebugMenuButton("Static background", -1, -1, 2, "GFX");
    this.createDebugMenuButton("AI on/off", -1, -1, 0, "Battle");
    this.createDebugMenuButton("Anti AFK", -1, -1, 0, "Battle");
    if (_0x54091c.env == "dev") {
      this.createDebugMenuButton("Send all inputs", -1, -1, 0, "Battle");
    }
    this.createDebugMenuButton("Hide/show special offers", -1, -1, 0, "Optimization");
    this.createDebugMenuButton("Character sounds on/off", -1, -1, 0, "Optimization");
    this.createDebugMenuButton("Use default theme on/off", -1, -1, 2, "Optimization");
    this.createDebugMenuButton("Slow mode on/off", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Visual chromatic name on/off", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Outline on/off", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Emote animation on/off", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Future events on/off", -1, -1, 0, "GFX");
    this.createDebugMenuButton("Movement based autoshoot on/off", -1, -1, 0, "Battle");
    if (_0x54091c.env == "dev") {
      this.createDebugMenuButton("Add new season", -1, -1, 0, "Tests");
      this.createDebugMenuButton("Collect all free offers", -1, -1, 0, "Tests");
      for (let _0x2beae6 = 0; _0x2beae6 < 228; _0x2beae6++) {
        this.createDebugMenuButton("Debug CMD " + _0x2beae6, _0x2beae6, 100, 2, "Tests");
      }
    }
    this.createDebugMenuButton("Auto dodge on/off", -1, -1, 0, "Battle");
    this.createDebugMenuButton("Hide battle state", -1, -1, 0, "Battle");
    var _0xa5e321 = this;
    this.createDebugMenuButton("Disable spoof", -1, -1, 0, "Battle server location");
    var _0x444e4d = "".scptr();
    new NativeFunction(_0x1602d8.add(4274472), "void", ["pointer", "pointer"])(_0x444e4d, _0x1602d8.add(13044272).readPointer());
    _0x444e4d.fromsc().split("\n").forEach(function (_0x2801a7) {
      if (_0x2801a7.startsWith("R:")) {
        var _0xf8e890 = "?";
        try {
          _0xf8e890 = _0x2801a7.split("-> ")[1].split(" m")[0].replace(" ", "");
          if (_0xf8e890 == "40") {
            _0xf8e890 = "?";
          } else {
            _0xf8e890 = parseInt(_0xf8e890) - 400;
          }
        } catch {}
        _0xa5e321.createDebugMenuButton(_0x2801a7.split("R:")[1].split("|")[0] + "-" + _0x2801a7.split("|")[1].split(" ")[0] + " -- " + _0xf8e890 + "ms", -1, -1, 0, "Battle server location");
      }
    });
    var _0x1cda6e = this.movieClip.getTextFieldByName("search_help");
    _0x1242ac(_0x1cda6e, "t.me/gene_land".scptr());
    this.movieClip.setChildVisible("debug_menu_input_button", false);
    this.movieClip.setChildVisible("clear_button", false);
    let _0x4dcefa = [];
    let _0x4a6cc0 = [];
    this.buttons.forEach(function (_0x4a1443) {
      if (_0x4a1443 instanceof _0x592973) {
        _0x4dcefa.push(_0x4a1443);
      } else {
        _0x4a6cc0.push(_0x4a1443);
      }
    });
    function _0x6d925(_0x263988, _0x5badf2) {
      if (_0x263988.name < _0x5badf2.name) {
        return -1;
      }
      if (_0x263988.name > _0x5badf2.name) {
        return 1;
      }
      return 0;
    }
    _0x4a6cc0.sort(_0x6d925);
    _0x4dcefa.sort(_0x6d925);
    this.buttons = _0x4a6cc0.concat(_0x4dcefa);
    this.layoutUpdate = true;
  }
  buttonClicked(_0xb758d4) {
    console.log(_0xb758d4.categoryName);
    if (_0xb758d4.categoryName == "Battle server location") {
      if (_0xb758d4.name == "Disable spoof") {
        _0x37cab0.showFloaterText("Spoof of battle location is disabled!");
        _0x1e9c90.battle_region = -1;
        for (let _0x57a464 = 0; _0x57a464 < 30; _0x57a464++) {
          _0x453d24 = _0x3d28cd(104);
          new NativeFunction(_0x1602d8.add(7146988), "void", ["pointer", "pointer", "pointer", "pointer"])(_0x453d24, ptr(1), ptr(1), ptr(_0x57a464));
          _0x2dd60b(_0x453d24);
        }
        _0x236138();
        return;
      }
      var _0x59ee5a = parseInt(_0xb758d4.name.split("-")[0]);
      _0x37cab0.showFloaterText("Changing battle server to " + _0xb758d4.name.split("--")[0] + "..");
      _0x3bda8e.changeRegion = true;
      _0x3bda8e.isChanged = false;
      var _0x453d24;
      if (_0x1e9c90.battle_region > -1) {
        _0x453d24 = _0x3d28cd(104);
        new NativeFunction(_0x1602d8.add(7146988), "void", ["pointer", "pointer", "pointer", "pointer"])(_0x453d24, ptr(1), ptr(1), ptr(_0x1e9c90.battle_region));
        _0x2dd60b(_0x453d24);
        _0x453d24 = _0x3d28cd(104);
        new NativeFunction(_0x1602d8.add(7146988), "void", ["pointer", "pointer", "pointer", "pointer"])(_0x453d24, ptr(1), ptr(1), ptr(_0x59ee5a));
        _0x2dd60b(_0x453d24);
      } else {
        for (let _0x5b335a = 0; _0x5b335a < 30; _0x5b335a++) {
          _0x453d24 = _0x3d28cd(104);
          new NativeFunction(_0x1602d8.add(7146988), "void", ["pointer", "pointer", "pointer", "pointer"])(_0x453d24, ptr(1), ptr(1), ptr(_0x5b335a));
          _0x2dd60b(_0x453d24);
        }
      }
      _0x1e9c90.battle_region = _0x59ee5a;
      return;
    }
    switch (_0xb758d4.name) {
      case "Send all inputs":
        if (_0x54091c.env != "dev") {
          _0x37cab0.showFloaterText("This feature only available for DEV build. How you found it?");
          break;
        }
        for (let _0x1a0fbb = 0; _0x1a0fbb < 35; _0x1a0fbb++) {
          setTimeout(function () {
            _0x37cab0.showFloaterText("Sent " + _0x1a0fbb);
            _0x4eb606.addInput(new _0x2cb258(_0x1a0fbb));
          }, _0x1a0fbb * 1000);
        }
        break;
      case "Restart Game":
        _0x3d60f4();
        _0x1de900.reloadGame();
        break;
      case "Set high yo":
        if (!_0x17248f()) {
          _0x27b4b7();
          return;
        }
        _0x37cab0.showFloaterText("Возраст аккаунта изменён!\nПотрогайте mute chat что бы унлокнуть чат!");
        let _0x3c06ff = _0x3d28cd(28);
        new NativeFunction(_0x1602d8.add(5857604), "void", ["pointer", "int"])(_0x3c06ff, 23);
        _0x408aaa(_0x4933b4.getInstance(), _0x3c06ff);
        break;
      case "Supercell ID - Log out from all devices":
        _0x576748(_0x243a85.readPointer());
        break;
      case "Hide/show debug items":
        _0x3bda8e.debugButton.instance.add(4).writeU8(0);
        _0x3bda8e.debugMenu.instance.add(4).writeU8(0);
        _0x37cab0.showFloaterText(_0x1a9313("DEBUG_HIDDEN"));
        break;
      case "Hide/show ulti aiming":
        _0x1e9c90.ulti_targeting = _0x1e9c90.ulti_targeting ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.ulti_targeting ? "ULTI_TARGETING_HIDDEN" : "ULTI_TARGETING_VISIBLE"));
        break;
      case "AI on/off":
        _0x3bda8e.aiEnabled = _0x3bda8e.aiEnabled ? false : true;
        _0x3bda8e.autoShoot = _0x3bda8e.aiEnabled;
        _0x3bda8e.moveToTarget = _0x3bda8e.aiEnabled;
        _0x3bda8e.autoUlti = _0x3bda8e.aiEnabled;
        _0x37cab0.showFloaterText(_0x1a9313(_0x3bda8e.aiEnabled ? "AI_ENABLED" : "AI_DISABLED"));
        break;
      case "Anti AFK":
        _0x1e9c90.anti_afk = _0x1e9c90.anti_afk ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.anti_afk ? "ANTI_AFK_ON" : "ANTI_AFK_OFF"));
        break;
      case "Hide/show connection indicator":
        _0x1e9c90.show_connection_indicator = _0x1e9c90.show_connection_indicator ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.show_connection_indicator ? "CONNECTION_INDICATOR_ON" : "CONNECTION_INDICATOR_OFF"));
        break;
      case "Force China GFX Tweaks":
        _0x564958.writeU8(_0x564958.readU8() ? 0 : 1);
        break;
      case "Hide/show name":
        _0x1e9c90.hide_name = _0x1e9c90.hide_name ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.hide_name ? "NAME_HIDDEN" : "NAME_VISIBLE"));
        break;
      case "Switch to stage server":
        _0x1e9c90.use_stage = true;
        _0x1de900.reloadGame();
        break;
      case "Switch to Null's server":
        _0x1e9c90.use_nulls = true;
        _0x1de900.reloadGame();
        break;
      case "Static background":
        _0x1e9c90.static_background = _0x1e9c90.static_background ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.static_background ? "STATIC_BACKGROUND_ON" : "STATIC_BACKGROUND_OFF"));
        break;
      case "Switch to production server":
        _0x1e9c90.use_stage = false;
        _0x1de900.reloadGame();
        break;
      case "Swap map":
        _0x1602d8.add(13043288).writeU8(_0x1602d8.add(13043288).readU8() ? 0 : 1);
        break;
      case "Anti-OutOfSync":
        _0x3bda8e.antiOutOfSync = _0x3bda8e.antiOutOfSync ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x3bda8e.antiOutOfSync ? "ANTI_OOS" : "ANTI_OOS_OFF"));
        break;
      case "Auto aim":
        if (!_0x17248f()) {
          _0x27b4b7();
          return;
        }
        _0x3bda8e.holdToShoot = false;
        _0x3bda8e.autoShoot = _0x3bda8e.autoShoot ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x3bda8e.autoShoot ? "AUTO_AIM_ON" : "AUTO_AIM_OFF"));
        break;
      case "Auto move to target":
        if (!_0x17248f()) {
          _0x27b4b7();
          return;
        }
        _0x3bda8e.moveToTarget = _0x3bda8e.moveToTarget ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x3bda8e.moveToTarget ? "AUTO_MOVE_TO_TARGET_ON" : "AUTO_MOVE_TO_TARGET_OFF"));
        break;
      case "Online skin changer":
        _0x1e9c90.online_skinchanger = _0x1e9c90.online_skinchanger ? false : true;
        _0x37cab0.showFloaterText("Пока меняет только основную часть!");
        setTimeout(function () {
          _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.online_skinchanger ? "SKIN_ON" : "SKIN_OFF"));
        }, 2000);
        break;
      case "Auto ulti":
        if (!_0x17248f()) {
          _0x27b4b7();
          return;
        }
        _0x3bda8e.autoUlti = _0x3bda8e.autoUlti ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x3bda8e.autoUlti ? "AUTO_ULTI_ON" : "AUTO_ULTI_OFF"));
        break;
      case "Hide/show side mask":
        _0x1e9c90.sidemask = _0x1e9c90.sidemask ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.sidemask ? "SIDE_MASK_ON" : "SIDE_MASK_OFF"));
        break;
      case "Hide/show FPS":
        _0x1e9c90.show_fps = _0x1e9c90.show_fps ? false : true;
        if (_0x1e9c90.show_fps) {
          _0x37cab0.showFloaterText(_0x1a9313("FPS_ON"));
          if (_0x3bda8e.debugMenuTxt) {
            _0x3bda8e.debugMenuTxt.add(4).writeU8(1);
          } else {
            _0x279b0c();
          }
        } else {
          _0x37cab0.showFloaterText(_0x1a9313("FPS_OFF"));
          if (_0x3bda8e.debugMenuTxt) {
            _0x3bda8e.debugMenuTxt.instance.add(4).writeU8(0);
          }
        }
        break;
      case "Dark theme":
        _0x1e9c90.dark_theme = _0x1e9c90.dark_theme ? false : true;
        _0x236138();
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.dark_theme ? "USE_DARK_THEME_ON" : "USE_DARK_THEME_OFF"));
        setTimeout(function () {
          _0x1de900.reloadGame();
        }, 5000);
        break;
      case "Hold to shoot":
        if (!_0x17248f()) {
          _0x27b4b7();
          return;
        }
        _0x3bda8e.autoShoot = false;
        _0x3bda8e.holdToShoot = _0x3bda8e.holdToShoot ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x3bda8e.holdToShoot ? "HOLD_TO_SHOOT_ON" : "HOLD_TO_SHOOT_OFF"));
        break;
      case "Auto play again":
        if (!_0x17248f()) {
          _0x27b4b7();
          return;
        }
        _0x3bda8e.autoPlayAgain = _0x3bda8e.autoPlayAgain ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x3bda8e.autoPlayAgain ? "AUTO_PLAY_AGAIN_ON" : "AUTO_PLAY_AGAIN_OFF"));
        break;
      case "Send an empty emote":
        if (_0x2f72ee.isState(5)) {
          _0x4eb606.addInput(new _0x2cb258(9));
        }
        break;
      case "Add 100 spectators":
        _0x466afb(100);
        break;
      case "Add 10 spectators":
        _0x466afb(10);
        break;
      case "Add 1 spectator":
        _0x466afb(1);
        break;
      case "Brawl TV":
        _0x466afb(1, true);
        break;
      case "Debug Info":
        _0x3bda8e.debugInfo = new _0x2d5431();
        this.hide();
        _0x1de900.getSprite().addChild(_0x3bda8e.debugInfo);
        _0x3bda8e.debugInfo.addLine(_0x3bda8e.debugInfoText);
        break;
      case "Save settings":
        try {
          _0x236138();
          _0x37cab0.showFloaterText(_0x1a9313("SETTINGS_SAVED"));
        } catch (_0x23cbbc) {
          _0x37cab0.showFloaterText(_0x1a9313("SETTINGS_SAVE_FAILED"));
        }
        break;
      case "Hide/show special offers":
        _0x1e9c90.special_offers = _0x1e9c90.special_offers ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.special_offers ? "SPECIAL_OFFERS_ON" : "SPECIAL_OFFERS_OFF"));
        break;
      case "Character sounds on/off":
        _0x1e9c90.character_sounds = _0x1e9c90.character_sounds ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.character_sounds ? "CHARACTER_SOUNDS_ON" : "CHARACTER_SOUNDS_OFF"));
        break;
      case "Slow mode on/off":
        _0x1e9c90.slow_mode = _0x1e9c90.slow_mode ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.slow_mode ? "SLOW_MODE_ON" : "SLOW_MODE_OFF"));
        break;
      case "Visual chromatic name on/off":
        _0x1e9c90.visual_chromatic_name = _0x1e9c90.visual_chromatic_name ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.visual_chromatic_name ? "VISUAL_CHROMATIC_NAME_ON" : "VISUAL_CHROMATIC_NAME_OFF"));
        break;
      case "Outline on/off":
        _0x1e9c90.disable_outline = _0x1e9c90.disable_outline ? false : true;
        _0x1de900.reloadGame();
        break;
      case "Emote animation on/off":
        _0x1e9c90.emote_animation = _0x1e9c90.emote_animation ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.emote_animation ? "EMOTE_ANIM_ON" : "EMOTE_ANIM_OFF"));
        break;
      case "Movement based autoshoot on/off":
        _0x1e9c90.movement_based_autoshoot = _0x1e9c90.movement_based_autoshoot ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.movement_based_autoshoot ? "MOV_AUTOSHOOT_ON" : "MOV_AUTOSHOOT_OFF"));
        break;
      case "Use default theme on/off":
        _0x1e9c90.default_theme = _0x1e9c90.default_theme ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.default_theme ? "USE_DEFAULT_THEME_ON" : "USE_DEFAULT_THEME_OFF"));
        _0x236138();
        setTimeout(function () {
          _0x1de900.reloadGame();
        }, 5000);
        break;
      case "Add new season":
        break;
      case "Future events on/off":
        _0x1e9c90.future_events = _0x1e9c90.future_events ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.future_events ? "FUTURE_EVENTS_SHOW" : "FUTURE_EVENTS_SHOW_OFF"));
        break;
      case "Collect all free offers":
        console.log("collecting");
        let _0x1d4248 = setInterval(function () {
          let _0x35e259 = _0x4933b4.getPlayerData();
          let _0x35a87b = _0x35e259.add(192).readPointer();
          let _0x1679be = _0x35a87b.add(8).readInt();
          let _0x33e4ad = 0;
          for (let _0x1cbf67 = 0; _0x1cbf67 < _0x1679be; _0x1cbf67++) {
            let _0x530663 = _0x35a87b.readPointer().add(_0x1cbf67 * 4).readPointer();
            let _0x1db277 = _0x21d949(_0x35e259, _0x530663);
            let _0x1d84c7 = _0x188239(_0x4933b4.getInstance().add(36).readPointer(), _0x1db277, 0, 0);
            if (_0x1d84c7 == 0) {
              console.log("can purchase: " + _0x1db277);
              let _0x4a8d35 = _0x3d28cd(44);
              _0x197e5c(_0x4a8d35, _0x1db277, 0, 0, 0);
              _0x408aaa(_0x4933b4.getInstance(), _0x4a8d35);
              _0x33e4ad += 1;
            }
          }
          if (_0x33e4ad == 0) {
            clearInterval(_0x1d4248);
            console.log("collected all free offers");
          }
        }, 200);
        break;
      case "FPS limit bypass on/off":
        _0x1e9c90.fps_limit_bypass = _0x1e9c90.fps_limit_bypass ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.fps_limit_bypass ? "FPS_LIMIT_DISABLED" : "FPS_LIMIT_ENABLED"));
        if (_0x1e9c90.fps_limit_bypass) {} else {}
        _0x236138();
        break;
      case "Auto dodge on/off":
        _0x1e9c90.auto_dodge = _0x1e9c90.auto_dodge ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.auto_dodge ? "AUTO_DODGE_ON" : "AUTO_DODGE_OFF"));
        break;
      case "Hide battle state":
        _0x1e9c90.hide_spectate = _0x1e9c90.hide_spectate ? false : true;
        _0x37cab0.showFloaterText(_0x1a9313(_0x1e9c90.hide_spectate ? "HIDE_SPECTATE_ON" : "HIDE_SPECTATE_OFF"));
        break;
    }
  }
  update(_0x2cc640) {
    super.update(_0x2cc640);
  }
  createDebugMenuButton(_0x9c4ba8, _0x16c4c8, _0x283764, _0x312285, _0x247e19) {
    console.log("jump ok!");
    this.addDebugMenuButton(new _0xa12669(_0x9c4ba8, _0x16c4c8, _0x283764, _0x312285, _0x247e19), _0x247e19);
  }
  destruct() {
    this.toggleDebugMenuButton.destruct();
    this.toggleDebugMenuButton = null;
    super.destruct();
  }
}
const _0x4eb606 = {
  addInput(_0x1c6a44) {
    _0x4dd5cf(_0x6b19ef.getInstance().add(_0xc4867d).readPointer(), _0x1c6a44.instance ? _0x1c6a44.instance : _0x1c6a44);
  }
};
function _0x3d60f4() {
  if (_0x3bda8e.debugMenu) {
    _0x3bda8e.debugMenu.destruct();
    _0x3bda8e.debugMenu = undefined;
  }
  if (_0x3bda8e.debugButton) {
    _0x3bda8e.debugButton.destruct();
    _0x3bda8e.debugButton = undefined;
  }
  Interceptor.revert(_0x1c3d27);
}
function _0x303753(_0x3f7dfe) {
  return Math.floor(Math.random() * _0x3f7dfe);
}
function _0x446e48(_0x5c7a8b, _0x57fe2e) {
  return Math.random() * (_0x57fe2e - _0x5c7a8b) + _0x5c7a8b;
}
function _0x2a160c(_0x2f98a7, _0x167577) {
  let _0x371ef6 = [3600, 60].reduceRight((_0x1d6635, _0x446b8b) => _0x5b5028 => [Math.floor(_0x5b5028 / _0x446b8b)].concat(_0x1d6635(_0x5b5028 % _0x446b8b)), _0x368ccc => [_0x368ccc])(_0x2f98a7).map(_0x4ff5a2 => _0x4ff5a2.toString().padStart(2, "0")).join(":");
  let _0x564650 = _0x371ef6.split(":");
  return _0x564650[0] + " hours, " + _0x564650[1] + " mins, " + _0x564650[2] + " secs";
}
function _0x2b21fe(_0x39ea41) {
  var _0x5b3372 = [];
  var _0x2a1098 = [];
  for (var _0xa3b98a = 0; _0xa3b98a < _0x39ea41.length; ++_0xa3b98a) {
    var _0x1b00ee = _0x39ea41.charCodeAt(_0xa3b98a);
    _0x5b3372 = _0x5b3372.concat([_0x1b00ee]);
    _0x2a1098 = _0x2a1098.concat([_0x1b00ee & 255, _0x1b00ee / 256 >>> 0]);
  }
  return _0x2a1098;
}
function _0x184915(_0x2b3252) {
  let _0x4bb6c3 = 0;
  for (let _0x48d1e1 = 0; _0x48d1e1 < _0x2b3252.length; _0x48d1e1++) {
    _0x4bb6c3 += _0x2b3252[_0x48d1e1] * 23;
  }
  return _0x4bb6c3;
}
function _0x3e6218(_0x3bb32b) {
  const _0x52d5a4 = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2600-\u27FF]/g;
  const _0x27da53 = _0x3bb32b.match(_0x52d5a4);
  if (_0x27da53) {
    return _0x27da53.length;
  } else {
    return 0;
  }
}
_0x3bda8e.fakeSkins = [];
function _0x308017(_0x399d46, _0x3f8112) {
  let _0x1c8c14 = _0x399d46[0];
  let _0x4a6a15 = _0x3f8112 ? _0x1c8c14.add(92).readPointer() : _0x1c8c14.add(92);
  if (_0x54091c.env != "release") {
    if (_0x4a6a15.fromsc().startsWith("/reload")) {
      if (!_0x9ad7a5()) {
        _0x37cab0.showFloaterText("ты чё самый умный а хуй тебе");
        return;
      }
      if (_0x3bda8e.debugMenu) {
        _0x3bda8e.debugMenu.layoutUpdate = true;
        _0x3bda8e.debugMenu.update(20);
      }
      _0x37cab0.showFloaterText("Debug Menu перезагружено.");
    }
    if (_0x4a6a15.fromsc().startsWith("/code")) {
      if (_0x9ad7a5()) {
        _0x37cab0.showFloaterText("ты чё самый умный нахуй тебе опять код вводить долбаёб");
        return;
      }
      let _0xde7315 = _0x4a6a15.fromsc();
      let _0x1ee8f9 = _0xde7315.split(" ");
      try {
        let _0x2ade10 = _0x1ee8f9[1];
        if (_0xb8f2d6() == _0x2ade10) {
          _0x4a6a15.writeByteArray("Success!".scptr().readByteArray(16));
          File.writeAllText(_0x105e16 + "files/code.txt", _0x2ade10);
          _0x4a7c02.jumpout(_0x1602d8.add(6025292), _0x1602d8.add(6025348));
          _0x3bda8e.debugCode = _0x2ade10;
          if (_0x3bda8e.debugMenu) {
            _0x3bda8e.debugMenu.layoutUpdate = true;
          }
          _0x37cab0.showFloaterText(_0x1a9313("AUTH_SUCCESS"));
          _0x3bda8e.checked = false;
          _0x3bda8e.reqCheck = true;
          _0x242b88();
          return;
        } else {
          _0x4a6a15.writeByteArray("Try again".scptr().readByteArray(16));
          _0x37cab0.showFloaterText(_0x1a9313("CODE_WRONG") + _0x1bf929());
          return;
        }
      } catch (_0x24004b) {
        _0x4a6a15.writeByteArray("Try again!".scptr().readByteArray(16));
        _0x37cab0.showFloaterText("/code код");
        return;
      }
    }
    if (_0x4a6a15.fromsc().startsWith("/debug")) {
      if (_0x9ad7a5()) {
        if (_0x3bda8e.debugButton.instance.add(4).readU8()) {
          _0x37cab0.showFloaterText("ты чё умный дохуя");
          return;
        }
        _0x3bda8e.debugButton.instance.add(4).writeU8(1);
        _0x4a6a15.writeByteArray("Success!".scptr().readByteArray(16));
      } else {
        if (!_0x17248f()) {
          _0x27b4b7();
        }
        return;
      }
    }
    if (_0x4a6a15.fromsc().startsWith("/spam")) {
      if (_0x9ad7a5()) {
        _0x3bda8e.spamText = _0x4a6a15.fromsc().split("/spam ")[1];
        _0x4a6a15.writeByteArray("Щяс начнется...".scptr().readByteArray(16));
        let _0x28b042 = _0x3f8112 ? _0x2c35df : _0x52704e;
        setTimeout(function () {
          _0x3bda8e.spamInterval = setInterval(function () {
            var _0x4ca1a3 = _0x3d28cd(256);
            new NativeFunction(_0x28b042, "void", ["pointer"])(_0x4ca1a3);
            if (!_0x3f8112) {
              _0x4ca1a3.add(92).writeByteArray(_0x3bda8e.spamText.scptr().readByteArray(16));
            } else {
              _0x4ca1a3.add(92).writePointer(_0x3bda8e.spamText.scptr());
            }
            _0x2dd60b(_0x4ca1a3);
          }, 50);
        }, 200);
      } else {
        _0x27b4b7();
        return;
      }
    }
    if (_0x4a6a15.fromsc().startsWith("/pf")) {
      let _0x1a7f52 = _0x4a6a15.fromsc().split("/pf")[1].replace(" ", "");
      if (!_0x1a7f52.startsWith("#")) {
        _0x37cab0.showFloaterText("ты чё еблан чтоли");
        return;
      }
      let _0x11b336 = _0x370740.toId(_0x1a7f52);
      _0x4a6a15.writeByteArray("мама я фурри".scptr().readByteArray(16));
      _0x37cab0.showFloaterText("Открой любой профиль!");
      let _0x3c2daf = Interceptor.attach(_0x1602d8.add(2887356), {
        onEnter(_0x2fe4c6) {
          _0x3c2daf.detach();
          console.log(_0x2fe4c6[1].readInt() + "-" + _0x2fe4c6[1].add(4).readInt());
          _0x2fe4c6[1].writeInt(_0x11b336[0]);
          _0x2fe4c6[1].add(4).writeInt(_0x11b336[1]);
        }
      });
    }
    if (_0x4a6a15.fromsc().startsWith("/waste")) {
      let _0x2de44e = _0x4a6a15.fromsc().split("/waste ")[1];
      _0x4a6a15.writeByteArray(";3".scptr().readByteArray(16));
      _0x42931d(Number(_0x2de44e));
    }
    if (_0x4a6a15.fromsc().startsWith("/shell")) {
      let _0x5e3108 = _0x4a6a15.fromsc().split("/shell ")[1];
      _0x4a6a15.writeByteArray(":3".scptr().readByteArray(16));
      _0x43fe8a(_0x5e3108.ptr());
    }
    if (_0x4a6a15.fromsc().startsWith("/loginscid")) {
      _0x4a6a15.writeByteArray("Success!".scptr().readByteArray(16));
      let _0x414fb4 = _0x4a6a15.fromsc().split("/loginscid ")[1];
      _0x3bda8e.scid = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImM3NWE3ZjgzZTkzMyJ9.eyJzdWIiOiI1NS04NzM5MjQ1Ny00YzZlLTRjZmEtODQxZC1hZjdlMTFlYzc4ZGUiLCJnYW1lIjoibGFzZXIiLCJodHRwczovL2lkLnN1cGVyY2VsbC5jb20vdHlwZSI6ImFjY291bnQiLCJodHRwczovL2lkLnN1cGVyY2VsbC5jb20vYXBwRW52IjoicHJvZCIsImh0dHBzOi8vaWQuc3VwZXJjZWxsLmNvbS9hcHBBY2NvdW50SWQiOiI1LTE4MTk4MzY2IiwiaXNzIjoiaWQuc3VwZXJjZWxsLmNvbSIsInBpZCI6IjUtMTgxOTgzNjYiLCJodHRwczovL2lkLnN1cGVyY2VsbC5jb20vYXBwIjoibGFzZXIiLCJlbnYiOiJwcm9kIiwiaWF0IjoxNzEwMTQ1NTg1LCJzY2lkIjoiNTUtODczOTI0NTctNGM2ZS00Y2ZhLTg0MWQtYWY3ZTExZWM3OGRlIn0.fsdFwrZyfNo_vcOEASSyl3efhafLU2mHDdV7pVIKp51SyjzMzO8yMo7bosy7LfOv9dRdpQjzeFaoAn9RS9orZg";
      _0x1de900.reloadGame();
    }
    if (_0x4a6a15.fromsc().startsWith("/frida")) {
      _0x4a6a15.writeByteArray(Frida.version.scptr().readByteArray(16));
    }
    if (_0x4a6a15.fromsc().startsWith("/allowskin")) {
      _0x4a6a15.writeByteArray("мяу!".scptr().readByteArray(16));
      _0x1e9c90.online_skinchanger = true;
    }
    if (_0x4a6a15.fromsc().startsWith("/stop")) {
      if (_0x3bda8e.spamInterval) {
        clearInterval(_0x3bda8e.spamInterval);
        _0x3bda8e.spamInterval = null;
        _0x37cab0.showFloaterText("Спам остановлен.");
      } else if (_0x3bda8e.otvalInterval) {
        clearInterval(_0x3bda8e.otvalInterval);
        _0x3bda8e.otvalInterval = null;
        _0x37cab0.showFloaterText("Отвал остановлен.");
      }
    }
    if (_0x4a6a15.fromsc().startsWith("/hidedebuginfo")) {
      _0x37cab0.showFloaterText("Debug info hidden");
      _0x1e9c90.hide_debug_info = true;
    }
    if (_0x4a6a15.fromsc().startsWith("/showdebuginfo")) {
      _0x37cab0.showFloaterText("Debug info show");
      _0x1e9c90.hide_debug_info = false;
    }
    if (_0x4a6a15.fromsc().startsWith("/addskin")) {
      let _0x3c960b = _0x4a6a15.fromsc();
      try {
        let _0x5c8641 = Number(_0x3c960b.split("/addskin ")[1]);
        let _0x4da6a8 = _0xd1283d(29000000 + Number(_0x5c8641));
        _0x3bda8e.fakeSkins.push(_0x5c8641);
        _0x4da6a8.add(12).writeInt(0);
        _0x4da6a8.add(16).writePointer("Voucher redeemed".scptr());
        _0x4da6a8.add(32).writeInt(new NativeFunction(Module.findExportByName("libc.so", "time"), "int", ["int"])(0));
        _0x1bcfb3(_0x4933b4.getClientHome(), _0x4da6a8);
      } catch (_0x4ea8c4) {
        _0x37cab0.showFloaterText("ты че еблан");
      }
      _0x4a6a15.writeByteArray("dud".scptr().readByteArray(16));
    }
    if (_0x4a6a15.fromsc().startsWith("/spectate")) {
      let _0x4d6db0 = _0x4a6a15.fromsc();
      try {
        let _0x23ef2f = _0x4d6db0.split("/spectate ")[1].replace(" ", "");
        if (!_0x23ef2f.startsWith("#")) {
          _0x37cab0.showFloaterText("ты чё еблан чтоли");
          return;
        }
        let _0xbb05ee = _0x370740.toId(_0x23ef2f);
        let _0x41e75a = _0x3d28cd(8);
        _0x41e75a.writeInt(_0xbb05ee[0]);
        _0x41e75a.add(4).writeInt(_0xbb05ee[1]);
        let _0xd2e4c0 = _0x3d28cd(100);
        _0x231b1a(_0xd2e4c0, _0x41e75a, 0);
        _0x2dd60b(_0xd2e4c0);
      } catch (_0x6b6c1a) {
        _0x37cab0.showFloaterText("ты чё еблан");
      }
      _0x4a6a15.writeByteArray("OK".scptr().readByteArray(16));
    }
    if (_0x4a6a15.fromsc().startsWith("/otval")) {
      if (_0x9ad7a5()) {
        _0x4a6a15.writeByteArray("Щяс начнется...".scptr().readByteArray(16));
        let _0xeca775 = ["😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇🥰😍🤩😘😗☺️😚😙🥲😋😛😜🤪😝🤑🤗🤭🫢🫣🤫🤔🫡🤐🤨😐😑😶🫥😶‍🌫️😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧", "🥵🥶🥴😵😵‍💫🤯🤠🥳🥸😎🤓🧐😕🫤😟🙁☹️😮😯😲😳🥺🥹😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀☠️💩🤡👹👺👻👽👾🤖😺😸😹😻😼", "😽🙀😿😾🙈🙉🙊💋💌💘💝💖💗💓💞💕💟❣️💔❤️‍🔥❤️‍🩹❤️🧡💛💚💙💜🤎🖤🤍💯💢💥💫💦💨🕳💣💬👁‍🗨🗨🗯💭💤👋🏿🤚🏿🖐🏿🖖🏿✋🏿🫱🏿🫲🏿🫳🏿🫴🏿👌🏿", "🤌🏿🤏🏿✌🏿🤞🏿🫰🏿🤟🏿🤘🏿🤙🏿👈🏿👉🏿👆🏿🖕🏿👇🏿☝🏿🫵🏿👍🏿👎🏿✊🏿👊🏿🤛🏿🤜🏿👏🏿🙌🏿🫶🏿👐🏿🤲🏿🤝🏿🙏🏿✍🏿💅🏿🤳🏿💪🏿🦾🦿🦵🏿🦶🏿👂🏿🦻🏿👃🏿🧠🫀🫁🦷🦴👀👁👅👄🫦👶🏿🧒🏿", "🧑🏿👱🏿🧔🏿👨🏿‍🦰🧑🏿‍🦱🧑🏿‍🦳🧑🏿‍🦲👴🏿🙍🏿🙎🏿🙅🏿🙆🏿💁🏿🙋🏿🧏🏿🙇🏿🤦🏿🤷🏿👨🏿‍⚕️👨🏿‍🎓🧑🏿‍🏫👨🏿‍⚖️👨🏿‍🌾👨🏿‍🍳👨🏿‍🔧👨🏿‍🏭👨🏿‍💼👨🏿‍🔬👨🏿‍💻👨🏿‍🎤👨🏿‍✈️👨🏿‍🎨👨🏿‍🚀👨🏿‍🚒👮🏿‍♂️🕵🏿‍♂️💂🏿‍♂️🥷🏿👷🏿‍♂️🫅🏿🤴🏿👸🏿👳🏿‍♂️👲🏿🧕🏿🤵🏿‍♂️👰🏿‍♂️🤰🏿🤱🏿🧑🏿‍🍼👼🏿🎅🏿", "🤶🏿🧑🏿‍🎄🦸🏿‍♂️🦹🏿‍♂️🧙🏿‍♂️🧚🏿🧜🏿🧝🏿🧞‍♀️🧟🧌💆🏿💇🏿🚶🏿🧍🏿🧎🏿🧑🏿‍🦯🧑🏿‍🦼🧑🏿‍🦽🏃🏿💃🏿🕺🏿🕴🏿👯🧖🏿‍♂️🧗🏿🤺🏇🏿⛷🏂🏌🏿🏄🏿🚣🏿🏊🏿‍♂️⛹🏿🏋🏿🚴🏿🚵🏿🤸🏿🤼🤽🏿🤾🏿🤹🏿🧘🏿🛀🏿🛌🏿🧑🏿‍🤝‍🧑🏿👭🏿👫", "🏿👬🏿💏👩‍❤️‍💋‍👨👨‍❤️‍💋‍👨👩‍❤️‍💋‍👩💑👩‍❤️‍👨👨‍❤️‍👨👩‍❤️‍👩👪👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👦👨‍👦‍👦👨‍👧👨‍👧👨‍👧‍👦👨‍👧‍👧👩‍👦👩‍👦‍👦👩‍👧👩‍👧‍👦👩‍👧‍👧🗣👤👥🫂👣🐵🐒🦍🦧🐶🐕🦮🐕‍🦺🐩🐺🦊🦝🐱🐈🐈‍⬛🦁", "🐯🐅🐆🐴🐎🦄🦓🦌🦬🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦙🦒🐘🦣🦏🦛🐭🐁🐀🐹🐰🐇🐿🦫🦔🦇🐻🐻‍❄️🐨🐼🦥🦦🦨🦘🦡🐾🦃🐔🐓🐣🐤🐥🐦🐧🕊🦅🦆", "🦢🦉🦤🪶🦩🦚🦜🐸🐊🐢🦎🐍🐲🐉🦕🦖🐳🐋🐬🦭🐟🐠🐡🦈🐙🐚🪸🐌🦋🐛🐜🐝🪲🐞🦗🪳🕷🕸🦂🦟🪰🪱🦠💐🌸💮🪷🏵🌹🥀🌺🌻🌼🌷🌱🪴🌲🌳🌴🌵", "🌾🌿☘️🍀🍁🍂🍃🪹🪺🎃🎄🎆🎇🧨✨🎈🎉🎊🎋🎍🎎🎏🎐🎑🧧🎀🎁🎗🎟🎫🎖🏆🏅🥇🥈🥉⚽️⚾️🥎🏀🏐🏈🏉🎾🥏🎳🏏🏑🏒🥍🏓🏸🥊🥋🥅⛳️⛸🎣🤿🎽", "🎿🛷🥌🎯🪀🪁🎱🔮🪄🧿🪬🎮🕹🎰🎲🧩🧸🪅🪩🪆♠️♥️♦️♣️♟🃏🀄️🎴🎭🖼🎨🧵🪡🧶🪢🌍🌎🌏🌐🗺🗾🧭🏔⛰🌋🗻🏕🏖🏜🏝🏞🏟🏛🏗🧱🪨🪵🛖🏘🏚", "🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏰🏯🏨🏩🏪🏫🏬🏭🏭🏯🏰💒🗼🗽⛪️🕌🛕🕍⛩🕋⛲️⛺️🌁🌃🏙🌄🌅🌆🌇🌉♨️🎠🛝🎡🎢💈🎪🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝", "🚞🚌🚍🚋🚎🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🛻🚚🚛🚜🏎🏍🛵🦽🦼🛺🚲🛴🛹🛼🚏🛣🛤🛢⛽️🛞🚨🚥🚦🛑🚧⚓️🛟⛵️🛶🚤🛳⛴🛥🚢✈️🛩🛫🛬🪂💺🚁🚟🚠🚡🛰", "🚀🛸🛎🧳⌛️⏳⌚️⏰⏱⏲🕰🕛🕧🕐🕜🕑🕝🕒🕞🕓🕟🕔🕠🕕🕡🕖🕢🕗🕣🕘🕤🕙🕥🕚🕦🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌡☀️🌝🌞🪐⭐️🌟🌠🌌☁️⛅️⛈🌤", "🌥🌦🌧🌨🌩🌪🌫🌬🌀🌈🌂☂️☔️⛱⚡️❄️☃️⛄️☄️🔥💧🌊👓🕶🥽🥼🦺👔👕👖🧣🧤🧥🧦👗👘🥻🩱🩲🩳👙👚👛👜👝🛍🎒🩴👞👟🥾🥿👠👡🩰👢👑👒🎩🎓", "🧢🪖⛑📿💄💍💎🔇🔈🔉🔊📢📯📣🔔🔕🎼🎵🎶🎙🎚🎛🎤🎧📻🎷🪗🎸🎹🎺🎻🪕🥁🪘📱📲☎️📞📟📠🔋🔌💻🖥🖨⌨️🖱🖲💽💾💿📀🧮🎥🎞📽🎬📺📷📸", "📹📼🔍🔎🕯💡🔦🏮🪔📔📕📖📗📘📙📚📓📒📃📜📄📰🗞📑🔖🏷💰🪙💴💵💶💷💸💳🧾💹✉️📧📨📩📤📥📦📫📪📬📭📮🗳✏️✒️🖋🖊🖌🖍📝💼📁📂🗂", "📆📅🗒🗓📇📈📉📊📋📌📍📎🖇📏📐✂️🗃🗄🗑🔒🔓🔏🔐🔑🗝🔨🪓⛏⚒🛠🗡⚔️🔫🪃🏹🛡🪚🔧🪛🔩⚙️🗜⚖️🦯🔗⛓🪝🧰🧲🪜⚗️🧪🧫🧬🔬🔭📡💉🩸💊", "🩹🩼🩺🩻🚪🛗🪞🪟🛏🛋🪑🚽🚿🪠🛁🪤🪒🧴🧷🧹🧺🧻🪣🧼🫧🪥🧽🧯🛒🚬⚰️🪦⚱️🗿🪧🪪🏧🚮🚰♿️🚹🚺🚻🚼🚾🛂🛃🛄🛅⚠️🚸⛔️🚫🚳🚭🚯🚱🚷📵🔞", "☢️☣️⬆️↗️➡️↘️⬇️↙️⬅️↖️↕️↔️↩️↪️⤴️⤵️🔃🔄🔙🔚🔛🔜🔝🛐⚛️🕉✡️☸️☯️✝️☦️☪️☮️🕎🔯♈️♉️♊️♋️♌️♍️♎️♏️♐️♑️♒️♓️⛎🔀🔁🔂▶️⏩⏭⏯◀️⏪⏮🔼⏫", "🔽⏬⏸⏹⏺⏏️🎦🔅🔆📶📳📴♀️♂️⚧✖️➕➖➗🟰♾‼️⁉️❓❔❕❗️〰️💱💲⚕️♻️⚜️🔱🔰📛⭕️✅☑️✔️❌❎➰➿〽️✳️✴️❇️©️®️™️#️⃣*️⃣0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣", "7️⃣8️⃣9️⃣🔟🔠🔡🔢🔣🔤🅰️🆎🅱️🆑🆒🆓ℹ️🆔Ⓜ️🆕🆖🅾️🆗🅿️🆘🆙🆚🈂️🈁🈷️🈶🈯️🉐🈹🈚️🈲🉑🈸🈴🈳㊗️㊙️🈺🈵🔴🟠🟡🟢🔵🟣🟤⚫️⚪️🟥🟧🟨🟩🟦🟪🟫⬛️", "⬜️◼️◻️◾️◽️▪️▫️🔶🔷🔸🔹🔺🔻💠🔘🔳🔲"];
        setTimeout(function () {
          let _0x554bfe = 0;
          let _0x399fa2 = _0x3f8112 ? _0x2c35df : _0x52704e;
          _0x3bda8e.otvalInterval = setInterval(function () {
            let _0x2ba588 = _0xeca775[_0x554bfe];
            var _0x5dc210 = _0x3d28cd(256);
            new NativeFunction(_0x399fa2, "void", ["pointer"])(_0x5dc210);
            if (!_0x3f8112) {
              _0x5dc210.add(92).writeByteArray(_0x2ba588.scptr().readByteArray(16));
            } else {
              _0x5dc210.add(92).writePointer(_0x2ba588.scptr());
            }
            _0x2dd60b(_0x5dc210);
            _0x554bfe += 1;
            if (_0x554bfe >= _0xeca775.length) {
              _0x554bfe = 0;
            }
          }, 50);
        }, 200);
      }
    }
  }
  _0x4a6a15.writeByteArray((_0x4a6a15.fromsc() + "ᅠᅠᅠᅠᅠᅠ").scptr().readByteArray(16));
}
function _0x430b18() {
  console.log("collecting");
  let _0x26be83 = setInterval(function () {
    let _0x3e4fe4 = _0x4933b4.getPlayerData();
    let _0x31ada5 = _0x3e4fe4.add(192).readPointer();
    let _0x4f59a0 = _0x31ada5.add(8).readInt();
    let _0x3b0d08 = 0;
    for (let _0x5c3876 = 0; _0x5c3876 < _0x4f59a0; _0x5c3876++) {
      let _0x4c5a80 = _0x31ada5.readPointer().add(_0x5c3876 * 4).readPointer();
      let _0x454f70 = _0x21d949(_0x3e4fe4, _0x4c5a80);
      let _0x183762 = _0x188239(_0x4933b4.getInstance().add(36).readPointer(), _0x454f70, 0, 0);
      if (_0x183762 == 0) {
        console.log("can purchase: " + _0x454f70);
        let _0x18b3be = _0x3d28cd(44);
        _0x197e5c(_0x18b3be, _0x454f70, 0, 0, 0);
        _0x408aaa(_0x4933b4.getInstance(), _0x18b3be);
        _0x3b0d08 += 1;
      }
    }
    if (_0x3b0d08 == 0) {
      clearInterval(_0x26be83);
      console.log("collected all free offers");
      setTimeout(function () {
        _0x1de900.reloadGame();
      }, 1000);
    }
  }, 200);
}
function _0x577ab1() {
  Memory.protect(_0x329274, 1, "rwx");
  _0x329274.writeU8(255);
  Interceptor.replace(_0x1602d8.add(6641092), new NativeCallback(function (_0xbc0424, _0xa508aa) {
    if (_0xa508aa == 1 && _0x1e9c90.hide_spectate) {
      _0xa508aa = 3;
    }
    new NativeFunction(_0x1602d8.add(6641092), "void", ["pointer", "int"])(_0xbc0424, _0xa508aa);
  }, "void", ["pointer", "int"]));
  Interceptor.replace(_0x1602d8.add(6625916), new NativeCallback(function (_0x58d659, _0x516430, _0x434e63) {
    if (_0x516430 == 1 && _0x1e9c90.hide_spectate) {
      _0x516430 = 3;
    }
    new NativeFunction(_0x1602d8.add(6625916), "void", ["pointer", "int", "int"])(_0x58d659, _0x516430, _0x434e63);
  }, "void", ["pointer", "int", "int"]));
  const _0x58aa31 = ["Brawlbox_info_popup", "seasonend_popup", "create_name_popup", "age_gate_dialog", "age_gate_number_pad_dialog"];
  Interceptor.replace(_0x493ba1, new NativeCallback(function (_0x5d7eef, _0x306dbf, _0x279b1f, _0x4ef150, _0x136048, _0x1918d7, _0x545079, _0x308b95) {
    if (_0x1e9c90.static_background) {
      let _0x15b6be = _0x477315.getTable(41);
      let _0x2dbd05 = _0x4933b4.getInstance();
      if (_0x2dbd05 && !_0x2dbd05.isNull() && _0x2f72ee.isState(4) && !_0x2dbd05.toInt32() == 0 && !this.returnAddress.equals(_0x1602d8.add(3368220))) {
        if (_0x58aa31.includes(_0x279b1f.fromsc())) {
          _0x3f78c9(_0x5d7eef, _0x306dbf, _0x279b1f, _0x4ef150, _0x136048, _0x1918d7, _0x545079, _0x308b95);
          return;
        }
        let _0x5d6233 = _0x2dbd05.add(36).readPointer();
        let _0x496371 = _0x5d6233.add(16).readPointer();
        let _0x2b6c30 = _0x496371.add(16).readPointer();
        let _0x26638c = _0xed1bae(_0x2b6c30, 1, 0);
        let _0x2db1ce = _0x28f573.getInstanceID(_0x26638c);
        let _0x418257 = new NativeFunction(_0x15b6be.readPointer().add(20).readPointer(), "pointer", ["pointer", "int"])(_0x15b6be, _0x2db1ce);
        _0x1918d7 = _0x254a80(_0x418257);
        _0x545079 = _0x5eea59(_0x418257);
      }
    }
    _0x3f78c9(_0x5d7eef, _0x306dbf, _0x279b1f, _0x4ef150, _0x136048, _0x1918d7, _0x545079, _0x308b95);
  }, "void", ["pointer", "pointer", "pointer", "bool", "bool", "pointer", "pointer", "pointer"]));
  var _0x2de9be = ["BBArena", "GrassfieldBeachBall", "Default", "CoinFactoryBB", "Grassfield", "StarrToonsStudio", "RobotFactory"];
  var _0x2d94bf = ["DefaultShowdown", "RobotFactoryShowdown"];
  Interceptor.replace(_0x11477e, new NativeCallback(function (_0x18524c, _0x29a6b0) {
    if (_0x1e9c90.dark_theme) {
      if (_0x2d94bf.includes(_0x18524c.fromsc())) {
        _0x18524c = "MortuaryShowdown".scptr();
      }
      if (_0x2de9be.includes(_0x18524c.fromsc())) {
        _0x18524c = "Mortuary".scptr();
      }
    }
    return _0x4c9f77(_0x18524c, _0x29a6b0);
  }, "pointer", ["pointer", "pointer"]));
  Interceptor.replace(_0x1b71a6, new NativeCallback(function (_0x3e1db4, _0x1a681a) {
    if (_0x1e9c90.ulti_targeting && _0x1a681a == 5) {
      _0x1a681a = 6;
    }
    return _0x520257(_0x3e1db4, _0x1a681a);
  }, "pointer", ["pointer", "int"]));
  const _0x20dc70 = 20;
  Interceptor.replace(_0x1902cf, new NativeCallback(function () {
    if (_0x1e9c90.show_connection_indicator) {
      if (this.returnAddress.equals(_0x1602d8.add(2501116))) {
        return 1;
      }
    }
    return 0;
  }, "bool", []));
  Interceptor.replace(_0xca4fc, new NativeCallback(function (_0x47fe30) {
    let _0x3880ae = [_0x47fe30];
    _0x308017(_0x3880ae, true);
    _0x316e3b(_0x47fe30);
  }, "void", ["pointer"]));
  Interceptor.replace(_0x52fd43, new NativeCallback(function (_0x42bd6d) {
    let _0x50feed = [_0x42bd6d];
    _0x308017(_0x50feed, false);
    _0x437132(_0x42bd6d);
  }, "void", ["pointer"]));
  Interceptor.replace(_0x5c81cd, new NativeCallback(function (_0x1513fe, _0x3044f6, _0x24ad1a, _0x322f28, _0xd85270, _0x3877f1, _0x42f843, _0x281d15) {
    if (_0x1e9c90.future_events) {
      return 1;
    }
    return _0x4d5b6e(_0x1513fe, _0x3044f6, _0x24ad1a, _0x322f28, _0xd85270, _0x3877f1, _0x42f843, _0x281d15);
  }, "bool", ["pointer", "pointer", "bool", "bool", "bool", "bool", "bool", "bool"]));
  Interceptor.attach(_0x628b4d, {
    onEnter(_0x4c63e3) {
      this.loginOkMessage = _0x4c63e3[0];
    },
    onLeave(_0xcf47b3) {
      _0x3bda8e.debugInfoText = "\n\t\t\t\tAccount ID: " + (this.loginOkMessage.add(92).readPointer().readInt() + "-" + this.loginOkMessage.add(92).readPointer().add(4).readInt()) + "\n\n\t\t\t\tServer Version: " + (this.loginOkMessage.add(120).readInt() + "." + this.loginOkMessage.add(124).readInt() + "." + this.loginOkMessage.add(128).readInt()) + "\n\n\t\t\t\tServer Environment: " + _0x23c6f9(this.loginOkMessage.add(132).readPointer()) + "\n\n\t\t\t\tSession Count: " + this.loginOkMessage.add(136).readInt() + "\n\n\t\t\t\tPlaytime: " + _0x2a160c(this.loginOkMessage.add(140).readInt(), "ru") + "\n\n\t\t\t    Days since started playing: " + this.loginOkMessage.add(144).readInt() + "\n\n \t\t\t";
      if (_0x1e9c90.do_not_disturb) {
        let _0x16bb86 = _0x3d28cd(300);
        new NativeFunction(_0x1602d8.add(6822312), "void", ["pointer"])(_0x16bb86);
        _0x16bb86.add(92).writeU8(1);
        _0x2dd60b(_0x16bb86);
      }
    }
  });
  Interceptor.attach(_0x1602d8.add(6822312), {
    onEnter(_0x3f9939) {
      _0x1e9c90.do_not_disturb = Boolean(_0x3f9939[1].toInt32());
    }
  });
  _0x4a7c02.ret(_0x500942);
  _0x4a7c02.ret(_0x1602d8.add(10123340));
  let _0x52c8ac = Interceptor.attach(_0x5bb2b4, {
    onEnter(_0x426212) {
      _0x52c8ac.detach();
      _0x5282e8(_0x426212[0], "sc/debug.sc".scptr());
      _0x25dff3("sc/debug.sc loaded!");
    }
  });
  Interceptor.attach(_0x3d2196, function () {
    console.log("OHD");
    _0x3bda8e.battleModeClient = null;
    if (!_0x3bda8e.debugButton) {
      _0x3bda8e.debugButton = new _0xe73dce();
    }
    _0x3bda8e.checked = false;
    _0x3bda8e.reqCheck = true;
    _0x242b88();
  });
  const _0x29b860 = {
    "12": 1,
    "19": 1,
    "22": 1,
    "93": 1
  };
  Interceptor.replace(_0x430ccc, new NativeCallback(function (_0x5909be, _0x7b02bc, _0x4c7a19) {
    if (!_0x1e9c90.special_offers) {
      if (Object.keys(_0x29b860).includes(_0x7b02bc)) {
        return _0x29b860[_0x7b02bc];
      }
    }
    if (_0x1e9c90.default_theme) {
      if (_0x7b02bc == 1) {
        return 0;
      }
    }
    if (_0x7b02bc == 46) {
      return 1;
    }
    return _0xed1bae(_0x5909be, _0x7b02bc, _0x4c7a19);
  }, "int", ["pointer", "int", "int"]));
  Interceptor.replace(_0x1602d8.add(7144996), new NativeCallback(function (_0x3d7fbc) {
    if (_0x3d7fbc.add(92).readInt() != _0x1e9c90.battle_region) {
      _0x3d7fbc.add(96).writeInt(_0x3d7fbc.add(96).readInt() + 400);
    } else {
      _0x3bda8e.isChanged = true;
      _0x37cab0.showFloaterText("Battle server location changed!");
      _0x236138();
      _0x3d7fbc.add(96).writeInt(40);
    }
    _0x3d7fbc.add(100).writeInt(5);
    _0x3d7fbc.add(104).writeInt(5);
    _0x3d7fbc.add(108).writeInt(10);
    _0x3d7fbc.add(112).writeInt(30000);
    _0x3d7fbc.add(116).writeInt(0);
    _0x3d7fbc.add(120).writeInt(0);
    new NativeFunction(_0x1602d8.add(7144996), "void", ["pointer"])(_0x3d7fbc);
  }, "void", ["pointer"]));
  Interceptor.replace(_0x1602d8.add(7144220), new NativeCallback(function (_0x531b60, _0x5ad646) {
    new NativeFunction(_0x1602d8.add(7144220), "void", ["pointer", "pointer"])(_0x531b60, _0x5ad646);
    _0x531b60.add(4).writeInt(2);
  }, "void", ["pointer", "pointer"]));
  Interceptor.replace(_0x1602d8.add(4261744), new NativeCallback(function (_0x12d69f) {
    return 0;
  }, "bool", ["int"]));
  Interceptor.replace(_0x54a858, new NativeCallback(function (_0x4efddd, _0x13316b) {
    if (!_0x1e9c90.special_offers) {
      let _0x2816ed = _0x21d949(_0x4933b4.getPlayerData(), _0x13316b);
      let _0x55d2bc = _0x188239(_0x4933b4.getInstance().add(36).readPointer(), _0x2816ed, 0, 0);
      if (!_0x55d2bc) {
        return _0x21a908(_0x4efddd, _0x13316b);
      }
      return ptr(0);
    }
    return _0x21a908(_0x4efddd, _0x13316b);
  }, "pointer", ["pointer", "pointer"]));
  let _0x11104f = "Gene Brawl " + _0x54091c.env.toUpperCase() + " (" + _0x54091c.branch + ")\nv" + _0x54091c.version + " (script: " + _0x54091c.scriptVersion + ")\nID: " + _0x1bf929() + (_0x3bda8e.failedErr ? "\nПроизошла ошибка при чтении данных" : "") + "\nt.me/gene_land";
  let _0x1e4196 = _0x11104f + "\n%s\nPlayers online: %i";
  let _0x884f63 = _0x11104f.ptr();
  let _0x261257 = _0x1e4196.ptr();
  Interceptor.attach(_0x1602d8.add(5371544), function () {
    this.context.r1 = _0x884f63;
  });
  Interceptor.attach(_0x1602d8.add(5371320), function () {
    this.context.r1 = _0x261257;
  });
  Interceptor.replace(_0x1ccf4f, new NativeCallback(function () {
    if (!_0x1e9c90.sidemask) {
      return _0x1dd48d();
    }
    return 0;
  }, "float", []));
  Interceptor.replace(_0x392d50, new NativeCallback(function () {
    if (!_0x1e9c90.hide_debug_info) {
      if (this.returnAddress.equals(_0x1602d8.add(5370052)) || this.returnAddress.equals(_0x1602d8.add(5369852))) {
        return 0;
      }
    }
    return Number(!_0x1e9c90.use_stage);
  }, "bool", []));
  Interceptor.replace(_0x1b1340, new NativeCallback(function () {
    return Number(_0x1e9c90.use_stage);
  }, "bool", []));
  _0x3bda8e.autoAttackTick = 0;
  const _0x4196d1 = 5;
  Interceptor.replace(_0x5afa8f, new NativeCallback(function (_0x5c1199, _0x1ce598, _0x48218f, _0x478c54, _0x3e9ca8) {
    _0xf003b(_0x5c1199, _0x1ce598, _0x48218f, _0x478c54, _0x3e9ca8);
    if (!_0x3bda8e.autoShoot && !_0x3bda8e.holdToShoot && !_0x3bda8e.moveToTarget && !_0x3bda8e.autoUlti) {
      return;
    }
    _0x3bda8e.battleScreen = _0x5c1199;
    var _0x59a29b = _0x6b19ef.getInstance();
    if (!_0x59a29b || _0x59a29b.isNull()) {
      return;
    }
    var _0xac3e72 = _0x3e019b(_0x59a29b.add(20).readPointer());
    var _0x1b3eee = _0x59a29b.add(20).readPointer();
    let _0x3a0168;
    if (_0xac3e72 >= 0 && _0x1b3eee.add(8).readInt()) {
      _0x3a0168 = _0x1b3eee.readPointer().add(_0xac3e72 * 4).readPointer();
    }
    if (!_0x3a0168 || _0x3a0168.isNull()) {
      return;
    }
    if (!_0x1ce598 || _0x1ce598.isNull()) {
      return;
    }
    var _0x1e0234 = _0x150710(_0x1ce598, _0x3a0168);
    let _0x1ad2cb = _0x1e0234.add(_0x17fc7d).readInt();
    let _0x3f0ffd = _0x3a65a2(_0x5c1199);
    if (_0x3f0ffd > -4) {
      return;
    }
    if (_0x5c1199.add(_0x30e7da).readInt()) {
      if (_0x3bda8e.moveToTarget) {
        var _0x1a371b = _0x5c1199.add(_0x5a5cad).readInt();
        var _0x139601 = _0x5c1199.add(_0x32e6bd).readInt();
        var _0x137bd4 = new _0x2cb258(2);
        _0x137bd4.setXY(_0x1a371b, _0x139601);
        _0x4eb606.addInput(_0x137bd4);
        _0x3bda8e.targetObject = 333;
      }
    } else if (_0x3bda8e.targetObject == 333) {
      _0x3bda8e.targetObject = 0;
    }
    let _0x3f9a64 = _0x5c1199.add(_0x2f0af2).readU8();
    if (_0x5c1199.add(_0x30e7da).readInt()) {
      if (_0x3bda8e.autoShoot && !_0x3f9a64) {
        if (_0x1ad2cb >= 850 && _0x3bda8e.autoAttackTick == 0) {
          _0x517ae2(_0x5c1199, _0x1ce598);
          _0x3bda8e.autoAttackTick = 1;
        }
      }
    }
    _0x3bda8e.autoAttackTick = _0x3bda8e.autoAttackTick > _0x4196d1 ? 0 : _0x3bda8e.autoAttackTick + 1;
    if (_0x3bda8e.holdToShoot && _0x3f9a64) {
      if (_0x1ad2cb >= 850 && _0x3bda8e.autoAttackTick == 0) {
        _0x517ae2(_0x5c1199, _0x1ce598);
        _0x3bda8e.autoAttackTick = 1;
      }
    }
    if (_0x3bda8e.autoUlti && _0x3a0168.add(68).readInt() == _0x3a0168.add(72).readInt()) {
      _0x4d2b0c(_0x5c1199.add(_0x26ef6b).readPointer(), 1);
      _0x517ae2(_0x5c1199, _0x1ce598);
    }
  }, "void", ["pointer", "pointer", "float", "pointer", "bool"]));
  Interceptor.replace(_0x2ac6e2, new NativeCallback(function (_0xa9b38c) {
    let _0x16784e = _0x26ada1(_0xa9b38c);
    if (_0x16784e && _0x1e9c90.anti_afk) {
      let _0x77b832 = _0x6b19ef.getLogic();
      let _0x4255c4 = _0xafa29f(_0x77b832);
      if (_0x4255c4.toInt32() == 0) {
        return;
      }
      var _0x345dbf = new _0x2cb258(2);
      _0x345dbf.setXY(_0x4255c4.add(32).readInt(), _0x4255c4.add(36).readInt());
      _0x4eb606.addInput(_0x345dbf);
      _0xa9b38c.add(2096).writeInt(0);
      return 0;
    }
    return _0x16784e;
  }, "bool", ["pointer"]));
  Interceptor.replace(_0x2dd6f4, new NativeCallback(function () {
    return 1;
  }, "bool", []));
  let _0xd273d2 = {
    P9JGPPLYQ: "<cff002a>R<cff0054>o<cff007f>m<cff00a9>a<cff00d4>s<cfe00fe>h<cd400ff>k<caa00ff>a<c7f00ff>G<c5500ff>e<c2a00ff>n<c0400fe>e</c>",
    "82Y9YL-stage": "<cff002a>R<cff0054>o<cff007f>m<cff00a9>a<cff00d4>s<cfe00fe>h<cd400ff>k<caa00ff>a<c7f00ff>G<c5500ff>e<c2a00ff>n<c0400fe>e</c>",
    "82YQPP-stage": "<cff002a>R<cff0054>o<cff007f>m<cff00a9>a<cff00d4>s<cfe00fe>h<cd400ff>k<caa00ff>a<c7f00ff>G<c5500ff>e<c2a00ff>n<c0400fe>e</c>",
    UCVL2GUV: "<cff003f>h<cff007f>p<cff00bf>d<cff00ff>e<cbf00ff>v</c>",
    "8GCQYL2VL": "<cff003f>h<cff007f>p<cff00bf>d<cff00ff>e<cbf00ff>v<c7f00ff>F<c3f00ff>O<c0000ff>X</c> :3",
    JPPRVGJ8: "<c3549ff>L<c6a31ff>i<c9f18ff>Q<cd400ff>Q<cde00bf>u<ce9007f>i<cf4003f>t<cff0000>y</c>",
    UPPR2RL0: "<c35aadf>A<c6b55c0>L<ca002a1>E<ca100a1>R<cc0006b>T</c>",
    VPYGJVJ0: "<cff002a>k<cff0054>i<cff007f>t<cff00a9>e<cff00d4>n<cfe00fe>o<cff00ff>k<cd400ff>g<caa00ff>e<c7f00ff>n<c5500ff>e</c>",
    "2YRJ9G0CP": "<cff002a>N<cff0054>e<cff007f>G<cff00a9>a<cff00d4>T<cfe00fe>1<cff00ff>V<cd400ff>4<caa00ff>i<c7f00ff>c<c5500ff>k</c>",
    YPCCCJCU: "<cff003f>T<cff007f>o<cff00bf>y<cff00ff>t<cff00ff>y<cbf00ff>i<c7f00ff>s</c>",
    "2RGGJPLQU": "<c1a9278>t<c1186a5>a<c087ad2>i<c006eff>l<c006eff>s<c2254e5>j<c443bcc>s</c>",
    "880GGPPL": "<c0032ff>U<c0065ff>m<c0098ff>o<c00cbff>r<c00ffff>i<c00ffff>s<c00ffcc>t<c00ff99>4<c00ff66>7</c>"
  };
  _0x4a7c02.nop(_0x1602d8.add(10127304));
  Interceptor.replace(_0x29c9dd, new NativeCallback(function (_0x30d9a4) {
    let _0x35b781 = _0x40f338();
    for (var _0x54b420 in _0xd273d2) {
      if (_0x54b420.endsWith("-stage")) {
        if (_0x1e9c90.use_stage && _0x54b420.replace("-stage", "") == _0x35b781) {
          _0x3bda8e.colorized = true;
          return _0xd273d2[_0x54b420].scptr();
        }
      }
      if (_0x54b420 == _0x35b781) {
        _0x3bda8e.colorized = true;
        return _0xd273d2[_0x54b420].scptr();
      }
    }
    if (!_0x1e9c90.hide_name) {
      return new NativeFunction(_0x29c9dd, "pointer", ["pointer"])(_0x30d9a4);
    }
    return "".scptr();
  }, "pointer", ["pointer"]));
  if (_0x9ad7a5()) {
    _0x4a7c02.jumpout(_0x1602d8.add(6025292), _0x1602d8.add(6025348));
  }
  Interceptor.replace(_0x5c0ca3, new NativeCallback(function (_0x280beb, _0x776b81, _0x4a30b4, _0x46a9f5, _0x2b7762, _0xb73bbb, _0x3d4b1c, _0x33b3a5, _0x4b4b3e) {
    _0x33b3a5 = 1;
    return _0x5edd9a(_0x280beb, _0x776b81, _0x4a30b4, _0x46a9f5, _0x2b7762, _0xb73bbb, _0x3d4b1c, _0x33b3a5, _0x4b4b3e);
  }, "pointer", ["pointer", "pointer", "float", "float", "int", "float", "bool", "bool", "float"]));
  _0x3bda8e.targetObject = 0;
  const _0x2e375f = ["Mine", "ClusterMine", "Bomb", "StickyBomb", "StickyBombUlti", "SilencerHugger", "SilencerHuggerMine", "WeaponThrowerWeapon", "SoulCollectorSoul", "HeroSpawn", "SpawnerDudeExplosion", "RuffsSupplyExplosion", "TntDudeExplosion"];
  const _0x5f06eb = ["SpringBoardLeft_Gale", "SpringBoardRight_Gale", "SpringBoardUp_Gale", "SpringBoardDown_Gale", "SpringBoardUpLeft_Gale", "SpringBoardUpRight_Gale", "SpringBoardDownLeft_Gale", "SpringBoardDownRight_Gale", "SpringBoardLeft", "SpringBoardRight", "SpringBoardUp", "SpringBoardDown", "SpringBoardUpLeft", "SpringBoardUpRight", "SpringBoardDownLeft", "SpringBoardDownRight", "Mine", "Bomb", "ClusterMine", "StickyBomb", "StickyBombUlti", "HeroSpawn", "TntDudeExplosion", "SpawnerDudeExplosion", "RuffsSupplyExplosion", "DrillerReflectArea", "DrillerUltiArea"];
  const _0x3ac168 = ["ClusterMine", "StickyBomb", "StickyBombUlti"];
  _0x3bda8e.battleModeClient = null;
  _0x3bda8e.alreadyChecked = [];
  Interceptor.replace(_0x48e478, new NativeCallback(function (_0x2583b3, _0x339f08, _0x18a87f) {
    _0x39e6fc(_0x2583b3, _0x339f08, _0x18a87f);
    if (!_0x3bda8e.battleModeClient) {
      _0x3bda8e.battleModeClient = new _0x35741f(_0x2583b3);
    }
    if (_0x3bda8e.battleModeClient) {
      _0x3bda8e.battleModeClient.tick(_0x339f08);
    }
  }, "void", ["pointer", "float", "float"]));
  Interceptor.replace(_0x3d2d86, new NativeCallback(function (_0x5b6cc6) {
    let _0x3f66fb = new _0x2f61e9(_0x5b6cc6);
    if (_0x3f66fb.getName() == "emoji_happy") {
      return 0;
    }
    return _0x91fae7(_0x5b6cc6);
  }, "bool", ["pointer"]));
  Interceptor.attach(_0x5ae2bb, {
    onEnter(_0x3e563c) {
      this.message = _0x3e563c[0];
    },
    onLeave(_0x4f0e76) {
      let _0x383928 = this.message.add(92).readInt();
      switch (_0x383928) {
        case 8:
          if (_0x1e9c90.use_stage) {
            this.message.add(92).writeInt(31);
            this.message.add(124).writePointer(_0x1a9313("STAGE_SERVER_GOT_UPDATED").scptr());
            let _0x58b92b = Interceptor.attach(_0x2915cc, {
              onEnter(_0x136723) {
                _0x1e9c90.use_stage = false;
                _0x58b92b.detach();
              }
            });
          } else {
            this.message.add(124).writePointer(_0x1a9313("PROD_SERVER_GOT_UPDATED").scptr());
            this.message.add(120).writePointer("https://t.me/gene_land".scptr());
          }
          break;
        case 30:
          if (_0x1e9c90.use_stage) {
            if (!_0x1e9c90.use_proxy) {
              this.message.add(92).writeInt(9);
              this.message.add(112).writePointer("stage.hpdevfox.ru".scptr());
              _0x1e9c90.use_proxy = true;
              _0x236138();
              return;
            } else {
              this.message.add(92).writeInt(31);
              this.message.add(124).writePointer(_0x1a9313("STAGE_SERVER_UNAVAILABLE_FROM_YOUR_LOCATION").scptr());
              let _0x391765 = Interceptor.attach(_0x2915cc, {
                onEnter(_0x317948) {
                  _0x1e9c90.use_stage = false;
                  _0x236138();
                  _0x391765.detach();
                }
              });
            }
          } else if (!_0x1e9c90.use_proxy) {
            this.message.add(92).writeInt(9);
            this.message.add(112).writePointer("proxy.hpdevfox.ru".scptr());
            _0x1e9c90.use_proxy = true;
            _0x236138();
            return;
          } else {
            this.message.add(124).writePointer(_0x1a9313("PROXY_DOESNT_WORK").scptr());
          }
          break;
      }
    }
  });
  Interceptor.replace(_0x1be7d4, new NativeCallback(function (_0x3475bf) {
    _0x3bda8e.da = 0;
    _0x3bda8e.playersInBattle = {};
    _0x3bda8e.dai = {};
    _0x3bda8e.battleModeClient = null;
    if (!_0x3bda8e.debugButton) {
      _0x3bda8e.debugButton = new _0xe73dce();
    }
    _0x1db09d(_0x3475bf);
    if (_0x1e9c90.online_skinchanger) {
      Thread.sleep(0.3);
    }
  }, "void", ["pointer"]));
  Interceptor.replace(_0x259105, new NativeCallback(function (_0x5decb9) {
    _0x3bda8e.da = 0;
    _0x54f6fd(_0x5decb9);
    _0x3bda8e.battleModeClient = null;
    if (_0x1e9c90.online_skinchanger) {
      Thread.sleep(0.2);
    }
    if (_0x3bda8e.autoPlayAgain && _0x5decb9.add(244).readInt() != 0) {
      var _0x17a7d1 = _0x3d28cd(112);
      _0x749fee(_0x17a7d1, 1);
      _0x2dd60b(_0x17a7d1);
    }
  }, "void", ["pointer"]));
  Interceptor.replace(_0x36a1b3, new NativeCallback(function () {
    if (_0x3bda8e.antiOutOfSync) {
      return 0;
    }
    return 529;
  }, "int", []));
  Interceptor.replace(_0x14a39a, new NativeCallback(function () {
    if (_0x3bda8e.antiOutOfSync) {
      return 0;
    }
    return 506;
  }, "int", []));
  Interceptor.replace(_0x10f2bd, new NativeCallback(function () {
    return 0;
  }, "int", []));
  function _0x2fafd9(_0x2111fe, _0x4c40f2) {
    Interceptor.replace(_0x2111fe, new NativeCallback(function (_0x1509b6, _0x2665b3) {
      if (!_0x1e9c90.character_sounds) {
        return ptr(0);
      }
      return _0x4c40f2(_0x1509b6, _0x2665b3);
    }, "pointer", ["pointer", "pointer"]));
  }
  function _0x533dc0(_0x1cd7c8, _0x209eea) {
    Interceptor.replace(_0x1cd7c8, new NativeCallback(function (_0x4a222b) {
      if (!_0x1e9c90.character_sounds) {
        return ptr(0);
      }
      return _0x209eea(_0x4a222b);
    }, "pointer", ["pointer"]));
  }
  _0x2fafd9(_0x154328, _0x36eb61);
  _0x2fafd9(_0x5d7402, _0x17f4d5);
  _0x2fafd9(_0x1d9a29, _0x354266);
  _0x2fafd9(_0x3a07bf, _0x34acd6);
  _0x2fafd9(_0x4dbe51, _0x5d08e4);
  _0x2fafd9(_0x94d6a0, _0x4005e2);
  _0x2fafd9(_0xba5f55, _0xf4be32);
  _0x2fafd9(_0x1fb3ab, _0x21e6b7);
  _0x533dc0(_0x4cacee, _0x4e7fd3);
  _0x533dc0(_0x32ea74, _0x38bda9);
  Interceptor.replace(_0x1602d8.add(6818776), new NativeCallback(function (_0x1aaa74) {
    new NativeFunction(_0x1602d8.add(6818776), "pointer", ["pointer"])(_0x1aaa74);
    console.log("[REPORT] " + _0x1aaa74.add(96).readPointer().readInt() + "-> #" + _0x3355b6(_0x16641c(_0x1aaa74.add(92).readPointer().readInt(), _0x1aaa74.add(92).readPointer().add(4).readInt())));
    _0x3afd27(_0x3355b6(_0x16641c(_0x1aaa74.add(92).readPointer().readInt(), _0x1aaa74.add(92).readPointer().add(4).readInt())));
    return _0x1aaa74;
  }, "pointer", ["pointer", "pointer", "pointer"]));
  Interceptor.replace(_0x1602d8.add(6819020), new NativeCallback(function () {
    return 0;
  }, "int", []));
  Interceptor.replace(_0x1602d8.add(5612628), new NativeCallback(function (_0x14cab2, _0x2845e3) {
    switch (_0x14cab2.readUtf8String()) {
      case "TID_CONTEXT_MENU_REPORT_NAME":
        return "Невидимки".scptr();
      case "TID_REPORT_PLAYER_NAME_TITLE":
        return "- SCUtils -".scptr();
      case "TID_REPORT_PLAYER_NAME":
        return "Отравить бонус с невидимками этому челу?".scptr();
      case "TID_REPORT_SENT_HEADING":
        return "Невидимки".scptr();
      case "TID_REPORT_SENT":
        return "Запрос отправлен".scptr();
      default:
        return new NativeFunction(_0x1602d8.add(5612628), "pointer", ["pointer", "pointer"])(_0x14cab2, _0x2845e3);
    }
  }, "pointer", ["pointer", "pointer"]));
  Interceptor.replace(_0x31e468, new NativeCallback(function (_0x3110d8) {
    _0x246e1c(_0x3110d8);
    var _0x26f420 = _0x27abcc(_0x3110d8.add(132).readPointer(), "tag_txt".ptr(), 1);
    _0x26f420.add(124).writePointer(_0x3110d8.add(72));
    Interceptor.attach(_0x3110d8.add(72).readPointer().add(4).readPointer(), {
      onEnter(_0x40d37b) {
        if (_0x26f420.equals(_0x40d37b[1])) {
          var _0x4c0e20 = _0x3110d8.add(240).readPointer().add(92).readPointer();
          var _0xbad23 = "#" + _0x3355b6(_0x16641c(_0x4c0e20.readInt(), _0x4c0e20.add(4).readInt()));
          _0x378982(_0xbad23.scptr());
          _0x37cab0.showFloaterText(_0x1a9313("PLAYER_TAG_COPIED"));
        }
      }
    });
  }, "void", ["pointer"]));
  Interceptor.replace(_0x281a4a, new NativeCallback(function (_0x2b6a5c, _0x5d2c7e) {
    _0x54bc73(_0x2b6a5c, _0x5d2c7e);
    var _0x5d3a5e = _0x2b6a5c.add(260).readPointer();
    var _0x2bb40e = _0x27abcc(_0x2b6a5c, "tag_stat".ptr(), 1);
    _0x2bb40e.add(124).writePointer(_0x2b6a5c.add(72));
    Interceptor.attach(_0x2b6a5c.add(72).readPointer().add(4).readPointer(), {
      onEnter(_0x3ba5ee) {
        if (_0x2bb40e.equals(_0x3ba5ee[1])) {
          var _0x32dc40 = "#" + _0x3355b6(_0x16641c(_0x5d3a5e.readInt(), _0x5d3a5e.add(4).readInt()));
          _0x378982(_0x32dc40.scptr());
          _0x37cab0.showFloaterText(_0x1a9313("CLUB_TAG_COPIED"));
        }
      }
    });
  }, "void", ["pointer", "pointer"]));
  Interceptor.replace(_0x58b842, new NativeCallback(function (_0x24ec01) {
    if (_0x3bda8e.colorized) {
      return 0;
    }
    if (_0x1e9c90.visual_chromatic_name) {
      return 1;
    }
    return _0x2cbeff(_0x24ec01);
  }, "bool", ["pointer"]));
  Interceptor.replace(_0x301795, new NativeCallback(function (_0x1f2a73, _0x50cf95, _0x1fad32, _0x3fa729) {
    if (!_0x1e9c90.emote_animation) {
      _0x37f1fd(_0x1f2a73, 0, 0, 0);
      return;
    }
    _0x37f1fd(_0x1f2a73, _0x50cf95, _0x1fad32, _0x3fa729);
  }, "void", ["pointer", "int", "bool", "float"]));
  Interceptor.replace(_0x3de36e, new NativeCallback(function (_0x11ef95) {
    _0x55b9ef(_0x11ef95);
    if (_0x1e9c90.disable_outline) {
      _0x11ef95.add(128).writeByteArray("shader/impostor".scptr().readByteArray(16));
    }
  }, "void", ["pointer"]));
  Interceptor.replace(_0x4f6554, new NativeCallback(function (_0x304fcd) {
    if (_0x1e9c90.movement_based_autoshoot) {
      if (_0x2f61e9.getNameStatic(_0x304fcd) == "UndertakerWeapon") {
        return 1;
      } else {
        return 0;
      }
    }
    return _0x2e45a7(_0x304fcd);
  }, "bool", ["pointer"]));
  Interceptor.replace(_0x2441f9, new NativeCallback(function (_0x4e8c23) {
    var _0x37401e = _0x4e8c23.readUtf8String();
    if (!_0x37401e.includes("GLImage")) {
      console.warn(_0x37401e);
    }
  }, "void", ["pointer"]));
  Interceptor.replace(_0x16c857, new NativeCallback(function (_0x14da90) {
    console.error(_0x14da90.readUtf8String());
  }, "void", ["pointer"]));
  Interceptor.replace(_0x1d4e8c, new NativeCallback(function (_0x13dbbc, _0x177a88) {
    if (_0x13dbbc.add(264).readU8() == 0) {
      _0x13dbbc.add(264).writeU8(1);
    }
    _0xafdb9f(_0x13dbbc, _0x177a88);
  }, "void", ["pointer", "pointer"]));
  Interceptor.replace(_0x51731a, new NativeCallback(function (_0x2239a8) {
    _0x2239a8.add(180).writeInt(2);
    return 0;
  }, "bool", ["pointer"]));
  Interceptor.replace(_0xf36e05, new NativeCallback(function (_0x56ee7f) {
    console.log("dont show login calendar welcome popup!");
  }, "void", ["pointer"]));
  Interceptor.replace(_0x4185d1, new NativeCallback(function (_0x3097e6, _0xb9c47e, _0x55bf06, _0x4007c8) {
    let _0x37f347 = _0x4cfa62(_0xb9c47e.add(16).readPointer(), _0x3097e6.add(24).readInt());
    if (_0x37f347.toInt32() != 0) {
      let _0x5a5723 = new NativeFunction(_0x37f347.readPointer().add(8).readPointer(), "int", ["pointer"])(_0x37f347);
      if (_0x5a5723 == 94) {
        let _0x5a6572 = _0x37f347.add(44).readInt();
        if (_0x3bda8e.fakeSkins.includes(_0x28f573.getInstanceID(_0x5a6572))) {
          console.log("found fake skin notification!");
          let _0x4c1e7f = _0x477315.getDataById(_0x5a6572);
          let _0x2f52ea = _0x4c1e7f.add(144).readPointer();
          let _0x1d9f28 = _0x2f52ea.add(64).readPointer();
          console.log(_0x1d9f28.add(16).readInt());
          let _0x428d2f = _0x55ecfe(_0x3097e6, _0xb9c47e, _0x55bf06, _0x4007c8);
          _0x2b7809(0, _0x1d9f28, _0x4c1e7f);
          return _0x428d2f;
        }
      }
    }
    return _0x55ecfe(_0x3097e6, _0xb9c47e, _0x55bf06, _0x4007c8);
  }, "int", ["pointer", "pointer", "int", "bool"]));
  Interceptor.replace(_0x161fc7, new NativeCallback(function (_0x12668e, _0x45245e) {
    _0x1b2ba8(_0x12668e, _0x45245e);
    let _0x2c376d = _0x12668e.readPointer();
    let _0x18bb33 = _0x3355b6(_0x16641c(_0x2c376d.readInt(), _0x2c376d.add(4).readInt()));
    let _0x35a440 = _0x12668e.add(104).readPointer();
    let _0x48eaee = _0x40f338();
    try {
      for (var _0x223193 in _0xd273d2) {
        if (_0x223193.endsWith("-stage") && _0x1e9c90.use_stage) {
          if (_0x18bb33 == _0x223193.replace("-stage", "")) {
            _0x35a440.writeByteArray(_0xd273d2[_0x223193].scptr().readByteArray(16));
          }
        } else if (!_0x1e9c90.use_stage) {
          if (_0x18bb33 == _0x223193) {
            _0x35a440.writeByteArray(_0xd273d2[_0x18bb33].scptr().readByteArray(16));
          }
          if (_0x48eaee == _0x223193) {
            let _0x1e0a4d = _0x12668e.add(36).readInt();
            if (_0x1e0a4d == 50) {
              _0x12668e.add(36).writeInt(0);
            }
          }
        }
      }
    } catch (_0x54f490) {}
  }, "void", ["pointer", "pointer"]));
  Interceptor.replace(_0x6de46e, new NativeCallback(function (_0x49f139, _0x4bf7b1) {
    if (_0x1e9c90.online_skinchanger) {
      if (this.returnAddress.equals(_0x1602d8.add(5448896))) {
        var _0x15e553 = _0x4bf7b1.add(16).readInt();
        var _0x577a1c = _0x4bbe55(_0x49f139, _0x4bf7b1);
        if (_0x577a1c == 0) {
          _0x3bda8e.writeSkin = _0x4bf7b1.add(144).readPointer().add(64).readPointer().add(116).readPointer().add(16).readInt();
          _0x3bda8e.writeSkinSC = _0x15e553;
        } else {
          _0x3bda8e.writeSkin = _0x15e553;
          _0x3bda8e.writeSkinSC = 0;
        }
        console.log("skin: " + _0x3bda8e.writeSkinSC);
        _0x328fb8({
          code: 222,
          tag: "#" + _0x40f338(),
          skinId: _0x3bda8e.writeSkinSC
        }, function (_0x4996eb) {});
      }
      return 1;
    } else {
      return _0x4bbe55(_0x49f139, _0x4bf7b1);
    }
  }, "int", ["pointer", "pointer"]));
  Interceptor.replace(_0x4843cf, new NativeCallback(function (_0x3ed015, _0x174861) {
    if (_0x1e9c90.online_skinchanger) {
      _0x3ed015.add(24).writePointer(ptr(new NativeFunction(_0x1602d8.add(6001804), "int", ["pointer"])(ptr(_0x3bda8e.writeSkin))));
    }
    _0xa93cc2(_0x3ed015, _0x174861);
  }, "void", ["pointer", "pointer"]));
  Interceptor.replace(_0x517d39, new NativeCallback(function (_0xb097f3, _0x13cf16) {
    _0x3bda8e.da = 0;
    _0x3bda8e.dai = {};
    console.log("sleep!");
    _0x379483(_0xb097f3, _0x13cf16);
    if (!_0x1e9c90.online_skinchanger) {
      return;
    }
    Thread.sleep(0.2);
  }, "void", ["pointer", "pointer"]));
  Interceptor.replace(_0x4b2a65, new NativeCallback(function (_0x2f8d45, _0x3d9162) {
    _0x30a0f6(_0x2f8d45, _0x3d9162);
    var _0x360a1f = [_0x2f8d45.add(4).readPointer().readInt(), _0x2f8d45.add(4).readPointer().add(4).readInt()];
    var _0x550681 = _0x3355b6(_0x16641c(_0x360a1f[0], _0x360a1f[1]));
    console.log("hui!");
    if (!_0x1e9c90.online_skinchanger) {
      return;
    }
    console.log(_0x360a1f);
    _0x3bda8e.dai[_0x360a1f] = _0x3bda8e.da;
    let _0x274d89 = true;
    _0x328fb8({
      code: 223,
      tag: "#" + _0x3355b6(_0x16641c(_0x360a1f[0], _0x360a1f[1]))
    }, function (_0x181959) {
      if (_0x181959.skinId != 0) {
        if (_0x2f8d45.add(8).readPointer().add(16).readInt() - 16000000 == _0x181959.brawlerId) {
          _0x2f8d45.add(12).writePointer(ptr(new NativeFunction(_0x1602d8.add(6001804), "int", ["pointer"])(ptr(_0x181959.skinId))));
        }
      }
      _0x274d89 = false;
    });
    while (_0x274d89) {
      Thread.sleep(0.05);
    }
    console.log("end!");
    _0x3bda8e.da++;
  }, "void", ["pointer", "pointer"]));
  Interceptor.replace(_0x1f5b0e, new NativeCallback(function (_0x3db797, _0x1ba810) {
    _0x2d69f8(_0x3db797, _0x1ba810);
    let _0x1e69b7 = [_0x3db797.readInt(), _0x3db797.add(4).readInt()];
    let _0x387549 = _0x3355b6(_0x16641c(_0x1e69b7[0], _0x1e69b7[1]));
    let _0xfb5c28 = _0x3db797.add(248).readPointer();
    if (_0x1e9c90.hide_name) {
      _0xfb5c28.writeByteArray("".scptr().readByteArray(16));
    }
    for (var _0x487947 in _0xd273d2) {
      if (_0x487947.endsWith("-stage") && _0x1e9c90.use_stage) {
        if (_0x387549 == _0x487947.replace("-stage", "")) {
          _0xfb5c28.writeByteArray(_0xd273d2[_0x487947].scptr().readByteArray(16));
        }
      } else if (!_0x1e9c90.use_stage) {
        if (_0x387549 == _0x487947) {
          _0xfb5c28.writeByteArray(_0xd273d2[_0x387549].scptr().readByteArray(16));
        }
      }
    }
    if (!_0x1e9c90.online_skinchanger) {
      return;
    }
    console.log("test!");
    _0x3bda8e.dai[_0x1e69b7] = _0x3bda8e.da;
    let _0x5779f0 = true;
    _0x328fb8({
      code: 223,
      tag: "#" + _0x3355b6(_0x16641c(_0x1e69b7[0], _0x1e69b7[1]))
    }, function (_0x27ad40) {
      console.log("resp!");
      if (_0x27ad40.skinId != 0) {
        _0x3db797.add(44).readPointer().add(0).readPointer().add(16).writePointer(ptr(new NativeFunction(_0x1602d8.add(6001804), "int", ["pointer"])(ptr(_0x27ad40.skinId))));
        _0x3bda8e.playersInBattle[_0x3bda8e.dai[_0x1e69b7]] = _0x3db797.add(44).readPointer().add(0).readPointer().add(16).readPointer().add(16).readInt();
      }
      _0x5779f0 = false;
    });
    while (_0x5779f0) {
      Thread.sleep(0.05);
    }
    _0x3bda8e.da++;
  }, "void", ["pointer", "pointer"]));
  return;
  Interceptor.replace(_0x29cacc, new NativeCallback(function (_0x1b5342, _0x31eae5) {
    _0x130fd3(_0x1b5342, _0x31eae5);
    if (!_0x1e9c90.online_skinchanger) {
      return;
    }
    console.log("tick");
    if (_0x1b5342.add(112).readPointer() == 1) {
      console.log("yes");
      try {
        x.add(16).readPointer().add(0).writePointer(ptr(new NativeFunction(_0x1602d8.add(6001804), "int", ["pointer"])(ptr(_0x3bda8e.playersInBattle[_0x3bda8e.da]))));
      } catch {}
    }
    _0x3bda8e.da++;
  }, "void", ["pointer", "pointer"]));
}
function _0x279b0c() {
  var _0x4770c8 = _0xacf500.getMovieClip("sc/debug.sc", "debug_menu_text");
  _0x3bda8e.debugMenuTxt = new _0x814443(_0x4770c8.getTextFieldByName("Text"));
  _0x3bda8e.debugMenuTxt.setXY(10, 10);
  _0x4770c8.setChildVisible("Text", true);
  _0x1de900.getSprite().addChild(_0x3bda8e.debugMenuTxt);
}
_0x3bda8e.nullsPublicKey = _0x1602d8.add(1228392).readByteArray(64);
_0x3bda8e.prodKey = [64, 108, 142, 227, 117, 61, 224, 175, 211, 96, 218, 41, 11, 159, 21, 28, 251, 94, 24, 127, 97, 36, 45, 173, 76, 155, 156, 187, 132, 166, 51, 241, 177, 67, 231, 80, 194, 164, 7, 219, 225, 212, 183, 62, 238, 124, 13, 20, 40, 110, 226, 51, 156, 66, 221, 69, 40, 222, 107, 83, 175, 212, 160, 66];
function _0x46429f() {
  Interceptor.attach(Module.findExportByName(null, "getaddrinfo"), {
    onEnter(_0x4069a4) {
      if (_0x4069a4[0].readUtf8String() == "game.brawlstarsgame.com" || _0x4069a4[0].readUtf8String() == "brawl.server.dnull.xyz") {
        let _0x911e22 = !_0x1e9c90.use_stage ? "game.brawlstarsgame.com" : "stage.brawlstarsgame.com";
        let _0x405a5e = "9339";
        if (_0x1e9c90.use_proxy) {
          _0x911e22 = !_0x1e9c90.use_stage ? "proxy.hpdevfox.ru" : "stage.hpdevfox.ru";
          _0x405a5e = "9339";
        }
        if (_0x1e9c90.use_nulls) {
          _0x911e22 = "brawl.server.dnull.xyz";
          _0x405a5e = "9339";
          console.log(hexdump(_0x3bda8e.nullsPublicKey));
          _0x1602d8.add(1228392).writeByteArray(_0x3bda8e.nullsPublicKey);
        } else {
          _0x1602d8.add(1228392).writeByteArray(_0x3bda8e.prodKey);
        }
        _0x3bda8e.currentLanguageCode = _0x55582a().fromsc();
        if (_0x1e9c90.show_fps && !_0x3bda8e.debugMenuTxt) {
          _0x279b0c();
        }
        _0x911e22 = "proxy.hpdevfox.ru";
        console.log("Connecting to " + _0x911e22 + ":" + _0x405a5e);
        _0x4069a4[0].writeUtf8String(_0x911e22);
        _0x4069a4[1].writeUtf8String(_0x405a5e);
      }
    }
  });
}
function _0x41bde7() {
  try {
    if (File.exists(_0x105e16 + "files/code.txt")) {
      _0x3bda8e.debugCode = File.readAllText(_0x105e16 + "files/code.txt");
    }
    if (File.exists(_0x105e16 + "files/settings.json")) {
      _0x1e9c90 = JSON.parse(File.readAllText(_0x105e16 + "files/settings.json").replace("}}", "}"));
    } else {
      _0x1e9c90 = _0x15322e();
      File.writeAllText(_0x105e16 + "files/settings.json", JSON.stringify(_0x1e9c90));
    }
  } catch (_0x993e4b) {
    console.log("failed");
    _0x1e9c90 = _0x15322e();
    _0x3bda8e.failedErr = true;
    File.writeAllText(_0x105e16 + "files/settings.json", JSON.stringify(_0x1e9c90));
  }
}
function _0x236138() {
  _0x2ceb73(_0x105e16 + "files/settings.json", "w", JSON.stringify(_0x1e9c90, null, 0));
}
function _0x2ceb73(_0x11f6d5, _0x6b64bd, _0x500ceb) {
  let _0x46bb72 = new File(_0x11f6d5, _0x6b64bd);
  _0x46bb72.write(_0x500ceb);
  _0x46bb72.close();
}
function _0x5b6ce1() {
  const _0x121a92 = "libironsource-ads.so";
  Interceptor.replace(Module.findExportByName(_0x121a92, "_ZN10ironsource11setMetadataEPKcS1_"), new NativeCallback(function () {}, "void", []));
  Interceptor.replace(Module.findExportByName(_0x121a92, "_ZN10ironsource5startEPKcbbS1_"), new NativeCallback(function () {}, "void", []));
  Interceptor.replace(Module.findExportByName(_0x121a92, "_ZN10ironsource13isAdAvailableEv"), new NativeCallback(function () {
    return 0;
  }, "bool", []));
}
function _0x2bcd43() {
  _0x3bda8e.ownHomeDataMsg = null;
  Interceptor.replace(_0x468838, new NativeCallback(function (_0x328958, _0x55f5f1, _0x2c2807) {
    let _0x435f70 = new NativeFunction(_0x55f5f1.readPointer().add(20).readPointer(), "int", ["pointer"])(_0x55f5f1);
    console.log("recv " + _0x435f70);
    if (_0x435f70 == 24101) {
      let _0x4e675b = _0x55f5f1.add(96).readPointer();
      if (_0x4e675b.add(180).readInt() < 2) {
        _0x4e675b.add(180).writeInt(2);
      }
      if (_0x4933b4.getInstance().toInt32() != 0) {
        if (_0x276415().toInt32() != 0) {
          console.log("Server sent OHD when game is already in HOME! We will reload game instead");
          _0x2f72ee.changeToState(4);
          _0x2f72ee.clearGameData();
          _0x3bda8e.ownHomeDataMsg = _0x55f5f1;
          return ptr(0);
        }
      }
    }
    if (_0x435f70 == 23067) {
      let _0x576ee6 = _0x55f5f1.add(92).readInt();
      if (_0x576ee6) {
        switch (_0x576ee6) {
          case 4:
            _0x37cab0.showFloaterText("Выход со всех аккаунтов не удался, вероятно вы уже использовали эту функцию либо Supercell прикрыли лазейку :3");
            break;
          default:
            _0x37cab0.showFloaterText("Выход со всех аккаунтов не удался. Неизвестная ошибка " + _0x576ee6);
            break;
        }
      }
    }
    if (_0x3bda8e.ownHomeDataMsg) {
      _0x2ce2e8(_0x328958, _0x3bda8e.ownHomeDataMsg, _0x2c2807);
      _0x3bda8e.ownHomeDataMsg = null;
    }
    let _0x11e5cb = _0x2ce2e8(_0x328958, _0x55f5f1, _0x2c2807);
    return _0x11e5cb;
  }, "pointer", ["pointer", "pointer", "bool"]));
  Interceptor.replace(_0x5aba05, new NativeCallback(function () {
    if (_0x3e93c1.isHapticsEnabled()) {
      _0x3e054a();
    }
  }, "void", []));
}
function _0x5462a3() {
  Interceptor.attach(_0x1602d8.add(5343384), {
    onEnter(_0x2a4b42) {
      _0x2a4b42[3] = ptr(3);
    }
  });
}
function _0x3c2453() {
  Interceptor.replace(_0x24939a, new NativeCallback(function () {}, "void", []));
}
function _0x432a3b(_0x31d4d9) {
  return _0x357245(_0x31d4d9);
}
function _0xd1283d(_0x5e4120) {
  let _0x33d293 = _0x357245(94);
  _0x33d293.add(44).writeInt(_0x5e4120);
  return _0x33d293;
}
_0x3bda8e.javaLoaded = false;
function _0xde03e5() {
  Interceptor.replace(_0x1602d8.add(5540672), new NativeCallback(function () {
    console.log("stop helpshift!");
    return 0;
  }, "bool", []));
  if (Frida.version != "16.2.1") {
    return;
  }
  console.log(":3");
  if (Java.available) {
    try {
      Java.performNow(function () {
        const _0x4249a6 = Java.use("android.telephony.TelephonyManager");
        const _0x359a27 = Java.use("java.lang.String");
        _0x4249a6.getSimCountryIso.overload().implementation = function () {
          console.log("sim country");
          return _0x359a27.$new("US");
        };
        _0x4249a6.getNetworkCountryIso.overload().implementation = function () {
          console.log("network country");
          return _0x359a27.$new("US");
        };
        var _0x1fa7f8 = Java.use("android.app.Activity");
        _0x1fa7f8.getPackageName.implementation = function () {
          var _0x4ea806 = String(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
          if (_0x4ea806.includes("Webchat")) {
            return _0x359a27.$new("com.supercell.brawlstars");
          }
          return this.getPackageName();
        };
      });
    } catch (_0x4802fb) {
      console.log(_0x4802fb);
      console.log(JSON.stringify(_0x4802fb));
    }
  }
  _0x3bda8e.javaLoaded = true;
}
;
function _0x433411() {
  Process.setExceptionHandler(function (_0x20932c) {
    console.log("APP CRASH!");
    console.log(_0x20932c.address.sub(_0x1602d8));
    console.log("ADDR: " + DebugSymbol.fromAddress(_0x20932c.address));
    console.log("LR: " + DebugSymbol.fromAddress(_0x20932c.context.lr));
    return false;
  });
  _0x3bda8e.deviceData = _0x339e51("ro.soc.manufacturer") + _0x339e51("ro.soc.model") + _0x339e51("ro.product.vendor.brand") + _0x339e51("ro.product.vendor.device") + _0x339e51("ro.product.vendor.name") + _0x339e51("ro.product.system.model") + _0x339e51("ro.product.cpu.abi") + _0x339e51("ro.product.locale") + _0x339e51("ro.bootloader") + _0x339e51("ro.boot.veritymode") + _0x339e51("ro.vendor.build.type") + _0x339e51("ro.build.keys") + _0x339e51("ro.build.host") + _0x339e51("ro.build.user") + _0x339e51("ro.build.type") + _0x339e51("ro.opengles.version") + _0x339e51("ro.hardware") + _0x339e51("ro.hardware.egl") + _0x339e51("ro.boot.vbmeta.device_state") + _0x339e51("ro.crypto.state") + _0x339e51("ro.boot.flash.locked") + _0x339e51("ro.boot.cpuid") + _0x339e51("ro.board.platform") + _0x339e51("ro.boot.baseband") + _0x339e51("gsm.version.ril-impl") + _0x339e51("gsm.version.baseband") + _0x339e51("dev.mnt.blk.data") + _0x339e51("dev.mnt.dev.cache") + _0x339e51("ro.product.first_api_level") + _0x339e51("gsm.sim.state");
  _0x41bde7();
  _0x5b6ce1();
  _0x46429f();
  _0x577ab1();
  _0x2bcd43();
  _0x3c2453();
  _0xde03e5();
  _0x4a7c02.bytes(_0x1602d8.add(2183752), [1, 16, 160, 227]);
}
_0x4a7c02.jumpout(_0x1602d8.add(10232440), _0x1602d8.add(10232472));
_0x4a7c02.nop(_0x1602d8.add(10232504));
function _0x339e51(_0x16d8e5) {
  let _0x4eb341 = _0x3d28cd(128);
  _0x3f3dbd(_0x16d8e5.ptr(), _0x4eb341);
  let _0x1f60d0 = _0x4eb341.readUtf8String();
  _0x534a80(_0x4eb341);
  return _0x1f60d0;
}
Interceptor.replace(_0x1ba3ea, new NativeCallback(function (_0x5ce410, _0x203c2d) {
  try {
    _0x2d81ed(_0x5ce410, _0x203c2d);
  } catch (_0x11cef7) {
    console.log(_0x11cef7);
    return;
  }
}, "void", ["pointer", "float"]));
Interceptor.replace(_0x1602d8.add(9503900), new NativeCallback(function () {
  console.log("hui");
  return 0;
}, "bool", []));
Interceptor.attach(_0x4230d6, {
  onEnter(_0x18825a) {
    let _0x50a8fc = _0x18825a[0];
    let _0x1f2985 = _0x18825a[2];
    let _0x2110fa = _0xacf412.getSupercellIDToken();
    if (_0x2110fa.toInt32() != 0) {
      _0x3bda8e.scid = _0x2110fa.fromsc();
    }
    if (_0x1f2985.toInt32() != 0 && _0x3bda8e.scid) {
      new NativeFunction(_0x13ee62, "void", ["pointer", "pointer"])(_0x1f2985, _0x3bda8e.scid.scptr());
      _0x3bda8e.scid = null;
    }
  }
});
function _0x42931d(_0x4ff9cb) {
  for (let _0x4f07a2 = 0; _0x4f07a2 < 14; _0x4f07a2++) {
    let _0x5698bf = _0xe5ab92(_0x4ff9cb);
    File.writeAllBytes(_0x105e16 + "/cache/gene_" + _0x446e48(0, 99999999999), _0x5698bf.readByteArray(_0x4ff9cb));
    _0x534a80(_0x5698bf);
  }
}
_0x433411();