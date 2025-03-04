console.log("hi")
const base = Module.findBaseAddress('libg.so')

const Armceptor = {
    ["replace"]: function (addr, replaceBytes) {
        Memory.protect(addr, replaceBytes.length, "rwx")
        addr.writeByteArray(replaceBytes)
        Memory.protect(addr, replaceBytes.length, "rx") // bro
    }
}

const cache = {
    modules: {},
    options: {}
};

const PTHREAD_COND_WAKE_RETURN = 0x80E5A2 + 8 + 1;

const malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
const free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);
const pthread_mutex_lock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_lock'), 'int', ['pointer']);
const pthread_mutex_unlock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']);
const pthread_cond_signal = new NativeFunction(Module.findExportByName('libc.so', 'pthread_cond_signal'), 'int', ['pointer']);
const select = new NativeFunction(Module.findExportByName('libc.so', 'select'), 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']);
const memmove = new NativeFunction(Module.findExportByName('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']);
const ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
const inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
const libc_send = new NativeFunction(Module.findExportByName('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']);
const libc_recv = new NativeFunction(Module.findExportByName('libc.so', 'recv'), 'int', ['int', 'pointer', 'int', 'int']);

const GUIInstance = base.add(0xC86B10)

// edit: removed java but now retarded encode utf8 :sob:
function encodeUtf8(str) {
    const bytes = [];
    for (const char of str) {
        const codePoint = char.codePointAt(0);
        if (codePoint <= 0x7F) {
            bytes.push(codePoint);
        } else if (codePoint <= 0x7FF) {
            bytes.push(0xC0 | (codePoint >> 6));
            bytes.push(0x80 | (codePoint & 0x3F));
        } else if (codePoint <= 0xFFFF) {
            bytes.push(0xE0 | (codePoint >> 12));
            bytes.push(0x80 | ((codePoint >> 6) & 0x3F));
            bytes.push(0x80 | (codePoint & 0x3F));
        } else if (codePoint <= 0x10FFFF) {
            bytes.push(0xF0 | (codePoint >> 18));
            bytes.push(0x80 | ((codePoint >> 12) & 0x3F));
            bytes.push(0x80 | ((codePoint >> 6) & 0x3F));
            bytes.push(0x80 | (codePoint & 0x3F));
        }
    }
    return bytes;
}

// fucking retarded method! WE are TRUE malloc ENJOYERS! no JAVA!
const CreateNewStringObject = (Str) => {
    const charLen = Str.length;
    const encodedStr = encodeUtf8(Str);
    const byteLen = encodedStr.length;

    const StringObjectPtr = malloc(16);
    StringObjectPtr.writeU32(charLen);
    StringObjectPtr.add(4).writeU32(byteLen);

    if (byteLen > 7) {
        const LongStringAllocPtr = malloc(byteLen + 1);
        LongStringAllocPtr.writeByteArray(encodedStr);
        LongStringAllocPtr.add(byteLen).writeU8(0);
        StringObjectPtr.add(8).writePointer(LongStringAllocPtr);
    } else {
        StringObjectPtr.add(8).writeByteArray(encodedStr);
        StringObjectPtr.add(8 + byteLen).writeU8(0);
    }

    console.log(StringObjectPtr);
    return StringObjectPtr;
};

function showFloater(message) {
    message = CreateNewStringObject(message)
    GUI_showFloaterTextAtDefaultPos(GUIInstance.readPointer(), message, 0.0, -1)
    free(message) // memory leak lover :drooling_face:
}

let Message = {
    _getByteStream: function (a) {
        return a.add(8)
    },
    _getVersion: function (a) {
        return Memory.readInt(a.add(4))
    },
    _setVersion: function (a, b) {
        Memory.writeInt(a.add(4), b)
    },
    _getMessageType: function (a) {
        return (new NativeFunction(Memory.readPointer(Memory.readPointer(a).add(20)), 'int', ['pointer']))(a)
    },
    _encode: function (a) {
        (new NativeFunction(Memory.readPointer(Memory.readPointer(a).add(8)), 'void', ['pointer']))(a)
    },
    _decode: function (a) {
        (new NativeFunction(Memory.readPointer(Memory.readPointer(a).add(12)), 'void', ['pointer']))(a)
    },
    _free: function (a) {
        (new NativeFunction(Memory.readPointer(Memory.readPointer(a).add(24)), 'void', ['pointer']))(a);
        (new NativeFunction(Memory.readPointer(Memory.readPointer(a).add(4)), 'void', ['pointer']))(a)
    }
};
let ByteStream = {
    _getOffset: function (a) {
        return Memory.readInt(a.add(16))
    },
    _getByteArray: function (a) {
        return Memory.readPointer(a.add(28))
    },
    _setByteArray: function (a, b) {
        Memory.writePointer(a.add(28), b)
    },
    _getLength: function (a) {
        return Memory.readInt(a.add(20))
    },
    _setLength: function (a, b) {
        Memory.writeInt(a.add(20), b)
    }
};
let Buffer = {
    _getEncodingLength: function (a) {
        return Memory.readU8(a.add(2)) << 16 | Memory.readU8(a.add(3)) << 8 | Memory.readU8(a.add(4))
    },
    _setEncodingLength: function (a, b) {
        Memory.writeU8(a.add(2), b >> 16 & 0xFF);
        Memory.writeU8(a.add(3), b >> 8 & 0xFF);
        Memory.writeU8(a.add(4), b & 0xFF)
    },
    _setMessageType: function (a, b) {
        Memory.writeU8(a.add(0), b >> 8 & 0xFF);
        Memory.writeU8(a.add(1), b & 0xFF)
    },
    _getMessageVersion: function (a) {
        return Memory.readU8(a.add(5)) << 8 | Memory.readU8(a.add(6))
    },
    _setMessageVersion: function (a, b) {
        Memory.writeU8(a.add(5), b >> 8 & 0xFF);
        Memory.writeU8(a.add(6), b & 0xFF)
    },
    _getMessageType: function (a) {
        return Memory.readU8(a) << 8 | Memory.readU8(a.add(1))
    }
};
let MessageQueue = {
    _getCapacity: function (a) {
        return Memory.readInt(a.add(4))
    },
    _get: function (a, b) {
        return Memory.readPointer(Memory.readPointer(a).add(4 * b))
    },
    _set: function (a, b, c) {
        Memory.writePointer(Memory.readPointer(a).add(4 * b), c)
    },
    _count: function (a) {
        return Memory.readInt(a.add(8))
    },
    _decrementCount: function (a) {
        Memory.writeInt(a.add(8), Memory.readInt(a.add(8)) - 1)
    },
    _incrementCount: function (a) {
        Memory.writeInt(a.add(8), Memory.readInt(a.add(8)) + 1)
    },
    _getDequeueIndex: function (a) {
        return Memory.readInt(a.add(12))
    },
    _getEnqueueIndex: function (a) {
        return Memory.readInt(a.add(16))
    },
    _setDequeueIndex: function (a, b) {
        Memory.writeInt(a.add(12), b)
    },
    _setEnqueueIndex: function (a, b) {
        Memory.writeInt(a.add(16), b)
    },
    _enqueue: function (a, b) {
        pthread_mutex_lock(a.sub(4));
        let c = MessageQueue._getEnqueueIndex(a);
        MessageQueue._set(a, c, b);
        MessageQueue._setEnqueueIndex(a, (c + 1) % MessageQueue._getCapacity(a));
        MessageQueue._incrementCount(a);
        pthread_mutex_unlock(a.sub(4))
    },
    _dequeue: function (a) {
        let b = null;
        pthread_mutex_lock(a.sub(4));
        if (MessageQueue._count(a)) {
            let c = MessageQueue._getDequeueIndex(a);
            b = MessageQueue._get(a, c);
            MessageQueue._setDequeueIndex(a, (c + 1) % MessageQueue._getCapacity(a));
            MessageQueue._decrementCount(a)
        }
        pthread_mutex_unlock(a.sub(4));
        return b
    }
};

function OfflineBattles() {
    Interceptor.attach(cache.base.add(0x44CEBC), {
        onLeave(retval) {
            retval.replace(ptr(1))
        }
    });
    Interceptor.replace(base.add(0x5878A0), new NativeCallback(function (LogicBattleModeServer, diff) { // LogicBattleModeServer::setBotDifficulty
        console.log("LogicBattleModeServer::setBotDifficulty has been called!")
        LogicBattleModeServer.add(184).writeInt(9)
        return LogicBattleModeServer
    }, 'pointer', ['pointer', 'int']))
    Interceptor.attach(cache.base.add(0x67FEBC), {
        onEnter: function (a) {
            a[3] = ptr(3)
        }
    })
}

function setupMessaging() {
    cache.base = Process.findModuleByName('libg.so').base;
    cache.pthreadReturn = cache.base.add(PTHREAD_COND_WAKE_RETURN);
    cache.serverConnection = Memory.readPointer(cache.base.add(0xC86D10));
    cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
    cache.recvQueue = cache.messaging.add(60);
    cache.sendQueue = cache.messaging.add(84);
    cache.state = cache.messaging.add(208);
    cache.loginMessagePtr = cache.messaging.add(212);
    cache.createMessageByType = new NativeFunction(cache.base.add(0x4A7EE4), 'pointer', ['pointer', 'int']);
    cache.sendMessage = function (a) {
        Message._encode(a);
        let b = Message._getByteStream(a);
        let c = ByteStream._getOffset(b);
        let d = malloc(c + 7);
        memmove(d.add(7), ByteStream._getByteArray(b), c);
        Buffer._setEncodingLength(d, c);
        Buffer._setMessageType(d, Message._getMessageType(a));
        Buffer._setMessageVersion(d, Message._getVersion(a));
        libc_send(cache.fd, d, c + 7, 0);
        free(d)
    };

    function onWakeup() {
        let a = MessageQueue._dequeue(cache.sendQueue);
        while (a) {
            let b = Message._getMessageType(a);
            if (b === 10100) {
                a = Memory.readPointer(cache.loginMessagePtr);
                Memory.writePointer(cache.loginMessagePtr, ptr(0))
            }
            if (b == 14109) {
                let c = Module.findBaseAddress('lib39285EFA.so');
                let d = new NativeFunction(c.add(0x6FF4), 'int', []);
                d()
            }
            cache.sendMessage(a);
            a = MessageQueue._dequeue(cache.sendQueue)
        }
    }

    function onReceive() {
        let a = malloc(7);
        libc_recv(cache.fd, a, 7, 256);
        let b = Buffer._getMessageType(a);
        if (b === 20104) { // LoginOkMessage
            Memory.writeInt(cache.state, 5);
            OfflineBattles();
            ColorFull();
        }
        let c = Buffer._getEncodingLength(a);
        let d = Buffer._getMessageVersion(a);
        free(a);
        let e = malloc(c);
        libc_recv(cache.fd, e, c, 256);
        let f = cache.createMessageByType(cache.messageFactory, b);
        Message._setVersion(f, d);
        let g = Message._getByteStream(f);
        ByteStream._setLength(g, c);
        if (c) {
            let h = malloc(c);
            memmove(h, e, c);
            ByteStream._setByteArray(g, h)
        }
        Message._decode(f);
        MessageQueue._enqueue(cache.recvQueue, f);
        free(e)
    }
    Interceptor.attach(Module.findExportByName('libc.so', 'pthread_cond_signal'), {
        onEnter: function (a) {
            onWakeup()
        }
    });
    Interceptor.attach(Module.findExportByName('libc.so', 'select'), {
        onEnter: function (a) {
            onReceive()
        }
    })
}

function ColorFull() {
    Interceptor.attach(cache.base.add(0x38C6FC), {
        onEnter(args) {
            args[7] = ptr(1);
        }
    });
}

function setup(b, c) {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
        onEnter: function (a) {
            if (ntohs(Memory.readU16(a[1].add(2))) === 9339) {
                cache.fd = a[0].toInt32();
                Memory.writeInt(a[1].add(4), inet_addr(Memory.allocUtf8String(b)));
                Memory.writeU16(a[1].add(2), ntohs(c));

                setupMessaging()
            }
        }
    })
}

function hacksupermod() {
    const base2 = Module.findBaseAddress('lib39285EFA.so');
    Interceptor.replace(base2.add(0x000C0D0), new NativeCallback(function (a) {
        return 0
    }, 'int', ['int']))
}

function bypass() {
    // should fix most insta-crashes
    Interceptor.replace(base.add(0xB528C), base.add(0x27D01C)) // g_createGameInstance with GameMain::getInstance
    Interceptor.replace(base.add(0x2BFAE0), new NativeCallback(() => { // AntiCheat::getAntihackFlags
        return 0
    }, 'int', []))
    Interceptor.replace(base.add(0x61FE54), new NativeCallback(() => {}, 'void', ['pointer', 'pointer'])) // AntiCheat::guard_callback

    Interceptor.attach(base.add(0x7A3C98), { // titan::com::supercell::titan::GameApp::isSignatureValid
        onLeave(retval) {
            retval.replace(ptr(0x1))
        }
    })

}

function init() {
    bypass()
    setup("127.0.0.1", 9339)
}

init();
