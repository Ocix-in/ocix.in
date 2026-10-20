# Kitchen redesign · verification

Verification notes for the production static build. The original unit tests remain unchanged.

## Navbar position and menu cleanup · 20 October 2026

The desktop header uses equal flexible side columns around the navbar, keeping navigation centered across pages and widths even when the right-side control is hidden. Removed The menu from desktop and mobile navigation; the hero's Today’s menu remains available. All seven unit tests, nine service/header viewport checks and twenty studio page/viewport checks pass. The header checks assert center alignment and no collisions; mobile navigation checks follow the business link instead of the removed menu entry.

## Made-to-order websites · 20 October 2026

Added `/services/websites` with original OCIX branding, a custom clay shop/device illustration, new/redesign choices, the process and a local email-draft enquiry to support@ocix.in. Desktop/mobile navigation and the contact page point to it; phone home has a visible business entry beside Today’s menu, and a small service bell sits on the kitchen counter. The product menu continues to show its four products.

The form validates required information, preserves Unicode and reserved characters in the encoded mailto subject/body, and offers copying/selecting the prepared draft. It submits no enquiry data and makes no delivery claim. Visitors review and send the email themselves. Mobile inputs use 16 px text. All source artwork and the built-in Image Generation prompt are retained; the original chef and mark are reused.

Build and all 7 original unit tests pass. Nine dedicated viewport pairs cover service-page fit, header spacing, home entry and Taste visibility, enquiry preparation, clearing a stale draft after edits, project selection, copy fallback, canonical metadata and sitemap inclusion. All 37 shared-layout and 11 mobile welcome viewports pass. All 20 studio page/viewport checks, 32 article previews and 5 chef lifecycle viewports pass; six service/form Axe WCAG A/AA scans report no violations. The service-only CSS is content-hashed and linked only from its prerendered page. Fresh mobile Lighthouse: service **Performance 95, Accessibility 100, CLS 0, LCP 2.7 s**; home **Performance 93, Accessibility 100, CLS 0, LCP 3.1 s**. Browser JavaScript is 8.88 KB, with no hydration. See [service screenshots and results](services-review/README.md).

## Quieter chef and transparent favicon · 20 October 2026

The automatic greeting now runs on home arrivals and explicit home reloads only. Product/information pages, browser back/forward and internal links back home stay quiet. Manual opening remains available throughout the site. The greeting lasts 2.5 seconds, with a shorter wave to match; interaction can still keep the card open.

Removed solid backgrounds from the large favicon, touch and app icons. All PNG and ICO sizes have transparent corners, contain the OCIX symbol alone, and use versioned URLs to replace cached icons. A transparent root favicon.ico provides the browser fallback. Brand generation preserves transparency for future rebuilds.

Build and all 7 unit tests pass. Dedicated browser checks cover quiet product navigation and return-home links, explicit home reload, fresh arrivals with pending images, the 2.5-second timeout at five viewports, manual opening on other pages, reduced motion and mobile first-viewport fit. Every generated icon's transparency was checked at pixel level, including all ICO payloads. Browser JavaScript is 7.12 KB.

## Automatic welcome replay fix · 19 October 2026

Removed the session-storage suppression that prevented the chef from appearing again after reload. Each page load now starts the welcome after 1.4 seconds from content readiness, without waiting for image downloads; it retreats five seconds later. A stationary pointer under the newly opened card no longer cancels the retreat. Deliberate pointer movement, tapping or focusing the card keeps it available. Opening the guide manually before the automatic timer suppresses duplicate greetings only for that page load.

Regression checks cover old session flags, first visits with image downloads deliberately stalled, automatic retreat after reload, five desktop/mobile viewports, normal and reduced motion, and open-menu protection. General geometry tests freeze their browser clock while inspecting layouts, rather than using production session flags. Build and all 7 unit tests pass, along with 5 chef lifecycle viewports, 11 welcome viewports, 4 local-time greetings, 37 layout checks, 20 studio page/viewport checks and 32 article previews. Production browser JavaScript is 6.87 KB.

## Shy chef, wave and five-second retreat · 19 October 2026

The guide begins as the earlier circular portrait with a purple outline, then transitions to the popped-out waving chef and a local-time greeting on the first visit of a session. After five seconds it retreats automatically. Hovering, tapping or focusing the card keeps it open; manual reopening, close, Escape and outside dismissal remain available. Reduced motion removes the transitions and wave. The automatic greeting still avoids open menus/articles and leaves focus alone.

Build and all 7 original unit tests pass. The expanded chef suite verifies the lifecycle at 5 viewports and normal-motion emergence/retreat, plus interaction protection, session persistence and menu interruption. The existing first-viewport and layout suites cover mobile fit and surrounding page geometry. Browser JavaScript is 6.98 KB. See [current screenshots and checks](chef-popout-review/README.md).

## Pop-out chef and automatic welcome · 19 October 2026

The chef now emerges from a purple circular backdrop with the full hat and face visible, a torso with the OCIX mark and a waving hand. The welcome opens automatically once per browsing session after 1.4 seconds, without moving focus or interrupting an open menu/article. Dismissal is remembered for the session, and the popped-out hat can reopen it. Extra footer space keeps the mascot clear of the mobile Taste dock.

All 7 unchanged unit tests pass, along with dedicated automatic-welcome checks at 5 viewports and the existing 11 first-viewport/greeting checks. Six automatic/dismissed-state accessibility scans pass. See [screenshots and results](chef-popout-review/README.md). All 37 broader layout checks pass. Fresh mobile Lighthouse with the automatic welcome enabled: **Performance 93, Accessibility 100, CLS 0**, LCP 3.2 s; see the [report](chef-popout-review/lighthouse-mobile.report.html). The avatar reuses the kitchen’s AVIF/WebP head resources. Production browser JavaScript is 6.59 KB, with no React hydration.

## Clearer Today’s menu button

On phones and tablets (up to 1000 px), the menu invitation has a raised clay surface, subtle border, menu-sheet icon, stronger label and an action arrow. Desktop retains the earlier plain full-width label and plus sign. Both retain inset keyboard focus without underlines. The mobile button remains compact enough for the first viewport. Current screenshots are in the [welcome review](welcome-review/README.md).

## Kitchen welcome and first-viewport mobile fit · 19 October 2026

Removed the white outer glow from raised materials, corrected fridge/chef label pointers and added gentle chef-head motion with reduced-motion support. A circular chef profile opens device-local greetings and a served Vigilante suggestion. Phone home now fits its first viewport with the Taste CTA visible; the initial scene frames the fridge and chef. Short landscape screens use two columns.

The build and all 7 unchanged unit tests pass. Eleven dedicated viewport checks cover 320×568 phones, the supplied screenshot proportions, tall phones, tablets, landscape and desktop. Four local-time greetings and nine WCAG A/AA scans pass. See [current screenshots and reports](welcome-review/README.md). The broader 37-layout regression matrix passes too. Fresh mobile Lighthouse: **Performance 92, Accessibility 100, CLS 0**, LCP 3.2 s; see the [report](welcome-review/lighthouse-mobile.report.html). The production browser bundle is 6.14 KB.

## Smaller, scattered sticky notes

Notes now occupy small square spaces, with varied positions, angles and slight size differences. A seeded 28-space arrangement keeps the home and close-up consistent. The eight published recipes cover less than 35% of the note area at all tested widths. Short titles enlarge on hover/focus, and full titles remain available to assistive technology and in the article reader.

The production build, all 7 existing unit tests and all 32 article-preview checks pass. Current [desktop](fridge-review/fridge-1440.png) and [phone](fridge-review/fridge-390.png) screenshots show the additional space.

## Shared fridge and article reader

Recipes now zooms into the **same navy fridge** used in the kitchen, with matching sticky-note positions. Home notes are decorative; clicking any part opens the fridge. Close-up notes open articles in a native modal with a blurred backdrop. Article HTML loads on demand, and direct article links remain available. The purple close-button circle and menu-button rectangle are replaced by subtle keyboard-only inset states.

The build and all **7 unchanged unit tests** pass, alongside **37 layout checks**, **20 studio checks**, **32 article previews at four widths**, failed-load fallback checks and **16 Axe WCAG A/AA scans**. Screenshots and detailed results are in the [fridge review](fridge-review/README.md). Production browser JavaScript is **5.85 KB**, with no React hydration or bundled article bodies.

Fresh mobile Lighthouse: **Performance 92, Accessibility 100, CLS 0**, LCP 3.2 s. See the [report](fridge-review/lighthouse-mobile.report.html). Default mobile throttling was retained.

## Latest OCIX studio refinements

Roast is the primary CTA, with the audit secondary. Meet the cook now focuses on OCIX’s motive and contact in two sections, with raised email, X, Instagram and Reddit buttons. Recipes uses a fridge door of title-only sticky notes that zoom on hover/focus. Today’s menu is a centered dialog with a blurred backdrop, a raised close button, Escape dismissal, focus cycling and focus return. Product rows scroll while the heading and close button stay visible. The chef’s apron carries the mark-only OCIX logo.

The full catalogue comes from the shared product list; the kitchen shows four curated products. A simulated 16-product catalogue passes the menu scroll and keyboard checks. See [studio review and screenshots](studio-review/README.md).

Build and all **7 unchanged unit tests** pass. **37 layout checks** pass, plus **20 studio page/viewport interaction checks**. Axe scans found no WCAG A/AA violations across home, about, recipes, tools and contact at four widths, including the open menu. The production browser bundle is **4.10 KB**, without React hydration. Small apron badges are served separately from the full-resolution brand mark. Hidden menu artwork is lazy-loaded; the interaction runner decodes it after opening the dialog.

Fresh mobile Lighthouse for this refinement: **Performance 93, Accessibility 100, CLS 0**, LCP 3.2 s. See the [HTML report](studio-review/lighthouse-mobile.report.html) and [JSON report](studio-review/lighthouse-mobile.report.json). The audit ran after the browser regression checks finished, using default mobile throttling.

## Earlier responsive review

The screenshot issues are fixed: heading and artwork occupy separate rows; dish labels show only name, status and action; descriptions are available in the **Today’s menu** dialog. The kitchen scales to the available desktop height. On phones, the horizontal scene, swipe hint, Vigilante dock and footer occupy separate rows. Short phones scroll vertically instead of squeezing content behind the dock. Tablet and phone product pages stack; desktop recipe cards sit beside the artwork.

- `npm run build && npm run test:unit`: all **7 unchanged tests pass**.
- `npm run test:layout`: **37 page/viewport checks pass**, from 320×568 to 2560×1440, including 1000/1001-pixel breakpoint boundaries and the supplied desktop screenshot proportions. No heading/label collisions, label collisions, product artwork/card collisions, scene/dock/footer collisions, horizontal page overflow or broken images. See [layout results](review-fixes/layout-results.json).
- Fresh default mobile Lighthouse: **Performance 94, Accessibility 100, CLS 0**. See [HTML report](review-fixes/lighthouse-mobile.report.html) and [JSON report](review-fixes/lighthouse-mobile.report.json).
- Axe WCAG A/AA scans passed on home and DraftShield at desktop and phone widths, including the earlier expanded disclosure. Those results precede the current modal; current menu tests are in `studio-review/`. Enter opens the menu; reduced motion leaves zero running animations. Production and development both center DraftShield on initial phone load. See [UI results](review-fixes/ui-results.json).
- All seven kitchen objects remain keyboard navigable, and native horizontal keyboard scrolling works. See [interaction results](review-fixes/interaction-results.json).
- Static rendering, metadata, article publication, consent and the small production browser bundle remain intact. No React hydration ships to the browser.

Current screenshots: [desktop 1400×783](review-fixes/home-1400x783.png), [phone 390×844](review-fixes/home-390x844.png), [short phone 320×568](review-fixes/home-320x568.png), [DraftShield desktop](review-fixes/draftshield-1440x900.png), [expanded phone menu](review-fixes/menu-open-390.png).

The original reports and comparison screenshots below record the initial redesign. Use `review-fixes/` for the current responsive review.

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

1. Product hotspot descriptions are now in the Today’s menu disclosure. Compact labels preserve artwork visibility; the headline and intro occupy their own row.
2. Product pages retain the shared desktop navigation alongside the back link. The approved product mockups showed only the back link. Keeping the navigation makes Recipes, Free tastings and The cook directly reachable on every route.
3. Phone product pages stack the text, dish, recipe card and switcher. The desktop three-column composition cannot fit a 390-pixel screen with readable text and 44-pixel touch targets. Home uses native horizontal scene scrolling with a separate served dock; short phones can scroll vertically.
4. Vigilante’s next section starts after the full-viewport hero, instead of at y=840 in the 900-pixel mockup, to satisfy the hero-height requirement. Recipe notes continue below; existing substantive copy is preserved.
5. Metadata and teal status text are darker than the draft mockups where needed for AA contrast. Full optical-size and SOFT font axes are retained; separate English and accented Latin ranges reduce first-visit font downloads.

The optional animated image loop was unnecessary: separate transparent sprites and CSS provide lid, steam, dough, popcorn, cloche, chef-head and heat-dial motion within the asset budgets.
