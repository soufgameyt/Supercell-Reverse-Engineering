//this is a script written entirely by me from scratch. Since RetroBrawl team decided to kick me out, I decided to make this script open source.

var cache = {
    modules: {},
    options: {}
};

var csvFiles = [
    "csv_logic/cards.csv",
    "csv_logic/characters.csv",
    "csv_logic/skills.csv",
    "csv_logic/projectiles.csv",
    "csv_logic/area_effects.csv",
    "csv_logic/items.csv",
	"csv_logic/maps.csv",
	"csv_logic/skins.csv",
	"csv_logic/tiles.csv"
];

const base = Module.findBaseAddress('libg.so');
const readPtr = Module.findExportByName('libc.so', 'read');
const malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
const ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
const inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
const fopen = new NativeFunction(Module.findExportByName('libc.so', 'fopen'), 'pointer', ['pointer', 'pointer']);

var wait = false;
var ServerConnection = base.add(0x7D2B88).readU8();


function init() {
	checkPackageName('com.devbs.retrobrawl');
	checkSignature('308203673082024fa00302010202043bc36e87300d06092a864886f70d01010b050030643110300e0603550406130730303030303030310f300d06035504081306527573736961310f300d060355040713064d6f73636f77310e300c060355040a13054465564273310e300c060355040b13054465564273310e300c060355040313054465564273301e170d3231303232373139323832355a170d3438303731353139323832355a30643110300e0603550406130730303030303030310f300d06035504081306527573736961310f300d060355040713064d6f73636f77310e300c060355040a13054465564273310e300c060355040b13054465564273310e300c06035504031305446556427330820122300d06092a864886f70d01010105000382010f003082010a0282010100dd6e1ff1176cc170409faa72c43bfb89619af888c5899a5bce12a61444e841f0853c971bd0f5d2a1b6c1748e59cb46c6abec1dcacda8efa8488d60a4f8332873019644d810673b14118946b1bc2789a78108070af91b9b39693ba1753b64b3f815c5b615121f67c1ba8aa33de6c7ac0204e216d08438b78c645211408bbf53e5a60adcb31040a81ad401e4278c6fefcf5bdd62226ca975ba84ce66d7176f1d2b3a45fd4c2d15c2862a4f599c51492078534cb800ffd306dd01c6dbf69787a0092023df9596114e760a0890ec07d6f98b19c9eb1f58395f2361d924eee867d966eb933994c7fd09faeb0e4d214942709d1954b470bf7fdf22107dbcc9397f65490203010001a321301f301d0603551d0e04160414225e45a50e9ef8f53caf2841353f848a300b42e3300d06092a864886f70d01010b05000382010100890bd66cab965264a5528042f884fb8ab67739c033deb52f2b7f04d2422f17c8f18d466e81c5099cb9739c247133ec6775ca02aa6a4d953e0c702a02d4270e21e4c36853a831a37327cafbdb21de53a4171c8ab95b564a1f27b823e67002abe09124a5075ce96727ecc8492a4ebba0f24daacd41c2068576d75d01f143176afd330e091b09ac737516827896d303e7cf8126bfb508e5ce4137276f03311c1792f83ce1c20b17e30374c0c2f7fe6cbad5f252c047464989c4e0180c57ad7ffdf9de6dea54997df7321384da775c7772eb3e2a6385674b264ba38d54ec5f1ad75f44655cea5180eb735fa43002f2cef2f2f34c94e79a40c43edb0a86de751f3fea');
	checkFilesInUpdate();
	setKeyVersion(7);
	toast('Private server created by RetroBrawl team.\nVK: https://vk.com/retro_brawl');
	connect();
	replaceKey();
	fixer();
}

function checkPackageName(packageName) {
	if (getPackageName() != packageName) {
		exit();
	}
}

function getPackageName() {
    var packagename = '';
    Java.perform(function(argument) {
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        packagename = context.getPackageName();         
    });
    return packagename;
}

function setKeyVersion(version) {
	base.add(0x60DD88).writeU16(version);
}

function getSignature() {
	var signature = '';
	Java.perform(function() {
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
		var packageInfo = context.getPackageManager().getPackageInfo(getPackageName(), 64).signatures.value[0].toCharsString();
		signature = packageInfo;
	});	
	return signature;
}

function checkSignature(signature) {
	if (getSignature() != signature) {
		exit();
	}
}

function checkFilesInUpdate() {
	for (var i = 0; i < csvFiles.length; i++) {
		var path = '/data/data/' + getPackageName() + '/update/' + csvFiles[i];
		var pFile = fopen(createStringPtrFromJSString(path), createStringPtrFromJSString("rb"));
		if (pFile.toInt32() != 0) {
			exit();
		}
	}
}

function exit() {
    Java.scheduleOnMainThread(() => {
        Java.use("java.lang.System").exit(0);
    });
};

function toast(toastText) {	
	Java.perform(function() { 
		var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();

		Java.scheduleOnMainThread(function() {
				var toast = Java.use("android.widget.Toast");
				toast.makeText(context, Java.use("java.lang.String").$new(toastText), 1).show();
		});
	});
}

function connect() {
	Interceptor.attach(Module.findExportByName(null, 'getaddrinfo'), {
		onEnter: function (args) {
			this.path = args[0].readUtf8String();
			if (this.path === 'game.brawlstarsgame.com') {
				this.z = args[0] = Memory.allocUtf8String(cache.options.redirectHost);
			}
		}
	});
}

function replaceKey() {	
	var buf;
	var check = 0;
			
	const reader = Interceptor.attach(readPtr, {
		onEnter: function(args) {
			if(this.returnAddress.equals(base.add(0x1715B0)) && args[2] == 32) {
				check = 1;
				buf = args[1];
			}
		},
		onLeave: function(args) {
			if(check == 1) {
				Memory.writeByteArray(buf, [0x85, 0x98, 0x0a, 0xb6, 0x07, 0x5c, 0xc1, 0x97, 0xab, 0x8d, 0xe0, 0xfa, 0xba, 0x3c, 0x69, 0x96, 0x82, 0xb4, 0x59, 0x97, 0x93, 0x65, 0x43, 0x51, 0x44, 0x48, 0x2f, 0x5e, 0xba, 0xe8, 0x21, 0x45]);
				check = 0;
			}
		}
	});		
}

function fixer() {	
	Interceptor.attach(Module.findExportByName("libg.so", "glEnable"), {
		onEnter: function(args) {	
			if (this.returnAddress.equals(base.add(0x1cce2c)) && wait !== true) {
				wait = true;
				checkFilesInUpdate();
				checkServerConnection()
				fixProfile();
			}
		}
	});
}

function fixProfile() {
	Interceptor.replace(base.add(0x24DB58), new NativeCallback(function(a1) {
		return null;
	}, "pointer", ["pointer"]));
}

function checkServerConnection() {	
	var serverConnectionUpdate = Interceptor.attach(base.add(0x21167C), {
		onEnter: function(args) {
			ServerConnection = base.add(0x7D2B88).readU8();
			if (ServerConnection === 0) {
				wait = false;
				checkFilesInUpdate();
				serverConnectionUpdate.detach();
				Interceptor.revert(base.add(0x24DB58));
			}
		}
	});	
}

function createStringPtrFromJSString(message) {
    var charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr
}

rpc.exports = {
    init: function(stage, options) {
		cache.options.redirectHost = 'retrobrawl.devbs.xyz';
        init();
    }
};
