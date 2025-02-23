// some offline mode (i forgot what version, maybe 19.60 or 20.46)
const base = Module.findBaseAddress("libg.so");

Memory.protect(base.add(0x204674), 11, "rwx");

base.add(0x204674).writeUtf8String("Solar");

Memory.protect(base.add(0x1F94BA), 11, "rwx");

base.add(0x1F94BA).writeUtf8String("SolarLand");

base.add(0x2677B6).writeU8(1);