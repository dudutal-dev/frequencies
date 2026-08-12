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
    this.compressor.connect(this.master).connect(this.analyser).connect(ctx.destination);

    this.ctx = ctx;
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
  _startMelody(track, voice, dest, scale = 1) {
    const ctx = this.ctx;
    /* סולם פנטטוני ביחסים טהורים, מאוקטבה מתחת עד מעל */
    const RATIOS = [0.5, 0.75, 1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3];
    const STEPS = [-2, -1, -1, -1, 0, 1, 1, 1, 2, 2, 3];   // הליכה אקראית עדינה
    let degree = 2;                          // פתיחה על הטוניקה — התדר עצמו
    const pace = track.pace || 2.6;          // מרווח ממוצע בין תווים (שניות)
    const sparkle = track.sparkle ?? 0.18;   // הסתברות לנצנוץ אוקטבה למעלה

    const playNote = () => {
      if (this.voice !== voice) return;
      const step = STEPS[Math.floor(Math.random() * STEPS.length)];
      degree = Math.max(0, Math.min(RATIOS.length - 1, degree + step));
      let ratio = RATIOS[degree];
      if (Math.random() < sparkle) ratio *= 2;
      const f = track.freq * ratio;
      const t0 = ctx.currentTime;
      const vel = (0.09 + Math.random() * 0.09) * scale;

      const pan = ctx.createStereoPanner();
      pan.pan.value = (Math.random() * 2 - 1) * 0.7;
      pan.connect(dest);
      const partials = [
        { mult: 1, gain: vel, tc: 1.5 },          // יסוד — זנב ארוך
        { mult: 3.01, gain: vel * 0.16, tc: 0.35 } // פרשל — נקישת הפעמון
      ];
      for (const p of partials) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f * p.mult;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(p.gain, t0 + 0.015);
        g.gain.setTargetAtTime(0.0001, t0 + 0.03, p.tc);
        osc.connect(g).connect(pan);
        osc.start(t0);
        osc.stop(t0 + 9);
        osc.onended = () => { try { g.disconnect(); } catch {} };
      }
      voice.timers.push(setTimeout(() => { try { pan.disconnect(); } catch {} }, 9500));

      /* מדי פעם — הפסקה ארוכה, כמו נשימה בין משפטים מוזיקליים */
      const rest = Math.random() < 0.12 ? pace * 2.5 : 0;
      const next = pace * (0.55 + Math.random() * 0.9) + rest;
      voice.timers.push(setTimeout(playNote, next * 1000));
    };
    voice.timers.push(setTimeout(playNote, 700));
  }

  async play(track) {
    this._init();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    if (this.voice) this._teardown(this.voice, FADE_OUT);

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const voice = { oscillators: [], sources: [], nodes: [], timers: [] };

    /* שער העוצמה הראשי של היצירה — עליו יושבים ה-fades והפעימות */
    const vg = ctx.createGain();
    vg.gain.setValueAtTime(0.0001, now);
    vg.gain.setTargetAtTime(1, now, FADE_IN / 3);
    vg.connect(this.dry);
    vg.connect(this.reverb);
    voice.gain = vg;

    if (track.mode === 'melodic') {
      /* דרון שקט של תדר היסוד + מלחין גנרטיבי מעליו */
      voice.oscillators.push(...this._buildTone(track.freq, vg, 0.38));
      this._startMelody(track, voice, vg);
    } else if (track.mode === 'binaural') {
      /* שתי אוזניים, שני תדרים — המוח שומע את ההפרש */
      const L = ctx.createStereoPanner(); L.pan.value = -1;
      const R = ctx.createStereoPanner(); R.pan.value = 1;
      L.connect(vg); R.connect(vg);
      voice.oscillators.push(
        ...this._buildTone(track.freq, L, 0.9),
        ...this._buildTone(track.freq + track.beat, R, 0.9),
      );
      voice.nodes.push(L, R);
    } else {
      voice.oscillators.push(...this._buildTone(track.freq, vg));
    }

    /* פעימות איזוכרוניות — LFO עמוק בתדר הביט */
    if (track.mode === 'isochronic') {
      const depth = 0.85;
      vg.gain.setTargetAtTime(1 - depth / 2, now, FADE_IN / 3);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = track.beat;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = depth / 2;
      lfo.connect(lfoGain).connect(vg.gain);
      lfo.start();
      voice.oscillators.push(lfo);
      voice.nodes.push(lfoGain);
    } else {
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
    if (track.melody && track.mode !== 'melodic') {
      this._startMelody(
        { freq: track.freq, pace: track.pace || 3.2, sparkle: track.sparkle ?? 0.15 },
        voice, vg, 0.75
      );
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
    voice.timers = [];
    const now = this.ctx.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setTargetAtTime(0.0001, now, fade / 4);
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
    this.voice.timers = [];
    const now = this.ctx.currentTime;
    this.voice.gain.gain.setTargetAtTime(0.0001, now, seconds / 4);
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

  get isPlaying() { return !!this.voice; }
}
