import { useState } from "react";
import {
  ArrowUpRight,
  Facebook,
  Play,
  Youtube,
  Instagram,
  ExternalLink,
} from "lucide-react";
import { channelStills, facebookHighlight, showroomTourVideo } from "@/data/media";
import { galleryItems } from "@/data/studioContent";
import { AI_GUIDE_EVENTS, trackAIGuideEvent } from "@/lib/roomGuideUx";

function ShowroomTourPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="video-tour-frame is-playing">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${showroomTourVideo.id}?autoplay=1&rel=0`}
          title={showroomTourVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="video-tour-frame"
      onClick={() => {
        setIsPlaying(true);
        trackAIGuideEvent(AI_GUIDE_EVENTS.galleryClick, {
          label: "showroom_tour_play",
          source: "heaven_channel",
        });
      }}
      aria-label={`Play: ${showroomTourVideo.title}`}
    >
      <img src={showroomTourVideo.thumbnail} alt="" loading="lazy" />
      <span className="video-tour-play">
        <Play size={22} fill="currentColor" />
      </span>
      <span className="video-tour-caption">
        <Youtube size={14} /> {showroomTourVideo.title}
      </span>
    </button>
  );
}

export function GallerySection() {
  return (
    <section className="gallery-section section-pad" aria-labelledby="gallery-title">
      <div className="section-heading-row">
        <div>
          <div className="section-index">
            10 <span>—</span> From the showroom
          </div>

          <h2 id="gallery-title">
            A glimpse of
            <br />
            <i>our world.</i>
          </h2>
        </div>

        <p>
          Explore real Heaven-published showroom and room content. The archive
          below is source-linked; your own completed-project photography can be
          added as it is approved.
        </p>
      </div>

      <div className="gallery-layout">
        <div className="gallery-main">
          <div className="gallery-grid">
            {/* Video as first large item */}
            <div className="gallery-card gallery-card-video">
              <ShowroomTourPlayer />
              <div className="gallery-meta">
                <strong>Showroom Tour</strong>
                <span>Full walkthrough video</span>
              </div>
            </div>

            {galleryItems.map((item, index) => {
              const still = channelStills[item.image];
              return (
                <a
                  className={`gallery-card gallery-card-${index + 1}`}
                  key={item.label}
                  href={still.href}
                  onClick={() =>
                    trackAIGuideEvent(AI_GUIDE_EVENTS.galleryClick, {
                      label: item.label,
                      source: item.external
                        ? "heaven_channel"
                        : "editorial_reference",
                      index: index + 1,
                    })
                  }
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  <div className="gallery-image">
                    <img src={still.image} alt={item.label} loading="lazy" />
                    <span className="gallery-index">0{index + 1}</span>
                    {item.external && (
                      <span className="gallery-external-badge">
                        <ExternalLink size={14} aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  <div className="gallery-meta">
                    <strong>{item.label}</strong>
                    <span>{item.meta}</span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Facebook link below grid */}
          <div className="gallery-facebook-row">
            <a
              className="video-tour-social-link gallery-facebook-link"
              href={facebookHighlight.href}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackAIGuideEvent(AI_GUIDE_EVENTS.galleryClick, {
                  label: "facebook_highlight",
                  source: "facebook",
                })
              }
            >
              <Facebook size={18} />
              <span>
                <strong>{facebookHighlight.label}</strong>
                <small>{facebookHighlight.meta}</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <aside className="gallery-side-panel">
          <div className="gallery-side-content">
            <div className="gallery-side-header">
              <Instagram size={24} aria-hidden="true" />
              <h3>Follow our journey</h3>
            </div>

            <p>
              Behind-the-scenes builds, client reveals, and daily studio moments.
              See how each piece comes to life before it reaches your home.
            </p>

            <div className="gallery-side-stats">
              <div className="gallery-stat">
                <strong>2.4K</strong>
                <span>Followers</span>
              </div>
              <div className="gallery-stat">
                <strong>180+</strong>
                <span>Projects</span>
              </div>
              <div className="gallery-stat">
                <strong>Daily</strong>
                <span>Updates</span>
              </div>
            </div>

            <a
              href="https://instagram.com/heavenfurnituremart"
              className="button button-brass"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackAIGuideEvent(AI_GUIDE_EVENTS.galleryClick, {
                  label: "instagram_follow",
                  source: "gallery_sidebar",
                })
              }
            >
              Follow on Instagram
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <div className="gallery-side-note">
              <span className="gallery-side-note-label">Tag us</span>
              <p>
                Share your Heaven furniture moments with{" "}
                <strong>#HeavenFurnitureMart</strong> for a chance to be featured.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}