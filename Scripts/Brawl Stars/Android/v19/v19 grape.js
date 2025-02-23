var cache = {}
const base = Process.findModuleByName('libg.so').base,
  SERVER_CONNECTION = 10761668,
  CREATE_MESSAGE_BY_TYPE = 3229068,
  POINTER_SIZE = 4,
  LOGICVERSION_ISPROD = 674572,
  LOGICVERSION_ISDEV = 376980,
  HOMEPAGE_STARTGAME = 1482668,
  ADD_VISION_UPDATE = 1982392,
  malloc = new NativeFunction(
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
    _getByteStream: function (_0x500914) {
      return _0x500914.add(8)
    },
    _getVersion: function (_0x29cbc5) {
      return Memory.readInt(_0x29cbc5.add(4))
    },
    _setVersion: function (_0x4e14f0, _0x1c406d) {
      Memory.writeInt(_0x4e14f0.add(4), _0x1c406d)
    },
    _getMessageType: function (_0x51eb1a) {
      return new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x51eb1a).add(20)),
        'int',
        ['pointer']
      )(_0x51eb1a)
    },
    _encode: function (_0x1e4acb) {
      new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x1e4acb).add(8)),
        'void',
        ['pointer']
      )(_0x1e4acb)
    },
    _decode: function (_0x31eadd) {
      new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x31eadd).add(12)),
        'void',
        ['pointer']
      )(_0x31eadd)
    },
    _free: function (_0x51272e) {
      new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x51272e).add(24)),
        'void',
        ['pointer']
      )(_0x51272e)
      new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x51272e).add(4)),
        'void',
        ['pointer']
      )(_0x51272e)
    },
  },
  ByteStream = {
    _getOffset: function (_0x22adde) {
      return Memory.readInt(_0x22adde.add(16))
    },
    _getByteArray: function (_0x2ce42c) {
      return Memory.readPointer(_0x2ce42c.add(28))
    },
    _setByteArray: function (_0x5a3ebe, _0x30d4ec) {
      Memory.writePointer(_0x5a3ebe.add(28), _0x30d4ec)
    },
    _getLength: function (_0x232ccf) {
      return Memory.readInt(_0x232ccf.add(20))
    },
    _setLength: function (_0x28dee8, _0x1d8644) {
      Memory.writeInt(_0x28dee8.add(20), _0x1d8644)
    },
  },
  Buffer = {
    _getEncodingLength: function (_0x46519d) {
      return (
        (Memory.readU8(_0x46519d.add(2)) << 16) |
        (Memory.readU8(_0x46519d.add(3)) << 8) |
        Memory.readU8(_0x46519d.add(4))
      )
    },
    _setEncodingLength: function (_0x4ea09c, _0x41a6bd) {
      Memory.writeU8(_0x4ea09c.add(2), (_0x41a6bd >> 16) & 255)
      Memory.writeU8(_0x4ea09c.add(3), (_0x41a6bd >> 8) & 255)
      Memory.writeU8(_0x4ea09c.add(4), _0x41a6bd & 255)
    },
    _setMessageType: function (_0x519379, _0x21445a) {
      Memory.writeU8(_0x519379.add(0), (_0x21445a >> 8) & 255)
      Memory.writeU8(_0x519379.add(1), _0x21445a & 255)
    },
    _getMessageVersion: function (_0x42a36d) {
      return (
        (Memory.readU8(_0x42a36d.add(5)) << 8) | Memory.readU8(_0x42a36d.add(6))
      )
    },
    _setMessageVersion: function (_0xd53e0f, _0x2ca237) {
      Memory.writeU8(_0xd53e0f.add(5), (_0x2ca237 >> 8) & 255)
      Memory.writeU8(_0xd53e0f.add(6), _0x2ca237 & 255)
    },
    _getMessageType: function (_0x6f4c94) {
      return (Memory.readU8(_0x6f4c94) << 8) | Memory.readU8(_0x6f4c94.add(1))
    },
  },
  MessageQueue = {
    _getCapacity: function (_0x107ed9) {
      return Memory.readInt(_0x107ed9.add(4))
    },
    _get: function (_0x4b3b77, _0x5ae795) {
      return Memory.readPointer(
        Memory.readPointer(_0x4b3b77).add(POINTER_SIZE * _0x5ae795)
      )
    },
    _set: function (_0x349fb7, _0x5364e8, _0x4bfe0d) {
      Memory.writePointer(
        Memory.readPointer(_0x349fb7).add(POINTER_SIZE * _0x5364e8),
        _0x4bfe0d
      )
    },
    _count: function (_0x38c3f9) {
      return Memory.readInt(_0x38c3f9.add(8))
    },
    _decrementCount: function (_0x19bb96) {
      Memory.writeInt(_0x19bb96.add(8), Memory.readInt(_0x19bb96.add(8)) - 1)
    },
    _incrementCount: function (_0x4e9dbd) {
      Memory.writeInt(_0x4e9dbd.add(8), Memory.readInt(_0x4e9dbd.add(8)) + 1)
    },
    _getDequeueIndex: function (_0x51d0e4) {
      return Memory.readInt(_0x51d0e4.add(12))
    },
    _getEnqueueIndex: function (_0x131ca9) {
      return Memory.readInt(_0x131ca9.add(16))
    },
    _setDequeueIndex: function (_0x263edc, _0x16ff4a) {
      Memory.writeInt(_0x263edc.add(12), _0x16ff4a)
    },
    _setEnqueueIndex: function (_0x17d59b, _0x36ef85) {
      Memory.writeInt(_0x17d59b.add(16), _0x36ef85)
    },
    _enqueue: function (_0x40c82d, _0x2b8a11) {
      pthread_mutex_lock(_0x40c82d.sub(4))
      var _0x40556d = MessageQueue['_getEnqueueIndex'](_0x40c82d)
      MessageQueue['_set'](_0x40c82d, _0x40556d, _0x2b8a11)
      MessageQueue['_setEnqueueIndex'](
        _0x40c82d,
        (_0x40556d + 1) % MessageQueue['_getCapacity'](_0x40c82d)
      )
      MessageQueue['_incrementCount'](_0x40c82d)
      pthread_mutex_unlock(_0x40c82d.sub(4))
    },
    _dequeue: function (_0x3e44e8) {
      var _0x581b51 = null
      pthread_mutex_lock(_0x3e44e8.sub(4))
      if (MessageQueue['_count'](_0x3e44e8)) {
        var _0xb2ede3 = MessageQueue['_getDequeueIndex'](_0x3e44e8)
        _0x581b51 = MessageQueue['_get'](_0x3e44e8, _0xb2ede3)
        MessageQueue['_setDequeueIndex'](
          _0x3e44e8,
          (_0xb2ede3 + 1) % MessageQueue['_getCapacity'](_0x3e44e8)
        )
        MessageQueue['_decrementCount'](_0x3e44e8)
      }
      return pthread_mutex_unlock(_0x3e44e8.sub(4)), _0x581b51
    },
  }
function setupMessaging() {
  cache.serverConnection = Memory.readPointer(base.add(SERVER_CONNECTION))
  cache.messaging = Memory.readPointer(cache.serverConnection.add(4))
  cache.messageFactory = Memory.readPointer(cache.messaging.add(52))
  cache.recvQueue = cache.messaging.add(60)
  cache.sendQueue = cache.messaging.add(84)
  cache.state = cache.messaging.add(212)
  cache.loginMessagePtr = cache.messaging.add(216)
  cache.createMessageByType = new NativeFunction(
    base.add(CREATE_MESSAGE_BY_TYPE),
    'pointer',
    ['pointer', 'int']
  )
  cache.sendMessage = function (_0x503863) {
    Message['_encode'](_0x503863)
    var _0x31b3c9 = Message['_getByteStream'](_0x503863),
      _0x4435f5 = ByteStream['_getOffset'](_0x31b3c9),
      _0x209eaa = malloc(_0x4435f5 + 7)
    memmove(_0x209eaa.add(7), ByteStream['_getByteArray'](_0x31b3c9), _0x4435f5)
    Buffer['_setEncodingLength'](_0x209eaa, _0x4435f5)
    Buffer['_setMessageType'](_0x209eaa, Message['_getMessageType'](_0x503863))
    Buffer['_setMessageVersion'](_0x209eaa, Message['_getVersion'](_0x503863))
    libc_send(cache.fd, _0x209eaa, _0x4435f5 + 7, 0)
    free(_0x209eaa)
    Message['_free'](_0x503863)
  }
  function _0x43c4ec() {
    var _0x1b8dc8 = MessageQueue['_dequeue'](cache.sendQueue)
    while (_0x1b8dc8) {
      var _0x29fbba = Message['_getMessageType'](_0x1b8dc8)
      _0x29fbba === 10100 &&
        ((_0x1b8dc8 = Memory.readPointer(cache.loginMessagePtr)),
        Memory.writePointer(cache.loginMessagePtr, ptr(0)))
      cache.sendMessage(_0x1b8dc8)
      _0x1b8dc8 = MessageQueue['_dequeue'](cache.sendQueue)
    }
  }
  function _0x578521() {
    var _0x1d2212 = malloc(7)
    libc_recv(cache.fd, _0x1d2212, 7, 256)
    var _0x2ded79 = Buffer['_getMessageType'](_0x1d2212)
    if (_0x2ded79 >= 20000) {
      _0x2ded79 === 20104 && (Memory.writeInt(cache.state, 5), _0x44c10c())
      var _0x5a7d1b = Buffer['_getEncodingLength'](_0x1d2212),
        _0x21a634 = Buffer['_getMessageVersion'](_0x1d2212)
      free(_0x1d2212)
      var _0x58fc97 = malloc(_0x5a7d1b)
      libc_recv(cache.fd, _0x58fc97, _0x5a7d1b, 256)
      var _0x389ba7 = cache.createMessageByType(cache.messageFactory, _0x2ded79)
      Message['_setVersion'](_0x389ba7, _0x21a634)
      var _0x50a7aa = Message['_getByteStream'](_0x389ba7)
      ByteStream['_setLength'](_0x50a7aa, _0x5a7d1b)
      if (_0x5a7d1b) {
        var _0x33553c = malloc(_0x5a7d1b)
        memmove(_0x33553c, _0x58fc97, _0x5a7d1b)
        ByteStream['_setByteArray'](_0x50a7aa, _0x33553c)
      }
      Message['_decode'](_0x389ba7)
      MessageQueue['_enqueue'](cache.recvQueue, _0x389ba7)
      free(_0x58fc97)
    }
  }
  function _0x44c10c() {
    Interceptor.replace(
      base.add(LOGICVERSION_ISPROD),
      new NativeCallback(
        function () {
          return 0
        },
        'int',
        []
      )
    )
    Interceptor.replace(
      base.add(LOGICVERSION_ISDEV),
      new NativeCallback(
        function () {
          return 1
        },
        'int',
        []
      )
    )
    Interceptor.attach(base.add(HOMEPAGE_STARTGAME), {
      onEnter(_0x5ce372) {
        _0x5ce372[3] = ptr(3)
        _0x5ce372[6] = ptr(1)
        _0x5ce372[8] = ptr(1)
      },
    })
    Interceptor.attach(base.add(ADD_VISION_UPDATE), {
      onEnter(_0x9a270b) {
        _0x9a270b[1].add(68).writeInt(_0x9a270b[1].add(56).readInt())
        _0x9a270b[1].add(72).writeInt(0)
      },
    })
  }
  Interceptor.attach(
    Module.findExportByName('libc.so', 'pthread_cond_signal'),
    {
      onEnter() {
        _0x43c4ec()
      },
    }
  )
  Interceptor.attach(Module.findExportByName('libc.so', 'select'), {
    onEnter() {
      _0x578521()
    },
  })
}
Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
  onEnter: function (_0x5c2f6) {
    if (ntohs(Memory.readU16(_0x5c2f6[1].add(2))) === 9339) {
      cache.fd = _0x5c2f6[0].toInt32()
      var _0x24344 = Memory.allocUtf8String('5.42.87.198')
      Memory.writeInt(_0x5c2f6[1].add(4), inet_addr(_0x24344))
      Memory.writeU16(_0x5c2f6[1].add(2), ntohs(parseInt(39111)))
      setupMessaging()
    }
  },
})
