/**
 * Bilingual strings — Bulgarian and English.
 *
 * The language is an EXPLICIT setting, never inferred from navigator.language.
 * The target iPad reports `en-GB` as its system locale despite the household
 * being Bulgarian, so locale detection would have silently shipped an
 * English-only app to a bilingual child. (DECISIONS.md D8.)
 */

export const LANGS = {
  bg: { code: 'bg', speech: 'bg-BG', label: 'Български' },
  en: { code: 'en', speech: 'en-GB', label: 'English' }
};

export const STRINGS = {
  /* --- shell --- */
  app_name:        { bg: 'Ранни години',            en: 'Early Years' },
  app_tagline:     { bg: 'Финландският метод, за едно дете.',
                     en: 'The Finnish method, one child at a time.' },

  /* --- navigation --- */
  nav_today:       { bg: 'Днес',        en: 'Today' },
  nav_observe:     { bg: 'Наблюдения',  en: 'Observe' },
  nav_plan:        { bg: 'Планът ѝ',    en: 'Her plan' },
  nav_settings:    { bg: 'Настройки',   en: 'Settings' },

  /* --- setup --- */
  setup_title:     { bg: 'Да започнем',  en: 'Let’s begin' },
  setup_intro:     { bg: 'Само две неща. Всичко останало приложението научава, като я наблюдавате.',
                     en: 'Just two things. Everything else the app learns by watching her.' },
  setup_name:      { bg: 'Име на детето', en: 'Child’s name' },
  setup_name_ph:   { bg: 'напр. Мария',   en: 'e.g. Maria' },
  setup_dob:       { bg: 'Дата на раждане', en: 'Date of birth' },
  setup_dob_help:  { bg: 'Използва се само за първоначален подбор. След първите наблюдения нивото ѝ води, не възрастта.',
                     en: 'Used only to seed the first activities. After the first observations her level leads, not her age.' },
  setup_start:     { bg: 'Напред',        en: 'Continue' },
  setup_lang:      { bg: 'Език на приложението', en: 'App language' },

  /* --- today --- */
  today_hello:     { bg: 'Днес с',        en: 'Today with' },
  today_age:       { bg: 'Възраст',       en: 'Age' },
  today_band:      { bg: 'Начална група', en: 'Starting band' },
  today_areas:     { bg: 'Петте области на учене', en: 'The five learning areas' },
  today_movement:  { bg: 'Движение днес', en: 'Movement today' },
  today_move_goal: { bg: 'Целта е 3 часа на ден, от които поне 1 час активно.',
                     en: 'The target is 3 hours a day, at least 1 of it vigorous.' },
  today_activities:     { bg: 'Днешните дейности', en: 'Today’s activities' },
  today_activities_sub: { bg: 'без екран',         en: 'off the screen' },
  act_materials:        { bg: 'Нужно',             en: 'You need' },
  act_look:             { bg: 'Наблюдавайте',      en: 'Watch for' },
  act_outdoor:          { bg: 'навън',             en: 'outdoors' },
  act_moves:            { bg: 'движение',          en: 'movement' },
  soon_observe:         { bg: 'Тук ще записвате какво е правила и какво я е увлякло. Тези бележки ще определят нивото ѝ по всяка област — не възрастта.',
                          en: 'This is where you will record what she did and what held her. Those notes will set her level in each area — not her age.' },
  soon_plan:            { bg: 'Тук ще се вижда къде е тя по всяка от петте области, според вашите наблюдения.',
                          en: 'This will show where she stands in each of the five areas, built from your observations.' },

  /* --- play --- */
  today_play:      { bg: 'Игри',            en: 'Play' },
  today_play_go:   { bg: 'Да поиграем',     en: 'Let’s play' },
  today_play_exit: { bg: 'Излез',           en: 'Exit' },
  today_play_help: { bg: 'Четири игри, водени от гласа. Спират сами, когато времето за днес свърши.',
                     en: 'Four voice-led games. They stop on their own when today’s time runs out.' },
  today_play_none: { bg: 'Няма време днес',  en: 'No time left today' },

  /* --- areas (short labels; full names live in curriculum.js) --- */
  area_short_L1:   { bg: 'Език',       en: 'Language' },
  area_short_L2:   { bg: 'Изразяване', en: 'Expression' },
  area_short_L3:   { bg: 'Общност',    en: 'Community' },
  area_short_L4:   { bg: 'Изследване', en: 'Exploring' },
  area_short_L5:   { bg: 'Движение',   en: 'Moving' },

  /* --- settings --- */
  set_language:    { bg: 'Език',                en: 'Language' },
  set_child:       { bg: 'Детето',              en: 'Child' },
  set_screen:      { bg: 'Време пред екрана',   en: 'Screen time' },
  set_screen_help: { bg: 'Дневна граница за игрите. СЗО препоръчва най-много 1 час на ден за 2–4 години — по-малко е по-добре.',
                     en: 'Daily limit for the games. WHO recommends at most 1 hour a day at ages 2–4 — less is better.' },
  set_minutes:     { bg: 'минути на ден',       en: 'minutes a day' },
  set_voice:       { bg: 'Глас',                en: 'Voice' },
  set_voice_test:  { bg: 'Чуй гласа',           en: 'Hear the voice' },
  set_voice_bg:    { bg: 'Български глас',      en: 'Bulgarian voice' },
  set_voice_en:    { bg: 'Английски глас',      en: 'English voice' },
  set_voice_none:  { bg: 'Няма наличен глас за този език.',
                     en: 'No voice available for this language.' },
  set_data:        { bg: 'Данни',               en: 'Data' },
  set_export:      { bg: 'Запази копие',        en: 'Save a backup' },
  set_export_help: { bg: 'Всичко за детето стои само на този iPad. Нищо не се изпраща никъде. Затова правете копие редовно — Safari може да изчисти данните си.',
                     en: 'Everything about her stays on this iPad alone. Nothing is sent anywhere. So make a backup regularly — Safari can clear its own storage.' },
  set_import:      { bg: 'Възстанови от копие', en: 'Restore from a backup' },
  set_import_ok:   { bg: 'Възстановено.',       en: 'Restored.' },
  set_import_bad:  { bg: 'Файлът не е разпознат. Изберете файл, запазен от това приложение.',
                     en: 'That file was not recognised. Choose a file saved by this app.' },
  set_install:     { bg: 'Инсталиране',         en: 'Install' },
  set_install_how: { bg: 'Отворете в Safari (не Chrome), после Споделяне → Към началния екран. Само Safari създава истинско приложение.',
                     en: 'Open in Safari (not Chrome), then Share → Add to Home Screen. Only Safari makes a real app.' },
  set_installed:   { bg: 'Инсталирано е. ✓',    en: 'Installed. ✓' },
  set_reset:       { bg: 'Изчисти всичко',      en: 'Erase everything' },
  set_reset_warn:  { bg: 'Това изтрива всички наблюдения. Сигурни ли сте?',
                     en: 'This deletes every observation. Are you sure?' },

  /* --- generic --- */
  years:           { bg: 'г.',      en: 'yrs' },
  months:          { bg: 'м.',      en: 'mo' },
  cancel:          { bg: 'Отказ',   en: 'Cancel' },
  save:            { bg: 'Запази',  en: 'Save' },
  soon:            { bg: 'Следва',  en: 'Next up' }
};

let current = 'bg';

export function setLang (code) {
  if (LANGS[code]) current = code;
  document.documentElement.setAttribute('lang', current);
  return current;
}

export function getLang () { return current; }

export function speechLang () { return LANGS[current].speech; }

/** Look up a string. Missing keys shout rather than render blank. */
export function t (key) {
  const entry = STRINGS[key];
  if (!entry) {
    console.warn('[i18n] missing key:', key);
    return `⟨${key}⟩`;
  }
  return entry[current] ?? entry.en;
}

/** Pick the right half of a bilingual field on a curriculum node. */
export function pick (node, base) {
  if (!node) return '';
  return node[`${base}_${current}`] ?? node[current] ?? node[`${base}_en`] ?? node.en ?? '';
}

/** Every string must exist in both languages — a half-translated app is a bug. */
export function auditStrings () {
  const missing = [];
  for (const [key, entry] of Object.entries(STRINGS)) {
    for (const code of Object.keys(LANGS)) {
      if (!entry[code]) missing.push(`${key}.${code}`);
    }
  }
  return missing;
}
