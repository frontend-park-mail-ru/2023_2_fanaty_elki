import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";
import { UIEvent, UIEventType } from "../../config";

export class View {
    private root: HTMLElement;
    private mainPage: MainPage;
    private router_: Router;
    constructor() {
        this.root = <HTMLElement>document.querySelector("#root")!;

        this.mainPage = new MainPage();
        this.mainPage.events.subscribe(this.update.bind(this));

        const routes = new Map<string, Page>([
            [ROUTES.main, this.mainPage],
            [ROUTES.default, this.mainPage],
        ]);

        this.router_ = new Router(routes, this.root);
        this.router_.route(window.location.pathname);
        window.onpopstate = (event: Event) => {
            event.preventDefault();
            this.router_.route(window.location.pathname);
        };
    }

    update(event?: UIEvent) {
        switch (event!.type) {
            case UIEventType.NAVBAR_LOGO_CLICK:
                this.router_.redirect(ROUTES.main);
                break;
            case UIEventType.RESTAURANT_CLICK:
                this.router_.redirect(`${ROUTES.restaurants}/${event!.data!}`);
                break;

            default:
                break;
        }
    }
}
