/*
 * Typed UX contract for the room guide. Keep recovery copy and the consultation
 * handoff deterministic so every error branch remains actionable and testable.
 */
import type { RoomGuideErrorCode } from "../../../server/routers";

export const AI_GUIDE_EVENTS = {
  start: "ai_guide_start",
  imageUpload: "ai_guide_image_upload",
  whatsappHandoff: "ai_guide_whatsapp_handoff",
  galleryClick: "gallery_image_click",
  showroomDirection: "showroom_direction_click",
} as const;

type AnalyticsValue = string | number | boolean;
type AnalyticsPayload = Record<string, AnalyticsValue>;

type UmamiWindow = Window & {
  umami?: { track?: (event: string, payload?: AnalyticsPayload) => void };
};

export function trackAIGuideEvent(event: string, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") return false;
  const tracker = (window as UmamiWindow).umami?.track;
  if (typeof tracker !== "function") return false;
  tracker(event, payload);
  return true;
}

export const roomGuideErrorCopy: Record<RoomGuideErrorCode, { title: string; copy: string }> = {
  INVALID_IMAGE: {
    title: "Check the room photo",
    copy: "That image could not be used for visual analysis. Keep your brief, choose a JPG, PNG, or WEBP under 5MB, then try again.",
  },
  INFERENCE_UNAVAILABLE: {
    title: "The studio connection paused",
    copy: "The guide could not reach the room-planning service. Your choices are safe; try again in a moment or send your brief directly to the Heaven team.",
  },
  MALFORMED_RESPONSE: {
    title: "The guide needs another pass",
    copy: "The room-planning service returned an incomplete note. Nothing was lost—try again, or continue with a direct consultation.",
  },
};

export function getRoomGuideErrorCopy(code: RoomGuideErrorCode) {
  return roomGuideErrorCopy[code];
}

export type RoomGuideDraft = { room: string; feeling: string; timing: string; budget: string; imageDataUrl?: string };

export function buildRoomGuideRequest(draft: RoomGuideDraft) {
  return { ...draft };
}

export function buildRoomGuideWhatsAppLink(input: { room: string; feeling: string; timing: string; budget: string }) {
  const message = `Hello Heaven Furniture Mart. I’d like to discuss a ${input.room.toLowerCase()} project with a ${input.feeling.toLowerCase()} feeling. My timing is ${input.timing.toLowerCase()} and my budget comfort is ${input.budget.toLowerCase()}. I’d love to begin with a design consultation.`;
  return `https://wa.me/8801960481983?text=${encodeURIComponent(message)}`;
}
