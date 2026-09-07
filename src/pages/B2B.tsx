import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import { B2B_BENEFITS, DELIVERY_ZONES, FLEET_STATS, PARTNERS } from '../data/content';

export default function B2B() {
  return (
    <>
      <PageHero
        title="Parteneriate B2B"
        breadcrumb="B2B"
        subtitle="Livrare proprie, prețuri negociate și un partener de producție de încredere pe termen lung."
      />

      {/* ------------------------------------------------ Fleet + zones */}
      <section className="page-section section--paper">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section-label">Transport propriu</p>
              <div className="divider" />
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.5rem' }}>
                Flota noastră livrează direct la tine
              </h2>
              <p className="lead">
                Cu vehicule proprii de până la 3,5 tone, asigurăm livrarea directă la sediu — fără
                intermediari, fără costuri ascunse.
              </p>

              <div className="fleet-grid">
                {FLEET_STATS.map((s) => (
                  <div key={s.label} className="fleet-cell">
                    <div className="val">{s.val}</div>
                    <div className="label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="subhead">Zone de livrare</h3>
              <div className="zone-list">
                {DELIVERY_ZONES.map((z) => (
                  <div key={z.oras} className={`zone-row${z.highlight ? ' is-hq' : ''}`}>
                    <span className="oras">
                      {z.highlight && <MapPin size={15} strokeWidth={2} aria-hidden="true" />}
                      {z.oras}
                    </span>
                    <span className="dist">{z.dist}</span>
                  </div>
                ))}
              </div>
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
