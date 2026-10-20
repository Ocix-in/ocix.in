# Made to order · compact kitchen · 20 October 2026

`/services/websites` now fits its first viewport instead of presenting a long business landing page. Its familiar kitchen contains three interactive objects: the paper recipe opens Why OCIX, the serving tray opens the work preview, and the brass bell opens contact. The short overview also has clear Talk to us and View our work buttons. Dialogs blur the background, become bottom sheets on phones, keep close controls visible, and return keyboard focus to the original overview control.

Why OCIX explains original design, custom typography/colours and a scoped, competitive quote. It contains no price figures or percentage-saving claims. The work panel shows a real local screenshot of vishaldevlift.in, labels it as a personal portfolio and offers an explicit live-site link. It loads no third-party iframe. Source provenance is in [service-source](../service-source/README.md).

Email, X, Instagram and Reddit buttons appear on the left of contact on desktop and first on phones. The form is optional and collapsed until requested. It prepares an encoded email to `support@ocix.in` in the browser. Visitors review and send it with their own email app. Copy/select fallback is available without an email handler or clipboard permission. It never claims an enquiry was sent, stores no form details and requires no backend or new analytics events. Without JavaScript a readable fallback presents the ingredients, portfolio link and direct contact channels.

## Checks

`npm run test:services` passes at nine viewports from 320×568 through desktop and short landscape. It verifies no overview scrolling, all scene controls visible, centered desktop navigation, all three panels, social-first contact, optional-form disclosure, keyboard focus and return, validation, encoded email preparation, invalidating stale drafts after edits, clipboard success/fallback, no POST, no price figures, old process links, metadata and sitemap inclusion. It starts its own production preview on port 4183. Results are in [results.json](results.json).

- [Desktop kitchen](services-1440x900.png)
- [Phone kitchen](services-390x844.png)
- [Small phone](services-320x568.png)
- [Short landscape](services-844x390.png)
- [Why OCIX](why-1440x900.png)
- [Work preview](work-1440x900.png)
- [Social contact and optional brief](contact-1440x900.png)
- [Phone contact](contact-390x844.png)
- [Prepared phone enquiry](enquiry-390x844.png)

The production build and all seven original unit tests pass. Shared menu/contact checks pass at twenty page/viewport pairs; the fridge suite passes all thirty-two article previews and its keyboard/fallback checks. Browser JavaScript is 9.34 KB with no React hydration, within the existing 10 KB budget. The service stylesheet is content-hashed and loaded only on this route; the home stylesheet remains unchanged.

Fifteen Axe WCAG A/AA scans cover the overview, Why OCIX, work, social contact and prepared enquiry at desktop and two phone sizes, with no violations. See [accessibility results](accessibility-results.json).

Mobile Lighthouse with default throttling: service **Performance 95, Accessibility 100, CLS 0**, LCP 2.6 s. See the [service report](lighthouse-service-mobile.report.html). Home remains **Performance 93, Accessibility 100, CLS 0**, LCP 3.1 s; see the [home report](lighthouse-home-mobile.report.html).
