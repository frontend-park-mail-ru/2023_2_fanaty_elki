import type { Page } from "../types.d";

export class Router {
    constructor(
        private pages: Map<string, Page>,
        private root: HTMLElement,
    ) {}

    redirect(url: string) {
        window.history.pushState({}, "", url);
        this.route(url);
    }

    route(url: string) {
        const page = this.pages.get(url);
        if (!page) {
            console.log("wrong url");
            return;
        }
        page.load();
        this.root.innerHTML = "";
        this.root.appendChild(page.element);
    }
}
