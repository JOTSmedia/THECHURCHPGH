# Verification report — October 25, 2026

## Implementation verification

- Static reference checker: 115 relative file/fragment/metadata checks across 13 HTML pages; passed. The checker also requires licenses, social image, language, one H1, intrinsic image dimensions and protected new-tab links.
- `npm run build`: passed; static output generated without dependency installation.
- JavaScript syntax checks: main enhancement script and 3D module passed.
- GitHub Pages subpath simulation: copied site to `/church/`, configured an example repository URL, ran validation/build successfully, and opened the nested URL in the app browser. The 3D module loaded with its local dependencies under that subfolder.
- Deployment URL helper: rewrites canonical, Open Graph, JSON-LD, robots, sitemap and 404 return target. The Actions workflow takes the actual base URL from GitHub’s configure-pages output, supporting project sites, account sites and custom domains.
- Old route redirects generated for `/home`, `/story`, `/gear`, `/staff`, `/gallery`, `/contact`, `/sample`, `/mixing` and `/mastering`.

## Browser review

The design inspector ran in Chrome at **1440 × 900**, **768 × 1024** and **390 × 844**. Final run: **0 FAIL, 2 WARN**, with no captured console errors. All ten final fold/page images were opened and visually reviewed. Additional on-demand 3D captures at 320 × 568 and 640 × 800 passed with zero FAILs after the narrow layout fixes. Their inspector copy changes only the viewport-height table, not the test rules. The 320 contact sheets reach only through the staff area because the inspector limits contact sheets to 12 screens; the required 390px captures cover the whole page. The 320px introduction remains a readable five-line statement, recorded as a warning.

Warnings retained with reasons:

1. Size count: display, section and utility sizes vary across page hierarchy. The screenshots show a consistent type system; body remains at least 16px.
2. No video element detected: the official performance uses an iframe, loaded only by user action, rather than an autoplay video tag. The hero photograph has its own cinematic arrival. Third-party playback is optional.

An independent finish reviewer opened the ten captures and reviewed the final HTML, CSS, enhancement script and 3D source. Disposition: **ship**, with no material fixes outstanding in that scope. Its full report is included as `FINISH-REVIEW.md`. It did not independently repeat browser interactions or certify every possible browser/device.

## Interactions exercised in the app browser

- Studio A, Studio B and mastering switch the image, description, specs, selected state and inquiry link.
- 3D module loads, produces the cutaway room, and responds to rotation controls. It also loaded successfully from a repository subfolder URL.
- Project form accepts test data and creates an accurate message preview and percent-encoded mailto URL. The UI explicitly states that the message has not been sent. No test inquiry was sent.
- Photo dialog opens, advances to another photo and closes with Escape.
- Equipment search finds the Rhodes, reports one result, and provides a useful zero-results state for an unmatched search.
- Click-to-load video replaces the poster with a privacy-enhanced player. The official YouTube oEmbed endpoint returned HTTP 200 and correct title/channel metadata. The embedded browser displayed video unavailable; the direct official YouTube link remains visible as the recovery path. Successful video playback is not claimed.

## Accessibility and fallback scope

Semantic landmarks, visible focus, field labels, native validation, native dialog, keyboard rotation and room switching, high-contrast tokens, minimum 44px primary controls, no-script room/contact content, and reduced-motion CSS are present. Reduced motion also disables scripted entrance effects; pause preference is stored locally. The 3D view never has an idle render loop.

A temporary script-free copy was inspected to review progressive content; the no-script blocks were expanded in that copy to model no-JavaScript parsing. This was a fallback simulation, not a separate browser engine with JavaScript disabled. The production source also catches module/WebGL initialization errors and retains the real room photograph.

No WCAG certification, Lighthouse score, physical touch-device test, cross-browser Safari/Firefox test or live GitHub deployment is claimed. No email sending or external booking was performed.

## Content and provenance limits

The unavailable V2 ZIP could not be inspected or merged. The delivered source is an independent implementation based on the audited public site. The source audit identifies every page reviewed, unresolved source inconsistencies, social verification and rights provenance. Instagram was corroborated; no other studio-owned social handle was established. Rates, availability, testimonials and additional clients are not fabricated.

The 3D scene preserves published main dimensions, not measured window/truss placement. The studio should confirm that published equipment and staff facts are current as part of normal owner review.

## User-directed converted-church and uppercase revision
The user confirmed the artist/producer and direct-inquiry focus, explicitly requested a stronger converted-church identity and uppercase text throughout, and renamed the Desktop destination to THECHURCHPGH. The hero now shows the actual cathedral ceiling, Libre Caslon Display provides the regular serif display face, and timber/stone/brass colors replace the prior olive palette. All authored website text and form option labels display uppercase. Original typed names/email values are preserved; this was verified again with a mixed-case test inquiry and its encoded email link. No message was sent.

Latest static check: 116 local-reference/metadata checks across 13 pages passed. Latest main-page inspector: zero FAIL at 1440×900, 768×1024, 390×844 and at the extended 320×568 and 640×800 sizes. No font below 13px in the tested main-page states. Warm-paper color, type size variety, the click-to-load video and the name-title detector remain recorded warnings; the first screen visibly identifies a converted church and Pittsburgh recording studio. The independent reviewer re-opened the ten required final JPGs and found no material defect in this scoped refinement. The earlier screenshot coverage limits still apply to the extra 320px contact sheets.

Uppercase utility-page review also prompted shorter equipment inquiry copy and semantic breadcrumb navigation. Utility titles use a 42px phone minimum, and utility lead copy 18px for readability. These are source/utility refinements beyond the independent main-page screenshot review.
