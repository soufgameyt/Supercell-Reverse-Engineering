let total = 0;
for (let i = 0; i < 10; i++) {
  total += i;
}
console.log("Total: " + total);
var cache = {
  modules: {},
  options: {}
};
var malloc = new NativeFunction(Module.findExportByName("libc.so", "malloc"), "pointer", ["int"]);
var free = new NativeFunction(Module.findExportByName("libc.so", "free"), "void", ["pointer"]);
var pthread_mutex_lock = new NativeFunction(Module.findExportByName("libc.so", "pthread_mutex_lock"), "int", ["pointer"]);
var pthread_mutex_unlock = new NativeFunction(Module.findExportByName("libc.so", "pthread_mutex_unlock"), "int", ["pointer"]);
var pthread_cond_signal = new NativeFunction(Module.findExportByName("libc.so", "pthread_cond_signal"), "int", ["pointer"]);
var select = new NativeFunction(Module.findExportByName("libc.so", "select"), "int", ["int", "pointer", "pointer", "pointer", "pointer"]);
var memmove = new NativeFunction(Module.findExportByName("libc.so", "memmove"), "pointer", ["pointer", "pointer", "int"]);
var ntohs = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
var inet_addr = new NativeFunction(Module.findExportByName("libc.so", "inet_addr"), "int", ["pointer"]);
var libc_send = new NativeFunction(Module.findExportByName("libc.so", "send"), "int", ["int", "pointer", "int", "int"]);
var libc_recv = new NativeFunction(Module.findExportByName("libc.so", "recv"), "int", ["int", "pointer", "int", "int"]);
var htons = new NativeFunction(Module.findExportByName("libc.so", "htons"), "uint16", ["uint16"]);
var Message = {
  _getByteStream: function (_0x2f8319) {
    return _0x2f8319.add(8);
  },
  _getVersion: function (_0x394f6b) {
    return Memory.readInt(_0x394f6b.add(4));
  },
  _setVersion: function (_0x33c44e, _0x4493a9) {
    Memory.writeInt(_0x33c44e.add(4), _0x4493a9);
  },
  _getMessageType: function (_0x664086) {
    return new NativeFunction(Memory.readPointer(Memory.readPointer(_0x664086).add(20)), "int", ["pointer"])(_0x664086);
  },
  _encode: function (_0x2dde6e) {
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0x2dde6e).add(8)), "void", ["pointer"])(_0x2dde6e);
  },
  _decode: function (_0x37186d) {
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0x37186d).add(12)), "void", ["pointer"])(_0x37186d);
  },
  _free: function (_0x5e143e) {
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0x5e143e).add(24)), "void", ["pointer"])(_0x5e143e);
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0x5e143e).add(4)), "void", ["pointer"])(_0x5e143e);
  }
};
var ByteStream = {
  _getOffset: function (_0x18a8e9) {
    return Memory.readInt(_0x18a8e9.add(16));
  },
  _getByteArray: function (_0x259454) {
    return Memory.readPointer(_0x259454.add(28));
  },
  _setByteArray: function (_0x4b7eb3, _0x3f8831) {
    Memory.writePointer(_0x4b7eb3.add(28), _0x3f8831);
  },
  _getLength: function (_0x1556ef) {
    return Memory.readInt(_0x1556ef.add(20));
  },
  _setLength: function (_0x38692b, _0x132a43) {
    Memory.writeInt(_0x38692b.add(20), _0x132a43);
  }
};
var Buffer = {
  _getEncodingLength: function (_0x342d48) {
    return Memory.readU8(_0x342d48.add(2)) << 16 | Memory.readU8(_0x342d48.add(3)) << 8 | Memory.readU8(_0x342d48.add(4));
  },
  _setEncodingLength: function (_0x7ffd8d, _0x3c9810) {
    Memory.writeU8(_0x7ffd8d.add(2), _0x3c9810 >> 16 & 255);
    Memory.writeU8(_0x7ffd8d.add(3), _0x3c9810 >> 8 & 255);
    Memory.writeU8(_0x7ffd8d.add(4), _0x3c9810 & 255);
  },
  _setMessageType: function (_0x146300, _0x32ae39) {
    Memory.writeU8(_0x146300.add(0), _0x32ae39 >> 8 & 255);
    Memory.writeU8(_0x146300.add(1), _0x32ae39 & 255);
  },
  _getMessageVersion: function (_0x5093be) {
    return Memory.readU8(_0x5093be.add(5)) << 8 | Memory.readU8(_0x5093be.add(6));
  },
  _setMessageVersion: function (_0x105bd2, _0x632276) {
    Memory.writeU8(_0x105bd2.add(5), _0x632276 >> 8 & 255);
    Memory.writeU8(_0x105bd2.add(6), _0x632276 & 255);
  },
  _getMessageType: function (_0x1a4d1a) {
    return Memory.readU8(_0x1a4d1a) << 8 | Memory.readU8(_0x1a4d1a.add(1));
  }
};
var MessageQueue = {
  _getCapacity: function (_0x565947) {
    return Memory.readInt(_0x565947.add(4));
  },
  _get: function (_0x3865c7, _0x3930fb) {
    return Memory.readPointer(Memory.readPointer(_0x3865c7).add(4 * _0x3930fb));
  },
  _set: function (_0x97ca85, _0x475b96, _0x4337a2) {
    Memory.writePointer(Memory.readPointer(_0x97ca85).add(4 * _0x475b96), _0x4337a2);
  },
  _count: function (_0x19e335) {
    return Memory.readInt(_0x19e335.add(8));
  },
  _decrementCount: function (_0x18d682) {
    Memory.writeInt(_0x18d682.add(8), Memory.readInt(_0x18d682.add(8)) - 1);
  },
  _incrementCount: function (_0x5b7546) {
    Memory.writeInt(_0x5b7546.add(8), Memory.readInt(_0x5b7546.add(8)) + 1);
  },
  _getDequeueIndex: function (_0x1686a7) {
    return Memory.readInt(_0x1686a7.add(12));
  },
  _getEnqueueIndex: function (_0x1e4758) {
    return Memory.readInt(_0x1e4758.add(16));
  },
  _setDequeueIndex: function (_0x2d4bce, _0x498938) {
    Memory.writeInt(_0x2d4bce.add(12), _0x498938);
  },
  _setEnqueueIndex: function (_0x54a61, _0x22fa03) {
    Memory.writeInt(_0x54a61.add(16), _0x22fa03);
  },
  _enqueue: function (_0x251f7a, _0x58e189) {
    pthread_mutex_lock(_0x251f7a.sub(4));
    var _0x11feff = Memory.readInt(_0x251f7a.add(16));
    MessageQueue._set(_0x251f7a, _0x11feff, _0x58e189);
    MessageQueue._setEnqueueIndex(_0x251f7a, (_0x11feff + 1) % Memory.readInt(_0x251f7a.add(4)));
    MessageQueue._incrementCount(_0x251f7a);
    pthread_mutex_unlock(_0x251f7a.sub(4));
  },
  _dequeue: function (_0x3cf900) {
    var _0xcbd572 = null;
    pthread_mutex_lock(_0x3cf900.sub(4));
    if (Memory.readInt(_0x3cf900.add(8))) {
      var _0x4591d7 = Memory.readInt(_0x3cf900.add(12));
      _0xcbd572 = Memory.readPointer(Memory.readPointer(_0x3cf900).add(4 * _0x4591d7));
      MessageQueue._setDequeueIndex(_0x3cf900, (_0x4591d7 + 1) % Memory.readInt(_0x3cf900.add(4)));
      MessageQueue._decrementCount(_0x3cf900);
    }
    pthread_mutex_unlock(_0x3cf900.sub(4));
    return _0xcbd572;
  }
};
function enableDebugInfo() {
  const _0x526784 = Process.findModuleByName("libg.so").base;
  Interceptor.replace(_0x526784.add(2632112), new NativeCallback(function () {
    return 0;
  }, "int", []));
  Interceptor.replace(_0x526784.add(3854516), new NativeCallback(function () {
    return 1;
  }, "int", []));
}
function ColorFull() {
  Interceptor.attach(cache.base.add(3720956), {
    onEnter(_0x39c0a6) {
      _0x39c0a6[7] = ptr(1);
    }
  });
}
function OfflineBattles() {
  Interceptor.attach(cache.base.add(4509372), {
    onLeave(_0x35ca4b) {
      _0x35ca4b.replace(ptr(1));
    }
  });
  Interceptor.attach(cache.base.add(13140232), {
    onLeave(_0x5c5a63) {
      _0x5c5a63.replace(ptr(1));
    }
  });
  Interceptor.attach(cache.base.add(6815420), {
    onEnter: function (_0xb11a71) {
      _0xb11a71[3] = ptr(3);
    }
  });
}
function setupMessaging() {
  cache.base = Process.findModuleByName("libg.so").base;
  cache.pthreadReturn = cache.base.add(8447403);
  cache.serverConnection = Memory.readPointer(cache.base.add(13135120));
  cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
  cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
  cache.recvQueue = cache.messaging.add(60);
  cache.sendQueue = cache.messaging.add(84);
  cache.state = cache.messaging.add(208);
  cache.loginMessagePtr = cache.messaging.add(212);
  cache.createMessageByType = new NativeFunction(cache.base.add(4882148), "pointer", ["pointer", "int"]);
  cache.sendMessage = function (_0x10dd22) {
    Message._encode(_0x10dd22);
    var _0x171fc8 = _0x10dd22.add(8);
    var _0x2cb8d4 = Memory.readInt(_0x171fc8.add(16));
    var _0x21bc98 = malloc(_0x2cb8d4 + 7);
    memmove(_0x21bc98.add(7), Memory.readPointer(_0x171fc8.add(28)), _0x2cb8d4);
    Buffer._setEncodingLength(_0x21bc98, _0x2cb8d4);
    Buffer._setMessageType(_0x21bc98, new NativeFunction(Memory.readPointer(Memory.readPointer(_0x10dd22).add(20)), "int", ["pointer"])(_0x10dd22));
    Buffer._setMessageVersion(_0x21bc98, Memory.readInt(_0x10dd22.add(4)));
    libc_send(cache.fd, _0x21bc98, _0x2cb8d4 + 7, 0);
    free(_0x21bc98);
  };
  function _0x54cd39() {
    var _0x3c84db = MessageQueue._dequeue(cache.sendQueue);
    while (_0x3c84db) {
      var _0x56521c = new NativeFunction(Memory.readPointer(Memory.readPointer(_0x3c84db).add(20)), "int", ["pointer"])(_0x3c84db);
      if (_0x56521c === 10100) {
        _0x3c84db = Memory.readPointer(cache.loginMessagePtr);
        Memory.writePointer(cache.loginMessagePtr, ptr(0));
      }
      cache.sendMessage(_0x3c84db);
      _0x3c84db = MessageQueue._dequeue(cache.sendQueue);
    }
  }
  function _0xa07a22() {
    var _0x1819a3 = malloc(7);
    libc_recv(cache.fd, _0x1819a3, 7, 256);
    var _0x264866 = Memory.readU8(_0x1819a3) << 8 | Memory.readU8(_0x1819a3.add(1));
    if (_0x264866 === 20104) {
      Memory.writeInt(cache.state, 5);
      OfflineBattles();
      ColorFull();
      enableDebugInfo();
    }
    var _0x5021dc = Memory.readU8(_0x1819a3.add(2)) << 16 | Memory.readU8(_0x1819a3.add(3)) << 8 | Memory.readU8(_0x1819a3.add(4));
    var _0x74d45b = Memory.readU8(_0x1819a3.add(5)) << 8 | Memory.readU8(_0x1819a3.add(6));
    free(_0x1819a3);
    var _0xba2f2a = malloc(_0x5021dc);
    libc_recv(cache.fd, _0xba2f2a, _0x5021dc, 256);
    var _0x277aed = cache.createMessageByType(cache.messageFactory, _0x264866);
    Message._setVersion(_0x277aed, _0x74d45b);
    var _0x1bd03f = _0x277aed.add(8);
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
    onEnter: function (_0xdfbe9) {
      _0x54cd39();
    }
  });
  Interceptor.attach(Module.findExportByName("libc.so", "select"), {
    onEnter: function (_0x50436a) {
      _0xa07a22();
    }
  });
}
function setup() {
  Interceptor.attach(Module.findExportByName("libc.so", "connect"), {
    onEnter: function (_0x2e293d) {
      if (ntohs(Memory.readU16(_0x2e293d[1].add(2))) === 9339) {
        cache.fd = _0x2e293d[0].toInt32();
        var _0x1c83bb = Memory.allocUtf8String("45.144.65.13");
        var _0x37ffb2 = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
        _0x2e293d[1].add(2).writeU16(_0x37ffb2(7777));
        Memory.writeInt(_0x2e293d[1].add(4), inet_addr(_0x1c83bb));
        setupMessaging();
      }
    }
  });
}
rpc.exports = {
  init: function (_0x192131, _0x4be0ba) {
    setup();
  }
};