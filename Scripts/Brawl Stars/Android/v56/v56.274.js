const base = Module.findBaseAddress('libg.so');
const base_size = Process.findModuleByName("libg.so").size;

var cache = {};

Memory.protect(base, base_size, "rwx");

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

const DataByID = new NativeFunction(base.add(0x5ECE94), "pointer", ["int"]);
const SettingsScreenCtor = new NativeFunction(base.add(0x5665C8), "pointer", ["pointer"]);

const DropGUIContainer_addGameButton = new NativeFunction(base.add(0x29A048), 'pointer', ['pointer', 'pointer', 'int']);

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

const Csv = {
  getTable(_0x1e4adf) {
    return _0x3c1da6(_0x1e4adf);
  },
  getDataById(id) {
    return DataByID(id);
  }
};

const connect = {
    init() {
        Interceptor.attach(Module.findExportByName('libc.so', 'getaddrinfo'), {
            onEnter(args) {
              try
              {
                this.str = args[0] = Memory.allocUtf8String('stage.brawlstarsgame.com');
                args[1].writeUtf8String('9339');
                console.log('Connecting to ' + args[0].readUtf8String() + ':' + args[1].readUtf8String());
                connect.detach()
              }
              catch
              {
              }
            }
          });
          Interceptor.attach(Libg.offset(0x436D60), { // ServerConnection::connectTo
            onEnter(args) {
              args[1].add(8).readPointer().writeUtf8String("stage.brawlstarsgame.com");
            }
          });
    }
}

Interceptor.attach(base.add(0x573C00), { // need to load debug menu in main menu (not 24101 cringe)
	onLeave(retVal) {
    console.log("[HomeMode::enter] OwnHomeData received!");
    PreviewLogic.PreviewSkin();
	}
});

const PreviewLogic = {
  PreviewSkin() {
    let _0x4c1e7f = Csv.getDataById(52);
    //let _0x2f52ea = _0x4c1e7f.add(144).readPointer();
    //let _0x1d9f28 = _0x2f52ea.add(64).readPointer();
    console.log(_0x4c1e7f + ' ')
  }
}

const DebugPatcher = {
  patch() {
    WriteToMemory(Libg.offset(0x598F8C), 'Byte', 0); // LogicVersion::isProd
    WriteToMemory(Libg.offset(0x598F9C), 'Byte', 0);
  }
} 

rpc.exports.init = function() {
    Libg.init();
    connect.init();
    DebugPatcher.patch();
}