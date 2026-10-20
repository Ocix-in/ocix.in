# Made to order · 20 October 2026

The new `/services/websites` page introduces OCIX's website design/build service for local businesses. It has new-website and redesign entry points, an illustrated hero, three process steps, practical business features, and an enquiry form. Desktop/mobile navigation, the mobile home action row, a small kitchen counter bell and the contact page link to it. The four-product menu stays curated separately.

The enquiry prepares an encoded email to `support@ocix.in` in the browser. Visitors review and send it with their own email app. Copy/select fallback is available without an email handler or clipboard permission. The form retains native mailto and direct email fallbacks. It never claims an enquiry was sent, stores no form details and requires no backend or new analytics events.

The chef and logo reuse the existing OCIX assets. The shop illustration uses a generated transparent PNG, exported to 1×/2× AVIF and WebP. Source and full prompt are in [service-source](../service-source/README.md). Phone form fields use 16 px text to avoid focus zoom. The mobile home retains its first-viewport business/menu actions, fridge/chef framing and Vigilante dock.

## Checks

`npm run test:services` checks nine service/home viewport pairs from 320 px phones through desktop and landscape. It verifies horizontal fit, visible controls and home CTA, header spacing, project selection, required fields, email subject/body encoding, local preparation, invalidating an old draft after editing, clipboard success and fallback, page metadata and sitemap inclusion. It starts its own production preview on port 4183. Results are in [results.json](results.json).

- [Desktop service page](services-1440x900.png)
- [Phone service page](services-390x844.png)
- [Small phone](services-320x568.png)
- [Tablet](services-768x1024.png)
- [Prepared enquiry on a phone](enquiry-390x844.png)

The production build and all seven original unit tests pass. Browser JavaScript is 8.88 KB with no React hydration, within the existing 10 KB budget. Broader layout, welcome, chef, menu and recipe checks are documented in [QA](../QA.md).

Six Axe WCAG A/AA scans cover the initial service page and prepared enquiry on desktop and two phone sizes; no violations were found. See [accessibility results](accessibility-results.json).

Mobile Lighthouse with default throttling: service **Performance 95, Accessibility 100, CLS 0**, LCP 2.7 s; home **Performance 93, Accessibility 100, CLS 0**, LCP 3.1 s. [Service report](lighthouse-service-mobile.report.html) · [Home report](lighthouse-home-mobile.report.html).

Service art uses width-based responsive sources so phones receive an appropriately sized image. Its dedicated stylesheet is content-hashed and linked from prerendered service HTML only; home loads the small shared business-entry styles.
