const base = Module.findBaseAddress('libg.so');
const base_size = Process.findModuleByName("libg.so").size;
//Memory.protect(base, base_size, "rwx");

var cache = {};

const GUI_instanceAddr = 0xE92E28;

// ModMenu
const Sprite = new NativeFunction(base.add(0x812704), 'void', ['pointer', 'int']);
const GameButton = new NativeFunction(base.add(0x2E4858), 'void', ['pointer']);
const PopupBase = new NativeFunction(base.add(0xB1B29C), 'void', ['pointer', 'pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer']);
const ListContainer_clearEntries = new NativeFunction(base.add(0x2EA9E4), 'void', ['pointer']);
const ResourceManager_getMovieClip = new NativeFunction(base.add(0x7B2D24), 'pointer', ['pointer', 'pointer', 'bool']);
const GUIContainer = new NativeFunction(base.add(0x838A9C), 'void', ['pointer']);
const GUIContainer_setMovieClip = new NativeFunction(base.add(0x838F00), 'void', ['pointer', 'pointer']);

const Stage_addChild = new NativeFunction(base.add(0x81C418), 'void', ['pointer', 'pointer']);
// ModMenu End
const GUI_showFloaterTextAtDefaultPos = new NativeFunction(base.add(0x2DFC4C), 'void', ['pointer', 'pointer', 'int', 'int']);
const ResourceListener_addFile = new NativeFunction(base.add(0x8C08B8), "void", ["pointer", "pointer"]);
const StringCtor = new NativeFunction(base.add(0x793D6C), 'pointer', ['pointer', 'pointer']);
const StringTable_getMovieClip = new NativeFunction(base.add(0x5B4BE4), 'pointer', ['pointer', 'pointer']);

var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['uint']);
var free = new NativeFunction(Module.findExportByName("libc.so", "free"), "void", ["pointer"]);
const targetModule = Module.findExportByName(null, "TargetFunctionName");

const ClientInfo = {
    env: 'dev',
    version: '52.177',
    branch: 'alpha-1',
    scriptVersion: 1
}

const Logger = {
    Print(text) {
        console.warn(text)
    }
}

String.prototype.ptr = function () {
    return Memory.allocUtf8String(this);
};
  
String.prototype.scptr = function () {
    let scptrmem = malloc(20);
    StringCtor(scptrmem, this.ptr());
    return scptrmem;
};

NativePointer.prototype.fromsc = function () {
    return StringDecode(this);
  };

function StringDecode(String) {
    if (String.add(4).readInt() >= 8) {
      return String.add(8).readPointer().readUtf8String();
    }
    return String.add(8).readUtf8String();
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
        case "bytearray":
            Memory.protect(address, value.length, "rwx");
            Memory.writeByteArray(address, value);
            break;
        case "string":
            Memory.protect(address, value.length, "rwx");
            Memory.writeUtf8String(address, value);
            break;
        case "short":
            Memory.protect(address, 2, "rwx");
            Memory.writeS16(address, value);
            break;
    }
}

function ShowFloaterText(text) {
    GUI_showFloaterTextAtDefaultPos(base.add(GUI_instanceAddr).readPointer(), text.scptr(), 0, -1)
}

Interceptor.replace(base.add(0x6E9C1C), new NativeCallback(function (a1) {
    let args = [a1];
    CmdHandler(args);
  }, "void", ["pointer"]));

let AddFile = Interceptor.attach(base.add(0x8C08B8), {
    onEnter(args) {
      AddFile.detach();
      ResourceListener_addFile(args[0], "sc/debug.sc".scptr());
      Logger.Print("ResourceListener.addFile: sc/debug.sc loaded!");
    }
});

function CmdHandler(args) {
    let Message = args[0].add(92).readPointer().fromsc()
    Logger.Print("ChatToAllianceStreamMessage.encode Message: " + Message)
    switch (Message) {
        case '/clientinfo':
            let clientInfo = "ClientInfo.info: env: " + ClientInfo.env + ' version: ' + ClientInfo.version + ' branch: ' + ClientInfo.branch
            Logger.Print(clientInfo);
            ShowFloaterText(clientInfo);
            break;
        case '/loadModMenu':
            ClientMod.ModMenu();
            break;
        case '/debug':
            DebugMenu.DebugMenu();
            break;
        case '/colorfull':
            Interceptor.attach(base.add(0x56FBF8), {
                onEnter(args) {
                    args[3] = ptr(3)
                }
            })
            WriteToMemory(base.add(0x7ACE1C), 'Byte', 1);
    }
}

const ClientMod = {
    ModMenu() {
        cache.ModMenu = malloc(2000);
        cache.ModMenu.buttons = []
        Logger.Print('ClientMod.ModMenu: ModMenu loaded.')
        //ListContainer_clearEntries(cache.ModMenu.add(256).readPointer());

        let Buttons = ['Penis']
        let LocationThemesItemCount = Buttons.length;
        WriteToMemory(cache.ModMenu.add(280), 'Short', LocationThemesItemCount);
        cache.ModMenu.add(272).writePointer(malloc(4*LocationThemesItemCount));
        for (let LocationThemeItemJ = 0; LocationThemeItemJ < LocationThemesItemCount; LocationThemeItemJ++) {
            let LocationThemeItemPtr = malloc(296);
            this.ModMenuButton(LocationThemeItemPtr, ProcessedLocationThemeItem, LocationThemeData);
            self.add(272).readPointer().add(4*LocationThemeItemJ).writePointer(LocationThemeItemPtr);
            //CustomButton_setButtonListener(LocationThemeItemPtr, self.add(72));
            //ListContainer_addEntry(self.add(256).readPointer(), LocationThemeItemPtr);
        }
    },
    ModMenuButton(name) {
        GameButton(cache.ModMenu)
        const VC_CustomButton_setMovieClip = new NativeFunction(cache.ModMenu.readPointer().add(156).readPointer(), 'void', ['pointer', 'pointer', 'int']);
        let LocationThemeItemMC = StringTable_getMovieClip('sc/ui.sc'.scptr(), 'country_item'.scptr());
        VC_CustomButton_setMovieClip(cache.ModMenu, LocationThemeItemMC, 1);

    }
}

const DebugMenu = {
    DebugMenu() {
        let Stage = base.add(0xE97DF0).readPointer()
        cache.DebugMenu = malloc(2000);
        Sprite(cache.DebugMenu, 1);
        GUIContainer(cache.DebugMenu);
        let DebugMenu = ResourceManager_getMovieClip('sc/debug.sc'.ptr(), 'debug_menu'.ptr(), 1);
        var v6 = 0.1
		if (Stage.add(0x147C).readFloat() != 0.0) {
			v6 = Stage.add(0x147C).readFloat()
		}
        GUIContainer_setMovieClip(cache.DebugMenu, DebugMenu);
        var v29 = Stage.add(60).readFloat();
		var v30 = Stage.add(56).readFloat();
		var v34 = Stage.add(0x14E8).readInt();
		var generatedX = v34 - (v29 + v30) / v6;
        console.log(generatedX)
        cache.DebugMenu.add(28).writeFloat(700);
        cache.DebugMenu.add(32).writeFloat(0);
        Stage_addChild(Stage, cache.DebugMenu);
        Logger.Print('DebugMenu.DebugMenu: create.');
    }
}

const connect = {
    init() {
        Interceptor.attach(base.add(0x474240), { // ServerConnection::connectTo
			onEnter(args) {
				args[1].add(8).readPointer().writeUtf8String("192.168.0.3");
                Memory.writeUtf8String(base.add(0x12D5F9), '9339');
                WriteToMemory(base.add(0x167938), "ByteArray", [176, 34, 250, 182, 83, 219, 239, 33, 143, 194, 166, 186, 14, 16, 90, 40, 105, 220, 235, 204, 35, 85, 91, 245, 70, 17, 164, 194, 135, 106, 27, 51, 150, 95, 152, 1, 95, 36, 141, 253, 43, 150, 246, 11, 175, 41, 206, 70, 38, 38, 240, 134, 173, 29, 183, 166, 251, 25, 9, 72, 207, 201, 216, 105]);
			}
		});
    }
}

rpc.exports.init = function() {
    connect.init()
}