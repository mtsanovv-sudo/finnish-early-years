/**
 * Child-facing play.
 *
 * Rules this module exists to enforce, all from docs/FINNISH_METHOD.md:
 *  - No scores, no streaks, no stars, no loss states. "For the child, the
 *    significance of play lies in the play itself." A wrong tap gets a warm
 *    answer and another go, never a buzzer.
 *  - She cannot read. Every instruction is spoken; text on screen is for the
 *    adult sitting next to her.
 *  - A hard daily cap she cannot get around, defaulting well under the WHO
 *    ceiling of 1h for ages 2–4.
 *  - When time is up the app sends her outside. That is not a consolation
 *    message; it is the actual Finnish recommendation (≥3h of movement a day).
 *
 * Each game names the curriculum strand it serves. If a game cannot name one,
 * it does not belong here.
 */

import * as store from './store.js';
import * as speech from './speech.js';
import { LANGS, getLang } from './i18n.js';
import {
  WORDS, CATEGORIES, NUMBER_WORDS, usableSounds, withSound, withoutSound,
  inCategory, notInCategory, sample, shuffle, auditWords
} from './data/wordbank.js';
import {
  EMOTIONS, SHAPES, COLOURS, MOVES, shapeSvg, auditPlaysets
} from './data/playsets.js';

/* ============================ text ============================ */

export const PLAY_TEXT = {
  title:        { bg: 'Игри',                  en: 'Play' },
  choose:       { bg: 'Какво да поиграем?',    en: 'What shall we play?' },
  left:         { bg: 'остават',               en: 'left' },
  min:          { bg: 'мин',                   en: 'min' },
  back:         { bg: 'Назад',                 en: 'Back' },
  done_title:   { bg: 'Стига за днес',         en: 'That’s enough for today' },
  done_body:    { bg: 'Хайде навън да поиграем!', en: 'Let’s go outside and play!' },
  done_spoken:  { bg: 'Стига за днес. Хайде навън да поиграем!',
                  en: 'That’s enough for today. Let’s go outside and play!' },
  finished:     { bg: 'Браво!',                en: 'Well done!' },
  again:        { bg: 'Още веднъж',            en: 'Again' },

  g_sound:      { bg: 'Първият звук',          en: 'First sound' },
  g_sound_sub:  { bg: 'Чуй звука и намери думата', en: 'Hear the sound, find the word' },
  g_count:      { bg: 'Колко са?',             en: 'How many?' },
  g_count_sub:  { bg: 'Броим заедно',          en: 'Counting together' },
  g_odd:        { bg: 'Кое не пасва?',         en: 'Which one is different?' },
  g_odd_sub:    { bg: 'Подреждаме по групи',   en: 'Sorting into groups' },
  g_beat:       { bg: 'Ритъм',                 en: 'Beat' },
  g_beat_sub:   { bg: 'Тупкай заедно с музиката', en: 'Tap along with the music' },
  g_feel:       { bg: 'Как се чувства?',       en: 'How do they feel?' },
  g_feel_sub:   { bg: 'Разпознаваме чувствата', en: 'Naming feelings' },
  g_shape:      { bg: 'Форми и цветове',       en: 'Shapes and colours' },
  g_shape_sub:  { bg: 'Гледаме внимателно',    en: 'Looking closely' },
  g_size:       { bg: 'Голямо и малко',        en: 'Big and small' },
  g_size_sub:   { bg: 'Сравняваме и подреждаме', en: 'Comparing and ordering' },
  g_move:       { bg: 'Движи се!',             en: 'Move!' },
  g_move_sub:   { bg: 'Ставай от стола',       en: 'Get off the chair' },

  ask_sound:    { bg: s => `Намери какво започва със звука ${s}`,
                  en: s => `Find what starts with the sound ${s}` },
  ask_count:    { bg: () => 'Колко са?',       en: () => 'How many are there?' },
  ask_odd:      { bg: () => 'Кое не пасва тук?', en: () => 'Which one does not belong?' },
  ask_beat:     { bg: () => 'Тупкай заедно с ритъма', en: () => 'Tap along with the beat' },

  yes_word:     { bg: w => `Да! ${w}`,          en: w => `Yes! ${w}` },
  no_word:      { bg: w => `Това е ${w}. Опитай пак.`,
                  en: w => `That is a ${w}. Try again.` },
  odd_because:  { bg: (w, c) => `Да! ${w} не е ${c}.`,
                  en: (w, c) => `Yes! A ${w} is not ${c}.` },
  odd_retry:    { bg: (w, c) => `${w} е ${c}. Опитай пак.`,
                  en: (w, c) => `A ${w} is ${c}. Try again.` },

  ask_feel:     { bg: e => `Кой е ${e}?`,       en: e => `Who is ${e}?` },
  yes_feel:     { bg: e => `Да! Този е ${e}.`,  en: e => `Yes! That one is ${e}.` },
  no_feel:      { bg: e => `Този е ${e}. Опитай пак.`,
                  en: e => `That one is ${e}. Try again.` },

  ask_shape:    { bg: s => `Намери ${s}`,       en: s => `Find the ${s}` },
  ask_colour:   { bg: c => `Намери ${c}`,       en: c => `Find the ${c} one` },
  yes_plain:    { bg: () => 'Да! Браво!',       en: () => 'Yes! Well done!' },
  no_plain:     { bg: () => 'Опитай пак.',      en: () => 'Try again.' },

  ask_biggest:  { bg: () => 'Кое е най-голямо?', en: () => 'Which is the biggest?' },
  ask_smallest: { bg: () => 'Кое е най-малко?',  en: () => 'Which is the smallest?' },

  move_done:    { bg: 'Готово!',                en: 'Done!' },
  move_praise:  { bg: () => 'Браво! Още едно.',  en: () => 'Well done! One more.' },
  move_end:     { bg: 'Ти се движи! Това се брои.', en: 'You moved! That counts.' }
};

const T = key => {
  const e = PLAY_TEXT[key];
  if (!e) { console.warn('[play] missing text:', key); return `⟨${key}⟩`; }
  return e[getLang()] ?? e.en;
};

const speakNow = text => speech.speak(text, LANGS[getLang()].speech);

/* ============================ time cap ============================ */

const dayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const session = {
  usedToday: 0,      // seconds
  capSeconds: 900,
  ticker: null,
  sinceSave: 0
};

/**
 * Remaining seconds today. Reads from storage each time it matters, so quitting
 * the app, relaunching it, or reinstalling from the Home Screen cannot hand her
 * a fresh allowance. The day key rolls over at local midnight, by design.
 */
export function remaining () {
  return Promise.all([store.get('play'), store.get('screenCap')]).then(([play, cap]) => {
    const used = (play && play[dayKey()]) || 0;
    const capMin = typeof cap === 'number' ? cap : 15;
    session.usedToday = used;
    session.capSeconds = capMin * 60;
    return Math.max(0, session.capSeconds - used);
  });
}

function startTicking (onExpire) {
  stopTicking();
  session.ticker = setInterval(() => {
    session.usedToday += 1;
    session.sinceSave += 1;

    // Persist often. A four-year-old closes apps by pressing the home button,
    // and an unsaved five minutes is five minutes she gets twice.
    if (session.sinceSave >= 5) { persist(); }

    if (session.usedToday >= session.capSeconds) {
      persist();
      stopTicking();
      onExpire();
    }
  }, 1000);
}

function stopTicking () {
  if (session.ticker) { clearInterval(session.ticker); session.ticker = null; }
}

function persist () {
  session.sinceSave = 0;
  return store.get('play').then(play => {
    const next = play || {};
    next[dayKey()] = session.usedToday;
    // Keep only the last 30 days; this is a cap, not a diary.
    const keys = Object.keys(next).sort();
    while (keys.length > 30) { delete next[keys.shift()]; }
    return store.set('play', next);
  });
}

// Leaving the app mid-game must still bank the time.
document.addEventListener('visibilitychange', () => {
  if (document.hidden && session.ticker) { persist(); }
});

/* ============================ tiny DOM helpers ============================ */

/**
 * Every deferred step in a game goes through here so it can be cancelled.
 *
 * Games advance on timers ("right answer → next round in 1.5s"). A raw
 * setTimeout keeps running after the child taps Exit, and then fires — redrawing
 * a finished game on top of whatever is now on screen. Observed doing exactly
 * that. Anything scheduled here dies in cleanup().
 */
let timers = [];

function later (fn, ms) {
  const id = window.setTimeout(() => {
    timers = timers.filter(t => t !== id);
    fn();
  }, ms);
  timers.push(id);
  return id;
}

function clearLater () {
  timers.forEach(window.clearTimeout);
  timers = [];
}

function el (tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

let stage = null;
let exitToParent = () => {};

function clear () { stage.innerHTML = ''; }

/* ============================ game 1: first sound ============================ */
/* Curriculum: §4.5 L1f — language awareness. Attention moves "from the meanings
   of words towards the shapes and structures of language, including words,
   syllables, and phonemes." Deliberately sound-first, not letter-first. */

function gameFirstSound () {
  const lang = getLang();
  let round = 0;
  const ROUNDS = 6;
  const usedSounds = [];

  function nextRound () {
    if (round >= ROUNDS) return finish(gameFirstSound);
    round++;

    const pool = usableSounds(lang, 1).filter(s => !usedSounds.includes(s));
    const target = sample(pool.length ? pool : usableSounds(lang, 1), 1)[0];
    usedSounds.push(target);

    const right = sample(withSound(lang, target), 1)[0];
    const wrong = sample(withoutSound(lang, target), 2);
    const cards = shuffle([right, ...wrong]);

    clear();
    stage.appendChild(progressDots(round, ROUNDS));

    const prompt = el('div', 'play-prompt');
    prompt.appendChild(el('div', 'play-bigletter', target.toUpperCase()));
    prompt.appendChild(el('p', 'play-ask', PLAY_TEXT.ask_sound[lang](target.toUpperCase())));
    stage.appendChild(prompt);

    speakNow(PLAY_TEXT.ask_sound[lang](target));

    const row = el('div', 'play-cards');
    cards.forEach(card => {
      const b = el('button', 'play-card');
      b.type = 'button';
      b.appendChild(el('span', 'play-emoji', card.emoji));
      b.addEventListener('click', () => {
        if (card === right) {
          b.classList.add('is-right');
          speakNow(PLAY_TEXT.yes_word[lang](card[lang].word));
          later(nextRound, 1500);
        } else {
          // Not a failure. Name what she picked, and let her try again.
          b.classList.add('is-nudge');
          speakNow(PLAY_TEXT.no_word[lang](card[lang].word));
          later(() => b.classList.remove('is-nudge'), 900);
        }
      });
      row.appendChild(b);
    });
    stage.appendChild(row);
  }

  nextRound();
}

/* ============================ game 2: how many ============================ */
/* Curriculum: §4.5 L4b — number concept. "Children are encouraged to perceive
   numbers and amounts in their environment." Counted aloud together, 1–5. */

function gameHowMany () {
  const lang = getLang();
  let round = 0;
  const ROUNDS = 6;

  function nextRound () {
    if (round >= ROUNDS) return finish(gameHowMany);
    round++;

    const n = 1 + Math.floor(Math.random() * 5);
    const item = sample(WORDS, 1)[0];

    // Options are near neighbours, so it is a counting question, not a guess.
    const opts = shuffle(Array.from(new Set([
      n,
      Math.max(1, Math.min(5, n + 1)),
      Math.max(1, Math.min(5, n - 1)),
      Math.max(1, Math.min(5, n + 2))
    ]))).slice(0, 3);
    if (!opts.includes(n)) { opts[0] = n; }

    clear();
    stage.appendChild(progressDots(round, ROUNDS));
    stage.appendChild(el('p', 'play-ask', PLAY_TEXT.ask_count[lang]()));
    speakNow(PLAY_TEXT.ask_count[lang]());

    const set = el('div', 'play-set');
    for (let i = 0; i < n; i++) set.appendChild(el('span', 'play-emoji', item.emoji));
    stage.appendChild(set);

    const row = el('div', 'play-nums');
    shuffle(opts).forEach(v => {
      const b = el('button', 'play-num', String(v));
      b.type = 'button';
      b.addEventListener('click', () => {
        if (v === n) {
          b.classList.add('is-right');
          countAloud(set, n, lang, () => later(nextRound, 900));
        } else {
          b.classList.add('is-nudge');
          countAloud(set, n, lang, null);
          later(() => b.classList.remove('is-nudge'), 900);
        }
      });
      row.appendChild(b);
    });
    stage.appendChild(row);
  }

  // Count the objects aloud, lighting each one as it is named.
  function countAloud (set, n, lang, then) {
    const kids = Array.from(set.children);
    let i = 0;
    const step = () => {
      if (i >= n) { if (then) then(); return; }
      kids[i].classList.add('is-counted');
      speakNow(NUMBER_WORDS[lang][i + 1]);
      i++;
      later(step, 700);
    };
    kids.forEach(k => k.classList.remove('is-counted'));
    step();
  }

  nextRound();
}

/* ============================ game 3: odd one out ============================ */
/* Curriculum: §4.5 L4a — mathematical thinking: "classify, compare, and rank
   different things and objects". The explanation matters more than the tap. */

function gameOddOneOut () {
  const lang = getLang();
  let round = 0;
  const ROUNDS = 5;

  function nextRound () {
    if (round >= ROUNDS) return finish(gameOddOneOut);
    round++;

    const cats = Object.keys(CATEGORIES);
    const cat = sample(cats, 1)[0];
    const same = sample(inCategory(cat), 3);
    const odd = sample(notInCategory(cat), 1)[0];
    const cards = shuffle([...same, odd]);

    clear();
    stage.appendChild(progressDots(round, ROUNDS));
    stage.appendChild(el('p', 'play-ask', PLAY_TEXT.ask_odd[lang]()));
    speakNow(PLAY_TEXT.ask_odd[lang]());

    const row = el('div', 'play-cards play-cards-4');
    cards.forEach(card => {
      const b = el('button', 'play-card');
      b.type = 'button';
      b.appendChild(el('span', 'play-emoji', card.emoji));
      b.addEventListener('click', () => {
        const catName = CATEGORIES[cat][lang];
        if (card === odd) {
          b.classList.add('is-right');
          speakNow(PLAY_TEXT.odd_because[lang](card[lang].word, catName));
          later(nextRound, 2000);
        } else {
          b.classList.add('is-nudge');
          speakNow(PLAY_TEXT.odd_retry[lang](card[lang].word, catName));
          later(() => b.classList.remove('is-nudge'), 900);
        }
      });
      row.appendChild(b);
    });
    stage.appendChild(row);
  }

  nextRound();
}

/* ============================ game 4: beat ============================ */
/* Curriculum: §4.5 L2a — musical expression: "experiences of basic beat,
   rhythm in words and making music with their bodies". No timing judgement —
   tapping along IS the activity. */

function gameBeat () {
  const lang = getLang();
  const BPM = 96;
  const interval = 60000 / BPM;
  const TOTAL = 24;

  let audio = null;
  let beatCount = 0;
  let timer = null;

  clear();
  stage.appendChild(el('p', 'play-ask', PLAY_TEXT.ask_beat[lang]()));
  speakNow(PLAY_TEXT.ask_beat[lang]());

  const pulse = el('button', 'play-drum');
  pulse.type = 'button';
  pulse.appendChild(el('span', 'play-emoji', '🥁'));
  stage.appendChild(pulse);

  const track = el('div', 'play-beats');
  for (let i = 0; i < TOTAL; i++) track.appendChild(el('span', 'play-beat'));
  stage.appendChild(track);

  function ctx () {
    if (!audio) {
      const AC = window.AudioContext || window.webkitAudioContext;
      audio = new AC();
    }
    // iOS starts contexts suspended until a gesture.
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function click (freq, gain) {
    const a = ctx();
    const osc = a.createOscillator();
    const g = a.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    g.gain.setValueAtTime(gain, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.12);
    osc.connect(g); g.connect(a.destination);
    osc.start(); osc.stop(a.currentTime + 0.13);
  }

  function beat () {
    if (beatCount >= TOTAL) { stopBeat(); finish(gameBeat); return; }
    const dot = track.children[beatCount];
    if (dot) dot.classList.add('is-on');
    pulse.classList.add('is-pulse');
    later(() => pulse.classList.remove('is-pulse'), 140);
    click(beatCount % 4 === 0 ? 660 : 440, 0.18);
    beatCount++;
  }

  function stopBeat () {
    if (timer) { clearInterval(timer); timer = null; }
    if (audio) { audio.close().catch(() => {}); audio = null; }
  }

  pulse.addEventListener('click', () => {
    click(880, 0.25);                       // her tap, a different voice
    pulse.classList.add('is-tapped');
    later(() => pulse.classList.remove('is-tapped'), 140);
  });

  // First tap starts the beat, which also satisfies the iOS gesture rule.
  const startOnce = () => {
    if (timer) return;
    beat();
    timer = setInterval(beat, interval);
  };
  pulse.addEventListener('click', startOnce, { once: true });

  activeCleanup = stopBeat;
}

/* ============================ game 5: feelings ============================ */
/* Curriculum: §2.7 T3 — "Children's emotional skills improve as they practise
   perceiving, acknowledging, and naming emotions." Also §4.5 L3a, which names
   "causes of fear, sadness, and joy" among the themes to reflect on together. */

function gameFeelings () {
  const lang = getLang();
  let round = 0;
  const ROUNDS = 6;

  function nextRound () {
    if (round >= ROUNDS) return finish(gameFeelings);
    round++;

    const picked = sample(EMOTIONS, 3);
    const target = picked[Math.floor(Math.random() * picked.length)];

    clear();
    stage.appendChild(progressDots(round, ROUNDS));
    stage.appendChild(el('p', 'play-ask', PLAY_TEXT.ask_feel[lang](target[lang])));
    speakNow(PLAY_TEXT.ask_feel[lang](target[lang]));

    const row = el('div', 'play-cards');
    shuffle(picked).forEach(face => {
      const b = el('button', 'play-card');
      b.type = 'button';
      b.appendChild(el('span', 'play-emoji', face.emoji));
      b.addEventListener('click', () => {
        if (face === target) {
          b.classList.add('is-right');
          speakNow(PLAY_TEXT.yes_feel[lang](face[lang]));
          later(nextRound, 1600);
        } else {
          // Name what she saw. Being wrong about a feeling is still learning one.
          b.classList.add('is-nudge');
          speakNow(PLAY_TEXT.no_feel[lang](face[lang]));
          later(() => b.classList.remove('is-nudge'), 900);
        }
      });
      row.appendChild(b);
    });
    stage.appendChild(row);
  }

  nextRound();
}

/* ======================= game 6: shapes and colours ======================= */
/* Curriculum: §4.5 L4c — "encouraged to examine objects and shapes and to play
   with them", strengthening geometric thinking; and §4.5 L2b, where attention
   is paid to "colours, shapes, materials". Alternates the two questions so she
   has to notice WHICH property is being asked about. */

function gameShapes () {
  const lang = getLang();
  let round = 0;
  const ROUNDS = 6;

  function nextRound () {
    if (round >= ROUNDS) return finish(gameShapes);
    round++;

    const askColour = round % 2 === 0;
    let items, target, prompt;

    if (askColour) {
      // Same shape throughout, three colours: only colour can distinguish them.
      const shape = sample(SHAPES, 1)[0];
      const cols = sample(COLOURS, 3);
      items = cols.map(c => ({ shape, colour: c }));
      target = items[Math.floor(Math.random() * items.length)];
      prompt = PLAY_TEXT.ask_colour[lang](target.colour[lang]);
    } else {
      // Same colour throughout, three shapes: only shape can distinguish them.
      const colour = sample(COLOURS, 1)[0];
      const shapes = sample(SHAPES, 3);
      items = shapes.map(s => ({ shape: s, colour }));
      target = items[Math.floor(Math.random() * items.length)];
      prompt = PLAY_TEXT.ask_shape[lang](target.shape[lang]);
    }

    clear();
    stage.appendChild(progressDots(round, ROUNDS));
    stage.appendChild(el('p', 'play-ask', prompt));
    speakNow(prompt);

    const row = el('div', 'play-cards');
    shuffle(items).forEach(item => {
      const b = el('button', 'play-card');
      b.type = 'button';
      const holder = el('span', 'play-shape');
      holder.innerHTML = shapeSvg(item.shape.id, item.colour.hex, 92);
      b.appendChild(holder);
      b.addEventListener('click', () => {
        if (item === target) {
          b.classList.add('is-right');
          speakNow(PLAY_TEXT.yes_plain[lang]());
          later(nextRound, 1300);
        } else {
          b.classList.add('is-nudge');
          speakNow(PLAY_TEXT.no_plain[lang]());
          later(() => b.classList.remove('is-nudge'), 900);
        }
      });
      row.appendChild(b);
    });
    stage.appendChild(row);
  }

  nextRound();
}

/* ======================= game 7: big and small ======================= */
/* Curriculum: §4.5 L4a — "classify, compare, and rank different things and
   objects". Same object at three sizes, so size is the only variable. */

function gameBigSmall () {
  const lang = getLang();
  let round = 0;
  const ROUNDS = 6;

  function nextRound () {
    if (round >= ROUNDS) return finish(gameBigSmall);
    round++;

    const item = sample(WORDS, 1)[0];
    const scales = shuffle([0.55, 1, 1.6]);
    const wantBiggest = round % 2 === 1;
    const targetScale = wantBiggest ? 1.6 : 0.55;
    const prompt = wantBiggest ? PLAY_TEXT.ask_biggest[lang]() : PLAY_TEXT.ask_smallest[lang]();

    clear();
    stage.appendChild(progressDots(round, ROUNDS));
    stage.appendChild(el('p', 'play-ask', prompt));
    speakNow(prompt);

    const row = el('div', 'play-cards');
    scales.forEach(scale => {
      const b = el('button', 'play-card play-card-size');
      b.type = 'button';
      const e = el('span', 'play-emoji', item.emoji);
      e.style.fontSize = Math.round(64 * scale) + 'px';
      b.appendChild(e);
      b.addEventListener('click', () => {
        if (scale === targetScale) {
          b.classList.add('is-right');
          speakNow(PLAY_TEXT.yes_plain[lang]());
          later(nextRound, 1300);
        } else {
          b.classList.add('is-nudge');
          speakNow(PLAY_TEXT.no_plain[lang]());
          later(() => b.classList.remove('is-nudge'), 900);
        }
      });
      row.appendChild(b);
    });
    stage.appendChild(row);
  }

  nextRound();
}

/* ============================ game 8: move! ============================ */
/* Curriculum: §4.5 L5a — "balance, locomotor, and manipulative" skills.
   The only game whose purpose is to get her off the seat. The mix is drawn
   across all three named skills rather than being eight kinds of jumping, and
   the time spent is credited to today's movement, because it genuinely was. */

function gameMove () {
  const lang = getLang();
  const SEQUENCE = 8;
  let step = 0;
  let picks = [];

  // One from each skill first, so no run is all jumping, then fill the rest.
  const bySkill = ['balance', 'locomotor', 'manipulative']
    .map(sk => sample(MOVES.filter(m => m.skill === sk), 1)[0])
    .filter(Boolean);
  const rest = sample(MOVES.filter(m => !bySkill.includes(m)), SEQUENCE - bySkill.length);
  picks = shuffle([...bySkill, ...rest]);

  function nextMove () {
    if (step >= picks.length) return finishMove();
    const move = picks[step];
    step++;

    clear();
    stage.appendChild(progressDots(step, picks.length));

    const card = el('div', 'play-move');
    card.appendChild(el('div', 'play-emoji play-emoji-xl', move.emoji));
    card.appendChild(el('p', 'play-ask', move[lang]));
    stage.appendChild(card);
    speakNow(move[lang]);

    const done = el('button', 'play-bigbutton', T('move_done'));
    done.type = 'button';
    done.addEventListener('click', () => {
      if (step < picks.length) speakNow(PLAY_TEXT.move_praise[lang]());
      later(nextMove, 700);
    });
    const row = el('div', 'play-actions');
    row.appendChild(done);
    stage.appendChild(row);
  }

  function finishMove () {
    // Credit the movement. Roughly 15s per prompt including doing it — kept
    // deliberately conservative so the day's meter is not inflated by the app.
    const minutes = Math.max(1, Math.round((picks.length * 15) / 60));
    creditMovement(minutes).then(() => {
      clear();
      const box = el('div', 'play-done');
      box.appendChild(el('div', 'play-emoji play-emoji-xl', '💪'));
      box.appendChild(el('h2', null, T('finished')));
      box.appendChild(el('p', 'muted', `${T('move_end')} +${minutes} ${T('min')}`));
      stage.appendChild(box);
      speakNow(T('move_end'));

      const row = el('div', 'play-actions');
      const again = el('button', null, T('again'));
      again.type = 'button';
      again.addEventListener('click', () => guard(() => gameMove()));
      const back = el('button', 'ghost', T('back'));
      back.type = 'button';
      back.addEventListener('click', showChooser);
      row.appendChild(again); row.appendChild(back);
      stage.appendChild(row);
    });
  }

  nextMove();
}

function creditMovement (minutes) {
  return store.get('movement').then(m => {
    const next = m || {};
    next[dayKey()] = (next[dayKey()] || 0) + minutes;
    return store.set('movement', next);
  });
}

/* ============================ shell ============================ */

let activeCleanup = null;

function progressDots (n, total) {
  const wrap = el('div', 'play-progress');
  for (let i = 0; i < total; i++) {
    const d = el('span', 'play-pip' + (i < n ? ' is-done' : ''));
    wrap.appendChild(d);
  }
  return wrap;
}

const GAMES = [
  { id: 'sound', strand: 'L1f', icon: '🔤', title: 'g_sound', sub: 'g_sound_sub', run: gameFirstSound },
  { id: 'count', strand: 'L4b', icon: '🔢', title: 'g_count', sub: 'g_count_sub', run: gameHowMany },
  { id: 'odd',   strand: 'L4a', icon: '🧩', title: 'g_odd',   sub: 'g_odd_sub',   run: gameOddOneOut },
  { id: 'beat',  strand: 'L2a', icon: '🥁', title: 'g_beat',  sub: 'g_beat_sub',  run: gameBeat },
  { id: 'feel',  strand: 'T3',  icon: '💛', title: 'g_feel',  sub: 'g_feel_sub',  run: gameFeelings },
  { id: 'shape', strand: 'L4c', icon: '🔷', title: 'g_shape', sub: 'g_shape_sub', run: gameShapes },
  { id: 'size',  strand: 'L4a', icon: '📏', title: 'g_size',  sub: 'g_size_sub',  run: gameBigSmall },
  { id: 'move',  strand: 'L5a', icon: '🤸', title: 'g_move',  sub: 'g_move_sub',  run: gameMove }
];

function finish (rerun) {
  cleanup();
  clear();
  const box = el('div', 'play-done');
  box.appendChild(el('div', 'play-emoji play-emoji-xl', '🌟'));
  box.appendChild(el('h2', null, T('finished')));
  stage.appendChild(box);
  speakNow(T('finished'));

  const row = el('div', 'play-actions');
  const again = el('button', null, T('again'));
  again.type = 'button';
  again.addEventListener('click', () => guard(() => rerun()));
  row.appendChild(again);

  const back = el('button', 'ghost', T('back'));
  back.type = 'button';
  back.addEventListener('click', showChooser);
  row.appendChild(back);
  stage.appendChild(row);
}

function cleanup () {
  clearLater();
  if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
  speech.stop();
}

function outOfTime () {
  cleanup();
  clear();
  const box = el('div', 'play-done');
  box.appendChild(el('div', 'play-emoji play-emoji-xl', '🌳'));
  box.appendChild(el('h2', null, T('done_title')));
  box.appendChild(el('p', 'muted', T('done_body')));
  stage.appendChild(box);
  speakNow(T('done_spoken'));

  const back = el('button', null, T('back'));
  back.type = 'button';
  back.addEventListener('click', exitToParent);
  const row = el('div', 'play-actions');
  row.appendChild(back);
  stage.appendChild(row);
}

/** Never start anything without checking the clock first. */
function guard (fn) {
  return remaining().then(left => {
    if (left <= 0) { outOfTime(); return; }
    startTicking(outOfTime);
    fn();
  });
}

function showChooser () {
  cleanup();
  stopTicking();
  persist();

  remaining().then(left => {
    clear();
    if (left <= 0) { outOfTime(); return; }

    const head = el('div', 'play-head');
    head.appendChild(el('h1', null, T('choose')));
    head.appendChild(el('span', 'pill', `${Math.ceil(left / 60)} ${T('min')} ${T('left')}`));
    stage.appendChild(head);

    const grid = el('div', 'play-menu');
    GAMES.forEach(g => {
      const b = el('button', 'play-tile');
      b.type = 'button';
      b.appendChild(el('span', 'play-emoji', g.icon));
      b.appendChild(el('span', 'play-tile-title', T(g.title)));
      b.appendChild(el('span', 'play-tile-sub', T(g.sub)));
      b.addEventListener('click', () => guard(() => g.run()));
      grid.appendChild(b);
    });
    stage.appendChild(grid);
  });
}

/* ============================ public ============================ */

export function open (stageEl, onExit) {
  stage = stageEl;
  exitToParent = () => { cleanup(); stopTicking(); persist().then(onExit); };
  speech.unlock();
  showChooser();
}

export function close () {
  cleanup();
  stopTicking();
  return persist();
}

export function minutesLeft () {
  return remaining().then(s => Math.ceil(s / 60));
}

/** Every game must name a real curriculum strand, and every text must be bilingual. */
export function auditPlay () {
  const problems = auditWords().concat(auditPlaysets());

  GAMES.forEach(g => {
    if (!g.strand) problems.push(`game ${g.id} names no curriculum strand`);
    if (!PLAY_TEXT[g.title]) problems.push(`game ${g.id} has no title text`);
  });

  Object.entries(PLAY_TEXT).forEach(([k, v]) => {
    ['bg', 'en'].forEach(lang => {
      if (v[lang] === undefined) problems.push(`play text ${k}.${lang} missing`);
    });
  });

  return problems;
}

export { GAMES };
