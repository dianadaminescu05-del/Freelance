import { Link } from 'react-router-dom';

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Acasă</Link>
      <span className="sep" aria-hidden="true">
        /
      </span>
      <span className="current">{current}</span>
    </nav>
  );
}
