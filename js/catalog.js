/* ============================================================
   RESONANCE · קטלוג יצירות התדר
   כל יצירה מוגדרת כאן בלבד — המנוע והממשק נבנים מהנתונים.

   mode:  'pure'       תדר טהור בשכבות הרמוניות
          'binaural'   ביט בינאורלי (חובה אוזניות) — beat = הפרש Hz
          'isochronic' פעימות עוצמה בתדר הביט — עובד גם ברמקולים
          'melodic'    מלודיה גנרטיבית אינסופית — תווים ביחסים הרמוניים
                       טהורים של תדר הריפוי (pace = קצב, sparkle = נצנוץ)
   ============================================================ */

export const CATEGORIES = [
  { id: 'featured',   label: 'נבחרות',              icon: '✦' },
  { id: 'melodic',    label: 'מלודיות מרפאות',      icon: '♬' },
  { id: 'shaman',     label: 'שאמאני ופסיכדלי',     icon: '𓂀' },
  { id: 'bowls',      label: 'קערות וגונגים',       icon: '◍' },
  { id: 'mantra',     label: 'מנטרות ושירת גרון',   icon: 'ॐ' },
  { id: 'solfeggio',  label: 'סולפג\'יו',            icon: '♪' },
  { id: 'chakra',     label: 'צ\'אקרות',             icon: '◉' },
  { id: 'brainwave',  label: 'גלי מוח',             icon: '∿' },
  { id: 'sleep',      label: 'שינה עמוקה',          icon: '☾' },
  { id: 'focus',      label: 'ריכוז ולמידה',        icon: '◎' },
  { id: 'calm',       label: 'רוגע ואיזון רגשי',    icon: '༄' },
  { id: 'love',       label: 'אהבה וזוגיות',        icon: '♥' },
  { id: 'dna',        label: 'תיקון DNA ותאים',     icon: '⧬' },
  { id: 'planets',    label: 'תדרים פלנטריים',      icon: '☉' },
  { id: 'earth',      label: 'תדרי כדור הארץ',      icon: '⊕' },
  { id: 'meditation', label: 'מדיטציה',             icon: '☯' },
  { id: 'energy',     label: 'אנרגיה ושפע',         icon: '☀' },
];

export const TRACKS = [

  /* ------------------------------ סולפג'יו ------------------------------ */
  { id: 'sol-174', category: 'solfeggio', freq: 174, mode: 'pure',
    title: 'יסוד — 174Hz', sub: 'Foundation · שיכוך כאב',
    desc: 'התדר הנמוך בסקאלת הסולפג\'יו. מסורתית — משכך כאב, מרפה שרירים ומעניק לגוף תחושת ביטחון ואדמה.',
    tags: ['כאב', 'הרפיה', 'ביטחון'], colors: ['#7c5cff', '#3b2f8f'], glyph: '174', ambience: 0.05 },

  { id: 'sol-285', category: 'solfeggio', freq: 285, mode: 'pure',
    title: 'התחדשות — 285Hz', sub: 'Regeneration · ריפוי רקמות',
    desc: 'תדר ההתחדשות. מסורתית — מעודד ריפוי והתחדשות של רקמות ואיברים ומחזיר את השדה האנרגטי למבנהו המקורי.',
    tags: ['ריפוי', 'רקמות', 'התחדשות'], colors: ['#4fd1c5', '#1d6e66'], glyph: '285', ambience: 0.045 },

  { id: 'sol-396', category: 'solfeggio', freq: 396, mode: 'pure',
    title: 'שחרור — 396Hz', sub: 'Liberation · שחרור פחד ואשמה',
    desc: 'תדר השחרור, המשויך לצ\'אקרת השורש. מסורתית — ממוסס פחד, אשמה ודפוסים תת-הכרתיים חוסמים.',
    tags: ['פחד', 'אשמה', 'שורש'], colors: ['#e53e3e', '#7a1e1e'], glyph: '396', ambience: 0.04 },

  { id: 'sol-417', category: 'solfeggio', freq: 417, mode: 'pure',
    title: 'שינוי — 417Hz', sub: 'Change · ניקוי אנרגיה שלילית',
    desc: 'תדר השינוי, המשויך לצ\'אקרת הסקרל. מסורתית — מנקה אנרגיה שלילית, מפרק חוויות טראומטיות ופותח דלת לחדש.',
    tags: ['שינוי', 'ניקוי', 'יצירתיות'], colors: ['#ed8936', '#8f4514'], glyph: '417', ambience: 0.04 },

  { id: 'sol-528', category: 'solfeggio', freq: 528, mode: 'pure', featured: true,
    title: 'תדר הנס — 528Hz', sub: 'Miracle Tone · אהבה וטרנספורמציה',
    desc: 'המפורסם שבתדרי הסולפג\'יו — "תדר הנס". מסורתית — תדר האהבה והטרנספורמציה, המשויך לתיקון DNA ולמקלעת השמש.',
    tags: ['אהבה', 'DNA', 'נס'], colors: ['#f6e05e', '#b7791f'], glyph: '528', ambience: 0.04 },

  { id: 'sol-639', category: 'solfeggio', freq: 639, mode: 'pure',
    title: 'חיבור — 639Hz', sub: 'Connection · מערכות יחסים',
    desc: 'תדר הלב והחיבור. מסורתית — מרפא מערכות יחסים, מעמיק אמפתיה ותקשורת ומחזיר הרמוניה בין אנשים.',
    tags: ['יחסים', 'לב', 'אמפתיה'], colors: ['#48bb78', '#1f5e3a'], glyph: '639', ambience: 0.04 },

  { id: 'sol-741', category: 'solfeggio', freq: 741, mode: 'pure',
    title: 'ביטוי — 741Hz', sub: 'Expression · ניקוי רעלים',
    desc: 'תדר הגרון והביטוי. מסורתית — מסייע בניקוי רעלים פיזי ואנרגטי ומעורר ביטוי עצמי אותנטי ופתרון בעיות.',
    tags: ['ביטוי', 'דיטוקס', 'גרון'], colors: ['#4299e1', '#1e4e7a'], glyph: '741', ambience: 0.04 },

  { id: 'sol-852', category: 'solfeggio', freq: 852, mode: 'pure',
    title: 'אינטואיציה — 852Hz', sub: 'Intuition · העין השלישית',
    desc: 'תדר האינטואיציה. מסורתית — מעורר ראייה פנימית, מחזיר סדר רוחני ומחבר לחוכמה שמעבר למחשבה.',
    tags: ['אינטואיציה', 'עין שלישית'], colors: ['#667eea', '#33356e'], glyph: '852', ambience: 0.04 },

  { id: 'sol-963', category: 'solfeggio', freq: 963, mode: 'pure', featured: true,
    title: 'תדר האור — 963Hz', sub: 'Divine · הארה ותודעה עליונה',
    desc: 'תדר הכתר וההארה. מסורתית — "תדר האלוהות", מעורר את בלוטת האצטרובל ומחבר לתודעת האחדות.',
    tags: ['הארה', 'כתר', 'אצטרובל'], colors: ['#b794f4', '#553c9a'], glyph: '963', ambience: 0.035 },

  /* ------------------------------ צ'אקרות (מסעות תטא בינאורליים) ------------------------------ */
  { id: 'chakra-root', category: 'chakra', freq: 396, mode: 'binaural', beat: 6,
    title: 'צ\'אקרת השורש', sub: 'Muladhara · 396Hz + תטא',
    desc: 'מסע הארקה לבסיס עמוד השדרה: 396Hz עם ביט תטא 6Hz שמוריד את המוח למדיטציה עמוקה. יציבות, ביטחון, שורשים.',
    tags: ['הארקה', 'ביטחון'], colors: ['#f56565', '#63171b'], glyph: 'א', ambience: 0.05 },

  { id: 'chakra-sacral', category: 'chakra', freq: 417, mode: 'binaural', beat: 6,
    title: 'צ\'אקרת הסקרל', sub: 'Svadhisthana · 417Hz + תטא',
    desc: 'מרכז היצירה והזרימה: 417Hz עם ביט תטא. מעורר יצירתיות, הנאה ותנועה רגשית חופשית.',
    tags: ['יצירתיות', 'זרימה'], colors: ['#f6ad55', '#7b341e'], glyph: 'ב', ambience: 0.045 },

  { id: 'chakra-solar', category: 'chakra', freq: 528, mode: 'binaural', beat: 6,
    title: 'מקלעת השמש', sub: 'Manipura · 528Hz + תטא',
    desc: 'מרכז הכוח האישי: תדר הנס 528Hz עם ביט תטא. ביטחון עצמי, רצון וכוח פעולה.',
    tags: ['כוח', 'ביטחון עצמי'], colors: ['#faf089', '#975a16'], glyph: 'ג', ambience: 0.04 },

  { id: 'chakra-heart', category: 'chakra', freq: 639, mode: 'binaural', beat: 6, featured: true,
    title: 'צ\'אקרת הלב', sub: 'Anahata · 639Hz + תטא',
    desc: 'מרכז האהבה והחמלה: 639Hz עם ביט תטא 6Hz. פתיחת הלב, סליחה, וחיבור אמיתי לעצמך ולאחרים.',
    tags: ['אהבה', 'חמלה', 'סליחה'], colors: ['#68d391', '#22543d'], glyph: 'ד', ambience: 0.045 },

  { id: 'chakra-throat', category: 'chakra', freq: 741, mode: 'binaural', beat: 6,
    title: 'צ\'אקרת הגרון', sub: 'Vishuddha · 741Hz + תטא',
    desc: 'מרכז הביטוי והאמת: 741Hz עם ביט תטא. שחרור הקול הפנימי ודיבור אמת בבהירות.',
    tags: ['ביטוי', 'אמת'], colors: ['#63b3ed', '#1a365d'], glyph: 'ה', ambience: 0.04 },

  { id: 'chakra-third-eye', category: 'chakra', freq: 852, mode: 'binaural', beat: 6,
    title: 'העין השלישית', sub: 'Ajna · 852Hz + תטא',
    desc: 'מרכז הראייה הפנימית: 852Hz עם ביט תטא. חידוד אינטואיציה, דמיון מודרך וחלימה צלולה.',
    tags: ['אינטואיציה', 'חזון'], colors: ['#7f9cf5', '#2a2a72'], glyph: 'ו', ambience: 0.04 },

  { id: 'chakra-crown', category: 'chakra', freq: 963, mode: 'binaural', beat: 6,
    title: 'צ\'אקרת הכתר', sub: 'Sahasrara · 963Hz + תטא',
    desc: 'שער התודעה העליונה: 963Hz עם ביט תטא. התמזגות, הארה ושקט שמעבר למילים.',
    tags: ['הארה', 'אחדות'], colors: ['#d6bcfa', '#44337a'], glyph: 'ז', ambience: 0.035 },

  /* ------------------------------ גלי מוח ------------------------------ */
  { id: 'wave-delta', category: 'brainwave', freq: 120, mode: 'binaural', beat: 2.5,
    title: 'דלתא — שינה עמוקה', sub: 'Delta 2.5Hz · 🎧',
    desc: 'גלי דלתא (0.5–4Hz) שולטים בשינה העמוקה ביותר — שלב ההתחדשות הפיזית של הגוף. נשא 120Hz רך, ביט 2.5Hz.',
    tags: ['שינה', 'התחדשות'], colors: ['#2c5282', '#0d1b2a'], glyph: 'δ', ambience: 0.06 },

  { id: 'wave-theta', category: 'brainwave', freq: 136.1, mode: 'binaural', beat: 6,
    title: 'תטא — מדיטציה עמוקה', sub: 'Theta 6Hz · 🎧',
    desc: 'גלי תטא (4–8Hz) — שער המדיטציה העמוקה, החלימה והתת-מודע. נשא OM 136.1Hz עם ביט 6Hz.',
    tags: ['מדיטציה', 'תת-מודע'], colors: ['#6b46c1', '#1a1033'], glyph: 'θ', ambience: 0.05 },

  { id: 'wave-alpha', category: 'brainwave', freq: 200, mode: 'binaural', beat: 10,
    title: 'אלפא — רגיעה צלולה', sub: 'Alpha 10Hz · 🎧',
    desc: 'גלי אלפא (8–14Hz) — מצב הזרימה הרגוע: ערני אך משוחרר. מצוין להפגת חרדה ולפני אירועים מלחיצים.',
    tags: ['הרפיה', 'חרדה', 'זרימה'], colors: ['#38b2ac', '#0f2e2c'], glyph: 'α', ambience: 0.045 },

  { id: 'wave-beta', category: 'brainwave', freq: 250, mode: 'binaural', beat: 16,
    title: 'בטא — ערנות פעילה', sub: 'Beta 16Hz · 🎧',
    desc: 'גלי בטא (14–30Hz) — מצב העבודה הערני. ביט 16Hz מדויק לריכוז ממושך בלי עומס.',
    tags: ['ריכוז', 'עבודה'], colors: ['#dd6b20', '#3d1f0a'], glyph: 'β', ambience: 0.03 },

  { id: 'wave-gamma', category: 'brainwave', freq: 200, mode: 'binaural', beat: 40, featured: true,
    title: 'גמא 40 — מיקוד-על', sub: 'Gamma 40Hz · 🎧 · מגובה מחקר',
    desc: 'התדר הנחקר ביותר אקדמית: גירוי 40Hz נבדק במעבדות MIT בהקשרי זיכרון וקוגניציה. לרגעי החדות הגבוהים ביותר.',
    tags: ['זיכרון', 'מיקוד', 'מחקר'], colors: ['#ecc94b', '#5f370e'], glyph: 'γ', ambience: 0.025 },

  /* ------------------------------ שינה ------------------------------ */
  { id: 'sleep-deep', category: 'sleep', freq: 100, mode: 'binaural', beat: 2, featured: true,
    title: 'צלילה אל השינה', sub: 'Delta 2Hz · 🎧',
    desc: 'המסלול העמוק ביותר: נשא 100Hz חם כשמיכה, ביט דלתא 2Hz ואווירת אוקיינוס. הפעילו טיימר ותנו לצליל להנמיך אתכם.',
    tags: ['שינה', 'לילה'], colors: ['#1e3a8a', '#050510'], glyph: '☾', ambience: 0.08 },

  { id: 'sleep-moon', category: 'sleep', freq: 174, mode: 'pure',
    title: 'ליל ירח מלא', sub: '174Hz · הרפיית גוף מלאה',
    desc: 'תדר היסוד 174Hz בעיבוד לילי רך עם מרחב ריוורב עמוק — משחרר את שרירי הגוף לקראת שינה.',
    tags: ['הרפיה', 'ערב'], colors: ['#4c51bf', '#0a0a1f'], glyph: '☽', ambience: 0.07 },

  { id: 'sleep-hammock', category: 'sleep', freq: 136.1, mode: 'binaural', beat: 4,
    title: 'ערסל תטא', sub: 'Theta 4Hz · 🎧 · סף החלום',
    desc: 'התדר שמרחף בדיוק על סף החלום: ביט 4Hz בגבול תטא-דלתא. לנמנום צהריים או כניסה איטית ללילה.',
    tags: ['נמנום', 'חלימה'], colors: ['#553c9a', '#0f0a1e'], glyph: '≈', ambience: 0.065 },

  { id: 'sleep-ocean', category: 'sleep', freq: 285, mode: 'isochronic', beat: 3,
    title: 'אוקיינוס לילי', sub: '285Hz · פעימות 3Hz · גם ברמקולים',
    desc: 'גלים איטיים של 285Hz בפעימות דלתא — עובד גם ברמקול ליד המיטה, בלי אוזניות.',
    tags: ['שינה', 'רמקול'], colors: ['#2b6cb0', '#071422'], glyph: '〜', ambience: 0.09 },

  /* ------------------------------ ריכוז ולמידה ------------------------------ */
  { id: 'focus-deep', category: 'focus', freq: 250, mode: 'binaural', beat: 18, featured: true,
    title: 'מנהרת ריכוז', sub: 'Beta 18Hz · 🎧 · עבודה עמוקה',
    desc: 'לסשן עבודה רציני: ביט בטא 18Hz שמחזיק את המוח בערנות חדה לאורך שעות, עם מינימום הסחה.',
    tags: ['עבודה', 'Deep Work'], colors: ['#c05621', '#1f1005'], glyph: '◎', ambience: 0.02 },

  { id: 'focus-flow', category: 'focus', freq: 220, mode: 'isochronic', beat: 10,
    title: 'זרימת אלפא', sub: '220Hz · פעימות 10Hz',
    desc: 'מצב Flow קלאסי: אלפא 10Hz בפעימות איזוכרוניות. לכתיבה, עיצוב וכל עבודה יצירתית רגועה.',
    tags: ['זרימה', 'יצירה'], colors: ['#319795', '#0a1f1e'], glyph: '∞', ambience: 0.03 },

  { id: 'focus-memory', category: 'focus', freq: 240, mode: 'isochronic', beat: 40,
    title: 'גמא ללמידה', sub: '240Hz · פעימות 40Hz',
    desc: 'גרסת הלמידה של גמא 40: פעימות איזוכרוניות שעובדות גם ברמקולים. לשינון, קריאה מהירה ובחינות.',
    tags: ['למידה', 'זיכרון'], colors: ['#d69e2e', '#211603'], glyph: 'γ', ambience: 0.02 },

  { id: 'focus-soft', category: 'focus', freq: 210, mode: 'binaural', beat: 12,
    title: 'למידה רכה', sub: 'Alpha-Beta 12Hz · 🎧',
    desc: 'תדר הגבול בין אלפא לבטא — ריכוז נינוח בלי מתח. אידיאלי ללמידה ארוכה ולקריאת עומק.',
    tags: ['למידה', 'קריאה'], colors: ['#4299e1', '#0a1826'], glyph: '✎', ambience: 0.03 },

  /* ------------------------------ תיקון DNA ותאים ------------------------------ */
  { id: 'dna-528', category: 'dna', freq: 528, mode: 'pure', featured: true,
    title: 'תיקון DNA — 528Hz', sub: 'הליקס · תדר הנס בעיבוד עמוק',
    desc: 'העיבוד העמוק ביותר של 528Hz: שכבות הרמוניות עשירות וריוורב קתדרלה. מסורתית — התדר שמחזיר את ה-DNA לצורתו המושלמת.',
    tags: ['DNA', 'ריפוי', 'תאים'], colors: ['#f6e05e', '#744210'], glyph: '⧬', ambience: 0.045 },

  { id: 'dna-285', category: 'dna', freq: 285, mode: 'isochronic', beat: 7.83,
    title: 'רגנרציה תאית', sub: '285Hz · פעימת שומאן 7.83Hz',
    desc: 'תדר ההתחדשות 285Hz פועם בקצב תהודת שומאן — שילוב של ריפוי תאי עם פעימת כדור הארץ.',
    tags: ['תאים', 'התחדשות'], colors: ['#38b2ac', '#062421'], glyph: '❋', ambience: 0.05 },

  { id: 'dna-temple', category: 'dna', freq: 528, mode: 'binaural', beat: 7.83,
    title: 'מקדש התאים', sub: '528Hz × שומאן · 🎧',
    desc: 'הצירוף המבוקש בעולם הסאונד-הילינג: תדר הנס כנשא, תהודת שומאן כביט. הגוף נטען, המוח שוקע.',
    tags: ['DNA', 'שומאן'], colors: ['#faf089', '#22543d'], glyph: '✦', ambience: 0.05 },

  /* ------------------------------ תדרי כדור הארץ ------------------------------ */
  { id: 'earth-schumann', category: 'earth', freq: 136.1, mode: 'binaural', beat: 7.83, featured: true,
    title: 'תהודת שומאן', sub: '7.83Hz · פעימת כדור הארץ · 🎧',
    desc: 'התהודה האלקטרומגנטית של האטמוספרה — "פעימת הלב של הפלנטה". ביט 7.83Hz על נשא OM. הארקה עמוקה.',
    tags: ['הארקה', 'טבע', 'שומאן'], colors: ['#48bb78', '#0a1f12'], glyph: '⊕', ambience: 0.06 },

  { id: 'earth-432', category: 'earth', freq: 432, mode: 'pure',
    title: 'כוונון הטבע — 432Hz', sub: 'Verdi A · הכוונון ההרמוני',
    desc: 'הכוונון האלטרנטיבי A=432 — נתפס כרך והרמוני יותר מהתקן המודרני 440. צליל שהגוף "מזהה".',
    tags: ['הרמוניה', 'טבע'], colors: ['#68d391', '#133524'], glyph: '432', ambience: 0.04 },

  { id: 'earth-111', category: 'earth', freq: 111, mode: 'pure',
    title: 'מקדש 111', sub: '111Hz · תדר התאים הקדושים',
    desc: 'התדר שנמדד בחללים נאוליתיים עתיקים (ההיפוגאום במלטה). מסורתית — משרה מצב תודעה טקסי ושחרור אנדורפינים.',
    tags: ['עתיק', 'טקס'], colors: ['#a0aec0', '#171923'], glyph: '111', ambience: 0.055 },

  { id: 'earth-om', category: 'earth', freq: 136.1, mode: 'pure',
    title: 'OM — 136.1Hz', sub: 'צליל השנה הקוסמית',
    desc: 'תדר ה-OM: מחזור השמש של כדור הארץ מתורגם לאוקטבות שמע. הצליל שאליו מכוונות קערות טיבטיות.',
    tags: ['OM', 'קערות'], colors: ['#ed8936', '#271203'], glyph: 'ॐ', ambience: 0.05 },

  /* ------------------------------ מדיטציה ------------------------------ */
  { id: 'med-om-journey', category: 'meditation', freq: 136.1, mode: 'binaural', beat: 6, featured: true,
    title: 'מסע ה-OM', sub: '136.1Hz + תטא · 🎧',
    desc: 'המדיטציה השלמה: צליל OM עם ביט תטא 6Hz. עשרים דקות כאן שוות שעה של ישיבה רגילה.',
    tags: ['מדיטציה', 'OM'], colors: ['#9f7aea', '#170e2e'], glyph: '☯', ambience: 0.05 },

  { id: 'med-shaman', category: 'meditation', freq: 180, mode: 'isochronic', beat: 4.5,
    title: 'מסע שאמאני', sub: '180Hz · פעימות 4.5Hz',
    desc: 'קצב התוף השאמאני המסורתי (~4.5 פעימות בשנייה) — השער העתיק ביותר למסעות תודעה פנימיים.',
    tags: ['שאמאני', 'מסע'], colors: ['#b7791f', '#1c1002'], glyph: '𓂀', ambience: 0.06 },

  { id: 'med-heart', category: 'meditation', freq: 639, mode: 'binaural', beat: 8,
    title: 'מדיטציית לב פתוח', sub: '639Hz + אלפא 8Hz · 🎧',
    desc: 'תדר הלב עם ביט אלפא עדין — מדיטציית חמלה (Metta) לפתיחת הלב כלפי עצמך ואחרים.',
    tags: ['לב', 'חמלה', 'מטא'], colors: ['#68d391', '#0c2b1c'], glyph: '♡', ambience: 0.045 },

  { id: 'med-silence', category: 'meditation', freq: 963, mode: 'isochronic', beat: 6,
    title: 'דממה סגולה', sub: '963Hz · פעימות תטא',
    desc: 'תדר האור בפעימות תטא איטיות — למדיטציית ריקות: לא מנטרה, לא דמיון. רק נוכחות.',
    tags: ['ריקות', 'נוכחות'], colors: ['#d6bcfa', '#1e1233'], glyph: '◌', ambience: 0.035 },

  /* ------------------------------ אנרגיה ושפע ------------------------------ */
  { id: 'energy-sunrise', category: 'energy', freq: 528, mode: 'isochronic', beat: 10,
    title: 'זריחה פנימית', sub: '528Hz · פעימות אלפא',
    desc: 'תדר הנס בפעימות אלפא מעוררות — טעינת בוקר של אופטימיות ואנרגיה נקייה. במקום קפה שלישי.',
    tags: ['בוקר', 'אנרגיה'], colors: ['#f6ad55', '#7b341e'], glyph: '☀', ambience: 0.03 },

  { id: 'energy-power', category: 'energy', freq: 417, mode: 'binaural', beat: 12,
    title: 'כוח פנימי', sub: '417Hz + 12Hz · 🎧',
    desc: 'תדר השינוי עם ביט אלפא-בטא ממריץ — לפני אימון, פגישה חשובה או כל רגע שדורש נוכחות מלאה.',
    tags: ['כוח', 'מוטיבציה'], colors: ['#ed8936', '#3d1505'], glyph: '⚡', ambience: 0.025 },

  { id: 'energy-awaken', category: 'energy', freq: 300, mode: 'binaural', beat: 40,
    title: 'התעוררות גמא', sub: '300Hz + 40Hz · 🎧',
    desc: 'הדלקה מיידית: נשא גבוה ובוהק עם ביט גמא 40Hz. שלוש דקות ואתם דרוכים כקשת.',
    tags: ['ערנות', 'בוקר'], colors: ['#ecc94b', '#2d1b02'], glyph: '✧', ambience: 0.02 },

  { id: 'energy-abundance', category: 'energy', freq: 639, mode: 'isochronic', beat: 10,
    title: 'תדר השפע', sub: '639Hz · פעימות אלפא',
    desc: 'תדר החיבור בפעימות אלפא פתוחות — מסורתית, תדר של קבלה, הכרת תודה ומשיכת שפע לחיים.',
    tags: ['שפע', 'תודה'], colors: ['#9ae6b4', '#14351f'], glyph: '✾', ambience: 0.04 },

  /* ------------------------------ עיבודים טיפוליים נוספים ------------------------------ */
  { id: 'relief-pain', category: 'solfeggio', freq: 174, mode: 'isochronic', beat: 3,
    title: 'שחרור כאב ומתח', sub: '174Hz · פעימות דלתא',
    desc: 'תדר היסוד בפעימות דלתא איטיות — הפרוטוקול המסורתי המלא לשיכוך כאב ולהרפיית שרירים עמוקה.',
    tags: ['כאב', 'שרירים'], colors: ['#805ad5', '#150d29'], glyph: '☁', ambience: 0.06 },

  { id: 'relief-anxiety', category: 'calm', freq: 396, mode: 'binaural', beat: 10, featured: true,
    title: 'אנטי-חרדה', sub: '396Hz + אלפא 10Hz · 🎧',
    desc: 'שילוב מכוון: תדר שחרור הפחד כנשא, ביט אלפא מרגיע כקצב. לרגעים שבהם הלב דוהר.',
    tags: ['חרדה', 'רוגע'], colors: ['#4fd1c5', '#0b2422'], glyph: '༄', ambience: 0.055 },

  /* ------------------------------ רוגע ואיזון רגשי ------------------------------ */
  { id: 'calm-inner-quiet', category: 'calm', freq: 432, mode: 'isochronic', beat: 8,
    title: 'שקט פנימי', sub: '432Hz · פעימות אלפא',
    desc: 'הכוונון הטבעי בפעימות אלפא רכות — כיבוי הדרגתי של רעש המחשבות. עובד גם ברמקולים, בבית או במשרד.',
    tags: ['רוגע', 'שקט'], colors: ['#81e6d9', '#0d3331'], glyph: '༄', ambience: 0.05 },

  { id: 'calm-anger', category: 'calm', freq: 741, mode: 'binaural', beat: 10,
    title: 'שחרור כעס', sub: '741Hz + אלפא · 🎧',
    desc: 'תדר הניקוי עם ביט אלפא מקרקע — לפרוק את היום, את הפקק, את הוויכוח. עשר דקות והחזה נפתח.',
    tags: ['כעס', 'שחרור'], colors: ['#fc8181', '#3d0f0f'], glyph: '🜂', ambience: 0.045 },

  { id: 'calm-emotions', category: 'calm', freq: 417, mode: 'binaural', beat: 5.5,
    title: 'עיבוד רגשי', sub: '417Hz + תטא 5.5Hz · 🎧',
    desc: 'תטא עמוק על תדר השינוי — המרחב שבו רגשות תקועים מקבלים רשות לזוז. מומלץ אחרי יום קשה או שיחה כואבת.',
    tags: ['רגש', 'עיבוד', 'תטא'], colors: ['#f6ad55', '#2b1608'], glyph: '❦', ambience: 0.055 },

  { id: 'calm-grounding', category: 'calm', freq: 396, mode: 'isochronic', beat: 10,
    title: 'קרקוע מהיר', sub: '396Hz · פעימות אלפא',
    desc: 'גרסת הרמקולים של האנטי-חרדה: תדר השורש בפעימות אלפא. חמש דקות לפני פגישה מלחיצה.',
    tags: ['קרקוע', 'ביטחון'], colors: ['#e53e3e', '#1f0808'], glyph: '⚓', ambience: 0.04 },

  { id: 'calm-soundbath', category: 'calm', freq: 174, mode: 'binaural', beat: 8,
    title: 'אמבט צליל', sub: '174Hz + אלפא · 🎧',
    desc: 'התדר הנמוך ביותר עם ביט אלפא עוטף — תחושה של שקיעה במים חמים. הרפיה מלאה של הגוף בלי להירדם.',
    tags: ['הרפיה', 'פינוק'], colors: ['#9f7aea', '#1a1030'], glyph: '≋', ambience: 0.07 },

  /* ------------------------------ אהבה וזוגיות ------------------------------ */
  { id: 'love-magnet', category: 'love', freq: 639, mode: 'isochronic', beat: 8, featured: true,
    title: 'מגנט אהבה', sub: '639Hz · פעימות אלפא',
    desc: 'תדר החיבור בפעימות פתוחות — מסורתית, התדר שמושך יחסים חדשים ומרפא קיימים. השמיעו בחלל הבית.',
    tags: ['אהבה', 'משיכה'], colors: ['#f687b3', '#4a1230'], glyph: '♥', ambience: 0.045 },

  { id: 'love-self', category: 'love', freq: 528, mode: 'binaural', beat: 8,
    title: 'אהבה עצמית', sub: '528Hz + אלפא · 🎧',
    desc: 'תדר הנס מופנה פנימה: מדיטציית חמלה עצמית על ביט אלפא. הקשר הכי חשוב שיש לכם הוא איתכם.',
    tags: ['אהבה עצמית', 'חמלה'], colors: ['#fbb6ce', '#5a1b34'], glyph: '✿', ambience: 0.04 },

  { id: 'love-heartbreak', category: 'love', freq: 639, mode: 'isochronic', beat: 6,
    title: 'ריפוי לב שבור', sub: '639Hz · פעימות תטא',
    desc: 'תדר הלב בקצב תטא איטי ומרפא — ליווי עדין בתקופת פרידה או אובדן. הלב יודע לתקן את עצמו כשנותנים לו קצב.',
    tags: ['פרידה', 'ריפוי לב'], colors: ['#feb2b2', '#3d1515'], glyph: '💔', ambience: 0.06 },

  { id: 'love-open-heart', category: 'love', freq: 341.3, mode: 'pure',
    title: 'פתיחת הלב — 341Hz', sub: 'Heart Harmonic · הסקאלה ההרמונית',
    desc: 'תדר הלב במיפוי ההרמוני-מוזיקלי (סקאלת C) — גרסה רכה וזורמת יותר של מרכז החזה. לזמן איכות זוגי.',
    tags: ['לב', 'זוגיות'], colors: ['#9ae6b4', '#1a3d2a'], glyph: '❣', ambience: 0.045 },

  /* ------------------------------ תדרים פלנטריים (האוקטבה הקוסמית של קוסטו) ------------------------------ */
  { id: 'planet-sun', category: 'planets', freq: 126.22, mode: 'pure', featured: true,
    title: 'השמש — 126.22Hz', sub: 'Sun Tone · חיוניות והארה',
    desc: 'תדר השמש מתוך "האוקטבה הקוסמית" של הנס קוסטו. מסורתית — מרכז החיות, הביטחון והנוכחות המלכותית.',
    tags: ['שמש', 'חיוניות'], colors: ['#f6e05e', '#744210'], glyph: '☉', ambience: 0.04 },

  { id: 'planet-moon', category: 'planets', freq: 210.42, mode: 'pure',
    title: 'הירח — 210.42Hz', sub: 'Moon Tone · רגש ואינטואיציה',
    desc: 'תדר המחזור הסינודי של הירח. מסורתית — מאזן את עולם הרגש, מחובר לנשיות, לזרימה ולמחזוריות הטבעית.',
    tags: ['ירח', 'רגש'], colors: ['#cbd5e0', '#1a202c'], glyph: '☽', ambience: 0.05 },

  { id: 'planet-mercury', category: 'planets', freq: 141.27, mode: 'pure',
    title: 'מרקורי — 141.27Hz', sub: 'Mercury Tone · תקשורת ושכל',
    desc: 'תדר כוכב חמה — כוכב התקשורת. מסורתית — מחדד דיבור, כתיבה, מסחר וזריזות מחשבה.',
    tags: ['תקשורת', 'שכל'], colors: ['#90cdf4', '#153e63'], glyph: '☿', ambience: 0.035 },

  { id: 'planet-venus', category: 'planets', freq: 221.23, mode: 'pure',
    title: 'ונוס — 221.23Hz', sub: 'Venus Tone · יופי ואינטימיות',
    desc: 'תדר נוגה — כוכב האהבה. מסורתית — מעורר חושניות, אסתטיקה, הרמוניה זוגית ורוך. תדר הערב המושלם.',
    tags: ['אהבה', 'יופי', 'אינטימיות'], colors: ['#f687b3', '#44102b'], glyph: '♀', ambience: 0.045 },

  { id: 'planet-mars', category: 'planets', freq: 144.72, mode: 'pure',
    title: 'מאדים — 144.72Hz', sub: 'Mars Tone · כוח ואומץ',
    desc: 'תדר מאדים — כוכב הפעולה. מסורתית — מצית אומץ, החלטיות ואנרגיית עשייה. לפני אתגר גדול.',
    tags: ['אומץ', 'פעולה'], colors: ['#fc8181', '#4d1010'], glyph: '♂', ambience: 0.035 },

  { id: 'planet-jupiter', category: 'planets', freq: 183.58, mode: 'pure',
    title: 'צדק — 183.58Hz', sub: 'Jupiter Tone · שפע וצמיחה',
    desc: 'תדר צדק — כוכב ההתרחבות והמזל הטוב. מסורתית — פותח שערי שפע, אופטימיות וראייה גדולה.',
    tags: ['שפע', 'צמיחה', 'מזל'], colors: ['#f6ad55', '#5a3407'], glyph: '♃', ambience: 0.04 },

  { id: 'planet-saturn', category: 'planets', freq: 147.85, mode: 'pure',
    title: 'שבתאי — 147.85Hz', sub: 'Saturn Tone · משמעת ומבנה',
    desc: 'תדר שבתאי — המורה הגדול. מסורתית — מחזק משמעת עצמית, ריכוז, גבולות בריאים ובגרות.',
    tags: ['משמעת', 'מבנה'], colors: ['#a0aec0', '#1c2230'], glyph: '♄', ambience: 0.04 },

  { id: 'planet-earth-day', category: 'planets', freq: 194.18, mode: 'pure',
    title: 'יום כדור הארץ — 194.18Hz', sub: 'Earth Day Tone · נוכחות בהווה',
    desc: 'תדר סיבוב כדור הארץ סביב צירו — צליל היממה. מסורתית — מעגן את התודעה ברגע הזה, כאן ועכשיו.',
    tags: ['הארקה', 'הווה'], colors: ['#68d391', '#0d2b1a'], glyph: '⊕', ambience: 0.05 },

  /* ------------------------------ גלי מוח — הרחבות ------------------------------ */
  { id: 'wave-theta7', category: 'brainwave', freq: 210, mode: 'binaural', beat: 7,
    title: 'תטא 7 — חלימה צלולה', sub: 'Theta 7Hz · 🎧',
    desc: 'הגבול העליון של תטא — מצב היפנוגוגי שבו התודעה ערה בתוך החלום. לתרגול חלימה צלולה ודמיון מודרך.',
    tags: ['חלימה צלולה', 'דמיון'], colors: ['#805ad5', '#12082b'], glyph: '☁', ambience: 0.05 },

  { id: 'wave-smr', category: 'brainwave', freq: 220, mode: 'isochronic', beat: 13,
    title: 'SMR — קשב רגוע', sub: '13Hz · הקצב הסנסומוטורי',
    desc: 'תדר ה-SMR (12–15Hz) שנחקר בהקשרי קשב וויסות — ערנות שקטה בלי תזזיתיות. מוכר ממחקרי נוירופידבק.',
    tags: ['קשב', 'ויסות'], colors: ['#63b3ed', '#0e2438'], glyph: 'Ϟ', ambience: 0.03 },

  { id: 'wave-delta1', category: 'brainwave', freq: 90, mode: 'binaural', beat: 1,
    title: 'דלתא 1 — ריפוי לילי', sub: 'Delta 1Hz · 🎧 · העמוק ביותר',
    desc: 'הביט האיטי ביותר בספרייה: 1Hz בלבד, על נשא 90Hz עמוק כתהום. שלב השינה שבו הגוף משקם את עצמו.',
    tags: ['שינה עמוקה', 'שיקום'], colors: ['#1a365d', '#04060f'], glyph: 'δ', ambience: 0.065 },

  { id: 'wave-hypnagogia', category: 'brainwave', freq: 200, mode: 'binaural', beat: 7.5,
    title: 'שער ההיפנוזה', sub: 'Alpha-Theta 7.5Hz · 🎧',
    desc: 'קו התפר המדויק בין אלפא לתטא — המצב שמהפנטים ומדיטטורים מחפשים: גוף רדום, תודעה צלולה.',
    tags: ['היפנוזה', 'סף'], colors: ['#b794f4', '#231245'], glyph: '𓁿', ambience: 0.05 },

  /* ------------------------------ שינה — הרחבות ------------------------------ */
  { id: 'sleep-rem', category: 'sleep', freq: 150, mode: 'binaural', beat: 5,
    title: 'שינת חלום — REM', sub: 'Theta 5Hz · 🎧',
    desc: 'תטא 5Hz — קצב שנת החלום. לחצי השני של הלילה או לשינה מאוחרת של בוקר, כשהחלומות עושים את עבודתם.',
    tags: ['חלומות', 'REM'], colors: ['#667eea', '#0c0f2b'], glyph: '💭', ambience: 0.06 },

  { id: 'sleep-powernap', category: 'sleep', freq: 180, mode: 'isochronic', beat: 8,
    title: 'פאוור-נאפ', sub: '180Hz · פעימות אלפא · 20 דק\'',
    desc: 'שנ"צ מדויק: אלפא נמוך שמרדים חלקית בלי ליפול לדלתא — קמים רעננים, לא מטושטשים. כוונו טיימר ל-20 דקות.',
    tags: ['שנ"צ', 'רענון'], colors: ['#4fd1c5', '#0a2624'], glyph: '⏾', ambience: 0.055 },

  { id: 'sleep-blanket', category: 'sleep', freq: 120, mode: 'pure',
    title: 'שמיכת חורף', sub: '120Hz · חום צלילי עמוק',
    desc: 'תדר נמוך וחם בלי שום פעימה — רק זמזום עמוק ואווירת רוח רכה. למי שנרדם הכי טוב עם "רעש" קבוע.',
    tags: ['חום', 'רעש לבן'], colors: ['#744210', '#170e02'], glyph: '🜁', ambience: 0.1 },

  /* ------------------------------ ריכוז — הרחבות ------------------------------ */
  { id: 'focus-reading', category: 'focus', freq: 230, mode: 'isochronic', beat: 14,
    title: 'קריאה ולמידה', sub: '230Hz · פעימות בטא 14Hz',
    desc: 'בטא נמוך ויציב — הקצב של קריאת עומק ארוכה. פחות אינטנסיבי ממנהרת הריכוז, מחזיק שעות.',
    tags: ['קריאה', 'למידה'], colors: ['#4299e1', '#0a1f33'], glyph: '📖', ambience: 0.025 },

  { id: 'focus-creative', category: 'focus', freq: 195, mode: 'binaural', beat: 7.5,
    title: 'יצירתיות פרועה', sub: 'Theta 7.5Hz · 🎧',
    desc: 'תטא גבוה — התדר של רעיונות משום מקום. לסיעור מוחות, כתיבה חופשית וסקיצות ראשונות. לא לעבודה מדויקת.',
    tags: ['יצירתיות', 'רעיונות'], colors: ['#ed64a6', '#330f22'], glyph: '✏', ambience: 0.04 },

  { id: 'focus-code', category: 'focus', freq: 320, mode: 'binaural', beat: 40,
    title: 'קוד ומספרים', sub: '320Hz + גמא 40Hz · 🎧',
    desc: 'גרסת המתכנתים של גמא 40: נשא גבוה וצלול לעבודה אנליטית — קוד, אקסל, מתמטיקה. חדות כירורגית.',
    tags: ['תכנות', 'אנליטי'], colors: ['#68d391', '#0a2b14'], glyph: '⌘', ambience: 0.02 },

  /* ------------------------------ DNA — הרחבות ------------------------------ */
  { id: 'dna-amplify', category: 'dna', freq: 285, mode: 'binaural', beat: 3,
    title: 'אמפליפיקציה תאית', sub: '285Hz + דלתא 3Hz · 🎧',
    desc: 'תדר ההתחדשות על ביט דלתא — מיועד להאזנה לפני שינה, כשהגוף ממילא נכנס למצב תיקון. תנו לו תדר לעבוד איתו.',
    tags: ['תאים', 'לילה'], colors: ['#4fd1c5', '#062e2a'], glyph: '⌬', ambience: 0.055 },

  { id: 'dna-youth', category: 'dna', freq: 528, mode: 'isochronic', beat: 6,
    title: 'מעיין הנעורים', sub: '528Hz · פעימות תטא',
    desc: 'תדר הנס בקצב תטא מרפא — הפרוטוקול המסורתי לחידוש ורעננות. עשרים דקות של אור זהוב לתאים.',
    tags: ['נעורים', 'חידוש'], colors: ['#faf089', '#4a3505'], glyph: '⚱', ambience: 0.045 },

  /* ------------------------------ כדור הארץ — הרחבות ------------------------------ */
  { id: 'earth-schumann2', category: 'earth', freq: 136.1, mode: 'binaural', beat: 14.3,
    title: 'שומאן — הרמוניה שנייה', sub: '14.3Hz · 🎧 · ערנות מוארקת',
    desc: 'ההרמוניה השנייה של תהודת שומאן — אותה פעימת כדור הארץ, ברגיסטר ערני יותר. הארקה בזמן עבודה.',
    tags: ['שומאן', 'ערנות'], colors: ['#9ae6b4', '#12301d'], glyph: '⊛', ambience: 0.045 },

  /* ------------------------------ מדיטציה — הרחבות ------------------------------ */
  { id: 'med-breath6', category: 'meditation', freq: 136.1, mode: 'isochronic', beat: 0.1,
    title: 'נשימה 6 בדקה', sub: '136.1Hz · גל נשימה איטי',
    desc: 'הצליל עולה ויורד בקצב 6 נשימות בדקה — הקצב שמאזן את מערכת העצבים (HRV). נשמו עם הגל: עולה=שאיפה, יורד=נשיפה.',
    tags: ['נשימה', 'HRV', 'קוהרנטיות'], colors: ['#81e6d9', '#0c2e2b'], glyph: '🜄', ambience: 0.05 },

  { id: 'med-mantra108', category: 'meditation', freq: 108, mode: 'pure',
    title: 'מנטרה 108', sub: '108Hz · המספר המקודש',
    desc: '108 — מספר החזרות במאלה, מספר האופנישדות. תדר עמוק וטקסי לג\'אפה, מנטרות וספירת חרוזים.',
    tags: ['מנטרה', 'ג\'אפה', '108'], colors: ['#ed8936', '#2b1403'], glyph: '📿', ambience: 0.055 },

  { id: 'med-eye-storm', category: 'meditation', freq: 963, mode: 'binaural', beat: 4,
    title: 'עין הסערה', sub: '963Hz + תטא-דלתא 4Hz · 🎧',
    desc: 'הצירוף הקיצוני: תדר האור הגבוה ביותר על הביט העמוק כמעט ביותר. דממה מוחלטת במרכז, אור מסביב.',
    tags: ['עומק', 'דממה'], colors: ['#d6bcfa', '#0f0820'], glyph: '◉', ambience: 0.04 },

  /* ------------------------------ אנרגיה — הרחבות ------------------------------ */
  { id: 'energy-workout', category: 'energy', freq: 250, mode: 'isochronic', beat: 20,
    title: 'מוטיבציית אימון', sub: '250Hz · פעימות בטא 20Hz',
    desc: 'בטא גבוה ודוחף — לחימום לפני אימון, ריצה או כל דבר שדורש דופק. עובד מצוין ברמקול בחדר הכושר הביתי.',
    tags: ['אימון', 'ספורט'], colors: ['#f56565', '#380a0a'], glyph: '🔥', ambience: 0.02 },

  { id: 'energy-spark', category: 'energy', freq: 417, mode: 'isochronic', beat: 12,
    title: 'ניצוץ יצירה', sub: '417Hz · פעימות 12Hz',
    desc: 'תדר השינוי בקצב אלפא-בטא ממריץ — הדלקת מנוע היצירה כשמרגישים תקועים. רבע שעה ומתחילים לזוז.',
    tags: ['השראה', 'התנעה'], colors: ['#f6ad55', '#331703'], glyph: '✨', ambience: 0.03 },

  /* ------------------------------ מלודיות מרפאות (גנרטיביות — לא צליל קבוע) ------------------------------ */
  { id: 'mel-bells-528', category: 'melodic', freq: 528, mode: 'melodic', pace: 2.4, sparkle: 0.2, featured: true,
    title: 'פעמוני הנס', sub: '528Hz · מלודיה גנרטיבית אינסופית',
    desc: 'לא צליל קבוע — מנגינה חיה שמולחנת ברגע זה: פעמונים ביחסים הרמוניים טהורים של 528Hz, שלא חוזרת על עצמה לעולם. תדר הנס נשאר מרכז הכובד של כל תו.',
    tags: ['מלודיה', 'פעמונים', 'DNA'], colors: ['#f6e05e', '#8a6217'], glyph: '♬', ambience: 0.035 },

  { id: 'mel-harp-432', category: 'melodic', freq: 432, mode: 'melodic', pace: 1.6, sparkle: 0.25, featured: true,
    title: 'נבל 432', sub: '432Hz · פריטות זורמות',
    desc: 'פריטות מהירות ועדינות בכוונון הטבע — כמו נבל שמנגן את עצמו. סולם פנטטוני טהור על 432Hz, זרימה שלא נגמרת.',
    tags: ['נבל', 'זרימה', '432'], colors: ['#68d391', '#14532d'], glyph: '𝄞', ambience: 0.035 },

  { id: 'mel-kalimba-639', category: 'melodic', freq: 639, mode: 'melodic', pace: 2.0, sparkle: 0.18,
    title: 'קלימבה ללב', sub: '639Hz · פסנתר האגודלים',
    desc: 'צלילי קלימבה חמים על תדר הלב והחיבור — מנגינה שנכתבת מחדש בכל שנייה. מוזיקת רקע מושלמת לזמן איכות.',
    tags: ['קלימבה', 'לב', 'יחסים'], colors: ['#48bb78', '#1c4532'], glyph: '♩', ambience: 0.04 },

  { id: 'mel-temple-963', category: 'melodic', freq: 963, mode: 'melodic', pace: 3.6, sparkle: 0.12,
    title: 'פעמוני מקדש', sub: '963Hz · צלילים נדירים ומרווחים',
    desc: 'פעמוני מקדש גבוהים וצלולים, מפוזרים במרווחי דממה ארוכים — כל תו הוא אירוע. תדר האור כמוזיקה.',
    tags: ['מקדש', 'הארה', 'דממה'], colors: ['#d6bcfa', '#3c2b63'], glyph: '🔔', ambience: 0.03 },

  { id: 'mel-musicbox-396', category: 'melodic', freq: 396, mode: 'melodic', pace: 2.0, sparkle: 0.3,
    title: 'תיבת נגינה', sub: '396Hz · ניחומים מהילדות',
    desc: 'תיבת נגינה נוצצת על תדר שחרור הפחד — הצליל שמרגיע ילדים עובד גם עלינו. לרגעים שצריך בהם חיבוק.',
    tags: ['תיבת נגינה', 'ניחומים'], colors: ['#fc8181', '#5c1a1a'], glyph: '♪', ambience: 0.04 },

  { id: 'mel-handpan-174', category: 'melodic', freq: 174, mode: 'melodic', pace: 2.6, sparkle: 0.15,
    title: 'הנדפאן 174', sub: '174Hz · מתכת חמה ועמוקה',
    desc: 'צלילי הנדפאן עגולים ועמוקים על תדר שיכוך הכאב — הכלי שנולד להרגיע גוף. מנגינה איטית שמפרקת מתח שריר אחר שריר.',
    tags: ['הנדפאן', 'כאב', 'הרפיה'], colors: ['#7c5cff', '#241a4d'], glyph: '◍', ambience: 0.045 },

  { id: 'mel-chimes-om', category: 'melodic', freq: 136.1, mode: 'melodic', pace: 3.0, sparkle: 0.22,
    title: 'פעמוני רוח OM', sub: '136.1Hz · הרוח מנגנת',
    desc: 'פעמוני רוח על תדר ה-OM — כאילו תליתם אותם במרפסת והרוח יודעת בדיוק מה לנגן. אקראיות מושלמת של הטבע.',
    tags: ['פעמוני רוח', 'OM'], colors: ['#ed8936', '#4a2408'], glyph: '🎐', ambience: 0.05 },

  { id: 'mel-wind-852', category: 'melodic', freq: 852, mode: 'melodic', pace: 2.8, sparkle: 0.2,
    title: 'צלילי אינטואיציה', sub: '852Hz · לחישות גבוהות',
    desc: 'תווים גבוהים ומרחפים על תדר העין השלישית — כמו מחשבות שמגיעות משום מקום. מוזיקה לרגעי השראה.',
    tags: ['אינטואיציה', 'השראה'], colors: ['#667eea', '#1e1e52'], glyph: '❈', ambience: 0.035 },

  { id: 'mel-lullaby-285', category: 'melodic', freq: 285, mode: 'melodic', pace: 3.4, sparkle: 0.1,
    title: 'שיר ערש 285', sub: '285Hz · מנגינה מרדימה',
    desc: 'שיר ערש איטי ונמוך על תדר ההתחדשות — תווים רכים ומרווחים שמלווים את הגוף אל תוך תהליכי התיקון של הלילה.',
    tags: ['שיר ערש', 'שינה', 'ריפוי'], colors: ['#4fd1c5', '#0f3d38'], glyph: '☾', ambience: 0.06 },

  { id: 'mel-creation-417', category: 'melodic', freq: 417, mode: 'melodic', pace: 1.8, sparkle: 0.28,
    title: 'מנגינת השינוי', sub: '417Hz · תנועה מתמדת',
    desc: 'מלודיה תוססת ומשתנה על תדר השינוי — לא נותנת לאף רגע להתקבע. פס קול לתקופות מעבר ולהתחלות חדשות.',
    tags: ['שינוי', 'תנועה'], colors: ['#ed8936', '#6b3410'], glyph: '↺', ambience: 0.035 },

  { id: 'mel-earth-194', category: 'melodic', freq: 194.18, mode: 'melodic', pace: 2.8, sparkle: 0.14,
    title: 'שיר האדמה', sub: '194.18Hz · מלודיית היממה',
    desc: 'מנגינה אדמתית וכבדה על תדר סיבוב כדור הארץ — צלילים שצומחים לאט כמו עצים. הארקה שאפשר לשיר.',
    tags: ['אדמה', 'הארקה'], colors: ['#9ae6b4', '#173524'], glyph: '⊕', ambience: 0.05 },

  { id: 'mel-crystal-741', category: 'melodic', freq: 741, mode: 'melodic', pace: 2.2, sparkle: 0.24,
    title: 'גבישי קול', sub: '741Hz · צלילים מזוקקים',
    desc: 'תווים חדים ונקיים כגביש על תדר הניקוי — כל צליל שוטף שכבה. מוזיקת דיטוקס אנרגטי.',
    tags: ['גביש', 'ניקוי'], colors: ['#63b3ed', '#173753'], glyph: '◇', ambience: 0.03 },

  /* ------------------------------ שאמאני ופסיכדלי ------------------------------ */
  { id: 'sh-drum', category: 'shaman', freq: 180, mode: 'melodic', scale: 'shaman', pace: 1.3, sparkle: 0.1, featured: true,
    title: 'תוף השאמאן', sub: '180Hz · סולם פריגי · תבנית תוף',
    desc: 'מוטיב בן ארבעה תווים בסולם פריגי אפל, חוזר בעיקשות כמו תוף טקסי. הדופק שפותח את שער המסע השאמאני.',
    tags: ['שאמאני', 'תוף', 'טקס'], colors: ['#b7791f', '#1a1002'], glyph: '𓂀', ambience: 0.06 },

  { id: 'sh-ayahuasca', category: 'shaman', freq: 111, mode: 'melodic', scale: 'psyche', pace: 2.6, sparkle: 0.3, featured: true,
    title: 'איקארו', sub: '111Hz · סולם ספטימלי · פסיכדלי',
    desc: 'שיר הריפוי של יערות הגשם, בסולם ספטימלי שהתווים בו "מכופפים" — כל צליל מתעוות לאט כמו סרט מגנטי. תדר 111 של חללי הקדושה.',
    tags: ['פסיכדלי', 'איקארו', '111'], colors: ['#9f7aea', '#1b0d33'], glyph: '༄', ambience: 0.055 },

  { id: 'sh-vision', category: 'shaman', freq: 136.1, mode: 'melodic', scale: 'psyche', pace: 2.2, sparkle: 0.34,
    title: 'מסע החזיונות', sub: 'OM 136.1Hz · תווים מתפתלים',
    desc: 'מוטיב בן שבעה תווים שמתפתל ולא חוזר לאותה נקודה — על תדר ה-OM. הצליל של תודעה שמשילה את גבולותיה.',
    tags: ['חזיונות', 'פסיכדלי', 'OM'], colors: ['#ed64a6', '#2a0a2a'], glyph: '◉', ambience: 0.05 },

  { id: 'sh-serpent', category: 'shaman', freq: 174, mode: 'melodic', scale: 'shaman', pace: 1.8, sparkle: 0.16,
    title: 'הנחש הקדמון', sub: '174Hz · פריגי עמוק',
    desc: 'צלילים כבדים ומתפתלים בסולם אפל על תדר היסוד — האנרגיה הקדומה שמטפסת מבסיס עמוד השדרה. קונדליני בצליל.',
    tags: ['קונדליני', 'שאמאני'], colors: ['#48bb78', '#0a2415'], glyph: '𓆙', ambience: 0.06 },

  { id: 'sh-firecircle', category: 'shaman', freq: 396, mode: 'melodic', scale: 'shaman', pace: 1.5, sparkle: 0.2,
    title: 'מעגל האש', sub: '396Hz · קצב טקסי',
    desc: 'מוטיב מהיר ועיקש על תדר שחרור הפחד — הצליל של מעגל סביב מדורה. גופים זזים, פחדים נשרפים.',
    tags: ['אש', 'טקס', 'שחרור'], colors: ['#f56565', '#3d0f0a'], glyph: '🜂', ambience: 0.055 },

  { id: 'sh-datura', category: 'shaman', freq: 285, mode: 'melodic', scale: 'psyche', pace: 3.2, sparkle: 0.26,
    title: 'פריחת הלילה', sub: '285Hz · ספטימלי איטי',
    desc: 'צלילים מכופפים ואיטיים על תדר ההתחדשות — מסע פסיכדלי רך שנפתח כמו פרח לילה. לחלימה בעיניים פקוחות.',
    tags: ['פסיכדלי', 'רך', 'חלימה'], colors: ['#4fd1c5', '#0a2b28'], glyph: '❀', ambience: 0.06 },

  { id: 'sh-ancestors', category: 'shaman', freq: 108, mode: 'melodic', scale: 'shaman', pace: 2.8, sparkle: 0.12,
    title: 'קול האבות', sub: '108Hz · נמוך וטקסי',
    desc: 'התדר העמוק ביותר בפרק, בסולם פריגי איטי — כמו שירת גרון מתוך מערה. חיבור לשורשים שלפני המילים.',
    tags: ['אבות', 'עמוק', '108'], colors: ['#a0aec0', '#12151c'], glyph: '𓁿', ambience: 0.07 },

  { id: 'sh-peyote', category: 'shaman', freq: 417, mode: 'melodic', scale: 'psyche', pace: 2.0, sparkle: 0.32,
    title: 'מדבר הצבעים', sub: '417Hz · ספטימלי תוסס',
    desc: 'תווים שמתכופפים ומנצנצים על תדר השינוי — הצליל של מדבר שמתחיל לנשום צבעים. אנרגטי, לא מרגיע.',
    tags: ['פסיכדלי', 'צבעים'], colors: ['#ed8936', '#331303'], glyph: '✺', ambience: 0.045 },

  { id: 'sh-trance', category: 'shaman', freq: 200, mode: 'isochronic', beat: 4.5, melody: true, melodyScale: 'shaman', pace: 1.4,
    title: 'טראנס תיפוף', sub: '4.5Hz · פעימות + מלודיה שאמאנית',
    desc: 'קצב התוף השאמאני המסורתי (4.5 פעימות בשנייה) עם מלודיה פריגית מעליו — השילוב שמעביר את התודעה לעולם התחתון.',
    tags: ['טראנס', 'תוף', 'תטא'], colors: ['#d69e2e', '#241703'], glyph: '◍', ambience: 0.06 },

  { id: 'sh-dmt', category: 'shaman', freq: 963, mode: 'binaural', beat: 40, melody: true, melodyScale: 'psyche', pace: 1.6,
    title: 'שער האור', sub: '963Hz + גמא 40Hz · 🎧 · פסיכדלי',
    desc: 'הצירוף העז ביותר בספרייה: תדר הכתר, ביט גמא 40Hz ומלודיה ספטימלית מתפתלת. גיאומטריה קדושה בצליל.',
    tags: ['גמא', 'פסיכדלי', 'כתר'], colors: ['#d6bcfa', '#2d1155'], glyph: '✧', ambience: 0.04 },

  { id: 'sh-underworld', category: 'shaman', freq: 90, mode: 'binaural', beat: 4, melody: true, melodyScale: 'shaman', pace: 3.0,
    title: 'העולם התחתון', sub: '90Hz + תטא 4Hz · 🎧',
    desc: 'ירידה עמוקה: נשא נמוך במיוחד, ביט תטא-דלתא ומלודיה אפלה ומרוחקת. המסע השאמאני הקלאסי כלפי מטה.',
    tags: ['שאמאני', 'עומק', 'מסע'], colors: ['#4a5568', '#08090d'], glyph: '⬇', ambience: 0.075 },

  { id: 'sh-upperworld', category: 'shaman', freq: 852, mode: 'binaural', beat: 7.5, melody: true, melodyScale: 'psyche', pace: 2.0,
    title: 'העולם העליון', sub: '852Hz + 7.5Hz · 🎧',
    desc: 'המסע כלפי מעלה: תדר האינטואיציה על סף אלפא-תטא, עם מלודיה מרחפת ומכופפת. פגישה עם המורים שלמעלה.',
    tags: ['שאמאני', 'עלייה', 'חזון'], colors: ['#90cdf4', '#12294a'], glyph: '⬆', ambience: 0.05 },

  /* ------------------------------ קערות קריסטל, טיבטיות וגונגים ------------------------------ */
  { id: 'bowl-crystal-528', category: 'bowls', freq: 528, mode: 'melodic', timbre: 'crystal', pace: 5.5, sparkle: 0.14, featured: true,
    title: 'קערת קריסטל — לב', sub: '528Hz · זנב אינסופי',
    desc: 'קערת קריסטל קוורץ טהורה על תדר הנס: כמעט סינוס מושלם, עם פעימה פנימית איטית וזנב שנמשך חמש שניות. הצליל הנקי ביותר בספרייה.',
    tags: ['קריסטל', 'קערה', 'טהור'], colors: ['#faf089', '#5c4409'], glyph: '◇', ambience: 0.035 },

  { id: 'bowl-crystal-963', category: 'bowls', freq: 963, mode: 'melodic', timbre: 'crystal', pace: 6.5, sparkle: 0.1,
    title: 'קערת קריסטל — כתר', sub: '963Hz · גבוה וצלול',
    desc: 'הקערה הגבוהה של הסט: 963Hz בטוהר קריסטלי, עם מרווחי דממה ארוכים בין הצלילים. לפתיחת הצ\'אקרה השביעית.',
    tags: ['קריסטל', 'כתר'], colors: ['#d6bcfa', '#3b2a63'], glyph: '◇', ambience: 0.03 },

  { id: 'bowl-tibetan', category: 'bowls', freq: 136.1, mode: 'melodic', timbre: 'handpan', pace: 4.5, sparkle: 0.12, featured: true,
    title: 'קערה טיבטית', sub: 'OM 136.1Hz · מתכת שבע מתכות',
    desc: 'הקערה המסורתית מסגסוגת שבע המתכות, מכוונת לתדר ה-OM. צליל עגול וחם עם אוקטבה תחתונה בולטת — הצליל של מנזר.',
    tags: ['טיבטי', 'OM', 'מנזר'], colors: ['#b7791f', '#291a04'], glyph: '◍', ambience: 0.055 },

  { id: 'bowl-gong', category: 'bowls', freq: 108, mode: 'melodic', timbre: 'handpan', pace: 7.0, sparkle: 0.08,
    title: 'גונג פלנטרי', sub: '108Hz · חבטות נדירות',
    desc: 'גונג עמוק שנחבט אחת לשבע שניות בערך, ומשאיר את החלל רוטט בין החבטות. לאמבט צליל אמיתי — שכבו והניחו לו לעבור דרככם.',
    tags: ['גונג', 'אמבט צליל'], colors: ['#a0aec0', '#14171f'], glyph: '◉', ambience: 0.07 },

  { id: 'bowl-set-7', category: 'bowls', freq: 396, mode: 'melodic', timbre: 'crystal', pace: 4.0, sparkle: 0.22,
    title: 'סט שבע הקערות', sub: '396Hz · טווח רחב',
    desc: 'קערות קריסטל בטווח רחב סביב תדר השורש, שנחבטות בסדר משתנה — כמו סאונד-הילר שמסתובב סביבכם עם הסט המלא.',
    tags: ['קריסטל', 'סט', 'צ\'אקרות'], colors: ['#f56565', '#3d1010'], glyph: '◇', ambience: 0.05 },

  { id: 'bowl-water', category: 'bowls', freq: 285, mode: 'melodic', timbre: 'crystal', pace: 3.2, sparkle: 0.3,
    title: 'קערת מים', sub: '285Hz · טיפות קריסטל',
    desc: 'קערות גבוהות ומהירות יותר, כמו טיפות מים על קריסטל — על תדר ההתחדשות. לניקוי החלל ולריענון.',
    tags: ['מים', 'ניקוי', 'קריסטל'], colors: ['#4fd1c5', '#0d3330'], glyph: '◇', ambience: 0.045 },

  /* ------------------------------ מנטרות ושירת גרון ------------------------------ */
  { id: 'mantra-om', category: 'mantra', freq: 136.1, mode: 'melodic', timbre: 'throat', pace: 5.0, sparkle: 0.06, featured: true,
    title: 'OM — שירת גרון', sub: '136.1Hz · סדרת הרמוניות מלאה',
    desc: 'המנטרה הראשונה, בטימבר שירת גרון: סדרת הרמוניות שלמה עם הדגשת העליונות — הצליל שבו שומעים "שריקה" מעל הדרון. טיבט בסלון.',
    tags: ['OM', 'שירת גרון', 'טיבט'], colors: ['#ed8936', '#2b1503'], glyph: 'ॐ', ambience: 0.06 },

  { id: 'mantra-kargyraa', category: 'mantra', freq: 90, mode: 'melodic', timbre: 'throat', pace: 6.0, sparkle: 0.04,
    title: 'קרגירה — הגרון העמוק', sub: '90Hz · הסגנון הנמוך',
    desc: 'סגנון שירת הגרון הנמוך ביותר של טובה ומונגוליה: תדר עמוק שהחזה מרגיש לפני שהאוזן שומעת. חיבור לאדמה דרך הקול.',
    tags: ['טובה', 'עמוק', 'גרון'], colors: ['#744210', '#150c02'], glyph: '𓁿', ambience: 0.075 },

  { id: 'mantra-sygyt', category: 'mantra', freq: 396, mode: 'melodic', timbre: 'throat', pace: 3.6, sparkle: 0.24,
    title: 'סיגיט — השריקה', sub: '396Hz · הרמוניות עליונות',
    desc: 'הסגנון שבו הזמר מפיק שריקה הרמונית מעל הדרון. כאן ההרמוניות העליונות בולטות ורוקדות מעל תדר השחרור.',
    tags: ['שריקה', 'הרמוניות'], colors: ['#f6ad55', '#3d2005'], glyph: '≈', ambience: 0.05 },

  { id: 'mantra-108', category: 'mantra', freq: 108, mode: 'isochronic', beat: 1.8, melody: true, timbre: 'throat', pace: 2.2,
    title: 'ג\'אפה 108', sub: '108Hz · פעימות חזרה',
    desc: 'תרגול הג\'אפה: פעימה קצובה כמו חרוזי מאלה שעוברים בין האצבעות, עם מנטרה גרונית מעליה. 108 חזרות של נוכחות.',
    tags: ['מאלה', 'ג\'אפה', '108'], colors: ['#b7791f', '#1f1303'], glyph: '📿', ambience: 0.055 },

  { id: 'mantra-gayatri', category: 'mantra', freq: 432, mode: 'melodic', timbre: 'throat', pace: 4.2, sparkle: 0.16,
    title: 'גאיטרי', sub: '432Hz · מנטרת השמש',
    desc: 'המנטרה הוודית לשמש, בכוונון הטבעי 432Hz וטימבר גרוני חם. מסורתית — מנטרת הבהירות והתבונה, לשעות הבוקר.',
    tags: ['ודי', 'שמש', 'בוקר'], colors: ['#f6e05e', '#4a3607'], glyph: '☉', ambience: 0.045 },

  { id: 'mantra-monk', category: 'mantra', freq: 174, mode: 'melodic', timbre: 'throat', pace: 5.5, sparkle: 0.05,
    title: 'מקהלת נזירים', sub: '174Hz · דרון עמוק',
    desc: 'דרון נמוך ואיטי בסגנון מזמור גרגוריאני-טיבטי על תדר שיכוך הכאב — קולות שמצטלבים לאט וממלאים את החלל.',
    tags: ['מזמור', 'נזירים', 'עמוק'], colors: ['#805ad5', '#160e2b'], glyph: '✝', ambience: 0.07 },
];

/* מיפוי עזר */
export const byId = Object.fromEntries(TRACKS.map(t => [t.id, t]));
export const byCategory = id =>
  id === 'featured' ? TRACKS.filter(t => t.featured) : TRACKS.filter(t => t.category === id);
