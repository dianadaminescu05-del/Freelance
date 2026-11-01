import WhatsAppIcon from './WhatsAppIcon';
import { SITE } from '../data/site';

export default function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrie pe WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
