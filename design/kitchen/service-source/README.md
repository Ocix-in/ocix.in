# Made-to-order service artwork

`portfolio-original.png` is a real 1280 × 720 browser capture of https://www.vishaldevlift.in/, made on 20 October 2026. It shows the live personal portfolio homepage, including its weightlifting scene. The service page labels it as a personal portfolio. It is not a generated client example. Run `npm run assets:services` to export 640/1280-pixel AVIF and WebP versions for the small serving-tray preview and work panel.

The compact service kitchen reuses OCIX’s original counter, chef and mark assets. Its recipe card, screen frame and serving tray are native HTML/CSS. The kitchen and navigation bells are native SVG in `src/app/components/ServiceBell.tsx`, using gradients and the same indigo/amber materials.

## Earlier shop illustration

Created 20 October 2026 with the built-in Image Generation tool. `shop-original.png` is the selected transparent PNG output; the existing OCIX chef and logo are composed separately in the page and are not generated replacements.

The complete generation prompt is in [prompt.txt](prompt.txt). It requests a miniature local shop, a desktop monitor, a phone and an order bell in the existing cream/teal/indigo clay style, with no text, logo or character. The browser receives AVIF/WebP exports rather than the source PNG.

Run `npm run assets:services` to reproduce `public/assets/services/shop{,@2x}.{avif,webp}` using Sharp. The 1× AVIF is approximately 28 KB and the 2× AVIF approximately 52 KB. Transparency is preserved.

The shop illustration is retained for provenance and is no longer used on the service page.
