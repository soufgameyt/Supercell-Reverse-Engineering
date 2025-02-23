const base = Module.findBaseAddress("libg.so")
const base_size = Process.findModuleByName("libg.so").size
Memory.protect(base, base_size, "rwx");

const free = new NativeFunction(Module.getExportByName('libc.so', 'free'), 'void', ['pointer']);
const fread = new NativeFunction(Module.getExportByName('libc.so', 'fread'), 'int', ['pointer', 'int', 'int', 'pointer']);
const fopen = new NativeFunction(Module.getExportByName('libc.so', 'fopen'), 'pointer', ['pointer', 'pointer']);
const fclose = new NativeFunction(Module.getExportByName('libc.so', 'fclose'), 'int', ['pointer']);
const ftell = new NativeFunction(Module.getExportByName('libc.so', 'ftell'), 'int', ['pointer']);
const fseek = new NativeFunction(Module.getExportByName('libc.so', 'fseek'), 'int', ['pointer', 'int', 'int']);
const rewind = new NativeFunction(Module.getExportByName('libc.so', 'rewind'), 'void', ['pointer']);
const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);

// UI
const StringTable_getMovieClip = new NativeFunction(base.add(0x76AB44), 'pointer', ['pointer', 'pointer']);
const GameButtonCtor = new NativeFunction(base.add(0x475230), 'void', ['pointer']);
const MovieClip_getTextFieldByName = new NativeFunction(base.add(0x9520F8), 'pointer', ['pointer', 'pointer']);
const MovieClipHelper_setTextAndScaleIfNecessary = new NativeFunction(base.add(0x776BF0), 'void', ['pointer', 'pointer', 'int', 'int']);
const MovieClip_gotoAndStopFrameIndex = new NativeFunction(base.add(0x951044), 'void', ['pointer', 'int']);
const DisplayObject_setXY = new NativeFunction(base.add(0x94CF04), 'void', ['pointer', 'float', 'float']); 
const Stage_addChild = new NativeFunction(base.add(0x967D4C), 'pointer', ['pointer', 'pointer']);
const Application__copyString = new NativeFunction(base.add(0xB4A408), "void", ["pointer"]);
const PlayerInfo__refreshPlayerHeader = new NativeFunction(base.add(0x4A9D58), "void", ["pointer"]);
const PlayerInfo__refreshPlayerFame = new NativeFunction(base.add(0x4AA874), 'void', ['pointer']);
const HashTagCodeGenerator__toCode = new NativeFunction(base.add(0x911C88), "pointer", ["pointer", "pointer"]);
const DropGUIContainer__addGameButton = new NativeFunction(base.add(0x475FEC), "pointer", ["pointer", "pointer", "int"]);
const CustomButton__setButtonListener = new NativeFunction(base.add(0x980324), "void", ["pointer", "pointer"]);
const StringCtor = new NativeFunction(base.add(0xB14F28), 'pointer', ['pointer', 'pointer']);
const MovieClip__getChildByName = new NativeFunction(base.add(0x950A68), 'pointer', ['pointer', 'pointer']);
const StringTable__getString = new NativeFunction(base.add(0x76A5E4), 'pointer', ['pointer']);
const Stage_instance = base.add(0xF330F0);
const GUI__instance = base.add(0xF2E968);

// Battles
const BattleMode_getInstance = new NativeFunction(base.add(0x75BB40), "pointer", ["pointer"]);
const ClientInput_ClientInput = new NativeFunction(base.add(0x8A14D4), "pointer", ["pointer", "int"]);
const ClientInputManager_addInput = new NativeFunction(base.add(0x5EC798), "pointer", ["pointer", "pointer"]);
const Battle_Control = new NativeFunction(base.add(0x6420B8), "void", ["pointer", "pointer", "float", "pointer", "bool"]);
const getObjectCount = new NativeFunction(base.add(0x8DC2A0), "int", ["pointer"]);
const calculatePosition = new NativeFunction(base.add(0x830960), "pointer", ["pointer", "pointer"]);
const getStatus = new NativeFunction(base.add(0x63ABBC), "float", ["pointer"]);
const addinput = new NativeFunction(base.add(0x5EC798), "void", ["pointer", "pointer"]);
const initializeInstance = new NativeFunction(base.add(0x8A14D4), "pointer", ["pointer", "int"]);
const LogicCharacterClient_hasSlipperyDebuffClient = base.add(0x82C668)
const BattleScreen_shouldShowMoveStick = base.add(0x645B04)
const stopMovement = base.add(0x82C614)

// LogicVersion
const LogicVersion_isProd = base.add(0x5ECBD0)
const LogicVersion_isDev = base.add(0x5ECC0C)

// login message
const LoginMessage_encode = base.add(0x6FAC5C)

// arm-v7 start
const Messaging_decryptData = base.add(0x9B16E0)
const Messaging_sendPepperAuthentication = base.add(0x9B205C)
const Messaging_encryptAndWrite = base.add(0x9B28FC)
// arm-v7 end

// dehasher
const decrypt_key = new NativeFunction(base.add(0x3CE9D8), "uint", ["pointer"]);
