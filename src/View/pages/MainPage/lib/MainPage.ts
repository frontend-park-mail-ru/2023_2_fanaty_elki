import { Navbar } from "../../../widgets/Navbar/index";
import { RestaurantsList } from "../../../widgets/RestaurantList/index";
import { LoginSignUpModal } from "../../../widgets/LoginSignUpModal";
import MainTemplate from "../ui/MainView.hbs";
import { Page } from "../../..//types.d";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { CategorySwitch } from "../../../widgets/CategorySwitch";
import { navbarConfig } from "./config";
import tipsTemplate from "../ui/Tips.hbs";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { RestaurantEvent } from "../../../../Model/RestaurantModel";
export class MainPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private r_list: RestaurantsList;
    private login: LoginSignUpModal;
    private address: AddressChooser;
    private categorySwitch: CategorySwitch;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(MainTemplate(), "#main_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar(navbarConfig);
        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);

        this.address = new AddressChooser();
        this.element
            .querySelector("#address_modal")!
            .appendChild(this.address.element);

        this.r_list = new RestaurantsList();
        this.element
            .querySelector("#restaurant_list")!
            .appendChild(this.r_list.element);

        this.login = new LoginSignUpModal();
        this.element
            .querySelector("#login_modal")!
            .appendChild(this.login.element);

        this.categorySwitch = new CategorySwitch();
        this.element
            .querySelector("#category_switch")!
            .appendChild(this.categorySwitch.element);

        this.navbar.events.subscribe(this.update.bind(this));
        this.r_list.events.subscribe(this.update.bind(this));
        this.login.events.subscribe(this.update.bind(this));
        model.restaurantModel.events.subscribe(this.updateTips.bind(this));
    }

    updateTips(event?: RestaurantEvent) {
        if (event !== RestaurantEvent.LOADED_TIPS) {
            return;
        }
        let t_list = model.restaurantModel.getTips();
        if (t_list) {
            t_list = t_list.slice(0, 4);
        }
        this.element.querySelector("#js_restaurant_tips")!.innerHTML =
            tipsTemplate(t_list);
        this.element
            .querySelector("#js_restaurant_tips")!
            .querySelectorAll(".restaurant-card")
            .forEach((element) =>
                element.addEventListener("click", () => {
                    this.events.notify({
                        type: UIEventType.RESTAURANT_CLICK,
                        data: element.id,
                    });
                }),
            );
    }

    update(event?: UIEvent) {
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
        this.address.load();
        this.r_list.load();
        this.categorySwitch.load();
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.RESTAURANTS_UPDATE,
            data: null,
        });
    }
}
