# Heaven Furniture Mart - Landing Page

<img width="1889" height="909" alt="image" src="https://github.com/user-attachments/assets/5a6792a9-5958-4e28-808e-086638faa3c9" />


Furniture landing page for Heaven Furniture Mart (Chattogram, Bangladesh).
"Quiet Atelier" art direction — editorial, image-led, one primary conversion action —
plus an AI Room Guide that turns a room photo and a short brief into practical,
personalized guidance before handing the visitor to WhatsApp.

**Live demo:** _add your deployed URL here once you've followed "Deploying a
live demo" below_

## Highlights

- Full-stack TypeScript: React 19 + Vite client, Express + tRPC (end-to-end typed) API
- Server-side vision-LLM integration against any OpenAI-compatible endpoint —
  structured JSON-schema output, retry/backoff, and typed error handling
- Zod-validated API contracts shared between client and server
- Vitest coverage for the API contract and the LLM client (mocked network, no
  live API credits spent in CI)
- CI on every push (typecheck, tests, production build)

## Stack

- **Client:** React + Vite, Tailwind, Radix/shadcn UI, wouter routing, tRPC client
- **Server:** Express + tRPC
- **AI Room Guide:** server-side vision-capable LLM call (see below)

## Local development

```bash
npm install
npm run dev
```

`npm run check` (TypeScript) and `npm test` (Vitest) should both pass clean.

## Production build

```bash
npm run build
npm start
```

## AI Room Guide dependency

The Room Guide's vision analysis calls out through `server/_core/llm.ts` to a
standard OpenAI-compatible chat-completions endpoint. Set `OPENAI_API_KEY` and
it works; `OPENAI_API_BASE_URL` and `OPENAI_MODEL` are optional overrides
(default: `https://api.openai.com/v1` and `gpt-4o-mini`, which supports vision
input and JSON schema output — matching what this feature needs). There's no
database and no login flow in this project, so **for a live demo,
`OPENAI_API_KEY` is the only credential you actually need.**


