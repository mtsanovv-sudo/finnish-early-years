/**
 * App bootstrap.
 *
 * Safari 17 baseline (DECISIONS.md D7) — no API newer than that.
 */

import { t, setLang, getLang, LANGS, auditStrings, pick } from './i18n.js';
import * as store from './store.js';
import * as speech from './speech.js';
import { LEARNING_AREAS, AGE_BANDS, CONSTRAINTS, bandForAgeMonths } from './data/curriculum.js';
import * as play from './play.js';

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

const VIEWS = ['setup', 'today', 'observe', 'plan', 'settings', 'play'];

const state = {
  child: null,        // { name, dob }
  screenCap: CONSTRAINTS.childScreenMinutesDefault.value,
  movement: {}        // { 'YYYY-MM-DD': minutes }
};

/* ===================== helpers ===================== */

const todayKey = () => {
  const d = new Date();
  // Local date, not UTC — a day boundary in UTC would roll over mid-evening here.
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function ageInMonths (dob) {
  if (!dob) return null;
  const b = new Date(dob + 'T00:00:00');
  if (isNaN(b)) return null;
  const n = new Date();
  let m = (n.getFullYear() - b.getFullYear()) * 12 + (n.getMonth() - b.getMonth());
  if (n.getDate() < b.getDate()) m--;
  return Math.max(0, m);
}

function formatAge (months) {
  if (months == null) return '—';
  return `${Math.floor(months / 12)} ${t('years')} ${months % 12} ${t('months')}`;
}

/* ===================== i18n rendering ===================== */

function applyStrings () {
  $$('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
  document.documentElement.setAttribute('lang', getLang());
}

/* ===================== views ===================== */

function show (name) {
  VIEWS.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.hidden = v !== name;
  });

  // Setup and play are both full-screen: the tab bar is a parent control and
  // must not be sitting under a four-year-old's thumb mid-game.
  $('#tabbar').hidden = (name === 'setup' || name === 'play');
  $$('.tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.view === name)));

  if (name === 'today') renderToday();
  if (name === 'settings') renderSettings();

  window.scrollTo(0, 0);
}

function renderToday () {
  if (!state.child) return;

  $('#today-name').textContent = state.child.name;
  $('#today-date').textContent = new Date().toLocaleDateString(
    LANGS[getLang()].speech,
    { weekday: 'long', day: 'numeric', month: 'long' }
  );

  const months = ageInMonths(state.child.dob);
  $('#today-age').textContent = formatAge(months);

  const band = months == null ? null : bandForAgeMonths(months);
  $('#today-band').textContent = band ? pick(band, '') || band.en : '—';

  // The five areas. Short labels, area colour, tapped to hear the full Finnish
  // name — the first place speech is actually wired to something real.
  const wrap = $('#today-areas');
  wrap.innerHTML = '';
  Object.values(LEARNING_AREAS).forEach(area => {
    const el = document.createElement('button');
    el.className = `area area-${area.id}`;
    el.type = 'button';
    el.innerHTML = `<span class="dot"></span><span class="nm">${t('area_short_' + area.id)}</span>`;
    el.addEventListener('click', () => {
      speech.unlock();
      speech.speak(pick(area, ''), LANGS[getLang()].speech);
    });
    wrap.appendChild(el);
  });

  renderMovement();
  renderPlayLeft();
}

function renderPlayLeft () {
  play.minutesLeft().then(min => {
    const pill = $('#today-play-left');
    const go = $('#today-play');
    pill.textContent = min > 0 ? `${min} ${t('set_minutes').split(' ')[0]}` : '0';
    go.disabled = min <= 0;
    go.textContent = min > 0 ? t('today_play_go') : t('today_play_none');
  });
}

function renderMovement () {
  const done = state.movement[todayKey()] || 0;
  const goal = CONSTRAINTS.dailyMovementMinutes.total;
  const pct = Math.min(100, Math.round((done / goal) * 100));

  $('#today-move-num').textContent = `${Math.floor(done / 60)}h ${done % 60}m / ${goal / 60}h`;
  $('#today-move-bar').style.width = pct + '%';
}

function renderSettings () {
  $('#set-lang').value = getLang();
  $('#set-name').value = state.child ? state.child.name : '';
  $('#set-dob').value = state.child ? state.child.dob : '';
  $('#set-screen').value = state.screenCap;

  const standalone = window.navigator.standalone === true ||
                     window.matchMedia('(display-mode: standalone)').matches;
  $('#set-install-text').textContent = standalone ? t('set_installed') : t('set_install_how');

  store.storageEstimate().then(est => {
    if (!est) return;
    const mb = b => (b / 1048576).toFixed(1);
    $('#set-storage').textContent = `${mb(est.usage || 0)} MB / ${mb(est.quota || 0)} MB`;
  });

  fillVoicePickers();
}

function fillVoicePickers () {
  speech.ready().then(() => {
    [['bg', '#set-voice-bg'], ['en', '#set-voice-en']].forEach(([code, sel]) => {
      const el = $(sel);
      const list = speech.voicesFor(LANGS[code].speech);
      el.innerHTML = '';

      if (!list.length) {
        const o = document.createElement('option');
        o.textContent = t('set_voice_none');
        el.appendChild(o);
        el.disabled = true;
        return;
      }

      el.disabled = false;
      list.forEach(v => {
        const o = document.createElement('option');
        o.value = v.name;
        o.textContent = `${v.name} · ${v.lang}`;
        el.appendChild(o);
      });

      speech.getPreferred(LANGS[code].speech).then(v => { if (v) el.value = v.name; });
    });
  });
}

/* ===================== persistence ===================== */

function loadAll () {
  return Promise.all([
    store.get('child'),
    store.get('lang'),
    store.get('screenCap'),
    store.get('movement')
  ]).then(([child, lang, cap, movement]) => {
    state.child = child || null;
    state.screenCap = typeof cap === 'number' ? cap : CONSTRAINTS.childScreenMinutesDefault.value;
    state.movement = movement || {};
    setLang(lang || 'bg');
  });
}

/* ===================== wiring ===================== */

function wireSetup () {
  $('#setup-lang').addEventListener('change', e => {
    setLang(e.target.value);
    applyStrings();
  });

  $('#setup-go').addEventListener('click', () => {
    const name = $('#setup-name').value.trim();
    const dob = $('#setup-dob').value;

    // Do not block on a missing date — a parent can fill it in later, and an
    // app that refuses to start is worse than one that starts unbanded.
    if (!name) { $('#setup-name').focus(); return; }

    state.child = { name, dob };
    speech.unlock();

    Promise.all([
      store.set('child', state.child),
      store.set('lang', getLang())
    ]).then(() => show('today'));
  });
}

function wirePlay () {
  $('#today-play').addEventListener('click', () => {
    speech.unlock();
    show('play');
    play.open($('#play-stage'), () => show('today'));
  });

  $('#play-exit').addEventListener('click', () => {
    play.close().then(() => show('today'));
  });
}

function wireTabs () {
  $$('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      speech.unlock();
      show(btn.dataset.view);
    });
  });
}

function wireSettings () {
  $('#set-lang').addEventListener('change', e => {
    setLang(e.target.value);
    store.set('lang', getLang());
    applyStrings();
    renderSettings();
  });

  const saveChild = () => {
    state.child = {
      name: $('#set-name').value.trim() || (state.child ? state.child.name : ''),
      dob: $('#set-dob').value
    };
    store.set('child', state.child);
  };
  $('#set-name').addEventListener('change', saveChild);
  $('#set-dob').addEventListener('change', saveChild);

  $('#set-screen').addEventListener('change', e => {
    const ceiling = CONSTRAINTS.childScreenMinutesDefault.ceiling;
    // Clamp in code, not just in the input's max attribute — the WHO ceiling is
    // a product constraint and a typed value must not slip past it.
    let v = parseInt(e.target.value, 10);
    if (isNaN(v) || v < 0) v = 0;
    if (v > ceiling) v = ceiling;
    state.screenCap = v;
    e.target.value = v;
    store.set('screenCap', v);
  });

  [['#set-voice-bg', 'bg'], ['#set-voice-en', 'en']].forEach(([sel, code]) => {
    $(sel).addEventListener('change', e => {
      speech.setPreferred(LANGS[code].speech, e.target.value);
    });
  });

  $('#set-voice-try').addEventListener('click', () => {
    speech.unlock();
    const name = state.child ? state.child.name : '';
    const line = getLang() === 'bg'
      ? `Здравей, ${name}. Да поиграем.`
      : `Hello, ${name}. Let's play.`;
    speech.speak(line, LANGS[getLang()].speech);
  });

  $('#set-export').addEventListener('click', () => {
    store.exportAll().then(data => {
      store.downloadBackup(data, state.child ? state.child.name : 'child');
    });
  });

  $('#set-import-btn').addEventListener('click', () => $('#set-import').click());

  $('#set-import').addEventListener('change', e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    file.text()
      .then(txt => store.importAll(JSON.parse(txt)))
      .then(() => loadAll())
      .then(() => { applyStrings(); alert(t('set_import_ok')); show('today'); })
      .catch(() => alert(t('set_import_bad')))
      .then(() => { e.target.value = ''; });
  });

  $('#set-reset').addEventListener('click', () => {
    if (!confirm(t('set_reset_warn'))) return;
    store.eraseAll().then(() => {
      state.child = null;
      state.movement = {};
      show('setup');
      applyStrings();
    });
  });
}

/**
 * Movement logging. Deliberately present in the shell rather than deferred:
 * a meter that cannot move is decoration, and movement is the single
 * highest-value thing in the whole method (FINNISH_METHOD.md §6).
 */
function wireMovement () {
  const card = $('#today-move-bar').closest('.card');

  const row = document.createElement('div');
  row.className = 'row-between';
  [15, 30, 60].forEach(min => {
    const b = document.createElement('button');
    b.className = 'ghost';
    b.type = 'button';
    b.style.flex = '1';
    b.textContent = `+${min}m`;
    b.addEventListener('click', () => {
      const k = todayKey();
      state.movement[k] = (state.movement[k] || 0) + min;
      store.set('movement', state.movement);
      renderMovement();
    });
    row.appendChild(b);
  });
  card.appendChild(row);
}

/* ===================== service worker ===================== */

function registerSw () {
  if (!('serviceWorker' in navigator)) return;
  // Only registers over HTTPS or localhost. Failing here is expected during
  // local file:// development and must never break the app.
  navigator.serviceWorker.register('sw.js')
    .then(reg => {
      // Ask for a new worker on every launch. Without this the browser only
      // checks sw.js occasionally, and a deployed fix can sit unseen for days
      // on a device that is opened, used, and closed each morning.
      reg.update().catch(() => {});
    })
    .catch(err => {
      console.info('[app] service worker not registered:', err.message);
    });
}

/* ===================== go ===================== */

function boot () {
  const missing = auditStrings();
  if (missing.length) console.warn('[i18n] untranslated:', missing);

  wireSetup();
  wireTabs();
  wireSettings();
  wirePlay();

  loadAll().then(() => {
    applyStrings();
    wireMovement();
    show(state.child ? 'today' : 'setup');
    speech.ready();
  });

  // First touch anywhere buys the right to speak later (iOS gesture rule).
  document.addEventListener('touchstart', speech.unlock, { once: true, passive: true });
  document.addEventListener('mousedown', speech.unlock, { once: true });

  registerSw();
}

boot();

// Exposed for the browser-console checks in the verification step.
window.__fey = { state, show, speech, store };
