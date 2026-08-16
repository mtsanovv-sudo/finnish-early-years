# PRODUCT_ROADMAP

Build order. Each step must be **fully functional on the real iPad** before the next starts —
no half-wired steps left behind.

---

## Step 0 — iPad capability probe ✅ shipped 2026-08-16
`tools/ipad-probe.html`. Measures Bulgarian speech availability, device baseline, offline and
install capability. Verified working on the dev machine before shipping (correctly detected a
real `bg-BG` voice), so a null result from the iPad means absence, not a broken instrument.

**Verify:** the report comes back with a voice list and a device UA. → resolves OQ1, OQ4.

## Step 1 — Curriculum data model ✅ done 2026-08-16
`src/data/curriculum.js`. 6 competences × 5 areas × **23 strands**, bilingual, every node
citing its §section. Age bands (**1–2 / 3 / 4 / 5 / 6–7**) carried as an explicitly flagged
`DERIVED` assumption (`FINNISH_METHOD.md` §7), used only to seed content before observations
exist. `tools/check.mjs` runs the audits — including two that break the audits on purpose to
prove they can fail.

## Step 2 — PWA shell ✅ done 2026-08-16
Installable, offline, bilingual BG/EN, relative paths, IndexedDB, backup/restore, speech,
and same-day movement logging. Verified in-browser at the real 768×1024 geometry.

**Still unverified — needs the actual device:** installed to the Home Screen from Safari and
opened in aeroplane mode. Cannot be proven from a desktop browser; do it on the iPad.

### Deploy protocol — not optional
**Bump `CACHE` in `sw.js` on every single deploy.** The app is cache-first (it has to be:
offline, and instant on a 2018 iPad). Changing that string is what makes the browser install
a new worker and drop the stale cache. Ship a change without bumping it and installed devices
keep serving the old build **with no visible symptom**. This already bit once during Step 2.

## Step 3 — Observation → plan loop  ← *the actual product*
Pedagogical documentation (§4.2) feeding the child's individual plan (§1.3), which drives what
comes next. Parent logs what she actually did and what held her attention; the app places her
per learning area from that evidence and proposes the next activities.

**Verify:** log a run of observations, confirm her placement **moves per area independently**
and that the proposed activities change as a result. A placement that does not move when the
evidence moves is a dead mechanism, however green the tests are.

## Step 4 — Off-screen activity library
Seeded, banded, covering all five learning areas, weighted toward physical activity
(≥3h/day target). Each activity: materials, duration, learning area + competence tags, and
**what to look for afterwards** — which is what feeds Step 3.

**Verify:** the library can fill a full week without repeating, and the movement share of
proposed time actually hits the target. Measure it; do not assume it.

## Step 5 — Child-facing games
Bounded set: phoneme↔grapheme matching (Cyrillic **and** Latin, authored separately),
number sense, classify/compare/rank, rhythm. Hard daily cap, default ~15 min, parent-raisable,
and **not bypassable by a 4-year-old**.

**Verify:** the cap holds against a determined child — app restart, clock change, reinstall.
Test it adversarially, because she will.

---

## Explicitly out of scope

Accounts · cloud sync · social features · any analytics · scores, streaks or leaderboards ·
notifications engineered for re-engagement · anything that makes the screen more attractive
than the floor.
