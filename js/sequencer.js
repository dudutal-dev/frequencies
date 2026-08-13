/* ============================================================
   RESONANCE · Sequencer — מנוע רצפים
   מריץ רצף שלבים (מסע מודרך או פלייליסט): כל שלב מתנגן
   למשך זמנו, ואז קרוס-פייד אוטומטי לשלב הבא.

   callbacks:
     onStep(track, index)  — שלב חדש התחיל (המנוע כבר קיבל play)
     onTick(remaining, total, index) — פעימת שנייה להתקדמות
     onEnd(completed)      — הרצף הסתיים (true) או נעצר (false)
   ============================================================ */

export class Sequencer {
  constructor() {
    this.active = false;
    this.name = '';
    this.steps = [];       // [{ track, seconds }]
    this.index = 0;
    this.remaining = 0;
    this._tick = null;
    this.onStep = null;
    this.onTick = null;
    this.onEnd = null;
  }

  start(name, steps) {
    this.stopTimers();
    this.name = name;
    this.steps = steps;
    this.index = 0;
    this.active = true;
    this._enterStep();
  }

  _startClock() {
    const step = this.steps[this.index];
    this._tick = setInterval(() => {
      this.remaining -= 1;
      this.onTick?.(Math.max(0, this.remaining), step.seconds, this.index);
      if (this.remaining <= 0) this.next();
    }, 1000);
  }

  /* offset = כמה שניות לתוך השלב מתחילים. 0 = מההתחלה */
  _enterStep(offset = 0) {
    const step = this.steps[this.index];
    this.remaining = Math.max(1, step.seconds - offset);
    this.onStep?.(step.track, this.index);
    this.onTick?.(this.remaining, step.seconds, this.index);
    this._startClock();
  }

  /* ------------------------------------------------------------
     קפיצה לנקודה מוחלטת ברצף כולו (בשניות מתחילת המסע).
     אם הנקודה נופלת בשלב שכבר מתנגן — מזיזים רק את השעון ולא
     נוגעים באודיו, כדי שגרירה בתוך שלב לא תקטע את הצליל.
     ------------------------------------------------------------ */
  seek(abs) {
    if (!this.active || !this.steps.length) return;
    const total = this.totalSeconds;
    abs = Math.max(0, Math.min(total - 1, abs));

    let i = 0;
    let acc = 0;
    while (i < this.steps.length - 1 && acc + this.steps[i].seconds <= abs) {
      acc += this.steps[i].seconds;
      i += 1;
    }
    const offset = abs - acc;
    const sameStep = i === this.index;

    this.stopTimers();
    this.index = i;
    if (sameStep) {
      const step = this.steps[i];
      this.remaining = Math.max(1, step.seconds - offset);
      this.onTick?.(this.remaining, step.seconds, i);
      this._startClock();
    } else {
      this._enterStep(offset);
    }
  }

  /* אורך הרצף כולו, ומיקום מוחלט בתוכו — הבסיס לפס הגרירה */
  get totalSeconds() {
    return this.steps.reduce((s, st) => s + st.seconds, 0);
  }

  get elapsed() {
    if (!this.steps.length) return 0;
    let acc = 0;
    for (let i = 0; i < this.index; i++) acc += this.steps[i].seconds;
    return acc + (this.steps[this.index].seconds - this.remaining);
  }

  /* השלב שנמצא בנקודה מוחלטת מסוימת — לתצוגת התצוגה-המקדימה בגרירה */
  stepAt(abs) {
    let acc = 0;
    for (let i = 0; i < this.steps.length; i++) {
      if (abs < acc + this.steps[i].seconds) return { step: this.steps[i], index: i };
      acc += this.steps[i].seconds;
    }
    const i = this.steps.length - 1;
    return { step: this.steps[i], index: i };
  }

  next() {
    if (!this.active) return;
    this.stopTimers();
    if (this.index + 1 < this.steps.length) {
      this.index += 1;
      this._enterStep();
    } else {
      this.active = false;
      this.onEnd?.(true);
    }
  }

  prev() {
    if (!this.active) return;
    this.stopTimers();
    this.index = Math.max(0, this.index - 1);
    this._enterStep();
  }

  stop() {
    if (!this.active) return;
    this.stopTimers();
    this.active = false;
    this.onEnd?.(false);
  }

  stopTimers() {
    if (this._tick) { clearInterval(this._tick); this._tick = null; }
  }

  get total() { return this.steps.length; }
  get current() { return this.steps[this.index]; }
}
