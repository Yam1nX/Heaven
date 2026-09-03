/*
 * Verifies the LLM client builds the right request against a standard
 * OpenAI-compatible chat-completions endpoint, and fails loudly when no
 * API key is configured at all.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

function freshEnv(overrides: Record<string, string | undefined>) {
  vi.resetModules();
  for (const key of ["OPENAI_API_KEY", "OPENAI_API_BASE_URL", "OPENAI_MODEL"]) {
    delete process.env[key];
  }
  Object.assign(process.env, overrides);
}

describe("invokeLLM", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ id: "x", created: 0, model: "x", choices: [] }), { status: 200 }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = { ...ORIGINAL_ENV };
  });

  it("calls the default OpenAI endpoint with the configured key and model", async () => {
    freshEnv({ OPENAI_API_KEY: "sk-test" });
    const { invokeLLM } = await import("./llm");
    await invokeLLM({ messages: [{ role: "user", content: "hi" }] });

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.openai.com/v1/chat/completions");
    expect((init.headers as Record<string, string>).authorization).toBe("Bearer sk-test");
    expect(JSON.parse(init.body as string).model).toBe("gpt-4o-mini");
  });

  it("respects a custom OpenAI-compatible base URL and model", async () => {
    freshEnv({ OPENAI_API_KEY: "sk-test", OPENAI_API_BASE_URL: "https://my-gateway.example.com/v1", OPENAI_MODEL: "gpt-4.1-mini" });
    const { invokeLLM } = await import("./llm");
    await invokeLLM({ messages: [{ role: "user", content: "hi" }] });

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://my-gateway.example.com/v1/chat/completions");
    expect(JSON.parse(init.body as string).model).toBe("gpt-4.1-mini");
  });

  it("throws a clear error when no API key is configured", async () => {
    freshEnv({});
    const { invokeLLM } = await import("./llm");
    await expect(invokeLLM({ messages: [{ role: "user", content: "hi" }] })).rejects.toThrow(/No LLM credentials configured/);
  });
});
