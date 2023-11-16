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

import favIconImg from "../../../public/favicon.ico";
import { OrderEvent } from "../../Model/OrderModel";

export class View {
    private root: HTMLElement;
    private mainPage: MainPage;
    private restaurantPage: RestaurantPage;
    private cartPage: CartPage;
    private profilePage: ProfilePage;
    private router_: Router;
    constructor() {
        this.root = <HTMLElement>document.querySelector("#root")!;
        const favicon = document.createElement("link");
        favicon.setAttribute("rel", "icon");
        favicon.setAttribute("href", favIconImg);
        favicon.setAttribute("type", "image/x-icon");
        document.querySelector("head")!.appendChild(favicon);

        model.userModel.events.subscribe(this.updateUserEvent.bind(this));
        model.orderModel.events.subscribe(this.updateOrderEvent.bind(this));

        this.mainPage = new MainPage();
        this.mainPage.events.subscribe(this.updateUIEvent.bind(this));

        this.restaurantPage = new RestaurantPage();
        this.restaurantPage.events.subscribe(this.updateUIEvent.bind(this));

        this.profilePage = new ProfilePage();
        this.profilePage.events.subscribe(this.updateUIEvent.bind(this));

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
                if (
                    !model.userModel.getUser() &&
                    (window.location.pathname == ROUTES.profile ||
                        window.location.pathname == ROUTES.cart)
                ) {
                    this.router_.redirect(ROUTES.main);
                    alert("Нужно залогиниться");
                } else {
                    this.router_.route(
                        window.location.pathname,
                        window.location.search,
                    );
                }
                break;
            case UserEvent.USER_LOGOUT:
                if (
                    !model.userModel.getUser() &&
                    (window.location.pathname == ROUTES.profile ||
                        window.location.pathname == ROUTES.cart)
                ) {
                    this.router_.redirect(ROUTES.main);
                } else {
                    this.router_.route(
                        window.location.pathname,
                        window.location.search,
                    );
                }
                break;
            default:
                break;
        }
    }

    updateOrderEvent(event?: OrderEvent) {
        if (event === OrderEvent.CREATE_ORDER) {
            this.router_.redirect(ROUTES.profile);
        }
    }
}
