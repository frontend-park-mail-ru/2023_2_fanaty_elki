// import { RestaurantEvent } from "../../../../Model/RestaurantModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { DishList } from "../../../widgets/DishList";
import { LoginSignUpModal } from "../../../widgets/LoginSignUpModal";
import { Navbar } from "../../../widgets/Navbar";
import { RestaurantComments } from "../../../widgets/RestaurantComments";
import { RestaurantHeader } from "../../../widgets/RestaurantHeader";
import RestaurantPageTemplate from "../ui/RestaurantView.hbs";

export class RestaurantPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private d_list: DishList;
    private login: LoginSignUpModal;
    private address: AddressChooser;
    private restaurantHeader: RestaurantHeader;
    private restaurantComments: RestaurantComments;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(RestaurantPageTemplate(), "#main");
        this.events_ = new EventDispatcher<UIEvent>();

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

        this.restaurantHeader = new RestaurantHeader();
        this.getChild("#restaurant-header").appendChild(
            this.restaurantHeader.element,
        );

        this.restaurantComments = new RestaurantComments();
        this.getChild("#restaurant_comments").appendChild(
            this.restaurantComments.element,
        );

        this.navbar.events.subscribe(this.updateUIEvent.bind(this));
        this.d_list.events.subscribe(this.updateUIEvent.bind(this));
        this.login.events.subscribe(this.updateUIEvent.bind(this));
        this.restaurantHeader.events.subscribe(this.updateUIEvent.bind(this));
        this.restaurantComments.events.subscribe(this.updateUIEvent.bind(this));
    }

    updateUIEvent(event?: UIEvent) {
        switch (event!.type) {
            case UIEventType.NAVBAR_SIGNIN_CLICK:
                this.login.open();
                break;
            case UIEventType.NAVBAR_ADDRESS_CLICK:
                this.address.open();
                break;
            case UIEventType.RESTAURANT_COMMENTS_CLICK:
                this.restaurantComments.open();
                break;
            default:
                break;
        }
        this.events_.notify(event);
    }

    // updateRestaurantEvent(event?: RestaurantEvent) {
    //     if (event === RestaurantEvent.LOADED_REST) {
    //         (<HTMLElement>this.element.querySelector("#title")).innerText =
    //             model.restaurantModel.getRestaurant().RestaurantInfo.Name;
    //     }
    // }

    unload() {
        this.d_list.unload();
    }

    load(params?: URLSearchParams) {
        this.navbar.load();
        this.address.load();
        if (!params || !params.get("id")) {
            console.error("No id to get restaurant");
            return;
        }
        const id = Number(params.get("id")!);
        if (isNaN(id)) {
            console.error("Restaurant id is NAN");
        }
        let item_id: number | null = null;
        if (params) {
            const item_param = Number(params.get("item"));
            if (!isNaN(item_param)) {
                item_id = item_param;
            }
        }
        this.d_list.load(id, item_id);
        window.scrollTo(0, 0);
    }
}
