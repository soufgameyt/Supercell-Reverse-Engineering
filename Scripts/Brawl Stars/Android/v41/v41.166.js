const base = Module.findBaseAddress('libg.so');

const Libg = {
    init() {
        let module = Process.findModuleByName('libg.so');
        Libg.begin = module.base;
        Libg.size = module.size;
        Libg.end = Libg.begin.add(Libg.size);

        Libg.AntiCheat = {
            addr: {}
        };

        Libg.AntiCheat.addr.guard_callback = Libg.offset(0x82F868);
        Libg.AntiCheat.addr.update = Libg.offset(0xAC92F0);
    },
    offset(addr) {
        return Libg.begin.add(addr);
    }
};

var cache = {};

const setXY = 0x8CD648;
const STAGE_ADD_CHILD = 0x87AEC0;
const TEXTFILED_SETTEXT = 0x51E7EC;

const stageoff = 0x1304AA0;

const fSetXY = new NativeFunction(base.add(setXY), 'void', ['pointer', 'float', 'float']);
const StringCtor = new NativeFunction(base.add(0x5D016C), 'pointer', ['pointer', 'pointer']);
const StageAdd = new NativeFunction(base.add(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
const fSetText = new NativeFunction(base.add(TEXTFILED_SETTEXT), 'pointer', ['pointer', 'pointer']);

var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);

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

const ResourceLoader = {
    AddFile() {
        const AddFile = new NativeFunction(Libg.offset(0x9BF610), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int', 'int']);
        const adder = Interceptor.attach(Libg.offset(0x9BF610), {
            onEnter: function(args) {
                adder.detach();
                AddFile(args[0], strPtr("sc/debug.sc"), -1, -1, -1, -1, 0);
                console.log("Loaded debug.sc!");
            }
        });
    }
}

const DebugMenuBase = {
    createDebugButton() {
        let button = malloc(700);
		new NativeFunction(Libg.offset(0x7C38C0), 'void', ['pointer'])(button);
        let DebugItem = new NativeFunction(Libg.offset(0x26E938), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_button"), 1);
        new NativeFunction(Libg.offset(0x9AF490), 'void', ['pointer', 'pointer'])(button, DebugItem);
        fSetXY(button, 30, 560);
        fSetText(button, createStringObject('D'))
		StageAdd(Libg.offset(stageoff).readPointer(), button);
    }
}

const PepperKiller = {
    init() {
        Memory.protect(Libg.offset(0x3647F8), 4, "rwx");
        Memory.writeByteArray(Libg.offset(0x3647F8), [0x00, 0x00, 0x50, 0xE1]); // Messaging::encryptAndWrite

        Memory.protect(Libg.offset(0x39651C), 4, "rwx");
        Memory.writeByteArray(Libg.offset(0x39651C), [0x05, 0x00, 0xA0, 0xE3]); // State

        Memory.protect(Libg.offset(0x6AE5E8), 4, "rwx");
        Memory.writeByteArray(Libg.offset(0x6AE5E8), [0x1E, 0xFF, 0x2F, 0xE1]); // PepperCrypto::secretbox_open

        Memory.protect(Libg.offset(0x396448), 4, "rwx");
        Memory.writeByteArray(Libg.offset(0x396448), [0x02, 0x80, 0xA0, 0xE1]); // Messaging::sendPepperAuthentification
    }
}

const MessageManager = {
	Receive() {
		const ReceiveMessage = Interceptor.attach(Libg.offset(0x562178), { // MessageManager::receiveMessage
			onEnter(args) {
				const Msg = args[1];
				const MsgType = new NativeFunction(Memory.readPointer(Memory.readPointer(Msg).add(20)), 'int', ['pointer'])(Msg);
                console.log('[MessageManager::receiveMessage] MessageID: ' + MsgType)
                if (MsgType === 20104) { // LoginOkMessage
                    DebugMenuBase.createDebugButton();
				}
			}
		});
	}
}

const Patcher = {
    init() {
        Interceptor.replace(Libg.offset(0x9F012C), new NativeCallback(function() {
            return 0;
         }, 'int', []));

         Interceptor.replace(Libg.offset(0x757960), new NativeCallback(function() {
            return 1;
         }, 'int', []));

         Interceptor.replace(Libg.offset(0x8A3B4C), new NativeCallback(function() {
            return 1;
         }, 'int', []));
    }
}

const Connect = {
    init() {
        Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
            onEnter(args) {
              this.str = args[0] = Memory.allocUtf8String('172.20.10.2');
              args[1].writeUtf8String('9339');
              PepperKiller.init()
              console.log('Connecting to ' + args[0].readUtf8String() + ':' + args[1].readUtf8String());
            }
          });
        Interceptor.attach(Libg.offset(0x6B029C), { // ServerConnection::connectTo
			onEnter(args) {
				args[1].add(8).readPointer().writeUtf8String("172.20.10.2");
			}
		});
    }
}


function log(text) {
    console.log('[*] ' + text);
}

rpc.exports.init = function() {
    Libg.init();
    Connect.init();
    ResourceLoader.AddFile();
    MessageManager.Receive();
    Patcher.init();
}