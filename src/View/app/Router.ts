import type { Page } from "../types.d";
import type { IObserver } from "../../modules/observer";

export class Router implements IObserver {
    constructor(
        private pages: Map<string, Page>,
        private root: HTMLElement,
    ) {
        model.URLModel.addObserver(this);
    }

    update() {
        const url = model.URLModel.getURL();
        window.history.pushState({}, "", url);
        this.route(url);
    }

    route(url: string) {
        const page = this.pages.get(url);
        if (!page) {
            console.log("wrong url");
            return;
        }
        this.root.innerHTML = "";
        this.root.appendChild(page.element);
    }
}
