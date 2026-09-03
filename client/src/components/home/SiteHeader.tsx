import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { logoFallback, monogram, useFallbackImage } from "@/assets/brandMarks";

const primaryLinks = [
  { href: "#collections", label: "Collections" },
  { href: "#process", label: "The process" },
  { href: "#studio-brief", label: "Studio brief" },
  { href: "#story", label: "Our story" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader({
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  showStickyNav,
  whatsappLink,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  showStickyNav: boolean;
  whatsappLink: string;
}) {
  const onLogoError = useFallbackImage(logoFallback);

  return (
    <>
      <div
        className={`sticky-nav ${showStickyNav ? "is-visible" : ""}`}
        aria-hidden={!showStickyNav}
      >
        <a
          href="#top"
          className="sticky-nav-brand"
          aria-label="Heaven Furniture Mart home"
        >
          <img src={monogram} alt="" onError={onLogoError} />
          <span>Heaven Furniture Mart</span>
        </a>
        <div className="sticky-nav-actions">
          <a className="sticky-nav-link" href="#collections">
            Collections
          </a>
          <a className="sticky-nav-link" href="#faq">
            FAQ
          </a>
          <a
            className="button button-brass sticky-nav-cta"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={14} /> WhatsApp us
          </a>
        </div>
      </div>

      <header className="site-header">
        <a
          href="#top"
          className="brand-lockup"
          aria-label="Heaven Furniture Mart home"
          onClick={onCloseMenu}
        >
          <img
            src={monogram}
            alt=""
            className="brand-mark"
            onError={onLogoError}
          />
          <span className="brand-name">
            Heaven <em>Furniture Mart</em>
          </span>
        </a>
        <div className="header-right">
          <span className="header-location">Agrabad / Chattogram</span>
          <button
            className="menu-toggle"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav
          className={`site-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {primaryLinks.map(link => (
            <a key={link.href} href={link.href} onClick={onCloseMenu}>
              {link.label}
            </a>
          ))}
          <a href="#studio-brief" className="nav-cta" onClick={onCloseMenu}>
            Begin a conversation <ArrowUpRight size={15} />
          </a>
        </nav>
        {menuOpen && (
          <button
            className="nav-backdrop"
            aria-label="Close navigation"
            onClick={onCloseMenu}
          />
        )}
      </header>

      <div className="folio-rail" aria-hidden="true">
        <span>Heaven / Studio visit</span>
        <span>scroll to explore</span>
      </div>
    </>
  );
}
