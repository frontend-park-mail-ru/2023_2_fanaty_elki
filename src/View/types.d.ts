export abstract class Page {
    private element_: HTMLElement;
    get element() {
        return this.element_;
    }
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
