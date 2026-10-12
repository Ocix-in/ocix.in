---
{"title": "Seven things that broke when I shipped my side project to production", "description": "Real production lessons from shipping Vigilante as a solo developer on Vercel, Railway and Razorpay: CSP surprises, crash loops, key formats, abandoned checkouts, and time zones.", "publishedAt": "2026-10-12", "author": "Vishal Pandey", "status": "published"}
---
Vigilante started the way most side projects do: a React app, an API, a database, and one person doing all of it. It now runs on Vercel (frontend), Railway (Spring Boot backend, PostgreSQL, Redis), Razorpay (payments) and a GitHub App (verification).

Every tutorial covers the happy path. This is the other path: real things that broke, or nearly broke, once real users were involved, and what I changed so they don't happen again. None of them are exotic. That's the point.

## 1. It worked locally and broke in production: security headers

The game's town is a PixiJS 8 scene. Locally it was perfect. In production, it broke.

The difference was the **Content Security Policy**. Our production CSP lives in `vercel.json` and deliberately doesn't allow `'unsafe-eval'`. The dev server doesn't serve those headers at all. PixiJS, like many renderers, generates small pieces of code at runtime with `new Function()` for speed, and a strict CSP blocks that.

The fix was one import that swaps in PixiJS's eval-free implementations:

```ts
import 'pixi.js/unsafe-eval'; // despite the name: lets Pixi run WITHOUT unsafe-eval
```

**The lesson:** your dev server and your production host are different environments, and headers are the easiest difference to forget. Now any change that adds a library, worker, canvas code or external request gets tested as a production build with the real headers. We also have a unit test that fails if anyone removes that import or loosens the CSP.

## 2. A one-column mismatch put the backend in a crash loop

The backend uses Hibernate with `ddl-auto=validate`: on startup, it checks that every entity matches the database schema, and refuses to start if not. Database changes go through Flyway migrations.

One deploy shipped an entity whose field type didn't match its column. Validation failed, the app exited, the platform restarted it, and it failed again. The API was down until the fix went out.

**The lesson:** `validate` did its job. It refused to run against a schema it didn't understand, which is much better than silently corrupting data. The mistake was not catching it before deploy, and in our setup **merging to `main` is deploying**. Now every backend change runs the full test suite before it's merged, and entity or migration changes get an extra look.

## 3. A key rotation broke every webhook

GitHub App webhooks are how Vigilante verifies your day, so they're the most important thing we run. After rotating the GitHub App's private key, every webhook started failing with "Could not generate GitHub App authentication token".

The cause: GitHub hands out App private keys in **PKCS#1** format (`-----BEGIN RSA PRIVATE KEY-----`). Our key parser only accepted **PKCS#8** (`-----BEGIN PRIVATE KEY-----`). Nothing had ever exercised that path with a key straight from GitHub.

The fix: the parser now accepts PKCS#1, PKCS#8, and keys stored with escaped `\n` line breaks (common in environment variables), with tests for each.

**The lesson:** rotate keys *before* you need to, as a drill, while you can calmly fix whatever breaks. And any parser of secrets should accept every format the issuer actually produces.

## 4. Abandoned checkouts held places that weren't sold

Our first Pro offer had a limited number of founding seats. Every time someone *started* a checkout, a pending subscription was created. If they closed the payment window, it just sat there.

Pending checkouts that never completed were holding places nobody had paid for, and the seat counter was counting "ever paid" in a way that didn't match what people would assume.

The fix: unpaid pending checkouts older than an hour now expire and free their place. A late payment on an abandoned checkout still activates, so nobody who actually paid loses out.

**The lesson:** any flow with a payment window needs an explicit answer to "what if they never come back?" And any public counter ("only X left!") needs a precise definition you'd be comfortable explaining to a customer.

## 5. A payment provider's minimum shaped the price list

Razorpay has a minimum for dollar charges. When we designed small purchases, like single-item packs, every dollar price had to be at least $1, even where the rupee price was much lower.

**The lesson:** read your payment provider's limits *before* designing your prices, not after. Minimums, currencies, refunds and recurring billing rules all shape what you can sell. We also chose prepaid plans without auto-renewal, so nobody is charged again without deciding to.

## 6. Time zones: "today" is harder than it looks

A daily habit app lives and dies by one question: what day is it? A commit at 2 am in India is "today" for the user and "yesterday" in UTC.

We convert each commit's timestamp, which includes its offset, into the user's time zone before deciding which day it belongs to. But time zones get into everything. One of our open follow-ups is a place where the database clock and the application clock are compared without either time zone being pinned. It works today because both happen to be UTC. "Happens to be" is not a design.

**The lesson:** pin time zones explicitly everywhere: the database, the JVM, the containers. Then convert to the user's zone at the edges, deliberately.

## 7. The boring one: merging is deploying

For a solo project, it's natural to wire `main` straight to production. It's fast and simple. It also means every merge is a release, including the ones you meant as "save my progress".

What helped:
- a separate working branch, so `main` only gets reviewed merges;
- one person (me) who commits and deploys, even when AI agents write code, so I'm always the one who reviewed what goes out;
- a short checklist after deploy: open the app, log in, check the most important flow.

After each deploy I log in and check the main flow, so I know the app and my day's progress are working before I stop watching.

## What I'd tell someone about to ship

- Test the production build with production headers.
- Treat schema changes as the riskiest part of any deploy.
- Rotate your keys once as a drill.
- Design for the user who leaves halfway through a payment.
- Pin every clock to UTC, and convert on purpose.
- Know exactly what happens when you merge.

If I started again, I'd rehearse a key rotation and a production deploy long before launch.

If you want to see what all of this is running: Vigilante is a free browser game where your GitHub-verified coding days rebuild a post-apocalyptic town.

[Try Vigilante](https://myvigilante.ocix.in/?utm_source=ocix-blog&utm_medium=article&utm_campaign=t055&utm_content=solo-shipping)
