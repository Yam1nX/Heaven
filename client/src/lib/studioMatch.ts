/*
 * A small, honest recommendation engine — not a stand-in for the LLM-backed Room
 * Guide further down the page. It runs entirely in the browser off two taps (room +
 * feeling) so a visitor gets an immediate, explainable starting point before they
 * commit to the full studio brief. Every output traces back to a rule below; nothing
 * here is fabricated the way the AI guide is instructed never to fabricate specifics.
 */
import { materials, type Material } from "@/data/studioContent";

type RoomProfile = { label: string; note: string; href: string };

const roomProfiles: Record<string, RoomProfile> = {
  "Living room": {
    label: "Living collection",
    note: "Soft structure and generous comfort, for where the household gathers.",
    href: "#collections",
  },
  Bedroom: {
    label: "Bedroom collection",
    note: "Quiet proportion and tailored rest, sized to your actual room.",
    href: "#collections",
  },
  Dining: {
    label: "Dining collection",
    note: "Handmade rhythm for everyday ceremony, built to your table count.",
    href: "#collections",
  },
  "Office / study": {
    label: "Bespoke study pieces",
    note: "Desks, shelving, and workstations built around how you actually work.",
    href: "#bespoke",
  },
  "Something else": {
    label: "A fully bespoke piece",
    note: "Built from a blank page, around your space and your brief.",
    href: "#bespoke",
  },
};

const feelingToMaterial: Record<string, Material["name"]> = {
  "Warm & layered": "Walnut",
  "Quiet & minimal": "Linen",
  "Bold & sculptural": "Brass",
  "Classic & enduring": "Bouclé",
};

export type StudioMatch = {
  collectionLabel: string;
  collectionNote: string;
  collectionHref: string;
  material: Material;
  confidence: number;
  reason: string;
};

/** Returns null until a room is chosen — there's nothing honest to say before that. */
export function matchStudioRecommendation(
  room: string,
  feeling: string
): StudioMatch | null {
  const roomProfile = roomProfiles[room];
  if (!roomProfile) return null;

  const materialName = feelingToMaterial[feeling];
  const material =
    materials.find(item => item.name === materialName) ?? materials[0];
  const isCoreCollection =
    room === "Living room" || room === "Bedroom" || room === "Dining";

  // Base read from the room alone; a chosen feeling sharpens both the material call
  // and how confident that pairing is, so the meter reflects real information gain.
  const confidence = Math.min(
    96,
    68 + (isCoreCollection ? 14 : 6) + (materialName ? 14 : 0)
  );

  const reason = materialName
    ? `${roomProfile.note} Paired with ${material.name.toLowerCase()} — ${material.detail.toLowerCase()}.`
    : `${roomProfile.note} Choose a feeling to sharpen the material direction.`;

  return {
    collectionLabel: roomProfile.label,
    collectionNote: roomProfile.note,
    collectionHref: roomProfile.href,
    material,
    confidence,
    reason,
  };
}
