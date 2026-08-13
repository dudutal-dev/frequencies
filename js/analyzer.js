/* ============================================================
   RESONANCE · מנתח סגנון

   קורא קובץ שמע מהמכשיר ומוציא ממנו את *פרמטרי הסגנון* שמנוע
   הסינתזה שלנו יודע לצרוך: טמפו, מרכז טונאלי, אופי מודאלי,
   בהירות, צפיפות גרוב ומשקל התחתונים.

   הוא לא מתמלל מלודיה ולא משכפל אף צליל מהקובץ. הפלט הוא סט
   הגדרות שממנו האפליקציה מייצרת מוזיקה מקורית משלה באותה רוח.

   הכל רץ על המכשיר. שום דבר לא נשלח לשום מקום.
   ============================================================ */

const SR = 22050;          // תדר דגימה לניתוח — מספיק, וזול פי שניים
const N_A = 2048;          // מעבר א': אונסטים וספקטרום
const HOP_A = 512;
const N_B = 8192;          // מעבר ב': כרומה — צריך רזולוציית תדר גבוהה
const HOP_B = 4096;
const MAX_SECONDS = 60;

const NOTE_NAMES = ['דו', 'דו#', 'רה', 'רה#', 'מי', 'פה', 'פה#', 'סול', 'סול#', 'לה', 'לה#', 'סי'];
const NOTE_LATIN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/* פרופילי Krumhansl-Schmuckler — מתאמים מולם את וקטור הכרומה.
   זו השיטה הסטנדרטית להערכת סולם ומינור/מז'ור. */
const KS_MAJOR = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const KS_MINOR = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

/* ------------------------------------------------------------
   FFT — רדיקס-2 איטרטיבי, במקום. ה-AnalyserNode של Web Audio
   עובד רק בזמן אמת, ולכן לניתוח קובץ שלם צריך FFT משלנו.
   ------------------------------------------------------------ */
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      let t = re[i]; re[i] = re[j]; re[j] = t;
      t = im[i]; im[i] = im[j]; im[j] = t;
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len;
    const wr = Math.cos(ang), wi = Math.sin(ang);
    const half = len >> 1;
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let j = 0; j < half; j++) {
        const a = i + j, b = a + half;
        const vr = re[b] * cr - im[b] * ci;
        const vi = re[b] * ci + im[b] * cr;
        re[b] = re[a] - vr; im[b] = im[a] - vi;
        re[a] += vr;        im[a] += vi;
        const ncr = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = ncr;
      }
    }
  }
}

function hann(n) {
  const w = new Float32Array(n);
  for (let i = 0; i < n; i++) w[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1));
  return w;
}

/* ספקטרוגרמה — מחזירה מערך של מסגרות, כל אחת חצי-ספקטרום עוצמות */
async function spectrogram(y, n, hop, onProgress) {
  const w = hann(n);
  const bins = n / 2 + 1;
  const count = Math.max(1, Math.floor((y.length - n) / hop) + 1);
  const frames = [];
  const re = new Float64Array(n);
  const im = new Float64Array(n);
  for (let f = 0; f < count; f++) {
    const off = f * hop;
    for (let i = 0; i < n; i++) { re[i] = y[off + i] * w[i]; im[i] = 0; }
    fft(re, im);
    const mag = new Float32Array(bins);
    for (let k = 0; k < bins; k++) mag[k] = Math.hypot(re[k], im[k]);
    frames.push(mag);
    /* משחררים את החוט מדי פעם — אחרת הממשק קופא בזמן הניתוח */
    if ((f & 255) === 255) {
      onProgress?.(f / count);
      await new Promise(r => setTimeout(r));
    }
  }
  return frames;
}

/* ממוצע נע — קירוב זול לפילטר החציון של הפרדת הרמוני/הקשתי.
   הרמוניה חלקה לאורך זמן, הקשה חלקה לאורך תדר. */
function movAvgTime(frames, k) {
  const out = frames.map(f => new Float32Array(f.length));
  const half = k >> 1, bins = frames[0].length, n = frames.length;
  for (let b = 0; b < bins; b++) {
    let sum = 0, cnt = 0;
    for (let f = 0; f <= Math.min(half, n - 1); f++) { sum += frames[f][b]; cnt++; }
    for (let f = 0; f < n; f++) {
      out[f][b] = sum / cnt;
      const add = f + half + 1, rem = f - half;
      if (add < n) { sum += frames[add][b]; cnt++; }
      if (rem >= 0) { sum -= frames[rem][b]; cnt--; }
    }
  }
  return out;
}

function movAvgFreq(frames, k) {
  const half = k >> 1;
  return frames.map(f => {
    const out = new Float32Array(f.length);
    let sum = 0, cnt = 0;
    for (let b = 0; b <= Math.min(half, f.length - 1); b++) { sum += f[b]; cnt++; }
    for (let b = 0; b < f.length; b++) {
      out[b] = sum / cnt;
      const add = b + half + 1, rem = b - half;
      if (add < f.length) { sum += f[add]; cnt++; }
      if (rem >= 0) { sum -= f[rem]; cnt--; }
    }
    return out;
  });
}

/* פלוקס ספקטרלי — סכום העליות בלבד. זה גלאי האונסטים. */
function onsetEnvelope(frames) {
  const env = new Float32Array(frames.length);
  for (let f = 1; f < frames.length; f++) {
    let s = 0;
    const cur = frames[f], prv = frames[f - 1];
    for (let b = 0; b < cur.length; b++) {
      const d = cur[b] - prv[b];
      if (d > 0) s += d;
    }
    env[f] = s;
  }
  return env;
}

/* טמפו — אוטוקורלציה של מעטפת האונסטים, עם אינטרפולציה
   פרבולית סביב השיא כדי לדייק מעבר לרזולוציית המסגרת */
function estimateTempo(env, hop) {
  const frameSec = hop / SR;
  let mean = 0;
  for (const v of env) mean += v;
  mean /= env.length;
  const x = Float64Array.from(env, v => v - mean);

  const minLag = Math.max(2, Math.round(60 / 200 / frameSec));   // 200 BPM
  const maxLag = Math.min(x.length - 2, Math.round(60 / 40 / frameSec));  // 40 BPM
  if (maxLag <= minLag) return { bpm: 0, strength: 0 };

  const ac = new Float64Array(maxLag + 1);
  for (let lag = minLag; lag <= maxLag; lag++) {
    let s = 0;
    for (let i = 0; i + lag < x.length; i++) s += x[i] * x[i + lag];
    ac[lag] = s / (x.length - lag);
    /* משקל מוקדם סביב 110 BPM. בלעדיו האוטוקורלציה בוחרת לא פעם
       את התיבה במקום את הפעימה, ומחזירה חצי או כפול מהטמפו. */
    const lagBpm = 60 / (lag * frameSec);
    ac[lag] *= Math.exp(-0.5 * Math.pow(Math.log2(lagBpm / 110) / 0.9, 2));
  }
  let best = minLag;
  for (let lag = minLag; lag <= maxLag; lag++) if (ac[lag] > ac[best]) best = lag;

  let lag = best;
  if (best > minLag && best < maxLag) {
    const a = ac[best - 1], b = ac[best], c = ac[best + 1];
    const denom = a - 2 * b + c;
    if (denom !== 0) lag = best + (0.5 * (a - c)) / denom;
  }
  let bpm = 60 / (lag * frameSec);
  while (bpm > 150) bpm /= 2;
  while (bpm < 55) bpm *= 2;

  let peak = 0;
  for (let l = minLag; l <= maxLag; l++) peak = Math.max(peak, Math.abs(ac[l]));
  const zero = ac[minLag] || 1;
  return { bpm, strength: peak > 0 ? Math.min(1, ac[best] / peak) : 0, _zero: zero };
}

/* ------------------------------------------------------------
   כרומה. שני פרטים חשובים כאן, ובלעדיהם זיהוי הסולם נשבר על
   מוזיקה עם תופים:

   1. נספרות רק *פסגות* ספקטרליות — בין שהוא מקסימום מקומי
      ובולט מעל סביבתו. צליל מנוגן מייצר פסגות חדות; מכת תוף
      מייצרת רעש רחב-פס בלי פסגות, ולכן נופלת מהספירה כמעט כולה.
   2. כל מסגרת מנורמלת לפני שהיא נצברת, כדי שמכה אחת חזקה לא
      תכריע את הסולם של יצירה שלמה.
   ------------------------------------------------------------ */
function chromaVector(frames, n) {
  const chroma = new Float64Array(12);
  const binHz = SR / n;
  const lo = Math.max(2, Math.ceil(150 / binHz));
  const hi = Math.min(frames[0].length - 2, Math.floor(2200 / binHz));
  const frame = new Float64Array(12);
  const bassPc = new Float64Array(12);

  for (const f of frames) {
    frame.fill(0);
    let lowest = -1;
    /* רצפת הרעש המקומית — ממוצע החלון סביב הבין */
    for (let b = lo; b <= hi; b++) {
      const v = f[b];
      if (v <= f[b - 1] || v < f[b + 1]) continue;          // לא פסגה
      let floorSum = 0, cnt = 0;
      for (let k = b - 8; k <= b + 8; k++) {
        if (k < 0 || k >= f.length || k === b) continue;
        floorSum += f[k]; cnt++;
      }
      const floorAvg = cnt ? floorSum / cnt : 0;
      if (v < floorAvg * 2.2) continue;                      // לא בולטת מספיק
      const midi = 69 + 12 * Math.log2((b * binHz) / 440);
      const pc = ((Math.round(midi) % 12) + 12) % 12;
      frame[pc] += v;
      if (lowest < 0) lowest = pc;                           // הפסגה הנמוכה = הבס
    }
    const s = frame.reduce((a, b) => a + b, 0);
    if (s > 0) {
      for (let i = 0; i < 12; i++) chroma[i] += frame[i] / s;
      /* הבס קובע את הטוניקה הרבה יותר מכל צליל אחר — הוא נספר
         בנפרד ומוזרק בחזרה במשקל, אחרת אקורד משולש מתפרש
         בקלות כסולם הקרוב היחסי שלו. */
      if (lowest >= 0) bassPc[lowest] += 1;
    }
  }
  const bassSum = bassPc.reduce((a, b) => a + b, 0);
  if (bassSum > 0) {
    const chromaSum = chroma.reduce((a, b) => a + b, 0) || 1;
    for (let i = 0; i < 12; i++) chroma[i] += (bassPc[i] / bassSum) * chromaSum * 0.6;
  }
  const sum = chroma.reduce((a, b) => a + b, 0) || 1;
  return Array.from(chroma, v => v / sum);
}

function corr(a, b) {
  const n = a.length;
  const ma = a.reduce((x, y) => x + y, 0) / n;
  const mb = b.reduce((x, y) => x + y, 0) / n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) {
    const u = a[i] - ma, v = b[i] - mb;
    num += u * v; da += u * u; db += v * v;
  }
  return da && db ? num / Math.sqrt(da * db) : 0;
}

function estimateKey(chroma) {
  let best = { tonic: 0, mode: 'major', conf: -2, runnerUp: null };
  const all = [];
  for (let i = 0; i < 12; i++) {
    for (const [mode, prof] of [['major', KS_MAJOR], ['minor', KS_MINOR]]) {
      const rolled = prof.map((_, j) => prof[(j - i + 12) % 12]);
      const r = corr(chroma, rolled);
      all.push({ tonic: i, mode, conf: r });
    }
  }
  all.sort((x, y) => y.conf - x.conf);
  best = all[0];
  best.runnerUp = all[1];
  /* הפרש קטן מול המקום השני = הכרעה לא בטוחה. הקרוב היחסי
     (לה מינור מול דו מז'ור) חולק בדיוק את אותם צלילים. */
  best.margin = all[0].conf - all[1].conf;
  return best;
}

/* ------------------------------------------------------------
   פענוח הקובץ: מונו, 22050, וחלון של דקה מאמצע היצירה —
   ההתחלה של שיר כמעט תמיד לא מייצגת אותו.
   ------------------------------------------------------------ */
async function decodeToMono(file, onProgress) {
  onProgress?.('מפענח את הקובץ…', 0.05);
  const bytes = await file.arrayBuffer();
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const tmp = new Ctx();
  let decoded;
  try {
    decoded = await tmp.decodeAudioData(bytes);
  } finally {
    tmp.close?.();
  }
  const start = Math.min(decoded.duration * 0.3, 45);
  const dur = Math.min(MAX_SECONDS, Math.max(4, decoded.duration - start));
  const off = new OfflineAudioContext(1, Math.ceil(dur * SR), SR);
  const src = off.createBufferSource();
  src.buffer = decoded;
  src.connect(off.destination);
  src.start(0, start, dur);
  const rendered = await off.startRendering();
  return {
    y: rendered.getChannelData(0),
    fullDuration: decoded.duration,
    windowStart: start,
    windowDur: dur,
  };
}

/* דגימות גולמיות בכל תדר דגימה → מונו ב-22050 */
async function resample(y, srIn) {
  if (srIn === SR) return y;
  const ctx = new OfflineAudioContext(1, Math.ceil((y.length * SR) / srIn), SR);
  const buf = ctx.createBuffer(1, y.length, srIn);
  buf.copyToChannel(Float32Array.from(y), 0);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(ctx.destination);
  src.start();
  return (await ctx.startRendering()).getChannelData(0);
}

/* ------------------------------------------------------------
   שער המוזיקליות.

   כשמקליטים "מה שמתנגן עכשיו" נכנס גם מה שאינו מוזיקה — דיבור,
   פרסומת, שקט, מישהו שמדבר מעל. הקטע נחתך לחלונות, וכל חלון
   נשקל בשני מדדים:

     טונאליות — כמה מהאנרגיה יושבת בפסגות ספקטרליות חדות.
                 צליל מנוגן מייצר פסגות יציבות; דיבור ורעש לא.
     רציפות   — איזה חלק מהמסגרות בחלון בכלל מעל רצפת אנרגיה.
                 למוזיקה יש מרקם רצוף; לדיבור יש חורים בין הברות.

   רק חלונות שעוברים את שניהם נכנסים לניתוח. כך פרסומת בהתחלה
   או דיבור באמצע פשוט לא משפיעים על התוצאה.
   ------------------------------------------------------------ */
function windowScores(A, framesPerWin) {
  const out = [];
  for (let start = 0; start + framesPerWin <= A.length; start += framesPerWin) {
    let energy = 0, tonalSum = 0, live = 0;
    for (let f = start; f < start + framesPerWin; f++) {
      const fr = A[f];
      let tot = 0, peak = 0;
      for (let b = 2; b < fr.length - 1; b++) {
        tot += fr[b];
        if (fr[b] > fr[b - 1] && fr[b] >= fr[b + 1]) peak += fr[b];
      }
      energy += tot;
      if (tot > 0) tonalSum += peak / tot;
    }
    const meanEnergy = energy / framesPerWin;
    out.push({ start, frames: framesPerWin, meanEnergy, tonal: tonalSum / framesPerWin, live });
  }
  /* רצפת האנרגיה נקבעת יחסית לחלון החזק ביותר, כדי שהשער
     יעבוד גם בהקלטה שקטה וגם בהקלטה חזקה */
  const loudest = Math.max(...out.map(w => w.meanEnergy), 1e-9);
  for (const w of out) w.rel = w.meanEnergy / loudest;
  return out;
}

function gateMusical(A, framesPerWin) {
  const wins = windowScores(A, framesPerWin);
  if (wins.length < 2) return { frames: null, wins, keptWins: wins.length, totalWins: wins.length };
  const keep = wins.filter(w => w.rel > 0.12 && w.tonal > 0.42);
  /* אם השער פסל כמעט הכל, עדיף לנתח הכל מאשר להחזיר כלום */
  if (keep.length < Math.max(1, Math.ceil(wins.length * 0.15))) {
    return { frames: null, wins, keptWins: wins.length, totalWins: wins.length, bypassed: true };
  }
  const frames = [];
  for (const w of keep) for (let f = w.start; f < w.start + w.frames; f++) frames.push(A[f]);
  return { frames, wins, keptWins: keep.length, totalWins: wins.length };
}

export async function analyzeFile(file, onProgress = () => {}) {
  const { y, fullDuration, windowStart, windowDur } = await decodeToMono(file, onProgress);
  return analyzeSamples(y, SR, onProgress, { fullDuration, windowStart, windowDur, fileName: file.name });
}

/* ניתוח דגימות גולמיות — משמש גם את הקובץ וגם את ההאזנה החיה */
export async function analyzeSamples(raw, srIn, onProgress = () => {}, meta = {}) {
  onProgress('מכין את האות…', 0.12);
  const y = await resample(raw, srIn);
  const windowDur = meta.windowDur ?? y.length / SR;
  const fullDuration = meta.fullDuration ?? windowDur;
  const windowStart = meta.windowStart ?? 0;

  onProgress('מנתח קצב ואונסטים…', 0.2);
  let A = await spectrogram(y, N_A, HOP_A, p => onProgress('מנתח קצב ואונסטים…', 0.2 + p * 0.3));

  /* מסננים החוצה דיבור, פרסומות ושקט לפני שמודדים כל דבר אחר */
  const framesPerWin = Math.max(8, Math.round((6 * SR) / HOP_A));
  const gate = gateMusical(A, framesPerWin);
  const musicalSec = Math.round(((gate.frames ? gate.frames.length : A.length) * HOP_A) / SR);
  const droppedSec = Math.round(((A.length - (gate.frames ? gate.frames.length : A.length)) * HOP_A) / SR);

  /* אותו סינון חייב לחול גם על מעבר הכרומה — אחרת הדיבור
     שסיננו החוצה עדיין יקבע את הסולם */
  let yMus = y;
  if (gate.frames) {
    const keep = gate.wins.filter(w => w.rel > 0.12 && w.tonal > 0.42);
    const parts = keep.map(w => y.subarray(w.start * HOP_A,
      Math.min(y.length, (w.start + w.frames) * HOP_A + N_A)));
    const len = parts.reduce((s, p) => s + p.length, 0);
    yMus = new Float32Array(len);
    let at = 0;
    for (const p of parts) { yMus.set(p, at); at += p.length; }
    A = gate.frames;
  }

  const env = onsetEnvelope(A);
  const { bpm, strength } = estimateTempo(env, HOP_A);

  /* צפיפות אונסטים — כמה פעמים בשנייה קורה משהו */
  let mean = 0;
  for (const v of env) mean += v;
  mean /= env.length || 1;
  let sd = 0;
  for (const v of env) sd += (v - mean) ** 2;
  sd = Math.sqrt(sd / (env.length || 1));
  let hits = 0;
  for (let i = 1; i < env.length - 1; i++) {
    if (env[i] > mean + sd && env[i] >= env[i - 1] && env[i] > env[i + 1]) hits++;
  }
  const onsetsPerSec = hits / (musicalSec || windowDur || 1);

  onProgress('מפריד הרמוניה מהקשה…', 0.55);
  const H = movAvgTime(A, 17);
  const P = movAvgFreq(A, 17);
  let ep = 0, eh = 0;
  for (let f = 0; f < A.length; f++) {
    for (let b = 0; b < A[f].length; b++) {
      const h = H[f][b] ** 2, p = P[f][b] ** 2;
      const tot = h + p || 1;
      ep += A[f][b] * (p / tot);
      eh += A[f][b] * (h / tot);
    }
  }
  const percussive = ep / (ep + eh || 1);

  onProgress('מודד בהירות ותחתונים…', 0.7);
  const binHz = SR / N_A;
  let cSum = 0, mSum = 0, sub = 0, low = 0, high = 0, total = 0;
  let logSum = 0, linSum = 0, cells = 0;
  for (const f of A) {
    for (let b = 1; b < f.length; b++) {
      const m = f[b], hz = b * binHz;
      cSum += hz * m; mSum += m; total += m;
      if (hz < 120) sub += m;
      else if (hz < 400) low += m;
      if (hz > 4000) high += m;
      logSum += Math.log(m + 1e-10); linSum += m; cells++;
    }
  }
  const centroid = mSum ? cSum / mSum : 0;
  const flatness = cells ? Math.exp(logSum / cells) / (linSum / cells || 1) : 0;

  onProgress('מזהה סולם…', 0.82);
  const B = await spectrogram(yMus.length > N_B ? yMus : y, N_B, HOP_B);
  const chroma = chromaVector(B, N_B);
  const key = estimateKey(chroma);

  /* תדר הטוניקה, מוחזר לאוקטבה שבה יושבים תדרי היסוד של המנוע */
  let tonicHz = 440 * Math.pow(2, (key.tonic - 9) / 12);
  while (tonicHz > 260) tonicHz /= 2;
  while (tonicHz < 130) tonicHz *= 2;

  onProgress('מסיים…', 0.95);
  const measured = {
    fileName: meta.fileName || 'הקלטה חיה',
    musicalSec, droppedSec,
    gateBypassed: !!gate.bypassed,
    fullDuration,
    windowStart: Math.round(windowStart),
    windowDur: Math.round(windowDur),
    bpm: Math.round(bpm * 10) / 10,
    tempoStrength: Math.round(strength * 100) / 100,
    onsetsPerSec: Math.round(onsetsPerSec * 100) / 100,
    percussive: Math.round(percussive * 1000) / 1000,
    key: `${NOTE_NAMES[key.tonic]} ${key.mode === 'minor' ? 'מינור' : 'מז\'ור'}`,
    keyLatin: `${NOTE_LATIN[key.tonic]} ${key.mode}`,
    keyMargin: Math.round(key.margin * 1000) / 1000,
    keyRunnerUp: `${NOTE_LATIN[key.runnerUp.tonic]} ${key.runnerUp.mode}`,
    mode: key.mode,
    tonicHz: Math.round(tonicHz * 100) / 100,
    centroid: Math.round(centroid),
    flatness: Math.round(flatness * 10000) / 10000,
    subRatio: Math.round((sub / (total || 1)) * 1000) / 1000,
    lowRatio: Math.round((low / (total || 1)) * 1000) / 1000,
    highRatio: Math.round((high / (total || 1)) * 1000) / 1000,
  };
  return { measured, engine: toEngine(measured) };
}

/* ------------------------------------------------------------
   התרגום: מדידות → שדות של יצירה בקטלוג.
   כאן נגמר הניתוח ומתחילה היצירה — מכאן והלאה זו מוזיקה
   מקורית שהמנוע כותב, שחולקת עם המקור טמפו, סולם ומרקם.
   ------------------------------------------------------------ */
export function toEngine(m) {
  const { bpm, percussive: pr, centroid } = m;

  let pattern = null;
  if (pr < 0.2) pattern = null;                          // אין כלי הקשה בכלל
  else if (bpm < 78) pattern = pr < 0.34 ? 'tantra' : 'embrace';
  else if (bpm < 92) pattern = pr < 0.4 ? 'heartbeat' : 'sensual';
  else if (bpm < 104) pattern = pr < 0.4 ? 'sensual' : 'organic';
  else if (bpm < 118) pattern = pr < 0.42 ? 'down' : 'house';
  else if (bpm < 134) pattern = pr > 0.5 ? 'four' : 'organic';
  else pattern = pr > 0.55 ? 'psy' : 'break';

  let timbre, flow;
  if (centroid < 800) { timbre = 'flute'; flow = true; }
  else if (centroid < 1500) { timbre = 'voice'; flow = true; }
  else if (centroid < 2400) { timbre = 'strings'; flow = true; }
  else if (centroid < 3600) { timbre = 'rhodes'; flow = false; }
  else if (centroid < 5200) { timbre = 'handpan'; flow = false; }
  else { timbre = 'crystal'; flow = false; }

  const scale = m.mode === 'minor' ? 'shaman' : 'penta';
  /* פעימה איזוכרונית בטווח אלפא-תטא, נגזרת מהאנרגיה של המקור */
  const beat = pr > 0.5 ? 10 : pr > 0.32 ? 8 : 6;

  return {
    freq: m.tonicHz,
    mode: 'isochronic',
    beat,
    bpm: pattern ? Math.round(bpm) : undefined,
    pattern: pattern || undefined,
    energy: Math.round(Math.min(0.9, 0.18 + pr * 1.1) * 100) / 100,
    pad: Math.round(Math.min(1, 0.5 + (1 - pr) * 0.55) * 100) / 100,
    melody: true,
    flow,
    melodyScale: scale,
    timbre,
    pace: Math.round(Math.max(2.2, 9 - bpm / 14) * 10) / 10,
    ambience: Math.round(Math.min(0.09, 0.03 + m.flatness * 3) * 1000) / 1000,
  };
}
