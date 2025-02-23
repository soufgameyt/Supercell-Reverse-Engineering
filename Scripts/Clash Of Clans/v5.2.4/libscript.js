var base = Module.findBaseAddress("libg.so");
var mallocPtr = Module.findExportByName("libc.so", "malloc");
var freePtr = Module.findExportByName("libc.so", "free");
var getaddrinfoPtr = Module.findExportByName(null, 'getaddrinfo');

var ChatInputGlobalSendMessagePtr = Module.findExportByName("libg.so", "_ZN15ChatInputGlobal11sendMessageEv");
var StringPtr = Module.findExportByName("libg.so", "_ZN6StringC2EPKci");
var GameModeAddResourcesToLoadPtr = Module.findExportByName("libg.so", "_ZN8GameMode18addResourcesToLoadEP16ResourceListener");
var ResourceListenerAddFilePtr = Module.findExportByName("libg.so", "_ZN16ResourceListener7addFileEPKc");
var StageCtorPtr = Module.findExportByName("libg.so", "_ZN5StageC2Ev");
var StageAddChildPtr = Module.findExportByName("libg.so", "_ZN5Stage8addChildEP13DisplayObject");
var MoneyHudCtorPtr = Module.findExportByName("libg.so", "_ZN8MoneyHUDC2EP9MovieClip");
var DebugMenuCtorPtr = Module.findExportByName("libg.so", "_ZN9DebugMenuC2Ev");
var DebugMenuBaseUpdatePtr = Module.findExportByName("libg.so", "_ZN13DebugMenuBase6updateEf");
var HUDUpdtePtr = Module.findExportByName("libg.so", "_ZN3HUD6updateEf");
var ToggleDebugMenuButtonButtonPressedPtr = Module.findExportByName("libg.so", "_ZN21ToggleDebugMenuButton13buttonPressedEv");
var StageRemoveChildPtr = Module.findExportByName("libg.so", "_ZN5Stage11removeChildEP13DisplayObject");
var DebugInfoCtor = Module.findExportByName("libg.so", "_ZN9DebugInfoC2Ev");

var malloc = new NativeFunction(mallocPtr, 'pointer', ['int']);
var free = new NativeFunction(freePtr, 'void', ['pointer']);
var ResourceListenerAddFile = new NativeFunction(ResourceListenerAddFilePtr, "void", ["pointer", "pointer"]);
var StageAddChild = new NativeFunction(StageAddChildPtr, "int", ["pointer", "pointer"]);
var DebugMenu = new NativeFunction(DebugMenuCtorPtr, "void", ["pointer"]);
var DebugMenuBaseUpdate = new NativeFunction(DebugMenuBaseUpdatePtr, "int", ["pointer", "float"]);
var StageRemoveChild = new NativeFunction(StageRemoveChildPtr, "int", ["pointer", "pointer"]);
var DebugInfo = new NativeFunction(DebugInfoCtor, "void", ["pointer"]);

let DEBUG_MENU = 1;
let INFO_MENU = 2;

var stage_address;
var dptr;
var menuType = 0;
var chatLeave = 0;
function init()
{
    var connect = Interceptor.attach(getaddrinfoPtr, {
        onEnter: function(args)
        {
            this.address = args[0].readUtf8String();
            log("Address: " + this.address);
            this.newAdress = args[0] = Memory.allocUtf8String("127.0.0.1"); //use your address
            log("New Address: " + this.newAdress.readUtf8String());
        }
    });

    var load = Interceptor.attach(GameModeAddResourcesToLoadPtr, {
        onEnter: function(args)
        {
            log("GameMode::addResourcesToLoad called");
            load.detach();
            ResourceListenerAddFile(args[1], base.add(0x2B29AB)); // load sc/debug.sc | 0x2B29AB - sc/debug.sc
            log("The sc/debug.sc has been loaded successfully!");
        }
    });
    
    var stage = Interceptor.attach(StageCtorPtr, {
        onEnter: function(args) {
            log("Stage::Stage() called");
            stage.detach();
            stage_address = args[0];
        }
    });
    
    var gameLoaded = Interceptor.attach(MoneyHudCtorPtr, {
        onEnter: function(args)
        {
            log("MoneyHUD::MoneyHUD() called!");
            gameLoaded.detach();
            menuType = DEBUG_MENU;
            dptr = malloc(1000);
            DebugMenu(dptr);
            StageAddChild(stage_address, dptr);
        }
    });
    
    var hudUpdate = Interceptor.attach(HUDUpdtePtr, {
        onEnter: function(args)
        {
            //log("HUD::update called");
            if (menuType > 0) {
                DebugMenuBaseUpdate(dptr, 20);
                //log("DebugMenu displayed");
            }
        }
    });
    
    var closeMenu = Interceptor.attach(ToggleDebugMenuButtonButtonPressedPtr, {
        onEnter: function(args)
        {
            switch(menuType) {
                case DEBUG_MENU:
                    StageRemoveChild(stage_address, dptr);
                    free(dptr);
                    menuType = 0;
                    log("DebugMenu closed");
                    break;
                case INFO_MENU:
                    StageRemoveChild(stage_address, dptr);
                    free(dptr);
                    menuType = 0;
                    log("InfoMenu closed");
                    break;
            }
        }
    });
    
    var chat = Interceptor.attach(ChatInputGlobalSendMessagePtr, {
        onEnter: function(args)
        {
            chatLeave = 0;
            var executeCmd  = Interceptor.attach(StringPtr, {
                onEnter: function(args)
                {
                    let cmd = args[1].readUtf8String();
                    log("Message: " + cmd);
                    switch(cmd)
                    {
                        case "/debug":
                            menuType = DEBUG_MENU;
                            dptr = malloc(1000);
                            DebugMenu(dptr);
                            StageAddChild(stage_address, dptr);
                            log("DebugMenu displayed");
                            executeCmd.detach();
                            break;
                        case "/info":
                            menuType = INFO_MENU;
                            dptr = malloc(1000);
                            DebugInfo(dptr);
                            StageAddChild(stage_address, dptr);
                            log("DebugInfo displayed ")
                            executeCmd.detach();
                    }
                    if(chatLeave === 1) {
                        executeCmd.detach();
                    }
                }
            });
        },
        onLeave: function(args) {
            chatLeave = 1;
        }
    });
}

rpc.exports = {
    init: function()
    {
        toast("by wisedev");
        init();
    }
}

function log(str)
{
    console.log("[*] " + str);
}

function toast(toastText) {	
	Java.perform(function() { 
		var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();

		Java.scheduleOnMainThread(function() {
				var toast = Java.use("android.widget.Toast");
				toast.makeText(context, Java.use("java.lang.String").$new(toastText), 1).show();
		});
	});
}