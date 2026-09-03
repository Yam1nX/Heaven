import { useState, useId, type KeyboardEvent } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { collections } from "@/data/studioContent";

export function CollectionsSection() {
  const [activeSlug, setActiveSlug] = useState<(typeof collections)[number]["slug"]>("living");
  const listId = useId();
  
  const selected = collections.find(c => c.slug === activeSlug) ?? collections[0];
  const activeIndex = collections.findIndex(c => c.slug === activeSlug);

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      const next = (index + 1) % collections.length;
      setActiveSlug(collections[next].slug);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      const prev = (index - 1 + collections.length) % collections.length;
      setActiveSlug(collections[prev].slug);
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveSlug(collections[0].slug);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveSlug(collections[collections.length - 1].slug);
    }
  };

  return (
    <section id="collections" className="collections-section section-pad" aria-labelledby="collections-title">
      <div className="section-heading-row">
        <div>
          <div className="section-index">
            04 <span>—</span> A considered collection
          </div>
          <h2 id="collections-title">Made for living.</h2>
        </div>
        <p>
          Selected forms for the rooms where life happens. Start with a room;
          we'll help you refine the feeling.
        </p>
      </div>

      <div className="collection-explorer">
        <div
          className="collection-tabs"
          role="tablist"
          aria-label="Collection rooms"
          aria-orientation="vertical"
        >
          {collections.map((item, index) => {
            const isActive = activeSlug === item.slug;
            const tabId = `${listId}-tab-${index}`;
            const panelId = `${listId}-panel-${index}`;

            return (
              <button
                key={item.slug}
                id={tabId}
                className={isActive ? "active" : ""}
                onClick={() => setActiveSlug(item.slug)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
              >
                <span className="tab-number" aria-hidden="true">
                  {item.number}
                </span>
                <span className="tab-label">{item.label}</span>
                {isActive && (
                  <span className="tab-indicator" aria-hidden="true" />
                )}
              </button>
            );
          })}

          <button
            className="bespoke-tab"
            onClick={() =>
              document
                .getElementById("studio-brief")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="tab-number" aria-hidden="true">04</span>
            <span className="tab-label">Make it bespoke</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>

        <div
          id={`${listId}-panel-${activeIndex}`}
          className="collection-feature"
          role="tabpanel"
          aria-labelledby={`${listId}-tab-${activeIndex}`}
        >
          <div className="feature-image">
            <img
              src={selected.image}
              alt={`${selected.label} furniture collection`}
              loading="lazy"
            />
            <span className="image-index">
              <span>{selected.number}</span>
              <span>04</span>
            </span>
            <span className="feature-badge">
              <Sparkles size={14} aria-hidden="true" />
              <span>Curated</span>
            </span>
          </div>

          <div className="feature-copy">
            <span className="feature-kicker">
              Room study / {selected.label}
            </span>

            <h3>
              {selected.label}
              <br />
              <i>with intention.</i>
            </h3>

            <p className="feature-description">
              {selected.description}. Every piece is a starting point for your
              space, not a final answer.
            </p>

            <div className="feature-note">
              <span className="small-rule" aria-hidden="true" />
              <span>{selected.note}</span>
            </div>

            <a className="text-link" href="#studio-brief">
              Shape this room
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}