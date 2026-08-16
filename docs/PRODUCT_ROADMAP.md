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

## Step 4 — Off-screen activity library ✅ done 2026-08-16
`src/data/activities.js` — **38 activities**, all five areas, every one carrying materials,
duration, area/strand tags and **what to look for afterwards** (the input to Step 3).

Measured rather than asserted — `tools/check.mjs` prints the real distribution:

```
L1  7 · L2  7 · L3  6 · L4  8 · L5 10
movement 21/38 (55%) · outdoor 16/38 (42%)
```

Three suggestions a day, **deterministic on the date** so the list does not reshuffle every
time the app is opened, and **at least one always moves her** — enforced, not hoped for,
because "weighted toward movement" is not the same as "guaranteed on a rainy Tuesday".

**Known gap, reported not hidden:** bands `b1_2` and `b6_7` have **no dedicated activities**;
they fall back to the whole library. Her band (`b4`) has all 38. The check prints per-band
counts so this cannot quietly become invisible.

## Step 5 — Child-facing games ✅ done 2026-08-16 (moved ahead of steps 3–4, see D12)
Four games in `src/play.js`, each naming its strand: first sound (L1f), how many (L4b),
odd one out (L4a), beat (L2a). Bilingual, fully spoken, no scores or fail states.
Picture content is emoji (`src/data/wordbank.js`), with initial sounds stored per language
because they do not survive translation.

**Verified adversarially, since she will be:**
- 3 seconds of allowance left → game starts, expires mid-play to "Стига за днес", sent outside
- Today's button then disabled; forcing a click gives no games
- **Relaunching the app does not restore time** — the cap is stored per local date, not per session
- Persisted total lands exactly on the cap, never past it
- Tapping every card gives exactly one right and the rest a nudge — no fail class anywhere
- Exiting mid-round no longer lets a stale timer repaint the game (D13)

**Still unverified — needs the real device:** how it feels in a four-year-old's hands, and
whether `Daria` is pleasant to listen to for ten minutes at a stretch.

---

## Explicitly out of scope

Accounts · cloud sync · social features · any analytics · scores, streaks or leaderboards ·
notifications engineered for re-engagement · anything that makes the screen more attractive
than the floor.
