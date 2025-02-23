// Processing, please wait...
function fn_1() {
    function fn_3() {
        function fn_5() {
            if (!!n[arg0]) goto`l_145`
            label`l_9`
            if (!!e[arg0]) goto`l_95`
            label`l_15`
            if (!"function" == typeof require) goto`l_35`
            label`l_30`
            "function" == typeof require
            c = require;
            if (!!arg1) goto`l_50`
            label`l_41`
            if (!c) goto`l_50`
            label`l_44`
            return c(arg0, !0);
            if (!u) goto`l_60`
            label`l_54`
            return u(arg0, !0);
            a = new Error("Cannot find module '" + arg0 + "'");
            a.code = "MODULE_NOT_FOUND";
            throw a;
        }
        o = fn_5;
        if (!"function" == typeof require) goto`l_23`
        label`l_18`
        "function" == typeof require
        u = require;
        i = 0;
        if (!i < arg2.length) goto`l_42`
        label`l_33`
        o(arg2[i])
        i++;
        goto`l_26`
        label`l_43`
        return o;
    }
    r = fn_3;
    return r;
}
function fn_7() {
    function fn_9() {
        _0x1455ca["add"](6466788)["writeU16"](arg0);
    }
    _0x59c477 = fn_9;
    function fn_11() {
        _0x47acd2 = _0x458dd8(arg0["length"] + 1);
        Memory["writeUtf8String"](_0x47acd2, arg0)
        return _0x47acd2;
    }
    _0x3fd494 = fn_11;
    function fn_13() {
        function fn_15() {
            if (!Memory["readUtf8String"](arg0) === "game.brawlstarsgame.com") goto`l_61`
            label`l_24`
            Memory["readUtf8String"](arg0) === "game.brawlstarsgame.com"
            arg0 = Memory["allocUtf8String"](_0x2cb4d9);
            console["log"]("game.brawlstarsgame.com replate to retro.royalegame.win")
            return _0x5b493d(arg0, arg1, arg2, arg3);
        }
        Interceptor["replace"](Module["findExportByName"]("libc.so", "getaddrinfo"), new NativeCallback(fn_15, "int", ["pointer", "pointer", "pointer", "pointer"]));
    }
    _0x1548cd = fn_13;
    function fn_17() {
        _0x2dc574 = _0x1455ca["add"](9879600)["readPointer"]();
        _0xbffe62 = _0x2dc574["add"](44)["readPointer"]();
        _0x578d3e = _0x458dd8(20);
        _0x5a5381 = _0x458dd8(20);
        _0x47e758(_0x578d3e, _0x3fd494("Url"))
        _0x47e758(_0x5a5381, _0x3fd494("https://connect.nulls.gg/"))
        _0x316977(_0xbffe62, _0x578d3e, _0x5a5381);
    }
    _0x3a2b32 = fn_17;
    function fn_19() {
        function onEnter() {
            this = this;
            if (!this["returnAddress"]["sub"](_0x1455ca) == 4696876) goto`l_43`
            label`l_30`
            this["returnAddress"]["sub"](_0x1455ca) == 4696876
            _0x30dd28["detach"]()
            _0x3a2b32();
        }
        {}.onEnter = onEnter;
        _0x30dd28 = Interceptor["attach"](_0x1455ca["add"](246452), {});
    }
    _0x5358ca = fn_19;
    function fn_23() {
        function onEnter() {
            Interceptor["detachAll"]()
            _0x5e5803();
        }
        {}.onEnter = onEnter;
        Interceptor["attach"](_0x1455ca["add"](2624988), {});
    }
    _0x1c9d52 = fn_23;
    function fn_27() {
        _0x59c477(7)
        _0x1455ca["add"](9919268)["writeU8"](1)
        function onEnter() {
            if (!_0x48b3fa(arg0[1]["add"](2)["readU16"]()) === 9339) goto`l_64`
            label`l_33`
            arg0[1]["add"](2)["writeU16"](_0x48b3fa(_0x4acf90))
            goto`l_72`
            label`l_65`
            if !_0x48b3fa(arg0[1]["add"](2)["readU16"]()) === _0x4acf90) goto`l_72`
            label`l_72`
            _0x48b3fa(arg0[1]["add"](2)["readU16"]());
            return;
            label`l_73`
            _0x48b3fa(arg0[1]["add"](2)["readU16"]())
            function onEnter() {
                this = this;
                "key"."key" = arg0[0];
                this;
            }
            {}.onEnter = onEnter;
            function onLeave() {
                this = this;
                _0x30d3a3["detach"]()
                this["key"]["writeByteArray"]([139, 94, 37, 171, 218, 27, 155, 208, 10, 22, 89, 202, 230, 84, 241, 96, 208, 235, 207, 12, 163, 119, 132, 75, 193, 228, 27, 103, 127, 34, 183, 125]);
            }
            {}.onLeave = onLeave;
            _0x30d3a3 = Interceptor["attach"](_0x1455ca["add"](1409880), {});
            _0x510483["detach"]()
            function onEnter() {
                this = this;
                if (!this["returnAddress"]["sub"](_0x1455ca) == 366228) goto`l_134`
                label`l_29`
                _0x498fca["detach"]()
                _0x1c9d52()
                _0x22fa4b = new NativeFunction(Module["findExportByName"]("libc.so", "pthread_join"), "int", ["pointer", "pointer"]);
                function fn_37() {
                    this = this;
                    _0xbb8e82 = this["context"]["r5"]["readPointer"]()["add"](16)["readPointer"]();
                    _0x22fa4b(_0xbb8e82, NULL);
                }
                Interceptor["attach"](_0x1455ca["add"](1966304), fn_37)
            }
            {}.onEnter = onEnter;
            _0x498fca = Interceptor["attach"](_0x1455ca["add"](246536), {});
        }
        {}.onEnter = onEnter;
        _0x510483 = Interceptor["attach"](Module["findExportByName"]("libc.so", "connect"), {});
    }
    _0x5e5803 = fn_27;
    _0x1455ca = Module["findBaseAddress"]("libg.so");
    _0x458dd8 = new NativeFunction(Module["findExportByName"]("libc.so", "malloc"), "pointer", ["int"]);
    _0x4d9940 = new NativeFunction(Module["findExportByName"]("libc.so", "pthread_mutex_unlock"), "int", ["pointer"]);
    _0x48b3fa = new NativeFunction(Module["findExportByName"]("libc.so", "ntohs"), "uint16", ["uint16"]);
    _0x5b493d = new NativeFunction(Module["findExportByName"]("libc.so", "getaddrinfo"), "int", ["pointer", "pointer", "pointer", "pointer"]);
    _0x47e758 = new NativeFunction(_0x1455ca["add"](5157760), "pointer", ["pointer", "pointer"]);
    _0x316977 = new NativeFunction(_0x1455ca["add"](5021392), "void", ["pointer", "pointer", "pointer"]);
    _0x2339f9 = new NativeFunction(_0x1455ca["add"](2635392), "pointer", ["pointer", "pointer", "int", "int"]);
    _0x2cb4d9 = "magic.royalegame.win";
    _0x4acf90 = 9334;
    function init() {
        _0x5358ca()
        _0x5e5803()
        _0x1548cd();
    }
    {}.init = init;
    "exports"."exports" = {};
    rpc;
}
{}.1 = [fn_7, {}];
fn_1()({}, {}, [1]);

// Process exited successfully.
