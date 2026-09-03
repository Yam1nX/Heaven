/** Editorial photography. Swap for licensed Heaven showroom photography before launch. */
export const photos = {
  hero: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=88",
  living:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
  bedroom:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
  dining:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",
  bespoke:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
} as const;

/** Stills sourced from Heaven's own published YouTube channel — see gallery-sources.md. */
export const channelUrl = "https://www.youtube.com/@HeavenFurnitureMart";
export const facebookUrl = "https://www.facebook.com/HeavenFurnitureMart";

export const channelStills = {
  showroomTour: {
    image: "https://i.ytimg.com/vi/qEwoJWbXSTs/maxresdefault.jpg",
    href: "https://www.youtube.com/watch?v=qEwoJWbXSTs",
  },
  homeDecor: {
    image: "https://i.ytimg.com/vi/xv0GZWonG1Q/hq720.jpg",
    href: channelUrl,
  },
  bathroomDecor: {
    image: "https://i.ytimg.com/vi/ZowMY_7A_BE/hq720.jpg",
    href: channelUrl,
  },
  seasonalDecor: {
    image: "https://i.ytimg.com/vi/aodK1JCOx0E/hq720.jpg",
    href: channelUrl,
  },
} as const;

/**
 * The live-playable tour embed. Kept separate from `channelStills` because it needs
 * a video ID (for the lite-embed iframe) rather than just a thumbnail + outbound link.
 */
export const showroomTourVideo = {
  id: "qEwoJWbXSTs",
  title: "Heaven Furniture Mart — Virtual Showroom Tour",
  thumbnail: channelStills.showroomTour.image,
  watchHref: channelStills.showroomTour.href,
};

/** A recent, verifiably real post pulled from Heaven's public Facebook page. */
export const facebookHighlight = {
  label: "Luxury bedroom set",
  meta: "Recently published / Heaven Furniture Mart on Facebook",
  href: "https://www.facebook.com/HeavenFurnitureMart/videos/heaven-furniture-mart-presents-luxury-bedroom-set-/868921535920557/",
};
