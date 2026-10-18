# Shared fridge and focused recipe reader

The notes are now small, square and scattered across 28 reserved spaces, with varied angles and sizes. The existing eight notes leave most of the glass visible. Short display titles enlarge on hover or keyboard focus; full article titles remain in accessible labels and the reader. A seeded arrangement keeps both views consistent.

The home fridge and Recipes close-up now share one component, the same navy fridge artwork, the same note placement and the same note order. This retains the recognizable frame, frosted glass door, brass handle and lower freezer drawer. The existing cross-document `fridge` view transition zooms between them, including when Recipes is opened through navigation.

Home notes are decorative children of the single fridge link. They cannot independently open articles. In the close-up, each title-only note is a real link that opens the full article in a focused native dialog, with a blurred backdrop and a short zoom entrance. Escape, the close button and backdrop dismissal restore focus to the selected note. The header stays visible while long articles scroll. Normal article URLs remain available for direct visits, modified clicks, sharing and failed-preview fallbacks.

The purple outlines on Today’s menu and the close button are replaced by underline/inset keyboard states. Pointer interactions have no focus outline; keyboard focus remains visible. Reduced motion disables zoom animations.

## Verification

- Production build and all 7 unchanged unit tests pass.
- `npm run test:fridge`: same artwork, 8 decorative notes, fitting titles and all 8 full article previews at 1440, 768, 390 and 320 pixels (32 previews), plus keyboard focus return and failed-load fallbacks.
- `npm run test:studio`: all 20 studio page/viewport checks pass, including menu interactions and the article reader.
- 16 Axe WCAG A/AA scans pass: home/menu and fridge/article reader at all four widths. See [accessibility results](accessibility-results.json).
- Fresh mobile Lighthouse: performance **92**, accessibility **100**, CLS **0**. See [report](lighthouse-mobile.report.html).
- All 37 responsive geometry checks pass. The article reader also passes a Vite development check. Current performance results are in the parent [QA report](../QA.md).

[Kitchen fridge](home-fridge-1440.png) · [Fridge desktop](fridge-1440.png) · [Fridge phone](fridge-390.png) · [Article desktop](reader-1440.png) · [Article phone](reader-390.png) · [Interaction results](results.json)
