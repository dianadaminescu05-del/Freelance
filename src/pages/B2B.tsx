import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Suspense, lazy } from 'react';
import PageHero from '../components/PageHero';

/* Leaflet and its stylesheet are ~45KB gzipped and only this page shows a
   map, so they are split out rather than ridden along in the bundle every
   visitor downloads. The placeholder reserves the map's exact height, so
   nothing below it jumps when the chunk lands. */
const DeliveryMap = lazy(() => import('../components/DeliveryMap'));
import { B2B_BENEFITS, PARTNERS } from '../data/content';

export default function B2B() {
  return (
    <>
      <PageHero
        light
        title="Parteneriate B2B"
        subtitle="Livrare directă, prețuri negociate și un partener de producție de încredere pe termen lung."
      />

      {/* ---------------------------------------------- Delivery + zones */}
      <section className="page-section section--paper">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section-label">Livrare directă</p>
              <div className="divider" />
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.5rem' }}>
                Livrăm direct la clienții noștri
              </h2>
              <p className="lead">
                Livrăm ambalaje pentru 85% dintre pizzeriile din Lugoj, dar și pentru pizzerii
                și restaurante din Caransebeș, Oțelu Roșu și Timișoara.
              </p>
            </div>

            <div>
              <h3 className="subhead">Zone de livrare</h3>
              <Suspense fallback={<div className="dmap dmap--loading" aria-hidden="true" />}>
                <DeliveryMap />
              </Suspense>
              <p className="note" style={{ marginTop: '0.75rem' }}>
                Alte localități la cerere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- Benefits + partners */}
      <section className="page-section section--ink">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section-label">De ce Almariones B2B</p>
              <div className="divider" style={{ margin: '1rem 0 2rem' }} />
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  color: 'var(--paper)',
                  marginBottom: '2rem',
                }}
              >
                Avantajele unui parteneriat pe termen lung
              </h2>

              {B2B_BENEFITS.map((b) => (
                <div key={b} className="benefit-row">
                  <span className="benefit-row__check">
                    <Check size={11} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="subhead subhead--dark">Parteneri actuali</h3>

              {PARTNERS.map((p) => (
                <div key={p.nume} className="partner-row">
                  <span className="nume">{p.nume}</span>
                  <span className="sector">{p.sector}</span>
                </div>
              ))}

              <div className="partner-row">
                <span className="partner-row__more">+ alte multinaționale din zona Lugoj</span>
              </div>

              <div className="partner-cta">
                <h4>Vrei să devii partener?</h4>
                <p>Contactează-ne pentru o ofertă personalizată și condiții preferențiale.</p>
                <Link to="/contact">
                  Contactează-ne
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
