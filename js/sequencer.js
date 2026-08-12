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

  _enterStep() {
    const step = this.steps[this.index];
    this.remaining = step.seconds;
    this.onStep?.(step.track, this.index);
    this.onTick?.(this.remaining, step.seconds, this.index);
    this._tick = setInterval(() => {
      this.remaining -= 1;
      this.onTick?.(Math.max(0, this.remaining), step.seconds, this.index);
      if (this.remaining <= 0) this.next();
    }, 1000);
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
