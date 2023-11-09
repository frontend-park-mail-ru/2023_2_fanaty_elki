import type { Page } from "../types.d";
import { EventType } from "../types.d";

export class Router {
    constructor(
        private pages: Map<string, Page>,
        private root: HTMLElement,
    ) {
        appModel.subscribe(this);
    }
    handleEvent(event: EventType) {
        if (event == EventType.REDIRECT) {
            const url = appModel.getUrl();
            const page = this.pages.get(url);
            if (!page) {
                console.log("wrong url");
                return;
            }
            this.root.innerHTML = "";
            this.root.appendChild(page.element);
        }
    }
}
