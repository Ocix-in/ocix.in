# Made-to-order service illustration

Created 20 October 2026 with the built-in Image Generation tool. `shop-original.png` is the selected transparent PNG output; the existing OCIX chef and logo are composed separately in the page and are not generated replacements.

The complete generation prompt is in [prompt.txt](prompt.txt). It requests a miniature local shop, a desktop monitor, a phone and an order bell in the existing cream/teal/indigo clay style, with no text, logo or character. The browser receives AVIF/WebP exports rather than the source PNG.

Run `npm run assets:services` to reproduce `public/assets/services/shop{,@2x}.{avif,webp}` using Sharp. The 1× AVIF is approximately 28 KB and the 2× AVIF approximately 52 KB. Transparency is preserved.

The small kitchen and navigation bells are native SVG in `src/app/components/ServiceBell.tsx`, using gradients and the same indigo/amber materials.
