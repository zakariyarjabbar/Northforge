---
name: NORTHFORGE GROUP
description: A photographic engineering annual with precise geographic wayfinding.
colors:
  accent: "#e8ff62"
  ink: "#202521"
  paper: "#f5f5f0"
  white: "#fff"
  muted: "#62695f"
  line: "#d7dad1"
  dark-line: "#4b514a"
  error: "#a12c25"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(58px, 7.1vw, 102px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-.04em"
  page-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(48px, 6vw, 88px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(36px, 4vw, 58px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(23px, 2.4vw, 32px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  square: "0px"
  circle: "50%"
spacing:
  gutter: "clamp(24px, 4.2vw, 72px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.control}"
    rounded: "{rounded.square}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "#3c4739"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.square}"
    padding: "14px 22px"
  button-accent-hover:
    backgroundColor: "#dbf64a"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.square}"
    padding: "14px 22px"
  button-outline-hover:
    backgroundColor: "#e6e9df"
  text-link:
    textColor: "{colors.ink}"
    padding: "12px 0"
  inquiry-field:
    backgroundColor: "#fff7"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "13px 14px"
  navigation:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  filter-chip:
    backgroundColor: "#e6eadf"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "8px 12px"
  project-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
  save-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    width: "44px"
    height: "44px"
  atlas-marker:
    backgroundColor: "transparent"
    width: "44px"
    height: "44px"
  confirmation-dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "42px"
    width: "min(560px, calc(100% - 32px))"
---

# Design System: NORTHFORGE GROUP

## Overview

**Creative North Star: "The Engineering Annual"**

Broad photographic fields, carefully cropped infrastructure, large Manrope statements, and generous ivory intervals give NORTHFORGE a precise, expansive industrial identity. Graphite sections and fine rules organize the rhythm; signal yellow carries direction and selected state.

This documents the built system in `app/layout.tsx`, `app/globals.css`, `app/pages.css`, and the shared components. The code-led design was developed under delegated creative ownership; there is no approved mockup. NORTHFORGE is fictional portfolio work, recorded here as internal context; the public presentation uses finished company copy.

**Key Characteristics:**

- Photography leads; captions and engineering detail support it.
- Flat, unframed layouts use asymmetric columns and strong horizontal rules.
- One type family connects expressive headings with familiar controls.
- Geographic selection, saved projects, and inquiry records have explicit visible states.

## Colors

The palette combines warm ivory, green-tinted graphite, and vivid signal yellow. Frontmatter values are normative; the source variables retain their existing names.

### Primary

- **Signal yellow (`accent`)** marks directional arrows, the brand symbol, selected controls, and contact bands. On light surfaces it carries dark text; accent-colored text belongs on graphite.

### Neutral

- **Graphite (`ink`)** is the main text, header, footer, dark section, atlas, and primary-button color.
- **Ivory (`paper`)** is the default canvas, reversed text, image controls, and dialog surface. **White (`white`)** supplies hero text and selected hover responses.
- **Muted moss (`muted`)** supports descriptions, metadata, and labels on ivory. **Light rule (`line`)** and **dark rule (`dark-line`)** separate content on their respective surfaces.

The functional `error` red is reserved for field errors and invalid borders. It is not an additional brand accent. Hover and pale utility-surface colors remain local component values.

**The Signal Rule.** Use signal yellow to identify direction or state; preserve graphite text when yellow becomes a surface.

## Typography

**Display Font:** Manrope, with sans-serif fallback.
**Body Font:** Manrope, with sans-serif fallback.

The variable font is self-hosted from `public/fonts/manrope-latin.woff2`, loaded with `display: swap` and a declared weight range of 400–700. There is no separate serif or monospace family. Headings use medium weight, close tracking, balanced wrapping, and deliberate line breaks; supporting copy is quieter and comfortably spaced.

### Hierarchy

- **Display:** the home hero uses the `display` role; small-phone CSS resolves it to 56px with a 1.06 line height.
- **Page title / Headline:** the corresponding frontmatter roles are the shared bases. Major introduction and case-story headings use contextual fluid sizes, reaching 68px and 62px respectively.
- **Title:** project names use the `title` role; compact cards resolve to 23px at the shared tablet breakpoint.
- **Body:** standard prose uses the `body` role. Leads range from 17–23px; long case prose is capped at 70ch, and role requirements at 65ch.
- **Label / Control:** the frontmatter roles cover metadata and buttons. Desktop navigation uses 13px text; inquiry inputs use 15px, increasing to 16px on narrow screens. Uppercase tracking is limited to identity and small editorial labels.

**The Single-Family Rule.** Keep hierarchy in scale, weight, tracking, and whitespace within Manrope.

## Layout

The centered wrapper subtracts two responsive gutters and caps content at 1600px. The gutter is fluid on desktop, 25px at 800px and below, and 22px at 520px and below. The sticky header is 88px tall, reducing to 76px at 800px. Anchor scrolling reserves 110px above the destination.

Editorial sections use uneven grids: the selected-project pair is 1.55:1 with the second card offset down 135px; case facts and story use 1:2. Explorer cards use two equal columns with 65px row and 32px column gaps. Repeated content gaps are approximately 22–40px; generous desktop sections use roughly 70–120px vertical padding. These are observed contextual values, not a new spacing scale.

Image containers control composition with `object-fit: cover`: default cards are 1.42:1, explorer cards 1.5:1, case heroes 2.15:1, and the dedicated gallery frame 1.9:1. At 580px, explorer cards become 1.35:1, case heroes 1.14:1, and gallery frames 1.15:1. The gallery frame clips detail crops; its image scales to 1.65 around 50%/65%, reducing to 1.45 on narrow screens. Keep captions outside the clipped frame.

Responsive changes are contextual rather than a single framework scale:

- **1180px and below:** compact desktop navigation; hide its contact CTA; reduce dense grids and gaps.
- **850px and below:** stack the atlas map above its detail area, expand search across both filter columns, and stack the contact layout.
- **800px and below:** switch the header to native-dialog navigation; simplify shared editorial layouts.
- **580px and below:** use one-column project and form layouts; hide the geographic map and retain the two-column project selector and selected detail; stack case and expertise sections.
- **520px and below:** remove the home-card stagger, stack the selected pair, and apply the smallest shared gutter.
- **1700px and above:** set the home hero's content top padding to 140px.

Print rules target case and inquiry summaries: white paper, 18mm page margins, 11pt base type, 30/20/14pt headings, and a 180pt case hero. Navigation, footer, contact bands, interactive controls, related projects, diagrams, and galleries are omitted. Inquiry detail groups avoid page breaks internally.

## Elevation & Depth

Cards and sections are flat. Photography, contrast between ivory and graphite, fine borders, and restrained hero shading create depth. Confirmation and career dialogs use a dark translucent backdrop; the mobile menu is opaque graphite. No blur or glass layer is applied. The transient notification is the only shared shadowed surface (`0 6px 28px #0003`).

**The Flat Surface Rule.** Separate content with space, imagery, tone, and rules; reserve the shared shadow for notifications.

## Shapes

Buttons, fields, chips, image frames, and dialogs have square corners. Thin borders structure lists, controls, and dividers. The limited circular exceptions are map dots and the contact band's arrow link: that link is 85px on desktop, 65px at the shared tablet breakpoint, and 48px on small phones. Numbered process steps stay square. Directional icons are simple inline SVG strokes, normally 1.5px.

## Components

### Buttons

Direct and compact. Standard buttons use the frontmatter variants, a 52px minimum height, and an 18px icon gap. Outline controls retain a light border. Text links have an underlining rule, a 44px minimum height, and a diagonal arrow that moves 2px on hover. Save, menu, close, and map buttons use 44px square targets; the compact view-switch buttons and active-filter chips currently use 36px and 40px minimum heights respectively.

The shared focus treatment is a 3px solid olive outline (`#648609`) with a 5px offset. Disabled buttons use half opacity and a not-allowed cursor. Background/color transitions take 0.2s; the text-link arrow takes 0.25s with the shared easing curve.

### Chips

Active filters are pale square removable buttons with a small close SVG, a 15px internal gap, and the label role. Selection in the separate Grid/Atlas switch uses graphite with ivory text and `aria-pressed`.

### Cards / Containers

Project cards place an unframed image above separate expertise/country metadata and a large linked title. The save button sits 16px from the top/right edge. Hover enlarges the photograph to 1.025 over 0.8s; a lower-right arrow becomes visible on hover or keyboard focus within the card. Saving fills the bookmark and switches its surface to signal yellow.

### Inputs / Fields

Inquiry and career fields are native labeled inputs, selects, and textareas with a translucent white surface, a muted border (`#c3cabd`), a 50px minimum height, and a 10px label gap. Textareas resize vertically. Inquiry validation pairs red borders with associated error text, an alert summary, and focus on the first invalid field. The three-step inquiry uses square numbered markers; review leads to saving an editable browser record with download and print actions.

### Navigation

The graphite header stays visible above photography. Desktop links use a fine yellow underline for hover and the current page. At the mobile breakpoint, a named native `<dialog>` opens through `showModal()`, fills the viewport, and presents large ruled links plus an explicit close button. Opening opportunities uses the same native pattern in a right-aligned panel capped at 760px; data reset uses a centered confirmation dialog capped at 560px. Preserve native modal behavior and clear dialog names.

### Project Atlas

The dark atlas couples coordinate-derived buttons, a selected image/story panel, and a complete project-button list. Both selectors drive the same selection and expose `aria-pressed`; the detail region announces changes politely. Small white dots become larger yellow outlined dots when selected, with country tooltips on selection, hover, and keyboard focus.

Preserve 44px hitboxes without changing geographical dots. The Atlas Freight Corridor button is shifted down 18px with its dot shifted back up; Westhaven is shifted up 18px with its dot shifted back down. The list supplies the same choices when the map is hidden on phones.

### Motion and Feedback

The shared easing is `cubic-bezier(.2,.75,.25,1)`. Bridge stages change linework opacity over 0.45s. With reduced motion, smooth scrolling becomes automatic, animations and transitions are disabled, and project-card hover scaling is removed.

Save notifications use a polite status region and an explicit dismiss control. Ordinary persistence notices expire after four seconds; a storage-unavailable notice remains until dismissed. Saves, drafts, inquiries, and career profiles deliberately live in versioned browser storage (`northforge:v1:`), with memory fallback. Reset removes only that namespace. Labels must continue to describe the action actually performed.

## Do's and Don'ts

### Do:

- **Do** preserve source image crops and captions, including the clipped gallery frame for detail crops.
- **Do** keep map buttons and the project list synchronized and usable by keyboard.
- **Do** preserve visible focus, native labels, associated errors, reduced motion, and printable summaries.
- **Do** describe browser records as saved, editable, printable, or downloadable.

### Don't:

- **Don't** add rounded card shells or card shadows to the unframed editorial system.
- **Don't** use signal-yellow body text on ivory or introduce a second display font.
- **Don't** replace native dialogs and selects, or map/list equivalence, with visual-only controls.
- **Don't** imply that saving an inquiry transmits it, or add public mock, demo, or view-only labels.
