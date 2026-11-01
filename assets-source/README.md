# Source media

`hero-source.mp4` — the original 1280x720 clip. Kept locally so the hero can
be re-cut; it is not shipped and not committed (see `.gitignore`).

## How `public/hero-packaging.mp4` is derived

The full sequence, full frame, no loop — the box has to actually close:

```bash
ffmpeg -i hero-source.mp4 -an \
  -vf "crop=1180:720:50:0,scale=1080:-2:flags=lanczos" -movflags +faststart \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p ../public/hero-packaging.mp4

# poster = FIRST frame, since playback starts there and runs once
ffmpeg -ss 0 -i ../public/hero-packaging.mp4 -frames:v 1 -q:v 4 ../public/hero-packaging.jpg
```

The crop trims 50px of blurred room from each side only. Audio is stripped:
autoplay only works muted, so the track is dead weight.

## Third-party branding — unresolved

The clip carries **PACKCRAFT**, wordmark and round logo, printed on the
boxes. The current source is the "remove the line" re-edit: it dropped the
copper chevron artwork, so the boxes are now plain white — but the brand name
survived, and against white card it reads *more* clearly than it did before.

It is legible from roughly 4.4s and sits plainly across the front of the
closed box in the final frame, which is the hero's resting state since
playback ends and holds there. The round mark is on the lid.

Earlier removal attempts, all rejected:

| Approach | Result |
|---|---|
| Box blur over the mark | Leaves a hard-edged rectangle |
| `delogo`, generous box | Smears the box silhouette against the background |
| `delogo`, tight box | Silhouette intact, but copper letter-strokes streak through |

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
