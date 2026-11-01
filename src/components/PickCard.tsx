import { Check, Printer } from 'lucide-react';
import type { RequestItem } from '../data/content';
import { asset } from '../lib/asset';

/** srcset so a ~240px card does not download the 1200px file. */
function srcSet(slug: string) {
  return `${asset(`produse/${slug}-600.jpg`)} 600w, ${asset(`produse/${slug}-1200.jpg`)} 1200w`;
}

type Props = {
  item: RequestItem;
  selected: boolean;
  onSelect: (item: RequestItem) => void;
  /** Above-the-fold cards skip lazy loading so the grid paints immediately. */
  eager?: boolean;
};

/**
 * One choice in the Cere ofertă picker.
 *
 * Shares the catalogue's card shell so a product looks the same wherever it
 * appears, but this is a radio, not a link: the whole card is the control
 * and selecting it needs one click and no typing.
 *
 * Printing services fall back to a plain tile — nothing was photographed for
 * them, and a stand-in photo would be inventing what they look like.
 */
export default function PickCard({ item, selected, onSelect, eager }: Props) {
  const photo = item.imagini?.[0];

  return (
    <li className="pcard">
      <button
        type="button"
        className={`pcard__btn pcard__btn--pick${selected ? ' is-selected' : ''}`}
        // Radio semantics: a pressed toggle would say "Selectat" is something
        // you can switch off, when the only way out is choosing another.
        role="radio"
        aria-checked={selected}
        onClick={() => onSelect(item)}
      >
        <span className="pcard__media">
          {photo ? (
            <img
              className="pcard__img"
              src={asset(`produse/${photo.slug}-600.jpg`)}
              srcSet={srcSet(photo.slug)}
              sizes="(max-width: 560px) 45vw, 240px"
              alt={photo.alt}
              width={600}
              height={600}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
            />
          ) : (
            <span className="pcard__noimg" aria-hidden="true">
              <Printer size={30} strokeWidth={1.5} />
            </span>
          )}
        </span>

        <span className="pcard__body">
          <span className="pcard__name">{item.nume}</span>
          {item.dimensiuni && <span className="pcard__dim">{item.dimensiuni}</span>}
        </span>

        <span className="pcard__tick" aria-hidden="true">
          <Check size={15} strokeWidth={3} />
        </span>
      </button>
    </li>
  );
}
