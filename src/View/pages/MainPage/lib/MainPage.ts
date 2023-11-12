import { Navbar } from "../../../widgets/Navbar/index";
import { RestaurantsList } from "../../../widgets/RestaurantList/index";
// import { LoginModal } from "../../../widgets/LoginModal";
import MainTemplate from "../ui/MainView.hbs";
import "../ui/MainView.scss";
import { Page } from "../../..//types.d";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent } from "../../../../config";

export class MainPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private r_list: RestaurantsList;
    // private loginModal: LoginModal;
    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(MainTemplate(), "#main_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar();
        this.r_list = new RestaurantsList();
        // this.loginModal = new LoginModal();

        this.navbar.events.subscribe(this.update.bind(this));
        this.r_list.events.subscribe(this.update.bind(this));

        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);
        this.element
            .querySelector("#restaurant_list")!
            .appendChild(this.r_list.element);
        // this.element
        //     .querySelector("#login_modal")!
        //     .appendChild(this.loginModal.element);
    }

    update(event?: UIEvent) {
        console.log(event);
        this.events_.notify(event);
    }

    load() {
        this.navbar.load();
        this.r_list.load();
    }
}
