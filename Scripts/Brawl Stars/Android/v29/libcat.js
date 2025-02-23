// Global Cache 
var cache = {
    modules: {},
    options: {}
};


// Addresses 
const SERVER_CONNECTION = 0xC86D10;
const PTHREAD_COND_WAKE_RETURN = 0x80E5A2 + 8 + 1;
const CREATE_MESSAGE_BY_TYPE = 0x4A7EE4;
const START_GAME = 0x41C8D4;
const POINTER_SIZE = 4;


// Libc Native Functions
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
var htons = new NativeFunction(Module.findExportByName('libc.so', 'htons'), 'uint16', ['uint16']);


function toast(toastText) { 
    Java.perform(function() { 
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        Java.scheduleOnMainThread(function() {
                var toast = Java.use("android.widget.Toast");
                toast.makeText(context, Java.use("java.lang.String").$new(toastText), 1).show();
        });
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

function OfflineBattles() {
        Interceptor.attach(cache.base.add(0x44CEBC), { // BattleScreen::shouldShowChatButton
		    onLeave(retval) {
			    retval.replace(ptr(1));
		    }
     	});	
	
        Interceptor.attach(cache.base.add(0xC88108), { // BOTS DIFF
		    onLeave(retval) {
			    retval.replace(ptr(1));
		    }
     	});		
	
	
    Interceptor.attach(cache.base.add(0x67FEBC),{
        onEnter: function(args) {
            args[3] = ptr(3);
        }
    });
}

function setupMessaging() {
	const base = Process.findModuleByName('libg.so').base;
    cache.base = Process.findModuleByName('libg.so').base;
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
    };

    function onWakeup() {
        var message = MessageQueue._dequeue(cache.sendQueue);
        while (message) {
            var messageType = Message._getMessageType(message);
            if (messageType === 10100) {
                message = Memory.readPointer(cache.loginMessagePtr);
                Memory.writePointer(cache.loginMessagePtr, ptr(0));
            }
            if (messageType == 14109) { //offline gamerooms (sanırım)
				var qbase = Module.findBaseAddress('lib39285EFA.so');
				var offlinebattlector = new NativeFunction(qbase.add(0x6FF4), 'int', []);
				offlinebattlector();
			}
            cache.sendMessage(message);
            message = MessageQueue._dequeue(cache.sendQueue);
			
        }
    }
    

    function onReceive() {
        var headerBuffer = malloc(7);
        libc_recv(cache.fd, headerBuffer, 7, 256);
        var messageType = Buffer._getMessageType(headerBuffer);
        if (messageType === 20104) { //LoginOkMessage
            Memory.writeInt(cache.state, 5);
            OfflineBattles();            
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


function setup() {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
	onEnter: function(args) {
	if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
		cache.fd = args[0].toInt32();
        var host = Memory.allocUtf8String("192.168.1.107");
        Memory.writeInt(args[1].add(4), inet_addr(host));
		setupMessaging();
		hacksupermod();
		}
	}
});
}

function hacksupermod() { //lobbyInfodaki texti kapatmak için 
	const base = Module.findBaseAddress('lib39285EFA.so');
	Interceptor.replace(base.add(0x000C0D0), new NativeCallback(function(a) {
		return 0;
	}, 'int', ['int']));
}


rpc.exports = {
    init: function(stage, options) {
		toast("hac");
        setup();
    }
};