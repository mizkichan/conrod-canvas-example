.PHONY: debug release bindgen build clean

WASM = target/wasm32-unknown-unknown/$(BUILD)/conrod_canvas_example.wasm

debug: BUILD = debug
debug: bindgen

release: BUILD = release
release: BUILDFLAGS += --release
release: bindgen

bindgen: $(WASM)
	wasm-bindgen --target web --out-dir pkg $(WASM)

$(WASM): src/lib.rs
	xargo build $(BUILDFLAGS) --target wasm32-unknown-unknown

clean:
	$(RM) -r pkg
	cargo clean
