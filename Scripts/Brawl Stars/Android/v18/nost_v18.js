console.log(format('codename: {0}', 'rooty tooty'))
var cache = {}
const SERVER_CONNECTION = 10662996,
  CREATE_MESSAGE_BY_TYPE = 1316380,
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
  )
const module = Process.findModuleByName('libg.so'),
  base = module.base
var Login = 0,
  Message = {
    _getByteStream: function (_0x1c1480) {
      return _0x1c1480.add(8)
    },
    _getVersion: function (_0x28bf6a) {
      return Memory.readInt(_0x28bf6a.add(4))
    },
    _setVersion: function (_0x4b5667, _0x33d6d8) {
      Memory.writeInt(_0x4b5667.add(4), _0x33d6d8)
    },
    _getMessageType: function (_0x242f32) {
      return new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x242f32).add(20)),
        'int',
        ['pointer']
      )(_0x242f32)
    },
    _encode: function (_0x44651e) {
      new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x44651e).add(8)),
        'void',
        ['pointer']
      )(_0x44651e)
    },
    _decode: function (_0x573049) {
      new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x573049).add(12)),
        'void',
        ['pointer']
      )(_0x573049)
    },
    _free: function (_0x21dbdf) {
      new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x21dbdf).add(24)),
        'void',
        ['pointer']
      )(_0x21dbdf)
      new NativeFunction(
        Memory.readPointer(Memory.readPointer(_0x21dbdf).add(4)),
        'void',
        ['pointer']
      )(_0x21dbdf)
    },
  },
  ByteStream = {
    _getOffset: function (_0x3d1edf) {
      return Memory.readInt(_0x3d1edf.add(16))
    },
    _getByteArray: function (_0xa839f5) {
      return Memory.readPointer(_0xa839f5.add(28))
    },
    _setByteArray: function (_0x54610e, _0x84847c) {
      Memory.writePointer(_0x54610e.add(28), _0x84847c)
    },
    _getLength: function (_0xa90e1) {
      return Memory.readInt(_0xa90e1.add(20))
    },
    _setLength: function (_0x4fde05, _0x28ff44) {
      Memory.writeInt(_0x4fde05.add(20), _0x28ff44)
    },
  },
  Buffer = {
    _getEncodingLength: function (_0x2a80b6) {
      return (
        (Memory.readU8(_0x2a80b6.add(2)) << 16) |
        (Memory.readU8(_0x2a80b6.add(3)) << 8) |
        Memory.readU8(_0x2a80b6.add(4))
      )
    },
    _setEncodingLength: function (_0x27acbb, _0x3bac00) {
      Memory.writeU8(_0x27acbb.add(2), (_0x3bac00 >> 16) & 255)
      Memory.writeU8(_0x27acbb.add(3), (_0x3bac00 >> 8) & 255)
      Memory.writeU8(_0x27acbb.add(4), _0x3bac00 & 255)
    },
    _setMessageType: function (_0x2e2d3d, _0x5c902a) {
      Memory.writeU8(_0x2e2d3d.add(0), (_0x5c902a >> 8) & 255)
      Memory.writeU8(_0x2e2d3d.add(1), _0x5c902a & 255)
    },
    _getMessageVersion: function (_0x1234a2) {
      return (
        (Memory.readU8(_0x1234a2.add(5)) << 8) | Memory.readU8(_0x1234a2.add(6))
      )
    },
    _setMessageVersion: function (_0xebdbfb, _0x4dd569) {
      Memory.writeU8(_0xebdbfb.add(5), (_0x4dd569 >> 8) & 255)
      Memory.writeU8(_0xebdbfb.add(6), _0x4dd569 & 255)
    },
    _getMessageType: function (_0x1a66b2) {
      return (Memory.readU8(_0x1a66b2) << 8) | Memory.readU8(_0x1a66b2.add(1))
    },
  },
  MessageQueue = {
    _getCapacity: function (_0x46ad4a) {
      return Memory.readInt(_0x46ad4a.add(4))
    },
    _get: function (_0x4faa0f, _0x5aa011) {
      return Memory.readPointer(
        Memory.readPointer(_0x4faa0f).add(POINTER_SIZE * _0x5aa011)
      )
    },
    _set: function (_0x232fe6, _0x4b7f17, _0x333e62) {
      Memory.writePointer(
        Memory.readPointer(_0x232fe6).add(POINTER_SIZE * _0x4b7f17),
        _0x333e62
      )
    },
    _count: function (_0x338de0) {
      return Memory.readInt(_0x338de0.add(8))
    },
    _decrementCount: function (_0x51158d) {
      Memory.writeInt(_0x51158d.add(8), Memory.readInt(_0x51158d.add(8)) - 1)
    },
    _incrementCount: function (_0x5672c3) {
      Memory.writeInt(_0x5672c3.add(8), Memory.readInt(_0x5672c3.add(8)) + 1)
    },
    _getDequeueIndex: function (_0x4e4624) {
      return Memory.readInt(_0x4e4624.add(12))
    },
    _getEnqueueIndex: function (_0x4f1875) {
      return Memory.readInt(_0x4f1875.add(16))
    },
    _setDequeueIndex: function (_0x51f376, _0x5a1284) {
      Memory.writeInt(_0x51f376.add(12), _0x5a1284)
    },
    _setEnqueueIndex: function (_0x172bbf, _0x378ff9) {
      Memory.writeInt(_0x172bbf.add(16), _0x378ff9)
    },
    _enqueue: function (_0x3ef6ff, _0x374018) {
      pthread_mutex_lock(_0x3ef6ff.sub(4))
      var _0x4cb120 = MessageQueue['_getEnqueueIndex'](_0x3ef6ff)
      MessageQueue['_set'](_0x3ef6ff, _0x4cb120, _0x374018)
      MessageQueue['_setEnqueueIndex'](
        _0x3ef6ff,
        (_0x4cb120 + 1) % MessageQueue['_getCapacity'](_0x3ef6ff)
      )
      MessageQueue['_incrementCount'](_0x3ef6ff)
      pthread_mutex_unlock(_0x3ef6ff.sub(4))
    },
    _dequeue: function (_0x2bbc69) {
      var _0x46851d = null
      pthread_mutex_lock(_0x2bbc69.sub(4))
      if (MessageQueue['_count'](_0x2bbc69)) {
        var _0x8a380b = MessageQueue['_getDequeueIndex'](_0x2bbc69)
        _0x46851d = MessageQueue['_get'](_0x2bbc69, _0x8a380b)
        MessageQueue['_setDequeueIndex'](
          _0x2bbc69,
          (_0x8a380b + 1) % MessageQueue['_getCapacity'](_0x2bbc69)
        )
        MessageQueue['_decrementCount'](_0x2bbc69)
      }
      return pthread_mutex_unlock(_0x2bbc69.sub(4)), _0x46851d
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
  cache.sendMessage = function (_0x5c5566) {
    Message['_encode'](_0x5c5566)
    var _0x4e5051 = Message['_getByteStream'](_0x5c5566),
      _0x4dbe3e = ByteStream['_getOffset'](_0x4e5051),
      _0x61cd37 = malloc(_0x4dbe3e + 7)
    memmove(_0x61cd37.add(7), ByteStream['_getByteArray'](_0x4e5051), _0x4dbe3e)
    Buffer['_setEncodingLength'](_0x61cd37, _0x4dbe3e)
    Buffer['_setMessageType'](_0x61cd37, Message['_getMessageType'](_0x5c5566))
    Buffer['_setMessageVersion'](_0x61cd37, Message['_getVersion'](_0x5c5566))
    libc_send(cache.fd, _0x61cd37, _0x4dbe3e + 7, 0)
    free(_0x61cd37)
  }
  function _0x42c38b() {
    var _0x11723d = MessageQueue['_dequeue'](cache.sendQueue)
    while (_0x11723d) {
      var _0x160ac5 = Message['_getMessageType'](_0x11723d)
      log(format('onWakeup: messageType: {0}', _0x160ac5))
      _0x160ac5 === 10100 &&
        ((_0x11723d = Memory.readPointer(cache.loginMessagePtr)),
        Memory.writePointer(cache.loginMessagePtr, ptr(0)),
        (Login = 1))
      cache.sendMessage(_0x11723d)
      _0x11723d = MessageQueue['_dequeue'](cache.sendQueue)
    }
  }
  function _0x3e8ece() {
    var _0x459e3e = malloc(7)
    libc_recv(cache.fd, _0x459e3e, 7, 256)
    var _0x2baa68 = Buffer['_getMessageType'](_0x459e3e)
    log(format('onReceive: messageType: {0}', _0x2baa68))
    if (_0x2baa68 >= 20000) {
      _0x2baa68 === 20104 && Memory.writeInt(cache.state, 5)
      var _0x1a062f = Buffer['_getEncodingLength'](_0x459e3e),
        _0x1a49c1 = Buffer['_getMessageVersion'](_0x459e3e)
      free(_0x459e3e)
      var _0x1faf9c = malloc(_0x1a062f)
      libc_recv(cache.fd, _0x1faf9c, _0x1a062f, 256)
      var _0x17de60 = cache.createMessageByType(cache.messageFactory, _0x2baa68)
      Message['_setVersion'](_0x17de60, _0x1a49c1)
      var _0x584d09 = Message['_getByteStream'](_0x17de60)
      ByteStream['_setLength'](_0x584d09, _0x1a062f)
      if (_0x1a062f) {
        var _0x25916d = malloc(_0x1a062f)
        memmove(_0x25916d, _0x1faf9c, _0x1a062f)
        ByteStream['_setByteArray'](_0x584d09, _0x25916d)
      }
      Message['_decode'](_0x17de60)
      MessageQueue['_enqueue'](cache.recvQueue, _0x17de60)
      free(_0x1faf9c)
    }
  }
  Interceptor.attach(
    Module.findExportByName('libc.so', 'pthread_cond_signal'),
    {
      onEnter: function (_0x3bbc8a) {
        _0x42c38b()
      },
    }
  )
  Interceptor.attach(Module.findExportByName('libc.so', 'select'), {
    onEnter: function (_0x11caab) {
      _0x3e8ece()
    },
  })
}
function redirect(_0x159123, _0x13a072) {
  Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
    onEnter: function (_0x10f2ce) {
      ntohs(Memory.readU16(_0x10f2ce[1].add(2))) === 9339 &&
        ((cache.fd = _0x10f2ce[0].toInt32()),
        Memory.writeInt(
          _0x10f2ce[1].add(4),
          inet_addr(Memory.allocUtf8String(_0x159123))
        ),
        Memory.writeU16(_0x10f2ce[1].add(2), ntohs(_0x13a072)),
        log(format('redirected to {0}:{1}', _0x159123, _0x13a072)),
        setupMessaging())
    },
  })
}
function log(_0x28b446) {
  console.log('[*] ' + _0x28b446)
}
function format(_0x56a8f8) {
  var _0x14b307 = Array.prototype.slice.call(arguments, 1)
  return _0x56a8f8.replace(/\{(\d+)\}/g, function (_0x5448fe, _0x24229b) {
    return _0x14b307[_0x24229b]
  })
}
rpc.exports.init = function () {
  redirect('130.61.77.11', 6974)
}
