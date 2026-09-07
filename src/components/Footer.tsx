import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FOOTER_PRODUCTS, NAV_ITEMS, SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo size="sm" darkBg />
            <p className="footer-blurb">{SITE.blurb}</p>
          </div>

          <div>
            <h5 className="footer-heading">Navigare</h5>
            <div className="footer-list">
              {NAV_ITEMS.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="footer-heading">Produse</h5>
            <div className="footer-list">
              {FOOTER_PRODUCTS.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="footer-heading">Contact</h5>
            <div className="footer-contact">
              <a className="phone" href={SITE.phoneHref}>
                {SITE.phone}
              </a>
              <a className="email" href={SITE.emailHref}>
                {SITE.email}
              </a>
              <span className="address">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.zip}
              </span>
              <span className="hours">{SITE.hours}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Toate drepturile rezervate.
          </p>
          <p>Politica de confidențialitate · GDPR</p>
        </div>
      </div>
    </footer>
  );
}
