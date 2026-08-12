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

  /* ------------------------------ מסעות ארוכי-נשימה ------------------------------ */
  {
    id: 'journey-vision-hour',
    title: 'מסע החזיונות — שעה שלמה',
    sub: '4 שלבים · 60 דקות',
    desc: 'שעה שלמה בעולם אחד: מסע החזיונות המקורי, ואז אותו סולם ספטימלי בשלוש התגלמויות — קריסטל על פאד עמוק, הנדפאן שמסתובב סביב הראש, ולסיום פעמונים אוקטבה מעל. הכול על תדר ה-OM, בלי לצאת מהמרחב אפילו לרגע.',
    colors: ['#ed64a6', '#f687b3'], glyph: '◉',
    steps: [
      { id: 'sh-vision', min: 15 }, { id: 'sh-vision-deep', min: 15 },
      { id: 'sh-vision-far', min: 15 }, { id: 'sh-vision-light', min: 15 },
    ],
  },
  {
    id: 'journey-inner-space',
    title: 'מרחב פנימי — אלבום שלם',
    sub: '3 שלבים · 66 דקות',
    desc: 'אמביינט ארוך-נשימה בסגנון אלבומי הריפוי הקלאסיים: מרחב פנימי, ריחוף, וקוסמוס — עשרים ושתיים דקות לכל אחד. פאד שמתפתח בלי לחזור על עצמו, עם צליל בודד אחת לכמה שניות. שמו והניחו לו לרוץ.',
    colors: ['#9f7aea', '#d6bcfa'], glyph: '◌',
    steps: [
      { id: 'amb-innerspace', min: 22 }, { id: 'amb-drift', min: 22 },
      { id: 'amb-cosmos', min: 22 },
    ],
  },
  {
    id: 'journey-deep-ambient',
    title: 'צלילה אמביינטית',
    sub: '4 שלבים · 72 דקות',
    desc: 'שעה וחצי של ירידה: ערפילית סמיכה, מחוץ לזמן, הריק המינימלי — ולסיום חלל עמוק ב-90Hz שממלא את החדר. במערכת סטריאו זו חוויה פיזית.',
    colors: ['#2c5282', '#a0aec0'], glyph: '◌',
    steps: [
      { id: 'amb-nebula', min: 18 }, { id: 'amb-timeless', min: 18 },
      { id: 'amb-void', min: 18 }, { id: 'amb-deepspace', min: 18 },
    ],
  },
  {
    id: 'journey-ambient-dawn',
    title: 'בוקר אמביינטי',
    sub: '3 שלבים · 54 דקות',
    desc: 'שעה של אור: שחר עם נבל, שדה כוכבים בכוונון 432, וקוסמוס על תדר הכתר. פס קול לבוקר ארוך או ליום עבודה שקט.',
    colors: ['#f6e05e', '#68d391'], glyph: '◌',
    steps: [
      { id: 'amb-dawn', min: 18 }, { id: 'amb-stars', min: 18 },
      { id: 'amb-cosmos', min: 18 },
    ],
  },
  {
    id: 'journey-ambient-night',
    title: 'לילה במרחב',
    sub: '4 שלבים · 80 דקות',
    desc: 'המסע הארוך ביותר בספרייה — שעה ועשרים: חזיונות במרחב, מרחב פנימי, ערפילית, וחלל עמוק שמלווה אל תוך השינה. הפעילו טיימר ותנו לו לדעוך.',
    colors: ['#ed64a6', '#04060f'], glyph: '◌',
    steps: [
      { id: 'amb-vision', min: 20 }, { id: 'amb-innerspace', min: 20 },
      { id: 'amb-nebula', min: 20 }, { id: 'amb-deepspace', min: 20 },
    ],
  },

  {
    id: 'journey-ambient-heart',
    title: 'אלבום הלב',
    sub: '3 שלבים · 60 דקות',
    desc: 'שעה חמה ואנושית: שדה הלב עם נבל, בראשית עם הנדפאן, ושחר לסיום. האמביינט הפחות קוסמי והכי קרוב — לכתיבה, לזמן איכות או לערב שקט.',
    colors: ['#48bb78', '#f6e05e'], glyph: '◌',
    steps: [
      { id: 'amb-heartfield', min: 20 }, { id: 'amb-genesis', min: 20 },
      { id: 'amb-dawn', min: 20 },
    ],
  },
  {
    id: 'journey-ambient-light',
    title: 'גוף האור',
    sub: '4 שלבים · 76 דקות',
    desc: 'עלייה איטית ברגיסטר: זוהר צפוני ב-741, גוף האור ב-852, מקדש אור ב-963, וקוסמוס לסיום. שעה ורבע של טיפוס בתדרים הגבוהים.',
    colors: ['#63b3ed', '#d6bcfa'], glyph: '◌',
    steps: [
      { id: 'amb-aurora', min: 19 }, { id: 'amb-lightbody', min: 19 },
      { id: 'amb-temple', min: 19 }, { id: 'amb-cosmos', min: 19 },
    ],
  },
  {
    id: 'journey-ambient-work',
    title: 'רקע לעבודה',
    sub: '4 שלבים · 96 דקות',
    desc: 'שעה וחצי שנועדה להיעלם מהתודעה: כמעט דממה, נצח, אוקיינוס פנימי ומרחב פנימי. צליל בודד אחת לכמה שניות — מספיק כדי למלא את החדר, לא מספיק כדי להסיח.',
    colors: ['#a0aec0', '#2b6cb0'], glyph: '◌',
    steps: [
      { id: 'amb-silence', min: 24 }, { id: 'amb-eternity', min: 24 },
      { id: 'amb-ocean', min: 24 }, { id: 'amb-innerspace', min: 24 },
    ],
  },

  /* ------------------------------ אינטימי — לשמיעה רציפה בזוג ------------------------------ */
  {
    id: 'journey-intimate-evening',
    title: 'ערב אינטימי',
    sub: '4 שלבים · 72 דקות',
    desc: 'שעה וחצי בלי קצב ובלי הפרעות: לחישה בכוונון 432 לפתיחה, ליל ונוס, מגע, ועור לסיום. פאדים רציפים שמתחלפים בעדינות — אין רגע אחד שקוטע.',
    colors: ['#d53f8c', '#fbb6ce'], glyph: '♀',
    steps: [
      { id: 'love-whisper', min: 18 }, { id: 'love-venus-night', min: 18 },
      { id: 'love-touch', min: 18 }, { id: 'love-skin', min: 18 },
    ],
  },
  {
    id: 'journey-lovers-night',
    title: 'לילה שלם ביחד',
    sub: '5 שלבים · 100 דקות',
    desc: 'המסע הזוגי הארוך: נשימה משותפת שמסנכרנת, ליל ונוס, טנטרה, לילה ארוך ב-174Hz — ו"אחרי" שמנחית בשקט. שעה ארבעים ברצף.',
    colors: ['#805ad5', '#4fd1c5'], glyph: '♀',
    steps: [
      { id: 'love-breath', min: 20 }, { id: 'love-venus-night', min: 20 },
      { id: 'love-tantra', min: 20 }, { id: 'love-longnight', min: 20 },
      { id: 'love-afterglow', min: 20 },
    ],
  },
  {
    id: 'journey-tantra',
    title: 'תרגול טנטרי',
    sub: '4 שלבים · 64 דקות',
    desc: 'תרגול איטי לזוג: נשימה משותפת להתכווננות, מגע, טנטרה על תדר הנס, ופתיחת הלב לסיום. בלי כלי הקשה בכלל — רק פאדים ונשימה.',
    colors: ['#f6e05e', '#f687b3'], glyph: '♀',
    steps: [
      { id: 'love-breath', min: 16 }, { id: 'love-touch', min: 16 },
      { id: 'love-tantra', min: 16 }, { id: 'chakra-heart', min: 16 },
    ],
  },
  {
    id: 'journey-morning-after',
    title: 'בוקר שאחרי',
    sub: '3 שלבים · 45 דקות',
    desc: 'שלוש רבעי שעה של אור רך: "אחרי" עם הקריסטל, שדה הלב עם הנבל, ושחר. לבוקר עצל שאף אחד לא ממהר לקום בו.',
    colors: ['#4fd1c5', '#f6e05e'], glyph: '♀',
    steps: [
      { id: 'love-afterglow', min: 15 }, { id: 'amb-heartfield', min: 15 },
      { id: 'amb-dawn', min: 15 },
    ],
  },

  /* ------------------------------ סשנים אורגניים — קצב בינוני ------------------------------ */
  {
    id: 'journey-organic-session',
    title: 'סשן אורגני',
    sub: '5 שלבים · 75 דקות',
    desc: 'שעה ורבע בקצב בינוני עם הקול הזורם: נהר 96, זהב נוזלי 100, העברת חלומות 104, פריחה 106 ויער בלילה 108. הטמפו עולה מעט בכל שלב, הצליל אף פעם לא נחבט. 🎧',
    colors: ['#4fd1c5', '#48bb78'], glyph: '❋',
    steps: [
      { id: 'org-river', min: 15 }, { id: 'org-liquid', min: 15 },
      { id: 'org-dreams', min: 15 }, { id: 'org-bloom', min: 15 },
      { id: 'org-forest', min: 15 },
    ],
  },
  {
    id: 'journey-organic-trip',
    title: 'טריפ אורגני',
    sub: '5 שלבים · 80 דקות',
    desc: 'הצד המתעתע: מיראז\' בסולם מעוות, מתפתל הפריגי על שומאן, טיסת לילה 114, ונחיתה בנהר. פסיכדליה שזורמת במקום להתפוצץ.',
    colors: ['#ed8936', '#805ad5'], glyph: '❋',
    steps: [
      { id: 'org-dreams', min: 16 }, { id: 'org-mirage', min: 16 },
      { id: 'org-serpentine', min: 16 }, { id: 'org-nightflight', min: 16 },
      { id: 'org-river', min: 16 },
    ],
  },
  {
    id: 'journey-organic-drive',
    title: 'נהיגת לילה',
    sub: '4 שלבים · 60 דקות',
    desc: 'שעה לכביש פתוח: טיסת לילה 114, יער בלילה 108, מיראז\' 110 ופריחה לסיום. קצב שמחזיק ערנות בלי למתוח.',
    colors: ['#d6bcfa', '#68d391'], glyph: '❋',
    steps: [
      { id: 'org-nightflight', min: 15 }, { id: 'org-forest', min: 15 },
      { id: 'org-mirage', min: 15 }, { id: 'org-bloom', min: 15 },
    ],
  },

  /* ------------------------------ אירוטי עדין — קצב איטי עד בינוני ------------------------------ */
  {
    id: 'journey-sensual-slow',
    title: 'לאט מאוד',
    sub: '4 שלבים · 72 דקות',
    desc: 'שעה וחצי בקצב הנמוך ביותר: פעימה בחבטה כפולה של 88, נשימה אחת ב-90, לאט ב-92 ולחישות ב-98. הקצב נוכח אבל אף פעם לא מוביל.',
    colors: ['#fc8181', '#9ae6b4'], glyph: '♀',
    steps: [
      { id: 'sn-heartbeat', min: 18 }, { id: 'sn-onebreath', min: 18 },
      { id: 'sn-slow', min: 18 }, { id: 'sn-whispers', min: 18 },
    ],
  },
  {
    id: 'journey-sensual-rise',
    title: 'ערב שמתחמם',
    sub: '5 שלבים · 90 דקות',
    desc: 'שעה וחצי שעולה בעדינות: לאט 92, קרוב 96, אור נר 100, קטיפה 102 וחום הגוף 106. ארבע נקודות טמפו לאורך המסע כולו — עלייה שכמעט לא מרגישים.',
    colors: ['#f687b3', '#68d391'], glyph: '♀',
    steps: [
      { id: 'sn-slow', min: 18 }, { id: 'sn-skinclose', min: 18 },
      { id: 'sn-candlelight', min: 18 }, { id: 'sn-velvet', min: 18 },
      { id: 'sn-warmth', min: 18 },
    ],
  },
  {
    id: 'journey-sensual-blue',
    title: 'שעה כחולה',
    sub: '4 שלבים · 76 דקות',
    desc: 'מהשקיעה אל הלילה: שעה כחולה, קטיפה על שומאן, מגע ארוך ב-112 — ונחיתה בנשימה אחת. הצד המסתורי יותר של הפרק.',
    colors: ['#4fd1c5', '#805ad5'], glyph: '♀',
    steps: [
      { id: 'sn-bluehour', min: 19 }, { id: 'sn-velvet', min: 19 },
      { id: 'sn-longtouch', min: 19 }, { id: 'sn-onebreath', min: 19 },
    ],
  },
  {
    id: 'journey-sensual-night',
    title: 'לילה ארוך ורך',
    sub: '6 שלבים · 108 דקות',
    desc: 'המסע החושני המלא, שעה ושלושת רבעי: פעימה, לאט, קרוב, אור נר, חום הגוף — וסיום ב"אחרי" ללא קצב בכלל. הקצב נכנס בהדרגה ויוצא בהדרגה.',
    colors: ['#d53f8c', '#4fd1c5'], glyph: '♀',
    steps: [
      { id: 'sn-heartbeat', min: 18 }, { id: 'sn-slow', min: 18 },
      { id: 'sn-skinclose', min: 18 }, { id: 'sn-candlelight', min: 18 },
      { id: 'sn-warmth', min: 18 }, { id: 'love-afterglow', min: 18 },
    ],
  },

  /* ------------------------------ סטים של דיפ האוס אורגני ------------------------------ */
  {
    id: 'journey-organic-house',
    title: 'סט האוס אורגני',
    sub: '6 שלבים · 108 דקות',
    desc: 'הסט המלא של הז\'אנר, שעה ושלושת רבעי: שחר 432 בקצב 117, זריחה על החוף, דיפ אורגני, חום, מדבר בלילה — ולילה עמוק ב-124 לשיא. הטמפו עולה נקודה בכל שלב.',
    colors: ['#9ae6b4', '#805ad5'], glyph: '❋',
    steps: [
      { id: 'oh-dawn', min: 18 }, { id: 'oh-sunrise', min: 18 },
      { id: 'oh-deep', min: 18 }, { id: 'oh-warm', min: 18 },
      { id: 'oh-desert', min: 18 }, { id: 'oh-night', min: 18 },
    ],
  },
  {
    id: 'journey-house-sunset',
    title: 'שקיעה על החוף',
    sub: '4 שלבים · 72 דקות',
    desc: 'הסט של שעת הזהב: שחר 432, זריחה על החוף, חום וכחול עמוק. הכי רך בפרק — לרחבה שעדיין מדברת, או למרפסת.',
    colors: ['#f6e05e', '#2b6cb0'], glyph: '❋',
    steps: [
      { id: 'oh-dawn', min: 18 }, { id: 'oh-sunrise', min: 18 },
      { id: 'oh-warm', min: 18 }, { id: 'oh-deepblue', min: 18 },
    ],
  },
  {
    id: 'journey-house-afterdark',
    title: 'אחרי החשכה',
    sub: '5 שלבים · 100 דקות',
    desc: 'הצד האפל והמתגלגל: שבטי אורגני, מדבר בלילה, תעתוע בסולם המעוות, מיסטי — ולילה עמוק ב-124 לסיום. שעה ארבעים בלי לרדת מהגרוב.',
    colors: ['#b7791f', '#805ad5'], glyph: '❋',
    steps: [
      { id: 'oh-tribal', min: 20 }, { id: 'oh-desert', min: 20 },
      { id: 'oh-mirage', min: 20 }, { id: 'oh-mystic', min: 20 },
      { id: 'oh-night', min: 20 },
    ],
  },
  {
    id: 'journey-house-grounded',
    title: 'האוס מוארק',
    sub: '4 שלבים · 76 דקות',
    desc: 'גרוב מלא עם עוגן: האוס מוארק על שומאן, מקדש מתגלגל, דיפ אורגני וכחול עמוק. רוקד ומוארק לאורך שעה ורבע.',
    colors: ['#48bb78', '#667eea'], glyph: '❋',
    steps: [
      { id: 'oh-schumann', min: 19 }, { id: 'oh-temple', min: 19 },
      { id: 'oh-deep', min: 19 }, { id: 'oh-deepblue', min: 19 },
    ],
  },

  /* ------------------------------ סטים של טכנו — עולים ------------------------------ */
  {
    id: 'journey-techno-rise',
    title: 'סט טכנו — עלייה',
    sub: '4 שלבים · 48 דקות',
    desc: 'הסט הקלאסי שעולה: 112 BPM לחימום, 122 לגרוב, 128 לדרייב — ו-132 עם גמא 40Hz בשיא. כל שלב מוסיף האטים, בס ואנרגיה. גלי המוח עולים איתו מאלפא לגמא.',
    colors: ['#4fd1c5', '#ecc94b'], glyph: '▲',
    steps: [
      { id: 'tk-warmup', min: 10 }, { id: 'tk-groove', min: 12 },
      { id: 'tk-drive', min: 12 }, { id: 'tk-peak', min: 14 },
    ],
  },
  {
    id: 'journey-techno-peak',
    title: 'עלייה לשיא',
    sub: '4 שלבים · 40 דקות',
    desc: 'ישר לעניין: דרייב 128, אסיד 134 בסולם מעוות, טראנס מרומם 138 — ושיא קשה 142 עם האטים על כל שש-עשרה. הגבוה ביותר בספרייה. 🎧',
    colors: ['#e53e3e', '#d6bcfa'], glyph: '▲',
    steps: [
      { id: 'tk-drive', min: 10 }, { id: 'tk-acid', min: 10 },
      { id: 'tk-trance', min: 10 }, { id: 'tk-hardpeak', min: 10 },
    ],
  },
  {
    id: 'journey-techno-night',
    title: 'לילה שלם במועדון',
    sub: '6 שלבים · 74 דקות',
    desc: 'הקשת המלאה: חימום, גרוב, טכנו אפל, שיא גמא, טראנס מרומם — ואפטר-אוורס שמנחית בעדינות. שעה וחצי של סט מלא מתחילתו ועד הבוקר.',
    colors: ['#4a5568', '#63b3ed'], glyph: '◼',
    steps: [
      { id: 'tk-warmup', min: 10 }, { id: 'tk-groove', min: 12 },
      { id: 'tk-dark', min: 12 }, { id: 'tk-peak', min: 14 },
      { id: 'tk-trance', min: 14 }, { id: 'tk-afterhours', min: 12 },
    ],
  },
  {
    id: 'journey-techno-hypnotic',
    title: 'טכנו מדיטטיבי',
    sub: '4 שלבים · 44 דקות',
    desc: 'לריקוד עם עיניים עצומות: טכנו מוארק על פעימת שומאן, היפנוטי מינימלי, אפל וטקסי — וחזרה להארקה. עולה באנרגיה בלי לאבד את הקרקע.',
    colors: ['#68d391', '#805ad5'], glyph: '◼',
    steps: [
      { id: 'tk-schumann', min: 11 }, { id: 'tk-hypnotic', min: 11 },
      { id: 'tk-dark', min: 11 }, { id: 'tk-schumann', min: 11 },
    ],
  },
  {
    id: 'journey-techno-workout',
    title: 'אימון בקצב',
    sub: '5 שלבים · 40 דקות',
    desc: 'סט אימון מתוזמן: חימום ב-112, העלאת דופק ל-128, שני שיאים ב-138 ו-142 — ושחרור באפטר-אוורס. הטמפו מוביל את הגוף בלי לחשוב.',
    colors: ['#f56565', '#ecc94b'], glyph: '▲',
    steps: [
      { id: 'tk-warmup', min: 6 }, { id: 'tk-drive', min: 8 },
      { id: 'tk-trance', min: 10 }, { id: 'tk-hardpeak', min: 8 },
      { id: 'tk-afterhours', min: 8 },
    ],
  },
  {
    id: 'journey-psytrance',
    title: 'מסע פסייטראנס',
    sub: '4 שלבים · 52 דקות',
    desc: 'הבס המתגלגל מתחיל בגואה 142, עולה לפסייטראנס 145, מתפוצץ בפול-און 148 — ונוחת באפטר-אוורס. הסט השלם של מסיבת יער.',
    colors: ['#9f7aea', '#f56565'], glyph: '▲',
    steps: [
      { id: 'tk-goa', min: 13 }, { id: 'tk-psy', min: 13 },
      { id: 'tk-fullon', min: 13 }, { id: 'tk-afterhours', min: 13 },
    ],
  },
  {
    id: 'journey-dub-session',
    title: 'סשן דאב',
    sub: '4 שלבים · 48 דקות',
    desc: 'ברלין בשלוש לפנות בוקר: דאב טכנו, דאב עמוק, פרוגרסיב שנפתח לאט — ונחיתה בדאון-טמפו על פעימת שומאן. שעה של מרחב.',
    colors: ['#4a5568', '#4fd1c5'], glyph: '◼',
    steps: [
      { id: 'tk-dub', min: 12 }, { id: 'tk-dubdeep', min: 12 },
      { id: 'tk-prog', min: 12 }, { id: 'tk-downtempo', min: 12 },
    ],
  },
  {
    id: 'journey-tribal-fire',
    title: 'מעגל שבטי',
    sub: '4 שלבים · 40 דקות',
    desc: 'הגשר בין מעגל האש למועדון: תוף שאמאני פותח, טכנו שבטי מכניס את הקיק, אפרו-האוס מצפיף — וטראנס תיפוף סוגר. תופים לאורך כל הדרך.',
    colors: ['#b7791f', '#ed8936'], glyph: '◼',
    steps: [
      { id: 'sh-drum', min: 10 }, { id: 'tk-tribal', min: 10 },
      { id: 'tk-afro', min: 10 }, { id: 'sh-trance', min: 10 },
    ],
  },
  {
    id: 'journey-breaks',
    title: 'ברייקס',
    sub: '3 שלבים · 33 דקות',
    desc: 'קצב שבור לאורך כל הדרך: ברייקביט 168, דראם אנד בס 174 — ונחיתה בטריפ-הופ 90 שמוריד את הדופק בחצי.',
    colors: ['#4299e1', '#805ad5'], glyph: '▲',
    steps: [
      { id: 'tk-break', min: 11 }, { id: 'tk-dnb', min: 11 },
      { id: 'tk-triphop', min: 11 },
    ],
  },
  {
    id: 'journey-chillout',
    title: 'צ\'יל-אאוט',
    sub: '4 שלבים · 44 דקות',
    desc: 'הקצב האיטי בלבד: דאון-טמפו על שומאן, טריפ-הופ כבד, דאב עמוק — וסיום ללא קצב באמבט קערות. לעבודה, לנסיעה או לערב.',
    colors: ['#4fd1c5', '#a0aec0'], glyph: '◼',
    steps: [
      { id: 'tk-downtempo', min: 11 }, { id: 'tk-triphop', min: 11 },
      { id: 'tk-dubdeep', min: 11 }, { id: 'bowl-gong', min: 11 },
    ],
  },
  {
    id: 'journey-genres',
    title: 'המסע דרך הז\'אנרים',
    sub: '8 שלבים · 96 דקות',
    desc: 'המסע הארוך ביותר בספרייה — שעה וחצי שעוברת בכל צורות הקצב: דאון-טמפו, דאב, שבטי, טכנו, פרוגרסיב, פסייטראנס, פול-און — ונחיתה מלאה. הקשת השלמה.',
    colors: ['#4fd1c5', '#f56565'], glyph: '▲',
    steps: [
      { id: 'tk-downtempo', min: 12 }, { id: 'tk-dub', min: 12 },
      { id: 'tk-tribal', min: 12 }, { id: 'tk-drive', min: 12 },
      { id: 'tk-prog', min: 12 }, { id: 'tk-psy', min: 12 },
      { id: 'tk-fullon', min: 12 }, { id: 'tk-afterhours', min: 12 },
    ],
  },
  {
    id: 'journey-run',
    title: 'ריצה ארוכה',
    sub: '5 שלבים · 50 דקות',
    desc: 'קצב מדורג לריצה: חימום 112, אפרו 128 לקצב יציב, דרייב 128, ברייקביט 168 לספרינט — ושחרור בדאון-טמפו. חמישים דקות בלי לגעת בטלפון.',
    colors: ['#f6ad55', '#48bb78'], glyph: '▲',
    steps: [
      { id: 'tk-warmup', min: 8 }, { id: 'tk-afro', min: 12 },
      { id: 'tk-drive', min: 12 }, { id: 'tk-break', min: 10 },
      { id: 'tk-downtempo', min: 8 },
    ],
  },
  /* ---------------- אינטימלנד — קשת של ארבע תנועות ----------------
     בנוי כמו סדרת אלבומים ולא כמו רשימת השמעה: כל מסע הוא תנועה
     אחת שלמה, והמסע הרביעי מריץ את כולן ברצף. השלבים ארוכים
     בכוונה — 14–22 דקות — כי בטמפו 56 שום דבר לא קורה מהר. */
  {
    id: 'journey-intim-touch',
    title: 'אינטימלנד · מגע',
    sub: '3 שלבים · 54 דקות',
    desc: 'התנועה הראשונה. חליל, קול וונוס על תוף מסגרת איטי — 56 עד 60 פעימות בדקה. שום דבר לא ממהר, ואין כאן שיא. רק התקרבות.',
    colors: ['#e0a458', '#2a1206'], glyph: '❦',
    steps: [
      { id: 'il-near', min: 18 }, { id: 'il-firsttouch', min: 18 },
      { id: 'il-longnight', min: 18 },
    ],
  },
  {
    id: 'journey-intim-feeling',
    title: 'אינטימלנד · הרגשה',
    sub: '4 שלבים · 64 דקות',
    desc: 'התנועה השנייה. הגרוב מתחיל להתנדנד, נכנס פסנתר חשמלי חם, והתדרים עוברים מהאום העמוק אל 528. עדיין מתחת ל-66 פעימות.',
    colors: ['#f0b27a', '#301505'], glyph: '❦',
    steps: [
      { id: 'il-youhere', min: 16 }, { id: 'il-skin', min: 16 },
      { id: 'il-breathe', min: 16 }, { id: 'il-warm', min: 16 },
    ],
  },
  {
    id: 'journey-intim-merger',
    title: 'אינטימלנד · התמזגות',
    sub: '4 שלבים · 68 דקות',
    desc: 'התנועה השלישית והנעה ביותר: 68 עד 74, ארבע מכות שוות בתיבה ונקישות אצבע ביניהן. עדיין אפס האט ואפס בעיטת מועדון.',
    colors: ['#e07a5f', '#2b0d0a'], glyph: '❦',
    steps: [
      { id: 'il-deeper', min: 16 }, { id: 'il-onebody', min: 16 },
      { id: 'il-merger', min: 18 }, { id: 'il-bodyspace', min: 18 },
    ],
  },
  {
    id: 'journey-intimland',
    title: 'אינטימלנד · הקשת השלמה',
    sub: '7 שלבים · 132 דקות',
    desc: 'שעתיים ורבע ברצף אחד: מגע, הרגשה, התמזגות ואחרי. הטמפו עולה מ-56 ל-74 ויורד חזרה ל-56, והפרידה בסוף היא התו הארוך ביותר בכל האפליקציה. להשמעה רצופה בלי לגעת בטלפון.',
    colors: ['#d98a7b', '#150d08'], glyph: '❦',
    steps: [
      { id: 'il-near', min: 18 }, { id: 'il-firsttouch', min: 18 },
      { id: 'il-longnight', min: 18 }, { id: 'il-breathe', min: 18 },
      { id: 'il-warm', min: 18 }, { id: 'il-merger', min: 20 },
      { id: 'il-afterglow', min: 22 },
    ],
  },
];

export const journeyById = Object.fromEntries(JOURNEYS.map(j => [j.id, j]));
