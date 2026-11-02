# Diagonal lines

A 6×6 tile. The second polygon — `6 5 / 6 6 / 5 6` — is the corner piece
that makes the stripe continue across the tile boundary; drop it and the
pattern breaks at every repeat.

It is inlined into `global.css` as a data URI and used as a **mask**, not as
a background image: the mask carries the shape and `background-color`
carries the colour, so one asset serves both the dark banners and the white
one from a CSS variable. A coloured data URI could not, since a data URI
cannot read a custom property.

The copy here is the original, kept for reference.
