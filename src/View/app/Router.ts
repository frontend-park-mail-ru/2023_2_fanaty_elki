import type { Page } from "../types.d";

export class Router {
    private current?: Page;
    constructor(
        private pages: Map<string, Page>,
        private root: HTMLElement,
    ) {}

    refresh() {
        this.route(window.location.pathname, window.location.search);
    }

    redirect(url: string, search?: string) {
        window.history.pushState({}, "", search ? url + search : url);
        this.route(url, search);
    }

    route(url: string, search?: string) {
        const page = this.pages.get(url);
        if (!page) {
            // console.error("Wrong url", url);
            return;
        }
        this.current?.unload();
        page.load(search ? new URLSearchParams(search) : undefined);
        this.root.innerHTML = "";
        this.root.appendChild(page.element);
        this.current = page;
    }
}
