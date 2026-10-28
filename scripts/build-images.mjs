#!/usr/bin/env node
/**
 * Generates the site's web images from the photo originals.
 *
 * The originals ("Poze produse", "Poze depozit") are 441MB of print-resolution
 * PNGs and 6000x4000 camera files. They are gitignored; this script produces
 * the small derivatives that public/ ships, and those ARE committed — the
 * GitHub Actions build has neither the originals nor ffmpeg.
 *
 * Re-run after adding or replacing a photo:
 *     node scripts/build-images.mjs
 *
 * Requires ffmpeg on PATH (brew install ffmpeg).
 */
import { execFile } from 'node:child_process';
import { mkdir, access } from 'node:fs/promises';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_PRODUSE = path.join(ROOT, 'Poze produse');
const SRC_DEPOZIT = path.join(ROOT, 'Poze depozit');
const OUT_PRODUSE = path.join(ROOT, 'public', 'produse');
const OUT_DEPOZIT = path.join(ROOT, 'public', 'depozit');

/** Two widths so cards can use srcset: grid thumb, and dialog view. */
const PRODUCT_WIDTHS = [600, 1200];
/** Warehouse shots are decorative band images — one generous width is enough. */
const DEPOT_WIDTHS = [1400];

/**
 * source file (without .png) -> output slug.
 * Explicit rather than derived: the source names carry typos
 * ("individiala"), stray spaces and inconsistent variant suffixes.
 */
const PRODUSE = [
  // "Cutie fastfood .png" (trailing space) is the OPEN box despite the
  // unmarked name; "... inchisa.png" is the closed one. Verified visually.
  ['Cutie fastfood inchisa', 'cutie-fastfood--1'],
  ['Cutie fastfood ', 'cutie-fastfood--2'],

  ['Cutii pizza albe', 'cutii-pizza-albe--1'],
  ['Cutii pizza albe2', 'cutii-pizza-albe--2'],
  ['Cutii pizza natur 1', 'cutii-pizza-natur--1'],
  ['Cutii pizza natur 2', 'cutii-pizza-natur--2'],
  ['Cutii pizza set1', 'cutii-pizza-set--1'],
  ['Cutii pizza set2', 'cutii-pizza-set--2'],

  ['Cutie hrana animale 180 x 210 x 80 mm fata', 'hrana-animale-180--1'],
  ['Cutie hrana animale 180 x 210 x 80 mm spate', 'hrana-animale-180--2'],
  ['Cutie hrana animale 150 x 50 x 180 mm fata', 'hrana-animale-150--1'],
  ['Cutie hrana animale 150 x 50 x 180 mm spate', 'hrana-animale-150--2'],
  ['Cutie hrana animale 100 x 100 x 310 mm inchisa', 'hrana-animale-100--1'],
  ['Cutie hrana animale 100 x 100 x 310 mm deschisa', 'hrana-animale-100--2'],

  ['Cutie duplex personalizata inchisa', 'cutie-duplex-personalizata--1'],
  ['Cutie duplex personalizata deschisa', 'cutie-duplex-personalizata--2'],
  ['Cutie individiala duplex inchisa', 'cutie-individuala-duplex--1'],
  ['Cutie individiala duplex deschisa', 'cutie-individuala-duplex--2'],
  ['Cutie individuala inchisa', 'cutie-individuala-1--1'],
  ['Cutie individuala deschisa', 'cutie-individuala-1--2'],
  ['Cutie individuala 2 inchisa', 'cutie-individuala-2--1'],
  ['Cutie individuala 2 deschisa', 'cutie-individuala-2--2'],
  ['Cutie individuala antistatica capitonata exterior', 'cutie-antistatica--1'],
  ['Cutie individuala antistatica capitonata interior', 'cutie-antistatica--2'],
  ['Cutie individuala carton natur inchisa', 'cutie-carton-natur-1--1'],
  ['Cutie individuala carton natur deschisa', 'cutie-carton-natur-1--2'],
  ['Cutie individuala carton natur 2 inchisa', 'cutie-carton-natur-2--1'],
  ['Cutie individuala carton natur 2 deschisa', 'cutie-carton-natur-2--2'],
  ['Cutie individuala cu separator inchisa', 'cutie-cu-separator--1'],
  ['Cutie individuala cu separator deschisa', 'cutie-cu-separator--2'],
  ['Cutie evenimente 1', 'cutie-evenimente--1'],
  ['Cutie evenimente 2', 'cutie-evenimente--2'],
  ['Cutie evenimente 3', 'cutie-evenimente--3'],

  ['Cutie transport ', 'cutie-transport--1'],
  ['Cutie transport _depozitare inchisa', 'cutie-transport-depozitare--1'],
  ['Cutie transport _depozitare deschisa', 'cutie-transport-depozitare--2'],
  ['Ladita carton inchisa', 'ladita-carton--1'],
  ['Ladita carton deschisa', 'ladita-carton--2'],

  ['Separator', 'separator--1'],
  ['Separator tavita inchis', 'separator-tavita--1'],
  ['Separator tavita deschis', 'separator-tavita--2'],

  ['Produse', 'gama-completa'],
];

/** Hand-picked: the rest are near-duplicates or soft close-ups. */
const DEPOZIT = [
  ['DSC00715', 'hala-1'],
  ['DSC00721', 'transpalet'],
  ['DSC00726', 'stoc-paleti'],
  ['DSC00729', 'hala-2'],
  ['DSC00730', 'hala-3'],
  ['DSC00699', 'coli-tiparite'],
];

async function convert(src, outDir, slug, widths, quality) {
  for (const w of widths) {
    const out = path.join(outDir, `${slug}-${w}.jpg`);
    await run('ffmpeg', [
      '-v', 'error',
      '-i', src,
      '-vf', `scale=${w}:-2:flags=lanczos`,
      '-q:v', String(quality),
      '-y', out,
    ]);
  }
}

async function main() {
  await mkdir(OUT_PRODUSE, { recursive: true });
  await mkdir(OUT_DEPOZIT, { recursive: true });

  let made = 0;
  const missing = [];

  for (const [file, slug] of PRODUSE) {
    const src = path.join(SRC_PRODUSE, `${file}.png`);
    try {
      await access(src);
    } catch {
      missing.push(`Poze produse/${file}.png`);
      continue;
    }
    await convert(src, OUT_PRODUSE, slug, PRODUCT_WIDTHS, 4);
    made += PRODUCT_WIDTHS.length;
  }

  for (const [file, slug] of DEPOZIT) {
    const src = path.join(SRC_DEPOZIT, `${file}.JPG`);
    try {
      await access(src);
    } catch {
      missing.push(`Poze depozit/${file}.JPG`);
      continue;
    }
    await convert(src, OUT_DEPOZIT, slug, DEPOT_WIDTHS, 5);
    made += DEPOT_WIDTHS.length;
  }

  console.log(`✓ wrote ${made} images to public/produse and public/depozit`);
  if (missing.length) {
    console.warn(`\n⚠ ${missing.length} source file(s) not found:`);
    for (const m of missing) console.warn(`    ${m}`);
    console.warn('\nThe originals are gitignored — this is expected on a');
    console.warn('machine that only has the repo. Committed derivatives still work.');
  }
}

main().catch((e) => {
  console.error(e.stderr || e.message);
  process.exit(1);
});
