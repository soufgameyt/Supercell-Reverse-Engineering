var stage_address;

var menuType;

var DEBUG_MENU = 1;
var INFO_MENU = 2;
var dptr;
var chatLeave = 0;

const Libg = {
    init() {
        this.base = Module.findBaseAddress("libg.so");

        this.libc = {
            addr: {
                getaddrinfo: Module.findExportByName('libc.so', 'getaddrinfo'),
				malloc: Module.findExportByName('libc.so', 'malloc'),
                free: Module.findExportByName("libc.so", "free")
            },
            malloc(value) {
                return new NativeFunction(Libg.libc.addr.malloc, "pointer", ["int"])(value);
            },
            free(value) {
                return new NativeFunction(Libg.libc.addr.free, 'void', ['pointer'])(value);
            }
        }

        this.Stage = {
            addr: {
                ctor: Libg.offset("_ZN5StageC2Ev"),
                addChild: Libg.offset("_ZN5Stage8addChildEP13DisplayObject"),
                removeChild: Libg.offset("_ZN5Stage11removeChildEP13DisplayObject")
            },
            addChild(stage, displayObject) {
                return new NativeFunction(Libg.Stage.addr.addChild, "int", ["pointer", "pointer"])(stage, displayObject);
            },
            removeChild(stage_address, displayObject) {
                return new NativeFunction(Libg.Stage.addr.removeChild, "int", ["pointer", "pointer"])(stage_address, displayObject);
            }
        }

        this.MoneyHud = {
            addr: {
                ctor: Libg.offset("_ZN8MoneyHUDC2EP9MovieClip")
            }
        }

        this.ResourceListener = {
            addr: {
                addFile: Libg.offset("_ZN16ResourceListener7addFileEPKc")
            },
            addFile(ctor, value) {
                return new NativeFunction(Libg.ResourceListener.addr.addFile, "void", ["pointer", "pointer"])(ctor, value);
            }
        }

        this.GameMode = {
            addr: {
                addResourcesToLoad: Libg.offset("_ZN8GameMode18addResourcesToLoadEP16ResourceListener")
            }
        }

        this.DebugMenu = {
            addr: {
                ctor: Libg.offset("_ZN9DebugMenuC2Ev")
            },
            DebugMenuCtor(ptr) {
                return new NativeFunction(Libg.DebugMenu.addr.ctor, "void", ["pointer"])(ptr);
            }
        }

        this.HUD = {
            addr: {
                update: Libg.offset("_ZN3HUD6updateEf")
            }
        }

        this.DebugMenuBase = {
            addr: {
                update: Libg.offset("_ZN13DebugMenuBase6updateEf")
            },
            DebugMenuBaseUpdate(ptr, fl) {
                return new NativeFunction(Libg.DebugMenuBase.addr.update, "int", ["pointer", "float"])(ptr, fl);
            }
        }

        this.ToggleDebugMenuButton = {
            addr: {
                buttonPressed: Libg.offset("_ZN21ToggleDebugMenuButton13buttonPressedEv")
            }
        }

        this.ChatInputGlobal = {
            addr: {
                sendMessage: Libg.offset("_ZN15ChatInputGlobal11sendMessageEv")
            }
        }

        this.String = {
            addr: {
                ctor: Libg.offset("_ZN6StringC2EPKci")
            }
        }

        this.DebugInfo = {
            addr: {
                ctor: Libg.offset("_ZN9DebugInfoC2Ev")
            },
            DebugInfoCtor(ptr) {
                return new NativeFunction(Libg.DebugInfo.addr.ctor, "void", ["pointer"])(ptr);
            }
        }

        this.LogicDefines = {
            addr: {
                isPlatformAndroid: Libg.offset("_ZN12LogicDefines17isPlatformAndroidEv"),
                isPlatformIOS: Libg.offset("_ZN12LogicDefines13isPlatformIOSEv")
            }
        }
    },
    offset(value) {
		return Module.findExportByName("libg.so", value);
	}
}

const LoadGame = {
    init() {
        var load = Interceptor.attach(Libg.GameMode.addr.addResourcesToLoad, {
            onEnter(args) {
                log("GameMode::addResourcesToLoad called");
                load.detach();
                Libg.ResourceListener.addFile(args[1], Libg.base.add(0x2B29AB));
                log("The sc/debug.sc has been loaded!");
            }
        });
    }
}

const Stage = {
    init() {
        var stage = Interceptor.attach(Libg.Stage.addr.ctor, {
            onEnter(args) {
                log("Stage::Stage() called");
                stage.detach();
                stage_address = args[0];
            }
        });
    }
}

const GameLoaded = {
    init() {
        var gameLoaded = Interceptor.attach(Libg.MoneyHud.addr.ctor, {
            onEnter(args) {
                log("MoneyHUD::MoneyHUD() called");
                gameLoaded.detach();
                showDebugMenu();
            }
        });
    }
}

const HudUpdate = {
    init() {
        var hudUpdate = Interceptor.attach(Libg.HUD.addr.update, {
            onEnter(args) {
                if (menuType > 0) {
                    Libg.DebugMenuBase.DebugMenuBaseUpdate(dptr, 20);
                }
            }
        });
    }
}

const CloseMenu = {
    init() {
        var closeMenu = Interceptor.attach(Libg.ToggleDebugMenuButton.addr.buttonPressed, {
            onEnter(args) {
                switch(menuType) {
                    case DEBUG_MENU:
                        Libg.Stage.removeChild(stage_address, dptr);
                        Libg.libc.free(dptr);
                        menuType = 0;
                        log("DebugMenu closed");
                        break;
                    case INFO_MENU:
                        Libg.Stage.removeChild(stage_address, dptr);
                        Libg.libc.free(dptr);
                        menuType = 0;
                        log("InfoMenu closed");
                        break;
                }
            }
        });
    }
}

const ChatManager = {
    init() {
        var chat = Interceptor.attach(Libg.ChatInputGlobal.addr.sendMessage, {
            onEnter(args) {
                chatLeave = 0;
                var cmd = Interceptor.attach(Libg.String.addr.ctor, {
                    onEnter(args) {
                        let cmdMessage = args[1].readUtf8String();
                        log("Message: " + cmdMessage);
                        switch (cmdMessage) {
                            case "/debug":
                                showDebugMenu();
                                cmd.detach();
                                break;
                            case "/info":
                                showDebugInfo();
                                cmd.detach();
                        }
                        if(chatLeave === 1) {
                            cmd.detach();
                        }
                    }
                });
            },
            onLeave(args) {
                chatLeave = 1;
            } 
        });
    }
}

/* const ChangePaltform = {
    init() {
        var isAndroidFunction = new NativeFunction(Libg.LogicDefines.addr.isPlatformAndroid, "int", []);
        var isIOSFunction = new NativeFunction(Libg.LogicDefines.addr.isPlatformIOS, "int", []);

        log("Before change - isPlatformAndroid:", isAndroidFunction(), "isPlatformIOS:", isIOSFunction());

        var change = Interceptor.replace(Libg.LogicDefines.addr.isPlatformAndroid, new NativeCallback(function() {
            return 0;
        }, "int", []));

        var ios = Interceptor.replace(Libg.LogicDefines.addr.isPlatformIOS, new NativeCallback(function() {
            return 1;
        }, "int", []));

        var isAndroid = isAndroidFunction();
        var isIOS = isIOSFunction();

        log("After change - isPlatformAndroid: " + isAndroid + " isPlatformIOS: " + isIOS);
    }
} */

const ConnectionManager = {
    init() {
        var connect = Interceptor.attach(Libg.libc.addr.getaddrinfo, {
            onEnter(args) {
                this.address = args[0].readUtf8String();
                log("Address: " + this.address);
                this.newAdress = args[0] = Memory.allocUtf8String("192.168.0.104"); //use your address
                log("New Address: " + this.newAdress.readUtf8String());
            }
        })
        }
    }

rpc.exports.init = function() {
    try {
        Libg.init();
        //ChangePaltform.init(); - TEST
        LoadGame.init();
        Stage.init();
        GameLoaded.init();
        HudUpdate.init();
        CloseMenu.init();
        ChatManager.init();
        ConnectionManager.init();
    }
    catch (err) {
		console.err(err);
	}

    log("Initialized!");
}

function log(msg) {
    console.log("[*] " + msg)
}

function showDebugMenu() {
    menuType = DEBUG_MENU;
    dptr = Libg.libc.malloc(1000);
    Libg.DebugMenu.DebugMenuCtor(dptr);
    Libg.Stage.addChild(stage_address, dptr);
    log("DebugMenu is displayed");
}

function showDebugInfo() {
    menuType = INFO_MENU;
    dptr = Libg.libc.malloc(1000);
    Libg.DebugInfo.DebugInfoCtor(dptr);
    Libg.Stage.addChild(stage_address, dptr);
    log("DebugInfo is displayed");
}