var cache = {
  modules: {},
  options: {}
};

const base = Process.findModuleByName("libg.so").base;
const WAKEUP_RETURN_ARRAY = [0x889AC, 0x122AF8, 0x1A29D0, 0x49D004, 0x52BDB0, 0x53EFB4];
var Login = 0;
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
var Message = {
  _getByteStream: function(e) {
      return e.add(8);
  },
  _getVersion: function(e) {
      return Memory.readInt(e.add(4));
  },
  _setVersion: function(e, t) {
      Memory.writeInt(e.add(4), t);
  },
  _getMessageType: function(e) {
      return new NativeFunction(Memory.readPointer(Memory.readPointer(e).add(20)), "int", ["pointer"])(e);
  },
  _encode: function(e) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(e).add(8)), "void", ["pointer"])(e);
  },
  _decode: function(e) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(e).add(12)), "void", ["pointer"])(e);
  },
  _free: function(e) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(e).add(24)), "void", ["pointer"])(e);
      new NativeFunction(Memory.readPointer(Memory.readPointer(e).add(4)), "void", ["pointer"])(e);
  }
};
var ByteStream = {
  _getOffset: function(e) {
      return Memory.readInt(e.add(16));
  },
  _getByteArray: function(e) {
      return Memory.readPointer(e.add(28));
  },
  _setByteArray: function(e, t) {
      Memory.writePointer(e.add(28), t);
  },
  _getLength: function(e) {
      return Memory.readInt(e.add(20));
  },
  _setLength: function(e, t) {
      Memory.writeInt(e.add(20), t);
  }
};
var Buffer = {
  _getEncodingLength: function(e) {
      return Memory.readU8(e.add(2)) << 16 | Memory.readU8(e.add(3)) << 8 | Memory.readU8(e.add(4));
  },
  _setEncodingLength: function(e, t, n) {
      Memory.writeU8(e.add(2), t >> 16 & 255 ^ n[2]);
      Memory.writeU8(e.add(3), t >> 8 & 255 ^ n[3]);
      Memory.writeU8(e.add(4), 255 & t ^ n[4]);
  },
  _setMessageType: function(e, t, n) {
      Memory.writeU8(e.add(0), t >> 8 & 255 ^ n[0]);
      Memory.writeU8(e.add(1), 255 & t ^ n[1]);
  },
  _getMessageVersion: function(e) {
      return Memory.readU8(e.add(5)) << 8 | Memory.readU8(e.add(6));
  },
  _setMessageVersion: function(e, t, n) {
      Memory.writeU8(e.add(5), t >> 8 & 255 ^ n[5]);
      Memory.writeU8(e.add(6), 255 & t ^ n[6]);
  },
  _getMessageType: function(e) {
      return Memory.readU8(e) << 8 | Memory.readU8(e.add(1));
  }
};
var MessageQueue = {
  _getCapacity: function(e) {
      return Memory.readInt(e.add(4));
  },
  _get: function(e, t) {
      return Memory.readPointer(Memory.readPointer(e).add(4 * t));
  },
  _set: function(e, t, n) {
      Memory.writePointer(Memory.readPointer(e).add(4 * t), n);
  },
  _count: function(e) {
      return Memory.readInt(e.add(8));
  },
  _decrementCount: function(e) {
      Memory.writeInt(e.add(8), Memory.readInt(e.add(8)) - 1);
  },
  _incrementCount: function(e) {
      Memory.writeInt(e.add(8), Memory.readInt(e.add(8)) + 1);
  },
  _getDequeueIndex: function(e) {
      return Memory.readInt(e.add(12));
  },
  _getEnqueueIndex: function(e) {
      return Memory.readInt(e.add(16));
  },
  _setDequeueIndex: function(e, t) {
      Memory.writeInt(e.add(12), t);
  },
  _setEnqueueIndex: function(e, t) {
      Memory.writeInt(e.add(16), t);
  },
  _enqueue: function(e, t) {
      pthread_mutex_lock(e.sub(4));
      var r = MessageQueue._getEnqueueIndex(e);
      MessageQueue._set(e, r, t);
      MessageQueue._setEnqueueIndex(e, (r + 1) % MessageQueue._getCapacity(e));
      MessageQueue._incrementCount(e);
      pthread_mutex_unlock(e.sub(4));
  },
  _dequeue: function(e) {
      var t;
      var r = null;
      pthread_mutex_lock(e.sub(4));
      if (MessageQueue.count(e)) {
          t = MessageQueue._getDequeueIndex(e);
          r = Memory.readPointer(Memory.readPointer(e).add(4 * t));
          MessageQueue._setDequeueIndex(e, (t + 1) % MessageQueue._getCapacity(e));
          MessageQueue._decrementCount(e);
      }
      pthread_mutex_unlock(e.sub(4));
      return r;
  }
};

function battles() {
  Interceptor.attach(base.add(0x258964), {
      onEnter(args) {
          args[3] = ptr(3);
      }
  });
}

function gradient() {
  Interceptor.attach(Module.findBaseAddress("libg.so").add(0x4A9B08), {
      onEnter: function(args) {
          args[7] = ptr(1);
      }
  });
}

function enableDebugInfo() {
  var t = base.add(0x40D908);
  var n = base.add(0xBAEB8);
  Memory.protect(t, 1, "rwx");
  Memory.protect(n, 1, "rwx");
  if (1 !== t.readU8()) {
      t.writeU8(1);
  }
  if (0 !== n.readU8()) {
      n.writeU8(0);
  }
}

function setupMessaging() {
  cache.wakeUpReturnArray = [];
  for (var e = 0; e < WAKEUP_RETURN_ARRAY.length; e += 1) {
      cache.wakeUpReturnArray.push(base.add(WAKEUP_RETURN_ARRAY[e]));
  }
  cache.pthreadReturn = base.add(0x6108B3);
  cache.selectReturn = base.add(0xB7060);
  cache.serverConnection = Memory.readPointer(base.add(0xA2B454));
  cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
  cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
  cache.recvQueue = cache.messaging.add(60);
  cache.sendQueue = cache.messaging.add(84);
  cache.state = cache.messaging.add(212);
  cache.loginMessagePtr = cache.messaging.add(216);
  cache.createMessageByType = new NativeFunction(base.add(0x14161C), "pointer", ["pointer", "int"]);
  cache.sendMessage = function(e) {
      Message._encode(e);
      var n = e.add(8);
      var r = [0x6E, 0x6F, 0x73, 0x74, 0x65, 0x61, 0x6D]; // nosteam
      var a = ByteStream._getOffset(n);
      var o = malloc(a + 7);
      memmove(o.add(7), Memory.readPointer(n.add(28)), a);
      Buffer._setEncodingLength(o, a, r);
      Buffer._setMessageType(o, Message._getMessageType(e), r);
      Buffer._setMessageVersion(o, Message._getVersion(e), r);
      libc_send(cache.fd, o, a + 7, 0);
      free(o);
  };
  Interceptor.replace(Module.findExportByName("libc.so", "pthread_cond_signal"), new NativeCallback(function(e) {
      if (this.returnAddress.equals(cache.pthreadReturn)) {
          var n = Memory.readPointer(this.context.sp.add(4));
          for (var r = 0; r < cache.wakeUpReturnArray.length; r += 1) {
              if (n.equals(cache.wakeUpReturnArray[r])) {
                  console.log("WAKE UP!!");
                  o = console.log("WAKE UP!!");
                  for (undefined; o;) {
                      var o;
                      var d = Message._getMessageType(o);
                      console.log(d);
                      if (10100 === d) {
                          o = Memory.readPointer(cache.loginMessagePtr);
                          Memory.writePointer(cache.loginMessagePtr, ptr(0));
                          Login = 1;
                      }
                      cache.sendMessage(o);
                      o = MessageQueue._dequeue(cache.sendQueue);
                  }
                  return 0;
              }
          }
      }
      return pthread_cond_signal(e);
  }, "int", ["pointer"]));
  Interceptor.replace(Module.findExportByName("libc.so", "select"), new NativeCallback(function(e, n, r, a) {
      if (this.returnAddress.equals(cache.selectReturn)) {
          n = malloc(7);
          libc_recv(cache.fd, n, 7, 256);
          const messageType = Buffer._getMessageType(n)
          if (2e4 <= messageType) {
              if (20104 === messageType) {
                  Memory.writeInt(cache.state, 5);
                  gradient();
              }
              a = Buffer._getEncodingLength(n);
              d = Buffer._getMessageVersion(n);
              free(n);
              n = malloc(a);
              libc_recv(cache.fd, n, a, 256);
              r = cache.createMessageByType(cache.messageFactory, r);
              Message._setVersion(r, d);
              d = Message._getByteStream(r);
              ByteStream._setLength(d, a);
              if (a) {
                  o = malloc(a);
                  memmove(o, n, a);
                  ByteStream._setByteArray(d, o);
              }
              Message._decode(r);
              MessageQueue._enqueue(cache.recvQueue, r);
              free(n);
          }
      }
      return e;
  }, "int", ["int", "pointer", "pointer", "pointer", "pointer"]));
}
Interceptor.attach(Module.findExportByName("libc.so", "connect"), {
  onEnter: function(args) {
      var t;
      if (9339 === ntohs(Memory.readU16(args[1].add(2)))) {
          cache.fd = args[0].toInt32();
          t = Memory.allocUtf8String("130.61.171.108");
          Memory.writeInt(args[1].add(4), inet_addr(t));
          Memory.writeU16(args[1].add(2), ntohs(9334));
          setupMessaging();
      }
  }
});