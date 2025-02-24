var _0x9ce2f7 = {
    'modules': {},
    'options': {}
},
_0x115cb5 = 0xb955ac,
_0x336145 = 0x77d0bd,
_0x2f2b6c = 0x75cf0f,
_0x18bcb3 = [0x60254, 0x69c58, 0xb240c, 0xcc18c, 0x2f849c, 0x61f30c],
_0x50f431 = 0x49afe8,
_0x481ab8 = 0x150434,
_0x34a1c7 = 0x54a2c0,
_0x10b6ec = 0x17f7cc,
_0x23d914 = 0xb95a2c,
_0x12ec57 = new NativeFunction(Module['findExportByName']('libc.so', 'free'), 'void', ['pointer']),
_0x3d03c4 = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_mutex_lock'), 'int', ['pointer']),
_0x3052db = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']),
_0x170080 = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_cond_signal'), 'int', ['pointer']),
_0x5f58f6 = new NativeFunction(Module['findExportByName']('libc.so', 'select'), 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']),
_0x6d6d2 = new NativeFunction(Module['findExportByName']('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']),
_0x58d005 = new NativeFunction(Module['findExportByName']('libc.so', 'ntohs'), 'uint16', ['uint16']),
_0x312e40 = new NativeFunction(Module['findExportByName']('libc.so', 'inet_addr'), 'int', ['pointer']),
_0x37d50b = new NativeFunction(Module['findExportByName']('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']),
_0x1254a9 = new NativeFunction(Module['findExportByName']('libc.so', 'recv'), 'int', ['int', 'pointer', 'int', 'int']),
_0xa98359 = null,
_0x226e46 = 0x0;

function _0xa6b3f2(_0x3c565e, _0x14d299) {
Java['perform'](function() {
    var _0x344f9f = Java['use']('java.lang.System'),
        _0x4a7752 = Java['use']('java.lang.Runtime'),
        _0x13e163 = _0x344f9f['loadLibrary']['overload']('java.lang.String'),
        _0x166a8b = Java['use']('dalvik.system.VMStack');
    _0x13e163['implementation'] = function(_0x4bf46c) {
        try {
            _0x4a7752['getRuntime']()['loadLibrary0'] ? _0x4a7752['getRuntime']()['loadLibrary0'](_0x166a8b['getCallingClassLoader'](), _0x4bf46c) : _0x4a7752['getRuntime']()['loadLibrary'](_0x4bf46c, _0x166a8b['getCallingClassLoader']()), _0x3c565e === 'lib' + _0x4bf46c + '.so' && _0x14d299();
        } catch (_0x5533c0) {}
    };
});
}
var _0x414c1a = {
    'e': function(_0x3862de) {
        return _0x3862de['add'](0x8);
    },
    'n': function(_0x152e5a) {
        return Memory['readInt'](_0x152e5a['add'](0x4));
    },
    't': function(_0x3bfe33, _0x554ce8) {
        Memory['writeInt'](_0x3bfe33['add'](0x4), _0x554ce8);
    },
    'o': function(_0xf1ee5c) {
        return new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0xf1ee5c)['add'](0x14)), 'int', ['pointer'])(_0xf1ee5c);
    },
    'a': function(_0x1144b7) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x1144b7)['add'](0x8)), 'void', ['pointer'])(_0x1144b7);
    },
    'c': function(_0x3300c7) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x3300c7)['add'](0xc)), 'void', ['pointer'])(_0x3300c7);
    },
    'r': function(_0xcc27e2) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0xcc27e2)['add'](0x18)), 'void', ['pointer'])(_0xcc27e2), new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0xcc27e2)['add'](0x4)), 'void', ['pointer'])(_0xcc27e2);
    }
},
_0x1fe844 = {
    'i': function(_0x28616d) {
        return Memory['readInt'](_0x28616d['add'](0x10));
    },
    'u': function(_0x57cb15) {
        return Memory['readPointer'](_0x57cb15['add'](0x1c));
    },
    's': function(_0x8909a6, _0x4bdf27) {
        Memory['writePointer'](_0x8909a6['add'](0x1c), _0x4bdf27);
    },
    'm': function(_0x4b7417) {
        return Memory['readInt'](_0x4b7417['add'](0x14));
    },
    'M': function(_0x27552f, _0x281884) {
        Memory['writeInt'](_0x27552f['add'](0x14), _0x281884);
    }
},
_0x35dcee = {
    'l': function(_0x329019) {
        return Memory['readU8'](_0x329019['add'](0x2)) << 0x10 | Memory['readU8'](_0x329019['add'](0x3)) << 0x8 | Memory['readU8'](_0x329019['add'](0x4));
    },
    '_': function(_0x141352, _0x2e961c) {
        Memory['writeU8'](_0x141352['add'](0x2), _0x2e961c >> 0x10 & 0xff), Memory['writeU8'](_0x141352['add'](0x3), _0x2e961c >> 0x8 & 0xff), Memory['writeU8'](_0x141352['add'](0x4), 0xff & _0x2e961c);
    },
    'd': function(_0x39add5, _0x3d6a43) {
        Memory['writeU8'](_0x39add5['add'](0x0), _0x3d6a43 >> 0x8 & 0xff), Memory['writeU8'](_0x39add5['add'](0x1), 0xff & _0x3d6a43);
    },
    'v': function(_0x4fe7f9) {
        return Memory['readU8'](_0x4fe7f9['add'](0x5)) << 0x8 | Memory['readU8'](_0x4fe7f9['add'](0x6));
    },
    'f': function(_0x4ddbf6, _0x5e49bb) {
        Memory['writeU8'](_0x4ddbf6['add'](0x5), _0x5e49bb >> 0x8 & 0xff), Memory['writeU8'](_0x4ddbf6['add'](0x6), 0xff & _0x5e49bb);
    },
    'o': function(_0x1d395e) {
        return Memory['readU8'](_0x1d395e) << 0x8 | Memory['readU8'](_0x1d395e['add'](0x1));
    }
},
_0x2fd5b9 = {
    'h': function(_0x4b52d7) {
        return Memory['readInt'](_0x4b52d7['add'](0x4));
    },
    'g': function(_0x5744eb, _0x504230) {
        return Memory['readPointer'](Memory['readPointer'](_0x5744eb)['add'](Process['pointerSize'] * _0x504230));
    },
    'p': function(_0x3a1766, _0x18534c, _0x21614c) {
        Memory['writePointer'](Memory['readPointer'](_0x3a1766)['add'](Process['pointerSize'] * _0x18534c), _0x21614c);
    },
    'y': function(_0x4fb0d9) {
        return Memory['readInt'](_0x4fb0d9['add'](0x8));
    },
    'R': function(_0x49dce1) {
        Memory['writeInt'](_0x49dce1['add'](0x8), Memory['readInt'](_0x49dce1['add'](0x8)) - 0x1);
    },
    'A': function(_0x19d888) {
        Memory['writeInt'](_0x19d888['add'](0x8), Memory['readInt'](_0x19d888['add'](0x8)) + 0x1);
    },
    'N': function(_0x386a4f) {
        return Memory['readInt'](_0x386a4f['add'](0xc));
    },
    'T': function(_0x265364) {
        return Memory['readInt'](_0x265364['add'](0x10));
    },
    'b': function(_0x519e57, _0x508416) {
        Memory['writeInt'](_0x519e57['add'](0xc), _0x508416);
    },
    'S': function(_0x7c6067, _0x1ebe93) {
        Memory['writeInt'](_0x7c6067['add'](0x10), _0x1ebe93);
    },
    'w': function(_0x253b71, _0x10d82b) {
        _0x3d03c4(_0x253b71['sub'](0x4));
        var _0x430acc = _0x2fd5b9['T'](_0x253b71);
        _0x2fd5b9['p'](_0x253b71, _0x430acc, _0x10d82b), _0x2fd5b9['S'](_0x253b71, (_0x430acc + 0x1) % _0x2fd5b9['h'](_0x253b71)), _0x2fd5b9['A'](_0x253b71), _0x3052db(_0x253b71['sub'](0x4));
    },
    'C': function(_0x1c2e94) {
        var _0x5ac501 = null;
        if (_0x3d03c4(_0x1c2e94['sub'](0x4)), _0x2fd5b9['y'](_0x1c2e94)) {
            var _0x5d8a72 = _0x2fd5b9['N'](_0x1c2e94);
            _0x5ac501 = _0x2fd5b9['g'](_0x1c2e94, _0x5d8a72), _0x2fd5b9['b'](_0x1c2e94, (_0x5d8a72 + 0x1) % _0x2fd5b9['h'](_0x1c2e94)), _0x2fd5b9['R'](_0x1c2e94);
        }
        return _0x3052db(_0x1c2e94['sub'](0x4)), _0x5ac501;
    }
};

function _0x5584c6() {
_0x2ab2aa(), _0x9ce2f7['options']['relocate'] && _0x574fc1(), Interceptor['attach'](Module['findExportByName']('libc.so', 'connect'), {
    'onEnter': function(_0x2ff264) {
        if (0x247b === _0x58d005(Memory['readU16'](_0x2ff264[0x1]['add'](0x2)))) {
            if (_0x9ce2f7['fd'] = _0x2ff264[0x0]['toInt32'](), _0x9ce2f7['options']['redirectHost']) {
                var _0x3aa8a3 = Memory['allocUtf8String'](_0x9ce2f7['options']['redirectHost']);
                Memory['writeInt'](_0x2ff264[0x1]['add'](0x4), _0x312e40(_0x3aa8a3));
            }
            _0x1210c2();
        }
    }
});
}

function _0x2ab2aa() {
Java['perform'](function() {
    var _0x2a9e1c = Java['use']('com.google.android.gms.ads.MobileAds'),
        _0x1f9ae7 = Java['use']('com.google.android.gms.ads.InterstitialAd'),
        _0x3a2eba = Java['use']('com.google.android.gms.ads.AdRequest$Builder'),
        _0x3ed0b3 = Java['use']('com.google.android.gms.ads.AdListener'),
        _0x48556d = Java['use']('java.lang.String'),
        _0x352052 = Java['use']('com.supercell.brawlstars.GameApp')['getInstance']();
    _0x2a9e1c['initialize'](_0x352052, _0x48556d['$new']('ca-app-pub-3940256099942544~3347511713')), (_0xa98359 = Java['retain'](_0x1f9ae7['$new'](_0x352052)))['setAdUnitId'](_0x48556d['$new']('ca-app-pub-3940256099942544/1033173712')), _0x3ed0b3['onAdClosed']['implementation'] = function() {
        _0xa98359['loadAd'](_0x3a2eba['$new']()['build']());
    }, _0xa98359['setAdListener'](_0x3ed0b3['$new']()), _0xa98359['loadAd'](_0x3a2eba['$new']()['build']());
});
}

function _0x574fc1() {
var _0x52dc50 = new NativeFunction(_0x9ce2f7['base']['add'](_0x10b6ec), 'pointer', ['pointer', 'pointer']),
    _0xf4dfad = Interceptor['attach'](_0x9ce2f7['base']['add'](_0x34a1c7), {
        'onLeave': function() {
            _0xf4dfad['detach'](), Java['perform'](function() {
                var _0x5139c8 = Java['use']('com.supercell.brawlstars.GameApp')['getInstance']()['getApplicationContext'](),
                    _0x3a80d5 = _0x9ce2f7['base']['add'](_0x23d914),
                    _0x290cbc = _0x5139c8['getExternalFilesDir'](null)['getAbsolutePath']() + '/';
                _0x52dc50(_0x3a80d5, Memory['allocUtf8String'](_0x290cbc));
            });
        }
    });
}

function _0x1210c2() {
_0x9ce2f7['wakeUpReturnArray'] = [];
for (var _0x1a8c42 = 0x0; _0x1a8c42 < _0x18bcb3['length']; _0x1a8c42 += 0x1) _0x9ce2f7['wakeUpReturnArray']['push'](_0x9ce2f7['base']['add'](_0x18bcb3[_0x1a8c42]));

function _0xb9cb41() {
    for (var _0x2fa6aa = _0x2fd5b9['C'](_0x9ce2f7['sendQueue']); _0x2fa6aa;) {
        var _0x51045f = _0x414c1a['o'](_0x2fa6aa);
        0x2774 === _0x51045f && (_0x2fa6aa = Memory['readPointer'](_0x9ce2f7['loginMessagePtr']), Memory['writePointer'](_0x9ce2f7['loginMessagePtr'], ptr(0x0))), 0x380e === _0x51045f && Java['perform'](function() {
            var _0x2a5bb1 = Java['use']('com.supercell.brawlstars.GameApp'),
                _0x4431e8 = Java['use']('java.lang.Runnable'),
                _0x2514f6 = _0x2a5bb1['getInstance'](),
                _0x36d7a3 = Java['registerClass']({
                    'name': 'shadow.Runnable',
                    'implements': [_0x4431e8],
                    'methods': {
                        'run': function() {
                            var _0x4d5caa = Date['now']();
                            0x493e0 < _0x4d5caa - _0x226e46 && _0xa98359['isLoaded']() && (_0xa98359['show'](), _0x226e46 = _0x4d5caa);
                        }
                    }
                });
            _0xa98359 && _0x2514f6 && _0x2514f6['runOnUiThread'](_0x36d7a3['$new']());
        }), _0x414c1a['a'](_0x2fa6aa);
        var _0x39572f = _0x414c1a['e'](_0x2fa6aa),
            _0x34f9f1 = _0x1fe844['i'](_0x39572f),
            _0x30943e = _0x9ce2f7['newOperator'](_0x34f9f1 + 0x7);
        _0x6d6d2(_0x30943e['add'](0x7), _0x1fe844['u'](_0x39572f), _0x34f9f1), _0x35dcee['_'](_0x30943e, _0x34f9f1), _0x35dcee['d'](_0x30943e, _0x414c1a['o'](_0x2fa6aa)), _0x35dcee['f'](_0x30943e, _0x414c1a['n'](_0x2fa6aa)), _0x37d50b(_0x9ce2f7['fd'], _0x30943e, _0x34f9f1 + 0x7, 0x0), _0x12ec57(_0x30943e), _0x414c1a['r'](_0x2fa6aa), _0x2fa6aa = _0x2fd5b9['C'](_0x9ce2f7['sendQueue']);
    }
}
_0x9ce2f7['pthreadReturn'] = _0x9ce2f7['base']['add'](_0x2f2b6c), _0x9ce2f7['serverConnection'] = Memory['readPointer'](_0x9ce2f7['base']['add'](_0x115cb5)), _0x9ce2f7['selectReturn'] = _0x9ce2f7['base']['add'](_0x481ab8), _0x9ce2f7['messaging'] = Memory['readPointer'](_0x9ce2f7['serverConnection']['add'](0x4)), _0x9ce2f7['messageFactory'] = Memory['readPointer'](_0x9ce2f7['messaging']['add'](0x34)), _0x9ce2f7['recvQueue'] = _0x9ce2f7['messaging']['add'](0x3c), _0x9ce2f7['sendQueue'] = _0x9ce2f7['messaging']['add'](0x54), _0x9ce2f7['state'] = _0x9ce2f7['messaging']['add'](0xd0), _0x9ce2f7['loginMessagePtr'] = _0x9ce2f7['messaging']['add'](0xd4), _0x9ce2f7['newOperator'] = new NativeFunction(_0x9ce2f7['base']['add'](_0x336145), 'pointer', ['int']), _0x9ce2f7['createMessageByType'] = new NativeFunction(_0x9ce2f7['base']['add'](_0x50f431), 'pointer', ['pointer', 'int']), Interceptor['replace'](Module['findExportByName']('libc.so', 'pthread_cond_signal'), new NativeCallback(function(_0x4e965a) {
    if (!this['returnAddress']['equals'](_0x9ce2f7['pthreadReturn'])) return _0x170080(_0x4e965a);
    for (var _0x1e2ae9 = Memory['readPointer'](this['context']['sp']['add'](0x4)), _0x36138a = 0x0; _0x36138a < _0x9ce2f7['wakeUpReturnArray']['length']; _0x36138a += 0x1)
        if (_0x1e2ae9['equals'](_0x9ce2f7['wakeUpReturnArray'][_0x36138a])) return _0xb9cb41(), 0x0;
    return _0x170080(_0x4e965a);
}, 'int', ['pointer'])), Interceptor['replace'](Module['findExportByName']('libc.so', 'select'), new NativeCallback(function(_0x3a55fd, _0x2dbb7d, _0x25045e, _0x4c7ec5, _0x1a8822) {
    var _0x52b8c6 = _0x5f58f6(_0x3a55fd, _0x2dbb7d, _0x25045e, _0x4c7ec5, _0x1a8822);
    return this['returnAddress']['equals'](_0x9ce2f7['selectReturn']) && function() {
        var _0x52b1de = _0x9ce2f7['newOperator'](0x7);
        _0x1254a9(_0x9ce2f7['fd'], _0x52b1de, 0x7, 0x100);
        var _0x18028a = _0x35dcee['o'](_0x52b1de);
        0x4e88 === _0x18028a && Memory['writeInt'](_0x9ce2f7['state'], 0x5);
        var _0x280f21 = _0x35dcee['l'](_0x52b1de),
            _0x4b2e37 = _0x35dcee['v'](_0x52b1de);
        _0x12ec57(_0x52b1de);
        var _0x122bdd = _0x9ce2f7['newOperator'](_0x280f21);
        _0x1254a9(_0x9ce2f7['fd'], _0x122bdd, _0x280f21, 0x100);
        var _0x473bdb = _0x9ce2f7['createMessageByType'](_0x9ce2f7['messageFactory'], _0x18028a);
        _0x414c1a['t'](_0x473bdb, _0x4b2e37);
        var _0x5f34af = _0x414c1a['e'](_0x473bdb);
        if (_0x1fe844['M'](_0x5f34af, _0x280f21), _0x280f21) {
            var _0x22fe88 = _0x9ce2f7['newOperator'](_0x280f21);
            _0x6d6d2(_0x22fe88, _0x122bdd, _0x280f21), _0x1fe844['s'](_0x5f34af, _0x22fe88);
        }
        _0x414c1a['c'](_0x473bdb), _0x2fd5b9['w'](_0x9ce2f7['recvQueue'], _0x473bdb), _0x12ec57(_0x122bdd);
    }(), _0x52b8c6;
}, 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']));
}
rpc['exports'] = {
'init': function(_0x29965d, _0x5ec23f) {
    _0x9ce2f7['options'] = _0x5ec23f || {}, _0xa6b3f2('libg.so', function() {
        Interceptor['detachAll'](), _0x9ce2f7['base'] = Process['findModuleByName']('libg.so')['base'], _0x5584c6();
    });
}
};