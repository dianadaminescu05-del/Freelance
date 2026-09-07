import { motion } from 'framer-motion';
import { RAIL_COLORS } from '../data/site';
import { EASE } from './motion';

/** The four vertical colour bars pinned to the right edge of a dark hero. */
export default function AccentRail({ animate = false }: { animate?: boolean }) {
  return (
    <div className="accent-rail" aria-hidden="true">
      {RAIL_COLORS.map((c) =>
        animate ? (
          <motion.span
            key={c}
            style={{ background: c }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          />
        ) : (
          <span key={c} style={{ background: c }} />
        ),
      )}
    </div>
  );
}
