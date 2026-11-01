// Keeps Twisty playable offline. Pages load fresh when online, cached copy when not.
const CACHE = "twisty-v11";
const SHELL = ["./", "index.html", "daily.js", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const scope = new URL(self.registration.scope);
  const url = new URL(req.url);
  // Only handle the game itself, not other pages hosted in the same repo (like /wheel/).
  if (url.origin === scope.origin && !(url.pathname === scope.pathname || url.pathname.startsWith(scope.pathname) && !url.pathname.slice(scope.pathname.length).includes("/"))) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // The daily clue file changes every day, so always try the network first.
  if (url.origin === scope.origin && url.pathname.endsWith("/daily.js")) {
    e.respondWith(fetch(req, {cache: "no-store"}).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("daily.js", copy)); return r; })
      .catch(() => caches.match("daily.js")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
