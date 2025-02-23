// made by itstermob (https://t.me/itstermohh)
// arm64

var config = {
    selectedId: 0
}

var BattleMode_getInstance = new NativeFunction(base.add(0x75BB40), "pointer", ["pointer"]);
var ClientInput_ClientInput = new NativeFunction(base.add(0x8A14D4), "pointer", ["pointer", "int"]);
var ClientInputManager_addInput = new NativeFunction(base.add(0x5EC798), "pointer", ["pointer", "pointer"]);

function targetPlayer(id) {
    config.selectedId = 1000000 + id;
    var xray = malloc(44);
    var instance = ClientInput_ClientInput(xray, 0x0);
    xray.add(20).writeUS(1);
    xray.add(21).writeUS(1);
    xray.add(16).writeInt(config.selectedId);
    ClientInputManager_addInput(BattleMode_getInstance(instance).add(88).readPointer(), xray);
}