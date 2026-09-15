# NORTHFORGE GROUP

A complete fictional infrastructure group portfolio website, built with Next.js 16.3.5, React 19.3 and TypeScript. The public presentation uses finished company copy, following the user’s latest instruction. Fictional content and asset provenance are recorded in project documentation.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3016. Node.js 20.9 or newer is required by Next.js; this project was built on Node.js 26.0.0.

```sh
npm run build       # static export to out/
npm run serve       # http://localhost:4176, serves the actual exported files
npm run typecheck
npm run lint
npm run test:flows  # uses the export and Playwright Chromium
```

Install the test browser once with `npx playwright install chromium`. The included static server serves directory indexes and the branded 404 without a runtime application backend.

## Routes

- `/`: company introduction and selected work.
- `/projects`: expertise, region and keyword filters; grid and atlas views.
- `/projects/[slug]`: eight case studies, including three flagship galleries and the bridge construction diagram.
- `/expertise` and `/expertise/[slug]`: four capability areas and their related projects.
- `/group`, `/global`, `/careers`: company approach, geographic routing and three detailed opportunities.
- `/contact`: project brief, contact details, review, save, edit, text/JSON download, print and removal.
- `/saved`: saved projects and inquiry references.
- `/website-information`, `/privacy`: accurate browser-data explanation, credits and scoped data reset.
- `/about-this-demo`: compatibility route to website information, canonicalised to `/website-information`; no public navigation uses the old route.

## Data

Typed public data lives in `lib/content.ts`. `lib/storage.ts` centralises visitor state in `northforge:v1:workspace`. It validates stored values, deduplicates records, handles malformed JSON, synchronises changes across tabs, and falls back to memory if browser storage is unavailable. Drafts and saved records do not enter URLs. Public filters use URL query parameters. A session-storage entry preserves the last project collection link. Reset removes only NORTHFORGE keys.

There is no database, authentication implementation, email delivery or external form service. Inquiry and career actions save locally and say so at the action. Hosting access control is supplied by Sites, separately from application state.

## Languages

English uses the existing URLs. Arabic is under `/ar/` and Iraqi Sorani Kurdish under `/ckb/`; the same 23 content destinations are statically exported for each language. The header language selector uses native names, visible selection, keyboard navigation, and a responsive dropdown. Switching preserves the current destination, query filters, hash, and browser records.

Arabic and Sorani render with `lang` and right-to-left direction in the exported HTML. Shared templates live in `views/`; English route wrappers and the localized route registry reuse them. `lib/locales/ar.json` and `lib/locales/ckb.json` contain 587 translations each, including case studies, form messages, downloads, image descriptions, and metadata. See `docs/I18N.md` for maintenance rules.

## Images and fonts

Final imagery and responsive 720px variants are bundled under `public/images`. The collection contains 19 original project photographs, with alternate CSS detail views used for three supporting projects after an image-generation quota interruption. Every project has a complete gallery with no missing files. The homepage cover and eight project photo covers are under `public/og` at 1200 × 630. Manrope and Noto Sans Arabic are self-hosted with their SIL Open Font Licenses.

`docs/ASSETS.md` and `docs/IMAGE-PROMPTS.json` record asset sources and exact image-generation prompts. WebP sidecars and JPEG metadata preserve per-file provenance. `scripts/import-assets.mjs` imports an available original asset directory; deployed builds require only the committed final assets.

## Export and origin

`next.config.ts` uses `output: 'export'`, trailing slashes and static-compatible images. Known project, expertise and language paths are generated at build time. All metadata is emitted into exported HTML with locale-specific canonicals and language alternatives. Multiple root layouts provide the correct document language and direction; Next.js global-not-found supplies the shared static 404.

`NEXT_PUBLIC_SITE_URL` overrides the deployment origin. Without it, production builds use the provisioned Sites origin in `lib/site-config.ts`; development uses localhost:3016. Set the environment variable before rebuilding for another host. A copied `.env.example` is a local configuration example, not a production value.

`.openai/hosting.json` retains the registered Site ID and declares `out` as public static output. Local/private pages are omitted from the sitemap, and contact/saved pages carry noindex. Private hosting prevents unauthorised access independently of robots settings.

The three-language update is local only, as requested. Preview the export at `http://localhost:4176/`; no deployment of this update was performed.

## Verification and limits

See `docs/QA.md` for actual checks and evidence. Automated accessibility checks and local performance observations are laboratory evidence, not WCAG certification or real-user Core Web Vitals. Live social previews in third-party chat services have not been tested. Browser storage is device-specific and removable by the browser. No tracking or analytics are installed.
