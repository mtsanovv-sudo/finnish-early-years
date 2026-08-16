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

console.log(`\n${STRAND_COUNT} strands · ${AGE_BANDS.length} bands`);
console.log(failures ? `${failures} FAILED` : 'all checks passed');
process.exit(failures ? 1 : 0);
