# The Church Recording Studio

A complete static website for the Pittsburgh studio, with converted-church architectural imagery and uppercase presentation: real studio photography, cinematic typography and entrances, Studio A/B/mastering room selector, an on-demand dimensioned 3D study, official live performance, searchable equipment inventory, accessible photo viewer and an honest email inquiry builder.

## Publish to GitHub Pages

1. Create a GitHub repository. Upload **the contents of this folder**, including `.github/` and `.nojekyll`, to its root. The homepage `index.html` must be at the root, not inside another folder.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Push to the `main` branch (or run **Actions → Deploy to GitHub Pages → Run workflow**). The included workflow validates, configures public SEO URLs, builds and deploys the site.

No dependencies, API keys, external build service or contact backend is required. Public repositories can use GitHub Pages on GitHub Free. The workflow uses Node 22. Site assets are all local; the YouTube player loads only after a visitor asks for it.

For a simple branch deployment instead, select `main` and `/ (root)` in Pages. First run `npm run configure -- https://OWNER.github.io/REPOSITORY/` and commit the resulting HTML, robots and sitemap changes. With a custom domain, configure its full URL instead.

## Preview locally

Install Node.js 22 or later, open a terminal in this folder, and run:

```sh
npm run dev
```

Open the address printed by the server (normally `http://127.0.0.1:4173`). Use `PORT=4174 npm run dev` if that port is busy.

You can double-click `index.html` for a basic offline preview. Browsers restrict local JavaScript modules, so the interactive 3D study requires HTTP (the local preview above or GitHub Pages). The site gives a photo and explanatory fallback when 3D is unavailable.

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
- Equipment: `gear.html` (174 entries preserved from the published gear list)
- Layout and device sizes: `assets/style.css`
- Room descriptions, inquiry builder and interactions: `assets/app.js`
- 3D study: `assets/room-3d.js`
- Studio photography and optimized variants: `assets/images/`
- Public URL and sitemap: `npm run configure -- https://your-final-url/`

To add more studio-owned social profiles, verify them first, then edit the social/footer links and the JSON-LD `sameAs` list in `index.html`. Instagram was verified through Visit Pittsburgh. Other owned profiles were not established during the audit; no guessed accounts are shipped.

## Accessibility and performance

Semantic landmarks, a skip link, visible keyboard focus, native labels/validation, keyboard room switching, native dialog focus containment, reduced-motion support, a persistent motion toggle, no-script content, no-WebGL fallback, responsive image variants and lazy loading. 3D is dynamically imported on request; it renders on interaction and resizing instead of running an idle animation loop. Device pixel ratio is capped. Fonts and the Three.js library are bundled locally. No autoplay audio or scroll hijacking.

## Source and launch notes

See `docs/CONTENT-AUDIT.md`, `docs/ASSET-SOURCES.json`, `docs/QA-REPORT.md` and `docs/DESIGN.md`.

This is a new implementation built from the audited public site. The referenced V2 archive at `/mnt/data/church-recording-studio-github.zip` was not available to this desktop chat. Its source could not be inspected or merged. The original public site remains unchanged.

Studio and video photographs are existing copyrighted assets, not claimed as open-license media. Photographer attribution was not supplied for the studio gallery. Preserve the credits and the owner’s rights. Chivo, Libre Caslon Display and Three.js licenses are included alongside those assets.
