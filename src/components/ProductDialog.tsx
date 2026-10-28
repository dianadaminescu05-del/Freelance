import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import type { CatalogProduct } from '../data/produse';

type Props = {
  product: CatalogProduct | null;
  onClose: () => void;
};

/**
 * Detail view, built on the native <dialog>.
 *
 * showModal() gives focus trapping, Escape-to-close, inert background and
 * focus restore for free — all the things a hand-rolled modal gets wrong.
 */
export default function ProductDialog({ product, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [product]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (product && !el.open) el.showModal();
    if (!product && el.open) el.close();
  }, [product]);

  // Fires for Escape and for the backdrop close, so state stays in sync.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('close', onClose);
    return () => el.removeEventListener('close', onClose);
  }, [onClose]);

  const image = product?.imagini[index];

  return (
    <dialog
      ref={ref}
      className="pdialog"
      aria-labelledby="pdialog-title"
      onClick={(e) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      {product && image && (
        <div className="pdialog__inner">
          <button
            type="button"
            className="pdialog__close"
            onClick={() => ref.current?.close()}
            aria-label="Închide"
          >
            <X size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <div className="pdialog__media">
            <img
              key={image.slug}
              src={`/produse/${image.slug}-1200.jpg`}
              alt={image.alt}
              width={1200}
              height={1200}
              decoding="async"
            />
          </div>

          <div className="pdialog__info">
            <p className="pdialog__cat">{product.categorie}</p>
            <h2 id="pdialog-title">{product.nume}</h2>
            {product.dimensiuni && <p className="pdialog__dim">{product.dimensiuni}</p>}

            {product.imagini.length > 1 && (
              <div className="pdialog__thumbs" role="group" aria-label="Imagini produs">
                {product.imagini.map((img, i) => (
                  <button
                    key={img.slug}
                    type="button"
                    className={`pdialog__thumb${i === index ? ' is-active' : ''}`}
                    aria-pressed={i === index}
                    onClick={() => setIndex(i)}
                  >
                    <img src={`/produse/${img.slug}-600.jpg`} alt="" aria-hidden="true" />
                    <span className="sr-only">{img.alt}</span>
                  </button>
                ))}
              </div>
            )}

            <Link
              to="/contact"
              state={{
                produs: 'Ambalaje personalizate',
                mesaj: `Produs: ${product.nume}${
                  product.dimensiuni ? ` (${product.dimensiuni})` : ''
                }\nCategorie: ${product.categorie}\n\nCantitate dorită:\nDetalii (tipar, material, termen):`,
              }}
              className="btn btn--accent pdialog__cta"
            >
              Cere o ofertă
              <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </dialog>
  );
}
