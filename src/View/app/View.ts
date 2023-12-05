import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";
import { UIEvent, UIEventType } from "../../config";
import { RestaurantPage } from "../pages/RestaurantPage";
import { CartPage } from "../pages/CartPage";
import { ProfilePage } from "../pages/ProfilePage";
import { SearchPage } from "../pages/SearchPage";
import { UserEvent } from "../../Model/UserModel";
import { VIEW_EVENT_TYPE } from "../../Controller/Controller";
import { OrderEvent } from "../../Model/OrderModel";
import { AppEvent } from "../../Model/AppModel";
import { StatusMessage } from "./entities/StatusMessage";
import { Notifier, Value } from "./entities/Notification";

const enum Messages {
    LOGIN_FIRST = "Нужно залогиниться",
    OFFLINE = "Соединение потеряно",
    BACK_ONLINE = "Соединение восстановлено",
    NOT_ALLOWED = "Сейчас это невозможно",
    USER_UPDATED = "Данные сохранены",
    ORDER_CREATED = "Заказ создан",
}

export class View {
    private root: HTMLElement;
    private mainPage: MainPage;
    private restaurantPage: RestaurantPage;
    private cartPage: CartPage;
    private profilePage: ProfilePage;
    private searchPage: SearchPage;
    private router_: Router;
    private statusMessage: StatusMessage;
    private notifier: Notifier;
    constructor() {
        this.root = <HTMLElement>document.querySelector("#root")!;

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

        this.searchPage = new SearchPage();
        this.searchPage.events.subscribe(this.updateUIEvent.bind(this));

        const routes = new Map<string, Page>([
            [ROUTES.main, this.mainPage],
            [ROUTES.default, this.mainPage],
            [ROUTES.restaurants, this.restaurantPage],
            [ROUTES.cart, this.cartPage],
            [ROUTES.profile, this.profilePage],
            [ROUTES.search, this.searchPage],
        ]);

        this.router_ = new Router(routes, this.root);

        window.onpopstate = (event: Event) => {
            event.preventDefault();
            this.router_.route(
                window.location.pathname,
                window.location.search,
            );
        };

        this.statusMessage = new StatusMessage(
            Messages.BACK_ONLINE,
            Messages.OFFLINE,
        );
        document.body.appendChild(this.statusMessage.element);
        this.statusMessage.changeState(model.appModel.isOnline());

        this.notifier = new Notifier();
        document.body.appendChild(this.notifier.element);

        model.appModel.events.subscribe(this.updateAppEvent.bind(this));
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
            case UIEventType.BACK_TO_RESTAUTANTS_CLICK:
                this.router_.redirect(ROUTES.main);
                break;
            case UIEventType.NAVBAR_SEARCH_SUBMIT:
                this.router_.redirect(ROUTES.search, `?query=${event!.data!}`);
                break;
            case UIEventType.DISH_CARD_CLICK:
                this.router_.redirect(
                    ROUTES.restaurants,
                    `?id=${event!.data![0]}&item=${event!.data![1]}`,
                );
                break;
            default:
                break;
        }
    }

    updateUserEvent(event?: UserEvent) {
        switch (event) {
            case UserEvent.AUTH:
                if (
                    !model.userModel.getUser() &&
                    (window.location.pathname == ROUTES.profile ||
                        window.location.pathname == ROUTES.cart)
                ) {
                    this.router_.redirect(ROUTES.main);
                    this.notifier.show(Messages.LOGIN_FIRST, Value.ERROR);
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
                }
                break;
            case UserEvent.USER_UPDATE:
                if (!model.userModel.getErrorMsg()) {
                    this.notifier.show(Messages.USER_UPDATED, Value.EVENT);
                }
                break;
            case UserEvent.OFFLINE:
                this.notifier.show(Messages.NOT_ALLOWED, Value.ERROR);
                break;
            default:
                break;
        }
    }

    updateOrderEvent(event?: OrderEvent) {
        if (event === OrderEvent.CREATE_ORDER) {
            this.notifier.show(Messages.ORDER_CREATED, Value.EVENT);
            this.router_.redirect(ROUTES.profile);
        } else if (event === OrderEvent.OFFLINE) {
            this.notifier.show(Messages.NOT_ALLOWED, Value.ERROR);
        }
    }

    updateAppEvent(event?: AppEvent) {
        if (event === AppEvent.OFFLINE) {
            this.statusMessage.changeState(false);
        } else if (event === AppEvent.ONLINE) {
            this.statusMessage.changeState(true);
            this.router_.refresh();
        }
    }
}
