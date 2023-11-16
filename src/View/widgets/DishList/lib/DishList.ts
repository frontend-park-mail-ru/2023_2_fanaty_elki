import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import {
    RestaurantEvent,
    RestaurantWithCategories,
} from "../../../../Model/RestaurantModel";
import { IWidget } from "../../../types";
import DishCategoryTemplate from "../ui/DishesCategory.hbs";
import DishListTemplate from "../ui/DishList.hbs";
import "../ui/DishCard.scss";
import "../ui/DishesCategory.scss";
import { UserEvent } from "../../../../Model/UserModel";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";

Handlebars.registerHelper("itemcount", (id) => {
    return model.cartModel.getDishCount(id);
});

Handlebars.registerHelper("is_auth", () => {
    console.log("helper");
    return model.userModel.getUser();
});

export class DishList extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(DishCategoryTemplate(), ".dishes-category");
        this.events_ = new EventDispatcher<UIEvent>();

        model.restaurantModel.events.subscribe(this.update.bind(this));
        model.cartModel.events.subscribe(() => {
            this.setList(model.restaurantModel.getRestaurant());
        });
    }

    update(event?: RestaurantEvent) {
        if (event! !== RestaurantEvent.LOADED_REST) return;
        this.setList(model.restaurantModel.getRestaurant());
    }

    setList(rest: RestaurantWithCategories) {
        this.element.innerHTML = DishListTemplate(rest);
        if (!model.userModel.getUser()) {
            this.getAll(".dish-card__button").forEach((x) =>
                x.classList.toggle("active"),
            );
        } else {
            this.getAll(".dish-card__button").forEach((element) => {
                const itemCount = model.cartModel.getDishCount(+element.id);
                if (itemCount === 0) {
                    element.innerHTML = "";
                } else {
                    element.innerHTML = `(${itemCount})`;
                }
            });
        }
        this.getAll(".dish-card__button").forEach((element) => {
            element.addEventListener("click", (event) => {
                if ((<HTMLElement>event.target).classList.contains("active")) {
                    controller.handleEvent({
                        type: VIEW_EVENT_TYPE.INCREASE_CART,
                        data: element.id,
                    });
                } else {
                    this.events.notify({
                        type: UIEventType.NAVBAR_SIGNIN_CLICK,
                    });
                }
            });
        });
    }

    load(restaurant_id: number) {
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.RESTAURANT_UPDATE,
            data: restaurant_id,
        });
    }
}
