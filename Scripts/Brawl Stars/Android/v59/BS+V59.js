// Brawl Stars+ striped source code for v59. Made by @kubune
// The source code is stripped from the most logic and I made it public so people can learn from it.
// If you want to use this code, you can do so, but please don't claim it as your own.
// Credit me (@kubune)
// Published on erder00/Frida-Scripts github repository

// Library
const base = Module.findBaseAddress("libg.so");

// Libc native functions
const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);

// Functions
const Application__copyString = new NativeFunction(base.add(0xB4A408), "void", ["pointer"]);
const PlayerInfo__refreshPlayerHeader = new NativeFunction(base.add(0x4A9D58), "void", ["pointer"]);
const PlayerInfo__refreshPlayerFame = new NativeFunction(base.add(0x4AA874), 'void', ['pointer']);
const HashTagCodeGenerator__toCode = new NativeFunction(base.add(0x911C88), "pointer", ["pointer", "pointer"]);
const DropGUIContainer__addGameButton = new NativeFunction(base.add(0x475FEC), "pointer", ["pointer", "pointer", "int"]);
const CustomButton__setButtonListener = new NativeFunction(base.add(0x980324), "void", ["pointer", "pointer"]);
const StringCtor = new NativeFunction(base.add(0xB14F28), 'pointer', ['pointer', 'pointer']);
const MovieClip__getChildByName = new NativeFunction(base.add(0x950A68), 'pointer', ['pointer', 'pointer']);
const StringTable__getString = new NativeFunction(base.add(0x76A5E4), 'pointer', ['pointer']);

// Addresses
const GUI__instance = base.add(0xF2E968);

// Variables, objects and arrays
const fameData = {
    "1": {"min": 0, "max": 1999},
    "2": {"min": 2000, "max": 3999},
    "3": {"min": 4000, "max": 5999},
    "4": {"min": 6000, "max": 9199},
    "5": {"min": 9200, "max": 12399},
    "6": {"min": 12400, "max": 15599},
    "7": {"min": 15600, "max": 20099},
    "8": {"min": 20100, "max": 24599},
    "9": {"min": 24600, "max": 29099},
    "10": {"min": 29100, "max": 37099},
    "11": {"min": 37100, "max": 45099},
    "12": {"min": 45100, "max": 53099},
    "13": {"min": 53100, "max": 65099},
    "14": {"min": 65100, "max": 77099},
    "15": {"min": 77100, "max": 89099},
    "16": {"min": 89100, "max": 109099},
    "17": {"min": 109100, "max": 129099},
    "18": {"min": 129100, "max": 149099},
    "19": {"min": 149100, "max": 199099},
    "20": {"min": 199100, "max": 249099},
    "21": {"min": 249100, "max": 299099}
};
let TID_CONNECTING_TO_SERVER = "Brawl Stars+ | Connecting...";
let TID_ABOUT = `
╔═══════════════════════════════════╗
▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

Brawl Stars+ v1.1
Branch: Beta
only for friends :)

Creator: kubune

Discord: @kubune

▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

💙💙💙 Special Thanks 💙💙💙

💙 romoan 💙
💙 xXCoolBoyXx 💙
💙 itstermoh 💙
💙 Milan 💙
💙 rntdev 💙
💙 hpdevfox 💙

▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
╚═══════════════════════════════════╝

`
let PlayerId = [];
var toDecode = [];
var toDecodeOk = [];

// Helper Functions
function idToTag(highID, lowID) {
    const arr = ["0", "2", "8", "9", "P", "Y", "L", "Q", "G", "R", "J", "C", "U", "V"];
    let total = (lowID * 256) + highID;
    let tag = "";

    while (total > 0) {
        const index = total % 14;
        tag = arr[index] + tag;
        total = Math.floor(total / 14);
    }

    return tag.replace(/^0+/, "");
}

function ReadStringFromStringObject(StrObjectPtr) {
    const StringByteLength = StrObjectPtr.add(4).readInt();
    if (StringByteLength > 7) {
        return StrObjectPtr.add(8).readPointer().readUtf8String(StringByteLength);
    }
    return StrObjectPtr.add(8).readUtf8String(StringByteLength);
}

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

const ByteStream = {
    readVInt(messageType) {
        if (messageType == 24113) {
            var readed = [];
            Interceptor.attach(base.add(0x98E498), {
                onLeave(retval) {
                    readed.push(retval.toInt32());
                }
            });
            return readed;
        }
    },
    readInt(messageType) {
        if (messageType == 20104) {
            var readedOk = [];
            Interceptor.attach(base.add(0x98DC74), {
                onLeave(retval) {
                    readedOk.push(retval.toInt32());
                }
            });
            return readedOk;
        }
    }
}

const Execute = {
    showFloaterText(FloaterText='', RGBAcolor=0xFFFFFFFF) {
        FloaterText = Utils.createStringObject(FloaterText);
        const ShowFloaterText = new NativeFunction(base.add(0x46FB74), 'void', ['pointer', 'pointer', 'int', 'int']);
        ShowFloaterText(GUI__instance.readPointer(), FloaterText, RGBAcolor, -1);
    }
}

// Mod Logic

// String replacer, replaces a localized string from the table to a custom one
Interceptor.replace(StringTable__getString, new NativeCallback(function(a1) {
    let value = Memory.readUtf8String(a1);
    if (value === "TID_CONNECTING_TO_SERVER") { // Changing connecting to server text to credits
        return StringTable__getString(Utils.createStringPtr(TID_CONNECTING_TO_SERVER));
    }
    if (value === "TID_ABOUT") { // Changing about text to credits
        return StringTable__getString(Utils.createStringPtr(TID_ABOUT));
    }

    return StringTable__getString(a1);

}, 'pointer', ['pointer']));

// Player Tag Copier - allows copying player tags by creating a custom button
Interceptor.replace(PlayerInfo__refreshPlayerHeader, new NativeCallback(function (self) { // Attaching to function that displays player info
    let PlayerTag = "0";
    let HashTagCodeGenerator__toCodeIA = Interceptor.attach(HashTagCodeGenerator__toCode, { // Get player tag from HashCodeGenerator
          onLeave(retval) {
              PlayerTag = ReadStringFromStringObject(retval);
              HashTagCodeGenerator__toCodeIA.detach();
          }
    });
    PlayerInfo__refreshPlayerHeader(self); // Call original function 
    let CopyPlayerTagButton = DropGUIContainer__addGameButton(self.add(192).readPointer(), Memory.allocUtf8String("tag_txt"),1); // Create custom button that attaches to tag_txt movieclip (the player tag under profile avatar)
    
    CustomButton__setButtonListener(CopyPlayerTagButton, self.add(96)); // Set button listener to the custom button
    Interceptor.attach(self.add(96).readPointer().add(8).readPointer(), { // Attach to button listener
        onEnter(args) {
            if (CopyPlayerTagButton.equals(args[1])) {
                Application__copyString(Utils.createStringObject(PlayerTag)); // Copy player tag to clipboard
                Execute.showFloaterText("Copied player tag: " + PlayerTag + "!");
            }
        }
    });
}, 'void', ['pointer']));

// Getting the player tag
Interceptor.attach(base.add(0x883078), { // LoginOkMessage::decode
    onEnter: function(args) {
        toDecodeOk = ByteStream.readInt(20104); // Read int values from the stream
    },
    onLeave: function(retval) {
        MessageDecoder.LoginOkMessage(toDecodeOk); // Decode the message
    }
})

// Temporary placeholder to show fame
Interceptor.attach(base.add(0x8BE9AC), { // PlayerProfileMessage::decode
    onEnter(args) {
        toDecode = ByteStream.readVInt(24113); // Read stream
    },
    onLeave(retval) {
        const data = MessageDecoder.PlayerProfileMessage(toDecode); // Decode
        let fame = data[1]["20"]; // Get fame
        var fameLevel = 0;
        for (let i = 0; i <= 20; i++) { // Get Fame level
            const key = String(i + 1);
            if (fameData[key] && fameData[key].min <= fame && fameData[key].max >= fame) {
                fameLevel = i + 1;
                break;
            }
        }

        if (fame !== 0 && fameLevel > 0 && fameData[String(fameLevel)]) { // Show fame level if player has it 
            let progressText = "Fame: " + 
                (fame - fameData[String(fameLevel)].min) + "/" + // And format it in a nice way
                (fameData[String(fameLevel)].max - fameData[String(fameLevel)].min + 1);
            Execute.showFloaterText(progressText);
        }
    }
});

// Decoders, helpers
const MessageDecoder = {
    LoginOkMessage(values) {
        PlayerId.push(values[0], values[1]);
        return [values[0], values[1]];
    },
    PlayerProfileMessage(values) {
        let brawlers = [];
        let i = 7;
        for (let j = 0; j < values[6]; j++) {
            let character = [values[i], values[i+1]];
            let skin = [values[i+2], values[i+3]];
            let trophies = values[i+4];
            let highest_trophies = values[i+5];
            let highest_trophies_season = values[i+6];
            let power = values[i+7];
            let mastery = values[i+8];
            brawlers.push({
                "Character": character,
                "Skin": skin,
                "Trophies": trophies,
                "HighestTrophies": highest_trophies,
                "HighestTrophiesSeason": highest_trophies_season,
                "Power": power,
                "Mastery": mastery
            });
            i += 9;
        }
        let stats = {};
        for (let j = 0; j < values[i]; j++) {
            let stat = values[i+1];
            let value = values[i+2];
            stats[stat] = value;
            i += 2;
        }
        return [brawlers, stats];
    }
}