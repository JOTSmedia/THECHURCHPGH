---
name: The Church Recording Studio
description: Established studio, real church architecture, and an interactive analog console.
colors:
  bg: "#171310"
  surface: "#28211c"
  ink: "#f2eee5"
  muted: "#c9bfb2"
  accent: "#bea083"
  light: "#e1dfd9"
  dark-ink: "#29201a"
  console-ground: "#10100f"
  console-stage: "#191918"
  people-stone: "#d1cec6"
  field-rule: "#7b746b"
  placeholder: "#5e554c"
  action-hover: "#755a40"
  playback-hover: "#574638"
typography:
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(100px, 13.2vw, 225px)"
    fontWeight: 400
    lineHeight: 0.78
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(48px, 6.8vw, 104px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(30px, 3vw, 46px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.015em"
  label:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
rounded:
  square: "0"
spacing:
  gutter: "clamp(20px, 3.4vw, 64px)"
  section: "120px"
  chapter-gap: "50px"
  form-column: "26px"
components:
  action-link:
    backgroundColor: "transparent"
    rounded: "{rounded.square}"
    padding: "14px 0"
  action-link-hover:
    textColor: "{colors.action-hover}"
  console-load:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.square}"
    padding: "18px 22px"
  console-load-hover:
    backgroundColor: "{colors.accent}"
  room-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 0 12px 26px"
  room-option-hover:
    textColor: "{colors.accent}"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.square}"
    padding: "10px 0"
  console-section:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "9px 0"
  console-section-selected:
    textColor: "{colors.ink}"
  playback:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    size: "132px"
  playback-hover:
    backgroundColor: "{colors.playback-hover}"
---

# Design System: The Church Recording Studio

## Overview

**Creative North Star: "The name as a monument"**

The full actual cathedral photograph supplies the homepage hero; a two-line Caslon name sits at the shared left gutter. The opening is entirely typographic on a flat dark-timber ground: a monumental Caslon wordmark, small studio/location line, horizontal readiness rail, percentage, and skip action. It has no photography, stained glass, architecture image, or glass motif. Dark timber, pale stone, and restrained brass support concise, established-studio copy: rooms, equipment, sessions, people, and contact.

Revision 3.3 preserves **The name as a monument** and seed history while superseding prior composition and opening rules. Each homepage refresh returns to the hero and plays the bounded, skippable opening; initial deep links remain useful. The code-first authority is `index.html`, `assets/style.css`, `assets/experience.css`, `assets/app.js`, `assets/experience.js`, and `assets/console-3d.js`. No approved image comp exists. Taste seed 1026571597 and workflow reference seed e15d7a746b8f6d92 remain in `docs/DESIGN.md`.

**Key Characteristics:**
- Full cathedral hero and a flat, entirely typographic opening.
- Regular Caslon display and headings; uppercase Chivo body and controls.
- Editorial room index and an optional 40-channel API 2448 study as the sole 3D experience.
- Asset-aware opening, input-sensitive ambient reading motion, live Instagram, and practical email handoff.

## Colors

Brass is local feedback and selected-control warmth; real photography supplies the richer glass, timber, and metal colors.

### Primary
- **Aged brass** (`accent`): hover, focus, and range input accent.

### Neutral
- **Dark timber** (`bg`), **timber surface** (`surface`): global ground and supporting surfaces.
- **Warm paper** (`ink`), **muted stone** (`muted`): primary and supporting dark-chapter text.
- **Light stone** (`light`), **dark timber ink** (`dark-ink`): session and contact chapters; dark ink also makes small session credits legible.
- **Console black** (`console-ground`) and **console stage**: the optional console chapter and its photograph/model ground.
- **People stone**: the separate portrait chapter ground.
- **Field rule**, **placeholder**, **action hover**, and **playback hover**: restrained interface states.

**The Building as Evidence Rule.** Use actual studio photography for place; label console geometry as an illustrative visual study rather than a measured reconstruction.

The shared foundation now serves homepage and utility pages consistently: matching headers, footers, Caslon/Chivo type, materials, and transparent line fields. Privacy and error pages use light-stone content chapters. Utility search fields use the same open line language on dark ground.

## Typography

Libre Caslon Display is self-hosted at regular weight for the hero, chapter headings, subheadings, and footer name. Chivo is self-hosted at regular, bold, and black weights for body and interface text. General body is 16px with line-height 1.65; 13px is the common metadata, helper, label, and text-link step after the final readability overrides. The hero location is 18px desktop and 16px phone. Paragraphs normally remain within 65ch.

**The Uppercase Presentation Rule.** Display all site text, controls, and placeholders in uppercase through CSS; preserve underlying typed values and exported inquiry data.

The hero has two explicit lines, “The” and “Church”, with a 0.13em interline margin. It becomes 16vw at 800px and 21vw at 600px, where line-height is 0.83 and interline margin 0.18em. At heights of 600px and below, desktop title size is `clamp(70px,11vw,158px)`; phone title remains 21vw and moves to top 28%. General phone chapter headings are 54px, rooms and people 50px, contact 72px. Room detail titles move from 32px to 30px at 1100px and 26px on phones. Console details use 36px desktop and 34px phone. The footer is a smaller wordmark: `clamp(40px,5vw,76px)` with line-height 0.9 and tracking -0.04em, 50px at 800px and 44px on phones. Desktop room-index options use Caslon; at 800px and below they become Chivo 16px. Section-specific values are exceptions, not new global type scales.

## Layout

The shared fluid gutter is the frontmatter value, including phone and utility layouts. Main chapters use 120px vertical spacing, 85px at 800px, and 70px at 600px. People and contact have distinct desktop vertical padding (105px and 110px). Short viewport height has a dedicated hero response described below; obsolete fixed-gutter and earlier hero rules are no longer the shared foundation.

The actual cathedral photograph fills the entire hero at all sizes; there is no separate glass strip or glass UI motif. Desktop hero is 100svh with a 680px minimum when wider than 800px and taller than 600px, and a 1200px maximum. Tablet minimum is 760px. Title and location align to the shared gutter; desktop title top is 28%, tablet 34%. Phone hero is 95svh with a 650–950px height; title is at top 34% and location bottom 17%. Phone photograph uses object-position 50% 34% and brightness 0.67. At 600px high and below the hero uses `max(560px,100svh)` and a 560px minimum; desktop title top is 27%, phone top 28%.

The Instagram feature pairs copy with a profile widget, stacks on phones, and uses a container-responsive iframe height of `calc(225px + 66.667cqw)`. This preserves the profile/header plus recent-post area as its width changes. Privacy uses a 32% introduction column with sticky heading and a 6vw gap; at 900px it becomes normal block flow. The error page pairs light-stone text with a narrow architectural image and simplifies at phone widths.

Rooms use a vertical editorial index beside media (29% / remainder with 4vw gap; 30% at 1100px). The image has a 1.48 aspect ratio and transparent two-column information below, not a filled stage. At 800px index options wrap horizontally above the media. Phone media is 1.12; facts form a three-column row below the description. Room choices are Studio A, Studio B, and Mastering; the user removed the room-volume study.

Console uses a 69% model column and remaining details, then 64% at 1100px. Its stage height is 600px, 560px at 1100px, 500px at 800px, and 410px phone. At 800px model and details stack, with a two-column detail grid; phone details use normal block flow. Equipment highlights use a 59% image, 7vw gap, then stack on phones. People portraits are staggered, all cropped to 4/5 with no maximum height; Dana is positioned at 50% 0 and Garrett at 12% 0 to preserve faces; the gallery is a three-column portrait composition, two columns at 800px, with its first image spanning both columns at 83% width on phones. Contact remains two columns through tablet, then stacks on phones. Footer becomes a compact two-column phone grid with its name spanning the width.

## Elevation & Depth

The interface is flat, using chapter grounds, spacing, and actual photographs. The full hero photograph preserves architectural context; the opening uses only a flat timber ground and type, without image layers or decorative architectural masks. The performance trigger is a diamond. Its keyboard focus reverses to warm-paper background and dark text, removes the outline, and strengthens the SVG stroke to 3px. The playback control has no focus shadow. The console model uses a soft scene shadow and metal/wood lighting; those materials do not define UI elevation tokens.

**The Bounded Opening Rule.** Keep the user-requested opening skippable and time-bounded; it must never wait indefinitely for an image, font, or WebGL.

The opening is a native full-viewport dialog with a flat dark-timber ground and no imagery. Its Caslon wordmark uses `clamp(54px,9.3vw,150px)` and sits at top 43%, vertically centered around that position; phones use 16vw at top 42%. A small studio/location line sits below. A horizontal 5px bar and percentage report readiness of four actual critical assets: hero image decode, Caslon regular, Chivo regular, and Chivo black. Settled fallback outcomes count as prepared; this is not a claim about total download bytes. It normally remains for at least 1.35 seconds, begins exit by 3.2 seconds even if resources stall, and closes after a 0.58-second exit. Enter site and Escape skip immediately into exit. Reduced/paused motion removes the minimum and transition, with a shorter 900ms hard cap.

Every homepage refresh resets opening and hero through an early navigation guard that disables restoration, clears a stale hash on reload, and returns to top. There is no session-seen flag. Initial hash/room deep links and explicit opening skip bypass the opening unless the navigation is a refresh. Footer replay returns to the hero, opens the sequence, then focuses the hero title. No script means no opening dialog.

## Shapes

Photography, fields, panels, and buttons retain square corners. The playback device remains a clipped diamond; hero photography retains the complete rectangular frame; the opening has no image shape. Room selection has a small rotated-square marker (9px desktop, 6px compact), not a rounded chip. Directional icons are inline stroked SVG. Do not adopt arbitrary text glyphs as the icon system.

## Components

### Actions and navigation

Homepage inquiry actions are open text actions with a real SVG arrow: transparent background, 15px regular text, minimum height 54px, 35px gap and frontmatter padding. Hover shifts right 5px and changes color. General text links are underlined, 13px, minimum height 44px. Header uses Chivo wordmark, transparent ground, 42px link gaps desktop, 23px at tablet; phone navigation is a disclosed dark panel with 52px links. Opening replay and the global motion pause remain plain footer controls. There is no separate auto-scroll pause/resume UI. Link and button text, descendants, and disclosure summaries are nonselectable; inputs, textareas, and prepared inquiry text remain selectable. Keyboard focus is normally a 3px brass outline offset 5px on dark chapters, dark ink on light.

### Room index

Unfilled Caslon options are ink-colored after the final override. Selection reveals the small diamond marker; hover turns brass and shifts 5px right. Native pressed buttons retain arrow/Home/End keyboard traversal. Compact options use Chivo 16px with padding 10px 0 10px 16px and minimum height 44px. Room details, photographs, and dimensions stay visible. These three room choices do not load a 3D study.

### Console study

The installation photograph is the default. A light filled load action opens an illustrative custom 40-channel API 2448 split-frame model, with two 20-channel banks and a central workstation. Section controls cover overview, channels, equalizers, and bus/routing; selected section is underlined. Rotation buttons, mouse orbit, arrow keys, and Home are supported. Touch preserves page scroll and allows channel picking. A native selector exposes channels 1–40 and a labeled native 0–100 range moves the selected channel's fader. These controls are visual study controls, with no audio playback. The photograph and descriptive text survive load failure or WebGL loss.

Model work occurs in response to input, resize, visibility, and brief camera transitions; there is no idle render loop. Camera section moves use a 440ms cubic-out tween and snap under reduced/paused motion. Rendering caps device pixel ratio at 1.5 and pauses when hidden/offscreen. The API console is the sole 3D experience. The former room-volume study and its fourth selector option were removed at the user’s request; published room dimensions remain plain information.

### Inquiry fields and result

Homepage fields have transparent grounds, square corners, a single bottom rule, and padding 10px 0. Labels, placeholders, and notes use 13px. Textarea minimum height is 120px. The console channel select uses the same line language in ink on dark, with a minimum 44px height. Native validation remains. Inquiry prepares reviewable text plus email-app/copy/download actions, without claiming server delivery. No-script users retain direct phone and email links.

### Photography, playback, and disclosures

Actual stained glass, room views, portraits, instruments, and API installation imagery carry the story. Gallery opens a native photo dialog with returned focus and previous/next controls. Portraits are grayscale with consistent 4/5 crops and the face-preserving positions described in Layout. Social previews must use an actual hero screenshot at 1200 × 630, rather than a separate invented composition. The official performance loads externally only on request; diamond trigger is 132px desktop and 110px phone with 13px label. Equipment utility groups retain native disclosure, search count, and no-results recovery. The Instagram chapter uses the real profile/recent-post iframe, lazy loading, and its responsive height; third-party content may require sign-in. Reload Instagram retries the widget with status feedback and a timeout recovery; Open profile remains a direct fallback.

### Motion

Shared easing remains `cubic-bezier(.16,1,.3,1)`. Cathedral arrives from scale 1.045 over 1.8s; title enters over 1.3s after 0.15s. The typographic opening exits over 0.58s with a small upward title shift; progress follows real readiness with eased visual updates. There is no opening-image animation. Supporting reveals and room transitions retain 0.9s/28px and 0.6s/12px respectively. A small native-scroll response translates cathedral at 0.12× scroll, bounded to one viewport and only scheduled while visible. The removed glass plane has no motion role.

User-requested ambient scrolling advances at a fixed reading pace after 12 seconds without input. Pointer movement/down/up, wheel, touch, keyboard, focus, selection, or visitor scroll stops it and rearms the idle wait. It stops at the page end and yields to forms, media/iframe interaction, canvas focus, open dialogs/menu, text selection, a hidden document, keyboard-focused interactive elements, reduced-motion preference, and the global motion pause. There is no separate auto-scroll control or stored auto-scroll preference. The global motion pause remains a broader animation preference. Reduced-motion and that global pause also remove animation/transitions/smooth scroll and reset hero travel. Content remains visible without entrance completion.

## Do's and Don'ts

### Do:
- **Do** retain actual studio evidence in content photography, including the gallery’s real window photograph; keep it out of the opening and UI motifs.
- **Do** write concise established-studio copy and direct factual labels.
- **Do** keep native controls beside interactive models and preserve photographic fallbacks.
- **Do** preserve uppercase presentation without rewriting typed data.
- **Do** honor reduced motion and the persisted manual motion pause.

### Don't:
- **Don't** present illustrative 3D as a measured reconstruction or an audio engine.
- **Don't** turn the editorial room index into filled tab chips or floating cards.
- **Don't** add autoplay sound, scroll hijacking, a custom cursor, or an unbounded resource gate.
- **Don't** report a successful send from the static inquiry form.
