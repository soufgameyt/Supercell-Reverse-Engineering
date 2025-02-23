//Made by MehmetEfeFriday
const base = Module.findBaseAddress("libg.so");
const basesize = Process.findModuleByName("libg.so").size;

// Bellek korumasını ayarla
Memory.protect(base, basesize, "rwx");

const SlipperyDebuffAddr = 0x82C668
const SlipperyDebuff = base.add(SlipperyDebuffAddr)

Interceptor.replace(SlipperyDebuff, new NativeCallback(function(a1) {
    return 0;
}, "int64", ["int64"]));