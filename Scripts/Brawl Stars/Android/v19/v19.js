// by rico
var _0x367401 = {
    'modules': {},
    'options': {}
},
_0x275232 = 0xbdbc04,
_0x2c887f = 0x700e80,
_0xe6104 = [0x51b5f6, 0x4bae67],
_0x435ba7 = 0x6ab741,
_0x4f64d3 = 0x15c61e,
_0x29fab5 = 0x40d7a7,
_0x308f9c = 0x4,
_0x174447 = new NativeFunction(Module['findExportByName']('libc.so', 'free'), 'void', ['pointer']),
_0x1c1497 = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_mutex_lock'), 'int', ['pointer']),
_0x595f35 = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']),
_0x283adc = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_cond_signal'), 'int', ['pointer']),
_0x443066 = new NativeFunction(Module['findExportByName']('libc.so', 'select'), 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']),
_0x518cfa = new NativeFunction(Module['findExportByName']('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']),
_0x42ecc8 = new NativeFunction(Module['findExportByName']('libc.so', 'ntohs'), 'uint16', ['uint16']),
_0x40c347 = new NativeFunction(Module['findExportByName']('libc.so', 'inet_addr'), 'int', ['pointer']),
_0xc2742 = new NativeFunction(Module['findExportByName']('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']),
_0x326963 = new NativeFunction(Module['findExportByName']('libc.so', 'recv'), 'int', ['int', 'pointer', 'int', 'int']);

function _0x5bb851(_0x3585cc, _0x11f3f7) {
Java['perform'](function() {
    var _0xb841a = Java['use']('java.lang.System'),
        _0x21042d = Java['use']('java.lang.Runtime'),
        _0x3cfa65 = _0xb841a['loadLibrary']['overload']('java.lang.String'),
        _0x27eef7 = Java['use']('dalvik.system.VMStack');
    _0x3cfa65['implementation'] = function(_0xb841a) {
        try {
            _0x21042d['getRuntime']()['loadLibrary0'] ? _0x21042d['getRuntime']()['loadLibrary0'](_0x27eef7['getCallingClassLoader'](), _0xb841a) : _0x21042d['getRuntime']()['loadLibrary'](_0xb841a, _0x27eef7['getCallingClassLoader']()), _0x3585cc === 'lib' + _0xb841a + '.so' && _0x11f3f7();
        } catch (_0x472557) {}
    };
});
}
var _0x113b4a = {
    'e': function(_0x3bedb5) {
        return _0x3bedb5['add'](0x8);
    },
    'n': function(_0x7292c3) {
        return Memory['readInt'](_0x7292c3['add'](0x4));
    },
    't': function(_0x45911d, _0x250003) {
        Memory['writeInt'](_0x45911d['add'](0x4), _0x250003);
    },
    'o': function(_0x539046) {
        return new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x539046)['add'](0x14)), 'int', ['pointer'])(_0x539046);
    },
    'c': function(_0x1f156d) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x1f156d)['add'](0x8)), 'void', ['pointer'])(_0x1f156d);
    },
    'r': function(_0x464c9d) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x464c9d)['add'](0xc)), 'void', ['pointer'])(_0x464c9d);
    },
    'i': function(_0x5b4cdb) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x5b4cdb)['add'](0x18)), 'void', ['pointer'])(_0x5b4cdb), new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x5b4cdb)['add'](0x4)), 'void', ['pointer'])(_0x5b4cdb);
    }
},
_0x414cac = {
    'a': function(_0x4ccf6a) {
        return Memory['readInt'](_0x4ccf6a['add'](0x10));
    },
    'u': function(_0x142e40) {
        return Memory['readPointer'](_0x142e40['add'](0x1c));
    },
    's': function(_0x2a3ae7, _0x2c7735) {
        Memory['writePointer'](_0x2a3ae7['add'](0x1c), _0x2c7735);
    },
    'M': function(_0x2f2710) {
        return Memory['readInt'](_0x2f2710['add'](0x14));
    },
    '_': function(_0x52795e, _0x284546) {
        Memory['writeInt'](_0x52795e['add'](0x14), _0x284546);
    }
},
_0x4b044e = {
    'm': function(_0x18d052) {
        return Memory['readU8'](_0x18d052['add'](0x2)) << 0x10 | Memory['readU8'](_0x18d052['add'](0x3)) << 0x8 | Memory['readU8'](_0x18d052['add'](0x4));
    },
    'h': function(_0x46464d, _0x3e1cb3) {
        Memory['writeU8'](_0x46464d['add'](0x2), _0x3e1cb3 >> 0x10 & 0xff), Memory['writeU8'](_0x46464d['add'](0x3), _0x3e1cb3 >> 0x8 & 0xff), Memory['writeU8'](_0x46464d['add'](0x4), 0xff & _0x3e1cb3);
    },
    'f': function(_0x6a4c2d, _0x908580) {
        Memory['writeU8'](_0x6a4c2d['add'](0x0), _0x908580 >> 0x8 & 0xff), Memory['writeU8'](_0x6a4c2d['add'](0x1), 0xff & _0x908580);
    },
    'y': function(_0x338665) {
        return Memory['readU8'](_0x338665['add'](0x5)) << 0x8 | Memory['readU8'](_0x338665['add'](0x6));
    },
    'g': function(_0x55f560, _0x540759) {
        Memory['writeU8'](_0x55f560['add'](0x5), _0x540759 >> 0x8 & 0xff), Memory['writeU8'](_0x55f560['add'](0x6), 0xff & _0x540759);
    },
    'o': function(_0x22d84e) {
        return Memory['readU8'](_0x22d84e) << 0x8 | Memory['readU8'](_0x22d84e['add'](0x1));
    }
},
_0x3bd2f9 = {
    'l': function(_0x452607) {
        return Memory['readInt'](_0x452607['add'](0x4));
    },
    'd': function(_0x4bbcd7, _0x44ee79) {
        return Memory['readPointer'](Memory['readPointer'](_0x4bbcd7)['add'](_0x308f9c * _0x44ee79));
    },
    'v': function(_0x210d96, _0x405c7c, _0x3a73fe) {
        Memory['writePointer'](Memory['readPointer'](_0x210d96)['add'](_0x308f9c * _0x405c7c), _0x3a73fe);
    },
    'p': function(_0x2eddf0) {
        return Memory['readInt'](_0x2eddf0['add'](0x8));
    },
    'N': function(_0x142e6e) {
        Memory['writeInt'](_0x142e6e['add'](0x8), Memory['readInt'](_0x142e6e['add'](0x8)) - 0x1);
    },
    'R': function(_0xf12936) {
        Memory['writeInt'](_0xf12936['add'](0x8), Memory['readInt'](_0xf12936['add'](0x8)) + 0x1);
    },
    'T': function(_0x37ef3d) {
        return Memory['readInt'](_0x37ef3d['add'](0xc));
    },
    'b': function(_0x30f18d) {
        return Memory['readInt'](_0x30f18d['add'](0x10));
    },
    'A': function(_0x2d6fe6, _0x24998e) {
        Memory['writeInt'](_0x2d6fe6['add'](0xc), _0x24998e);
    },
    'S': function(_0x1a1112, _0x37bbe1) {
        Memory['writeInt'](_0x1a1112['add'](0x10), _0x37bbe1);
    },
    'w': function(_0x1e9f36, _0x5acc66) {
        _0x1c1497(_0x1e9f36['sub'](0x4));
        var _0x39efb7 = _0x3bd2f9['b'](_0x1e9f36);
        _0x3bd2f9['v'](_0x1e9f36, _0x39efb7, _0x5acc66), _0x3bd2f9['S'](_0x1e9f36, (_0x39efb7 + 0x1) % _0x3bd2f9['l'](_0x1e9f36)), _0x3bd2f9['R'](_0x1e9f36), _0x595f35(_0x1e9f36['sub'](0x4));
    },
    'B': function(_0x425550) {
        var _0x18b770 = null;
        if (_0x1c1497(_0x425550['sub'](0x4)), _0x3bd2f9['p'](_0x425550)) {
            var _0xcf66ba = _0x3bd2f9['T'](_0x425550);
            _0x18b770 = _0x3bd2f9['d'](_0x425550, _0xcf66ba), _0x3bd2f9['A'](_0x425550, (_0xcf66ba + 0x1) % _0x3bd2f9['l'](_0x425550)), _0x3bd2f9['N'](_0x425550);
        }
        return _0x595f35(_0x425550['sub'](0x4)), _0x18b770;
    }
};

function _0xeb53de() {
Interceptor['attach'](Module['findExportByName']('libc.so', 'connect'), {
    'onEnter': function(_0x3e2cff) {
        if (0x247b === _0x42ecc8(Memory['readU16'](_0x3e2cff[0x1]['add'](0x2)))) {
            if (_0x367401['fd'] = _0x3e2cff[0x0]['toInt32'](), _0x367401['options']['redirectHost']) {
                var _0xffd94a = Memory['allocUtf8String'](_0x367401['options']['redirectHost']);
                Memory['writeInt'](_0x3e2cff[0x1]['add'](0x4), _0x40c347(_0xffd94a));
            }
            _0x4ed19a();
        }
    }
});
}

function _0x4ed19a() {
_0x367401['wakeUpReturnArray'] = [];
for (var _0x50fb44 = 0x0; _0x50fb44 < _0xe6104['length']; _0x50fb44 += 0x1) _0x367401['wakeUpReturnArray']['push'](_0x367401['base']['add'](_0xe6104[_0x50fb44]));

function _0x565579() {
    for (var _0x50fb44 = _0x3bd2f9['B'](_0x367401['sendQueue']); _0x50fb44;) {
        0x2774 === _0x113b4a['o'](_0x50fb44) && (_0x50fb44 = Memory['readPointer'](_0x367401['loginMessagePtr']), Memory['writePointer'](_0x367401['loginMessagePtr'], ptr(0x0))), _0x113b4a['c'](_0x50fb44);
        var _0x3faca4 = _0x113b4a['e'](_0x50fb44),
            _0xdb87e5 = _0x414cac['a'](_0x3faca4),
            _0x565579 = _0x367401['newOperator'](_0xdb87e5 + 0x7);
        _0x518cfa(_0x565579['add'](0x7), _0x414cac['u'](_0x3faca4), _0xdb87e5), _0x4b044e['h'](_0x565579, _0xdb87e5), _0x4b044e['f'](_0x565579, _0x113b4a['o'](_0x50fb44)), _0x4b044e['g'](_0x565579, _0x113b4a['n'](_0x50fb44)), _0xc2742(_0x367401['fd'], _0x565579, _0xdb87e5 + 0x7, 0x0), _0x174447(_0x565579), _0x113b4a['i'](_0x50fb44), _0x50fb44 = _0x3bd2f9['B'](_0x367401['sendQueue']);
    }
}
_0x367401['pthreadReturn'] = _0x367401['base']['add'](_0x435ba7), _0x367401['serverConnection'] = Memory['readPointer'](_0x367401['base']['add'](_0x275232)), _0x367401['selectReturn'] = _0x367401['base']['add'](_0x29fab5), _0x367401['messaging'] = Memory['readPointer'](_0x367401['serverConnection']['add'](0x4)), _0x367401['messageFactory'] = Memory['readPointer'](_0x367401['messaging']['add'](0x34)), _0x367401['recvQueue'] = _0x367401['messaging']['add'](0x3c), _0x367401['sendQueue'] = _0x367401['messaging']['add'](0x54), _0x367401['state'] = _0x367401['messaging']['add'](0xd4), _0x367401['loginMessagePtr'] = _0x367401['messaging']['add'](0xd8), _0x367401['newOperator'] = new NativeFunction(_0x367401['base']['add'](_0x2c887f), 'pointer', ['int']), _0x367401['createMessageByType'] = new NativeFunction(_0x367401['base']['add'](_0x4f64d3), 'pointer', ['pointer', 'int']), Interceptor['replace'](Module['findExportByName']('libc.so', 'pthread_cond_signal'), new NativeCallback(function(_0x50fb44) {
    if (!this['returnAddress']['equals'](_0x367401['pthreadReturn'])) return _0x283adc(_0x50fb44);
    for (var _0x1b0e48 = Memory['readPointer'](this['context']['sp']['add'](0x20)), _0x23df84 = 0x0; _0x23df84 < _0x367401['wakeUpReturnArray']['length']; _0x23df84 += 0x1)
        if (_0x1b0e48['equals'](_0x367401['wakeUpReturnArray'][_0x23df84])) return _0x565579(), 0x0;
    return _0x283adc(_0x50fb44);
}, 'int', ['pointer'])), Interceptor['replace'](Module['findExportByName']('libc.so', 'select'), new NativeCallback(function(_0x50fb44, _0x579d46, _0x4ca358, _0x565579, _0x57f242) {
    var _0x597d5f = _0x443066(_0x50fb44, _0x579d46, _0x4ca358, _0x565579, _0x57f242);
    return this['returnAddress']['equals'](_0x367401['selectReturn']) && function() {
        var _0x50fb44 = _0x367401['newOperator'](0x7);
        _0x326963(_0x367401['fd'], _0x50fb44, 0x7, 0x100);
        var _0x579d46 = _0x4b044e['o'](_0x50fb44);
        0x4e88 === _0x579d46 && Memory['writeInt'](_0x367401['state'], 0x5);
        var _0x4ca358 = _0x4b044e['m'](_0x50fb44),
            _0x565579 = _0x4b044e['y'](_0x50fb44);
        _0x174447(_0x50fb44);
        var _0x57f242 = _0x367401['newOperator'](_0x4ca358);
        _0x326963(_0x367401['fd'], _0x57f242, _0x4ca358, 0x100);
        var _0x597d5f = _0x367401['createMessageByType'](_0x367401['messageFactory'], _0x579d46);
        _0x113b4a['t'](_0x597d5f, _0x565579);
        var _0x263436 = _0x113b4a['e'](_0x597d5f);
        if (_0x414cac['_'](_0x263436, _0x4ca358), _0x4ca358) {
            var _0x28d462 = _0x367401['newOperator'](_0x4ca358);
            _0x518cfa(_0x28d462, _0x57f242, _0x4ca358), _0x414cac['s'](_0x263436, _0x28d462);
        }
        _0x113b4a['r'](_0x597d5f), _0x3bd2f9['w'](_0x367401['recvQueue'], _0x597d5f), _0x174447(_0x57f242);
    }(), _0x597d5f;
}, 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']));
}
rpc['exports'] = {
'init': function(_0xf1ab06, _0x5067e1) {
    _0x367401['options'] = _0x5067e1 || {}, _0x5bb851('libg.so', function() {
        Interceptor['detachAll'](), _0x367401['base'] = Process['findModuleByName']('libg.so')['base'], _0xeb53de();
    });
}
};