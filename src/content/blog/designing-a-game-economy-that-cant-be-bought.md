---
{"title": "Designing a game economy that money can't buy", "description": "How we designed a habit game where money, ads and logging in can never buy progress, with the actual reward numbers and the trade-offs behind them.", "publishedAt": "2026-10-10", "author": "Vishal Pandey", "status": "published"}
---
Most free-to-play games make money by letting you skip the work. Pay to build faster, pay to skip the wait, pay for the rare item. That's a fine business model for a game whose point is fun.

It's a terrible model for a habit game. If Vigilante's point is that your town reflects real coding days, then the moment you can buy a coding day, the town stops meaning anything, for you and for anyone you show it to.

So we started from one rule and designed everything else around it.

## The rule

**Real, GitHub-verified work is the only thing that creates progress.**

"Progress" has a precise meaning in our game. These come **only** from verified days:

- verified days themselves, and your streak;
- the daily supply crate;
- levels and XP;
- chapter progress in the story.

Ads, payments, logins, taps and time spent in the app never grant any of them. That rule is written down as a founder decision, and every feature is checked against it.

## What a verified day is worth

When GitHub confirms you've hit your daily commit target, you get a supply crate. As of writing:

- **Materials:** 100 base, plus a bonus of 0–50;
- **streak multiplier:** ×1.0 for days 1–2, ×1.2 from day 3, ×1.5 from day 7;
- **XP:** 25.

So a verified day in a long streak is worth between 150 and 225 Materials.

Two design choices hide in there:

**The bonus is deterministic.** It's computed from your account and the date, not rolled when you open the crate. You can't reroll it, and opening the crate twice doesn't change it. A random-looking surprise without a slot machine.

**The multiplier rewards consistency, not volume.** Ten commits don't earn more than your target. Showing up for the seventh day in a row does. That's the behaviour we want to encourage.

## The hard part: rewarding people who didn't code today

A pure "work only" economy has a problem: on a day you don't code, the game has nothing for you. You open it, see nothing to do, and close it. A few of those days and you stop opening it, which is exactly when you most need the reminder.

So we made one deliberate exception, and sized it carefully.

**A daily check-in** gives a small bundle of Materials for opening the game, even on a day with no commits. There's a 7-day calendar with a bigger reward on day 7.

**Daily missions** (three small in-game tasks) give a small bundle when all three are done.

The numbers, as of writing:

- Daily check-in, days 1–6: 10 Materials. Needs code: No.
- Daily check-in, day 7: 30 Materials. Needs code: No.
- All 3 daily missions: 15 Materials. Needs code: No.
- **Verified-day crate**: **100–225** Materials. Needs code: **Yes**.

On a typical day, logging in and doing everything else earns 25 Materials. One verified day earns at least 100, and up to 225 in a streak. **Real work is worth four to nine times more than just playing.** And the check-in never counts as a verified day, never touches your streak, never gives XP and never moves the story forward.

That's the balance we were after: enough reward to keep you connected on a bad day, never enough to replace the work.

## Missing a day without buying your way out

The most tempting place to sell progress is the missed day. "Pay to restore your streak" is a proven business. We do sell something here, so it's worth being precise about what.

**Revival Fluid** repairs a missed day. The repaired day is marked as mended. It does **not** count as a verified day and does **not** earn that day's crate. You're paying (or playing) to protect your run, not to pretend you coded.

And you don't have to pay at all. Free players can **earn** one Revival Fluid a month by playing: finishing the 7-day check-in calendar, or completing certain mission stages. We originally considered letting people watch an ad to get one. We decided against it until we can verify ad completions on our own server. An ad view the client could fake would quietly break the economy.

## What Pro actually buys

Pro is the paid plan, and it was the easiest place to break the rule. Here's what it includes that touches the game:

- **2× build speed:** buildings finish upgrading sooner;
- **2 Revival Fluid a month;**
- extras like premium share-card designs and a second repo per goal.

What it doesn't do: it never adds verified days, never increases your crate, and never changes how much a day of real work earns. A Pro player and a free player with the same verified days have earned the same Materials. Pro only spends them faster, more comfortably, or more prettily. (A second repo doesn't change earnings either: verified work still earns once per day.)

## The trade-offs we accepted

This design costs us things, and it's worth naming them:

- **Less revenue per user.** We can't sell the things free-to-play games sell best.
- **Slower progress for people who can't code daily.** Someone on a hard month will see their town grow slowly, and the only real fix is coding.
- **A check-in that some people will see as "cheating" the rule.** We think it's the right exception, sized so it can't matter much. Reasonable people could disagree.

## Why it's worth it

A habit game only works if the reward means something. When your town has a Radio Tower, it should be because you showed up for your project on enough days to build one. Not because you had a spare ₹100, and not because you tapped a button every morning.

If you'd like to see the economy in action, it's free to play. Every crate in it was earned by a push.

[Play Vigilante](https://myvigilante.ocix.in/?utm_source=ocix-blog&utm_medium=article&utm_campaign=t055&utm_content=economy)
