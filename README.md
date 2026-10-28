# Almariones — Print & Packaging

React + TypeScript rebuild of the Almariones site. Structure, copy, colours and
typography are carried over verbatim from the original static prototype; icons
are now [lucide-react](https://lucide.dev), and the design is deliberately
untouched so it can be refined from here.

## Stack

| | |
|---|---|
| Build | Vite 5 |
| UI | React 18 + TypeScript (strict) |
| Routing | react-router-dom 6 (real URLs, not in-memory state) |
| Motion | framer-motion |
| Icons | lucide-react |
| Styling | CSS custom properties + Tailwind utilities |

## Live

**https://dianadaminescu05-del.github.io/Freelance/**

Published by GitHub Pages from `.github/workflows/deploy.yml` on every push
to `main`.

Three things make a Vite SPA work from a repo subpath, and all three are
load-bearing:

1. **`base` is keyed on `mode`, not `command`** (`vite.config.ts`). `command`
   is `'serve'` for *both* `vite dev` and `vite preview`, so keying on it
   leaves preview serving at `/` while the build emits `/Freelance/` paths —
   preview then 404s every asset and silently falls back to `index.html`, so
   the app renders blank and the config looks fine. `mode` is `'production'`
   for build and preview alike.
2. **Router basename and asset URLs read `import.meta.env.BASE_URL`.** A
   leading `/` resolves to the domain root, so `/hero-packaging.mp4` would
   404 under `/Freelance/`.
3. **`build` copies `index.html` to `404.html`.** Pages has no SPA rewrite;
   it serves `404.html` for unknown paths, which loads the app and lets the
   router take the URL from there. Deep links legitimately return HTTP 404
   while rendering correctly — that is how the trick works, not a fault.

Renaming the repo or adding a custom domain is a one-line change to `base`.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # serve the build
npm run lint     # tsc --noEmit
```

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | `pages/Home.tsx` | Full-height hero, service grid, partner strip, CTA band |
| `/despre-noi` | `pages/DespreNoi.tsx` | Story, values, technical capabilities |
| `/servicii` | `pages/Servicii.tsx` | Tabbed catalog (24 products), finishes |
| `/comenzi` | `pages/Comenzi.tsx` | Product table + live price calculator |
| `/b2b` | `pages/B2B.tsx` | Fleet stats, delivery zones, partners |
| `/contact` | `pages/Contact.tsx` | Contact methods + quote form |
| `*` | `pages/NotFound.tsx` | Added — the original had no 404 |

## Layout

```
src/
├─ App.tsx                 route table
├─ main.tsx                entry
├─ index.css               imports the five stylesheets below
├─ components/
│  ├─ Layout.tsx           nav + <Outlet/> + footer + FAB, scroll-to-top on route change
│  ├─ Navbar.tsx           fixed translucent nav, mobile drawer
│  ├─ Footer.tsx
│  ├─ Logo.tsx             the stacked-plates SVG mark, size + darkBg props
│  ├─ PageHero.tsx         dark banner shared by all inner pages
│  ├─ AccentRail.tsx       the 4 colour bars on every dark hero
│  ├─ Breadcrumb.tsx
│  └─ motion.ts            shared easing + variants
│  ├─ HeroMedia.tsx        hero video panel + scroll parallax
│  └─ motion.ts            shared easing + variants
├─ data/
│  ├─ site.ts              contact details, nav items, footer links
│  └─ content.ts           every page's copy, product catalog, pricing tiers
├─ lib/
│  └─ color.ts             hex -> rgba tint helper
├─ pages/
└─ styles/
   ├─ tokens.css           colours, fonts, layout constants
   ├─ tw-defaults.css      Tailwind's --tw-* variable defaults (see below)
   ├─ global.css           base, containers, buttons, shared primitives
   ├─ layout.css           navbar, footer, WhatsApp FAB
   ├─ home.css
   └─ pages.css            despre-noi / servicii / comenzi / b2b / contact
```

## Tailwind

Tailwind sits alongside the component CSS rather than replacing it. Utilities
are emitted **after** the project stylesheets, so a utility always wins where
both target the same element.

Colours are wired to the same tokens: `tokens.css` defines channel triplets
(`--accent-rgb: 0 153 204`), the named tokens are built from them, and
`tailwind.config.js` reads the triplets — so `bg-accent/10` and `text-mid`
resolve alpha correctly and a hue is still edited in exactly one place.

**`corePlugins.preflight` is off** because `global.css` already owns the reset,
and Tailwind's version would strip the `h1`–`h3` font rules defined there.
Turning preflight off also drops the base layer that initialises Tailwind's
`--tw-*` variables — without them the composed `transform`, `filter`,
`box-shadow` and `ring` shorthands reference undefined values, become invalid,
and are silently discarded, so `scale-x-0`, `-translate-y-0.5`, `rotate-*` and
`shadow-*` quietly do nothing. `styles/tw-defaults.css` restores those
defaults. **Delete that file and every transform utility stops working with no
error** — keep it imported first.

## Home hero

Split layout: copy on the left over ink, a looping packaging clip on the right
behind a diagonal edge, moving on scroll. Both the CMYK plate-stack and the
older `PRINT` watermark are gone — the stack leaned on the logo, which was too
much of the same mark in one page.

`components/HeroMedia.tsx` owns the panel.

**Playback runs the sequence once, start to finish, and holds the last frame.**
It does not loop — the clip is an assembly sequence, and looping cut it off
before the box closed. An `IntersectionObserver` rewinds and replays it
whenever the hero re-enters view, so scrolling back to the top starts it over.

**Scroll movement** is separate from playback: `useScroll` on the hero feeds
`useTransform` into `y` / `scale` / `opacity`, drifting the frame about
-5% → +16% and fading to 0.55 as the hero leaves.

**Reduced motion is handled twice, on purpose.** `MotionConfig reducedMotion`
only governs `animate`/`variants` — a `useTransform`-driven `style` slips
straight past it — so `HeroMedia` gates the transforms on `useReducedMotion`
and holds the video on its first frame, *and* `home.css` carries a
`@media (prefers-reduced-motion: reduce)` rule pinning `.hero-media__inner`.
The CSS rule exists because framer writes an inline transform that the global
reduced-motion block cannot override.

### Framing

The frame keeps the clip's own aspect ratio inside the panel rather than
`object-fit: cover` filling it, so the whole box stays in shot. Only the
extreme top and bottom — blurred room and table reflection — fade into the
ink, and that fade stops well clear of the subject.

| Width | Placement |
|---|---|
| `< 769px` | 240px band under the copy, diagonal top edge |
| `769–1023px` | 300px band under the copy |
| `≥ 1024px` | 62% column beside the copy, diagonal left edge |

The band height is fixed in px, not a percentage of the hero — as a percentage,
adding bottom padding grows the band too and never buys clearance.

### Keeping the copy readable

Two scrims: one on the panel, and `.home-hero::before` across the whole hero
anchored to the *text* side rather than to the media geometry, so the copy
stays on ink however the diagonal moves. Verified by measuring painted glyph
rects (Ranges, not element boxes) against both gradients **assuming a pure
white video pixel behind every glyph** — worst case 5.4:1 against a 4.5
requirement.

## The video carries someone else's brand

Read this before shipping.

The source clip has **PACKCRAFT** — wordmark and shield logo — printed on the
boxes. At normal brightness it is plainly readable, it appears on several box
faces, and it moves, so no static crop or blur removes it (a blur leaves an
obvious rectangle).

An earlier cut dodged it by using only the first 1.9s of the upper band, but
that showed just the tops of the boxes and never let the box close. Showing
the full sequence means the mark is visible — **and because playback ends and
holds on the last frame, the wordmark is the hero's resting state.**

Three removal approaches were tried and all rejected: a box blur leaves a hard
rectangle on the chevron artwork; a generous `delogo` smears the box
silhouette; a tight `delogo` keeps the silhouette but lets copper letter
strokes streak through. The mark also moves between box faces, so no static
patch covers it. An artefact that reads as a broken render is worse than the
wordmark, so the footage ships untouched.

**The fix is a different clip** — footage of Almariones' own work, or a
generated one with no third-party branding. `assets-source/README.md` has the
commands and the brightness check to use if you re-cut.

## Service cards

Separate rounded cards — 16px radius, 1px `--light` border, **20px gap at
desktop and 16px at every smaller breakpoint**. They were previously a
1px-gap grid over a `--light` background, which read as one divided slab
rather than four cards. The border does the separating work now: white cards
on `--paper` are only 1.05:1 apart on their own.

Icons sit in tinted tiles keyed to each card's colour: the tile is the bright
hue at 12% with a 28% inset ring, and the glyph uses the AA-safe dark step, so
it clears 3:1 against the tile (measured 3.9–14.6:1).

Hover lifts the card 3px, deepens the border, adds a shadow, rotates the tile,
nudges the arrow, and fills an accent rule across the bottom edge — all
`motion-reduce:transform-none`. The lift is the only thing framer drives; the
tint used to live on the wrapper too, but a background there paints square
corners behind a rounded card, so border and shadow are CSS on `.service-card`
itself.

All copy lives in `src/data/` — no strings are hardcoded in page components, so
content edits never touch JSX.

## Design tokens

Brand hues are the original's, verbatim (`src/styles/tokens.css`):

`--ink #111` · `--paper #f8f7f5` · `--paper-warm #efede8` · `--accent #0099cc` ·
`--accent-2 #e8318a` · `--accent-3 #f5c200` · `--mid #6b6b6b` · `--light #e2e0db`

Fonts: **Space Grotesk** (display) and **Inter** (body), from Google Fonts.

### One rule about colour

Tokens are split by **role**, not by shade. The bright brand hues are for
*fills* — bars, rails, dots, backgrounds — which only owe 3:1. Text and
interactive surfaces use the darkened step of the same hue:

| Role | Token | Measured |
|---|---|---|
| accent text on light | `--accent-dark` `#007AA3` | 4.55:1 on paper |
| magenta text on light | `--accent-2-text` `#C5166B` | 5.30:1 on paper |
| yellow text on light | `--accent-3-text` `#896C00` | 4.66:1 on paper |
| accent text on `--paper-warm` | `--accent-darker` `#006B8F` | 5.13:1 |
| white on an accent button | `--accent-dark` bg | 4.87:1 |
| accent text on `--ink` | `--accent-on-ink` `#36B8E8` | 8.25:1 |
| text on dark | `--on-ink-*` (0.85 / 0.72 / 0.62 / 0.52) | 12.8 / 9.4 / 7.2 / 5.4 |

`--on-ink-line*` and `--on-ink-fill` are hairlines and fills — **never put type
on them.** Adding a shade means adding it to `tokens.css` with its measured
ratio, not inlining a hex in a component.

The magenta text step is darker than the ratio alone requires (5.30:1 rather
than a bare 4.5:1) so that a magenta tint can sit *under* it — the nav CTA's
hover and active states put a 8–10% magenta wash behind the label, which costs
about 0.7 of contrast. The first value that merely passed on plain paper fell
under 4.5:1 as soon as the tint appeared.

### Buttons on dark

`.btn--ghost-dark` and `.btn--outline-dark` carry a 0.40-alpha border, not the
0.22/0.28 they started with. On these the outline is the only thing separating
the control from `--ink`, so it owes 3:1 — the original values measured
1.94:1 and 2.39:1. Text contrast was never the problem there (14–17:1); the
audit script only scores text, so this class of failure has to be checked by
hand when a control has no fill.

### Nav Contact CTA

A ghost button in the logo's magenta with a trailing phone icon. The border
carries the brand hue unmodified (`#E8318A`, 3.74:1 on the nav ground — over
the 3:1 a UI boundary owes, and on a ghost button the border is the only thing
defining the control, so it is full strength rather than a soft tint). The
label uses `--accent-2-text`.

The phone icon is `aria-hidden`: the link goes to `/contact`, not to a
dialler, so the icon must not put "phone" in its accessible name.

## Accessibility

Audited against WCAG 2.1 AA by measuring the rendered DOM on all six routes,
not by eye. Every text node now meets its threshold; the only element the
sweep still flags is the giant `PRINT` watermark, which is decorative
(`aria-hidden`, `pointer-events: none`, `user-select: none`).

What the audit caught and what changed:

- **Contrast.** The footer ran 1.44:1–3.31:1; the yellow "Detalii →" on the
  service card was 1.67:1; white on `#0099CC` buttons was 3.27:1; the
  `.value-row` numerals were 1.96:1. All now clear 4.5:1.
- **Focus.** Three rules previously set `outline: none` with no replacement.
  There is now one global `:focus-visible` ring, switched to the light tint
  over dark sections.
- **Keyboard.** Skip link to `#main`; Escape closes the mobile drawer and
  returns focus to the toggle; the drawer has `aria-expanded` / `aria-controls`.
- **Motion.** `MotionConfig reducedMotion="user"` covers framer-motion and a
  `prefers-reduced-motion` block covers CSS transitions and smooth scrolling.
- **Touch.** Buttons and inputs are ≥44px. Inline links in prose sit at 32px,
  which meets 2.5.8 (24px) — WCAG exempts targets inside a sentence.
- **Forms.** The submit button is no longer disabled (a disabled control never
  says *why*). Submitting surfaces per-field messages, sets `aria-invalid` and
  `aria-describedby`, and focuses the first bad field. Inputs are 16px so iOS
  Safari doesn't zoom on focus, and carry `type`/`inputMode`/`autoComplete`.
- **Announcements.** The calculator price is `aria-live="polite"`; the success
  panel is `role="status"` and takes focus.
- **Not colour alone.** The active nav item carries weight + an underline.
- **Small screens.** Below 640px the price table becomes stacked cards instead
  of a horizontally scrolling table.

Two deliberate departures from the original, both flagged rather than silent:

1. **The logo tagline is dropped from the small lockup.** "Print & Packaging"
   rendered at **4px** in the navbar. The wordmark stays; the tagline returns at
   `md`/`lg`.
2. **The WhatsApp glyph is dark, not white.** White on `#25D366` is 1.98:1,
   under the 3:1 icons owe. The brand green is untouched — the glyph went to
   `#0B3D21` (6.21:1) rather than shifting WhatsApp's colour.

### Re-running the audit

`npm run dev`, then paste `scripts/audit-a11y.js` into the browser console and
call `__audit()` on each route. It reports contrast failures with measured
ratios, sub-14px body text, and undersized targets.

## Images

Originals live in `Poze produse/` and `Poze depozit/` — 441MB of
print-resolution PNGs and 6000x4000 camera files. **Both are gitignored.**
`scripts/build-images.mjs` renders the web copies into `public/`, and those
ARE committed, because the Actions runner has neither the originals nor
ffmpeg.

```bash
npm run images     # after adding or replacing a photo
```

Products go out at 600px and 1200px for `srcset` (23KB and 71KB on average);
hall shots at 1400px. Total shipped: **5.6MB from a 441MB source.**

The source-to-slug map in the script is explicit rather than derived — the
file names carry typos (`individiala`), trailing spaces and inconsistent
variant suffixes. One pair was mislabelled at source: `Cutie fastfood .png`
is the *open* box, not the closed one. Verified by eye; noted in the script.

## The catalogue

`/servicii` is a real catalogue of 21 products built from the client's own
photography. It replaces an invented taxonomy that advertised banners,
roll-ups, business cards and calendars — none of which appear anywhere in the
documents or in 42 commissioned product photos.

`src/data/produse.ts` carries **no marketing descriptions on purpose.** No
source document supplies any, and inventing them is exactly how the prototype
ended up claiming presses the company does not own. Cards show the name, the
category, and dimensions only where the client stated them.

Interaction notes:

- The card is a `<button>`, not a clickable div, so tap and keyboard both
  work. The hover image swap is decorative enhancement, gated behind
  `@media (hover: hover)` — on touch the tap opens the dialog, where every
  image is reachable.
- The detail view is a native `<dialog>` with `showModal()`, which gives
  focus trapping, Escape, inert background and focus restore for free.
  It needs an explicit `margin: auto`: the global `* { margin: 0 }` reset
  wipes the UA rule that centres a modal.
- The category filter lives in the URL (`?categorie=...`), so the home cards
  deep-link into a filter and a filtered view is shareable.
- Home card counts derive from `PRODUSE`, so a card cannot claim a range the
  catalogue does not contain.

## Content sources

Copy and figures come from three client documents (not in the repo):
*Prezentare generala SC Tipografia Almariones*, *Prezentare firma - descriere*
and *Poze pe categorii web site*.

Everything in `src/data/` that states a fact traces to one of them. The
prototype had carried invented values, corrected on 2026-10-28:

| Was | Now | Source |
|---|---|---|
| "15+ ani experiență" | founding year 1999 | registration date 01.11.1999 |
| "Hellout", "Oliv" | Hella, Autoliv | client list |
| "Almariones SRL" | SC Tipografia Almariones | both documents |
| "Strada Tapiei FN" | Strada Tapiei nr. 49F | *Prezentare generala* |
| Heidelberg / Roland presses | company figures | nowhere — invented |
| "7 zone", "3.5t", "24h" | *still live on /b2b* | nowhere — invented |

`yearsActive()` in `site.ts` computes age from the founding date so it cannot
go stale, and increments on the anniversary rather than on 1 January. The hero
shows the founding year instead, because until 01.11.2026 the computed age is
also 26 and two identical numbers read as a bug.

## No prices, deliberately

`/comenzi` configures a **request**, not a quote. The tariffs it used to show
were prototype placeholders; no document gives real ones, and invented prices
are worse than none because a visitor treats them as binding.

The page keeps the product/quantity/finish picker, then hands the selection to
the contact form via router state, which pre-fills the subject and drafts the
message. To restore pricing: add `pret` back to `QuantityTier` and the totals
block in `pages/Comenzi.tsx`. Nothing else depends on it.

## Open questions for the client

Blocking, in rough priority:

1. ~~**Does the company still do small-format printing?**~~ **Resolved.**
   42 commissioned product photos are all cardboard packaging. The invented
   Printuri mari / Printuri mici categories are gone; `/servicii` is now the
   real catalogue. If the company *does* also print small-format, that is now
   a gap to fill rather than a claim to remove.
2. **PNRR branding.** Funding rules require the EU / Government / PNRR logos
   in polychrome, in that order, visible without scrolling, plus the footer
   text, disclaimer and two links. The current full-bleed hero has no room —
   this needs a hero redesign, and the logo files plus the programme's
   Facebook URL.
3. **Permission to name clients.** The documents list 17; the site shows 4.
4. **Delivery claims on /b2b** (3.5t fleet, 7 zones, weekly routes, 24h) have
   no source and are still live. Left untouched rather than invented away.
5. **Product photography.** The 20 existing shots are usable but were taken on
   an office desk with visible clutter. The brief also asks for exterior,
   interior static and interior dynamic shots, none of which exist yet.
6. **Pizza box photos (19–20)** carry other businesses' branding.

Not for the website: the banking details in *Prezentare generala* (Unicredit,
Alpha Bank, CEC, overdraft facility) are internal background only.

## Known gaps

- The contact form validates and shows a success state but sends nothing. Wire
  `handleSubmit` in `pages/Contact.tsx` to a real endpoint.
- Lucide has no WhatsApp brand glyph; `MessageCircle` stands in.
- Prices in `data/content.ts` are the prototype's placeholder tiers.
- The `ui-ux-pro-max` pass recommended a navy/`#0369A1` palette with Plus
  Jakarta Sans. Not applied — the brief was to keep Almariones' own brand. Its
  structural read ("Trust & Authority": credentials, partner logos, metrics)
  matches what the site already does.
- **The hero video shows third-party branding in its source.** See "The video
  carries someone else's brand" above — the shipped loop avoids it, but the
  footage is not Almariones' own work.
- `assets-source/hero-source.mp4` (1.9MB) is kept for re-cutting and is not
  shipped. Drop it from the repo if you would rather not version binaries.
