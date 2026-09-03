import { Award } from "lucide-react";
import { recognitions } from "@/data/studioContent";

export function StorySection() {
  return (
    <section id="story" className="story-section section-pad">
      <div className="section-index">
        09 <span>—</span> Since 2020
      </div>
      <div className="story-grid">
        <div className="story-quote">
          <span className="quote-mark">“</span>
          <blockquote>
            Every piece we create is designed to bring lasting elegance into the
            homes of our clients.
          </blockquote>
          <cite>— Abul Kalam Bhuiyan, Managing Director</cite>
        </div>
        <div className="milestones">
          <div className="milestone">
            <strong>2020</strong>
            <span>Founded by Abul Kalam Bhuiyan</span>
          </div>
          <div className="milestone">
            <strong>2021</strong>
            <span>Agrabad showroom opens</span>
          </div>
          <div className="milestone">
            <strong>2024—26</strong>
            <span>Furniture fair exhibitions & nationwide recognition</span>
          </div>
        </div>
      </div>
      <div className="recognition-strip reveal">
        {recognitions.map(item => (
          <div className="recognition-badge" key={item.title}>
            <Award size={16} />
            <div>
              <span>{item.year}</span>
              <strong>{item.title}</strong>
              <small>{item.note}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
