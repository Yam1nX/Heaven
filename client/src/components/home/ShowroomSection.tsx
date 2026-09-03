import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { logoFallback, monogram, useFallbackImage } from "@/assets/brandMarks";
import { AI_GUIDE_EVENTS, trackAIGuideEvent } from "@/lib/roomGuideUx";

export function ShowroomSection() {
  return (
    <section className="showroom-section section-pad">
      <div className="showroom-map">
        <div className="map-grid" />
        <div className="map-pin">
          <MapPin size={18} />
        </div>
        <span className="map-label">
          Agrabad
          <br />
          Access Road
        </span>
        <span className="map-coordinate">22°19'55" N / 91°49'21" E</span>
      </div>
      <div className="showroom-copy">
        <div className="section-index">
          12 <span>—</span> Come by
        </div>
        <h2>
          A real room
          <br />
          <i>to walk into.</i>
        </h2>
        <p>
          Our showroom is in Agrabad, Chattogram. Come see the materials in
          natural light, sit with the proportions, and start from what feels
          right.
        </p>
        <a
          className="text-link"
          href="https://www.google.com/maps/search/?api=1&query=Heaven+Furniture+Mart+Agrabad+Chattogram"
          onClick={() =>
            trackAIGuideEvent(AI_GUIDE_EVENTS.showroomDirection, {
              source: "showroom_section",
            })
          }
          target="_blank"
          rel="noreferrer"
        >
          Find the showroom <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}

export function ConsultationSection() {
  const onLogoError = useFallbackImage(logoFallback);
  return (
    <section id="contact" className="consultation-section">
      <div className="consultation-inner">
        <div className="section-index">
          13 <span>—</span> Your space, next
        </div>
        <h2>
          Let’s make
          <br />
          <i>room for you.</i>
        </h2>
        <p>
          Visit our Agrabad showroom or tell us what you’re imagining. We’ll
          start with a free design consultation.
        </p>
        <div className="consultation-actions">
          <a className="button button-ivory" href="#studio-brief">
            Build your studio brief <ArrowUpRight size={16} />
          </a>
          <a className="phone-link" href="tel:+8801960481983">
            <Phone size={15} /> +880 1960-481983
          </a>
        </div>
      </div>
      <div className="consultation-side">
        <img src={monogram} alt="" onError={onLogoError} />
        <span>
          Designed.
          <br />
          Crafted.
          <br />
          Customized.
        </span>
      </div>
    </section>
  );
}
