mod conrod_canvas;

use conrod_canvas::Renderer;
use conrod_core::event::Input;
use conrod_core::image::Map as ImageMap;
use conrod_core::input::state::mouse::Button as MouseButton;
use conrod_core::input::{Button, Motion};
use conrod_core::text::Font;
use conrod_core::{Ui, UiBuilder};
use conrod_example_shared::{DemoApp, Ids, WIN_H, WIN_W};
use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d, ImageBitmap};

#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub struct ConrodCanvasExample {
    renderer: Renderer,
    ui: Ui,
    ids: Ids,
    app: DemoApp,
    image_map: ImageMap<ImageBitmap>,
}

#[wasm_bindgen]
impl ConrodCanvasExample {
    #[wasm_bindgen(constructor)]
    pub fn new(
        context: CanvasRenderingContext2d,
        rust_logo: ImageBitmap,
    ) -> Result<ConrodCanvasExample, JsValue> {
        // Construct our `Ui`.
        let mut ui = UiBuilder::new([WIN_W as f64, WIN_H as f64])
            .theme(conrod_example_shared::theme())
            .build();

        // The `widget::Id` of each widget instantiated in `conrod_example_shared::gui`.
        let ids = Ids::new(ui.widget_id_generator());

        // Add a `Font` to the `Ui`'s `font::Map` from file.
        let font_bytes = include_bytes!("../assets/fonts/NotoSans/NotoSans-Regular.ttf");
        let font = Font::from_bytes(font_bytes.as_ref()).unwrap();
        ui.fonts.insert(font);

        // Load the Rust logo from our assets folder to use as an example image.
        let mut image_map = ImageMap::new();
        let rust_logo = image_map.insert(rust_logo);

        // A demonstration of some app state that we want to control with the conrod GUI.
        let app = DemoApp::new(rust_logo);

        // A type used for converting `conrod_core::render::Primitives`.
        let renderer = Renderer::new(context);

        Ok(ConrodCanvasExample {
            renderer,
            ui,
            ids,
            app,
            image_map,
        })
    }

    pub fn update(&mut self, width: f64, height: f64) {
        // Instantiate a GUI demonstrating every widget type provided by conrod.
        conrod_example_shared::gui(&mut self.ui.set_widgets(), &self.ids, &mut self.app);

        // Draw the `Ui`.
        if let Some(primitives) = self.ui.draw_if_changed() {
            self.renderer
                .render(primitives, width, height, &self.image_map);
        }
    }

    pub fn resize(&mut self, width: f64, height: f64) {
        self.ui.handle_event(Input::Resize(width, height));
    }

    #[wasm_bindgen(js_name=mouseCursor)]
    pub fn mouse_cursor(&mut self, x: f64, y: f64) {
        self.ui
            .handle_event(Input::Motion(Motion::MouseCursor { x, y: -y }));
    }

    pub fn scroll(&mut self, x: f64, y: f64) {
        self.ui.handle_event(Input::Motion(Motion::Scroll { x, y }));
    }

    #[wasm_bindgen(js_name=pressMouseUnknown)]
    pub fn press_mouse_unknown(&mut self) {
        self.ui
            .handle_event(Input::Press(Button::Mouse(MouseButton::Unknown)));
    }

    #[wasm_bindgen(js_name=pressMouseLeft)]
    pub fn press_mouse_left(&mut self) {
        self.ui
            .handle_event(Input::Press(Button::Mouse(MouseButton::Left)));
    }

    #[wasm_bindgen(js_name=pressMouseRight)]
    pub fn press_mouse_right(&mut self) {
        self.ui
            .handle_event(Input::Press(Button::Mouse(MouseButton::Right)));
    }

    #[wasm_bindgen(js_name=pressMouseMiddle)]
    pub fn press_mouse_middle(&mut self) {
        self.ui
            .handle_event(Input::Press(Button::Mouse(MouseButton::Middle)));
    }

    #[wasm_bindgen(js_name=releaseMouseUnknown)]
    pub fn release_mouse_unknown(&mut self) {
        self.ui
            .handle_event(Input::Release(Button::Mouse(MouseButton::Unknown)));
    }

    #[wasm_bindgen(js_name=releaseMouseLeft)]
    pub fn release_mouse_left(&mut self) {
        self.ui
            .handle_event(Input::Release(Button::Mouse(MouseButton::Left)));
    }

    #[wasm_bindgen(js_name=releaseMouseRight)]
    pub fn release_mouse_right(&mut self) {
        self.ui
            .handle_event(Input::Release(Button::Mouse(MouseButton::Right)));
    }

    #[wasm_bindgen(js_name=releaseMouseMiddle)]
    pub fn release_mouse_middle(&mut self) {
        self.ui
            .handle_event(Input::Release(Button::Mouse(MouseButton::Middle)));
    }
}
