export const ENV = {
  isProduction: process.env.NODE_ENV === "production",
  // OpenAI-compatible provider for the AI Room Guide's vision-LLM call.
  // Works with OpenAI itself or any compatible gateway — just point
  // llmApiBaseUrl at it.
  llmApiKey: process.env.OPENAI_API_KEY ?? "",
  llmApiBaseUrl: process.env.OPENAI_API_BASE_URL ?? "https://api.openai.com/v1",
  llmModel: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
};
