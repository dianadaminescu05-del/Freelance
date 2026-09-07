import { motion } from 'framer-motion';
import AccentRail from './AccentRail';
import Breadcrumb from './Breadcrumb';
import { EASE } from './motion';

type Props = {
  title: string;
  subtitle?: string;
  breadcrumb: string;
};

/** Dark banner shared by every inner page. */
export default function PageHero({ title, subtitle, breadcrumb }: Props) {
  return (
    <div className="page-hero">
      <AccentRail />
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Breadcrumb current={breadcrumb} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {title}
        </motion.h1>

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
    </div>
  );
}
