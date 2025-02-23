	// global cache
var cache = {
    modules: {},
    options: {}
};

const base = Process.findModuleByName('libg.so').base;

// global constants //TODO: update addresses!
var SERVER_CONNECTION = 0xC1BCC8; //found by "Locale is null, needed by GameSCIDManag" UPDATED!
var PTHREAD_COND_WAKE_RETURN = 0x7B775E + 8 + 1;
var CREATE_MESSAGE_BY_TYPE = 0x4F9F00;
var IS_PROD = 0x214B10;
var IS_DEV = 0x1EB998;
var START_GAME = 0x41C8D4;
var POINTER_SIZE = 4;
const stage_offset = 0xC1AE80;
const STAGE_ADD_CHILD = 0x210634;
const StageAdd = new NativeFunction(base.add(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
const ADD_FILE = 0x39C100;
const AddFile = new NativeFunction(base.add(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int', 'int']);
const STRING_CTOR = 0x449D88;
const StringCtor = new NativeFunction(base.add(STRING_CTOR), 'pointer', ['pointer', 'pointer']);
const SET_TEXT = 0x574840;
const fSetText = new NativeFunction(base.add(SET_TEXT), 'pointer', ['pointer', 'pointer']);

// global lib calls
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

// injection method
function onLoad(name, callback) {
    Java.perform(function() {
        var System = Java.use('java.lang.System');
        var Runtime = Java.use('java.lang.Runtime');
        var SystemLoad_2 = System.loadLibrary.overload('java.lang.String');
        var VMStack = Java.use('dalvik.system.VMStack');
        SystemLoad_2.implementation = function(library) {
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

const toast = function(text) {
    Java.scheduleOnMainThread(() => {
        Java.use("android.widget.Toast")
        .makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.StringBuilder").$new(text), 1).show();
    });
} 


const exit = function() {
    Java.scheduleOnMainThread(() => {
        Java.use("java.lang.System").exit(0);
    });
};

function packageName(name) {
      if (getPackageName() != name) {
           exit();
           
      }
}

function getPackageName() {
     var name = '';
     Java.perform(function(argument) {
        name = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext().getPackageName();
     });
     return name;
}


// logic helpers
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
        return Memory.readPointer(Memory.readPointer(queue).add(POINTER_SIZE * index));
    },
    _set: function(queue, index, message) {
        Memory.writePointer(Memory.readPointer(queue).add(POINTER_SIZE * index), message);
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

// hooks
function setup() {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
        onEnter: function(args) {
            if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                cache.fd = args[0].toInt32();
                var host = Memory.allocUtf8String("185.105.90.122"); // IP
                Memory.writeInt(args[1].add(4), inet_addr(host));
                Memory.writeU16(args[1].add(2), ntohs(parseInt(9339)));
                setupMessaging();
            }
        }
    });
}

function offlinector() {
    Interceptor.attach(base.add(START_GAME), {
        onEnter(args) {
            args[3] = ptr(3);
        }
    });
}

function setupMessaging() {
    cache.pthreadReturn = cache.base.add(PTHREAD_COND_WAKE_RETURN);
    cache.serverConnection = Memory.readPointer(cache.base.add(SERVER_CONNECTION));
    cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
    cache.recvQueue = cache.messaging.add(60);
    cache.sendQueue = cache.messaging.add(84);
    cache.state = cache.messaging.add(208);
    cache.loginMessagePtr = cache.messaging.add(212);

    cache.createMessageByType = new NativeFunction(cache.base.add(CREATE_MESSAGE_BY_TYPE), 'pointer', ['pointer', 'int']);

    cache.sendMessage = function (message) {
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
        //Message._free(message);
    };

    function onWakeup() {
		//console.log(cache.sendQueue);
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
    }

    function onReceive() {
        var headerBuffer = malloc(7);
        libc_recv(cache.fd, headerBuffer, 7, 256);
        var messageType = Buffer._getMessageType(headerBuffer);
        if (messageType === 20104) { //LoginOk
            Memory.writeInt(cache.state, 5);
            offlinector();
        }
        else if (messageType === 22228) {
            createDebugButton();
        }
        var payloadLength = Buffer._getEncodingLength(headerBuffer);
        var messageVersion = Buffer._getMessageVersion(headerBuffer);
        free(headerBuffer);
        var messageBuffer = malloc(payloadLength);
        libc_recv(cache.fd, messageBuffer, payloadLength, 256);
        var message = cache.createMessageByType(cache.messageFactory, messageType);
        Message._setVersion(message, messageVersion);
        var byteStream = Message._getByteStream(message);
        ByteStream._setLength(byteStream, payloadLength);
        if (payloadLength) {
            var byteArray = malloc(payloadLength);
            memmove(byteArray, messageBuffer, payloadLength);
            ByteStream._setByteArray(byteStream, byteArray);
        }
        Message._decode(message);
        // logMessage(message);
        MessageQueue._enqueue(cache.recvQueue, message);
        free(messageBuffer);
    }

	Interceptor.attach(Module.findExportByName('libc.so', 'pthread_cond_signal'), {
		onEnter: function(args) {
			onWakeup();
		}
	});
	
	Interceptor.attach(Module.findExportByName('libc.so', 'select'), {
		onEnter: function(args) {
			onReceive();
		}
	});
}

function enableDebugInfo() {
   var isDev = cache.base.add(IS_DEV);
   var isProd = cache.base.add(IS_PROD);
   Memory.protect(isDev, 1, "rwx")
   Memory.protect(isProd, 1, "rwx")
   isDev.writeU8(1);
   isProd.writeU8(0);
}

const adder = Interceptor.attach(base.add(ADD_FILE), {
    onEnter: function(args) {
        adder.detach();
        console.log("zapaxlo addfileom");
        AddFile(args[0], strPtr("sc/debug.sc"), -1, -1, -1, -1, 0);
    }
});

function strPtr(message) {
    var charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr
}

function createStringObject(mmmdmskads) {
    var land = strPtr(mmmdmskads);
    let pesocheck = malloc(128);
    StringCtor(pesocheck, land);
    return pesocheck;
}

const CumButton = new NativeFunction(base.add(0xEE428), 'int', []);

function createDebugButton() {
    let btn = malloc(228);
    new NativeFunction(base.add(0x2AD55C), 'void', ['pointer'])(btn);
    let movieClip = new NativeFunction(base.add(0x622BA0), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_button"), 0);
    new NativeFunction(base.add(0x2093CC), 'void', ['pointer', 'pointer'])(btn, movieClip);

    StageAdd(base.add(stage_offset).readPointer(), btn);
    new NativeFunction(base.add(0x2BAC08), 'void', ['pointer', 'float', 'float'])(btn, 30, 560);
    fSetText(btn, createStringObject("D"));

    let debug = malloc(228);
    new NativeFunction(base.add(0x2AD55C), 'void', ['pointer'])(debug);
    let movieCliper = new NativeFunction(base.add(0x622BA0), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_menu"), 0);
    new NativeFunction(base.add(0x2093CC), 'void', ['pointer', 'pointer'])(debug, movieCliper);

    new NativeFunction(base.add(0x2BAC08), 'void', ['pointer', 'float', 'float'])(debug, 700, 0);

    let cummode = malloc(228);
    new NativeFunction(base.add(0x2AD55C), 'void', ['pointer'])(cummode);
    let movieCliperr = new NativeFunction(base.add(0x622BA0), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_menu_item"), 0);
    new NativeFunction(base.add(0x2093CC), 'void', ['pointer', 'pointer'])(cummode, movieCliperr);

    new NativeFunction(base.add(0x2BAC08), 'void', ['pointer', 'float', 'float'])(cummode, 800, 100);
    fSetText(cummode, createStringObject("Next Camera Mode"));

    cache.buttonInterceptor = Interceptor.attach(base.add(0x46DB0C), {
        onEnter(args) {
            console.log("запахло песком");
            if (args[0].toInt32() == btn.toInt32()) {
                StageAdd(base.add(stage_offset).readPointer(), debug);
                StageAdd(base.add(stage_offset).readPointer(), cummode);
            }
            if (args[0].toInt32() == cummode.toInt32()) {
                CumButton();
            }
        }
    });
}

// startup
rpc.exports = {
    init: function(stage, options) {
        cache.options = options || {};
        onLoad('libg.so', function() {
            Interceptor.detachAll();
            cache.base = Process.findModuleByName('libg.so').base;
            setup();
            toast("Server by Sparky(DEV) Client by Infinity Team Debug by ServerBSvvv(Dev)");
            enableDebugInfo();
        });
    }
};
