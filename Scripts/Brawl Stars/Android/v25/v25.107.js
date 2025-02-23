var cache = {
    modules: {},
    options: {}
};
var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
var free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);
var pthread_mutex_lock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_lock'), 'int', ['pointer']);
var pthread_mutex_unlock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']);
var pthread_cond_signal = new NativeFunction(Module.findExportByName('libc.so', 'pthread_cond_signal'), 'int', ['pointer']);
var select = new NativeFunction(Module.findExportByName('libc.so', 'select'), 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']);
var memmove = new NativeFunction(Module.findExportByName('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']);
var ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
var inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
var libc_send = new NativeFunction(Module.findExportByName('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']);
var libc_recv = new NativeFunction(Module.findExportByName('libc.so', 'recv'), 'int', ['int', 'pointer', 'int', 'int']);
const SERVER_CONNECTION = 0xB883F0;
const PTHREAD_COND_WAKE_RETURN = 0x7525FA + 8 + 1;
const CREATE_MESSAGE_BY_TYPE = 0x89484;
const NEW_OPERATOR = 0x7727AC + 1;
const WAKEUP_RETURN_ARRAY = [0x94CC4, 0xCCB18, 0x175E64, 0x36C138, 0x3b806C, 0x3E5058];
const SELECT_RETURN = 0x2DD1F4;
const START_GAME = 0x52A1A8;
const IS_PROD = 0x580038;
const IS_STAGE = 0x19AFB8;
//const IS_DEV = 0x2451B8;
//const IS_INTEGRATION = 0x2E86E8;
function onLoad(name, callback) {
    Java.perform(function() {
        var Runtime = Java.use('java.lang.Runtime');
        var VMStack = Java.use('dalvik.system.VMStack');
        Java.use('java.lang.System').loadLibrary.overload('java.lang.String').implementation = function(library) {
            try {
                if (Runtime.getRuntime().loadLibrary0) {
                    Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(), library);
                } else {
                    Runtime.getRuntime().loadLibrary(library, VMStack.getCallingClassLoader());
                }
                if(name === 'lib' + library + '.so') {
                    callback();
                }
            } catch(error) {
            }
        };
    });
}
var Message = {
    _getByteStream: function(message) {
        return message.add(8);
    },
    _getVersion: function(message) {
        return Memory.readInt(message.add(4));
    },
    _setVersion: function(message, version) {
        Memory.writeInt(message.add(4), version);
    },
    _getMessageType: function(message) {
        return (new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(20)), 'int', ['pointer']))(message);
    },
    _encode: function(message) {
        (new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(8)), 'void', ['pointer']))(message);
    },
    _decode: function(message) {
        (new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(12)), 'void', ['pointer']))(message);
    },
    _free: function(message) {
        (new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(24)), 'void', ['pointer']))(message);
        (new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(4)), 'void', ['pointer']))(message);
    }
};
var ByteStream = {
    _getOffset: function(byteStream) {
        return Memory.readInt(byteStream.add(16));
    },
    _getByteArray: function(byteStream) {
        return Memory.readPointer(byteStream.add(28));
    },
    _setByteArray: function(byteStream, array) {
        Memory.writePointer(byteStream.add(28), array);
    },
    _getLength: function(byteStream) {
        return Memory.readInt(byteStream.add(20));
    },
    _setLength: function(byteStream, length) {
        Memory.writeInt(byteStream.add(20), length);
    }
};
var Buffer = {
    _getEncodingLength: function(buffer) {
        return Memory.readU8(buffer.add(2)) << 16 | Memory.readU8(buffer.add(3)) << 8 | Memory.readU8(buffer.add(4));
    },
    _setEncodingLength: function(buffer, length) {
        Memory.writeU8(buffer.add(2), length >> 16 & 0xFF);
        Memory.writeU8(buffer.add(3), length >> 8 & 0xFF);
        Memory.writeU8(buffer.add(4), length & 0xFF);
    },
    _setMessageType: function(buffer, type) {
        Memory.writeU8(buffer.add(0), type >> 8 & 0xFF);
        Memory.writeU8(buffer.add(1), type & 0xFF);
    },
    _getMessageVersion: function(buffer) {
        return Memory.readU8(buffer.add(5)) << 8 | Memory.readU8(buffer.add(6));
    },
    _setMessageVersion: function(buffer, version) {
        Memory.writeU8(buffer.add(5), version >> 8 & 0xFF);
        Memory.writeU8(buffer.add(6), version & 0xFF);
    },
    _getMessageType: function(buffer) {
        return Memory.readU8(buffer) << 8 | Memory.readU8(buffer.add(1));
    }
};
var MessageQueue = {
    _getCapacity: function(queue) {
        return Memory.readInt(queue.add(4));
    },
    _get: function(queue, index) {
        return Memory.readPointer(Memory.readPointer(queue).add(4 * index));
    },
    _set: function(queue, index, message) {
        Memory.writePointer(Memory.readPointer(queue).add(4 * index), message);
    },
    _count: function(queue) {
        return Memory.readInt(queue.add(8));
    },
    _decrementCount: function(queue) {
        Memory.writeInt(queue.add(8), Memory.readInt(queue.add(8)) - 1);
    },
    _incrementCount: function(queue) {
        Memory.writeInt(queue.add(8), Memory.readInt(queue.add(8)) + 1);
    },
    _getDequeueIndex: function(queue) {
        return Memory.readInt(queue.add(12));
    },
    _getEnqueueIndex: function(queue) {
        return Memory.readInt(queue.add(16));
    },
    _setDequeueIndex: function(queue, index) {
        Memory.writeInt(queue.add(12), index);
    },
    _setEnqueueIndex: function(queue, index) {
        Memory.writeInt(queue.add(16), index);
    },
    _enqueue: function(queue, message) {
        pthread_mutex_lock(queue.sub(4));
        var index = MessageQueue._getEnqueueIndex(queue);
        MessageQueue._set(queue, index, message);
        MessageQueue._setEnqueueIndex(queue, (index + 1) % MessageQueue._getCapacity(queue));
        MessageQueue._incrementCount(queue);
        pthread_mutex_unlock(queue.sub(4));
    },
    _dequeue: function(queue) {
        var message = null;
        pthread_mutex_lock(queue.sub(4));
        if (MessageQueue._count(queue)) {
            var index = MessageQueue._getDequeueIndex(queue);
            message = MessageQueue._get(queue, index);
            MessageQueue._setDequeueIndex(queue, (index + 1) % MessageQueue._getCapacity(queue));
            MessageQueue._decrementCount(queue);
        }
        pthread_mutex_unlock(queue.sub(4));
        return message;
    }
};
function toast(text) {	
    Java.perform(function() {
        Java.scheduleOnMainThread(function() {
                Java.use("android.widget.Toast").makeText(Java.use('android.app.ActivityThread').currentApplication().getApplicationContext(), Java.use("java.lang.String").$new(text), 1).show();
        });
    });
}
function misc() {
    Interceptor.attach(cache.base.add(START_GAME), {
        onEnter(args) {
            args[3] = ptr(3);
        }
    });
    Interceptor.replace(cache.base.add(IS_PROD), new NativeCallback(function() {
        return 0;
    }, 'void', []));
    Interceptor.replace(cache.base.add(IS_STAGE), new NativeCallback(function() {
        return 1;
    }, 'void', []));
}
function setup() {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
        onEnter: function(args) {
        if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
            cache.fd = args[0].toInt32();
            Memory.writeU16(args[1].add(2), ntohs(9338));
            Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String("84.252.74.157")));
            setupMessaging();
            }
        }
    });
}
function setupMessaging() {
    cache.pthreadReturn = cache.base.add(PTHREAD_COND_WAKE_RETURN);
    cache.wakeUpReturnArray = [];
    for (var i = 0; i < WAKEUP_RETURN_ARRAY.length; i += 1) {
        cache.wakeUpReturnArray.push(cache.base.add(WAKEUP_RETURN_ARRAY[i]));
    }
    cache.serverConnection = Memory.readPointer(cache.base.add(SERVER_CONNECTION));
    cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
    cache.recvQueue = cache.messaging.add(60);
    cache.sendQueue = cache.messaging.add(84);
    cache.state = cache.messaging.add(208);
    cache.loginMessagePtr = cache.messaging.add(212);
    cache.createMessageByType = new NativeFunction(cache.base.add(CREATE_MESSAGE_BY_TYPE), 'pointer', ['pointer', 'int']);
    cache.selectReturn = cache.base.add(SELECT_RETURN);
    cache.newOperator = new NativeFunction(cache.base.add(NEW_OPERATOR), 'pointer', ['int']);
    cache.sendMessage = function (message) {
        var messageType = Message._getMessageType(message);
        Message._encode(message);
        var byteStream = Message._getByteStream(message);
        var messagePayloadLength = ByteStream._getOffset(byteStream);
        var messageBuffer = malloc(messagePayloadLength + 7);
        memmove(messageBuffer.add(7), ByteStream._getByteArray(byteStream), messagePayloadLength);
        Buffer._setEncodingLength(messageBuffer, messagePayloadLength);
        Buffer._setMessageType(messageBuffer, Message._getMessageType(message));
        Buffer._setMessageVersion(messageBuffer, Message._getVersion(message));
        libc_send(cache.fd, messageBuffer, messagePayloadLength + 7, 0);
        free(messageBuffer);
    };
    function onWakeup() {
        var message = MessageQueue._dequeue(cache.sendQueue);
        while (message) {
            var messageType = Message._getMessageType(message);
            if (messageType === 10100) {
                message = Memory.readPointer(cache.loginMessagePtr);
                Memory.writePointer(cache.loginMessagePtr, ptr(0));
            }
            cache.sendMessage(message);
            message = MessageQueue._dequeue(cache.sendQueue);
        }
    };
    function onReceive() {
        var headerBuffer = cache.newOperator(7);
        libc_recv(cache.fd, headerBuffer, 7, 256);
        var messageType = Buffer._getMessageType(headerBuffer);
        if (messageType > 20000 && messageType < 30001) {
            var payloadLength = Buffer._getEncodingLength(headerBuffer);
            var messageVersion = Buffer._getMessageVersion(headerBuffer);
            free(headerBuffer);
            var messageBuffer = cache.newOperator(payloadLength);
            libc_recv(cache.fd, messageBuffer, payloadLength, 256);
            var message = cache.createMessageByType(cache.messageFactory, messageType);
            Message._setVersion(message, messageVersion);
            var byteStream = Message._getByteStream(message);
            ByteStream._setLength(byteStream, payloadLength);
            if (payloadLength) {
                var byteArray = cache.newOperator(payloadLength);
                memmove(byteArray, messageBuffer, payloadLength);
                ByteStream._setByteArray(byteStream, byteArray);
            }
            Message._decode(message);
            MessageQueue._enqueue(cache.recvQueue, message);    
            if (messageType === 20104) {
                Memory.writeInt(cache.state, 5);
                misc();
            }
            free(messageBuffer);        
        }
    };
    Interceptor.replace(Module.findExportByName('libc.so', 'pthread_cond_signal'), new NativeCallback(function(a1) {
        if(!this.returnAddress.equals(cache.pthreadReturn)) {
            return pthread_cond_signal(a1);
        }
        var sp4 = Memory.readPointer(this.context.sp.add(4));
        for (var i = 0; i < cache.wakeUpReturnArray.length; i += 1) {
            if (sp4.equals(cache.wakeUpReturnArray[i])) {
                onWakeup();
                return 0;
            }
        }
        return pthread_cond_signal(a1);
    }, 'int', ['pointer']));    
        Interceptor.replace(Module.findExportByName('libc.so', 'select'), new NativeCallback(function(nfds, readfds, writefds, exceptfds, timeout) {
            var r = select(nfds, readfds, writefds, exceptfds, timeout);
            if (this.returnAddress.equals(cache.selectReturn)) {
                onReceive();
            }
            return r;
        }, 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']));
}
rpc.exports = {
    init: function(stage, options) {
        cache.options = options || {};
        onLoad('libg.so', function() {
            Interceptor.detachAll();
            cache.base = Process.findModuleByName('libg.so').base;
            toast("Welcome to the Flame Brawl v25!\nhttps://t.me/flameservers");
            setup();
        });
    }
};