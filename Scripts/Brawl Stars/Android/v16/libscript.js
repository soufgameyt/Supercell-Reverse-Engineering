var _0x213304 = {
    'modules': {},
    'options': {}
},
_0x391c41 = 0x98fcc8,
_0x3bddda = 0x586978,
_0x5532c6 = 0x586950,
_0x884555 = 0x59f8a9,
_0x40a032 = 0x586b9b,
_0x3cf615 = 0x3e945c,
_0x12394a = 0x4;

function _0x209134(_0x39b731, _0x42f59a) {
if (_0x213304['modules'][_0x39b731] && !_0x42f59a) return _0x213304['modules'][_0x39b731];
for (var _0x598aba = Process['findModuleByName'](_0x39b731), _0x1f58b1 = Module['enumerateRangesSync'](_0x39b731, '---'), _0x53e567 = {
        'name': _0x39b731,
        'base': _0x598aba['base'],
        'ranges': []
    }, _0x5662ea = 0x0; _0x5662ea < _0x1f58b1['length']; _0x5662ea += 0x1) _0x53e567['ranges']['push']({
    'base': _0x1f58b1[_0x5662ea]['base'],
    'size': _0x1f58b1[_0x5662ea]['size'],
    'protection': _0x1f58b1[_0x5662ea]['protection']
});
return _0x213304['modules'][_0x39b731] = _0x53e567;
}

function _0xf9b0e5(_0x268064, _0x489d6f) {
return _0x209134(_0x268064)['base']['add'](_0x489d6f);
}

function _0x5ca565(_0x450928, _0x17558f) {
Interceptor['attach'](Module['findExportByName']('libc.so', 'getaddrinfo'), function(_0x1ccee9) {
    Memory['readUtf8String'](_0x1ccee9[0x0]) === _0x450928 && Memory['writeUtf8String'](_0x1ccee9[0x0], _0x17558f);
});
}

function _0x535810(_0xfa5f3b, _0x1d9932) {
Java['perform'](function() {
    var _0x5984ad = Java['use']('java.lang.System'),
        _0x13212a = Java['use']('java.lang.Runtime'),
        _0xccbe04 = _0x5984ad['loadLibrary']['overload']('java.lang.String'),
        _0x43281f = Java['use']('dalvik.system.VMStack');
    _0xccbe04['implementation'] = function(_0x5984ad) {
        try {
            _0x13212a['getRuntime']()['loadLibrary0'] ? _0x13212a['getRuntime']()['loadLibrary0'](_0x43281f['getCallingClassLoader'](), _0x5984ad) : _0x13212a['getRuntime']()['loadLibrary'](_0x5984ad, _0x43281f['getCallingClassLoader']()), _0xfa5f3b === 'lib' + _0x5984ad + '.so' && _0x1d9932();
        } catch (_0x32fb02) {}
    };
});
}

function _0x3bf68b() {}

function _0x222f8b() {}

function _0x19cb1c() {}

function _0x1401dc() {}

function _0x40cb6d() {
function _0x4d743f(_0x3fbb28, _0x1df586) {
    _0x2bfb85(_0x3fbb28['sub'](0x4));
    var _0x4c275f = _0x1401dc['getEnqueueIndex'](_0x3fbb28);
    _0x1401dc['set'](_0x3fbb28, _0x4c275f, _0x1df586), _0x1401dc['setEnqueueIndex'](_0x3fbb28, (_0x4c275f + 0x1) % _0x1401dc['getCapacity'](_0x3fbb28)), _0x1401dc['incrementCount'](_0x3fbb28), _0x4b1867(_0x3fbb28['sub'](0x4));
}
var _0x3d47c7 = Process['findModuleByName']('libg.so')['base'],
    _0x2e171d = Memory['readPointer'](_0x3d47c7['add'](_0x391c41)),
    _0x5595e2 = Memory['readPointer'](_0x2e171d['add'](0x4)),
    _0x55be13 = Memory['readPointer'](_0x5595e2['add'](0x34)),
    _0x2b00a0 = _0x5595e2['add'](0x3c),
    _0x318e34 = _0x5595e2['add'](0x54),
    _0x253dd5 = _0x5595e2['add'](0xd4),
    _0x528f3a = _0x5595e2['add'](0xd8),
    _0x2bfb85 = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_mutex_lock'), 'int', ['pointer']),
    _0x4b1867 = new NativeFunction(Module['findExportByName']('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']),
    _0x16f53f = new NativeFunction(Module['findExportByName']('libc.so', 'sendto'), 'int', ['int', 'pointer', 'int', 'int', 'pointer', 'int']),
    _0x28fe6f = new NativeFunction(Module['findExportByName']('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']),
    _0x4d68ef = new NativeFunction(_0x3d47c7['add'](_0x884555), 'pointer', ['int']);
Interceptor['replace'](_0x3d47c7['add'](_0x3bddda), new NativeCallback(function(_0x3d47c7, _0x2e171d, _0x5595e2, _0x487c86, _0x290cc1, _0x42e277) {
    var _0x480330, _0x4a25bf;
    if (0x2774 === _0x19cb1c['getMessageType'](_0x2e171d)) {
        var _0x4cea2d, _0x4d743f;
        _0x480330 = Memory['readPointer'](_0x528f3a), _0x3bf68b['encode'](_0x480330), _0x4a25bf = _0x3bf68b['getByteStream'](_0x480330), _0x4d743f = _0x222f8b['getOffset'](_0x4a25bf), _0x4cea2d = _0x4d68ef(_0x4d743f + 0x7), _0x28fe6f(_0x4cea2d['add'](0x7), _0x222f8b['getByteArray'](_0x4a25bf), _0x4d743f), _0x19cb1c['setEncodingLength'](_0x4cea2d, _0x4d743f), _0x19cb1c['setMessageType'](_0x4cea2d, 0x2775), _0x19cb1c['setMessageVersion'](_0x4cea2d, 0xa), _0x16f53f(_0x3d47c7, _0x4cea2d, _0x4d743f + 0x7, _0x487c86, _0x290cc1, _0x42e277), Memory['writePointer'](_0x528f3a, ptr(0x0));
    } else {
        _0x2bfb85(_0x318e34['sub'](0x4));
        var _0x55be13 = _0x1401dc['getCapacity'](_0x318e34),
            _0x2b00a0 = (_0x1401dc['getDequeueIndex'](_0x318e34) - 0x1) % _0x55be13;
        _0x2b00a0 < 0x0 && (_0x2b00a0 += _0x55be13), _0x480330 = _0x1401dc['get'](_0x318e34, _0x2b00a0), _0x4a25bf = _0x3bf68b['getByteStream'](_0x480330);
        var _0x253dd5 = _0x222f8b['getOffset'](_0x4a25bf);
        _0x19cb1c['setEncodingLength'](_0x2e171d, _0x253dd5), _0x28fe6f(_0x2e171d['add'](0x7), _0x222f8b['getByteArray'](_0x4a25bf), _0x253dd5), _0x16f53f(_0x3d47c7, _0x2e171d, _0x253dd5 + 0x7, _0x487c86, _0x290cc1, _0x42e277), _0x4b1867(_0x318e34['sub'](0x4));
    }
    return _0x5595e2;
}, 'int', ['int', 'pointer', 'int', 'int', 'pointer', 'int']));
var _0x7e7c0c, _0xec45d0, _0x58c095, _0x11e503 = new NativeFunction(Module['findExportByName']('libc.so', 'recvfrom'), 'int', ['int', 'pointer', 'int', 'int', 'pointer', 'pointer']),
    _0x56b6ee = new NativeFunction(_0x3d47c7['add'](_0x3cf615), 'pointer', ['pointer', 'int']);
Interceptor['replace'](_0x3d47c7['add'](_0x5532c6), new NativeCallback(function(_0x3d47c7, _0x2e171d, _0x5595e2, _0x1aa13d, _0x443288, _0xe57ec8) {
    var _0x3f6922 = _0x11e503(_0x3d47c7, _0x2e171d, _0x5595e2, _0x1aa13d, _0x443288, _0xe57ec8);
    if (0x4e84 === _0x7e7c0c) return _0x7e7c0c = null, _0x3f6922;
    if (0x4e88 === _0x7e7c0c && Memory['writeInt'](_0x253dd5, 0x5), _0x7e7c0c) {
        _0x58c095 = _0x56b6ee(_0x55be13, _0x7e7c0c), _0x3bf68b['setVersion'](_0x58c095, _0xec45d0);
        var _0x2a4f0d = _0x3bf68b['getByteStream'](_0x58c095);
        _0x222f8b['setLength'](_0x2a4f0d, _0x5595e2);
        var _0x54b24b = _0x4d68ef(_0x5595e2);
        _0x28fe6f(_0x54b24b, _0x2e171d, _0x5595e2), _0x222f8b['setByteArray'](_0x2a4f0d, _0x54b24b), _0x3bf68b['decode'](_0x58c095), _0x4d743f(_0x2b00a0, _0x58c095), _0x7e7c0c = null;
    } else {
        if (_0x7e7c0c = _0x19cb1c['getMessageType'](_0x2e171d), _0xec45d0 = Memory['readU8'](_0x2e171d['add'](0x5)) << 0x8 | Memory['readU8'](_0x2e171d['add'](0x6)), 0x4e84 === _0x7e7c0c) return _0x3f6922;
        0x0 == (Memory['readU8'](_0x2e171d['add'](0x2)) << 0x10 | Memory['readU8'](_0x2e171d['add'](0x3)) << 0x8 | Memory['readU8'](_0x2e171d['add'](0x4))) && (_0x58c095 = _0x56b6ee(_0x55be13, _0x7e7c0c), _0x3bf68b['setVersion'](_0x58c095, _0xec45d0), _0x222f8b['setLength'](_0x3bf68b['getByteStream'](_0x58c095), 0x0), _0x3bf68b['decode'](_0x58c095), _0x4d743f(_0x2b00a0, _0x58c095), _0x7e7c0c = null), _0x19cb1c['setMessageType'](_0x2e171d, 0xffff);
    }
    return _0x3f6922;
}, 'int', ['int', 'pointer', 'int', 'int', 'pointer', 'pointer']));
}

function _0x11c086() {
_0x213304['options']['redirectHost'] && _0x5ca565('game.brawlstarsgame.com', _0x213304['options']['redirectHost']);
var _0x5d6a2d = _0xf9b0e5('libg.so', _0x40a032),
    _0x194e25 = Interceptor['attach'](Module['findExportByName']('libc.so', 'pthread_cond_signal'), {
        'onEnter': function() {
            this['context']['lr']['equals'](_0x5d6a2d) && (_0x194e25['detach'](), _0x40cb6d());
        }
    });
}
_0x3bf68b['getByteStream'] = function(_0x3fbe2e) {
return _0x3fbe2e['add'](0x8);
}, _0x3bf68b['getVersion'] = function(_0x4ff795) {
return Memory['readInt'](_0x4ff795['add'](0x4));
}, _0x3bf68b['setVersion'] = function(_0x18a6e6, _0x1c76c8) {
Memory['writeInt'](_0x18a6e6['add'](0x4), _0x1c76c8);
}, _0x3bf68b['getMessageType'] = function(_0x11d4fc) {
return new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x11d4fc)['add'](0x14)), 'int', [])();
}, _0x3bf68b['encode'] = function(_0x236268) {
new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x236268)['add'](0x8)), 'void', ['pointer'])(_0x236268);
}, _0x3bf68b['decode'] = function(_0x37185c) {
new NativeFunction(Memory['readPointer'](Memory['readPointer'](_0x37185c)['add'](0xc)), 'void', ['pointer'])(_0x37185c);
}, _0x222f8b['getOffset'] = function(_0x5a1229) {
return Memory['readInt'](_0x5a1229['add'](0x10));
}, _0x222f8b['getByteArray'] = function(_0x893d79) {
return Memory['readPointer'](_0x893d79['add'](0x1c));
}, _0x222f8b['setByteArray'] = function(_0x56d08e, _0x3976dc) {
Memory['writePointer'](_0x56d08e['add'](0x1c), _0x3976dc);
}, _0x222f8b['getLength'] = function(_0x343023) {
return Memory['readInt'](_0x343023['add'](0x14));
}, _0x222f8b['setLength'] = function(_0x40aae3, _0x18dea5) {
Memory['writeInt'](_0x40aae3['add'](0x14), _0x18dea5);
}, _0x19cb1c['setEncodingLength'] = function(_0x11bb5c, _0x105bae) {
Memory['writeU8'](_0x11bb5c['add'](0x2), _0x105bae >> 0x10 & 0xff), Memory['writeU8'](_0x11bb5c['add'](0x3), _0x105bae >> 0x8 & 0xff), Memory['writeU8'](_0x11bb5c['add'](0x4), 0xff & _0x105bae);
}, _0x19cb1c['setMessageType'] = function(_0x50f95e, _0x2ec904) {
Memory['writeU8'](_0x50f95e['add'](0x0), _0x2ec904 >> 0x8 & 0xff), Memory['writeU8'](_0x50f95e['add'](0x1), 0xff & _0x2ec904);
}, _0x19cb1c['setMessageVersion'] = function(_0x3a1708, _0x4bd33e) {
Memory['writeU8'](_0x3a1708['add'](0x5), _0x4bd33e >> 0x8 & 0xff), Memory['writeU8'](_0x3a1708['add'](0x6), 0xff & _0x4bd33e);
}, _0x19cb1c['getMessageType'] = function(_0x44ecdf) {
return Memory['readU8'](_0x44ecdf) << 0x8 | Memory['readU8'](_0x44ecdf['add'](0x1));
}, _0x1401dc['getCapacity'] = function(_0x1a12ca) {
return Memory['readInt'](_0x1a12ca['add'](0x4));
}, _0x1401dc['get'] = function(_0x445fff, _0x29f511) {
return Memory['readPointer'](Memory['readPointer'](_0x445fff)['add'](_0x12394a * _0x29f511));
}, _0x1401dc['set'] = function(_0x2e04ad, _0x34e208, _0x175556) {
Memory['writePointer'](Memory['readPointer'](_0x2e04ad)['add'](_0x12394a * _0x34e208), _0x175556);
}, _0x1401dc['incrementCount'] = function(_0x1b8f95) {
Memory['writeInt'](_0x1b8f95['add'](0x8), Memory['readInt'](_0x1b8f95['add'](0x8)) + 0x1);
}, _0x1401dc['getDequeueIndex'] = function(_0x3d54f1) {
return Memory['readInt'](_0x3d54f1['add'](0xc));
}, _0x1401dc['getEnqueueIndex'] = function(_0x52e22d) {
return Memory['readInt'](_0x52e22d['add'](0x10));
}, _0x1401dc['setEnqueueIndex'] = function(_0x1354d9, _0x528d8f) {
Memory['writeInt'](_0x1354d9['add'](0x10), _0x528d8f);
}, rpc['exports'] = {
'init': function(_0x2cb16a, _0xc1cc3f) {
    try {
        _0x213304['options'] = _0xc1cc3f || {}, _0x535810('libg.so', function() {
            _0x11c086();
        });
    } catch (_0x5d5e5e) {}
}
};