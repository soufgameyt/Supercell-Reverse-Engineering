// After reading this code, Tails' phone went off

const Libg = Module.findBaseAddress("libg.so");
const Libg_size = Process.findModuleByName("libg.so").size;
const cache = {
    isLobbyInfoOff: false,
    inMenu: false
}

Memory.protect(Libg, Libg_size, "rwx");
var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['uint']);

const HomeMode_enter = Libg.add(0x55C6D4);
const SettingsScreen_buttonClicked = new NativeFunction(Libg.add(0x551ADC), 'void', ['pointer', 'pointer']);
const GameMain_reloadGame = new NativeFunction(Libg.add(0x1C97B0), 'void', ['pointer']);
const GameMain_Instance = 0xCCAC80;
const HomePage_updateLobbyInfo = new NativeFunction(Libg.add(0x5321F0), 'void', ['pointer', 'int']);
const GUI_showFloaterTextAtDefaultPos = new NativeFunction(Libg.add(0x2940AC), 'void', ['pointer', 'pointer', 'int', 'int']);
const StringC2EvString = Libg.add(0x708E04);
const StringCtor = new NativeFunction(StringC2EvString, "void", ["pointer", "pointer"]);
const GUI_instanceAddr = 0xCCC388;
const GameMain_update = new NativeFunction(Libg.add(0x1C771C), 'void', ['pointer', 'float', 'float']);

String.prototype.ptr = function () {
  return Memory.allocUtf8String(this);
};

String.prototype.scptr = function () {
  let scptrmem = malloc(20);
  StringCtor(scptrmem, this.ptr());
  return scptrmem;
};

const LobbyInfoPatcher = {
	init() {
		if (!cache.inMenu) {
            Interceptor.replace(Libg.add(0x5816B4), new NativeCallback(function() {
               return 0;
            }, 'int', []));

            Interceptor.replace(Libg.add(0x5816E4), new NativeCallback(function() {
               return 1;
            }, 'int', []));

            cache.inMenu = true
        }
	}
}

Interceptor.replace(GameMain_update, new NativeCallback(function(memory, unk, unk2) {
    Memory.writeUtf8String(Libg.add(0xECD3F), 'Beta Brawl v55.221!\n Author - t.me/@voronStudio\nSubscribe pls❤️')
    GameMain_update(memory, unk, unk2);
    console.log(memory + " " + unk + " " + unk2)
}, 'void', ['pointer', 'float', 'float']));

function RestartGame() {
    GameMain_reloadGame(Libg.add(GameMain_Instance).readPointer());
}

const ButtonsPatcher = {
	init() {
		Memory.writeUtf8String(Libg.add(0x116FE8), "Disable lobby info"); // I'm too lazy to search for ok for string ctor
	}
}

Interceptor.replace(HomePage_updateLobbyInfo, new NativeCallback(function(memory, unk) {
    if (!cache.isLobbyInfoOff) {
        HomePage_updateLobbyInfo(memory, unk)
    }
}, 'void', ['pointer', 'int']));

const LobbyInfoOff = {
    init() {
        cache.isLobbyInfoOff = !cache.isLobbyInfoOff
    }
}

function ShowFloaterText(text) {
    GUI_showFloaterTextAtDefaultPos(Libg.add(GUI_instanceAddr).readPointer(), text.scptr(), 0, -1)
}


Interceptor.replace(SettingsScreen_buttonClicked, new NativeCallback(function(self, CustomButton) {
    if (self.add(204).readPointer().equals(CustomButton)) {
        ShowFloaterText("now")
        LobbyInfoOff.init();
        setTimeout(function () {
          RestartGame();
        }, 5000);
    }
    else {
        SettingsScreen_buttonClicked(self, CustomButton);
    }
}, 'void', ['pointer', 'pointer']));

Interceptor.attach(HomeMode_enter, {
	onLeave(retVal) {
		console.log("WTF IT WORKS!");
		LobbyInfoPatcher.init();
		ButtonsPatcher.init();
	}
});
