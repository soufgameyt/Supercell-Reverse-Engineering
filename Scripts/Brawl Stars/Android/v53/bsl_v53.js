// а вот да
// тут деобфускатора рофлы да

const A = Module.findBaseAddress("libg.so");
const i = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
const O = new NativeFunction(Module.findExportByName("libc.so", "inet_addr"), "int", ["pointer"]);
const t = A.add(4755536);
const b = A.add(1473184);
const C = A.add(1253766);
const B0 = A.add(6343388);
const B1 = A.add(6343332);
const B2 = A.add(6343324);
const B3 = A.add(5840324);

function B4(I, s, J) {
  switch (s.toLowerCase()) {
    case "bytearray":
      Memory.protect(I, J.length, "rwx");
      Memory.writeByteArray(I, J);
      Memory.protect(I, J.length, "rx");
      break;
    case "string":
      Memory.protect(I, J.length, "rwx");
      Memory.writeUtf8String(I, J);
      Memory.protect(I, J.length, "rx");
      break;
    case "byte":
      Memory.protect(I, 1, "rwx");
      Memory.writeS8(I, J);
      Memory.protect(I, 1, "rx");
      break;
  }
}

const B5 = {
  KillAds() {
    Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource5startEPKcbbS1_"), new NativeCallback(function () {}, "void", []));
    Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource11setMetadataEPKcS1_"), new NativeCallback(function () {}, "void", []));
    Interceptor.replace(Module.findExportByName("libironsource-ads.so", "_ZN10ironsource13isAdAvailableEv"), new NativeCallback(function () {
      return 0;
    }, "void", []));
  },
  RedirectConnection(x, I) {
    Interceptor.attach(Module.findExportByName("libc.so", "connect"), {
      onEnter(J) {
        if (i(Memory.readU16(J[1].add(2))) === 9339) {
          Memory.writeU16(J[1].add(2), i(I));
          Memory.writeInt(J[1].add(4), O(Memory.allocUtf8String(x)));
        }
      }
    });
  },
  
  PublicKeyChange() {
    B4(b, "ByteArray", [176, 34, 250, 182, 83, 219, 239, 33, 143, 194, 166, 186, 14, 16, 90, 40, 105, 220, 235, 204, 35, 85, 91, 245, 70, 17, 164, 194, 135, 106, 27, 51, 150, 95, 152, 1, 95, 36, 141, 253, 43, 150, 246, 11, 175, 41, 206, 70, 38, 38, 240, 134, 173, 29, 183, 166, 251, 25, 9, 72, 207, 201, 216, 105]);
  },
  
  TidConnectingToServerChange() {
    B4(C, "String", "BSL-V53|Connecting...");
  },
  
  ClientEnvironmentChange() {
    B4(B0, "Byte", 1);
    B4(B2, "Byte", 1);
    B4(B1, "Byte", 0);
  },
  
  OfflineBattles() {
    Interceptor.attach(B3, {
      onEnter(I) {
        const s = {
          GZxPt: function (J, K, c, l) {
            return J(K, c, l);
          },
          LtAlQ: "String",
          ZNFtx: "BSL-V53|Connecting..."
        };
        I[3] = ptr(3);
        I[8] = ptr(1);
      }
    });
  }
};

rpc.exports.init = function (I, s) {
  B5.KillAds();
  B5.RedirectConnection(s.redirectHost, s.redirectPort);
  B5.PublicKeyChange();
  B5.TidConnectingToServerChange();
  B5.ClientEnvironmentChange();
  B5.OfflineBattles();
};
