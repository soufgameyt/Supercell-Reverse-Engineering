// deobfuscated by @soufgameV2 , https://t.me/AllBSModsTG
var _0x34a8 = ['length', 'select', 'returnAddress', 'libg.so', 'detachAll', 'findModuleByName', 'void', 'libc.so', 'pthread_mutex_lock', 'int', 'findExportByName', 'pthread_mutex_unlock', 'pointer', 'pthread_cond_signal', 'ntohs', 'uint16', 'inet_addr', 'perform', 'use', 'java.lang.System', 'java.lang.Runtime', 'loadLibrary', 'overload', 'java.lang.String', 'dalvik.system.VMStack', 'implementation', 'getRuntime', 'loadLibrary0', 'getCallingClassLoader', 'lib', '.so', 'add', 'readInt', 'writeInt', 'readPointer', 'writePointer', 'readU8', 'writeU8', 'pointerSize', 'sub', 'attach', 'connect', 'readU16', 'options', 'redirectHost', 'allocUtf8String', 'wakeUpReturnArray', 'push', 'base', 'sendQueue', 'newOperator', 'serverConnection', 'selectReturn', 'messageFactory', 'messaging', 'recvQueue', 'state', 'loginMessagePtr', 'createMessageByType', 'equals', 'context'];
(function (_0x5a121c, _0x49a2ea) {
  var _0x3a13c4 = function (_0x3b74e3) {
    while (--_0x3b74e3) {
      _0x5a121c.push(_0x5a121c.shift());
    }
  };
  _0x3a13c4(++_0x49a2ea);
})(_0x34a8, 0xbd);
var _0x4dc2 = function (_0xcb6569, _0x5baa62) {
  _0xcb6569 = _0xcb6569 - 0x0;
  var _0x5b3ab1 = _0x34a8[_0xcb6569];
  return _0x5b3ab1;
};
var _0xcc5f87 = {
  'modules': {},
  'options': {}
};
var _0x521dc5 = [0x758e4, 0xbfe50, 0xf1924, 0xf985c, 0x479cd0, 0x54d37c];
var _0x34dfcd = new NativeFunction(Module.findExportByName('libc.so', 'free'), _0x4dc2('0x0'), ['pointer']);
var _0x4b8a4e = new NativeFunction(Module.findExportByName(_0x4dc2('0x1'), _0x4dc2('0x2')), _0x4dc2('0x3'), ['pointer']);
var _0x5a39ac = new NativeFunction(Module[_0x4dc2('0x4')]('libc.so', _0x4dc2('0x5')), _0x4dc2('0x3'), [_0x4dc2('0x6')]);
var _0x593dc = new NativeFunction(Module[_0x4dc2('0x4')](_0x4dc2('0x1'), _0x4dc2('0x7')), _0x4dc2('0x3'), [_0x4dc2('0x6')]);
var _0x22f39c = new NativeFunction(Module[_0x4dc2('0x4')](_0x4dc2('0x1'), 'select'), _0x4dc2('0x3'), [_0x4dc2('0x3'), _0x4dc2('0x6'), _0x4dc2('0x6'), _0x4dc2('0x6'), 'pointer']);
var _0x311454 = new NativeFunction(Module[_0x4dc2('0x4')]('libc.so', 'memmove'), 'pointer', [_0x4dc2('0x6'), _0x4dc2('0x6'), _0x4dc2('0x3')]);
var _0x5d3b02 = new NativeFunction(Module[_0x4dc2('0x4')]('libc.so', _0x4dc2('0x8')), _0x4dc2('0x9'), [_0x4dc2('0x9')]);
var _0x31ec58 = new NativeFunction(Module[_0x4dc2('0x4')](_0x4dc2('0x1'), _0x4dc2('0xa')), _0x4dc2('0x3'), [_0x4dc2('0x6')]);
var _0x19b62f = new NativeFunction(Module.findExportByName(_0x4dc2('0x1'), 'send'), 'int', [_0x4dc2('0x3'), 'pointer', 'int', _0x4dc2('0x3')]);
var _0x1ec758 = new NativeFunction(Module[_0x4dc2('0x4')](_0x4dc2('0x1'), 'recv'), _0x4dc2('0x3'), [_0x4dc2('0x3'), _0x4dc2('0x6'), _0x4dc2('0x3'), 'int']);
function _0x1168fe(_0x3a174c, _0x42c9af) {
  Java[_0x4dc2('0xb')](function () {
    var _0x1b1200 = Java[_0x4dc2('0xc')](_0x4dc2('0xd'));
    var _0x27d44c = Java[_0x4dc2('0xc')](_0x4dc2('0xe'));
    var _0x5f1d1c = _0x1b1200[_0x4dc2('0xf')][_0x4dc2('0x10')](_0x4dc2('0x11'));
    var _0x34aca8 = Java[_0x4dc2('0xc')](_0x4dc2('0x12'));
    _0x5f1d1c[_0x4dc2('0x13')] = function (_0x1b1200) {
      try {
        if (_0x27d44c[_0x4dc2('0x14')]()[_0x4dc2('0x15')]) {
          _0x27d44c[_0x4dc2('0x14')]()[_0x4dc2('0x15')](_0x34aca8[_0x4dc2('0x16')](), _0x1b1200);
        } else {
          _0x27d44c.getRuntime().loadLibrary(_0x1b1200, _0x34aca8[_0x4dc2('0x16')]());
        }
        if (_0x3a174c === _0x4dc2('0x17') + _0x1b1200 + _0x4dc2('0x18')) {
          _0x42c9af();
        }
      } catch (_0x129ac5) {}
    };
  });
}
var _0x24dfa2 = {
  'e': function (_0x244a5c) {
    return _0x244a5c[_0x4dc2('0x19')](0x8);
  },
  'n': function (_0x17580a) {
    return Memory[_0x4dc2('0x1a')](_0x17580a[_0x4dc2('0x19')](0x4));
  },
  't': function (_0x4a03aa, _0x21b600) {
    Memory[_0x4dc2('0x1b')](_0x4a03aa.add(0x4), _0x21b600);
  },
  'o': function (_0x43167f) {
    return new NativeFunction(Memory.readPointer(Memory[_0x4dc2('0x1c')](_0x43167f)[_0x4dc2('0x19')](0x14)), _0x4dc2('0x3'), [_0x4dc2('0x6')])(_0x43167f);
  },
  'c': function (_0xfda0c8) {
    new NativeFunction(Memory[_0x4dc2('0x1c')](Memory.readPointer(_0xfda0c8).add(0x8)), 'void', [_0x4dc2('0x6')])(_0xfda0c8);
  },
  'r': function (_0x137ed4) {
    new NativeFunction(Memory[_0x4dc2('0x1c')](Memory[_0x4dc2('0x1c')](_0x137ed4)[_0x4dc2('0x19')](0xc)), 'void', [_0x4dc2('0x6')])(_0x137ed4);
  },
  'i': function (_0x512b5d) {
    new NativeFunction(Memory.readPointer(Memory[_0x4dc2('0x1c')](_0x512b5d)[_0x4dc2('0x19')](0x18)), _0x4dc2('0x0'), [_0x4dc2('0x6')])(_0x512b5d);
    new NativeFunction(Memory[_0x4dc2('0x1c')](Memory[_0x4dc2('0x1c')](_0x512b5d)[_0x4dc2('0x19')](0x4)), _0x4dc2('0x0'), [_0x4dc2('0x6')])(_0x512b5d);
  }
};
var _0x2429a3 = {
  'a': function (_0x4885a0) {
    return Memory[_0x4dc2('0x1a')](_0x4885a0[_0x4dc2('0x19')](0x10));
  },
  'u': function (_0x2be485) {
    return Memory.readPointer(_0x2be485.add(0x1c));
  },
  's': function (_0x27cba5, _0x1b6efa) {
    Memory[_0x4dc2('0x1d')](_0x27cba5.add(0x1c), _0x1b6efa);
  },
  'M': function (_0x547d33) {
    return Memory[_0x4dc2('0x1a')](_0x547d33[_0x4dc2('0x19')](0x14));
  },
  '_': function (_0x113074, _0x199456) {
    Memory[_0x4dc2('0x1b')](_0x113074[_0x4dc2('0x19')](0x14), _0x199456);
  }
};
var _0x380db6 = {
  'm': function (_0x2081e3) {
    return Memory[_0x4dc2('0x1e')](_0x2081e3[_0x4dc2('0x19')](0x2)) << 0x10 | Memory[_0x4dc2('0x1e')](_0x2081e3.add(0x3)) << 0x8 | Memory.readU8(_0x2081e3[_0x4dc2('0x19')](0x4));
  },
  'h': function (_0x5e5910, _0x5c2b25) {
    Memory[_0x4dc2('0x1f')](_0x5e5910[_0x4dc2('0x19')](0x2), _0x5c2b25 >> 0x10 & 0xff);
    Memory[_0x4dc2('0x1f')](_0x5e5910[_0x4dc2('0x19')](0x3), _0x5c2b25 >> 0x8 & 0xff);
    Memory[_0x4dc2('0x1f')](_0x5e5910[_0x4dc2('0x19')](0x4), 0xff & _0x5c2b25);
  },
  'f': function (_0x229841, _0x26c641) {
    Memory.writeU8(_0x229841[_0x4dc2('0x19')](0x0), _0x26c641 >> 0x8 & 0xff);
    Memory[_0x4dc2('0x1f')](_0x229841[_0x4dc2('0x19')](0x1), 0xff & _0x26c641);
  },
  'y': function (_0x4b2989) {
    return Memory[_0x4dc2('0x1e')](_0x4b2989.add(0x5)) << 0x8 | Memory.readU8(_0x4b2989[_0x4dc2('0x19')](0x6));
  },
  'g': function (_0x27554b, _0x292f66) {
    Memory[_0x4dc2('0x1f')](_0x27554b[_0x4dc2('0x19')](0x5), _0x292f66 >> 0x8 & 0xff);
    Memory[_0x4dc2('0x1f')](_0x27554b[_0x4dc2('0x19')](0x6), 0xff & _0x292f66);
  },
  'o': function (_0x51737a) {
    return Memory[_0x4dc2('0x1e')](_0x51737a) << 0x8 | Memory[_0x4dc2('0x1e')](_0x51737a[_0x4dc2('0x19')](0x1));
  }
};
var _0x26ad1b = {
  'l': function (_0x233382) {
    return Memory[_0x4dc2('0x1a')](_0x233382[_0x4dc2('0x19')](0x4));
  },
  'd': function (_0x5cd7cc, _0x3ea853) {
    return Memory.readPointer(Memory.readPointer(_0x5cd7cc)[_0x4dc2('0x19')](Process[_0x4dc2('0x20')] * _0x3ea853));
  },
  'v': function (_0x5c56cc, _0x52879d, _0x19dde6) {
    Memory[_0x4dc2('0x1d')](Memory[_0x4dc2('0x1c')](_0x5c56cc)[_0x4dc2('0x19')](Process.pointerSize * _0x52879d), _0x19dde6);
  },
  'p': function (_0x20cd1e) {
    return Memory[_0x4dc2('0x1a')](_0x20cd1e[_0x4dc2('0x19')](0x8));
  },
  'N': function (_0x39240e) {
    Memory[_0x4dc2('0x1b')](_0x39240e.add(0x8), Memory[_0x4dc2('0x1a')](_0x39240e[_0x4dc2('0x19')](0x8)) - 0x1);
  },
  'R': function (_0x1682b6) {
    Memory.writeInt(_0x1682b6[_0x4dc2('0x19')](0x8), Memory[_0x4dc2('0x1a')](_0x1682b6.add(0x8)) + 0x1);
  },
  'b': function (_0x211a88) {
    return Memory.readInt(_0x211a88[_0x4dc2('0x19')](0xc));
  },
  'T': function (_0x324b5e) {
    return Memory[_0x4dc2('0x1a')](_0x324b5e[_0x4dc2('0x19')](0x10));
  },
  'A': function (_0x27d0bb, _0x19f32c) {
    Memory[_0x4dc2('0x1b')](_0x27d0bb[_0x4dc2('0x19')](0xc), _0x19f32c);
  },
  'w': function (_0x3b4870, _0x3cae60) {
    Memory.writeInt(_0x3b4870[_0x4dc2('0x19')](0x10), _0x3cae60);
  },
  'B': function (_0x1e0c2d, _0x2f652c) {
    _0x4b8a4e(_0x1e0c2d.sub(0x4));
    var _0x11a21f = Memory[_0x4dc2('0x1a')](_0x1e0c2d[_0x4dc2('0x19')](0x10));
    _0x26ad1b.v(_0x1e0c2d, _0x11a21f, _0x2f652c);
    _0x26ad1b.w(_0x1e0c2d, (_0x11a21f + 0x1) % Memory[_0x4dc2('0x1a')](_0x1e0c2d[_0x4dc2('0x19')](0x4)));
    _0x26ad1b.R(_0x1e0c2d);
    _0x5a39ac(_0x1e0c2d.sub(0x4));
  },
  'F': function (_0x5c7a55) {
    var _0x43a6d0 = null;
    _0x4b8a4e(_0x5c7a55[_0x4dc2('0x21')](0x4));
    if (Memory[_0x4dc2('0x1a')](_0x5c7a55[_0x4dc2('0x19')](0x8))) {
      var _0x3deb19 = Memory.readInt(_0x5c7a55[_0x4dc2('0x19')](0xc));
      _0x43a6d0 = Memory.readPointer(Memory.readPointer(_0x5c7a55)[_0x4dc2('0x19')](Process[_0x4dc2('0x20')] * _0x3deb19));
      _0x26ad1b.A(_0x5c7a55, (_0x3deb19 + 0x1) % Memory[_0x4dc2('0x1a')](_0x5c7a55[_0x4dc2('0x19')](0x4)));
      _0x26ad1b.N(_0x5c7a55);
    }
    _0x5a39ac(_0x5c7a55[_0x4dc2('0x21')](0x4));
    return _0x43a6d0;
  }
};
function _0x3b7a21() {
  Interceptor[_0x4dc2('0x22')](Module[_0x4dc2('0x4')](_0x4dc2('0x1'), _0x4dc2('0x23')), {
    'onEnter': function (_0x41737c) {
      if (0x247b === _0x5d3b02(Memory[_0x4dc2('0x24')](_0x41737c[0x1][_0x4dc2('0x19')](0x2)))) {
        _0xcc5f87.fd = _0x41737c[0x0].toInt32();
        if (_0xcc5f87[_0x4dc2('0x25')][_0x4dc2('0x26')]) {
          var _0x3b5207 = Memory[_0x4dc2('0x27')](_0xcc5f87[_0x4dc2('0x25')][_0x4dc2('0x26')]);
          Memory.writeInt(_0x41737c[0x1][_0x4dc2('0x19')](0x4), _0x31ec58(_0x3b5207));
        }
        _0x24a58d();
      }
    }
  });
}
function _0x24a58d() {
  _0xcc5f87[_0x4dc2('0x28')] = [];
  for (var _0x163531 = 0x0; _0x163531 < _0x521dc5.length; _0x163531 += 0x1) {
    _0xcc5f87[_0x4dc2('0x28')][_0x4dc2('0x29')](_0xcc5f87[_0x4dc2('0x2a')].add(_0x521dc5[_0x163531]));
  }
  function _0x5b1982() {
    for (var _0x163531 = _0x26ad1b.F(_0xcc5f87[_0x4dc2('0x2b')]); _0x163531;) {
      if (0x2774 === new NativeFunction(Memory.readPointer(Memory[_0x4dc2('0x1c')](_0x163531)[_0x4dc2('0x19')](0x14)), _0x4dc2('0x3'), [_0x4dc2('0x6')])(_0x163531)) {
        _0x163531 = Memory.readPointer(_0xcc5f87.loginMessagePtr);
        Memory[_0x4dc2('0x1d')](_0xcc5f87.loginMessagePtr, ptr(0x0));
      }
      _0x24dfa2.c(_0x163531);
      var _0x2a5bc8 = _0x163531[_0x4dc2('0x19')](0x8);
      var _0x3c5d65 = Memory[_0x4dc2('0x1a')](_0x2a5bc8[_0x4dc2('0x19')](0x10));
      var _0x5b1982 = _0xcc5f87[_0x4dc2('0x2c')](_0x3c5d65 + 0x7);
      _0x311454(_0x5b1982[_0x4dc2('0x19')](0x7), Memory.readPointer(_0x2a5bc8.add(0x1c)), _0x3c5d65);
      _0x380db6.h(_0x5b1982, _0x3c5d65);
      _0x380db6.f(_0x5b1982, new NativeFunction(Memory.readPointer(Memory[_0x4dc2('0x1c')](_0x163531)[_0x4dc2('0x19')](0x14)), _0x4dc2('0x3'), [_0x4dc2('0x6')])(_0x163531));
      _0x380db6.g(_0x5b1982, Memory[_0x4dc2('0x1a')](_0x163531[_0x4dc2('0x19')](0x4)));
      _0x19b62f(_0xcc5f87.fd, _0x5b1982, _0x3c5d65 + 0x7, 0x0);
      _0x34dfcd(_0x5b1982);
      _0x24dfa2.i(_0x163531);
      _0x163531 = _0x26ad1b.F(_0xcc5f87.sendQueue);
    }
  }
  _0xcc5f87.pthreadReturn = _0xcc5f87[_0x4dc2('0x2a')].add(0x700ec3);
  _0xcc5f87[_0x4dc2('0x2d')] = Memory[_0x4dc2('0x1c')](_0xcc5f87[_0x4dc2('0x2a')][_0x4dc2('0x19')](0xb177a8));
  _0xcc5f87[_0x4dc2('0x2e')] = _0xcc5f87.base[_0x4dc2('0x19')](0x58364c);
  _0xcc5f87.messaging = Memory[_0x4dc2('0x1c')](_0xcc5f87[_0x4dc2('0x2d')].add(0x4));
  _0xcc5f87[_0x4dc2('0x2f')] = Memory[_0x4dc2('0x1c')](_0xcc5f87[_0x4dc2('0x30')][_0x4dc2('0x19')](0x34));
  _0xcc5f87[_0x4dc2('0x31')] = _0xcc5f87[_0x4dc2('0x30')][_0x4dc2('0x19')](0x3c);
  _0xcc5f87.sendQueue = _0xcc5f87[_0x4dc2('0x30')][_0x4dc2('0x19')](0x54);
  _0xcc5f87[_0x4dc2('0x32')] = _0xcc5f87[_0x4dc2('0x30')][_0x4dc2('0x19')](0xd4);
  _0xcc5f87[_0x4dc2('0x33')] = _0xcc5f87[_0x4dc2('0x30')].add(0xd8);
  _0xcc5f87[_0x4dc2('0x2c')] = new NativeFunction(_0xcc5f87[_0x4dc2('0x2a')][_0x4dc2('0x19')](0x72106d), _0x4dc2('0x6'), ['int']);
  _0xcc5f87[_0x4dc2('0x34')] = new NativeFunction(_0xcc5f87[_0x4dc2('0x2a')].add(0x5c0bf0), _0x4dc2('0x6'), [_0x4dc2('0x6'), _0x4dc2('0x3')]);
  Interceptor.replace(Module[_0x4dc2('0x4')](_0x4dc2('0x1'), _0x4dc2('0x7')), new NativeCallback(function (_0x163531) {
    if (!this.returnAddress[_0x4dc2('0x35')](_0xcc5f87.pthreadReturn)) {
      return _0x593dc(_0x163531);
    }
    var _0x487261 = Memory[_0x4dc2('0x1c')](this[_0x4dc2('0x36')].sp[_0x4dc2('0x19')](0x4));
    for (var _0x336654 = 0x0; _0x336654 < _0xcc5f87[_0x4dc2('0x28')][_0x4dc2('0x37')]; _0x336654 += 0x1) {
      if (_0x487261.equals(_0xcc5f87[_0x4dc2('0x28')][_0x336654])) {
        _0x5b1982();
        return 0x0;
      }
    }
    return _0x593dc(_0x163531);
  }, _0x4dc2('0x3'), [_0x4dc2('0x6')]));
  Interceptor.replace(Module[_0x4dc2('0x4')](_0x4dc2('0x1'), _0x4dc2('0x38')), new NativeCallback(function (_0x163531, _0x169b45, _0x41cff4, _0x5b1982, _0x4dba1d) {
    var _0x112c8d = _0x22f39c(_0x163531, _0x169b45, _0x41cff4, _0x5b1982, _0x4dba1d);
    if (this[_0x4dc2('0x39')][_0x4dc2('0x35')](_0xcc5f87[_0x4dc2('0x2e')])) {
      (function () {
        var _0x163531 = _0xcc5f87[_0x4dc2('0x2c')](0x7);
        _0x1ec758(_0xcc5f87.fd, _0x163531, 0x7, 0x100);
        var _0x169b45 = Memory[_0x4dc2('0x1e')](_0x163531) << 0x8 | Memory[_0x4dc2('0x1e')](_0x163531[_0x4dc2('0x19')](0x1));
        if (0x4e88 === _0x169b45) {
          Memory.writeInt(_0xcc5f87[_0x4dc2('0x32')], 0x5);
        }
        var _0x41cff4 = Memory[_0x4dc2('0x1e')](_0x163531[_0x4dc2('0x19')](0x2)) << 0x10 | Memory[_0x4dc2('0x1e')](_0x163531.add(0x3)) << 0x8 | Memory.readU8(_0x163531[_0x4dc2('0x19')](0x4));
        var _0x5b1982 = Memory[_0x4dc2('0x1e')](_0x163531.add(0x5)) << 0x8 | Memory.readU8(_0x163531[_0x4dc2('0x19')](0x6));
        _0x34dfcd(_0x163531);
        var _0x4dba1d = _0xcc5f87[_0x4dc2('0x2c')](_0x41cff4);
        _0x1ec758(_0xcc5f87.fd, _0x4dba1d, _0x41cff4, 0x100);
        var _0x112c8d = _0xcc5f87[_0x4dc2('0x34')](_0xcc5f87.messageFactory, _0x169b45);
        _0x24dfa2.t(_0x112c8d, _0x5b1982);
        var _0xd2fb7c = _0x112c8d[_0x4dc2('0x19')](0x8);
        _0x2429a3._(_0xd2fb7c, _0x41cff4);
        if (_0x41cff4) {
          var _0x565c40 = _0xcc5f87[_0x4dc2('0x2c')](_0x41cff4);
          _0x311454(_0x565c40, _0x4dba1d, _0x41cff4);
          _0x2429a3.s(_0xd2fb7c, _0x565c40);
        }
        _0x24dfa2.r(_0x112c8d);
        _0x26ad1b.B(_0xcc5f87[_0x4dc2('0x31')], _0x112c8d);
        _0x34dfcd(_0x4dba1d);
      })();
    }
    return _0x112c8d;
  }, _0x4dc2('0x3'), ['int', _0x4dc2('0x6'), _0x4dc2('0x6'), _0x4dc2('0x6'), _0x4dc2('0x6')]));
}
rpc.exports = {
  'init': function (_0x5d0707, _0x2807f1) {
    _0xcc5f87[_0x4dc2('0x25')] = _0x2807f1 || {};
    _0x1168fe(_0x4dc2('0x3a'), function () {
      Interceptor[_0x4dc2('0x3b')]();
      _0xcc5f87[_0x4dc2('0x2a')] = Process[_0x4dc2('0x3c')](_0x4dc2('0x3a')).base;
      _0x3b7a21();
    });
  }
};