/* tslint:disable */
/**
*/
export function start(): void;
/**
*/
export class ConrodCanvasExample {
  free(): void;
/**
* @param {any} context 
* @param {any} rust_logo 
* @returns {ConrodCanvasExample} 
*/
  constructor(context: any, rust_logo: any);
/**
* @param {number} width 
* @param {number} height 
*/
  update(width: number, height: number): void;
/**
* @param {number} width 
* @param {number} height 
*/
  resize(width: number, height: number): void;
/**
* @param {number} x 
* @param {number} y 
*/
  mouseCursor(x: number, y: number): void;
/**
* @param {number} x 
* @param {number} y 
*/
  scroll(x: number, y: number): void;
/**
*/
  pressMouseUnknown(): void;
/**
*/
  pressMouseLeft(): void;
/**
*/
  pressMouseRight(): void;
/**
*/
  pressMouseMiddle(): void;
/**
*/
  releaseMouseUnknown(): void;
/**
*/
  releaseMouseLeft(): void;
/**
*/
  releaseMouseRight(): void;
/**
*/
  releaseMouseMiddle(): void;
}

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path?: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        