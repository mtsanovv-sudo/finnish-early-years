/**
 * The off-screen activity library.
 *
 * This is the larger half of the method. The games are a supplement; these are
 * the thing itself — done with an adult, mostly with objects already in the
 * house, often outdoors. "Play is the key working method in ECEC" (§4.4).
 *
 * Every activity carries:
 *   area / strand  — what it serves, traceable to the regulation
 *   bands          — which age bands it suits (DERIVED, see FINNISH_METHOD §7)
 *   minutes        — a realistic span, not an ambition
 *   movement       — counts toward the 3h/day national recommendation
 *   outdoor        — "children are encouraged to spend time outdoors ... during
 *                    all seasons" (§4.5 L5)
 *   look           — WHAT TO NOTICE afterwards. This is not a footnote: it is
 *                    the input to pedagogical documentation (§4.2), which is
 *                    what makes the child's plan hers rather than generic.
 *
 * The library is deliberately weighted toward L5. A day that hits three hours
 * of movement and nothing else is closer to the Finnish model than a day of
 * five tidy desk tasks.
 */

export const ACTIVITIES = [
  /* ===================== L1 · Rich world of languages ===================== */
  {
    id: 'l1-story-invent', area: 'L1', strand: 'L1e', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: false, outdoor: false,
    bg: { title: 'Измисли края', how: 'Четете позната приказка, но спрете преди края и я оставете тя да реши какво става после. Приемете всяко предложение — дори драконът да стане готвач.' },
    en: { title: 'Invent the ending', how: 'Read a familiar story but stop before the end and let her decide what happens. Accept whatever she offers — even if the dragon becomes a cook.' },
    materials: { bg: 'книжка', en: 'a picture book' },
    look: { bg: 'Колко дълга е историята ѝ? Има ли герои, място, край?', en: 'How long is her story? Does it have characters, a place, an ending?' }
  },
  {
    id: 'l1-rhyme-walk', area: 'L1', strand: 'L1f', bands: ['b3', 'b4', 'b5'],
    minutes: 20, movement: true, outdoor: true,
    bg: { title: 'Разходка с рими', how: 'На разходка намирайте думи, които звучат еднакво — „кола, топола“. Не поправяйте измислените думи; те са точно упражнението.' },
    en: { title: 'Rhyming walk', how: 'On a walk, find words that sound alike. Do not correct invented words — inventing them is exactly the exercise.' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Чува ли кога две думи си приличат по звук, не по значение?', en: 'Can she hear when two words match in sound rather than meaning?' }
  },
  {
    id: 'l1-first-sound-hunt', area: 'L1', strand: 'L1f', bands: ['b4', 'b5'],
    minutes: 10, movement: true, outdoor: false,
    bg: { title: 'Лов на звук', how: 'Изберете звук — „М“. Обиколете стаите и намерете пет неща, които започват с него. Тя води.' },
    en: { title: 'Sound hunt', how: 'Pick a sound. Walk the rooms and find five things that start with it. She leads.' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Чува ли първия звук отделно от думата?', en: 'Can she isolate the first sound from the whole word?' }
  },
  {
    id: 'l1-phone-call', area: 'L1', strand: 'L1d', bands: ['b3', 'b4'],
    minutes: 10, movement: false, outdoor: false,
    bg: { title: 'Телефонен разговор', how: 'Играйте на телефон с два банана. Тя трябва да чака реда си и да разкаже нещо, което вие не сте видели.' },
    en: { title: 'Telephone call', how: 'Play telephone with two bananas. She has to take turns and tell you something you did not see.' },
    materials: { bg: 'два предмета за телефони', en: 'two things to be phones' },
    look: { bg: 'Изчаква ли реда си? Разказва ли достатъчно, за да я разберете?', en: 'Does she wait her turn? Does she give you enough to understand?' }
  },
  {
    id: 'l1-what-happened', area: 'L1', strand: 'L1d', bands: ['b3', 'b4', 'b5'],
    minutes: 10, movement: false, outdoor: false,
    bg: { title: 'Какво стана днес', how: 'На вечеря я оставете да разкаже деня си по ред: първо, после, накрая. Слушайте без да довършвате изреченията ѝ.' },
    en: { title: 'What happened today', how: 'At dinner let her tell her day in order: first, then, last. Listen without finishing her sentences.' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Подрежда ли събитията във времето?', en: 'Does she put events in time order?' }
  },
  {
    id: 'l1-silly-voices', area: 'L1', strand: 'L1c', bands: ['b3', 'b4'],
    minutes: 10, movement: false, outdoor: false,
    bg: { title: 'Смешни гласове', how: 'Кажете едно изречение шепнешком, после гръмко, после като великан, после като мишле. Тя повтаря.' },
    en: { title: 'Silly voices', how: 'Say one sentence whispering, then loudly, then as a giant, then as a mouse. She copies.' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Управлява ли силата и височината на гласа си нарочно?', en: 'Can she control her volume and pitch on purpose?' }
  },
  {
    id: 'l1-draw-and-tell', area: 'L1', strand: 'L1f', bands: ['b4', 'b5'],
    minutes: 20, movement: false, outdoor: false,
    bg: { title: 'Нарисувай и разкажи', how: 'Тя рисува, вие записвате точно каквото каже под рисунката, дума по дума. Прочетете ѝ го обратно.' },
    en: { title: 'Draw and tell', how: 'She draws; you write exactly what she says underneath, word for word. Read it back to her.' },
    materials: { bg: 'хартия, моливи', en: 'paper, pencils' },
    look: { bg: 'Разбира ли, че писаното пази нейните думи?', en: 'Does she grasp that writing holds her words?' }
  },

  /* ================== L2 · Diverse forms of expression ================== */
  {
    id: 'l2-kitchen-band', area: 'L2', strand: 'L2a', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: true, outdoor: false,
    bg: { title: 'Кухненски оркестър', how: 'Тенджери, дървени лъжици, буркан с ориз. Пляскайте бавен пулс и я оставете да свири отгоре.' },
    en: { title: 'Kitchen band', how: 'Pans, wooden spoons, a jar of rice. Clap a slow pulse and let her play over it.' },
    materials: { bg: 'кухненски съдове', en: 'kitchen things' },
    look: { bg: 'Хваща ли пулса, или свири свободно? И двете са добре.', en: 'Does she find the pulse, or play freely? Both are fine.' }
  },
  {
    id: 'l2-mud-paint', area: 'L2', strand: 'L2b', bands: ['b3', 'b4', 'b5'],
    minutes: 30, movement: true, outdoor: true,
    bg: { title: 'Рисуване с кал', how: 'Кал, вода, стар лист картон, пръсти. Навън. Мръсните дрехи са част от дейността, не проблем.' },
    en: { title: 'Mud painting', how: 'Mud, water, an old sheet of card, fingers. Outdoors. Dirty clothes are part of it, not a problem.' },
    materials: { bg: 'кал, картон', en: 'mud, card' },
    look: { bg: 'Изследва ли материала, или бърза към резултат?', en: 'Does she explore the material, or rush to a result?' }
  },
  {
    id: 'l2-clay-animals', area: 'L2', strand: 'L2c', bands: ['b3', 'b4', 'b5'],
    minutes: 25, movement: false, outdoor: false,
    bg: { title: 'Животни от глина', how: 'Мачкайте, точете, щипете. Целта е усещането в пръстите, не приликата с животно.' },
    en: { title: 'Clay animals', how: 'Squash, roll, pinch. The point is what the fingers feel, not the likeness.' },
    materials: { bg: 'глина или пластилин', en: 'clay or plasticine' },
    look: { bg: 'Как държи материала? Използва ли двете ръце заедно?', en: 'How does she hold it? Does she use both hands together?' }
  },
  {
    id: 'l2-shadow-theatre', area: 'L2', strand: 'L2d', bands: ['b4', 'b5'],
    minutes: 20, movement: false, outdoor: false,
    bg: { title: 'Театър на сенките', how: 'Лампа към стената. Правете животни с ръце и им измислете разговор.' },
    en: { title: 'Shadow theatre', how: 'A lamp at the wall. Make animals with your hands and give them a conversation.' },
    materials: { bg: 'лампа, стена', en: 'a lamp, a wall' },
    look: { bg: 'Влиза ли в роля? Говори ли като някой друг?', en: 'Does she take a role? Does she speak as someone else?' }
  },
  {
    id: 'l2-nature-collage', area: 'L2', strand: 'L2b', bands: ['b3', 'b4', 'b5'],
    minutes: 30, movement: true, outdoor: true,
    bg: { title: 'Картина от гората', how: 'Съберете листа, клечки, камъчета. Наредете ги на земята в картина и я снимайте — не е нужно да я носите вкъщи.' },
    en: { title: 'Forest picture', how: 'Gather leaves, sticks, stones. Lay them out as a picture on the ground and photograph it — it need not come home.' },
    materials: { bg: 'каквото намерите', en: 'whatever you find' },
    look: { bg: 'Подрежда ли по цвят, размер или форма?', en: 'Does she sort by colour, size or shape?' }
  },
  {
    id: 'l2-dance-freeze', area: 'L2', strand: 'L2d', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: true, outdoor: false,
    bg: { title: 'Танцувай и замръзни', how: 'Пускате музика, тя танцува; спирате музиката — замръзва. Сменяйте бързо и бавно парче.' },
    en: { title: 'Dance and freeze', how: 'Music on, she dances; music off, she freezes. Alternate a fast piece and a slow one.' },
    materials: { bg: 'музика', en: 'music' },
    look: { bg: 'Мени ли движението според музиката? Може ли да спре наведнъж?', en: 'Does she change how she moves with the music? Can she stop at once?' }
  },
  {
    id: 'l2-box-building', area: 'L2', strand: 'L2c', bands: ['b4', 'b5'],
    minutes: 30, movement: false, outdoor: false,
    bg: { title: 'Строеж от кутии', how: 'Картонени кутии, тиксо, ножица за деца. Тя решава какво строите; вие сте помощникът.' },
    en: { title: 'Box building', how: 'Cardboard boxes, tape, child scissors. She decides what you are building; you are the assistant.' },
    materials: { bg: 'кутии, тиксо', en: 'boxes, tape' },
    look: { bg: 'Планира ли предварително, или открива в движение?', en: 'Does she plan ahead, or discover as she goes?' }
  },

  /* ==================== L3 · Me and our community ==================== */
  {
    id: 'l3-feelings-faces', area: 'L3', strand: 'L3a', bands: ['b3', 'b4', 'b5'],
    minutes: 10, movement: false, outdoor: false,
    bg: { title: 'Огледало на чувствата', how: 'Пред огледало правете лица: радостно, тъжно, ядосано, уплашено. Назовавайте ги на глас и после разкажете кога сте се чувствали така.' },
    en: { title: 'Feelings mirror', how: 'At a mirror, make faces: happy, sad, angry, scared. Name each aloud, then say when you last felt it.' },
    materials: { bg: 'огледало', en: 'a mirror' },
    look: { bg: 'Кои чувства назовава сама? Кои избягва?', en: 'Which feelings does she name unprompted? Which does she avoid?' }
  },
  {
    id: 'l3-fair-share', area: 'L3', strand: 'L3a', bands: ['b3', 'b4', 'b5'],
    minutes: 10, movement: false, outdoor: false,
    bg: { title: 'Справедливо разделяне', how: 'Дайте ѝ да раздели нещо вкусно между всички. Попитайте я защо е направила така. Не поправяйте отговора.' },
    en: { title: 'A fair share', how: 'Let her divide something nice between everyone. Ask why she did it that way. Do not correct the answer.' },
    materials: { bg: 'нещо за ядене', en: 'something to eat' },
    look: { bg: 'Мисли ли за другите, или само за количеството?', en: 'Is she thinking about the others, or only about the amount?' }
  },
  {
    id: 'l3-family-story', area: 'L3', strand: 'L3c', bands: ['b4', 'b5'],
    minutes: 20, movement: false, outdoor: false,
    bg: { title: 'Как беше едно време', how: 'Разкажете ѝ на какво сте играли като дете. Покажете стара снимка, ако имате. Оставете я да пита.' },
    en: { title: 'How it was before', how: 'Tell her what you played as a child. Show an old photograph if you have one. Let her ask.' },
    materials: { bg: 'стара снимка, ако има', en: 'an old photo, if you have one' },
    look: { bg: 'Разбира ли, че е имало време преди нея?', en: 'Does she grasp that there was a time before her?' }
  },
  {
    id: 'l3-help-someone', area: 'L3', strand: 'L3c', bands: ['b3', 'b4', 'b5'],
    minutes: 20, movement: true, outdoor: true,
    bg: { title: 'Помогни на някого', how: 'Занесете нещо на съсед, нахранете птиците, съберете боклук в парка. Тя носи, тя дава.' },
    en: { title: 'Help someone', how: 'Take something to a neighbour, feed the birds, pick up litter in the park. She carries it, she gives it.' },
    materials: { bg: 'според случая', en: 'depends' },
    look: { bg: 'Прави ли го охотно? Пита ли защо?', en: 'Does she do it willingly? Does she ask why?' }
  },
  {
    id: 'l3-what-if', area: 'L3', strand: 'L3a', bands: ['b4', 'b5'],
    minutes: 10, movement: false, outdoor: false,
    bg: { title: 'Ами ако', how: '„Ами ако някой ти вземе играчката?“ Изслушайте отговора ѝ докрай, преди да предложите друг начин.' },
    en: { title: 'What if', how: '"What if someone takes your toy?" Hear her answer out fully before offering another way.' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Вижда ли положението от страната на другия?', en: 'Can she see it from the other side?' }
  },
  {
    id: 'l3-photo-story', area: 'L3', strand: 'L3d', bands: ['b4', 'b5'],
    minutes: 20, movement: true, outdoor: true,
    bg: { title: 'Тя снима', how: 'Дайте ѝ телефона на разходка и я оставете да снима каквото ѝ хареса. После разгледайте заедно и я питайте защо е снимала точно това.' },
    en: { title: 'She takes the photos', how: 'Give her the phone on a walk and let her photograph whatever she likes. Look through them together and ask why she chose each one.' },
    materials: { bg: 'телефон', en: 'a phone' },
    look: { bg: 'Какво я интересува, когато никой не ѝ казва какво да гледа?', en: 'What interests her when nobody tells her what to look at?' }
  },

  /* ============ L4 · Exploring and interacting with my environment ============ */
  {
    id: 'l4-sort-the-washing', area: 'L4', strand: 'L4a', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: false, outdoor: false,
    bg: { title: 'Подреди прането', how: 'Тя подрежда чорапите по двойки, после по цвят, после по размер. Едно и също нещо, три различни правила.' },
    en: { title: 'Sort the washing', how: 'She pairs the socks, then sorts by colour, then by size. One pile, three different rules.' },
    materials: { bg: 'изпрано пране', en: 'clean washing' },
    look: { bg: 'Може ли да смени правилото, или се придържа към първото?', en: 'Can she switch rule, or does she stick to the first?' }
  },
  {
    id: 'l4-count-the-stairs', area: 'L4', strand: 'L4b', bands: ['b3', 'b4'],
    minutes: 5, movement: true, outdoor: true,
    bg: { title: 'Броим стъпалата', how: 'Всеки път по стълбите брояте на глас заедно. Един номер на стъпало — не по-бързо.' },
    en: { title: 'Count the stairs', how: 'Every time you take the stairs, count aloud together. One number per step, no faster.' },
    materials: { bg: 'стълби', en: 'stairs' },
    look: { bg: 'Съвпада ли един номер с едно стъпало?', en: 'Does one number land on one step?' }
  },
  {
    id: 'l4-puddle-science', area: 'L4', strand: 'L4e', bands: ['b3', 'b4', 'b5'],
    minutes: 20, movement: true, outdoor: true,
    bg: { title: 'Какво плува?', how: 'В локва или леген: клечка, камъче, лист, лъжица. Тя предсказва, после проверява. Изненадите са най-ценни.' },
    en: { title: 'What floats?', how: 'In a puddle or a basin: a stick, a stone, a leaf, a spoon. She predicts, then tests. The surprises are the valuable part.' },
    materials: { bg: 'вода и дребни неща', en: 'water and small things' },
    look: { bg: 'Прави ли предположение преди да пробва? Променя ли го след това?', en: 'Does she predict before testing? Does she update after?' }
  },
  {
    id: 'l4-measure-with-feet', area: 'L4', strand: 'L4c', bands: ['b4', 'b5'],
    minutes: 15, movement: true, outdoor: false,
    bg: { title: 'Измерваме с крака', how: 'Колко нейни стъпки е стаята? Колко ваши? Защо са различни, като стаята е същата?' },
    en: { title: 'Measuring with feet', how: 'How many of her steps is the room? How many of yours? Why different, when the room is the same?' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Забелязва ли, че мерната единица променя числото?', en: 'Does she notice the unit changes the number?' }
  },
  {
    id: 'l4-shape-hunt', area: 'L4', strand: 'L4c', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: true, outdoor: true,
    bg: { title: 'Лов на форми', how: 'Намерете десет кръга навън — колела, капаци, знаци, луна. После десет триъгълника.' },
    en: { title: 'Shape hunt', how: 'Find ten circles outdoors — wheels, drain covers, signs, the moon. Then ten triangles.' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Вижда ли формата отделно от предмета?', en: 'Can she see the shape apart from the object?' }
  },
  {
    id: 'l4-same-tree', area: 'L4', strand: 'L4d', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: true, outdoor: true,
    bg: { title: 'Нашето дърво', how: 'Изберете едно дърво наблизо и го посещавайте всяка седмица през цялата година. Снимайте го от едно и също място.' },
    en: { title: 'Our tree', how: 'Choose one tree nearby and visit it every week all year. Photograph it from the same spot each time.' },
    materials: { bg: 'едно дърво', en: 'one tree' },
    look: { bg: 'Забелязва ли промените сама, без да я подсещате?', en: 'Does she notice changes without being prompted?' }
  },
  {
    id: 'l4-build-a-bridge', area: 'L4', strand: 'L4e', bands: ['b4', 'b5'],
    minutes: 25, movement: false, outdoor: false,
    bg: { title: 'Построй мост', how: 'Между две книги, с каквото има — хартия, клечки, кубчета. Трябва да издържи една ябълка. Оставете я да се провали и да опита пак.' },
    en: { title: 'Build a bridge', how: 'Between two books, with whatever is around — paper, sticks, blocks. It must hold an apple. Let it fail and let her try again.' },
    materials: { bg: 'книги и подръчни неща', en: 'books and odds and ends' },
    look: { bg: 'Какво прави, когато се срути? Опитва ли същото пак?', en: 'What does she do when it collapses? Does she repeat the same attempt?' }
  },
  {
    id: 'l4-cook-together', area: 'L4', strand: 'L4b', bands: ['b3', 'b4', 'b5'],
    minutes: 40, movement: false, outdoor: false,
    bg: { title: 'Готвим заедно', how: 'Тя мери, брои и сипва. Броенето на лъжици е математика; чакането на фурната е търпение.' },
    en: { title: 'Cooking together', how: 'She measures, counts and pours. Counting spoons is maths; waiting for the oven is patience.' },
    materials: { bg: 'проста рецепта', en: 'a simple recipe' },
    look: { bg: 'Брои ли точно, когато има значение?', en: 'Does she count accurately when it matters?' }
  },

  /* ================== L5 · I grow, move, and develop ================== */
  {
    id: 'l5-obstacle-course', area: 'L5', strand: 'L5a', bands: ['b3', 'b4', 'b5'],
    minutes: 30, movement: true, outdoor: true,
    bg: { title: 'Полоса с препятствия', how: 'Възглавници, столове, въже на земята. Под, над, около, през. Тя подрежда трасето — вие го минавате първи.' },
    en: { title: 'Obstacle course', how: 'Cushions, chairs, a rope on the ground. Under, over, around, through. She lays it out — you go first.' },
    materials: { bg: 'мебели и възглавници', en: 'furniture and cushions' },
    look: { bg: 'Кои движения избягва? Там е работата.', en: 'Which movements does she avoid? That is where the work is.' }
  },
  {
    id: 'l5-balance-line', area: 'L5', strand: 'L5a', bands: ['b3', 'b4', 'b5'],
    minutes: 10, movement: true, outdoor: true,
    bg: { title: 'Линията', how: 'Тебешир или въже на земята. Мине по нея напред, после назад, после с нещо в ръка.' },
    en: { title: 'The line', how: 'Chalk or a rope on the ground. Walk it forwards, then backwards, then carrying something.' },
    materials: { bg: 'тебешир или въже', en: 'chalk or rope' },
    look: { bg: 'Къде гледа, докато пази равновесие — в краката или напред?', en: 'Where does she look while balancing — at her feet, or ahead?' }
  },
  {
    id: 'l5-throw-and-catch', area: 'L5', strand: 'L5a', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: true, outdoor: true,
    bg: { title: 'Хвърляй и лови', how: 'Започнете с голяма мека топка отблизо. Отдалечавайте се по крачка, щом стане лесно.' },
    en: { title: 'Throw and catch', how: 'Start with a big soft ball, close up. Step back one pace each time it gets easy.' },
    materials: { bg: 'мека топка', en: 'a soft ball' },
    look: { bg: 'Ловите ли с ръце, или с цялото тяло?', en: 'Does she catch with her hands, or with her whole body?' }
  },
  {
    id: 'l5-animal-walks', area: 'L5', strand: 'L5a', bands: ['b3', 'b4'],
    minutes: 10, movement: true, outdoor: false,
    bg: { title: 'Походки на животни', how: 'До вратата ходете като мечка, обратно като рак, после като жаба. Вие също — не само тя.' },
    en: { title: 'Animal walks', how: 'To the door as a bear, back as a crab, then as a frog. You too — not only her.' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Може ли да носи тежестта на ръцете си?', en: 'Can she take weight on her arms?' }
  },
  {
    id: 'l5-puddle-jumping', area: 'L5', strand: 'L5b', bands: ['b3', 'b4', 'b5'],
    minutes: 30, movement: true, outdoor: true,
    bg: { title: 'Скачане в локви', how: 'Ботуши и дъждобран, и излизате точно защото вали. Няма лошо време — има само неподходящи дрехи.' },
    en: { title: 'Puddle jumping', how: 'Boots and a raincoat, and you go out precisely because it is raining. There is no bad weather, only unsuitable clothing.' },
    materials: { bg: 'ботуши, дъждобран', en: 'boots, raincoat' },
    look: { bg: 'Скача ли с два крака заедно? Смее ли се?', en: 'Does she jump with both feet together? Is she laughing?' }
  },
  {
    id: 'l5-hill-roll', area: 'L5', strand: 'L5a', bands: ['b3', 'b4', 'b5'],
    minutes: 20, movement: true, outdoor: true,
    bg: { title: 'Търкаляне по склон', how: 'Намерете тревист наклон и се търкаляйте надолу. Въртенето развива усета за равновесие както нищо друго.' },
    en: { title: 'Rolling down a hill', how: 'Find a grassy slope and roll down it. Spinning builds the balance sense like nothing else.' },
    materials: { bg: 'тревист склон', en: 'a grassy slope' },
    look: { bg: 'Замайва ли се лесно? Иска ли пак?', en: 'Does she get dizzy easily? Does she want to go again?' }
  },
  {
    id: 'l5-carry-heavy', area: 'L5', strand: 'L5a', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: true, outdoor: true,
    bg: { title: 'Носи нещо тежко', how: 'Кофа с вода, торба с покупки, кош с дърва. Истинска работа с истинска тежест — не игра.' },
    en: { title: 'Carry something heavy', how: 'A bucket of water, a shopping bag, a basket of wood. Real work with real weight, not a game.' },
    materials: { bg: 'нещо с тежест', en: 'something with weight' },
    look: { bg: 'Иска ли да помага? Преценява ли колко може да носи?', en: 'Does she want to help? Does she judge what she can carry?' }
  },
  {
    id: 'l5-hide-and-seek', area: 'L5', strand: 'L5b', bands: ['b3', 'b4', 'b5'],
    minutes: 25, movement: true, outdoor: true,
    bg: { title: 'Криеница', how: 'Навън, с ясни граници. Броенето е математика, криенето е планиране, търсенето е тичане.' },
    en: { title: 'Hide and seek', how: 'Outdoors, with clear boundaries. The counting is maths, the hiding is planning, the seeking is running.' },
    materials: { bg: 'нищо', en: 'nothing' },
    look: { bg: 'Избира ли скривалище, или просто затваря очи?', en: 'Does she choose a hiding place, or just close her eyes?' }
  },
  {
    id: 'l5-dress-yourself', area: 'L5', strand: 'L5d', bands: ['b3', 'b4'],
    minutes: 15, movement: false, outdoor: false,
    bg: { title: 'Обличам се сама', how: 'Тръгвате десет минути по-рано, за да се облече сама докрай. Ципът и обувките са фина моторика, не досада.' },
    en: { title: 'Dressing myself', how: 'Leave ten minutes earlier so she can dress herself all the way. Zips and shoes are fine motor work, not a delay.' },
    materials: { bg: 'дрехите ѝ', en: 'her clothes' },
    look: { bg: 'Какво иска да прави сама? Къде иска помощ?', en: 'What does she want to do alone? Where does she want help?' }
  },
  {
    id: 'l5-taste-test', area: 'L5', strand: 'L5c', bands: ['b3', 'b4', 'b5'],
    minutes: 15, movement: false, outdoor: false,
    bg: { title: 'Опитай със затворени очи', how: 'Малки парченца плод и зеленчук. Тя познава по вкус, мирис и текстура. Няма правилен отговор за „вкусно“.' },
    en: { title: 'Taste with eyes closed', how: 'Small pieces of fruit and vegetable. She guesses by taste, smell and texture. There is no right answer for "nice".' },
    materials: { bg: 'плодове и зеленчуци', en: 'fruit and vegetables' },
    look: { bg: 'Опитва ли нови неща? Как описва вкуса?', en: 'Will she try new things? How does she describe a taste?' }
  }
];

/* ---------------------------------------------------------------------------
 * Selection
 * ------------------------------------------------------------------------- */

/**
 * A stable set of suggestions for one day.
 *
 * Deterministic on the date, so opening the app three times before lunch shows
 * the same three activities rather than reshuffling — a plan that changes every
 * time you look at it is not a plan.
 */
export function suggestionsFor (dateKey, bandId, count = 3) {
  const fits = ACTIVITIES.filter(a => !bandId || a.bands.includes(bandId));
  const pool = fits.length ? fits : ACTIVITIES;

  const seed = hash(dateKey);
  const ordered = pool
    .map((a, i) => ({ a, k: hash(a.id + '|' + dateKey) ^ seed }))
    .sort((x, y) => x.k - y.k)
    .map(x => x.a);

  // At least one must move her. The library is weighted toward movement, but
  // "weighted" is not "guaranteed", and three sedentary suggestions on a rainy
  // Tuesday is exactly the drift this is here to prevent.
  const picked = ordered.slice(0, count);
  if (!picked.some(a => a.movement)) {
    const mover = ordered.find(a => a.movement);
    if (mover) picked[picked.length - 1] = mover;
  }
  return picked;
}

function hash (str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 1000000;
}

/** Structural checks: bilingual, tagged, reachable, and actually movement-heavy. */
export function auditActivities () {
  const problems = [];
  const ids = new Set();

  ACTIVITIES.forEach(a => {
    if (ids.has(a.id)) problems.push(`duplicate activity id ${a.id}`);
    ids.add(a.id);

    if (!a.area || !a.strand) problems.push(`${a.id} is not tagged to a learning area and strand`);
    if (!Array.isArray(a.bands) || !a.bands.length) problems.push(`${a.id} fits no age band`);
    if (!(a.minutes > 0)) problems.push(`${a.id} has no duration`);

    ['bg', 'en'].forEach(l => {
      if (!a[l] || !a[l].title) problems.push(`${a.id} missing ${l} title`);
      if (!a[l] || !a[l].how) problems.push(`${a.id} missing ${l} instructions`);
      if (!a.materials || !a.materials[l]) problems.push(`${a.id} missing ${l} materials`);
      if (!a.look || !a.look[l]) problems.push(`${a.id} missing ${l} "what to look for"`);
    });
  });

  // All five areas must be represented, or a whole area silently never appears.
  ['L1', 'L2', 'L3', 'L4', 'L5'].forEach(area => {
    if (!ACTIVITIES.some(a => a.area === area)) problems.push(`no activities for area ${area}`);
  });

  // Weighted toward movement is a design claim; check it rather than assert it.
  const movers = ACTIVITIES.filter(a => a.movement).length;
  if (movers / ACTIVITIES.length < 0.4) {
    problems.push(`only ${movers}/${ACTIVITIES.length} activities involve movement; the ` +
                  `3h/day target needs the library weighted toward it`);
  }

  return problems;
}

export const ACTIVITY_COUNT = ACTIVITIES.length;
