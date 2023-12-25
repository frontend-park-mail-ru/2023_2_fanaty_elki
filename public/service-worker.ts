import { appShellFiles } from "./assets.js";
const cacheName = "my-cache-v1";

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            await cache.addAll(appShellFiles);
        })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cache) => {
                        return cache != cacheName;
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    }),
            );
        }),
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method === "GET") {
        event.respondWith(
            (async () => {
                try {
                    const response = await fetch(event.request);
                    const cache = await caches.open(cacheName);
                    cache.put(event.request, response.clone());
                    return response;
                } catch (e) {
                    const r = await caches.match(event.request);
                    if (r) {
                        return r;
                    }
                }
            })(),
        );
    }
});
