import { Navbar } from "../../../widgets/Navbar/index";
import { RestaurantsList } from "../../../widgets/RestaurantList/index";
import { LoginModal } from "../../../widgets/LoginModal";
import MainTemplate from "../ui/MainView.hbs";
import "../ui/MainView.scss";
import { Page } from "../../..//types.d";

export class MainPage extends Page {
    private navbar: Navbar;
    private r_list: RestaurantsList;
    private loginModal: LoginModal;

    constructor() {
        super(MainTemplate(), "#main_page");

        this.navbar = new Navbar({
            search_ph: "Крошка-картошка",
            address: "Укажите адрес",
        });
        this.r_list = new RestaurantsList();
        this.loginModal = new LoginModal();

        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);
        this.element
            .querySelector("#restaurant_list")!
            .appendChild(this.r_list.element);
        this.element
            .querySelector("#login_modal")!
            .appendChild(this.loginModal.element);
    }
}
