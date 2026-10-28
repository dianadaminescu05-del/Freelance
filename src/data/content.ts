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

/* Client names exactly as written in "Prezentare generala". The site
   previously showed "Hellout" and "Oliv", which match no company in any
   document — almost certainly garbled Hella and Autoliv. */
export const PARTNER_LOGOS = ['Honeywell', 'Hella', 'Autoliv', 'Mondial'];

/* Each figure traces to a source document:
   - years  : founding date 01.11.1999, computed so it cannot go stale
   - 26     : "Nr. angajati actuali: 26" (Prezentare firma)
   - 85%    : "livreaza ambalaje pentru 85% dintre pizzeriile din Lugoj"
   The previous values (15+ years, 12+ categories, 7 delivery zones) had no
   source and understated the company's age by more than a decade. */
export const HERO_STATS = [
  // Founding year rather than a computed age: until 01.11.2026 the age is
  // also 26, and two identical numbers side by side read as a bug. The
  // computed figure is still used in the Despre noi subtitle.
  { n: '1999', l: 'anul\nînființării' },
  { n: '26', l: 'angajați\nîn producție' },
  { n: '85%', l: 'din pizzeriile\ndin Lugoj' },
];

/* ----------------------------------------------------------- Despre noi */

/* Rewritten from the company's own words in "Prezentare firma":
   "respect pentru parteneri, indeplinirea in termen si la standarde de
   calitate a tuturor comenzilor" and "eficienta, siguranta calitatii,
   respectarea termenilor de livrare". */
export const VALUES = [
  {
    n: '01',
    titlu: 'Respect pentru parteneri',
    text: 'Clienții noștri sunt tratați cu seriozitate, de la firme mici până la companii multinaționale. Majoritatea revin cu contracte noi.',
  },
  {
    n: '02',
    titlu: 'Termene respectate',
    text: 'Respectarea termenelor de livrare este criteriul după care ne organizăm producția, nu o promisiune de marketing.',
  },
  {
    n: '03',
    titlu: 'Siguranța calității',
    text: 'Fiecare comandă este executată la standardele de calitate convenite cu partenerul, indiferent de volum.',
  },
  {
    n: '04',
    titlu: 'Eficiență',
    text: 'Investiția constantă în mijloacele de producție și în logistică ne permite randamente bune și costuri previzibile.',
  },
];

/* Company history, from "Prezentare generala" and "Prezentare firma".
   Replaces the placeholder note that was live on Despre noi. */
export const TIMELINE = [
  {
    an: '1999',
    titlu: 'Înființarea societății',
    text: 'SC Tipografia Almariones ia ființă la 1 noiembrie, cu capital privat românesc 100% și trei angajați. Obiectul de activitate: tipărirea de documente, cărți, registre și reviste, monocolor și color.',
  },
  {
    an: '2002',
    titlu: 'Trecerea la ambalaje',
    text: 'Administratorul Baboniu Marius decide diversificarea activității către prelucrarea hârtiei și a cartonului, prin execuția de ambalaje din aceste materiale.',
  },
  {
    an: '2006',
    titlu: 'Hală proprie',
    text: 'După patru ani într-un spațiu închiriat, societatea concesionează teren în zona industrială a Lugojului și își construiește hala proprie pe strada Tapiei nr. 49F, unde își desfășoară activitatea și astăzi.',
  },
  {
    an: 'Azi',
    titlu: 'Creștere constantă',
    text: 'De la trei la 26 de angajați pe 14 posturi distincte, cu investiții constante în mijloacele de producție și în aria logistică, și contracte de la firme mici până la multinaționale.',
  },
];

/* Replaces a list of equipment brands (Heidelberg, Roland, UV finishing,
   24h runs, Pantone) that appears in none of the source documents. Every
   entry below comes from "Prezentare firma" or "Prezentare generala". */
export const CAPABILITIES = [
  { val: '1999', label: 'anul înființării' },
  { val: '100%', label: 'capital privat românesc' },
  { val: 'Hală proprie', label: 'construită în 2006' },
  { val: '3 → 26', label: 'creștere a echipei' },
  { val: '14', label: 'posturi distincte' },
  { val: 'Carton & hârtie', label: 'prelucrare integrală' },
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

/**
 * No prices here, deliberately.
 *
 * The figures that used to sit in this file (45 RON for 100 business cards,
 * and so on) were placeholders carried over from the prototype — no source
 * document gives real tariffs. Publishing invented prices is worse than
 * publishing none: a visitor reasonably treats them as a quote.
 *
 * So the page configures a REQUEST rather than computing a total. Restore
 * pricing by adding `pret` back to the tiers once the client supplies real
 * ones; the UI changes needed are isolated to pages/Comenzi.tsx.
 */
export type QuantityTier = { cant: number };

export type Product = {
  id: string;
  nume: string;
  categorie: string;
  unitMeasure: string;
  /** Common order sizes, offered as shortcuts — not price breaks. */
  tiers: QuantityTier[];
  finisaje?: string[];
  /** Pre-selects the matching option on the contact form. */
  subject: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'cv',
    nume: 'Cărți de vizită',
    categorie: 'Printuri mici',
    unitMeasure: 'buc',
    tiers: [{ cant: 100 }, { cant: 250 }, { cant: 500 }, { cant: 1000 }],
    finisaje: ['Standard luciu', 'Mat UV', 'Soft-touch'],
    subject: 'Cărți de vizită',
  },
  {
    id: 'fl',
    nume: 'Fluturași A5',
    categorie: 'Printuri mici',
    unitMeasure: 'buc',
    tiers: [{ cant: 500 }, { cant: 1000 }, { cant: 2500 }, { cant: 5000 }],
    finisaje: ['Față simplu', 'Față-verso'],
    subject: 'Fluturași / Flyer-e',
  },
  {
    id: 'brosuri',
    nume: 'Broșuri A4 bi-fold',
    categorie: 'Printuri mici',
    unitMeasure: 'buc',
    tiers: [{ cant: 100 }, { cant: 250 }, { cant: 500 }, { cant: 1000 }],
    finisaje: ['Hârtie 115g', 'Hârtie 150g'],
    subject: 'Broșuri / Cataloage',
  },
  {
    id: 'banner',
    nume: 'Banner flex exterior',
    categorie: 'Printuri mari',
    unitMeasure: 'm²',
    tiers: [{ cant: 1 }, { cant: 5 }, { cant: 10 }, { cant: 25 }],
    subject: 'Bannere / Printuri mari',
  },
  {
    id: 'rollup',
    nume: 'Roll-up 85cm',
    categorie: 'Printuri mari',
    unitMeasure: 'buc',
    tiers: [{ cant: 1 }, { cant: 3 }, { cant: 5 }],
    subject: 'Bannere / Printuri mari',
  },
  {
    id: 'cutii',
    nume: 'Cutii personalizate',
    categorie: 'Ambalaje',
    unitMeasure: 'buc',
    tiers: [{ cant: 100 }, { cant: 250 }, { cant: 500 }, { cant: 1000 }],
    finisaje: ['Offset standard', 'Laminare mat', 'Laminare luciu', 'UV selectiv'],
    subject: 'Ambalaje personalizate',
  },
  {
    id: 'etichete',
    nume: 'Etichete adezive',
    categorie: 'Ambalaje',
    unitMeasure: 'buc',
    tiers: [{ cant: 500 }, { cant: 1000 }, { cant: 2500 }, { cant: 5000 }],
    finisaje: ['Mat', 'Luciu', 'Transparent'],
    subject: 'Etichete adezive',
  },
  {
    id: 'pungi',
    nume: 'Pungi hârtie kraft',
    categorie: 'Ambalaje',
    unitMeasure: 'buc',
    tiers: [{ cant: 100 }, { cant: 250 }, { cant: 500 }, { cant: 1000 }],
    subject: 'Ambalaje simple / albe',
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

/* Names corrected against "Prezentare generala". The document lists 17
   clients in total; this stays at four pending permission to publish the
   rest — see the note in README under "Open questions". */
export const PARTNERS = [
  { nume: 'Honeywell', sector: 'Industrial' },
  { nume: 'Hella', sector: 'Automotive' },
  { nume: 'Autoliv', sector: 'Automotive' },
  { nume: 'Mondial', sector: 'Materiale de construcții' },
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
