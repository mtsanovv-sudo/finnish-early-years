# STEER — where this project is right now

**Last updated: 2026-08-16**

## What this is

An application implementing the **Finnish early-childhood (ECEC) methodology** to develop a
4-year-old's cognition. Bilingual Bulgarian + English. Delivered as an installable PWA on an
iPad (2019–2020).

It is **not** a kids' game app. The spine is the Finnish engine: the parent observes and
documents → those observations build the child's individual plan per learning area → the plan
generates activities, most of them **off-screen**. A bounded set of child-facing digital
games sits on top, behind a hard daily time cap.

## Read first, in this order

1. **`FINNISH_METHOD.md`** — ground truth. Every feature must trace to a line in it.
   Re-read the *source* (`sources/vasu-2022-en.txt`), not the summary, before specifying.
2. **`DECISIONS.md`** — what was decided and why. Append-only.
3. **`OPEN_QUESTIONS.md`** — what is still unknown. OQ1 and OQ2 are blocking.
4. **`PRODUCT_ROADMAP.md`** — build order.

## State

| Step | Status |
|---|---|
| Research from primary sources | ✅ done — Regulation OPH-700-2022 read and archived |
| Tracking docs | ✅ done |
| **0 · iPad capability probe** | ✅ done — reported and acted on (D7, D8, D9) |
| 1 · Curriculum data model | ✅ done — `src/data/curriculum.js` |
| 2 · PWA shell (bilingual, offline, installable) | ✅ done — needs on-device install test |
| 3 · Observation → plan loop | ⬜ next |
| 4 · Off-screen activity library | ⬜ |
| 5 · Child-facing games + daily cap | ⬜ |

**Step 1 as built:** 6 competences × 5 learning areas × 23 strands, bilingual, every node
carrying a `src` citation. Sourced material and our own constructions are separated by a
`src: 'DERIVED'` marker — the age bands are marked DERIVED because the regulation contains no
age-graded targets and inventing that precision would be the easiest error to make here.
`auditProvenance()` enforces it, and was verified against four deliberate breakages rather
than trusted for returning empty.

**Stack decision (2026-08-16):** plain ES modules, no build step. The app is modest, must run
offline on possibly-iPadOS-18 Safari, and deploys by copying files. A bundler adds risk and
buys nothing.

## The target device, measured (not assumed)

**iPad 6th generation, 2018** — a year older than believed. 9.7", **768×1024 pt @2x**, A10
Fusion, 2 GB RAM, permanently capped at **iPadOS 17.7.x**.

- **Build to Safari 17.** No newer API. The ceiling is fixed forever; nothing can move it.
- **Bulgarian speech works** — `Daria` (bg-BG), on-device, therefore offline. English has
  Apple's warmer character voices. Dedupe `getVoices()` on name+lang; it returns the list twice.
- **Install from Safari, never Chrome.** Only Safari makes a real standalone home-screen app,
  and storage is partitioned per browser.
- Storage quota 1.8 GB, unused. Capacity is a non-issue.
- Language must be an explicit in-app setting — the device reports `en-GB`, so locale
  detection would have silently made this an English-only app.

## Blocked on

- **OQ2** — hosting. Needs the user's explicit yes before anything is pushed publicly.
  Nothing else is blocked.

## Standing constraints — do not drift from these

- **Observed level, never age**, drives progression (`FINNISH_METHOD.md` §4)
- **≥3h daily movement** is a design target, not a footnote — the activity library is
  weighted toward it
- **Child screen time capped**, default ~15 min/day, parent-raisable (WHO ≤1h for ages 2–4)
- **No scores, streaks, leaderboards, or loss states.** Play has intrinsic value (§4.4)
- **No child data leaves the device.** Ever. (D5)
