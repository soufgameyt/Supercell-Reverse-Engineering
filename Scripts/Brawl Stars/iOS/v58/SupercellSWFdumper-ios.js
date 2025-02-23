// https://github.com/Shei-Bi/sc-dumper

const base = Module.getBaseAddress('laser');

function ReadStringFromStringObject(strObject) {
    const stringByteLength = strObject.add(4).readU32();
    if (stringByteLength > 7) {
        return strObject.add(8).readPointer().readUtf8String(stringByteLength);
    }
    return strObject.add(8).readUtf8String(stringByteLength);
}

function ByteLength(str) {
    let l = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7F && code <= 0x7FF) l++;
        else if (code > 0x7FF && code <= 0xFFFF) l += 2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--;
    }
    return l;
}
const malloc = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'malloc'), 'pointer', ['uint']);
const free = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'free'), 'void', ['pointer']);
const tmpfile = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'tmpfile'), 'pointer', []);
const fopen = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'fopen'), 'pointer', ['pointer', 'pointer']);
const fwrite = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'fwrite'), 'int', ["pointer", "int", "int", "pointer"]);
const fseek = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'fseek'), 'int', ["pointer", "int", "int"]);
const ftell = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'ftell'), 'int', ["pointer"]);
const fread = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'fread'), 'int', ["pointer", "int", "int", "pointer"]);
const fclose = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'fclose'), 'void', ["pointer"]);
const strlen = new NativeFunction(Module.getExportByName('libSystem.B.dylib', 'strlen'), 'int', ["pointer"]);

function CreateNewStringObject(str, at = 0) {
    const charLen = str.length;
    const byteLen = ByteLength(str);
    const stringObjectPtr = at ? at : malloc(16);
    stringObjectPtr.writeInt(charLen);
    stringObjectPtr.add(4).writeInt(byteLen);
    if (byteLen > 7) {
        const longStringAllocPtr = malloc(byteLen + 1);
        longStringAllocPtr.writeUtf8String(str);
        stringObjectPtr.add(8).writePointer(longStringAllocPtr);
    }
    else {
        stringObjectPtr.add(8).writeUtf8String(str);
    }
    return stringObjectPtr;
}
function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}
class SupercellSWF {
    constructor(impl) {
        this.impl = impl;
    }
    data() {
        fseek(this.impl, 0, 2);
        var l = ftell(this.impl);
        fseek(this.impl, 0, 0);
        var buf = Memory.alloc(l);
        fread(buf, 1, l, this.impl);
        return buf.readByteArray(l);
    }
    toHexString() {
        return buf2hex(this.data());
    }
    skip(value) {
        fseek(this.impl, value, 1);

    }
    write_int(value) {
        var e = Memory.alloc(4);
        e.writeInt(value);
        fwrite(e, 1, 4, this.impl);
    }
    write_unsigned_int(value) {
        var e = Memory.alloc(4);
        e.writeU32(value);
        fwrite(e, 1, 4, this.impl);
    }
    write_short(value) {
        var e = Memory.alloc(2);
        e.writeShort(value);
        fwrite(e, 1, 2, this.impl);
    }
    write_unsigned_short(value) {
        var e = Memory.alloc(2);
        e.writeU16(value);
        fwrite(e, 1, 2, this.impl);
    }
    write_unsigned_byte(value) {
        var e = Memory.alloc(1);
        e.writeU8(value);
        fwrite(e, 1, 1, this.impl);
    }
    write_bool(value) {
        var e = Memory.alloc(1);
        e.writeU8(value);
        fwrite(e, 1, 1, this.impl);
    }
    write_string(value) {
        var string_size = value.isNull() ? 0 : strlen(value);
        if (string_size) {
            this.write_unsigned_byte(string_size);
            fwrite(value, string_size, 1, this.impl);
        }
        else {
            this.write_unsigned_byte(0xFF);
        }
    }
}
const SupercellSWF_hasExportName = new NativeFunction(base.add(0xBB4388), 'uint16', ["pointer", "pointer"]);
// const sub_100BB66A0 = new NativeFunction(base.add(0xBB66A0), 'pointer', ["pointer", "pointer"]);
function FillWithZeroes(dest, len) {
    dest.writeByteArray(new Uint8Array(len).buffer);
}
function ClearStringObjects() {
    for (const ptr of arguments) {
        if (ptr.add(4).readU32() > 7) {
            free(ptr.add(8).readPointer());
        }
        FillWithZeroes(ptr, 16);
        free(ptr);
    }
}
function generateVertexIndices(count) {
    var l = [0];
    for (var i = 1; i < Math.floor(count / 2) * 2; i += 2) {
        l.push(i);
    }
    for (var i = Math.floor((count - 1) / 2) * 2; i > 0; i -= 2) {
        l.push(i);
    }
    return l;
}
Memory.patchCode(base.add(0xBB44B8), 4, code => {
    code.writeByteArray([0x60, 0x52, 0xC0, 0x79]);
    return;
});
var savePath = "";
Interceptor.attach(base.add(0xBC14BC), {
    onEnter(args) {
        savePath = ReadStringFromStringObject(base.add(0x116E380));
        this.name = ReadStringFromStringObject(args[2].add(144));
        console.log("begin to load " + this.name);
        this.self = args[2];
    },
    onLeave(retval) {
        // return;
        // if (this.name != "sc/ui.sc") return;
        var swf = this.self;
        // var s = new SupercellSWF(tmpfile());
        var s = new SupercellSWF(fopen(Memory.allocUtf8String(savePath + "/" + this.name.replace("/", " ")), Memory.allocUtf8String("w")));

        var shapes_size = swf.add(100).readInt();
        var movieclips_size = swf.add(104).readInt();
        var textures_size = swf.add(108).readInt();
        var textfields_size = swf.add(116).readInt();
        var matrix_bank_0 = swf.add(344).readPointer().readPointer();
        var old_matrix_size = matrix_bank_0.add(24).readPointer().sub(4).readInt();
        var old_color_transform_size = matrix_bank_0.add(32).readPointer().sub(4).readInt();
        var matrix_bank_size = swf.add(356).readInt();
        console.log(`shapes_size:${shapes_size}\nmovieclips_size:${movieclips_size}\ntextures_size:${textures_size}\ntextfields_size:${textfields_size}\nmatrix_bank_size:${matrix_bank_size}`);
        for (var i = 0; i < textures_size; i++) {
            var texture = swf.add(160).readPointer().add(208 * i);
            console.log(`texture #${i} width:${texture.add(128).readInt()} height:${texture.add(132).readInt()}`)
        }
        // return;
        s.write_unsigned_short(shapes_size);
        s.write_unsigned_short(movieclips_size);
        s.write_unsigned_short(textures_size);
        s.write_unsigned_short(textfields_size);
        s.write_unsigned_short(old_matrix_size);
        s.write_unsigned_short(old_color_transform_size);
        s.skip(5);

        var exportNameSize = swf.add(112).readInt();
        s.write_unsigned_short(exportNameSize);
        for (var i = 0; i < exportNameSize; i++) {
            var name = swf.add(288).readPointer().add(8 * i).readPointer().readUtf8String();
            var so = CreateNewStringObject(name);
            s.write_unsigned_short(SupercellSWF_hasExportName(swf, so));
            ClearStringObjects(so);
        }
        for (var i = 0; i < exportNameSize; i++) {
            s.write_string(swf.add(288).readPointer().add(8 * i).readPointer());
        }
        console.log("export names exported");

        //tags

        s.write_unsigned_byte(26);//TAG_USE_EXTERNAL_TEXTURE
        s.write_int(0);

        for (var i = 0; i < textures_size; i++) {
            var texture = swf.add(160).readPointer().add(208 * i);
            s.write_unsigned_byte(45);//TAG_TEXTURE_9
            s.write_int(9);//lets hope it recognizes all tags 
            s.write_int(0);
            s.write_unsigned_byte(0);//RGBA8
            s.write_unsigned_short(texture.add(128).readInt());
            s.write_unsigned_short(texture.add(132).readInt());
        }
        console.log("textures exported");

        for (var i = 0; i < matrix_bank_size; i++) {
            var matrix_bank = swf.add(344).readPointer().add(8 * i).readPointer();
            // var matrix_count = matrix_bank.add(8).readInt();
            // var colors_count = matrix_bank.add(12).readInt();

            //note: when loaded from flatbuffer scMatrixBank wont contain size data, so the last resort is to read the size malloced by operator new[]
            var matrix_count = matrix_bank.add(24).readPointer().sub(4).readInt();
            var colors_count = matrix_bank.add(32).readPointer().sub(4).readInt();
            if (i != 0) {
                s.write_unsigned_byte(42);//TAG_MATRIX_BANK
                s.write_int(4);
                s.write_unsigned_short(matrix_count);
                s.write_unsigned_short(colors_count);
            }
            for (var j = 0; j < matrix_count; j++) {
                var matrix = matrix_bank.add(24).readPointer().add(24 * j);
                s.write_unsigned_byte(36);//TAG_MATRIX_2x3_2
                s.write_int(24);
                s.write_int(matrix.readFloat() * 65536);
                s.write_int(matrix.add(4).readFloat() * 65536);
                s.write_int(matrix.add(8).readFloat() * 65536);
                s.write_int(matrix.add(12).readFloat() * 65536);
                s.write_int(matrix.add(16).readFloat() * 20.0);
                s.write_int(matrix.add(20).readFloat() * 20.0);
            }
            for (var j = 0; j < colors_count; j++) {
                var color_transform = matrix_bank.add(32).readPointer().add(7 * j);
                s.write_unsigned_byte(9);//TAG_COLOR_TRANSFORM
                s.write_int(7);
                s.write_unsigned_byte(color_transform.add(4).readU8());
                s.write_unsigned_byte(color_transform.add(5).readU8());
                s.write_unsigned_byte(color_transform.add(6).readU8());
                s.write_unsigned_byte(color_transform.add(3).readU8());
                s.write_unsigned_byte(color_transform.readU8());
                s.write_unsigned_byte(color_transform.add(1).readU8());
                s.write_unsigned_byte(color_transform.add(2).readU8());
            }
        }
        console.log("matrix banks exported");

        var movieclip_modifiers_size = swf.add(120).readInt();
        s.write_unsigned_byte(37);
        s.write_int(2);
        s.write_unsigned_short(movieclip_modifiers_size);
        for (var i = 0; i < movieclip_modifiers_size; i++) {
            var movieclipmodifier = swf.add(192).readPointer().add(16 * i);
            var tag = movieclipmodifier.add(10).readU8();
            if (tag < 38 || tag > 40) {
                console.log("abort: movieclipmodifier unexcepted tag");
                return;
            }
            s.write_unsigned_byte(tag);
            s.write_int(2);
            s.write_unsigned_short(movieclipmodifier.add(8).readU16());
        }
        console.log("movieclip modifiers exported");

        for (var i = 0; i < shapes_size; i++) {
            var shape = swf.add(184).readPointer().add(32 * i);
            var tag = 18;
            s.write_unsigned_byte(tag);
            s.write_int(1919810);//lets hope it recognizes all tags 

            s.write_unsigned_short(shape.add(8).readU16());
            var command_count = shape.add(10).readU16();
            s.write_unsigned_short(command_count);
            var vertice_count = 0;
            for (var j = 0; j < command_count; j++)
                vertice_count += shape.add(16).readPointer().add(48 * j).add(4).readU8();
            s.write_unsigned_short(vertice_count);//vertice count
            for (var j = 0; j < command_count; j++) {
                var command = shape.add(16).readPointer().add(48 * j);
                s.write_unsigned_byte(22);
                s.write_int(1919810);//lets hope it recognizes all tags 
                s.write_unsigned_byte(command.readU8());
                var verticesCount = command.add(4).readU8();
                s.write_unsigned_byte(verticesCount);

                var l = generateVertexIndices(verticesCount);
                for (var k = 0; k < verticesCount; k++) {
                    var vertice = command.add(8).readPointer().add(12 * l[k]);
                    s.write_int(vertice.readFloat() * 20.0);
                    s.write_int(vertice.add(4).readFloat() * 20.0);
                }
                for (var k = 0; k < verticesCount; k++) {
                    var vertice = command.add(8).readPointer().add(12 * l[k]);
                    s.write_unsigned_short(vertice.add(8).readU16());
                    s.write_unsigned_short(vertice.add(10).readU16());
                }
            }
            s.write_unsigned_byte(0);//end
            s.write_int(0);
        }
        console.log("shapes exported");

        for (var i = 0; i < textfields_size; i++) {
            var textfield = swf.add(168).readPointer().add(160 * i);
            var tag = 7;//idk
            s.write_unsigned_byte(tag);
            s.write_int(1919810);//lets hope it recognizes all tags 

            s.write_unsigned_short(textfield.add(8).readU16());
            s.write_string(textfield.add(16).readPointer());
            s.write_unsigned_int(textfield.add(32).readU32());
            var flag = textfield.add(152).readU8();
            s.write_bool(flag & 4);
            s.write_bool(flag & 8);
            s.write_bool(flag & 16);
            s.write_bool(0);//false
            s.write_unsigned_byte(textfield.add(153).readU8());
            s.write_unsigned_byte(textfield.add(154).readU8());
            s.write_short(textfield.add(24).readShort());
            s.write_short(textfield.add(26).readShort());
            s.write_short(textfield.add(28).readShort());
            s.write_short(textfield.add(30).readShort());
            s.write_bool(flag & 2);
            s.write_string(textfield.add(40).readPointer());
            //wtf how do i know the tag lmao
        }
        console.log("textfields exported");

        for (var i = 0; i < movieclips_size; i++) {
            var movieclip = swf.add(176).readPointer().add(72 * i);
            s.write_unsigned_byte(12);//TAG_MOVIE_CLIP_3
            s.write_int(1919810);//lets hope it recognizes all tags

            s.write_unsigned_short(movieclip.add(48).readU16());
            s.write_unsigned_byte(movieclip.add(56).readU8() & 127);
            // console.log("framerate:" + movieclip.add(56).readU8() & 127);
            var frame_count = movieclip.add(50).readU16();
            s.write_unsigned_short(frame_count);
            var frames_vector = movieclip.add(40).readPointer();
            // var frame_elements_count = (frame_elements_vector.add(32).readPointer().sub(frame_elements_vector.readPointer())).toInt32() / 2 / 3;
            var frame_elements_count = 0;
            for (var j = 0; j < frame_count; j++) {
                frame_elements_count += frames_vector.add(32 * j).add(8).readU16();
            }
            // console.log("frame_elements_count: " + frame_elements_count);
            s.write_int(frame_elements_count);
            for (var j = 0; j < frame_elements_count * 3; j++) {
                // console.log(frames_vector.readPointer().add(2 * j).readU16());
                s.write_unsigned_short(frames_vector.readPointer().add(2 * j).readU16());
            }
            var instance_count = movieclip.add(52).readU16();
            s.write_unsigned_short(instance_count);
            for (var j = 0; j < instance_count; j++) {
                s.write_unsigned_short(movieclip.add(16).readPointer().add(2 * j).readU16());
            }
            for (var j = 0; j < instance_count; j++) {
                s.write_unsigned_byte(movieclip.add(24).readPointer().add(j).readU8());
            }
            if (movieclip.add(32).readPointer().isNull())
                for (var j = 0; j < instance_count; j++) {
                    s.write_string(NULL);
                }
            else
                for (var j = 0; j < instance_count; j++) {
                    s.write_string(movieclip.add(32).readPointer().add(8 * j).readPointer());
                }

            s.write_unsigned_byte(41);//TAG_MATRIX_BANK_INDEX
            s.write_int(1);
            s.write_unsigned_byte(movieclip.add(57).readU8() & 127);
            for (var j = 0; j < frame_count; j++) {
                var frame = frames_vector.add(32 * j);
                s.write_unsigned_byte(11);//TAG_MOVIE_CLIP_FRAME_2
                s.write_int(1919810);//lets hope it recognizes all tags
                s.write_unsigned_short(frame.add(8).readU16());
                s.write_string(frame.add(16).readPointer());
            }
            var scaling_grid = movieclip.add(64).readPointer();
            if (!scaling_grid.isNull()) {
                s.write_unsigned_byte(31);//TAG_SCALING_GRID
                s.write_int(20);
                s.write_int(scaling_grid.readFloat() * 20.0);
                s.write_int(scaling_grid.add(4).readFloat() * 20.0);
                s.write_int((scaling_grid.add(8).readFloat() - scaling_grid.readFloat()) * 20.0);
                s.write_int((scaling_grid.add(12).readFloat() - scaling_grid.add(4).readFloat()) * 20.0);
            }
            s.write_unsigned_byte(0);//TAG_END
            s.write_int(0);
        }
        console.log("movieclips exported");

        s.write_unsigned_byte(0);//TAG_END
        s.write_int(0);

        fclose(s.impl);
    }
});