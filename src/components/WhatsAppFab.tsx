import { MessageCircle } from 'lucide-react';
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
      <MessageCircle size={26} strokeWidth={2} aria-hidden="true" />
    </a>
  );
}
