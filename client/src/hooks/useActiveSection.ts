import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], defaultId: string) {
  const [activeId, setActiveId] = useState(defaultId);

  useEffect(() => {
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
    // sectionIds is expected to be a stable, module-level constant array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeId;
}
