import { useEffect, useState } from "react";

/** Sticky nav appears past the hero; the progress bar tracks the full page. */
export function useScrollProgress(revealNavAfterPx = 560) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      setScrolledPastHero(window.scrollY > revealNavAfterPx);
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(
        scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0
      );
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [revealNavAfterPx]);

  return { scrolledPastHero, progress };
}
