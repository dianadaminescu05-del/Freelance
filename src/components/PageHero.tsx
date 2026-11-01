import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AccentRail from './AccentRail';
import Breadcrumb from './Breadcrumb';
import { EASE } from './motion';

type Props = {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  /** A short display line under the title, for a page with a figure worth
   *  leading on. */
  kicker?: string;
  /** Artwork beside the copy. Without it the banner stays the plain dark
   *  band every other inner page uses. */
  media?: ReactNode;
};

/** Dark banner shared by every inner page. */
export default function PageHero({ title, subtitle, breadcrumb, kicker, media }: Props) {
  return (
    <div className={`page-hero${media ? ' page-hero--media' : ''}`}>
      <AccentRail />
      <div className="container">
        <div className={media ? 'page-hero__grid' : undefined}>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Breadcrumb current={breadcrumb} />
            </motion.div>

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
