// deobfuscated by @albyxhacc, its v29.258
var cache = {
    'modules': {},
    'options': {}
  };
  var malloc = new NativeFunction(Module.findExportByName("libc.so", 'malloc'), "pointer", ['int']);
  var free = new NativeFunction(Module.findExportByName("libc.so", "free"), "void", ["pointer"]);
  var pthread_mutex_lock = new NativeFunction(Module.findExportByName("libc.so", "pthread_mutex_lock"), "int", ['pointer']);
  var pthread_mutex_unlock = new NativeFunction(Module.findExportByName("libc.so", 'pthread_mutex_unlock'), 'int', ['pointer']);
  var pthread_cond_signal = new NativeFunction(Module.findExportByName("libc.so", "pthread_cond_signal"), 'int', ["pointer"]);
  var select = new NativeFunction(Module.findExportByName("libc.so", "select"), 'int', ["int", "pointer", 'pointer', 'pointer', "pointer"]);
  var memmove = new NativeFunction(Module.findExportByName("libc.so", "memmove"), "pointer", ["pointer", "pointer", 'int']);
  var ntohs = new NativeFunction(Module.findExportByName("libc.so", 'ntohs'), 'uint16', ["uint16"]);
  var inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), "int", ["pointer"]);
  var libc_send = new NativeFunction(Module.findExportByName('libc.so', "send"), "int", ['int', "pointer", 'int', "int"]);
  var libc_recv = new NativeFunction(Module.findExportByName("libc.so", 'recv'), "int", ["int", "pointer", 'int', "int"]);
  var htons = new NativeFunction(Module.findExportByName("libc.so", "htons"), "uint16", ["uint16"]);
  var Message = {
    '_getByteStream': function (_0x2f8319) {
      return _0x2f8319.add(0x8);
    },
    '_getVersion': function (_0x394f6b) {
      return Memory.readInt(_0x394f6b.add(0x4));
    },
    '_setVersion': function (_0x33c44e, _0x4493a9) {
      Memory.writeInt(_0x33c44e.add(0x4), _0x4493a9);
    },
    '_getMessageType': function (_0x664086) {
      return new NativeFunction(Memory.readPointer(Memory.readPointer(_0x664086).add(0x14)), 'int', ["pointer"])(_0x664086);
    },
    '_encode': function (_0x2dde6e) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(_0x2dde6e).add(0x8)), "void", ['pointer'])(_0x2dde6e);
    },
    '_decode': function (_0x37186d) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(_0x37186d).add(0xc)), "void", ['pointer'])(_0x37186d);
    },
    '_free': function (_0x5e143e) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(_0x5e143e).add(0x18)), "void", ["pointer"])(_0x5e143e);
      new NativeFunction(Memory.readPointer(Memory.readPointer(_0x5e143e).add(0x4)), "void", ['pointer'])(_0x5e143e);
    }
  };
  var ByteStream = {
    '_getOffset': function (_0x18a8e9) {
      return Memory.readInt(_0x18a8e9.add(0x10));
    },
    '_getByteArray': function (_0x259454) {
      return Memory.readPointer(_0x259454.add(0x1c));
    },
    '_setByteArray': function (_0x4b7eb3, _0x3f8831) {
      Memory.writePointer(_0x4b7eb3.add(0x1c), _0x3f8831);
    },
    '_getLength': function (_0x1556ef) {
      return Memory.readInt(_0x1556ef.add(0x14));
    },
    '_setLength': function (_0x38692b, _0x132a43) {
      Memory.writeInt(_0x38692b.add(0x14), _0x132a43);
    }
  };
  var Buffer = {
    '_getEncodingLength': function (_0x342d48) {
      return Memory.readU8(_0x342d48.add(0x2)) << 0x10 | Memory.readU8(_0x342d48.add(0x3)) << 0x8 | Memory.readU8(_0x342d48.add(0x4));
    },
    '_setEncodingLength': function (_0x7ffd8d, _0x3c9810) {
      Memory.writeU8(_0x7ffd8d.add(0x2), _0x3c9810 >> 0x10 & 0xff);
      Memory.writeU8(_0x7ffd8d.add(0x3), _0x3c9810 >> 0x8 & 0xff);
      Memory.writeU8(_0x7ffd8d.add(0x4), _0x3c9810 & 0xff);
    },
    '_setMessageType': function (_0x146300, _0x32ae39) {
      Memory.writeU8(_0x146300.add(0x0), _0x32ae39 >> 0x8 & 0xff);
      Memory.writeU8(_0x146300.add(0x1), _0x32ae39 & 0xff);
    },
    '_getMessageVersion': function (_0x5093be) {
      return Memory.readU8(_0x5093be.add(0x5)) << 0x8 | Memory.readU8(_0x5093be.add(0x6));
    },
    '_setMessageVersion': function (_0x105bd2, _0x632276) {
      Memory.writeU8(_0x105bd2.add(0x5), _0x632276 >> 0x8 & 0xff);
      Memory.writeU8(_0x105bd2.add(0x6), _0x632276 & 0xff);
    },
    '_getMessageType': function (_0x1a4d1a) {
      return Memory.readU8(_0x1a4d1a) << 0x8 | Memory.readU8(_0x1a4d1a.add(0x1));
    }
  };
  var MessageQueue = {
    '_getCapacity': function (_0x565947) {
      return Memory.readInt(_0x565947.add(0x4));
    },
    '_get': function (_0x3865c7, _0x3930fb) {
      return Memory.readPointer(Memory.readPointer(_0x3865c7).add(0x4 * _0x3930fb));
    },
    '_set': function (_0x97ca85, _0x475b96, _0x4337a2) {
      Memory.writePointer(Memory.readPointer(_0x97ca85).add(0x4 * _0x475b96), _0x4337a2);
    },
    '_count': function (_0x19e335) {
      return Memory.readInt(_0x19e335.add(0x8));
    },
    '_decrementCount': function (_0x18d682) {
      Memory.writeInt(_0x18d682.add(0x8), Memory.readInt(_0x18d682.add(0x8)) - 0x1);
    },
    '_incrementCount': function (_0x5b7546) {
      Memory.writeInt(_0x5b7546.add(0x8), Memory.readInt(_0x5b7546.add(0x8)) + 0x1);
    },
    '_getDequeueIndex': function (_0x1686a7) {
      return Memory.readInt(_0x1686a7.add(0xc));
    },
    '_getEnqueueIndex': function (_0x1e4758) {
      return Memory.readInt(_0x1e4758.add(0x10));
    },
    '_setDequeueIndex': function (_0x2d4bce, _0x498938) {
      Memory.writeInt(_0x2d4bce.add(0xc), _0x498938);
    },
    '_setEnqueueIndex': function (_0x54a61, _0x22fa03) {
      Memory.writeInt(_0x54a61.add(0x10), _0x22fa03);
    },
    '_enqueue': function (_0x251f7a, _0x58e189) {
      pthread_mutex_lock(_0x251f7a.sub(0x4));
      var _0x11feff = Memory.readInt(_0x251f7a.add(0x10));
      MessageQueue._set(_0x251f7a, _0x11feff, _0x58e189);
      MessageQueue._setEnqueueIndex(_0x251f7a, (_0x11feff + 0x1) % Memory.readInt(_0x251f7a.add(0x4)));
      MessageQueue._incrementCount(_0x251f7a);
      pthread_mutex_unlock(_0x251f7a.sub(0x4));
    },
    '_dequeue': function (_0x3cf900) {
      var _0xcbd572 = null;
      pthread_mutex_lock(_0x3cf900.sub(0x4));
      if (Memory.readInt(_0x3cf900.add(0x8))) {
        var _0x4591d7 = Memory.readInt(_0x3cf900.add(0xc));
        _0xcbd572 = Memory.readPointer(Memory.readPointer(_0x3cf900).add(0x4 * _0x4591d7));
        MessageQueue._setDequeueIndex(_0x3cf900, (_0x4591d7 + 0x1) % Memory.readInt(_0x3cf900.add(0x4)));
        MessageQueue._decrementCount(_0x3cf900);
      }
      pthread_mutex_unlock(_0x3cf900.sub(0x4));
      return _0xcbd572;
    }
  };
  function enableDebugInfo() {
    const _0x526784 = Process.findModuleByName('libg.so').base;
    Interceptor.replace(_0x526784.add(0x2829b0), new NativeCallback(function () {
      return 0x0;
    }, "int", []));
    Interceptor.replace(_0x526784.add(0x3ad0b4), new NativeCallback(function () {
      return 0x1;
    }, "int", []));
  }
  function ColorFull() {
    Interceptor.attach(cache.base.add(0x38c6fc), {
      'onEnter'(_0x39c0a6) {
        _0x39c0a6[0x7] = ptr(0x1);
      }
    });
  }
  function OfflineBattles() {
    Interceptor.attach(cache.base.add(0x44cebc), {
      'onLeave'(_0x35ca4b) {
        _0x35ca4b.replace(ptr(0x1));
      }
    });
    Interceptor.attach(cache.base.add(0xc88108), {
      'onLeave'(_0x5c5a63) {
        _0x5c5a63.replace(ptr(0x1));
      }
    });
    Interceptor.attach(cache.base.add(0x67febc), {
      'onEnter': function (_0xb11a71) {
        _0xb11a71[0x3] = ptr(0x3);
      }
    });
  }
  function setupMessaging() {
    cache.base = Process.findModuleByName("libg.so").base;
    cache.pthreadReturn = cache.base.add(8447403);
    cache.serverConnection = Memory.readPointer(cache.base.add(0xc86d10));
    cache.messaging = Memory.readPointer(cache.serverConnection.add(0x4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(0x34));
    cache.recvQueue = cache.messaging.add(0x3c);
    cache.sendQueue = cache.messaging.add(0x54);
    cache.state = cache.messaging.add(0xd0);
    cache.loginMessagePtr = cache.messaging.add(0xd4);
    cache.createMessageByType = new NativeFunction(cache.base.add(0x4a7ee4), 'pointer', ["pointer", 'int']);
    cache.sendMessage = function (_0x10dd22) {
      Message._encode(_0x10dd22);
      var _0x171fc8 = _0x10dd22.add(0x8);
      var _0x2cb8d4 = Memory.readInt(_0x171fc8.add(0x10));
      var _0x21bc98 = malloc(_0x2cb8d4 + 0x7);
      memmove(_0x21bc98.add(0x7), Memory.readPointer(_0x171fc8.add(0x1c)), _0x2cb8d4);
      Buffer._setEncodingLength(_0x21bc98, _0x2cb8d4);
      Buffer._setMessageType(_0x21bc98, new NativeFunction(Memory.readPointer(Memory.readPointer(_0x10dd22).add(0x14)), 'int', ["pointer"])(_0x10dd22));
      Buffer._setMessageVersion(_0x21bc98, Memory.readInt(_0x10dd22.add(0x4)));
      libc_send(cache.fd, _0x21bc98, _0x2cb8d4 + 0x7, 0x0);
      free(_0x21bc98);
    };
    function _0x54cd39() {
      var _0x3c84db = MessageQueue._dequeue(cache.sendQueue);
      while (_0x3c84db) {
        var _0x56521c = new NativeFunction(Memory.readPointer(Memory.readPointer(_0x3c84db).add(0x14)), 'int', ["pointer"])(_0x3c84db);
        if (_0x56521c === 0x2774) {
          _0x3c84db = Memory.readPointer(cache.loginMessagePtr);
          Memory.writePointer(cache.loginMessagePtr, ptr(0x0));
        }
        cache.sendMessage(_0x3c84db);
        _0x3c84db = MessageQueue._dequeue(cache.sendQueue);
      }
    }
    function _0xa07a22() {
      var _0x1819a3 = malloc(0x7);
      libc_recv(cache.fd, _0x1819a3, 0x7, 0x100);
      var _0x264866 = Memory.readU8(_0x1819a3) << 0x8 | Memory.readU8(_0x1819a3.add(0x1));
      if (_0x264866 === 0x4e88) {
        Memory.writeInt(cache.state, 0x5);
        OfflineBattles();
        ColorFull();
        enableDebugInfo();
      }
      var _0x5021dc = Memory.readU8(_0x1819a3.add(0x2)) << 0x10 | Memory.readU8(_0x1819a3.add(0x3)) << 0x8 | Memory.readU8(_0x1819a3.add(0x4));
      var _0x74d45b = Memory.readU8(_0x1819a3.add(0x5)) << 0x8 | Memory.readU8(_0x1819a3.add(0x6));
      free(_0x1819a3);
      var _0xba2f2a = malloc(_0x5021dc);
      libc_recv(cache.fd, _0xba2f2a, _0x5021dc, 0x100);
      var _0x277aed = cache.createMessageByType(cache.messageFactory, _0x264866);
      Message._setVersion(_0x277aed, _0x74d45b);
      var _0x1bd03f = _0x277aed.add(0x8);
      ByteStream._setLength(_0x1bd03f, _0x5021dc);
      if (_0x5021dc) {
        var _0x370961 = malloc(_0x5021dc);
        memmove(_0x370961, _0xba2f2a, _0x5021dc);
        ByteStream._setByteArray(_0x1bd03f, _0x370961);
      }
      Message._decode(_0x277aed);
      MessageQueue._enqueue(cache.recvQueue, _0x277aed);
      free(_0xba2f2a);
    }
    Interceptor.attach(Module.findExportByName("libc.so", "pthread_cond_signal"), {
      'onEnter': function (_0xdfbe9) {
        _0x54cd39();
      }
    });
    Interceptor.attach(Module.findExportByName("libc.so", "select"), {
      'onEnter': function (_0x50436a) {
        _0xa07a22();
      }
    });
  }
  function setup() {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
      'onEnter': function (_0x2e293d) {
        if (ntohs(Memory.readU16(_0x2e293d[0x1].add(0x2))) === 0x247b) {
          cache.fd = _0x2e293d[0x0].toInt32();
          var _0x1c83bb = Memory.allocUtf8String('185.105.90.193'); // ip
          var _0x37ffb2 = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), 'uint16', ["uint16"]);
          _0x2e293d[0x1].add(0x2).writeU16(_0x37ffb2(0x24e9));
          Memory.writeInt(_0x2e293d[0x1].add(0x4), inet_addr(_0x1c83bb));
          setupMessaging();
        }
      }
    });
  }
  rpc.exports = {
    'init': function (_0x192131, _0x4be0ba) {
      setup();
    }
  };