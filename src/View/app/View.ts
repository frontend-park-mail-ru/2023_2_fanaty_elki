import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";
import { IObservable } from "../../modules/observer";

export class View extends IObservable {
    private root: HTMLElement;
    private mainPage: Page;
    private router: Router;
    constructor() {
        super();
        this.root = <HTMLElement>document.querySelector("#root")!;

        this.mainPage = new MainPage();

        const routes = new Map<string, Page>([
            [ROUTES.main, this.mainPage],
            [ROUTES.default, this.mainPage],
        ]);

        this.router = new Router(routes, this.root);
        window.onpopstate = (event) => {
            event.preventDefault();
            this.router.route(window.location.pathname);
        };
    }
}