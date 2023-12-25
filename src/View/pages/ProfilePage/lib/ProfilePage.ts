import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { ExitSubmiter } from "../../../widgets/ExitSubmiter";
import { Navbar } from "../../../widgets/Navbar";
import { OrderList } from "../../../widgets/OrderList";
import { OrderWidget } from "../../../widgets/OrderWidget";
import { ProfileWidget } from "../../../widgets/ProfileWidget";

import profilePageTemplate from "../ui/ProfilePage.hbs";
import { navbarConfig } from "./config";

export class ProfilePage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private orderList: OrderList;
    private profile: ProfileWidget;
    private addressChooser: AddressChooser;
    private orderWidget: OrderWidget;
    private exitSubmiter: ExitSubmiter;

    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(profilePageTemplate(), "#profile_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar(navbarConfig);
        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);
        this.navbar.events.subscribe(this.updateUIEvent.bind(this));

        this.profile = new ProfileWidget();
        this.element
            .querySelector(".profile__content__user-data")!
            .appendChild(this.profile.element);
        this.profile.events.subscribe(this.updateUIEvent.bind(this));

        this.orderList = new OrderList();
        this.element
            .querySelector(".profile__content__orders")!
            .appendChild(this.orderList.element);
        this.orderList.events.subscribe(this.updateUIEvent.bind(this));

        this.addressChooser = new AddressChooser();
        this.element
            .querySelector("#address_chooser")!
            .appendChild(this.addressChooser.element);

        this.orderWidget = new OrderWidget();
        this.getChild("#order-widget").appendChild(this.orderWidget.element);

        this.exitSubmiter = new ExitSubmiter();
        this.getChild("#exit_submiter").appendChild(this.exitSubmiter.element);
        this.exitSubmiter.events.subscribe(this.updateUIEvent.bind(this));
    }

    updateUIEvent(event?: UIEvent) {
        if (event) {
            switch (event.type) {
                case UIEventType.NAVBAR_ADDRESS_CLICK:
                    this.addressChooser.open();
                    break;
                case UIEventType.ORDER_CLICK:
                    controller.handleEvent({
                        type: VIEW_EVENT_TYPE.LOAD_ORDER,
                        data: event.data,
                    });
                    break;
                case UIEventType.EXIT_CLICK:
                    this.exitSubmiter.open();
                    break;
            }
        }
        this.events.notify(event);
    }

    load() {
        this.navbar.load();
        this.profile.load();
        this.orderList.load();
        window.scrollTo(0, 0);
    }
}
