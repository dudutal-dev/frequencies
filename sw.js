/* RESONANCE · Service Worker — עבודה מלאה אופליין */
const CACHE = 'resonance-v36';
const ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './js/app.js',
  './js/engine.js',
  './js/visualizer.js',
  './js/catalog.js',
  './js/journeys.js',
  './js/sequencer.js',
  './js/analyzer.js',
  './manifest.webmanifest',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* ------------------------------------------------------------
   אסטרטגיית הגשה.

   ה-HTML תמיד נמשך מהרשת, אבל הקוד היה מוגש מהקאש קודם
   (stale-while-revalidate). התוצאה: אחרי כל עדכון נטען HTML חדש
   עם JS ו-CSS ישנים — ומרקאפ חדש רץ בלי הסגנון והלוגיקה שלו,
   עד לטעינה הבאה. זה היה מקור כל תקלות ה"גרסה ישנה".

   לכן: כל מה שהוא קוד (HTML/JS/CSS) נמשך מהרשת קודם, עם נפילה
   לקאש כשאין רשת. שאר הנכסים — אייקונים, מניפסט — נשארים
   קאש-קודם, כי הם כבדים ולא משתנים.
   ------------------------------------------------------------ */
const isCode = url => /\.(?:js|css|html)$/.test(new URL(url).pathname) ;

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('./index.html')));
    return;
  }

  const sameOrigin = new URL(e.request.url).origin === location.origin;

  if (sameOrigin && isCode(e.request.url)) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  /* Stale-while-revalidate לשאר — מהיר, ומתעדכן ברקע */
  e.respondWith(
    caches.match(e.request).then(hit => {
      const fresh = fetch(e.request).then(res => {
        if (res.ok && sameOrigin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || fresh;
    })
  );
});
