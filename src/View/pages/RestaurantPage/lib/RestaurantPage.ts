import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { DishList } from "../../../widgets/DishList";
import { LoginModal } from "../../../widgets/LoginModal";
import { Navbar } from "../../../widgets/Navbar";
import RestaurantPageTemplate from "../ui/RestaurantView.hbs";
import "../ui/RestaurantView.scss";

export class RestaurantPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private d_list: DishList;
    private login: LoginModal;
    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(RestaurantPageTemplate(), "#main");
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar();
        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);

        this.login = new LoginModal();
        this.element
            .querySelector("#login_modal")!
            .appendChild(this.login.element);

        this.d_list = new DishList();
        this.element
            .querySelector("#categories")!
            .appendChild(this.d_list.element);

        this.navbar.events.subscribe(this.update.bind(this));
        this.login.events.subscribe(this.update.bind(this));
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

    load(params?: URLSearchParams) {
        this.navbar.load();
        if (!params || !params.get("id")) {
            console.log("no id");
            return;
        }
        const id = Number(params.get("id")!);
        if (isNaN(id)) {
            console.log("id is NAN");
        }
        this.d_list.load(id);
    }
}
