var cache = {
  'modules': {},
  'options': {}
};
const Armceptor = {
  'nop': function (_0x4f02fa) {
    Armceptor.replace(_0x4f02fa, [0x0, 0xf0, 0x20, 0xe3]);
  },
  'replace': function (_0x53c1de, _0x39e589) {
    Memory.protect(_0x53c1de, _0x39e589.length, "rwx");
    _0x53c1de.writeByteArray(_0x39e589);
    Memory.protect(_0x53c1de, _0x39e589.length, 'rx');
  },
  'ret': function (_0x524664) {
    Armceptor.replace(_0x524664, [0x1e, 0xff, 0x2f, 0xe1]);
  },
  'jumpOffset': function (_0x18c531, _0x510f15) {
    Memory.patchCode(_0x18c531, Process.pageSize, function (_0x1ceb81) {
      var _0x1ba324 = new ArmWriter(_0x1ceb81, {
        'pc': _0x18c531
      });
      _0x1ba324.putBImm(_0x510f15);
      _0x1ba324.flush();
    });
  },
  'jumpout': function (_0x2a572b, _0x28ab3f) {
    Memory.patchCode(_0x2a572b, Process.pageSize, function (_0x32efe5) {
      var _0x32ffed = new ArmWriter(_0x32efe5, {
        'pc': _0x2a572b
      });
      _0x32ffed.putBranchAddress(_0x28ab3f);
      _0x32ffed.flush();
    });
  }
};
var malloc = new NativeFunction(Module.findExportByName("libc.so", "malloc"), "pointer", ["int"]);
var free = new NativeFunction(Module.findExportByName("libc.so", "free"), "void", ['pointer']);
var pthread_mutex_lock = new NativeFunction(Module.findExportByName('libc.so', "pthread_mutex_lock"), "int", ["pointer"]);
var pthread_mutex_unlock = new NativeFunction(Module.findExportByName('libc.so', "pthread_mutex_unlock"), "int", ["pointer"]);
var pthread_cond_signal = new NativeFunction(Module.findExportByName("libc.so", "pthread_cond_signal"), 'int', ["pointer"]);
var select = new NativeFunction(Module.findExportByName('libc.so', "select"), 'int', ["int", "pointer", "pointer", "pointer", 
"pointer"]);
var memmove = new NativeFunction(Module.findExportByName("libc.so", "memmove"), "pointer", ['pointer', "pointer", "int"]);
var ntohs = new NativeFunction(Module.findExportByName('libc.so', "ntohs"), 'uint16', ["uint16"]);
var inet_addr = new NativeFunction(Module.findExportByName("libc.so", "inet_addr"), "int", ["pointer"]);
var libc_send = new NativeFunction(Module.findExportByName("libc.so", "send"), 'int', ['int', "pointer", "int", "int"]);
var libc_recv = new NativeFunction(Module.findExportByName("libc.so", "recv"), "int", ['int', "pointer", 'int', "int"]);
const base = Module.findBaseAddress('libg.so');
const addfile = new NativeFunction(base.add(0x520698), "void", ["pointer", "pointer", "int", "int", 'int', "int", "bool"]);
const fGuiContainerCtor = new NativeFunction(base.add(0x69104c), "pointer", ['pointer']);
const setmovieclip = new NativeFunction(base.add(0x53254c), "pointer", ['pointer', 'pointer']);
const getmovieclip = new NativeFunction(base.add(0x10e874), "pointer", ['pointer', "pointer"]);
const stageaddchild = new NativeFunction(base.add(0xfacb4), "void", ["pointer", 'pointer']);
const TextField = new NativeFunction(base.add(0x1a8d10), "pointer", ["pointer", "pointer", 'pointer']);
const StringCtor = new NativeFunction(base.add(0x4c793c), "pointer", ["pointer", "pointer"]);
const buttonctor = new NativeFunction(base.add(0x5f3600), "void", ['pointer']);
const settext = new NativeFunction(base.add(0x8d610), "void", ['pointer', 'pointer']);
const LogicDebugCommand_execute = new NativeFunction(base.add(0x6f2738), "void", ["pointer", "pointer", "int", "bool"]);
const homemode_instance = new NativeFunction(base.add(0x2b4aec), 'pointer', []);
const stopAI = new NativeFunction(base.add(0x1fe2d0), "pointer", ['pointer']);
const battlemode_instance = new NativeFunction(base.add(0x4fcd58), "pointer", []);
const GameMain_update = new NativeFunction(base.add(0x4bd9d4), "void", ["pointer", "float", "float"]);
const MovieClip_getTextFieldByName = new NativeFunction(base.add(0x426da4), "pointer", ["pointer", "pointer"]);
const TextField_setText1 = new NativeFunction(base.add(0x26691c), "pointer", ["pointer", "pointer"]);
Interceptor.attach(base.add(0x383728), {
  'onEnter'(_0x388184) {
    console.error("error");
  }
});
String.prototype.ptr = function () {
  return Memory.allocUtf8String(this);
};
String.prototype.scptr = function () {
  let _0x3641a0 = malloc(0x14);
  StringCtor(_0x3641a0, this.ptr());
  return _0x3641a0;
};
var Message = {
  '_getByteStream': function (_0x412427) {
    return _0x412427.add(0x8);
  },
  '_getVersion': function (_0x3a7ff3) {
    return Memory.readInt(_0x3a7ff3.add(0x4));
  },
  '_setVersion': function (_0x3e45de, _0x4ad467) {
    try {
      Memory.writeInt(_0x3e45de.add(0x4), _0x4ad467);
    } catch (_0x450e58) {}
  },
  '_getMessageType': function (_0x39f604) {
    return new NativeFunction(Memory.readPointer(Memory.readPointer(_0x39f604).add(0x14)), 'int', ["pointer"])(_0x39f604);
  },
  '_encode': function (_0x4c0239) {
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0x4c0239).add(0x8)), "void", ["pointer"])(_0x4c0239);
  },
  '_decode': function (_0xbdaa72) {
    try {
      new NativeFunction(Memory.readPointer(Memory.readPointer(_0xbdaa72).add(0xc)), 'void', ["pointer"])(_0xbdaa72);
    } catch (_0xb07dfb) {}
  },
  '_free': function (_0x4b5ec6) {
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0x4b5ec6).add(0x18)), "void", ["pointer"])(_0x4b5ec6);
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0x4b5ec6).add(0x4)), "void", ["pointer"])(_0x4b5ec6);
  }
};
var ByteStream = {
  '_getOffset': function (_0xd0efbd) {
    return Memory.readInt(_0xd0efbd.add(0x10));
  },
  '_getByteArray': function (_0x2d9ebd) {
    return Memory.readPointer(_0x2d9ebd.add(0x1c));
  },
  '_setByteArray': function (_0x4ed0f2, _0x44f006) {
    try {
      Memory.writePointer(_0x4ed0f2.add(0x1c), _0x44f006);
    } catch (_0x78c44) {}
  },
  '_getLength': function (_0x139386) {
    return Memory.readInt(_0x139386.add(0x14));
  },
  '_setLength': function (_0x215919, _0x3560bf) {
    try {
      Memory.writeInt(_0x215919.add(0x14), _0x3560bf);
    } catch (_0xe848db) {}
  }
};
var Buffer = {
  '_getEncodingLength': function (_0x140b7b) {
    return Memory.readU8(_0x140b7b.add(0x2)) << 0x10 | Memory.readU8(_0x140b7b.add(0x3)) << 0x8 | Memory.readU8(_0x140b7b.add(0x4));
  },
  '_setEncodingLength': function (_0x3fcf69, _0x43b97d) {
    Memory.writeU8(_0x3fcf69.add(0x2), _0x43b97d >> 0x10 & 0xff);
    Memory.writeU8(_0x3fcf69.add(0x3), _0x43b97d >> 0x8 & 0xff);
    Memory.writeU8(_0x3fcf69.add(0x4), _0x43b97d & 0xff);
  },
  '_setMessageType': function (_0x32fb2d, _0x4b8325) {
    Memory.writeU8(_0x32fb2d.add(0x0), _0x4b8325 >> 0x8 & 0xff);
    Memory.writeU8(_0x32fb2d.add(0x1), _0x4b8325 & 0xff);
  },
  '_getMessageVersion': function (_0x2aeeff) {
    return Memory.readU8(_0x2aeeff.add(0x5)) << 0x8 | Memory.readU8(_0x2aeeff.add(0x6));
  },
  '_setMessageVersion': function (_0x565400, _0x121cfc) {
    Memory.writeU8(_0x565400.add(0x5), _0x121cfc >> 0x8 & 0xff);
    Memory.writeU8(_0x565400.add(0x6), _0x121cfc & 0xff);
  },
  '_getMessageType': function (_0x8200a2) {
    return Memory.readU8(_0x8200a2) << 0x8 | Memory.readU8(_0x8200a2.add(0x1));
  }
};
var MessageQueue = {
  '_getCapacity': function (_0x17044b) {
    return Memory.readInt(_0x17044b.add(0x4));
  },
  '_get': function (_0x220d99, _0x5263c5) {
    return Memory.readPointer(Memory.readPointer(_0x220d99).add(0x4 * _0x5263c5));
  },
  '_set': function (_0x583bff, _0x1620a8, _0x379fc0) {
    Memory.writePointer(Memory.readPointer(_0x583bff).add(0x4 * _0x1620a8), _0x379fc0);
  },
  '_count': function (_0x4028bd) {
    return Memory.readInt(_0x4028bd.add(0x8));
  },
  '_decrementCount': function (_0x2e8711) {
    Memory.writeInt(_0x2e8711.add(0x8), Memory.readInt(_0x2e8711.add(0x8)) - 0x1);
  },
  '_incrementCount': function (_0x51cfde) {
    Memory.writeInt(_0x51cfde.add(0x8), Memory.readInt(_0x51cfde.add(0x8)) + 0x1);
  },
  '_getDequeueIndex': function (_0x28763e) {
    return Memory.readInt(_0x28763e.add(0xc));
  },
  '_getEnqueueIndex': function (_0x27445f) {
    return Memory.readInt(_0x27445f.add(0x10));
  },
  '_setDequeueIndex': function (_0xbc92a3, _0x340ef1) {
    Memory.writeInt(_0xbc92a3.add(0xc), _0x340ef1);
  },
  '_setEnqueueIndex': function (_0x3c211e, _0x573b5b) {
    Memory.writeInt(_0x3c211e.add(0x10), _0x573b5b);
  },
  '_enqueue': function (_0x440ca2, _0x419cee) {
    pthread_mutex_lock(_0x440ca2.sub(0x4));
    var _0x99cbd8 = Memory.readInt(_0x440ca2.add(0x10));
    MessageQueue._set(_0x440ca2, _0x99cbd8, _0x419cee);
    MessageQueue._setEnqueueIndex(_0x440ca2, (_0x99cbd8 + 0x1) % Memory.readInt(_0x440ca2.add(0x4)));
    MessageQueue._incrementCount(_0x440ca2);
    pthread_mutex_unlock(_0x440ca2.sub(0x4));
  },
  '_dequeue': function (_0x7018d6) {
    var _0x445362 = null;
    pthread_mutex_lock(_0x7018d6.sub(0x4));
    if (Memory.readInt(_0x7018d6.add(0x8))) {
      var _0x1dd0ae = Memory.readInt(_0x7018d6.add(0xc));
      _0x445362 = Memory.readPointer(Memory.readPointer(_0x7018d6).add(0x4 * _0x1dd0ae));
      MessageQueue._setDequeueIndex(_0x7018d6, (_0x1dd0ae + 0x1) % Memory.readInt(_0x7018d6.add(0x4)));
      MessageQueue._decrementCount(_0x7018d6);
    }
    pthread_mutex_unlock(_0x7018d6.sub(0x4));
    return _0x445362;
  }
};
function GetIngameFPS(_0x66a31a) {
  let _0x44da32 = 0x0;
  let _0x4d19f2 = base.add(0xc86d98).readPointer();
  let _0x58131e = _0x4d19f2.add(0x1e0).readInt();
  if (_0x58131e > 0x0) {
    let _0x353044 = _0x4d19f2.add(0x1dc).readFloat();
    _0x44da32 = _0x353044 / _0x58131e;
  }
  return _0x44da32.toFixed(_0x66a31a);
}
function setupMessaging() {
  cache.base = Module.findBaseAddress('libg.so');
  cache.sett = 0x1;
  console.log('Base');
  cache.pthreadReturn = cache.base.add(8447403);
  cache.serverConnection = Memory.readPointer(cache.base.add(0xc86d10));
  cache.messaging = Memory.readPointer(cache.serverConnection.add(0x4));
  console.log(cache.messaging);
  cache.messageFactory = Memory.readPointer(cache.messaging.add(0x34));
  console.log(cache.messageFactory);
  cache.recvQueue = cache.messaging.add(0x3c);
  cache.sendQueue = cache.messaging.add(0x54);
  cache.state = cache.messaging.add(0xd0);
  cache.loginMessagePtr = cache.messaging.add(0xd4);
  cache.createMessageByType = new NativeFunction(cache.base.add(0x4a7ee4), 'pointer', ['pointer', "int"]);
  console.log(Memory.readByteArray(cache.serverConnection, 0x28));
  console.log(Memory.readByteArray(cache.messaging, 0x28));
  console.log(cache.messaging);
  cache.sendMessage = function (_0x1eb1a0) {
    Message._encode(_0x1eb1a0);
    var _0x2bbc5d = _0x1eb1a0.add(0x8);
    var _0x477c2e = Memory.readInt(_0x2bbc5d.add(0x10));
    var _0x44cf21 = malloc(_0x477c2e + 0x7);
    memmove(_0x44cf21.add(0x7), Memory.readPointer(_0x2bbc5d.add(0x1c)), _0x477c2e);
    Buffer._setEncodingLength(_0x44cf21, _0x477c2e);
    Buffer._setMessageType(_0x44cf21, new NativeFunction(Memory.readPointer(Memory.readPointer(_0x1eb1a0).add(0x14)), 'int', 
["pointer"])(_0x1eb1a0));
    Buffer._setMessageVersion(_0x44cf21, Memory.readInt(_0x1eb1a0.add(0x4)));
    libc_send(cache.fd, _0x44cf21, _0x477c2e + 0x7, 0x0);
    free(_0x44cf21);
  };
  function _0x5ce467() {
    var _0x1c3a23 = MessageQueue._dequeue(cache.sendQueue);
    while (_0x1c3a23) {
      var _0x54fb3a = new NativeFunction(Memory.readPointer(Memory.readPointer(_0x1c3a23).add(0x14)), 'int', ["pointer"])(_0x1c3a23);
      console.log(_0x54fb3a);
      if (_0x54fb3a === 0x2774) {
        _0x1c3a23 = Memory.readPointer(cache.loginMessagePtr);
        Memory.writePointer(cache.loginMessagePtr, ptr(0x0));
      }
      cache.sendMessage(_0x1c3a23);
      _0x1c3a23 = MessageQueue._dequeue(cache.sendQueue);
    }
  }
  ;
  function _0x36d223() {
    var _0x5ba4e4 = malloc(0x7);
    libc_recv(cache.fd, _0x5ba4e4, 0x7, 0x100);
    var _0x4339e9 = Memory.readU8(_0x5ba4e4) << 0x8 | Memory.readU8(_0x5ba4e4.add(0x1));
    if (_0x4339e9 > 0x4e20 && _0x4339e9 < 0x7530) {
      var _0x56dbb5 = Memory.readU8(_0x5ba4e4.add(0x2)) << 0x10 | Memory.readU8(_0x5ba4e4.add(0x3)) << 0x8 | 
Memory.readU8(_0x5ba4e4.add(0x4));
      var _0x333297 = Memory.readU8(_0x5ba4e4.add(0x5)) << 0x8 | Memory.readU8(_0x5ba4e4.add(0x6));
      free(_0x5ba4e4);
      var _0xbf6411 = malloc(_0x56dbb5);
      libc_recv(cache.fd, _0xbf6411, _0x56dbb5, 0x100);
      var _0x3bb22e = cache.createMessageByType(cache.messageFactory, _0x4339e9);
      Message._setVersion(_0x3bb22e, _0x333297);
      var _0x3b4e88 = _0x3bb22e.add(0x8);
      ByteStream._setLength(_0x3b4e88, _0x56dbb5);
      if (_0x56dbb5) {
        var _0x5e3669 = malloc(_0x56dbb5);
        memmove(_0x5e3669, _0xbf6411, _0x56dbb5);
        ByteStream._setByteArray(_0x3b4e88, _0x5e3669);
      }
      Message._decode(_0x3bb22e);
      MessageQueue._enqueue(cache.recvQueue, _0x3bb22e);
      if (_0x4339e9 === 0x4e88) {
        Memory.writeInt(cache.state, 0x5);
        DebugMenuText();
        stageaddchild(base.add(0xc87358).readPointer(), cache.debugMenuText);
        updater();
        Interceptor.attach(cache.base.add(0x38c6fc), {
          'onEnter'(_0x1178ba) {
            _0x1178ba[0x7] = ptr(0x1);
          }
        });
        Interceptor.attach(cache.base.add(0x67febc), {
          'onEnter': function (_0x44e8c3) {
            _0x44e8c3[0x3] = ptr(0x3);
          }
        });
      }
      free(_0xbf6411);
    }
  }
  ;
  Interceptor.attach(Module.findExportByName("libc.so", 'pthread_cond_signal'), {
    'onEnter': function (_0xa6851e) {
      _0x5ce467();
    }
  });
  Interceptor.attach(Module.findExportByName("libc.so", "select"), {
    'onEnter': function (_0x37b127) {
      _0x36d223();
    }
  });
}
function sendDebugAction(_0x3c73cc, _0x9a5bfe) {
  var _0x1e8cd0 = malloc(11);
  Buffer._setEncodingLength(_0x1e8cd0, 0x4);
  Buffer._setMessageType(_0x1e8cd0, 0x2904);
  Buffer._setMessageVersion(_0x1e8cd0, 0x0);
  _0x1e8cd0.add(0x7).writeInt(_0x3c73cc);
  libc_send(cache.fd, _0x1e8cd0, 18, 0x0);
  free(_0x1e8cd0);
}
const ResourceLoader = {
  'addFile'(_0x3c78b5) {
    var _0x28990c = Interceptor.attach(base.add(0x520698), {
      'onEnter'(_0x22f274) {
        _0x28990c.detach();
        addfile(_0x22f274[0x0], Memory.allocUtf8String(_0x3c78b5), -0x1, -0x1, -0x1, -0x1, 0x0);
        console.log("ResourceLoader::addFile - sc file with name " + _0x3c78b5 + " loaded!");
      }
    });
  }
};
const Stage = {
  'getInstance'() {
    return base.add(0xc87358).readPointer();
  }
};
const HomeMode = {
  'getInstance'() {
    return homemode_instance();
  }
};
function DebugCommandManager(_0x5ba143, _0x256f7f) {
  var _0x5950ef = homemode_instance();
  console.log("instance: " + _0x5950ef);
  var _0x1da17d = malloc(0x96);
  _0x1da17d.add(0x18).writeInt(_0x5ba143);
  _0x1da17d.add(0x1c).writeInt(_0x256f7f);
  _0x1da17d.add(0x20).writeByteArray('tojoko'.scptr().readByteArray(0x10));
  LogicDebugCommand_execute(_0x1da17d, _0x5950ef.add(0x1c).readPointer(), 0x3, 0x0);
  free(_0x1da17d);
}
function strPtr(_0x173e78) {
  var _0x477643 = malloc(_0x173e78.length + 0x1);
  Memory.writeUtf8String(_0x477643, _0x173e78);
  return _0x477643;
}
function createStringObject(_0x54a681) {
  var _0x5db839 = strPtr(_0x54a681);
  let _0x335da2 = malloc(0x80);
  StringCtor(_0x335da2, _0x5db839);
  return _0x335da2;
}
function updater() {
  Interceptor.replace(base.add(0x4bd9d4), new NativeCallback(function (_0x1f30e3, _0x27f532, _0x3f800c) {
    new NativeFunction(base.add(0x4bd9d4), "void", ["pointer", 'float', "float"])(base.add(0xc86d98).readPointer(), _0x27f532, 
_0x3f800c);
    let _0x2fe3df = GetIngameFPS(0x1);
    let _0x2dd5f5 = "FPS: <c3>" + _0x2fe3df + '</c>';
    TextField_setText1(cache.debugMenuText, createStringObject(_0x2dd5f5));
    if (cache.DebugMenu) {
      cache.DebugMenu.update(0x14);
    }
  }, 'void', ['pointer', 'float', "float"]));
}
function DebugMenuText() {
  let _0x105c0b = new NativeFunction(base.add(0x10e874), "pointer", ["pointer", 'pointer', 'bool'])("sc/debug.sc".ptr(), 
"debug_menu_text".ptr(), 0x1);
  cache.debugMenuText = MovieClip_getTextFieldByName(_0x105c0b, "Text".ptr());
  cache.debugMenuText.add(0x1c).writeFloat(0xa);
  cache.debugMenuText.add(0x20).writeFloat(0xa);
  cache.debugMenuText.add(0x18).writeFloat(0x1);
  cache.debugMenuText.add(0xc).writeFloat(0x1);
  TextField_setText1(cache.debugMenuText, createStringObject("FPS: "));
}
const CLIENT_SECRET_KEY = [0xbb, 0x14, 0xd6, 0xfd, 0x2b, 0x7c, 0x98, 0x23, 0xea, 0xed, 0xb4, 0x33, 0x8c, 0xb7, 0x23, 0x7f, 0x61, 0xe4, 
0x22, 0xd2, 0x3c, 0x49, 0x77, 0xf7, 0x4a, 0xda, 0x5, 0x27, 0x2, 0xc0, 0xc6, 0x2d];
const EncryptionPatcher = {
  'init'() {
    Interceptor.attach(base.add(0x262194), {
      'onEnter'(_0x372091) {
        this.buffer = _0x372091[0x0];
        console.log(_0x372091[0x0]);
      },
      'onLeave'(_0x5188c3) {
        console.log("client secret replaced");
      }
    });
  }
};
function setup() {
  Interceptor.attach(Module.findExportByName('libc.so', "connect"), {
    'onEnter': function (_0x28c80e) {
      if (ntohs(Memory.readU16(_0x28c80e[0x1].add(0x2))) === 0x247b) {
        cache.fd = _0x28c80e[0x0].toInt32();
        var _0x387777 = Memory.allocUtf8String('178.250.187.45');
        var _0x25832e = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
        _0x28c80e[0x1].add(0x2).writeU16(_0x25832e(0x24e9));
        Memory.writeInt(_0x28c80e[0x1].add(0x4), inet_addr(_0x387777));
        setupMessaging();
      }
    }
  });
}
const ArxanKiller = {
  'init'() {
    Interceptor.attach(base.add(0x5acc7c), function () {
      this.context.r1 = 0xe4;
      this.context.r2 = 0xe4;
    });
    Armceptor.replace(base.add(0x1347b8), [0xf2, 0x3, 0x0, 0xea]);
    Armceptor.replace(base.add(0x61716c), [0x0, 0xf0, 0x20, 0xe3]);
  }
};
rpc.exports = {
  'init': function (_0x1d7da0, _0x53b91c) {
    cache.options = _0x53b91c || {};
    Interceptor.detachAll();
    ResourceLoader.addFile('sc/debug.sc');
    setup();
  }
};