/**
 * Service worker — offline is not optional here.
 *
 * The app has to work on a kitchen table with no wifi, and on an iPad that will
 * never see another OS update. So: precache everything, serve cache-first, and
 * never let a network failure reach the child.
 *
 * Bump CACHE when any precached file changes, or the old copy is served forever.
 */

/*
 * DEPLOY PROTOCOL — bump this on every deploy, without exception.
 *
 * Changing this string changes sw.js's bytes, which is what makes the browser
 * install a new worker, re-precache, and drop the old cache. If you ship a file
 * change without bumping it, devices that already installed the app keep
 * serving the old copy and there is no user-visible symptom to warn you.
 */
const CACHE = 'fey-v6';

const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './styles/app.css',
  './src/app.js',
  './src/i18n.js',
  './src/store.js',
  './src/speech.js',
  './src/play.js',
  './src/data/curriculum.js',
  './src/data/wordbank.js',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // addAll is atomic — one 404 and nothing caches, which would leave a
      // half-installed app. Add individually and tolerate misses instead.
      .then(cache => Promise.all(
        PRECACHE.map(url => cache.add(url).catch(err => {
          console.warn('[sw] precache miss:', url, err.message);
        }))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Never touch anything but same-origin GETs. There are no third-party calls
  // in this app by design, and POST/PUT must not be replayed from cache.
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // Start the network request NOW, while the event is still dispatching, and
  // hand it to waitUntil immediately. The previous version called waitUntil
  // from inside a .then() — by then the event is no longer accepting lifetime
  // extensions, the revalidation was dropped, and the cache never refreshed.
  const network = fetch(req)
    .then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    })
    .catch(() => null);

  event.waitUntil(network);

  event.respondWith(
    caches.match(req).then(hit => {
      // Cache-first: instant on a 2018 iPad, and correct with no network.
      // The revalidation above lands in time for the next launch.
      if (hit) return hit;

      return network.then(res => {
        if (res) return res;
        // A navigation that missed the cache still has to render something.
        if (req.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
