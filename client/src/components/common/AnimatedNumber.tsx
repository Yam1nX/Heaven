import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({ value }: { value: string }) {
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/^[0-9]+/, "");
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    const node = ref.current;
    if (!node || !target || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }
    let animated = false;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            const duration = 1300;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(`${Math.round(target * eased)}${suffix}`);
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, suffix, value]);

  return <span ref={ref}>{display}</span>;
}
