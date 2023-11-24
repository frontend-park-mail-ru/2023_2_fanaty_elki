export abstract class IHTMLElement {
    private element_: HTMLElement;
    get element() {
        return this.element_;
    }
    getChild(selector: string) {
        return this.element_.querySelector<HTMLElement>(selector)!;
    }

    getAll(selector: string) {
        return this.element_.querySelectorAll<HTMLElement>(selector)!;
    }
    constructor(template: string, selector: string) {
        const parser = new DOMParser();
        const element: HTMLElement | null = parser
            .parseFromString(template, "text/html")
            .querySelector(selector);

        if (!element) {
            console.error("Error: cannot parse template");
            return;
        }
        this.element_ = element;
    }
}

export abstract class IWidget extends IHTMLElement {}

export abstract class Page extends IHTMLElement {
    unload();
    load(params?: URLSearchParams);
}

export enum EventType {
    REDIRECT = "REDIRECT",
}

export enum ROUTES {
    signup = "/signup",
    restaurants = "/restaurants",
    login = "/login",
    main = "/main",
    default = "/",
    cart = "/cart",
    profile = "/me",
    search = "/search",
}
