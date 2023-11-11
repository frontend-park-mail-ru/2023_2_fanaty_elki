import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";

export class View {
    private root: HTMLElement;
    private mainPage: Page;
    private router_: Router;
    constructor() {
        this.root = <HTMLElement>document.querySelector("#root")!;

        this.mainPage = new MainPage();

        const routes = new Map<string, Page>([
            [ROUTES.main, this.mainPage],
            [ROUTES.default, this.mainPage],
        ]);

        this.router_ = new Router(routes, this.root);
        this.router_.route(window.location.pathname);
        window.onpopstate = (event) => {
            event.preventDefault();
            this.router_.route(window.location.pathname);
        };
    }
}
