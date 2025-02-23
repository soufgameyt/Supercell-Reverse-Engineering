console.log("Hey");
var cache = {};
const base = Module.findBaseAddress("libg.so");

Interceptor.replace(base.add(0x57B7B4), new NativeCallback(function() {
    console.log("пошел нахуй");
}, 'void', []));

Interceptor.attach(base.add(0x68DE6C), function() {
	console.log("распрыжка");
	this.context.r0 = base.add(0x68EE94);
});

const SERVER_CONNECTION = 0x107E0A4;
const CREATE_MESSAGE_BY_TYPE = 0x5CAF8C;
const MESSAGE_FACTORY_CTOR = 0x3AF7F4;
const hui = 0xB8A50;
const POINTER_SIZE = 4;
const NEW_OPERATOR = 0xB89C0;
const HOMEPAGE_STARTGAME = 0x511000;
const DEBUGMENU_CTOR = 0x317AEC;
const STAGE_CTOR = 0x682100;
const STAGEADDCHILD = 0x8D5E24;
const STAGEREMOVECHILD = 0x4F6354;
const ADD_FILE = 0x1D6940;
const STAGE_ADDRESS = 0x1071D90;
const ascdebugsc = 0xC49DC1;
const LOGINMESSAGE_ENCODE = 0x492F58;
const GUI_ADDRESS = 0x10698F4;

const HUD_PRINT = 0xC86C0;

const FONT_LOAD = 0x58651C;

const DEBUGGER_SET_DEBUG_HUD = 0xCBBA0;
const DEBUGHUD_CTOR = 0x7AFC70;
const STRING_CTOR = 0x570C30;

const GAMEMAIN_GET_ID = 0x4675D8;

const GAMEMAIN_INSTANCE = 0x107239C;

const TEXTFIELD_CTOR = 0x4E8840;
const TEXTFILED_SETTEXT = 0x585608;

//global constants
const SOCK_STREAM = 1;
const AF_INET = 2;

const DUDKA = 0xB8A20;

const WRITE_LONG = 0x142D8C;
const WRITE_STRING = 0x8D9238;
const WRITE_INT = 0x20E3D0;

const WriteLong = new NativeFunction(base.add(WRITE_LONG), 'void', ['pointer', 'pointer']);
const WriteString = new NativeFunction(base.add(WRITE_STRING), 'void', ['pointer', 'pointer']);
const WriteInt = new NativeFunction(base.add(WRITE_INT), 'void', ['pointer', 'int']);

const StageAdd = new NativeFunction(base.add(STAGEADDCHILD), 'void', ['pointer', 'pointer']);
const StageRemove = new NativeFunction(base.add(STAGEREMOVECHILD), 'void', ['pointer', 'pointer']);
const DebugMenuCtor = new NativeFunction(base.add(DEBUGMENU_CTOR), 'pointer', ['pointer']);
const AddFile = new NativeFunction(base.add(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int', 'int']);

const StringCtor = new NativeFunction(base.add(STRING_CTOR), 'pointer', ['pointer', 'pointer']);
const SetDebugHud = new NativeFunction(base.add(DEBUGGER_SET_DEBUG_HUD), 'pointer', ['pointer']);
const DebugHudCtor = new NativeFunction(base.add(DEBUGHUD_CTOR), 'pointer', ['pointer', 'pointer']);
const LoadFont = new NativeFunction(base.add(FONT_LOAD), 'pointer', ['pointer']);

const GuiHudPrint = new NativeFunction(base.add(HUD_PRINT), 'pointer', ['pointer', 'pointer']);

const GameMainGetAccountId = new NativeFunction(base.add(GAMEMAIN_GET_ID), 'pointer', ['pointer']);

const TextFieldCtor = new NativeFunction(base.add(TEXTFIELD_CTOR), 'pointer', ['pointer']);
const TextFieldSetText = new NativeFunction(base.add(TEXTFILED_SETTEXT), 'pointer', ['pointer', 'pointer']);
const DISPLAYOBJECT_SETXY = 0x7DF8E0;
const DisplayObjectSetXY = new NativeFunction(base.add(DISPLAYOBJECT_SETXY), 'pointer', ['pointer', 'int', 'int']);

//server nativechick 
var socket = new NativeFunction(Module.findExportByName('libc.so', 'socket'), 'int', ['int', 'int', 'int']);
var bind = new NativeFunction(Module.findExportByName('libc.so', 'bind'), 'int', ['int', 'pointer', 'int']);
var memset = new NativeFunction(Module.findExportByName('libc.so', 'memset'), 'void', ['pointer', 'int', 'int']);
var htons = new NativeFunction(Module.findExportByName('libc.so', 'htons'), 'uint16', ['uint16']);
var listen = new NativeFunction(Module.findExportByName('libc.so', 'listen'), 'int', ['int', 'int']);
var accept = new NativeFunction(Module.findExportByName('libc.so', 'accept'), 'int', ['int', 'pointer', 'pointer']);
var pthread_create = new NativeFunction(Module.findExportByName('libc.so', 'pthread_create'), 'int', ['pointer', 'pointer', 'pointer', 'pointer']);

function createStringPtr(message) {
    var charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr
}

Interceptor.attach(Module.findExportByName("libc.so", "pthread_mutex_init"), {
	onEnter: function(args) {
		if (this.returnAddress.equals(base.add(0x315FD0))) {
			cache.messaging = args[0].sub(160);
			//setupNetworking();
		}
	}
});


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
var libc_close = new NativeFunction(Module.findExportByName('libc.so', 'close'), 'int', ['int']);
var libc_connect = new NativeFunction(Module.findExportByName('libc.so', 'connect'), 'int', ['int', 'pointer', 'int']);
var inet_pton = new NativeFunction(Module.findExportByName("libc.so", "inet_pton"), 'int', ['int', 'pointer', 'pointer']);

Java.perform(function() {
    var Sys = Java.use("java.lang.System");
    
    Sys.exit.implementation = function() {
        console.log("Nop");
    }
});

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
    },
};
var MessageQueue = {
    _getCapacity: function(queue) {
        return Memory.readInt(queue.add(4));
    },
    _get: function(queue, index) {
		console.log(Memory.readPointer(queue).add(POINTER_SIZE * index) - cache.messaging);
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
			console.log(index);
            message = MessageQueue._get(queue, index);
            MessageQueue._setDequeueIndex(queue, (index + 1) % MessageQueue._getCapacity(queue));
            MessageQueue._decrementCount(queue);
        }
        pthread_mutex_unlock(queue.sub(4));
        return message;
    }
};



/*Interceptor.attach(tweakerpro.add(receivedpepe), {
	onLeave: function(ritual) {
		console.log("getter setter interpretter!");
		var type = Buffer._getMessageType(ritual);
		console.log(type);
	}
});*/

function openDebug() {
	cache.dptr = DebugMenu.new();
	StageAdd(base.add(STAGE_ADDRESS).readPointer(), cache.dptr);
	
	cache.updateHook = Interceptor.attach(base.add(0x4F3364), {
		onLeave(retval) {
			DebugMenu.update(cache.dptr, 20);
		}
	});
}

function dclose() {
	cache.updateHook.detach();
	cache.opened = false;
	console.log("Close.");
	StageRemove(base.add(STAGE_ADDRESS).readPointer(), cache.dptr);
	free(cache.dptr); // вообще деструктор надо вызывать но похуй
}

function patchArxan() {
	Interceptor.replace(base.add(LOGINMESSAGE_ENCODE), new NativeCallback(function (a1) {
		var Stream = Message._getByteStream(a1);

		cache.loginMemory = a1;
		cache.loginStream = Stream;
		
		console.log("пиздоблядский мудопроёб");
		
		WriteLong(Stream, a1.add(84).readPointer());
		WriteString(Stream, a1.add(88).readPointer());
		WriteInt(Stream, a1.add(92).readInt());
		WriteInt(Stream, 0);
		WriteInt(Stream, a1.add(96).readInt());
		WriteString(Stream, a1.add(116).readPointer());
	}, 'void', ['pointer']));
}

//function patchBattles() {
	//Interceptor.attach(base.add(HOMEPAGE_STARTGAME), {
		//onEnter: function(args) {
			//args[3] = ptr(3);
		//}
	//})
//}

Interceptor.replace(base.add(0xE7088), new NativeCallback(function() {
		console.log("сам пошёл нахуй");
		setupAntiPidor();
		return 0;
		
	}, 'void', []));

function onReceive() {
		var headerBuffer = cache.newOperator(7);
        var received = libc_recv(cache.fd, headerBuffer, 7, 256);
		if (received == 0) {
			libc_close(cache.fd);
			cache.checks.detach();
			//cache.battles.detach();
			console.log("connection closed.");
		}
        var messageType = Buffer._getMessageType(headerBuffer);
        if (messageType > 20000 && messageType < 30000) {
			try {
			console.log(messageType);
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
				patchBattles();
				//openDebug();
            }
            free(messageBuffer);}
				catch(exception) {}
        }
	}

function setupNetworking() {
	console.log(cache.messaging);

    cache.messageFactoryCtor = new NativeFunction(base.add(MESSAGE_FACTORY_CTOR), 'void', ['pointer', 'bool']);
	cache.messageFactory = malloc(228);
	cache.messageFactoryCtor(cache.messageFactory, 0);

    cache.recvQueue = cache.messaging.add(304); //288
    cache.sendQueue = cache.messaging.add(164);
    cache.state = cache.messaging.add(16);
	
	console.log("SendQueue: ", cache.sendQueue.readPointer());
	console.log("RecvQueue: ", cache.sendQueue.readPointer());
	console.log("Factory: ", cache.messageFactory);
	
	cache.createMessageByType = new NativeFunction(base.add(CREATE_MESSAGE_BY_TYPE), 'pointer', ['pointer', 'int']);
	cache.newOperator = new NativeFunction(base.add(NEW_OPERATOR), 'pointer', ['int']);
	
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
			console.log("message");
            var messageType = Message._getMessageType(message);
			console.log("MessageType: ", messageType);
			cache.sendMessage(message);
            
            message = MessageQueue._dequeue(cache.sendQueue);
        }
	};
	
	/*Interceptor.replace(base.add(0x208A54), new NativeCallback(function (a1, a2) {
		console.log("да бля");
		console.log(a1.add(24).readByteArray(7));
		//console.log(a2.readByteArray(7));
		onReceive();
		return 0;
	}, 'int', ['pointer', 'pointer']));*/
	
	
	
	Interceptor.replace(Module.findExportByName('libc.so', 'pthread_cond_signal'), new NativeCallback(function(a1) {
		onWakeup();
		return pthread_cond_signal(a1);
	}, 'int', ['pointer']));
}

function setupPatcher() {
	Interceptor.replace(base.add(0x4CB9E0), new NativeCallback(function() {
		return 1;
	}, 'int', []));
	
	Interceptor.replace(base.add(0x7CC82C), new NativeCallback(function() {
		return 0;
	}, 'int', []));
}

Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
		onEnter: function(args) {
			console.log('here');
			this.z = args[0] = Memory.allocUtf8String("127.0.0.1");
			setupPatcher();
		}
	});
Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
	onEnter: function(args) {
		if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
			cache.fd = args[0].toInt32();
			console.log("Connecting to 9339...");
			//var host = Memory.allocUtf8String("192.168.0.100");
			//Memory.writeInt(args[1].add(4), inet_addr(host));
			//Interceptor.revert(Module.findExportByName('libc.so', 'select'));
			Interceptor.revert(Module.findExportByName('libc.so', 'pthread_cond_signal'));
			if (cache.recvHack != undefined) cache.recvHack.detach();
			Interceptor.revert(base.add(0x4CB9E0));
			Interceptor.revert(base.add(0x7CC82C));
			setupNetworking();
			//setupAntiPidor();
			}
		}
});

const DebugMenu = {
	new: function() {
		var dptr = malloc(1000);
		DebugMenuCtor(dptr);
		return dptr;
	},
	update: function(instance, deltaTime) {
		new NativeFunction(base.add(0x7F24F4), 'void', ['pointer', 'float'])(instance, deltaTime);
	}
};

function patchRecv() {
	;
}

function strPtr(content) {
	return Memory.allocUtf8String(content);
}

function createDebugButton() {
	let btn = malloc(228);
	new NativeFunction(base.add(0x464EB0), 'void', ['pointer'])(btn);
	let movieClip = new NativeFunction(base.add(0x7019E8), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_button"), 1);
	new NativeFunction(base.add(0x475030), 'void', ['pointer', 'pointer'])(btn, movieClip);

	StageAdd(base.add(STAGE_ADDRESS).readPointer(), btn);
	new NativeFunction(base.add(0x7DF8E0), 'void', ['pointer', 'float', 'float'])(btn, 30, 560);
	
	cache.dbtn = btn;
}

function setupAntiPidor() {
	Interceptor.replace(base.add(0x2418C8), new NativeCallback(function() {
		//console.log("хуй ты меня destroy");
		return 0;
	}, 'int', []));
	
	cache.opened = false;
	
	const adder = Interceptor.attach(base.add(ADD_FILE), {
		onEnter: function(args) {
			adder.detach();
			AddFile(args[0], base.add(ascdebugsc), -1, -1, -1, -1, 0);
			console.log("Debug Sc Loaded!");
			patchArxan();
			Memory.protect(base.add(0x208FB8), 4, 'rwx');
			base.add(0x208FB8).writeByteArray([0, 0, 0, 0]); // у вас же тоже decrypt в 0 вкручен?
			
			Interceptor.replace(base.add(0x6707F4), new NativeCallback(function(dudka, lander, dudnik) {
				dudka.add(16).writeU32(5);
				new NativeFunction(base.add(0x25F9E0), 'void', ['pointer', 'pointer'])(dudka, dudnik);
				console.log("взломал твою ж и поменял 10100 и 10101 местами");
			}, 'void', ['pointer', 'pointer', 'pointer']));
			//initDebugger();
		}
	});
	
	const homeMode = Interceptor.attach(base.add(0x460AE8), {
		onLeave(retval) {
			createDebugButton();
		}
	});
	patchBattles();
	Interceptor.attach(base.add(0x49BE10), {
		onEnter(args) {
			if (cache.dbtn) {
				if (args[0].toInt32() == cache.dbtn.toInt32()) {
					toggleDebug();
				}
			}
		}
	});
}

function toggleDebug() {
	if (!cache.opened) {
		cache.opened = true;
		
		openDebug();
	}
	else {
		dclose();
	}
}

toast("Server created Sparky");