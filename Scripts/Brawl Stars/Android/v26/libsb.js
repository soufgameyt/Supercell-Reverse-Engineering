var cache = {
    modules: {},
    options: {},
  }
  console.log('hi')
  const SERVER_CONNECTION = 12146092,
    PTHREAD_COND_WAKE_RETURN = 7720719,
    WAKEUP_RETURN_ARRAY = [393812, 433240, 730124, 835980, 3114140, 6419212],
    SELECT_RETURN = 1377332,
    NEW_OPERATOR = 7852221,
    CREATE_MESSAGE_BY_TYPE = 4829160,
    POINTER_SIZE = 4
  var malloc = new NativeFunction(
      Module.findExportByName('libc.so', 'malloc'),
      'pointer',
      ['int']
    ),
    free = new NativeFunction(
      Module.findExportByName('libc.so', 'free'),
      'void',
      ['pointer']
    ),
    pthread_mutex_lock = new NativeFunction(
      Module.findExportByName('libc.so', 'pthread_mutex_lock'),
      'int',
      ['pointer']
    ),
    pthread_mutex_unlock = new NativeFunction(
      Module.findExportByName('libc.so', 'pthread_mutex_unlock'),
      'int',
      ['pointer']
    ),
    pthread_cond_signal = new NativeFunction(
      Module.findExportByName('libc.so', 'pthread_cond_signal'),
      'int',
      ['pointer']
    ),
    select = new NativeFunction(
      Module.findExportByName('libc.so', 'select'),
      'int',
      ['int', 'pointer', 'pointer', 'pointer', 'pointer']
    ),
    memmove = new NativeFunction(
      Module.findExportByName('libc.so', 'memmove'),
      'pointer',
      ['pointer', 'pointer', 'int']
    ),
    ntohs = new NativeFunction(
      Module.findExportByName('libc.so', 'ntohs'),
      'uint16',
      ['uint16']
    ),
    htons = new NativeFunction(
      Module.findExportByName('libc.so', 'htons'),
      'uint16',
      ['uint16']
    ),
    inet_addr = new NativeFunction(
      Module.findExportByName('libc.so', 'inet_addr'),
      'int',
      ['pointer']
    ),
    libc_send = new NativeFunction(
      Module.findExportByName('libc.so', 'send'),
      'int',
      ['int', 'pointer', 'int', 'int']
    ),
    libc_recv = new NativeFunction(
      Module.findExportByName('libc.so', 'recv'),
      'int',
      ['int', 'pointer', 'int', 'int']
    ),
    Message = {
      _getByteStream: function (_0x23b2d6) {
        return _0x23b2d6.add(8)
      },
      _getVersion: function (_0x2bc361) {
        return Memory.readInt(_0x2bc361.add(4))
      },
      _setVersion: function (_0x28561d, _0x4d18c4) {
        Memory.writeInt(_0x28561d.add(4), _0x4d18c4)
      },
      _getMessageType: function (_0xe5548b) {
        return new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0xe5548b).add(20)),
          'int',
          ['pointer']
        )(_0xe5548b)
      },
      _encode: function (_0x57dad6) {
        new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0x57dad6).add(8)),
          'void',
          ['pointer']
        )(_0x57dad6)
      },
      _decode: function (_0x1f127e) {
        new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0x1f127e).add(12)),
          'void',
          ['pointer']
        )(_0x1f127e)
      },
      _free: function (_0xdcc97b) {
        new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0xdcc97b).add(24)),
          'void',
          ['pointer']
        )(_0xdcc97b)
        new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0xdcc97b).add(4)),
          'void',
          ['pointer']
        )(_0xdcc97b)
      },
    },
    ByteStream = {
      _getOffset: function (_0x5b0485) {
        return Memory.readInt(_0x5b0485.add(16))
      },
      _getByteArray: function (_0x486224) {
        return Memory.readPointer(_0x486224.add(28))
      },
      _setByteArray: function (_0x1fec7c, _0x2622fd) {
        Memory.writePointer(_0x1fec7c.add(28), _0x2622fd)
      },
      _getLength: function (_0x1d0bc1) {
        return Memory.readInt(_0x1d0bc1.add(20))
      },
      _setLength: function (_0x1cbc86, _0x111d25) {
        Memory.writeInt(_0x1cbc86.add(20), _0x111d25)
      },
    },
    Buffer = {
      _getEncodingLength: function (_0x4ae7b8) {
        return (
          (Memory.readU8(_0x4ae7b8.add(2)) << 16) |
          (Memory.readU8(_0x4ae7b8.add(3)) << 8) |
          Memory.readU8(_0x4ae7b8.add(4))
        )
      },
      _setEncodingLength: function (_0x2d8dd8, _0x20ad17) {
        Memory.writeU8(_0x2d8dd8.add(2), (_0x20ad17 >> 16) & 255)
        Memory.writeU8(_0x2d8dd8.add(3), (_0x20ad17 >> 8) & 255)
        Memory.writeU8(_0x2d8dd8.add(4), _0x20ad17 & 255)
      },
      _setMessageType: function (_0x12fb38, _0x510b15) {
        Memory.writeU8(_0x12fb38.add(0), (_0x510b15 >> 8) & 255)
        Memory.writeU8(_0x12fb38.add(1), _0x510b15 & 255)
      },
      _getMessageVersion: function (_0x5c87bc) {
        return (
          (Memory.readU8(_0x5c87bc.add(5)) << 8) | Memory.readU8(_0x5c87bc.add(6))
        )
      },
      _setMessageVersion: function (_0x2c243a, _0x2a21be) {
        Memory.writeU8(_0x2c243a.add(5), (_0x2a21be >> 8) & 255)
        Memory.writeU8(_0x2c243a.add(6), _0x2a21be & 255)
      },
      _getMessageType: function (_0x20d1f8) {
        return (Memory.readU8(_0x20d1f8) << 8) | Memory.readU8(_0x20d1f8.add(1))
      },
    },
    MessageQueue = {
      _getCapacity: function (_0x597ce5) {
        return Memory.readInt(_0x597ce5.add(4))
      },
      _get: function (_0x4e0a56, _0x4bed80) {
        return Memory.readPointer(
          Memory.readPointer(_0x4e0a56).add(POINTER_SIZE * _0x4bed80)
        )
      },
      _set: function (_0x45dff5, _0x590fea, _0x598a94) {
        Memory.writePointer(
          Memory.readPointer(_0x45dff5).add(POINTER_SIZE * _0x590fea),
          _0x598a94
        )
      },
      _count: function (_0x4e2dad) {
        return Memory.readInt(_0x4e2dad.add(8))
      },
      _decrementCount: function (_0xfb8b7c) {
        Memory.writeInt(_0xfb8b7c.add(8), Memory.readInt(_0xfb8b7c.add(8)) - 1)
      },
      _incrementCount: function (_0x3d08b3) {
        Memory.writeInt(_0x3d08b3.add(8), Memory.readInt(_0x3d08b3.add(8)) + 1)
      },
      _getDequeueIndex: function (_0x4396fa) {
        return Memory.readInt(_0x4396fa.add(12))
      },
      _getEnqueueIndex: function (_0x1fd34c) {
        return Memory.readInt(_0x1fd34c.add(16))
      },
      _setDequeueIndex: function (_0x1306b4, _0xf83171) {
        Memory.writeInt(_0x1306b4.add(12), _0xf83171)
      },
      _setEnqueueIndex: function (_0x37a66c, _0x850124) {
        Memory.writeInt(_0x37a66c.add(16), _0x850124)
      },
      _enqueue: function (_0x340cd2, _0x1a181b) {
        pthread_mutex_lock(_0x340cd2.sub(4))
        var _0x5d067d = MessageQueue['_getEnqueueIndex'](_0x340cd2)
        MessageQueue['_set'](_0x340cd2, _0x5d067d, _0x1a181b)
        MessageQueue['_setEnqueueIndex'](
          _0x340cd2,
          (_0x5d067d + 1) % MessageQueue['_getCapacity'](_0x340cd2)
        )
        MessageQueue['_incrementCount'](_0x340cd2)
        pthread_mutex_unlock(_0x340cd2.sub(4))
      },
      _dequeue: function (_0x1fe273) {
        var _0x32ef1b = null
        pthread_mutex_lock(_0x1fe273.sub(4))
        if (MessageQueue['_count'](_0x1fe273)) {
          var _0xa933d1 = MessageQueue['_getDequeueIndex'](_0x1fe273)
          _0x32ef1b = MessageQueue['_get'](_0x1fe273, _0xa933d1)
          MessageQueue['_setDequeueIndex'](
            _0x1fe273,
            (_0xa933d1 + 1) % MessageQueue['_getCapacity'](_0x1fe273)
          )
          MessageQueue['_decrementCount'](_0x1fe273)
        }
        return pthread_mutex_unlock(_0x1fe273.sub(4)), _0x32ef1b
      },
    }
  function hackCrypto() {
    const _0x332a8b = Process.findModuleByName('libg.so').base
    cache.pthreadReturn = _0x332a8b.add(PTHREAD_COND_WAKE_RETURN)
    cache.serverConnection = Memory.readPointer(_0x332a8b.add(SERVER_CONNECTION))
    cache.messaging = Memory.readPointer(cache.serverConnection.add(4))
    cache.messageFactory = Memory.readPointer(cache.messaging.add(52))
    cache.recvQueue = cache.messaging.add(60)
    cache.sendQueue = cache.messaging.add(84)
    cache.state = cache.messaging.add(208)
    cache.loginMessagePtr = cache.messaging.add(212)
    cache.newOperator = new NativeFunction(
      cache.base.add(NEW_OPERATOR),
      'pointer',
      ['int']
    )
    cache.createMessageByType = new NativeFunction(
      _0x332a8b.add(CREATE_MESSAGE_BY_TYPE),
      'pointer',
      ['pointer', 'int']
    )
    cache.sendMessage = function (_0x376701) {
      Message['_encode'](_0x376701)
      var _0x46c7f2 = Message['_getByteStream'](_0x376701),
        _0x372016 = ByteStream['_getOffset'](_0x46c7f2),
        _0x41fb18 = malloc(_0x372016 + 7)
      memmove(_0x41fb18.add(7), ByteStream['_getByteArray'](_0x46c7f2), _0x372016)
      Buffer['_setEncodingLength'](_0x41fb18, _0x372016)
      Buffer['_setMessageType'](_0x41fb18, Message['_getMessageType'](_0x376701))
      Buffer['_setMessageVersion'](_0x41fb18, Message['_getVersion'](_0x376701))
      libc_send(cache.fd, _0x41fb18, _0x372016 + 7, 0)
      free(_0x41fb18)
    }
    function _0x4f5522() {
      var _0x2b0555 = MessageQueue['_dequeue'](cache.sendQueue)
      while (_0x2b0555) {
        var _0x5d2335 = Message['_getMessageType'](_0x2b0555)
        _0x5d2335 === 10100 &&
          ((_0x2b0555 = Memory.readPointer(cache.loginMessagePtr)),
          Memory.writePointer(cache.loginMessagePtr, ptr(0)))
        cache.sendMessage(_0x2b0555)
        _0x2b0555 = MessageQueue['_dequeue'](cache.sendQueue)
      }
    }
    function _0x1d7011() {
      var _0x1bd32e = malloc(7)
      libc_recv(cache.fd, _0x1bd32e, 7, 256)
      var _0x39e080 = Buffer['_getMessageType'](_0x1bd32e)
      if (_0x39e080 >= 20000) {
        _0x39e080 === 20104 && Memory.writeInt(cache.state, 5)
        var _0x4e1b3f = Buffer['_getEncodingLength'](_0x1bd32e),
          _0x4d27b9 = Buffer['_getMessageVersion'](_0x1bd32e)
        free(_0x1bd32e)
        var _0x596d5f = malloc(_0x4e1b3f)
        libc_recv(cache.fd, _0x596d5f, _0x4e1b3f, 256)
        var _0x33c6a0 = cache.createMessageByType(cache.messageFactory, _0x39e080)
        Message['_setVersion'](_0x33c6a0, _0x4d27b9)
        var _0x3750b9 = Message['_getByteStream'](_0x33c6a0)
        ByteStream['_setLength'](_0x3750b9, _0x4e1b3f)
        if (_0x4e1b3f) {
          var _0x407344 = malloc(_0x4e1b3f)
          memmove(_0x407344, _0x596d5f, _0x4e1b3f)
          ByteStream['_setByteArray'](_0x3750b9, _0x407344)
        }
        Message['_decode'](_0x33c6a0)
        MessageQueue['_enqueue'](cache.recvQueue, _0x33c6a0)
        free(_0x596d5f)
      }
    }
    InterceptorManager.attach(
      Module.findExportByName('libc.so', 'pthread_cond_signal'),
      function (_0x5d7d88) {
        _0x4f5522()
      }
    )
    InterceptorManager.attach(
      Module.findExportByName('libc.so', 'select'),
      function (_0x2b422c) {
        _0x1d7011()
      }
    )
  }
  const GameManager = {
      onGameInit: function (_0x457693) {
        hackCrypto()
      },
    },
    InterceptorManager = {
      attach: function (_0x5a633b, _0x1cdb18) {
        try {
          Interceptor.attach(_0x5a633b, {
            onEnter: function (_0x18eb2a) {
              _0x1cdb18(_0x18eb2a)
            },
          })
        } catch (_0x448fb7) {
          console.error(
            'attach failed for function ',
            _0x5a633b,
            ' Error: ',
            _0x448fb7
          )
        }
      },
      revert: function (_0x164f57) {
        Interceptor.revert(_0x164f57)
      },
    }
  function createByteArrayFromHexString(_0x766ba1) {
    var _0x213828 = malloc(_0x766ba1.length / 2 + 1)
    return Memory.writeByteArray(_0x213828, hexStringToByte(_0x766ba1)), _0x213828
  }
  function hexStringToByte(_0x4ca22b) {
    if (!_0x4ca22b) {
      return new Uint8Array()
    }
    var _0x49884f = []
    for (
      var _0x2803ff = 0, _0x383bad = _0x4ca22b.length;
      _0x2803ff < _0x383bad;
      _0x2803ff += 2
    ) {
      _0x49884f.push(parseInt(_0x4ca22b.substr(_0x2803ff, 2), 16))
    }
    return new Uint8Array(_0x49884f)
  }
  const HostPatcher = {
    check: function (_0x3d9d0f, _0x388e15) {
      return _0x3d9d0f != _0x388e15
    },
    init: function () {
      var _0x28075e = new NativeFunction(
          Module.getExportByName('libc.so', 'connect'),
          'int',
          ['int', 'pointer', 'int']
        ),
        _0x54e28d = new NativeFunction(
          Module.getExportByName('libc.so', 'freeaddrinfo'),
          'void',
          ['pointer']
        ),
        _0x43dd1c = undefined,
        _0x203be7 = undefined
      Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
        onEnter: function (_0x5697d6) {
          this.path = _0x5697d6[0].readUtf8String()
          if (this.path === 'game.brawlstarsgame.com') {
            Memory.writeUtf8String(_0x5697d6[0], '137.2.181.247')
            var _0x13c9d2 = Process.findModuleByName('libg.so')
            Memory.protect(_0x13c9d2.base, _0x13c9d2.size, 'rwx')
            var _0x502dba
            _0x502dba = Memory.scanSync(
              _0x13c9d2.base,
              _0x13c9d2.size,
              'FF 24 01 E2 7F 04 52 E3'
            )
            for (var _0x1b00e8 = 0; _0x1b00e8 < _0x502dba.length; _0x1b00e8++) {
              var _0x42b346 = Interceptor.attach(
                _0x502dba[_0x1b00e8].address,
                function () {
                  _0x42b346.detach()
                  console.log('hit sock check')
                  this.context.r1 = 34
                }
              )
            }
          }
        },
      })
      Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
        onEnter: function (_0x85ecfd) {
          if (ntohs(Memory.readU16(_0x85ecfd[1].add(2))) === 9339) {
            cache.fd = _0x85ecfd[0].toInt32()
            GameManager.onGameInit()
          }
        },
      })
    },
  }
  function patchaddrinfo(_0x15f451, _0x4b6ab6, _0x40ef7d, _0x52da3c) {
    return new NativeFunction(
      Module.getExportByName('libc.so', 'getaddrinfo'),
      'int',
      ['pointer', 'pointer', 'pointer', 'pointer']
    )(
      Memory.allocUtf8String(_0x15f451),
      Memory.allocUtf8String(_0x4b6ab6),
      _0x40ef7d,
      _0x52da3c
    )
  }
  function setup() {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
      onEnter: function (_0x38528f) {
        ntohs(Memory.readU16(_0x38528f[1].add(2))) === 9339 &&
          ((cache.fd = _0x38528f[0].toInt32()),
          Memory.writeInt(
            _0x38528f[1].add(4),
            inet_addr(Memory.allocUtf8String('45.140.188.54'))
          ),
          Memory.writeU16(_0x38528f[1].add(2), htons(6075)),
          GameManager.onGameInit())
      },
    })
  }
  rpc.exports = {
    init: function (_0x277ce6, _0x102ef3) {
      cache.options = _0x102ef3 || {}
      Interceptor.detachAll()
      cache.base = Process.findModuleByName('libg.so').base
      setup()
    },
  }