/* ============================================================
   RESONANCE · לוגיקת הממשק
   ניווט · קטלוג · נגן · מסעות מודרכים · פלייליסטים · Auto-Save
   ============================================================ */

import { TRACKS, CATEGORIES, byId, byCategory } from './catalog.js';
import { JOURNEYS, journeyById } from './journeys.js';
import { FrequencyEngine } from './engine.js';
import { MandalaVisualizer } from './visualizer.js';
import { Sequencer } from './sequencer.js';

/* ------------------------------ מצב + Auto-Save ------------------------------ */
const SAVE_KEY = 'resonance_state_v1';

function loadState() {
  const base = {
    favorites: [], recents: [], playlists: [], searches: [],
    volume: 0.7, timer: 0, instrument: 'auto', speakerMode: false,
  };
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return { ...base, ...JSON.parse(raw) };
  } catch {}
  return base;
}

const state = loadState();

function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, _savedAt: new Date().toISOString() }));
  } catch (e) { console.warn('Auto-save failed:', e); }
}
setInterval(saveState, 3000);
window.addEventListener('beforeunload', saveState);

/* ------------------------------ מנוע · ויזואלייזר · רצפים ------------------------------ */
const engine = new FrequencyEngine();
engine.setVolume(state.volume);

const vizCanvas = document.getElementById('viz');
const viz = new MandalaVisualizer(vizCanvas, engine);
const seq = new Sequencer();
let activeSeqId = null;   // journey id / playlist id שמתנגן כרגע

/* ------------------------------ עזרי DOM ------------------------------ */
const $ = id => document.getElementById(id);
const els = {
  main: $('main'), home: $('view-home'), grid: $('library-grid'), chips: $('chips'),
  search: $('search'), favList: $('fav-list'),
  searchMain: $('search-main'), searchBody: $('search-body'),
  journeysList: $('journeys-list'), playlistsList: $('playlists-list'), plCreate: $('pl-create'),
  mini: $('mini'), miniArt: $('mini-art'), miniTitle: $('mini-title'),
  miniSub: $('mini-sub'), miniPlay: $('mini-play'), miniNext: $('mini-next'),
  player: $('player'), pClose: $('p-close'), pAdd: $('p-add'), pFav: $('p-fav'),
  pJourney: $('p-journey'), pjName: $('pj-name'), pjStep: $('pj-step'), pjFill: $('pj-fill'),
  pMode: $('p-mode'), pTitle: $('p-title'), pSub: $('p-sub'), pDesc: $('p-desc'), pTags: $('p-tags'),
  pPrev: $('p-prev'), pPlay: $('p-play'), pNext: $('p-next'),
  pTimer: $('p-timer'), pInstrument: $('p-instrument'), pSpeakers: $('p-speakers'),
  pVolume: $('p-volume'),
  phonesNote: $('phones-note'),
  sheetBackdrop: $('sheet-backdrop'), sheetList: $('sheet-list'), sheetNew: $('sheet-new'),
  toast: $('toast'), toastText: $('toast-text'),
};

/* הודעת טוסט קצרה */
let toastHandle = null;
function toast(msg) {
  els.toastText.textContent = msg;
  els.toast.classList.add('show');
  if (toastHandle) clearTimeout(toastHandle);
  toastHandle = setTimeout(() => els.toast.classList.remove('show'), 2400);
}

const MODE_LABEL = {
  pure: 'תדר טהור',
  binaural: 'Binaural 🎧',
  isochronic: 'איזוכרוני · גם ברמקולים',
  melodic: 'מלודיה גנרטיבית',
};

/* ============================================================
   אייקונים וקטוריים — במקום אותיות וסמלים טקסטואליים
   ============================================================ */
const SVG = (body, sw = 1.4) =>
  `<svg class="icn" viewBox="0 0 40 40" fill="none" stroke="currentColor"
     stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

/* לוטוס בעל n עלי כותרת — הסמל המסורתי של הצ'אקרות */
const lotus = n => SVG(
  Array.from({ length: n }, (_, i) =>
    `<ellipse cx="20" cy="12" rx="3.4" ry="8"
       transform="rotate(${(360 / n) * i} 20 20)" opacity="0.9"/>`).join('') +
  `<circle cx="20" cy="20" r="3" fill="currentColor" stroke="none"/>`, 1.2);

/* גל סינוס עם n מחזורים — ככל שהתדר גבוה יותר, הגל צפוף יותר */
const wave = (n, amp = 7) => {
  let d = `M4 20`;
  const step = 32 / (n * 2);
  for (let i = 0; i < n * 2; i++) {
    d += ` q${step / 2} ${i % 2 ? amp : -amp} ${step} 0`;
  }
  return SVG(`<path d="${d}"/>`, 1.8);
};

const ICONS = {
  lotus2: lotus(2), lotus4: lotus(4), lotus6: lotus(6), lotus8: lotus(8),
  lotus10: lotus(10), lotus12: lotus(12), lotus16: lotus(16),
  delta: wave(1.5, 9), theta: wave(2.5, 8), alpha: wave(4, 6),
  beta: wave(6, 5), gamma: wave(9, 4),
  moon: SVG('<path d="M25 8a13 13 0 1 0 7 20A14 14 0 0 1 25 8z"/>'),
  sun: SVG('<circle cx="20" cy="20" r="7"/>' + Array.from({ length: 8 }, (_, i) =>
    `<line x1="20" y1="6" x2="20" y2="10" transform="rotate(${i * 45} 20 20)"/>`).join('')),
  target: SVG('<circle cx="20" cy="20" r="13"/><circle cx="20" cy="20" r="7"/><circle cx="20" cy="20" r="2" fill="currentColor" stroke="none"/>'),
  helix: SVG('<path d="M14 6c0 8 12 8 12 14S14 26 14 34"/><path d="M26 6c0 8-12 8-12 14s12 8 12 14"/><line x1="15" y1="13" x2="25" y2="13"/><line x1="15" y1="27" x2="25" y2="27"/>'),
  planet: SVG('<circle cx="20" cy="20" r="8"/><ellipse cx="20" cy="20" rx="16" ry="5" transform="rotate(-20 20 20)" opacity="0.8"/>'),
  earth: SVG('<circle cx="20" cy="20" r="13"/><ellipse cx="20" cy="20" rx="5.5" ry="13"/><line x1="7" y1="20" x2="33" y2="20"/>'),
  note: SVG('<circle cx="14" cy="28" r="4.5"/><circle cx="29" cy="24" r="4"/><path d="M18.5 28V12l14.5-4v16"/>'),
  bell: SVG('<path d="M20 7a9 9 0 0 0-9 9c0 7-3 9-3 11h24c0-2-3-4-3-11a9 9 0 0 0-9-9z"/><path d="M17 31a3 3 0 0 0 6 0"/>'),
  bowl: SVG('<path d="M7 16a13 11 0 0 0 26 0z"/><ellipse cx="20" cy="16" rx="13" ry="4"/><line x1="20" y1="6" x2="20" y2="11" opacity="0.6"/>'),
  drum: SVG('<ellipse cx="20" cy="13" rx="12" ry="5"/><path d="M8 13v13a12 5 0 0 0 24 0V13"/><line x1="10" y1="16" x2="30" y2="24" opacity="0.55"/><line x1="30" y1="16" x2="10" y2="24" opacity="0.55"/>'),
  eye: SVG('<path d="M5 20s6-9 15-9 15 9 15 9-6 9-15 9-15-9-15-9z"/><circle cx="20" cy="20" r="4.5"/>'),
  flame: SVG('<path d="M20 33c5.5 0 9-3.8 9-8.6 0-6.5-6-8-6-14.4-5 3-9 7.6-9 14.4 0 4.8 3 8.6 6 8.6z"/><path d="M20 33c-2.4 0-4-1.9-4-4.3 0-3 3-4 4-7 1.6 2.4 4 4 4 7 0 2.4-1.6 4.3-4 4.3z" opacity="0.55"/>'),
  serpent: SVG('<path d="M10 33c0-6 8-5 8-11S8 16 8 10c0-3 3-4 6-3"/><path d="M22 33c0-6 8-5 8-11s-6-6-6-10"/><circle cx="24" cy="9" r="2" fill="currentColor" stroke="none"/>'),
  spiral: SVG('<path d="M20 20a3 3 0 1 1 3 3 6 6 0 1 1-6-6 9 9 0 1 1 9 9 12 12 0 1 1-12-12"/>'),
  crown: SVG('<path d="M8 28l-2-15 8 6 6-11 6 11 8-6-2 15z"/><line x1="8" y1="32" x2="32" y2="32"/>'),
  heart: SVG('<path d="M20 32S7 24 7 16a6.6 6.6 0 0 1 13-2 6.6 6.6 0 0 1 13 2c0 8-13 16-13 16z"/>'),
  leaf: SVG('<path d="M31 9C17 9 9 15 9 25a6 6 0 0 0 6 6c10 0 16-8 16-22z"/><path d="M13 31c4-8 9-13 16-16" opacity="0.6"/>'),
  drop: SVG('<path d="M20 6c-5 7-9 11-9 16a9 9 0 0 0 18 0c0-5-4-9-9-16z"/>'),
  cloud: SVG('<path d="M12 28a6 6 0 0 1 .6-12 8.5 8.5 0 0 1 16 2 5 5 0 0 1-.6 10z"/>'),
  bolt: SVG('<path d="M22 5L10 22h8l-2 13 14-18h-8z"/>'),
  crystal: SVG('<path d="M20 5l11 9-11 21L9 14z"/><path d="M9 14h22M20 5v30" opacity="0.55"/>'),
  beads: SVG('<circle cx="20" cy="20" r="12"/>' + Array.from({ length: 10 }, (_, i) =>
    `<circle cx="20" cy="8" r="2.4" fill="currentColor" stroke="none" transform="rotate(${i * 36} 20 20)"/>`).join('')),
  om: SVG('<circle cx="20" cy="20" r="13" opacity="0.35"/><path d="M13 24c0-4 4-6 6-3s-1 6-4 5 0-9 6-9 6 5 9 5"/><circle cx="27" cy="10" r="1.8" fill="currentColor" stroke="none"/>'),
  /* טרנספורט — מלאים ולא קווים, כדי שייקראו נקי בגודל קטן */
  play: SVG('<path d="M14.5 9.8v20.4L31 20z" fill="currentColor" stroke="none" stroke-linejoin="round" stroke-width="2.6" stroke-linecap="round"/>'),
  pause: SVG('<rect x="13" y="10" width="5.2" height="20" rx="2.4" fill="currentColor" stroke="none"/><rect x="21.8" y="10" width="5.2" height="20" rx="2.4" fill="currentColor" stroke="none"/>'),
  skipPrev: SVG('<path d="M27.5 11.2v17.6L14.6 20z" fill="currentColor" stroke="none" stroke-width="2.4" stroke-linejoin="round"/><rect x="10.2" y="10.6" width="2.9" height="18.8" rx="1.45" fill="currentColor" stroke="none"/>'),
  skipNext: SVG('<path d="M12.5 11.2v17.6L25.4 20z" fill="currentColor" stroke="none" stroke-width="2.4" stroke-linejoin="round"/><rect x="26.9" y="10.6" width="2.9" height="18.8" rx="1.45" fill="currentColor" stroke="none"/>'),
  arrowUp: SVG('<line x1="20" y1="33" x2="20" y2="9"/><path d="M11 18l9-9 9 9"/>'),
  arrowDown: SVG('<line x1="20" y1="7" x2="20" y2="31"/><path d="M11 22l9 9 9-9"/>'),
  anchor: SVG('<circle cx="20" cy="9" r="3"/><line x1="20" y1="12" x2="20" y2="33"/><line x1="13" y1="17" x2="27" y2="17"/><path d="M8 24a12 12 0 0 0 24 0"/>'),
  book: SVG('<path d="M7 9h11a4 4 0 0 1 4 4v20a4 4 0 0 0-4-3H7z"/><path d="M33 9H22a4 4 0 0 0-4 4v20a4 4 0 0 1 4-3h11z"/>'),
  feather: SVG('<path d="M31 8c-11 0-19 7-19 17v7l19-19"/><line x1="8" y1="34" x2="20" y2="22"/>'),
  mountain: SVG('<path d="M4 31l10-16 6 9 5-7 11 14z"/>'),
  infinity: SVG('<path d="M12 20a5 5 0 1 1 5 5c-3 0-5-5-5-5s2-5 5-5a5 5 0 0 1 0 10"/><path d="M28 20a5 5 0 1 0-5 5c3 0 5-5 5-5s-2-5-5-5a5 5 0 0 0 0 10"/>'),
  star: SVG('<path d="M20 5l4.5 10.5L35 17l-8 7.5 2 11-9-5.5-9 5.5 2-11L5 17l10.5-1.5z"/>'),
  ripple: SVG('<circle cx="20" cy="20" r="4"/><path d="M9 12a15 15 0 0 0 0 16M31 12a15 15 0 0 1 0 16" opacity="0.75"/><path d="M4 7a22 22 0 0 0 0 26M36 7a22 22 0 0 1 0 26" opacity="0.4"/>'),
};

/* מיפוי יצירה → אייקון (מזהה קודם, אחרת קטגוריה) */
const ICON_BY_ID = {
  'chakra-root': 'lotus4', 'chakra-sacral': 'lotus6', 'chakra-solar': 'lotus10',
  'chakra-heart': 'lotus12', 'chakra-throat': 'lotus16', 'chakra-third-eye': 'lotus2',
  'chakra-crown': 'lotus8',
  'wave-delta': 'delta', 'wave-delta1': 'delta', 'wave-theta': 'theta',
  'wave-theta7': 'theta', 'wave-alpha': 'alpha', 'wave-beta': 'beta',
  'wave-gamma': 'gamma', 'wave-smr': 'beta', 'wave-hypnagogia': 'theta',
  'relief-anxiety': 'ripple', 'relief-pain': 'cloud',
  'sleep-deep': 'moon', 'sleep-moon': 'moon', 'sleep-hammock': 'wave',
  'sleep-ocean': 'drop', 'sleep-rem': 'cloud', 'sleep-powernap': 'moon',
  'sleep-blanket': 'cloud',
  'focus-deep': 'target', 'focus-flow': 'infinity', 'focus-memory': 'gamma',
  'focus-soft': 'feather', 'focus-reading': 'book', 'focus-creative': 'bolt',
  'focus-code': 'target',
  'calm-inner-quiet': 'ripple', 'calm-anger': 'flame', 'calm-emotions': 'drop',
  'calm-grounding': 'anchor', 'calm-soundbath': 'ripple',
  'love-magnet': 'heart', 'love-self': 'heart', 'love-heartbreak': 'heart',
  'love-open-heart': 'heart',
  'dna-528': 'helix', 'dna-285': 'helix', 'dna-temple': 'star',
  'dna-amplify': 'helix', 'dna-youth': 'crystal',
  'earth-schumann': 'earth', 'earth-schumann2': 'earth', 'earth-432': 'leaf',
  'earth-111': 'mountain', 'earth-om': 'om', 'planet-earth-day': 'earth',
  'planet-sun': 'sun', 'planet-moon': 'moon',
  'med-om-journey': 'om', 'med-shaman': 'drum', 'med-heart': 'heart',
  'med-silence': 'ripple', 'med-breath6': 'drop', 'med-mantra108': 'beads',
  'med-eye-storm': 'eye',
  'energy-sunrise': 'sun', 'energy-power': 'bolt', 'energy-awaken': 'star',
  'energy-abundance': 'leaf', 'energy-workout': 'flame', 'energy-spark': 'bolt',
  'sh-drum': 'drum', 'sh-ayahuasca': 'leaf', 'sh-vision': 'eye',
  'sh-serpent': 'serpent', 'sh-firecircle': 'flame', 'sh-datura': 'lotus8',
  'sh-ancestors': 'mountain', 'sh-peyote': 'spiral', 'sh-trance': 'drum',
  'sh-dmt': 'star', 'sh-underworld': 'arrowDown', 'sh-upperworld': 'arrowUp',
  'sh-vision-deep': 'crystal', 'sh-vision-far': 'bowl', 'sh-vision-light': 'star',
  'amb-innerspace': 'ripple', 'amb-cosmos': 'star', 'amb-nebula': 'cloud',
  'amb-dawn': 'sun', 'amb-void': 'ripple', 'amb-drift': 'drop',
  'amb-stars': 'star', 'amb-deepspace': 'delta', 'amb-vision': 'eye',
  'amb-timeless': 'infinity',
  'mel-bells-528': 'bell', 'mel-harp-432': 'note', 'mel-kalimba-639': 'note',
  'mel-temple-963': 'bell', 'mel-musicbox-396': 'note', 'mel-handpan-174': 'bowl',
  'mel-chimes-om': 'om', 'mel-wind-852': 'feather', 'mel-lullaby-285': 'moon',
  'mel-creation-417': 'spiral', 'mel-earth-194': 'earth', 'mel-crystal-741': 'crystal',
  'ps-kaleido': 'star', 'ps-reverse': 'spiral', 'ps-spiral': 'ripple',
  'ps-mirror': 'crystal', 'ps-liquid': 'drop', 'ps-fractal': 'star',
  'ps-dissolve': 'lotus12', 'ps-alien': 'eye',
  'tk-warmup': 'alpha', 'tk-groove': 'beta', 'tk-drive': 'bolt',
  'tk-peak': 'gamma', 'tk-acid': 'bolt', 'tk-hypnotic': 'target',
  'tk-dark': 'mountain', 'tk-trance': 'star', 'tk-hardpeak': 'flame',
  'tk-afterhours': 'moon', 'tk-schumann': 'earth',
  'tk-psy': 'spiral', 'tk-goa': 'star', 'tk-fullon': 'flame',
  'tk-dub': 'ripple', 'tk-dubdeep': 'ripple', 'tk-dnb': 'bolt',
  'tk-break': 'bolt', 'tk-tribal': 'drum', 'tk-afro': 'drum',
  'tk-triphop': 'cloud', 'tk-downtempo': 'moon', 'tk-prog': 'crystal',
  'sch-melodic': 'bowl', 'sch-psyche': 'spiral', 'sch-speaker': 'ripple',
  'bowl-crystal-528': 'crystal', 'bowl-crystal-963': 'crystal', 'bowl-water': 'drop',
  'bowl-set-7': 'bowl', 'bowl-gong': 'ripple', 'bowl-tibetan': 'bowl',
  'mantra-om': 'om', 'mantra-kargyraa': 'mountain', 'mantra-sygyt': 'feather',
  'mantra-108': 'beads', 'mantra-gayatri': 'sun', 'mantra-monk': 'book',
};
const ICON_BY_CATEGORY = {
  chakra: 'lotus8', brainwave: 'alpha', sleep: 'moon', focus: 'target',
  calm: 'ripple', love: 'heart', dna: 'helix', planets: 'planet',
  earth: 'earth', meditation: 'om', energy: 'sun', melodic: 'note',
  shaman: 'drum', bowls: 'bowl', mantra: 'beads',
  psychedelic: 'spiral', schumann: 'earth', techno: 'bolt', ambient: 'ripple',
};

/* אייקון למסע — חלק מהסמלים הטקסטואליים לא נתמכים בכל הפונטים */
const JOURNEY_ICON = {
  'journey-chakras': 'lotus8', 'journey-chakra-express': 'bolt',
  'journey-sleep': 'moon', 'journey-full-night': 'moon', 'journey-powernap': 'moon',
  'journey-musical-sleep': 'note', 'journey-morning': 'sun', 'journey-wakeup': 'sun',
  'journey-solfeggio': 'note', 'journey-solfeggio-down': 'arrowDown',
  'journey-focus': 'target', 'journey-exam': 'book', 'journey-creativity': 'bolt',
  'journey-healing': 'helix', 'journey-pain': 'cloud', 'journey-detox': 'drop',
  'journey-meditation': 'om', 'journey-planets': 'planet',
  'journey-sos-calm': 'ripple', 'journey-pretraining': 'flame',
  'journey-lucid': 'cloud', 'journey-love': 'heart', 'journey-couple': 'heart',
  'journey-grief': 'feather', 'journey-abundance': 'leaf', 'journey-nature': 'leaf',
  'journey-intuition': 'eye', 'journey-confidence': 'crown', 'journey-gratitude': 'beads',
  'journey-concert': 'note',
  'journey-shaman-classic': 'drum', 'journey-shaman-short': 'drum',
  'journey-psychedelic': 'spiral', 'journey-fire-ceremony': 'flame',
  'journey-kundalini': 'serpent', 'journey-vision-quest': 'eye',
  'journey-soundbath': 'bowl', 'journey-monastery': 'om',
  'journey-throat': 'mountain', 'journey-japa': 'beads',
  'journey-dissolve': 'star', 'journey-backwards': 'spiral',
  'journey-schumann-ladder': 'earth', 'journey-earth-pulse': 'earth',
  'journey-warped-earth': 'spiral',
  'journey-techno-rise': 'bolt', 'journey-techno-peak': 'bolt',
  'journey-techno-night': 'moon', 'journey-techno-hypnotic': 'target',
  'journey-techno-workout': 'flame',
  'journey-psytrance': 'spiral', 'journey-dub-session': 'ripple',
  'journey-tribal-fire': 'drum', 'journey-breaks': 'bolt',
  'journey-chillout': 'cloud', 'journey-genres': 'infinity',
  'journey-run': 'flame',
  'journey-vision-hour': 'eye', 'journey-inner-space': 'ripple',
  'journey-deep-ambient': 'cloud', 'journey-ambient-dawn': 'sun',
  'journey-ambient-night': 'moon',
};
const journeyIcon = j => ICONS[JOURNEY_ICON[j.id]] || j.glyph;

/* צבע hex → rgba עם שקיפות */
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/* דיסק מנדלה — טבעות תהודה קונצנטריות סביב ליבה זוהרת, לא עיגול צבע אחיד */
function artHTML(t) {
  const [c0, c1] = t.colors;
  const bg = [
    `repeating-radial-gradient(circle at 50% 50%, transparent 0 5.5%, ${hexA(c0, 0.22)} 5.5% 6.3%)`,
    `conic-gradient(from 210deg, ${hexA(c0, 0.26)}, ${hexA(c1, 0.06)} 30%, ${hexA(c0, 0.26)} 55%, ${hexA(c1, 0.06)} 80%, ${hexA(c0, 0.26)})`,
    `radial-gradient(circle at 50% 50%, ${hexA(c0, 0.5)} 0%, transparent 45%)`,
    `radial-gradient(circle at 50% 50%, #15151f 0%, #07070d 100%)`,
  ].join(',');
  const badge = t.mode === 'binaural' ? '🎧' : t.mode === 'melodic' ? '♬' : '';
  /* אם הסמל הוא ממילא המספר — לא לחזור עליו פעמיים */
  const glyphIsFreq = t.glyph === String(t.freq);
  const hz = glyphIsFreq
    ? (t.beat ? `+${t.beat}Hz` : '')
    : `${t.freq}Hz${t.beat ? ` +${t.beat}` : ''}`;
  return `
    <div class="art" style="background:${bg}; --ring:${hexA(c0, 0.55)}; --glow:${hexA(c0, 0.4)}">
      <div class="art-core" style="background: radial-gradient(circle, #fff 0%, ${hexA(c0, 0.9)} 45%, transparent 72%)"></div>
      <div class="art-label">
        ${glyphIsFreq
          ? `<span class="glyph">${t.glyph}</span>`
          : ICONS[ICON_BY_ID[t.id] || ICON_BY_CATEGORY[t.category]] || `<span class="glyph">${t.glyph}</span>`}
        ${hz ? `<span class="hz">${hz}</span>` : ''}
      </div>
      ${badge ? `<span class="phones">${badge}</span>` : ''}
      <div class="eq"><span></span><span></span><span></span><span></span></div>
    </div>`;
}

/* הדיסק כבר מציג את התדר — אין טעם לחזור עליו בכותרת הכרטיס */
const shortTitle = t => t.title.replace(/\s*—\s*[\d.]+Hz\s*$/, '');

function cardHTML(t) {
  return `
    <div class="card" data-id="${t.id}">
      ${artHTML(t)}
      <div class="card-title">${shortTitle(t)}</div>
      <div class="card-sub">${t.sub}</div>
    </div>`;
}

/* ------------------------------ בית ------------------------------ */
function tileHTML(t) {
  return `
    <div class="tile" data-id="${t.id}">
      ${artHTML(t)}
      <div class="tile-meta">
        <div class="tile-title">${shortTitle(t)}</div>
        <div class="tile-sub">${t.sub}</div>
      </div>
    </div>`;
}

function renderHome() {
  const hero = byId['dna-528'] || TRACKS[0];
  const recents = state.recents.map(id => byId[id]).filter(Boolean);
  /* אריחי קיצור — אחרונים, ומושלם בנבחרות אם אין מספיק */
  const quick = [...recents, ...byCategory('featured').filter(t => !recents.includes(t))].slice(0, 6);

  let html = `
    <div class="hero" data-id="${hero.id}">
      <div class="hero-label">✦ יצירת היום</div>
      <div class="hero-title">${hero.title}</div>
      <div class="hero-sub">${hero.desc}</div>
      <button class="hero-btn">▶ &nbsp;התחל האזנה</button>
    </div>
    <div class="tiles">${quick.map(tileHTML).join('')}</div>`;

  /* מסעות מומלצים — כרטיסים רחבים ישר במסך הבית */
  const picks = [
    'journey-techno-rise', 'journey-chakras', 'journey-psychedelic',
    'journey-soundbath', 'journey-genres', 'journey-sleep',
    'journey-shaman-classic', 'journey-schumann-ladder',
  ].map(id => journeyById[id]).filter(Boolean);

  html += `
    <div class="section">
      <div class="section-head">
        <div class="section-title"><span class="sec-icon">✦</span>מסעות מומלצים</div>
        <button class="section-more" data-goto-journeys="1">הכול ←</button>
      </div>
      <div class="row">${picks.map(j => `
        <div class="jcard-mini" data-journey="${j.id}"
             style="background: linear-gradient(140deg, ${j.colors[0]}, ${j.colors[1]})">
          <span class="jm-icon">${journeyIcon(j)}</span>
          <div class="jm-title">${j.title}</div>
          <div class="jm-sub">${j.sub}</div>
        </div>`).join('')}</div>
    </div>`;

  for (const cat of CATEGORIES) {
    html += sectionHTML(cat, byCategory(cat.id));
  }
  els.home.innerHTML = html;
}

function sectionHTML(cat, tracks) {
  if (!tracks.length) return '';
  return `
    <div class="section">
      <div class="section-head">
        <div class="section-title"><span class="sec-icon">${cat.icon}</span>${cat.label}</div>
        ${cat.id !== 'recents' ? `<button class="section-more" data-cat="${cat.id}">הכול ←</button>` : ''}
      </div>
      <div class="row">${tracks.map(cardHTML).join('')}</div>
    </div>`;
}

/* ------------------------------ ספרייה ------------------------------ */
let activeChip = 'all';

function renderChips() {
  const all = [{ id: 'all', label: 'הכול', icon: '' }, ...CATEGORIES.filter(c => c.id !== 'featured')];
  els.chips.innerHTML = all.map(c =>
    `<button class="chip ${c.id === activeChip ? 'active' : ''}" data-chip="${c.id}">${c.label}</button>`
  ).join('');
}

function renderLibrary() {
  const q = els.search.value.trim();
  let tracks = activeChip === 'all' ? TRACKS : byCategory(activeChip);
  if (q) {
    tracks = tracks.filter(t =>
      [t.title, t.sub, t.desc, String(t.freq), ...(t.tags || [])].join(' ').includes(q)
    );
  }
  els.grid.innerHTML = tracks.length
    ? tracks.map(cardHTML).join('')
    : '<div class="empty-note" style="grid-column:1/-1">לא נמצאו יצירות תואמות</div>';
  markPlaying();
}

/* ============================================================
   חיפוש — סורק יצירות ומסעות כאחד
   ============================================================ */
const MODE_WORDS = {
  pure: 'תדר טהור טונים',
  binaural: 'בינאורלי binaural אוזניות גלי מוח',
  isochronic: 'איזוכרוני isochronic פעימות רמקולים',
  melodic: 'מלודיה מלודי מנגינה מוזיקה גנרטיבי',
};
const SCALE_WORDS = {
  penta: 'פנטטוני', shaman: 'שאמאני פריגי', psyche: 'פסיכדלי ספטימלי',
  warp: 'פסיכדלי מעוות מיקרוטונלי',
};
const PATTERN_WORDS = {
  four: 'טכנו האוס four on the floor',
  psy: 'פסייטראנס psytrance גואה goa פול-און טראנס',
  break: 'ברייקביט breakbeat דראם אנד בס dnb שבור',
  dub: 'דאב dub מינימל מרחב ברלין',
  tribal: 'שבטי tribal אפרו afro פרקושן תופים',
  down: 'דאון-טמפו downtempo טריפ-הופ trip hop איטי צ\'יל',
};
const CAT_LABEL = Object.fromEntries(CATEGORIES.map(c => [c.id, c.label]));

const norm = s => String(s).toLowerCase().replace(/["'׳״]/g, '').replace(/\s+/g, ' ').trim();

/* אינדקס חיפוש — נבנה פעם אחת */
const TRACK_INDEX = TRACKS.map(t => ({
  t,
  hay: norm([
    t.title, t.sub, t.desc, (t.tags || []).join(' '), CAT_LABEL[t.category],
    MODE_WORDS[t.mode], SCALE_WORDS[t.scale] || '', SCALE_WORDS[t.melodyScale] || '',
    t.timbre || '', t.melody ? 'מלודיה' : '', t.pad ? 'פאד אמביינט ambient מרחב ארוך' : '',
    t.bpm ? `${t.bpm} bpm טכנו קצב ריקוד ${PATTERN_WORDS[t.pattern] || ''}` : '',
  ].join(' ')),
  nums: [String(t.freq), t.beat ? String(t.beat) : '', t.bpm ? String(t.bpm) : ''].filter(Boolean),
}));

/* המסע יורש גם את התגיות והקטגוריות של השלבים שלו,
   כך ש"פסיכדלי" ימצא מסע שבנוי מיצירות פסיכדליות גם בלי המילה בכותרת */
const JOURNEY_INDEX = JOURNEYS.map(j => {
  const steps = j.steps.map(s => byId[s.id]).filter(Boolean);
  return {
    j,
    hay: norm([
      j.title, j.sub, j.desc,
      steps.map(t => t.title).join(' '),
      steps.map(t => (t.tags || []).join(' ')).join(' '),
      [...new Set(steps.map(t => CAT_LABEL[t.category]))].join(' '),
      [...new Set(steps.map(t => SCALE_WORDS[t.scale] || SCALE_WORDS[t.melodyScale] || ''))].join(' '),
    ].join(' ')),
    nums: steps.map(t => String(t.freq)),
  };
});

/* גזירה קלה של סופיות עבריות — "צאקרה" ימצא גם "צאקרות" */
function stems(tok) {
  const out = [tok];
  if (tok.length >= 5) {
    for (const suf of ['ות', 'ים', 'יות']) {
      if (tok.endsWith(suf)) out.push(tok.slice(0, -suf.length));
    }
  }
  if (tok.length >= 4 && /[התי]$/.test(tok)) out.push(tok.slice(0, -1));
  return out;
}

function matches(entry, tokens) {
  return tokens.every(tok =>
    (/^[\d.]+$/.test(tok)
      ? entry.nums.some(n => n.startsWith(tok)) || entry.hay.includes(tok)
      : stems(tok).some(s => entry.hay.includes(s)))
  );
}

function searchAll(q) {
  const tokens = norm(q).split(' ').filter(Boolean);
  if (!tokens.length) return { tracks: [], journeys: [] };
  return {
    journeys: JOURNEY_INDEX.filter(e => matches(e, tokens)).map(e => e.j),
    tracks: TRACK_INDEX.filter(e => matches(e, tokens)).map(e => e.t),
  };
}

const SUGGESTIONS = [
  '528', 'שינה', 'צ\'אקרות', 'פסיכדלי', 'שומאן', 'מדיטציה',
  'ריכוז', 'חרדה', 'מלודיה', 'קערות', 'שאמאני', 'אהבה', '432', 'גמא',
];

function journeyRowHTML(j) {
  return `
    <div class="list-item" data-journey="${j.id}">
      <div class="pl-art" style="background: linear-gradient(140deg, ${j.colors[0]}, ${j.colors[1]}); color:#fff">${journeyIcon(j)}</div>
      <div class="li-meta">
        <div class="li-title">${j.title}</div>
        <div class="li-sub">${j.sub}</div>
      </div>
    </div>`;
}

function renderSearch() {
  const q = els.searchMain.value.trim();
  const body = els.searchBody;

  if (!q) {
    const recents = (state.searches || []).slice(0, 8);
    body.innerHTML = `
      ${recents.length ? `
        <div class="j-intro"><div class="j-intro-title">חיפושים אחרונים</div></div>
        <div class="chips wrap">
          ${recents.map(s => `<button class="chip" data-q="${s}">${s}</button>`).join('')}
          <button class="chip" data-clear-searches="1">נקה</button>
        </div>` : ''}
      <div class="j-intro" style="margin-top:${recents.length ? 18 : 4}px">
        <div class="j-intro-title">חיפושים פופולריים</div>
        <div class="j-intro-sub">חפשו לפי תדר (528), מטרה (שינה), תחושה (חרדה) או שם מסע.</div>
      </div>
      <div class="chips wrap">${SUGGESTIONS.map(s => `<button class="chip" data-q="${s}">${s}</button>`).join('')}</div>`;
    return;
  }

  const { tracks, journeys } = searchAll(q);
  if (!tracks.length && !journeys.length) {
    body.innerHTML = `<div class="empty-note">לא נמצאו תוצאות עבור "${q}".<br>נסו תדר (528), מטרה (שינה) או תחושה (רוגע).</div>`;
    return;
  }
  body.innerHTML = `
    ${journeys.length ? `
      <div class="section-head" style="padding-top:12px">
        <div class="section-title"><span class="sec-icon">✦</span>מסעות</div>
        <span class="section-more">${journeys.length}</span>
      </div>
      <div class="list">${journeys.slice(0, 12).map(journeyRowHTML).join('')}</div>` : ''}
    ${tracks.length ? `
      <div class="section-head" style="padding-top:14px">
        <div class="section-title"><span class="sec-icon">♪</span>יצירות</div>
        <span class="section-more">${tracks.length}</span>
      </div>
      <div class="grid">${tracks.slice(0, 60).map(cardHTML).join('')}</div>` : ''}`;
  markPlaying();
}

/* שמירת חיפוש מוצלח להיסטוריה */
let searchSaveTimer = null;
function rememberSearch(q) {
  q = q.trim();
  if (q.length < 2) return;
  state.searches = [q, ...(state.searches || []).filter(s => s !== q)].slice(0, 10);
  saveState();
}

/* ------------------------------ מועדפים ------------------------------ */
function renderFavorites() {
  const favs = state.favorites.map(id => byId[id]).filter(Boolean);
  els.favList.innerHTML = favs.length
    ? favs.map(t => `
        <div class="list-item" data-id="${t.id}">
          ${artHTML(t)}
          <div class="li-meta">
            <div class="li-title">${t.title}</div>
            <div class="li-sub">${t.sub}</div>
          </div>
          <button class="li-fav" data-unfav="${t.id}" aria-label="הסרה ממועדפים">♥</button>
        </div>`).join('')
    : '<div class="empty-note">עדיין אין מועדפים.<br>לחצו ♡ בנגן כדי לשמור יצירות שאהבתם.</div>';
  markPlaying();
}

function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i >= 0) { state.favorites.splice(i, 1); toast('הוסר מהמועדפים'); }
  else { state.favorites.unshift(id); toast('נשמר במועדפים ♥'); }
  saveState();
  renderFavorites();
  updatePlayerFavButton();
}

/* ------------------------------ מסעות מודרכים ------------------------------ */
function journeyCardHTML(j) {
  const playing = activeSeqId === j.id && seq.active;
  const dots = j.steps.map((_, i) => {
    let cls = '';
    if (playing) cls = i < seq.index ? 'done' : i === seq.index ? 'now' : '';
    return `<i class="${cls}"></i>`;
  }).join('');
  return `
    <div class="journey-card ${playing ? 'playing' : ''}" data-journey="${j.id}"
         style="background: linear-gradient(140deg, ${j.colors[0]}, ${j.colors[1]})">
      <span class="jc-glyph">${journeyIcon(j)}</span>
      <div class="jc-title">${j.title}</div>
      <div class="jc-sub">${playing ? `● מתנגן · שלב ${seq.index + 1}/${j.steps.length}` : `${j.sub} · ♬ עם מלודיה`}</div>
      <div class="jc-desc">${j.desc}</div>
      <div class="jc-steps">${dots}</div>
    </div>`;
}

function renderJourneys() {
  els.journeysList.innerHTML = JOURNEYS.map(journeyCardHTML).join('');
}

/* ------------------------------ פלייליסטים ------------------------------ */
let expandedPlaylist = null;

function playlistById(id) { return state.playlists.find(p => p.id === id); }

function renderPlaylists() {
  els.playlistsList.innerHTML = state.playlists.length
    ? state.playlists.map(p => {
        const playing = activeSeqId === p.id && seq.active;
        const expanded = expandedPlaylist === p.id;
        const tracks = p.tracks.map(id => byId[id]).filter(Boolean);
        return `
        <div class="list-item ${playing ? 'playing' : ''} ${expanded ? 'expanded' : ''}" data-playlist="${p.id}">
          <div class="pl-art">${playing ? '▶' : '♪'}</div>
          <div class="li-meta">
            <div class="li-title">${p.name}</div>
            <div class="li-sub">${tracks.length} יצירות · ${p.stepMin} דק' לתדר${playing ? ` · שלב ${seq.index + 1}/${tracks.length}` : ''}</div>
          </div>
          <div class="pl-actions">
            <button class="pl-btn" data-pl-edit="${p.id}" aria-label="עריכה">${expanded ? '⌃' : '✎'}</button>
            <button class="pl-btn" data-pl-del="${p.id}" aria-label="מחיקה">✕</button>
          </div>
          <div class="pl-detail">
            ${tracks.length ? tracks.map(t => `
              <div class="pl-track">
                <span class="t-name">${t.title}</span>
                <span class="t-hz">${t.freq}Hz</span>
                <button class="pl-remove" data-pl-remove="${p.id}:${t.id}" aria-label="הסרה">✕</button>
              </div>`).join('') : '<div class="pl-track"><span class="t-name" style="color: var(--text-faint)">הפלייליסט ריק — הוסיפו יצירות דרך + בנגן</span></div>'}
            <div class="pl-durs">
              <span class="d-label">משך לכל תדר:</span>
              ${[3, 5, 10].map(m => `<button class="d-chip ${p.stepMin === m ? 'active' : ''}" data-pl-dur="${p.id}:${m}">${m} דק'</button>`).join('')}
            </div>
          </div>
        </div>`;
      }).join('')
    : '<div class="empty-note" style="padding: 24px 30px">אין עדיין פלייליסטים — צרו אחד למטה,<br>ואז הוסיפו יצירות עם כפתור + בנגן.</div>';
}

function createPlaylist() {
  const name = (prompt('שם הפלייליסט החדש:') || '').trim();
  if (!name) return null;
  const p = { id: 'pl-' + Date.now().toString(36), name, tracks: [], stepMin: 5 };
  state.playlists.unshift(p);
  saveState();
  renderPlaylists();
  toast(`הפלייליסט "${name}" נוצר`);
  return p;
}

function addToPlaylist(plId, trackId) {
  const p = playlistById(plId);
  if (!p) return;
  if (p.tracks.includes(trackId)) { toast('היצירה כבר בפלייליסט'); return; }
  p.tracks.push(trackId);
  saveState();
  renderPlaylists();
  toast(`נוסף אל "${p.name}" ♪`);
}

/* ------------------------------ Bottom Sheet ------------------------------ */
function openSheet() {
  const t = engine.current || lastTrack;
  if (!t) return;
  els.sheetList.innerHTML = state.playlists.length
    ? state.playlists.map(p => `
        <button class="sheet-item" data-sheet-pl="${p.id}">
          <span class="s-icon">♪</span>${p.name}
          <span class="s-count">${p.tracks.length} יצירות</span>
        </button>`).join('')
    : '<div class="empty-note" style="padding: 14px">אין עדיין פלייליסטים</div>';
  els.sheetBackdrop.hidden = false;
}
function closeSheet() { els.sheetBackdrop.hidden = true; }

els.sheetBackdrop.addEventListener('click', e => {
  if (e.target === els.sheetBackdrop) closeSheet();
  const item = e.target.closest('[data-sheet-pl]');
  if (item) {
    const t = engine.current || lastTrack;
    if (t) addToPlaylist(item.dataset.sheetPl, t.id);
    closeSheet();
  }
});
els.sheetNew.addEventListener('click', () => {
  const p = createPlaylist();
  const t = engine.current || lastTrack;
  if (p && t) { addToPlaylist(p.id, t.id); }
  closeSheet();
});
els.pAdd.addEventListener('click', openSheet);

/* ------------------------------ ניווט ------------------------------ */
const PAGE_TITLE = {
  home: 'בית', journeys: 'מסעות', search: 'חיפוש', library: 'ספרייה',
  favorites: 'מועדפים', about: 'אודות',
};

function switchView(view) {
  document.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.view === view));
  $('page-title').textContent = PAGE_TITLE[view];
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  $(`view-${view}`).classList.add('active');
  if (view === 'favorites') renderFavorites();
  if (view === 'library') renderLibrary();
  if (view === 'journeys') { renderJourneys(); renderPlaylists(); }
  if (view === 'search') {
    renderSearch();
    setTimeout(() => els.searchMain.focus(), 120);
  }
  els.main.scrollTo({ top: 0 });
}

document.querySelectorAll('.tab').forEach(tab =>
  tab.addEventListener('click', () => switchView(tab.dataset.view)));

$('btn-about').addEventListener('click', () => switchView('about'));

/* הקלדה בחיפוש — רינדור מיידי, שמירה להיסטוריה אחרי הפוגה */
els.searchMain.addEventListener('input', () => {
  renderSearch();
  if (searchSaveTimer) clearTimeout(searchSaveTimer);
  searchSaveTimer = setTimeout(() => rememberSearch(els.searchMain.value), 1400);
});

/* ------------------------------ נגינה ------------------------------ */
let lastTrack = null;

/* החלת יצירה על המנוע והממשק — משותף לנגינה בודדת ולרצפים */
async function applyTrack(track) {
  await engine.play(track);
  viz.setColors(track.colors);
  state.recents = [track.id, ...state.recents.filter(id => id !== track.id)].slice(0, 12);
  saveState();
  updateMini(track);
  updatePlayerView(track);
  markPlaying();
  updateMediaSession(track);
}

/* נגינה בודדת — עוצרת כל רצף פעיל */
async function playTrack(track) {
  if (seq.active) seq.stop();
  await applyTrack(track);
  armTimer();
}

function stopPlayback() {
  if (seq.active) seq.stop();
  engine.stop();
  clearTimer();
  updatePlayButtons();
  markPlaying();
}

function updatePlayButtons() {
  const icon = engine.isPlaying ? ICONS.pause : ICONS.play;
  els.pPlay.innerHTML = icon;
  els.miniPlay.innerHTML = icon;
}

function markPlaying() {
  const id = engine.current?.id;
  document.querySelectorAll('.card, .tile, .list-item[data-id]').forEach(el =>
    el.classList.toggle('playing', el.dataset.id === id)
  );
}

/* ------------------------------ רצפים: מסעות + פלייליסטים ------------------------------ */
function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

seq.onStep = async track => {
  await applyTrack(track);
  updateJourneyUI();
  refreshSeqViews();
};

seq.onTick = (remaining, total) => {
  els.pjFill.style.width = `${((total - remaining) / total) * 100}%`;
  els.pjStep.textContent = `שלב ${seq.index + 1}/${seq.total} · נותרו ${fmtTime(remaining)}`;
};

seq.onEnd = completed => {
  if (completed) {
    engine.fadeOutAndStop(8);
    toast('המסע הושלם ✨');
    setTimeout(() => { updatePlayButtons(); markPlaying(); refreshSeqViews(); }, 8500);
  }
  activeSeqId = null;
  updateJourneyUI();
  refreshSeqViews();
};

function updateJourneyUI() {
  const on = seq.active;
  els.pJourney.hidden = !on;
  els.pPrev.hidden = !on;
  els.pNext.hidden = !on;
  if (on) {
    els.pjName.textContent = seq.name;
    els.pjFill.style.width = '0%';
  }
}

function refreshSeqViews() {
  if ($('view-journeys').classList.contains('active')) { renderJourneys(); renderPlaylists(); }
}

function startJourney(j) {
  activeSeqId = j.id;
  /* כל שלב במסע מקבל שכבת מלודיה גנרטיבית מעל התדר הפעיל */
  seq.start(j.title, j.steps.map(s => ({
    track: { ...byId[s.id], melody: true },
    seconds: Math.round(s.min * 60),
  })));
  armTimer();
  openPlayer();
  toast(`המסע "${j.title}" יצא לדרך ✦♬`);
}

function startPlaylist(p) {
  const tracks = p.tracks.map(id => byId[id]).filter(Boolean);
  if (!tracks.length) { toast('הפלייליסט ריק — הוסיפו יצירות דרך + בנגן'); return; }
  activeSeqId = p.id;
  seq.start(p.name, tracks.map(t => ({ track: t, seconds: p.stepMin * 60 })));
  armTimer();
  openPlayer();
  toast(`מנגן את "${p.name}" ♪`);
}

els.pNext.addEventListener('click', () => seq.next());
els.pPrev.addEventListener('click', () => seq.prev());

/* ------------------------------ מיני-נגן ------------------------------ */
function updateMini(track) {
  lastTrack = track;
  els.mini.classList.add('visible');
  const tmp = document.createElement('div');
  tmp.innerHTML = artHTML(track);
  const newArt = tmp.firstElementChild;
  newArt.id = 'mini-art';
  els.miniArt.replaceWith(newArt);
  els.miniArt = newArt;
  els.miniTitle.textContent = track.title;
  els.miniSub.textContent = seq.active ? `${seq.name} · שלב ${seq.index + 1}/${seq.total}` : track.sub;
  els.miniNext.hidden = !seq.active;
  updatePlayButtons();
}

els.mini.addEventListener('click', e => {
  if (e.target.closest('#mini-play') || e.target.closest('#mini-next')) return;
  if (lastTrack) openPlayer();
});
els.miniNext.addEventListener('click', () => seq.next());
els.miniPlay.addEventListener('click', async () => {
  if (engine.isPlaying) stopPlayback();
  else if (lastTrack) await playTrack(lastTrack);
});

/* ------------------------------ נגן מלא ------------------------------ */
function openPlayer() {
  els.player.classList.add('open');
  viz.start();
  setTimeout(() => viz._resize(), 80); // אחרי טרנזישן הפתיחה
}
function closePlayer() {
  els.player.classList.remove('open');
  setTimeout(() => { if (!els.player.classList.contains('open')) viz.stop(); }, 600);
}

function updatePlayerView(track) {
  const melodySuffix = track.melody && track.mode !== 'melodic' ? ' · ♬ מלודיה חיה' : '';
  const bpmSuffix = track.bpm ? ` · ${track.bpm} BPM` : '';
  /* במצב רמקולים ביט בינאורלי מוגש כפעימות — משקפים את זה בממשק */
  const converted = state.speakerMode && track.mode === 'binaural';
  const modeLabel = converted ? 'מותאם לרמקולים · פעימות' : MODE_LABEL[track.mode];
  els.pMode.textContent =
    `${modeLabel} · ${track.freq}Hz${track.beat ? ` +${track.beat}` : ''}${bpmSuffix}${melodySuffix}`;
  els.pTitle.textContent = track.title;
  els.pSub.textContent = track.sub;
  els.pDesc.textContent = track.desc;
  els.pTags.innerHTML = (track.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');
  els.phonesNote.classList.toggle('visible', track.mode === 'binaural' && !state.speakerMode);
  updateJourneyUI();
  updatePlayerFavButton();
  updatePlayButtons();
}

function updatePlayerFavButton() {
  const id = (engine.current || lastTrack)?.id;
  const on = id && state.favorites.includes(id);
  els.pFav.textContent = on ? '♥' : '♡';
  els.pFav.classList.toggle('on', !!on);
}

els.pClose.addEventListener('click', closePlayer);
els.pFav.addEventListener('click', () => {
  const t = engine.current || lastTrack;
  if (t) toggleFavorite(t.id);
});
els.pPlay.addEventListener('click', async () => {
  if (engine.isPlaying) stopPlayback();
  else if (lastTrack) await playTrack(lastTrack);
});
els.pVolume.addEventListener('input', () => {
  const v = parseFloat(els.pVolume.value);
  engine.setVolume(v);
  state.volume = v;
});

/* ------------------------------ מצב רמקולים ------------------------------ */
els.pSpeakers.addEventListener('click', async () => {
  state.speakerMode = !state.speakerMode;
  engine.speakerMode = state.speakerMode;
  saveState();
  updateSpeakerButton();
  if (engine.current) await applyTrack(engine.current);
  toast(state.speakerMode
    ? 'מצב רמקולים — ביטים בינאורליים מוגשים כפעימות'
    : 'מצב אוזניות — ביטים בינאורליים מלאים 🎧');
});

function updateSpeakerButton() {
  els.pSpeakers.textContent = state.speakerMode ? '🔈 רמקולים' : '🎧 אוזניות';
  els.pSpeakers.classList.toggle('armed', state.speakerMode);
}

/* ------------------------------ בחירת כלי נגינה ------------------------------ */
const INSTRUMENTS = [
  { id: 'auto',     label: 'אוטומטי' },
  { id: 'bell',     label: 'פעמונים' },
  { id: 'kalimba',  label: 'קלימבה' },
  { id: 'harp',     label: 'נבל' },
  { id: 'handpan',  label: 'הנדפאן' },
  { id: 'crystal',  label: 'קערת קריסטל' },
  { id: 'throat',   label: 'שירת גרון' },
];

function instrumentLabel() {
  const i = INSTRUMENTS.find(x => x.id === state.instrument) || INSTRUMENTS[0];
  return `כלי: ${i.label}`;
}

els.pInstrument.addEventListener('click', async () => {
  const i = INSTRUMENTS.findIndex(x => x.id === state.instrument);
  state.instrument = INSTRUMENTS[(i + 1) % INSTRUMENTS.length].id;
  engine.instrument = state.instrument;
  saveState();
  els.pInstrument.textContent = instrumentLabel();
  els.pInstrument.classList.toggle('armed', state.instrument !== 'auto');
  /* מחילים מיד על מה שמתנגן — הרצף ממשיך לספור בלי הפרעה */
  if (engine.current) await applyTrack(engine.current);
  toast(instrumentLabel());
});

/* ------------------------------ טיימר עם fade לשינה ------------------------------ */
const TIMER_STEPS = [0, 10, 20, 30, 60]; // דקות; 0 = אינסוף
let timerHandle = null;

function timerLabel() {
  return state.timer ? `טיימר ${state.timer} דק'` : 'טיימר ∞';
}

els.pTimer.addEventListener('click', () => {
  const i = TIMER_STEPS.indexOf(state.timer);
  state.timer = TIMER_STEPS[(i + 1) % TIMER_STEPS.length];
  saveState();
  els.pTimer.textContent = timerLabel();
  els.pTimer.classList.toggle('armed', !!state.timer);
  armTimer();
  toast(state.timer ? `הצליל ייעצר בעדינות בעוד ${state.timer} דקות` : 'נגינה ללא הגבלה');
});

function armTimer() {
  clearTimer();
  if (state.timer && engine.isPlaying) {
    timerHandle = setTimeout(() => {
      if (seq.active) seq.stop();
      engine.fadeOutAndStop(10);
      toast('לילה טוב ✨');
      setTimeout(() => { updatePlayButtons(); markPlaying(); }, 10500);
    }, state.timer * 60 * 1000);
  }
}
function clearTimer() {
  if (timerHandle) { clearTimeout(timerHandle); timerHandle = null; }
}

/* ------------------------------ Media Session (מסך נעילה) ------------------------------ */
function updateMediaSession(track) {
  if (!('mediaSession' in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: seq.active ? `RESONANCE · ${seq.name}` : `RESONANCE · ${track.sub}`,
    album: 'תדרים לאיזון הגוף והנשמה',
  });
  navigator.mediaSession.setActionHandler('play', () => lastTrack && playTrack(lastTrack));
  navigator.mediaSession.setActionHandler('pause', () => stopPlayback());
  try {
    navigator.mediaSession.setActionHandler('nexttrack', seq.active ? () => seq.next() : null);
    navigator.mediaSession.setActionHandler('previoustrack', seq.active ? () => seq.prev() : null);
  } catch {}
}

/* ------------------------------ אירועי לחיצה גלובליים ------------------------------ */
document.addEventListener('click', async e => {
  const unfav = e.target.closest('[data-unfav]');
  if (unfav) { toggleFavorite(unfav.dataset.unfav); return; }

  /* פלייליסטים — עריכה / מחיקה / הסרת יצירה / משך שלב */
  const plEdit = e.target.closest('[data-pl-edit]');
  if (plEdit) {
    expandedPlaylist = expandedPlaylist === plEdit.dataset.plEdit ? null : plEdit.dataset.plEdit;
    renderPlaylists();
    return;
  }
  const plDel = e.target.closest('[data-pl-del]');
  if (plDel) {
    const p = playlistById(plDel.dataset.plDel);
    if (p && confirm(`למחוק את הפלייליסט "${p.name}"?`)) {
      state.playlists = state.playlists.filter(x => x.id !== p.id);
      saveState(); renderPlaylists(); toast('הפלייליסט נמחק');
    }
    return;
  }
  const plRemove = e.target.closest('[data-pl-remove]');
  if (plRemove) {
    const [plId, trackId] = plRemove.dataset.plRemove.split(':');
    const p = playlistById(plId);
    if (p) { p.tracks = p.tracks.filter(id => id !== trackId); saveState(); renderPlaylists(); }
    return;
  }
  const plDur = e.target.closest('[data-pl-dur]');
  if (plDur) {
    const [plId, min] = plDur.dataset.plDur.split(':');
    const p = playlistById(plId);
    if (p) { p.stepMin = parseInt(min, 10); saveState(); renderPlaylists(); }
    return;
  }
  const plRow = e.target.closest('[data-playlist]');
  if (plRow && !e.target.closest('.pl-detail')) {
    const p = playlistById(plRow.dataset.playlist);
    if (p) startPlaylist(p);
    return;
  }

  /* מסע מודרך */
  const jCard = e.target.closest('[data-journey]');
  if (jCard) {
    const j = journeyById[jCard.dataset.journey];
    if (!j) return;
    if (activeSeqId === j.id && seq.active) { openPlayer(); return; }
    startJourney(j);
    return;
  }

  if (e.target.closest('[data-goto-journeys]')) { switchView('journeys'); return; }

  /* בדיקות מערכת במסך האודות */
  const test = e.target.closest('[data-test]');
  if (test) {
    await engine.playTest(test.dataset.test);
    toast(test.dataset.test === 'channels'
      ? 'שמאל · ימין · מרכז — שמונה שניות'
      : 'סריקה 20→220Hz — עשרים וארבע שניות');
    return;
  }

  const more = e.target.closest('.section-more');
  if (more && more.dataset.cat) {
    activeChip = more.dataset.cat;
    document.querySelector('.tab[data-view="library"]').click();
    renderChips(); renderLibrary();
    return;
  }

  /* שבב הצעת חיפוש / חיפוש אחרון */
  const qChip = e.target.closest('[data-q]');
  if (qChip) {
    els.searchMain.value = qChip.dataset.q;
    renderSearch();
    rememberSearch(qChip.dataset.q);
    return;
  }
  if (e.target.closest('[data-clear-searches]')) {
    state.searches = []; saveState(); renderSearch();
    return;
  }

  const chip = e.target.closest('.chip');
  if (chip && chip.dataset.chip) {
    activeChip = chip.dataset.chip;
    renderChips(); renderLibrary();
    return;
  }

  const cardEl = e.target.closest('.card, .tile, .list-item[data-id], .hero');
  if (cardEl?.dataset.id) {
    const track = byId[cardEl.dataset.id];
    if (!track) return;
    if (engine.current?.id === track.id && !seq.active) { openPlayer(); return; }
    await playTrack(track);
    openPlayer();
  }
});

els.search.addEventListener('input', renderLibrary);

/* ------------------------------ מצב מנוע → ממשק ------------------------------ */
engine.onStateChange = () => { updatePlayButtons(); markPlaying(); };

els.plCreate.addEventListener('click', createPlaylist);

/* ------------------------------ Service Worker ------------------------------ */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  /* היה כבר Service Worker פעיל בטעינה? אם לא, ההשתלטות הראשונה היא
     ההתקנה עצמה — ואסור לרענן עליה. */
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    reloading = true;
    location.reload();   // גרסה חדשה השתלטה — נטען אותה מיד
  });

  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('sw.js');
      reg.update();
      /* לבדוק עדכון גם כשחוזרים לאפליקציה מהרקע */
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) reg.update().catch(() => {});
      });
    } catch {}
  });
}

/* ------------------------------ אתחול ------------------------------ */
els.pVolume.value = state.volume;
els.pTimer.textContent = timerLabel();
els.pTimer.classList.toggle('armed', !!state.timer);
/* אייקוני הטרנספורט — מוזרקים פעם אחת באתחול */
els.pPrev.innerHTML = ICONS.skipPrev;
els.pNext.innerHTML = ICONS.skipNext;
els.miniNext.innerHTML = ICONS.skipNext;
updatePlayButtons();

engine.instrument = state.instrument;
engine.speakerMode = state.speakerMode;
updateSpeakerButton();
els.pInstrument.textContent = instrumentLabel();
els.pInstrument.classList.toggle('armed', state.instrument !== 'auto');
renderHome();
renderChips();
renderLibrary();
renderJourneys();
renderPlaylists();
