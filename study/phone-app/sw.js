// Keeps Studyhall opening offline. The page loads fresh when online, the saved copy when not.
const CACHE = "studyhall-v1";
const SHELL = ["./", "index.html", "anthropic-sdk.js", "manifest.webmanifest", "apple-touch-icon-v1.png", "icon-192-v1.png", "icon-512-v1.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("studyhall-") && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// Libraries the page loads only when needed (PDF and Word readers, fonts); cache them once fetched.
const LIBS = ["https://cdnjs.cloudflare.com/", "https://fonts.googleapis.com/", "https://fonts.gstatic.com/"];
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const scope = new URL(self.registration.scope);
  const mine = url.origin === scope.origin && url.pathname.startsWith(scope.pathname);
  if (!mine && !LIBS.some(p => req.url.startsWith(p))) return;
  if (req.mode === "navigate") {
    // Always ask GitHub for the newest page instead of a copy the phone saved earlier
    e.respondWith(fetch(req.url, { cache: "no-cache", credentials: "same-origin" })
      .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
