const cacheName = "my-cache-v1";
const appShellFiles = [
    "/",
    "/app.js",
    "/handlebars/dist/handlebars.runtime.js",
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

self.addEventListener("activate", (event) => {
    console.log("Активирован");
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

const pattern = new URLPattern({ pathname: "/api/*" });
const cart_request = new URLPattern({ pathname: "/api/cart*" });
self.addEventListener("fetch", (event) => {
    if (event.request.method === "GET") {
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
                } catch (e) {
                    const r = await caches.match(event.request);
                    console.log(
                        `[Service Worker] Fetching resource: ${event.request.url}`,
                    );
                    if (r) {
                        return r;
                    }
                }
            })(),
        );
    }
});

self.addEventListener("message", async (event) => {
});

// else if (
//     event.request.method === "POST" &&
//     cart_request.test(event.request.url)
// ) {
//     try {
//         return await fetch(event.request);
//     } catch (e) {
//         const response = {
//             init: {
//                 status: 201,
//                 statusText: "OK",
//             },
//         };

//         const mockResponse = new Response("", response.init);
//         return mockResponse;
//     }
// }
