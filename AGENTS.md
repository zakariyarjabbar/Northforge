# NORTHFORGE GROUP working rules

Preserve the user's direct, rigorous working style. Separate verified facts, assumptions, and estimates; never invent verification results.

## Product and content
Follow PRODUCT.md and the user's supplied brief. NORTHFORGE is fictional portfolio work; maintain that context in internal documentation. The user explicitly requests finished public company copy without mock/demo/view-only notices. Do not add fake testimonials, clients, awards, certifications, real project ownership, office addresses, or transmission confirmations. Inquiry actions save browser records; labels must match behavior.

## Architecture
Next.js App Router + TypeScript, `output: 'export'`, typed bundled content, optimized local images, no database/authentication/backend/form service. All public detail routes pre-rendered. Browser APIs only in client-safe code. Shared versioned storage uses `northforge:v1:` and removes only that namespace when resetting.

## Languages
Maintain English at the existing URLs, Arabic under `/ar/`, and Sorani Kurdish under `/ckb/`. Shared templates live in `views/`. Keep both translation catalogs complete, including metadata, accessible names, form messages and text exports. Internal links must use the locale-aware link helper. Preserve filter URLs and browser records across language changes; never translate visitor-authored text. Render `lang` and `dir` in static HTML, preserve map geography, and use logical spacing in RTL layouts. The latest language update is local-only at the user's request.

## Creative priorities
Photography first, concise copy, distinctive industrial editorial identity, complete multi-page journey, familiar navigation, accessible map/list equivalence. Preserve unrelated user work. Use DESIGN.md as visual authority after implementation.

## Commands and verification
`npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm run test:flows`, `npm run serve`. Validate static exports, mobile/desktop, URL filters/back navigation, saves/reload, inquiry editing/export/reset/storage failure. Record actual results and concrete limits in docs/QA.md. Do not claim deployed until deployment is verified. Commit the lockfile and asset provenance.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
