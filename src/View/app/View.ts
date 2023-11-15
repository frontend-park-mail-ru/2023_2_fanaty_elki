import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";
import { UIEvent, UIEventType } from "../../config";
import { RestaurantPage } from "../pages/RestaurantPage";
import { CartPage } from "../pages/CartPage/lib/CartPage";
import { ProfilePage } from "../pages/ProfilePage";
import { UserEvent } from "../../Model/UserModel";
import { VIEW_EVENT_TYPE } from "../../Controller/Controller";

export class View {
    private root: HTMLElement;
    private mainPage: MainPage;
    private restaurantPage: RestaurantPage;
    private cartPage: CartPage;
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

        this.cartPage = new CartPage();
        this.cartPage.events.subscribe(this.updateUIEvent.bind(this));

        const routes = new Map<string, Page>([
            [ROUTES.main, this.mainPage],
            [ROUTES.default, this.mainPage],
            [ROUTES.restaurants, this.restaurantPage],
            [ROUTES.cart, this.cartPage],
            [ROUTES.profile, this.profilePage],
        ]);

        this.router_ = new Router(routes, this.root);

        window.onpopstate = (event: Event) => {
            event.preventDefault();
            this.router_.route(
                window.location.pathname,
                window.location.search,
            );
        };

        controller.handleEvent({
            type: VIEW_EVENT_TYPE.AUTH,
            data: null,
        });
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
            case UIEventType.NAVBAR_CART_CLICK:
                this.router_.redirect(ROUTES.cart);
                break;
            default:
                break;
        }
    }

    updateUserEvent(event?: UserEvent) {
        console.log(event);
        switch (event) {
            case UserEvent.AUTH:
                {
                    if (
                        window.location.pathname === ROUTES.cart &&
                        !model.userModel.getUser()
                    ) {
                        this.router_.redirect(ROUTES.main);
                        alert("Нужно залогиниться");
                    } else if (
                        window.location.pathname === ROUTES.profile &&
                        !model.userModel.getUser()
                    ) {
                        this.router_.route(ROUTES.main);
                        alert("Нужно залогиниться");
                    } else {
                        this.router_.route(
                            window.location.pathname,
                            window.location.search,
                        );
                    }
                }
                break;
            case UserEvent.USER_LOGIN:
                {
                    if (
                        window.location.pathname === ROUTES.cart &&
                        !model.userModel.getUser()
                    ) {
                        this.router_.redirect(ROUTES.main);
                    } else if (
                        window.location.pathname === ROUTES.profile &&
                        !model.userModel.getUser()
                    ) {
                        this.router_.redirect(ROUTES.main);
                    }
                }
                break;
            default:
                break;
        }
    }
}
