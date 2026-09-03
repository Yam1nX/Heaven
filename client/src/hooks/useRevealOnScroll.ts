import { useEffect } from "react";

/**
 * Progressive-enhancement scroll reveal. Section components simply mark an element
 * with className="reveal"; this single observer (mounted once at the page root)
 * handles all of them, so no section needs to know the animation exists.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
