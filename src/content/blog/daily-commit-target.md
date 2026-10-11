---
{"title": "How to set a daily coding target you'll actually keep", "description": "Most daily coding goals fail because they're sized for your best day. How to set a commit target you'll still hit on your worst one, with examples.", "publishedAt": "2026-10-11", "author": "Vishal Pandey", "status": "published"}
---
Most daily goals are written on a good day. You've just had a great session, you feel unstoppable, and you write down "2 hours of coding every day" or "5 commits a day". A week later you're failing it on purpose because it feels too big to start.

A daily target isn't a description of your best day. It's a promise you'll keep on your **worst** day. This post is about sizing that promise.

## The two-number rule

Every daily goal needs two numbers, not one:

- **The floor:** the smallest thing that still counts. You do this every day, no exceptions.
- **The normal:** what a regular day looks like. You aim for it, but missing it isn't failure.

The mistake almost everyone makes is to set only the normal and call it the target. Then every bad day becomes a missed day, and missed days are what end habits.

The floor should be so small it feels almost silly. For a coding habit, a good floor is **one real commit**: one bug fixed, one test written, one function cleaned up. It takes 15 minutes on a hard day, and it keeps the project in your head.

## Why commits, not hours

Hours are the most common daily coding target, and they have two problems.

**Hours are easy to fake, even to yourself.** An hour with the editor open while you scroll Twitter is still "an hour". After a few weeks of that, the target means nothing.

**Hours ignore what matters.** Forty focused minutes that ship a fix are worth more than two distracted hours that ship nothing.

A commit is a better unit. It's a finished, saved, named step. You can't make one by thinking about your project; you have to change something. And if you push it to GitHub, it leaves a record you can check later.

Commits aren't perfect. A commit can be tiny, and some valuable work, like reading, reviewing or design, never produces one. But for a daily habit, "did something real change today?" is the right question, and commits answer it.

## Sizing your target

Here's a simple way to pick your numbers.

**1. Look at your last 30 days honestly.** How many days did you push anything at all? What's your longest gap? (If your profile is public, our free [GitHub check-up](https://vigilante.ocix.in/audit?utm_source=ocix-blog&utm_medium=article&utm_campaign=t055&utm_content=daily-target) shows active days, longest streak and longest gap for the last 30 days.)

**2. Set the floor from your bad days, not your good ones.** If you pushed on 8 of the last 30 days, a target of 3 commits every day is a fantasy. Start with 1.

**3. Set the normal from your average good day.** If a good session gives you 3–4 commits, your normal is 3.

**4. Commit to the floor only.** Tell yourself, and any tool you use, the floor. Track the normal privately, or not at all.

- **Pushed on fewer than 10 days:** floor of 1 commit, normal of 1–2 commits.
- **Pushed on 10–20 days:** floor of 1 commit, normal of 2–3 commits.
- **Pushed on 20+ days:** floor of 1–2 commits, normal of whatever you already do.

Notice the floor barely changes. Even people who code daily benefit from a floor of one. It's what keeps the streak alive through a sick day.

## Make "one commit" mean something

A floor of one only works if that one commit is real. Decide in advance what doesn't count. A reasonable line:

- ❌ README or docs-only changes;
- ❌ empty commits (`git commit --allow-empty`);
- ❌ merge commits;
- ❌ committing only a lock file;
- ✅ any change to real code, however small.

This is exactly the line Vigilante uses to verify a day, and it's a good rule even if you track things on paper. The point is to decide while you're fresh, not argue with yourself at 11:55 pm.

## Make the commits smaller

If one commit feels like a lot on a bad day, the problem is often commit size, not the target. Big commits ("feat: whole auth system") take a whole evening. Small ones ("add token expiry check") take 15 minutes.

Some ways to make your work commit-sized:

- **Split features into steps you can name.** If you can't write the commit message before you start, the step is too big.
- **Leave yourself a next step.** End each session with a `TODO(next):` comment at the exact line where tomorrow starts.
- **Keep a "small fixes" list.** On low-energy days, take one item off it: a rename, a test, a type.

## Pick your day boundary

"Daily" sounds obvious until you commit at 12:40 am. Is that today or yesterday?

Decide once:

- If you work late, consider a day that's measured in **your** time zone, not UTC. A tool that counts days in UTC will split your late-night sessions into the wrong day.
- If you know a day will be impossible, plan around it in advance. For example, Vigilante lets you choose to start a new goal **tomorrow** instead of today, so you don't begin with a near-certain miss.

## Start lower than you think

For my own 100 days I used a target of one commit a day, and I wouldn't change it.

The best daily target is boring. It's small enough that you never seriously consider skipping it, and it leaves room for good days to be as big as they want.

In Vigilante you can set anything from 1 to 20 commits a day. Most people should pick 1.

[Set your first target on Vigilante, free](https://myvigilante.ocix.in/?utm_source=ocix-blog&utm_medium=article&utm_campaign=t055&utm_content=daily-target)
