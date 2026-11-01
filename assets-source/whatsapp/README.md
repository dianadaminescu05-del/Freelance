# WhatsApp mark

Three variants were supplied; `whatsapp-color-svgrepo-com.svg` is the one in
use. It is a single filled path, which is what made it the easiest to carry
into `src/components/WhatsAppIcon.tsx` — the path `d` is copied verbatim and
only its `#67C15E` is swapped for `currentColor`.

Watch the `fill-rule`: the source sets `evenodd` on an ancestor `<g>`, not on
the path. Drop it and the handset cutout fills in, leaving a solid blob.

The other two are kept for reference:

| File | What it is | Why not used |
|---|---|---|
| `whatsapp-svgrepo-com (1).svg` | Rounded-square app tile, green ground + white glyph | The tile would sit inside an already-green button |
| `whatsapp-svgrepo-com.svg` | Outline/line weight version | Heavier than the solid buttons want, and it carries a full-square bounding path |

## Colour

The glyph takes `currentColor`, so it inherits each button's foreground —
`#0b3d21` on both the FAB and the contact button.

That is not the canonical colourway. WhatsApp's own lockup is white on
`#25D366`, which measures **1.98:1** — under the 3:1 WCAG 1.4.11 asks of a
non-text graphic. The logotype exception in that criterion arguably covers
it, since this is a brand mark, but the dark foreground was already the
site's choice before the glyph went in and it keeps the control legible at
6.21:1. The shape is what makes the mark recognisable.

To switch to the official colourway, set `color: #fff` on `.whatsapp-fab`
and `.whatsapp-btn` — the label goes with it, and that is a text contrast
failure, not just a graphic one.
