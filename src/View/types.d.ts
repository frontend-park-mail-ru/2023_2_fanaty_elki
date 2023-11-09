import type { IObserver } from "../modules/observer";

export abstract class IHTMLElement {
    private element_: HTMLElement;
    get element() {
        return this.element_;
    }
}

export abstract class IWidget extends IHTMLElement implements IObserver {}

export abstract class Page extends IHTMLElement {
    constructor(template: string, element_id: string) {
        const parser = new DOMParser();
        const element: HTMLElement | null = parser
            .parseFromString(MainTemplate(), "text/html")
            .querySelector(element_id);

        if (!element) {
            console.log("error");
            return;
        }
        this.element_ = element;
    }
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
}
