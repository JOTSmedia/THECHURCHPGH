# The Church Recording Studio

A complete static website for the Pittsburgh studio, with converted-church architectural imagery and uppercase presentation: real studio photography, cinematic typography and entrances, Studio A/B/mastering room selector, a skippable typographic opening, an interactive API 2448 console, official live performance, searchable equipment inventory, accessible photo viewer and an honest email inquiry builder.

## Publish to GitHub Pages

1. Create a GitHub repository. Upload **the contents of this folder**, including `.github/` and `.nojekyll`, to its root. The homepage `index.html` must be at the root, not inside another folder.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Push to the `main` branch (or run **Actions → Deploy to GitHub Pages → Run workflow**). The included workflow validates, configures public SEO URLs, builds and deploys the site.

No dependencies, API keys, external build service or contact backend is required. Public repositories can use GitHub Pages on GitHub Free. The workflow uses Node 22. Site assets are all local; the YouTube player loads only after a visitor asks for it. The official Instagram profile widget loads lazily near its section.

For a simple branch deployment instead, select `main` and `/ (root)` in Pages. First run `npm run configure -- https://OWNER.github.io/REPOSITORY/` and commit the resulting HTML, robots and sitemap changes. With a custom domain, configure its full URL instead.

## Preview locally

Install Node.js 22 or later, open a terminal in this folder, and run:

```sh
npm run dev
```

Open the address printed by the server (normally `http://127.0.0.1:4173`). Use `PORT=4174 npm run dev` if that port is busy.

You can double-click `index.html` for a basic offline preview. Browsers restrict local JavaScript modules, so the interactive console requires HTTP (the local preview above or GitHub Pages). The site gives a photo and explanatory fallback when 3D is unavailable.

## Check and build

```sh
npm run check
npm run build
```

`_site/` is the publication directory. Root source files also work directly with GitHub Pages. All internal CSS, JavaScript, images, fonts and navigation use relative paths, including on a repository subpath. The legacy site routes redirect to their new locations. The 404 page uses the configured public URL to return home even from deeply nested missing paths.

## Contact interaction

The form validates required information, prepares a preview, and offers **Open email app**, **Copy message**, and **Download message**. It does **not** submit to a server or claim a message has been sent. A visitor must send the email from their own email app. Direct phone, email and map links also work.

## Editing content

- Main page: `index.html`
- Equipment: `gear.html` (174 entries: the current API 2448 plus the published gear inventory, with the departed Neve removed)
- Shared layout: `assets/style.css`; immersive homepage: `assets/experience.css`
- Room descriptions, inquiry builder and interactions: `assets/app.js`
- Opening, architecture scroll motion and console controls: `assets/experience.js`
- 3D console: `assets/console-3d.js`
- Studio photography and optimized variants: `assets/images/`
- Public URL and sitemap: `npm run configure -- https://your-final-url/`

To add more studio-owned social profiles, verify them first, then edit the social/footer links and the JSON-LD `sameAs` list in `index.html`. Instagram was verified through Visit Pittsburgh. Other owned profiles were not established during the audit; no guessed accounts are shipped.

## Accessibility and performance

Semantic landmarks, a skip link, visible keyboard focus, native labels/validation, keyboard room switching, native dialog focus containment, reduced-motion support, a persistent motion toggle, no-script content, no-WebGL fallback, responsive image variants and lazy loading. 3D is dynamically imported on request; it renders on interaction and resizing instead of running an idle animation loop. Device pixel ratio is capped. Fonts and the Three.js library are bundled locally. No autoplay audio or captured scrolling. The user-requested idle reading motion yields immediately to interaction.

## Source and launch notes

See `docs/CONTENT-AUDIT.md`, `docs/ASSET-SOURCES.json`, `docs/QA-REPORT.md` and `docs/DESIGN.md`.

This is a new implementation built from the audited public site. The referenced V2 archive at `/mnt/data/church-recording-studio-github.zip` was not available to this desktop chat. Its source could not be inspected or merged. The original public site remains unchanged.

Studio and video photographs are existing copyrighted assets, not claimed as open-license media. Photographer attribution was not supplied for the studio gallery. Preserve the credits and the owner’s rights. Chivo, Libre Caslon Display and Three.js licenses are included alongside those assets.

## Opening and console

The image-free opening uses the studio name, a horizontal readiness bar and a percentage. It tracks preparation of the hero image and three local fonts, including settled fallback outcomes. It normally exits after about two seconds and always begins its exit by 3.2 seconds. Enter Site and Escape skip it. Every homepage refresh replays it and returns to the hero; initial deep links remain usable. Footer Replay Opening returns to the hero as well. Reduced motion removes the minimum and travel. `?opening=play` forces it; `?opening=skip` bypasses it on a fresh navigation, while a refresh still honors the requested replay behavior.

After 12 seconds without input, ambient reading motion starts automatically. Pointer, wheel, touch, keyboard, focus, selection and visitor scrolling stop it and restart the idle wait. It yields to forms, media, 3D interaction, dialogs, menus, hidden pages, reduced-motion preference and the global motion setting. There are no dedicated auto-scroll controls or displayed speed.

The official Instagram profile iframe shows the studio account and recent public posts. It does not need an API key or a paid feed provider. Instagram controls its content and may require sign-in; Reload Instagram and Open Profile provide recovery. Native Instagram interface typography remains platform-owned.

The 1200 × 630 social-preview image is a render of the actual hero. Open Graph and Twitter tags on the homepage and utility pages point to that image. The Pages workflow rewrites these absolute URLs for repository paths or a custom domain.

The console opens on request, preserving the actual installation photograph until WebGL renders. Rotate with the arrow controls, a mouse drag or the keyboard. Choose Channels, Equalizers or Bus & Routing for close views. Click a channel and move the external fader. This is an interactive visual study, with no audio engine or claim of precise physical dimensions. The model uses shared/instanced geometry and renders only for interaction or resizing.
