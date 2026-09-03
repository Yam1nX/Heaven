/*
 * Unit coverage for the practical AI room-guide contract. Inference is mocked so
 * success and recovery branches stay deterministic and do not spend live credits.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedGuide = {
  title: "Warm & Layered Living Room Planning Guide",
  summary: "Begin with one anchor piece and let the room build around it.",
  startingPoint: "Measure the sofa wall and plan circulation before choosing a table.",
  materialDirection: "Walnut with linen keeps the room warm without feeling heavy.",
  planningTip: "Leave a comfortable walking path between the sofa and main table.",
  consultationQuestion: "Which finish will stay practical for everyday family use?",
  visualRead: "The visible room has a clear sofa wall and warm, directional light.",
  personalizedNextSteps: ["Measure the sofa wall.", "Photograph the room in daylight."],
};

vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(async () => ({
    choices: [{ message: { content: JSON.stringify(mockedGuide) } }],
  })),
}));

import { invokeLLM } from "./_core/llm";
import { appRouter, buildRoomGuidePrompt, roomGuideInputSchema } from "./routers";

const invokeMock = vi.mocked(invokeLLM);
const completeBrief = { room: "Living room", feeling: "Warm & layered", timing: "This season", budget: "Need guidance" };

function createCaller() {
  return appRouter.createCaller({ req: {} as never, res: {} as never });
}

describe("ai.roomGuide contract", () => {
  beforeEach(() => vi.clearAllMocks());

  it("accepts a complete everyday homeowner brief", () => {
    const input = roomGuideInputSchema.parse(completeBrief);
    expect(buildRoomGuidePrompt(input)).toContain("Living room");
    expect(buildRoomGuidePrompt(input)).toContain("Need guidance");
    expect(buildRoomGuidePrompt(input)).toContain("Never invent a price");
  });

  it("returns a structured practical guide from the server procedure", async () => {
    const result = await createCaller().ai.roomGuide(completeBrief);
    expect(result).toEqual({ ok: true, guide: mockedGuide });
  });

  it("returns an explicit invalid-image code", async () => {
    const result = await createCaller().ai.roomGuide({ ...completeBrief, imageDataUrl: "data:text/plain;base64,AAAA" });
    expect(result).toMatchObject({ ok: false, code: "INVALID_IMAGE" });
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it("returns an explicit inference-unavailable code", async () => {
    invokeMock.mockRejectedValueOnce(new Error("temporary outage"));
    const result = await createCaller().ai.roomGuide(completeBrief);
    expect(result).toEqual({ ok: false, code: "INFERENCE_UNAVAILABLE", message: "The room-planning service could not be reached." });
  });

  it("returns an explicit malformed-response code", async () => {
    invokeMock.mockResolvedValueOnce({ choices: [{ message: { content: "{}" } }] } as never);
    const result = await createCaller().ai.roomGuide(completeBrief);
    expect(result).toEqual({ ok: false, code: "MALFORMED_RESPONSE", message: "The room guide returned an incomplete response." });
  });

  it("accepts a validated room image data URL", () => {
    const parsed = roomGuideInputSchema.parse({ ...completeBrief, imageDataUrl: "data:image/png;base64,AAAA" });
    expect(parsed.imageDataUrl).toContain("data:image/png");
  });

  it("rejects incomplete briefs", () => {
    expect(() => roomGuideInputSchema.parse({ room: "Living room" })).toThrow();
  });
});
