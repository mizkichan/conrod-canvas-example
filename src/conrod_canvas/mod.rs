use conrod_core::color;
use conrod_core::color::Rgba;
use conrod_core::image::Map as ImageMap;
use conrod_core::render::{Primitive, PrimitiveKind, PrimitiveWalker};
use conrod_core::widget::primitive::shape::triangles::Triangle;
use conrod_core::Color;
use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;
use web_sys::{CanvasRenderingContext2d, ImageBitmap};

#[wasm_bindgen(module = "/misc.js")]
extern "C" {
    fn draw_as_image_bitmap(
        context: &CanvasRenderingContext2d,
        data: Clamped<Vec<u8>>,
        width: usize,
        dx: f64,
        dy: f64,
    );
}

#[derive(Debug)]
pub struct Renderer {
    context: CanvasRenderingContext2d,
    dpi_factor: f32,
}

impl Renderer {
    pub fn new(context: CanvasRenderingContext2d) -> Renderer {
        Renderer {
            context,
            dpi_factor: 1.0, // TODO should be set by user
        }
    }

    pub fn render<P>(
        &self,
        mut primitives: P,
        width: f64,
        height: f64,
        image_map: &ImageMap<ImageBitmap>,
    ) where
        P: PrimitiveWalker,
    {
        self.context.clear_rect(0.0, 0.0, width, height);

        self.context.save();
        self.context.translate(width / 2.0, height / 2.0).unwrap();
        self.context.scale(1.0, -1.0).unwrap();

        while let Some(Primitive {
            id: _,
            kind,
            scizzor,
            rect,
        }) = primitives.next_primitive()
        {
            self.context.save();
            self.context
                .rect(scizzor.left(), scizzor.bottom(), scizzor.w(), scizzor.h());
            self.context.clip();

            match kind {
                PrimitiveKind::Rectangle { color } => {
                    self.context
                        .set_fill_style(&JsValue::from(color_to_style(&color)));
                    self.context
                        .fill_rect(rect.left(), rect.bottom(), rect.w(), rect.h());
                }

                PrimitiveKind::TrianglesSingleColor { color, triangles } => {
                    self.context
                        .set_fill_style(&JsValue::from(rgba_to_style(&color)));
                    for &Triangle([[x1, y1], [x2, y2], [x3, y3]]) in triangles {
                        self.context.begin_path();
                        self.context.move_to(x1, y1);
                        self.context.line_to(x2, y2);
                        self.context.line_to(x3, y3);
                        self.context.close_path();
                        self.context.fill();
                    }
                }

                PrimitiveKind::TrianglesMultiColor { triangles } => {
                    for &Triangle([([x1, y1], c1), ([x2, y2], c2), ([x3, y3], c3)]) in triangles {
                        assert_eq!(c1, c2);
                        assert_eq!(c1, c3);
                        self.context
                            .set_fill_style(&JsValue::from(rgba_to_style(&c1)));
                        self.context.begin_path();
                        self.context.move_to(x1, y1);
                        self.context.line_to(x2, y2);
                        self.context.line_to(x3, y3);
                        self.context.close_path();
                        self.context.fill();
                    }
                }

                PrimitiveKind::Image {
                    image_id,
                    color,
                    source_rect,
                } => {
                    assert!(color.is_none());
                    assert!(source_rect.is_none());
                    let sx = 0.0;
                    let sy = 0.0;
                    let sw = image_map[&image_id].width() as f64;
                    let sh = image_map[&image_id].height() as f64;
                    let dx = rect.left();
                    let dy = rect.top();
                    let dw = rect.w();
                    let dh = rect.h();
                    self.context.save();
                    self.context.translate(dx, dy).unwrap();
                    self.context.scale(1.0, -1.0).unwrap();
                    self.context
                        .draw_image_with_image_bitmap_and_sw_and_sh_and_dx_and_dy_and_dw_and_dh(
                            &image_map[&image_id],
                            sx,
                            sy,
                            sw,
                            sh,
                            0.0,
                            0.0,
                            dw,
                            dh,
                        )
                        .unwrap();
                    self.context.restore();
                }

                PrimitiveKind::Text {
                    color,
                    text,
                    font_id: _,
                } => {
                    self.context
                        .set_fill_style(&JsValue::from(color_to_style(&color)));
                    for glyph in text.positioned_glyphs(self.dpi_factor) {
                        let bb = match glyph.pixel_bounding_box() {
                            Some(bb) => bb,
                            None => continue,
                        };
                        let width = bb.width() as usize;
                        let height = bb.height() as usize;

                        fn u8color((a, b, c, d): (f32, f32, f32, f32)) -> (u8, u8, u8, f32) {
                            ((a * 255.0) as u8, (b * 255.0) as u8, (c * 255.0) as u8, d)
                        }
                        let (r, g, b, a) = u8color(match color {
                            Color::Rgba(r, g, b, a) => (r, g, b, a),
                            Color::Hsla(h, s, l, a) => {
                                let (r, g, b) = color::hsl_to_rgb(h, s, l);
                                (r, g, b, a)
                            }
                        });

                        let mut drawn_glyph = vec![0; (width * height * 4) as usize];
                        glyph.draw(|x, y, v| {
                            let i = (x + width as u32 * y) as usize * 4;
                            drawn_glyph[i + 0] = r;
                            drawn_glyph[i + 1] = g;
                            drawn_glyph[i + 2] = b;
                            drawn_glyph[i + 3] = (a * v * 255.0) as u8;
                        });

                        draw_as_image_bitmap(
                            &self.context,
                            Clamped(drawn_glyph),
                            width,
                            bb.min.x as f64,
                            bb.min.y as f64,
                        );
                    }
                }

                PrimitiveKind::Other(..) => {}
            }

            self.context.restore();
        }

        self.context.restore();
    }
}

fn color_to_style(color: &Color) -> String {
    match color {
        Color::Rgba(r, g, b, a) => format!(
            "rgba({},{},{},{})",
            (r * 255.0) as u8,
            (g * 255.0) as u8,
            (b * 255.0) as u8,
            a,
        ),
        Color::Hsla(h, s, l, a) => format!(
            "hsla({},{}%,{}%,{})",
            (h * 360.0) as u16,
            (s * 100.0) as u8,
            (l * 100.0) as u8,
            a,
        ),
    }
}

fn rgba_to_style(Rgba(r, g, b, a): &Rgba) -> String {
    format!(
        "rgba({},{},{},{})",
        (r * 255.0) as u8,
        (g * 255.0) as u8,
        (b * 255.0) as u8,
        a
    )
}
