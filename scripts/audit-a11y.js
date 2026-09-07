/**
 * In-page WCAG 2.1 AA sweep. Paste into the browser console on any route,
 * then call __audit() — or loop every route:
 *
 *   for (const p of ['/','/despre-noi','/servicii','/comenzi','/b2b','/contact']) {
 *     history.pushState({}, '', p);
 *     window.dispatchEvent(new PopStateEvent('popstate'));
 *     await new Promise(r => setTimeout(r, 1600));   // let entrance animations settle
 *     console.log(p, __audit());
 *   }
 *
 * Wait for animations before reading: an element mid-fade reports the contrast
 * of its current opacity, not its resting state, and will false-positive.
 *
 * Reports:
 *   contrastFails — text under 4.5:1 (or 3:1 when large), with measured ratio
 *   tinyText      — body copy under 14px
 *   smallTargets  — interactive elements under 40x24
 */
window.__audit = () => {
  const lin = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const L = (a) => 0.2126 * lin(a[0]) + 0.7152 * lin(a[1]) + 0.0722 * lin(a[2]);
  const parse = (s) => {
    const m = s.match(/[\d.]+/g);
    return m ? m.slice(0, 4).map(Number) : null;
  };
  const ratio = (a, b) => {
    const l = [L(a), L(b)].sort((x, y) => y - x);
    return (l[0] + 0.05) / (l[1] + 0.05);
  };
  const comp = (fg, bg) =>
    fg.length < 4 || fg[3] === 1
      ? fg.slice(0, 3)
      : [0, 1, 2].map((i) => Math.round(fg[i] * fg[3] + bg[i] * (1 - fg[3])));

  // Visually-hidden text (.sr-only and friends) is clipped to 1px and exists
  // only for screen readers — it has no rendered colour to measure, and
  // scoring it produces phantom 1:1 failures.
  const isVisuallyHidden = (el) => {
    const cs = getComputedStyle(el);
    if (cs.clipPath === 'inset(50%)') return true;
    if (cs.clip && cs.clip !== 'auto' && /rect\(0px,\s*0px,\s*0px,\s*0px\)/.test(cs.clip)) return true;
    const r = el.getBoundingClientRect();
    return r.width <= 1 || r.height <= 1;
  };

  // Walk up for the first ancestor with a (near-)opaque background.
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && (c.length < 4 || c[3] > 0.9)) return c.slice(0, 3);
      n = n.parentElement;
    }
    return [255, 255, 255];
  };

  const contrastFails = [];
  const tinyText = [];
  const smallTargets = [];

  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;

    // Direct text children only, so we attribute colour to the element that sets it.
    const txt = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join('');
    if (!txt) continue;

    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (isVisuallyHidden(el)) continue;

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight) || 400;
    const need = size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;

    let fg = parse(cs.color);
    const bg = bgOf(el);
    const op = parseFloat(cs.opacity);
    if (op < 1) fg = [fg[0], fg[1], fg[2], (fg[3] ?? 1) * op];

    const got = ratio(comp(fg, bg), bg);
    if (got < need - 0.01) {
      contrastFails.push({
        text: txt.slice(0, 32),
        got: +got.toFixed(2),
        need,
        px: +size.toFixed(1),
        sel: el.className && el.className.baseVal === undefined ? el.className : el.tagName,
      });
    }
    if (size < 14 && txt.length > 25) tinyText.push({ text: txt.slice(0, 30), px: +size.toFixed(1) });
  }

  for (const el of document.querySelectorAll('a[href],button,input,select,textarea')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (r.height < 40 || r.width < 24) {
      smallTargets.push({
        text: (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 26),
        w: Math.round(r.width),
        h: Math.round(r.height),
      });
    }
  }

  return { path: location.pathname, contrastFails, tinyText, smallTargets };
};
