/**
 * `#RRGGBB` -> `rgba(r, g, b, a)`.
 *
 * Used instead of CSS relative colour syntax (`rgb(from #fff r g b / .12)`),
 * which Firefox only shipped in 128 and older Safari lacks entirely — a tint
 * that silently fails to parse would leave an untinted tile.
 */
export function alpha(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
