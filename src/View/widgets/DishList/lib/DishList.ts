import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { RestaurantEvent } from "../../../../Model/RestaurantModel";
import { IWidget } from "../../../types";
import DishCategoryTemplate from "../ui/DishesCategory.hbs";
import "../ui/DishCard.scss";
import "../ui/DishesCategory.scss";

export class DishList extends IWidget {
    constructor() {
        super(DishCategoryTemplate(), ".dishes-category");
        // model.cartModel.events.subscribe(this.update.bind(this));
        model.restaurantModel.events.subscribe(this.update.bind(this));
    }

    update(event?: RestaurantEvent) {
        if (event! !== RestaurantEvent.LOADED_REST) return;
        const rest = model.restaurantModel.getRestaurant();
        this.element.innerHTML = DishCategoryTemplate(rest);
        this.element.querySelectorAll(".dish-card__button").forEach((element) =>
            element.addEventListener("click", () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.INCREASE_CART,
                    data: element.id,
                });
            }),
        );
    }

    load(restaurant_id: number) {
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.RESTAURANT_UPDATE,
            data: restaurant_id,
        });
    }
}
