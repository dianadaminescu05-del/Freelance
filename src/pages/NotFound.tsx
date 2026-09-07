import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero
        title="404"
        breadcrumb="Pagină inexistentă"
        subtitle="Pagina căutată nu există sau a fost mutată."
      />
      <section className="page-section section--paper">
        <div className="container">
          <Link to="/" className="btn btn--primary">
            Înapoi la pagina principală
          </Link>
        </div>
      </section>
    </>
  );
}
