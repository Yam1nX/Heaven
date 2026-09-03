import { useMemo, useRef } from "react";

const MAX_SHIFT_PX = 14;

/**
 * Tracks the cursor across a container and writes the offset to CSS custom
 * properties (`--tilt-x` / `--tilt-y`) on a target element, so the stylesheet
 * controls exactly how much depth to apply. Used for the hero photograph so
 * it reads as a physical object in the frame rather than a flat image.
 */
export function useParallaxTilt<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = targetRef.current;
    if (!target || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.setProperty("--tilt-x", `${relX * MAX_SHIFT_PX * -1}px`);
    target.style.setProperty("--tilt-y", `${relY * MAX_SHIFT_PX * -1}px`);
  };

  const onMouseLeave = () => {
    const target = targetRef.current;
    if (!target) return;
    target.style.setProperty("--tilt-x", "0px");
    target.style.setProperty("--tilt-y", "0px");
  };

  return { targetRef, onMouseMove, onMouseLeave };
}
