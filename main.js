import init, { ConrodCanvasExample } from "./pkg/conrod_canvas_example.js";

const once = (target, type) =>
  new Promise(resolve => target.addEventListener(type, resolve));

const fit_to_window = canvas => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// FIXME dirty hack for wasm_syscall
const env = {
  rust_wasm_syscall: (index, data) => {
    console.log("rust_wasm_syscall", index, data);
    // See https://github.com/rust-lang/rust/blob/master/src/libstd/sys/wasm/mod.rs
    switch (index) {
      case 6:
        return 1;
      default:
        return 0;
    }
  }
};
const instantiateStreaming = WebAssembly.instantiateStreaming;
WebAssembly.instantiateStreaming = (source, importObject) =>
  instantiateStreaming(source, {
    ...importObject,
    env
  });
const instantiate = WebAssembly.instantiate;
WebAssembly.instantiate = (bufferSource, importObject) =>
  instantiate(bufferSource, {
    ...importObject,
    env
  });

const console_error = console.error;
console.error = (...args) => {
  window.alert(...args);
  console_error(...args);
};

const img = new Image();
img.src = "./assets/images/rust.png";

Promise.all([
  init("./pkg/conrod_canvas_example_bg.wasm"),
  once(document, "DOMContentLoaded").then(() =>
    document.querySelector("canvas")
  ),
  once(img, "load").then(() =>
    window.createImageBitmap(img, { imageOrientation: "flipY" })
  )
]).then(([_, canvas, rust_logo]) => {
  const context = canvas.getContext("2d", {
    alpha: true
  });
  const app = new ConrodCanvasExample(context, rust_logo);

  window.addEventListener("resize", () => {
    fit_to_window(canvas);
    app.resize(canvas.width, canvas.height);
  });

  canvas.addEventListener("mousemove", ev => {
    const x = ev.clientX - canvas.width / 2;
    const y = ev.clientY - canvas.height / 2;
    app.mouseCursor(x, y);
  });

  canvas.addEventListener("mousedown", ev => {
    switch (ev.button) {
      case 0:
        app.pressMouseLeft();
        break;
      case 1:
        app.pressMouseMiddle();
        break;
      case 2:
        app.pressMouseRight();
        break;
      case 3:
      case 4:
      default:
        app.pressMouseUnknown();
    }
  });

  canvas.addEventListener("mouseup", ev => {
    switch (ev.button) {
      case 0:
        app.releaseMouseLeft();
        break;
      case 1:
        app.releaseMouseMiddle();
        break;
      case 2:
        app.releaseMouseRight();
        break;
      // case 3: break;
      // case 4: break;
      default:
        app.releaseMouseUnknown();
    }
  });

  canvas.addEventListener("wheel", ev => {
    const { deltaX, deltaY } = ev;
    app.scroll(deltaX, deltaY);
  });

  const frame = () => {
    app.update(canvas.width, canvas.height);
    window.requestAnimationFrame(frame);
  };

  window.dispatchEvent(new Event("resize"));
  frame();
});

// vim: set ts=2 sw=2 et:
