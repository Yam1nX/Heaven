import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Check, ArrowRightLeft, Sparkles } from "lucide-react";
import { photos } from "@/data/media";
import { trustPoints } from "@/data/studioContent";

export function BespokeSection() {
  const [compareValue, setCompareValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Smooth animation on drag
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDragging(true);
    setCompareValue(Number(event.target.value));
  };

  return (
    <section id="bespoke" className="bespoke-section" aria-labelledby="bespoke-title">
      <div className="bespoke-image compare-slider" ref={sliderRef}>
        <div className="compare-frame">
          {/* After Image (Background) */}
          <img
            className="compare-img compare-after"
            src={photos.bespoke}
            alt="Layered bespoke interior with rich material detail"
            loading="lazy"
          />

          {/* Before Image (Foreground, Clipped) */}
          <div
            className="compare-before-wrap"
            style={{ width: `${compareValue}%` }}
            aria-hidden="true"
          >
            <img
              className="compare-img compare-before"
              src={photos.living}
              alt="Quiet, minimal living room styled by Heaven"
              loading="lazy"
            />
          </div>

          {/* Divider Line */}
          <div
            className="compare-divider"
            style={{ left: `${compareValue}%` }}
            aria-hidden="true"
          >
            <span className="compare-handle">
              <ArrowRightLeft size={16} />
            </span>
          </div>

          {/* Slider Input */}
          <input
            type="range"
            min={0}
            max={100}
            value={compareValue}
            onChange={handleSliderChange}
            className="compare-range"
            aria-label="Drag to compare a quiet palette with a layered bespoke palette"
          />

          {/* Labels */}
          <div className="compare-labels">
            <span className="compare-label compare-label-before">
              Quiet & minimal
            </span>
            <span className="compare-label compare-label-after">
              Layered & bespoke
            </span>
          </div>

          {/* Hint */}
          <span className="compare-hint">
            <ArrowRightLeft size={14} />
            <span>Drag to compare</span>
          </span>

          {/* Main Caption */}
          <div className="bespoke-image-label">
            <Sparkles size={18} aria-hidden="true" />
            <span>
              Craft is a conversation
              <br />
              between material and hand.
            </span>
          </div>
        </div>
      </div>

      <div className="bespoke-copy">
        <div className="section-index">
          06 <span>—</span> The Heaven difference
        </div>

        <h2 id="bespoke-title">
          Not off the shelf.
          <br />
          <i>Never ordinary.</i>
        </h2>

        <p className="bespoke-lede">
          Tell us about your space, and we'll help you shape the piece that
          belongs in it. Every proportion, material, and finish is a decision
          made with you.
        </p>

        <div className="trust-list" role="list" aria-label="Custom furniture benefits">
          {trustPoints.map((point, idx) => (
            <div className="trust-item" key={point} role="listitem">
              <span className="trust-check" aria-hidden="true">
                <Check size={15} />
              </span>
              <span>{point}</span>
            </div>
          ))}
        </div>

        <a className="text-link text-link-light" href="#process">
          See how custom works
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}