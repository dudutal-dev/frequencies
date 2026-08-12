/* ============================================================
   RESONANCE · ויזואלייזר מנדלה
   מצויר ב-Canvas ברזולוציית הפיקסלים הנטיבית של המסך
   (devicePixelRatio — Retina / 4K / 8K), מוזן מ-AnalyserNode.
   שכבות: הילה נושמת → טבעות אורביטליות → מנדלת גל → חלקיקים.
   ============================================================ */

export class MandalaVisualizer {
  constructor(canvas, engine) {
    this.canvas = canvas;
    this.engine = engine;
    this.ctx2d = canvas.getContext('2d');
    this.running = false;
    this.t = 0;
    this.colors = ['#b794f4', '#553c9a'];
    this.particles = [];
    this.timeData = null;
    this._resize = this._resize.bind(this);
    this._frame = this._frame.bind(this);
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  setColors(colors) {
    this.colors = colors;
    this.particles = [];
  }

  _resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (!w || !h) return;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.dpr = dpr;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._resize();
    requestAnimationFrame(this._frame);
  }

  stop() { this.running = false; }

  /* עוצמה רגעית 0–1 מתוך ה-analyser */
  _level() {
    const an = this.engine.analyser;
    if (!an) return 0.3;
    if (!this.timeData || this.timeData.length !== an.fftSize) {
      this.timeData = new Uint8Array(an.fftSize);
    }
    an.getByteTimeDomainData(this.timeData);
    let sum = 0;
    for (let i = 0; i < this.timeData.length; i += 4) {
      const v = (this.timeData[i] - 128) / 128;
      sum += v * v;
    }
    return Math.min(1, Math.sqrt(sum / (this.timeData.length / 4)) * 4);
  }

  _frame() {
    if (!this.running) return;
    const c = this.ctx2d;
    const W = this.canvas.width, H = this.canvas.height;
    if (!W || !H) { requestAnimationFrame(this._frame); return; }

    this.t += 0.004;
    const t = this.t;
    const level = this._level();
    const cx = W / 2, cy = H / 2;
    const base = Math.min(W, H) * 0.26;
    const [colA, colB] = this.colors;

    /* רקע — שובל עדין ליצירת זרימה */
    c.globalCompositeOperation = 'source-over';
    c.fillStyle = 'rgba(5, 5, 10, 0.16)';
    c.fillRect(0, 0, W, H);

    c.globalCompositeOperation = 'lighter';

    /* הילה נושמת */
    const auraR = base * (1.9 + Math.sin(t * 1.7) * 0.12 + level * 0.5);
    const aura = c.createRadialGradient(cx, cy, base * 0.2, cx, cy, auraR);
    aura.addColorStop(0, this._alpha(colA, 0.16 + level * 0.1));
    aura.addColorStop(0.6, this._alpha(colB, 0.07));
    aura.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = aura;
    c.beginPath();
    c.arc(cx, cy, auraR, 0, Math.PI * 2);
    c.fill();

    /* מנדלת גל — שלוש שכבות פרחוניות מסתובבות */
    const petalsPerLayer = [6, 9, 12];
    for (let layer = 0; layer < 3; layer++) {
      const petals = petalsPerLayer[layer];
      const rot = t * (layer % 2 ? -0.5 : 0.35) + layer * 0.7;
      const r0 = base * (0.55 + layer * 0.33);
      const amp = base * (0.10 + level * 0.22) * (1 - layer * 0.18);
      c.beginPath();
      const steps = 220;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const wave =
          Math.sin(a * petals + rot * 3) * amp +
          Math.sin(a * petals * 2 - t * 2) * amp * 0.25;
        const r = r0 + wave;
        const x = cx + Math.cos(a + rot) * r;
        const y = cy + Math.sin(a + rot) * r;
        i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
      }
      c.closePath();
      c.strokeStyle = this._alpha(layer % 2 ? colB : colA, 0.34 - layer * 0.07);
      c.lineWidth = (2.4 - layer * 0.5) * this.dpr;
      c.shadowColor = colA;
      c.shadowBlur = 18 * this.dpr;
      c.stroke();
    }
    c.shadowBlur = 0;

    /* טבעות אורביטליות דקות */
    for (let i = 0; i < 3; i++) {
      const rr = base * (1.25 + i * 0.28) + Math.sin(t * 2 + i * 2) * base * 0.03;
      c.beginPath();
      c.arc(cx, cy, rr, 0, Math.PI * 2);
      c.strokeStyle = this._alpha(colA, 0.05);
      c.lineWidth = 1 * this.dpr;
      c.stroke();
    }

    /* חלקיקים במסלול */
    if (this.particles.length < 42) {
      this.particles.push({
        a: Math.random() * Math.PI * 2,
        r: base * (0.7 + Math.random() * 1.3),
        s: 0.001 + Math.random() * 0.003,
        size: (0.8 + Math.random() * 1.8) * this.dpr,
        drift: Math.random() * Math.PI * 2,
      });
    }
    for (const p of this.particles) {
      p.a += p.s * (1 + level * 2);
      const wob = Math.sin(t * 3 + p.drift) * base * 0.04;
      const x = cx + Math.cos(p.a) * (p.r + wob);
      const y = cy + Math.sin(p.a) * (p.r + wob);
      const g = c.createRadialGradient(x, y, 0, x, y, p.size * 4);
      g.addColorStop(0, this._alpha(colA, 0.7));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = g;
      c.beginPath();
      c.arc(x, y, p.size * 4, 0, Math.PI * 2);
      c.fill();
    }

    /* ליבה זוהרת */
    const coreR = base * (0.16 + level * 0.10 + Math.sin(t * 2.2) * 0.015);
    const core = c.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.6);
    core.addColorStop(0, 'rgba(255,255,255,0.85)');
    core.addColorStop(0.25, this._alpha(colA, 0.55));
    core.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = core;
    c.beginPath();
    c.arc(cx, cy, coreR * 2.6, 0, Math.PI * 2);
    c.fill();

    requestAnimationFrame(this._frame);
  }

  _alpha(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
}
