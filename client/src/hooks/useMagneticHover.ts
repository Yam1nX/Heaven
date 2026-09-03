import { useMemo, useRef } from "react";

const PULL_RADIUS = 120;
const MAX_PULL = 14;

/** A button that leans very slightly toward the cursor when it passes nearby. */
export function useMagneticHover<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if (distance >= PULL_RADIUS) {
      el.style.transform = "";
      return;
    }
    const pull = (1 - distance / PULL_RADIUS) * MAX_PULL;
    const angle = Math.atan2(dy, dx);
    el.style.transform = `translate(${Math.cos(angle) * pull}px, ${Math.sin(angle) * pull}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return { ref, onMouseMove, onMouseLeave };
}
