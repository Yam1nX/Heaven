/*
 * Server contract for the public-facing studio guide. Keep AI credentials server-side;
 * the browser receives a typed success or recovery response with no hidden error guessing.
 */
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const roomGuideInputSchema = z.object({
  room: z.string().min(2).max(80),
  feeling: z.string().min(2).max(80),
  timing: z.string().min(2).max(80),
  budget: z.string().min(2).max(80),
  imageDataUrl: z.string().max(8_000_000).optional(),
});

export const roomGuideErrorCodeSchema = z.enum(["INVALID_IMAGE", "INFERENCE_UNAVAILABLE", "MALFORMED_RESPONSE"]);
export type RoomGuideErrorCode = z.infer<typeof roomGuideErrorCodeSchema>;

export const roomGuideOutputSchema = z.object({
  title: z.string(),
  summary: z.string(),
  startingPoint: z.string(),
  materialDirection: z.string(),
  planningTip: z.string(),
  consultationQuestion: z.string(),
  visualRead: z.string(),
  personalizedNextSteps: z.array(z.string()).length(2),
});
export type RoomGuide = z.infer<typeof roomGuideOutputSchema>;
export type RoomGuideResponse =
  | { ok: true; guide: RoomGuide }
  | { ok: false; code: RoomGuideErrorCode; message: string };

const imageDataUrlPattern = /^data:image\/(jpeg|png|webp);base64,/;

export function buildRoomGuidePrompt(input: z.infer<typeof roomGuideInputSchema>) {
  return `Create a useful, warm, realistic furniture planning note for an everyday person in Bangladesh who is considering bespoke furniture from Heaven Furniture Mart in Chattogram.

Their brief:
- Room: ${input.room}
- Desired feeling: ${input.feeling}
- Timing: ${input.timing}
- Budget comfort: ${input.budget}
- Room image: ${input.imageDataUrl ? "A room image is attached. Analyse only visible layout, light, materials, circulation, and furniture scale." : "No room image attached."}

Give advice that is practical before it is aspirational. Recommend a sensible furniture starting point, one material direction, one measurement or planning tip, and one question they should ask during a free design consultation. If a room image is attached, add a short visual read limited to visible layout, light, dominant materials, furniture scale, and circulation. Also add exactly two personalized next steps based only on the brief and visible room details. Never invent a price, product availability, review, rating, certification, or exact lead time. Never present yourself as an interior architect or promise a result. Keep the tone encouraging and clear for a normal homeowner. Mention that a consultant can refine the idea in person at the Agrabad showroom. Output only JSON matching the requested schema.`;
}

export function parseRoomGuideContent(content: unknown): RoomGuideResponse {
  if (typeof content !== "string" || !content.trim()) {
    return { ok: false, code: "MALFORMED_RESPONSE", message: "The room guide returned an empty response." };
  }
  try {
    const parsed = roomGuideOutputSchema.safeParse(JSON.parse(content));
    if (!parsed.success) return { ok: false, code: "MALFORMED_RESPONSE", message: "The room guide returned an incomplete response." };
    return { ok: true, guide: parsed.data };
  } catch {
    return { ok: false, code: "MALFORMED_RESPONSE", message: "The room guide returned an unreadable response." };
  }
}

const roomGuideJsonSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "A short useful title for this room direction" },
    summary: { type: "string", description: "A 2 sentence practical overview" },
    startingPoint: { type: "string", description: "The best first furniture or layout step" },
    materialDirection: { type: "string", description: "One material or finish direction and why" },
    planningTip: { type: "string", description: "One practical measurement, circulation, or planning tip" },
    consultationQuestion: { type: "string", description: "One question to bring to the consultant" },
    visualRead: { type: "string", description: "A concise visible-room observation; if no image is supplied, say that no visual read was requested" },
    personalizedNextSteps: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 2, description: "Exactly two practical personalized next steps" },
  },
  required: ["title", "summary", "startingPoint", "materialDirection", "planningTip", "consultationQuestion", "visualRead", "personalizedNextSteps"],
  additionalProperties: false,
} as const;

export const appRouter = router({
  system: systemRouter,
  ai: router({
    roomGuide: publicProcedure
      .input(roomGuideInputSchema)
      .mutation(async ({ input }): Promise<RoomGuideResponse> => {
        if (input.imageDataUrl && (input.imageDataUrl.length > 7_000_000 || !imageDataUrlPattern.test(input.imageDataUrl))) {
          return { ok: false, code: "INVALID_IMAGE", message: "Only a JPG, PNG, or WEBP room image under 5MB can be analysed." };
        }

        let response;
        try {
          response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are Heaven Furniture Mart's practical room-planning guide. Be honest, concise, culturally aware, and helpful. Do not fabricate business facts or social proof.",
              },
              { role: "user", content: input.imageDataUrl ? [
                { type: "text", text: buildRoomGuidePrompt(input) },
                { type: "image_url", image_url: { url: input.imageDataUrl, detail: "high" } },
              ] : buildRoomGuidePrompt(input) },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "heaven_room_guide",
                strict: true,
                schema: roomGuideJsonSchema,
              },
            },
          });
        } catch {
          return { ok: false, code: "INFERENCE_UNAVAILABLE", message: "The room-planning service could not be reached." };
        }

        return parseRoomGuideContent(response.choices[0]?.message?.content);
      }),
  }),
});

export type AppRouter = typeof appRouter;
