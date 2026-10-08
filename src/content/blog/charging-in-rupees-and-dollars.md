---
{"title": "Charging in rupees and dollars from day one: how we pick the currency", "description": "How we pick between ₹ and $ at checkout for an Indian developer tool: explicit choice, IP country, time zone, and a safe default, with the code and the mistakes to avoid.", "publishedAt": "2026-10-09", "author": "Vishal Pandey", "status": "published"}
---
If you build a developer product in India, you'll have two kinds of customers almost immediately: people in India who expect to pay in rupees, through UPI or an Indian card, and everyone else, who expects dollars. Showing the wrong one costs you sales. A US visitor who sees ₹ is confused. An Indian student who sees $ assumes it's not for them.

Here's how Vigilante decides which currency to show, the code behind it, and the mistakes worth avoiding.

## The rule: an ordered list of signals

We don't rely on a single signal, because every signal fails sometimes. Instead we check them in a fixed order and stop at the first one we trust:

- **An explicit choice.** A `currency` parameter in the link, or a choice the user made with the selector. Always wins.
- **IP country.** From the hosting edge. India → INR, anywhere else → USD.
- **Time zone.** If the browser says `Asia/Kolkata` (or the old name `Asia/Calcutta`) → INR.
- **Default.** USD.

In code it's short:

```ts
export function resolveCurrency({ requested, stored, country, timeZone }: CurrencySignals): CurrencyCode {
  if (requested) return requested;
  if (stored) return stored;
  const c = normalizeCountry(country);           // "in " → "IN", junk → null
  if (c) return c === 'IN' ? 'INR' : 'USD';
  if (timeZone && INDIA_TIME_ZONES.has(timeZone)) return 'INR';
  return 'USD';
}
```

(Simplified from our source.)

## Why each signal is there

**Explicit choice first,** because the user knows best. An Indian developer working for a US company might want to pay in dollars on a company card. Someone travelling might be on a foreign IP. The selector is always visible, and once someone picks, we remember it. Detection never overwrites a choice.

**IP country second,** because it's usually right and needs no permission. On Vercel, the edge adds the visitor's country to each request as a header. We expose it through a tiny function:

```ts
// Vercel Function: the visitor's IP country, for the default currency only.
export function GET(request: Request): Response {
  const raw = request.headers.get('x-vercel-ip-country')?.trim().toUpperCase() ?? '';
  const country = /^[A-Z]{2}$/.test(raw) ? raw : null;
  return new Response(JSON.stringify({ country }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
```

Two details matter:
- `Cache-Control: no-store`, so a CDN never serves one visitor's country to another;
- the function **never decides an amount**. It only suggests a default currency. Prices always come from our backend.

**Time zone third,** as a fallback when the IP lookup is slow or fails (we give it 1.5 seconds). It's a weaker signal: plenty of people outside India set their clock to Indian time, and VPNs make IPs unreliable too. But as a third opinion it's useful.

**USD last,** because it's the most widely understood fallback for an international audience.

## Mistakes to avoid

**Converting prices live.** It's tempting to show `$4.99 × today's rate` in rupees. Don't. It produces ugly numbers like ₹417.34, the price changes daily, and it ignores that purchasing power is very different. We set rupee and dollar prices **separately**, as round numbers that make sense in each market.

**Trusting the client with the amount.** Detection runs in the browser, so anyone can change it. That's fine for which currency to show. It's not fine for how much to charge. The checkout amount is decided on the server from a fixed price list, for the chosen currency.

**Forgetting provider limits.** Our payment provider, Razorpay, has a minimum for dollar charges. Small items that are cheap in rupees still had to be at least $1. Check your provider's minimums before you design the price list, not after.

**Hiding the switch.** Auto-detection will be wrong for some people. If they can't fix it quickly, you've lost them. Our Upgrade page has a "Checkout currency" selector right at the top of the pricing options, so a wrong guess is a single change away.

**Storing guesses as choices.** This one is easy to miss. If you save the detected currency in the same place as the chosen currency, a wrong guess becomes permanent, and the user never sees the right price again. We keep the IP result in session storage only. Only an explicit choice goes in long-term storage.

## The other half: what you're charging for

Currency is only half the trust story. For a small product, people want to know they won't be surprised later:

- **Prepaid, no auto-renewal.** When a plan ends, it ends. Nobody gets charged again without choosing to.
- **A clear refund policy.** Ours: full refund on Pro within 7 days; Revival Fluid packs refunded within 7 days if unused; failed or duplicate charges always refunded.
- **The same product in both currencies.** Same features, same rules. Only the number and the symbol change.

## Testing it

Currency logic is easy to unit-test because it's a pure function of its signals. Our tests cover each step of the order, including:

- a link parameter beating both a stored choice and the IP country;
- a geo failure or timeout falling back to the time zone;
- detection never writing the stored choice;
- the geo endpoint being called once per session;
- storage being blocked (private browsing) without crashing;
- checkout refusing to continue if the server's amount or currency doesn't match what the page showed.

What's harder to test is the full checkout in each currency with a real provider. Do that with your provider's test mode before you launch, for both currencies.

## Summary

- Decide the currency from an ordered list: choice → IP country → time zone → default.
- Never let detection overwrite a choice.
- Set prices per market; don't convert live.
- Decide amounts on the server.
- Know your payment provider's limits.

This is the checkout behind Vigilante, our free browser game where GitHub-verified coding days rebuild a post-apocalyptic town. Pro is optional; the game is free.

[See Vigilante](https://myvigilante.ocix.in/?utm_source=ocix-blog&utm_medium=article&utm_campaign=t055&utm_content=currency)
