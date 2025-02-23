// global cache
var cache = {
    modules: {},
    options: {}
};

const base = Module.findBaseAddress("libg.so");

// global constants
const SERVER_CONNECTION = 0xA079B8;
const NEW_OPERATOR = 0x643F54 + 1;
const WAKEUP_RETURN_ARRAY = [0x464ac, 0xcacb0, 0xd1114, 0x3811a0, 0x4cd6d0, 0x4e2f78];
const PTHREAD_COND_WAKE_RETURN = 0x61691b;
const CREATE_MESSAGE_BY_TYPE = 0x1f1aa8; // 'createMessageByType' function address // 30000
const SELECT_RETURN = 0x3ae540; // x-ref select function
const ON_RECEIVE = 0x54E730; // Messaging::onReceive subslave address.
const POINTER_SIZE = 4;
const ANTON_XUI_DEBUG_1 = 0x110E34;
const GET_MOVIECLIP = 0x31F8BC;
const fResourceManagerGetMovieClip = new NativeFunction(base.add(GET_MOVIECLIP), 'pointer', ['pointer', 'pointer']);
const SET_MOVIE_CLIP = 0x2252BC;
const stage_offset = 0xA0900C;
const STAGE_DROCHILD = 0x16ED1C;
const fStageDrochild = new NativeFunction(base.add(STAGE_DROCHILD), 'void', ['pointer', 'pointer']);

const BUTTON_SETMOVIECLIP = 0x398210;

const STRING_CTOR = 0x2FBCBC;

const IS_DEV = 0x200934; // LogicVersion::isDev
const IS_PROD = 0x4BD0DC; // LogicVersion::isProd

const HOMEPAGE_STARTGAME = 0x277388;
const ADD_VISION_UPDATE = 0x438FA4;

const GAMEBUTTON_CTOR = 0x799D8;

const SET_TEXT = 0xDE8A4;
const REMOVE_CHILD = 0x61A40;

// global lib calls
const StringCtor = new NativeFunction(base.add(STRING_CTOR), 'void', ['pointer', 'pointer']);
const ButtonSetClip = new NativeFunction(base.add(BUTTON_SETMOVIECLIP), 'void', ['pointer', 'pointer', 'bool']);
const GameButtonCtor = new NativeFunction(base.add(GAMEBUTTON_CTOR), 'void', ['pointer']);
const fSetText = new NativeFunction(base.add(SET_TEXT), 'void', ['pointer', 'pointer', 'bool']);
var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
const free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);
const adudkactor = new NativeFunction(base.add(ANTON_XUI_DEBUG_1), 'void', ['pointer']);
const pthread_mutex_lock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_lock'), 'int', ['pointer']);
const pthread_mutex_unlock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']);
const pthread_cond_signal = new NativeFunction(Module.findExportByName('libc.so', 'pthread_cond_signal'), 'int', ['pointer']);
const select = new NativeFunction(Module.findExportByName('libc.so', 'select'), 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']);
const memmove = new NativeFunction(Module.findExportByName('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']);
const ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
const inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
const libc_send = new NativeFunction(Module.findExportByName('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']);
const libc_recv = new NativeFunction(Module.findExportByName('libc.so', 'recv'), 'int', ['int', 'pointer', 'int', 'int']);
const libc_close = new NativeFunction(Module.findExportByName('libc.so', 'close'), 'int', ['int']);
const setmovieclip = new NativeFunction(base.add(SET_MOVIE_CLIP), 'void', ['pointer', 'pointer', 'bool']);
const setXY = 0x90460;
const fSetXY = new NativeFunction(base.add(setXY), 'void', ['pointer', 'float', 'float']);
const fRemoveChild = new NativeFunction(base.add(REMOVE_CHILD), 'void', ['pointer', 'pointer']);


// logic helpers
const Message = {
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
const ByteStream = {
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
const Buffer = {
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
const MessageQueue = {
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

const HostPatcher = {
    init: function() {
        Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
            onEnter: function(args) {
                if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                    cache.fd = args[0].toInt32();
                    var host = Memory.allocUtf8String(HostPatcher.redirectAddress);
                    Memory.writeInt(args[1].add(4), inet_addr(host));
                    Interceptor.revert(Module.findExportByName('libc.so', 'pthread_cond_signal'));
                    Interceptor.revert(Module.findExportByName('libc.so', 'select'));
                    Messaging.init();
                }
            }
        });
    }
};

const DebugPatcher = {
    enableIsDev: function() {
        Interceptor.replace(cache.base.add(IS_PROD), new NativeCallback(function() {
            return 0;
        }, 'int', []));
        
        Interceptor.replace(cache.base.add(IS_DEV), new NativeCallback(function() {
            return 1;
        }, 'int', []));
    },
    revert: function() {
        Interceptor.revert(cache.base.add(IS_PROD));
        Interceptor.revert(cache.base.add(IS_DEV));
        Interceptor.flush();
    }
};

const OfflineBattlePatcher = {
    init: function() {
        OfflineBattlePatcher.startGame = Interceptor.attach(cache.base.add(HOMEPAGE_STARTGAME), {
            onEnter(args) {
                args[3] = ptr(3);
            }
        });

        OfflineBattlePatcher.viewerCountFaker = Interceptor.attach(cache.base.add(ADD_VISION_UPDATE), {
            onEnter(args) {
                args[1].add(92).writeInt(args[1].add(80).readInt());
            }
        });
    },
    deinit: function() {
        if (OfflineBattlePatcher.startGame) OfflineBattlePatcher.startGame.detach();
        if (OfflineBattlePatcher.viewerCountFaker) OfflineBattlePatcher.viewerCountFaker.detach();
    }
}

function getOffsets() {
    cache.wakeUpReturnArray = [];
    for (var i = 0; i < WAKEUP_RETURN_ARRAY.length; i += 1) {
        cache.wakeUpReturnArray.push(cache.base.add(WAKEUP_RETURN_ARRAY[i]));
    }
    cache.pthreadReturn = cache.base.add(PTHREAD_COND_WAKE_RETURN);
    cache.serverConnection = Memory.readPointer(cache.base.add(SERVER_CONNECTION));
    cache.selectReturn = cache.base.add(SELECT_RETURN);
    cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
    cache.recvQueue = cache.messaging.add(60);
    cache.sendQueue = cache.messaging.add(84);
    cache.state = cache.messaging.add(212);
    cache.loginMessagePtr = cache.messaging.add(216);

    cache.newOperator = new NativeFunction(cache.base.add(NEW_OPERATOR), 'pointer', ['int']);
    cache.createMessageByType = new NativeFunction(cache.base.add(CREATE_MESSAGE_BY_TYPE), 'pointer', ['pointer', 'int']);
}

function createStringPtr(message) {
    var charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr
}

function createStringObject(mmmdmskads) {
	var land = createStringPtr(mmmdmskads);
	let pesocheck = malloc(128);
	StringCtor(pesocheck, land);
	return pesocheck;
}

const nextCameraMode = new NativeFunction(base.add(0x1482E0), 'void', []);

function debug_init(land) { // jejka
	let dbutton = malloc(700);
	GameButtonCtor(dbutton);
	let peskov = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_button"));
	ButtonSetClip(dbutton, peskov, 1);
	fSetXY(dbutton, 30, 560);
	
	fStageDrochild(base.add(stage_offset).readPointer(), dbutton);
	fSetText(dbutton, createStringObject("D"), 1);

	let debug = malloc(700);
	adudkactor(debug);
	let pesok = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu"));
	//console.log(pesok.toInt32());
	setmovieclip(debug, pesok, 0);
	fSetXY(debug, 800, 0);
	fStageDrochild(base.add(stage_offset).readPointer(), debug);
	
	cache.addGemsButton = malloc(700);
	GameButtonCtor(cache.addGemsButton);
	
	let peschanik = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_item"));
	//console.log(peschanik.toInt32());
	ButtonSetClip(cache.addGemsButton, peschanik, 1);
	fSetXY(cache.addGemsButton, 1000, 80);
	
	let haccers = malloc(700);
	GameButtonCtor(haccers);
	let peskovik = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_item"));
	ButtonSetClip(haccers, peskovik, 1);
	fSetXY(haccers, 1000, 140);
	
	fStageDrochild(base.add(stage_offset).readPointer(), haccers);
	fSetText(haccers, createStringObject("Add Resources"), 1);
	
	let perdoon = malloc(700);
	GameButtonCtor(perdoon);
	let danillnull = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_item"));
	ButtonSetClip(perdoon, danillnull, 1);
	fSetXY(perdoon, 1000, 200);
	
	fStageDrochild(base.add(stage_offset).readPointer(), perdoon);
	fSetText(perdoon, createStringObject("Maintenance Test Message"), 1);
	
	let xeontop = malloc(700);
	GameButtonCtor(xeontop);
	let nullnull = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_item"));
	ButtonSetClip(xeontop, nullnull, 1);
	fSetXY(xeontop, 1000, 260);
	
	fStageDrochild(base.add(stage_offset).readPointer(), xeontop);
	fSetText(xeontop, createStringObject("War Map Preview"), 1);
	
	let dudkaxui = malloc(700);
	GameButtonCtor(dudkaxui);
	let nullnullnull = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_item"));
	ButtonSetClip(dudkaxui, nullnullnull, 1);
	fSetXY(dudkaxui, 1000, 320);
	
	fStageDrochild(base.add(stage_offset).readPointer(), dudkaxui);
	fSetText(dudkaxui, createStringObject("Next Theme"), 1);
	
	let dudkaxuii = malloc(700);
	GameButtonCtor(dudkaxuii);
	let nullnullnulll = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_item"));
	ButtonSetClip(dudkaxuii, nullnullnulll, 1);
	fSetXY(dudkaxuii, 1000, 380);
	
	fStageDrochild(base.add(stage_offset).readPointer(), dudkaxuii);
	fSetText(dudkaxuii, createStringObject("Next Camera Mode"), 1);
	
	let dudkaxuiii = malloc(700);
	GameButtonCtor(dudkaxuiii);
	let nullnullnullll = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_item"));
	ButtonSetClip(dudkaxuiii, nullnullnullll, 1);
	fSetXY(dudkaxuiii, 1000, 440);
	
	fStageDrochild(base.add(stage_offset).readPointer(), dudkaxuiii);
	fSetText(dudkaxuiii, createStringObject("Reset Account"), 1);

	let latency = malloc(700);
	GameButtonCtor(latency);
	let tests = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_item"));
	ButtonSetClip(latency, tests, 1);
	fSetXY(latency, 1000, 500);
	
	fStageDrochild(base.add(stage_offset).readPointer(), latency);
	fSetText(latency, createStringObject("Latency Test Request"), 1);

	let perda = malloc(700);
	GameButtonCtor(perda);
	let danillsuka = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_button"));
	ButtonSetClip(perda, danillsuka, 1);
	fSetXY(perda, 915, 20);
	
	fStageDrochild(base.add(stage_offset).readPointer(), perda);
	fSetText(perda, createStringObject("Debug "), 1);
	
	let perdim = malloc(700);
	GameButtonCtor(perdim);
	let danillsukai = fResourceManagerGetMovieClip(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_button"));
	ButtonSetClip(perdim, danillsukai, 1);
	fSetXY(perdim, 1010, 20);
	
	fStageDrochild(base.add(stage_offset).readPointer(), perdim);
	fSetText(perdim, createStringObject("Menu"), 1);
	
	fStageDrochild(base.add(stage_offset).readPointer(), cache.addGemsButton);
	fSetText(cache.addGemsButton, createStringObject("Add Gems"), 1);
	let aopened = true;
	cache.buttonInterceptor = Interceptor.attach(base.add(0x360CDC), {
		onEnter(args) {
			//console.log("jekla");
			if (args[0].toInt32() == cache.addGemsButton.toInt32()) {
				//console.log("lol");
				sendCustomMessage(10777);
			}
			else if (args[0].toInt32() == haccers.toInt32()) {
				//console.log("pon");
				sendCustomMessage(10666);
			}
			else if (args[0].toInt32() == perdoon.toInt32()) {
				//console.log("Perdoon Activated");
				sendCustomMessage(22228);
			}
			else if (args[0].toInt32() == xeontop.toInt32()) {
				//console.log("War map 22288828282 Activated");
				sendCustomMessage(10999);
			}
			else if (args[0].toInt32() == dudkaxui.toInt32()) {
				//console.log("ponos");
				sendCustomMessage(10000);
			}
			else if (args[0].toInt32() == dudkaxuiii.toInt32()) {
				//console.log("lol");
				sendCustomMessage(10166);
			}
			else if (args[0].toInt32() == latency.toInt32()) {
				//console.log("vzlom latency");
				sendCustomMessage(10656);
			}
			else if (args[0].toInt32() == dudkaxuii.toInt32()) {
				//console.log("camernik");
				nextCameraMode();
			    }
			else if (args[0].toInt32() == dbutton.toInt32()) {
				//console.log("toggler");
				if (aopened) {
					close_debug();
				}
				else if (!aopened){
					//console.log("dudka tech!");
					fRemoveChild(base.add(stage_offset).readPointer(), dbutton);
					cache.buttonInterceptor.detach();
					debug_init(false);
				}
			}
		}
	});
	
	function close_debug() {
		aopened = false;
		
		fRemoveChild(base.add(stage_offset).readPointer(), cache.addGemsButton);
		fRemoveChild(base.add(stage_offset).readPointer(), debug);
		fRemoveChild(base.add(stage_offset).readPointer(), haccers);
		fRemoveChild(base.add(stage_offset).readPointer(), perdoon);
		fRemoveChild(base.add(stage_offset).readPointer(), perda);
		fRemoveChild(base.add(stage_offset).readPointer(), perdim);
		fRemoveChild(base.add(stage_offset).readPointer(), xeontop);
		fRemoveChild(base.add(stage_offset).readPointer(), dudkaxui);
		fRemoveChild(base.add(stage_offset).readPointer(), dudkaxuii);
		fRemoveChild(base.add(stage_offset).readPointer(), dudkaxuiii);
		fRemoveChild(base.add(stage_offset).readPointer(), latency);
		
		free(cache.addGemsButton);
		free(haccers);
		free(perdoon);
		free(perda);
		free(perdim);
		free(xeontop);
		free(dudkaxui);
		free(dudkaxuii);
		free(dudkaxuiii);
		free(latency);
		free(debug);
	}
	
	if (land) close_debug();

}

function sendCustomMessage(type) {
	var messageBuffer = cache.newOperator(7);
	Buffer._setEncodingLength(messageBuffer, 0);
	Buffer._setMessageType(messageBuffer, type);
	Buffer._setMessageVersion(messageBuffer, 0);
	libc_send(cache.fd, messageBuffer, 7, 0);
	free(messageBuffer);
}

const addfile = new NativeFunction(base.add(0x25A654), 'void', ['pointer', 'pointer', 'int', 'int', 'int', 'int']);

function podload() {
	var lop = Interceptor.attach(base.add(0x25A654), {
		onEnter(args) {
			lop.detach();
			addfile(args[0], createStringPtr("sc/debug.sc"), -1, -1, -1, -1);
			//console.log("loaded suka");
		}
	});
}

function fixer() {
	let l = Interceptor.attach(Module.findExportByName('libc.so', 'close'), {
		onEnter(args) {
			if (args[0].toInt32() == cache.fd) {
				l.detach();
				//console.log("disconnector322");
				OfflineBattlePatcher.deinit();
				
				cache.buttonInterceptor.detach();

                Interceptor.revert(cache.base.add(ON_RECEIVE));
                DebugPatcher.revert();

                Interceptor.revert(Module.findExportByName('libc.so', 'pthread_cond_signal'));
                Interceptor.revert(Module.findExportByName('libc.so', 'select'));

                Interceptor.flush();
			}
		}
	});
}

const Messaging = {
    init: function() {
        getOffsets();

        Messaging.send = function (message) {
            Message._encode(message);
            var byteStream = Message._getByteStream(message);
            var messagePayloadLength = ByteStream._getOffset(byteStream);
            var messageBuffer = cache.newOperator(messagePayloadLength + 7);
            memmove(messageBuffer.add(7), ByteStream._getByteArray(byteStream), messagePayloadLength);
            Buffer._setEncodingLength(messageBuffer, messagePayloadLength);
            Buffer._setMessageType(messageBuffer, Message._getMessageType(message));
            Buffer._setMessageVersion(messageBuffer, Message._getVersion(message));
			
			if (Message._getMessageType(message) == 10101) {
				//console.log("voloski");
				Interceptor.replace(cache.base.add(ON_RECEIVE), new NativeCallback(function(){
					//console.log("tevh");
				}, 'void', []));
			}
			
            libc_send(cache.fd, messageBuffer, messagePayloadLength + 7, 0);
            free(messageBuffer);
            //Message._free(message);
        }

        Messaging.wakeup = function() {
            var message = MessageQueue._dequeue(cache.sendQueue);
            while (message) {
                var messageType = Message._getMessageType(message);
                if (messageType === 10100) {
                    message = Memory.readPointer(cache.loginMessagePtr);
                    Memory.writePointer(cache.loginMessagePtr, ptr(0));
                }
                Messaging.send(message);
                message = MessageQueue._dequeue(cache.sendQueue);
            }
        }
    
        Messaging.onReceive = function() {
            var headerBuffer = cache.newOperator(7);
            var r = libc_recv(cache.fd, headerBuffer, 7, 256);

            if (r == 0) {
                //console.log("disconnected tcc");

                OfflineBattlePatcher.deinit();

                Interceptor.revert(cache.base.add(ON_RECEIVE));
                DebugPatcher.revert();

                Interceptor.revert(Module.findExportByName('libc.so', 'pthread_cond_signal'));
                Interceptor.revert(Module.findExportByName('libc.so', 'select'));

                Interceptor.flush();

                libc_close(cache.fd);

                return;
            }

            var messageType = Buffer._getMessageType(headerBuffer);
            if (messageType === 20104) {
                Memory.writeInt(cache.state, 5);
				fixer();
                DebugPatcher.enableIsDev();
                OfflineBattlePatcher.init();
            }
			else if (messageType === 28282) {
				debug_init(true);
				//console.log("Dev Account DETECTED! Debug Menu called");
			}
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
            // logMessage(message);
            MessageQueue._enqueue(cache.recvQueue, message);
            free(messageBuffer);
        }

        Interceptor.replace(Module.findExportByName('libc.so', 'pthread_cond_signal'), new NativeCallback(function(a1) {
            if(!this.returnAddress.equals(cache.pthreadReturn)) {
                return pthread_cond_signal(a1);
            }
            var sp4 = Memory.readPointer(this.context.sp.add(4));
            for (var i = 0; i < cache.wakeUpReturnArray.length; i += 1) {
                if (sp4.equals(cache.wakeUpReturnArray[i])) {
                    Messaging.wakeup();
                    return 0;
                }
            }
            return pthread_cond_signal(a1);
        }, 'int', ['pointer']));
    
        Interceptor.replace(Module.findExportByName('libc.so', 'select'), new NativeCallback(function(nfds, readfds, writefds, exceptfds, timeout) {
            var r = select(nfds, readfds, writefds, exceptfds, timeout);
            if (this.returnAddress.equals(cache.selectReturn)) {
                Messaging.onReceive();
            }
            return r;
        }, 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']));
    }
};

// startup
rpc.exports = {
    init: function(stage, options) {
        Interceptor.detachAll();
        cache.base = Process.findModuleByName('libg.so').base;
        HostPatcher.redirectAddress = "127.0.0.1" // ip here
        HostPatcher.init();
		podload();
    }
};
