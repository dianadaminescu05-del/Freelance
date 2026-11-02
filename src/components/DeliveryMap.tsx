import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DELIVERY_ZONES, type DeliveryPoint } from '../data/content';

/**
 * Delivery coverage on a real map.
 *
 * Leaflet with OpenStreetMap tiles: no API key, no billing account, and no
 * third-party cookies — which matters on a PNRR-funded site that carries no
 * consent banner. A Google Maps embed would have needed both a card on file
 * and a banner before it could load.
 *
 * Markers are divIcons rather than Leaflet's default pin PNG. That image is
 * loaded by a relative URL baked into the stylesheet, which breaks under the
 * /Freelance/ base the same way every other asset here did; a styled <span>
 * sidesteps it and takes the site's own colours.
 *
 * The map is pannable but not scroll-zoomable: a wheel over a map halfway
 * down a page should scroll the page, not zoom. Buttons and pinch still
 * zoom, so nothing is unreachable.
 */

/** Romania's west, loose enough to hold every pin with margin. */
const MAX_BOUNDS = L.latLngBounds([44.6, 20.0], [47.2, 24.2]);

function markerIcon(p: DeliveryPoint) {
  return L.divIcon({
    className: '',
    html: `<span class="dmap__pin${p.hq ? ' is-hq' : ''}" aria-hidden="true"></span>`,
    iconSize: p.hq ? [20, 20] : [14, 14],
    iconAnchor: p.hq ? [10, 10] : [7, 7],
  });
}

export default function DeliveryMap({ points = DELIVERY_ZONES }: { points?: DeliveryPoint[] }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || mapRef.current) return;

    const map = L.map(host, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
      maxBounds: MAX_BOUNDS,
      maxBoundsViscosity: 0.8,
      minZoom: 7,
      maxZoom: 12,
    });
    mapRef.current = map;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // OpenStreetMap's tile policy requires the credit to stay visible.
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const group = L.featureGroup(
      points.map((p) =>
        L.marker([p.lat, p.lon], {
          icon: markerIcon(p),
          // Markers are decorative here — the legend below is the readable
          // list — but a keyboard user landing on one should learn something.
          alt: p.oras,
          keyboard: false,
        }).bindTooltip(p.oras, { direction: 'top', offset: [0, p.hq ? -12 : -9] }),
      ),
    ).addTo(map);

    map.fitBounds(group.getBounds(), { padding: [38, 38] });

    // Leaflet measures the container on creation; inside a grid that has not
    // settled yet it can read zero and paint a grey box.
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(host);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [points]);

  return (
    <div className="dmap">
      <div
        ref={hostRef}
        className="dmap__canvas"
        role="application"
        aria-label={`Hartă cu ${points.length} localități deservite, în vestul țării.`}
      />

      {/* The readable version. A map is not a list, and the towns have to be
          available to anyone who cannot use one. */}
      <ul className="dmap__legend">
        {points.map((p) => (
          <li key={p.oras} className={p.hq ? 'is-hq' : undefined}>
            <span>{p.oras}</span>
            {p.hq && <span className="dmap__km">sediu</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
