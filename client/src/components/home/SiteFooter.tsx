import {
  ArrowUpRight,
  Facebook,
  Instagram,
  MapPin,
  Youtube,
} from "lucide-react";
import { logoFallback, monogram, useFallbackImage } from "@/assets/brandMarks";

export function SiteFooter() {
  const onLogoError = useFallbackImage(logoFallback);
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img
          src={monogram}
          alt=""
          className="brand-mark"
          onError={onLogoError}
        />
        <span className="brand-name">
          Heaven <em>Furniture Mart</em>
        </span>
      </div>
      <div className="footer-address">
        <MapPin size={15} />
        <span>
          Agrabad Access Road
          <br />
          Chattogram, Bangladesh
        </span>
      </div>
      <div className="footer-contact">
        <a href="mailto:heavenfurnituremart@gmail.com">
          heavenfurnituremart@gmail.com
        </a>
        <a href="tel:+8801960481983">+880 1960-481983</a>
      </div>
      <div className="footer-socials">
        <a
          href="https://facebook.com/HeavenFurnitureMart"
          aria-label="Facebook"
        >
          <Facebook size={17} />
        </a>
        <a
          href="https://instagram.com/heaven_furniture_ltd"
          aria-label="Instagram"
        >
          <Instagram size={17} />
        </a>
        <a href="https://youtube.com/@HeavenFurnitureMart" aria-label="YouTube">
          <Youtube size={17} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Heaven Furniture Mart</span>
        <span>Luxury / Bespoke Furniture & Interior Styling</span>
        <a href="#top">
          Back to top <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}
