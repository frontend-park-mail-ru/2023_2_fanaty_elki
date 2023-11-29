const cacheName = "my-cache-v1";
const appShellFiles = [
    "/",
    "/app.js",
    "/handlebars/dist/handlebars.runtime.js",
    "/6ec8a63ed10dc0d5c25bafa4a8d695d7.ico",
    "/8228703fa5f2c6bdb122.svg",
];

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Install");
    event.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching all: app shell and content");
            await cache.addAll(appShellFiles);
        })(),
    );
});

self.addEventListener("activate", () => {
    console.log("Активирован");
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const r = await caches.match(event.request);
            console.log(
                `[Service Worker] Fetching resource: ${event.request.url}`,
            );
            if (r) {
                return r;
            }
            const response = await fetch(event.request);
            // const cache = await caches.open(cacheName);
            // console.log(
            //     `[Service Worker] Caching new resource: ${event.request.url}`,
            // );
            // cache.put(event.request, response.clone());
            return response;
        })(),
    );
});
