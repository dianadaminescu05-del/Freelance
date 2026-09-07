import type { Variants } from 'framer-motion';

/** Shared easing curve used throughout the site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: EASE },
  }),
};

export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: EASE },
  }),
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/** `whileInView` props reused by most sections. */
export const inViewOnce = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true },
} as const;
