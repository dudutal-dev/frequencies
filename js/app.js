/* ============================================================
   RESONANCE · לוגיקת הממשק
   ניווט · רינדור קטלוג · נגן · טיימר · מועדפים · Auto-Save
   ============================================================ */

import { TRACKS, CATEGORIES, byId, byCategory } from './catalog.js';
import { FrequencyEngine } from './engine.js';
import { MandalaVisualizer } from './visualizer.js';

/* ------------------------------ מצב + Auto-Save ------------------------------ */
const SAVE_KEY = 'resonance_state_v1';

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return { favorites: [], recents: [], volume: 0.7, timer: 0, ...JSON.parse(raw) };
  } catch {}
  return { favorites: [], recents: [], volume: 0.7, timer: 0 };
}

const state = loadState();

function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, _savedAt: new Date().toISOString() }));
  } catch (e) { console.warn('Auto-save failed:', e); }
}
setInterval(saveState, 3000);
window.addEventListener('beforeunload', saveState);

/* ------------------------------ מנוע + ויזואלייזר ------------------------------ */
const engine = new FrequencyEngine();
engine.setVolume(state.volume);

const vizCanvas = document.getElementById('viz');
const viz = new MandalaVisualizer(vizCanvas, engine);

/* ------------------------------ עזרי DOM ------------------------------ */
const $ = id => document.getElementById(id);
const els = {
  main: $('main'), home: $('view-home'), grid: $('library-grid'), chips: $('chips'),
  search: $('search'), favList: $('fav-list'),
  mini: $('mini'), miniArt: $('mini-art'), miniTitle: $('mini-title'),
  miniSub: $('mini-sub'), miniPlay: $('mini-play'),
  player: $('player'), pClose: $('p-close'), pFav: $('p-fav'), pMode: $('p-mode'),
  pTitle: $('p-title'), pSub: $('p-sub'), pDesc: $('p-desc'), pTags: $('p-tags'),
  pPlay: $('p-play'), pTimer: $('p-timer'), pVolume: $('p-volume'),
  phonesNote: $('phones-note'), toast: $('toast'), toastText: $('toast-text'),
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
  binaural: 'Binaural · 🎧 אוזניות',
  isochronic: 'איזוכרוני · גם ברמקולים',
};

function artHTML(t, extra = '') {
  return `
    <div class="art ${extra}" style="background: linear-gradient(140deg, ${t.colors[0]}, ${t.colors[1]})">
      <span class="glyph">${t.glyph}</span>
      <span class="hz-badge">${t.freq}Hz${t.beat ? ` + ${t.beat}Hz` : ''}</span>
      ${t.mode === 'binaural' ? '<span class="phones">🎧</span>' : ''}
      <div class="eq"><span></span><span></span><span></span><span></span></div>
    </div>`;
}

function cardHTML(t) {
  return `
    <div class="card" data-id="${t.id}">
      ${artHTML(t)}
      <div class="card-title">${t.title}</div>
      <div class="card-sub">${t.sub}</div>
    </div>`;
}

/* ------------------------------ בית ------------------------------ */
function renderHome() {
  const featured = byCategory('featured');
  const hero = featured[0] ? byId['dna-528'] || featured[0] : TRACKS[0];
  const recents = state.recents.map(id => byId[id]).filter(Boolean);

  let html = `
    <div class="hero" data-id="${hero.id}">
      <div class="hero-label">✦ יצירת היום</div>
      <div class="hero-title">${hero.title}</div>
      <div class="hero-sub">${hero.desc}</div>
      <button class="hero-btn">▶ &nbsp;התחל האזנה</button>
    </div>`;

  if (recents.length) {
    html += sectionHTML({ id: 'recents', label: 'הושמעו לאחרונה', icon: '↻' }, recents.slice(0, 10));
  }
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

/* ------------------------------ ניווט ------------------------------ */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const view = tab.dataset.view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    $(`view-${view}`).classList.add('active');
    if (view === 'favorites') renderFavorites();
    if (view === 'library') renderLibrary();
    els.main.scrollTo({ top: 0 });
  });
});

/* ------------------------------ נגינה ------------------------------ */
async function playTrack(track) {
  await engine.play(track);
  viz.setColors(track.colors);

  state.recents = [track.id, ...state.recents.filter(id => id !== track.id)].slice(0, 12);
  saveState();

  updateMini(track);
  updatePlayerView(track);
  markPlaying();
  armTimer();
  updateMediaSession(track);
}

function stopPlayback() {
  engine.stop();
  clearTimer(false);
  updatePlayButtons();
  markPlaying();
}

function updatePlayButtons() {
  const icon = engine.isPlaying ? '❚❚' : '▶';
  els.pPlay.textContent = icon;
  els.miniPlay.textContent = icon;
}

function markPlaying() {
  const id = engine.current?.id;
  document.querySelectorAll('.card, .list-item').forEach(el =>
    el.classList.toggle('playing', el.dataset.id === id)
  );
}

/* ------------------------------ מיני-נגן ------------------------------ */
let lastTrack = null;

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
  els.miniSub.textContent = track.sub;
  updatePlayButtons();
}

els.mini.addEventListener('click', e => {
  if (e.target.closest('#mini-play')) return;
  if (lastTrack) openPlayer();
});
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
  els.pMode.textContent = `${MODE_LABEL[track.mode]} · ${track.freq}Hz${track.beat ? ` + ביט ${track.beat}Hz` : ''}`;
  els.pTitle.textContent = track.title;
  els.pSub.textContent = track.sub;
  els.pDesc.textContent = track.desc;
  els.pTags.innerHTML = (track.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');
  els.phonesNote.classList.toggle('visible', track.mode === 'binaural');
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
  clearTimer(true);
  if (state.timer && engine.isPlaying) {
    timerHandle = setTimeout(() => {
      engine.fadeOutAndStop(10);
      toast('לילה טוב ✨');
      setTimeout(() => { updatePlayButtons(); markPlaying(); }, 10500);
    }, state.timer * 60 * 1000);
  }
}
function clearTimer(keep) {
  if (timerHandle) { clearTimeout(timerHandle); timerHandle = null; }
  if (!keep) { /* עצירה ידנית לא מאפסת את ההעדפה */ }
}

/* ------------------------------ Media Session (מסך נעילה) ------------------------------ */
function updateMediaSession(track) {
  if (!('mediaSession' in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: `RESONANCE · ${track.sub}`,
    album: 'תדרים לאיזון הגוף והנשמה',
  });
  navigator.mediaSession.setActionHandler('play', () => lastTrack && playTrack(lastTrack));
  navigator.mediaSession.setActionHandler('pause', () => stopPlayback());
}

/* ------------------------------ אירועי לחיצה גלובליים ------------------------------ */
document.addEventListener('click', async e => {
  const unfav = e.target.closest('[data-unfav]');
  if (unfav) { toggleFavorite(unfav.dataset.unfav); return; }

  const more = e.target.closest('.section-more');
  if (more) {
    activeChip = more.dataset.cat;
    document.querySelector('.tab[data-view="library"]').click();
    renderChips(); renderLibrary();
    return;
  }

  const chip = e.target.closest('.chip');
  if (chip) {
    activeChip = chip.dataset.chip;
    renderChips(); renderLibrary();
    return;
  }

  const cardEl = e.target.closest('.card, .list-item, .hero');
  if (cardEl?.dataset.id) {
    const track = byId[cardEl.dataset.id];
    if (!track) return;
    if (engine.current?.id === track.id) { openPlayer(); return; }
    await playTrack(track);
    openPlayer();
  }
});

els.search.addEventListener('input', renderLibrary);

/* ------------------------------ מצב מנוע → ממשק ------------------------------ */
engine.onStateChange = () => { updatePlayButtons(); markPlaying(); };

/* ------------------------------ Service Worker ------------------------------ */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ------------------------------ אתחול ------------------------------ */
els.pVolume.value = state.volume;
els.pTimer.textContent = timerLabel();
els.pTimer.classList.toggle('armed', !!state.timer);
renderHome();
renderChips();
renderLibrary();
