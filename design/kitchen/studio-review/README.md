# OCIX studio refinements

- Roast is the primary amber CTA; the audit is the secondary raised button.
- Meet the cook has two sections: OCIX’s motive (software that brings fun to people’s lives) and contact. Personal branding is removed from this page and the shared footer; existing legal policies and article attribution remain accurate.
- Email, X, Instagram and Reddit use raised clay buttons and the existing OCIX URLs.
- Recipes is a fridge door of title-only sticky notes. Notes zoom on hover and keyboard focus, and link to the full articles. Reduced motion disables the zoom.
- Today’s menu is a centered native dialog with a blurred backdrop, raised close button, Escape dismissal and focus return. The product list scrolls independently of its heading and close button.
- The chef’s apron uses the existing rainbow OCIX mark without the wordmark. The mark crop and favicon derivatives also exclude the stray edge of the neighbouring letter.

## Growing the menu

The full catalogue is generated from `dishes` in `src/app/components/Kitchen.tsx`. The kitchen scene shows four curated product slugs, so the artwork stays uncluttered as the catalogue grows. Add a product’s data, route/content and artwork to publish it in the menu; feature it in the kitchen only when desired. `npm run test:studio` simulates a 16-product catalogue without publishing dummy products.

## Verification

- Production build and all 7 existing unit tests pass without edits.
- `npm run test:studio`: 20 page/viewport checks, menu focus cycling, Escape and close-button dismissal, focus return (including the mobile navigation button), 16-product scrolling, contact URLs, recipe navigation and CTA order.
- Axe WCAG A/AA: 20 page/viewport scans across home, about, recipes, tools and contact, plus open-menu scans at 1440, 768, 390 and 320 pixels; no violations. See [accessibility results](results.json).
- 37 responsive geometry checks pass. Fresh mobile Lighthouse: performance **93**, accessibility **100**, CLS **0**, using default mobile throttling. See [Lighthouse](lighthouse-mobile.report.html) and the parent [QA report](../QA.md).

[About desktop](about-1440.png) · [About phone](about-390.png) · [Recipes desktop](blog-1440.png) · [Recipes phone](blog-390.png) · [Menu phone](menu-390.png) · [Tools desktop](tools-1440.png)
