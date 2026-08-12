/* ============================================================
   RESONANCE · קטלוג יצירות התדר
   כל יצירה מוגדרת כאן בלבד — המנוע והממשק נבנים מהנתונים.

   mode:  'pure'       תדר טהור בשכבות הרמוניות
          'binaural'   ביט בינאורלי (חובה אוזניות) — beat = הפרש Hz
          'isochronic' פעימות עוצמה בתדר הביט — עובד גם ברמקולים
   ============================================================ */

export const CATEGORIES = [
  { id: 'featured',   label: 'נבחרות',            icon: '✦' },
  { id: 'solfeggio',  label: 'סולפג\'יו',          icon: '♪' },
  { id: 'chakra',     label: 'צ\'אקרות',           icon: '◉' },
  { id: 'brainwave',  label: 'גלי מוח',           icon: '∿' },
  { id: 'sleep',      label: 'שינה עמוקה',        icon: '☾' },
  { id: 'focus',      label: 'ריכוז ולמידה',      icon: '◎' },
  { id: 'dna',        label: 'תיקון DNA ותאים',   icon: '⧬' },
  { id: 'earth',      label: 'תדרי כדור הארץ',    icon: '⊕' },
  { id: 'meditation', label: 'מדיטציה',           icon: '☯' },
  { id: 'energy',     label: 'אנרגיה ושפע',       icon: '☀' },
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

  { id: 'relief-anxiety', category: 'brainwave', freq: 396, mode: 'binaural', beat: 10,
    title: 'אנטי-חרדה', sub: '396Hz + אלפא 10Hz · 🎧',
    desc: 'שילוב מכוון: תדר שחרור הפחד כנשא, ביט אלפא מרגיע כקצב. לרגעים שבהם הלב דוהר.',
    tags: ['חרדה', 'רוגע'], colors: ['#4fd1c5', '#0b2422'], glyph: '༄', ambience: 0.055 },
];

/* מיפוי עזר */
export const byId = Object.fromEntries(TRACKS.map(t => [t.id, t]));
export const byCategory = id =>
  id === 'featured' ? TRACKS.filter(t => t.featured) : TRACKS.filter(t => t.category === id);
