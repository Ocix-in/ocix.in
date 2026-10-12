---
{"title": "How to read your GitHub contribution graph honestly", "description": "Read your GitHub contribution graph honestly: what counts, what it misses, and three useful numbers for your next project.", "publishedAt": "2026-10-12", "author": "Vishal Pandey", "status": "published"}
---
The green squares on your GitHub profile are probably the most-looked-at chart in software. People screenshot them, judge themselves by them, and occasionally fake them. Most of us never stop to ask what they actually measure.

This post is a practical guide to reading your own graph honestly. The aim isn't to make it look better. It's to learn something true about how you work.

## What the graph counts

The graph shows **contributions** per day. Commits are one kind, but not the only kind. Opening issues and pull requests and reviewing pull requests can count too.

Commits come with conditions. Broadly, a commit only shows up if:

- it was made with an email address that's linked to your GitHub account;
- it landed on the repository's default branch (or `gh-pages`);
- the repository isn't a fork.

And private work only appears if you've turned on showing private contributions, and then only as anonymous counts.

GitHub's [profile contributions reference](https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference) has the full criteria, including repository participation requirements. If a qualifying commit is missing, its [troubleshooting guide](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/troubleshooting-missing-contributions) explains what to check and notes that the graph can take up to 24 hours to update. The main point is that **missing squares don't always mean missing work**. If you've ever wondered why a busy week looks empty, check your commit email and which branch you were working on.

## What it can't tell you

Even when it counts everything correctly, the graph has blind spots:

- **Size.** One square can be a typo fix or a 2,000-line feature.
- **Quality.** A good day and a messy day can look identical.
- **Work outside GitHub.** Design, reading, mentoring, planning, interviews and work in other tools don't show.
- **Context.** A gap might be a holiday, exams or an illness. It might be a project that died. The graph can't tell the difference. You can.

And the colour scale is relative: a dark square means a busy day *for you*, not compared with anyone else.

So the graph is a poor tool for comparing yourself with other people. It's a much better tool for comparing yourself with **yourself**.

## The three numbers worth looking at

Instead of "how green is it?", look at three things over the last 30 days.

### 1. Active days

How many of the last 30 days had at least one contribution? This is your consistency number. It's more honest than total commits, because a 40-commit Saturday counts as one day.

### 2. Longest streak

The longest run of consecutive active days. This tells you what you're capable of when things are going well.

### 3. Longest gap

The longest run of days with *nothing*. This is the number most people never look at, and probably the most useful one. Side projects rarely die from a lack of good days. They die in the gaps. A recurring two-day gap and an unexplained twelve-day gap deserve different questions. Neither tells you on its own whether the project is healthy.

You can count these by hand from your graph. Or, for any public profile, our free [GitHub check-up](https://vigilante.ocix.in/audit?utm_source=ocix-blog&utm_medium=article&utm_campaign=t055&utm_content=contribution-graph) shows active days, longest streak and longest gap for the last 30 days, without signing up. It also has a Roast tab if you'd like the honest version delivered with less tact.

## Patterns to look for

When you look at your graph with those three numbers in mind, a few common shapes show up.

**The weekend warrior.** Dense on Saturdays and Sundays, empty on weekdays. Lots of total work, but a five-day gap every week. Each weekend starts with an hour of remembering where you were. Fix: a tiny weekday floor, even one 15-minute commit.

**The burst and fade.** A bright two-week block, then grey for a month, then another burst. Usually a new-project high followed by a stall. Fix: when a burst is ending, cut the next step down to something tiny, so there's no gap to fall into.

**The steady but light.** Lots of pale squares, rarely dark ones. This is actually a great base. Steady beats intense. If you want more output, raise your normal day; don't touch the habit.

**The holiday cliff.** A sharp stop at a holiday, and it never quite restarts. A break was planned; the restart wasn't. Fix: plan the first day back before you leave.

## Faking it isn't worth it

There are scripts that fill your graph with backdated commits. Some people do it for a laugh; some do it because they think someone will judge them by it.

It's worth being honest about the trade-off. A fake graph might look good to someone glancing at your profile. But it destroys the one thing the graph is good for: telling *you* the truth about your habits. And anyone who looks closely at your repositories will see what's behind the squares.

## Turning the graph into a habit

Reading your graph honestly is a good start. Changing it is a habit question:

1. Pick one project.
2. Set a floor: one real commit a day.
3. Watch your **longest gap** shrink, not your total grow.

That's the idea behind Vigilante, the GitHub-verified daily habit game we build at OCIX. You set a daily commit target on one repo, GitHub's push events verify each day, and every verified day helps rebuild a small post-apocalyptic town. The town is our way of making the gaps visible on the day they happen, not three weeks later on your graph.

👉 [Try Vigilante free](https://myvigilante.ocix.in/?utm_source=ocix-blog&utm_medium=article&utm_campaign=t055&utm_content=contribution-graph)

Or start with the numbers: [run the free check-up](https://vigilante.ocix.in/audit?utm_source=ocix-blog&utm_medium=article&utm_campaign=t055&utm_content=contribution-graph-2).
