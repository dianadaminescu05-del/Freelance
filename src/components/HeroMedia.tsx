import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * Hero media panel: the packaging clip behind a diagonal edge, drifting on
 * scroll.
 *
 * Playback runs the sequence once, start to finish, and holds on the last
 * frame — it does not loop, so the box actually closes. Scrolling the hero
 * out of view and back rewinds it and plays it again.
 *
 * The clip is decorative: aria-hidden, no controls, muted.
 */
export default function HeroMedia({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // useTransform-driven styles bypass MotionConfig's reducedMotion handling —
  // that only governs animate/variants — so the scroll effect is disabled
  // here explicitly. home.css carries a CSS guard for the same reason.
  const y = useTransform(progress, [0, 1], reduced ? ['0%', '0%'] : ['-5%', '16%']);
  const scale = useTransform(progress, [0, 1], reduced ? [1, 1] : [1, 1.06]);
  const fade = useTransform(progress, [0, 1], reduced ? [1, 1] : [1, 0.55]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Reduced motion: hold the first frame rather than playing a sequence.
    if (reduced) {
      v.pause();
      v.currentTime = 0;
      return;
    }

    // Rewind and replay whenever the hero comes back into view, so returning
    // to the top of the page restarts the sequence instead of showing the
    // spent last frame.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.currentTime = 0;
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(v);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div className="hero-media" aria-hidden="true">
      <motion.div className="hero-media__inner" style={{ y, scale, opacity: fade }}>
        <video
          ref={videoRef}
          className="hero-media__video"
          // BASE_URL, not a leading slash: under GitHub Pages the site is
          // served from /Freelance/, where "/hero-packaging.mp4" 404s.
          src={`${import.meta.env.BASE_URL}hero-packaging.mp4`}
          poster={`${import.meta.env.BASE_URL}hero-packaging.jpg`}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
        />
      </motion.div>

      {/* Scrim: darkens the footage and fades it into the ink panel so the
          diagonal never puts bright pixels beside the headline. */}
      <div className="hero-media__scrim" />
    </div>
  );
}

/** Scroll progress for the hero, shared by the section and its media. */
export function useHeroScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  return { ref, scrollYProgress };
}
