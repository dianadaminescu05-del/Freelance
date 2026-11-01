/**
 * Resolve a path under public/ against the deployed base.
 *
 * A root-absolute "/produse/x.jpg" is correct in dev and on a bare domain,
 * but the GitHub Pages build serves from /Freelance/, where it 404s. Vite
 * rewrites such paths only inside CSS and in imported modules — a string
 * built at runtime, which is how every gallery here names its files, is
 * left alone. BASE_URL always carries its trailing slash.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
