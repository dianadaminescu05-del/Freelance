import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import { EASE, fadeUpLarge, inViewOnce } from '../components/motion';
import { CAPABILITIES, HALA, TIMELINE, VALUES } from '../data/content';
import { SITE, yearsActive } from '../data/site';

export default function DespreNoi() {
  return (
    <>
      <PageHero
        title="Despre noi"
        breadcrumb="Despre noi"
        subtitle={`Producem ambalaje și cutii din carton în Lugoj de ${yearsActive()} de ani.`}
      />

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
                De la tiparniță la hala de ambalaje
              </h2>
              <p className="lead" style={{ marginBottom: '1.25rem' }}>
                {SITE.legalName} a fost înființată în 1999, cu capital privat românesc 100%. În
                primii trei ani am tipărit documente, cărți, registre și reviste — iar din 2002 ne-am
                orientat către ceea ce facem și astăzi: prelucrarea hârtiei și a cartonului.
              </p>
              <p className="lead">
                Astăzi producem ambalaje și cutii din carton pentru clienți care merg de la firme
                mici de familie până la companii multinaționale. Livrăm ambalaje pentru 85% dintre
                pizzeriile din Lugoj, dar și în Caransebeș, Oțelul Roșu și Timișoara.
              </p>

              <div className="callout">
                <p>
                  <strong style={{ color: 'var(--ink)' }}>Oportunități fructificate.</strong>{' '}
                  Creșterea constantă a cifrei de afaceri a venit din investiții în mijloacele de
                  producție și în logistică — nu din promisiuni.
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

      {/* ------------------------------------------------------- Timeline */}
      <section className="page-section section--paper-warm">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">Etape</p>
            <div className="divider" />
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '3rem' }}>
              Cum am ajuns aici
            </h2>
          </motion.div>

          <ol className="timeline">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.an}
                className="timeline__item"
                custom={i}
                variants={fadeUpLarge}
                {...inViewOnce}
              >
                <div className="timeline__marker" aria-hidden="true" />
                <div className="timeline__an">{t.an}</div>
                <h3 className="timeline__titlu">{t.titlu}</h3>
                <p className="timeline__text">{t.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- The hall */}
      <section className="page-section section--paper">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">Hala din Lugoj</p>
            <div className="divider" />
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Unde se face treaba
            </h2>
            <p className="lead" style={{ marginBottom: '2.5rem' }}>
              Hala proprie de pe strada Tapiei, construită în 2006 și folosită de atunci pentru
              producție și depozitare.
            </p>
          </motion.div>

          <ul className="hall-grid">
            {HALA.map((img, i) => (
              <motion.li
                key={img.slug}
                className="hall-grid__item"
                custom={i}
                variants={fadeUpLarge}
                {...inViewOnce}
              >
                <img
                  src={`/depozit/${img.slug}-1400.jpg`}
                  alt={img.alt}
                  width={1400}
                  height={933}
                  loading="lazy"
                  decoding="async"
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------- The company */}
      <section className="page-section section--ink">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">Societatea în cifre</p>
            <div className="divider" style={{ margin: '1rem 0 2.5rem' }} />
            <h2 className="heading-dark">O afacere locală, construită pas cu pas</h2>
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
        className="section--paper"
        style={{ padding: '4rem 0' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container cta-strip">
          <div>
            <h2>Vrei să colaborăm?</h2>
            <p>Spune-ne ce ai nevoie și revenim cu o ofertă.</p>
          </div>
          <Link to="/contact" className="btn btn--primary" style={{ whiteSpace: 'nowrap' }}>
            Trimite o cerere
          </Link>
        </div>
      </motion.section>
    </>
  );
}
