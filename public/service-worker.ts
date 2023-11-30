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
const cart_request = new URLPattern({ pathname: "/api/cart" });
self.addEventListener("fetch", async (event) => {
    if (event.request.method === "GET") {
        try {
            const response = await fetch(event.request);
            const cache = await caches.open(cacheName);
            console.log(
                `[Service Worker] Caching new resource: ${event.request.url}`,
            );
            cache.put(event.request, response.clone());
            event.respondWith(response);
        } catch (e) {
            const r = await caches.match(event.request);
            console.log(
                `[Service Worker] Fetching resource: ${event.request.url}`,
            );
            if (r) {
                return r;
            }
        }
    }
    if (
        event.request.method === "POST" &&
        cart_request.test(event.request.url)
    ) {
        // try {
        //     const response = await fetch(event.request);
        //     const cache = await caches.open(cacheName);
        //     console.log(
        //         `[Service Worker] Caching new resource: ${event.request.url}`,
        //     );
        //     cache.put(event.request, response.clone());
        //     event.respondWith(response);
        // } catch (e) {
        console.log("cart");
        const response = {
            init: {
                status: 201,
                statusText: "OK",
            },
        };

        const mockResponse = new Response("", response.init);
        event.respondWith(mockResponse);
        // }
    }
});
