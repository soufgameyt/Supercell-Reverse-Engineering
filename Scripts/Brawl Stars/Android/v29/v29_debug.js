// Global Cache 
var cache = {
    modules: {},
    options: {}
};

const base = Process.findModuleByName('libg.so').base;

// Addresses 
const SERVER_CONNECTION = 0xC86D10;
const PTHREAD_COND_WAKE_RETURN = 0x80E5A2 + 8 + 1;
const CREATE_MESSAGE_BY_TYPE = 0x4A7EE4;
const START_GAME = 0x41C8D4;
const POINTER_SIZE = 4;
const IS_PROD = 0x2829B0;
const IS_DEV = 0x3AD0B4;
// Debug
const STAGE_ADD_CHILD = 0xFACB4;
const STAGE_REMOVE_CHILD = 0x219900;
const stage_offset = 0xC87358;
const ADD_FILE = 0x520698;
const STRING_CTOR = 0x4C793C;
const SET_TEXT = 0x8D610;

var SlowModeInt = 0;
var ArtTestInt = 0;
var SpectateDebugInt = 0;

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
const StageAdd = new NativeFunction(base.add(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
const AddFile = new NativeFunction(base.add(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int', 'int']);
const StageRemove = new NativeFunction(base.add(STAGE_REMOVE_CHILD), 'void', ['pointer', 'pointer']);
const StringCtor = new NativeFunction(base.add(STRING_CTOR), 'pointer', ['pointer', 'pointer']);
const fSetText = new NativeFunction(base.add(SET_TEXT), 'pointer', ['pointer', 'pointer']);

function strPtr(message) {
    var charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr
}

function WriteToMemory(address, valueType, value) {
    switch (valueType.toLowerCase()) {
        case "u8":
            Memory.protect(address, 1, "rwx");
            Memory.writeU8(address, value);
            break;
        case "byte":
            Memory.protect(address, 1, "rwx");
            Memory.writeS8(address, value);
            break;
        case "ushort":
            Memory.protect(address, 2, "rwx");
            Memory.writeU16(address, value);
            break;
        case "short":
            Memory.protect(address, 2, "rwx");
            Memory.writeS16(address, value);
            break;
        case "uint":
            Memory.protect(address, 4, "rwx");
            Memory.writeU32(address, value);
            break;
        case "int":
            Memory.protect(address, 4, "rwx");
            Memory.writeS32(address, value);
            break;
        case "float":
            Memory.protect(address, 4, "rwx");
            Memory.writeFloat(address, value);
            break;
        case "pointer":
            Memory.protect(address, 4, "rwx");
            Memory.writePointer(address, value);
            break;
        case "ulong":
            Memory.protect(address, 8, "rwx");
            Memory.writeU64(address, value);
            break;
        case "long":
            Memory.protect(address, 8, "rwx");
            Memory.writeS64(address, value);
            break;
        case "double":
            Memory.protect(address, 8, "rwx");
            Memory.writeDouble(address, value);
            break;
        case "bytearray":
            Memory.protect(address, value.length, "rwx");
            Memory.writeByteArray(address, value);
            break;
        case "string":
            Memory.protect(address, value.length, "rwx");
            Memory.writeUtf8String(address, value);
            break;
    }
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
    const base = Process.findModuleByName('libg.so').base;
    Interceptor.replace(base.add(IS_PROD), new NativeCallback(function() {
            return 0;
        }, 'int', []));
        
        Interceptor.replace(base.add(IS_DEV), new NativeCallback(function() {
            return 1;
        }, 'int', []));
}

/*function enableDebugInfo() {
    const base = Process.findModuleByName('libg.so').base;
    var isDev = base.add(0x3AD0B4);
    var isProd = base.add(0x2829B0);
    Memory.protect(isDev, 1, "rwx")
    Memory.protect(isProd, 1, "rwx")
    isDev.writeU8(1);
    isProd.writeU8(0);
 }*/

function ColorFull() {
    Interceptor.attach(cache.base.add(0x38C6FC), {
        onEnter(args) {
            args[7] = ptr(1);
            }
        });
}

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
            console.log(messageType)
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
        if (messageType === 20104) { //LoginOkMessage
            Memory.writeInt(cache.state, 5);
            OfflineBattles();
            ColorFull();
            enableDebugInfo();
            DebugItemSpawn();
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

const adder = Interceptor.attach(base.add(ADD_FILE), {
    onEnter: function(args) {
        adder.detach();
        AddFile(args[0], strPtr("sc/debug.sc"), -1, -1, -1, -1, 0);
    }
});

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

function slowModeAction() {
    if (SlowModeInt === 0) {
        WriteToMemory(base.add(0xC88254), "Byte", 1);
        SlowModeInt = 1;
    }
    else
    {
        WriteToMemory(base.add(0xC88254), "Byte", 0);
        SlowModeInt = 0;
    }
}

function artTestModeAction() {
    if (ArtTestInt === 0) {
        WriteToMemory(base.add(0xC8711C), "Byte", 1);
        ArtTestInt === 1;
    }
    else
    {
        WriteToMemory(base.add(0xC8711C), "Byte", 0);
        ArtTestInt === 0;
    }
}

function spectateDebugAction() {
    if (SpectateDebugInt === 0) {
        WriteToMemory(base.add(0xC86BFC), "Byte", 1);
        SpectateDebugInt === 1;
    }
    else
    {
        WriteToMemory(base.add(0xC86BFC), "Byte", 0);
        SpectateDebugInt === 0;
    }
}


const CumButton = new NativeFunction(base.add(0x289FA8), 'int', []);

function SpawnDebugItem(memory, item, text, x, y) {
    new NativeFunction(base.add(0x5F3600), 'void', ['pointer'])(memory);
    let DebugItem = new NativeFunction(base.add(0x10E874), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr(item), 1);
    new NativeFunction(base.add(0x1F7CDC), 'void', ['pointer', 'pointer'])(memory, DebugItem);
    new NativeFunction(base.add(0x61718), 'void', ['pointer', 'float', 'float'])(memory, x, y);
    fSetText(memory, createStringObject(text));
}

function DebugItemSpawn() {
    let debugbutton = malloc(1000);
    SpawnDebugItem(debugbutton, "debug_button", "D", 30, 560);
    StageAdd(base.add(stage_offset).readPointer(), debugbutton);

    let debugmenu = malloc(1000);
    SpawnDebugItem(debugmenu, "debug_menu", "Debug Menu", 1225, 0);

    let close = malloc(1000);
    SpawnDebugItem(close, "debug_button", "D", 30, 560);

    let gems = malloc(1000);
    SpawnDebugItem(gems, "debug_menu_item", "Add Gems", 1080, 160);

    let slowmode = malloc(1000);
    SpawnDebugItem(slowmode, "debug_menu_item", "Slow Mode", 1080, 220);

    let arttest = malloc(1000);
    SpawnDebugItem(arttest, "debug_menu_item", "Art Test", 1080, 280);

    let spectatedebug = malloc(1000);
    SpawnDebugItem(spectatedebug, "debug_menu_item", "Spectate Debug", 1080, 340);

    let NextCameraMode = malloc(1000);
    SpawnDebugItem(NextCameraMode, "debug_menu_item", "Next Camera Mode", 1080, 100);

    cache.buttonInterceptor = Interceptor.attach(base.add(0x64A510), {
        onEnter(args) {
            if (args[0].toInt32() == debugbutton.toInt32()) {
                StageAdd(base.add(stage_offset).readPointer(), debugmenu);
                StageAdd(base.add(stage_offset).readPointer(), NextCameraMode);
                StageAdd(base.add(stage_offset).readPointer(), close);
                StageAdd(base.add(stage_offset).readPointer(), gems);
                StageAdd(base.add(stage_offset).readPointer(), slowmode);
                StageAdd(base.add(stage_offset).readPointer(), arttest);
                StageAdd(base.add(stage_offset).readPointer(), spectatedebug);
            }
            if (args[0].toInt32() == close.toInt32()) {
                StageRemove(base.add(stage_offset).readPointer(), debugmenu);
                StageRemove(base.add(stage_offset).readPointer(), close);
                StageRemove(base.add(stage_offset).readPointer(), NextCameraMode);
                StageRemove(base.add(stage_offset).readPointer(), gems);
                StageRemove(base.add(stage_offset).readPointer(), slowmode);
                StageRemove(base.add(stage_offset).readPointer(), arttest);
                StageRemove(base.add(stage_offset).readPointer(), spectatedebug);
            }
            if (args[0].toInt32() == NextCameraMode.toInt32()) {
                CumButton();
            }
            if (args[0].toInt32() == gems.toInt32()) {
                sendDebugAction(1);
            }
            if (args[0].toInt32() == slowmode.toInt32()) {
                slowModeAction();
            }
            if (args[0].toInt32() == arttest.toInt32()) {
                artTestModeAction();
            }
            if (args[0].toInt32() == spectatedebug.toInt32()) {
                spectateDebugAction();
            }
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

rpc.exports = {
    init: function(stage, options) {
        setup();
    }
};