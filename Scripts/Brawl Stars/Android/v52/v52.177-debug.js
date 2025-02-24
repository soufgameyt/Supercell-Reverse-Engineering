
const Libg = {
	init() {
		Libg.module = Process.findModuleByName('libg.so');
		Libg.size = Libg.module.size;
		Libg.begin = Libg.module.base;
		Libg.end = ptr(Libg.begin.toInt32() + Libg.size);
	},
	offset(value) {
		return Libg.begin.add(value);
	}
}

const SlowModeAdr = 0xE90ED0;
const SpectateDebugAdr = 0xE94358;
const ArtTestAdr = 0xE9434D;

const GameMain_instanceAddr = 0xE918A0; // v44.242 | 1st arg of GameMain::showNativeDialog()
const ShouldShowAPITokenButtonAddr = 0x594C40; // v44.242 | String: "TID_API_TOKEN_SHOW" | Default = 0
const TeamMemberItem_isOwnSide = 0x438E44;

const LobbyInfoWithPlayersOnlineStr = {off: 0x576D2C, dcd: 0x576B50};

const LatencyTestsStr = {off: 0x5954F0, dcd: 0x5952E4};
const TidApiTokenShowStr = {off: 0x59545C, dcd: 0x594C18};
const TidConnectingToServerStr = {off: 0x5A7188, dcd: 0x5A70D0}

var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);

const Armceptor = {
    replace(ptr, arr) {
		Memory.protect(ptr, arr.length, "rwx");
		Memory.writeByteArray(ptr, arr);
		Memory.protect(ptr, arr.length, "rx");
	},
    replaceStr(ptr, value) {
        Memory.protect(ptr, value.length, "rwx");
        Memory.writeUtf8String(ptr, value);
        Memory.protect(ptr, value.length, "rx");
    },
	jumpout(addr, target) {
		Memory.patchCode(addr, Process.pageSize, function(code) {
			var writer = new ArmWriter(code, {
				pc: addr
			});
			writer.putBranchAddress(target);
			writer.flush();
		});
	}
}

function strPtr(message) {
    var charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr
}

function WriteToMemory(address, valueType, value) {
    switch (valueType.toLowerCase()) {
        case "u8":
            Memory.protect(address, 1, "rwx");
            Memory.writeU8(address, value);
            break;
        case "byte":
            Memory.protect(address, 1, "rwx");
            Memory.writeS8(address, value);
            break;
        case "ushort":
            Memory.protect(address, 2, "rwx");
            Memory.writeU16(address, value);
            break;
        case "short":
            Memory.protect(address, 2, "rwx");
            Memory.writeS16(address, value);
            break;
        case "uint":
            Memory.protect(address, 4, "rwx");
            Memory.writeU32(address, value);
            break;
        case "int":
            Memory.protect(address, 4, "rwx");
            Memory.writeS32(address, value);
            break;
        case "float":
            Memory.protect(address, 4, "rwx");
            Memory.writeFloat(address, value);
            break;
        case "pointer":
            Memory.protect(address, 4, "rwx");
            Memory.writePointer(address, value);
            break;
        case "ulong":
            Memory.protect(address, 8, "rwx");
            Memory.writeU64(address, value);
            break;
        case "long":
            Memory.protect(address, 8, "rwx");
            Memory.writeS64(address, value);
            break;
        case "double":
            Memory.protect(address, 8, "rwx");
            Memory.writeDouble(address, value);
            break;
        case "bytearray":
            Memory.protect(address, value.length, "rwx");
            Memory.writeByteArray(address, value);
            break;
        case "string":
            Memory.protect(address, value.length, "rwx");
            Memory.writeUtf8String(address, value);
            break;
    }
}

function RelocateCString(OldStringObj, NewStringLength) {
    var NewStringPtr = malloc(NewStringLength);
    WriteToMemory(Libg.offset(OldStringObj.off), "Pointer", ptr(NewStringPtr-Libg.offset(OldStringObj.dcd)));
    return NewStringPtr;
}

function GetIngameFPS(toFixed) {
    let CalculatedFPS = 0;
    let GameMain_instancePtr = Libg.offset(GameMain_instanceAddr).readPointer();
    let v1 = GameMain_instancePtr.add(472).readInt();
    if (v1 > 0) {
        let v2 = GameMain_instancePtr.add(468).readFloat();
        CalculatedFPS = v2;
    }
    return CalculatedFPS.toFixed(0);
}


const Connect = {
	init() {
		Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
            onEnter(args) {
              this.str = args[0] = Memory.allocUtf8String('80.66.87.62');
              args[1].writeUtf8String('5201');
              //PepperKiller.init();
              console.log('Connecting to ' + args[0].readUtf8String() + args[1].readUtf8String());
            }
          });
	}
}

const SetupMessaging = {
    init() {
        //const BrawlPassSeasonData_hasUnclaimedRewards = Libg.offset(0x70B910); // v44.242 | BrawlPassPopup::buttonClicked() --> PreviousSeasonButtonPressed --> if current season == actual season check --> 2nd function --> if hasUnclaimedRewards then return

        var NewLatencyTestsStrPtr = RelocateCString(LatencyTestsStr, 30);
        var NewTidApiTokenShowStrPtr = RelocateCString(TidApiTokenShowStr, 40);
        //var NewLobbyInfoWithPlayersOnlineStrPtr = RelocateCString(LobbyInfoWithPlayersOnlineStr, 300);
        var textOpen = "           ";

        WriteToMemory(NewLatencyTestsStrPtr, "String", "by sprkdv");
        WriteToMemory(NewTidApiTokenShowStrPtr, "String", "Mod Configuration");
        //WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", `${textOpen}%AlahBrawl Beta\nFPS: ${GetIngameFPS(1)}%`);

        WriteToMemory(Libg.offset(TeamMemberItem_isOwnSide), "Byte", 255);

        Armceptor.replace(Libg.offset(0x78000C), [0x00, 0x00, 0x50, 0xE1]); // Messaging::encryptAndWrite
        Armceptor.replace(Libg.offset(0x77F8A4), [0x05, 0x00, 0xA0, 0xE3]); // State
        Armceptor.replace(Libg.offset(0x239E1C), [0x00, 0x40, 0xA0, 0xE3]); // PepperCrypto::secretbox_open
        Armceptor.replace(Libg.offset(0x77F7D0), [0x02, 0x80, 0xA0, 0xE1]); // Messaging::sendPepperAuthentification

        /*Interceptor.replace(BrawlPassSeasonData_hasUnclaimedRewards, new NativeCallback(function() {
            return 1;
        }, 'int', []));*/
    }
}

const createDebugButton = {
    init() {
        const base = Process.findModuleByName('libg.so').base;

        const StageAdd = new NativeFunction(Libg.offset(0x81C418), 'void', ['pointer', 'pointer']);
        let btn = malloc(700);

        new NativeFunction(Libg.offset(0x2E4858), 'void', ['pointer'])(btn); // GameButton
        let debug1 = new NativeFunction(Libg.offset(0x7B2D24), 'pointer', ['pointer', 'pointer', 'bool'])(strPtr("sc/debug.sc"), strPtr("debug_menu_button"), 1);
        new NativeFunction(Libg.offset(0x838114), 'void', ['pointer', 'pointer'])(btn, debug1);

        new NativeFunction(Libg.offset(0x7FDFC0), 'void', ['pointer', 'float', 'float'])(btn, 30, 560);
        StageAdd(Libg.offset(0xE97DF0).readPointer(), btn);
    }
}

const Hook = {
	init() {
		const ReceiveMessage = Interceptor.attach(Libg.offset(0x466D00), { // MessageManager::receiveMessage
			onEnter(args) {
				const Msg = args[1];
				const MsgType = new NativeFunction(Memory.readPointer(Memory.readPointer(Msg).add(20)), 'int', ['pointer'])(Msg);
                console.log("[MessageManager::receiveMessage] MessageID: " + MsgType);
                if (MsgType === 20104) { // LoginOkMessage
                    Interceptor.attach(Libg.offset(0x56FBF8), { // HomePage::startGame (а зачем это же прод ахах)
                        onEnter(args) {
                            args[3] = ptr(3);
                        }
                    });
                    //Misc.init();
                    //createDebugButton.init();
                    ReceiveMessage.detach();
				}
			}
		});
	}
}

const Misc = {
	init() {
        WriteToMemory(Libg.offset(SlowModeAdr), "Byte", 0); // SlowMode
        WriteToMemory(Libg.offset(SpectateDebugAdr), "Byte", 0); // SpectateDebug
        WriteToMemory(Libg.offset(ArtTestAdr), "Byte", 0); // ArtTest

        WriteToMemory(Libg.offset(ShouldShowAPITokenButtonAddr), "Byte", 1);
        WriteToMemory(Libg.offset(0x594B70), "Byte", 0);

        WriteToMemory(Libg.offset(0x594B6C), "Byte", 0); // Terms
        WriteToMemory(Libg.offset(0x594B80), "Byte", 0); // Privacy
        WriteToMemory(Libg.offset(0x594B98), "Byte", 0); // Credits
        WriteToMemory(Libg.offset(0x594B80), "Byte", 0); // ParentsGuide
        WriteToMemory(Libg.offset(0x5952B0), "Byte", 0); // ThirdParty

        WriteToMemory(Libg.offset(0x594F70), "Byte", 0);

		Interceptor.replace(Libg.offset(0x5E713C), new NativeCallback(function() { // LogicVersion::isDeveloperBuild
        	return 1;
    	}, 'int', []));

    	Interceptor.replace(Libg.offset(0x5E70FC), new NativeCallback(function() { // LogicVersion::isDev
        	return 1;
    	}, 'int', []));

		Interceptor.replace(Libg.offset(0x5E7104), new NativeCallback(function() { // LogicVersion::isProd
        	return 0;
    	}, 'int', []));

		Interceptor.attach(Libg.offset(0x56FBF8), { // HomePage::startGame (а зачем это же прод ахах)
	    	onEnter(args) {
	    		args[3] = ptr(3);
            }
        });

        Interceptor.attach(Libg.offset(0x7ACDA8), { // NativeFont::formatString
	    	onEnter(args) {
	    		args[7] = ptr(1);
            }
        });

		Interceptor.attach(Libg.offset(0x73BEB4), { // LogicBattleModeClient::addVisionUpdate (в проде вроде ломает катку)
            onEnter(args) {
                args[1].add(108).writeInt(args[1].add(96).readInt());
				args[1].add(112).writeInt(1); // IsBrawlTv
            }
        });
	}
}

const WaterMark = {
    init() {
        var NewTidConnectingToServerStrPtr = RelocateCString(TidConnectingToServerStr, 40);
        WriteToMemory(NewTidConnectingToServerStrPtr, "String", `SteelBrawl|Connecting...`);
    }
}

rpc.exports.init = function() {
    Libg.init();
    WaterMark.init();
    Connect.init();
    Hook.init();
}