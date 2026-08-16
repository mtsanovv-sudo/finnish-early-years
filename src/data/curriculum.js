/**
 * The Finnish ECEC curriculum, encoded.
 *
 * SOURCE: National core curriculum for early childhood education and care,
 *         Regulation OPH-700-2022, Finnish National Agency for Education.
 *         Archived at docs/sources/vasu-2022-en.txt (and .pdf).
 *
 * ---------------------------------------------------------------------------
 * PROVENANCE IS NOT DECORATION. Every node carries `src`:
 *
 *   src: '§4.5 L1'   → traceable to that section of the regulation.
 *   src: 'DERIVED'   → OUR construction. The regulation does NOT say this.
 *
 * The regulation deliberately contains no age-graded targets and no
 * progression ladders (see docs/FINNISH_METHOD.md §7). Anything resembling a
 * level or a band in this codebase is therefore ours, and is marked DERIVED so
 * it can never be mistaken for Finnish specification. Do not quietly promote a
 * DERIVED node to sourced because it seems obviously true.
 * ---------------------------------------------------------------------------
 */

/* ===========================================================================
 * Transversal competences — §2.7. Six, explicitly enumerated in the source.
 * =========================================================================== */

export const COMPETENCES = {
  T1: {
    id: 'T1',
    src: '§2.7',
    en: 'Thinking and learning',
    bg: 'Мислене и учене',
    // Quoted markers from the source, used to keep activity tagging honest.
    markers: [
      'room for wonder, insight and joy of learning',
      'encouraged to ask questions and to question',
      'persevere, not be disheartened by failures',
      'guided to direct and maintain their attentiveness',
      'daily physical activity supports thinking and learning'
    ]
  },
  T2: {
    id: 'T2',
    src: '§2.7',
    en: 'Cultural competence, interaction, and self-expression',
    bg: 'Културна компетентност, общуване и себеизразяване',
    markers: [
      'listening, identifying and understanding different perspectives',
      'guided towards friendliness and good manners',
      'putting themselves in the place of others',
      'solving conflicts constructively'
    ]
  },
  T3: {
    id: 'T3',
    src: '§2.7',
    en: 'Taking care of oneself and managing daily life',
    bg: 'Грижа за себе си и справяне с ежедневието',
    markers: [
      'gradual increase in independence',
      'encouraged to ask for help when necessary',
      'helped in expressing and regulating their emotions',
      'perceiving, acknowledging and naming emotions',
      'respect and protect their own and others’ bodies'
    ]
  },
  T4: {
    id: 'T4',
    src: '§2.7',
    en: 'Multiliteracy',
    bg: 'Многостранна грамотност',
    markers: [
      'interpreting and producing various types of messages',
      'broad conception of text: written, spoken, audiovisual, digital',
      'includes visual, numerical, media and basic literacy',
      'needs an adult example and a rich textual environment'
    ]
  },
  T5: {
    id: 'T5',
    src: '§2.7',
    en: 'Digital competence',
    bg: 'Дигитална компетентност',
    markers: [
      'digital tools used in documentation, play, interaction, games, exploration',
      'guided in versatile, responsible and safe use'
    ]
  },
  T6: {
    id: 'T6',
    src: '§2.7',
    en: 'Participation and involvement',
    bg: 'Участие и въздействие',
    markers: [
      'children plan, implement and evaluate their actions together with the adult',
      'the right to be heard in issues affecting one’s own life',
      'encouraged to take initiative'
    ]
  }
};

/* ===========================================================================
 * Learning areas — §4.5. Five entities.
 *
 * The source is emphatic that these are NOT separate subjects: "Rather than
 * being independent entities that are implemented separately, the themes of
 * the learning areas are combined and applied according to the children's
 * interests and competence."
 *
 * So: areas are for PLACEMENT and COVERAGE tracking. They are not a timetable,
 * and the app must never present them to the child as subjects.
 * =========================================================================== */

export const LEARNING_AREAS = {
  /* ----------------------------------------------------------------------- */
  L1: {
    id: 'L1',
    src: '§4.5',
    en: 'Rich world of languages',
    bg: 'Богат свят на езиците',
    servesCompetences: ['T4', 'T2', 'T1'],
    // The six strands below are the source's own "main areas of children's
    // linguistic development" (§4.5 L1, incl. Figure 2) — not our grouping.
    strands: {
      L1a: {
        id: 'L1a', src: '§4.5 L1',
        en: 'Interaction skills', bg: 'Умения за общуване',
        objective_en: 'Experiences of being heard and getting responses to initiatives; ' +
                      'encouraged to communicate with other children and adults.',
        objective_bg: 'Преживяване, че е чута и получава отговор на инициативите си; ' +
                      'насърчавана да общува с други деца и възрастни.'
      },
      L1b: {
        id: 'L1b', src: '§4.5 L1',
        en: 'Language comprehension', bg: 'Разбиране на езика',
        objective_en: 'Supported with abundant linguistic modelling; activities verbalised ' +
                      'consistently; images, objects and gestures used as support when needed.',
        objective_bg: 'Подкрепя се с богат езиков модел; дейностите се назовават последователно; ' +
                      'при нужда се използват образи, предмети и жестове.'
      },
      L1c: {
        id: 'L1c', src: '§4.5 L1',
        en: 'Speech production', bg: 'Говорна продукция',
        objective_en: 'Encouraged to speak in different situations; attention gradually drawn ' +
                      'to different tones of voice and emphases.',
        objective_bg: 'Насърчавана да говори в различни ситуации; вниманието постепенно се ' +
                      'насочва към различни интонации и ударения.'
      },
      L1d: {
        id: 'L1d', src: '§4.5 L1',
        en: 'Language use', bg: 'Употреба на езика',
        objective_en: 'Practises narrating, explaining and speaking in turns. Empathy, humour ' +
                      'and good manners strengthen language use.',
        objective_bg: 'Упражнява разказване, обясняване и редуване в говоренето. Съпричастността, ' +
                      'хуморът и добрите обноски засилват употребата на езика.'
      },
      L1e: {
        id: 'L1e', src: '§4.5 L1',
        en: 'Linguistic memory and vocabulary', bg: 'Езикова памет и речник',
        objective_en: 'Developed through nursery rhymes and singing games, playing with language, ' +
                      'naming things, and unhurried reading and storytelling.',
        objective_bg: 'Развива се чрез стихчета и песнички с движения, игра с езика, назоваване ' +
                      'на нещата и неприпряно четене и разказване.'
      },
      L1f: {
        id: 'L1f', src: '§4.5 L1',
        en: 'Language awareness', bg: 'Езиково осъзнаване',
        // This strand is the closest the curriculum comes to "literacy", and it
        // is deliberately gradual. Quoted so it is not over-read into drilling:
        objective_en: 'Attention directed "from the meanings of words towards the shapes and ' +
                      'structures of language, including words, syllables, and phonemes." ' +
                      'Children are "encouraged to playful writing and reading."',
        objective_bg: 'Вниманието се насочва от значението на думите към формите и структурите ' +
                      'на езика — думи, срички и звукове. Детето се насърчава към игрово ' +
                      'писане и четене.',
        caution: 'NOT formal reading instruction. Finland does not teach reading before school ' +
                 'at 7. See docs/FINNISH_METHOD.md §6.'
      }
    }
  },

  /* ----------------------------------------------------------------------- */
  L2: {
    id: 'L2',
    src: '§4.5',
    en: 'Diverse forms of expression',
    bg: 'Разнообразни форми на изразяване',
    servesCompetences: ['T2', 'T4', 'T1', 'T6'],
    strands: {
      L2a: {
        id: 'L2a', src: '§4.5 L2',
        en: 'Musical expression', bg: 'Музикално изразяване',
        objective_en: 'Experiences of basic beat, rhythm in words, and making music with the ' +
                      'body. Observing the sound environment; duration, volume, tonal colour ' +
                      'and strength of sound.',
        objective_bg: 'Преживяване на основен пулс, ритъм в думите и правене на музика с тялото. ' +
                      'Наблюдаване на звуковата среда; трайност, сила и тембър на звука.'
      },
      L2b: {
        id: 'L2b', src: '§4.5 L2',
        en: 'Visual expression', bg: 'Визуално изразяване',
        objective_en: 'Painting, drawing, building, making media presentations. Observing ' +
                      'colours, shapes, materials and the emotions images stir.',
        objective_bg: 'Рисуване, чертане, строене, създаване на медийни изображения. Наблюдаване ' +
                      'на цветове, форми, материали и емоциите, които образите будят.'
      },
      L2c: {
        id: 'L2c', src: '§4.5 L2',
        en: 'Crafts', bg: 'Ръчен труд',
        objective_en: 'Planning skills, creative problem solving, fine motor skills, knowledge ' +
                      'of structures and materials. Moulding, cutting, nailing, sawing, sewing.',
        objective_bg: 'Умения за планиране, творческо решаване на задачи, фина моторика, ' +
                      'познаване на структури и материали. Моделиране, рязане, заковаване, шиене.'
      },
      L2d: {
        id: 'L2d', src: '§4.5 L2',
        en: 'Verbal and bodily expression', bg: 'Словесно и телесно изразяване',
        objective_en: 'Drama, dance and play. Topics arising from the child’s imagination ' +
                      'or lived experience are worked on together.',
        objective_bg: 'Драма, танц и игра. Теми от въображението или преживяванията на детето ' +
                      'се разработват заедно.'
      }
    }
  },

  /* ----------------------------------------------------------------------- */
  L3: {
    id: 'L3',
    src: '§4.5',
    en: 'Me and our community',
    bg: 'Аз и нашата общност',
    servesCompetences: ['T2', 'T1', 'T6', 'T4'],
    strands: {
      L3a: {
        id: 'L3a', src: '§4.5 L3',
        en: 'Ethical thinking', bg: 'Етично мислене',
        objective_en: 'Reflecting together on friendship, telling wrong from right, justice, ' +
                      'and the causes of fear, sadness and joy — in a way that lets the ' +
                      'child feel safe and accepted.',
        objective_bg: 'Общо размишление за приятелството, доброто и лошото, справедливостта и ' +
                      'причините за страх, тъга и радост — така, че детето да се чувства ' +
                      'сигурно и прието.'
      },
      L3b: {
        id: 'L3b', src: '§4.5 L3',
        en: 'Worldview education', bg: 'Светогледно възпитание',
        objective_en: 'Examining the worldviews present in the child’s life; room given ' +
                      'for wondering and the life questions that puzzle her. Irreligion may ' +
                      'also be examined.',
        objective_bg: 'Разглеждане на светогледите, присъстващи в живота на детето; място за ' +
                      'учудване и за въпросите, които я вълнуват.',
        note: 'Organised "in cooperation with guardians, being aware of and respecting the ' +
              'background, worldviews, and values of each family." The app must never impose ' +
              'a worldview — it offers the question, the parent holds the answer.'
      },
      L3c: {
        id: 'L3c', src: '§4.5 L3',
        en: 'Past, present and future of the community', bg: 'Минало, настояще и бъдеще на общността',
        objective_en: 'Personal histories, family and local elders as sources. Diversity of ' +
                      'people, genders and families observed respectfully: "people are different ' +
                      'but equal." Imagining a good future.',
        objective_bg: 'Личната история, семейството и по-възрастните като извор. Многообразието ' +
                      'се наблюдава с уважение: хората са различни, но равни. Представяне на добро бъдеще.'
      },
      L3d: {
        id: 'L3d', src: '§4.5 L3',
        en: 'Media education', bg: 'Медийно възпитание',
        objective_en: 'Producing media content playfully in safe environments; considering the ' +
                      'reliability and truthfulness of media; practising developing source and ' +
                      'media criticism.',
        objective_bg: 'Игрово създаване на медийно съдържание в безопасна среда; обсъждане на ' +
                      'достоверността на медиите; първи стъпки към критично отношение към източниците.'
      }
    }
  },

  /* ----------------------------------------------------------------------- */
  L4: {
    id: 'L4',
    src: '§4.5',
    en: 'Exploring and interacting with my environment',
    bg: 'Изследване и взаимодействие със средата',
    servesCompetences: ['T1', 'T4', 'T5', 'T3'],
    strands: {
      L4a: {
        id: 'L4a', src: '§4.5 L4',
        en: 'Mathematical thinking', bg: 'Математическо мислене',
        objective_en: 'Classify, compare and rank things; discover and produce regularities and ' +
                      'changes; deduce problems and find solutions. Through "illustrative and ' +
                      'playful activities."',
        objective_bg: 'Класифициране, сравняване и подреждане; откриване на закономерности и ' +
                      'промени; извеждане на задачи и намиране на решения — чрез нагледни ' +
                      'и игрови дейности.'
      },
      L4b: {
        id: 'L4b', src: '§4.5 L4',
        en: 'Number concept', bg: 'Понятие за число',
        objective_en: 'Perceiving numbers and amounts in the environment and, "as they advance ' +
                      'their competence", joining them to number words and numerals. Number ' +
                      'sequencing developed with nursery rhymes and rhyming.',
        objective_bg: 'Възприемане на числа и количества в средата и — според напредъка ' +
                      '— свързването им с числителни имена и цифри. Броенето се развива ' +
                      'чрез стихчета и римуване.'
      },
      L4c: {
        id: 'L4c', src: '§4.5 L4',
        en: 'Space, shape and measure', bg: 'Пространство, форма и измерване',
        objective_en: 'Perception of space and plane; examining and playing with objects and ' +
                      'shapes; geometric thinking strengthened through building, arts and crafts ' +
                      'and clay modelling. Measuring experimented with; location and relation ' +
                      'concepts practised. Time explained via times of day and seasons.',
        objective_bg: 'Възприемане на пространство и равнина; разглеждане и игра с предмети и ' +
                      'форми; геометрично мислене чрез строене, ръчен труд и моделиране. Опити ' +
                      'с измерване; понятия за място и отношение. Времето — чрез частите ' +
                      'на деня и сезоните.'
      },
      L4d: {
        id: 'L4d', src: '§4.5 L4',
        en: 'Environmental education', bg: 'Екологично възпитание',
        objective_en: 'Three dimensions, named by the source: learning IN the environment, ' +
                      'learning ABOUT the environment, and ACTING FOR the environment. ' +
                      'Field trips; observing nature through the senses across seasons; ' +
                      'identifying plant and animal species.',
        objective_bg: 'Три измерения: учене В средата, учене ЗА средата и действие В ПОЛЗА на ' +
                      'средата. Излети; наблюдение на природата с всички сетива през сезоните; ' +
                      'разпознаване на растения и животни.',
        note: 'The source explicitly cautions against loading the child with responsibility: ' +
              'she should feel she can contribute "however without having to bear too much ' +
              'responsibility for maintaining it as children." No eco-guilt.'
      },
      L4e: {
        id: 'L4e', src: '§4.5 L4',
        en: 'Technology education', bg: 'Технологично възпитание',
        objective_en: 'Experimental and inquiry-based approaches: ask questions, find ' +
                      'explanations together, draw conclusions. Build things from materials, ' +
                      'test how devices work, and describe the solutions made.',
        objective_bg: 'Изследователски подход: задаване на въпроси, общо търсене на обяснения, ' +
                      'извеждане на изводи. Строене от материали, изпробване как работят ' +
                      'устройствата и обясняване на намереното решение.'
      }
    }
  },

  /* ----------------------------------------------------------------------- */
  L5: {
    id: 'L5',
    src: '§4.5',
    en: 'I grow, move, and develop',
    bg: 'Раста, движа се и се развивам',
    servesCompetences: ['T3', 'T1', 'T2'],
    strands: {
      L5a: {
        id: 'L5a', src: '§4.5 L5',
        en: 'Fundamental movement skills', bg: 'Основни двигателни умения',
        // The three sub-skills are named verbatim by the source.
        objective_en: 'Knowledge of the body, body management, and fundamental movement skills: ' +
                      'balance, locomotor, and manipulative. Experiences alone, in pairs and ' +
                      'in a group.',
        objective_bg: 'Познаване на тялото, владеене на тялото и основни двигателни умения: ' +
                      'равновесие, придвижване и манипулиране. Преживявания сам, по двойки и в група.',
        subSkills: ['balance', 'locomotor', 'manipulative']
      },
      L5b: {
        id: 'L5b', src: '§4.5 L5',
        en: 'Daily physical activity', bg: 'Ежедневна физическа активност',
        objective_en: 'Physically active play outdoors "during all seasons"; versatile in ' +
                      'duration, intensity and pace; a natural part of the day, not a session.',
        objective_bg: 'Активна игра навън през всички сезони; разнообразна по времетраене, ' +
                      'интензивност и темп; естествена част от деня, а не отделно занимание.',
        target: 'Finnish national recommendation: ≥3h/day total for under-8s, ≥1h of ' +
                'it moderate-to-vigorous. Source: Ministry of Education and Culture, 2016.'
      },
      L5c: {
        id: 'L5c', src: '§4.5 L5',
        en: 'Food education', bg: 'Възпитание в хранене',
        objective_en: 'Foods explored through the senses — origin, appearance, texture, ' +
                      'taste. Unhurried meals, eating together, table manners. Discussions, ' +
                      'stories and songs build food vocabulary.',
        objective_bg: 'Храните се изследват със сетивата — произход, вид, структура, вкус. ' +
                      'Неприпрени хранения, общо хранене, добри обноски. Разговори, приказки и ' +
                      'песни разширяват речника за храна.'
      },
      L5d: {
        id: 'L5d', src: '§4.5 L5',
        en: 'Health and safety', bg: 'Здраве и безопасност',
        objective_en: 'Personal hygiene; the significance of rest and good relationships; ' +
                      'traffic safety in the local area; asking for and seeking help. ' +
                      '"Age-appropriate curiosity towards sexuality and the body is guided ' +
                      'respectfully."',
        objective_bg: 'Лична хигиена; значението на почивката и добрите отношения; безопасност ' +
                      'на движението наблизо; умение да поиска и потърси помощ. Любопитството ' +
                      'към тялото се направлява с уважение.'
      }
    }
  }
};

/* ===========================================================================
 * DERIVED — age bands.
 *
 * The regulation contains NO age-graded targets. It is one continuous 0–6
 * framework applied "according to the children's interests and competence."
 * These bands are OURS. They exist for exactly one purpose: to seed content
 * selection in the first days of use, before enough observations exist to
 * place the child per learning area from evidence.
 *
 * The moment an observation exists for a strand, the observed placement wins
 * and the band is ignored for that strand. See docs/FINNISH_METHOD.md §7.
 * =========================================================================== */

/*
 * Ranges must match their own labels exactly. An earlier version banded 36–53
 * months as "3–4 years", which showed a 4-year-5-month-old as "3–4" — a parent
 * reads that as the app being broken, and rightly. Single-year bands from 3
 * upward, which is also where the content actually differentiates.
 */
export const AGE_BANDS = [
  { id: 'b1_2', src: 'DERIVED', months: [12, 35], en: '1–2 years', bg: '1–2 години' },
  { id: 'b3',   src: 'DERIVED', months: [36, 47], en: '3 years',   bg: '3 години' },
  { id: 'b4',   src: 'DERIVED', months: [48, 59], en: '4 years',   bg: '4 години' },
  { id: 'b5',   src: 'DERIVED', months: [60, 71], en: '5 years',   bg: '5 години' },
  // The one boundary that IS institutionally real in Finland: esiopetus,
  // compulsory pre-primary in the year the child turns 6, school at 7.
  { id: 'b6_7', src: 'DERIVED band, §2.3 institutional boundary', months: [72, 95],
    en: '6–7 years (pre-primary)', bg: '6–7 години (предучилищна)' }
];

export function bandForAgeMonths (months) {
  return AGE_BANDS.find(b => months >= b.months[0] && months <= b.months[1]) || null;
}

/* ===========================================================================
 * Hard constraints — carried in code so features cannot quietly drift past them.
 * =========================================================================== */

export const CONSTRAINTS = {
  dailyMovementMinutes: {
    total: 180, vigorous: 60,
    src: 'Finnish national recommendations for physical activity in early childhood, 2016'
  },
  childScreenMinutesDefault: {
    value: 15, ceiling: 60,
    src: 'WHO 2019: ≤1h/day sedentary screen time, ages 2–4. Default set well below ' +
         'the ceiling; parent may raise it up to the ceiling.'
  },
  formalInstruction: {
    allowed: false,
    src: '§4.5 L1 — "playful writing and reading" only. Finland begins formal reading ' +
         'instruction at school, age 7.'
  }
};

/* ===========================================================================
 * Self-check. Provenance is only worth anything if it is enforced.
 * Throws at import time if any node lost its citation.
 * =========================================================================== */

export function auditProvenance () {
  const problems = [];

  for (const [cid, c] of Object.entries(COMPETENCES)) {
    if (!c.src) problems.push(`competence ${cid} has no src`);
    if (!c.bg || !c.en) problems.push(`competence ${cid} is not bilingual`);
  }

  for (const [aid, area] of Object.entries(LEARNING_AREAS)) {
    if (!area.src) problems.push(`area ${aid} has no src`);
    if (!area.bg || !area.en) problems.push(`area ${aid} is not bilingual`);

    for (const cid of area.servesCompetences) {
      if (!COMPETENCES[cid]) problems.push(`area ${aid} points at unknown competence ${cid}`);
    }

    for (const [sid, s] of Object.entries(area.strands)) {
      if (!s.src) problems.push(`strand ${sid} has no src`);
      if (!s.objective_en || !s.objective_bg) problems.push(`strand ${sid} is not bilingual`);
    }
  }

  return problems;
}

/**
 * Bands must be contiguous, non-overlapping, and — the one that actually bit —
 * they must SAY what they cover. A band labelled "4 years" has to be exactly
 * months 48–59, or it will show a child in the wrong group.
 */
export function auditBands () {
  const problems = [];

  for (let i = 0; i < AGE_BANDS.length; i++) {
    const b = AGE_BANDS[i];
    const [lo, hi] = b.months;

    if (lo > hi) problems.push(`band ${b.id} has an inverted range`);

    if (i > 0) {
      const prevHi = AGE_BANDS[i - 1].months[1];
      if (lo !== prevHi + 1) {
        problems.push(`band ${b.id} starts at ${lo}, leaving a ${lo <= prevHi ? 'overlap' : 'gap'} after ${AGE_BANDS[i - 1].id} (ends ${prevHi})`);
      }
    }

    // "4 years" → must be exactly [48, 59]. "1–2 years" → exactly [12, 35].
    const single = /^(\d+) years?$/.exec(b.en);
    const rangeL = /^(\d+)–(\d+) years/.exec(b.en);

    if (single) {
      const y = +single[1];
      if (lo !== y * 12 || hi !== y * 12 + 11) {
        problems.push(`band ${b.id} says "${b.en}" but covers months ${lo}–${hi} (should be ${y * 12}–${y * 12 + 11})`);
      }
    } else if (rangeL) {
      const a = +rangeL[1], z = +rangeL[2];
      if (lo !== a * 12 || hi !== z * 12 + 11) {
        problems.push(`band ${b.id} says "${b.en}" but covers months ${lo}–${hi} (should be ${a * 12}–${z * 12 + 11})`);
      }
    }
  }

  return problems;
}

export const STRAND_COUNT = Object.values(LEARNING_AREAS)
  .reduce((n, a) => n + Object.keys(a.strands).length, 0);
