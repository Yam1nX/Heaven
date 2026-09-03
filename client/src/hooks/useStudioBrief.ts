import { useEffect, useMemo, useState } from "react";
import { aiLoadingMessages } from "@/data/studioContent";
import {
  AI_GUIDE_EVENTS,
  buildRoomGuideRequest,
  buildRoomGuideWhatsAppLink,
  getRoomGuideErrorCopy,
  trackAIGuideEvent,
} from "@/lib/roomGuideUx";
import { trpc } from "@/lib/trpc";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/**
 * Single source of truth for the four-step studio brief and the AI room guide it
 * unlocks. Pulled out of the page component so both the section-3 quick-match
 * teaser and the full brief form can read and write the same in-progress brief.
 */
export function useStudioBrief() {
  const [room, setRoom] = useState("");
  const [feeling, setFeeling] = useState("");
  const [timing, setTiming] = useState("");
  const [budget, setBudget] = useState("");
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [roomImageName, setRoomImageName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [loadingStage, setLoadingStage] = useState(0);

  const guideMutation = trpc.ai.roomGuide.useMutation();

  const briefReady = Boolean(room && feeling && timing && budget);
  const completedSteps = [room, feeling, timing, budget].filter(Boolean).length;

  const guideResponse = guideMutation.data;
  const guideResult = guideResponse?.ok ? guideResponse.guide : undefined;
  const explicitGuideError =
    guideResponse && !guideResponse.ok ? guideResponse : undefined;
  const guideErrorCode =
    explicitGuideError?.code ??
    (guideMutation.isError ? "INFERENCE_UNAVAILABLE" : null);
  const guideHasError = Boolean(guideMutation.isError || explicitGuideError);
  const guideErrorCopy = getRoomGuideErrorCopy(
    guideErrorCode ?? "MALFORMED_RESPONSE"
  );

  useEffect(() => {
    if (!guideMutation.isPending) {
      setLoadingStage(0);
      return;
    }
    const timer = window.setInterval(
      () => setLoadingStage(stage => (stage + 1) % aiLoadingMessages.length),
      1800
    );
    return () => window.clearInterval(timer);
  }, [guideMutation.isPending]);

  const whatsappLink = useMemo(
    () =>
      buildRoomGuideWhatsAppLink({
        room: room || "custom furniture",
        feeling: feeling || "considered",
        timing: timing || "still open",
        budget: budget || "open",
      }),
    [room, feeling, timing, budget]
  );

  function handleRoomImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError("");
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("Please choose a JPG, PNG, or WEBP room image.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError(
        "That image is over 5MB. A smaller room photo will analyse faster."
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl =
        typeof reader.result === "string" ? reader.result : null;
      setRoomImage(imageDataUrl);
      setRoomImageName(file.name);
      if (imageDataUrl)
        trackAIGuideEvent(AI_GUIDE_EVENTS.imageUpload, {
          type: file.type,
          sizeBucket: file.size < 1_000_000 ? "small" : "large",
        });
    };
    reader.onerror = () =>
      setUploadError("We couldn’t read that image. Please try another file.");
    reader.readAsDataURL(file);
  }

  function clearRoomImage() {
    setRoomImage(null);
    setRoomImageName("");
    setUploadError("");
  }

  function runRoomGuide() {
    if (!briefReady) return;
    trackAIGuideEvent(AI_GUIDE_EVENTS.start, { hasImage: Boolean(roomImage) });
    guideMutation.mutate(
      buildRoomGuideRequest({
        room,
        feeling,
        timing,
        budget,
        imageDataUrl: roomImage ?? undefined,
      })
    );
  }

  /** Lets the section-3 quick-match teaser hand a room + feeling straight to the brief. */
  function presetFromQuickMatch(nextRoom: string, nextFeeling: string) {
    setRoom(nextRoom);
    setFeeling(nextFeeling);
  }

  return {
    room,
    feeling,
    timing,
    budget,
    setRoom,
    setFeeling,
    setTiming,
    setBudget,
    roomImage,
    roomImageName,
    uploadError,
    handleRoomImage,
    clearRoomImage,
    briefReady,
    completedSteps,
    runRoomGuide,
    presetFromQuickMatch,
    whatsappLink,
    isPending: guideMutation.isPending,
    loadingStage,
    guideResult,
    guideHasError,
    guideErrorCopy,
  };
}

export type StudioBrief = ReturnType<typeof useStudioBrief>;
