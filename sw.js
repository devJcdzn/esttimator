self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "./",
        "./global.css",
        "./public/css/index.css",
        "./public/js/index.js",
        "./assets/ic_launcher.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        }).catch(err => {
            console.log(err);
        })
    );
});
