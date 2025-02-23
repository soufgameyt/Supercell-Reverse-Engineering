// So shitty and buggy, I haven't even finished it yet, but it's a work in progress
const toast = function(text) {
    Java.scheduleOnMainThread(() => {
        Java.use("android.widget.Toast")
            .makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.StringBuilder").$new(text), 1).show();
    });
};

function print(text) {
    try {
        const file = new File("/storage/emulated/0/Projects/gadgetscript/logs.txt", "a+");
        file.write(text + "\n");
        file.flush();
        file.close();
    } catch (e) {
        const errortimefile = getCurrentTime();
        var errormessagefile = `${errortimefile} Error occurred while writing file: ${e}\n`;
        if (filePath !== errorPath) {
            const file = new File(errorPath, "a+");
            file.write(errormessagefile);
            file.flush();
            file.close();
        }
    }
}

const base = Module.findBaseAddress("libg.so");
const basesize = Process.findModuleByName("libg.so").size;
const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);
const free = new NativeFunction(Module.getExportByName('libc.so', 'free'), 'void', ['pointer']);

// Set memory protection
Memory.protect(base, basesize, "rwx");

const offsetX = 1054;
const offsetY = 2112;
const offset2 = 1968; // will update

const config = {
    moveToTarget: true, // Moving to the target
    battleScreen: null, // Battle screen object
    targetObject: 0, // Target object
}

const Battle_ContolADDR = base.add(0x6420B8) //v54: 4487D0 12BattleScreen22updateTrajectorySpriteEP23
const Battle_Control = new NativeFunction(Battle_ContolADDR, "void", ["pointer", "pointer", "float", "pointer", "bool"]);
const BattleMode_getInstanceADDR = base.add(0x75BB40); //instance v54: 543568
const getObjectCountADDR = base.add(0x8DC2A0); //getobject v54: 696D50 //updated
const calculatePositionADDR = base.add(0x830960); //calculatePosition v54: 5FEA2C
const addinputADDR = base.add(0x5EC798); //addinput v54: 3FA110 
const getStatusADDR = base.add(0x63ABBC); //getStatus v54: 441344
const initializeInstanceADDR = base.add(0x8A14D4) //initializeInstance v54: 666BE4


const BattleMode_getInstance = new NativeFunction(BattleMode_getInstanceADDR, "pointer", []);
const getObjectCount = new NativeFunction(getObjectCountADDR, "int", ["pointer"]);
const calculatePosition = new NativeFunction(calculatePositionADDR, "pointer", ["pointer", "pointer"]);
const getStatus = new NativeFunction(getStatusADDR, "float", ["pointer"]);
const addinput = new NativeFunction(addinputADDR, "void", ["pointer", "pointer"]);
const initializeInstance = new NativeFunction(initializeInstanceADDR, "pointer", ["pointer", "int"]);

//shit v54
toast("test")
const ClientInputManager = {
    addInput(input) {
        addinput(BattleMode_getInstance().add(88).readPointer(), input.instance ? input.instance : input); //tm
    }
};

// A class used to make inputs to the game 
class InputObject {
    constructor(inputType) {
        // Allocate 60 bytes of memory and set the input type
        this.instance = malloc(60);
        if (this.instance.isNull()) {
            throw new Error("Memory allocation failed.");
        }
        initializeInstance(this.instance, inputType); // inputType start
        this.type = inputType; // Determine the input type
    }

    // Set the X and Y coordinates
    setXY(x, y) {
        this.instance.add(32).writeInt(x); // Write X coordinate
        this.instance.add(36).writeInt(y); // Write Y coordinate
    }

    // Get the X coordinate
    getX() {
        return this.instance.add(32).readInt(); // Read X value (not true values btw)
    }

    // Get the Y coordinate
    getY() {
        return this.instance.add(36).readInt(); // Read Y value
    }

    // Release memory
    free() {
        if (!this.instance.isNull()) {
            free(this.instance); // Release the memory
            this.instance = null; // Reset the reference
        }
    }
}
//59
Interceptor.replace(Battle_ContolADDR, new NativeCallback(function(pointer1, pointer2, floatValue, pointer3, boolValue) {
    //toast("oruspu")
    Battle_Control(pointer1, pointer2, floatValue, pointer3, boolValue);
    config.battleScreen = pointer1;
    const instance = BattleMode_getInstance();
    if (!instance || instance.isNull()) return;

    const objectCount = getObjectCount(instance.add(40).readPointer());
    const objectPointer = instance.add(40).readPointer(); //tm
    let targetPointer;
    //    print(objectCount.toString(16))

    if (objectCount >= 0 && objectPointer.add(12).readInt()) {
        targetPointer = objectPointer.readPointer().add(objectCount * 8).readPointer();
    }
    //    if (!targetPointer || targetPointer.isNull() || !pointer2 || pointer2.isNull()) return;

    const targetPosition = calculatePosition(pointer2, targetPointer);
    const statusValue = getStatus(pointer1);
    //    if (statusValue > -4) return;

    // Perform operations based on the 'moveToTarget' flag
    if (pointer1.add(offset2).readInt()) {
        if (config.moveToTarget) {
            //const x = pointer1.add(offsetX).readInt();
            //const y = pointer1.add(offsetY).readInt();
            //   print("X: " + x.toString(16) + ", Y: " + y.toString(16));
            const input = new InputObject(2); // Create an input object
            input.setXY(31, 31);
            ClientInputManager.addInput(input); // Function used to add input to the game
            //input.free();
            //     print("did it work?")
            config.targetObject = 333;
        }
    } else if (config.targetObject === 333) {
        config.targetObject = 0;
    }


}, "void", ["pointer", "pointer", "float", "pointer", "bool"]));