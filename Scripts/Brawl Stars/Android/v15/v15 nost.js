var _0x3306 = [
  'size',
  'protection',
  'findExportByName',
  'libc.so',
  'getaddrinfo',
  'perform',
  'java.lang.System',
  'use',
  'java.lang.Runtime',
  'overload',
  'dalvik.system.VMStack',
  'implementation',
  'loadLibrary0',
  'getCallingClassLoader',
  '.so',
  'libg.so',
  'readPointer',
  'add',
  'int',
  'pointer',
  'pthread_mutex_unlock',
  'sendto',
  'writeU8',
  'readU8',
  'void',
  'readInt',
  'sub',
  'writeInt',
  'replace',
  'writePointer',
  'redirectHost',
  'options',
  'pthread_cond_signal',
  'context',
  'equals',
  'detach',
  'exports',
  'modules',
  'findModuleByName',
  'enumerateRangesSync',
  'base',
  'length',
  'ranges',
  'push',
]
;(function (_0x417e8b, _0x379a56) {
  var _0x180d18 = function (_0x5c957e) {
    while (--_0x5c957e) {
      _0x417e8b.push(_0x417e8b.shift())
    }
  }
  _0x180d18(++_0x379a56)
})(_0x3306, 301)
var _0x5369 = function (_0x466f22, _0x4575aa) {
    _0x466f22 = _0x466f22 - 0
    var _0x45c134 = _0x3306[_0x466f22]
    return _0x45c134
  },
  cache = {
    modules: {},
    options: {},
  }
const MESSAGE_MANAGER = 11298848,
  SENDTO = 5810080,
  RECVFROM = 5810048,
  NEW_OPERATOR = 6157960,
  WAKEUP = 5810516,
  CREATE_MESSAGE_BY_TYPE = 4701096
function moduleInfo(_0x33241b, _0x19f7c5) {
  if (cache[_0x5369('0x0')][_0x33241b] && !_0x19f7c5) {
    return cache[_0x5369('0x0')][_0x33241b]
  }
  const _0x3cdd33 = Process[_0x5369('0x1')](_0x33241b),
    _0x48781e = Module[_0x5369('0x2')](_0x33241b, '---'),
    _0x53d1bc = {
      name: _0x33241b,
      base: _0x3cdd33[_0x5369('0x3')],
      ranges: [],
    }
  for (
    var _0x355ad2 = 0;
    _0x355ad2 < _0x48781e[_0x5369('0x4')];
    _0x355ad2 += 1
  ) {
    _0x53d1bc[_0x5369('0x5')][_0x5369('0x6')]({
      base: _0x48781e[_0x355ad2][_0x5369('0x3')],
      size: _0x48781e[_0x355ad2][_0x5369('0x7')],
      protection: _0x48781e[_0x355ad2][_0x5369('0x8')],
    })
  }
  return (cache[_0x5369('0x0')][_0x33241b] = _0x53d1bc), _0x53d1bc
}
function lptr(_0x4eaf13, _0x29dc09) {
  const _0xb193d5 = moduleInfo(_0x4eaf13)
  return _0xb193d5.base.add(_0x29dc09)
}
function redirectHost(_0x43365c) {
  const _0x4d0e20 = new NativeFunction(
      Module.findExportByName('libc.so', 'ntohs'),
      'uint16',
      ['uint16']
    ),
    _0x21aad8 = new NativeFunction(
      Module.findExportByName('libc.so', 'inet_addr'),
      'int',
      ['pointer']
    )
  Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
    onEnter: function (_0x1efefd) {
      if (_0x4d0e20(Memory.readU16(_0x1efefd[1].add(2))) === 9339) {
        var _0x42715c = Memory.allocUtf8String(_0x43365c)
        Memory.writeInt(_0x1efefd[1].add(4), _0x21aad8(_0x42715c))
      }
    },
  })
}
function onLoad(_0x109945, _0xf8bf96) {
  Java[_0x5369('0xc')](function () {
    const _0x4dd991 = Java.use(_0x5369('0xd')),
      _0x21a157 = Java[_0x5369('0xe')](_0x5369('0xf')),
      _0xceb5ec = _0x4dd991.loadLibrary[_0x5369('0x10')]('java.lang.String'),
      _0x3572ed = Java[_0x5369('0xe')](_0x5369('0x11'))
    _0xceb5ec[_0x5369('0x12')] = function (_0x44d38e) {
      try {
        const _0x56d060 = _0x21a157
          .getRuntime()
          [_0x5369('0x13')](_0x3572ed[_0x5369('0x14')](), _0x44d38e)
        return (
          _0x109945 === 'lib' + _0x44d38e + _0x5369('0x15') && _0xf8bf96(),
          _0x56d060
        )
      } catch (_0x567ccd) {}
    }
  })
}
function setupMessaging() {
  const _0x1d3817 = Process[_0x5369('0x1')](_0x5369('0x16')).base
  var _0x1674a0 = Memory[_0x5369('0x17')](_0x1d3817.add(MESSAGE_MANAGER)),
    _0x5c2db2 = Memory.readPointer(_0x1674a0[_0x5369('0x18')](40)),
    _0x2346a8 = Memory[_0x5369('0x17')](_0x5c2db2[_0x5369('0x18')](312))
  const _0x5a9973 = new NativeFunction(
      Module.findExportByName('libc.so', 'pthread_mutex_lock'),
      _0x5369('0x19'),
      [_0x5369('0x1a')]
    ),
    _0x4d81b9 = new NativeFunction(
      Module[_0x5369('0x9')](_0x5369('0xa'), _0x5369('0x1b')),
      _0x5369('0x19'),
      [_0x5369('0x1a')]
    ),
    _0x3edec9 = new NativeFunction(
      Module.findExportByName(_0x5369('0xa'), _0x5369('0x1c')),
      'int',
      [
        _0x5369('0x19'),
        _0x5369('0x1a'),
        _0x5369('0x19'),
        'int',
        _0x5369('0x1a'),
        'int',
      ]
    ),
    _0xef3e34 = new NativeFunction(
      Module[_0x5369('0x9')](_0x5369('0xa'), 'memmove'),
      _0x5369('0x1a'),
      [_0x5369('0x1a'), _0x5369('0x1a'), 'int']
    ),
    _0x2a49da = new NativeFunction(_0x1d3817.add(NEW_OPERATOR), 'pointer', [
      _0x5369('0x19'),
    ]),
    _0x5debe1 = function (_0x396671, _0x2a2f23) {
      Memory.writeU8(_0x396671[_0x5369('0x18')](2), (_0x2a2f23 >> 16) & 255)
      Memory.writeU8(_0x396671[_0x5369('0x18')](3), (_0x2a2f23 >> 8) & 255)
      Memory.writeU8(_0x396671[_0x5369('0x18')](4), _0x2a2f23 & 255)
    },
    _0x347a09 = function (_0x2b259e, _0x40c763) {
      Memory[_0x5369('0x1d')](
        _0x2b259e[_0x5369('0x18')](0),
        (_0x40c763 >> 8) & 255
      )
      Memory[_0x5369('0x1d')](_0x2b259e.add(1), _0x40c763 & 255)
    },
    _0x1c18e3 = function (_0x22389b, _0x245a0c) {
      Memory.writeU8(_0x22389b[_0x5369('0x18')](5), (_0x245a0c >> 8) & 255)
      Memory.writeU8(_0x22389b[_0x5369('0x18')](6), _0x245a0c & 255)
    },
    _0x4abe72 = function (_0x585579) {
      return (
        (Memory[_0x5369('0x1e')](_0x585579) << 8) |
        Memory[_0x5369('0x1e')](_0x585579.add(1))
      )
    },
    _0x3655c7 = function (_0x1a08cd) {
      new NativeFunction(
        Memory.readPointer(
          Memory[_0x5369('0x17')](_0x1a08cd)[_0x5369('0x18')](16)
        ),
        _0x5369('0x1f'),
        ['pointer']
      )(_0x1a08cd)
    },
    _0xb352e = function (_0x2402bd) {
      new NativeFunction(
        Memory[_0x5369('0x17')](Memory[_0x5369('0x17')](_0x2402bd).add(24)),
        'void',
        [_0x5369('0x1a')]
      )(_0x2402bd)
    },
    _0x1bef6f = function (_0x1361f6) {
      return Memory[_0x5369('0x20')](
        _0x1361f6[_0x5369('0x18')](16)[_0x5369('0x18')](20)
      )
    },
    _0x134614 = function (_0x38c4d1) {
      return Memory[_0x5369('0x17')](
        _0x38c4d1[_0x5369('0x18')](16)[_0x5369('0x18')](32)
      )
    },
    _0x2dea34 = function (_0x716eb5, _0x364343) {
      _0x5a9973(_0x716eb5[_0x5369('0x21')](40))
      const _0x37ec61 = Memory[_0x5369('0x20')](_0x716eb5[_0x5369('0x18')](20)),
        _0xa790e1 = Memory[_0x5369('0x20')](_0x716eb5[_0x5369('0x18')](8))
      Memory.writePointer(
        Memory[_0x5369('0x17')](_0x716eb5)[_0x5369('0x18')](8 * _0x37ec61),
        _0x364343
      )
      Memory.writeInt(
        _0x716eb5[_0x5369('0x18')](20),
        (_0x37ec61 + 1) % _0xa790e1
      )
      Memory[_0x5369('0x22')](
        _0x716eb5[_0x5369('0x18')](12),
        Memory[_0x5369('0x20')](_0x716eb5[_0x5369('0x18')](12)) + 1
      )
      _0x4d81b9(_0x716eb5[_0x5369('0x21')](40))
    }
  Interceptor[_0x5369('0x23')](
    _0x1d3817[_0x5369('0x18')](SENDTO),
    new NativeCallback(
      function (
        _0x1de487,
        _0x311227,
        _0x4b144b,
        _0x158c00,
        _0x3e638c,
        _0x3987e9
      ) {
        const _0xee28c5 = _0x4abe72(_0x311227)
        var _0x1cd7ec
        if (_0xee28c5 === 10100) {
          var _0x478dc5, _0x474097
          _0x1cd7ec = Memory[_0x5369('0x17')](_0x5c2db2[_0x5369('0x18')](600))
          _0x3655c7(_0x1cd7ec)
          _0x474097 = _0x1bef6f(_0x1cd7ec)
          _0x478dc5 = _0x2a49da(_0x474097 + 7)
          _0xef3e34(
            _0x478dc5[_0x5369('0x18')](7),
            _0x134614(_0x1cd7ec),
            _0x474097
          )
          _0x5debe1(_0x478dc5, _0x474097)
          _0x347a09(_0x478dc5, 10101)
          _0x1c18e3(_0x478dc5, 10)
          _0x3edec9(
            _0x1de487,
            _0x478dc5,
            _0x474097 + 7,
            _0x158c00,
            _0x3e638c,
            _0x3987e9
          )
          Memory[_0x5369('0x24')](_0x5c2db2[_0x5369('0x18')](600), ptr(0))
        } else {
          _0x5a9973(_0x5c2db2.add(312).sub(40))
          const _0x27fbdb = Memory[_0x5369('0x20')](
            _0x5c2db2[_0x5369('0x18')](320)
          )
          var _0x94a9c5 =
            (Memory.readInt(_0x5c2db2[_0x5369('0x18')](328)) - 1) % _0x27fbdb
          _0x94a9c5 < 0 && (_0x94a9c5 += _0x27fbdb)
          _0x1cd7ec = Memory[_0x5369('0x17')](
            _0x2346a8[_0x5369('0x18')](8 * _0x94a9c5)
          )
          const _0x3852fe = _0x1bef6f(_0x1cd7ec)
          _0x5debe1(_0x311227, _0x3852fe)
          _0xef3e34(_0x311227.add(7), _0x134614(_0x1cd7ec), _0x3852fe)
          _0x3edec9(
            _0x1de487,
            _0x311227,
            _0x3852fe + 7,
            _0x158c00,
            _0x3e638c,
            _0x3987e9
          )
          _0x4d81b9(_0x5c2db2.add(312)[_0x5369('0x21')](40))
        }
        return _0x4b144b
      },
      _0x5369('0x19'),
      [
        _0x5369('0x19'),
        _0x5369('0x1a'),
        _0x5369('0x19'),
        'int',
        _0x5369('0x1a'),
        _0x5369('0x19'),
      ]
    )
  )
  const _0x2f4ac0 = new NativeFunction(
      Module[_0x5369('0x9')](_0x5369('0xa'), 'recvfrom'),
      _0x5369('0x19'),
      [
        _0x5369('0x19'),
        _0x5369('0x1a'),
        'int',
        _0x5369('0x19'),
        _0x5369('0x1a'),
        _0x5369('0x1a'),
      ]
    ),
    _0x1dd66d = new NativeFunction(
      _0x1d3817[_0x5369('0x18')](CREATE_MESSAGE_BY_TYPE),
      'pointer',
      [_0x5369('0x1a'), _0x5369('0x19')]
    )
  var _0x5ba317, _0x37e376, _0x145958
  Interceptor.replace(
    _0x1d3817.add(RECVFROM),
    new NativeCallback(
      function (
        _0x3d0342,
        _0x2c80fc,
        _0x445f4d,
        _0x41264a,
        _0x2c71be,
        _0x2a907f
      ) {
        var _0x58d20d = _0x2f4ac0(
          _0x3d0342,
          _0x2c80fc,
          _0x445f4d,
          _0x41264a,
          _0x2c71be,
          _0x2a907f
        )
        if (_0x5ba317 === 20100) {
          return (_0x5ba317 = null), _0x58d20d
        }
        _0x5ba317 === 20104 &&
          Memory.writeInt(_0x5c2db2[_0x5369('0x18')](596), 5)
        if (!_0x5ba317) {
          _0x5ba317 = _0x4abe72(_0x2c80fc)
          _0x37e376 =
            (Memory[_0x5369('0x1e')](_0x2c80fc.add(5)) << 8) |
            Memory[_0x5369('0x1e')](_0x2c80fc.add(6))
          if (_0x5ba317 === 20100) {
            return _0x58d20d
          }
          const _0x246e49 =
            (Memory[_0x5369('0x1e')](_0x2c80fc.add(2)) << 16) |
            (Memory[_0x5369('0x1e')](_0x2c80fc[_0x5369('0x18')](3)) << 8) |
            Memory[_0x5369('0x1e')](_0x2c80fc.add(4))
          _0x246e49 === 0 &&
            ((_0x145958 = _0x1dd66d(
              Memory[_0x5369('0x17')](_0x5c2db2[_0x5369('0x18')](200)),
              _0x5ba317
            )),
            Memory[_0x5369('0x22')](_0x145958[_0x5369('0x18')](8), _0x37e376),
            Memory.writeInt(
              _0x145958[_0x5369('0x18')](16)[_0x5369('0x18')](24),
              0
            ),
            _0xb352e(_0x145958),
            _0x2dea34(_0x5c2db2[_0x5369('0x18')](248), _0x145958),
            (_0x5ba317 = null))
          _0x347a09(_0x2c80fc, 65535)
        } else {
          _0x145958 = _0x1dd66d(
            Memory[_0x5369('0x17')](_0x5c2db2[_0x5369('0x18')](200)),
            _0x5ba317
          )
          Memory.writeInt(_0x145958[_0x5369('0x18')](8), _0x37e376)
          Memory.writeInt(_0x145958.add(16)[_0x5369('0x18')](24), _0x445f4d)
          const _0xc94a2e = _0x2a49da(_0x445f4d)
          _0xef3e34(_0xc94a2e, _0x2c80fc, _0x445f4d)
          Memory[_0x5369('0x24')](
            _0x145958.add(16)[_0x5369('0x18')](32),
            _0xc94a2e
          )
          _0xb352e(_0x145958)
          _0x2dea34(_0x5c2db2[_0x5369('0x18')](248), _0x145958)
          _0x5ba317 = null
        }
        return _0x58d20d
      },
      _0x5369('0x19'),
      [
        _0x5369('0x19'),
        'pointer',
        'int',
        _0x5369('0x19'),
        _0x5369('0x1a'),
        _0x5369('0x1a'),
      ]
    )
  )
}
function setup() {
  cache.options[_0x5369('0x25')] &&
    redirectHost(cache[_0x5369('0x26')][_0x5369('0x25')])
  var _0x41fae5 = lptr(_0x5369('0x16'), WAKEUP),
    _0x134808 = Interceptor.attach(
      Module.findExportByName(_0x5369('0xa'), _0x5369('0x27')),
      {
        onEnter: function () {
          this[_0x5369('0x28')].lr[_0x5369('0x29')](_0x41fae5) &&
            (_0x134808[_0x5369('0x2a')](), setupMessaging())
        },
      }
    )
}
rpc[_0x5369('0x2b')] = {
  init: function (_0x15a853, _0xec51cf) {
    try {
      cache[_0x5369('0x26')] = _0xec51cf || {}
      onLoad(_0x5369('0x16'), function () {
        setup()
      })
    } catch (_0x455663) {}
  },
}
