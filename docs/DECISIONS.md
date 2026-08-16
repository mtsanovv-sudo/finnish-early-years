# DECISIONS

Append-only. Never overwrite an entry — mark it superseded in place, with the reason.

---

## D1 — Replicate Finnish **ECEC (0–6)**, not "the Finnish education system"
**2026-08-16.** Finland's PISA scores fell from 548 (maths, 2006) to 484 (2022); the popular
"best in the world" claim is stale for its *school* system. Its early-childhood model is the
part that remains world-class and is the part relevant to a 4-year-old.
**Consequence:** no feature may be justified by evidence from Finnish basic or secondary
schooling. See `FINNISH_METHOD.md` §1.

## D2 — The app is a **parent engine first**, child games second
**2026-08-16.** User chose options 1 **and** 2 from the balance fork. Interpretation, stated
explicitly so it can be corrected: build the **full parent-side engine** (observation →
individual plan → activity generation, mostly off-screen) **and** the **full child-facing
game set**, with a hard configurable daily cap that **defaults conservative (~15 min)** and
can be raised toward the hybrid split.
**Rationale:** a solo-tablet design would build the exact mechanism implicated in the decline
the user is worried about (reduced free play, fragmented attention), and would violate WHO's
≤1h/day for ages 2–4. Configurable cap lets the user move the balance without a rebuild.

## D3 — Bilingual Bulgarian + English
**2026-08-16.** User's choice. The curriculum explicitly supports simultaneous multilingual
acquisition (§4.5 L1, §4.6).
**Consequence:** roughly doubles audio and literacy content. Literacy content is **not**
translatable — Cyrillic and Latin grapheme→phoneme mapping are separate ladders that must be
authored independently. Bulgarian orthography is relatively transparent (helps); English is
opaque (needs a slower, more explicit ladder).

## D4 — Delivered as an installable **PWA**, not a native iOS app
**2026-08-16.** Target device is an iPad from 2019–2020.
- Native iOS requires a **$99/yr Apple Developer Program** membership for any durable install.
- Free-Apple-ID sideloading (AltStore/Sideloadly) expires certificates every **7 days** —
  unusable for a child's daily app.
- Xcode free provisioning needs a Mac; the user is on Windows 11.
- A PWA installs to the home screen from Safari, runs full-screen and offline, costs nothing,
  and needs no Mac and no App Store review.

~~**Device baseline:** worst case is iPad 7th gen (max iPadOS 18.7.9); best case iPad Air 3
(26.4) / iPad 8 (26.3). **Target Safari 18+**.~~
**SUPERSEDED 2026-08-16 by D7** — the assumed model range was wrong. Measured, not assumed.

## D5 — All child data stays **on the device**
**2026-08-16.** The observation log is a record of a named 4-year-old. No server, no sync,
no analytics, no third-party calls. Data lives in on-device storage; the parent can export it
to a file they control.
**Consequence:** child data must never enter the git repo. Storage eviction is therefore a
real data-loss risk (see OQ3), so **export/backup is a launch requirement, not a nice-to-have.**

## D6 — Audio architecture deferred until the device is measured
**2026-08-16.** Whether Bulgarian text-to-speech exists on that specific iPad is unknown and
was **not** resolvable from documentation. Built `tools/ipad-probe.html` to measure it rather
than assume. Detection logic verified working on the dev machine (correctly found
`Microsoft Ivan – bg-BG`), so a null result from the iPad will mean *absence*, not a broken probe.
~~**Blocked until the probe report comes back.**~~ **RESOLVED by D8.**

---

## D7 — The device is an **iPad 6th generation (2018)**, capped at iPadOS 17
**2026-08-16.** The user believed it was a 2019–2020 model. The probe says otherwise, and the
measurement wins. Evidence from the report:

| Signal | Value | What it rules out |
|---|---|---|
| Screen | **768×1024 pt @2x** (2048×1536 px) | Not iPad 7th/8th gen (810×1080 pt), not Air 3 (834×1112), not Air 4 (820×1180). This is the 9.7" chassis. |
| OS | **iPadOS 17.7.11** | Rules out iPad 5th gen / Air 2 (capped at 15–16). |
| CPU cores | **4** | A10 Fusion (4 cores), not A12 (6). |

⇒ **iPad 6th gen, 2018, A10 Fusion, 2 GB RAM, 9.7", 264 ppi.** Apple's support ceiling for it
is **iPadOS 17.7.x** — it will *never* receive 18.

**Consequences, all binding:**
- **Target Safari 17**, not 18. Do not use any API newer than that.
- Design to **768×1024 points, 4:3 portrait**. Not the 10.2"/10.9" geometries.
- 2 GB RAM and a 2018 SoC: keep animation cheap, avoid large in-memory media, prefer CSS
  transforms over JS-driven layout. The child must never wait on a spinner.
- The device is at its final OS. The baseline is now **fixed forever** — which is actually a
  gift: no future OS can move it.

## D8 — Bulgarian audio via **live speech synthesis**; no recording needed
**2026-08-16. Resolves OQ1.** The probe found **`Daria` (bg-BG, on-device)** and the playback
test completed (`requested → started → finished playing`). On-device means it works offline,
which the app requires.

- Bulgarian: one voice, `Daria`, neutral.
- English: many, including Apple's characterful set (`Grandma`, `Grandpa`, `Flo`, `Eddy`,
  `Rocko`, `Shelley`, `Reed`, `Sandy`) — better suited to a 4-year-old than a newsreader voice.
- **Asymmetry noted:** English gets warmth, Bulgarian gets one neutral voice. `MediaRecorder`
  is available (probe confirms), so *optional later polish* is letting the parent record his own
  voice for the most-repeated Bulgarian prompts — which is more faithful to §4.5 L1 anyway
  (the adult as language model). Not needed to ship.
- **Implementation note:** `getVoices()` returned **186 entries with the list duplicated** —
  `Daria` appears twice. Voice selection must dedupe on `name + lang`.
- System language is `en-GB`, yet `bg-BG` synthesis works regardless. So **language choice must
  be an explicit in-app setting, never inferred from `navigator.language`** — locale detection
  would have silently defaulted this app to English-only.

## D9 — Install from **Safari**, not Chrome
**2026-08-16.** The probe's user agent shows `CriOS/148` — the report was produced in **Chrome
for iOS**. On iOS every browser is WebKit underneath, but only **Safari** can add a real
standalone web app to the Home Screen; Chrome's equivalent yields a degraded shortcut, and
storage is partitioned per browser, so a PWA installed from Safari cannot see data written
under Chrome.

**⇒ The install, and all subsequent use, must happen in Safari.** Worth stating in the app's
own setup instructions, because this is exactly the mistake a person makes once and then
cannot diagnose. The app's Settings screen says so directly.

**Related scare, checked and dismissed:** one source claimed Apple removed standalone PWA
support in the EU under the DMA — which would matter, Bulgaria being in the EU. Apple
announced that in Feb 2024 and **reversed it on 2024-03-01**; home-screen web apps shipped
intact in iOS 17.4. This device runs 17.7.11 > 17.4, so **standalone PWAs work normally here.**
The claim was stale. Verified rather than propagated.

## D10 — Cache-first, and `CACHE` in `sw.js` gets bumped on every deploy
**2026-08-16.** The app serves from cache first: it must work offline, and it must open
instantly on a 2018 A10. The cost is that a deployed change is invisible to a device that
already installed the app unless the worker itself changes.

**So the deploy protocol is: bump the `CACHE` string in `sw.js`, every time.** That is what
makes the browser install a new worker, re-precache, and delete the old cache.

This bit during Step 2 and is worth recording because the failure is silent — the app looked
fine and served a stale module. Two contributing faults, both fixed:
1. `event.waitUntil()` was being called from inside a `.then()`, after the event had stopped
   accepting lifetime extensions, so the background revalidation was dropped on the floor.
   The network request is now started and handed to `waitUntil` during dispatch.
2. No `registration.update()` on launch, so a new worker could sit unnoticed for days on a
   device that is opened and closed each morning. Now called on every boot.

**Diagnostic note worth keeping:** the first attempt to measure this read the file with
`fetch()` *from the page*, which the service worker intercepts — so it compared the cache
against itself and reported the server as stale. Reading the real server needed a URL the
worker had never cached. The instrument was inside the thing being measured.
