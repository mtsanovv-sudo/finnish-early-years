/**
 * Speech. The child cannot read, so this is the app's main output channel.
 *
 * Measured on the target device (DECISIONS.md D8):
 *   - Bulgarian: exactly one voice, `Daria` (bg-BG), on-device → works offline.
 *   - English:   many, including Apple's warmer character set.
 *   - getVoices() returns 186 entries with the list DUPLICATED, so `Daria`
 *     appears twice. Dedupe or the picker shows every voice twice.
 */

import { get as dbGet, set as dbSet } from './store.js';

const PREF_KEY = lang => `voice.${lang}`;

/**
 * Voices Apple ships as novelty/effect rather than speech. Fine as a deliberate
 * choice — "Bubbles" reading a rhyme is genuinely funny to a four-year-old — but
 * a terrible default, so they are pushed to the bottom of the list.
 */
const NOVELTY = new Set([
  'Albert', 'Bad News', 'Bahh', 'Bells', 'Boing', 'Bubbles', 'Cellos', 'Fred',
  'Good News', 'Jester', 'Junior', 'Kathy', 'Organ', 'Ralph', 'Superstar',
  'Trinoids', 'Whisper', 'Wobble', 'Zarvox'
]);

let cache = null;

/**
 * iOS populates the voice list lazily and sometimes not until the page has had
 * a real touch. Poll as well as listening for voiceschanged — relying on the
 * event alone leaves the list empty on a cold load.
 */
export function ready () {
  if (cache && cache.length) return Promise.resolve(cache);
  if (!('speechSynthesis' in window)) return Promise.resolve([]);

  return new Promise(resolve => {
    let tries = 0;

    const settle = () => {
      const raw = speechSynthesis.getVoices();
      if (!raw || !raw.length) return false;
      cache = dedupe(raw);
      resolve(cache);
      return true;
    };

    if (settle()) return;

    speechSynthesis.addEventListener('voiceschanged', settle, { once: true });

    const timer = setInterval(() => {
      if (settle() || ++tries > 20) {
        clearInterval(timer);
        if (tries > 20) resolve(cache || []);
      }
    }, 200);
  });
}

function dedupe (voices) {
  const seen = new Set();
  const out = [];
  for (const v of voices) {
    const key = `${v.lang}|${v.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out;
}

/** Voices for a language tag, best default first. */
export function voicesFor (langTag) {
  const base = langTag.split('-')[0].toLowerCase();
  return (cache || [])
    .filter(v => (v.lang || '').toLowerCase().startsWith(base))
    .sort((a, b) => {
      // exact region match first, then on-device, then real voices over novelty
      const exact = v => (v.lang || '').toLowerCase() === langTag.toLowerCase() ? 0 : 1;
      const novel = v => NOVELTY.has(v.name) ? 1 : 0;
      const local = v => v.localService ? 0 : 1;
      return exact(a) - exact(b) || novel(a) - novel(b) || local(a) - local(b) ||
             a.name.localeCompare(b.name);
    });
}

export function getPreferred (langTag) {
  return dbGet(PREF_KEY(langTag)).then(name => {
    const list = voicesFor(langTag);
    if (!list.length) return null;
    return list.find(v => v.name === name) || list[0];
  });
}

export function setPreferred (langTag, voiceName) {
  return dbSet(PREF_KEY(langTag), voiceName);
}

/**
 * iOS refuses to speak until synthesis has been triggered inside a user
 * gesture. Firing a silent utterance on the first touch buys the right to
 * speak later, when the app — not the finger — decides.
 */
let unlocked = false;
export function unlock () {
  if (unlocked || !('speechSynthesis' in window)) return;
  unlocked = true;
  try {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    speechSynthesis.speak(u);
  } catch (_) { /* nothing to do; speak() will report the real failure */ }
}

export function speak (text, langTag, { rate = 0.9, pitch = 1 } = {}) {
  if (!('speechSynthesis' in window) || !text) return Promise.resolve(false);

  return ready()
    .then(() => getPreferred(langTag))
    .then(voice => new Promise(resolve => {
      speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(text);
      u.lang = langTag;
      u.rate = rate;      // slower than default; she is four
      u.pitch = pitch;
      if (voice) u.voice = voice;

      u.onend = () => resolve(true);
      u.onerror = () => resolve(false);

      speechSynthesis.speak(u);

      // Safari occasionally drops onend. Do not leave a promise hanging
      // forever in the middle of an activity.
      setTimeout(() => resolve(true), 400 + text.length * 90);
    }));
}

export function stop () {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

export function available () {
  return 'speechSynthesis' in window;
}
