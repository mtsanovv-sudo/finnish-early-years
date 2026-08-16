/**
 * Project checks. Run: node tools/check.mjs
 *
 * These assert PROPERTIES, not field presence — a check that would still pass
 * when the answer is "no" is not a check. Each audit below is verified against
 * deliberate breakage in the self-test at the bottom.
 */

import {
  COMPETENCES, LEARNING_AREAS, AGE_BANDS, CONSTRAINTS,
  auditProvenance, auditBands, bandForAgeMonths, STRAND_COUNT
} from '../src/data/curriculum.js';
import {
  WORDS, CATEGORIES, auditWords, usableSounds, withSound, withoutSound,
  inCategory, notInCategory
} from '../src/data/wordbank.js';

import { auditPlaysets } from '../src/data/playsets.js';
import { ACTIVITIES, auditActivities, suggestionsFor, ACTIVITY_COUNT } from '../src/data/activities.js';

// NOTE: src/play.js cannot be imported here — it touches document and
// speechSynthesis at module scope. Its own auditPlay() runs in the browser.

let failures = 0;

function check (name, fn) {
  try {
    const problems = fn();
    if (problems && problems.length) {
      failures++;
      console.log(`FAIL  ${name}`);
      problems.forEach(p => console.log(`        ${p}`));
    } else {
      console.log(`ok    ${name}`);
    }
  } catch (err) {
    failures++;
    console.log(`ERROR ${name}: ${err.message}`);
  }
}

/* ---- structure matches the regulation ---- */

check('six transversal competences (§2.7)', () =>
  Object.keys(COMPETENCES).length === 6 ? [] :
    [`found ${Object.keys(COMPETENCES).length}, the source enumerates 6`]);

check('five learning areas (§4.5)', () =>
  Object.keys(LEARNING_AREAS).length === 5 ? [] :
    [`found ${Object.keys(LEARNING_AREAS).length}, the source groups them into 5`]);

check('every node cites a source and is bilingual', auditProvenance);

check('age bands are contiguous and honestly labelled', auditBands);

/* ---- bands actually place a child correctly ---- */

check('band placement is correct at real ages', () => {
  const cases = [
    [18, '1–2 years'], [36, '3 years'], [47, '3 years'],
    [48, '4 years'],   [53, '4 years'], [59, '4 years'],
    [60, '5 years'],   [72, '6–7 years (pre-primary)']
  ];
  return cases.flatMap(([months, expect]) => {
    const got = bandForAgeMonths(months);
    return (got && got.en === expect) ? []
      : [`${months} months → ${got ? got.en : 'no band'}, expected ${expect}`];
  });
});

/* ---- constraints have not drifted ---- */

check('constraints match the sourced values', () => {
  const p = [];
  if (CONSTRAINTS.dailyMovementMinutes.total !== 180) p.push('movement target is no longer 3h');
  if (CONSTRAINTS.childScreenMinutesDefault.ceiling !== 60) p.push('screen ceiling is no longer the WHO 1h');
  if (CONSTRAINTS.childScreenMinutesDefault.value > CONSTRAINTS.childScreenMinutesDefault.ceiling) {
    p.push('default screen time exceeds its own ceiling');
  }
  if (CONSTRAINTS.formalInstruction.allowed !== false) p.push('formal instruction got switched on');
  return p;
});

/* ---- word bank ---- */

check('every word is complete, bilingual, and starts with its stated sound', auditWords);

check('every game can actually be built from the word bank', () => {
  const p = [];

  ['bg', 'en'].forEach(lang => {
    // first-sound needs a target with ≥1 match and ≥2 non-matches
    const sounds = usableSounds(lang, 1);
    if (sounds.length < 4) p.push(`${lang}: only ${sounds.length} usable initial sounds`);
    sounds.forEach(s => {
      if (withSound(lang, s).length < 1) p.push(`${lang}: sound "${s}" has no word`);
      if (withoutSound(lang, s).length < 2) p.push(`${lang}: sound "${s}" has too few distractors`);
    });
  });

  // odd-one-out needs ≥3 in a category and ≥1 outside it
  Object.keys(CATEGORIES).forEach(cat => {
    if (inCategory(cat).length < 3) p.push(`category "${cat}" has fewer than 3 words`);
    if (notInCategory(cat).length < 1) p.push(`category "${cat}" has no outsiders`);
  });

  return p;
});

/* ---- playsets ---- */

check('emotions, shapes, colours and moves are complete', auditPlaysets);

/* ---- activity library ---- */

check('every activity is tagged, bilingual, and says what to look for', auditActivities);

check('daily suggestions are stable and always include movement', () => {
  const p = [];
  const day = '2026-08-16';

  // Same day + same band must give the same three, or the plan reshuffles
  // every time the app is opened.
  const a = suggestionsFor(day, 'b4', 3).map(x => x.id).join(',');
  const b = suggestionsFor(day, 'b4', 3).map(x => x.id).join(',');
  if (a !== b) p.push(`suggestions are not stable within a day: ${a} vs ${b}`);

  // Different days should generally differ, or every day looks identical.
  const other = suggestionsFor('2026-08-17', 'b4', 3).map(x => x.id).join(',');
  if (a === other) p.push('two different days produced an identical list');

  // Every day, in every band, must offer something that moves her.
  ['b1_2', 'b3', 'b4', 'b5', 'b6_7'].forEach(band => {
    for (let d = 1; d <= 28; d++) {
      const key = `2026-09-${String(d).padStart(2, '0')}`;
      const picks = suggestionsFor(key, band, 3);
      if (picks.length !== 3) p.push(`${band} ${key}: got ${picks.length} suggestions, wanted 3`);
      if (!picks.some(x => x.movement)) p.push(`${band} ${key}: no movement activity offered`);
    }
  });

  return p;
});

/* ---- the audits themselves must be able to fail ---- */

check('auditBands detects a mislabelled band', () => {
  const band = AGE_BANDS.find(b => b.id === 'b4');
  const real = band.months;
  band.months = [48, 53];                       // the bug that actually shipped
  const caught = auditBands().length > 0;
  band.months = real;
  return caught ? [] : ['auditBands is blind to a label/range mismatch'];
});

check('auditProvenance detects a lost citation', () => {
  const area = LEARNING_AREAS.L1;
  const real = area.src;
  delete area.src;
  const caught = auditProvenance().length > 0;
  area.src = real;
  return caught ? [] : ['auditProvenance is blind to a missing src'];
});

/* ---- coverage, reported rather than silently filled in ----
   suggestionsFor() falls back to the whole library when a band has no
   activities of its own. That keeps the app working, but it would let a band
   sit empty with every check green, so the real numbers get printed. */

console.log('\nactivities per learning area:');
['L1', 'L2', 'L3', 'L4', 'L5'].forEach(area => {
  const n = ACTIVITIES.filter(a => a.area === area).length;
  console.log(`  ${area}  ${String(n).padStart(2)}  ${'#'.repeat(n)}`);
});

const movers = ACTIVITIES.filter(a => a.movement).length;
const outdoor = ACTIVITIES.filter(a => a.outdoor).length;
console.log(`\nmovement: ${movers}/${ACTIVITY_COUNT} (${Math.round(movers / ACTIVITY_COUNT * 100)}%)` +
            ` · outdoor: ${outdoor}/${ACTIVITY_COUNT} (${Math.round(outdoor / ACTIVITY_COUNT * 100)}%)`);

console.log('\nactivities written for each band (0 = falls back to the whole library):');
AGE_BANDS.forEach(b => {
  const n = ACTIVITIES.filter(a => a.bands.includes(b.id)).length;
  console.log(`  ${b.id.padEnd(5)} ${String(n).padStart(2)}  ${b.en}${n === 0 ? '   <- no dedicated content' : ''}`);
});

console.log(`\n${STRAND_COUNT} strands · ${AGE_BANDS.length} bands · ${WORDS.length} words · ${ACTIVITY_COUNT} activities`);
console.log(failures ? `${failures} FAILED` : 'all checks passed');
process.exit(failures ? 1 : 0);
