const __exports = {};
import { draw_as_image_bitmap } from './snippets/conrod-canvas-example-ce2e5cd2465f6a41/misc.js';

let wasm;

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let cachegetUint8ClampedMemory = null;
function getUint8ClampedMemory() {
    if (cachegetUint8ClampedMemory === null || cachegetUint8ClampedMemory.buffer !== wasm.memory.buffer) {
        cachegetUint8ClampedMemory = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachegetUint8ClampedMemory;
}

function getClampedArrayU8FromWasm(ptr, len) {
    return getUint8ClampedMemory().subarray(ptr / 1, ptr / 1 + len);
}

function __wbg_drawasimagebitmap_6085f59c99780b41(arg0, arg1, arg2, arg3, arg4, arg5) {
    let varg1 = getClampedArrayU8FromWasm(arg1, arg2);

    varg1 = varg1.slice();
    wasm.__wbindgen_free(arg1, arg2 * 1);

    draw_as_image_bitmap(getObject(arg0), varg1, arg3, arg4, arg5);
}

__exports.__wbg_drawasimagebitmap_6085f59c99780b41 = __wbg_drawasimagebitmap_6085f59c99780b41;
/**
* @returns {void}
*/
export function start() {
    return wasm.start();
}

__exports.start = start;

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);

    console.error(varg0);
}

__exports.__wbg_error_4bb6c2a97407129a = __wbg_error_4bb6c2a97407129a;

function __wbg_new_59cb74e423758ede() {
    return addHeapObject(new Error());
}

__exports.__wbg_new_59cb74e423758ede = __wbg_new_59cb74e423758ede;

let cachedTextEncoder = new TextEncoder('utf-8');

let WASM_VECTOR_LEN = 0;

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {

        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let writeOffset = 0;
        while (true) {
            const view = getUint8Memory().subarray(ptr + writeOffset, ptr + size);
            const { read, written } = cachedTextEncoder.encodeInto(arg, view);
            arg = arg.substring(read);
            writeOffset += written;
            if (arg.length === 0) {
                break;
            }
            ptr = wasm.__wbindgen_realloc(ptr, size, size * 2);
            size *= 2;
        }
        WASM_VECTOR_LEN = writeOffset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {

        const buf = cachedTextEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    };
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function __wbg_stack_558ba5917b466edd(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).stack);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

__exports.__wbg_stack_558ba5917b466edd = __wbg_stack_558ba5917b466edd;

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

function __widl_f_draw_image_with_image_bitmap_and_sw_and_sh_and_dx_and_dy_and_dw_and_dh_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, exnptr) {
    try {
        getObject(arg0).drawImage(getObject(arg1), arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_draw_image_with_image_bitmap_and_sw_and_sh_and_dx_and_dy_and_dw_and_dh_CanvasRenderingContext2D = __widl_f_draw_image_with_image_bitmap_and_sw_and_sh_and_dx_and_dy_and_dw_and_dh_CanvasRenderingContext2D;

function __widl_f_begin_path_CanvasRenderingContext2D(arg0) {
    getObject(arg0).beginPath();
}

__exports.__widl_f_begin_path_CanvasRenderingContext2D = __widl_f_begin_path_CanvasRenderingContext2D;

function __widl_f_clip_CanvasRenderingContext2D(arg0) {
    getObject(arg0).clip();
}

__exports.__widl_f_clip_CanvasRenderingContext2D = __widl_f_clip_CanvasRenderingContext2D;

function __widl_f_fill_CanvasRenderingContext2D(arg0) {
    getObject(arg0).fill();
}

__exports.__widl_f_fill_CanvasRenderingContext2D = __widl_f_fill_CanvasRenderingContext2D;

function __widl_f_set_fill_style_CanvasRenderingContext2D(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
}

__exports.__widl_f_set_fill_style_CanvasRenderingContext2D = __widl_f_set_fill_style_CanvasRenderingContext2D;

function __widl_f_close_path_CanvasRenderingContext2D(arg0) {
    getObject(arg0).closePath();
}

__exports.__widl_f_close_path_CanvasRenderingContext2D = __widl_f_close_path_CanvasRenderingContext2D;

function __widl_f_line_to_CanvasRenderingContext2D(arg0, arg1, arg2) {
    getObject(arg0).lineTo(arg1, arg2);
}

__exports.__widl_f_line_to_CanvasRenderingContext2D = __widl_f_line_to_CanvasRenderingContext2D;

function __widl_f_move_to_CanvasRenderingContext2D(arg0, arg1, arg2) {
    getObject(arg0).moveTo(arg1, arg2);
}

__exports.__widl_f_move_to_CanvasRenderingContext2D = __widl_f_move_to_CanvasRenderingContext2D;

function __widl_f_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).rect(arg1, arg2, arg3, arg4);
}

__exports.__widl_f_rect_CanvasRenderingContext2D = __widl_f_rect_CanvasRenderingContext2D;

function __widl_f_clear_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
}

__exports.__widl_f_clear_rect_CanvasRenderingContext2D = __widl_f_clear_rect_CanvasRenderingContext2D;

function __widl_f_fill_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
}

__exports.__widl_f_fill_rect_CanvasRenderingContext2D = __widl_f_fill_rect_CanvasRenderingContext2D;

function __widl_f_restore_CanvasRenderingContext2D(arg0) {
    getObject(arg0).restore();
}

__exports.__widl_f_restore_CanvasRenderingContext2D = __widl_f_restore_CanvasRenderingContext2D;

function __widl_f_save_CanvasRenderingContext2D(arg0) {
    getObject(arg0).save();
}

__exports.__widl_f_save_CanvasRenderingContext2D = __widl_f_save_CanvasRenderingContext2D;

function __widl_f_scale_CanvasRenderingContext2D(arg0, arg1, arg2, exnptr) {
    try {
        getObject(arg0).scale(arg1, arg2);
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_scale_CanvasRenderingContext2D = __widl_f_scale_CanvasRenderingContext2D;

function __widl_f_translate_CanvasRenderingContext2D(arg0, arg1, arg2, exnptr) {
    try {
        getObject(arg0).translate(arg1, arg2);
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_translate_CanvasRenderingContext2D = __widl_f_translate_CanvasRenderingContext2D;

function __widl_f_width_ImageBitmap(arg0) {
    return getObject(arg0).width;
}

__exports.__widl_f_width_ImageBitmap = __widl_f_width_ImageBitmap;

function __widl_f_height_ImageBitmap(arg0) {
    return getObject(arg0).height;
}

__exports.__widl_f_height_ImageBitmap = __widl_f_height_ImageBitmap;

function __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }

__exports.__wbindgen_string_new = __wbindgen_string_new;

function __wbindgen_debug_string(i, len_ptr) {
    const debug_str =
    val => {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
;
const toString = Object.prototype.toString;
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}

__exports.__wbindgen_debug_string = __wbindgen_debug_string;

function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

__exports.__wbindgen_throw = __wbindgen_throw;

function freeConrodCanvasExample(ptr) {

    wasm.__wbg_conrodcanvasexample_free(ptr);
}
/**
*/
export class ConrodCanvasExample {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeConrodCanvasExample(ptr);
    }

    /**
    * @param {any} context
    * @param {any} rust_logo
    * @returns {}
    */
    constructor(context, rust_logo) {
        this.ptr = wasm.conrodcanvasexample_new(addHeapObject(context), addHeapObject(rust_logo));
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {void}
    */
    update(width, height) {
        return wasm.conrodcanvasexample_update(this.ptr, width, height);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {void}
    */
    resize(width, height) {
        return wasm.conrodcanvasexample_resize(this.ptr, width, height);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {void}
    */
    mouseCursor(x, y) {
        return wasm.conrodcanvasexample_mouseCursor(this.ptr, x, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {void}
    */
    scroll(x, y) {
        return wasm.conrodcanvasexample_scroll(this.ptr, x, y);
    }
    /**
    * @returns {void}
    */
    pressMouseUnknown() {
        return wasm.conrodcanvasexample_pressMouseUnknown(this.ptr);
    }
    /**
    * @returns {void}
    */
    pressMouseLeft() {
        return wasm.conrodcanvasexample_pressMouseLeft(this.ptr);
    }
    /**
    * @returns {void}
    */
    pressMouseRight() {
        return wasm.conrodcanvasexample_pressMouseRight(this.ptr);
    }
    /**
    * @returns {void}
    */
    pressMouseMiddle() {
        return wasm.conrodcanvasexample_pressMouseMiddle(this.ptr);
    }
    /**
    * @returns {void}
    */
    releaseMouseUnknown() {
        return wasm.conrodcanvasexample_releaseMouseUnknown(this.ptr);
    }
    /**
    * @returns {void}
    */
    releaseMouseLeft() {
        return wasm.conrodcanvasexample_releaseMouseLeft(this.ptr);
    }
    /**
    * @returns {void}
    */
    releaseMouseRight() {
        return wasm.conrodcanvasexample_releaseMouseRight(this.ptr);
    }
    /**
    * @returns {void}
    */
    releaseMouseMiddle() {
        return wasm.conrodcanvasexample_releaseMouseMiddle(this.ptr);
    }
}

__exports.ConrodCanvasExample = ConrodCanvasExample;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function __wbindgen_object_drop_ref(i) { dropObject(i); }

__exports.__wbindgen_object_drop_ref = __wbindgen_object_drop_ref;

function init(module_or_path, maybe_memory) {
    let result;
    const imports = { './conrod_canvas_example': __exports };
    if (module_or_path instanceof URL || typeof module_or_path === 'string' || module_or_path instanceof Request) {

        const response = fetch(module_or_path);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module_or_path, imports)
        .then(instance => {
            return { instance, module: module_or_path };
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;
        wasm.__wbindgen_start();
        return wasm;
    });
}

export default init;

