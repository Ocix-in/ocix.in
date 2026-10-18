# Pop-out chef and automatic welcome · 19 October 2026

The cropped portrait is replaced by a chef emerging in front of a purple circular backdrop. The existing chef head and OCIX mark are combined with a clay-styled SVG torso and separate waving arm. The hat, face and hand remain visible outside the circle, and the popped-out hat is clickable. Reduced motion keeps the hand still.

The local-time greeting opens automatically 1.4 seconds after page load on the first visit in a browsing session. It does not move keyboard focus or interrupt an open menu or article. Closing or dismissing it keeps it closed for the session; clicking the chef reopens it. If session storage is unavailable, the page still works. The ready-to-serve Vigilante CTA remains visible inside the welcome, including on short phones and landscape screens.

The mobile footer reserves space for the taller mascot so it cannot cover the Taste dock or footer links. Compact product labels are spaced accordingly.

## Verification

- Build and all 7 existing unit tests pass unchanged.
- `npm run test:chef`: automatic opening at 5 desktop/mobile viewports, no focus stealing, remembered dismissal, hat-click reopening, visible welcome CTA, reduced motion and no interruption of an open menu.
- All 11 viewport/local-greeting checks in `test:welcome` pass. General layout tests start with the welcome dismissed; the dedicated chef suite checks automatic opening.
- 6 Axe WCAG A/AA scans pass for automatic and dismissed welcome states on desktop and two phone sizes. See [accessibility results](accessibility-results.json).
- All 37 broader layout checks pass. Fresh mobile Lighthouse with automatic opening enabled: performance **93**, accessibility **100**, CLS **0**, using default mobile throttling. The avatar shares its AVIF/WebP head resources with the main kitchen. See [report](lighthouse-mobile.report.html) and [QA notes](../QA.md).

[Desktop automatic welcome](automatic-1440x900.png) · [Phone automatic welcome](automatic-390x724.png) · [Short phone](automatic-320x568.png) · [Uncropped avatar](avatar-390x724.png) · [Results](results.json)
