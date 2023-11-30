const cacheName = "my-cache-v1";
const appShellFiles = [
    "/",
    "/app.js",
    "/handlebars/dist/handlebars.runtime.js",
];

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Install");
    // event.waitUntil(
    //     (async () => {
    //         const cache = await caches.open(cacheName);
    //         console.log("[Service Worker] Caching all: app shell and content");
    //         await cache.addAll(appShellFiles);
    //     })(),
    // );
});

self.addEventListener("activate", () => {
    console.log("Активирован");
});

const pattern = new URLPattern({ pathname: "/api/*" });
self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            try {
                const response = await fetch(event.request);
                const cache = await caches.open(cacheName);
                console.log(
                    `[Service Worker] Caching new resource: ${event.request.url}`,
                );
                cache.put(event.request, response.clone());
                return response;
            } catch {
                const r = await caches.match(event.request);
                console.log(
                    `[Service Worker] Fetching resource: ${event.request.url}`,
                );
                return r;
            }
        })(),
    );
});
