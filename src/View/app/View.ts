import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";
import { UIEvent, UIEventType } from "../../config";
import { RestaurantPage } from "../pages/RestaurantPage";
import { ProfilePage } from "../pages/ProfilePage";
import { UserEvent } from "../../Model/UserModel";

export class View {
    private root: HTMLElement;
    private mainPage: MainPage;
    private restaurantPage: RestaurantPage;
    private profilePage: ProfilePage;
    private router_: Router;
    constructor() {
        this.root = <HTMLElement>document.querySelector("#root")!;

        this.mainPage = new MainPage();
        this.mainPage.events.subscribe(this.updateUIEvent.bind(this));

        this.restaurantPage = new RestaurantPage();
        this.restaurantPage.events.subscribe(this.updateUIEvent.bind(this));

        this.profilePage = new ProfilePage();
        this.profilePage.events.subscribe(this.updateUIEvent.bind(this));

        model.userModel.events.subscribe(this.updateUserEvent.bind(this));

        const routes = new Map<string, Page>([
            [ROUTES.main, this.mainPage],
            [ROUTES.default, this.mainPage],
            [ROUTES.restaurants, this.restaurantPage],
            [ROUTES.profile, this.profilePage],
        ]);

        model.userModel.auth();

        this.router_ = new Router(routes, this.root);
        if (
            window.location.pathname === ROUTES.profile &&
            !model.userModel.getUser()
        ) {
            this.router_.route(ROUTES.main);
        } else {
            this.router_.route(
                window.location.pathname,
                window.location.search,
            );
        }
        window.onpopstate = (event: Event) => {
            event.preventDefault();
            this.router_.route(
                window.location.pathname,
                window.location.search,
            );
        };
    }

    updateUIEvent(event?: UIEvent) {
        switch (event!.type) {
            case UIEventType.NAVBAR_LOGO_CLICK:
                this.router_.redirect(ROUTES.main);
                break;
            case UIEventType.NAVBAR_NAME_CLICK:
                this.router_.redirect(ROUTES.profile);
                break;
            case UIEventType.RESTAURANT_CLICK:
                this.router_.redirect(
                    ROUTES.restaurants,
                    `?id=${event!.data!}`,
                );
                break;

            default:
                break;
        }
    }

    updateUserEvent(event?: UserEvent) {
        console.log(event);
        if (
            !model.userModel.getUser() &&
            window.location.pathname === ROUTES.profile
        ) {
            this.router_.redirect(ROUTES.main);
        }
    }
}
