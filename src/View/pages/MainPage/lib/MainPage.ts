import { Navbar } from "../../../entities/Navbar/index";
import { RestaurantList } from "../../../entities/RestaurantList/index";
import MainTemplate from "../ui/MainView.hbs";
import "../ui/MainView.scss";
import { Page } from "../../..//types.d";

export class MainPage extends Page {
    private navbar: Navbar;
    private r_list: RestaurantList;
    constructor() {
        super(MainTemplate(), "#main_page");
        this.navbar = new Navbar();
        this.r_list = new RestaurantList();
        this.element.querySelector("#navbar")!.appendChild(this.navbar);
        this.element
            .querySelector("#restaurant_list")!
            .appendChild(this.r_list);
    }
}
