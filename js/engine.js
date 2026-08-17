/* ============================================================
   RESONANCE · מנוע סינתזת תדרים (Web Audio API)

   סינתזה בזמן אמת — דיוק של אלפית הרץ, אפס דחיסה, אפס קבצים.
   שרשרת לכל יצירה:
     אוסצילטורים (יסוד + אוקטבה + הרמוניות, detune עדין)
       → voiceGain (LFO נשימה / פעימות איזוכרוניות)
       → dry + ריוורב קתדרלה (IR גנרטיבי)
       → קומפרסור עדין → masterGain → analyser → יציאה
   Binaural: שתי שרשראות מלאות בפנורמה קשיחה שמאל/ימין.
   ============================================================ */

const FADE_IN = 2.8;   // שניות
const FADE_OUT = 1.6;

export class FrequencyEngine {
  constructor() {
    this.ctx = null;
    this.voice = null;          // הגרף של היצירה המתנגנת
    this.current = null;        // הטראק הנוכחי
    this.volume = 0.7;
    this.instrument = 'auto';   // 'auto' = הכלי שהוגדר ליצירה עצמה
    /* ביט בינאורלי דורש שכל אוזן תשמע תדר אחר — ברמקולים הערוצים
       מתערבבים באוויר והאפקט לא נוצר. במצב רמקולים מגישים את אותו
       ביט כפעימות איזוכרוניות, שעובדות בכל מערכת. */
    this.speakerMode = false;
    this.onStateChange = null;  // callback לממשק
  }

  /* אתחול עצל — AudioContext מותר רק אחרי מחוות משתמש */
  _init() {
    if (this.ctx) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)({
      latencyHint: 'playback',
      sampleRate: 48000,
    });

    this.master = ctx.createGain();
    this.master.gain.value = this.volume;

    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -18;
    this.compressor.knee.value = 24;
    this.compressor.ratio.value = 3;
    this.compressor.attack.value = 0.02;
    this.compressor.release.value = 0.3;

    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.85;

    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this._impulseResponse(ctx, 6, 3);
    this.reverbGain = ctx.createGain();
    this.reverbGain.gain.value = 0.4;

    this.dry = ctx.createGain();
    this.dry.gain.value = 0.75;

    this.dry.connect(this.compressor);
    this.reverb.connect(this.reverbGain).connect(this.compressor);
    this.compressor.connect(this.master).connect(this.analyser);

    this.ctx = ctx;
    this._routeOutput();

    /* חוזרים לאפליקציה — לוודא שההקשר לא נשאר מושהה */
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.ctx?.state === 'suspended') {
        this.ctx.resume().catch(() => {});
        this.audioEl?.play().catch(() => {});
      }
    });
  }

  /* ------------------------------------------------------------
     ניתוב היציאה — iOS משעה AudioContext כשעוברים אפליקציה, אבל
     ממשיך לנגן אלמנט מדיה. לכן מנתבים את הגרף ל-MediaStream
     ומשמיעים אותו דרך <audio>. אם זה לא נתמך או לא מתחיל לנגן,
     נופלים חזרה ליציאה הרגילה.
     ------------------------------------------------------------ */
  _routeOutput() {
    const ctx = this.ctx;
    const el = document.getElementById('bg-audio');
    const fallback = () => {
      if (this.usingStream === false) return;
      this.usingStream = false;
      try { el?.pause(); } catch {}
      try { this.analyser.disconnect(this.streamDest); } catch {}
      this.analyser.connect(ctx.destination);
    };

    if (!el || !('srcObject' in el) || !ctx.createMediaStreamDestination) {
      this.usingStream = false;
      this.analyser.connect(ctx.destination);
      return;
    }

    try {
      this.streamDest = ctx.createMediaStreamDestination();
      this.analyser.connect(this.streamDest);
      this.audioEl = el;
      el.srcObject = this.streamDest.stream;
      this.usingStream = true;
      el.play().catch(fallback);
      /* שומר: אם הנגן לא באמת התקדם — חוזרים ליציאה הרגילה */
      setTimeout(() => {
        if (this.usingStream && (el.paused || el.currentTime === 0)) fallback();
      }, 2500);
    } catch {
      fallback();
    }
  }

  /* Impulse Response גנרטיבי — "קתדרלה" מרעש לבן בדעיכה אקספוננציאלית */
  _impulseResponse(ctx, seconds, decay) {
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  /* buffer רעש ורוד (אלגוריתם Voss-McCartney מקורב) */
  _pinkNoise(ctx, seconds = 4) {
    const rate = ctx.sampleRate;
    const len = rate * seconds;
    const buf = ctx.createBuffer(1, len, rate);
    const data = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buf;
  }

  /* בניית "קול" אחד — ערוץ הרמוני מלא סביב תדר יסוד */
  _buildTone(freq, dest, gainScale = 1) {
    const ctx = this.ctx;
    const nodes = [];
    const layers = [
      { mult: 1,   gain: 0.50, detune: 0 },
      { mult: 1,   gain: 0.22, detune: 3 },    // כפיל עם detune → צליל "קערה" חי
      { mult: 0.5, gain: 0.30, detune: -2 },   // אוקטבה תחתונה — חום
      { mult: 2,   gain: 0.10, detune: 2 },    // הרמוניה שנייה — נצנוץ
      { mult: 3,   gain: 0.04, detune: 0 },    // הרמוניה שלישית — אוויר
    ];
    for (const l of layers) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq * l.mult;
      osc.detune.value = l.detune;
      const g = ctx.createGain();
      g.gain.value = l.gain * gainScale;
      osc.connect(g).connect(dest);
      osc.start();
      nodes.push(osc);
    }
    return nodes;
  }

  /* ------------------------------------------------------------
     מלחין גנרטיבי — מנגינה אינסופית בכוונון טהור (Just Intonation)
     כל התווים הם יחסים הרמוניים מדויקים של תדר הריפוי, כך שהתדר
     נשאר מרכז הכובד הצלילי גם כשמתנגנת מלודיה חיה.
     טימבר: פעמון/קלימבה — יסוד דועך לאט + פרשל שלישי דועך מהר.
     ------------------------------------------------------------ */
  /* ------------------------------------------------------------
     קול זורם — במקום להקיש תווים נפרדים, קול אחד מתמשך שגולש
     ביניהם. גלישת גובה, ויברטו עדין, פילטר שנפתח עם הנשימה
     ותנועה בפנורמה — זה מה שנשמע אורגני ולא מסונתז.
     ------------------------------------------------------------ */
  _startFlow(track, voice, dest, scale = 1) {
    const ctx = this.ctx;
    const SC = {
      penta: [0.5, 0.75, 1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3],
      shaman: [0.5, 0.6, 2 / 3, 0.8, 1, 16 / 15, 6 / 5, 4 / 3, 3 / 2, 8 / 5, 9 / 5, 2],
      psyche: [0.5, 2 / 3, 0.75, 1, 7 / 6, 4 / 3, 3 / 2, 7 / 4, 2, 7 / 3, 8 / 3, 3],
      warp: [0.5, 11 / 16, 0.75, 7 / 8, 1, 9 / 8, 11 / 8, 13 / 8, 7 / 4, 2, 9 / 4, 11 / 4],
    };
    const RATIOS = SC[track.scale] || SC.psyche;
    const pace = track.pace || 3.0;

    /* ------------------------------------------------------------
       צבעי הקול הזורם. ברירת המחדל היא הקול המקורי; הצבעים
       הנוספים נועדו לסגנון הניו-אייג' החם — חליל נשימתי, קול
       אנושי ללא מילים ומיתרים ארוכים. כל צבע הוא סט פרשלים,
       עומק ויברטו, בהירות פילטר, ואפשרות לרעש נשיפה ולפורמנטים.
       ------------------------------------------------------------ */
    const COLORS = {
      default: {
        partials: [
          { mult: 1, gain: 1.0, det: 0 },
          { mult: 1, gain: 0.5, det: 6 },        // כפיל מפולש — עובי
          { mult: 2, gain: 0.26, det: -4 },
          { mult: 3, gain: 0.1, det: 3 },
          { mult: 4, gain: 0.04, det: 0 },
        ],
        vibRate: 5.1, vibAmt: 7, open: 900, breath: 0, formants: null,
      },
      /* חליל — כמעט רק יסוד, מעט הרמוניות אי-זוגיות ורעש נשיפה */
      flute: {
        partials: [
          { mult: 1, gain: 1.0, det: 0 },
          { mult: 1, gain: 0.26, det: 4 },
          { mult: 2, gain: 0.07, det: -3 },
          { mult: 3, gain: 0.05, det: 2 },
        ],
        vibRate: 5.4, vibAmt: 10, open: 1500, breath: 0.022, formants: null,
      },
      /* קול אנושי ללא מילים — סדרה מלאה עם שני פורמנטים של תנועת "אה" */
      voice: {
        partials: [
          { mult: 1, gain: 1.0, det: 0 },
          { mult: 1, gain: 0.4, det: 7 },
          { mult: 2, gain: 0.34, det: -5 },
          { mult: 3, gain: 0.2, det: 4 },
          { mult: 4, gain: 0.09, det: 0 },
          { mult: 5, gain: 0.05, det: 3 },
        ],
        vibRate: 5.7, vibAmt: 13, open: 1250, breath: 0.014,
        formants: [{ f: 720, q: 5, gain: 7 }, { f: 1180, q: 6, gain: 5 }],
      },
      /* מיתרים — הרבה כפילים מפולשים, ויברטו איטי ורחב */
      strings: {
        partials: [
          { mult: 1, gain: 1.0, det: 0 },
          { mult: 1, gain: 0.6, det: 9 },
          { mult: 1, gain: 0.5, det: -11 },
          { mult: 2, gain: 0.3, det: 5 },
          { mult: 3, gain: 0.18, det: -4 },
          { mult: 4, gain: 0.1, det: 3 },
          { mult: 5, gain: 0.05, det: 0 },
        ],
        vibRate: 4.3, vibAmt: 5, open: 1100, breath: 0, formants: null,
      },
    };
    const COLOR = COLORS[track.timbre] || COLORS.default;

    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = COLOR.open;
    filt.Q.value = 1.6;
    const vg = ctx.createGain();
    vg.gain.value = 0.0001;
    const pan = ctx.createStereoPanner();
    /* פורמנטים — מה שהופך סדרת הרמוניות ל"תנועה" של גרון אנושי */
    let head = filt;
    if (COLOR.formants) {
      for (const F of COLOR.formants) {
        const pk = ctx.createBiquadFilter();
        pk.type = 'peaking';
        pk.frequency.value = F.f;
        pk.Q.value = F.q;
        pk.gain.value = F.gain;
        head.connect(pk);
        head = pk;
        voice.nodes.push(pk);
      }
    }
    head.connect(vg).connect(pan).connect(dest);

    /* רעש נשיפה — האוויר שעובר בכלי. עולה ויורד יחד עם הקול */
    if (COLOR.breath > 0) {
      const air = ctx.createBufferSource();
      air.buffer = this._pinkNoise(ctx);
      air.loop = true;
      const abp = ctx.createBiquadFilter();
      abp.type = 'bandpass';
      abp.frequency.value = track.freq * 2.5;
      abp.Q.value = 1.1;
      const ag = ctx.createGain();
      ag.gain.value = COLOR.breath;
      air.connect(abp).connect(ag).connect(vg);
      air.start();
      voice.sources.push(air);
      voice.nodes.push(abp, ag);
    }

    /* ויברטו — הפרט הקטן שהופך צליל מסונתז לנשימה */
    const vib = ctx.createOscillator();
    vib.frequency.value = COLOR.vibRate;
    const vibAmt = ctx.createGain();
    vibAmt.gain.value = COLOR.vibAmt;            // סנטים
    vib.connect(vibAmt);
    vib.start();

    const PARTIALS = COLOR.partials;
    const oscs = [];
    for (const p of PARTIALS) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = track.freq * p.mult;
      o.detune.value = p.det;
      vibAmt.connect(o.detune);
      const g = ctx.createGain();
      g.gain.value = p.gain;
      o.connect(g).connect(filt);
      o.start();
      oscs.push({ o, mult: p.mult });
      voice.oscillators.push(o);
      voice.nodes.push(g);
    }
    voice.oscillators.push(vib);
    voice.nodes.push(vibAmt, filt, vg, pan);

    const STEPS = [-3, -2, -1, -1, 1, 1, 2, 3, 4];
    let degree = 3;

    const glideTo = () => {
      if (this.voice !== voice) return;
      const s = STEPS[Math.floor(Math.random() * STEPS.length)];
      degree = Math.max(0, Math.min(RATIOS.length - 1, degree + s));
      const f = track.freq * RATIOS[degree];
      const t = ctx.currentTime;
      const glide = pace * (0.22 + Math.random() * 0.3);

      for (const { o, mult } of oscs) {
        const cur = Math.max(1, o.frequency.value);
        o.frequency.cancelScheduledValues(t);
        o.frequency.setValueAtTime(cur, t);
        o.frequency.exponentialRampToValueAtTime(f * mult, t + glide);
      }

      /* נשימה: תפיחה איטית ודעיכה *חלקית*. הרצפה גבוהה בכוונה —
         הקו לא נופל לאפס בין תו לתו, ולכן הוא נשמע לגאטו אחד
         מתמשך ולא סדרה של תווים נפרדים. */
      const peak = (0.16 + Math.random() * 0.07) * scale;
      const cur = Math.max(0.0001, vg.gain.value);
      vg.gain.cancelScheduledValues(t);
      vg.gain.setValueAtTime(cur, t);
      vg.gain.exponentialRampToValueAtTime(peak, t + pace * 0.44);
      vg.gain.exponentialRampToValueAtTime(peak * 0.52, t + pace * 0.99);

      /* הפילטר נפתח יחד עם הנשימה — הצליל "מתבהר" ואז נסגר */
      const fc = Math.max(200, filt.frequency.value);
      filt.frequency.cancelScheduledValues(t);
      filt.frequency.setValueAtTime(fc, t);
      filt.frequency.linearRampToValueAtTime(COLOR.open * (1.11 + Math.random() * 2), t + pace * 0.46);
      filt.frequency.linearRampToValueAtTime(COLOR.open * 0.833, t + pace * 0.96);

      pan.pan.cancelScheduledValues(t);
      pan.pan.setValueAtTime(pan.pan.value, t);
      pan.pan.linearRampToValueAtTime((Math.random() * 2 - 1) * 0.5, t + pace);

      /* תזמון לא מדויק בכוונה — נשימה אנושית ולא רשת. הטווח
         נגמר לפני שהדעיכה מסתיימת, כך שהתו הבא נכנס בזמן
         שהקודם עוד מצלצל והגלישה ביניהם רציפה. */
      const next = pace * (0.7 + Math.random() * 0.26);
      voice.timers.push(setTimeout(glideTo, next * 1000));
    };
    voice.timers.push(setTimeout(glideTo, 400));
  }

  _startMelody(track, voice, dest, scale = 1) {
    if (track.flow) return this._startFlow(track, voice, dest, scale);
    const ctx = this.ctx;
    /* סולמות ביחסים טהורים — הטוניקה היא תמיד תדר הריפוי */
    const SCALES = {
      /* פנטטוני מז'ורי — רגוע, מרפא, "מערבי" */
      penta: [0.5, 0.75, 1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3],
      /* פריגי מינורי — אפל, טקסי, שאמאני */
      shaman: [0.5, 0.6, 2 / 3, 0.8, 1, 16 / 15, 6 / 5, 4 / 3, 3 / 2, 8 / 5, 9 / 5, 2, 12 / 5],
      /* ספטימלי — רבעי הטון של 7/6 ו-7/4 נשמעים "מכופפים", פסיכדלי אמיתי */
      psyche: [0.5, 2 / 3, 0.75, 1, 7 / 6, 4 / 3, 3 / 2, 7 / 4, 2, 7 / 3, 8 / 3, 3, 7 / 2],
      /* אונדצימלי-טרידצימלי — 11/8 ו-13/8 לא קיימים בשום סולם מערבי.
         האוזן לא מצליחה למקם אותם, וזה בדיוק האפקט. */
      warp: [0.5, 11 / 16, 0.75, 7 / 8, 1, 9 / 8, 11 / 8, 13 / 8, 7 / 4, 2, 9 / 4, 11 / 4, 13 / 4],
    };
    const RATIOS = SCALES[track.scale] || SCALES.penta;
    const psychedelic = track.scale === 'psyche' || track.scale === 'warp';
    /* אפקטים פסיכדליים אופציונליים */
    const orbit = !!track.orbit;       // התו מקיף את הראש
    const reverse = !!track.reverse;   // מעטפת הפוכה — הצליל נשאב פנימה
    const echoes = track.echo || 0;    // הדים בספירלה מתכווצת
    const pace = track.pace || 2.4;          // פעימת המוטיב (שניות)
    const sparkle = track.sparkle ?? 0.18;   // הסתברות לנצנוץ אוקטבה למעלה

    /* ------------------------------------------------------------
       כלי הנגינה — כל אחד הוא סט פרשלים עם זמני דעיכה משלו.
       mult = כפל תדר · gain = עוצמה יחסית · tc = קבוע זמן דעיכה
       ------------------------------------------------------------ */
    const TIMBRES = {
      /* פעמון — פרשלים לא-הרמוניים, זנב ארוך וחודר */
      bell: [
        { mult: 1,     gain: 1.0,  tc: 2.8 },
        { mult: 1.004, gain: 0.45, tc: 2.6 },   // שימר — פעימה פנימית
        { mult: 2.01,  gain: 0.24, tc: 1.1 },
        { mult: 2.98,  gain: 0.17, tc: 0.5 },   // הנקישה החודרת
        { mult: 4.16,  gain: 0.07, tc: 0.3 },
      ],
      /* קלימבה — עץ ומתכת, דעיכה קצרה וחמימה */
      kalimba: [
        { mult: 1,    gain: 1.0,  tc: 0.9 },
        { mult: 2,    gain: 0.3,  tc: 0.35 },
        { mult: 3,    gain: 0.14, tc: 0.16 },
        { mult: 5.4,  gain: 0.05, tc: 0.09 },   // נקישת הלשונית
      ],
      /* נבל — פריטה נקייה, הרמוניות זוגיות רכות */
      harp: [
        { mult: 1,    gain: 1.0,  tc: 1.6 },
        { mult: 2,    gain: 0.34, tc: 1.0 },
        { mult: 3,    gain: 0.16, tc: 0.6 },
        { mult: 4,    gain: 0.08, tc: 0.35 },
        { mult: 6,    gain: 0.03, tc: 0.2 },
      ],
      /* הנדפאן — מתכת עגולה וחמה, אוקטבה תחתונה בולטת */
      handpan: [
        { mult: 0.5,  gain: 0.55, tc: 3.2 },
        { mult: 1,    gain: 1.0,  tc: 2.4 },
        { mult: 2,    gain: 0.28, tc: 1.2 },
        { mult: 3.01, gain: 0.09, tc: 0.45 },
      ],
      /* קערת קריסטל — כמעט סינוס טהור, זנב אינסופי */
      crystal: [
        { mult: 1,     gain: 1.0,  tc: 5.0 },
        { mult: 1.002, gain: 0.55, tc: 4.6 },   // פעימה איטית מאוד
        { mult: 4,     gain: 0.05, tc: 1.4 },
        { mult: 6,     gain: 0.02, tc: 0.9 },
      ],
      /* פסנתר חשמלי — היסוד חם ועגול, ומעליו "נקישת השן" המתכתית
         שהיא החתימה של הכלי: פרשל גבוה מאוד עם דעיכה מיידית */
      rhodes: [
        { mult: 1,    gain: 1.0,  tc: 1.9 },
        { mult: 2,    gain: 0.22, tc: 0.9 },
        { mult: 3,    gain: 0.06, tc: 0.4 },
        { mult: 6.2,  gain: 0.11, tc: 0.12 },
        { mult: 10.5, gain: 0.05, tc: 0.06 },
      ],
      /* גיטרת ניילון — פריטה רכה, סדרה הרמונית מלאה ודעיכה בינונית */
      nylon: [
        { mult: 1, gain: 1.0,  tc: 1.3 },
        { mult: 2, gain: 0.42, tc: 0.8 },
        { mult: 3, gain: 0.22, tc: 0.5 },
        { mult: 4, gain: 0.12, tc: 0.3 },
        { mult: 5, gain: 0.07, tc: 0.2 },
        { mult: 6, gain: 0.04, tc: 0.12 },
      ],
      /* שירת גרון — סדרת הרמוניות מלאה עם הדגשת העליונות */
      throat: [
        { mult: 1,  gain: 1.0,  tc: 3.4 },
        { mult: 2,  gain: 0.4,  tc: 3.0 },
        { mult: 3,  gain: 0.28, tc: 2.6 },
        { mult: 4,  gain: 0.22, tc: 2.2 },
        { mult: 5,  gain: 0.18, tc: 1.8 },   // הפורמנט ששומעים כ"שריקה"
        { mult: 6,  gain: 0.12, tc: 1.4 },
      ],
    };
    const timbreName = this.instrument !== 'auto'
      ? this.instrument
      : (track.timbre || 'bell');
    const BELL = TIMBRES[timbreName] || TIMBRES.bell;
    /* גונג עמוק — עוגן ההיפנוזה בתחילת כל מעגל */
    const GONG = [
      { mult: 0.5,  gain: 1.0,  tc: 3.8 },
      { mult: 1,    gain: 0.4,  tc: 2.8 },
      { mult: 1.5,  gain: 0.12, tc: 1.3 },
    ];

    const strike = (f, vel, panPos, partials, when) => {
      const t0 = when ?? ctx.currentTime;
      const pan = ctx.createStereoPanner();
      if (orbit) {
        /* התו מקיף את הראש לאורך הדעיכה */
        pan.pan.setValueAtTime(panPos, t0);
        pan.pan.linearRampToValueAtTime(-panPos, t0 + 3.5);
        pan.pan.linearRampToValueAtTime(panPos, t0 + 7);
      } else {
        pan.pan.value = panPos;
      }
      pan.connect(dest);
      for (const p of partials) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f * p.mult;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        if (reverse) {
          /* מעטפת הפוכה — הצליל נשאב פנימה ואז נחתך. המוח לא מצליח
             להצמיד אותו לרגע התחלה, וזו התחושה ה"אחורה" הקלאסית. */
          g.gain.exponentialRampToValueAtTime(vel * p.gain, t0 + 1.9);
          g.gain.setTargetAtTime(0.0001, t0 + 1.95, p.tc * 0.35);
        } else {
          g.gain.exponentialRampToValueAtTime(vel * p.gain, t0 + 0.012);
          g.gain.setTargetAtTime(0.0001, t0 + 0.025, p.tc);
        }
        /* כיפוף גובה איטי — "וארפ" של סרט מגנטי, החתימה הפסיכדלית */
        if (psychedelic) {
          const bend = (Math.random() * 2 - 1) * 30;
          osc.detune.setValueAtTime(-bend, t0);
          osc.detune.linearRampToValueAtTime(bend, t0 + 4);
        }
        osc.connect(g).connect(pan);
        osc.start(t0);
        osc.stop(t0 + 13);
        osc.onended = () => { try { g.disconnect(); } catch {} };
      }
      const life = (t0 - ctx.currentTime) * 1000 + 13500;
      voice.timers.push(setTimeout(() => { try { pan.disconnect(); } catch {} }, life));
    };

    /* הד בספירלה מתכווצת — המרווחים מתקצרים והצדדים מתחלפים,
       כך שהאוזן שומעת את התו "נופל" לתוך עצמו */
    const strikeWithEchoes = (f, vel, panPos, partials) => {
      strike(f, vel, panPos, partials);
      let delay = 0.42, v = vel * 0.55, side = -panPos;
      for (let i = 0; i < echoes; i++) {
        strike(f, v, side, partials, ctx.currentTime + delay);
        delay += 0.42 * Math.pow(0.68, i + 1);
        v *= 0.6;
        side = -side;
      }
    };
    const hit = echoes ? strikeWithEchoes : strike;

    /* מוטיב היפנוטי: לולאה של 5 תווים שחוזרת — ומוטציה איטית שמחייה אותה.
       החזרתיות היא מה שמהפנט; המוטציה היא מה ששומר על קסם. */
    let motif = track.scale === 'shaman' ? [4, 6, 4, 8]       // תבנית תוף — קצרה ועיקשת
              : track.scale === 'warp'   ? [4, 7, 5, 9, 6, 11, 3, 8]  // ארוכה מאוד — לא נתפסת כלולאה
              : psychedelic              ? [3, 6, 4, 9, 5, 7, 2]  // ארוכה ומתפתלת
              :                            [2, 5, 4, 7, 3];
    let pos = 0;

    const playNote = () => {
      if (this.voice !== voice) return;
      const degree = Math.max(0, Math.min(RATIOS.length - 1, motif[pos]));
      let ratio = RATIOS[degree];
      if (Math.random() < sparkle) ratio *= 2;
      const vel = (0.13 + Math.random() * 0.08) * scale;
      hit(track.freq * ratio, vel, Math.sin(pos * 2.1) * 0.65, BELL);

      /* גונג טוניקה בפתיחת כל מעגל — האדמה שאליה חוזרים */
      if (pos === 0 && Math.random() < 0.75) {
        strike(track.freq, vel * 0.85, 0, GONG);
      }

      pos = (pos + 1) % motif.length;
      if (pos === 0 && Math.random() < 0.35) {
        motif[Math.floor(Math.random() * motif.length)] = 2 + Math.floor(Math.random() * 6);
      }

      /* פעימה כמעט קבועה — קצב היפנוטי, לא אקראי */
      const next = pace * (0.9 + Math.random() * 0.2);
      voice.timers.push(setTimeout(playNote, next * 1000));
    };
    voice.timers.push(setTimeout(playNote, 600));
  }

  /* ------------------------------------------------------------
     מנוע קצב — בס-דראם, היי-האט, קלאפ וסאב-בס על רשת של 16ths.
     מתוזמן מראש (lookahead) ולא מ-setTimeout, כדי שהגרוב יישאר הדוק.
     energy 0–1 קובע צפיפות: כמה האטים, האם יש קלאפ, כמה בס.
     ------------------------------------------------------------ */
  _startPulse(track, voice, dest) {
    const ctx = this.ctx;
    const bpm = track.bpm;
    const energy = track.energy ?? 0.6;
    const step16 = 60 / bpm / 4;
    const subFreq = track.freq / (track.freq > 300 ? 8 : track.freq > 150 ? 4 : 2);

    /* רעש לבן קצר לשימוש חוזר בהאטים ובקלאפ */
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

    const kick = t => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.exponentialRampToValueAtTime(38, t + 0.1);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.5 * pGain, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      osc.connect(g).connect(dest);
      osc.start(t); osc.stop(t + 0.35);
      osc.onended = () => { try { g.disconnect(); } catch {} };
    };

    const noiseHit = (t, { hp, bp, dur, vol }) => {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf;
      const f = ctx.createBiquadFilter();
      if (bp) { f.type = 'bandpass'; f.frequency.value = bp; f.Q.value = 1.4; }
      else { f.type = 'highpass'; f.frequency.value = hp; }
      const g = ctx.createGain();
      g.gain.setValueAtTime(vol * pGain, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(f).connect(g).connect(dest);
      src.start(t); src.stop(t + dur + 0.05);
      src.onended = () => { try { g.disconnect(); f.disconnect(); } catch {} };
    };

    const bass = (t, mult, dur) => {
      const soft = !!P.bassSoft;
      const osc = ctx.createOscillator();
      osc.type = soft ? 'triangle' : 'sawtooth';
      osc.frequency.value = subFreq * mult;
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      /* בס רך — בלי הנשיכה: פילטר פתוח למחצה, Q נמוך, דעיכה עגולה */
      f.frequency.setValueAtTime(soft ? 320 : 900, t);
      f.frequency.exponentialRampToValueAtTime(soft ? 130 : 180, t + dur);
      f.Q.value = soft ? 0.8 : 6;                      // נשיכה חומצתית
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime((soft ? 0.14 : 0.11) * pGain, t + (soft ? 0.09 : 0.01));
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(f).connect(g).connect(dest);
      osc.start(t); osc.stop(t + dur + 0.05);
      osc.onended = () => { try { g.disconnect(); f.disconnect(); } catch {} };
    };

    /* ------------------------------------------------------------
       תוף מסגרת — התוף של המוזיקה הטנטרית. לא בעיטת מועדון:
       עור רחב ונמוך שמתנדנד, גוף עץ שמהדהד תחתיו ונשיפת עור
       מסוננת שנותנת את המגע של היד. איטי, עגול, ולא דוקר.
       ------------------------------------------------------------ */
    const frameDrum = t => {
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.34 * pGain, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.62);
      g.connect(dest);
      /* העור — ירידה מתונה, לא צניחה */
      const skin = ctx.createOscillator();
      skin.type = 'sine';
      skin.frequency.setValueAtTime(96, t);
      skin.frequency.exponentialRampToValueAtTime(58, t + 0.22);
      skin.connect(g);
      skin.start(t); skin.stop(t + 0.7);
      /* גוף העץ — תהודה שקטה שממשיכה אחרי המכה */
      const body = ctx.createOscillator();
      body.type = 'triangle';
      body.frequency.setValueAtTime(147, t);
      body.frequency.exponentialRampToValueAtTime(112, t + 0.3);
      const bg = ctx.createGain();
      bg.gain.setValueAtTime(0.28, t);
      bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      body.connect(bg).connect(g);
      body.start(t); body.stop(t + 0.45);
      skin.onended = () => { try { g.disconnect(); bg.disconnect(); } catch {} };
      /* מגע היד */
      noiseHit(t, { bp: 900, dur: 0.05, vol: 0.028 });
    };

    /* "טק" — נקישת אצבע על שפת התוף, גבוהה וקצרה מאוד */
    const tek = t => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, t);
      osc.frequency.exponentialRampToValueAtTime(240, t + 0.05);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07 * pGain, t + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      osc.connect(g).connect(dest);
      osc.start(t); osc.stop(t + 0.12);
      osc.onended = () => { try { g.disconnect(); } catch {} };
      noiseHit(t, { bp: 2100, dur: 0.035, vol: 0.026 });
    };

    /* תוף מרכזי — לתבניות שבטיות */
    const tom = (t, f) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(f * 0.55, t + 0.16);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      osc.connect(g).connect(dest);
      osc.start(t); osc.stop(t + 0.26);
      osc.onended = () => { try { g.disconnect(); } catch {} };
    };

    /* קונגה — צליל יד על עור, גבוה וקצר עם סלאפ */
    const conga = (t, f) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(f * 0.68, t + 0.07);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.115 * pGain, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
      osc.connect(g).connect(dest);
      osc.start(t); osc.stop(t + 0.17);
      osc.onended = () => { try { g.disconnect(); } catch {} };
      noiseHit(t, { hp: 2600, dur: 0.028, vol: 0.02 });
    };

    /* סטאב אקורד — החתימה של דאב-טכנו, על העף-ביט */
    const stab = t => {
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = 1600; f.Q.value = 2;
      f.connect(g).connect(dest);
      for (const mult of [2, 2.4, 3]) {          // יסוד, טרצה קטנה, קווינטה
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = subFreq * mult;
        osc.connect(f);
        osc.start(t); osc.stop(t + 0.55);
      }
      voice.timers.push(setTimeout(() => {
        try { g.disconnect(); f.disconnect(); } catch {}
      }, (t - ctx.currentTime) * 1000 + 700));
    };

    /* תבניות קצב על רשת של 16 צעדים — כל ז'אנר והגרוב שלו */
    const PATTERNS = {
      four:   { kick: [0, 4, 8, 12], hat: [2, 6, 10, 14], clap: [4, 12],
                bass: [2, 6, 10, 14], bassMult: [1, 1, 1.5, 1] },
      psy:    { kick: [0, 4, 8, 12], hat: [2, 6, 10, 14], clap: [],
                bass: [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15],
                bassMult: [1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2], bassShort: true },
      break:  { kick: [0, 10], hat: [2, 6, 8, 14], clap: [4, 12],
                bass: [0, 5, 10, 13], bassMult: [1, 1.5, 1, 2] },
      dub:    { kick: [0, 8], hat: [6, 14], clap: [],
                bass: [0, 8], bassMult: [1, 1], stab: [3, 7, 11, 15] },
      tribal: { kick: [0, 4, 8, 12], hat: [2, 6, 10, 14], clap: [],
                bass: [0, 6, 10], bassMult: [1, 1.5, 1],
                tom: [3, 7, 11, 14, 15] },
      down:   { kick: [0, 7], hat: [2, 6, 10, 14], clap: [4, 12],
                bass: [0, 7, 10], bassMult: [1, 1, 1.5] },
      /* אורגני — קיק רך על 1 ו-3, שייקר צפוף, בלי קלאפ */
      organic: { kick: [0, 8], hat: [2, 4, 6, 10, 12, 14], clap: [],
                bass: [0, 3, 8, 11, 14], bassMult: [1, 1.5, 1, 2, 1],
                gain: 0.62 },
      /* חושני — חצי-טמפו: קיק על 1 ו-3 בלבד, שייקר רך, קונגה נדירה
         ובס חמים וארוך. עוצמה נמוכה — הקצב נוכח אך לא מוביל */
      sensual: { kick: [0, 8], hat: [], clap: [],
                shaker: [2, 6, 10, 14], conga: [7, 15],
                bass: [0, 6, 8, 14], bassMult: [1, 1.5, 1, 1],
                bassLong: true, gain: 0.42 },
      /* פעימת לב — חבטה כפולה, רכה מאוד */
      heartbeat: { kick: [0, 2, 8, 10], hat: [], clap: [],
                shaker: [5, 13], conga: [],
                bass: [4, 12], bassMult: [1, 1],
                bassLong: true, gain: 0.34 },
      /* ------------------------------------------------------------
         שלושת הגרוב הטנטריים — תוף מסגרת במקום בעיטה, בס רך,
         ואפס האט. בקצב 56–76 הצעד הוא כמעט שנייה שלמה, ולכן
         כל מכה מקבלת מקום לדעוך לפני הבאה.
         ------------------------------------------------------------ */
      /* טנטרה — הדופק העירום: מכה על 1 ועל 3, נקישה לפני כל אחת */
      tantra: { kick: [], hat: [], clap: [], frame: [0, 8], tek: [6, 14],
                shaker: [3, 11],
                bass: [0, 8], bassMult: [1, 1],
                bassLong: true, bassSoft: true, gain: 0.5 },
      /* חיבוק — הדופק מתחיל להתנדנד: מכה מוקדמת על 1.5 שמושכת קדימה */
      embrace: { kick: [], hat: [], clap: [], frame: [0, 6, 8], tek: [11, 15],
                shaker: [2, 10, 14],
                bass: [0, 8, 12], bassMult: [1, 1, 1.5],
                bassLong: true, bassSoft: true, gain: 0.46 },
      /* התמזגות — ארבע מכות שוות ונקישות ביניהן. הכי "נע" בפרק,
         ועדיין בלי אף צליל מועדון אחד */
      merge:  { kick: [], hat: [], clap: [], frame: [0, 4, 8, 12], tek: [2, 6, 10, 14],
                shaker: [1, 5, 9, 13],
                conga: [7, 15],
                bass: [0, 6, 8, 14], bassMult: [1, 1.5, 1, 1],
                bassLong: true, bassSoft: true, gain: 0.54 },
      /* דיפ האוס אורגני — קיק על כל רבע, אופן-האט על העף-ביט,
         בס מתגלגל בין הקיקים, וקונגות בעמדות לא סימטריות */
      house:  { kick: [0, 4, 8, 12], hat: [], clap: [],
                openhat: [2, 6, 10, 14],
                shaker: [1, 3, 5, 7, 9, 11, 13, 15],
                conga: [3, 7, 10, 11, 15],
                bass: [2, 6, 10, 14], bassMult: [1, 1, 1.5, 1],
                bassLong: true, gain: 0.72 },
    };
    const P = PATTERNS[track.pattern] || PATTERNS.four;
    const pGain = P.gain ?? 1;
    const bassDur = step16 * (P.bassShort ? 0.85 : P.bassLong ? 2.3 : 1.6);

    const scheduleStep = (s, t) => {
      if (P.kick.includes(s)) kick(t);
      if (P.frame?.includes(s)) frameDrum(t);
      if (P.tek?.includes(s)) tek(t);
      if (P.hat.includes(s)) noiseHit(t, { hp: 7500, dur: 0.045, vol: 0.055 });
      if (energy > 0.7 && s % 2 === 1 && !P.stab) {
        noiseHit(t, { hp: 9000, dur: 0.025, vol: 0.03 });
      }
      if (energy > 0.45 && P.clap.includes(s)) {
        noiseHit(t, { bp: 1500, dur: 0.13, vol: 0.09 });
      }
      if (P.openhat?.includes(s)) noiseHit(t, { hp: 6200, dur: 0.17, vol: 0.05 });
      if (P.shaker?.includes(s)) noiseHit(t, { hp: 9500, dur: 0.03, vol: 0.022 });
      if (P.conga?.includes(s)) conga(t, 210 + (s % 4) * 55);
      if (P.tom?.includes(s)) tom(t, 150 + (s % 3) * 45);
      if (P.stab?.includes(s)) stab(t);
      const bi = P.bass.indexOf(s);
      if (bi >= 0) bass(t, P.bassMult[bi % P.bassMult.length], bassDur);
    };

    let step = 0;
    let next = ctx.currentTime + 0.12;
    const tick = () => {
      if (this.voice !== voice) return;
      while (next < ctx.currentTime + 0.18) {
        scheduleStep(step, next);
        next += step16;
        step = (step + 1) % 16;
      }
    };
    tick();
    voice.intervals.push(setInterval(tick, 35));
  }

  /* ------------------------------------------------------------
     פאד אמביינטי — הצליל של אלבומי הריפוי הארוכים.
     שבע שכבות הרמוניות, כל אחת עם LFO עוצמה ופילטר בקצב שונה
     ובמספרים שאינם כפולות זה של זה — ולכן הן לעולם לא מסתנכרנות
     והמרקם ממשיך להתפתח בלי לחזור על עצמו.
     ------------------------------------------------------------ */
  _startPad(track, voice, dest) {
    const ctx = this.ctx;
    const depth = track.pad === true ? 1 : track.pad;   // 0–1
    const LAYERS = [
      { mult: 0.5, gain: 0.17, lfo: 0.021, det: -4 },
      { mult: 1,   gain: 0.20, lfo: 0.017, det: 3 },
      { mult: 1.5, gain: 0.12, lfo: 0.013, det: -6 },
      { mult: 2,   gain: 0.09, lfo: 0.011, det: 5 },
      { mult: 3,   gain: 0.05, lfo: 0.0088, det: -3 },
      { mult: 4,   gain: 0.028, lfo: 0.0071, det: 7 },
      { mult: 5,   gain: 0.016, lfo: 0.0059, det: -8 },
    ];
    for (const L of LAYERS) {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = track.freq * L.mult;
      osc.detune.value = L.det;

      const filt = ctx.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.value = 700 + L.mult * 320;
      filt.Q.value = 0.7;
      /* סוויפ פילטר איטי מאוד — המרקם נפתח ונסגר לאורך דקות */
      const fLfo = ctx.createOscillator();
      fLfo.frequency.value = L.lfo * 0.6;
      const fAmt = ctx.createGain();
      fAmt.gain.value = 320;
      fLfo.connect(fAmt).connect(filt.frequency);
      fLfo.start();

      const g = ctx.createGain();
      g.gain.value = L.gain * depth * 0.55;
      const aLfo = ctx.createOscillator();
      aLfo.frequency.value = L.lfo;
      const aAmt = ctx.createGain();
      aAmt.gain.value = L.gain * depth * 0.45;
      aLfo.connect(aAmt).connect(g.gain);
      aLfo.start();

      const pan = ctx.createStereoPanner();
      pan.pan.value = (L.mult % 2 === 0 ? 1 : -1) * 0.38;

      osc.connect(filt).connect(g).connect(pan).connect(dest);
      osc.start();
      voice.oscillators.push(osc, fLfo, aLfo);
      voice.nodes.push(filt, fAmt, g, aAmt, pan);
    }
  }

  async play(track) {
    this._init();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    if (this.usingStream) this.audioEl?.play().catch(() => {});
    if (this.voice) this._teardown(this.voice, FADE_OUT);

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const voice = { oscillators: [], sources: [], nodes: [], timers: [], intervals: [] };

    /* שער העוצמה הראשי של היצירה — עליו יושבים ה-fades והפעימות */
    const vg = ctx.createGain();
    vg.gain.setValueAtTime(0.0001, now);
    vg.gain.setTargetAtTime(1, now, FADE_IN / 3);
    vg.connect(this.dry);
    vg.connect(this.reverb);
    voice.gain = vg;

    const mode = this.speakerMode && track.mode === 'binaural' ? 'isochronic' : track.mode;

    /* ------------------------------------------------------------
       שער התדר עצמו. הפעימות האיזוכרוניות יושבות כאן ורק כאן —
       המלודיה, הפאד והאווירה מחוברים ישירות ל-vg ועוקפים אותו.
       בלי ההפרדה הזו ה-LFO קוצץ את המלודיה שש עד עשר פעמים
       בשנייה, ובמקום קו זורם נשמע צליל חוזר שקוטע אותה.
       (שכבת הקצב כבר עקפה את זה מזמן; זו אותה סיבה בדיוק.)
       ------------------------------------------------------------ */
    const carrier = ctx.createGain();
    carrier.connect(vg);
    voice.nodes.push(carrier);

    if (mode === 'melodic') {
      /* דרון שקט של תדר היסוד + מלחין גנרטיבי מעליו */
      voice.oscillators.push(...this._buildTone(track.freq, carrier, 0.38));
      this._startMelody(track, voice, vg);
    } else if (mode === 'binaural') {
      /* שתי אוזניים, שני תדרים — המוח שומע את ההפרש */
      const L = ctx.createStereoPanner(); L.pan.value = -1;
      const R = ctx.createStereoPanner(); R.pan.value = 1;
      L.connect(carrier); R.connect(carrier);
      voice.oscillators.push(
        ...this._buildTone(track.freq, L, 0.9),
        ...this._buildTone(track.freq + track.beat, R, 0.9),
      );
      voice.nodes.push(L, R);
    } else {
      voice.oscillators.push(...this._buildTone(track.freq, carrier));
    }

    /* ביצירה מלודית התדר הוא הבסיס ולא הכוכב: הוא יורד באיזון
       כדי שהחלק *הפועם* יהיה נתח קטן מהתמהיל. ביצירת תדר טהור
       הוא נשאר במלוא עוצמתו. */
    const carrierLevel = track.melody ? 0.55 : 1;

    /* פעימות איזוכרוניות — LFO בתדר הביט, על התדר בלבד.
       עומק הפעימה תלוי במה שמעליה: ביצירת תדר טהור הפעימה היא
       כל העניין ונשארת חזקה כשהייתה, וביצירה מלודית היא רק
       הבסיס — שם היא רדודה, כדי שלא תקצוץ את המוזיקה. */
    if (mode === 'isochronic') {
      const depth = track.pulseDepth ?? (track.melody ? 0.45 : 0.85);
      carrier.gain.setValueAtTime(carrierLevel * (1 - depth / 2), now);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = track.beat;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = carrierLevel * depth / 2;
      lfo.connect(lfoGain).connect(carrier.gain);
      lfo.start();
      voice.oscillators.push(lfo);
      voice.nodes.push(lfoGain);
    } else {
      carrier.gain.setValueAtTime(carrierLevel, now);
      /* LFO נשימה — גלי עוצמה איטיים שמונעים עייפות אוזן */
      const breath = ctx.createOscillator();
      breath.frequency.value = 0.07;
      const breathGain = ctx.createGain();
      breathGain.gain.value = 0.12;
      breath.connect(breathGain).connect(vg.gain);
      breath.start();
      voice.oscillators.push(breath);
      voice.nodes.push(breathGain);
    }

    /* שכבת מלודיה אופציונלית מעל כל מצב — הביט ממשיך לעבוד,
       והפעמונים מתנגנים מעליו באותו תדר יסוד (למסעות מוזיקליים) */
    if (track.melody && mode !== 'melodic') {
      this._startMelody(
        {
          freq: track.freq, pace: track.pace || 3.2,
          sparkle: track.sparkle ?? 0.15, scale: track.melodyScale || track.scale,
          timbre: track.timbre, orbit: track.orbit, reverse: track.reverse, echo: track.echo,
          flow: track.flow,
        },
        voice, vg, 0.75
      );
    }

    /* שכבת פאד אמביינטית מתחת לכל השאר */
    if (track.pad) this._startPad(track, voice, vg);

    /* שכבת קצב — יוצאת ישירות למאסטר ולא דרך ה-LFO של היצירה,
       כדי שהבס-דראם יישאר הדוק גם מתחת לפעימות איזוכרוניות */
    if (track.bpm) {
      const pg = ctx.createGain();
      pg.gain.setValueAtTime(0.0001, now);
      pg.gain.setTargetAtTime(1, now, FADE_IN / 2);
      pg.connect(this.dry);
      const send = ctx.createGain();
      send.gain.value = 0.18;              // רק נגיעה של ריוורב — לא בוץ
      pg.connect(send).connect(this.reverb);
      voice.nodes.push(pg, send);
      voice.pulseGain = pg;
      this._startPulse(track, voice, pg);
    }

    /* שכבת אווירה — רעש ורוד מסונן, "רוח במקדש" */
    if (track.ambience > 0) {
      const noise = ctx.createBufferSource();
      noise.buffer = this._pinkNoise(ctx);
      noise.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      filter.Q.value = 0.5;
      const ng = ctx.createGain();
      ng.gain.value = track.ambience;
      noise.connect(filter).connect(ng).connect(vg);
      noise.start();
      voice.sources.push(noise);
      voice.nodes.push(filter, ng);
    }

    this.voice = voice;
    this.current = track;
    this.onStateChange?.('playing', track);
  }

  _teardown(voice, fade) {
    for (const t of voice.timers) clearTimeout(t);
    for (const i of voice.intervals || []) clearInterval(i);
    voice.timers = [];
    voice.intervals = [];
    const now = this.ctx.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setTargetAtTime(0.0001, now, fade / 4);
    if (voice.pulseGain) {
      voice.pulseGain.gain.cancelScheduledValues(now);
      voice.pulseGain.gain.setTargetAtTime(0.0001, now, fade / 4);
    }
    setTimeout(() => {
      for (const o of voice.oscillators) { try { o.stop(); } catch {} }
      for (const s of voice.sources) { try { s.stop(); } catch {} }
      try { voice.gain.disconnect(); } catch {}
      for (const n of voice.nodes) { try { n.disconnect(); } catch {} }
    }, fade * 1000 + 150);
  }

  stop() {
    if (!this.voice) return;
    this._teardown(this.voice, FADE_OUT);
    this.voice = null;
    this.current = null;
    this.onStateChange?.('stopped', null);
  }

  async toggle(track) {
    if (this.current?.id === track.id) { this.stop(); return false; }
    await this.play(track);
    return true;
  }

  setVolume(v) {
    this.volume = v;
    if (this.master) {
      this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
    }
  }

  /* fade-out ארוך לסיום טיימר — יציאה עדינה משינה */
  fadeOutAndStop(seconds = 8) {
    if (!this.voice) return;
    for (const t of this.voice.timers) clearTimeout(t);
    for (const i of this.voice.intervals || []) clearInterval(i);
    this.voice.timers = [];
    this.voice.intervals = [];
    const now = this.ctx.currentTime;
    this.voice.gain.gain.setTargetAtTime(0.0001, now, seconds / 4);
    if (this.voice.pulseGain) {
      this.voice.pulseGain.gain.setTargetAtTime(0.0001, now, seconds / 4);
    }
    const v = this.voice;
    this.voice = null;
    const t = this.current;
    this.current = null;
    setTimeout(() => {
      for (const o of v.oscillators) { try { o.stop(); } catch {} }
      for (const s of v.sources) { try { s.stop(); } catch {} }
      try { v.gain.disconnect(); } catch {}
      this.onStateChange?.('stopped', t);
    }, seconds * 1000 + 200);
  }

  /* ------------------------------------------------------------
     בדיקות מערכת — לוודא שמערכת סטריאו מוכנה לתדרים
       'channels' — טון שמאל, ימין, ואז מרכז (אימות הפרדת ערוצים)
       'sweep'    — סריקה 20→220Hz לאיתור גבול הבס של הרמקולים
     ------------------------------------------------------------ */
  async playTest(kind) {
    this._init();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    if (this.usingStream) this.audioEl?.play().catch(() => {});
    if (this.voice) this._teardown(this.voice, 0.4);

    const ctx = this.ctx;
    const now = ctx.currentTime + 0.2;
    const voice = { oscillators: [], sources: [], nodes: [], timers: [], intervals: [] };
    const vg = ctx.createGain();
    vg.gain.value = 1;
    vg.connect(this.dry);
    voice.gain = vg;

    if (kind === 'channels') {
      [[-1, 0], [1, 2.6], [0, 5.2]].forEach(([pan, at]) => {
        const t = now + at;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 440;
        const p = ctx.createStereoPanner();
        p.pan.value = pan;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.22, t + 0.05);
        g.gain.setValueAtTime(0.22, t + 1.8);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2);
        osc.connect(g).connect(p).connect(vg);
        osc.start(t); osc.stop(t + 2.1);
        voice.oscillators.push(osc);
        voice.nodes.push(p, g);
      });
      voice.timers.push(setTimeout(() => this.stop(), 8000));
    } else {
      const dur = 24;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(20, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.28, now + 0.5);
      g.gain.setValueAtTime(0.28, now + dur - 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(g).connect(vg);
      osc.start(now); osc.stop(now + dur + 0.2);
      voice.oscillators.push(osc);
      voice.nodes.push(g);
      voice.timers.push(setTimeout(() => this.stop(), (dur + 0.6) * 1000));
    }

    this.voice = voice;
    this.current = null;
    this.onStateChange?.('playing', null);
  }

  get isPlaying() { return !!this.voice; }
}
