/**
 * Product catalogue.
 *
 * Names come from the client's own file names and the "Poze pe categorii"
 * table — tidied for diacritics and typos ("individiala"), nothing more.
 * There are deliberately NO marketing descriptions: no source document
 * supplies any, and inventing them is how the old prototype ended up
 * claiming presses the company does not own. Dimensions appear only where
 * the client stated them.
 *
 * Images are built by scripts/build-images.mjs. Each entry lists its image
 * slugs; the first is the card thumbnail, the second (where present) is the
 * state the card reveals on hover or tap.
 */

export const CATEGORII = [
  'Ambalaje alimentare',
  'Hrană animale',
  'Cutii personalizate',
  'Transport & depozitare',
  'Separatoare',
] as const;

export type Categorie = (typeof CATEGORII)[number];

export type ProductImage = {
  /** File slug under public/produse, without the width suffix. */
  slug: string;
  /** Describes what the photo shows, for screen readers. */
  alt: string;
};

export type CatalogProduct = {
  slug: string;
  nume: string;
  categorie: Categorie;
  dimensiuni?: string;
  imagini: ProductImage[];
};

const closedOpen = (slug: string, nume: string): ProductImage[] => [
  { slug: `${slug}--1`, alt: `${nume}, închisă` },
  { slug: `${slug}--2`, alt: `${nume}, deschisă` },
];

export const PRODUSE: CatalogProduct[] = [
  /* ------------------------------------------- Ambalaje alimentare --- */
  {
    slug: 'cutie-fastfood',
    nume: 'Cutie fastfood',
    categorie: 'Ambalaje alimentare',
    imagini: closedOpen('cutie-fastfood', 'Cutie fastfood'),
  },
  {
    slug: 'cutii-pizza-albe',
    nume: 'Cutii pizza albe',
    categorie: 'Ambalaje alimentare',
    imagini: [
      { slug: 'cutii-pizza-albe--1', alt: 'Cutii pizza albe, personalizate prin tipar' },
      { slug: 'cutii-pizza-albe--2', alt: 'Cutii pizza albe, stivuite' },
    ],
  },
  {
    slug: 'cutii-pizza-natur',
    nume: 'Cutii pizza carton natur',
    categorie: 'Ambalaje alimentare',
    imagini: [
      { slug: 'cutii-pizza-natur--1', alt: 'Cutii pizza din carton natur, personalizate prin tipar' },
      { slug: 'cutii-pizza-natur--2', alt: 'Cutii pizza din carton natur, deschise' },
    ],
  },
  {
    slug: 'cutii-pizza-set',
    nume: 'Cutii pizza — set personalizat',
    categorie: 'Ambalaje alimentare',
    imagini: [
      { slug: 'cutii-pizza-set--1', alt: 'Set de cutii pizza personalizate, albe și natur' },
      { slug: 'cutii-pizza-set--2', alt: 'Set de cutii pizza personalizate, vedere de ansamblu' },
    ],
  },

  /* ------------------------------------------------ Hrană animale --- */
  {
    slug: 'hrana-animale-180',
    nume: 'Cutie hrană animale',
    categorie: 'Hrană animale',
    dimensiuni: '180 × 210 × 80 mm',
    imagini: [
      { slug: 'hrana-animale-180--1', alt: 'Cutie hrană animale 180 × 210 × 80 mm, față' },
      { slug: 'hrana-animale-180--2', alt: 'Cutie hrană animale 180 × 210 × 80 mm, spate' },
    ],
  },
  {
    slug: 'hrana-animale-150',
    nume: 'Cutie hrană animale',
    categorie: 'Hrană animale',
    dimensiuni: '150 × 50 × 180 mm',
    imagini: [
      { slug: 'hrana-animale-150--1', alt: 'Cutie hrană animale 150 × 50 × 180 mm, față' },
      { slug: 'hrana-animale-150--2', alt: 'Cutie hrană animale 150 × 50 × 180 mm, spate' },
    ],
  },
  {
    slug: 'hrana-animale-100',
    nume: 'Cutie hrană animale',
    categorie: 'Hrană animale',
    dimensiuni: '100 × 100 × 310 mm',
    imagini: [
      { slug: 'hrana-animale-100--1', alt: 'Cutie hrană animale 100 × 100 × 310 mm, închisă' },
      { slug: 'hrana-animale-100--2', alt: 'Cutie hrană animale 100 × 100 × 310 mm, deschisă' },
    ],
  },

  /* -------------------------------------------- Cutii personalizate --- */
  {
    slug: 'cutie-duplex-personalizata',
    nume: 'Cutie duplex personalizată',
    categorie: 'Cutii personalizate',
    imagini: closedOpen('cutie-duplex-personalizata', 'Cutie duplex personalizată'),
  },
  {
    slug: 'cutie-individuala-duplex',
    nume: 'Cutie individuală duplex',
    categorie: 'Cutii personalizate',
    imagini: closedOpen('cutie-individuala-duplex', 'Cutie individuală duplex'),
  },
  {
    slug: 'cutie-individuala-1',
    nume: 'Cutie individuală — model 1',
    categorie: 'Cutii personalizate',
    imagini: closedOpen('cutie-individuala-1', 'Cutie individuală model 1'),
  },
  {
    slug: 'cutie-individuala-2',
    nume: 'Cutie individuală — model 2',
    categorie: 'Cutii personalizate',
    imagini: closedOpen('cutie-individuala-2', 'Cutie individuală model 2'),
  },
  {
    slug: 'cutie-antistatica',
    nume: 'Cutie individuală antistatică capitonată',
    categorie: 'Cutii personalizate',
    imagini: [
      { slug: 'cutie-antistatica--1', alt: 'Cutie antistatică capitonată, exterior' },
      { slug: 'cutie-antistatica--2', alt: 'Cutie antistatică capitonată, interior cu burete' },
    ],
  },
  {
    slug: 'cutie-carton-natur-1',
    nume: 'Cutie individuală carton natur — model 1',
    categorie: 'Cutii personalizate',
    imagini: closedOpen('cutie-carton-natur-1', 'Cutie individuală carton natur model 1'),
  },
  {
    slug: 'cutie-carton-natur-2',
    nume: 'Cutie individuală carton natur — model 2',
    categorie: 'Cutii personalizate',
    imagini: closedOpen('cutie-carton-natur-2', 'Cutie individuală carton natur model 2'),
  },
  {
    slug: 'cutie-cu-separator',
    nume: 'Cutie individuală cu separator',
    categorie: 'Cutii personalizate',
    imagini: closedOpen('cutie-cu-separator', 'Cutie individuală cu separator'),
  },
  {
    slug: 'cutie-evenimente',
    nume: 'Cutie evenimente',
    categorie: 'Cutii personalizate',
    imagini: [
      { slug: 'cutie-evenimente--1', alt: 'Cutie evenimente cu mâner și decupaj în formă de inimă' },
      { slug: 'cutie-evenimente--2', alt: 'Cutie evenimente, vedere laterală' },
      { slug: 'cutie-evenimente--3', alt: 'Cutie evenimente, vedere din față' },
    ],
  },

  /* --------------------------------------- Transport & depozitare --- */
  {
    slug: 'cutie-transport',
    nume: 'Cutie transport',
    categorie: 'Transport & depozitare',
    imagini: [{ slug: 'cutie-transport--1', alt: 'Cutie de transport din carton ondulat' }],
  },
  {
    slug: 'cutie-transport-depozitare',
    nume: 'Cutie transport / depozitare',
    categorie: 'Transport & depozitare',
    imagini: closedOpen('cutie-transport-depozitare', 'Cutie transport și depozitare'),
  },
  {
    slug: 'ladita-carton',
    nume: 'Ladiță carton',
    categorie: 'Transport & depozitare',
    imagini: [
      { slug: 'ladita-carton--1', alt: 'Ladiță din carton, asamblată' },
      { slug: 'ladita-carton--2', alt: 'Ladiță din carton, desfăcută' },
    ],
  },

  /* --------------------------------------------------- Separatoare --- */
  {
    slug: 'separator',
    nume: 'Separator',
    categorie: 'Separatoare',
    imagini: [{ slug: 'separator--1', alt: 'Separator din carton pentru compartimentare' }],
  },
  {
    slug: 'separator-tavita',
    nume: 'Separator / tăviță',
    categorie: 'Separatoare',
    imagini: [
      { slug: 'separator-tavita--1', alt: 'Tăviță din carton, asamblată' },
      { slug: 'separator-tavita--2', alt: 'Tăviță din carton, desfăcută' },
    ],
  },
];

/** Group shot of the range, used as the catalogue's opening image. */
export const GAMA_COMPLETA = {
  slug: 'gama-completa',
  alt: 'Gama de ambalaje și cutii din carton produse de Almariones',
};
