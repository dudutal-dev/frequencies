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
  const base = { favorites: [], recents: [], playlists: [], volume: 0.7, timer: 0 };
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
  journeysList: $('journeys-list'), playlistsList: $('playlists-list'), plCreate: $('pl-create'),
  mini: $('mini'), miniArt: $('mini-art'), miniTitle: $('mini-title'),
  miniSub: $('mini-sub'), miniPlay: $('mini-play'),
  player: $('player'), pClose: $('p-close'), pAdd: $('p-add'), pFav: $('p-fav'),
  pJourney: $('p-journey'), pjName: $('pj-name'), pjStep: $('pj-step'), pjFill: $('pj-fill'),
  pMode: $('p-mode'), pTitle: $('p-title'), pSub: $('p-sub'), pDesc: $('p-desc'), pTags: $('p-tags'),
  pPrev: $('p-prev'), pPlay: $('p-play'), pNext: $('p-next'),
  pTimer: $('p-timer'), pVolume: $('p-volume'),
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
  melodic: 'מלודיה גנרטיבית · לא חוזרת על עצמה',
};

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
        <span class="glyph">${t.glyph}</span>
        ${hz ? `<span class="hz">${hz}</span>` : ''}
      </div>
      ${badge ? `<span class="phones">${badge}</span>` : ''}
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
  const hero = byId['dna-528'] || TRACKS[0];
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
      <span class="jc-glyph">${j.glyph}</span>
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
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const view = tab.dataset.view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    $(`view-${view}`).classList.add('active');
    if (view === 'favorites') renderFavorites();
    if (view === 'library') renderLibrary();
    if (view === 'journeys') { renderJourneys(); renderPlaylists(); }
    els.main.scrollTo({ top: 0 });
  });
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
  const icon = engine.isPlaying ? '❚❚' : '▶';
  els.pPlay.textContent = icon;
  els.miniPlay.textContent = icon;
}

function markPlaying() {
  const id = engine.current?.id;
  document.querySelectorAll('.card, .list-item[data-id]').forEach(el =>
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
  const melodySuffix = track.melody && track.mode !== 'melodic' ? ' · ♬ מלודיה חיה' : '';
  els.pMode.textContent = `${MODE_LABEL[track.mode]} · ${track.freq}Hz${track.beat ? ` + ביט ${track.beat}Hz` : ''}${melodySuffix}`;
  els.pTitle.textContent = track.title;
  els.pSub.textContent = track.sub;
  els.pDesc.textContent = track.desc;
  els.pTags.innerHTML = (track.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');
  els.phonesNote.classList.toggle('visible', track.mode === 'binaural');
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

  const cardEl = e.target.closest('.card, .list-item[data-id], .hero');
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
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ------------------------------ אתחול ------------------------------ */
els.pVolume.value = state.volume;
els.pTimer.textContent = timerLabel();
els.pTimer.classList.toggle('armed', !!state.timer);
renderHome();
renderChips();
renderLibrary();
renderJourneys();
renderPlaylists();
