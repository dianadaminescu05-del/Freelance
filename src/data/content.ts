import type { LucideIcon } from 'lucide-react';
import { Box, Boxes, PawPrint, Truck } from 'lucide-react';
import { CATEGORII, PRODUSE, type Categorie, type ProductImage } from './produse';

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

/** Counts come from the catalogue so a card can never claim a range the
 *  product list does not actually contain. */
const count = (c: Categorie) => PRODUSE.filter((p) => p.categorie === c).length;

export const SERVICE_CARDS: ServiceCard[] = [
  {
    label: 'Cutii personalizate',
    sub: `${count('Cutii personalizate')} modele, cu sau fără tipar`,
    to: '/servicii?categorie=Cutii+personalizate',
    color: '#0099CC',
    textColor: '#007EA8',
    icon: Box,
  },
  {
    label: 'Ambalaje alimentare',
    sub: `${count('Ambalaje alimentare')} modele pentru pizza și fastfood`,
    to: '/servicii?categorie=Ambalaje+alimentare',
    color: '#E8318A',
    textColor: '#C5166B',
    icon: Boxes,
  },
  {
    label: 'Hrană animale',
    sub: `${count('Hrană animale')} formate, dimensiuni la cerere`,
    to: '/servicii?categorie=Hrană+animale',
    color: '#F5C200',
    textColor: '#816600',
    icon: PawPrint,
  },
  {
    label: 'Transport & depozitare',
    sub: `${count('Transport & depozitare')} modele, plus separatoare`,
    to: '/servicii?categorie=Transport+%26+depozitare',
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
  // "în prezent", not "în producție": the document gives a single figure,
  // "Nr. angajati actuali: 26", with no departmental split — and separately
  // records "Posturi: 14". Claiming all 26 are on the floor was ours.
  { n: '26', l: 'angajați\nîn prezent' },
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


/* --------------------------------------------------------------- Comenzi */

/**
 * Cere ofertă — what a visitor can put in a request.
 *
 * Driven by the real catalogue plus the printing services the company
 * advertises on its own premises. Everything the prototype used to carry
 * here is gone: the Printuri mici / Printuri mari categories (deleted from
 * /servicii as invented, but left standing here), products that exist in no
 * document (Roll-up 85cm, Etichete adezive, Pungi hârtie kraft), the specs
 * attached to the ones that do ("A5", "A4 bi-fold", "flex exterior"), the
 * finishes, and the quantity tiers. None of it had a source.
 *
 * The page configures a REQUEST, not a quote — no document gives tariffs,
 * and invented prices are worse than none because a visitor treats them as
 * binding.
 */

/** From the "Servicii tipărire" poster photographed in the company's own
 *  facility (Servicii.JPG). Listed exactly as the poster words them — no
 *  formats, weights or finishes, because the poster states none. */
export const SERVICII_TIPARIRE = [
  'Logo',
  'Flyers',
  'Cărți de vizită',
  'Broșuri',
  'Postere',
  'Calendare',
  'Banner',
];

export type RequestItem = {
  id: string;
  nume: string;
  categorie: string;
  /** Only where the client stated it. */
  dimensiuni?: string;
  /** Pieces for the catalogue, which is all discrete boxes. Left off the
   *  printing services, where it genuinely varies — a banner is quoted by
   *  area and a business card by the hundred. */
  unitMeasure?: string;
  /** Pre-selects the matching option on the contact form. */
  subject: string;
  /** Catalogue shots, so the picker can be chosen by eye. The printing
   *  services have none — nothing was photographed for them. */
  imagini?: ProductImage[];
};

/**
 * Quantity bands.
 *
 * These describe what the BUYER is after, not what the company sells, which
 * is why they are safe where the old tiers were not: those claimed
 * Almariones' order sizes, and no document states any. Nobody has to type a
 * number, and "nu știu încă" is a real answer for someone still scoping.
 */
export const QUANTITY_BANDS = [
  'sub 100',
  '100 – 500',
  '500 – 1.000',
  '1.000 – 5.000',
  'peste 5.000',
  'Nu știu încă',
];

const TIPARIRE_CATEGORY = 'Servicii tipărire';

export const REQUEST_ITEMS: RequestItem[] = [
  ...PRODUSE.map((p) => ({
    id: p.slug,
    nume: p.nume,
    categorie: p.categorie as string,
    dimensiuni: p.dimensiuni,
    unitMeasure: 'buc',
    subject: p.categorie as string,
    imagini: p.imagini,
  })),
  ...SERVICII_TIPARIRE.map((nume) => ({
    id: `tiparire-${nume.toLowerCase().replace(/[^a-z]+/g, '-')}`,
    nume,
    categorie: TIPARIRE_CATEGORY,
    subject: TIPARIRE_CATEGORY,
  })),
];

export const REQUEST_CATEGORIES = ['Toate', ...CATEGORII, TIPARIRE_CATEGORY];

/* ------------------------------------------------------------------- B2B */

/**
 * Places the company delivers to, as map points.
 *
 * Real coordinates, so the map plots measurable positions instead of being
 * drawn by eye.
 *
 * The distances the list used to print are gone. They did not survive
 * being checked: Timișoara's "55 km" is a straight-line figure, Arad's
 * "110 km" a road one, and on a map the two cannot coexist — Arad is 72km
 * out and would have been drawn nearer than Deva while claiming to be 20km
 * further. No document gives any of them. Road distances can come back
 * when the client supplies a real set.
 *
 * `sourced` marks the four named in "Prezentare generala": "livreaza
 * ambalaje pentru 85% dintre pizzeriile din Lugoj, dar si pentru pizzerii
 * si restaurante din Caransebes, Otelul Rosu, Timisoara". Oțelu Roșu is
 * named there and had been left off this list entirely; Reșița, Deva,
 * Hunedoara and Arad are on it and appear in no document. See README.
 */
export type DeliveryPoint = {
  oras: string;
  lat: number;
  lon: number;
  hq?: boolean;
  sourced?: boolean;
};

export const DELIVERY_ZONES: DeliveryPoint[] = [
  { oras: 'Lugoj', lat: 45.6886, lon: 21.9033, hq: true, sourced: true },
  { oras: 'Timișoara', lat: 45.7489, lon: 21.2087, sourced: true },
  { oras: 'Caransebeș', lat: 45.4214, lon: 22.2186, sourced: true },
  { oras: 'Oțelu Roșu', lat: 45.5256, lon: 22.3633, sourced: true },
  { oras: 'Reșița', lat: 45.3008, lon: 21.8893 },
  { oras: 'Deva', lat: 45.8833, lon: 22.9 },
  { oras: 'Hunedoara', lat: 45.75, lon: 22.9 },
  { oras: 'Arad', lat: 46.1866, lon: 21.3123 },
];

/* Replaces FLEET_STATS, which was four invented figures — 3.5t, 7 zones,
   weekly routes, 24h. Searching all three documents for every transport
   term turned up no vehicle, no tonnage, no route and no delivery time;
   the nearest hits were "mașinile de operat" (production machinery, in a
   list of photos to take) and "pregătirii logistice" (cash flow, in the
   banking paragraph).

   Each of these four is a single unambiguous statement from "Prezentare
   firma" or "Prezentare generala", quoted below. None needs arithmetic or
   a judgement call about what counts — the client list, for instance, is
   spelled differently across the two documents, so a count of it would be
   our deduplication rather than their figure. */
export const B2B_FACTS = [
  // "Data deschiderii: 01.11.1999"
  { val: '1999', label: 'anul înființării' },
  // "din 01.08.2006 s-a concesionat teren si s-a construit hala proprie
  //  unde se desfasoara activitatea acum"
  { val: '2006', label: 'hală proprie' },
  // "Nr. angajati actuali: 26"
  { val: '26', label: 'angajați în prezent' },
  // "avand un capital privat romanesc 100%"
  { val: '100%', label: 'capital românesc' },
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

/* Warehouse photographs, hand-picked from "Poze depozit". Captions state
   only what is visible — no throughput or capacity figures, since no
   document gives any. */
export const HALA = [
  { slug: 'hala-3', alt: 'Hala de producție din Lugoj, cu paleți de carton pregătiți' },
  { slug: 'stoc-paleti', alt: 'Paleți cu coli de carton ondulat, depozitate' },
  { slug: 'transpalet', alt: 'Transpalet manual lângă un palet de carton ondulat' },
  { slug: 'coli-tiparite', alt: 'Coli de carton tipărite, pregătite pentru ștanțare' },
  { slug: 'hala-1', alt: 'Paleți cu carton aliniați pe lungimea halei' },
];
/* Five, not four: the first image spans both columns, so an even number
   after it leaves the last tile stranded in a half-empty row. */

/* --------------------------------------------------------------- Contact */

/* Mirrors the catalogue's own categories plus the printing services, so a
   subject handed over from /comenzi always matches an option here. The old
   list carried the same invented entries the order page did. */
export const CONTACT_SUBJECTS = [
  ...CATEGORII,
  'Servicii tipărire',
  'Parteneriat B2B',
  'Altele',
];
