# OCIX · a small kitchen for software

OCIX is Vishal Pandey’s independent software studio in India. Vigilante is served; DraftShield, GymX and Do It! are still cooking. The site has no waitlist, beta form or email capture.

## Run and publish

```sh
npm ci
npm run dev
npm run build
npm run test:unit
npm run preview
```

React + Vite render every route to static HTML in `scripts/build.mjs`. There is no production React hydration. Native links, CSS and `<details>` provide navigation and disclosures; the existing consent, GTM and deferred analytics remain in place. The production JavaScript budget is 10 KB. The preview serves clean URLs and a real 404 response on port 4173.

## Kitchen identity

Approved mockups and the brief are in `design/kitchen/`. `src/styles/theme.css` defines the lilac wall, navy ink, violet italic and four logo colours. Materials have distinct roles: raised/inset clay for surfaces, frosted glass for floating information, and navy/amber pop buttons for actions. Display text uses self-hosted variable Fraunces with `SOFT=100`; Geist and Geist Mono handle body and metadata. Fraunces keeps its full optical-size and SOFT axes; English and accented Latin have separate unicode ranges to reduce first-visit downloads. Fonts use `font-display: optional`; their SIL OFL notices are in `public/assets/fonts/OFL.txt`. Metadata labels are slightly darker than the mockups to meet AA contrast.

Every kitchen object links to its own page. Responsive percentage coordinates keep compact name/status labels attached to the scene. Product descriptions are in the native Today’s menu dialog, with a blurred backdrop, focus containment, Escape and close-button dismissal. The full catalogue comes from the shared `dishes` list; the kitchen keeps four curated products, so adding dishes does not crowd the artwork. The headline, artwork, swipe hint, served dock and footer have separate layout rows. The Recipes page zooms into the same navy fridge shown in the kitchen. Home notes are decorative; close-up notes open a native article dialog over a blurred backdrop. Article HTML loads on demand, with canonical links retained as a fallback. The cook page focuses on OCIX’s motive and its contact channels. Phone visits start at the stove; native horizontal scrolling has no visible scrollbar. Short phones can scroll vertically so controls never cover the artwork. Product recipe cards sit beside their dishes on desktop, with a stacked layout on tablets and phones. Cross-document View Transitions match each dish to its product hero. All animation and transitions stop under reduced motion. Product notes retain the original substantive copy in closed native disclosure panels; articles keep a readable glass column.

## Re-render the artwork

Blender 4.5 or later is required only when changing the artwork. The procedural scene includes a draped cloth, hollow frosted fridge, rainbow badges and separate transparent animation layers. There is no large shadow-catcher plane; CSS radial ellipses provide contact shadows without rectangular seams.

```sh
/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup \
  -P design/kitchen/blender/kitchen.py -- design/kitchen/renders
npm run assets:kitchen
npm run build
```

For a preview use `--quick`; for selected outputs append `--only pot,pot-lid,steam,pot-body`. Selected renders use the same cameras. The optimizer uses Sharp to export 1×/2× AVIF and WebP, a mobile kitchen source, trimmed scene sprites and `src/app/kitchen-assets.json`. Commit the generated assets and manifest with the script. Keep the original PNGs in `design/kitchen/renders/` for reproducibility. `scripts/subset-fonts.py` reproduces font subsets from licensed source TTFs using fonttools and brotli. `npm run assets:brand` regenerates the logo, mark and icons. Raster favicon sizes, ICO and the app icons use the isolated rainbow OCIX mark; their existing paths remain valid.

Budgets: desktop home artwork ≤260 KB at 1×, mobile ≤140 KB, each product hero ≤160 KB. `ocix-logo.webp` must remain under 12 KB. The static-site tests enforce the script/logo budgets, route metadata, substantive content, policy boundaries and internal links.

## Articles and integrations

Articles live in `src/content/blog/<slug>.md`, with JSON front matter (`title`, `description`, `publishedAt`, `author`, `status: "published"`). Draft filenames ending in `.draft.md` are excluded. Publishing fails if editorial comments or unresolved `[FOUNDER]`, `[CHECK]`, `[SHOT]`, `[ASK]` or similar markers remain. Sitemap, robots, ads.txt and JSON-LD are generated or retained by the existing build pipeline.

See `design/kitchen/QA.md` for viewport checks, screenshots and visual deviations.

## Responsive layout regression checks

After building, run `npm run test:layout`. This starts an isolated preview on port 4179 and checks 37 page/viewport combinations for heading/label collisions, label collisions, product card/artwork overlap, scene/dock/footer intersections, horizontal overflow and broken images. It saves screenshots and measured bounds in `design/kitchen/review-fixes/`. Install the test browser once with `npx playwright install chromium`, or use an installed Chrome on macOS:

```sh
OCIX_CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:layout
```

Run `npm run test:studio` after building to check the menu keyboard behavior and focus return, a simulated 16-product catalogue, OCIX contact URLs, recipe links and Roast CTA order at four widths. It uses the same `OCIX_CHROME_PATH` option and starts its own preview on port 4178. Current screenshots and results are in `design/kitchen/studio-review/`.

Run `npm run test:fridge` to check the shared fridge artwork and notes at four widths, all eight article previews, keyboard close/focus return, note title fit and failed-load fallbacks. It starts its own preview on port 4180. Screenshots and reports are in `design/kitchen/fridge-review/`. In development, Vite renders the requested article on demand; production fetches its existing prerendered HTML.
