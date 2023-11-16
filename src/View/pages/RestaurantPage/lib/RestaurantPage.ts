import { RestaurantEvent } from "../../../../Model/RestaurantModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { DishList } from "../../../widgets/DishList";
import { LoginSignUpModal } from "../../../widgets/LoginSignUpModal";
import { Navbar } from "../../../widgets/Navbar";
import RestaurantPageTemplate from "../ui/RestaurantView.hbs";
import "../ui/RestaurantView.scss";

export class RestaurantPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private d_list: DishList;
    private login: LoginSignUpModal;
    private address: AddressChooser;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(RestaurantPageTemplate(), "#main");
        this.events_ = new EventDispatcher<UIEvent>();
        model.restaurantModel.events.subscribe(
            this.updateRestaurantEvent.bind(this),
        );

        this.navbar = new Navbar();
        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);

        this.address = new AddressChooser();
        this.element
            .querySelector("#address_modal")!
            .appendChild(this.address.element);

        this.login = new LoginSignUpModal();
        this.element
            .querySelector("#login_modal")!
            .appendChild(this.login.element);

        this.d_list = new DishList();
        this.element
            .querySelector("#categories")!
            .appendChild(this.d_list.element);

        this.navbar.events.subscribe(this.updateUIEvent.bind(this));
        this.d_list.events.subscribe(this.updateUIEvent.bind(this));
        this.login.events.subscribe(this.updateUIEvent.bind(this));
    }

    updateUIEvent(event?: UIEvent) {
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

    updateRestaurantEvent(event?: RestaurantEvent) {
        if (event === RestaurantEvent.LOADED_REST) {
            (<HTMLElement>this.element.querySelector("#title")).innerText =
                model.restaurantModel.getRestaurant().RestaurantInfo.Name;
        }
    }

    load(params?: URLSearchParams) {
        this.navbar.load();
        this.address.load();
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
