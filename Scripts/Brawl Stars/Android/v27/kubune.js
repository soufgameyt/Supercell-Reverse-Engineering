// used like 6 months ago by @kubune
// i decided to make the script public, you can find it in erder00/frida-scripts repo c:
// script was used to learn frida and test stuff. feel free to use it for your own purposes

const base = Module.findBaseAddress("libg.so");
const malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
const free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);
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
const android_log_write = new NativeFunction(Module.getExportByName(null, '__android_log_write'), 'int', ['int', 'pointer', 'pointer']);

function log(text){
    const tag = Memory.allocUtf8String("NovaBrawl");
    const str = Memory.allocUtf8String(text);
    android_log_write(3, tag, str);
}

var cache = {
    modules: {},
    options: {}
}

// Static data
const scriptVersion = 6;
const scriptAuthor = "kubune";
const isLoggedIn = false;
const redirectIP = "127.0.0.1";
const scriptType = "DEV"; // "prod" for normal | "beta" for beta testers | "dev" for developers
const lobbyText = `NovaBrawl ${scriptType} (script: ${scriptVersion})`;


// for v27.269
const SERVER_CONNECTION = 0xBE95A8; // found in GameMain::update
const PTHREAD_COND_WAKE_RETURN = 0x79A0BA + 8 + 1; // XREF: pthread_cond_signal
const CREATE_MESSAGE_BY_TYPE = 0x30EADC; // String: "FacebookManager::bindFacebook"
const POINTER_SIZE = 4;
const ADD_FILE = 0x35F950; //  String: "sc/effects_brawler.sc"
const STRING_CTOR = 0x5702D4; // String: "enter_age"
const STAGEADDCHILD = 0x308418; // String: "open" in SCID
const STAGEREMOVECHILD = 0x18E084; // String: "close" in SCID
const CUSTOMBUTTON_PRESSED = 0x1A9950; // Found in GameButtonCtor > LogicDataTables::getDefaultButtonClickSound > XREF: MagicSelectableButton::buttonPressed
const GAMEMAIN_INSTANCE = 0xBE95A8; // String: "WIPING KEYCHAIN!"
const STAGE_INSTANCE = 0xBE9504; // String: "TID_PAGE_FRIENDS_TITLE"
const GUI_INSTANCE = 0xBE9970; // String: "TID_TEAM_REQEST_JOIN_FAIL_PENDING_JOIN_"
const GAME_BUTTON_CTOR = 0x46C5E4; // String: "TID_SUPPORT_CREATOR_POPUP_BUTTON"
const MOVIE_CLIP = 0x605B9C; // String: "leaderboard_band_item"
const BUTTON_SET_CLIP = 0x479678; // String: "bubble_hit_area" > in TeamMemberStatusButtonC2EP9MovieClip
const SETXY = 0x5EE5E0; // String: "TID_FRIENDS_SUGGESTIONS_SEND_REQUEST"
const FSETTEXT = 0x4FE3F8;
const GUI_SHOWFLOATERTEXT_AT_DEF_POS = 0x2653E8; // String: "TID_STREAM_EVENT_%i"
const SETTINGSScreen_BUTTONCLICKED = 0x3B6574; // String: "TID_SETTINGS_WECHAT_NOT_INSTALLED"

const AddFile = new NativeFunction(base.add(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int', 'int']);
const StringCtor = new NativeFunction(base.add(STRING_CTOR), 'pointer', ['pointer', 'pointer']);
const StageAdd = new NativeFunction(base.add(STAGEADDCHILD), 'void', ['pointer', 'pointer']);
const StageRemove = new NativeFunction(base.add(STAGEREMOVECHILD), 'void', ['pointer', 'pointer']);
const GameButtonCtor = new NativeFunction(base.add(GAME_BUTTON_CTOR), 'void', ['pointer']);
const movieClip = new NativeFunction(base.add(MOVIE_CLIP), 'pointer', ['pointer', 'pointer', 'bool']);
const ButtonSetClip = new NativeFunction(base.add(BUTTON_SET_CLIP), 'void', ['pointer', 'pointer']); 
const SetXY = new NativeFunction(base.add(SETXY), 'void', ['pointer', 'float', 'float']); 
const fSetText = new NativeFunction(base.add(FSETTEXT), 'pointer', ['pointer', 'pointer']);
const showFloaterTextAtDefaultPos = new NativeFunction(base.add(GUI_SHOWFLOATERTEXT_AT_DEF_POS), 'void', ['pointer', 'pointer', 'float', 'int']); 
const SettingsScreen_buttonClicked = new NativeFunction(base.add(SETTINGSScreen_BUTTONCLICKED), 'void', ['pointer', 'pointer']);
const SettingsScreen_SettingsScreen = new NativeFunction(base.add(0x1F5408), 'int', ['int']); // String: "TID_PRIVACY_POLICY_BUTTON"

const ServerConnection_connect = 0x378824; // String: "game.brawlstarsgame.com"
const LogicVersion_isDev = 0x5EBA74;  // found in ServerConnection::connect
const LogicVersion_isProd = 0x2FDB34;  // found in ServerConnection::connect
const LogicVersion_isStage = 0x5BB614;  // found in ServerConnection::connect
const LogicVersion_isIntegration = 0x4C4C20;  // found in ServerConnection::connect
const ServerConnection_connectTo = 0x8CE78;  // found in ServerConnection::connect
const GameMain_update = 0x1E4420; // XREF: ServerConnection::update
const HomePage_startGame = 0x534B78; // String: "TID_MATCHMAKE_FAILED_15"
const LogiClientAvatar_getPractiseDifficultyForHero = 0x512E44 // in HomePage_startGame > track a6
const ServerConnection_update = 0x29AFA0;
const LoginMessage_encode = 0x3A2C08; // 10101 :upside_down
const MessageManager_receiveMessage = 0x54A9BC; // String: "BrawlTvManager processed"

const Armceptor = {
    nop: function(addr) {
        Armceptor.replace(addr, [0x00, 0xF0, 0x20, 0xE3]);
    },
    replace: function(address, newInsn) {
        Memory.protect(address, newInsn.length, 'rwx');
        address.writeByteArray(newInsn);
        Memory.protect(address, newInsn.length, 'rx');
    },
    ret: function(addr) {
        Armceptor.replace(addr, [0x1E, 0xFF, 0x2F, 0xE1]);
    },
    jumpOffset: function(addr, target) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new ArmWriter(code, {
                pc: addr
            });
            writer.putBImm(target);
            writer.flush();
        });
    },
    jumpout: function(addr, target) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new ArmWriter(code, {
                pc: addr
            });
            writer.putBranchAddress(target);
            writer.flush();
        });
    }
}

function createStringObject(text) {
    var a1 = newString(text);
    let a2 = malloc(128);
    StringCtor(a2, a1);
    return a2;
}

function newString(message) {
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

function ClearStringObjects(StrObjectPtrArray) {
    for (let ptr of StrObjectPtrArray) {
        WriteToMemory(ptr, "Int", 0);
        WriteToMemory(ptr.add(4), "Int", 0);
        WriteToMemory(ptr.add(8), "Int", 0);
        free(ptr);
    }
}
function ShowFloaterTextAtDefaultPosition(FloaterText='', stop=0.0, RGBAcolor=0xFFFFFFFF) {
    FloaterText = createStringObject(FloaterText);
    showFloaterTextAtDefaultPos(base.add(GUI_INSTANCE).readPointer(), FloaterText, stop, RGBAcolor);
    ClearStringObjects([FloaterText]);
}

const redirectConnection = {
    init(){
		Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
			onEnter(args) {
				if (args[0].readUtf8String() == "game.brawlstarsgame.com") {
					args[0].writeUtf8String(redirectIP);
				}
			}
		});
		Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
            onEnter: function(args) {
                if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                    cache.fd = args[0].toInt32();
					Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String(redirectIP)));
                    setupKubuneMessaging();
                }
            }
        });
    }
}

const arxanKiller = {
    init(){ 
		const openat = Module.findExportByName(null, 'openat');
		Interceptor.replace(openat, new NativeCallback(function() {
			return -1;
		}, 'int', []));
        Armceptor.replace(base.add(0x4851FC), [0xA6, 0x0F, 0x00, 0xEA]); // g_createGameInstance
        Armceptor.replace(base.add(0x35BE60), [0xF2, 0x03, 0x00, 0xEA]); // TcpSocket::create
        Armceptor.replace(base.add(0x3A2C18), [0x32, 0x04, 0x00, 0xEA]); // LoginMessage::encode
        Armceptor.replace(base.add(0x3E48D8), [0xB5, 0x04, 0x00, 0xEA]); // InputSystem::update
        Armceptor.replace(base.add(0x49A658), [0x16, 0x05, 0x00, 0xEA]); // CombatHUD::ultiButtonActivated
        Armceptor.replace(base.add(0x1E9AD8), [0x00, 0xF0, 0x20, 0xE3]); // Messaging::onReceive - snprintf("%s/%s/stat")
		Armceptor.replace(base.add(0x5D364), [0x39, 0x15, 0x00, 0xE3]); // Beacuse getaddr
		Armceptor.replace(base.add(0x5D368), [0xE4, 0x20, 0xA0, 0xE3]);
	}
}

const Game = {
    init(){
        arxanKiller.init();
        redirectConnection.init();
    }
}


const misc = {
    isDev(){
        Interceptor.replace(base.add(LogicVersion_isDev), new NativeCallback(function(){
            return 1;
        }, 'int', []));

        Interceptor.replace(base.add(LogicVersion_isProd), new NativeCallback(function(){
            return 0;
        }, 'int', []));
    },
    offlineMatches(){
        Interceptor.attach(base.add(HomePage_startGame), {
            onEnter(args) {
                args[3] = ptr(3);
            }
        });
    },
    settingsScreen() {
        Interceptor.attach(SettingsScreen_buttonClicked, {
            onEnter() {
                ShowFloaterTextAtDefaultPosition('Settings Button Clicked', 0.0, 0xFFFFFF00);
            }
        });
        Interceptor.attach(SettingsScreen_SettingsScreen, {
            onEnter(args) {
                ShowFloaterTextAtDefaultPosition('Settings Opened', 0.0, 0xFFFF00FF);
            }
        });
        
    },
    customButtons(){
        // Custom buttons
        let button_1 = malloc(310);
        let texture_button_1 = movieClip(newString("sc/ui.sc"), newString("popover_button_blue"), 1);
        GameButtonCtor(button_1);
        ButtonSetClip(button_1, texture_button_1);
        StageAdd(base.add(STAGE_INSTANCE).readPointer(), button_1);
        SetXY(button_1, 350, 150);
        fSetText(button_1, createStringObject("Kick"));
        let button_3 = malloc(310);
        let texture_button_3 = movieClip(newString("sc/ui.sc"), newString("popover_button_red"), 1);
        GameButtonCtor(button_3);
        ButtonSetClip(button_3, texture_button_3);
        StageAdd(base.add(STAGE_INSTANCE).readPointer(), button_3);
        SetXY(button_3, 500, 520);
        fSetText(button_3, createStringObject("Test"));
        let button_2 = malloc(310);
        let texture_button_2 = movieClip(newString("sc/ui.sc"), newString("popover_button_blue"), 1);
        GameButtonCtor(button_2);
        ButtonSetClip(button_2, texture_button_2);
        StageAdd(base.add(STAGE_INSTANCE).readPointer(), button_2);
        SetXY(button_2, 350, 200);
        fSetText(button_2, createStringObject("Something Special"));

        // Listen for custom buttons
        Interceptor.attach(base.add(CUSTOMBUTTON_PRESSED),{
            onEnter(args){
                if (args[0].toInt32() === button_1.toInt32()){
                    cache.sendCustomMessage(100001);
                }
                if (args[0].toInt32() === button_2.toInt32()) {
                    ShowFloaterTextAtDefaultPosition('You\'re gay');
                }
                if (args[0].toInt32() === button_3.toInt32()){
                    ShowFloaterTextAtDefaultPosition('Removed button Test', 0.0, 0xFFFF0000);
                    StageRemove(base.add(STAGE_INSTANCE).readPointer(), button_3);
                }
            }
        });
    },
    changeTexts(){
        let latencyTestResults_text_addr = base.add(0xBC1607);
        let latencyTestResults_text = lobbyText;
        Memory.protect(latencyTestResults_text_addr, latencyTestResults_text.length, "rwx");
        latencyTestResults_text_addr.writeUtf8String(latencyTestResults_text);
    }
}

const kubuneMessageFactory = {
    onReceive(type){
        switch(type){
            case 20104:
                Memory.writeInt(cache.state, 5);
                misc.isDev();
                misc.offlineMatches();
                misc.changeTexts();
                misc.customButtons();
                misc.settingsScreen();
                break
            case 20103:
                cache.selector.detach();
                cache.pthread.detach();
                break
        }
    }
}

function setupKubuneMessaging(){
    cache.serverConnection = Memory.readPointer(base.add(SERVER_CONNECTION));
    cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
    cache.recvQueue = cache.messaging.add(60);
    cache.sendQueue = cache.messaging.add(84);
    cache.state = cache.messaging.add(208);
    cache.loginMessagePtr = cache.messaging.add(212);
    cache.createMessageByType = new NativeFunction(base.add(CREATE_MESSAGE_BY_TYPE), 'pointer', ['pointer', 'int']);
    
    cache.sendMessage = function(message) {
        try {
            log(`${message}`);
        } catch (error) {
            log(`Error while print message`);
        }
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
    }

    cache.sendCustomMessage = function(type, length = 0) {
        var messageBuffer = malloc(7);
        Buffer._setEncodingLength(messageBuffer, length);
        Buffer._setMessageType(messageBuffer, type);
        Buffer._setMessageVersion(messageBuffer, 0);
        libc_send(cache.fd, messageBuffer, 7, 0);
        free(messageBuffer);
    }

    function onWakeup(){
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


    function onReceive(){
        var headerBuffer = malloc(7);
        var received = libc_recv(cache.fd, headerBuffer, 7, 256);
        var messageType = Buffer._getMessageType(headerBuffer);
        var payloadLength = Buffer._getEncodingLength(headerBuffer);
        var messageVersion = Buffer._getMessageVersion(headerBuffer);
        if(received === 0){
            cache.selector.detach();
            cache.pthread.detach();
        }
        kubuneMessageFactory.onReceive(messageType);
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

    cache.pthread = Interceptor.attach(Module.findExportByName('libc.so', 'pthread_cond_signal'), {
        onEnter: function(args) {
            onWakeup();
        }
    });

    cache.selector = Interceptor.attach(Module.findExportByName('libc.so', 'select'), {
        onEnter: function(args) {
            onReceive();
        }
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

rpc.exports = {
    init: function(stage, options){
        cache.options = options || {}
		Interceptor.detachAll();
        Game.init();
    }
}