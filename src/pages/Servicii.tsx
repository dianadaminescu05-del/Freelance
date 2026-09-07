import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Dot } from 'lucide-react';
import PageHero from '../components/PageHero';
import { EASE } from '../components/motion';
import { FINISHES, SERVICE_GROUPS, type ServiceGroupKey } from '../data/content';

const GROUP_KEYS = Object.keys(SERVICE_GROUPS) as ServiceGroupKey[];

export default function Servicii() {
  const [active, setActive] = useState<ServiceGroupKey>('ambalaje');

  return (
    <>
      <PageHero
        title="Servicii & Produse"
        breadcrumb="Servicii"
        subtitle="De la ambalaje personalizate la bannere și cărți de vizită — totul sub un singur acoperiș."
      />

      {/* -------------------------------------------------- Tabbed catalog */}
      <section className="page-section section--paper">
        <div className="container">
          {/* Toggle buttons, not role="tab" — a real tablist owes the user
              arrow-key roving focus, and claiming the role without it is
              worse for screen readers than plain buttons. */}
          <div className="tabs" role="group" aria-label="Categorie de produse">
            {GROUP_KEYS.map((key) => (
              <motion.button
                key={key}
                type="button"
                aria-pressed={active === key}
                className={`tab${active === key ? ' is-active' : ''}`}
                onClick={() => setActive(key)}
                whileTap={{ scale: 0.97 }}
              >
                {SERVICE_GROUPS[key].label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="item-grid"
              aria-live="polite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {SERVICE_GROUPS[active].items.map((item, i) => (
                <motion.div
                  key={item.titlu}
                  className="item-cell"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  whileHover={{ backgroundColor: 'var(--paper)', transition: { duration: 0.15 } }}
                >
                  <span className="item-cell__icon">
                    <Dot size={18} strokeWidth={6} aria-hidden="true" />
                  </span>
                  <div>
                    <h4>{item.titlu}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="item-grid__footnote">
            Nu găsești ce cauți?{' '}
            <Link to="/contact" className="link-accent" style={{ display: 'inline-flex' }}>
              Cerere personalizată
              <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- Finishes */}
      <section className="page-section section--paper-warm">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">Finisaje disponibile</p>
            <div className="divider" />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '2.5rem', maxWidth: 400 }}>
              Detaliile care fac diferența
            </h2>
          </motion.div>

          <div className="finish-grid">
            {FINISHES.map((item, i) => (
              <motion.div
                key={item.f}
                className="finish-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              >
                <h4>{item.f}</h4>
                <p>{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- CTA */}
      <section className="section--accent" style={{ padding: '4rem 0' }}>
        <div className="container cta-strip cta-strip--accent">
          <h2>Calculează prețul acum</h2>
          <Link to="/comenzi" className="btn btn--on-accent">
            Calculator preț
            <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
