import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFab from './WhatsAppFab';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // `auto` here so the jump is not animated for reduced-motion users;
    // the CSS media query disables smooth scrolling globally as well.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    // reducedMotion="user" makes every framer-motion animation in the tree
    // snap to its end state when the OS asks for less motion.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Sari la conținut
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionConfig>
  );
}
