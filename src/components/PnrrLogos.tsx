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
 * Drop guvern.svg and pnrr.svg into public/pnrr/ and the placeholders
 * disappear. ue.svg is the EU emblem drawn to the published geometric
 * spec; replace it with the official NextGenerationEU lockup if the
 * auditor wants the exact file.
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
        <span className="pnrr-bar__eu">
          <img className="pnrr-slot pnrr-slot--flag" src="/pnrr/ue.svg" alt="Uniunea Europeană" />
          <span className="pnrr-bar__eu-text">
            Finanțat de Uniunea Europeană
            <strong>NextGenerationEU</strong>
          </span>
        </span>

        <LogoSlot src="/pnrr/guvern.svg" alt="Guvernul României" label="Guvernul României" />
        <LogoSlot src="/pnrr/pnrr.svg" alt="Planul Național de Redresare și Reziliență" label="PNRR" />
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
