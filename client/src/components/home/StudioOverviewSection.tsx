import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { photos } from "@/data/media";
import { studioStats, trustPoints } from "@/data/studioContent";

export function StudioOverviewSection() {
  const [focusedStat, setFocusedStat] = useState(0);
  const tabListId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const active = studioStats[focusedStat];
  const activeProgress =
    ((focusedStat + 1) / studioStats.length) * 100;

  useEffect(() => {
    tabRefs.current[focusedStat]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [focusedStat]);

  const selectStat = (index: number) => {
    setFocusedStat(index);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % studioStats.length;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + studioStats.length) % studioStats.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = studioStats.length - 1;
    }

    if (nextIndex !== index) {
      event.preventDefault();
      selectStat(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      id="intro"
      className="studio-overview-section section-pad"
      aria-labelledby="studio-overview-title"
    >
      <div className="section-heading-row overview-heading">
        <div>
          <div className="section-index">
            02 <span>—</span> The studio, at a glance
          </div>

          <h2 id="studio-overview-title">
            A room should feel
            <br />
            <i>like yours.</i>
          </h2>
        </div>

        <p>
          Furniture, here, is a reflection of lifestyle more than function.
          From our showroom in Agrabad, we design and craft pieces around the
          way you live, then install them so the result feels unmistakably
          your own.
        </p>
      </div>

      <div className="overview-grid">
        <figure className="overview-photo reveal">
          <div className="overview-photo-frame">
            <img
              src={photos.bedroom}
              alt="A handcrafted furniture piece in progress at the Heaven Furniture Mart workshop"
              loading="lazy"
            />

            <div className="overview-photo-vignette" aria-hidden="true" />

            <div className="overview-photo-meta">
              <span className="overview-photo-status">
                <span className="overview-status-dot" />
                Workshop journal
              </span>

              <span className="overview-photo-location">
                Agrabad / Chattogram
              </span>
            </div>
          </div>

          <figcaption>
            <span>In the workshop</span>
            <span>Fig. 02</span>
          </figcaption>
        </figure>

        <div className="overview-panel">
          <div className="overview-panel-header">
            <div>
              <span className="overview-panel-kicker">
                <Sparkles size={13} aria-hidden="true" />
                The studio in numbers
              </span>

              <h3>Made around your life.</h3>
            </div>

            <span className="overview-panel-counter" aria-hidden="true">
              {String(focusedStat + 1).padStart(2, "0")} /{" "}
              {String(studioStats.length).padStart(2, "0")}
            </span>
          </div>

          <div
            className="overview-progress"
            aria-hidden="true"
          >
            <span style={{ width: `${activeProgress}%` }} />
          </div>

          <div
            id={tabListId}
            className="overview-metrics"
            role="tablist"
            aria-label="Studio metrics"
            aria-orientation="vertical"
          >
            {studioStats.map(
              ({ icon: Icon, value, label, detail }, index) => {
                const isActive = focusedStat === index;
                const tabId = `${tabListId}-tab-${index}`;
                const panelId = `${tabListId}-panel-${index}`;

                return (
                  <button
                    key={label}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={tabId}
                    role="tab"
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    aria-controls={panelId}
                    className={`overview-metric ${
                      isActive ? "is-active" : ""
                    }`}
                    onMouseEnter={() => selectStat(index)}
                    onFocus={() => selectStat(index)}
                    onClick={() => selectStat(index)}
                    onKeyDown={(event) =>
                      handleTabKeyDown(event, index)
                    }
                  >
                    <span
                      className="overview-metric-index"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="overview-metric-node"
                      aria-hidden="true"
                    >
                      <Icon size={16} strokeWidth={1.45} />
                    </span>

                    <span className="overview-metric-content">
                      <span className="overview-metric-label">
                        {label}
                      </span>

                      <span className="overview-metric-subtitle">
                        {isActive ? detail : "Explore this studio marker"}
                      </span>
                    </span>

                    <strong className="overview-metric-value">
                      <AnimatedNumber value={value} />
                    </strong>

                    <ChevronRight
                      className="overview-metric-arrow"
                      size={16}
                      aria-hidden="true"
                    />
                  </button>
                );
              },
            )}
          </div>

          <div
            id={`${tabListId}-panel-${focusedStat}`}
            role="tabpanel"
            aria-labelledby={`${tabListId}-tab-${focusedStat}`}
            className="overview-metric-detail"
          >
            <span className="overview-detail-label">
              Current perspective
            </span>

            <p key={active.label}>{active.detail}</p>
          </div>

          <div className="overview-inclusions">
            <span className="overview-inclusions-label">
              Included from day one
            </span>

            <ul>
              {trustPoints.map((point) => (
                <li key={point}>
                  <span className="overview-check">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a className="text-link overview-collection-link" href="#collections">
              Enter the collection
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}