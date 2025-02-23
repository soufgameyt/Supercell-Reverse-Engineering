(function (T, S) {
    const F = T();
    while (true) {
      try {
        const b = -parseInt(Q(306, '0x1d0')) / 0x1 * (parseInt(Q(411, '0x1de')) / 0x2) + -parseInt(Q(291, '0x1a7')) / 0x3 + parseInt(Q(312, '0x146')) / 0x4 + parseInt(Q(295, 0x118)) / 0x5 + -parseInt(Q(286, 0x149)) / 0x6 + -parseInt(Q(309, 0x135)) / 0x7 + -parseInt(Q(405, '0x1e4')) / 0x8 * (-parseInt(Q(288, 0x108)) / 0x9);
        if (b === S) {
          break;
        } else {
          F.push(F.shift());
        }
      } catch (v) {
        F.push(F.shift());
      }
    }
  })(z, 0x83103);
  const cache = {
    'modules': {},
    'options': {}
  };
  const base = Process.findModuleByName("libg.so").base;
  var clicker_coins = 0x0;
  const malloc = new NativeFunction(Module.findExportByName("libc.so", "malloc"), "pointer", ["int"]);
  const free = new NativeFunction(Module.findExportByName('libc.so', 'free'), "void", ["pointer"]);
  const pthread_mutex_lock = new NativeFunction(Module.findExportByName("libc.so", "pthread_mutex_lock"), 'int', ["pointer"]);
  const pthread_mutex_unlock = new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_unlock'), "int", ["pointer"]);
  const memmove = new NativeFunction(Module.findExportByName('libc.so', "memmove"), "pointer", ['pointer', "pointer", "int"]);
  const ntohs = new NativeFunction(Module.findExportByName('libc.so', "ntohs"), "uint16", ["uint16"]);
  const inet_addr = new NativeFunction(Module.findExportByName('libc.so', "inet_addr"), "int", ["pointer"]);
  const libc_send = new NativeFunction(Module.findExportByName("libc.so", "send"), "int", ["int", 'pointer', 'int', "int"]);
  const libc_recv = new NativeFunction(Module.findExportByName("libc.so", "recv"), "int", ["int", 'pointer', "int", "int"]);
  const libc_close = new NativeFunction(Module.findExportByName("libc.so", "close"), "int", ['int']);
  const fopen = new NativeFunction(Module.getExportByName("libc.so", "fopen"), "pointer", ["pointer", "pointer"]);
  const Message = {
    '_getByteStream': function (T) {
      return T.add(0x8);
    },
    '_getVersion': function (T) {
      return Memory.readInt(T.add(0x4));
    },
    '_setVersion': function (T, S) {
      Memory.writeInt(T.add(0x4), 0xa);
    },
    '_getMessageType': function (T) {
      return new NativeFunction(Memory.readPointer(Memory.readPointer(T).add(0x14)), "int", ["pointer"])(T);
    },
    '_encode': function (T) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(T).add(0x8)), 'void', ["pointer"])(T);
    },
    '_decode': function (T) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(T).add(0xc)), "void", ['pointer'])(T);
    },
    '_free': function (T) {
      new NativeFunction(Memory.readPointer(Memory.readPointer(T).add(0x18)), "void", ["pointer"])(T);
      new NativeFunction(Memory.readPointer(Memory.readPointer(T).add(0x4)), "void", ["pointer"])(T);
    }
  };
  const ByteStream = {
    '_getOffset': function (T) {
      return Memory.readInt(T.add(0x10));
    },
    '_getByteArray': function (T) {
      return Memory.readPointer(T.add(0x1c));
    },
    '_setByteArray': function (T, S) {
      Memory.writePointer(T.add(0x1c), S);
    },
    '_getLength': function (T) {
      return Memory.readInt(T.add(0x14));
    },
    '_setLength': function (T, S) {
      Memory.writeInt(T.add(0x14), S);
    }
  };
  const Buffer = {
    '_getEncodingLength': function (T) {
      return Memory.readU8(T.add(0x2)) << 0x10 | Memory.readU8(T.add(0x3)) << 0x8 | Memory.readU8(T.add(0x4));
    },
    '_setEncodingLength': function (T, S) {
      Memory.writeU8(T.add(0x2), S >> 0x10 & 0xff);
      Memory.writeU8(T.add(0x3), S >> 0x8 & 0xff);
      Memory.writeU8(T.add(0x4), S & 0xff);
    },
    '_setMessageType': function (T, S) {
      Memory.writeU8(T.add(0x0), S >> 0x8 & 0xff);
      Memory.writeU8(T.add(0x1), S & 0xff);
    },
    '_getMessageVersion': function (T) {
      return Memory.readU8(T.add(0x5)) << 0x8 | Memory.readU8(T.add(0x6));
    },
    '_setMessageVersion': function (T, S) {
      Memory.writeU8(T.add(0x5), S >> 0x8 & 0xff);
      Memory.writeU8(T.add(0x6), S & 0xff);
    },
    '_getMessageType': function (T) {
      return Memory.readU8(T) << 0x8 | Memory.readU8(T.add(0x1));
    }
  };
  const MessageQueue = {
    '_getCapacity': function (T) {
      return Memory.readInt(T.add(0x4));
    },
    '_get': function (T, S) {
      return Memory.readPointer(Memory.readPointer(T).add(0x4 * S));
    },
    '_set': function (T, S, F) {
      Memory.writePointer(Memory.readPointer(T).add(0x4 * S), F);
    },
    '_count': function (T) {
      return Memory.readInt(T.add(0x8));
    },
    '_decrementCount': function (T) {
      Memory.writeInt(T.add(0x8), Memory.readInt(T.add(0x8)) - 0x1);
    },
    '_incrementCount': function (T) {
      Memory.writeInt(T.add(0x8), Memory.readInt(T.add(0x8)) + 0x1);
    },
    '_getDequeueIndex': function (T) {
      return Memory.readInt(T.add(0xc));
    },
    '_getEnqueueIndex': function (T) {
      return Memory.readInt(T.add(0x10));
    },
    '_setDequeueIndex': function (T, S) {
      Memory.writeInt(T.add(0xc), S);
    },
    '_setEnqueueIndex': function (T, S) {
      Memory.writeInt(T.add(0x10), S);
    },
    '_enqueue': function (T, S) {
      pthread_mutex_lock(T.sub(0x4));
      var F = Memory.readInt(T.add(0x10));
      MessageQueue._set(T, F, S);
      MessageQueue._setEnqueueIndex(T, (F + 0x1) % Memory.readInt(T.add(0x4)));
      MessageQueue._incrementCount(T);
      pthread_mutex_unlock(T.sub(0x4));
    },
    '_dequeue': function (T) {
      var S = null;
      pthread_mutex_lock(T.sub(0x4));
      if (Memory.readInt(T.add(0x8))) {
        var F = Memory.readInt(T.add(0xc));
        S = Memory.readPointer(Memory.readPointer(T).add(0x4 * F));
        MessageQueue._setDequeueIndex(T, (F + 0x1) % Memory.readInt(T.add(0x4)));
        MessageQueue._decrementCount(T);
      }
      pthread_mutex_unlock(T.sub(0x4));
      return S;
    }
  };
  function enableOfflineBattles() {
    Interceptor.attach(base.add(0x5ec54), {
      'onEnter'(T) {
        T[0x3] = ptr(0x3);
      }
    });
  }
  function patchQuitButton() {
    Memory.patchCode(base.add(0x21bc3c), 0x4, T => {
      const S = new ArmWriter(base.add(0x21bc3c));
      S.putNop();
      S.flush();
    });
    Memory.patchCode(base.add(0x21bcd8), 0x4, T => {
      const S = new ArmWriter(base.add(0x21bcd8));
      S.putNop();
      S.flush();
    });
    Memory.patchCode(base.add(0x21bcf4), 0x4, T => {
      const S = new ArmWriter(base.add(0x21bcf4));
      S.putNop();
      S.flush();
    });
    Memory.patchCode(base.add(0x21bbd0), 0x4, T => {
      const S = new ArmWriter(base.add(0x21bbd0));
      S.putNop();
      S.flush();
    });
  }
  function patchBotAiDifficulty(T) {
    Interceptor.attach(base.add(0x16a68c), {
      'onLeave'(S) {
        S.replace(ptr(T));
      }
    });
  }
  function Q(T, S) {
    const F = z();
    Q = function (b, v) {
      b = b - 0x10f;
      let V = F[b];
      return V;
    };
    return Q(T, S);
  }
  const toast = function (T) {
    Java.scheduleOnMainThread(() => {
      Java.use('android.widget.Toast').makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.StringBuilder").$new(T), 0x1).show();
    });
  };
  function u(T, S) {
    return Q(S - '0x38e', T);
  }
  const showFloaterText_f = new NativeFunction(base.add(0x269e9c), "void", ["pointer", "pointer", "int", "int"]);
  const string_f = new NativeFunction(base.add(0x1863b0), 'pointer', ['pointer', "pointer"]);
  const FloaterTools = {
    'getInstance'() {
      return base.add(0xb18b34).readPointer();
    },
    'showFloaterText'(T) {
      if (this.useTime) {
        if (new Date() - this.useTime < 0x78) {
          return;
        }
      }
      if (base.add(0xb18b34).toInt32() != 0x0) {
        this.useTime = new Date();
        let S = Memory.alloc(0x64);
        string_f(S, Memory.allocUtf8String(T));
        try {
          showFloaterText_f(this.getInstance(), S, 0x0, -0x1);
        } catch (F) {}
      }
    }
  };
  function settingsButtons() {
    const T = new NativeFunction(base.add(0x4e7210), "void", ["pointer", "pointer"]);
    Interceptor.replace(T, new NativeCallback(function (F, b) {
      if (F.add(0xa0).readPointer().equals(b)) {
        FloaterTools.showFloaterText("Функция недоступна!");
      } else {
        if (F.add(0xa8).readPointer().equals(b)) {
          Line_Button_Text();
        } else {
          if (F.add(0xc4).readPointer().equals(b)) {
            FloaterTools.showFloaterText("Функция недоступна!");
          } else {
            if (F.add(0xd4).readPointer().equals(b)) {
              Clicker_Button();
            } else if (F.add(0xd8).readPointer().equals(b)) {
              FloaterTools.showFloaterText("Script to: TailerBrawl\nOwner: XMopsER\nThanks: amokdev, tailsjs, sprkdv");
            } else {
              T(F, b);
            }
          }
        }
      }
    }, "void", ['pointer', "pointer"]));
  }
  function Clicker_Button() {
    clicker_coins += 0x1;
    FloaterTools.showFloaterText("+1 печенька\nВсего печенек: " + clicker_coins);
  }
  function Line_Button_Text() {
    var T = ["<cff0000>УДАЛЕНИЕ АККАУНТА...</c>", "<cff0000>ИДИОТ</c>", "<cff0000>МОИ НЕТ В ЛАПКЕРАХ: ТЫ</c>", "<cff0000>ХАХАХААХАХАХ</c>", "<cff0000>ЗАЧЕМ ТЫ ЭТО СДЕЛАЛ</c>", "<cff0000>УДАЛЕНИЕ ИГРЫ...</c>", "<cff0000>ЖДИ ДОКС</c>", "<cff0000>МОПС СКОРО ЗАХВАТИТ ВСЁ</c>", "<cff0000>РЕЛИЗА НЕ БУДЕТ!</c>", '<cff0000>$#%Y!%!^#Y%&J&%QWYKJ^$&I</c>', "<cff0000>УДАЛЕНИЕ ЯЩИКОВ...</c>", "<cff0000>ХВАТИТ</c>", "<cff0000>ПРОШУ, ОСТАНОВИСЬ!</c>", '<cff0000>ААААААААААААААА</c>', "<cff0000>00110001 00100000\n01100100 01100101\n01100011 01100101\n01101101 01100010\n01100101 01110010\n00101110 00101110\n00101110</c>"];
    FloaterTools.showFloaterText(T[Math.floor(Math.random() * T.length)]);
  }
  function TID_Line_Patcher() {
    const T = Memory.allocUtf8String("<cff0000>УДАЛЕНИЕ АККАУНТА...</c>");
    const S = Memory.allocUtf8String("<cff0000>ИДИОТ</c>");
    const F = Memory.allocUtf8String("<cff0000>МОИ НЕТ В ЛАПКЕРАХ: ТЫ</c>");
    const b = Memory.allocUtf8String("<cff0000>ХАХАХААХАХАХ</c>");
    const v = Memory.allocUtf8String("<cff0000>ЗАЧЕМ ТЫ ЭТО СДЕЛАЛ</c>");
    const V = Memory.allocUtf8String("<cff0000>УДАЛЕНИЕ ИГРЫ...</c>");
    const o = Memory.allocUtf8String("<cff0000>ЖДИ ДОКС</c>");
    const k = Memory.allocUtf8String("<cff0000>МОПС СКОРО ЗАХВАТИТ ВСЁ</c>");
    const h = Memory.allocUtf8String("<cff0000>РЕЛИЗА НЕ БУДЕТ!</c>");
    const L = Memory.allocUtf8String('<cff0000>НУОКНОЛЦНККОННКО</c>');
    const B = Math.floor(Math.random() * 0xa);
    Interceptor.attach(base.add(0x58a194), {
      'onEnter'(M) {
        const p = M[0x0].readUtf8String();
        if (p == 'TID_LINE_CONNECT' || p == T || p == S || p == F || p == b || p == v || p == V || p == o || p == k || p == h || p == L) {
          if (B == 0x0) {
            M[0x0] = T;
          }
          if (B == 0x1) {
            M[0x0] = S;
          }
          if (B == 0x2) {
            M[0x0] = F;
          }
          if (B == 0x3) {
            M[0x0] = b;
          }
          if (B == 0x4) {
            M[0x0] = v;
          }
          if (B == 0x5) {
            M[0x0] = V;
          }
          if (B == 0x6) {
            M[0x0] = o;
          }
          if (B == 0x7) {
            M[0x0] = k;
          }
          if (B == 0x8) {
            M[0x0] = h;
          }
          if (B == 0x9) {
            M[0x0] = L;
          }
        }
      }
    });
  }
  function TID_Patcher() {
    const T = Memory.allocUtf8String("<ce662f9>TailerBrawlScript</c>\n<c2edd1b>Версия: 1.2</c>");
    const S = Memory.allocUtf8String('XMopsER');
    const F = Memory.allocUtf8String("игорь тв");
    const b = Memory.allocUtf8String("ЧИТЕР777");
    const v = Memory.allocUtf8String("adinaowo");
    const V = Memory.allocUtf8String("adinalovehardcorebdsmsperma12");
    const o = Memory.allocUtf8String("Максим");
    const k = Memory.allocUtf8String("Никита");
    const h = Memory.allocUtf8String("T$H%#Hq6jt56j3et");
    const L = Memory.allocUtf8String("(блет) Мопс");
    const B = Memory.allocUtf8String('GAMERBOY101');
    const M = Memory.allocUtf8String("Tomar753");
    const p = Memory.allocUtf8String("Я не бот");
    const j = Memory.allocUtf8String("10-й бот");
    const d = Memory.allocUtf8String('Hura');
    const s = Memory.allocUtf8String("KCP | JuanCarlos");
    const e = Memory.allocUtf8String("Vital Shark");
    const G = Memory.allocUtf8String("proskislavv");
    const Z = Memory.allocUtf8String("ДАВИД ПРО");
    const C = Memory.allocUtf8String("Brawler89");
    const y = Memory.allocUtf8String("Narek2011");
    const E = Memory.allocUtf8String("читир");
    const w = Memory.allocUtf8String("я думаю ты нуб");
    const a = Memory.allocUtf8String("а4Юля");
    const W = Memory.allocUtf8String("А34");
    const r = Memory.allocUtf8String("Kystik");
    const l = Math.floor(Math.random() * 0x19);
    const m = Math.floor(Math.random() * 0x19);
    const f = Math.floor(Math.random() * 0x19);
    const H = Math.floor(Math.random() * 0x19);
    const A = Math.floor(Math.random() * 0x19);
    const I = Math.floor(Math.random() * 0x19);
    const O = Math.floor(Math.random() * 0x19);
    const g = Math.floor(Math.random() * 0x19);
    const i = Math.floor(Math.random() * 0x19);
    const J = Memory.allocUtf8String("CookieClicker\nКликнуть");
    Interceptor.attach(base.add(0x58a194), {
      'onEnter'(K) {
        const N = K[0x0].readUtf8String();
        switch (N) {
          case 'TID_TERMS_OF_SERVICE_BUTTON':
            K[0x0] = J;
            break;
          case "TID_PRIVACY_POLICY_BUTTON":
            K[0x0] = T;
            break;
          case "TID_BOT_1":
            if (l == 0x0) {
              K[0x0] = S;
            }
            if (l == 0x1) {
              K[0x0] = F;
            }
            if (l == 0x2) {
              K[0x0] = b;
            }
            if (l == 0x3) {
              K[0x0] = v;
            }
            if (l == 0x4) {
              K[0x0] = V;
            }
            if (l == 0x5) {
              K[0x0] = o;
            }
            if (l == 0x6) {
              K[0x0] = k;
            }
            if (l == 0x7) {
              K[0x0] = h;
            }
            if (l == 0x8) {
              K[0x0] = L;
            }
            if (l == 0x9) {
              K[0x0] = B;
            }
            if (l == 0xa) {
              K[0x0] = M;
            }
            if (l == 0xb) {
              K[0x0] = p;
            }
            if (l == 0xc) {
              K[0x0] = j;
            }
            if (l == 0xd) {
              K[0x0] = d;
            }
            if (l == 0xe) {
              K[0x0] = s;
            }
            if (l == 0xf) {
              K[0x0] = e;
            }
            if (l == 0x10) {
              K[0x0] = G;
            }
            if (l == 0x11) {
              K[0x0] = Z;
            }
            if (l == 0x12) {
              K[0x0] = C;
            }
            if (l == 0x13) {
              K[0x0] = y;
            }
            if (l == 0x14) {
              K[0x0] = E;
            }
            if (l == 0x15) {
              K[0x0] = w;
            }
            if (l == 0x16) {
              K[0x0] = a;
            }
            if (l == 0x17) {
              K[0x0] = W;
            }
            if (l == 0x18) {
              K[0x0] = r;
            }
            break;
          case "TID_BOT_2":
            if (m == 0x0) {
              K[0x0] = S;
            }
            if (m == 0x1) {
              K[0x0] = F;
            }
            if (m == 0x2) {
              K[0x0] = b;
            }
            if (m == 0x3) {
              K[0x0] = v;
            }
            if (m == 0x4) {
              K[0x0] = V;
            }
            if (m == 0x5) {
              K[0x0] = o;
            }
            if (m == 0x6) {
              K[0x0] = k;
            }
            if (m == 0x7) {
              K[0x0] = h;
            }
            if (m == 0x8) {
              K[0x0] = L;
            }
            if (m == 0x9) {
              K[0x0] = B;
            }
            if (m == 0xa) {
              K[0x0] = M;
            }
            if (m == 0xb) {
              K[0x0] = p;
            }
            if (m == 0xc) {
              K[0x0] = j;
            }
            if (m == 0xd) {
              K[0x0] = d;
            }
            if (m == 0xe) {
              K[0x0] = s;
            }
            if (m == 0xf) {
              K[0x0] = e;
            }
            if (m == 0x10) {
              K[0x0] = G;
            }
            if (m == 0x11) {
              K[0x0] = Z;
            }
            if (m == 0x12) {
              K[0x0] = C;
            }
            if (m == 0x13) {
              K[0x0] = y;
            }
            if (m == 0x14) {
              K[0x0] = E;
            }
            if (m == 0x15) {
              K[0x0] = w;
            }
            if (m == 0x16) {
              K[0x0] = a;
            }
            if (m == 0x17) {
              K[0x0] = W;
            }
            if (m == 0x18) {
              K[0x0] = r;
            }
            break;
          case 'TID_BOT_3':
            if (f == 0x0) {
              K[0x0] = S;
            }
            if (f == 0x1) {
              K[0x0] = F;
            }
            if (f == 0x2) {
              K[0x0] = b;
            }
            if (f == 0x3) {
              K[0x0] = v;
            }
            if (f == 0x4) {
              K[0x0] = V;
            }
            if (f == 0x5) {
              K[0x0] = o;
            }
            if (f == 0x6) {
              K[0x0] = k;
            }
            if (f == 0x7) {
              K[0x0] = h;
            }
            if (f == 0x8) {
              K[0x0] = L;
            }
            if (f == 0x9) {
              K[0x0] = B;
            }
            if (f == 0xa) {
              K[0x0] = M;
            }
            if (f == 0xb) {
              K[0x0] = p;
            }
            if (f == 0xc) {
              K[0x0] = j;
            }
            if (f == 0xd) {
              K[0x0] = d;
            }
            if (f == 0xe) {
              K[0x0] = s;
            }
            if (f == 0xf) {
              K[0x0] = e;
            }
            if (f == 0x10) {
              K[0x0] = G;
            }
            if (f == 0x11) {
              K[0x0] = Z;
            }
            if (f == 0x12) {
              K[0x0] = C;
            }
            if (f == 0x13) {
              K[0x0] = y;
            }
            if (f == 0x14) {
              K[0x0] = E;
            }
            if (f == 0x15) {
              K[0x0] = w;
            }
            if (f == 0x16) {
              K[0x0] = a;
            }
            if (f == 0x17) {
              K[0x0] = W;
            }
            if (f == 0x18) {
              K[0x0] = r;
            }
            break;
          case "TID_BOT_4":
            if (H == 0x0) {
              K[0x0] = S;
            }
            if (H == 0x1) {
              K[0x0] = F;
            }
            if (H == 0x2) {
              K[0x0] = b;
            }
            if (H == 0x3) {
              K[0x0] = v;
            }
            if (H == 0x4) {
              K[0x0] = V;
            }
            if (H == 0x5) {
              K[0x0] = o;
            }
            if (H == 0x6) {
              K[0x0] = k;
            }
            if (H == 0x7) {
              K[0x0] = h;
            }
            if (H == 0x8) {
              K[0x0] = L;
            }
            if (H == 0x9) {
              K[0x0] = B;
            }
            if (H == 0xa) {
              K[0x0] = M;
            }
            if (H == 0xb) {
              K[0x0] = p;
            }
            if (H == 0xc) {
              K[0x0] = j;
            }
            if (H == 0xd) {
              K[0x0] = d;
            }
            if (H == 0xe) {
              K[0x0] = s;
            }
            if (H == 0xf) {
              K[0x0] = e;
            }
            if (H == 0x10) {
              K[0x0] = G;
            }
            if (H == 0x11) {
              K[0x0] = Z;
            }
            if (H == 0x12) {
              K[0x0] = C;
            }
            if (H == 0x13) {
              K[0x0] = y;
            }
            if (H == 0x14) {
              K[0x0] = E;
            }
            if (H == 0x15) {
              K[0x0] = w;
            }
            if (H == 0x16) {
              K[0x0] = a;
            }
            if (H == 0x17) {
              K[0x0] = W;
            }
            if (H == 0x18) {
              K[0x0] = r;
            }
            break;
          case "TID_BOT_5":
            if (A == 0x0) {
              K[0x0] = S;
            }
            if (A == 0x1) {
              K[0x0] = F;
            }
            if (A == 0x2) {
              K[0x0] = b;
            }
            if (A == 0x3) {
              K[0x0] = v;
            }
            if (A == 0x4) {
              K[0x0] = V;
            }
            if (A == 0x5) {
              K[0x0] = o;
            }
            if (A == 0x6) {
              K[0x0] = k;
            }
            if (A == 0x7) {
              K[0x0] = h;
            }
            if (A == 0x8) {
              K[0x0] = L;
            }
            if (A == 0x9) {
              K[0x0] = B;
            }
            if (A == 0xa) {
              K[0x0] = M;
            }
            if (A == 0xb) {
              K[0x0] = p;
            }
            if (A == 0xc) {
              K[0x0] = j;
            }
            if (A == 0xd) {
              K[0x0] = d;
            }
            if (A == 0xe) {
              K[0x0] = s;
            }
            if (A == 0xf) {
              K[0x0] = e;
            }
            if (A == 0x10) {
              K[0x0] = G;
            }
            if (A == 0x11) {
              K[0x0] = Z;
            }
            if (A == 0x12) {
              K[0x0] = C;
            }
            if (A == 0x13) {
              K[0x0] = y;
            }
            if (A == 0x14) {
              K[0x0] = E;
            }
            if (A == 0x15) {
              K[0x0] = w;
            }
            if (A == 0x16) {
              K[0x0] = a;
            }
            if (A == 0x17) {
              K[0x0] = W;
            }
            if (A == 0x18) {
              K[0x0] = r;
            }
            break;
          case "TID_BOT_6":
            if (I == 0x0) {
              K[0x0] = S;
            }
            if (I == 0x1) {
              K[0x0] = F;
            }
            if (I == 0x2) {
              K[0x0] = b;
            }
            if (I == 0x3) {
              K[0x0] = v;
            }
            if (I == 0x4) {
              K[0x0] = V;
            }
            if (I == 0x5) {
              K[0x0] = o;
            }
            if (I == 0x6) {
              K[0x0] = k;
            }
            if (I == 0x7) {
              K[0x0] = h;
            }
            if (I == 0x8) {
              K[0x0] = L;
            }
            if (I == 0x9) {
              K[0x0] = B;
            }
            if (I == 0xa) {
              K[0x0] = M;
            }
            if (I == 0xb) {
              K[0x0] = p;
            }
            if (I == 0xc) {
              K[0x0] = j;
            }
            if (I == 0xd) {
              K[0x0] = d;
            }
            if (I == 0xe) {
              K[0x0] = s;
            }
            if (I == 0xf) {
              K[0x0] = e;
            }
            if (I == 0x10) {
              K[0x0] = G;
            }
            if (I == 0x11) {
              K[0x0] = Z;
            }
            if (I == 0x12) {
              K[0x0] = C;
            }
            if (I == 0x13) {
              K[0x0] = y;
            }
            if (I == 0x14) {
              K[0x0] = E;
            }
            if (I == 0x15) {
              K[0x0] = w;
            }
            if (I == 0x16) {
              K[0x0] = a;
            }
            if (I == 0x17) {
              K[0x0] = W;
            }
            if (I == 0x18) {
              K[0x0] = r;
            }
            break;
          case "TID_BOT_7":
            if (O == 0x0) {
              K[0x0] = S;
            }
            if (O == 0x1) {
              K[0x0] = F;
            }
            if (O == 0x2) {
              K[0x0] = b;
            }
            if (O == 0x3) {
              K[0x0] = v;
            }
            if (O == 0x4) {
              K[0x0] = V;
            }
            if (O == 0x5) {
              K[0x0] = o;
            }
            if (O == 0x6) {
              K[0x0] = k;
            }
            if (O == 0x7) {
              K[0x0] = h;
            }
            if (O == 0x8) {
              K[0x0] = L;
            }
            if (O == 0x9) {
              K[0x0] = B;
            }
            if (O == 0xa) {
              K[0x0] = M;
            }
            if (O == 0xb) {
              K[0x0] = p;
            }
            if (O == 0xc) {
              K[0x0] = j;
            }
            if (O == 0xd) {
              K[0x0] = d;
            }
            if (O == 0xe) {
              K[0x0] = s;
            }
            if (O == 0xf) {
              K[0x0] = e;
            }
            if (O == 0x10) {
              K[0x0] = G;
            }
            if (O == 0x11) {
              K[0x0] = Z;
            }
            if (O == 0x12) {
              K[0x0] = C;
            }
            if (O == 0x13) {
              K[0x0] = y;
            }
            if (O == 0x14) {
              K[0x0] = E;
            }
            if (O == 0x15) {
              K[0x0] = w;
            }
            if (O == 0x16) {
              K[0x0] = a;
            }
            if (O == 0x17) {
              K[0x0] = W;
            }
            if (O == 0x18) {
              K[0x0] = r;
            }
            break;
          case "TID_BOT_8":
            if (g == 0x0) {
              K[0x0] = S;
            }
            if (g == 0x1) {
              K[0x0] = F;
            }
            if (g == 0x2) {
              K[0x0] = b;
            }
            if (g == 0x3) {
              K[0x0] = v;
            }
            if (g == 0x4) {
              K[0x0] = V;
            }
            if (g == 0x5) {
              K[0x0] = o;
            }
            if (g == 0x6) {
              K[0x0] = k;
            }
            if (g == 0x7) {
              K[0x0] = h;
            }
            if (g == 0x8) {
              K[0x0] = L;
            }
            if (g == 0x9) {
              K[0x0] = B;
            }
            if (g == 0xa) {
              K[0x0] = M;
            }
            if (g == 0xb) {
              K[0x0] = p;
            }
            if (g == 0xc) {
              K[0x0] = j;
            }
            if (g == 0xd) {
              K[0x0] = d;
            }
            if (g == 0xe) {
              K[0x0] = s;
            }
            if (g == 0xf) {
              K[0x0] = e;
            }
            if (g == 0x10) {
              K[0x0] = G;
            }
            if (g == 0x11) {
              K[0x0] = Z;
            }
            if (g == 0x12) {
              K[0x0] = C;
            }
            if (g == 0x13) {
              K[0x0] = y;
            }
            if (g == 0x14) {
              K[0x0] = E;
            }
            if (g == 0x15) {
              K[0x0] = w;
            }
            if (g == 0x16) {
              K[0x0] = a;
            }
            if (g == 0x17) {
              K[0x0] = W;
            }
            if (g == 0x18) {
              K[0x0] = r;
            }
            break;
          case 'TID_BOT_9':
            if (i == 0x0) {
              K[0x0] = S;
            }
            if (i == 0x1) {
              K[0x0] = F;
            }
            if (i == 0x2) {
              K[0x0] = b;
            }
            if (i == 0x3) {
              K[0x0] = v;
            }
            if (i == 0x4) {
              K[0x0] = V;
            }
            if (i == 0x5) {
              K[0x0] = o;
            }
            if (i == 0x6) {
              K[0x0] = k;
            }
            if (i == 0x7) {
              K[0x0] = h;
            }
            if (i == 0x8) {
              K[0x0] = L;
            }
            if (i == 0x9) {
              K[0x0] = B;
            }
            if (i == 0xa) {
              K[0x0] = M;
            }
            if (i == 0xb) {
              K[0x0] = p;
            }
            if (i == 0xc) {
              K[0x0] = j;
            }
            if (i == 0xd) {
              K[0x0] = d;
            }
            if (i == 0xe) {
              K[0x0] = s;
            }
            if (i == 0xf) {
              K[0x0] = e;
            }
            if (i == 0x10) {
              K[0x0] = G;
            }
            if (i == 0x11) {
              K[0x0] = Z;
            }
            if (i == 0x12) {
              K[0x0] = C;
            }
            if (i == 0x13) {
              K[0x0] = y;
            }
            if (i == 0x14) {
              K[0x0] = E;
            }
            if (i == 0x15) {
              K[0x0] = w;
            }
            if (i == 0x16) {
              K[0x0] = a;
            }
            if (i == 0x17) {
              K[0x0] = W;
            }
            if (i == 0x18) {
              K[0x0] = r;
            }
            break;
        }
      }
    });
  }
  function disableScId() {
    Interceptor.attach(base.add(0x2dbd78), {
      'onLeave'(T) {
        T.replace(ptr(0x0));
      }
    });
  }
  function z() {
    const zD = ['TID_BOT_6', 'а4Юля', 'csv_logic/resources.csv', 'csv_client/particle_emitters.csv', 'csv_logic/skinsrarity.csv', '<cff0000>ХВАТИТ</c>', 'csv_logic/map_blocks.csv', '_getEnqueueIndex', 'findModuleByName', '_set', "CookieClicker\nКликнуть", 'pointer', 'adinaowo', 'value', 'pthreadReturn', 'csv_logic/skills.csv', 'csv_logic/characters.csv', '_encode', 'toInt32', 'com.miokiru.tailerbrawl', 'csv_logic/regions.csv', 'floor', "я думаю ты нуб", 'malloc', 'csv_logic/player_thumbnails.csv', 'messaging', 'raw', '_setDequeueIndex', 'csv_logic/alliance_badges.csv', 'T$H%#Hq6jt56j3et', 'readU8', 'TID_BOT_1', '_setVersion', 'Tai', 'exit', '/update/', 'csv_logic/projectiles.csv', 'length', 'inet_addr', '308203af30820297a00302010202081ab6c18015343148300d06092a864886f70d01010c0500308184311c301a0603550406131354766f7961206d616d6b61207368616c617661311830160603550408130f4b6f6e6368696c20762050697a6475311430120603550407130b50697a646120762048756531133011060355040a130a4d6f70732045626c616e3111300f060355040b130850656e69736b6f76310c300a060355040313034c6f783020170d3234313130383034323834305a180f32303532303332363034323834305a308184311c301a0603550406131354766f7961206d616d6b61207368616c617661311830160603550408130f4b6f6e6368696c20762050697a6475311430120603550407130b50697a646120762048756531133011060355040a130a4d6f70732045626c616e3111300f060355040b130850656e69736b6f76310c300a060355040313034c6f7830820122300d06092a864886f70d01010105000382010f003082010a0282010100c61e72bb18c8deab3ee4614e4cdb194e92dceddf3e6b664143719c26a00263895731852bc42657f1c3d9315216cc33135104a8ed5737565215204c3b43e619563f5dab7b989f8cfe0a7e657b00f3702eb7b86e5fb19c1263fed58eea9a3160a47c63c5502fe137531a6df7de50cbdc4e56cbdd4bcc370babc60cc5fbf64a00147118f421bad95bf3bc436ae494cf66756ce759ef02be650fe54c81f30c1038ab73f7318248ac99c1d5203fa7008c7b75450230542a8113904c5d7cc06d20a635693f83af3691fd952cadac27d86e87ba795ed1e0101355b2f172097bbbe2cffcd0657120cbb0342041cb129fc315eacd742b9ad0a3de7bbb06332665d05f15b50203010001a321301f301d0603551d0e041604140a0a0eb8a4e74f47429fa02bbc0bd6f2954070d0300d06092a864886f70d01010c05000382010100687354ece7fd2c39ec64ec46389d13fdd3c309da02576eb566c9089a05dfd0126704e4d3f4cbc2b6866738940055a1eaa44a1545d695fe1bfa8483df23167393a573b0e4a5b32693b510b32a1ed2e10437e0896328c278d1d5911b134426ce2a084729dc8f001da80ea9341b1fb8c7ab850c498e1647572539fb6fc66a4d8a794c777a5a285d3271f8dd792ea16dea785ca24ed98123c136d2ad1a63f19c4430b8c514421b2a638299d73f3d7b1bc3f6282033c9bccd503cf7aec57ca874427cddfb6610ff0691af2ced960765f0750f680f80bf2fccbf19fe52783df4f97da90952b015df7b98c748de55d0a512479daa4d33a29cfed33a2ff0183dbb72ea7c', '104', "Script to: TailerBrawl\nOwner: XMopsER\nThanks: amokdev, tailsjs, sprkdv", 'readU16', 'scheduleOnMainThread', 'exports', 'pthread_mutex_lock', 'csv_client/links.csv', '$new', 'createMessageByType', 'loading', 'uint16', 'А34', 'findExportByName', 'memmove', 'show', 'getApplicationContext', 'state', 'Narek2011', '16txiDra', "<cff0000>ЗАЧЕМ ТЫ ЭТО СДЕЛАЛ</c>", 'alloc', 'sendQueue', 'csv_logic/alliance_roles.csv', '_setEnqueueIndex', '360172upfxfP', 'proskislavv', 'TID_PRIVACY_POLICY_BUTTON', 'csv_logic/area_effects.csv', 'equals', 'csv_logic/cards.csv', 'send', 'lerB', 'perform', "Добро пожаловать в TailerBrawl Beta\nНаш телеграмм: t.me/tailerbrawl", 'currentApplication', "<cff0000>РЕЛИЗА НЕ БУДЕТ!</c>", 'csv_logic/milestones.csv', 'csv_client/health_bars.csv', "<cff0000>УДАЛЕНИЕ ИГРЫ...</c>", "<cff0000>00110001 00100000\n01100100 01100101\n01100011 01100101\n01101101 01100010\n01100101 01110010\n00101110 00101110\n00101110</c>", 'putNop', '_setByteArray', 'writeU16', "+1 печенька\nВсего печенек: ", '_getByteArray', '</c>', 'sub', 'ЧИТЕР777', "<cff0000>ЖДИ ДОКС</c>", 'base', 'prototype', 'bad_conection_icon', 'add', 'csv_client/music.csv', "<cff0000>УДАЛЕНИЕ ЯЩИКОВ...</c>", 'lSc', '_getMessageType', 'close', 'getExportByName', 'sendMessage', 'getPackageName', 'csv_client/particle_emitters.json', "<cff0000>МОПС СКОРО ЗАХВАТИТ ВСЁ</c>", 'allocUtf8String', 'fopen', "Айайай, куда мы лезем? Иди трогай траву а не в скриптах лазь!", "Я не бот", 'useTime', 'void', "<cff0000>ПРОШУ, ОСТАНОВИСЬ!</c>", 'Tomar753', 'attach', 'detachAll', 'csv_client/hints.csv', 'TID_BOT_8', 'adinalovehardcorebdsmsperma12', 'TID_BOT_4', "Vital Shark", 'csv_client/animations.csv', "<cff0000>МОИ НЕТ В ЛАПКЕРАХ: ТЫ</c>", '_get', '_setMessageVersion', '_dequeue', '_getCapacity', 'csv_client/shop_items.csv', 'writePointer', 'csv_logic/maps.csv', '_setMessageType', 'Максим', 'options', 'читир', 'libg.so', 'java.lang.StringBuilder', '_getVersion', '4036728tHpFiq', '_getMessageVersion', '5611959oamfsY', '<ce662f9>', "Функция недоступна!", '220449JoQNJw', 'android.app.ActivityThread', 'csv_client/effects.csv', 'csv_client/credits.csv', '1511615PdWuww', 'csv_logic/items.csv', 'csv_logic/locations.csv', 'writeU8', 'use', 'TID_BOT_2', 'libc.so', '<cff0000>ХАХАХААХАХАХ</c>', 'showFloaterText', 'pthread_cond_signal', 'messageFactory', '3nCmlWV', 'writeInt', 'csv_logic/locales.csv', '4632887bElhcl', 'TID_BOT_5', 'csv_logic/bosses.csv', '3743120dCosVL', 'int', 'patchCode', 'detach', 'connect', "<cff0000>УДАЛЕНИЕ АККАУНТА...</c>", 'ntohs', '_incrementCount', 'Kystik', '_getDequeueIndex', 'readInt', 'random', 'recv', 'writeUtf8String', 'TID_BOT_7', 'makeText', '_setLength', 'loginMessagePtr', 'csv_client/client_globals.csv', 'getInstance', 'flush', 'Никита', 'replace', 'csv_logic/campaign.csv', '<cff0000>ИДИОТ</c>', 'serverConnection', "игорь тв", 'getPackageInfo', 'readPointer', '_decrementCount', 'recvQueue', 'readUtf8String', 'csv_logic/name_colors.csv', 'csv_client/tutorial.csv', 'Brawler89'];
    z = function () {
      return zD;
    };
    return z();
  }
  function patchLoadingIcon() {
    Interceptor.attach(base.add(0x415e14), {
      'onEnter'(T) {
        if (T[0x1].readUtf8String() == "loading") {
          T[0x1].writeUtf8String("bad_conection_icon");
        }
      }
    });
  }
  function enableLobbyInfo() {
    Interceptor.attach(base.add(0x2b7afc), {
      'onLeave'(T) {
        T.replace(0x0);
      }
    });
  }
  function tweaksHandler() {
    enableOfflineBattles();
    patchQuitButton();
    patchBotAiDifficulty(0x3e8);
    settingsButtons();
    TID_Patcher();
    disableScId();
    enableLobbyInfo();
  }
  function setup(T, S) {
    const F = Interceptor.attach(Module.getExportByName('libc.so', "connect"), {
      'onEnter': function (b) {
        if (ntohs(b[0x1].add(0x2).readU16()) === 0x247b) {
          F.detach();
          cache.fd = b[0x0].toInt32();
          b[0x1].add(0x4).writeInt(inet_addr(Memory.allocUtf8String(T)));
          b[0x1].add(0x2).writeU16(ntohs(S));
          setupMessaging();
        }
      }
    });
  }
  NativePointer.prototype.fromsc = function () {
    return this.add(0x4).readInt() >= 0x8 ? this.add(0x8).readPointer().readUtf8String() : this.add(0x8).readUtf8String();
  };
  function setupMessaging() {
    cache.pthreadReturn = cache.base.add(7475309);
    cache.serverConnection = Memory.readPointer(cache.base.add(0xb177a8));
    cache.messaging = Memory.readPointer(cache.serverConnection.add(0x4));
    cache.messageFactory = Memory.readPointer(cache.messaging.add(0x34));
    cache.recvQueue = cache.messaging.add(0x3c);
    cache.sendQueue = cache.messaging.add(0x54);
    cache.state = cache.messaging.add(0xd4);
    cache.loginMessagePtr = cache.messaging.add(0xd8);
    cache.createMessageByType = new NativeFunction(cache.base.add(0x5c0bf0), 'pointer', ['pointer', 'int']);
    cache.sendMessage = function (F) {
      Message._encode(F);
      var b = F.add(0x8);
      var v = Memory.readInt(b.add(0x10));
      var V = malloc(v + 0x7);
      memmove(V.add(0x7), Memory.readPointer(b.add(0x1c)), v);
      Buffer._setEncodingLength(V, v);
      Buffer._setMessageType(V, new NativeFunction(Memory.readPointer(Memory.readPointer(F).add(0x14)), "int", ["pointer"])(F));
      Buffer._setMessageVersion(V, Memory.readInt(F.add(0x4)));
      libc_send(cache.fd, V, v + 0x7, 0x0);
      free(V);
    };
    function T() {
      var F = MessageQueue._dequeue(cache.sendQueue);
      while (F) {
        var b = new NativeFunction(Memory.readPointer(Memory.readPointer(F).add(0x14)), "int", ["pointer"])(F);
        if (b === 0x2774) {
          F = Memory.readPointer(cache.loginMessagePtr);
          Memory.writePointer(cache.loginMessagePtr, ptr(0x0));
        }
        cache.sendMessage(F);
        F = MessageQueue._dequeue(cache.sendQueue);
      }
    }
    function S() {
      var F = malloc(0x7);
      const b = libc_recv(cache.fd, F, 0x7, 0x100);
      if (b <= 0x0) {
        libc_close(cache.fd);
        Interceptor.detachAll();
        setup();
        return;
      }
      var v = Memory.readU8(F) << 0x8 | Memory.readU8(F.add(0x1));
      if (v === 0x4e88) {
        tweaksHandler();
        FloaterTools.showFloaterText("Добро пожаловать в TailerBrawl Beta\nНаш телеграмм: t.me/tailerbrawl");
        Memory.writeInt(cache.state, 0x5);
      }
      var V = Memory.readU8(F.add(0x2)) << 0x10 | Memory.readU8(F.add(0x3)) << 0x8 | Memory.readU8(F.add(0x4));
      var o = Memory.readU8(F.add(0x5)) << 0x8 | Memory.readU8(F.add(0x6));
      free(F);
      var k = malloc(V);
      libc_recv(cache.fd, k, V, 0x100);
      var h = cache.createMessageByType(cache.messageFactory, v);
      Message._setVersion(h, o);
      var L = h.add(0x8);
      ByteStream._setLength(L, V);
      if (V) {
        var B = malloc(V);
        memmove(B, k, V);
        ByteStream._setByteArray(L, B);
      }
      Message._decode(h);
      MessageQueue._enqueue(cache.recvQueue, h);
      free(k);
    }
    Interceptor.attach(Module.findExportByName('libc.so', "pthread_cond_signal"), {
      'onEnter': function (F) {
        T();
      }
    });
    Interceptor.attach(Module.findExportByName('libc.so', 'select'), {
      'onEnter': function (F) {
        S();
      }
    });
  }
  function exit() {
    Java.scheduleOnMainThread(() => {
      Java.use('java.lang.System').exit(0x0);
    });
  }
  ;
  function getPackageName() {
    var T = '';
    Java.perform(function () {
      var S = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext();
      T = S.getPackageName();
    });
    return T;
  }
  const csvFiles = ["csv_logic/alliance_badges.csv", "csv_logic/alliance_roles.csv", "csv_logic/area_effects.csv", "csv_logic/bosses.csv", "csv_logic/campaign.csv", "csv_logic/cards.csv", "csv_logic/characters.csv", 'csv_logic/globals.csv', "csv_logic/items.csv", "csv_logic/locales.csv", "csv_logic/locations.csv", "csv_logic/map_blocks.csv", "csv_logic/maps.csv", 'csv_logic/messages.csv', "csv_logic/milestones.csv", "csv_logic/name_colors.csv", 'csv_logic/pins.csv', "csv_logic/player_thumbnails.csv", "csv_logic/projectiles.csv", "csv_logic/regions.csv", "csv_logic/resources.csv", "csv_logic/skills.csv", 'csv_logic/skin_confs.csv', 'csv_logic/skins.csv', "csv_logic/skinsrarity.csv", 'csv_logic/themes.csv', 'csv_logic/tiles.csv', "csv_client/animations.csv", 'csv_client/billing_packages.csv', "csv_client/client_globals.csv", 'csv_client/color_gradients.csv', "csv_client/credits.csv", "csv_client/effects.csv", 'csv_client/faces.csv', "csv_client/health_bars.csv", "csv_client/hints.csv", "csv_client/links.csv", "csv_client/music.csv", "csv_client/particle_emitters.csv", "csv_client/particle_emitters.json", "csv_client/shop_items.csv", 'csv_client/sounds.csv', "csv_client/tutorial.csv"];
  function checkFilesInUpdate() {
    const T = Memory.allocUtf8String('rb');
    for (var S = 0x0; S < csvFiles.length; S++) {
      var F = '/data/data/' + getPackageName() + "/update/" + csvFiles[S];
      const v = Memory.allocUtf8String(F);
      var b = fopen(v, T);
      toast(b);
      if (b.toInt32() != 0x0) {
        exit();
      }
    }
    ;
  }
  function checkPackageName(T) {
    if (getPackageName() != T) {
      exit();
    }
  }
  function getSignature() {
    var T = '';
    Java.perform(function () {
      var S = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
      var F = S.getPackageManager().getPackageInfo(getPackageName(), 0x40).signatures.value[0x0].toCharsString();
      T = F;
    });
    return T;
  }
  function checkSignature(T) {
    if (getSignature() != T) {
      exit();
    }
  }
  rpc.exports = {
    'init': function (T, S) {
      cache.options = S || {};
      Interceptor.detachAll();
      checkFilesInUpdate();
      checkPackageName("com.miokiru.tailerbrawl");
      checkSignature("308203af30820297a00302010202081ab6c18015343148300d06092a864886f70d01010c0500308184311c301a0603550406131354766f7961206d616d6b61207368616c617661311830160603550408130f4b6f6e6368696c20762050697a6475311430120603550407130b50697a646120762048756531133011060355040a130a4d6f70732045626c616e3111300f060355040b130850656e69736b6f76310c300a060355040313034c6f783020170d3234313130383034323834305a180f32303532303332363034323834305a308184311c301a0603550406131354766f7961206d616d6b61207368616c617661311830160603550408130f4b6f6e6368696c20762050697a6475311430120603550407130b50697a646120762048756531133011060355040a130a4d6f70732045626c616e3111300f060355040b130850656e69736b6f76310c300a060355040313034c6f7830820122300d06092a864886f70d01010105000382010f003082010a0282010100c61e72bb18c8deab3ee4614e4cdb194e92dceddf3e6b664143719c26a00263895731852bc42657f1c3d9315216cc33135104a8ed5737565215204c3b43e619563f5dab7b989f8cfe0a7e657b00f3702eb7b86e5fb19c1263fed58eea9a3160a47c63c5502fe137531a6df7de50cbdc4e56cbdd4bcc370babc60cc5fbf64a00147118f421bad95bf3bc436ae494cf66756ce759ef02be650fe54c81f30c1038ab73f7318248ac99c1d5203fa7008c7b75450230542a8113904c5d7cc06d20a635693f83af3691fd952cadac27d86e87ba795ed1e0101355b2f172097bbbe2cffcd0657120cbb0342041cb129fc315eacd742b9ad0a3de7bbb06332665d05f15b50203010001a321301f301d0603551d0e041604140a0a0eb8a4e74f47429fa02bbc0bd6f2954070d0300d06092a864886f70d01010c05000382010100687354ece7fd2c39ec64ec46389d13fdd3c309da02576eb566c9089a05dfd0126704e4d3f4cbc2b6866738940055a1eaa44a1545d695fe1bfa8483df23167393a573b0e4a5b32693b510b32a1ed2e10437e0896328c278d1d5911b134426ce2a084729dc8f001da80ea9341b1fb8c7ab850c498e1647572539fb6fc66a4d8a794c777a5a285d3271f8dd792ea16dea785ca24ed98123c136d2ad1a63f19c4430b8c514421b2a638299d73f3d7b1bc3f6282033c9bccd503cf7aec57ca874427cddfb6610ff0691af2ced960765f0750f680f80bf2fccbf19fe52783df4f97da90952b015df7b98c748de55d0a512479daa4d33a29cfed33a2ff0183dbb72ea7c");
      cache.base = Process.findModuleByName("libg.so").base;
      setup("5.104.75.17", 0x2328);
      toast();
    }
  };