import { IWidget } from "../../../types";
import restaurantsTemplate from "../ui/RestaurantsList.hbs";
import "../ui/RestaurantsList.scss";
import "../ui/RestaurantCard.scss";

export class RestaurantsList extends IWidget {
    constructor() {
        super(restaurantsTemplate(), ".restaurants-categories");
        model.restaurantModel.addObserver(this);
    }

    update() {
        const r_list = model.restaurantModel.getRestaurants()!;
        this.element.innerHTML = restaurantsTemplate(r_list);
    }
}
