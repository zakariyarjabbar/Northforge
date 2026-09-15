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

1. All 23 listed content destinations, including every project/expertise detail and legacy info route, load with headings, valid canonical/social metadata, local imagery and no mock/view-only notices. The branded 404 returns HTTP 404.
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

## English, Arabic and Sorani update — completed 15 September 2026

This update is local only, following the user's explicit instruction. It has not been pushed or deployed. The existing Sites manifest and original publication remain unchanged. The local production export is served at `http://localhost:4176/`.

- Production build passed with 73 generated entries: 69 content pages (23 in each language) plus Next.js metadata and not-found entries. TypeScript and ESLint passed.
- All nine original flow groups passed against the translated implementation.
- All seven language groups passed across the initial run and a targeted rerun correcting a test assertion's attribute-name casing. Both translation catalogs have 587 nonempty keys with matching variable placeholders.
- All 46 Arabic and Sorani content pages were requested directly and visited in Chromium. Each returned 200, included the correct static `lang` and RTL direction, localized headings and descriptions, canonical and language alternatives, and had no unexpected visible English text or page errors. Proper names and stable technical export labels were intentionally allowed.
- Keyboard selector operation, Escape/focus return, native language links, current project, filter query, URL fragment, saved bookmarks and return-to-collection behavior passed. Reload retained the selected language through its URL.
- Arabic and Sorani keyword search, inquiry validation, save/edit under the same reference, translated text download and career-profile download passed. Visitor-authored text and inquiry drafts survived language changes. Switching also worked with browser storage blocked.
- Six representative routes in all three languages had no horizontal overflow at widths 360, 390, 768, 1024 and 1440px (900px height). The open language panel stayed within every viewport. Axe reported no WCAG 2/2.1/2.2 A/AA violations for the open selector/homepage at 390px and 1440px in each language.

Visual inspection covered all three desktop home selectors, the Sorani mobile selector, Arabic mobile projects, Sorani mobile case study, Arabic desktop contact and Sorani global atlas. Evidence is under `.impeccable/review/languages/`. A single correction batch aligned empty form fields with the page direction and mirrored remaining directional arrows. Full-page screenshots were recaptured after scrolling through lazy-loaded photographs; no asset loading error occurred.

After that correction, the build, TypeScript, ESLint and three affected language test groups passed again. Browser checks confirmed an empty Arabic field uses RTL, English visitor text uses LTR, and Arabic visitor text uses RTL. The confirmation screenshots showed the corrected fields, arrows and fully loaded project galleries.

Native names, Arabic-script shaping and responsive layout were inspected visually. No independent native-speaker editorial review was performed. The static unknown-route fallback remains the shared English 404; all listed content destinations have complete translated pages. Existing performance observations above apply to the original English build, not a new multilingual performance measurement.
