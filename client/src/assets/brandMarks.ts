/**
 * Hand-drawn monogram + fallback art. Kept as inline SVG data URIs (not files)
 * so the brand mark renders instantly with zero network round-trip, and so the
 * hero/gallery never show a broken-image icon if a remote photo fails to load.
 */

export const monogram =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' rx='16' fill='%23183B3A'/%3E%3Cpath d='M42 116V44l38 42 38-42v72M42 80h76' fill='none' stroke='%23C4A064' stroke-width='7' stroke-linecap='square' stroke-linejoin='miter'/%3E%3Cpath d='M80 86v30' stroke='%23F5F0E8' stroke-width='4'/%3E%3C/svg%3E";

export const logoFallback =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23183B3A'/%3E%3Cpath d='M45 116V45l35 38 35-38v71M45 82h70' fill='none' stroke='%23C4A064' stroke-width='8'/%3E%3C/svg%3E";

export const heroFallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'%3E%3Crect width='1200' height='900' fill='%23183B3A'/%3E%3Cpath d='M0 650h1200M120 650V260h360v390M480 430h370v220M850 650V180h230v470' fill='none' stroke='%23C4A064' stroke-width='4' opacity='.65'/%3E%3Ccircle cx='830' cy='270' r='95' fill='%23C4A064' opacity='.22'/%3E%3Cpath d='M160 720h850' stroke='%23F5F0E8' stroke-width='2' opacity='.6'/%3E%3C/svg%3E";

/** Swap `<img>` sources over to the packaged fallback the moment a remote asset 404s. */
export function useFallbackImage(fallbackSrc: string) {
  return (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSrc;
  };
}
