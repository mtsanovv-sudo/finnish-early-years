/**
 * Picture words for the child-facing games.
 *
 * Emoji rather than image files: they render natively on iPadOS 17, cost no
 * bytes, need no licence, and cannot 404 on a device that is offline. They are
 * the CONTENT here — the pictures a non-reading child taps — not decoration.
 *
 * The initial sound is stored PER LANGUAGE and cannot be derived from one
 * translation of the other: 🍎 is "ябълка" (я) in Bulgarian and "apple" (a) in
 * English; 🥕 is "морков" (м) and "carrot" (c). Cyrillic and Latin literacy are
 * separate ladders (DECISIONS.md D3), and this table is where that starts.
 *
 * `cat` (category) drives the odd-one-out game.
 */

export const WORDS = [
  // ---- animals ----
  { emoji: '🐱', cat: 'animal',  bg: { word: 'котка',    s: 'к' }, en: { word: 'cat',        s: 'c' } },
  { emoji: '🐶', cat: 'animal',  bg: { word: 'куче',     s: 'к' }, en: { word: 'dog',        s: 'd' } },
  { emoji: '🐰', cat: 'animal',  bg: { word: 'заек',     s: 'з' }, en: { word: 'rabbit',     s: 'r' } },
  { emoji: '🐻', cat: 'animal',  bg: { word: 'мечка',    s: 'м' }, en: { word: 'bear',       s: 'b' } },
  { emoji: '🦊', cat: 'animal',  bg: { word: 'лисица',   s: 'л' }, en: { word: 'fox',        s: 'f' } },
  { emoji: '🐸', cat: 'animal',  bg: { word: 'жаба',     s: 'ж' }, en: { word: 'frog',       s: 'f' } },
  { emoji: '🐟', cat: 'animal',  bg: { word: 'риба',     s: 'р' }, en: { word: 'fish',       s: 'f' } },
  { emoji: '🐦', cat: 'animal',  bg: { word: 'птица',    s: 'п' }, en: { word: 'bird',       s: 'b' } },
  { emoji: '🐝', cat: 'animal',  bg: { word: 'пчела',    s: 'п' }, en: { word: 'bee',        s: 'b' } },
  { emoji: '🐘', cat: 'animal',  bg: { word: 'слон',     s: 'с' }, en: { word: 'elephant',   s: 'e' } },
  { emoji: '🦁', cat: 'animal',  bg: { word: 'лъв',      s: 'л' }, en: { word: 'lion',       s: 'l' } },
  { emoji: '🐴', cat: 'animal',  bg: { word: 'кон',      s: 'к' }, en: { word: 'horse',      s: 'h' } },

  // ---- food ----
  { emoji: '🍎', cat: 'food',    bg: { word: 'ябълка',   s: 'я' }, en: { word: 'apple',      s: 'a' } },
  { emoji: '🍌', cat: 'food',    bg: { word: 'банан',    s: 'б' }, en: { word: 'banana',     s: 'b' } },
  { emoji: '🍓', cat: 'food',    bg: { word: 'ягода',    s: 'я' }, en: { word: 'strawberry', s: 's' } },
  { emoji: '🍇', cat: 'food',    bg: { word: 'грозде',   s: 'г' }, en: { word: 'grapes',     s: 'g' } },
  { emoji: '🍉', cat: 'food',    bg: { word: 'диня',     s: 'д' }, en: { word: 'melon',      s: 'm' } },
  { emoji: '🍋', cat: 'food',    bg: { word: 'лимон',    s: 'л' }, en: { word: 'lemon',      s: 'l' } },
  { emoji: '🥕', cat: 'food',    bg: { word: 'морков',   s: 'м' }, en: { word: 'carrot',     s: 'c' } },
  { emoji: '🍅', cat: 'food',    bg: { word: 'домат',    s: 'д' }, en: { word: 'tomato',     s: 't' } },

  // ---- things that go ----
  { emoji: '🚗', cat: 'vehicle', bg: { word: 'кола',     s: 'к' }, en: { word: 'car',        s: 'c' } },
  { emoji: '🚌', cat: 'vehicle', bg: { word: 'автобус',  s: 'а' }, en: { word: 'bus',        s: 'b' } },
  { emoji: '🚲', cat: 'vehicle', bg: { word: 'колело',   s: 'к' }, en: { word: 'bike',       s: 'b' } },
  { emoji: '✈️', cat: 'vehicle', bg: { word: 'самолет',  s: 'с' }, en: { word: 'plane',      s: 'p' } },
  { emoji: '🚂', cat: 'vehicle', bg: { word: 'влак',     s: 'в' }, en: { word: 'train',      s: 't' } },
  { emoji: '🚢', cat: 'vehicle', bg: { word: 'кораб',    s: 'к' }, en: { word: 'ship',       s: 's' } },

  // ---- things you wear ----
  { emoji: '👟', cat: 'clothes', bg: { word: 'обувка',   s: 'о' }, en: { word: 'shoe',       s: 's' } },
  { emoji: '🧢', cat: 'clothes', bg: { word: 'шапка',    s: 'ш' }, en: { word: 'cap',        s: 'c' } },
  { emoji: '🧤', cat: 'clothes', bg: { word: 'ръкавица', s: 'р' }, en: { word: 'glove',      s: 'g' } },
  { emoji: '🧦', cat: 'clothes', bg: { word: 'чорап',    s: 'ч' }, en: { word: 'sock',       s: 's' } }
];

/** Category names, spoken when explaining an odd-one-out. */
export const CATEGORIES = {
  animal:  { bg: 'животно', en: 'an animal' },
  food:    { bg: 'храна',   en: 'food' },
  vehicle: { bg: 'превозно средство', en: 'a vehicle' },
  clothes: { bg: 'дреха',   en: 'something you wear' }
};

/** Counting words 1–5, so the app can count aloud with her. */
export const NUMBER_WORDS = {
  bg: ['', 'едно', 'две', 'три', 'четири', 'пет'],
  en: ['', 'one', 'two', 'three', 'four', 'five']
};

export const word = (item, lang) => item[lang].word;
export const sound = (item, lang) => item[lang].s;

/** Initial sounds that have at least `min` words in this language. */
export function usableSounds (lang, min = 1) {
  const counts = {};
  WORDS.forEach(w => {
    const s = w[lang].s;
    counts[s] = (counts[s] || 0) + 1;
  });
  return Object.keys(counts).filter(s => counts[s] >= min);
}

export function withSound (lang, s) {
  return WORDS.filter(w => w[lang].s === s);
}

export function withoutSound (lang, s) {
  return WORDS.filter(w => w[lang].s !== s);
}

export function inCategory (cat) {
  return WORDS.filter(w => w.cat === cat);
}

export function notInCategory (cat) {
  return WORDS.filter(w => w.cat !== cat);
}

/** Fisher–Yates. Returns a new array; never mutates WORDS. */
export function shuffle (arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample (arr, n) {
  return shuffle(arr).slice(0, n);
}

/** Every word must be complete in both languages, or a game will render blank. */
export function auditWords () {
  const problems = [];
  WORDS.forEach((w, i) => {
    if (!w.emoji) problems.push(`word ${i} has no emoji`);
    if (!CATEGORIES[w.cat]) problems.push(`word ${w.emoji} has unknown category "${w.cat}"`);
    ['bg', 'en'].forEach(lang => {
      if (!w[lang] || !w[lang].word) problems.push(`${w.emoji} missing ${lang} word`);
      if (!w[lang] || !w[lang].s) problems.push(`${w.emoji} missing ${lang} initial sound`);
      else if (w[lang].word && w[lang].word[0].toLowerCase() !== w[lang].s.toLowerCase()) {
        problems.push(`${w.emoji} ${lang}: "${w[lang].word}" does not start with "${w[lang].s}"`);
      }
    });
  });
  return problems;
}
