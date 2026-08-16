# OPEN_QUESTIONS

Resolved questions move to `DECISIONS.md` with their answer. Nothing is deleted.

---

## ~~OQ1 — Does the iPad have a Bulgarian voice?~~ **RESOLVED 2026-08-16 → D8**
**Yes.** `Daria` (bg-BG, on-device) is present and played to completion. Live synthesis,
works offline, no recorded audio needed to ship. Full detail in `DECISIONS.md` D8.

One loose end, non-blocking: the probe log proves Daria *played*, not that she *sounded good
to a 4-year-old*. Worth the user's ear at some point. If Daria grates, the fallback is already
identified (parent-recorded prompts — `MediaRecorder` is available on the device).

## ~~OQ2 — Where does the app get hosted?~~ **RESOLVED 2026-08-16 → D11**
**GitHub Pages, public repo**, on the user's explicit instruction.
→ https://mtsanovv-sudo.github.io/finnish-early-years/

The code is public; **the child's data is not and never will be** — it lives only in the
iPad's IndexedDB, and `.gitignore` blocks backup files from ever being committed (D5).

Two privacy choices made while publishing, both reversible:
- Commits use `mtsanovv-sudo@users.noreply.github.com`, set **repo-locally**, so the real
  email address does not enter a public commit history and the global git config is untouched.
- The `gh` token's scopes were removed from this file before the first push. Operational
  detail about the user's machine, no reason for it to be public.

## OQ3 — How aggressively does iPadOS evict this PWA's storage?
**Measured 2026-08-16:** quota is **1843.2 MB, 0.0 MB used**. Capacity is a non-issue; the
question is purely *eviction*, which remains open.

Safari evicts data for sites unused for ~7 days. Home-screen-installed PWAs are generally
treated more favourably, but this is not guaranteed and Apple has changed it before.
**Mitigation is already mandatory regardless** (D5): export/backup the observation log.
Worth measuring on the real device once the app is installed — a year of documentation about
his daughter must not be destroyed by a cache policy.

## ~~OQ4 — Which exact iPad model?~~ **RESOLVED 2026-08-16 → D7**
**iPad 6th generation (2018)** — a year earlier than assumed. 9.7", 768×1024 pt, A10 Fusion,
2 GB RAM, permanently capped at **iPadOS 17.7.x**. Baseline is Safari 17 and is now fixed
forever. Full evidence table in `DECISIONS.md` D7.

## OQ7 — How long will a 2018 iPad stay viable for this?
New. It already receives no feature updates, only 17.7.x security patches, and Apple will stop
those eventually. Nothing to do today — the app is a static PWA with no native dependency, so
it will keep running on this device as long as the device boots, and it will move to any
replacement iPad by opening a URL. Worth revisiting only if Apple drops 17.7.x security
support while the daughter is still using it.

## OQ8 — Activity library has no content for bands `b1_2` and `b6_7`
`suggestionsFor()` falls back to the whole library when a band has nothing of its own, so the
app works — but a 1-year-old would be offered box-building and a 6-year-old would be offered
toddler content. Her band (`b4`) is fully covered, so this is not urgent; `tools/check.mjs`
prints per-band counts so it cannot become invisible.

Worth writing before she turns 6, or sooner if a younger sibling ever uses it.

## OQ5 — Does the daughter have any Cyrillic/Latin exposure already?
Affects where the L1 literacy ladder starts, and whether the two alphabets should be
introduced together or staged. Not blocking — the observation loop will answer it empirically
within a week of use, which is the Finnish answer anyway.

## OQ6 — Is anyone else caring for her day to day?
The curriculum treats documentation as a *shared* record (§3.3, cooperation with guardians).
If a second parent, grandparent or nursery is involved, multi-observer support changes the
data model. Deferred — single-observer is correct until told otherwise.
