/** Company founding date, from the registration record: 01.11.1999. */
export const FOUNDED = { year: 1999, month: 11, day: 1 } as const;

/**
 * Completed years of activity, so the figure never goes stale and never
 * rounds up early — it increments on the anniversary, not on 1 January.
 */
export function yearsActive(now: Date = new Date()): number {
  let years = now.getFullYear() - FOUNDED.year;
  const monthsIn = now.getMonth() + 1 - FOUNDED.month;
  if (monthsIn < 0 || (monthsIn === 0 && now.getDate() < FOUNDED.day)) years -= 1;
  return years;
}

export const SITE = {
  name: 'Almariones',
  tagline: 'Print & Packaging',
  legalName: 'SC Tipografia Almariones',
  phone: '0256 356 277',
  phoneHref: 'tel:+40256356277',
  email: 'almariones@gmail.com',
  emailHref: 'mailto:almariones@gmail.com',
  whatsapp: 'https://wa.me/40256356277',
  messenger: 'https://m.me/Almariones',
  maps: 'https://maps.google.com/?q=Strada+Tapiei+49F+Lugoj',
  address: { street: 'Strada Tapiei nr. 49F', city: 'Lugoj', zip: '305500' },
  hours: 'Lu–Vi: 08:00–17:00',
  blurb:
    'Ambalaje și cutii din carton, produse în Lugoj din 1999. Capital integral românesc, hală proprie și relații de lungă durată cu partenerii noștri.',
} as const;

export type NavItem = { to: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { to: '/despre-noi', label: 'Despre noi' },
  { to: '/servicii', label: 'Servicii' },
  { to: '/comenzi', label: 'Cere ofertă' },
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
