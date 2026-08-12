/* ============================================================
   RESONANCE · מסעות מודרכים
   רצפים אוצרים של תדרים שמתחלפים אוטומטית עם קרוס-פייד.
   כל שלב: { id: מזהה יצירה מהקטלוג, min: דקות }
   ============================================================ */

export const JOURNEYS = [
  {
    id: 'journey-chakras',
    title: 'מסע שבע הצ\'אקרות',
    sub: '7 שלבים · 21 דקות',
    desc: 'טיפוס מלא מהשורש אל הכתר: שלוש דקות בכל מרכז אנרגיה, מהארקה אדומה ועד הארה סגולה. המסע הקלאסי של איזון מלא.',
    colors: ['#f56565', '#b794f4'], glyph: '◉',
    steps: [
      { id: 'chakra-root', min: 3 }, { id: 'chakra-sacral', min: 3 },
      { id: 'chakra-solar', min: 3 }, { id: 'chakra-heart', min: 3 },
      { id: 'chakra-throat', min: 3 }, { id: 'chakra-third-eye', min: 3 },
      { id: 'chakra-crown', min: 3 },
    ],
  },
  {
    id: 'journey-sleep',
    title: 'צלילה אל השינה',
    sub: '3 שלבים · 30 דקות',
    desc: 'ירידה הדרגתית של גלי המוח: אלפא מרגיע → תטא על סף החלום → דלתא עמוק. בסוף המסע הצליל דועך לדממה מעצמו.',
    colors: ['#4c51bf', '#050510'], glyph: '☾',
    steps: [
      { id: 'wave-alpha', min: 6 }, { id: 'sleep-hammock', min: 6 },
      { id: 'sleep-deep', min: 18 },
    ],
  },
  {
    id: 'journey-morning',
    title: 'זריחה פנימית',
    sub: '3 שלבים · 15 דקות',
    desc: 'טעינת בוקר מדורגת: התעוררות רכה ב-528Hz, האצה עם כוח פנימי, ושיא של גמא מחדד. במקום קפה.',
    colors: ['#f6ad55', '#ecc94b'], glyph: '☀',
    steps: [
      { id: 'energy-sunrise', min: 5 }, { id: 'energy-power', min: 5 },
      { id: 'energy-awaken', min: 5 },
    ],
  },
  {
    id: 'journey-solfeggio',
    title: 'הסולם הסולפג\'י המלא',
    sub: '9 שלבים · 22 דקות',
    desc: 'כל תשעת התדרים המקודשים ברצף עולה — מ-174Hz ועד 963Hz. סריקה מלאה של הגוף והנפש, תדר אחר תדר.',
    colors: ['#e8c082', '#7c5cff'], glyph: '♪',
    steps: [
      { id: 'sol-174', min: 2.5 }, { id: 'sol-285', min: 2.5 },
      { id: 'sol-396', min: 2.5 }, { id: 'sol-417', min: 2.5 },
      { id: 'sol-528', min: 2.5 }, { id: 'sol-639', min: 2.5 },
      { id: 'sol-741', min: 2.5 }, { id: 'sol-852', min: 2.5 },
      { id: 'sol-963', min: 2 },
    ],
  },
  {
    id: 'journey-focus',
    title: 'כניסה לעבודה עמוקה',
    sub: '3 שלבים · 30 דקות',
    desc: 'פרוטוקול Deep Work: זרימת אלפא לפתיחה, מעבר מדורג לבטא, ואז מנהרת ריכוז ארוכה. שימו את הטלפון בצד.',
    colors: ['#c05621', '#319795'], glyph: '◎',
    steps: [
      { id: 'focus-flow', min: 5 }, { id: 'focus-soft', min: 5 },
      { id: 'focus-deep', min: 20 },
    ],
  },
  {
    id: 'journey-healing',
    title: 'ריפוי עמוק',
    sub: '4 שלבים · 30 דקות',
    desc: 'רצף הריפוי השלם: שיכוך ב-174Hz, התחדשות ב-285Hz, עשר דקות של תדר הנס 528Hz, ועיגון בפעימת כדור הארץ.',
    colors: ['#4fd1c5', '#f6e05e'], glyph: '⧬',
    steps: [
      { id: 'sol-174', min: 5 }, { id: 'sol-285', min: 5 },
      { id: 'dna-528', min: 10 }, { id: 'earth-schumann', min: 10 },
    ],
  },
  {
    id: 'journey-meditation',
    title: 'מדיטציה שלמה',
    sub: '3 שלבים · 22 דקות',
    desc: 'כניסה דרך צליל ה-OM הטהור, שקיעה למסע תטא עמוק, וסיום בדממה סגולה של 963Hz. ישיבה אחת, מסע שלם.',
    colors: ['#9f7aea', '#ed8936'], glyph: '☯',
    steps: [
      { id: 'earth-om', min: 4 }, { id: 'med-om-journey', min: 12 },
      { id: 'med-silence', min: 6 },
    ],
  },
  {
    id: 'journey-planets',
    title: 'המסע הפלנטרי',
    sub: '8 שלבים · 20 דקות',
    desc: 'סיור במערכת השמש של הנס קוסטו: מהשמש דרך הירח, מרקורי, ונוס, מאדים, צדק ושבתאי — ונחיתה חזרה בכדור הארץ.',
    colors: ['#f6e05e', '#1a202c'], glyph: '☉',
    steps: [
      { id: 'planet-sun', min: 2.5 }, { id: 'planet-moon', min: 2.5 },
      { id: 'planet-mercury', min: 2.5 }, { id: 'planet-venus', min: 2.5 },
      { id: 'planet-mars', min: 2.5 }, { id: 'planet-jupiter', min: 2.5 },
      { id: 'planet-saturn', min: 2.5 }, { id: 'planet-earth-day', min: 2.5 },
    ],
  },
  {
    id: 'journey-full-night',
    title: 'לילה שלם',
    sub: '4 שלבים · 60 דקות',
    desc: 'ליווי מלא אל תוך הלילה: אלפא מרגיע, תטא על סף החלום, דלתא עמוק — ולסיום דלתא 1Hz, הביט האיטי ביותר שיש. שעה ואתם רחוקים.',
    colors: ['#1e3a8a', '#04060f'], glyph: '🌌',
    steps: [
      { id: 'wave-alpha', min: 10 }, { id: 'sleep-hammock', min: 10 },
      { id: 'sleep-deep', min: 20 }, { id: 'wave-delta1', min: 20 },
    ],
  },
  {
    id: 'journey-powernap',
    title: 'פאוור-נאפ מושלם',
    sub: '3 שלבים · 24 דקות',
    desc: 'שנ"צ מהונדס: ירידה מהירה לאלפא, רבע שעה של תטא רדוד — ויציאה מבוקרת חזרה לאלפא ערני. קמים חדים, בלי טשטוש.',
    colors: ['#4fd1c5', '#234e52'], glyph: '⏾',
    steps: [
      { id: 'sleep-powernap', min: 5 }, { id: 'sleep-rem', min: 14 },
      { id: 'focus-flow', min: 5 },
    ],
  },
  {
    id: 'journey-sos-calm',
    title: 'SOS — הרגעה מהירה',
    sub: '3 שלבים · 12 דקות',
    desc: 'ערכת חירום לרגעי חרדה: שחרור פחד עם אלפא, שקט פנימי ב-432, ונחיתה באמבט צליל עוטף. 12 דקות והסערה חולפת.',
    colors: ['#4fd1c5', '#0b2422'], glyph: '༄',
    steps: [
      { id: 'relief-anxiety', min: 4 }, { id: 'calm-inner-quiet', min: 4 },
      { id: 'calm-soundbath', min: 4 },
    ],
  },
  {
    id: 'journey-solfeggio-down',
    title: 'מהשמיים לאדמה',
    sub: '9 שלבים · 20 דקות',
    desc: 'הסולם הסולפג\'י במסלול היורד — מ-963Hz של הכתר ועד 174Hz של האדמה. מהרוחני אל המעוגן: מושלם לסיום יום.',
    colors: ['#b794f4', '#7c5cff'], glyph: '⬇',
    steps: [
      { id: 'sol-963', min: 2 }, { id: 'sol-852', min: 2 }, { id: 'sol-741', min: 2 },
      { id: 'sol-639', min: 2 }, { id: 'sol-528', min: 2.5 }, { id: 'sol-417', min: 2.5 },
      { id: 'sol-396', min: 2.5 }, { id: 'sol-285', min: 2.5 }, { id: 'sol-174', min: 2 },
    ],
  },
  {
    id: 'journey-pretraining',
    title: 'הצתה לפני אימון',
    sub: '3 שלבים · 12 דקות',
    desc: 'רמפת אנרגיה: בטא ערני, בטא גבוה דוחף, ופיצוץ גמא 40 לסיום. שימו את זה בדרך לחדר כושר.',
    colors: ['#f56565', '#ecc94b'], glyph: '🔥',
    steps: [
      { id: 'wave-beta', min: 4 }, { id: 'energy-workout', min: 4 },
      { id: 'energy-awaken', min: 4 },
    ],
  },
  {
    id: 'journey-detox',
    title: 'דיטוקס אנרגטי',
    sub: '3 שלבים · 21 דקות',
    desc: 'ניקוי יסודי: 741Hz מפנה רעלים, 285Hz מחדש את הרקמות, ותהודת שומאן מעגנת את המערכת הנקייה באדמה.',
    colors: ['#4299e1', '#48bb78'], glyph: '🜄',
    steps: [
      { id: 'sol-741', min: 7 }, { id: 'sol-285', min: 7 },
      { id: 'earth-schumann', min: 7 },
    ],
  },
  {
    id: 'journey-lucid',
    title: 'מסע החלימה הצלולה',
    sub: '3 שלבים · 30 דקות',
    desc: 'פרוטוקול לחולמים: שער ההיפנוזה פותח, תטא 7 מייצב תודעה ערה בתוך חלום, ו-REM עמוק לסיום. לשעות הבוקר המוקדמות.',
    colors: ['#805ad5', '#12082b'], glyph: '☁',
    steps: [
      { id: 'wave-hypnagogia', min: 8 }, { id: 'wave-theta7', min: 12 },
      { id: 'sleep-rem', min: 10 },
    ],
  },
  {
    id: 'journey-love',
    title: 'מסע הלב הפתוח',
    sub: '4 שלבים · 20 דקות',
    desc: 'ריפוי מלא של מרכז הלב: פתיחה עדינה ב-341Hz, צ\'אקרת הלב בתטא, אהבה עצמית ב-528, ומגנט אהבה לסיום. לבד או ביחד.',
    colors: ['#f687b3', '#48bb78'], glyph: '♥',
    steps: [
      { id: 'love-open-heart', min: 5 }, { id: 'chakra-heart', min: 5 },
      { id: 'love-self', min: 5 }, { id: 'love-magnet', min: 5 },
    ],
  },
];

export const journeyById = Object.fromEntries(JOURNEYS.map(j => [j.id, j]));
