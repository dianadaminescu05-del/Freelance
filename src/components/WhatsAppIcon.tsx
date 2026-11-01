/**
 * WhatsApp mark, in the brand's white-on-green lockup.
 *
 * Lucide ships no brand glyph — MessageCircle used to stand in here. The two
 * paths come unchanged from the supplied `whatsapp-svgrepo-com (1).svg`
 * (SVG Repo); only the app tile behind them is dropped, since the button
 * already supplies the green, and #ffffff is swapped for currentColor.
 *
 * It matters that this is the outlined-bubble construction rather than the
 * solid one in `whatsapp-color-svgrepo-com.svg`. That file draws the bubble
 * as a filled disc with the handset knocked out of it — correct on a white
 * page, where the cutout reads as a white handset, but inverted on a green
 * button, where filling it white gives a white disc with a green handset.
 * Here the bubble is a stroke and the handset is a fill, so both land white
 * on the green and the mark reads the way it does everywhere else.
 *
 * White on #25D366 measures 1.98:1, under the 3:1 WCAG 1.4.11 asks of a
 * non-text graphic; it rides on that criterion's logotype exception. The
 * labels beside it stay dark, where the same ratio would be a text failure
 * rather than a brand one.
 *
 * viewBox is cropped to the artwork: the source pads the glyph out to a
 * 512 tile, which would leave the mark small inside the button.
 */
export default function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="100 100 312 312"
      className="wa-glyph"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
      focusable="false"
    >
      <path stroke="currentColor" strokeWidth="26" d="M123 393l14-65a138 138 0 1150 47z" />
      <path
        fill="currentColor"
        d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
      />
    </svg>
  );
}
