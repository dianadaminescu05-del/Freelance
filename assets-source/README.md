# Source media

`hero-source.mp4` — the original 1280x720 clip. Kept so the hero can be
re-cut; it is not shipped.

## How `public/hero-packaging.mp4` is derived

The full sequence, full frame, no loop — the box has to actually close:

```bash
ffmpeg -i hero-source.mp4 -an \
  -vf "crop=1180:720:50:0,scale=1080:-2" -movflags +faststart \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p ../public/hero-packaging.mp4

# poster = FIRST frame, since playback starts there and runs once
ffmpeg -ss 0 -i ../public/hero-packaging.mp4 -frames:v 1 -q:v 4 ../public/hero-packaging.jpg
```

The crop trims 50px of blurred room from each side only. Audio is stripped:
autoplay only works muted, so the track is dead weight.

## Third-party branding — unresolved

The clip carries **PACKCRAFT**, wordmark and shield logo, printed on the
boxes. It is small on the tray early on and becomes **plainly legible on the
box face from about 4.4s** — and because playback now ends and holds on the
last frame, that is the hero's resting state.

Three removal approaches were tried and all rejected:

| Approach | Result |
|---|---|
| Box blur over the mark | Leaves a hard-edged rectangle on the chevron artwork |
| `delogo`, generous box | Smears the box silhouette where the box meets the background |
| `delogo`, tight box | Silhouette intact, but copper letter-strokes still streak through |

The mark also moves between box faces across the sequence, so no static patch
covers it. It is left untouched: an artefact that reads as a broken render is
worse than the wordmark.

**The fix is a different clip** — footage of Almariones' own work, or a
generated one with no third-party branding.

If you do re-cut, check the result for the mark; it is low-contrast in places,
so brighten before looking:

```bash
ffmpeg -ss <t> -i <clip> -frames:v 1 -vf "eq=brightness=0.3:contrast=2.2" check.png
```
