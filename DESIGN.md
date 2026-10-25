---
name: The Church Recording Studio
description: A converted church expressed through cathedral photography, classical display type, and uppercase text.
colors:
  bg: "#171310"
  surface: "#2a221c"
  ink: "#f2eee5"
  muted: "#c9bfb2"
  accent: "#bea083"
  light: "#e1dfd9"
  dark-ink: "#29201a"
  field: "#d8d3ca"
  field-border: "#958a7d"
  placeholder: "#5e554c"
  dark-hover: "#514235"
  light-link-hover: "#64503f"
typography:
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "15.6vw"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(36px, 4.7vw, 70px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(27px, 3vw, 42px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(16px, 1.2vw, 18px)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.015em"
  lead:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(21px, 2vw, 28px)"
    fontWeight: 400
  label:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  square: "0"
spacing:
  gutter: "clamp(20px, 3.2vw, 64px)"
  section: "130px"
  paragraph: "24px"
  form-column: "20px"
  control-gap: "8px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: "{rounded.square}"
    padding: "16px 25px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  button-dark:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "16px 25px"
  button-dark-hover:
    backgroundColor: "{colors.dark-hover}"
    textColor: "white"
  button-equipment:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.square}"
    padding: "16px 25px"
  button-equipment-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.square}"
    padding: "12px 14px"
  room-option:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "16px 22px"
  room-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  room-option-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
---

# Design System: The Church Recording Studio

## Overview

**Creative North Star: "The name as a monument"**

The converted church is the visual identity: the cathedral ceiling, timber trusses, and former altar establish place. Regular Libre Caslon Display gives the name and chapter headings a classical architectural character; uppercase Chivo provides the working voice for body copy and controls. Dark timber, warm paper, stone, and restrained brass carry the building's materials into the interface.

This records the current code-first implementation after the user's explicit church-forward and uppercase refinement. The earlier direction and seed references remain historical provenance in `docs/DESIGN.md` (taste seed 1026571597; workflow reference seed e15d7a746b8f6d92); current source takes precedence. No approved image composition exists. The actual cathedral photograph occupies the right 62% of the desktop hero and becomes full-width on phones. The desktop name stays one line; the normal portrait-phone title stacks into two lines.

**Key Characteristics:**
- Regular classical display serif paired with uppercase Chivo interface text.
- Actual cathedral photography, warm materials, and an illustrative room cutaway.
- Dark timber ground with light stone chapters and restrained brass actions.
- Once-only entrance motion with visible content and complete motion controls.

## Colors

Brass supplies the warm action color; dark timber and light stone grounds echo the converted church. The frontmatter records the final override values rather than the earlier palette still present at the start of the stylesheet.

### Primary
- **Brass** (`accent`): primary buttons, hover feedback, selection, and focus outlines on dark chapters.

### Neutral
- **Dark timber** (`bg`): page ground, dark buttons, menu, and photo dialog.
- **Timber surface** (`surface`): integrated room stage, equipment groups, and media placeholder.
- **Warm paper** (`ink`): main text, selected room options, and button hover.
- **Muted stone** (`muted`): supporting labels, dimensions, and small contextual text.
- **Light stone** (`light`): introduction, people, and inquiry chapters.
- **Dark timber ink** (`dark-ink`): light chapter text and its focus ring.
- **Field stone**, **field border**, and **placeholder**: filled, stroked form controls and their hints.
- **Dark hover** and **light link hover**: local feedback in their corresponding chapter themes.

**The Room as Evidence Rule.** Use the actual studio photographs for place and character; the 3D cutaway explains volume and remains explicitly illustrative.

## Typography

Libre Caslon Display is self-hosted at regular weight for the hero, chapter headings, instrument feature title, and footer name, with Georgia and serif fallbacks. Chivo remains self-hosted at regular, bold, and black weights for body copy, interface text, wordmark, and the other subheadings, with Arial and sans-serif fallbacks. Body tracking is slightly open. Paragraphs generally stop at 65ch; selected supporting descriptions use a 1.65 line height.

**The Uppercase Presentation Rule.** Present all site text in uppercase through CSS, including controls and placeholders; preserve original typed values and underlying text when preparing email, copying, and downloading.

The frontmatter display token describes the final desktop hero and footer. At phone widths (600px and below), the hero uses 22.9vw with a 0.9 line height and a two-line span limited to 7ch; the footer uses 14.8vw and a 0.95 line height. At 360px and below the hero is 21.8vw. Short viewport height overrides this: at 600px high and below the hero is 14.5vw, line height 1, single line. The 350px-height rule retains that final size but changes placement.

The general headline token is the fluid Caslon chapter heading. At phone widths introduction, chapter, contact, and instrument headings are 41px; at 360px and below they become 35px. Other subheadings remain bold Chivo: the room title is fluid 26–36px on desktop, 32px at tablet width, and 30px on phones. Ordinary h3 uses the frontmatter title role. The document title remains 52px on phones. Body text stays regular. Labels, captions, and small controls generally use 13–14px; phone room options are 13px. Desktop navigation is 14px, becomes 13px at 1100px, and 20px in the phone menu. The wordmark descriptor stays 13px after the final override. Buttons generally use bold 16px text; hero actions use 14px below 1100px and ordinary text links use regular 16px.

## Layout

A shared fluid outer gutter frames the whole site rather than a centered narrow container. The gutter becomes 24px at 800px and 20px at 600px. Section spacing is 130px, increases to 160px at 1700px, reduces to 90px at 800px and 76px at 600px. Sound and performance continue the prior chapter without a duplicated top gap.

Desktop compositions alternate paired text columns, staggered photographs, a 64/36 room stage, editorial service rows (24/46/26 with 2% gaps), and an asymmetrical gallery (43/48). At 1100px the room stage becomes 58/42, personnel portraits move above their text, and form fields stack. At 800px the room stage stacks, services become two-column rows, introduction text and section headers stack, and contact becomes one column; form fields temporarily regain paired columns. At 600px text groups, services, forms, and personnel stack. The gallery keeps varied widths (77% portrait, 90% landscape) rather than identical tiles. Phone personnel portraits remain 65% wide and above the text. Between 601px and 740px, the instrument feature becomes a single-column grid with a 34px gap. The later tablet override makes the contact introduction a block, with the address below; its email is 14px. At 360px and below, introduction, chapter, contact, and instrument headings reduce to 35px.

The desktop hero photo begins at 38% from the left and occupies the right 62%; the copy occupies at most 32% at 23% from the top. At 800px the copy widens to 36% and moves to 24%. Phones expand the cathedral photograph to the full width and place copy at 22%, while the name closes the frame. The introduction's first image uses a tall 2/3 crop that shows the cathedral structure.

Short viewports have a separate height response. At 600px high and below the hero uses 100svh, its copy sits at 108px, the supporting sentence uses 17px, and the action reduces to 44px minimum height with 10px 16px padding. The title uses 14.5vw in a single line, with line height 1. Section spacing reduces to 64px and the performance chapter retains 24px top padding. At 350px high and below the hero instead becomes 560px tall, the title is positioned at 110px, the copy moves to 210px, and section spacing becomes 36px; performance retains its 24px top padding from the later performance-specific rule. Height rules take precedence over the usual portrait-phone title and spacing choices.

The room media is 480px tall at tablet widths, 330px on phones; the phone spatial view is 400px tall. Its controls stay outside the canvas. The header is positioned over the hero, not sticky; utility pages use a normal flow header. With JavaScript disabled, phone navigation stays visible and the hero adjusts to it. Print strips navigation and interaction controls and returns to dark ink on white.

## Elevation & Depth

**The Flat Material Rule.** Use tonal chapters, photographic overlap, and spacing for depth; the shipped interface has no box-shadow vocabulary.

The hero combines a darkened cathedral photograph with horizontal and vertical shade gradients on desktop. On phones a vertical gradient and darker photograph preserve legibility across the full width. The photo dialog uses an opaque dark surface and a near-black backdrop (`rgba(0,0,0,.9)`). These are functional image treatments, not a general gradient or floating-card style.

## Shapes

Buttons, fields, photos, panels, and dialog have square corners. Fields use a thin stroke; large content chapters depend on their tonal ground rather than border outlines. Inline arrows and control icons are real stroked SVG, normally 24px with a 1.5px stroke and round caps and joins. Preserve portrait and landscape crops as distinct architectural shapes.

## Components

### Buttons and text links

Primary buttons are brass with dark type, a minimum height of 56px, a 32px icon gap, and frontmatter padding. Hover reverses to warm paper with dark type. Dark buttons invert this for light chapters and turn timber-brown on hover with white text. The equipment-list action is a filled square button using warm paper over the dark ground, with a 28px top margin; it changes to brass on hover. The hero action has its own padding (16px 22px desktop, 15px 18px on phones) and reduced-width/height adaptations described above. Press moves buttons down 2px. Text links remain underlined, use a 20px gap and a minimum height of 44px. General links and buttons transition color and background over 0.25s; transform uses 0.35s and the project easing. Focus is a 3px outline offset by 6px, brass on dark and dark ink on light. Disabled controls reduce opacity to 0.6 and use a waiting cursor.

### Inputs and inquiry result

Fields and placeholders follow the uppercase presentation rule without rewriting their underlying values. Fields are square, filled stone with a 1px border, minimum height 52px, and explicit visible labels above. Textareas have a 150px minimum and 600px maximum height and resize vertically. Native validation is retained. The inquiry result is a filled stone container with a scrollable, wrapping text preview and email, copy, and download actions; it never presents a simulated send success.

### Navigation

The wordmark uses black-weight Chivo at 20px, with a regular 13px descriptor; the compact desktop wordmark is 18px. Desktop links are plain with 0.03em tracking and a fluid 24–46px gap (22px at 1100px, 18px at 800px), with an underlined hover on ordinary destinations. The phone menu is a disclosed dark panel below the header at 600px and below. Opening is driven by a real button; Escape, outside click, selection, and returning to desktop close it. The no-script layout shows the destinations directly.

### Room selector and stage

Room options are square toggle buttons with a surface ground, 15px type, 0.02em tracking, and frontmatter padding; phone options use 13px type, 14px 9px padding, and a 10px gap. Selection uses ink over dark; hover uses brass over dark. Desktop options wrap; phone options form a two-column grid with a 52px minimum height. Pressed state is expressed with `aria-pressed`; arrows, Home, and End move through options. The image and details form one integrated tonal stage. The 3D cutaway loads only after selection, uses input-driven rendering with no idle orbit, and retains a photo and dimensions if unavailable.

### Service rows and equipment groups

Services are open editorial rows with aligned headings, descriptions, and links, and no floating panels. Equipment groups use the surface ground, square corners, and a native disclosure summary; searchable equipment columns reduce from three to two at 1100px and one at 600px. Search reports counts and a no-results state.

### Photography and playback

Real studio photographs use square edges, explicit crops, and descriptive captions. Portraits are grayscale. Gallery hover scales an image to 1.025 over 0.9s, and opening a photograph uses a native dialog with previous/next controls and returned focus. Official performance video starts as a 16:9 photograph with a visible button; the external player loads only after that action.

### Motion and access

The shared easing is `cubic-bezier(.16,1,.3,1)`. The title enters from 38% below over 1.25s; the hero image settles from scale 1.045 over 1.8s. Supporting reveals translate 28px over 0.9s and run once after intersection; room detail changes translate 12px over 0.6s. The hero copy uses 1.2s with a 0.15s delay and the hero foot uses 1.1s with a 0.3s delay. Content is visible by default. System reduced-motion preference removes animation, transitions, and smooth scroll; a persisted footer pause control provides the same option manually. The system preference takes priority and disables that toggle. User-driven 3D rotation remains direct manipulation without animated interpolation.

## Do's and Don'ts

### Do:
- **Do** use the real building and studio materials to establish identity.
- **Do** preserve the shared outer gutter and open editorial rows.
- **Do** keep primary controls square, visibly focused, and readable in both chapter themes.
- **Do** pair regular Libre Caslon Display with Chivo and preserve uppercase presentation without changing typed values.
- **Do** preserve the phone title restack and asymmetrical image rhythm.
- **Do** keep every essential destination available without animation or WebGL.

### Don't:
- **Don't** introduce stock studio imagery or fabricate studio evidence.
- **Don't** add scroll hijacking, a custom cursor, autoplay sound, a required intro, or a blocking preloader.
- **Don't** turn the plain service rows into floating cards with decorative shadows.
- **Don't** hide content until an entrance animation completes.

Utility-page titles use clamp(42px,8vw,115px) to keep uppercase equipment/privacy headings within narrow screens.
