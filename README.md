# Heaven Furniture Mart — Landing Page

[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)

Bespoke-furniture landing page for Heaven Furniture Mart (Chattogram, Bangladesh).
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

## Deploying a live demo (for a CV / portfolio link)

1. Get an OpenAI API key at platform.openai.com and set `OPENAI_API_KEY` in
   your host's environment variables.
2. Push this repo to GitHub.
3. Deploy on [Render](https://render.com) (or Railway) as a Node web service:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Add the `OPENAI_API_KEY` env var in the dashboard.
4. That's it — no database required. `npm start` serves both the API and the
   static frontend from a single Node process on `PORT`.

This gets you a real, working, clickable URL for your CV — with the AI Room
Guide actually functional, not just a UI mockup.

## SEO / sharing

`client/index.html` ships Open Graph, Twitter Card, and `FurnitureStore` JSON-LD
structured data, plus `robots.txt` and `sitemap.xml` in `client/public/`. All of these
currently point at the placeholder domain `https://www.heavenfurnituremart.com/` —
swap in the real domain once one is registered, and add a real `og-cover.jpg`
(1200×630) to `client/public/`.

## Content still needed from the client

The gallery and collection imagery currently mix Unsplash stock photography with
sourced stills from Heaven's own YouTube channel (see `gallery-sources.md`). Before
a real launch, swap in actual showroom and completed-project photography — it's the
single biggest remaining gap between "demo" and "the client's real site," and real
photos will always read as more credible than stock.
