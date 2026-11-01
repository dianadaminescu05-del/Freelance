import { useState } from 'react';

/**
 * PNRR funding visibility — the mandatory emblems.
 *
 * Order is fixed by the funding rules: EU emblem with the "Finanțat de
 * Uniunea Europeană / NextGenerationEU" wording, then the Government of
 * Romania emblem, then the PNRR logo. They must be polychrome and visible
 * at the top of the screen without scrolling, which is why this sits
 * inside the fixed header rather than in the page flow.
 *
 * Official kit: "Pachet logo-uri PNRR" on https://mfe.gov.ro/pnrr/
 *
 * Current assets, all from official sources:
 *   ue.png     RO "Finanțat de Uniunea Europeană / NextGenerationEU" lockup,
 *              RGB positive, from the Commission's logo download centre
 *   guvern.svg official RGB seal, supplied by the client
 *   pnrr.png   extracted from p.12 of the visual identity manual, because
 *              mfe.gov.ro's WAF blocks automated download of the logo pack
 *
 * Sizes and spacing follow that manual (p.8): minimum 1 cm per logo, and
 * at least one EU-logo width between them. See tokens.css.
 */

function LogoSlot({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Deliberately conspicuous: a missing mandatory emblem is a compliance
    // failure, so it should look wrong rather than quietly vanish.
    return (
      <span className="pnrr-slot pnrr-slot--missing" role="img" aria-label={`${alt} (lipsă)`}>
        {label}
      </span>
    );
  }

  return <img className="pnrr-slot" src={src} alt={alt} onError={() => setFailed(true)} />;
}

export function PnrrBar() {
  return (
    <div className="pnrr-bar">
      <div className="pnrr-bar__inner">
        {/* The official RO lockup, emblem and funding statement as one asset.
            EU rules forbid separating the two or re-setting the statement in
            another typeface, so this replaces the earlier flag + HTML text. */}
        <LogoSlot
          src="/pnrr/ue.png"
          alt="Finanțat de Uniunea Europeană — NextGenerationEU"
          label="Finanțat de Uniunea Europeană"
        />

        <LogoSlot src="/pnrr/guvern.svg" alt="Guvernul României" label="Guvernul României" />
        {/* Raster, not vector: mfe.gov.ro's WAF blocks automated download of
            the logo pack, so this was extracted at high resolution from p.12
            of the official Manual de Identitate Vizuală. Swap in the vector
            from "Pachet logo-uri PNRR" when it can be fetched by hand. */}
        <LogoSlot src="/pnrr/pnrr.png" alt="Planul Național de Redresare și Reziliență" label="PNRR" />
      </div>
    </div>
  );
}

/** The slogan, disclaimer and programme links, carried in the site footer. */
export function PnrrNotice({ facebookUrl }: { facebookUrl?: string }) {
  return (
    <section className="pnrr-notice" aria-label="Finanțare PNRR">
      <p className="pnrr-notice__slogan">
        PNRR. Finanțat de Uniunea Europeană – UrmătoareaGenerațieUE
      </p>

      <p className="pnrr-notice__disclaimer">
        Conținutul acestui material nu reprezintă în mod obligatoriu poziția oficială a Uniunii
        Europene sau a Guvernului României.
      </p>

      <p className="pnrr-notice__links">
        <a href="https://mfe.gov.ro/pnrr/" target="_blank" rel="noopener noreferrer">
          mfe.gov.ro/pnrr
          <span className="sr-only"> (se deschide într-o filă nouă)</span>
        </a>
        {facebookUrl && (
          <>
            <span aria-hidden="true"> · </span>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              Pagina de Facebook a programului
              <span className="sr-only"> (se deschide într-o filă nouă)</span>
            </a>
          </>
        )}
      </p>
    </section>
  );
}
