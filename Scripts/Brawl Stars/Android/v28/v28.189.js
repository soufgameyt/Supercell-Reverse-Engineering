// global cache
var cache = {
    modules: {},
    options: {}
};

const base = Process.findModuleByName('libg.so').base;

const SERVER_CONNECTION = 0xC1BCC8;
const PTHREAD_COND_WAKE_RETURN = 0x7B775E + 8 + 1;
const CREATE_MESSAGE_BY_TYPE = 0x4F9F00;
const WAKEUP_RETURN_ARRAY = [0x2D1EA4, 0x2D30B8, 0x33F098, 0x4B6B58]; // 34D268 - Unk
const SELECT_RETURN = 0xCCFA4;
const POINTER_SIZE = 4;
const stage_offset = 0xC1AE80;
const STAGE_ADD_CHILD = 0x210634;
const StageAdd = new NativeFunction(base.add(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
const ADD_FILE = 0x39C100;
const AddFile = new NativeFunction(base.add(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int', 'int']);
const STAGE_REMOVE_CHILD = 0x219CF8;
const StageRemove = new NativeFunction(base.add(STAGE_REMOVE_CHILD), 'void', ['pointer', 'pointer']);
const STRING_CTOR = 0x449D88;
const StringCtor = new NativeFunction(base.add(STRING_CTOR), 'pointer', ['pointer', 'pointer']);
const SET_TEXT = 0x574840;
const fSetText = new NativeFunction(base.add(SET_TEXT), 'pointer', ['pointer', 'pointer']);
const START_GAME = 0x41C8D4;

var Login = 0;

//libc native functions
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

function offlinector() {
    Interceptor.attach(base.add(START_GAME), {
        onEnter(args) {
            args[3] = ptr(3);
        }
    });
}

function setupMessaging() {
    cache.wakeUpReturnArray = [];
            for (var i = 0; i < WAKEUP_RETURN_ARRAY.length; i += 1) {
                cache.wakeUpReturnArray.push(base.add(WAKEUP_RETURN_ARRAY[i]));
            }
    cache.pthreadReturn = base.add(PTHREAD_COND_WAKE_RETURN);
    cache.serverConnection = Memory.readPointer(base.add(SERVER_CONNECTION));
    cache.selectReturn = base.add(SELECT_RETURN);
    cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
    cache.recvQueue = cache.messaging.add(60);
    cache.sendQueue = cache.messaging.add(84);
    cache.state = cache.messaging.add(208);
    cache.loginMessagePtr = cache.messaging.add(212);

    cache.createMessageByType = new NativeFunction(base.add(CREATE_MESSAGE_BY_TYPE), 'pointer', ['pointer', 'int']);

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
        Interceptor.replace(base.add(0x214B10), new NativeCallback(function() {
            return 0;
        }, 'int', []));
        //Message._free(message);
    };

    function onWakeup() {
        var message = MessageQueue._dequeue(cache.sendQueue);
        while (message) {
            var messageType = Message._getMessageType(message);
            console.log(messageType)
            if (messageType === 10100) {
                message = Memory.readPointer(cache.loginMessagePtr);
                Memory.writePointer(cache.loginMessagePtr, ptr(0));
                Login = 1;
            }
            cache.sendMessage(message);
            message = MessageQueue._dequeue(cache.sendQueue);
            
        }
    }

    function onReceive() {
        var headerBuffer = malloc(7);
        libc_recv(cache.fd, headerBuffer, 7, 256);
        var messageType = Buffer._getMessageType(headerBuffer);
        
        if (messageType >= 20000) {
            if (messageType === 20104) { //LoginOk
                Memory.writeInt(cache.state, 5);
                offlinector();
            }
            if (messageType === 22228) {
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
    }

    const wakeup = Interceptor.attach(Module.findExportByName('libc.so', 'pthread_cond_signal'), {
        onEnter: function(args) {
            onWakeup();
            //setTimeout(reAttach, 100);
        }
    });
    
    function reAttach() {
        const wake = Interceptor.attach(base.add(0x8428FA + 1), {
        onEnter: function(args) {
            wake.detach();
            onWakeup();
            setTimeout(reAttach, 100);
        }
    });
    }
    
    function unlocker() {
        Login = 0;
        attachTo();
    }
    
    /*Interceptor.replace(Module.findExportByName('libc.so', 'pthread_cond_signal'), new NativeCallback(function(a1) {
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
    }, 'int', ['pointer']));*/
    
    Interceptor.attach(Module.findExportByName('libc.so', 'select'), {
        onEnter: function(args) {
            onReceive();
        }
    });
}

const adder = Interceptor.attach(base.add(ADD_FILE), {
    onEnter: function(args) {
        adder.detach();
        AddFile(args[0], strPtr("sc/debug.sc"), -1, -1, -1, -1, 0);
    }
});

Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
    onEnter: function(args) {
    if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
        cache.fd = args[0].toInt32();
        var host = Memory.allocUtf8String("185.105.90.122");
        Memory.writeInt(args[1].add(4), inet_addr(host));
        Memory.writeU16(args[1].add(2), ntohs(parseInt(4444)));
        setupMessaging();
        }
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

function sendDebugAction(action) {
    var messageBuffer = malloc(7 + 4);
    Buffer._setEncodingLength(messageBuffer, 4);
    Buffer._setMessageType(messageBuffer, 10777);
    Buffer._setMessageVersion(messageBuffer, 0);
    messageBuffer.add(7).writeInt(action);
    libc_send(cache.fd, messageBuffer, 7 + 4, 0);
    free(messageBuffer);
}

const CumButton = new NativeFunction(base.add(0xEE428), 'int', []);

function createDebugButton() {
    let btn = malloc(300);
    new NativeFunction(base.add(0x2AD55C), 'void', ['pointer'])(btn);
    let movieClip = new NativeFunction(base.add(0x622BA0), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_button"), 1);
    new NativeFunction(base.add(0x2093CC), 'void', ['pointer', 'pointer'])(btn, movieClip);

    StageAdd(base.add(stage_offset).readPointer(), btn);
    new NativeFunction(base.add(0x2BAC08), 'void', ['pointer', 'float', 'float'])(btn, 30, 560);
    fSetText(btn, createStringObject("D"));

    let debug = malloc(300);
    new NativeFunction(base.add(0x2AD55C), 'void', ['pointer'])(debug);
    let movieCliper = new NativeFunction(base.add(0x622BA0), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_menu"), 1);
    new NativeFunction(base.add(0x2093CC), 'void', ['pointer', 'pointer'])(debug, movieCliper);

    new NativeFunction(base.add(0x2BAC08), 'void', ['pointer', 'float', 'float'])(debug, 700, 0);

    let close = malloc(300);
    new NativeFunction(base.add(0x2AD55C), 'void', ['pointer'])(close);
    let movieCliperrrrrr = new NativeFunction(base.add(0x622BA0), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_button"), 0);
    new NativeFunction(base.add(0x2093CC), 'void', ['pointer', 'pointer'])(close, movieCliperrrrrr);

    new NativeFunction(base.add(0x2BAC08), 'void', ['pointer', 'float', 'float'])(close, 965, 60);
    fSetText(close, createStringObject("Close"));
    
    let pop = malloc(300);
    new NativeFunction(base.add(0x2AD55C), 'void', ['pointer'])(pop);
    let movieCliperrrrrrr = new NativeFunction(base.add(0x622BA0), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_menu_button"), 1);
    new NativeFunction(base.add(0x2093CC), 'void', ['pointer', 'pointer'])(pop, movieCliperrrrrrr);

    new NativeFunction(base.add(0x2BAC08), 'void', ['pointer', 'float', 'float'])(pop, 800, 0);
    fSetText(pop, createStringObject("Debug Menu"));

    let cummode = malloc(300);
    new NativeFunction(base.add(0x2AD55C), 'void', ['pointer'])(cummode);
    let movieCliperr = new NativeFunction(base.add(0x622BA0), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_menu_item"), 0);
    new NativeFunction(base.add(0x2093CC), 'void', ['pointer', 'pointer'])(cummode, movieCliperr);

    new NativeFunction(base.add(0x2BAC08), 'void', ['pointer', 'float', 'float'])(cummode, 860, 100);
    fSetText(cummode, createStringObject("Next Camera Mode"));

    cache.buttonInterceptor = Interceptor.attach(base.add(0x46DB0C), {
        onEnter(args) {
            if (args[0].toInt32() == btn.toInt32()) {
                StageAdd(base.add(stage_offset).readPointer(), debug);
                StageAdd(base.add(stage_offset).readPointer(), cummode);
                StageAdd(base.add(stage_offset).readPointer(), close);
                StageAdd(base.add(stage_offset).readPointer(), pop);
            }
            if (args[0].toInt32() == close.toInt32()) {
                StageRemove(base.add(stage_offset).readPointer(), debug);
                StageRemove(base.add(stage_offset).readPointer(), close);
                StageRemove(base.add(stage_offset).readPointer(), cummode);
                StageRemove(base.add(stage_offset).readPointer(), pop);
            }
            if (args[0].toInt32() == cummode.toInt32()) {
                CumButton();
            }
        }
    });
}
