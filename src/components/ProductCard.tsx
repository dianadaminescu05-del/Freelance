import { ArrowUpRight, Images } from 'lucide-react';
import type { CatalogProduct } from '../data/produse';

/** srcset so a 260px card does not download the 1200px file. */
function srcSet(slug: string) {
  return `/produse/${slug}-600.jpg 600w, /produse/${slug}-1200.jpg 1200w`;
}

type Props = {
  product: CatalogProduct;
  onOpen: (p: CatalogProduct) => void;
  /** Above-the-fold cards skip lazy loading so the grid paints immediately. */
  eager?: boolean;
};

export default function ProductCard({ product, onOpen, eager }: Props) {
  const [first, second] = product.imagini;

  return (
    <li className="pcard">
      {/* A button, not a div with onClick: tap is the primary interaction and
          must work from the keyboard. The hover image swap below is purely
          decorative enhancement for pointer devices. */}
      <button type="button" className="pcard__btn" onClick={() => onOpen(product)}>
        <span className="pcard__media">
          <img
            className="pcard__img pcard__img--base"
            src={`/produse/${first.slug}-600.jpg`}
            srcSet={srcSet(first.slug)}
            sizes="(max-width: 560px) 90vw, (max-width: 900px) 45vw, 270px"
            alt={first.alt}
            width={600}
            height={600}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
          {second && (
            <img
              className="pcard__img pcard__img--alt"
              src={`/produse/${second.slug}-600.jpg`}
              srcSet={srcSet(second.slug)}
              sizes="(max-width: 560px) 90vw, (max-width: 900px) 45vw, 270px"
              alt=""
              aria-hidden="true"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
            />
          )}
        </span>

        <span className="pcard__body">
          <span className="pcard__cat">{product.categorie}</span>
          <span className="pcard__name">{product.nume}</span>
          {product.dimensiuni && <span className="pcard__dim">{product.dimensiuni}</span>}
        </span>

        <span className="pcard__cue" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </span>

        {/* A bare number reads as cryptic; the icon says what it counts. */}
        {product.imagini.length > 1 && (
          <span className="pcard__count">
            <Images size={13} strokeWidth={2.5} aria-hidden="true" />
            {product.imagini.length}
            <span className="sr-only"> imagini</span>
          </span>
        )}
      </button>
    </li>
  );
}
