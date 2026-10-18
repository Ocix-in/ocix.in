# Responsive fixes · 18 October 2026

Compact dish labels expose the artwork. The heading, scene and mobile dock have independent layout rows; the scrollbar no longer sits underneath the dock. Product recipe cards sit beside artwork on desktop and stack on tablets and phones. Today’s menu preserves product descriptions in an accessible native disclosure.

Validated with the production build, all 7 unchanged unit tests, 37 browser layout checks, keyboard/disclosure checks and Axe WCAG A/AA scans. Fresh mobile Lighthouse: performance 94, accessibility 100, CLS 0.

Run `npm run build && npm run test:unit`, then `npm run test:layout`. Install Playwright Chromium first or set `OCIX_CHROME_PATH` to a local Chrome executable. The layout runner starts and stops its own preview server and regenerates screenshots and `layout-results.json`.

- [Desktop](home-1400x783.png)
- [Phone](home-390x844.png)
- [Short phone](home-320x568.png)
- [Product desktop](draftshield-1440x900.png)
- [Expanded phone menu](menu-open-390.png)
- [Layout results](layout-results.json)
- [UI and accessibility results](ui-results.json)
- [Keyboard interaction results](interaction-results.json)
- [Lighthouse report](lighthouse-mobile.report.html)

Older screenshots and reports in the parent folder describe the initial redesign.
