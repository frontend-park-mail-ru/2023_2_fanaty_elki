import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { RestaurantEvent } from "../../../../Model/RestaurantModel";
import { IWidget } from "../../../types";
import DishCategoryTemplate from "../ui/DishesCategory.hbs";
import DishListTemplate from "../ui/DishList.hbs";
import "../ui/DishCard.scss";
import "../ui/DishesCategory.scss";
import { UserEvent } from "../../../../Model/UserModel";
import { CartEvent } from "../../../pages/CartPage";

export class DishList extends IWidget {
    constructor() {
        super(DishCategoryTemplate(), ".dishes-category");
        model.userModel.events.subscribe(this.updateOnLogin.bind(this));
        model.restaurantModel.events.subscribe(this.update.bind(this));
        model.cartModel.events.subscribe(this.updateCount.bind(this));
    }

    updateCount() {
        this.setList();
    }

    updateOnLogin(event?: UserEvent) {
        if (event !== UserEvent.USER_CHANGE) return;
        this.setList();
    }

    update(event?: RestaurantEvent) {
        if (event! !== RestaurantEvent.LOADED_REST) return;
        if (!model.cartModel.getCart()) {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.LOAD_CART,
                data: null,
            });
            return;
        }
        this.setList();
    }

    setList() {
        const rest = model.restaurantModel.getRestaurant();
        (<any>rest).is_auth = model.userModel.getUser();
        this.element.innerHTML = DishListTemplate(rest);
        this.element.querySelectorAll(".dish-card__button").forEach((element) =>
            element.addEventListener("click", () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.INCREASE_CART,
                    data: element.id,
                });
            }),
        );
        this.element.querySelectorAll(".dish-card__button").forEach((card) => {
            const count = model.cartModel.getDishCount(+(<HTMLElement>card).id);
            card.innerHTML = `+ В корзину${count ? `(${count})` : ""}`;
        });
    }

    load(restaurant_id: number) {
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.RESTAURANT_UPDATE,
            data: restaurant_id,
        });
    }
}
