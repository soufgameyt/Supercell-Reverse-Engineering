const Libg = {
	init() {
		this.base = Module.findBaseAddress('libg.so');
		
		this.NativeFont = {
			addr: {}
		};
		
		this.NativeFont.addr.formatString = this.offset(0x44C26C);
		this.isLicenseCheckRequired = this.offset(0x3F5598); // weird thing in v13 and lower
		this.HomePageStartGame = this.offset(0x3ED6DC);
		this.DebugMenuButton = malloc(1500);
		this.DebugMenu = malloc(2000);
	},
	offset(off) {
		return this.base.add(off);
	}
}

var cache = {}

const ADD_FILE = 0x28E1B0;
const GameButton = 0x27D37C;
const ResourceManager = 0x3685A8;
const STAGE_ADD_CHILD = 0x3BF30;
const STAGE_REMOVE_CHILD = 0x61054;
const STAGE_ADDRESS = 0x7D242C;
const SET_TEXT = 0x3E1018;
const DEBUG_MENU_CTOR = 0x1AC20C;
const hook = Interceptor.attach;

var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);

let DebugButton = malloc(1000);
let CloseButton = malloc(1000);
let DebugMenuMem = malloc(1000);
var IsDebugMenuOpened = 0;

function createStringPtr(message) {
    var charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr
}

function createStringObject(mmmdmskads) {
    const StringCtor = new NativeFunction(Libg.offset(0x102658), 'pointer', ['pointer', 'pointer']);
    var land = createStringPtr(mmmdmskads);
    let pesocheck = malloc(128);
    StringCtor(pesocheck, land);
    return pesocheck;
}

const DebugMenu = {
    createDebugButton() {
        const base = Process.findModuleByName('libg.so').base;
        const StageAdd = new NativeFunction(Libg.offset(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
        const StageRemove = new NativeFunction(Libg.offset(STAGE_REMOVE_CHILD), 'void', ['pointer', 'pointer']);
        const fSetText = new NativeFunction(Libg.offset(SET_TEXT), 'pointer', ['pointer', 'pointer']);
        const DebugMenuCtor = new NativeFunction(Libg.offset(DEBUG_MENU_CTOR), 'pointer', ['pointer']);
        const DebugMenuUpdate = new NativeFunction(Libg.offset(0x1C2B20), "int", ["pointer", "float"]);
        // Custom Debug
        const DebugMenuBase = new NativeFunction(base.add(0x166900), 'pointer', ['pointer', 'pointer', 'pointer']);
        const DebugMenuBaseSetTitle = new NativeFunction(base.add(0x1E6738), 'pointer', ['pointer', 'pointer']);

        setTimeout(function() {
            DebugMenuCtor(DebugMenuMem)
			//DebugMenuBase(DebugMenuMem, createStringPtr('sc/debug.sc'), createStringPtr('debug_menu'));
            //DebugMenuBaseSetTitle(DebugMenuMem, createStringPtr('Debug Menu'))

            /*cache.RestartGame = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame, 'Restart Game', 0, 0, 32);

            cache.RestartGame1 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame1, 'Restart Game', 0, 0, 32);

            cache.RestartGame2 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame2, 'Restart Game', 0, 0, 32);

            cache.RestartGame3 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame3, 'Restart Game', 0, 0, 32);

            cache.RestartGame4 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame4, 'Restart Game', 0, 0, 32);

            cache.RestartGame5 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame5, 'Restart Game', 0, 0, 32);

            cache.RestartGame6 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame6, 'Restart Game', 0, 0, 32);

            cache.RestartGame7 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame7, 'Restart Game', 0, 0, 32);

            cache.RestartGame8 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame8, 'Restart Game', 0, 0, 32);

            cache.RestartGame9 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame9, 'Restart Game', 0, 0, 32);

            cache.RestartGame10 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame10, 'Restart Game', 0, 0, 32);

            cache.RestartGame11 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame11, 'Restart Game', 0, 0, 32);

            cache.RestartGame12 = malloc(1000);
            DebugMenu.addButton(DebugMenuMem, cache.RestartGame12, 'Restart Game', 0, 0, 32);*/
		}, 2000);

        setTimeout(function() {
			new NativeFunction(Libg.offset(GameButton), 'void', ['pointer'])(DebugButton);
            let movieClip = new NativeFunction(Libg.offset(ResourceManager), 'pointer', ['pointer', 'pointer', 'bool'])(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_button"), 1);
    	    new NativeFunction(Libg.offset(0x1795A0), 'void', ['pointer', 'pointer'])(DebugButton, movieClip);

    	    new NativeFunction(Libg.offset(0x181550), 'void', ['pointer', 'float', 'float'])(DebugButton, 30, 515);
    	    fSetText(DebugButton, createStringObject("D"));
            StageAdd(Libg.offset(STAGE_ADDRESS).readPointer(), DebugButton);

            new NativeFunction(Libg.offset(GameButton), 'void', ['pointer'])(CloseButton);
            let movieClip1 = new NativeFunction(Libg.offset(ResourceManager), 'pointer', ['pointer', 'pointer', 'bool'])(createStringPtr("sc/debug.sc"), createStringPtr("debug_menu_button"), 1);
    	    new NativeFunction(Libg.offset(0x1795A0), 'void', ['pointer', 'pointer'])(CloseButton, movieClip1);

    	    new NativeFunction(Libg.offset(0x181550), 'void', ['pointer', 'float', 'float'])(CloseButton, 30, 515);
    	    fSetText(CloseButton, createStringObject("D"));
		}, 3000);

        setTimeout(function() {
            Interceptor.attach(base.add(0x3C7634), {
                onEnter(args) {
                    if (args[0].toInt32() == DebugButton.toInt32()) {
                        if (IsDebugMenuOpened == 0) {
                            IsDebugMenuOpened = 1;
                            StageAdd(Libg.offset(STAGE_ADDRESS).readPointer(), DebugMenuMem);
                            StageAdd(Libg.offset(STAGE_ADDRESS).readPointer(), CloseButton);
                            console.warn('[DebugMenu] Open!')
                        }
                    }
                    if (args[0].toInt32() == CloseButton.toInt32()) {
                        if (IsDebugMenuOpened == 1) {
                            IsDebugMenuOpened = 0;
                            StageRemove(Libg.offset(STAGE_ADDRESS).readPointer(), DebugMenuMem);
                            StageRemove(Libg.offset(STAGE_ADDRESS).readPointer(), CloseButton);
                            console.warn('[DebugMenu] Close!')
                        }
                    }
                }
            });
        }, 2000)


        setTimeout(function() {
			setInterval(function() {
				DebugMenuUpdate(DebugMenuMem, 20);
			}, 5);
		}, 2000);
    },
    addButton(memory, memory1, name, a4, a5, a6) {
        const DebugMenu_addGameButton = new NativeFunction(Libg.offset(0x2684E4), 'void', ['pointer', 'pointer','pointer','int','int','int']) //
        const GameButton_Ctor = new NativeFunction(Libg.offset(GameButton), 'void', ['pointer']);
        GameButton_Ctor(memory1);
        DebugMenu_addGameButton(memory, memory1, createStringPtr(name), a4, a5, a6);
    }
}

const AddFiler = {
	init(scfile) {
		const AddFile = new NativeFunction(Libg.offset(ADD_FILE), 'int', ['pointer', 'pointer', 'int', 'int', 'int', 'int']);
		const AddFilik = hook(Libg.offset(ADD_FILE), {
			onEnter(args) {
				AddFile(args[0], createStringPtr(scfile), -1, -1, -1, -1);
                console.warn('[AddFile] sc/debug.sc loaded')
                AddFilik.detach()
			}
		});
	}
}

hook(Module.findExportByName('libc.so', 'getaddrinfo'), {
    onEnter(args) {
        DebugMenu.createDebugButton();
    }
});

rpc.exports.init = function() {
	Libg.init();
    AddFiler.init("sc/debug.sc");
}
