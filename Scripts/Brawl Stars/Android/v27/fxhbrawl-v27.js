var _0x5af6 = ["findModuleByName", "send", "selectReturn", "int", "memmove", "libg.so", "findExportByName", "sub", "messageFactory", "connect", "writeU8", "relocate", "getApplicationContext", "writeInt", "serverConnection", "exports", "pthread_cond_signal", "$new", "pthreadReturn", "getInstance", "messaging", "com.google.android.gms.ads.AdListener", "onAdClosed", "state", "push", "writePointer", "wakeUpReturnArray", "ca-app-pub-3940256099942544/1033173712", "uint16", "inet_addr", "readPointer", "libc.so", "options", "shadow.Runnable", "sendQueue", "context", "recvQueue", "com.google.android.gms.ads.AdRequest$Builder", "implementation", "pointerSize", "setAdUnitId", "replace", "pointer", "loadAd", "getAbsolutePath", "redirectHost", "com.google.android.gms.ads.MobileAds", "select", "use", "detach", "pthread_mutex_lock", "getCallingClassLoader", "initialize", "allocUtf8String", "toInt32", "createMessageByType", "length", "setAdListener", "newOperator", "attach", "base", "java.lang.Runtime", "free", "build", "equals", "dalvik.system.VMStack", "loadLibrary0", "loginMessagePtr", "readU16", "lib", "show", "returnAddress", "perform", "ntohs", "readU8", "runOnUiThread", "getRuntime", "com.supercell.brawlstars.GameApp", "pthread_mutex_unlock", "com.google.android.gms.ads.InterstitialAd", "add", "java.lang.String", "readInt", "void"];
(function (_0x4aa807, _0x2890c1) {
  var _0x2b6b7e = function (_0x3574e9) {
    while (--_0x3574e9) {
      _0x4aa807.push(_0x4aa807.shift());
    }
  };
  _0x2b6b7e(++_0x2890c1);
})(_0x5af6, 154);
var _0x4d4f = function (_0x4aa807, _0x2890c1) {
  _0x4aa807 = _0x4aa807 - 0;
  var _0x2b6b7e = _0x5af6[_0x4aa807];
  return _0x2b6b7e;
};
var _0x9ce2f7 = {
  modules: {},
  options: {}
};
var _0x18bcb3 = [393812, 433240, 730124, 835980, 3114140, 6419212];
var _0x12ec57 = new NativeFunction(Module[_0x4d4f("0x14")](_0x4d4f("0x2d"), _0x4d4f("0x4c")), _0x4d4f("0xd"), ["pointer"]);
var _0x3d03c4 = new NativeFunction(Module[_0x4d4f("0x14")](_0x4d4f("0x2d"), _0x4d4f("0x40")), _0x4d4f("0x11"), [_0x4d4f("0x38")]);
var _0x3052db = new NativeFunction(Module[_0x4d4f("0x14")]("libc.so", _0x4d4f("0x8")), _0x4d4f("0x11"), ["pointer"]);
var _0x170080 = new NativeFunction(Module.findExportByName(_0x4d4f("0x2d"), _0x4d4f("0x1e")), _0x4d4f("0x11"), [_0x4d4f("0x38")]);
var _0x5f58f6 = new NativeFunction(Module[_0x4d4f("0x14")](_0x4d4f("0x2d"), _0x4d4f("0x3d")), _0x4d4f("0x11"), ["int", _0x4d4f("0x38"), _0x4d4f("0x38"), _0x4d4f("0x38"), _0x4d4f("0x38")]);
var _0x6d6d2 = new NativeFunction(Module[_0x4d4f("0x14")](_0x4d4f("0x2d"), _0x4d4f("0x12")), _0x4d4f("0x38"), ["pointer", _0x4d4f("0x38"), "int"]);
var _0x58d005 = new NativeFunction(Module[_0x4d4f("0x14")]("libc.so", _0x4d4f("0x3")), _0x4d4f("0x2a"), [_0x4d4f("0x2a")]);
var _0x312e40 = new NativeFunction(Module[_0x4d4f("0x14")](_0x4d4f("0x2d"), _0x4d4f("0x2b")), "int", [_0x4d4f("0x38")]);
var _0x37d50b = new NativeFunction(Module[_0x4d4f("0x14")](_0x4d4f("0x2d"), _0x4d4f("0xf")), _0x4d4f("0x11"), [_0x4d4f("0x11"), _0x4d4f("0x38"), "int", "int"]);
var _0x1254a9 = new NativeFunction(Module[_0x4d4f("0x14")]("libc.so", "recv"), "int", [_0x4d4f("0x11"), _0x4d4f("0x38"), _0x4d4f("0x11"), _0x4d4f("0x11")]);
var _0xa98359 = null;
var _0x226e46 = 0;
function _0xa6b3f2(_0x3c565e, _0x14d299) {
  Java[_0x4d4f("0x2")](function () {
    var _0x344f9f = Java[_0x4d4f("0x3e")]("java.lang.System");
    var _0x4a7752 = Java[_0x4d4f("0x3e")](_0x4d4f("0x4b"));
    var _0x13e163 = _0x344f9f.loadLibrary.overload(_0x4d4f("0xb"));
    var _0x166a8b = Java[_0x4d4f("0x3e")](_0x4d4f("0x4f"));
    _0x13e163[_0x4d4f("0x34")] = function (_0x4bf46c) {
      try {
        if (_0x4a7752[_0x4d4f("0x6")]()[_0x4d4f("0x50")]) {
          _0x4a7752[_0x4d4f("0x6")]()[_0x4d4f("0x50")](_0x166a8b[_0x4d4f("0x41")](), _0x4bf46c);
        } else {
          _0x4a7752.getRuntime().loadLibrary(_0x4bf46c, _0x166a8b.getCallingClassLoader());
        }
        if (_0x3c565e === _0x4d4f("0x53") + _0x4bf46c + ".so") {
          _0x14d299();
        }
      } catch (_0x5533c0) {}
    };
  });
}
var _0x414c1a = {
  e: function (_0x3862de) {
    return _0x3862de[_0x4d4f("0xa")](8);
  },
  n: function (_0x152e5a) {
    return Memory[_0x4d4f("0xc")](_0x152e5a[_0x4d4f("0xa")](4));
  },
  t: function (_0x3bfe33, _0x554ce8) {
    Memory[_0x4d4f("0x1b")](_0x3bfe33.add(4), _0x554ce8);
  },
  o: function (_0xf1ee5c) {
    return new NativeFunction(Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0xf1ee5c)[_0x4d4f("0xa")](20)), _0x4d4f("0x11"), [_0x4d4f("0x38")])(_0xf1ee5c);
  },
  a: function (_0x1144b7) {
    new NativeFunction(Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0x1144b7)[_0x4d4f("0xa")](8)), "void", [_0x4d4f("0x38")])(_0x1144b7);
  },
  c: function (_0x3300c7) {
    new NativeFunction(Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0x3300c7)[_0x4d4f("0xa")](12)), "void", [_0x4d4f("0x38")])(_0x3300c7);
  },
  r: function (_0xcc27e2) {
    new NativeFunction(Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0xcc27e2)[_0x4d4f("0xa")](24)), _0x4d4f("0xd"), [_0x4d4f("0x38")])(_0xcc27e2);
    new NativeFunction(Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0xcc27e2)[_0x4d4f("0xa")](4)), _0x4d4f("0xd"), [_0x4d4f("0x38")])(_0xcc27e2);
  }
};
var _0x1fe844 = {
  i: function (_0x28616d) {
    return Memory.readInt(_0x28616d[_0x4d4f("0xa")](16));
  },
  u: function (_0x57cb15) {
    return Memory[_0x4d4f("0x2c")](_0x57cb15.add(28));
  },
  s: function (_0x8909a6, _0x4bdf27) {
    Memory.writePointer(_0x8909a6[_0x4d4f("0xa")](28), _0x4bdf27);
  },
  m: function (_0x4b7417) {
    return Memory[_0x4d4f("0xc")](_0x4b7417[_0x4d4f("0xa")](20));
  },
  M: function (_0x27552f, _0x281884) {
    Memory[_0x4d4f("0x1b")](_0x27552f[_0x4d4f("0xa")](20), _0x281884);
  }
};
var _0x35dcee = {
  l: function (_0x329019) {
    return Memory[_0x4d4f("0x4")](_0x329019[_0x4d4f("0xa")](2)) << 16 | Memory[_0x4d4f("0x4")](_0x329019[_0x4d4f("0xa")](3)) << 8 | Memory[_0x4d4f("0x4")](_0x329019[_0x4d4f("0xa")](4));
  },
  _: function (_0x141352, _0x2e961c) {
    Memory[_0x4d4f("0x18")](_0x141352[_0x4d4f("0xa")](2), _0x2e961c >> 16 & 255);
    Memory[_0x4d4f("0x18")](_0x141352[_0x4d4f("0xa")](3), _0x2e961c >> 8 & 255);
    Memory.writeU8(_0x141352[_0x4d4f("0xa")](4), 255 & _0x2e961c);
  },
  d: function (_0x39add5, _0x3d6a43) {
    Memory[_0x4d4f("0x18")](_0x39add5[_0x4d4f("0xa")](0), _0x3d6a43 >> 8 & 255);
    Memory.writeU8(_0x39add5[_0x4d4f("0xa")](1), 255 & _0x3d6a43);
  },
  v: function (_0x4fe7f9) {
    return Memory[_0x4d4f("0x4")](_0x4fe7f9[_0x4d4f("0xa")](5)) << 8 | Memory.readU8(_0x4fe7f9.add(6));
  },
  f: function (_0x4ddbf6, _0x5e49bb) {
    Memory[_0x4d4f("0x18")](_0x4ddbf6[_0x4d4f("0xa")](5), _0x5e49bb >> 8 & 255);
    Memory.writeU8(_0x4ddbf6[_0x4d4f("0xa")](6), 255 & _0x5e49bb);
  },
  o: function (_0x1d395e) {
    return Memory[_0x4d4f("0x4")](_0x1d395e) << 8 | Memory[_0x4d4f("0x4")](_0x1d395e.add(1));
  }
};
var _0x2fd5b9 = {
  h: function (_0x4b52d7) {
    return Memory[_0x4d4f("0xc")](_0x4b52d7[_0x4d4f("0xa")](4));
  },
  g: function (_0x5744eb, _0x504230) {
    return Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0x5744eb).add(Process.pointerSize * _0x504230));
  },
  p: function (_0x3a1766, _0x18534c, _0x21614c) {
    Memory[_0x4d4f("0x27")](Memory.readPointer(_0x3a1766)[_0x4d4f("0xa")](Process[_0x4d4f("0x35")] * _0x18534c), _0x21614c);
  },
  y: function (_0x4fb0d9) {
    return Memory[_0x4d4f("0xc")](_0x4fb0d9[_0x4d4f("0xa")](8));
  },
  R: function (_0x49dce1) {
    Memory.writeInt(_0x49dce1[_0x4d4f("0xa")](8), Memory.readInt(_0x49dce1[_0x4d4f("0xa")](8)) - 1);
  },
  A: function (_0x19d888) {
    Memory[_0x4d4f("0x1b")](_0x19d888[_0x4d4f("0xa")](8), Memory[_0x4d4f("0xc")](_0x19d888[_0x4d4f("0xa")](8)) + 1);
  },
  N: function (_0x386a4f) {
    return Memory[_0x4d4f("0xc")](_0x386a4f[_0x4d4f("0xa")](12));
  },
  T: function (_0x265364) {
    return Memory[_0x4d4f("0xc")](_0x265364[_0x4d4f("0xa")](16));
  },
  b: function (_0x519e57, _0x508416) {
    Memory.writeInt(_0x519e57.add(12), _0x508416);
  },
  S: function (_0x7c6067, _0x1ebe93) {
    Memory[_0x4d4f("0x1b")](_0x7c6067[_0x4d4f("0xa")](16), _0x1ebe93);
  },
  w: function (_0x253b71, _0x10d82b) {
    _0x3d03c4(_0x253b71[_0x4d4f("0x15")](4));
    var _0x430acc = Memory[_0x4d4f("0xc")](_0x253b71[_0x4d4f("0xa")](16));
    _0x2fd5b9.p(_0x253b71, _0x430acc, _0x10d82b);
    _0x2fd5b9.S(_0x253b71, (_0x430acc + 1) % Memory[_0x4d4f("0xc")](_0x253b71[_0x4d4f("0xa")](4)));
    _0x2fd5b9.A(_0x253b71);
    _0x3052db(_0x253b71.sub(4));
  },
  C: function (_0x1c2e94) {
    var _0x5ac501 = null;
    _0x3d03c4(_0x1c2e94[_0x4d4f("0x15")](4));
    if (Memory[_0x4d4f("0xc")](_0x1c2e94[_0x4d4f("0xa")](8))) {
      var _0x5d8a72 = Memory[_0x4d4f("0xc")](_0x1c2e94[_0x4d4f("0xa")](12));
      _0x5ac501 = Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0x1c2e94).add(Process.pointerSize * _0x5d8a72));
      _0x2fd5b9.b(_0x1c2e94, (_0x5d8a72 + 1) % Memory[_0x4d4f("0xc")](_0x1c2e94[_0x4d4f("0xa")](4)));
      _0x2fd5b9.R(_0x1c2e94);
    }
    _0x3052db(_0x1c2e94[_0x4d4f("0x15")](4));
    return _0x5ac501;
  }
};
function _0x5584c6() {
  _0x2ab2aa();
  if (_0x9ce2f7[_0x4d4f("0x2e")][_0x4d4f("0x19")]) {
    _0x574fc1();
  }
  Interceptor[_0x4d4f("0x49")](Module.findExportByName("libc.so", _0x4d4f("0x17")), {
    onEnter: function (_0x2ff264) {
      if (9339 === _0x58d005(Memory[_0x4d4f("0x52")](_0x2ff264[1][_0x4d4f("0xa")](2)))) {
        _0x9ce2f7.fd = _0x2ff264[0][_0x4d4f("0x44")]();
        if (_0x9ce2f7[_0x4d4f("0x2e")][_0x4d4f("0x3b")]) {
          var _0x3aa8a3 = Memory.allocUtf8String(_0x9ce2f7.options[_0x4d4f("0x3b")]);
          Memory[_0x4d4f("0x1b")](_0x2ff264[1][_0x4d4f("0xa")](4), _0x312e40(_0x3aa8a3));
        }
        _0x1210c2();
      }
    }
  });
}
function _0x2ab2aa() {
  Java.perform(function () {
    var _0x2a9e1c = Java[_0x4d4f("0x3e")](_0x4d4f("0x3c"));
    var _0x1f9ae7 = Java[_0x4d4f("0x3e")](_0x4d4f("0x9"));
    var _0x3a2eba = Java[_0x4d4f("0x3e")](_0x4d4f("0x33"));
    var _0x3ed0b3 = Java[_0x4d4f("0x3e")](_0x4d4f("0x23"));
    var _0x48556d = Java[_0x4d4f("0x3e")](_0x4d4f("0xb"));
    var _0x352052 = Java[_0x4d4f("0x3e")](_0x4d4f("0x7"))[_0x4d4f("0x21")]();
    _0x2a9e1c[_0x4d4f("0x42")](_0x352052, _0x48556d.$new("ca-app-pub-3940256099942544~3347511713"));
    (_0xa98359 = Java.retain(_0x1f9ae7.$new(_0x352052)))[_0x4d4f("0x36")](_0x48556d[_0x4d4f("0x1f")](_0x4d4f("0x29")));
    _0x3ed0b3[_0x4d4f("0x24")][_0x4d4f("0x34")] = function () {
      _0xa98359.loadAd(_0x3a2eba[_0x4d4f("0x1f")]()[_0x4d4f("0x4d")]());
    };
    _0xa98359[_0x4d4f("0x47")](_0x3ed0b3[_0x4d4f("0x1f")]());
    _0xa98359[_0x4d4f("0x39")](_0x3a2eba[_0x4d4f("0x1f")]()[_0x4d4f("0x4d")]());
  });
}
function _0x574fc1() {
  var _0x52dc50 = new NativeFunction(_0x9ce2f7.base[_0x4d4f("0xa")](1570764), _0x4d4f("0x38"), [_0x4d4f("0x38"), "pointer"]);
  var _0xf4dfad = Interceptor[_0x4d4f("0x49")](_0x9ce2f7[_0x4d4f("0x4a")][_0x4d4f("0xa")](5546688), {
    onLeave: function () {
      _0xf4dfad[_0x4d4f("0x3f")]();
      Java[_0x4d4f("0x2")](function () {
        var _0x5139c8 = Java[_0x4d4f("0x3e")](_0x4d4f("0x7"))[_0x4d4f("0x21")]()[_0x4d4f("0x1a")]();
        var _0x3a80d5 = _0x9ce2f7.base[_0x4d4f("0xa")](12147244);
        var _0x290cbc = _0x5139c8.getExternalFilesDir(null)[_0x4d4f("0x3a")]() + "/";
        _0x52dc50(_0x3a80d5, Memory[_0x4d4f("0x43")](_0x290cbc));
      });
    }
  });
}
function _0x1210c2() {
  _0x9ce2f7[_0x4d4f("0x28")] = [];
  for (var _0x1a8c42 = 0; _0x1a8c42 < _0x18bcb3[_0x4d4f("0x46")]; _0x1a8c42 += 1) {
    _0x9ce2f7[_0x4d4f("0x28")][_0x4d4f("0x26")](_0x9ce2f7.base.add(_0x18bcb3[_0x1a8c42]));
  }
  function _0xb9cb41() {
    for (var _0x2fa6aa = _0x2fd5b9.C(_0x9ce2f7[_0x4d4f("0x30")]); _0x2fa6aa;) {
      var _0x51045f = new NativeFunction(Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0x2fa6aa)[_0x4d4f("0xa")](20)), _0x4d4f("0x11"), [_0x4d4f("0x38")])(_0x2fa6aa);
      if (10100 === _0x51045f) {
        _0x2fa6aa = Memory.readPointer(_0x9ce2f7.loginMessagePtr);
        Memory[_0x4d4f("0x27")](_0x9ce2f7[_0x4d4f("0x51")], ptr(0));
      }
      if (14350 === _0x51045f) {
        Java[_0x4d4f("0x2")](function () {
          var _0x2a5bb1 = Java[_0x4d4f("0x3e")](_0x4d4f("0x7"));
          var _0x4431e8 = Java.use("java.lang.Runnable");
          var _0x2514f6 = _0x2a5bb1[_0x4d4f("0x21")]();
          var _0x36d7a3 = Java.registerClass({
            name: _0x4d4f("0x2f"),
            implements: [_0x4431e8],
            methods: {
              run: function () {
                var _0x4d5caa = Date.now();
                if (3e5 < _0x4d5caa - _0x226e46 && _0xa98359.isLoaded()) {
                  _0xa98359[_0x4d4f("0x0")]();
                  _0x226e46 = _0x4d5caa;
                }
              }
            }
          });
          if (_0xa98359 && _0x2514f6) {
            _0x2514f6[_0x4d4f("0x5")](_0x36d7a3[_0x4d4f("0x1f")]());
          }
        });
      }
      _0x414c1a.a(_0x2fa6aa);
      var _0x39572f = _0x2fa6aa[_0x4d4f("0xa")](8);
      var _0x34f9f1 = Memory.readInt(_0x39572f[_0x4d4f("0xa")](16));
      var _0x30943e = _0x9ce2f7[_0x4d4f("0x48")](_0x34f9f1 + 7);
      _0x6d6d2(_0x30943e.add(7), Memory[_0x4d4f("0x2c")](_0x39572f.add(28)), _0x34f9f1);
      _0x35dcee._(_0x30943e, _0x34f9f1);
      _0x35dcee.d(_0x30943e, new NativeFunction(Memory[_0x4d4f("0x2c")](Memory[_0x4d4f("0x2c")](_0x2fa6aa)[_0x4d4f("0xa")](20)), _0x4d4f("0x11"), [_0x4d4f("0x38")])(_0x2fa6aa));
      _0x35dcee.f(_0x30943e, Memory[_0x4d4f("0xc")](_0x2fa6aa[_0x4d4f("0xa")](4)));
      _0x37d50b(_0x9ce2f7.fd, _0x30943e, _0x34f9f1 + 7, 0);
      _0x12ec57(_0x30943e);
      _0x414c1a.r(_0x2fa6aa);
      _0x2fa6aa = _0x2fd5b9.C(_0x9ce2f7[_0x4d4f("0x30")]);
    }
  }
  _0x9ce2f7[_0x4d4f("0x20")] = _0x9ce2f7[_0x4d4f("0x4a")].add(7720719);
  _0x9ce2f7[_0x4d4f("0x1c")] = Memory[_0x4d4f("0x2c")](_0x9ce2f7[_0x4d4f("0x4a")][_0x4d4f("0xa")](12146092));
  _0x9ce2f7[_0x4d4f("0x10")] = _0x9ce2f7[_0x4d4f("0x4a")][_0x4d4f("0xa")](1377332);
  _0x9ce2f7[_0x4d4f("0x22")] = Memory[_0x4d4f("0x2c")](_0x9ce2f7[_0x4d4f("0x1c")][_0x4d4f("0xa")](4));
  _0x9ce2f7[_0x4d4f("0x16")] = Memory.readPointer(_0x9ce2f7[_0x4d4f("0x22")][_0x4d4f("0xa")](52));
  _0x9ce2f7[_0x4d4f("0x32")] = _0x9ce2f7.messaging[_0x4d4f("0xa")](60);
  _0x9ce2f7.sendQueue = _0x9ce2f7.messaging[_0x4d4f("0xa")](84);
  _0x9ce2f7[_0x4d4f("0x25")] = _0x9ce2f7.messaging[_0x4d4f("0xa")](208);
  _0x9ce2f7[_0x4d4f("0x51")] = _0x9ce2f7[_0x4d4f("0x22")].add(212);
  _0x9ce2f7[_0x4d4f("0x48")] = new NativeFunction(_0x9ce2f7[_0x4d4f("0x4a")][_0x4d4f("0xa")](7852221), _0x4d4f("0x38"), [_0x4d4f("0x11")]);
  _0x9ce2f7.createMessageByType = new NativeFunction(_0x9ce2f7.base[_0x4d4f("0xa")](4829160), _0x4d4f("0x38"), ["pointer", "int"]);
  Interceptor.replace(Module[_0x4d4f("0x14")]("libc.so", _0x4d4f("0x1e")), new NativeCallback(function (_0x4e965a) {
    if (!this[_0x4d4f("0x1")][_0x4d4f("0x4e")](_0x9ce2f7.pthreadReturn)) {
      return _0x170080(_0x4e965a);
    }
    var _0x1e2ae9 = Memory.readPointer(this[_0x4d4f("0x31")].sp.add(4));
    for (var _0x36138a = 0; _0x36138a < _0x9ce2f7.wakeUpReturnArray[_0x4d4f("0x46")]; _0x36138a += 1) {
      if (_0x1e2ae9[_0x4d4f("0x4e")](_0x9ce2f7[_0x4d4f("0x28")][_0x36138a])) {
        _0xb9cb41();
        return 0;
      }
    }
    return _0x170080(_0x4e965a);
  }, _0x4d4f("0x11"), [_0x4d4f("0x38")]));
  Interceptor[_0x4d4f("0x37")](Module[_0x4d4f("0x14")](_0x4d4f("0x2d"), _0x4d4f("0x3d")), new NativeCallback(function (_0x3a55fd, _0x2dbb7d, _0x25045e, _0x4c7ec5, _0x1a8822) {
    var _0x52b8c6 = _0x5f58f6(_0x3a55fd, _0x2dbb7d, _0x25045e, _0x4c7ec5, _0x1a8822);
    if (this[_0x4d4f("0x1")][_0x4d4f("0x4e")](_0x9ce2f7[_0x4d4f("0x10")])) {
      (function () {
        var _0x52b1de = _0x9ce2f7[_0x4d4f("0x48")](7);
        _0x1254a9(_0x9ce2f7.fd, _0x52b1de, 7, 256);
        var _0x18028a = Memory[_0x4d4f("0x4")](_0x52b1de) << 8 | Memory[_0x4d4f("0x4")](_0x52b1de.add(1));
        if (20104 === _0x18028a) {
          Memory[_0x4d4f("0x1b")](_0x9ce2f7[_0x4d4f("0x25")], 5);
        }
        var _0x280f21 = Memory[_0x4d4f("0x4")](_0x52b1de[_0x4d4f("0xa")](2)) << 16 | Memory[_0x4d4f("0x4")](_0x52b1de[_0x4d4f("0xa")](3)) << 8 | Memory[_0x4d4f("0x4")](_0x52b1de[_0x4d4f("0xa")](4));
        var _0x4b2e37 = Memory[_0x4d4f("0x4")](_0x52b1de[_0x4d4f("0xa")](5)) << 8 | Memory.readU8(_0x52b1de.add(6));
        _0x12ec57(_0x52b1de);
        var _0x122bdd = _0x9ce2f7[_0x4d4f("0x48")](_0x280f21);
        _0x1254a9(_0x9ce2f7.fd, _0x122bdd, _0x280f21, 256);
        var _0x473bdb = _0x9ce2f7[_0x4d4f("0x45")](_0x9ce2f7[_0x4d4f("0x16")], _0x18028a);
        _0x414c1a.t(_0x473bdb, _0x4b2e37);
        var _0x5f34af = _0x473bdb[_0x4d4f("0xa")](8);
        _0x1fe844.M(_0x5f34af, _0x280f21);
        if (_0x280f21) {
          var _0x22fe88 = _0x9ce2f7[_0x4d4f("0x48")](_0x280f21);
          _0x6d6d2(_0x22fe88, _0x122bdd, _0x280f21);
          _0x1fe844.s(_0x5f34af, _0x22fe88);
        }
        _0x414c1a.c(_0x473bdb);
        _0x2fd5b9.w(_0x9ce2f7.recvQueue, _0x473bdb);
        _0x12ec57(_0x122bdd);
      })();
    }
    return _0x52b8c6;
  }, _0x4d4f("0x11"), [_0x4d4f("0x11"), _0x4d4f("0x38"), "pointer", _0x4d4f("0x38"), _0x4d4f("0x38")]));
}
rpc[_0x4d4f("0x1d")] = {
  init: function (_0x29965d, _0x5ec23f) {
    _0x9ce2f7.options = _0x5ec23f || {};
    _0xa6b3f2(_0x4d4f("0x13"), function () {
      Interceptor.detachAll();
      _0x9ce2f7[_0x4d4f("0x4a")] = Process[_0x4d4f("0xe")](_0x4d4f("0x13"))[_0x4d4f("0x4a")];
      _0x5584c6();
    });
  }
};