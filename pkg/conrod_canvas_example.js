import { draw_as_image_bitmap } from './snippets/conrod-canvas-example-ce2e5cd2465f6a41/misc.js';

let wasm;

/**
*/
export function start() {
    wasm.start();
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
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

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

let cachegetInt32Memory = null;
function getInt32Memory() {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function debugString(val) {
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
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
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
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
*/
export class ConrodCanvasExample {

    static __wrap(ptr) {
        const obj = Object.create(ConrodCanvasExample.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_conrodcanvasexample_free(ptr);
    }
    /**
    * @param {any} context
    * @param {any} rust_logo
    * @returns {ConrodCanvasExample}
    */
    constructor(context, rust_logo) {
        const ret = wasm.conrodcanvasexample_new(addHeapObject(context), addHeapObject(rust_logo));
        return ConrodCanvasExample.__wrap(ret);
    }
    /**
    * @param {number} width
    * @param {number} height
    */
    update(width, height) {
        wasm.conrodcanvasexample_update(this.ptr, width, height);
    }
    /**
    * @param {number} width
    * @param {number} height
    */
    resize(width, height) {
        wasm.conrodcanvasexample_resize(this.ptr, width, height);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    mouseCursor(x, y) {
        wasm.conrodcanvasexample_mouseCursor(this.ptr, x, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    scroll(x, y) {
        wasm.conrodcanvasexample_scroll(this.ptr, x, y);
    }
    /**
    */
    pressMouseUnknown() {
        wasm.conrodcanvasexample_pressMouseUnknown(this.ptr);
    }
    /**
    */
    pressMouseLeft() {
        wasm.conrodcanvasexample_pressMouseLeft(this.ptr);
    }
    /**
    */
    pressMouseRight() {
        wasm.conrodcanvasexample_pressMouseRight(this.ptr);
    }
    /**
    */
    pressMouseMiddle() {
        wasm.conrodcanvasexample_pressMouseMiddle(this.ptr);
    }
    /**
    */
    releaseMouseUnknown() {
        wasm.conrodcanvasexample_releaseMouseUnknown(this.ptr);
    }
    /**
    */
    releaseMouseLeft() {
        wasm.conrodcanvasexample_releaseMouseLeft(this.ptr);
    }
    /**
    */
    releaseMouseRight() {
        wasm.conrodcanvasexample_releaseMouseRight(this.ptr);
    }
    /**
    */
    releaseMouseMiddle() {
        wasm.conrodcanvasexample_releaseMouseMiddle(this.ptr);
    }
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_drawasimagebitmap_6085f59c99780b41 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        const v0 = getClampedArrayU8FromWasm(arg1, arg2).slice();
        wasm.__wbindgen_free(arg1, arg2 * 1);
        draw_as_image_bitmap(getObject(arg0), v0, arg3 >>> 0, arg4, arg5);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ret0 = passStringToWasm(ret);
        const ret1 = WASM_VECTOR_LEN;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        const v0 = getStringFromWasm(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 1);
        console.error(v0);
    };
    imports.wbg.__widl_f_draw_image_with_image_bitmap_and_sw_and_sh_and_dx_and_dy_and_dw_and_dh_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        try {
            getObject(arg0).drawImage(getObject(arg1), arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_begin_path_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).beginPath();
    };
    imports.wbg.__widl_f_clip_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).clip();
    };
    imports.wbg.__widl_f_fill_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).fill();
    };
    imports.wbg.__widl_f_set_fill_style_CanvasRenderingContext2D = function(arg0, arg1) {
        getObject(arg0).fillStyle = getObject(arg1);
    };
    imports.wbg.__widl_f_close_path_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).closePath();
    };
    imports.wbg.__widl_f_line_to_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        getObject(arg0).lineTo(arg1, arg2);
    };
    imports.wbg.__widl_f_move_to_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        getObject(arg0).moveTo(arg1, arg2);
    };
    imports.wbg.__widl_f_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).rect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__widl_f_clear_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__widl_f_fill_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__widl_f_restore_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).restore();
    };
    imports.wbg.__widl_f_save_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).save();
    };
    imports.wbg.__widl_f_scale_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        try {
            getObject(arg0).scale(arg1, arg2);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_translate_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        try {
            getObject(arg0).translate(arg1, arg2);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_width_ImageBitmap = function(arg0) {
        const ret = getObject(arg0).width;
        return ret;
    };
    imports.wbg.__widl_f_height_ImageBitmap = function(arg0) {
        const ret = getObject(arg0).height;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ret0 = passStringToWasm(ret);
        const ret1 = WASM_VECTOR_LEN;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm(arg0, arg1));
    };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
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

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
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

