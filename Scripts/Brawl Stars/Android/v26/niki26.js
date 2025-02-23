//niki v26 script, line 364: port, line 362: ip
var cache = {
	modules: {},
	options: {}
};

const base = Process.findModuleByName('libg.so').base;

const SERVER_CONNECTION = 0xBB3A3C;
const PTHREAD_COND_WAKE_RETURN = 0x7762F6 + 8 + 1;
const CREATE_MESSAGE_BY_TYPE = 0x54486C;
//const SELECT_RETURN = 0x1F1894;
const POINTER_SIZE = 4;

const GameMain_instanceAddr = 0xBB3DD0;
const GameMain_update = new NativeFunction(base.add(0x63350), 'void', ['pointer', 'float', 'float']); // v26.184 | Parental function of ServerConnection::update

// Debug offsets
const ADD_FILE = 0x10523C;
const stage_offset = 0xBB44A4;

const STAGE_ADD_CHILD = 0x1273D0;

const SET_TEXT = 0x55994C;
const STRING_CTOR = 0x5F3F7C;

const GameButton = new NativeFunction(base.add(0xCCDCC), 'void', ['pointer'])
const AddFile = new NativeFunction(base.add(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int', 'int']);
const StageAdd = new NativeFunction(base.add(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
const fSetText = new NativeFunction(base.add(SET_TEXT), 'pointer', ['pointer', 'pointer']);
const StringCtor = new NativeFunction(base.add(STRING_CTOR), 'pointer', ['pointer', 'pointer']);

var fSetXY = new NativeFunction(base.add(0x71B78), 'void', ['pointer', 'float', 'float'])

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

var FPS = 0;
var AVGFFPS = 0;

cache.buttonX = 800;
cache.buttonY = 40;
cache.DebugOpen = false;

cache.debugtext = malloc(1000);

const DebugMenu_getOffsets = {
	setXY(memory, x, y) {
	    memory.add(28).writeFloat(x);
	    memory.add(32).writeFloat(y);
	},
	setScale(mem, scale) {
	    mem.add(12).writeFloat(scale);
	    mem.add(24).writeFloat(scale);
	},
	getHeight(mema) {
	    return DisplayObject_getHeight(mema);
	},
	getWeight(mama) {
		return DisplayObject_getWeight(mama);
	},
	getX(mat) {
	    return mat.add(28).readFloat();
	},
	getY(mum) {
	    return mum.add(32).readFloat();
	},
	getClientHome() {
		return _0x182472().add(36).readPointer().add(16).readPointer();
	}
}

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

function enableDebugInfo() {
	Interceptor.attach(base.add(0x4E2E08), { // NativeFont::formatString
			onEnter(args) {
				args[7] = ptr(1);
			}
	});
	
}

const adder = Interceptor.attach(base.add(ADD_FILE), {
    onEnter: function(args) {
        adder.detach();
        AddFile(args[0], strPtr("sc/debug.sc"), -1, -1, -1, -1, 0);
        console.log('[AddFile] Loaded sc/debug.sc');
    }
});

function SpawnDebugItem(memory, item, text, x, y) {
    GameButton(memory);
    let DebugItem = new NativeFunction(base.add(0xC6260), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr(item), 1);
    new NativeFunction(base.add(0x115C9C), 'void', ['pointer', 'pointer'])(memory, DebugItem);
    fSetXY(memory, x, y);
    fSetText(memory, createStringObject(text));
	if (item === 'debug_menu_item')
	{
		cache.buttonY += 45;
	}
}

const DebugMenu = {
	addButton(memory, name) {
		SpawnDebugItem(memory, 'debug_menu_item', name, cache.buttonX, cache.buttonY);
	}
}

function DebugMenuBase() {
	cache.DebugButton = malloc(1000);
	SpawnDebugItem(cache.DebugButton, 'debug_button', 'D', 30, 560);

	cache.DebugMenu = malloc(2000);

	cache.AddGems = malloc(1000);
	DebugMenu.addButton(cache.AddGems, 'Add Gems');
}

function setupMessaging() {
	cache.pthreadReturn = base.add(PTHREAD_COND_WAKE_RETURN);
	cache.serverConnection = Memory.readPointer(base.add(SERVER_CONNECTION));
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
		//Message._free(message);
	};

	function onWakeup() {
		var message = MessageQueue._dequeue(cache.sendQueue);

		while (message) {
			var messageType = Message._getMessageType(message);
            cache.logs += '\n[MessageManager::sendMessage] PacketID: ' + messageType;
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
        cache.logs += '\n[MessageManager::receiveMessage] PacketID: ' + messageType
		if (messageType >= 20000) {
			if (messageType === 20104) { //LoginOk
				Memory.writeInt(cache.state, 5);
				DebugMenuBase();
			}
            if (messageType === 20108) {
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


function GameMain_UPD() {
    Interceptor.replace(GameMain_update, new NativeCallback(function(memory, unk, unk2) {
        GameMain_update(memory, unk, unk2);
        FPS += 1;
    }, 'void', ['pointer', 'float', 'float']));
}

function connect() {
	Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
		onEnter: function(args) {
			if (ntohs(Memory.readU16(args[1].add(2))) === 9449) {
				cache.fd = args[0].toInt32();
				var host = Memory.allocUtf8String("172.1"); // ip..?
				var htons = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
args[1].add(2).writeU16(htons(9449)); // port
				Memory.writeInt(args[1].add(4), inet_addr(host));
				setupMessaging();
			}
		}
	});
}

rpc.exports.init = function() {
	connect();
}