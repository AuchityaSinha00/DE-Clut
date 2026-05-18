const CACHE_NAME = "de-clut-static-v1";
const ASSETS = [
  "index.html",
  "category.html",
  "cart.html",
  "request.html",
  "styles.css",
  "data.js",
  "store.js",
  "app.js",
  "category.js",
  "cart.js",
  "request.js",
  "manifest.webmanifest",
  "icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
