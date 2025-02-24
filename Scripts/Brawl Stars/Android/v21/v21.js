var _0x4ff2d5 = {
    'modules': {},
    'options': {}
},
_0x3573f8 = 0xa6bc28,
_0x5ce6a3 = 0x67d425,
_0x5d5d06 = [0x151f08, 0x2c34c0, 0x2d2a34, 0x3b5904, 0x3c0a30, 0x43b1f8],
_0x5b04a0 = 0x64fde7,
_0x535303 = 0xcd574,
_0x54e885 = 0x3f55bc,
_0x3d68c9 = 0x4,
_0x52848a = new NativeFunction(Module['findExportByName']('libc.so', 'free'), 'void', ['pointer']),
_0x13a93d = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_mutex_lock'), 'int', ['pointer']),
_0x5bb278 = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']),
_0x1888d3 = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_cond_signal'), 'int', ['pointer']),
_0xdef1c8 = new NativeFunction(Module['findExportByName']('libc.so', 'select'), 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']),
_0x1ece22 = new NativeFunction(Module['findExportByName']('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']),
_0x2830e2 = new NativeFunction(Module['findExportByName']('libc.so', 'ntohs'), 'uint16', ['uint16']),
_0x3afac0 = new NativeFunction(Module['findExportByName']('libc.so', 'inet_addr'), 'int', ['pointer']),
_0x4ad523 = new NativeFunction(Module['findExportByName']('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']),
_0x3684ab = new NativeFunction(Module['findExportByName']('libc.so', 'recv'), 'int', ['int', 'pointer', 'int', 'int']);

function _0x280fe0(_0x1ec323, _0x481950) {
Java['perform'](function() {
    var _0x5e928a = Java['use']('java.lang.System'),
        _0xc4e25c = Java['use']('java.lang.Runtime'),
        _0x5252fe = _0x5e928a['loadLibrary']['overload']('java.lang.String'),
        _0x277087 = Java['use']('dalvik.system.VMStack');
    _0x5252fe['implementation'] = function(_0x5e928a) {
        try {
            _0xc4e25c['getRuntime']()['loadLibrary0'] ? _0xc4e25c['getRuntime']()['loadLibrary0'](_0x277087['getCallingClassLoader'](), _0x5e928a) : _0xc4e25c['getRuntime']()['loadLibrary'](_0x5e928a, _0x277087['getCallingClassLoader']()), _0x1ec323 === 'lib' + _0x5e928a + '.so' && _0x481950();
        } catch (_0x1887a2) {}
    };
});
}
var _0x9c3c15 = {
    'e': function(_0x48e748) {
        return _0x48e748['add'](0x8);
    },
    'n': function(_0x26fd5a) {
        return Memory['readInt'](_0x26fd5a['add'](0x4));
    },
    't': function(_0x212b93, _0x81af10) {
        Memory['writeInt'](_0x212b93['add'](0x4), _0x81af10);
    },
    'o': function(_0x5f0228) {
        return new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x5f0228)['add'](0x14)), 'int', ['pointer'])(_0x5f0228);
    },
    'c': function(_0x21f0cf) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x21f0cf)['add'](0x8)), 'void', ['pointer'])(_0x21f0cf);
    },
    'r': function(_0x339a75) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x339a75)['add'](0xc)), 'void', ['pointer'])(_0x339a75);
    },
    'i': function(_0x438775) {
        new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x438775)['add'](0x18)), 'void', ['pointer'])(_0x438775), new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x438775)['add'](0x4)), 'void', ['pointer'])(_0x438775);
    }
},
_0x425774 = {
    'a': function(_0x55f393) {
        return Memory['readInt'](_0x55f393['add'](0x10));
    },
    'u': function(_0x2a5d0d) {
        return Memory['readPointer'](_0x2a5d0d['add'](0x1c));
    },
    's': function(_0x389b54, _0x452fc6) {
        Memory['writePointer'](_0x389b54['add'](0x1c), _0x452fc6);
    },
    'M': function(_0x474d65) {
        return Memory['readInt'](_0x474d65['add'](0x14));
    },
    '_': function(_0x316bd5, _0x29d1f1) {
        Memory['writeInt'](_0x316bd5['add'](0x14), _0x29d1f1);
    }
},
_0x477035 = {
    'm': function(_0x60c374) {
        return Memory['readU8'](_0x60c374['add'](0x2)) << 0x10 | Memory['readU8'](_0x60c374['add'](0x3)) << 0x8 | Memory['readU8'](_0x60c374['add'](0x4));
    },
    'h': function(_0x2dcf58, _0x5ef26c) {
        Memory['writeU8'](_0x2dcf58['add'](0x2), _0x5ef26c >> 0x10 & 0xff), Memory['writeU8'](_0x2dcf58['add'](0x3), _0x5ef26c >> 0x8 & 0xff), Memory['writeU8'](_0x2dcf58['add'](0x4), 0xff & _0x5ef26c);
    },
    'f': function(_0x5e284c, _0x116fc2) {
        Memory['writeU8'](_0x5e284c['add'](0x0), _0x116fc2 >> 0x8 & 0xff), Memory['writeU8'](_0x5e284c['add'](0x1), 0xff & _0x116fc2);
    },
    'y': function(_0x24a015) {
        return Memory['readU8'](_0x24a015['add'](0x5)) << 0x8 | Memory['readU8'](_0x24a015['add'](0x6));
    },
    'g': function(_0x62b0cc, _0x372122) {
        Memory['writeU8'](_0x62b0cc['add'](0x5), _0x372122 >> 0x8 & 0xff), Memory['writeU8'](_0x62b0cc['add'](0x6), 0xff & _0x372122);
    },
    'o': function(_0x210da6) {
        return Memory['readU8'](_0x210da6) << 0x8 | Memory['readU8'](_0x210da6['add'](0x1));
    }
},
_0x46dadf = {
    'l': function(_0x52eedd) {
        return Memory['readInt'](_0x52eedd['add'](0x4));
    },
    'd': function(_0x4ff158, _0x567192) {
        return Memory['readPointer'](Memory['readPointer'](_0x4ff158)['add'](_0x3d68c9 * _0x567192));
    },
    'v': function(_0xd1bad8, _0x386f9f, _0x4e68a2) {
        Memory['writePointer'](Memory['readPointer'](_0xd1bad8)['add'](_0x3d68c9 * _0x386f9f), _0x4e68a2);
    },
    'p': function(_0x5e3027) {
        return Memory['readInt'](_0x5e3027['add'](0x8));
    },
    'N': function(_0x30c4b1) {
        Memory['writeInt'](_0x30c4b1['add'](0x8), Memory['readInt'](_0x30c4b1['add'](0x8)) - 0x1);
    },
    'R': function(_0x4e26ed) {
        Memory['writeInt'](_0x4e26ed['add'](0x8), Memory['readInt'](_0x4e26ed['add'](0x8)) + 0x1);
    },
    'T': function(_0x4bbc42) {
        return Memory['readInt'](_0x4bbc42['add'](0xc));
    },
    'b': function(_0xfba80f) {
        return Memory['readInt'](_0xfba80f['add'](0x10));
    },
    'A': function(_0x44c5fd, _0x5440cb) {
        Memory['writeInt'](_0x44c5fd['add'](0xc), _0x5440cb);
    },
    'S': function(_0x50bb02, _0x234c60) {
        Memory['writeInt'](_0x50bb02['add'](0x10), _0x234c60);
    },
    'w': function(_0x45556c, _0x37f65e) {
        _0x13a93d(_0x45556c['sub'](0x4));
        var _0x1c60fb = _0x46dadf['b'](_0x45556c);
        _0x46dadf['v'](_0x45556c, _0x1c60fb, _0x37f65e), _0x46dadf['S'](_0x45556c, (_0x1c60fb + 0x1) % _0x46dadf['l'](_0x45556c)), _0x46dadf['R'](_0x45556c), _0x5bb278(_0x45556c['sub'](0x4));
    },
    'B': function(_0x52d225) {
        var _0x500c43 = null;
        if (_0x13a93d(_0x52d225['sub'](0x4)), _0x46dadf['p'](_0x52d225)) {
            var _0x25248a = _0x46dadf['T'](_0x52d225);
            _0x500c43 = _0x46dadf['d'](_0x52d225, _0x25248a), _0x46dadf['A'](_0x52d225, (_0x25248a + 0x1) % _0x46dadf['l'](_0x52d225)), _0x46dadf['N'](_0x52d225);
        }
        return _0x5bb278(_0x52d225['sub'](0x4)), _0x500c43;
    }
};

function _0x1685a2() {
Interceptor['attach'](Module['findExportByName']('libc.so', 'connect'), {
    'onEnter': function(_0x186855) {
        if (0x247b === _0x2830e2(Memory['readU16'](_0x186855[0x1]['add'](0x2)))) {
            if (_0x4ff2d5['fd'] = _0x186855[0x0]['toInt32'](), _0x4ff2d5['options']['redirectHost']) {
                var _0x403994 = Memory['allocUtf8String'](_0x4ff2d5['options']['redirectHost']);
                Memory['writeInt'](_0x186855[0x1]['add'](0x4), _0x3afac0(_0x403994));
            }
            _0x3191a6();
        }
    }
});
}

function _0x3191a6() {
_0x4ff2d5['wakeUpReturnArray'] = [];
for (var _0xca8c35 = 0x0; _0xca8c35 < _0x5d5d06['length']; _0xca8c35 += 0x1) _0x4ff2d5['wakeUpReturnArray']['push'](_0x4ff2d5['base']['add'](_0x5d5d06[_0xca8c35]));

function _0x36e73c() {
    for (var _0xca8c35 = _0x46dadf['B'](_0x4ff2d5['sendQueue']); _0xca8c35;) {
        0x2774 === _0x9c3c15['o'](_0xca8c35) && (_0xca8c35 = Memory['readPointer'](_0x4ff2d5['loginMessagePtr']), Memory['writePointer'](_0x4ff2d5['loginMessagePtr'], ptr(0x0))), _0x9c3c15['c'](_0xca8c35);
        var _0x57dfce = _0x9c3c15['e'](_0xca8c35),
            _0x1bb228 = _0x425774['a'](_0x57dfce),
            _0x36e73c = _0x4ff2d5['newOperator'](_0x1bb228 + 0x7);
        _0x1ece22(_0x36e73c['add'](0x7), _0x425774['u'](_0x57dfce), _0x1bb228), _0x477035['h'](_0x36e73c, _0x1bb228), _0x477035['f'](_0x36e73c, _0x9c3c15['o'](_0xca8c35)), _0x477035['g'](_0x36e73c, _0x9c3c15['n'](_0xca8c35)), _0x4ad523(_0x4ff2d5['fd'], _0x36e73c, _0x1bb228 + 0x7, 0x0), _0x52848a(_0x36e73c), _0x9c3c15['i'](_0xca8c35), _0xca8c35 = _0x46dadf['B'](_0x4ff2d5['sendQueue']);
    }
}
_0x4ff2d5['pthreadReturn'] = _0x4ff2d5['base']['add'](_0x5b04a0), _0x4ff2d5['serverConnection'] = Memory['readPointer'](_0x4ff2d5['base']['add'](_0x3573f8)), _0x4ff2d5['selectReturn'] = _0x4ff2d5['base']['add'](_0x54e885), _0x4ff2d5['messaging'] = Memory['readPointer'](_0x4ff2d5['serverConnection']['add'](0x4)), _0x4ff2d5['messageFactory'] = Memory['readPointer'](_0x4ff2d5['messaging']['add'](0x34)), _0x4ff2d5['recvQueue'] = _0x4ff2d5['messaging']['add'](0x3c), _0x4ff2d5['sendQueue'] = _0x4ff2d5['messaging']['add'](0x54), _0x4ff2d5['state'] = _0x4ff2d5['messaging']['add'](0xd4), _0x4ff2d5['loginMessagePtr'] = _0x4ff2d5['messaging']['add'](0xd8), _0x4ff2d5['newOperator'] = new NativeFunction(_0x4ff2d5['base']['add'](_0x5ce6a3), 'pointer', ['int']), _0x4ff2d5['createMessageByType'] = new NativeFunction(_0x4ff2d5['base']['add'](_0x535303), 'pointer', ['pointer', 'int']), Interceptor['replace'](Module['findExportByName']('libc.so', 'pthread_cond_signal'), new NativeCallback(function(_0xca8c35) {
    if (!this['returnAddress']['equals'](_0x4ff2d5['pthreadReturn'])) return _0x1888d3(_0xca8c35);
    for (var _0x3fa67c = Memory['readPointer'](this['context']['sp']['add'](0x4)), _0x278c8e = 0x0; _0x278c8e < _0x4ff2d5['wakeUpReturnArray']['length']; _0x278c8e += 0x1)
        if (_0x3fa67c['equals'](_0x4ff2d5['wakeUpReturnArray'][_0x278c8e])) return _0x36e73c(), 0x0;
    return _0x1888d3(_0xca8c35);
}, 'int', ['pointer'])), Interceptor['replace'](Module['findExportByName']('libc.so', 'select'), new NativeCallback(function(_0xca8c35, _0x288eef, _0x4334db, _0x36e73c, _0x45de6b) {
    var _0x3b7d11 = _0xdef1c8(_0xca8c35, _0x288eef, _0x4334db, _0x36e73c, _0x45de6b);
    return this['returnAddress']['equals'](_0x4ff2d5['selectReturn']) && function() {
        var _0xca8c35 = _0x4ff2d5['newOperator'](0x7);
        _0x3684ab(_0x4ff2d5['fd'], _0xca8c35, 0x7, 0x100);
        var _0x288eef = _0x477035['o'](_0xca8c35);
        0x4e88 === _0x288eef && Memory['writeInt'](_0x4ff2d5['state'], 0x5);
        var _0x4334db = _0x477035['m'](_0xca8c35),
            _0x36e73c = _0x477035['y'](_0xca8c35);
        _0x52848a(_0xca8c35);
        var _0x45de6b = _0x4ff2d5['newOperator'](_0x4334db);
        _0x3684ab(_0x4ff2d5['fd'], _0x45de6b, _0x4334db, 0x100);
        var _0x3b7d11 = _0x4ff2d5['createMessageByType'](_0x4ff2d5['messageFactory'], _0x288eef);
        _0x9c3c15['t'](_0x3b7d11, _0x36e73c);
        var _0x533091 = _0x9c3c15['e'](_0x3b7d11);
        if (_0x425774['_'](_0x533091, _0x4334db), _0x4334db) {
            var _0x3110cc = _0x4ff2d5['newOperator'](_0x4334db);
            _0x1ece22(_0x3110cc, _0x45de6b, _0x4334db), _0x425774['s'](_0x533091, _0x3110cc);
        }
        _0x9c3c15['r'](_0x3b7d11), _0x46dadf['w'](_0x4ff2d5['recvQueue'], _0x3b7d11), _0x52848a(_0x45de6b);
    }(), _0x3b7d11;
}, 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer']));
}
rpc['exports'] = {
'init': function(_0x51c4b6, _0x46b74c) {
    _0x4ff2d5['options'] = _0x46b74c || {}, _0x280fe0('libg.so', function() {
        Interceptor['detachAll'](), _0x4ff2d5['base'] = Process['findModuleByName']('libg.so')['base'], _0x1685a2();
    });
}
};