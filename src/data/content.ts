import type { LucideIcon } from 'lucide-react';
import { Box, Megaphone, FileText, Truck } from 'lucide-react';

/* ---------------------------------------------------------------- Home */

export type ServiceCard = {
  label: string;
  sub: string;
  to: string;
  /** Decorative bar + icon tint. The bright brand hue. */
  color: string;
  /** Same hue darkened to clear 4.5:1 on white — used for the label text.
   *  The bright yellow measures 1.67:1 as text and is unreadable. */
  textColor: string;
  icon: LucideIcon;
};

export const SERVICE_CARDS: ServiceCard[] = [
  {
    label: 'Ambalaje',
    sub: '12+ categorii personalizate',
    to: '/servicii',
    color: '#0099CC',
    textColor: '#007EA8',
    icon: Box,
  },
  {
    label: 'Printuri mari',
    sub: 'Bannere, roll-up, autocolante',
    to: '/servicii',
    color: '#E8318A',
    textColor: '#C5166B',
    icon: Megaphone,
  },
  {
    label: 'Printuri mici',
    sub: 'Cărți de vizită, broșuri, fluturași',
    to: '/servicii',
    color: '#F5C200',
    textColor: '#896C00',
    icon: FileText,
  },
  {
    label: 'B2B & Livrare',
    sub: 'Transport propriu, 7 zone regionale',
    to: '/b2b',
    color: '#111111',
    textColor: '#111111',
    icon: Truck,
  },
];

export const PARTNER_LOGOS = ['Hellout', 'Oliv', 'Mondial', 'Honeywell'];

export const HERO_STATS = [
  { n: '15+', l: 'ani\nexperiență' },
  { n: '12+', l: 'categorii\nambalaje' },
  { n: '7', l: 'zone de\nlivrare' },
];

/* ----------------------------------------------------------- Despre noi */

export const VALUES = [
  {
    n: '01',
    titlu: 'Calitate certificată',
    text: 'Materiale premium, cerneală de ultimă generație și control strict al calității la fiecare tiraj.',
  },
  {
    n: '02',
    titlu: 'Termene respectate',
    text: 'Planificăm producția pentru ca fiecare comandă să ajungă exact când ai nevoie.',
  },
  {
    n: '03',
    titlu: 'Relații pe termen lung',
    text: 'Lucrăm cu multinaționale din regiune și construim parteneriate bazate pe încredere.',
  },
  {
    n: '04',
    titlu: 'Flexibilitate totală',
    text: 'Tiraje mici sau mari, formate standard sau personalizate — ne adaptăm nevoilor tale.',
  },
];

export const CAPABILITIES = [
  { val: 'Heidelberg', label: 'prese offset' },
  { val: 'Roland', label: 'mașini de tipar' },
  { val: 'UV + Laminare', label: 'finisaje' },
  { val: '24h', label: 'tiraj urgent' },
  { val: 'CMYK + Pantone', label: 'sisteme culoare' },
  { val: 'Stanțare & Biguire', label: 'prelucrare mecanică' },
];

/* -------------------------------------------------------------- Servicii */

export type ServiceItem = { titlu: string; desc: string };
export type ServiceGroup = { label: string; items: ServiceItem[] };

export const SERVICE_GROUPS = {
  ambalaje: {
    label: 'Ambalaje',
    items: [
      { titlu: 'Cutii personalizate', desc: 'Cutii offset full-color, biguire și decupaj personalizat.' },
      { titlu: 'Cutii albe / simple', desc: 'Ambalaj standard, dimensiuni variate.' },
      { titlu: 'Pungi hârtie', desc: 'Pungi kraft sau cretate cu mâner, tipărite sau plain.' },
      { titlu: 'Plicuri personalizate', desc: 'Offset sau digital, format standard sau la comandă.' },
      { titlu: 'Etichete adezive', desc: 'Rolă sau coală, mat, luciu sau transparente.' },
      { titlu: 'Etichete alimentare', desc: 'Rezistente la umiditate, certificate food-grade.' },
      { titlu: 'Folii termocontractibile', desc: 'Folie shrink pentru grupare produse.' },
      { titlu: 'Ambalaje alimentare', desc: 'Cutii pizza, tăvi, pungi food-grade.' },
      { titlu: 'Ambalaje cosmetice', desc: 'Cutii și etui pentru parfumuri, creme, beauty.' },
      { titlu: 'Tuburi carton', desc: 'Tuburi rotunde pentru postere sau produse cilindrice.' },
      { titlu: 'Separatoare carton', desc: 'Inserts pentru organizarea produselor în cutie.' },
      { titlu: 'Ambalaje eco (kraft)', desc: 'Carton reciclat sau kraft natur.' },
    ],
  },
  printuriMari: {
    label: 'Printuri mari',
    items: [
      { titlu: 'Bannere publicitare', desc: 'Flex, mesh sau backlit — interior și exterior.' },
      { titlu: 'Roll-up & X-banner', desc: 'Standuri expoziționale, husă inclusă.' },
      { titlu: 'Afișe mari format', desc: 'A0, A1 pe hârtie fotografică sau coated.' },
      { titlu: 'Mesh și plase', desc: 'Materiale perforate pentru fatade și garduri.' },
      { titlu: 'Autocolante de perete', desc: 'Viniluri decorative pentru spații comerciale.' },
      { titlu: 'Autocolante auto / geam', desc: 'Branding auto și vitrine din vinil.' },
    ],
  },
  printuriMici: {
    label: 'Printuri mici',
    items: [
      { titlu: 'Cărți de vizită', desc: '85×55mm sau formate speciale, mat/luciu/soft-touch.' },
      { titlu: 'Reviste & cataloage', desc: 'Offset, copertă cretată, interior 80g sau 100g.' },
      { titlu: 'Broșuri & pliante', desc: 'Bi-fold, tri-fold sau format liber.' },
      { titlu: 'Fluturași & flyer-e', desc: 'Formate A4–A6, față-verso, tiraj rapid.' },
      { titlu: 'Mape de prezentare', desc: 'Coperți rigide cu buzunare, personalizate.' },
      { titlu: 'Calendare', desc: 'De birou, perete sau agendă, grafică personalizată.' },
    ],
  },
} satisfies Record<string, ServiceGroup>;

export type ServiceGroupKey = keyof typeof SERVICE_GROUPS;

export const FINISHES = [
  { f: 'Laminare mat', d: 'Finisaj elegant, fără reflexii' },
  { f: 'Laminare luciu', d: 'Culori vii, suprafață strălucitoare' },
  { f: 'Soft-touch', d: 'Efect catifea la atingere' },
  { f: 'UV selectiv', d: 'Lac UV pe zone specifice' },
  { f: 'Embosare', d: 'Relief pe suprafață' },
  { f: 'Folie aurie / argintie', d: 'Accent metalic premium' },
  { f: 'Stanțare', d: 'Forme personalizate de decupaj' },
  { f: 'Biguire', d: 'Linii de pliere precise' },
];

/* --------------------------------------------------------------- Comenzi */

export type PriceTier = { cant: number; pret: number };
export type Finish = { label: string; surcharge: number };

export type Product = {
  id: string;
  nume: string;
  categorie: string;
  unitMeasure: string;
  tiers: PriceTier[];
  finisaje?: Finish[];
};

export const PRODUCTS: Product[] = [
  {
    id: 'cv',
    nume: 'Cărți de vizită',
    categorie: 'Printuri mici',
    unitMeasure: 'buc',
    tiers: [
      { cant: 100, pret: 45 },
      { cant: 250, pret: 85 },
      { cant: 500, pret: 140 },
      { cant: 1000, pret: 200 },
    ],
    finisaje: [
      { label: 'Standard luciu', surcharge: 0 },
      { label: 'Mat UV', surcharge: 20 },
      { label: 'Soft-touch', surcharge: 35 },
    ],
  },
  {
    id: 'fl',
    nume: 'Fluturași A5',
    categorie: 'Printuri mici',
    unitMeasure: 'buc',
    tiers: [
      { cant: 500, pret: 80 },
      { cant: 1000, pret: 120 },
      { cant: 2500, pret: 220 },
      { cant: 5000, pret: 350 },
    ],
    finisaje: [
      { label: 'Față simplu', surcharge: 0 },
      { label: 'Față-verso', surcharge: 30 },
    ],
  },
  {
    id: 'brosuri',
    nume: 'Broșuri A4 bi-fold',
    categorie: 'Printuri mici',
    unitMeasure: 'buc',
    tiers: [
      { cant: 100, pret: 120 },
      { cant: 250, pret: 220 },
      { cant: 500, pret: 360 },
      { cant: 1000, pret: 580 },
    ],
    finisaje: [
      { label: 'Hârtie 115g', surcharge: 0 },
      { label: 'Hârtie 150g', surcharge: 25 },
    ],
  },
  {
    id: 'banner',
    nume: 'Banner flex exterior',
    categorie: 'Printuri mari',
    unitMeasure: 'm²',
    tiers: [
      { cant: 1, pret: 35 },
      { cant: 5, pret: 30 },
      { cant: 10, pret: 26 },
      { cant: 25, pret: 22 },
    ],
  },
  {
    id: 'rollup',
    nume: 'Roll-up 85cm',
    categorie: 'Printuri mari',
    unitMeasure: 'buc',
    tiers: [
      { cant: 1, pret: 180 },
      { cant: 3, pret: 165 },
      { cant: 5, pret: 150 },
    ],
  },
  {
    id: 'cutii',
    nume: 'Cutii personalizate',
    categorie: 'Ambalaje',
    unitMeasure: 'buc',
    tiers: [
      { cant: 100, pret: 200 },
      { cant: 250, pret: 380 },
      { cant: 500, pret: 650 },
      { cant: 1000, pret: 1100 },
    ],
    finisaje: [
      { label: 'Offset standard', surcharge: 0 },
      { label: '+ Laminare mat', surcharge: 60 },
      { label: '+ Laminare luciu', surcharge: 50 },
      { label: '+ UV selectiv', surcharge: 90 },
    ],
  },
  {
    id: 'etichete',
    nume: 'Etichete adezive',
    categorie: 'Ambalaje',
    unitMeasure: 'buc',
    tiers: [
      { cant: 500, pret: 90 },
      { cant: 1000, pret: 150 },
      { cant: 2500, pret: 290 },
      { cant: 5000, pret: 480 },
    ],
    finisaje: [
      { label: 'Mat', surcharge: 0 },
      { label: 'Luciu', surcharge: 10 },
      { label: 'Transparent', surcharge: 20 },
    ],
  },
  {
    id: 'pungi',
    nume: 'Pungi hârtie kraft',
    categorie: 'Ambalaje',
    unitMeasure: 'buc',
    tiers: [
      { cant: 100, pret: 80 },
      { cant: 250, pret: 160 },
      { cant: 500, pret: 270 },
      { cant: 1000, pret: 450 },
    ],
  },
];

export const PRODUCT_CATEGORIES = ['Toate', 'Ambalaje', 'Printuri mici', 'Printuri mari'];

/* ------------------------------------------------------------------- B2B */

export const DELIVERY_ZONES = [
  { oras: 'Lugoj', dist: 'sediu', highlight: true },
  { oras: 'Timișoara', dist: '55 km' },
  { oras: 'Caransebeș', dist: '60 km' },
  { oras: 'Reșița', dist: '75 km' },
  { oras: 'Deva', dist: '90 km' },
  { oras: 'Hunedoara', dist: '105 km' },
  { oras: 'Arad', dist: '110 km' },
];

export const FLEET_STATS = [
  { val: '3.5t', label: 'capacitate max' },
  { val: '7', label: 'zone acoperite' },
  { val: 'Săptămânal', label: 'rute programate' },
  { val: '24h', label: 'livrare urgentă' },
];

export const PARTNERS = [
  { nume: 'Hellout', sector: 'Producție' },
  { nume: 'Oliv', sector: 'Alimentar' },
  { nume: 'Mondial', sector: 'Distribuție' },
  { nume: 'Honeywell', sector: 'Industrial' },
];

export const B2B_BENEFITS = [
  'Prețuri negociate pentru comenzi recurente',
  'Stoc dedicat clienților cu comenzi regulate',
  'Consultant personal de cont',
  'Facturare lunară consolidată',
  'Prioritate la producție în perioadele aglomerate',
  'Rapoarte lunare de consum și cost',
];

/* --------------------------------------------------------------- Contact */

export const CONTACT_SUBJECTS = [
  'Ambalaje personalizate',
  'Ambalaje simple / albe',
  'Etichete adezive',
  'Cărți de vizită',
  'Fluturași / Flyer-e',
  'Broșuri / Cataloage',
  'Bannere / Printuri mari',
  'Parteneriat B2B',
  'Altele',
];
