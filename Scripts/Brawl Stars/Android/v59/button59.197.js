// Create a button script for v59.197
// by kubune
// for educational purposes 

const base = Module.getBaseAddress('libg.so');

const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);
const StringTable_getMovieClip = new NativeFunction(base.add(0x76AB44), 'pointer', ['pointer', 'pointer']);
const GameButtonCtor = new NativeFunction(base.add(0x475230), 'void', ['pointer']);
const MovieClip_getTextFieldByName = new NativeFunction(base.add(0x9520F8), 'pointer', ['pointer', 'pointer']);
const MovieClipHelper_setTextAndScaleIfNecessary = new NativeFunction(base.add(0x776BF0), 'void', ['pointer', 'pointer', 'int', 'int']);
const MovieClip_gotoAndStopFrameIndex = new NativeFunction(base.add(0x951044), 'void', ['pointer', 'int']);
const DisplayObject_setXY = new NativeFunction(base.add(0x94CF04), 'void', ['pointer', 'float', 'float']); 
const Stage_addChild = new NativeFunction(base.add(0x967D4C), 'pointer', ['pointer', 'pointer']);

const Utils = {
    StringCtor(ptr, strptr) {
        StringCtor(ptr, strptr);
    },
    createStringPtr(str) {
        var ptr = malloc(str.length + 1);
        Memory.writeUtf8String(ptr, str);
        return ptr;
    },
    createStringObject(str) {
        var strptr = Utils.createStringPtr(str);
        let ptr = malloc(128);
        Utils.StringCtor(ptr, strptr);
        return ptr;
    },
    strPtr(content) {
        return Memory.allocUtf8String(content);
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

function createButton(text, x, y, callback, arg=null, frame_index=1) {
    let button = malloc(400);
    let s1 = Utils.createStringObject("sc/ui.sc");
    let s2 = Utils.createStringObject("country_item");
    let button_movieclip = StringTable_getMovieClip(s1, s2);
    GameButtonCtor(button);
    new NativeFunction(button.readPointer().add(352).readPointer(), 'void', [
        'pointer',
        'pointer',
        'bool'
    ])(button, button_movieclip, 1)
    let button_text = Utils.createStringObject(text)
    var textField = MovieClip_getTextFieldByName(button_movieclip, Utils.createStringPtr("Text"));
    MovieClipHelper_setTextAndScaleIfNecessary(textField, button_text, 0, 0);
    MovieClip_gotoAndStopFrameIndex(button_movieclip, frame_index);
    DisplayObject_setXY(button, x, y);
    Stage_addChild(Stage_instance.readPointer(), button);
    
    Interceptor.attach(base.add(0x97FFF8), {
        onEnter(args) {
            if (button.toInt32() == args[0].toInt32()) {
                callback(arg)
            }
        }
    });
    ClearStringObjects([s1, s2, button_text]);
    return button;
}
