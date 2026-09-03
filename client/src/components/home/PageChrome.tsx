import { MessageCircle } from "lucide-react";
import { navSections } from "@/data/studioContent";

export function FloatingWhatsApp({ href }: { href: string }) {
  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Heaven Furniture Mart on WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}

export function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

export function SectionDotNav({ activeId }: { activeId: string }) {
  return (
    <nav className="section-dot-nav" aria-label="Section shortcuts">
      {navSections.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeId === item.id ? "active" : ""}
          data-label={item.label}
        >
          <span />
        </a>
      ))}
    </nav>
  );
}
