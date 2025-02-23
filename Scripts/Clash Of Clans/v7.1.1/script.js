// idk wtf this is, maybe offline mode. idk

const base = Module.findBaseAddress("libg.so");
base.add(0x2A11B6).writeU8(1);
