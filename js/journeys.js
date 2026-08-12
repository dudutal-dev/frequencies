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
  {
    id: 'journey-chakra-express',
    title: 'צ\'אקרות אקספרס',
    sub: '7 שלבים · 10.5 דקות',
    desc: 'הגרסה המהירה של מסע הצ\'אקרות: דקה וחצי בכל מרכז, מהשורש לכתר. כוונון בוקר יומי לפני שהיום מתחיל.',
    colors: ['#fc8181', '#d6bcfa'], glyph: '⚡',
    steps: [
      { id: 'chakra-root', min: 1.5 }, { id: 'chakra-sacral', min: 1.5 },
      { id: 'chakra-solar', min: 1.5 }, { id: 'chakra-heart', min: 1.5 },
      { id: 'chakra-throat', min: 1.5 }, { id: 'chakra-third-eye', min: 1.5 },
      { id: 'chakra-crown', min: 1.5 },
    ],
  },
  {
    id: 'journey-wakeup',
    title: 'יקיצה מודרגת',
    sub: '4 שלבים · 16 דקות',
    desc: 'ההפך מצלילה לשינה: טיפוס מדורג מדלתא דרך תטא ואלפא עד גמא ערני. לבוקר קשה או ג\'ט-לג — קימה בלי הלם.',
    colors: ['#2c5282', '#f6ad55'], glyph: '🌅',
    steps: [
      { id: 'wave-delta', min: 3 }, { id: 'wave-theta', min: 4 },
      { id: 'wave-alpha', min: 4 }, { id: 'energy-awaken', min: 5 },
    ],
  },
  {
    id: 'journey-abundance',
    title: 'שערי השפע',
    sub: '4 שלבים · 20 דקות',
    desc: 'מסע השפע השלם: צדק פותח את השערים, תדר השפע מכוון קבלה, תדר הנס הופך כוונה לתדר — והשמש חותמת בחיות זהובה.',
    colors: ['#f6ad55', '#f6e05e'], glyph: '♃',
    steps: [
      { id: 'planet-jupiter', min: 5 }, { id: 'energy-abundance', min: 5 },
      { id: 'sol-528', min: 5 }, { id: 'planet-sun', min: 5 },
    ],
  },
  {
    id: 'journey-intuition',
    title: 'פקיחת העין השלישית',
    sub: '4 שלבים · 22 דקות',
    desc: 'פיתוח אינטואיציה שיטתי: 852Hz מעורר, העין השלישית בתטא מעמיקה, חלימה צלולה מדייקת — ועין הסערה חושפת את הידיעה השקטה.',
    colors: ['#667eea', '#0f0820'], glyph: '𓁿',
    steps: [
      { id: 'sol-852', min: 5 }, { id: 'chakra-third-eye', min: 6 },
      { id: 'wave-theta7', min: 6 }, { id: 'med-eye-storm', min: 5 },
    ],
  },
  {
    id: 'journey-grief',
    title: 'עיבוד פרידה ואובדן',
    sub: '4 שלבים · 24 דקות',
    desc: 'ליווי עדין דרך הכאב: ריפוי הלב השבור, מרחב תטא לרגשות, שחרור האשמה ב-396 — וחזרה הביתה אל אהבה עצמית.',
    colors: ['#feb2b2', '#3d1515'], glyph: '🕊',
    steps: [
      { id: 'love-heartbreak', min: 6 }, { id: 'calm-emotions', min: 6 },
      { id: 'sol-396', min: 6 }, { id: 'love-self', min: 6 },
    ],
  },
  {
    id: 'journey-exam',
    title: 'מרתון בחינות',
    sub: '4 שלבים · 45 דקות',
    desc: 'פרוטוקול למידה מלא: כניסה בקריאה רגועה, שינון בגמא איזוכרוני, שיא מיקוד בגמא בינאורלי — וסיום בהטמעה רכה באלפא.',
    colors: ['#4299e1', '#d69e2e'], glyph: '🎓',
    steps: [
      { id: 'focus-reading', min: 10 }, { id: 'focus-memory', min: 15 },
      { id: 'wave-gamma', min: 10 }, { id: 'focus-soft', min: 10 },
    ],
  },
  {
    id: 'journey-pain',
    title: 'הקלה על כאב',
    sub: '4 שלבים · 26 דקות',
    desc: 'הפרוטוקול המסורתי המלא לכאב כרוני ומתח שרירי: 174Hz בשני עיבודים, התחדשות רקמות ב-285 — ולסיום אמבט צליל עוטף.',
    colors: ['#805ad5', '#150d29'], glyph: '☁',
    steps: [
      { id: 'relief-pain', min: 7 }, { id: 'sol-174', min: 6 },
      { id: 'sol-285', min: 7 }, { id: 'calm-soundbath', min: 6 },
    ],
  },
  {
    id: 'journey-creativity',
    title: 'זרם היצירה',
    sub: '4 שלבים · 24 דקות',
    desc: 'ממחסום יצירתי לזרימה: תטא פרוע לרעיונות, צ\'אקרת הסקרל פותחת את מרכז היצירה, ניצוץ מתניע — וזרימת אלפא לביצוע.',
    colors: ['#ed64a6', '#319795'], glyph: '✏',
    steps: [
      { id: 'focus-creative', min: 6 }, { id: 'chakra-sacral', min: 6 },
      { id: 'energy-spark', min: 6 }, { id: 'focus-flow', min: 6 },
    ],
  },
  {
    id: 'journey-couple',
    title: 'ערב זוגי',
    sub: '4 שלבים · 24 דקות',
    desc: 'פס קול לאינטימיות: ונוס פותחת את הערב, 341Hz מרכך את הלב, מדיטציית לב פתוח מסנכרנת — ומגנט האהבה סוגר את המעגל. ברמקולים, יחד.',
    colors: ['#f687b3', '#44102b'], glyph: '♀',
    steps: [
      { id: 'planet-venus', min: 6 }, { id: 'love-open-heart', min: 6 },
      { id: 'med-heart', min: 6 }, { id: 'love-magnet', min: 6 },
    ],
  },
  {
    id: 'journey-nature',
    title: 'חיבור לאדמה',
    sub: '4 שלבים · 24 דקות',
    desc: 'גרסת הבית של יחפות על דשא: OM קוסמי, פעימת שומאן, תדר היממה של כדור הארץ — וכוונון 432 הרמוני. הארקה עמוקה בלי לצאת מהסלון.',
    colors: ['#48bb78', '#0a1f12'], glyph: '🌿',
    steps: [
      { id: 'earth-om', min: 6 }, { id: 'earth-schumann', min: 6 },
      { id: 'planet-earth-day', min: 6 }, { id: 'earth-432', min: 6 },
    ],
  },
  {
    id: 'journey-confidence',
    title: 'ביטחון במה',
    sub: '4 שלבים · 16 דקות',
    desc: 'לפני ראיון, הרצאה או הופעה: קרקוע מהיר, מקלעת השמש לכוח אישי, מאדים לאומץ — ובטא ערני לדריכות מדויקת. תעלו לבמה כמו בעלי הבית.',
    colors: ['#faf089', '#4d1010'], glyph: '👑',
    steps: [
      { id: 'calm-grounding', min: 4 }, { id: 'chakra-solar', min: 4 },
      { id: 'planet-mars', min: 4 }, { id: 'wave-beta', min: 4 },
    ],
  },
  {
    id: 'journey-gratitude',
    title: 'הכרת תודה לפני שינה',
    sub: '3 שלבים · 18 דקות',
    desc: 'סגירת יום מתוקה: תדר החיבור נזכר במי שיש, מדיטציית לב מודה — וליל ירח מלא מרדים ברוך. הדרך היפה ביותר להגיד תודה ליום.',
    colors: ['#9ae6b4', '#0a0a1f'], glyph: '🙏',
    steps: [
      { id: 'sol-639', min: 6 }, { id: 'med-heart', min: 6 },
      { id: 'sleep-moon', min: 6 },
    ],
  },
  {
    id: 'journey-concert',
    title: 'קונצרט הריפוי',
    sub: '5 שלבים · 25 דקות',
    desc: 'קונצרט גנרטיבי שלם שמולחן ברגע האמת: הנדפאן עמוק, שיר ערש מרפא, פעמוני הנס, קלימבה ללב — ופינאלה של פעמוני מקדש. אף ביצוע לא יחזור.',
    colors: ['#f6e05e', '#553c9a'], glyph: '♬',
    steps: [
      { id: 'mel-handpan-174', min: 5 }, { id: 'mel-lullaby-285', min: 5 },
      { id: 'mel-bells-528', min: 5 }, { id: 'mel-kalimba-639', min: 5 },
      { id: 'mel-temple-963', min: 5 },
    ],
  },
  {
    id: 'journey-musical-sleep',
    title: 'ערש מוזיקלי',
    sub: '3 שלבים · 30 דקות',
    desc: 'נרדמים עם מוזיקה אמיתית: תיבת נגינה מנחמת, שיר ערש על תדר ההתחדשות — והצלילים מפנים את מקומם לדלתא עמוק וטהור.',
    colors: ['#4c51bf', '#0f3d38'], glyph: '🎼',
    steps: [
      { id: 'mel-musicbox-396', min: 6 }, { id: 'mel-lullaby-285', min: 8 },
      { id: 'sleep-deep', min: 16 },
    ],
  },

  /* ------------------------------ פרק שאמאני ופסיכדלי ------------------------------ */
  {
    id: 'journey-shaman-classic',
    title: 'המסע השאמאני הקלאסי',
    sub: '5 שלבים · 40 דקות',
    desc: 'המבנה המסורתי במלואו: תוף פותח את השער, ירידה לעולם התחתון, פגישה עם בעל הכוח, עלייה לעולם העליון — וחזרה מוארקת. מלודיה פריגית אפלה לאורך כל הדרך.',
    colors: ['#b7791f', '#08090d'], glyph: '𓂀',
    steps: [
      { id: 'sh-drum', min: 6 }, { id: 'sh-underworld', min: 10 },
      { id: 'sh-serpent', min: 8 }, { id: 'sh-upperworld', min: 10 },
      { id: 'earth-schumann', min: 6 },
    ],
  },
  {
    id: 'journey-psychedelic',
    title: 'מסע פסיכדלי',
    sub: '5 שלבים · 45 דקות',
    desc: 'רצף בסולם ספטימלי שהתווים בו מתכופפים כמו סרט מגנטי: איקארו פותח, חזיונות מתפתלים, מדבר צבעים תוסס, ושער האור בגמא 40 לשיא. נחיתה רכה בפריחת הלילה.',
    colors: ['#9f7aea', '#ed64a6'], glyph: '✺',
    steps: [
      { id: 'sh-ayahuasca', min: 9 }, { id: 'sh-vision', min: 9 },
      { id: 'sh-peyote', min: 9 }, { id: 'sh-dmt', min: 9 },
      { id: 'sh-datura', min: 9 },
    ],
  },
  {
    id: 'journey-fire-ceremony',
    title: 'טקס האש',
    sub: '4 שלבים · 24 דקות',
    desc: 'מעגל סביב המדורה: תוף פותח, מעגל האש שורף פחדים, טראנס תיפוף מעמיק — וקול האבות סוגר בשקט. טקס שחרור מלא.',
    colors: ['#f56565', '#b7791f'], glyph: '🜂',
    steps: [
      { id: 'sh-drum', min: 6 }, { id: 'sh-firecircle', min: 6 },
      { id: 'sh-trance', min: 6 }, { id: 'sh-ancestors', min: 6 },
    ],
  },
  {
    id: 'journey-kundalini',
    title: 'עליית הנחש',
    sub: '4 שלבים · 28 דקות',
    desc: 'קונדליני בצליל: הנחש הקדמון מתעורר בבסיס, מעגל האש מדליק את מקלעת השמש, שער האור פותח את הכתר — ופעימת האדמה מעגנת בחזרה.',
    colors: ['#48bb78', '#d6bcfa'], glyph: '𓆙',
    steps: [
      { id: 'sh-serpent', min: 7 }, { id: 'sh-firecircle', min: 7 },
      { id: 'sh-dmt', min: 7 }, { id: 'earth-schumann', min: 7 },
    ],
  },
  {
    id: 'journey-vision-quest',
    title: 'מסע החזון',
    sub: '4 שלבים · 36 דקות',
    desc: 'חיפוש חזון בן שלושים ושש דקות: איקארו מכין, העולם העליון פותח, מסע החזיונות מעמיק, ופריחת הלילה מלווה בחזרה. לחדר חשוך, בעיניים עצומות.',
    colors: ['#90cdf4', '#1b0d33'], glyph: '◉',
    steps: [
      { id: 'sh-ayahuasca', min: 9 }, { id: 'sh-upperworld', min: 9 },
      { id: 'sh-vision', min: 9 }, { id: 'sh-datura', min: 9 },
    ],
  },
  {
    id: 'journey-shaman-short',
    title: 'שער מהיר לטראנס',
    sub: '3 שלבים · 15 דקות',
    desc: 'גרסה קצרה למי שיודע לאן הוא הולך: תוף, טראנס תיפוף בקצב 4.5Hz, וירידה לעולם התחתון. רבע שעה והתודעה בצד השני.',
    colors: ['#d69e2e', '#4a5568'], glyph: '◍',
    steps: [
      { id: 'sh-drum', min: 5 }, { id: 'sh-trance', min: 5 },
      { id: 'sh-underworld', min: 5 },
    ],
  },

  /* ------------------------------ קערות ומנטרות ------------------------------ */
  {
    id: 'journey-soundbath',
    title: 'אמבט צליל מלא',
    sub: '5 שלבים · 35 דקות',
    desc: 'הטיפול המלא כמו בסטודיו: גונג פלנטרי פותח, סט שבע הקערות סורק את הגוף, קערת מים מנקה, הקערה הטיבטית מעגנת — וקערת הכתר סוגרת. שכבו ואל תעשו כלום.',
    colors: ['#a0aec0', '#d6bcfa'], glyph: '◍',
    steps: [
      { id: 'bowl-gong', min: 7 }, { id: 'bowl-set-7', min: 7 },
      { id: 'bowl-water', min: 7 }, { id: 'bowl-tibetan', min: 7 },
      { id: 'bowl-crystal-963', min: 7 },
    ],
  },
  {
    id: 'journey-monastery',
    title: 'בוקר במנזר',
    sub: '4 שלבים · 24 דקות',
    desc: 'שגרת הבוקר הטיבטית: גונג מעיר, OM גרוני פותח את היום, מנטרת גאיטרי לשמש — והקערה הטיבטית סוגרת את התרגול.',
    colors: ['#b7791f', '#f6e05e'], glyph: 'ॐ',
    steps: [
      { id: 'bowl-gong', min: 6 }, { id: 'mantra-om', min: 6 },
      { id: 'mantra-gayatri', min: 6 }, { id: 'bowl-tibetan', min: 6 },
    ],
  },
  {
    id: 'journey-throat',
    title: 'מסע שירת הגרון',
    sub: '4 שלבים · 26 דקות',
    desc: 'שלושת סגנונות שירת הגרון של טובה ומונגוליה: קרגירה העמוק, OM המלא, סיגיט השורק — ומקהלת נזירים לסיום. סדרת הרמוניות טהורה מתחילתה ועד סופה.',
    colors: ['#744210', '#805ad5'], glyph: '𓁿',
    steps: [
      { id: 'mantra-kargyraa', min: 7 }, { id: 'mantra-om', min: 7 },
      { id: 'mantra-sygyt', min: 6 }, { id: 'mantra-monk', min: 6 },
    ],
  },
  {
    id: 'journey-japa',
    title: 'תרגול ג\'אפה',
    sub: '3 שלבים · 21 דקות',
    desc: 'תרגול המאלה השלם: ג\'אפה 108 בפעימות חרוזים, מנטרת OM להעמקה, וקערת קריסטל הלב לסגירה. שבע דקות לכל שליש של המאלה.',
    colors: ['#b7791f', '#faf089'], glyph: '📿',
    steps: [
      { id: 'mantra-108', min: 7 }, { id: 'mantra-om', min: 7 },
      { id: 'bowl-crystal-528', min: 7 },
    ],
  },

  /* ------------------------------ פסיכדלי קיצוני ושומאן ------------------------------ */
  {
    id: 'journey-dissolve',
    title: 'התמוססות מוחלטת',
    sub: '5 שלבים · 45 דקות',
    desc: 'המסע הקיצוני ביותר בספרייה: שפה זרה פותחת בסולם מעוות, קליידוסקופ מסחרר, ספירלה אינסופית מפילה, פרקטל מפרק — והתמוססות מאחדת את שלושת האפקטים. 🎧 חובה אוזניות.',
    colors: ['#ed64a6', '#faf089'], glyph: '❋',
    steps: [
      { id: 'ps-alien', min: 9 }, { id: 'ps-kaleido', min: 9 },
      { id: 'ps-spiral', min: 9 }, { id: 'ps-fractal', min: 9 },
      { id: 'ps-dissolve', min: 9 },
    ],
  },
  {
    id: 'journey-backwards',
    title: 'העולם ההפוך',
    sub: '3 שלבים · 24 דקות',
    desc: 'שלושה שלבים של מעטפת הפוכה וסיבוב: זרימה לאחור, נוזלי, ואולם המראות. המוח מפסיק לדעת מתי צליל מתחיל ומאיפה הוא בא.',
    colors: ['#4fd1c5', '#63b3ed'], glyph: '↺',
    steps: [
      { id: 'ps-reverse', min: 8 }, { id: 'ps-liquid', min: 8 },
      { id: 'ps-mirror', min: 8 },
    ],
  },
  {
    id: 'journey-schumann-ladder',
    title: 'סולם שומאן',
    sub: '5 שלבים · 25 דקות',
    desc: 'טיפוס בכל חמש ההרמוניות של תהודת שומאן — 7.83, 14.3, 20.8, 27.3 ו-33.8Hz. מהארקה עמוקה ועד סף הגמא, על אותה פעימה פלנטרית.',
    colors: ['#48bb78', '#81e6d9'], glyph: '⊕',
    steps: [
      { id: 'sch-1', min: 5 }, { id: 'sch-2', min: 5 }, { id: 'sch-3', min: 5 },
      { id: 'sch-4', min: 5 }, { id: 'sch-5', min: 5 },
    ],
  },
  {
    id: 'journey-earth-pulse',
    title: 'פעימת האדמה',
    sub: '4 שלבים · 32 דקות',
    desc: 'שהייה ארוכה בתדר היסוד של הפלנטה: שומאן טהור, גרסה מלודית בהנדפאן, תדר היממה של כדור הארץ — וכוונון 432 לסיום. הארקה של חצי שעה.',
    colors: ['#48bb78', '#b7791f'], glyph: '◍',
    steps: [
      { id: 'sch-1', min: 8 }, { id: 'sch-melodic', min: 8 },
      { id: 'planet-earth-day', min: 8 }, { id: 'earth-432', min: 8 },
    ],
  },
  {
    id: 'journey-warped-earth',
    title: 'אדמה מעוותת',
    sub: '4 שלבים · 32 דקות',
    desc: 'העוגן והסחרור יחד: פעימת שומאן נשארת יציבה לאורך כל המסע, בזמן שהמלודיה מעליה הולכת ומתעוותת — עד כדור הארץ המעוות ובחזרה לשומאן טהור.',
    colors: ['#68d391', '#9f7aea'], glyph: '✺',
    steps: [
      { id: 'sch-1', min: 8 }, { id: 'sch-psyche', min: 8 },
      { id: 'ps-liquid', min: 8 }, { id: 'sch-melodic', min: 8 },
    ],
  },
];

export const journeyById = Object.fromEntries(JOURNEYS.map(j => [j.id, j]));
