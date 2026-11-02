import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AccentRail from './AccentRail';
import { EASE } from './motion';

type Props = {
  title: string;
  subtitle?: string;
  /** A short display line under the title, for a page with a figure worth
   *  leading on. */
  kicker?: string;
  /** Artwork beside the copy. Without it the banner stays the plain dark
   *  band every other inner page uses. */
  media?: ReactNode;
  /** White banner instead of ink — for artwork shot on white, which then
   *  needs no frame because it blends straight into the band. */
  light?: boolean;
  /** Artwork on the left. Visual only: the copy stays first in the DOM, so
   *  the heading is still what a screen reader and a phone meet first. */
  mediaFirst?: boolean;
};

/** Dark banner shared by every inner page. */
export default function PageHero({
  title,
  subtitle,
  kicker,
  media,
  light,
  mediaFirst,
}: Props) {
  return (
    <div
      className={[
        'page-hero',
        media && 'page-hero--media',
        light && 'page-hero--light',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <AccentRail />
      <div className="container">
        <div
          className={
            media
              ? `page-hero__grid${mediaFirst ? ' page-hero__grid--media-first' : ''}`
              : undefined
          }
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {title}
            </motion.h1>

            {kicker && (
              <motion.p
                className="page-hero__kicker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              >
                {kicker}
              </motion.p>
            )}

            {subtitle && (
              <motion.p
                className="page-hero__sub"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {media && (
            <motion.div
              className="page-hero__media"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              {media}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
