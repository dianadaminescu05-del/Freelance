import { useMemo } from 'react';
import { DELIVERY_ZONES, type DeliveryPoint } from '../data/content';

/**
 * Delivery coverage, drawn from real coordinates.
 *
 * Not a tile map: no Leaflet, no API key, no requests to a third party, and
 * nothing to load before it paints. The towns are few and close together,
 * so an equirectangular projection — longitude scaled by cos(latitude) —
 * is accurate to well under a pixel at this size, and the result is a plain
 * SVG that takes the site's own colours.
 *
 * It carries no coastline or border. Those would have to be drawn by eye
 * and would be the least accurate thing on screen; the rings give the scale
 * instead, and every pin sits where it actually is relative to Lugoj.
 *
 * The visible labels make it readable; the list underneath is what a screen
 * reader gets, since a scatter of <text> in an SVG is not a usable
 * substitute for one.
 */

const RINGS = [40, 80] as const;
const KM_PER_DEG = 111.32;
const PAD = 26; // room for a pin and its label at the edges

export default function DeliveryMap({ points = DELIVERY_ZONES }: { points?: DeliveryPoint[] }) {
  const { plotted, box, scale } = useMemo(() => {
    const hq = points.find((p) => p.hq) ?? points[0];
    const cosLat = Math.cos((hq.lat * Math.PI) / 180);

    // Everything in km on a plane centred on the depot: east positive,
    // north positive.
    const km = points.map((p) => ({
      p,
      x: (p.lon - hq.lon) * KM_PER_DEG * cosLat,
      y: (p.lat - hq.lat) * KM_PER_DEG,
    }));

    // Scale to the outer ring, not to the furthest pin: the ring is the
    // widest thing drawn, and sizing to a pin let it run off the canvas
    // with its label above the top edge.
    const reach = Math.max(
      ...km.map((k) => Math.hypot(k.x, k.y)),
      RINGS[RINGS.length - 1],
    );
    const w = 520;
    const h = 420;
    const s = (h / 2 - PAD) / reach;
    const cx = w / 2;
    const cy = h / 2;

    return {
      scale: s,
      box: { w, h },
      plotted: km.map((k) => ({
        ...k.p,
        // SVG y grows downward, so north flips.
        cx: cx + k.x * s,
        cy: cy - k.y * s,
        dist: Math.round(Math.hypot(k.x, k.y)),
      })),
    };
  }, [points]);

  const hq = plotted.find((p) => p.hq) ?? plotted[0];

  return (
    <div className="dmap">
      <svg
        className="dmap__svg"
        viewBox={`0 0 ${box.w} ${box.h}`}
        role="img"
        aria-label={`Hartă: ${points.length} localități deservite din Lugoj, în vestul țării.`}
      >
        {/* Scale rings, labelled so the distances are readable off the map
            rather than asserted next to each town. */}
        {RINGS.map((r) => (
          <g key={r}>
            <circle className="dmap__ring" cx={hq.cx} cy={hq.cy} r={r * scale} />
            <text className="dmap__ring-label" x={hq.cx} y={hq.cy - r * scale - 5}>
              {r} km
            </text>
          </g>
        ))}

        {/* Spokes from the depot: the thing being shown is that deliveries
            run out of Lugoj, not that the towns form a shape. */}
        {plotted
          .filter((p) => !p.hq)
          .map((p) => (
            <line key={p.oras} className="dmap__spoke" x1={hq.cx} y1={hq.cy} x2={p.cx} y2={p.cy} />
          ))}

        {plotted.map((p) => (
          <g key={p.oras} className={`dmap__pin${p.hq ? ' is-hq' : ''}`}>
            <circle cx={p.cx} cy={p.cy} r={p.hq ? 7 : 4.5} />
            {p.hq && <circle className="dmap__halo" cx={p.cx} cy={p.cy} r={13} />}
            <text
              x={p.cx}
              y={p.cy - (p.hq ? 15 : 11)}
              textAnchor={p.cx > box.w * 0.72 ? 'end' : p.cx < box.w * 0.28 ? 'start' : 'middle'}
            >
              {p.oras}
            </text>
          </g>
        ))}
      </svg>

      <ul className="dmap__legend">
        {plotted.map((p) => (
          <li key={p.oras} className={p.hq ? 'is-hq' : undefined}>
            <span>{p.oras}</span>
            <span className="dmap__km">{p.hq ? 'sediu' : `~${p.dist} km`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
