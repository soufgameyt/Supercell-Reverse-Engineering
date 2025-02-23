var cache = {
	modules: {},
	options: {}
};

const base = Process.findModuleByName('libg.so').base;

const SERVER_CONNECTION = 0xD18784;
const PTHREAD_COND_WAKE_RETURN = 0x85D6B6 + 8 + 1;
const WAKEUP_RETURN_ARRAY = [0x2D1EA4, 0x2D30B8, 0x33F098, 0x4B6B58];
const CREATE_MESSAGE_BY_TYPE = 0x5EC014;
const POINTER_SIZE = 4;

// debug
const ADD_FILE = 0x7FB40;
const setXY = 0x6D64F4;
const STAGE_ADD_CHILD = 0x13C94C;
const STAGE_REMOVE_CHILD = 0x2F5204;
const stageAddres = 0xD189B4;
const TEXTFILED_SETTEXT = 0x68504;
const STRING_CTOR = 0x2689D8;
const GUI_CONTAINER_CTOR = 0xC1884;
const SET_MOVIE_CLIP = 0x87AD8;

const setmovieclip = new NativeFunction(base.add(SET_MOVIE_CLIP), 'void', ['pointer', 'pointer', 'bool']);
const fGuiContainerCtor = new NativeFunction(base.add(GUI_CONTAINER_CTOR), 'void', ['pointer']);
const StringCtor = new NativeFunction(base.add(STRING_CTOR), 'pointer', ['pointer', 'pointer']);
const fSetText = new NativeFunction(base.add(TEXTFILED_SETTEXT), 'pointer', ['pointer', 'pointer']);
const StageAdd = new NativeFunction(base.add(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
const StageRemove = new NativeFunction(base.add(STAGE_REMOVE_CHILD), 'void', ['pointer', 'pointer']);
const fSetXY = new NativeFunction(base.add(setXY), 'void', ['pointer', 'float', 'float']);
const AddFile = new NativeFunction(base.add(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int', 'int']);

const StringTable_getMovieClip = new NativeFunction(base.add(0x34873C), 'pointer', ['pointer', 'pointer']);
const DisplayObject_getHeight = new NativeFunction(base.add(0x6E6654), 'void', ['pointer']);
const setScaleX = new NativeFunction(base.add(0x1E2B80), 'void', ['pointer', 'float']);
const DisplayObject_setPixelSnappedXY = new NativeFunction(base.add(0xF1F14), 'void', ['pointer', 'float', 'float']);

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

function Patcher() {
	Interceptor.attach(base.add(0x640EB0), {
        onEnter(args) {
            args[3] = ptr(3);
        }
    });

	Interceptor.attach(base.add(0x3E0F08), {
        onEnter(args) {
            args[7] = ptr(1);
        }
    });

	cache.xy = 60

	let debugbutton = malloc(1000);
    SpawnDebugItem(debugbutton, "debug_button", "D", 30, 560, 0, 0);
    StageAdd(base.add(stageAddres).readPointer(), debugbutton);

	let debugbutton_close = malloc(1000);
    SpawnDebugItem(debugbutton_close, "debug_button", "D", 30, 560, 0, 0);

	let debugmenu = malloc(1000);
    SpawnDebugItem(debugmenu, "debug_menu", "Debug Menu", 700, 0, 0, 0);

	let Account = malloc(1000);
    SpawnDebugItem(Account, "debug_menu_item", "Add Resource", 865, cache.xy, 0, 0);

	cache.buttonInterceptor = Interceptor.attach(base.add(0x28C098), {
		onEnter(args) {
			if (args[0].toInt32() == debugbutton.toInt32()) {
				StageAdd(base.add(stageAddres).readPointer(), debugmenu);
				StageAdd(base.add(stageAddres).readPointer(), debugbutton_close);
				StageAdd(base.add(stageAddres).readPointer(), Account);
			}
			if (args[0].toInt32() == debugbutton_close.toInt32()) {
				StageRemove(base.add(stageAddres).readPointer(), debugmenu);
				StageRemove(base.add(stageAddres).readPointer(), debugbutton_close);
				StageRemove(base.add(stageAddres).readPointer(), Account);
			}
			if (args[0].toInt32() == Account.toInt32()) {
			}
		}
	});
}

function SpawnDebugItem(memory, item, text, x, y, open, isCategory) {
	new NativeFunction(base.add(0x39C72C), 'void', ['pointer'])(memory);
    let DebugItem = new NativeFunction(base.add(0x13ACDC), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr(item), 1);
    new NativeFunction(base.add(0x25EF90), 'void', ['pointer', 'pointer'])(memory, DebugItem);

    fSetXY(memory, x, y);
	if (isCategory)
	{
		if (open)
		{
			fSetText(memory, createStringObject('- ' + text));
		}
		else
		{
			fSetText(memory, createStringObject('+ ' + text));
		}
	}
	else
	{
		fSetText(memory, createStringObject(text));
	}
	if (item === 'debug_menu_item' && isCategory === 0)
	{
		cache.xy += 30
	}
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
            console.log('[MessageManager::receiveMessage] PacketID: ' + messageType);
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
				Patcher();
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

function setup() {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
		onEnter: function(args) {
			if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
				cache.fd = args[0].toInt32();
				var host = Memory.allocUtf8String("192.168.43.147");
				var htons = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
args[1].add(2).writeU16(htons(9339));
				Memory.writeInt(args[1].add(4), inet_addr(host));
				setupMessaging();
			}
		}
	});
}

function arxanKiller() {
	const loginMessageEncodeJump = base.add(0x6F0558);
	const loginMessageEncodeClean = base.add(0x6F140C);

	const openat = Module.findExportByName(null, 'openat');

	/*Interceptor.replace(base.add(0x6B5194), new NativeCallback(function() { // AntiCheat::getAntihackFlags
        return 0;
    }, 'int', []));*/

	/*Interceptor.attach(base.add(0x6F0558), function() {
        console.log("а негры тоже пидорасы x5");
        this.context.r0 = base.add(0x6F140C);
	});*/

	Interceptor.replace(base.add(0xD17AA0), new NativeCallback(function() {
		return 0
	}, 'int', []));

	Interceptor.replace(openat, new NativeCallback(function() { // openat
        return 0;
	}, 'int', []));

	const adder = Interceptor.attach(base.add(ADD_FILE), {
        onEnter: function(args) {
            adder.detach();
            AddFile(args[0], strPtr("sc/debug.sc"), -1, -1, -1, -1, 0);
            console.log("Debug Sc Loaded!");
        }
    });
}

arxanKiller();
setup();