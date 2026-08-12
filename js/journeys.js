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
];

export const journeyById = Object.fromEntries(JOURNEYS.map(j => [j.id, j]));
