# Banner cut-outs

`gama-completa.webp` and `cutii-pizza.webp` are supplied with a real alpha
channel — verified by compositing them over magenta, not by trusting the
file format. They ship to `public/banner/` **unmodified**.

## Why they are not processed

Normally these would be trimmed to their content and re-encoded at two
widths, as `scripts/build-images.mjs` does for the catalogue. They are not,
because nothing here can write WebP: this ffmpeg has no `libwebp`, `cwebp`
is not installed, and `sips` cannot export the format. The alternative,
PNG, measured **856KB** at 1200px — five times the original.

So the originals ship as they are (180KB and 137KB) and the trim happens in
CSS instead, which costs nothing and loses nothing.

## The trim

Both are 1254x1254 with wide transparent margins. Measured from the alpha
channel:

| | content box | margins (top / bottom) | aspect |
|---|---|---|---|
| `gama-completa` | 1250 x 791 | 17.9% / 19.1% | 1.58:1 |
| `cutii-pizza` | 1222 x 628 | 28.4% / 21.5% | 1.95:1 |

`object-fit: cover` into the banner's 380x240 frame shows the middle 63% of
the height, which is almost exactly the gama shot's content box — it renders
239 of its 240px. The pizza shot is wider than it is tall, so it sits at
190px with clear space above and below. Nothing is cut from either.

If a WebP encoder ever becomes available, trimming to the content box and
emitting 600w/1200w would cut the bytes and let the shots fill the frame
outright.
