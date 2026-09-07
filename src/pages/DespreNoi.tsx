import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import { EASE, fadeUpLarge, inViewOnce } from '../components/motion';
import { CAPABILITIES, VALUES } from '../data/content';

export default function DespreNoi() {
  return (
    <>
      <PageHero title="Despre noi" breadcrumb="Despre noi" />

      {/* ---------------------------------------------------------- Story */}
      <section className="page-section section--paper">
        <div className="container">
          <div className="two-col">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="section-label">Povestea noastră</p>
              <div className="divider" />
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.75rem' }}>
                O tipografie cu rădăcini în Lugoj
              </h2>
              <p className="lead" style={{ marginBottom: '1.25rem' }}>
                De peste 15 ani, Almariones este partenerul de încredere al companiilor din vestul
                României pentru tipăritură de calitate și ambalaje personalizate.
              </p>
              <p className="lead">
                Începând ca o mică tipografie locală, astăzi deservim companii din 7 județe, inclusiv
                multinaționale cu standarde ridicate de calitate.
              </p>

              <div className="callout">
                <p style={{ fontStyle: 'italic' }}>
                  * Textul de prezentare urmează să fie sincronizat cu clientul.
                </p>
              </div>
            </motion.div>

            <div className="values-list">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.n}
                  className="value-row"
                  custom={i}
                  variants={fadeUpLarge}
                  {...inViewOnce}
                >
                  <div className="value-row__n">{v.n}</div>
                  <div>
                    <h4>{v.titlu}</h4>
                    <p>{v.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Capabilities */}
      <section className="page-section section--ink">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">Capacități tehnice</p>
            <div className="divider" style={{ margin: '1rem 0 2.5rem' }} />
            <h2 className="heading-dark">Echipamente profesionale, rezultate de excepție</h2>
          </motion.div>

          <div className="capability-grid">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.val}
                className="capability-cell"
                custom={i}
                variants={fadeUpLarge}
                {...inViewOnce}
              >
                <div className="val">{c.val}</div>
                <div className="label">{c.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <motion.section
        className="section--paper-warm"
        style={{ padding: '4rem 0' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container cta-strip">
          <div>
            <h2>Vrei să colaborăm?</h2>
            <p>Contactează-ne pentru o discuție despre nevoile tale.</p>
          </div>
          <Link to="/contact" className="btn btn--primary" style={{ whiteSpace: 'nowrap' }}>
            Trimite o cerere
          </Link>
        </div>
      </motion.section>
    </>
  );
}
