import { useMemo, useState, useId } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MessagesSquare,
  ScanSearch,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { feelingOptions, roomOptions } from "@/data/studioContent";
import { matchStudioRecommendation } from "@/lib/studioMatch";

const howItWorks = [
  {
    icon: ScanSearch,
    title: "See the room",
    copy: "Upload a photo and get a calm read on light, scale, and material cues.",
  },
  {
    icon: Sparkles,
    title: "Shape the brief",
    copy: "Four human questions turn uncertainty into a clear, useful starting point.",
  },
  {
    icon: MessagesSquare,
    title: "Meet the maker",
    copy: "Share the direction with Heaven so a consultant can take it further in person.",
  },
];

function ConfidenceRing({ value }: { value: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div
      className="confidence-ring"
      role="img"
      aria-label={`${value} percent match confidence`}
    >
      <svg viewBox="0 0 56 56" width="56" height="56">
        <circle
          className="confidence-ring-track"
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          strokeWidth="4"
        />
        <circle
          className="confidence-ring-fill"
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
      </svg>
      <span className="confidence-ring-value">{value}%</span>
    </div>
  );
}

export function RoomIntelligenceSection({
  onQuickMatch,
}: {
  onQuickMatch: (room: string, feeling: string) => void;
}) {
  const [quickRoom, setQuickRoom] = useState("");
  const [quickFeeling, setQuickFeeling] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionId = useId();

  const match = useMemo(
    () => matchStudioRecommendation(quickRoom, quickFeeling),
    [quickRoom, quickFeeling]
  );

  const handleRoomSelect = (room: string) => {
    setIsAnimating(true);
    setQuickRoom(room);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleFeelingSelect = (feeling: string) => {
    setIsAnimating(true);
    setQuickFeeling(feeling);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section
      id="ai-story"
      className="room-intelligence-section section-pad"
      aria-labelledby="intelligence-title"
    >
      <div className="section-heading-row">
        <div>
          <div className="section-index">
            03 <span>—</span> Heaven intelligence
          </div>
          <h2 id="intelligence-title">
            From a room
            <br />
            <i>to a direction.</i>
          </h2>
        </div>
        <p>
          Most people don't need more inspiration — they need a confident place
          to begin. Try the quick match below, then carry it into a full studio
          brief where our room guide and a Heaven consultant take it further.
        </p>
      </div>

      <div className="intelligence-layout">
        <ol className="intelligence-steps" aria-label="How it works">
          {howItWorks.map(({ icon: Icon, title, copy }, index) => (
            <li key={title} className="intelligence-step">
              <span className="intelligence-step-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="intelligence-step-icon" aria-hidden="true">
                <Icon size={16} strokeWidth={1.4} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
          <a className="text-link" href="#studio-brief">
            Open the full studio brief
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </ol>

        <div className="quick-match reveal" role="region" aria-label="Quick room match">
          <div className="quick-match-head">
            <span className="quick-match-kicker">
              <span className="ai-live-dot" aria-hidden="true" />
              Quick match
            </span>
            <span className="quick-match-hint">
              Two taps, an explainable starting point
            </span>
          </div>

          <div className="quick-match-field">
            <span id={`${sectionId}-room-label`}>01 · Which room?</span>
            <div
              className="choice-list"
              role="radiogroup"
              aria-labelledby={`${sectionId}-room-label`}
            >
              {roomOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={quickRoom === option ? "selected" : ""}
                  onClick={() => handleRoomSelect(option)}
                  aria-pressed={quickRoom === option}
                >
                  {quickRoom === option && (
                    <CheckCircle size={14} aria-hidden="true" />
                  )}
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="quick-match-field">
            <span id={`${sectionId}-feeling-label`}>02 · What feeling?</span>
            <div
              className="choice-list"
              role="radiogroup"
              aria-labelledby={`${sectionId}-feeling-label`}
            >
              {feelingOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={quickFeeling === option ? "selected" : ""}
                  onClick={() => handleFeelingSelect(option)}
                  aria-pressed={quickFeeling === option}
                >
                  {quickFeeling === option && (
                    <CheckCircle size={14} aria-hidden="true" />
                  )}
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`quick-match-result ${match ? "is-ready" : ""}`}
            role="status"
            aria-live="polite"
          >
            {match ? (
              <div className={`match-content ${isAnimating ? "is-animating" : ""}`}>
                <div className="quick-match-result-head">
                  <ConfidenceRing value={match.confidence} />
                  <div className="quick-match-result-title">
                    <span className="quick-match-eyebrow">Best match</span>
                    <span>{match.collectionLabel}</span>
                  </div>
                </div>

                <div className="quick-match-meter" role="progressbar" aria-valuenow={match.confidence} aria-valuemin={0} aria-valuemax={100}>
                  <span style={{ width: `${match.confidence}%` }} />
                </div>

                <div className="quick-match-material">
                  <span
                    className="quick-match-swatch"
                    style={{ backgroundColor: match.material.color }}
                    aria-hidden="true"
                  />
                  <span>
                    <strong>{match.material.name}</strong> direction
                  </span>
                </div>

                <p className="match-reason">{match.reason}</p>

                <div className="quick-match-actions">
                  <a
                    className="button button-brass"
                    href="#studio-brief"
                    onClick={() => onQuickMatch(quickRoom, quickFeeling)}
                  >
                    Use this in my brief
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                  <a
                    className="text-link"
                    href={match.collectionHref}
                  >
                    Browse first
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            ) : (
              <p className="quick-match-placeholder">
                Choose a room to see your first match — add a feeling to sharpen
                it.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}