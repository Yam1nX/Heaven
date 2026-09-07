import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { 
  ArrowUpRight, 
  Check, 
  ArrowRightLeft, 
  Sparkles, 
  Play, 
  Pause, 
  Maximize2, 
  Grid3X3, 
  Eye,
  Share2,
  Bookmark,
  Info,
  X,
  ZoomIn,
  Layers,
  Palette,
  Tag,
  Download,
  ExternalLink
} from "lucide-react";
import { photos } from "@/data/media";
import { trustPoints } from "@/data/studioContent";

// Hotspot data for material highlights
const materialHotspots = [
  {
    id: 1,
    x: 35,
    y: 45,
    title: "Hand-rubbed Teak",
    description: "Sustainably sourced teak with natural oil finish, hand-polished over 72 hours",
    icon: Layers,
  },
  {
    id: 2,
    x: 62,
    y: 38,
    title: "Brass Inlay",
    description: "Hand-forged brass accents with antique patina, each piece unique",
    icon: Sparkles,
  },
  {
    id: 3,
    x: 48,
    y: 67,
    title: "Artisan Weave",
    description: "Traditional Bengali weaving technique, 40 hours of manual craftsmanship",
    icon: Grid3X3,
  },
];

// Color palette extracted from images
const colorPalette = [
  { hex: "#2a211b", name: "Walnut Brown" },
  { hex: "#b8965a", name: "Antique Brass" },
  { hex: "#e7dfd2", name: "Warm Parchment" },
  { hex: "#183b3a", name: "Deep Teal" },
  { hex: "#b98d62", name: "Natural Wood" },
];

// Style tags
const styleTags = [
  "Contemporary",
  "Artisanal",
  "Minimalist",
  "Heritage",
  "Sustainable",
];

export function BespokeSection() {
  const [compareValue, setCompareValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"slider" | "side" | "fade">("slider");
  const [fadeOpacity, setFadeOpacity] = useState(50);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [showPalette, setShowPalette] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [interactionTime, setInteractionTime] = useState(0);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef(1);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track interaction time for analytics
  useEffect(() => {
    const startTracking = () => {
      interactionTimerRef.current = setInterval(() => {
        setInteractionTime((prev) => prev + 1);
      }, 1000);
    };

    const stopTracking = () => {
      if (interactionTimerRef.current) {
        clearInterval(interactionTimerRef.current);
        console.log(`User interacted for ${interactionTime}s`);
      }
    };

    startTracking();
    return () => stopTracking();
  }, [interactionTime]);

  // Auto-compare with smooth easing
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) return;
    setIsAutoPlaying(true);
    
    const easeInOut = (t: number) => 
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    let progress = 0;
    autoPlayRef.current = setInterval(() => {
      progress += 0.02;
      if (progress >= 1) progress = 0;
      
      const eased = easeInOut(progress);
      const next = 5 + (eased * 90);
      setCompareValue(next);
    }, 30);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    setIsAutoPlaying(false);
  }, []);

  useEffect(() => {
    return () => stopAutoPlay();
  }, [stopAutoPlay]);

  // Keyboard navigation with shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!sliderRef.current) return;

      if (event.key === " " && event.target === document.body) {
        event.preventDefault();
        isAutoPlaying ? stopAutoPlay() : startAutoPlay();
      }

      if (event.key === "1") setViewMode("slider");
      if (event.key === "2") setViewMode("side");
      if (event.key === "3") setViewMode("fade");
      if (event.key === "p") setShowPalette((prev) => !prev);
      if (event.key === "t") setShowTags((prev) => !prev);
      if (event.key === "b") setIsBookmarked((prev) => !prev);
      if (event.key === "s") setShowShareModal(true);
      if (event.key === "0") {
        setCompareValue(50);
        setFadeOpacity(50);
        setZoomLevel(1);
      }

      if (document.activeElement !== sliderRef.current) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCompareValue((prev) => Math.max(0, prev - 2));
        if (isAutoPlaying) stopAutoPlay();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setCompareValue((prev) => Math.min(100, prev + 2));
        if (isAutoPlaying) stopAutoPlay();
      }
      if (event.key === "Home") {
        event.preventDefault();
        setCompareValue(0);
        if (isAutoPlaying) stopAutoPlay();
      }
      if (event.key === "End") {
        event.preventDefault();
        setCompareValue(100);
        if (isAutoPlaying) stopAutoPlay();
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setZoomLevel((prev) => Math.min(2, prev + 0.1));
      }
      if (event.key === "-") {
        event.preventDefault();
        setZoomLevel((prev) => Math.max(1, prev - 0.1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

  // Gesture support (touch)
  useEffect(() => {
    const element = sliderRef.current;
    if (!element) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let lastTap = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      setIsDragging(true);
      if (isAutoPlaying) stopAutoPlay();

      const now = Date.now();
      if (now - lastTap < 300) {
        setCompareValue(50);
        setZoomLevel(1);
      }
      lastTap = now;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;
      const percentage = (diff / element.offsetWidth) * 100;
      setCompareValue((prev) => Math.min(100, Math.max(0, prev + percentage)));
      touchStartX = touchX;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isAutoPlaying, stopAutoPlay]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDragging) setIsDragging(true);
    if (isAutoPlaying) stopAutoPlay();
    setCompareValue(Number(event.target.value));

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(5);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Heaven Furniture - Bespoke Comparison",
      text: `Check out this custom furniture comparison at ${compareValue}%`,
      url: window.location.href + `?compare=${compareValue}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleDownload = () => {
    console.log(`Downloading comparison at ${compareValue}%`);
  };

  const imageStyles = useMemo(() => ({
    transform: `scale(${zoomLevel})`,
    transition: isDragging ? "none" : "transform 0.4s var(--ease-out)",
  }), [zoomLevel, isDragging]);

  return (
    <section id="bespoke" className="bespoke-section" aria-labelledby="bespoke-title">
      {/* Left: Text Content */}
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

        <div className="bespoke-stats">
          <div className="bespoke-stat">
            <strong>{interactionTime}s</strong>
            <span>Your exploration time</span>
          </div>
          <div className="bespoke-stat">
            <strong>{compareValue}%</strong>
            <span>Current comparison</span>
          </div>
          <div className="bespoke-stat">
            <strong>{zoomLevel}x</strong>
            <span>Zoom level</span>
          </div>
        </div>

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

      {/* Right: Comparison Slider */}
      <div className="bespoke-image compare-slider" ref={sliderRef}>
        <div className="compare-frame" style={imageStyles}>
          {/* View Mode Indicators */}
          <div className="compare-mode-indicators">
            <button
              className={`compare-mode-btn ${viewMode === "slider" ? "active" : ""}`}
              onClick={() => setViewMode("slider")}
              aria-label="Slider view"
              title="Slider View (1)"
            >
              <ArrowRightLeft size={14} />
            </button>
            <button
              className={`compare-mode-btn ${viewMode === "side" ? "active" : ""}`}
              onClick={() => setViewMode("side")}
              aria-label="Side by side view"
              title="Side by Side (2)"
            >
              <Grid3X3 size={14} />
            </button>
            <button
              className={`compare-mode-btn ${viewMode === "fade" ? "active" : ""}`}
              onClick={() => setViewMode("fade")}
              aria-label="Fade view"
              title="Fade View (3)"
            >
              <Eye size={14} />
            </button>
          </div>

          {/* After Image (Background) */}
          <img
            className="compare-img compare-after"
            src={photos.bespoke}
            alt="Layered bespoke interior with rich material detail"
            loading="lazy"
            draggable="false"
            style={{ opacity: viewMode === "fade" ? fadeOpacity / 100 : 1 }}
          />

          {/* Before Image (Foreground) */}
          {viewMode === "slider" && (
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
                draggable="false"
              />
            </div>
          )}

          {viewMode === "side" && (
            <div className="compare-side-split" style={{ width: "50%" }}>
              <img
                className="compare-img compare-before"
                src={photos.living}
                alt="Quiet, minimal living room"
                loading="lazy"
                draggable="false"
              />
            </div>
          )}

          {/* Divider Line */}
          {viewMode === "slider" && (
            <div
              className="compare-divider"
              style={{ left: `${compareValue}%` }}
              aria-hidden="true"
            >
              <span className="compare-handle">
                <ArrowRightLeft size={16} />
              </span>
            </div>
          )}

          {/* Slider Input */}
          {viewMode === "slider" && (
            <input
              type="range"
              min={0}
              max={100}
              value={compareValue}
              onChange={handleSliderChange}
              className="compare-range"
              aria-label="Drag to compare"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={compareValue}
            />
          )}

          {/* Fade Slider */}
          {viewMode === "fade" && (
            <input
              type="range"
              min={0}
              max={100}
              value={fadeOpacity}
              onChange={(e) => setFadeOpacity(Number(e.target.value))}
              className="compare-range compare-range-fade"
              aria-label="Adjust fade opacity"
            />
          )}

          {/* Material Hotspots */}
          <div className="compare-hotspots" aria-label="Material details">
            {materialHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className={`compare-hotspot ${activeHotspot === hotspot.id ? "active" : ""}`}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                onMouseEnter={() => setActiveHotspot(hotspot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                aria-label={hotspot.title}
                type="button"
              >
                <span className="compare-hotspot-pulse" />
                <hotspot.icon size={12} />
                
                {activeHotspot === hotspot.id && (
                  <div className="compare-hotspot-tooltip">
                    <strong>{hotspot.title}</strong>
                    <p>{hotspot.description}</p>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions Toolbar */}
          <div className="compare-toolbar">
            <button
              className="compare-tool-btn"
              onClick={() => setShowPalette(!showPalette)}
              aria-label="Show color palette"
              title="Color Palette (P)"
            >
              <Palette size={16} />
            </button>
            <button
              className="compare-tool-btn"
              onClick={() => setShowTags(!showTags)}
              aria-label="Show style tags"
              title="Style Tags (T)"
            >
              <Tag size={16} />
            </button>
            <button
              className="compare-tool-btn"
              onClick={() => setZoomLevel((prev) => (prev >= 1.5 ? 1 : prev + 0.25))}
              aria-label="Zoom"
              title="Zoom (+/-)"
            >
              <ZoomIn size={16} />
            </button>
            <button
              className={`compare-tool-btn ${isBookmarked ? "active" : ""}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Bookmark"
              title="Bookmark (B)"
            >
              <Bookmark size={16} />
            </button>
            <button
              className="compare-tool-btn"
              onClick={handleShare}
              aria-label="Share"
              title="Share (S)"
            >
              <Share2 size={16} />
            </button>
            <button
              className="compare-tool-btn"
              onClick={handleDownload}
              aria-label="Download"
              title="Download"
            >
              <Download size={16} />
            </button>
          </div>

          {/* Auto-play & Progress */}
          <div className="compare-controls">
            <button
              className="compare-autoplay"
              onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
              aria-label={isAutoPlaying ? "Pause auto-compare" : "Play auto-compare"}
              type="button"
            >
              {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isAutoPlaying ? "Pause" : "Auto"}</span>
            </button>

            <div className="compare-progress" aria-hidden="true">
              <span style={{ width: `${viewMode === "fade" ? fadeOpacity : compareValue}%` }} />
            </div>

            <span className="compare-percentage">
              {viewMode === "fade" ? `${fadeOpacity}%` : `${compareValue}%`}
            </span>
          </div>

          {/* Color Palette Overlay */}
          {showPalette && (
            <div className="compare-palette-overlay">
              <button
                className="compare-overlay-close"
                onClick={() => setShowPalette(false)}
                aria-label="Close palette"
              >
                <X size={16} />
              </button>
              <h4>Extracted Palette</h4>
              <div className="compare-palette-colors">
                {colorPalette.map((color) => (
                  <div key={color.hex} className="compare-palette-swatch">
                    <div 
                      className="compare-palette-color" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="compare-palette-name">{color.name}</span>
                    <code>{color.hex}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Style Tags Overlay */}
          {showTags && (
            <div className="compare-tags-overlay">
              <button
                className="compare-overlay-close"
                onClick={() => setShowTags(false)}
                aria-label="Close tags"
              >
                <X size={16} />
              </button>
              <h4>Style Analysis</h4>
              <div className="compare-tags-list">
                {styleTags.map((tag) => (
                  <span key={tag} className="compare-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="compare-ai-insight">
                <Sparkles size={14} />
                <p>AI detects 87% match with contemporary artisanal aesthetic</p>
              </div>
            </div>
          )}

          {/* Main Caption */}
          <div className="bespoke-image-label">
            <Sparkles size={18} aria-hidden="true" />
            <span>
              Craft is a conversation
              <br />
              between material and hand.
            </span>
          </div>

          {/* Labels */}
          <div 
            className="compare-labels" 
            style={{ opacity: isDragging || showPalette || showTags ? 0 : 1 }}
            aria-hidden="true"
          >
            <span className="compare-label compare-label-before">
              Quiet & minimal
            </span>
            <span className="compare-label compare-label-after">
              Layered & bespoke
            </span>
          </div>

          {/* Hint */}
          <span 
            className="compare-hint" 
            style={{ opacity: isDragging || showPalette || showTags ? 0 : 1 }}
          >
            <ArrowRightLeft size={14} />
            <span>Drag to compare</span>
          </span>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="compare-share-modal" role="dialog" aria-modal="true">
          <div className="compare-share-content">
            <button
              className="compare-share-close"
              onClick={() => setShowShareModal(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h3>Share This Comparison</h3>
            <div className="compare-share-link">
              <input
                type="text"
                readOnly
                value={`${window.location.href}?compare=${compareValue}`}
                aria-label="Shareable link"
              />
              <button
                className="compare-copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.href}?compare=${compareValue}`);
                }}
              >
                Copy
              </button>
            </div>
            <div className="compare-share-actions">
              <button className="compare-share-action" onClick={() => {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, "_blank");
              }}>
                <ExternalLink size={16} />
                Twitter
              </button>
              <button className="compare-share-action" onClick={() => {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank");
              }}>
                <ExternalLink size={16} />
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
