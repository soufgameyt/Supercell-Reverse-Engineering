const base = Module.getBaseAddress("libg.so");

// Kit Cheat
// v59 (arm64)
// arm64-v8a

// yes that's the entire cheat + bypass lou debuff

Interceptor.replace(base.add(0x82C668), new NativeCallback(function(a1) { // LogicCharacterClient::hasSlipperyDebuffClient
    return 0;
}, 'int64', ['int64']));

Interceptor.replace(base.add(0x645B04), new NativeCallback(function(a1, a2) { // BattleScreen::shouldShowMoveStick
    return 1;
}, 'bool', ['int64', 'pointer']));

Interceptor.replace(base.add(0x82C614), new NativeCallback(function(a1) { // stopMovement
    return 0;
}, 'int64', ['int64']));
