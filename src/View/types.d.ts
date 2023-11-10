import type { IObserver } from "../modules/observer";

export abstract class IHTMLElement {
    private element_: HTMLElement;
    get element() {
        return this.element_;
    }
    constructor(template: string, selector: string) {
        const parser = new DOMParser();
        const element: HTMLElement | null = parser
            .parseFromString(template, "text/html")
            .querySelector(selector);

        if (!element) {
            console.log("error");
            return;
        }
        this.element_ = element;
    }
}

export abstract class IWidget extends IHTMLElement implements IObserver {}

export abstract class Page extends IHTMLElement {}

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
}
