var cache = {
    modules: {},
    options: {}
};

// Pointers \\
var DECRYPT_DATA_POINTER = 0x370AC4;
var ENCRYPT_AND_WRITE_POINTER = 0x2FB984;
var isDevPtr = 0x7B89A0;
var isDevBuildPtr = 0x2D514C;
var isProdPtr = 0x728FA4;
var sendPepperAuthenticationPtr = 0x92EB0C;
var homePageStartGamePtr = 0x5C845C;
var signCheckPtr = 0x738198;
var anticheatUpdatePtr = 0x27092C;
var loginEncodePtr = 0x696A38;
var UltiBypassPtr = 0x0A0E50;
var camerdaModeChangedPtr = 0x2E1BF8;
var supercellIdOpenWindowPtr = 0x87B158;
var STATE = 16;
// Pointers \\

// Config \\
var isDev = 1;
var isDevBuild = 1;
var isProd = 0;
var POINTER_SIZE = 4;
// Config \\

var log = function(text) {
    Java.use("android.util.Log").v("frida", " " + text);
}

var base = Module.findBaseAddress('libg.so');
var connect = new NativeFunction(Module.findExportByName('libc.so', 'connect'), 'int', ['int', 'pointer', 'uint']);
var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
var free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);
var memmove = new NativeFunction(Module.findExportByName('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']);
var ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
var inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
var libc_send = new NativeFunction(Module.findExportByName('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']);

var Message = {
    _getByteStream: function(message) {
        return message.add(8);
    },
    _getVersion: function(message) {
        return Memory.readInt(message.add(4));
    },
    _getMessageType: function(message) {
        return new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(20)), 'int', ['pointer'])(message);
    },
    _encode: function(message) {
        (new NativeFunction(Memory.readPointer(Memory.readPointer(message).add(8)), 'void', ['pointer']))(message);
    }
};
var ByteStream = {
    _getOffset: function(byteStream) {
        return Memory.readInt(byteStream.add(16));
    },
    _getByteArray: function(byteStream) {
        return Memory.readPointer(byteStream.add(28));
    }
};
var Buffer = {
    _setEncodingLength: function(buffer, length) {
        Memory.writeU8(buffer.add(2), length >> 16 & 0xFF);
        Memory.writeU8(buffer.add(3), length >> 8 & 0xFF);
        Memory.writeU8(buffer.add(4), length & 0xFF);
    },
    _setMessageType: function(buffer, type) {
        Memory.writeU8(buffer.add(0), type >> 8 & 0xFF);
        Memory.writeU8(buffer.add(1), type & 0xFF);
    },
    _setMessageVersion: function(buffer, version) {
        Memory.writeU8(buffer.add(5), version >> 8 & 0xFF);
        Memory.writeU8(buffer.add(6), version & 0xFF);
    }
};

function setupMessaging() {
    cache.clubLeagueClicked = new NativeFunction(base.add(0x84FF28), 'void', ['pointer', 'pointer']);
    cache.guiGetInstance = new NativeFunction(base.add(0x1544E4), 'pointer', []);
    cache.genericPopupClub = new NativeFunction(base.add(0x5688E8), 'void', ['pointer']);
    cache.guiShowPopup = new NativeFunction(base.add(0x464D9C), 'pointer', ['pointer', 'pointer', 'uint', 'uint', 'uint']);

    function setupPointers(messaging, loginMessage) {
        cache.messaging = messaging;
        cache.state = cache.messaging.add(STATE);
    }

    function onWakeup(message) {
        var messageType = Message._getMessageType(message);
        //log("[CLIENT] MessageType: " + messageType);
        //log("[CLIENT] Message: " + message);
        Message._encode(message);
        if (messageType === 10101) {
            hook_misc_functions();
            Memory.writeInt(cache.state, 5); // Editing state as we don't intercept server packet
        }
        var byteStream = Message._getByteStream(message);
        var messagePayloadLength = ByteStream._getOffset(byteStream);
        var messageBuffer = malloc(messagePayloadLength + 7);
        memmove(messageBuffer.add(7), ByteStream._getByteArray(byteStream), messagePayloadLength);
        Buffer._setEncodingLength(messageBuffer, messagePayloadLength);
        Buffer._setMessageType(messageBuffer, messageType);
        Buffer._setMessageVersion(messageBuffer, Message._getVersion(message));
        libc_send(cache.fd, messageBuffer, messagePayloadLength + 7, 0);
        free(messageBuffer);
    }

    var sendPepperAuthentication = Interceptor.attach(base.add(sendPepperAuthenticationPtr), { // sendPepperAuthentication2
        onEnter: function(args) {
            args[1] = args[2];
            setupPointers(args[0], args[2]);
            sendPepperAuthentication.detach();
        }
    });

    Interceptor.replace(base.add(ENCRYPT_AND_WRITE_POINTER), new NativeCallback(function(Messaging, PiranhaMessage) {
        onWakeup(PiranhaMessage);
    }, 'void', ['pointer', 'pointer']));

    Interceptor.attach(base.add(homePageStartGamePtr), { // offlineBattles
        onEnter: function(args) {
            args[3] = ptr(3);
        }
    });

    Memory.protect(base.add(0x1DA6CC), 4, "rwx"); // PepperEncrypter::Decrypt
    base.add(0x1DA6CC).writeByteArray([0x00, 0x00, 0xa0, 0xe3]);

    Interceptor.attach(base.add(0x7AD928), {
        onEnter: function(args) {
            log("[WARNING] " + args[0].readUtf8String() + " " + this.returnAddress.sub(base));
        }
    });

    Interceptor.attach(base.add(0x545B0C), {
        onEnter: function(args) {
            log("[ERROR] " + args[0].readUtf8String() + " " + this.returnAddress.sub(base));
        }
    });

    
}

function hook_misc_functions() {
    var scidbutton = 0x38F250;
    Memory.protect(base.add(scidbutton), 4, "rwx"); // SCID Button
    base.add(scidbutton).writeByteArray([0x01, 0x70, 0xa0, 0xe3]);

    var scidbuttonText = 0xE7BDEF;
    var cameraModeText = "Camera Mode";
    Memory.protect(base.add(scidbuttonText), 15, "rwx"); // scidbuttonText
    base.add(scidbuttonText).writeUtf8String(cameraModeText);

    var playedbeforetextPointer = 0xE95448;
    var playedbeforetext = "https://discord.gg/59zDRUp2rW";
    Memory.protect(base.add(playedbeforetextPointer), 26, "rwx"); // scidbuttonText
    base.add(playedbeforetextPointer).writeUtf8String(playedbeforetext);

    var cameraChange = new NativeFunction(base.add(camerdaModeChangedPtr), 'int', []);
    Interceptor.replace(base.add(supercellIdOpenWindowPtr), new NativeCallback(function(a1, a2) {
        cameraChange();
    }, 'void', ['pointer', 'pointer']));

    Interceptor.replace(base.add(isProdPtr), new NativeCallback(function() {
        if (this.returnAddress.equals(base.add(0x7CF548)) || this.returnAddress.equals(base.add(0x7CF500))) {
            return isProd;
        }
        return 1;
    }, 'uint', []));

    Interceptor.replace(base.add(isDevBuildPtr), new NativeCallback(function() {
        return isDevBuild;
    }, 'uint', []));

    Interceptor.replace(base.add(isDevPtr), new NativeCallback(function() {
        return isDev;
    }, 'uint', []));
}

Memory.protect(base.add(signCheckPtr), 4, "rwx"); // Signature check
base.add(signCheckPtr).writeByteArray([0x00, 0xf0, 0x20, 0xe3]);

Memory.protect(base.add(anticheatUpdatePtr), 4, "rwx"); // Anticheat Update
base.add(anticheatUpdatePtr).writeByteArray([0x00, 0xf0, 0x20, 0xe3]);

Memory.protect(base.add(loginEncodePtr), 4, "rwx"); // LoginMessage
base.add(loginEncodePtr).writeByteArray([0xe0, 0x03, 0x00, 0xea]);

Memory.protect(base.add(UltiBypassPtr), 4, "rwx"); // UltiBypass
base.add(UltiBypassPtr).writeByteArray([0xd0, 0x04, 0x00, 0xea]);

function hook_pre_functions() {

}

/*var sentryBypass = Interceptor.attach(Module.findExportByName('libsentry.so', 'sentry_set_tag'), {
    onEnter: function(args) {
        hook_pre_functions();
        sentryBypass.detach();
    }
});*/

Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
    onEnter: function(args) {
        if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
            cache.fd = args[0].toInt32();
            Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String("10.0.0.231")));
            setupMessaging();
        }
    }
});
