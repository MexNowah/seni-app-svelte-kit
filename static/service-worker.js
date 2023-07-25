const a = "my-cache", s = [
    "/"
  ];
  self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open(a).then((t) => t.addAll(s)).then(() => self.skipWaiting())
    );
  });
  self.addEventListener("activate", (e) => {
    e.waitUntil(
      caches.keys().then((t) => Promise.all(
        t.filter((n) => n !== a).map((n) => caches.delete(n))
      ))
    );
  });
  self.addEventListener("fetch", function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });
  