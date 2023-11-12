import { Navbar } from "../../../widgets/Navbar/index";
import { RestaurantsList } from "../../../widgets/RestaurantList/index";
import { LoginModal } from "../../../widgets/LoginModal";
import MainTemplate from "../ui/MainView.hbs";
import "../ui/MainView.scss";
import { Page } from "../../..//types.d";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";
import { AddressChooser } from "../../../widgets/AddressChooser";
export class MainPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private r_list: RestaurantsList;
    private login: LoginModal;
    private address: AddressChooser;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(MainTemplate(), "#main_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar();
        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);

        this.address = new AddressChooser("Укажите адрес");
        this.element
            .querySelector("#address_modal")!
            .appendChild(this.address.element);

        this.r_list = new RestaurantsList();
        this.element
            .querySelector("#restaurant_list")!
            .appendChild(this.r_list.element);

        this.login = new LoginModal();
        this.element
            .querySelector("#login_modal")!
            .appendChild(this.login.element);

        this.navbar.events.subscribe(this.update.bind(this));
        this.r_list.events.subscribe(this.update.bind(this));
        this.login.events.subscribe(this.update.bind(this));

        // this.element
        //     .querySelector("#login_modal")!
        //     .appendChild(this.loginModal.element);
    }

    update(event?: UIEvent) {
        console.log(event);
        switch (event!.type) {
            case UIEventType.NAVBAR_SIGNIN_CLICK:
                this.login.open();
                break;
            case UIEventType.NAVBAR_ADDRESS_CLICK:
                this.address.open();
                break;
            default:
                break;
        }
        this.events_.notify(event);
    }

    load() {
        this.navbar.load();
        this.r_list.load();
    }
}
