var cache = {
    modules: {},
    options: {},
    debugOpened: false,
    wakeUpReturnArray: []
};

const base = Process.findModuleByName('libg.so').base;
const SERVER_CONNECTION = 0xA2B454;
const DEBUG_MENU_CTOR = 0x3A6E70;
const STAGE_ADD_CHILD = 0x36D3A8;
const STAGE_ADDRESS = 0xA2B360;
const DEBUG_MENU_UPDATE_PTR = 0x10DDC4;

const StageAdd = new NativeFunction(base.add(STAGE_ADD_CHILD), 'void', ['pointer', 'pointer']);
const DebugMenuCtor = new NativeFunction(base.add(DEBUG_MENU_CTOR), 'pointer', ['pointer']);
const DebugMenuUpdate = new NativeFunction(base.add(DEBUG_MENU_UPDATE_PTR), "int", ["pointer", "float"]);

function toast(message) {
    Java.perform(function () {
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        Java.scheduleOnMainThread(function () {
            var toast = Java.use("android.widget.Toast");
            toast.makeText(context, Java.use("java.lang.String").$new(message), 1).show();
        });
    });
}

function createDebugMenu() {
    if (!cache.debugOpened) {
        cache.debugOpened = true;
        cache.dptr = malloc(500);
        DebugMenuCtor(cache.dptr);
        StageAdd(base.add(STAGE_ADDRESS).readPointer(), cache.dptr);
        console.log("Debug menu created!");
        toast("Debug menu created!");
    }
}

function updateDebugMenu(value) {
    if (cache.debugOpened) {
        DebugMenuUpdate(cache.dptr, value);
        console.log(`Debug menu updated with value: ${value}`);
    }
}

function setupDebugMenu() {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
        onEnter: function (args) {
            if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                cache.fd = args[0].toInt32();
                var host = Memory.allocUtf8String("0.0.0.0");
                Memory.writeInt(args[1].add(4), inet_addr(host));
                createDebugMenu();
            }
        }
    });

    var updater = Interceptor.attach(Module.findExportByName('libc.so', 'pthread_cond_signal'), {
        onEnter: function (args) {
            if (cache.debugOpened) {
                DebugMenuUpdate(cache.dptr, 20);
            }
        }
    });

    console.log("Debug menu interceptor attached!");
}

setupDebugMenu();