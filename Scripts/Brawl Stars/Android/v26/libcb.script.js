// broken?
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
        function fn_11() {
            System = Java.use("java.lang.System");
            Runtime = Java.use("java.lang.Runtime");
            SystemLoad_2 = System.loadLibrary.overload("java.lang.String");
            VMStack = Java.use("dalvik.system.VMStack");
            function fn_13() {
                try_() // catch @ l_100
                if (!Runtime.getRuntime().loadLibrary0) goto`l_50`
                label`l_21`
                Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(), arg0)
                goto`l_78`
                label`l_51`
                Runtime.getRuntime().loadLibrary(arg0, VMStack.getCallingClassLoader())
                if (!name === "lib" + arg0 + ".so") goto`l_98`
                label`l_96`
                callback()
                <pop oob>
                return;
                label`l_101`
                error = <pop oob>;
                try_() // catch @ l_108
                <pop oob>
                return;
                label`l_109`
                throw <pop oob>;
            }
            SystemLoad_2.implementation = fn_13;
            SystemLoad_2;
        }
        Java.perform(fn_11);
    }
    onLoad = fn_9;
    function fn_15() {
        if (!getPackageName() != arg0) goto`l_8`
        label`l_6`
        exit()
    }
    checkPackageName = fn_15;
    function fn_17() {
        packagename = "";
        function fn_19() {
            context = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext();
            packagename = context.getPackageName();
        }
        Java.perform(fn_19)
        return packagename;
    }
    getPackageName = fn_17;
    function fn_21() {
        function fn_23() {
            context = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext();
            function fn_25() {
                toast = Java.use("android.widget.Toast");
                toast.makeText(context, Java.use("java.lang.String").$new(text), 1).show();
            }
            Java.scheduleOnMainThread(fn_25);
        }
        Java.perform(fn_23);
    }
    showToast = fn_21;
    function fn_27() {
        function fn_29() {
            Java.use("java.lang.System").exit(0);
        }
        Java.scheduleOnMainThread(fn_29);
    }
    exit = fn_27;
    function fn_31() {
        function onEnter() {
            if (!ntohs(Memory.readU16(arg0[1].add(2))) === 9339) goto`l_119`
            label`l_33`
            cache.fd = arg0[0].toInt32();
            if (!cache.options.redirectHost) goto`l_116`
            label`l_63`
            host = Memory.allocUtf8String(cache.options.redirectHost);
            Memory.writeInt(arg0[1].add(4), inet_addr(host))
            setupMessaging()
            cache;
        }
        {}.onEnter = onEnter;
        Interceptor.attach(Module.findExportByName("libc.so", "connect"), {});
    }
    setup = fn_31;
    function fn_35() {
        function fn_37() {
            message = MessageQueue._dequeue(cache.sendQueue);
            if (!message) goto`l_111`
            label`l_19`
            messageType = Message._getMessageType(message);
            if (!messageType === 10100) goto`l_82`
            label`l_36`
            message = Memory.readPointer(cache.loginMessagePtr);
            Memory.writePointer(cache.loginMessagePtr, ptr(0))
            cache.sendMessage(message)
            message = MessageQueue._dequeue(cache.sendQueue);
            goto`l_15`
            label`l_112`
        }
        onWakeup = fn_37;
        function fn_39() {
            headerBuffer = malloc(7);
            libc_recv(cache.fd, headerBuffer, 7, 256)
            messageType = Buffer._getMessageType(headerBuffer);
            if (!messageType >= 20000) goto`l_255`
            label`l_40`
            if (!messageType === 20104) goto`l_67`
            label`l_47`
            Memory.writeInt(cache.state, 5)
            payloadLength = Buffer._getEncodingLength(headerBuffer);
            messageVersion = Buffer._getMessageVersion(headerBuffer);
            free(headerBuffer)
            messageBuffer = malloc(payloadLength);
            libc_recv(cache.fd, messageBuffer, payloadLength, 256)
            message = cache.createMessageByType(cache.messageFactory, messageType);
            Message._setVersion(message, messageVersion)
            byteStream = Message._getByteStream(message);
            ByteStream._setLength(byteStream, payloadLength)
            if (!payloadLength) goto`l_214`
            label`l_184`
            byteArray = malloc(payloadLength);
            memmove(byteArray, messageBuffer, payloadLength)
            ByteStream._setByteArray(byteStream, byteArray)
            Message._decode(message)
            MessageQueue._enqueue(cache.recvQueue, message)
            free(messageBuffer)
        }
        onReceive = fn_39;
        base = Process.findModuleByName("libg.so").base;
        cache.pthreadReturn = base.add(PTHREAD_COND_WAKE_RETURN);
        cache.serverConnection = Memory.readPointer(base.add(SERVER_CONNECTION));
        cache.selectReturn = base.add(SELECT_RETURN);
        cache.messaging = Memory.readPointer(cache.serverConnection.add(4));
        cache.messageFactory = Memory.readPointer(cache.messaging.add(52));
        cache.recvQueue = cache.messaging.add(60);
        cache.sendQueue = cache.messaging.add(84);
        cache.state = cache.messaging.add(208);
        cache.loginMessagePtr = cache.messaging.add(212);
        cache.createMessageByType = new NativeFunction(base.add(CREATE_MESSAGE_BY_TYPE), "pointer", ["pointer", "int"]);
        function fn_41() {
            Message._encode(arg0)
            byteStream = Message._getByteStream(arg0);
            messagePayloadLength = ByteStream._getOffset(byteStream);
            messageBuffer = malloc(messagePayloadLength + 7);
            memmove(messageBuffer.add(7), ByteStream._getByteArray(byteStream), messagePayloadLength)
            Buffer._setEncodingLength(messageBuffer, messagePayloadLength)
            Buffer._setMessageType(messageBuffer, Message._getMessageType(arg0))
            Buffer._setMessageVersion(messageBuffer, Message._getVersion(arg0))
            libc_send(cache.fd, messageBuffer, messagePayloadLength + 7, 0)
            free(messageBuffer)
            Message._free(arg0);
        }
        cache.sendMessage = fn_41;
        function onEnter() {
            onWakeup();
        }
        {}.onEnter = onEnter;
        Interceptor.attach(Module.findExportByName("libc.so", "pthread_cond_signal"), {})
        function fn_45() {
            this = this;
            r = select(arg0, arg1, arg2, arg3, arg4);
            if (!this.returnAddress.equals(cache.selectReturn)) goto`l_38`
            label`l_36`
            onReceive()
            return r;
        }
        cache;
        cache;
        cache;
        cache;
        cache;
        cache;
        cache;
        cache;
        cache;
        cache;
        cache;
        Interceptor.replace(Module.findExportByName("libc.so", "select"), new NativeCallback(fn_45, "int", ["int", "pointer", "pointer", "pointer", "pointer"]));
    }
    setupMessaging = fn_35;
    {}.modules = {};
    {}.options = {};
    cache = {};
    SERVER_CONNECTION = 12146092;
    PTHREAD_COND_WAKE_RETURN = 7720710 + 8 + 1;
    SELECT_RETURN = 1377332;
    CREATE_MESSAGE_BY_TYPE = 4829160;
    POINTER_SIZE = 4;
    malloc = new NativeFunction(Module.findExportByName("libc.so", "malloc"), "pointer", ["int"]);
    free = new NativeFunction(Module.findExportByName("libc.so", "free"), "void", ["pointer"]);
    pthread_mutex_lock = new NativeFunction(Module.findExportByName("libc.so", "pthread_mutex_lock"), "int", ["pointer"]);
    pthread_mutex_unlock = new NativeFunction(Module.findExportByName("libc.so", "pthread_mutex_unlock"), "int", ["pointer"]);
    pthread_cond_signal = new NativeFunction(Module.findExportByName("libc.so", "pthread_cond_signal"), "int", ["pointer"]);
    select = new NativeFunction(Module.findExportByName("libc.so", "select"), "int", ["int", "pointer", "pointer", "pointer", "pointer"]);
    memmove = new NativeFunction(Module.findExportByName("libc.so", "memmove"), "pointer", ["pointer", "pointer", "int"]);
    ntohs = new NativeFunction(Module.findExportByName("libc.so", "ntohs"), "uint16", ["uint16"]);
    inet_addr = new NativeFunction(Module.findExportByName("libc.so", "inet_addr"), "int", ["pointer"]);
    libc_send = new NativeFunction(Module.findExportByName("libc.so", "send"), "int", ["int", "pointer", "int", "int"]);
    libc_recv = new NativeFunction(Module.findExportByName("libc.so", "recv"), "int", ["int", "pointer", "int", "int"]);
    function _getByteStream() {
        return arg0.add(8)
    }
    {}._getByteStream = _getByteStream;
    function _getVersion() {
        return Memory.readInt(arg0.add(4))
    }
    {}._getVersion = _getVersion;
    function _setVersion() {
        Memory.writeInt(arg0.add(4), arg1);
    }
    {}._setVersion = _setVersion;
    function _getMessageType() {
        return new NativeFunction(Memory.readPointer(Memory.readPointer(arg0).add(20)), "int", ["pointer"])(arg0);
    }
    {}._getMessageType = _getMessageType;
    function _encode() {
        new NativeFunction(Memory.readPointer(Memory.readPointer(arg0).add(8)), "void", ["pointer"])(arg0);
    }
    {}._encode = _encode;
    function _decode() {
        new NativeFunction(Memory.readPointer(Memory.readPointer(arg0).add(12)), "void", ["pointer"])(arg0);
    }
    {}._decode = _decode;
    function _free() {
        new NativeFunction(Memory.readPointer(Memory.readPointer(arg0).add(24)), "void", ["pointer"])(arg0)
        new NativeFunction(Memory.readPointer(Memory.readPointer(arg0).add(4)), "void", ["pointer"])(arg0);
    }
    {}._free = _free;
    Message = {};
    function _getOffset() {
        return Memory.readInt(arg0.add(16))
    }
    {}._getOffset = _getOffset;
    function _getByteArray() {
        return Memory.readPointer(arg0.add(28))
    }
    {}._getByteArray = _getByteArray;
    function _setByteArray() {
        Memory.writePointer(arg0.add(28), arg1);
    }
    {}._setByteArray = _setByteArray;
    function _getLength() {
        return Memory.readInt(arg0.add(20))
    }
    {}._getLength = _getLength;
    function _setLength() {
        Memory.writeInt(arg0.add(20), arg1);
    }
    {}._setLength = _setLength;
    ByteStream = {};
    function _getEncodingLength() {
        return Memory.readU8(arg0.add(2)) << 16 | Memory.readU8(arg0.add(3)) << 8 | Memory.readU8(arg0.add(4));
    }
    {}._getEncodingLength = _getEncodingLength;
    function _setEncodingLength() {
        Memory.writeU8(arg0.add(2), arg1 >>> 16 & 255)
        Memory.writeU8(arg0.add(3), arg1 >>> 8 & 255)
        Memory.writeU8(arg0.add(4), arg1 & 255);
    }
    {}._setEncodingLength = _setEncodingLength;
    function _setMessageType() {
        Memory.writeU8(arg0.add(0), arg1 >>> 8 & 255)
        Memory.writeU8(arg0.add(1), arg1 & 255);
    }
    {}._setMessageType = _setMessageType;
    function _getMessageVersion() {
        return Memory.readU8(arg0.add(5)) << 8 | Memory.readU8(arg0.add(6));
    }
    {}._getMessageVersion = _getMessageVersion;
    function _setMessageVersion() {
        Memory.writeU8(arg0.add(5), arg1 >>> 8 & 255)
        Memory.writeU8(arg0.add(6), arg1 & 255);
    }
    {}._setMessageVersion = _setMessageVersion;
    function _getMessageType() {
        return Memory.readU8(arg0) << 8 | Memory.readU8(arg0.add(1));
    }
    {}._getMessageType = _getMessageType;
    Buffer = {};
    function _getCapacity() {
        return Memory.readInt(arg0.add(4))
    }
    {}._getCapacity = _getCapacity;
    function _get() {
        return Memory.readPointer(Memory.readPointer(arg0).add(POINTER_SIZE * arg1))
    }
    {}._get = _get;
    function _set() {
        Memory.writePointer(Memory.readPointer(arg0).add(POINTER_SIZE * arg1), arg2);
    }
    {}._set = _set;
    function _count() {
        return Memory.readInt(arg0.add(8))
    }
    {}._count = _count;
    function _decrementCount() {
        Memory.writeInt(arg0.add(8), Memory.readInt(arg0.add(8)) - 1);
    }
    {}._decrementCount = _decrementCount;
    function _incrementCount() {
        Memory.writeInt(arg0.add(8), Memory.readInt(arg0.add(8)) + 1);
    }
    {}._incrementCount = _incrementCount;
    function _getDequeueIndex() {
        return Memory.readInt(arg0.add(12))
    }
    {}._getDequeueIndex = _getDequeueIndex;
    function _getEnqueueIndex() {
        return Memory.readInt(arg0.add(16))
    }
    {}._getEnqueueIndex = _getEnqueueIndex;
    function _setDequeueIndex() {
        Memory.writeInt(arg0.add(12), arg1);
    }
    {}._setDequeueIndex = _setDequeueIndex;
    function _setEnqueueIndex() {
        Memory.writeInt(arg0.add(16), arg1);
    }
    {}._setEnqueueIndex = _setEnqueueIndex;
    function _enqueue() {
        pthread_mutex_lock(arg0.sub(4))
        index = MessageQueue._getEnqueueIndex(arg0);
        MessageQueue._set(arg0, index, arg1)
        MessageQueue._setEnqueueIndex(arg0, index + 1 % MessageQueue._getCapacity(arg0))
        MessageQueue._incrementCount(arg0)
        pthread_mutex_unlock(arg0.sub(4));
    }
    {}._enqueue = _enqueue;
    function _dequeue() {
        message = null;
        pthread_mutex_lock(arg0.sub(4))
        if (!MessageQueue._count(arg0)) goto`l_85`
        label`l_27`
        index = MessageQueue._getDequeueIndex(arg0);
        message = MessageQueue._get(arg0, index);
        MessageQueue._setDequeueIndex(arg0, index + 1 % MessageQueue._getCapacity(arg0))
        MessageQueue._decrementCount(arg0)
        pthread_mutex_unlock(arg0.sub(4))
        return message;
    }
    {}._dequeue = _dequeue;
    MessageQueue = {};
    function init() {
        if !arg1) goto`l_6`
        label`l_5`
        arg1
        cache.options = {};
        function fn_109() {
            Interceptor.detachAll()
            cache.base = Process.findModuleByName("libg.so").base;
            checkPackageName("com.lwitchysbrwl.client")
            showToast("t.me/fridascripts")
            cache;
            setup();
        }
        cache;
        onLoad("libg.so", fn_109);
    }
    {}.init = init;
    rpc.exports = {};
    rpc;
}
{}.1 = [fn_7, {}];
fn_1()({}, {}, [1]);

// Process exited successfully.