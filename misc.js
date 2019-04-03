export const draw_as_image_bitmap = (context, data, width, dx, dy) => {
  window
    .createImageBitmap(new ImageData(data, width))
    .then(bitmap => context.drawImage(bitmap, dx, dy));
};

// vim: set ts=2 sw=2 et:
