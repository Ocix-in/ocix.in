# Made to order · compact kitchen · 20 October 2026

`/services/websites` now fits its first viewport instead of presenting a long business landing page. Its familiar kitchen contains a paper recipe for Why OCIX and a curved glass pastry case. Vishaldevlift and Vigilante sit on individual plates, with a third empty plate inviting the visitor’s own project. Each site opens its own preview; the empty plate opens contact. The View our work button opens a larger version of the same case. The overview also has a clear Talk to us button. Dialogs blur the background, become bottom sheets on phones, keep close controls visible, and return keyboard focus to the original overview control.

Why OCIX explains original design, custom typography/colours and a scoped, competitive quote. It contains no price figures or percentage-saving claims. The work previews show real local screenshots of vishaldevlift.in and vigilante.ocix.in, label them as a personal portfolio and OCIX’s own product respectively, and offer explicit live-site links. The page loads no third-party iframe. Source provenance is in [service-source](../service-source/README.md).

Email, X, Instagram and Reddit buttons appear on the left of contact on desktop and first on phones. The form is optional and collapsed until requested. It prepares an encoded email to `support@ocix.in` in the browser. Visitors review and send it with their own email app. Copy/select fallback is available without an email handler or clipboard permission. It never claims an enquiry was sent, stores no form details and requires no backend or new analytics events. Without JavaScript a readable fallback presents the ingredients, portfolio link and direct contact channels.

## Checks

`npm run test:services` passes at nine viewports from 320×568 through desktop and short landscape. It verifies no overview scrolling, all scene controls and plate labels visible, usable plate touch targets, centered desktop navigation, catalogue and both previews, active nav returning home, Taking orders opening contact, social-first contact, optional-form disclosure, keyboard focus and return, validation, encoded email preparation, invalidating stale drafts after edits, clipboard success/fallback, no POST, no price figures, old process links, metadata and sitemap inclusion. It starts its own production preview on port 4183. Results are in [results.json](results.json).

- [Desktop kitchen](services-1440x900.png)
- [Phone kitchen](services-390x844.png)
- [Small phone](services-320x568.png)
- [Short landscape](services-844x390.png)
- [Why OCIX](why-1440x900.png)
- [Pastry catalogue](work-1440x900.png)
- [Vigilante preview](vigilante-1440x900.png)
- [Social contact and optional brief](contact-1440x900.png)
- [Phone contact](contact-390x844.png)
- [Prepared phone enquiry](enquiry-390x844.png)

All interior pages now have a visible back-to-kitchen button, including mobile and intermediate desktop widths. Each active nav tab carries a return arrow and takes the visitor home on a second click; inactive tabs open their own pages normally. The service header retains a teal-dot Taking orders control, shortened to Orders on phones.

The production build and all seven original unit tests pass. Shared nav/menu/contact checks pass at twenty page/viewport pairs, including active-tab return and back controls. Eleven first-viewport home checks and four local-time greetings pass. Browser JavaScript is 9.34 KB with no React hydration, within the existing 10 KB budget. The service stylesheet is content-hashed and loaded only on this route; the small shared header styles are available across pages.

Twenty-one Axe WCAG A/AA scans cover the overview, Why OCIX, pastry catalogue, both website previews, social contact and prepared enquiry at desktop and two phone sizes, with no violations. See [accessibility results](accessibility-results.json).

Mobile Lighthouse with default throttling: service **Performance 94, Accessibility 100, CLS 0**, LCP 2.9 s. See the [service report](lighthouse-service-mobile.report.html). Home remains **Performance 93, Accessibility 100, CLS 0**, LCP 3.2 s; see the [home report](lighthouse-home-mobile.report.html).
