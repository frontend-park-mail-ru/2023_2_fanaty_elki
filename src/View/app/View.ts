import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";
import { UIEvent, UIEventType } from "../../config";
import { RestaurantPage } from "../pages/RestaurantPage";
import { CartPage } from "../pages/CartPage/lib/CartPage";

export class View {
    private root: HTMLElement;
    private mainPage: MainPage;
    private restaurantPage: RestaurantPage;
    private cartPage: CartPage;
    private router_: Router;
    constructor() {
        this.root = <HTMLElement>document.querySelector("#root")!;

        this.mainPage = new MainPage();
        this.mainPage.events.subscribe(this.update.bind(this));

        this.restaurantPage = new RestaurantPage();
        this.restaurantPage.events.subscribe(this.update.bind(this));

        this.cartPage = new CartPage();
        this.cartPage.events.subscribe(this.update.bind(this));

        const routes = new Map<string, Page>([
            [ROUTES.main, this.mainPage],
            [ROUTES.default, this.mainPage],
            [ROUTES.restaurants, this.restaurantPage],
            [ROUTES.cart, this.cartPage],
        ]);

        this.router_ = new Router(routes, this.root);
        if (
            window.location.pathname === ROUTES.cart &&
            !model.userModel.getUser()
        ) {
            this.router_.redirect(ROUTES.main);
            alert("Нужно залогиниться");
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

    update(event?: UIEvent) {
        switch (event!.type) {
            case UIEventType.NAVBAR_LOGO_CLICK:
                this.router_.redirect(ROUTES.main);
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
}
