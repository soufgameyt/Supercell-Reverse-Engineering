let _0x365c65,
    _0x53d8e6,
    _0x599de6 = {
        'LogicVersion::isProd': ptr('0x005B2248'),
        'TextField::setString': ptr('0x007A4524'),
        'GenericPopup::GenericPopup': ptr('0x0037F1B4'),
        'GenericPopup::setTitleTid': ptr('0x0037F770'),
        'GenericPopup::setTextTid': ptr('0x0037FA50'),
        'GenericPopup::addButton': ptr('0x003801E4'),
        'GenericPopup::buttonClicked': ptr('0x00380914'),
        'GUI::showPopup': ptr('0x00293DF8'),
        'GUI::getInstance': ptr('0x0029275C'),
        'TextField::setAndScale': ptr('0x005A76B0'),
        'MovieClip::getTextFieldByName': ptr('0x00774C58'),
    },
    _0x13b9a2 = Process.arch,
    _0x3e9060 = null
const _0xdc8169 = {}
_0xdc8169.env = 'dev'
_0xdc8169.version = '57.325'
_0xdc8169.branch = 'dev-alpha'
_0xdc8169.scriptVersion = 95
_0xdc8169.apkVersion = 1
_0xdc8169.protocolVersion = 1
let _0xfe2a92 = _0xdc8169
const _0x54f182 = '796f75725f6d6f6d5f69735f736f5f626967'
let _0x37db21 = new NativeFunction(
    Module.findExportByName('libc.so', 'malloc'),
    'pointer',
    ['int']
)

function _0x44549d(_0x4c8a78) {
    let _0x2be830 = new Uint8Array(_0x4c8a78.length / 2)
    for (let _0x1f4001 = 0; _0x1f4001 < _0x4c8a78.length / 2; _0x1f4001++) {
        _0x2be830[_0x1f4001] = parseInt(_0x4c8a78.substr(_0x1f4001 * 2, 2), 16)
    }
    return _0x2be830
}
class _0x389077 {
    constructor() {
            this.instance = _0x599de6['GUI::getInstance']()
        }
        ['showPopup'](_0x21436d) {
            _0x599de6['GUI::showPopup'](this.instance, _0x21436d, 1, 0, 1)
        }
}
class _0x1f0e1e {
    constructor(_0x35de55, _0x253734, _0x487743) {
            console.log('AlertPopup')
            this.text = _0x253734
            this.title = _0x35de55
            this.buttons = _0x487743
            this.instance = null
            this.create()
            this.hook()
            this.show()
        }
        ['hook']() {
            let _0x5c5761 = this
        }
        ['show']() {
            let _0x1b19fe = new _0x389077()
            if (_0x1b19fe.instance == 0 || _0x1b19fe.instance == null) {
                console.log('Popup called before GUI init, rescheduling..')
                setTimeout(this.show.bind(this), 1000)
                return
            }
            let _0x5d930e = this.instance
            _0x1b19fe.showPopup(_0x5d930e)
        }
        ['buttonClicked'](_0x5468f8, _0x5cfd18) {
            console.log('button clicked: ' + _0x5cfd18.readPointer().readPointer())
            console.log('button1 address: ' + this.buttons[0].instance)
            console.log('a1[14]: ' + this.instance.readPointer().add(56).readPointer())
            console.log('a1[15]: ' + this.instance.readPointer().add(60).readPointer())
            console.log('a1[16]: ' + this.instance.readPointer().add(64).readPointer())
        }
        ['create']() {
            let _0x5dd94f = this.text.scptr(),
                _0x1da04a = this.title.scptr(),
                _0x92cf61 = this.buttons[0].text.scptr(),
                _0xb1211a = 'ok_button'.scptr(),
                _0x3b9021 = 'cancel_button'.scptr(),
                _0x13d4cf = 'info_txt'.scptr(),
                _0x36294e = 'popup_brawltv'.scptr(),
                _0x161a2e = ''.scptr(),
                _0x5c6533 = ''.scptr(),
                _0x267a06 = ''.scptr(),
                _0x1d622d = _0x37db21(400)
            _0x599de6['GenericPopup::GenericPopup'](
                _0x1d622d,
                _0x36294e,
                0,
                0,
                _0x161a2e,
                _0x5c6533,
                _0x267a06
            )
            _0x599de6['GenericPopup::setTitleTid'](_0x1d622d, _0x1da04a)
            let _0x966441 = _0x1d622d.add(84).readPointer(),
                _0x1a19ed = _0x599de6['MovieClip::getTextFieldByName'](
                    _0x966441,
                    _0x13d4cf
                )
            _0x599de6['TextField::setAndScale'](_0x1a19ed, _0x5dd94f)
            let _0x140111 = _0x599de6['GenericPopup::addButton'](
                    _0x1d622d,
                    _0xb1211a,
                    0
                ),
                _0x4de009 = new NativeFunction(
                    _0x140111.readPointer().add(208).readPointer(),
                    'void',
                    ['pointer', 'pointer', 'int']
                )
            _0x4de009(_0x140111, _0x92cf61, 1)
            this.buttons[0].instance = _0x140111
            this.instance = _0x1d622d
        }
}
class _0x1f8da7 {
    constructor() {
            this.data = {}
        }
        ['gather']() {
            let _0x2defc9 = {},
                _0xac7120 = {},
                _0x5a7fab = {},
                _0x149c2c = {
                    _0x862e72: _0x14ae43.get(_0x862e72, 'Unknown')
                },
                _0x57a77a = {}
            Java.perform(function() {
                var _0x2f4334 = Java.use('android.os.Build'),
                    _0x433996 = Java.use('android.os.Build$VERSION')
                const _0x267202 = {
                    manufacturer: _0x2f4334.MANUFACTURER.value,
                    model: _0x2f4334.MODEL.value,
                    brand: _0x2f4334.BRAND.value,
                    device: _0x2f4334.DEVICE.value,
                    product: _0x2f4334.PRODUCT.value,
                    hardware: _0x2f4334.HARDWARE.value,
                    board: _0x2f4334.BOARD.value,
                    fingerprint: _0x2f4334.FINGERPRINT.value,
                    display: _0x2f4334.DISPLAY.value,
                    serial: _0x2f4334.SERIAL.value,
                    osVersion: _0x433996.RELEASE.value,
                    sdkVersion: _0x433996.SDK_INT.value,
                }
                _0x2defc9 = _0x267202
                var _0x10ffdf = Java.use('android.net.ConnectivityManager'),
                    _0x43bd68 = Java.use('android.net.NetworkInfo'),
                    _0x4491b9 = Java.cast(
                        Java.use('android.app.ActivityThread').currentApplication(),
                        Java.use('android.content.Context')
                    ),
                    _0x1fa50a = _0x4491b9.getSystemService('connectivity'),
                    _0x5065a0 = _0x1fa50a.activeNetworkInfo
                _0x5065a0
                    ?
                    (_0xac7120 = {
                        isConnected: _0x5065a0.isConnected(),
                        isWifi: _0x5065a0.getType() === _0x10ffdf.TYPE_WIFI,
                        networkType: _0x5065a0.getTypeName(),
                    }) :
                    console.log('No active network connection.')
                var _0x5e074b = Java.use('android.telephony.TelephonyManager'),
                    _0x4491b9 = Java.cast(
                        Java.use('android.app.ActivityThread').currentApplication(),
                        Java.use('android.content.Context')
                    ),
                    _0x202cfc = _0x4491b9.getSystemService('phone')
                if (_0x202cfc) {
                    var _0x202cfc = Java.cast(_0x202cfc, _0x5e074b)
                    let _0x431633, _0x1b7f6f
                    try {
                        let _0x2693d6 = _0x202cfc.getImei(),
                            _0x324ca4 = _0x202cfc.getSubscriberId()
                    } catch (_0x514298) {
                        console.log('API version too high. No IMEI or IMSI available.')
                    }
                    _0x5a7fab = {
                        carrier: _0x202cfc.getNetworkOperatorName(),
                        networkType: _0x202cfc.getNetworkType(),
                        networkOperator: _0x202cfc.getNetworkOperatorName(),
                        phoneType: _0x202cfc.getPhoneType(),
                        imei: _0x431633,
                        imsi: _0x1b7f6f,
                    }
                } else {
                    console.log('No TelephonyManager available.')
                }
                var _0x14ae43 = Java.use('android.os.SystemProperties'),
                    _0x23aca5 = [
                        'ro.product.model',
                        'ro.product.brand',
                        'ro.product.name',
                        'ro.build.version.release',
                        'ro.build.version.sdk',
                    ]
                _0x23aca5.forEach(function(_0x862e72) {})
                var _0x222cf3 = Java.use('android.hardware.SensorManager'),
                    _0x4491b9 = Java.cast(
                        Java.use('android.app.ActivityThread').currentApplication(),
                        Java.use('android.content.Context')
                    ),
                    _0x3dc602 = _0x4491b9.getSystemService('sensor'),
                    _0x3dc602 = Java.cast(_0x3dc602, _0x222cf3)
                let _0xeac7cc = Java.use('android.hardware.Sensor').TYPE_ALL.value
                var _0x5588b6 = _0x3dc602.getSensorList(_0xeac7cc)
                let _0x78eafe = _0x5588b6.iterator()
                while (_0x78eafe.hasNext()) {
                    let _0x317a6d = _0x78eafe.next()
                    _0x57a77a[_0x317a6d.getName()] = {
                        type: _0x317a6d.getType(),
                        vendor: _0x317a6d.getVendor(),
                        version: _0x317a6d.getVersion(),
                    }
                }
            })
            const _0x214965 = {
                ..._0x2defc9,
                ..._0xac7120,
                ..._0x5a7fab,
                ..._0x149c2c,
                ..._0x57a77a,
            }
            _0x214965.arch = _0x13b9a2
            this.data = _0x214965
        }
        ['getData']() {
            return this.data
        }
}
class _0x418683 {
    constructor(_0x27c038) {
            this.key = _0x27c038
        }
        ['encrypt'](_0x381a6b) {
            console.log('encrypting2')
            if (this.key.length === 0) {
                throw new Error('Key cannot be empty')
            }
            const _0x5808c9 = [],
                _0xccc446 = this.key.length
            for (let _0x4fd826 = 0; _0x4fd826 < _0x381a6b.length; _0x4fd826++) {
                _0x5808c9.push(_0x381a6b[_0x4fd826] ^ this.key[_0x4fd826 % _0xccc446])
            }
            return Array.from(_0x5808c9)
        }
        ['decrypt'](_0x55ed94) {
            console.log('decrypting')
            if (this.key.length === 0) {
                throw new Error('Key cannot be empty')
            }
            const _0x287cf6 = [],
                _0xb59103 = this.key.length
            for (let _0xb6df20 = 0; _0xb6df20 < _0x55ed94.length; _0xb6df20++) {
                _0x287cf6.push(_0x55ed94[_0xb6df20] ^ this.key[_0xb6df20 % _0xb59103])
            }
            return console.log('done'), _0x287cf6
        }
}
class _0x536a37 {
    constructor(_0x2da555) {
            console.log('init messenger')
            this.socketConnection = _0x2da555
            this.xor_decryptor = new _0x418683(_0x44549d(_0x54f182))
            this.stage = 0
        }
        ['onConnect']() {
            const _0x4cbb2c = {
                config: _0xfe2a92,
                arch: _0x13b9a2,
            }
            const _0x3d4b2e = {
                type: 'client_hello',
                data: _0x4cbb2c,
            }
            let _0x582bf8 = _0x3d4b2e
            this.sendMessageAndEncrypt(_0x582bf8)
        }
        ['onMessage'](_0x126339) {
            console.log('onMessage')
            let _0x1e1cdc = this.decryptJson(_0x126339)
            console.log(_0x1e1cdc)
            _0x1e1cdc.type == 'stage_update' && (this.stage = _0x1e1cdc.data.stage)
            _0x1e1cdc.type == 'server_hello' && this.sendLogin()
            if (_0x1e1cdc.type == 'server_error') {
                const _0x166100 = {
                    text: 'OK'
                }
                let _0x59e17f = new _0x1f0e1e(
                    'Server Error',
                    "Well, that's unexpected. Error: " + _0x1e1cdc.data.error,
                    [_0x166100]
                )
            }
            if (_0x1e1cdc.type == 'connection_closing') {
                const _0x43f113 = {
                    text: 'OK'
                }
                let _0xaae757 = new _0x1f0e1e(
                    'Connection Closed',
                    "Well, that's unexpected.",
                    [_0x43f113]
                )
            }
            if (_0x1e1cdc.type == 'login_failed') {
                let _0xd87cbd = _0x1e1cdc.data.code
                if (1==1) {
                    const _0x25f6e8 = {
                        text: 'OK'
                    }
                    let _0x116786 = new _0x1f0e1e(
                        'Please Enter Code',
                        'Please join dsc.gg/bsre1, \nopen #commands channel\nand run command /activate YOUR_TOKEN ' +
                        _0xd87cbd +
                        '\nand reload the game.',
                        [_0x25f6e8]
                    )
                } else {
                    const _0x3d88d0 = {
                        text: 'OK'
                    }
                    let _0x1088b6 = new _0x1f0e1e('Login Failed', _0x1e1cdc.data.message, [
                        _0x3d88d0,
                    ])
                }
            }
            if (_0x1e1cdc.type == 'login_ok') {
                console.log('login ok')
                const _0x8ead62 = {
                    note: 'plz script'
                }
                const _0x1de6ed = {
                    type: 'request_script',
                    data: _0x8ead62,
                }
                let _0x2caad7 = _0x1de6ed
                this.sendMessageAndEncrypt(_0x2caad7)
            }
            if (_0x1e1cdc.type == 'script') {
                let _0x3bd59c = _0x1e1cdc.data.script,
                    _0x7c125d = new Function(_0x3bd59c)
                try {
                    console.log('executing script')
                    _0x7c125d()
                    console.log('executed script')
                } catch (_0x232b82) {
                    const _0x26c3f3 = {
                        text: 'OK'
                    }
                    let _0x319389 = new _0x1f0e1e(
                        'Script Error',
                        'Dark fucked up script yet again!!!!\n Error: ' + _0x232b82,
                        [_0x26c3f3]
                    )
                    console.error(_0x232b82)
                }
            }
        }
        ['sendLogin']() {
            let _0x34b9a7 = new _0x1f8da7()
            _0x34b9a7.gather()
            let _0x3ec0b0 = {
                type: 'login',
                data: {
                    gatherer_data: _0x34b9a7.getData(),
                    isWheelchaired: true,
                },
            }
            this.sendMessageAndEncrypt(_0x3ec0b0)
        }
        ['sendMessageAndEncrypt'](_0xe910d9) {
            let _0x34f26e = this.encryptJson(_0xe910d9),
                _0xb2293e = this.hyperHash(_0x34f26e),
                _0x38dc2a = _0x34f26e.length,
                _0x189b3d = new Uint8Array(8)
            _0x189b3d[0] = _0x38dc2a & 255
            _0x189b3d[1] = (_0x38dc2a >> 8) & 255
            _0x189b3d[2] = (_0x38dc2a >> 16) & 255
            _0x189b3d[3] = (_0x38dc2a >> 24) & 255
            _0x189b3d[4] = _0xb2293e[0]
            _0x189b3d[5] = _0xb2293e[1]
            _0x189b3d[6] = _0xb2293e[2]
            _0x189b3d[7] = _0xb2293e[3]
            this.sendMessage(_0x189b3d)
            let _0x3e2796 = []
            while (_0x34f26e.length > 0) {
                _0x3e2796.push(_0x34f26e.splice(0, 1024))
            }
            for (let _0x1c8b56 = 0; _0x1c8b56 < _0x3e2796.length; _0x1c8b56++) {
                setTimeout(() => {
                    this.sendMessage(_0x3e2796[_0x1c8b56])
                }, 50 * _0x1c8b56)
            }
        }
        ['sendMessage'](_0x1e9e30) {
            this.socketConnection.output.write(_0x1e9e30).then((_0x20e971) => {
                console.log('wrote ' + _0x20e971 + ' bytes')
            })
        }
        ['encode'](_0x49b735) {
            let _0x419552 = Array.from(_0x49b735).map((_0x54d257) =>
                _0x54d257.codePointAt(0)
            )
            return _0x419552
        }
        ['decode'](_0x59e4b1) {
            console.log('decoding')

            function _0x207255(_0x2dff1c, _0x5b3894 = 10000) {
                let _0x1f410c = ''
                return (
                    (_0x1f410c = _0x2dff1c
                        .map((_0x31a47d) => String.fromCodePoint(_0x31a47d))
                        .join('')),
                    _0x1f410c
                )
            }
            let _0x5210fb = _0x207255(_0x59e4b1)
            return console.log('done decoding'), _0x5210fb
        }
        ['hyperHash'](_0x12e1a6) {
            let _0x4f9096 = 0,
                _0x4fdfea = 0
            for (let _0x5e5753 = 0; _0x5e5753 < _0x12e1a6.length; _0x5e5753++) {
                _0x4fdfea = _0x12e1a6[_0x5e5753] & 255
                _0x4f9096 = (_0x4f9096 * 31 + _0x4fdfea) >>> 0
            }
            let _0x596461 = new Uint8Array(4)
            return (
                (_0x596461[0] = (_0x4f9096 >> 24) & 255),
                (_0x596461[1] = (_0x4f9096 >> 16) & 255),
                (_0x596461[2] = (_0x4f9096 >> 8) & 255),
                (_0x596461[3] = _0x4f9096 & 255),
                _0x596461
            )
        }
        ['receiveMessages']() {
            function _0x421ece(_0x432e72) {
                const _0x213d40 = _0x432e72.reduce(
                        (_0x39198d, _0x241f9a) => _0x39198d + _0x241f9a.byteLength,
                        0
                    ),
                    _0x42ec44 = new Uint8Array(_0x213d40)
                let _0x176bf4 = 0
                return (
                    _0x432e72.forEach((_0x457a60) => {
                        _0x42ec44.set(_0x457a60, _0x176bf4)
                        _0x176bf4 += _0x457a60.byteLength
                    }),
                    _0x42ec44
                )
            }
            async function _0x19a40c() {
                let _0x56e4fb = await this.socketConnection.input.read(4)
                _0x56e4fb = new Uint8Array(_0x56e4fb)
                console.log('read header')
                console.log(_0x56e4fb)
                let _0x1014f7 =
                    _0x56e4fb[0] |
                    (_0x56e4fb[1] << 8) |
                    (_0x56e4fb[2] << 16) |
                    (_0x56e4fb[3] << 24)
                console.log('size: ' + _0x1014f7)
                let _0x24a157 = [],
                    _0x1ea10f = 0
                while (_0x1ea10f < _0x1014f7) {
                    console.log('reading chunk')
                    let _0xfc18f7 = await this.socketConnection.input.read(
                            _0x1014f7 - _0x1ea10f
                        ),
                        _0x58ebd7 = new Uint8Array(_0xfc18f7)
                    console.log('read total of ' + _0x58ebd7.length + ' bytes')
                    _0x24a157.push(_0x58ebd7)
                    _0x1ea10f = _0x1ea10f + _0x58ebd7.length
                    console.log(
                        'total size: ' + _0x1ea10f,
                        'chunk size: ' + _0x58ebd7.length
                    )
                }
                let _0x1b7b5e = _0x421ece(_0x24a157)
                console.log('read total of ' + _0x1b7b5e.length + ' bytes')
                this.onMessage(_0x1b7b5e)
            }
            _0x19a40c
                .bind(this)()
                .then(() => {
                    this.receiveMessages()
                })
        }
        ['decryptJson'](_0xcb118b) {
            if (this.stage == 0) {
                let _0x7f6e01 = new Uint8Array(_0xcb118b)
                _0x7f6e01 = Array.from(_0x7f6e01)
                let _0x213f22 = this.decode(_0x7f6e01)
                console.log(_0x213f22)
                let _0x3b695e = JSON.parse(_0x213f22)
                return _0x3b695e
            } else {
                if (this.stage == 1) {
                    let _0x5bb238 = new Uint8Array(_0xcb118b)
                    _0x5bb238 = Array.from(_0x5bb238)
                    let _0x564aa1 = this.xor_decryptor.decrypt(_0x5bb238)
                    console.log(_0x564aa1.byteLength)
                    let _0x2950e5 = this.decode(_0x564aa1)
                    console.log(_0x2950e5)
                    let _0x1f26dd = JSON.parse(_0x2950e5)
                    return _0x1f26dd
                }
            }
        }
        ['encryptJson'](_0x9144ca) {
            if (this.stage == 0) {
                let _0x1ff8e5 = JSON.stringify(_0x9144ca)
                return this.encode(_0x1ff8e5)
            }
            if (this.stage == 1) {
                let _0x50fc38 = JSON.stringify(_0x9144ca),
                    _0x368028 = this.xor_decryptor.encrypt(this.encode(_0x50fc38))
                return _0x368028
            }
        }
}

function _0x5972b7() {
    _0x365c65 = Process.getModuleByName('libg.so').base
    console.log('found libg @ ' + _0x365c65.toString(16))
    Process.setExceptionHandler(function(_0x3e8240) {
        return (
            console.log('APP CRASH!'),
            console.log(_0x3e8240.address.sub(_0x365c65)),
            console.log('ADDR: ' + DebugSymbol.fromAddress(_0x3e8240.address)),
            console.log('LR: ' + DebugSymbol.fromAddress(_0x3e8240.context.lr)),
            false
        )
    })
    _0x3bd89b()
    _0x5f1bc6()
    _0x558546()
    console.log('connecting')
    try {
        const _0xcc762a = {
            host: 'bsclient.bsre1.com',
            port: 5434,
        }
        Socket.connect(_0xcc762a).then(function(_0xaf901d) {
            console.log('connected')
            _0x3e9060 = new _0x536a37(_0xaf901d)
            _0x3e9060.onConnect()
            _0x3e9060.receiveMessages()
        })
    } catch (_0x1984ec) {
        console.log(_0x1984ec)
        const _0x58cf69 = {
            text: 'OK'
        }
        let _0x29562e = new _0x1f0e1e('Error', _0x1984ec, [_0x58cf69])
    }
}

function _0x3bd89b() {
    _0x599de6['GenericPopup::GenericPopup'] = new NativeFunction(
        _0x599de6['GenericPopup::GenericPopup'].add(_0x365c65),
        'pointer',
        ['pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer']
    )
    _0x599de6['GenericPopup::setTitleTid'] = new NativeFunction(
        _0x599de6['GenericPopup::setTitleTid'].add(_0x365c65),
        'void',
        ['pointer', 'pointer']
    )
    _0x599de6['GenericPopup::setTextTid'] = new NativeFunction(
        _0x599de6['GenericPopup::setTextTid'].add(_0x365c65),
        'void',
        ['pointer', 'pointer', 'pointer']
    )
    _0x599de6['GenericPopup::addButton'] = new NativeFunction(
        _0x599de6['GenericPopup::addButton'].add(_0x365c65),
        'pointer',
        ['pointer', 'pointer', 'int']
    )
    _0x599de6['GUI::showPopup'] = new NativeFunction(
        _0x599de6['GUI::showPopup'].add(_0x365c65),
        'pointer',
        ['pointer', 'pointer', 'int', 'int', 'int']
    )
    _0x599de6['GUI::getInstance'] = new NativeFunction(
        _0x599de6['GUI::getInstance'].add(_0x365c65),
        'pointer',
        []
    )
    _0x599de6['MovieClip::getTextFieldByName'] = new NativeFunction(
        _0x599de6['MovieClip::getTextFieldByName'].add(_0x365c65),
        'pointer',
        ['pointer', 'pointer']
    )
    _0x599de6['TextField::setAndScale'] = new NativeFunction(
        _0x599de6['TextField::setAndScale'].add(_0x365c65),
        'void',
        ['pointer', 'pointer']
    )
}

function _0x558546() {}

function _0x5f1bc6() {}
setTimeout(_0x5972b7, 26000)
String.prototype.ptr = function() {
    return Memory.allocUtf8String(this)
}
String.prototype.scptr = function(_0x4fecf7 = null) {
    const _0x5d19c0 = this,
        _0x17ba85 = _0x5d19c0.length,
        _0x565e06 = unescape(encodeURIComponent(_0x5d19c0)).length,
        _0x5dc60f = _0x4fecf7 ? _0x4fecf7 : _0x37db21(16)
    _0x5dc60f.writeU32(_0x17ba85)
    _0x5dc60f.add(4).writeU32(_0x565e06)
    if (_0x565e06 > 7) {
        const _0x4808fc = _0x37db21(_0x565e06 + 1)
        _0x4808fc.writeUtf8String(_0x5d19c0)
        _0x5dc60f.add(8).writePointer(_0x4808fc)
    } else {
        _0x5dc60f.add(8).writeUtf8String(_0x5d19c0)
    }
    return _0x5dc60f
}
NativePointer.prototype.fromsc = function() {
    var _0x1397a1 = ptr(this.toInt32()),
        _0x37a039 = Memory.readS32(_0x1397a1.add(4)),
        _0x233edb
    _0x37a039 < 8 ?
        (_0x233edb = _0x1397a1.add(8)) :
        (_0x233edb = Memory.readPointer(_0x1397a1.add(8)))
    var _0x218632 = Memory.readCString(_0x233edb)
    return _0x218632
}
NativePointer.prototype.clearscstr = function() {
    var _0x52f37c = ptr(this.toInt32())
    Memory.writeS32(_0x52f37c, 0)
    Memory.writeS32(_0x52f37c.add(4), 0)
    Memory.writeS32(_0x52f37c.add(8), 0)
}
NativePointer.prototype.scbytes = function() {
    return this.scptr().readByteArray(16)
}