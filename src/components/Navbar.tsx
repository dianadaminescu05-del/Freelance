import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { NAV_ITEMS } from '../data/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the drawer and returns focus to the button that opened it,
  // so keyboard users are never stranded inside a menu they cannot dismiss.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <nav ref={navRef} className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label="Almariones — acasă">
          <Logo size="sm" />
        </Link>

        <ul id="nav-menu" className={`nav-links${open ? ' is-open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  [item.to === '/contact' ? 'nav-cta' : '', isActive ? 'is-active' : '']
                    .filter(Boolean)
                    .join(' ')
                }
              >
                {item.label}
                {/* Decorative: the link goes to the contact page, not to a
                    dialler, so the icon must not add "phone" to its name. */}
                {item.to === '/contact' && (
                  <Phone size={15} strokeWidth={2.25} aria-hidden="true" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={open}
          aria-controls="nav-menu"
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </nav>
  );
}
