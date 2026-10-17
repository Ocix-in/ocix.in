# Kitchen redesign · verification

Verified 18 October 2026 against the production static build. No existing tests were edited or removed.

## Results

- `npm run build && npm run test:unit`: all 7 tests pass. Nineteen published pages plus the 404 are prerendered, including all eight approved articles.
- Mobile Lighthouse 12.8.2, default simulated mobile throttling: **Performance 93, Accessibility 100, CLS 0**. LCP 3.0 s; FCP 1.8 s. See [HTML report](lighthouse-mobile.report.html) and [JSON report](lighthouse-mobile.report.json). The local production preview uses gzip for text, matching normal production delivery; no throttling parameters were relaxed.
- 27 viewport checks: nine routes at 1440×900, 1280×800 and 390×844. No broken images, runtime errors or horizontal page overflow. Home has no vertical scrollbar at all three sizes. Every desktop product hero ends exactly at the viewport bottom. See [viewport results](qa-results.json).
- Every main contains more than 100 real visible words, including the home and closed-by-default product pages. The static tests separately verify unique metadata, one h1, internal links, structured data, development boundaries and crawl files.
- Axe WCAG A/AA scans passed on home, all products, about, tools, blog, an article, contact, privacy, terms and 404 at desktop and phone widths. The final direct-object home links also have zero violations. See [accessibility scans](accessibility-results.json).
- All seven rendered objects pass mouse navigation on desktop and keyboard activation on phone. Native menu and recipe disclosures open with Enter; menu links are reachable with Tab. Reduced motion leaves zero running animations. See [interaction results](interaction-results.json).
- Production browser bundle: 3.08 KB, plus a tiny inline phone-position initializer and the preserved consent script. No React hydration or animation library ships to the browser.

## Artwork budgets

These totals include every loaded kitchen sprite, rather than counting only the background. Budgets are met by AVIF and WebP. See [exact byte counts](asset-budgets.json).

| Artwork | AVIF | WebP fallback | Limit |
| --- | ---: | ---: | ---: |
| Desktop home, 1× | 46,165 B | 61,848 B | 260 KB |
| Phone home, 1× | 44,654 B | 58,090 B | 140 KB |
| Phone home, 2× | 82,917 B | 132,940 B | 140 KB |
| Vigilante dish, 1× | 16,262 B | 48,772 B | 160 KB |
| DraftShield dish, 1× | 18,286 B | 34,456 B | 160 KB |
| GymX dish, 1× | 11,981 B | 13,932 B | 160 KB |
| Do It! dish, 1× | 11,871 B | 15,270 B | 160 KB |

The wordmark is under 12 KB. All images have explicit dimensions. Transparent renders have no floor catcher; radial CSS contact shadows fade inside their frames. Visual inspection found no rectangular shadow boxes or seams.

## Screenshots and differences from the mockups

| Page | Desktop comparison | Phone comparison |
| --- | --- | --- |
| Kitchen | [1440×900](screenshots/home-comparison-1440.png) | [390×844](screenshots/home-comparison-390.png) |
| Vigilante | [1440×900](screenshots/vigilante-comparison-1440.png) | [390×844](screenshots/vigilante-comparison-390.png) |
| DraftShield | [1440×900](screenshots/draftshield-comparison-1440.png) | [390×844](screenshots/draftshield-comparison-390.png) |

The comparison baselines preserve the supplied mockup markup and use the final polished artwork and self-hosted fonts. Product mockups have no phone variant: their phone comparisons clearly label the scaled desktop reference, next to the responsive implementation.

Intentional differences:

1. Product hotspot descriptions wrap over several lines, and the intro includes Today’s menu. This implements the brief’s visible-content requirement; label positions and stems were adjusted to keep the dishes visible and prevent overlapping labels.
2. Product pages retain the shared desktop navigation alongside the back link. The approved product mockups showed only the back link. Keeping the navigation makes Recipes, Free tastings and The cook directly reachable on every route.
3. Phone product pages stack the text, dish, recipe card and switcher. The desktop three-column composition cannot fit a 390-pixel screen with readable text and 44-pixel touch targets. Home remains a single screen with native horizontal scrolling and its served dock.
4. Vigilante’s next section starts after the full-viewport hero, instead of at y=840 in the 900-pixel mockup, to satisfy the hero-height requirement. Recipe notes continue below; existing substantive copy is preserved.
5. Metadata and teal status text are darker than the draft mockups where needed for AA contrast. Full optical-size and SOFT font axes are retained; separate English and accented Latin ranges reduce first-visit font downloads.

The optional animated image loop was unnecessary: separate transparent sprites and CSS provide lid, steam, dough, popcorn, cloche, chef-head and heat-dial motion within the asset budgets.
