# WhatsApp mark

`whatsapp-svgrepo-com (1).svg` is the one in use, via
`src/components/WhatsAppIcon.tsx`. Its two paths are copied verbatim; the
app tile behind them is dropped (the button supplies the green) and
`#ffffff` becomes `currentColor`.

## Why this one and not the colour variant

The two files draw the mark in opposite ways, and only one survives being
placed on a green button:

| File | Construction | On a green button |
|---|---|---|
| `whatsapp-svgrepo-com (1).svg` | Bubble is a **stroke**, handset is a **fill** | Both paint white. Correct. |
| `whatsapp-color-svgrepo-com.svg` | Bubble is a filled disc with the handset **knocked out** (`fill-rule: evenodd`) | Fills white as a white disc with a green handset — inverted |
| `whatsapp-svgrepo-com.svg` | Outline/line weight | Too light beside the solid buttons; also carries a full-square bounding path |

The colour variant is the right choice on a *white* page, where the cutout
reads as a white handset. It was tried here first and looked wrong.

The source pads the glyph out to a 512 tile, so the component crops the
viewBox to `100 100 312 312`; left at `0 0 512 512` the mark sits small
inside the button.

## Colour

White on `#25D366`, the brand's own lockup. That measures **1.98:1**, under
the 3:1 WCAG 1.4.11 asks of a non-text graphic, and stands on the
criterion's logotype exception.

Scoped to the glyph on purpose. The labels next to it keep `#0b3d21`
(6.21:1), where the same ratio would be a *text* contrast failure rather
than a brand one. `.wa-glyph` in `layout.css` sets the white; the buttons'
own `color` still drives everything textual.
