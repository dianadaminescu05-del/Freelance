export const SITE = {
  name: 'Almariones',
  tagline: 'Print & Packaging',
  legalName: 'Almariones SRL',
  phone: '0256 356 277',
  phoneHref: 'tel:+40256356277',
  email: 'almariones@gmail.com',
  emailHref: 'mailto:almariones@gmail.com',
  whatsapp: 'https://wa.me/40256356277',
  messenger: 'https://m.me/Almariones',
  maps: 'https://maps.google.com/?q=strada+Tapiei+FN+Lugoj',
  address: { street: 'Strada Tapiei FN', city: 'Lugoj', zip: '305500' },
  hours: 'Lu–Vi: 08:00–17:00',
  blurb:
    'Tipografie și ambalaje personalizate în Lugoj. Calitate offset, livrare proprie în toată regiunea de vest.',
} as const;

export type NavItem = { to: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { to: '/despre-noi', label: 'Despre noi' },
  { to: '/servicii', label: 'Servicii' },
  { to: '/comenzi', label: 'Comenzi online' },
  { to: '/b2b', label: 'B2B' },
  { to: '/contact', label: 'Contact' },
];

export const FOOTER_PRODUCTS = [
  'Ambalaje personalizate',
  'Ambalaje simple',
  'Bannere',
  'Cărți de vizită',
  'Broșuri',
  'Etichete',
];

/** The four colour bars running down the right edge of every dark hero. */
export const RAIL_COLORS = ['#36B8E8', '#E8318A', '#F5C200', '#555555'];
