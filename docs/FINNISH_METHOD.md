# FINNISH_METHOD — ground truth

**Read this before any build, spec, or answer in this project.**

Everything the app does must trace to a line here, and every line here must trace to a
primary source. An uncited claim is unsourced by default.

## Primary source

- `docs/sources/vasu-2022-en.pdf` — **National core curriculum for early childhood
  education and care**, Regulation **OPH-700-2022**, Finnish National Agency for Education.
  69pp, English. This is the binding regulation for Finnish ECEC, ages 0–6.
- `docs/sources/vasu-2022-en.txt` — extracted plain text of the same, for grepping.
  Page markers `=== PAGE n ===` are **PDF** pages; the printed page number is n−1.

Section numbers below (§) refer to that document. Re-read the source, not this summary,
when specifying anything.

---

## 1. What Finland actually is, and is not

Finland's *school* system is no longer the world leader the popular claim assumes.
PISA 2022: maths **484** (−23 vs 2018, **−64 vs the 2006 peak of 548**), reading **490**
(−30), science **511**. Still above OECD average, but declining faster than the OECD mean,
and the fall runs continuously from 2012.

What is *not* discredited is **ECEC, ages 0–6** — the play-based model this project copies.
Scope discipline: **we are replicating Finnish early childhood education, not "the Finnish
education system."** Any claim sourced to Finnish *basic* or *secondary* schooling is out of
scope and must not be used to justify a feature.

## 2. The conception of learning (§2.5)

The load-bearing paragraph, quoted:

> "Learning is holistic and occurs everywhere."

Children learn "by playing, moving, exploring, working on different assignments, and
expressing themselves." Previous experiences, interests and competences "are the starting
point for learning." Children "learn best when they are feeling well and secure."

**Consequences for the app:** content is selected from the child's observed interests, not
from a fixed syllabus. Emotional safety outranks progression. No failure states.

## 3. The grid — 6 transversal competences × 5 learning areas

### Transversal competences (§2.7)

Six, explicitly enumerated in the source:

| # | Competence | Core of it |
|---|---|---|
| T1 | Thinking and learning | Wonder, insight, questioning, persevering through failure, **directing and maintaining attention**. Daily physical activity is named as supporting this. |
| T2 | Cultural competence, interaction, self-expression | Listening, perspective-taking, constructive conflict resolution, good manners, cultural identity |
| T3 | Taking care of oneself and managing daily life | Dressing, eating, hygiene, safety, **expressing and regulating emotions**, naming emotions |
| T4 | Multiliteracy | Interpreting and producing messages. Explicitly includes **visual, numerical, media and basic literacy** |
| T5 | Digital competence | Understanding digitalisation; using digital tools "in documentation, play, interaction, games, exploration, physical activity and artistic experience" |
| T6 | Participation and involvement | Being heard, initiative, planning/implementing/evaluating activities *with* the adult |

### Learning areas (§4.5)

Five. The source states they are **not** separate subjects: "Rather than being independent
entities that are implemented separately, the themes of the learning areas are combined and
applied according to the children's interests and competence."

| # | Area | What §4.5 puts inside it |
|---|---|---|
| L1 | Rich world of languages | Interaction skills · comprehension · speech production · language use · **linguistic memory and vocabulary** · language awareness. Attention moves from word *meaning* → *form*: "words, syllables, and phonemes". "Children are encouraged to playful writing and reading." |
| L2 | Diverse forms of expression | **Music** (basic beat, rhythm in words, duration/volume/timbre, body percussion) · **visual** (colour, shape, material, interpreting images) · **crafts** (moulding, cutting, sewing — fine motor, structures, planning) · **verbal & bodily** (drama, dance, play) |
| L3 | Me and our community | Ethical thinking (friendship, right vs wrong, justice, causes of fear/sadness/joy) · worldviews · past/present/future of the community · **media education** including source and media criticism |
| L4 | Exploring & interacting with my environment | **Mathematical thinking** (classify, compare, rank, find regularities and change; number concept; number sequencing via rhyme; measuring; location and relation concepts; spatial/plane perception; geometric thinking via building and clay; time concept via day and season) · **environmental education** (learning *in*, *about*, and *acting for* the environment) · **technology education** (experimental and inquiry-based; build, test, explain) |
| L5 | I grow, move, and develop | Physical activity · **fundamental movement skills: balance, locomotor, manipulative** · food education · health · safety |

## 4. The engine — the part no consumer app implements

This is what the app is actually for.

**Pedagogical documentation (§4.2) → the child's own ECEC plan (§1.3) → next activities.**

Every Finnish child has an individual plan built from documented observation of what that
child actually did and was interested in. The personnel "must observe and document the
children's play"; observation "increases the personnel's understanding of children's
thoughts and interests as well as their emotions and experiences," and "the observations are
used in planning and guiding play and other activities."

**Consequence:** progression is driven by **observed level per learning area**, never by age.
A 4-year-old may sit at the 6-year band in L1 and the 3-year band in L2 fine motor. Any
age-graded design contradicts the source.

## 5. Play (§4.4)

> "Play is the key working method in ECEC."

Critically, play is **not** framed as a delivery mechanism for content: "while children learn
by playing, they do not personally see play as a vehicle for learning." "For the child, the
significance of play lies in the play itself." "Play makes it safe to experiment, try and fail."

**Consequence:** activities must be playable for their own sake. Anything that reads as a
lesson wearing a costume is a fidelity failure.

## 6. Hard constraints the app must respect

| Constraint | Value | Source |
|---|---|---|
| Daily physical activity | **≥3 hours**, of which ≥1h moderate-to-vigorous, for under-8s. Slogan: *"Joy, play and doing together"* | Finnish national recommendations 2016 (Ministry of Education and Culture) |
| Sedentary screen time, ages 2–4 | **≤1 hour/day**, less is better | WHO 2019 guidelines |
| Formal reading / maths instruction | **Not before school at 7.** Pre-primary (*esiopetus*) at 6 is compulsory but still not formal instruction. Letters approached via "playful writing and reading" | §4.5; Finnish school-start law |
| Outdoor time | Encouraged "during all seasons" | §4.5 L5 |

Despite no formal instruction, ~30% of Finnish children in one longitudinal cohort were
already reading before school at 7, and a further 43% were emergent readers. **Readiness, not
drilling.**

## 7. Age bands — a deliberate caveat

The core curriculum sets **no age-graded targets**. It is one continuous 0–6 framework applied
"according to the children's interests and competence." The age structure in Finland is
*institutional*, not pedagogical:

```
ECEC 0–5  →  pre-primary (esiopetus) at 6, compulsory  →  school at 7
```

The bands this project uses — **1–2 / 3 / 4 / 5 / 6–7 years** — are therefore an
**explicit engineering assumption**, not a Finnish specification. (Single-year bands from 3
upward, after an earlier paired scheme labelled a 4-year-5-month-old as "3–4 years"; a band
must cover exactly what its label claims, and `auditBands()` now enforces that.) They exist only to seed
content selection before enough observations exist to place the child per area. Once
observations exist, the observed level wins. This is flagged as an assumption because
inventing a precision the source does not have is the easiest error to make here.

## 8. Digital, per the source (§2.7 T5, §4.4)

Finland does *not* forbid screens. It specifies their role: digital tools are used
"in documentation, play, interaction, games, exploration" — with an adult, as one material
among many. Personnel "guide children in versatile, responsible, and safe use."

The one Finnish-built, state-funded child-facing digital artifact is **GraphoGame / Ekapeli**
(Univ. of Jyväskylä, Heikki Lyytinen), free to every Finnish child since 2008.

**Honest evidence note:** a meta-analysis across 19 GraphoGame studies found the average gain
in word-reading fluency **close to zero**, with positive effects concentrated in *at-risk*
readers and in reading-related sub-skills rather than fluency. We borrow its adaptive
phoneme→grapheme mechanic. We do not claim its outcomes, and it is not the core of the product.

## 9. What this rules out

Stated plainly so it is not quietly re-litigated later:

- ❌ A solo tablet game the child plays unattended for an hour
- ❌ Age-graded levels that advance on birthday rather than observation
- ❌ Formal reading/arithmetic drilling for a 4-year-old
- ❌ Scores, streaks, leaderboards, loss states, or engagement-maximising loops
- ❌ Any claim that this replicates "the best school system in the world" (see §1)
