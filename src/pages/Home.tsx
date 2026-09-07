import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AccentRail from '../components/AccentRail';
import HeroMedia, { useHeroScroll } from '../components/HeroMedia';
import { EASE, fadeUp, stagger } from '../components/motion';
import { HERO_STATS, PARTNER_LOGOS, SERVICE_CARDS } from '../data/content';
import { alpha } from '../lib/color';

export default function Home() {
  const { ref: heroRef, scrollYProgress } = useHeroScroll();

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="home-hero" ref={heroRef}>
        <HeroMedia progress={scrollYProgress} />
        <AccentRail animate />

        <div className="container relative z-[1]">
          <div className="home-hero__inner">
            <div className="max-w-[30rem] lg:max-w-[33rem] xl:max-w-[36rem]">
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span />
                <span>Tipografie &amp; Ambalaje · Lugoj</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                Tipărim
                <br />
                <em>tot</em> ce
                <br />
                ai nevoie.
              </motion.h1>

              <motion.p
                className="home-hero__lead"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              >
                Ambalaje personalizate, printuri de orice format și soluții B2B cu livrare proprie în
                toată regiunea de vest.
              </motion.p>

              <motion.div
                className="home-hero__actions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
              >
                <Link to="/comenzi" className="btn btn--ghost-dark">
                  Calculator preț
                </Link>
                <Link to="/servicii" className="btn btn--accent">
                  Vezi serviciile
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Stats sit under the copy now, so the right half is free for
                  the visual instead of being split between the two. */}
              <motion.dl
                className="home-hero__stats"
                variants={stagger}
                initial="hidden"
                animate="show"
              >
                {HERO_STATS.map((stat, i) => (
                  <motion.div key={stat.n} className="home-hero__stat" custom={i} variants={fadeUp}>
                    <dt className="sr-only">{stat.l.replace('\n', ' ')}</dt>
                    <dd>
                      <span className="n">{stat.n}</span>
                      <span className="l" aria-hidden="true">
                        {stat.l}
                      </span>
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Services */}
      <section className="page-section section--paper">
        <div className="container">
          <div className="section-head">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="section-label">Ce oferim</p>
              <div className="divider" />
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Tot sub un acoperiș</h2>
            </motion.div>

            <Link to="/servicii" className="link-accent">
              Toate serviciile
              <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>

          <motion.div
            className="service-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {SERVICE_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} custom={i} variants={fadeUp}>
                  {/* Lift only. The tint used to live here, but a background
                      on this wrapper paints square corners behind the now
                      rounded card; border and shadow are handled in CSS. */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    style={{ height: '100%' }}
                  >
                    <Link to={card.to} className="service-card group">
                      {/* Icon sits in a tinted tile keyed to the card's colour.
                          Tile fill is the bright hue at 12%; the glyph uses the
                          AA-safe dark step, so it clears 3:1 on the tile. */}
                      <span
                        aria-hidden="true"
                        className="mb-6 inline-flex h-14 w-14 shrink-0 items-center
                                   justify-center rounded-[1.125rem] transition-transform
                                   duration-200 ease-brand group-hover:-translate-y-0.5
                                   group-hover:rotate-[-4deg] motion-reduce:transform-none"
                        style={{
                          backgroundColor: alpha(card.color, 0.12),
                          boxShadow: `inset 0 0 0 1px ${alpha(card.color, 0.28)}`,
                          color: card.textColor,
                        }}
                      >
                        <Icon size={24} strokeWidth={1.75} />
                      </span>

                      <h3>{card.label}</h3>
                      <p>{card.sub}</p>

                      <span className="service-card__more" style={{ color: card.textColor }}>
                        Detalii
                        <ArrowRight
                          size={14}
                          strokeWidth={2.5}
                          aria-hidden="true"
                          className="transition-transform duration-200 ease-brand
                                     group-hover:translate-x-1 motion-reduce:transform-none"
                        />
                      </span>

                      {/* Accent rule that fills in on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0
                                   transition-transform duration-300 ease-brand
                                   group-hover:scale-x-100"
                        style={{ background: card.color }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------- Partners */}
      <motion.div
        className="partners-strip"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="partners-strip__inner">
            <span className="partners-strip__label">Parteneri</span>
            {PARTNER_LOGOS.map((name, i) => (
              <motion.span
                key={name}
                className="partners-strip__logo"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {name}
              </motion.span>
            ))}
            <span className="partners-strip__more">+ alte multinaționale</span>
          </div>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band__inner">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="section-label">Gata să începem?</p>
              <div className="divider" />
              <h2>Calculează prețul sau cere o ofertă personalizată</h2>
            </motion.div>

            <motion.div
              className="cta-band__actions"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <Link to="/comenzi" className="btn btn--accent">
                Calculator preț
              </Link>
              <Link to="/contact" className="btn btn--outline-dark">
                Contactează-ne
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
