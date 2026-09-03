import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { heroFallbackImage, useFallbackImage } from "@/assets/brandMarks";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { photos } from "@/data/media";
import { studioStats } from "@/data/studioContent";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { useParallaxTilt } from "@/hooks/useParallaxTilt";

export function HeroSection({ whatsappLink }: { whatsappLink: string }) {
  const magnet = useMagneticHover<HTMLAnchorElement>();
  const tilt = useParallaxTilt<HTMLDivElement>();
  const onHeroImageError = useFallbackImage(heroFallbackImage);
  const liveStats = studioStats.slice(0, 2);

  return (
    <section id="top" className="hero-section" onMouseMove={magnet.onMouseMove}>
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-copy hero-load-in">
        <p className="eyebrow">
          <span>Est. 2020</span>
          <span className="eyebrow-line" />
          <span>Chattogram, Bangladesh</span>
        </p>
        <h1>
          Furniture,
          <br />
          <i>crafted</i>
          <br />
          around you.
        </h1>
        <p className="hero-lede">
          Bespoke furniture and interior styling for spaces with a point of
          view.
        </p>
        <div className="hero-actions">
          <a
            ref={magnet.ref}
            className="button button-brass button-magnetic"
            href="#studio-brief"
            onMouseLeave={magnet.onMouseLeave}
          >
            <Sparkles size={15} /> Try room intelligence{" "}
            <ArrowUpRight size={16} />
          </a>
          <a className="hero-secondary-link" href="#ai-story">
            See how it works <ArrowDownRight size={15} />
          </a>
        </div>
        <div className="hero-intelligence-note">
          <span className="ai-live-dot" />{" "}
          <span>Heaven intelligence / human handoff</span>
        </div>
        <div className="hero-stamp">
          <span className="stamp-line" />
          <p>
            Designed.
            <br />
            Crafted.
            <br />
            Customized.
          </p>
        </div>
      </div>
      <div
        className="hero-visual hero-load-in-visual"
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <div className="hero-visual-tilt" ref={tilt.targetRef}>
          <img
            src={photos.hero}
            alt="Warmly lit living room with a sculptural sofa and walnut table"
            onError={onHeroImageError}
          />
        </div>
        <div className="hero-visual-wash" />
        <div className="hero-caption">
          <span>01 / 05</span>
          <span>Material study — walnut &amp; linen</span>
        </div>
        <div className="hero-coordinate">
          22°20' N<br />
          91°49' E
        </div>
        <div className="hero-live-card reveal">
          <div className="hero-live-top">
            <span className="ai-live-dot" />
            <span>Studio, live</span>
          </div>
          <div className="hero-live-stats">
            {liveStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="hero-live-stat">
                <Icon size={15} strokeWidth={1.4} />
                <strong>
                  <AnimatedNumber value={value} />
                </strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="hero-live-bars" aria-hidden="true">
            {[0, 0.2, 0.4, 0.6, 0.8].map(delay => (
              <span key={delay} style={{ animationDelay: `${delay}s` }} />
            ))}
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#intro">
        <span>Scroll to explore</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
