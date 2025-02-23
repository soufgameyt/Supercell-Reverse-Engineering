// probably broken

const config = {
    modules: {},
    options: {}
};

const FUNCTION_NAMES = [
    'loadLibrary0', 'redirectHost', 'wakeUpReturnArray', 'join', 'perform', 'implementation',
    'pthread_mutex_lock', '.so', 'inet_addr', 'int', 'base', 'findModuleByName', 'base:',
    'java.lang.String', 'state', 'readU8', 'getRuntime', 'libg.so', 'recv:', 'replace',
    'connect', 'readInt', 'allocUtf8String', 'send:', 'createMessageByType', 'writeU8',
    'pointer', 'getStars', 'attach', 'writeInt', 'messageFactory', '[!] wakeup:', 'readByteArray',
    'findExportByName', 'free', 'uint16', 'lib', 'selectReturn', 'readU16', 'toInt32', 'send',
    'libc.so', 'context', 'getCurrentState', 'void', 'overload', 'pthreadReturn', 'exports',
    'writePointer', 'CreateMessageType:', 'getCallingClassLoader', 'options', 'getGameStateManager',
    'sendMessage', 'recv', 'select', 'recvQueue', 'newOperator', 'sub', 'sendQueue', 'pthread_cond_signal',
    'serverConnection', 'equals', 'length', 'loadLibrary', 'indexOf', 'java.lang.System', 'flush',
    'loginMessagePtr', 'use', 'revert', 'java.lang.Runtime', 'add', 'readPointer', 'messaging',
    'returnAddress', 'log', 'detach', 'dalvik.system.VMStack'
];

// Native function pointers
const nativeFunctions = {
    pthreadMutexUnlock: new NativeFunction(Module.findExportByName('libc.so', 'pthread_mutex_unlock'), 'int', ['pointer']),
    pthreadCondSignal: new NativeFunction(Module.findExportByName('libc.so', 'pthread_cond_signal'), 'int', ['pointer']),
    memmove: new NativeFunction(Module.findExportByName('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']),
    ntohs: new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']),
    free: new NativeFunction(Module.findExportByName('libc.so', 'free'), 'int', ['pointer']),
    inet_addr: new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']),
    connect: new NativeFunction(Module.findExportByName('libc.so', 'connect'), 'int', ['int', 'pointer', 'int']),
    select: new NativeFunction(Module.findExportByName('libc.so', 'select'), 'int', ['int', 'pointer', 'pointer', 'pointer', 'pointer'])
};

function redirectHost() {
    Interceptor.attach(Module.findExportByName('libc.so', 'pthread_mutex_lock'), {
        onEnter: function (args) {
            if (ntohs(Memory.readU16(args[1].add(2))) === 0x247b) {
                config.fd = args[0].toInt32();
                const host = Memory.allocUtf8String("127.0.0.1");
                Memory.writeInt(args[1].add(4), nativeFunctions.inet_addr(host));
                wakeUp();
            }
        }
    });
}

function wakeUp() {
    config.wakeUpReturnArray = [];
    for (let i = 0; i < wakeUpOffsets.length; i++) {
        config.wakeUpReturnArray.push(config.base.add(wakeUpOffsets[i]));
    }
    config.pthreadReturn = config.base.add(0x205725);
    config.messaging = Memory.readPointer(config.base.add(0x354104));
    config.messageFactory = Memory.readPointer(config.messaging.add(0x34));
    config.sendQueue = config.messageFactory.add(0x54);
    config.recvQueue = config.messageFactory.add(0xd4);
    console.log('[!] wakeup:', config.base);
}

rpc.exports = {
    init: function (options) {
        config.options = options || {};
        Java.perform(function () {
            Interceptor.detachAll();
            config.base = Process.getModuleByName('libg.so').base;
            redirectHost();
        });
    }
};