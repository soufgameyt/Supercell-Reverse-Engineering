// global cache
var cache = {
    modules: {},
    options: {}
};

console.log("hi");

const SERVER_CONNECTION = 0xB955AC;
const PTHREAD_COND_WAKE_RETURN = 0x75cf0f;
const WAKEUP_RETURN_ARRAY = [0x60254, 0x69c58, 0xb240c, 0xcc18c, 0x2f849c, 0x61f30c];
const SELECT_RETURN = 0x150434;
const NEW_OPERATOR = 0x77d0bd;
const CREATE_MESSAGE_BY_TYPE = 0x49afe8;

const POINTER_SIZE = 4;

//libc native functions
var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
var free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);
var pthread_mutex_lock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_lock'), 'int', ['pointer']);
var pthread_mutex_unlock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']);
var pthread_cond_signal = new NativeFunction(Module.findExportByName('libc.so', 'pthread_cond_signal'), 'int', ['pointer']);
var select = new NativeFunction(Module.findExportByName('libc.so', 'select'), 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']);
var memmove = new NativeFunction(Module.findExportByName('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']);
var ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
var htons = new NativeFunction(Module.findExportByName('libc.so', 'htons'), 'uint16', ['uint16']);
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

function hackCrypto() {
	const base = Process.findModuleByName('libg.so').base;
    cache.pthreadReturn = base.add(PTHREAD_COND_WAKE_RETURN);
    cache.serverConnection = Memory.readPointer(base.add(SERVER_CONNECTION));
    cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
    cache.recvQueue = cache.messaging.add(60);
    cache.sendQueue = cache.messaging.add(84);
    cache.state = cache.messaging.add(208);
    cache.loginMessagePtr = cache.messaging.add(212);
	
	cache.newOperator = new NativeFunction(cache.base.add(NEW_OPERATOR), 'pointer', ['int']);
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
    }
	
	function onReceive() {
        var headerBuffer = malloc(7);
        libc_recv(cache.fd, headerBuffer, 7, 256);
        var messageType = Buffer._getMessageType(headerBuffer);
		
		if (messageType >= 20000) {
			if (messageType === 20104) { //LoginOk
				Memory.writeInt(cache.state, 5);
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
    }
	
	InterceptorManager.attach(Module.findExportByName('libc.so', 'pthread_cond_signal'), function(args) {
		onWakeup();
	})
	
	InterceptorManager.attach(Module.findExportByName('libc.so', 'select'), function(args) {
		onReceive();
	})
}

const GameManager = {
	onGameInit: function(args) {
		hackCrypto(); //CryptoPatcher class
	}
}

const InterceptorManager = {
	attach: function(addr, callback) {
		try {
		Interceptor.attach(addr, {
			onEnter: function(args) {
				callback(args);
			}
		});
		} catch (exc) {
			console.error('attach failed for function ', addr, ' Error: ', exc);
		}
	},
	revert: function(addr) {
		Interceptor.revert(addr);
	}
};

function createByteArrayFromHexString(message) {
    var bytePtr = malloc(message.length/2 + 1);
    Memory.writeByteArray(bytePtr, hexStringToByte(message));
    return bytePtr
}

function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array();
    }

    var a = [];
    for (var i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16));
    }

    return new Uint8Array(a);
}

const HostPatcher = {
	check: function(avn, avo) {
		return avn != avo;
	},
	init: function() {
		var connect = new NativeFunction(Module.getExportByName('libc.so', 'connect'), 'int', ['int', 'pointer', 'int']);
		var freeaddrinfo = new NativeFunction(Module.getExportByName('libc.so', 'freeaddrinfo'), 'void', ['pointer']);
		var v1 = undefined;
		var addrdata = undefined;
		
		Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
			onEnter: function(args) {
				this.path = args[0].readUtf8String();
				if (this.path === 'game.brawlstarsgame.com') {
					Memory.writeUtf8String(args[0], '137.2.181.247');
					
					var module = Process.findModuleByName('libg.so');
					Memory.protect(module.base, module.size, 'rwx');
					
					var res;
					
					res = Memory.scanSync(module.base, module.size, 'FF 24 01 E2 7F 04 52 E3');
					
					for (var i=0;i<res.length;i++) {
						var intl = Interceptor.attach(res[i].address, function() {
							intl.detach();
							console.log('hit sock check');
							this.context.r1 = 0x22;
						});
					}    
				}
			}
		});
		Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
			onEnter: function(args) {
				if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {;
					cache.fd = args[0].toInt32();
					GameManager.onGameInit();
				}
			}
		});
	}
};


function patchaddrinfo(awj, awk, awl, awm) {
	return new NativeFunction(Module.getExportByName('libc.so', 'getaddrinfo'), 'int', ['pointer', 'pointer', 'pointer', 'pointer'])(Memory.allocUtf8String(awj), Memory.allocUtf8String(awk), awl, awm);
}

function setup() {
	Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
		onEnter: function(args) {
			if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
				cache.fd = args[0].toInt32();
                Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String("127.0.0.1")));
				Memory.writeU16(args[1].add(2), htons(9339));
				GameManager.onGameInit();
			}
		}
	});
}

rpc.exports = {
    init: function(stage, options) {
        cache.options = options || {};
		Interceptor.detachAll();
		cache.base = Process.findModuleByName('libg.so').base;
		setup();
    }
};