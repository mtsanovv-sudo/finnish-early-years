/**
 * Content for the games that are not word games.
 *
 * Same rule as everywhere: each set names the curriculum strand it serves, and
 * anything not in the regulation is not here.
 */

/* ---------------------------------------------------------------------------
 * Emotions — §2.7 T3: "Children's emotional skills improve as they practise
 * perceiving, acknowledging, and naming emotions." Also §4.5 L3a, where the
 * named themes include "causes of fear, sadness, and joy".
 * ------------------------------------------------------------------------- */

export const EMOTIONS = [
  { id: 'happy',     emoji: '😀', bg: 'радостен',   en: 'happy' },
  { id: 'sad',       emoji: '😢', bg: 'тъжен',      en: 'sad' },
  { id: 'angry',     emoji: '😠', bg: 'ядосан',     en: 'angry' },
  { id: 'scared',    emoji: '😨', bg: 'уплашен',    en: 'scared' },
  { id: 'tired',     emoji: '😴', bg: 'уморен',     en: 'tired' },
  { id: 'surprised', emoji: '😮', bg: 'изненадан',  en: 'surprised' },
  { id: 'shy',       emoji: '😊', bg: 'срамежлив',  en: 'shy' },
  { id: 'crying',    emoji: '😭', bg: 'разплакан',  en: 'crying' }
];

/* ---------------------------------------------------------------------------
 * Shapes and colours — §4.5 L4c: "Children are encouraged to examine objects
 * and shapes and to play with them" (geometric thinking), and §4.5 L2b, where
 * attention is paid to "colours, shapes, materials".
 *
 * Shapes are drawn, not emoji: every shape emoji carries a fixed colour, which
 * would make "find the circle" and "find the red one" impossible to separate.
 * ------------------------------------------------------------------------- */

export const SHAPES = [
  { id: 'circle',   bg: 'кръг',        en: 'circle' },
  { id: 'square',   bg: 'квадрат',     en: 'square' },
  { id: 'triangle', bg: 'триъгълник',  en: 'triangle' },
  { id: 'star',     bg: 'звезда',      en: 'star' }
];

export const COLOURS = [
  { id: 'red',    hex: '#D6453A', bg: 'червено', en: 'red' },
  { id: 'blue',   hex: '#3A7CC4', bg: 'синьо',   en: 'blue' },
  { id: 'green',  hex: '#4C9E6B', bg: 'зелено',  en: 'green' },
  { id: 'yellow', hex: '#E3B23C', bg: 'жълто',   en: 'yellow' }
];

/** Inline SVG for a shape in a colour. No image files, so nothing to 404. */
export function shapeSvg (shapeId, hex, size = 96) {
  const s = size;
  const paths = {
    circle:   `<circle cx="${s / 2}" cy="${s / 2}" r="${s * 0.42}" fill="${hex}"/>`,
    square:   `<rect x="${s * 0.10}" y="${s * 0.10}" width="${s * 0.80}" height="${s * 0.80}" rx="${s * 0.06}" fill="${hex}"/>`,
    triangle: `<polygon points="${s / 2},${s * 0.08} ${s * 0.92},${s * 0.88} ${s * 0.08},${s * 0.88}" fill="${hex}"/>`,
    star:     star(s, hex)
  };
  return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" aria-hidden="true">${paths[shapeId]}</svg>`;
}

function star (s, hex) {
  const cx = s / 2, cy = s / 2, outer = s * 0.46, inner = s * 0.20;
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${hex}"/>`;
}

/* ---------------------------------------------------------------------------
 * Movements — §4.5 L5a: "fundamental movement skills, such as balance,
 * locomotor, and manipulative skills."
 *
 * This is the one game that uses the screen to get her OFF it. Every entry is
 * tagged with the skill it exercises so the mix stays balanced rather than
 * being eight kinds of jumping.
 * ------------------------------------------------------------------------- */

export const MOVES = [
  { id: 'jump',    emoji: '🦘', skill: 'locomotor',    bg: 'Скочи високо!',        en: 'Jump high!' },
  { id: 'spin',    emoji: '🌀', skill: 'balance',      bg: 'Завърти се!',          en: 'Spin around!' },
  { id: 'stomp',   emoji: '🦶', skill: 'locomotor',    bg: 'Тропни с крака!',      en: 'Stomp your feet!' },
  { id: 'squat',   emoji: '⬇️', skill: 'locomotor',    bg: 'Клекни и стани!',      en: 'Squat down and up!' },
  { id: 'reach',   emoji: '🙌', skill: 'balance',      bg: 'Ръцете нагоре!',       en: 'Arms up high!' },
  { id: 'onefoot', emoji: '🦩', skill: 'balance',      bg: 'Стой на един крак!',   en: 'Stand on one foot!' },
  { id: 'crawl',   emoji: '🐛', skill: 'locomotor',    bg: 'Пълзи като гъсеница!', en: 'Crawl like a caterpillar!' },
  { id: 'clap',    emoji: '👏', skill: 'manipulative', bg: 'Плесни с ръце!',       en: 'Clap your hands!' },
  { id: 'tiptoe',  emoji: '🤫', skill: 'balance',      bg: 'Ходи на пръсти!',      en: 'Walk on tiptoes!' },
  { id: 'big',     emoji: '🐻', skill: 'locomotor',    bg: 'Ходи като мечка!',     en: 'Walk like a bear!' },
  { id: 'small',   emoji: '🐭', skill: 'locomotor',    bg: 'Ходи като мишле!',     en: 'Walk like a mouse!' },
  { id: 'freeze',  emoji: '🧊', skill: 'balance',      bg: 'Замръзни като статуя!', en: 'Freeze like a statue!' }
];

/** Everything bilingual, shapes renderable, moves covering all three skills. */
export function auditPlaysets () {
  const problems = [];

  const bilingual = (list, name) => list.forEach(x => {
    if (!x.bg) problems.push(`${name} ${x.id} missing bg`);
    if (!x.en) problems.push(`${name} ${x.id} missing en`);
  });

  bilingual(EMOTIONS, 'emotion');
  bilingual(SHAPES, 'shape');
  bilingual(COLOURS, 'colour');
  bilingual(MOVES, 'move');

  EMOTIONS.forEach(e => { if (!e.emoji) problems.push(`emotion ${e.id} has no face`); });
  COLOURS.forEach(c => { if (!/^#[0-9A-Fa-f]{6}$/.test(c.hex)) problems.push(`colour ${c.id} has a bad hex`); });

  SHAPES.forEach(s => {
    const svg = shapeSvg(s.id, '#000000');
    if (!svg || svg.indexOf('undefined') !== -1) problems.push(`shape ${s.id} does not render`);
  });

  // The three fundamental movement skills are named by the source; all must appear.
  ['balance', 'locomotor', 'manipulative'].forEach(skill => {
    if (!MOVES.some(m => m.skill === skill)) problems.push(`no move exercises "${skill}"`);
  });

  if (EMOTIONS.length < 3) problems.push('too few emotions to build a round');
  if (SHAPES.length < 3) problems.push('too few shapes to build a round');
  if (COLOURS.length < 3) problems.push('too few colours to build a round');

  return problems;
}
