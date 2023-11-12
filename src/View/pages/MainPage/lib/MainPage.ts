import { Navbar } from "../../../widgets/Navbar/index";
import { RestaurantsList } from "../../../widgets/RestaurantList/index";
import { LoginModal } from "../../../widgets/LoginModal";
import MainTemplate from "../ui/MainView.hbs";
import "../ui/MainView.scss";
import { Page } from "../../..//types.d";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";
export class MainPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private r_list: RestaurantsList;
    private login: LoginModal;
    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(MainTemplate(), "#main_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar();
        this.r_list = new RestaurantsList();
        this.login = new LoginModal();

        this.navbar.events.subscribe(this.update.bind(this));
        this.r_list.events.subscribe(this.update.bind(this));
        this.login.events.subscribe(this.update.bind(this));

        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);
        this.element
            .querySelector("#restaurant_list")!
            .appendChild(this.r_list.element);
        this.element
            .querySelector("#login_modal")!
            .appendChild(this.login.element);
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
