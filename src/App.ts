import { Controller } from "./Controller/Controller";
import { Model } from "./Model/Model";
import { View } from "./View/app";

export function start() {
    globalThis.model = new Model();
    globalThis.controller = new Controller();
    globalThis.view = new View();
    if (navigator.serviceWorker) {
        window.addEventListener("load", async () => {
            try {
                await navigator.serviceWorker.register("/service-worker.js", {
                    scope: "/",
                });
                console.log("SW registered: ");
            } catch (registrationError) {
                console.log("SW registration failed: ", registrationError);
            }
        });
    }
}
