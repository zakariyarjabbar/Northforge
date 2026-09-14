# Verification record

Completed 14 September 2026. Verification used the production static export and Chromium via Playwright, with selected render checks in the local Next.js preview. No certification or field-performance claim is made.

## Build and source

- Next.js 16.3.5 production build: passed; 27 generated entries including metadata and not-found output.
- TypeScript strict checking: passed.
- ESLint: passed.
- Production dependency audit: zero known vulnerabilities at the final check. Earlier Sharp 0.34 advisory was resolved by upgrading to 0.35.4.
- Lockfile committed with exact resolved dependencies.
- Static export has no application server, database, form service or runtime image optimizer.

## Meaningful behavior

Nine Playwright test groups passed across the initial run and targeted reruns after corrections:

1. All 24 listed content destinations, including every project/expertise detail and legacy info route, load with headings, valid canonical/social metadata, local imagery and no mock/view-only notices. The branded 404 returns HTTP 404.
2. Expertise and region filters, keyword search, empty results, reset, browser back and return from a case study preserve public filter context.
3. Atlas marker/list selection and keyboard controls update the matching project; bridge stage controls update the explanatory diagram.
4. Saved projects survive reload and synchronise between tabs.
5. Inquiry validation, drafts after reload, review/back, save, edit under the same reference, text download and removal work. Personal details do not enter URLs.
6. Career drafts survive reload; local completion and download work; Escape restores focus to the initiating opportunity button.
7. Malformed storage does not crash the UI. Unavailable storage retains in-memory changes with a notice. Reset leaves unrelated storage intact.
8. Mobile menu opens/closes, Escape restores focus, navigation works, and representative pages have no horizontal overflow at 390 × 844.
9. Axe checks for WCAG 2/2.1/2.2 A/AA report no violations on homepage, projects, global, contact, careers, flagship case study and website information at the tested desktop viewport.

Test file: `tests/flows.spec.ts`. Native WebMCP is unavailable in the installed test browser. The optional feature-detected project-filter tool remains unverified in a native supported WebMCP context; ordinary filters and navigation are fully tested.

## Visual review

Two bounded desktop/mobile passes, with final screenshots from the static export. Homepage, project collection, flagship case study, global atlas, contact and mobile careers were inspected. Full-page evidence is retained locally under `.impeccable/review/` (ignored in Git).

Corrections: mobile words joining at hidden line breaks, redundant eyebrow labels, and overlapping Atlantic map hit areas. The map keeps geographic dots at their correct coordinates while separating the Portugal/Morocco hit boxes. Navigation underline uses a transform instead of width animation.

Independent finish reviewer disposition: **Ship**. Both listed material findings were scored **resolved**. This verdict covers the reviewed surfaces and corrections, not untested external behavior.

The initial contact screenshots exposed stale dev-server route registration. Restarting the preview restored the route; exported contact had passed throughout. Contact evidence was recaptured from the export before review.

## Assets and metadata

- 19 original project photographs; three supporting galleries reuse closer CSS views of the same original after the image service quota was reached. No missing assets ship.
- Three flagship galleries each have four distinct original images; two other galleries have two each.
- Homepage branded cover plus eight individual project photo covers, all 1200 × 630.
- All 47 raster outputs have recoverable generation provenance; scan reports zero missing.
- Fonts, photos and geographic data are bundled locally. Canonical and social URLs use the provisioned Sites origin. Contact and saved pages are noindex and excluded from sitemap.
- Social metadata inspected in exported HTML. Actual third-party chat unfurling was not tested; private hosted access can prevent crawlers from fetching previews.

## Performance context

`PERFORMANCE.json` records one unthrottled localhost Chromium homepage load per viewport on the development machine: observed LCP 36 ms and CLS 0 for both desktop and mobile; transferred resources approximately 1.62 MB / 0.81 MB respectively. These localhost observations are not representative network/device results and do not establish field targets. INP, real-user 75th percentiles and Lighthouse scores were not measured. No analytics are installed.

## Operational boundaries

Inquiries and career profiles stay in the current browser and can be exported manually. No message is transmitted and no recipient acknowledgment is claimed. Browser clearing removes records; no device synchronisation. The site is intended for private Sites publication unless the owner explicitly changes its audience. No external client email, phone number, contract or real-world accreditation has been invented.
