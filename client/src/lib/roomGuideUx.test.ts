/*
 * Frontend recovery contract tests. These keep the UI's retry and fallback behavior
 * deterministic without depending on browser timing or live model availability.
 */
import { describe, expect, it, vi } from "vitest";
import { AI_GUIDE_EVENTS, buildRoomGuideRequest, buildRoomGuideWhatsAppLink, getRoomGuideErrorCopy, trackAIGuideEvent } from "./roomGuideUx";

describe("room guide recovery UX", () => {
  it("tracks the three stable AI events without accepting private brief content", () => {
    const track = vi.fn();
    (globalThis as Record<string, unknown>).window = { umami: { track } };

    expect(trackAIGuideEvent(AI_GUIDE_EVENTS.start, { hasImage: true })).toBe(true);
    expect(trackAIGuideEvent(AI_GUIDE_EVENTS.imageUpload, { type: "image/jpeg", sizeBucket: "small" })).toBe(true);
    expect(trackAIGuideEvent(AI_GUIDE_EVENTS.whatsappHandoff, { source: "guide_result" })).toBe(true);
    expect(track).toHaveBeenNthCalledWith(1, "ai_guide_start", { hasImage: true });
    expect(track).toHaveBeenNthCalledWith(2, "ai_guide_image_upload", { type: "image/jpeg", sizeBucket: "small" });
    expect(track).toHaveBeenNthCalledWith(3, "ai_guide_whatsapp_handoff", { source: "guide_result" });
    expect(JSON.stringify(track.mock.calls)).not.toContain("data:image");
    delete (globalThis as Record<string, unknown>).window;
  });

  it("tracks gallery and showroom engagement with metadata only", () => {
    const track = vi.fn();
    (globalThis as Record<string, unknown>).window = { umami: { track } };

    trackAIGuideEvent(AI_GUIDE_EVENTS.galleryClick, { label: "Virtual showroom tour", source: "heaven_channel", index: 1 });
    trackAIGuideEvent(AI_GUIDE_EVENTS.showroomDirection, { source: "showroom_section" });

    expect(track).toHaveBeenNthCalledWith(1, "gallery_image_click", { label: "Virtual showroom tour", source: "heaven_channel", index: 1 });
    expect(track).toHaveBeenNthCalledWith(2, "showroom_direction_click", { source: "showroom_section" });
    expect(JSON.stringify(track.mock.calls)).not.toContain("data:image");
    expect(JSON.stringify(track.mock.calls)).not.toContain("Living room");
    delete (globalThis as Record<string, unknown>).window;
  });

  it("fails silently when analytics is not loaded", () => {
    expect(trackAIGuideEvent(AI_GUIDE_EVENTS.start, { hasImage: false })).toBe(false);
  });
  it("maps every explicit server error code to distinct human guidance", () => {
    const invalidImage = getRoomGuideErrorCopy("INVALID_IMAGE");
    const unavailable = getRoomGuideErrorCopy("INFERENCE_UNAVAILABLE");
    const malformed = getRoomGuideErrorCopy("MALFORMED_RESPONSE");

    expect(invalidImage.title).toBe("Check the room photo");
    expect(unavailable.title).toBe("The studio connection paused");
    expect(malformed.title).toBe("The guide needs another pass");
    expect(new Set([invalidImage.copy, unavailable.copy, malformed.copy]).size).toBe(3);
  });

  it("preserves the complete brief and image when retrying", () => {
    const draft = { room: "Living room", feeling: "Warm & layered", timing: "This season", budget: "Need guidance", imageDataUrl: "data:image/png;base64,AAAA" };
    expect(buildRoomGuideRequest(draft)).toEqual(draft);
  });

  it("keeps the completed brief in the WhatsApp fallback", () => {
    const link = buildRoomGuideWhatsAppLink({ room: "Living room", feeling: "Warm & layered", timing: "This season", budget: "Need guidance" });
    expect(link).toContain("wa.me/8801960481983");
    expect(decodeURIComponent(link)).toContain("living room");
    expect(decodeURIComponent(link)).toContain("need guidance");
  });
});
