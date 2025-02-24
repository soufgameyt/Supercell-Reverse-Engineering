var cache = {
    modules: {},
    options: {},
  }
  const base = Process.findModuleByName('libg.so').base,
    SERVER_CONNECTION = 10516920,
    PTHREAD_COND_WAKE_RETURN = 6383899,
    CREATE_MESSAGE_BY_TYPE = 2038440,
    SELECT_RETURN = 3859776,
    POINTER_SIZE = 4,
    WAKEUP_RETURN_ARRAY = [287916, 830640, 856340, 3674528, 5035728, 5123960],
    offlinebattle = 2585480,
    isprod = 4968668
  var Login = 0,
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
      _getByteStream: function (_0x4bcc9f) {
        return _0x4bcc9f.add(8)
      },
      _getVersion: function (_0x5c6e41) {
        return Memory.readInt(_0x5c6e41.add(4))
      },
      _setVersion: function (_0x90806b, _0xf07763) {
        Memory.writeInt(_0x90806b.add(4), _0xf07763)
      },
      _getMessageType: function (_0x1f6241) {
        return new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0x1f6241).add(20)),
          'int',
          ['pointer']
        )(_0x1f6241)
      },
      _encode: function (_0x49214a) {
        new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0x49214a).add(8)),
          'void',
          ['pointer']
        )(_0x49214a)
      },
      _decode: function (_0x2955ec) {
        new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0x2955ec).add(12)),
          'void',
          ['pointer']
        )(_0x2955ec)
      },
      _free: function (_0x3847b1) {
        new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0x3847b1).add(24)),
          'void',
          ['pointer']
        )(_0x3847b1)
        new NativeFunction(
          Memory.readPointer(Memory.readPointer(_0x3847b1).add(4)),
          'void',
          ['pointer']
        )(_0x3847b1)
      },
    },
    ByteStream = {
      _getOffset: function (_0x1d7bfb) {
        return Memory.readInt(_0x1d7bfb.add(16))
      },
      _getByteArray: function (_0x323189) {
        return Memory.readPointer(_0x323189.add(28))
      },
      _setByteArray: function (_0x4f302a, _0x802683) {
        Memory.writePointer(_0x4f302a.add(28), _0x802683)
      },
      _getLength: function (_0x20293e) {
        return Memory.readInt(_0x20293e.add(20))
      },
      _setLength: function (_0x3a3d96, _0x205523) {
        Memory.writeInt(_0x3a3d96.add(20), _0x205523)
      },
    },
    Buffer = {
      _getEncodingLength: function (_0x1c1797) {
        return (
          (Memory.readU8(_0x1c1797.add(2)) << 16) |
          (Memory.readU8(_0x1c1797.add(3)) << 8) |
          Memory.readU8(_0x1c1797.add(4))
        )
      },
      _setEncodingLength: function (_0x173bda, _0x50f96c) {
        Memory.writeU8(_0x173bda.add(2), (_0x50f96c >> 16) & 255)
        Memory.writeU8(_0x173bda.add(3), (_0x50f96c >> 8) & 255)
        Memory.writeU8(_0x173bda.add(4), _0x50f96c & 255)
      },
      _setMessageType: function (_0x5f38c7, _0x288997) {
        Memory.writeU8(_0x5f38c7.add(0), (_0x288997 >> 8) & 255)
        Memory.writeU8(_0x5f38c7.add(1), _0x288997 & 255)
      },
      _getMessageVersion: function (_0x24428f) {
        return (
          (Memory.readU8(_0x24428f.add(5)) << 8) | Memory.readU8(_0x24428f.add(6))
        )
      },
      _setMessageVersion: function (_0x220702, _0x2c8ed7) {
        Memory.writeU8(_0x220702.add(5), (_0x2c8ed7 >> 8) & 255)
        Memory.writeU8(_0x220702.add(6), _0x2c8ed7 & 255)
      },
      _getMessageType: function (_0x5a45e1) {
        return (Memory.readU8(_0x5a45e1) << 8) | Memory.readU8(_0x5a45e1.add(1))
      },
    },
    MessageQueue = {
      _getCapacity: function (_0x14512f) {
        return Memory.readInt(_0x14512f.add(4))
      },
      _get: function (_0x493e2e, _0x1ea214) {
        return Memory.readPointer(
          Memory.readPointer(_0x493e2e).add(POINTER_SIZE * _0x1ea214)
        )
      },
      _set: function (_0x231594, _0x32a53d, _0x1b24aa) {
        Memory.writePointer(
          Memory.readPointer(_0x231594).add(POINTER_SIZE * _0x32a53d),
          _0x1b24aa
        )
      },
      _count: function (_0x2a006d) {
        return Memory.readInt(_0x2a006d.add(8))
      },
      _decrementCount: function (_0x2340d5) {
        Memory.writeInt(_0x2340d5.add(8), Memory.readInt(_0x2340d5.add(8)) - 1)
      },
      _incrementCount: function (_0x148116) {
        Memory.writeInt(_0x148116.add(8), Memory.readInt(_0x148116.add(8)) + 1)
      },
      _getDequeueIndex: function (_0x26ff2a) {
        return Memory.readInt(_0x26ff2a.add(12))
      },
      _getEnqueueIndex: function (_0x39a38d) {
        return Memory.readInt(_0x39a38d.add(16))
      },
      _setDequeueIndex: function (_0x273519, _0x5c656f) {
        Memory.writeInt(_0x273519.add(12), _0x5c656f)
      },
      _setEnqueueIndex: function (_0x2a2b16, _0x38afb8) {
        Memory.writeInt(_0x2a2b16.add(16), _0x38afb8)
      },
      _enqueue: function (_0x4d5e87, _0x1897f7) {
        pthread_mutex_lock(_0x4d5e87.sub(4))
        var _0x59e102 = MessageQueue['_getEnqueueIndex'](_0x4d5e87)
        MessageQueue['_set'](_0x4d5e87, _0x59e102, _0x1897f7)
        MessageQueue['_setEnqueueIndex'](
          _0x4d5e87,
          (_0x59e102 + 1) % MessageQueue['_getCapacity'](_0x4d5e87)
        )
        MessageQueue['_incrementCount'](_0x4d5e87)
        pthread_mutex_unlock(_0x4d5e87.sub(4))
      },
      _dequeue: function (_0x2bcc9a) {
        var _0x441998 = null
        pthread_mutex_lock(_0x2bcc9a.sub(4))
        if (MessageQueue['_count'](_0x2bcc9a)) {
          var _0x42599c = MessageQueue['_getDequeueIndex'](_0x2bcc9a)
          _0x441998 = MessageQueue['_get'](_0x2bcc9a, _0x42599c)
          MessageQueue['_setDequeueIndex'](
            _0x2bcc9a,
            (_0x42599c + 1) % MessageQueue['_getCapacity'](_0x2bcc9a)
          )
          MessageQueue['_decrementCount'](_0x2bcc9a)
        }
        return pthread_mutex_unlock(_0x2bcc9a.sub(4)), _0x441998
      },
    }
  function OfflineBattle() {
    Interceptor.attach(base.add(offlinebattle), {
      onEnter(_0x25289f) {
        _0x25289f[3] = ptr(3)
        _0x25289f[6] = ptr(1)
        _0x25289f[8] = ptr(1)
      },
    })
  }
  function enableLobbyInfo() {
    Interceptor.attach(base.add(isprod), {
      onLeave(_0x5c3d6b) {
        _0x5c3d6b.replace(0)
      },
    })
  }
  function setupMessaging() {
    cache.wakeUpReturnArray = []
    for (
      var _0x33604e = 0;
      _0x33604e < WAKEUP_RETURN_ARRAY.length;
      _0x33604e += 1
    ) {
      cache.wakeUpReturnArray.push(base.add(WAKEUP_RETURN_ARRAY[_0x33604e]))
    }
    cache.pthreadReturn = base.add(PTHREAD_COND_WAKE_RETURN)
    cache.selectReturn = base.add(SELECT_RETURN)
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
    cache.sendMessage = function (_0x329026) {
      Message['_encode'](_0x329026)
      var _0x204910 = Message['_getByteStream'](_0x329026),
        _0xbf399b = ByteStream['_getOffset'](_0x204910),
        _0x54b20a = malloc(_0xbf399b + 7)
      memmove(_0x54b20a.add(7), ByteStream['_getByteArray'](_0x204910), _0xbf399b)
      Buffer['_setEncodingLength'](_0x54b20a, _0xbf399b)
      Buffer['_setMessageType'](_0x54b20a, Message['_getMessageType'](_0x329026))
      Buffer['_setMessageVersion'](_0x54b20a, Message['_getVersion'](_0x329026))
      libc_send(cache.fd, _0x54b20a, _0xbf399b + 7, 0)
      free(_0x54b20a)
    }
    function _0x52868d() {
      console.log('WAKE UP!!')
      var _0x3238a9 = MessageQueue['_dequeue'](cache.sendQueue)
      while (_0x3238a9) {
        var _0x268c15 = Message['_getMessageType'](_0x3238a9)
        console.log(_0x268c15)
        _0x268c15 === 10100 &&
          ((_0x3238a9 = Memory.readPointer(cache.loginMessagePtr)),
          Memory.writePointer(cache.loginMessagePtr, ptr(0)),
          (Login = 1))
        cache.sendMessage(_0x3238a9)
        _0x3238a9 = MessageQueue['_dequeue'](cache.sendQueue)
      }
    }
    function _0x21950d() {
      var _0x48ebb9 = malloc(7)
      libc_recv(cache.fd, _0x48ebb9, 7, 256)
      var _0x3a7017 = Buffer['_getMessageType'](_0x48ebb9)
      if (_0x3a7017 >= 20000) {
        _0x3a7017 === 20104 &&
          (Memory.writeInt(cache.state, 5), enableLobbyInfo(), OfflineBattle())
        var _0x33fc73 = Buffer['_getEncodingLength'](_0x48ebb9),
          _0x3442ea = Buffer['_getMessageVersion'](_0x48ebb9)
        free(_0x48ebb9)
        var _0x5a7cca = malloc(_0x33fc73)
        libc_recv(cache.fd, _0x5a7cca, _0x33fc73, 256)
        var _0x1df7dd = cache.createMessageByType(cache.messageFactory, _0x3a7017)
        Message['_setVersion'](_0x1df7dd, _0x3442ea)
        var _0x5850b8 = Message['_getByteStream'](_0x1df7dd)
        ByteStream['_setLength'](_0x5850b8, _0x33fc73)
        if (_0x33fc73) {
          var _0x39a658 = malloc(_0x33fc73)
          memmove(_0x39a658, _0x5a7cca, _0x33fc73)
          ByteStream['_setByteArray'](_0x5850b8, _0x39a658)
        }
        Message['_decode'](_0x1df7dd)
        MessageQueue['_enqueue'](cache.recvQueue, _0x1df7dd)
        free(_0x5a7cca)
      }
    }
    Interceptor.replace(
      Module.findExportByName('libc.so', 'pthread_cond_signal'),
      new NativeCallback(
        function (_0x28f065) {
          if (!this.returnAddress.equals(cache.pthreadReturn)) {
            return pthread_cond_signal(_0x28f065)
          }
          var _0x4b3653 = Memory.readPointer(this.context.sp.add(4))
          for (
            var _0x9dddb4 = 0;
            _0x9dddb4 < cache.wakeUpReturnArray.length;
            _0x9dddb4 += 1
          ) {
            if (_0x4b3653.equals(cache.wakeUpReturnArray[_0x9dddb4])) {
              return _0x52868d(), 0
            }
          }
          return pthread_cond_signal(_0x28f065)
        },
        'int',
        ['pointer']
      )
    )
    Interceptor.replace(
      Module.findExportByName('libc.so', 'select'),
      new NativeCallback(
        function (_0x31a1e1, _0x355852, _0x1b88f6, _0x19a482, _0x1d8eda) {
          var _0x4988dd = select(
            _0x31a1e1,
            _0x355852,
            _0x1b88f6,
            _0x19a482,
            _0x1d8eda
          )
          return (
            this.returnAddress.equals(cache.selectReturn) && _0x21950d(),
            _0x4988dd
          )
        },
        'int',
        ['int', 'pointer', 'pointer', 'pointer', 'pointer']
      )
    )
  }
  function OpenColor() {
    Interceptor.attach(base.add(3459432), {
      onEnter(_0xb9a36) {
        _0xb9a36[7] = ptr(1)
      },
    })
  }
  function setup(_0xcffc46, _0x1f02c1) {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
      onEnter: function (_0x147cd1) {
        ntohs(Memory.readU16(_0x147cd1[1].add(2))) === 9339 &&
          ((cache.fd = _0x147cd1[0].toInt32()),
          Memory.writeInt(
            _0x147cd1[1].add(4),
            inet_addr(Memory.allocUtf8String(_0xcffc46))
          ),
          Memory.writeU16(_0x147cd1[1].add(2), ntohs(_0x1f02c1)),
          setupMessaging())
      },
    })
  }
  function init() {
    setup('95.216.12.48', 21049)
  }
  init()
  Java.perform(function () {
    var _0xaf59eb = Java.use('android.widget.Toast'),
      _0x298327 = Java.use('android.app.ActivityThread')
        .currentApplication()
        .getApplicationContext(),
      _0x2516a8 = Java.use('java.lang.String')['$new'](
        'Private Server Created By 64Team'
      ),
      _0x5d72fd = Java.use('android.text.style.ForegroundColorSpan'),
      _0x157792 = Java.use('android.text.SpannableString'),
      _0x236850 = Java.use('android.graphics.Color'),
      _0x399be9 = _0x157792['$new'](_0x2516a8),
      _0x5d20d4 = _0x2516a8.indexOf('64Team')
    _0x399be9.setSpan(_0x5d72fd['$new'](_0x236850.RED.value), 0, _0x5d20d4, 33)
    _0x399be9.setSpan(
      _0x5d72fd['$new'](_0x236850.BLUE.value),
      _0x5d20d4,
      _0x2516a8.length(),
      33
    )
    var _0x2f4440 = _0xaf59eb.LENGTH_LONG.value,
      _0x3c1622 = _0xaf59eb.makeText(_0x298327, _0x399be9, _0x2f4440)
    _0x3c1622.show()
  })
  Java.perform(function () {
    var _0x1f1370 = Java.use('android.widget.Toast'),
      _0x526a1e = Java.use('android.app.ActivityThread')
        .currentApplication()
        .getApplicationContext(),
      _0x287604 = Java.use('java.lang.String')['$new']('Haccing Complete!'),
      _0x1cb03a = _0x1f1370.LENGTH_LONG.value,
      _0x147236 = _0x1f1370.makeText(_0x526a1e, _0x287604, _0x1cb03a)
    _0x147236.show()
  })