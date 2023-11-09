import type { Page } from "../types.d";
import type { IObserver } from "../../modules/observer";

export class Router implements IObserver {
    constructor(
        private pages: Map<string, Page>,
        private root: HTMLElement,
    ) {
        model.addObserver(this);
    }
    update() {
        const url = model.url;
        this.route(url);
    }
    route(url: string) {
        const page = this.pages.get(url);
        if (!page) {
            console.log("wrong url");
            return;
        }
        window.history.pushState({}, "", url);
        this.root.innerHTML = "";
        this.root.appendChild(page.element);
    }
}
