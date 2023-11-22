import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import {
    RestaurantEvent,
    RestaurantWithCategories,
} from "../../../../Model/RestaurantModel";
import { IWidget } from "../../../types";
import DishCategoryTemplate from "../ui/DishesCategory.hbs";
import DishListTemplate from "../ui/DishList.hbs";
import DishButtonTemplate from "../ui/DishButton.hbs";
import "../ui/DishCard.scss";
import "../ui/DishesCategory.scss";
import "../ui/DishButton.scss";
import { UserEvent } from "../../../../Model/UserModel";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";
import { dishListSelectors } from "./config";

Handlebars.registerHelper("itemcount", (id) => {
    return model.cartModel.getDishCount(id);
});

Handlebars.registerHelper("is_auth", () => {
    return model.userModel.getUser();
});

export class DishList extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(DishCategoryTemplate(), dishListSelectors.ROOT);
        this.events_ = new EventDispatcher<UIEvent>();

        model.restaurantModel.events.subscribe(
            this.updateRestaurantEvent.bind(this),
        );
        model.cartModel.events.subscribe(() => {
            this.setList(model.restaurantModel.getRestaurant());
        });
        model.userModel.events.subscribe(this.updateUserEvent.bind(this));
    }

    updateRestaurantEvent(event?: RestaurantEvent) {
        if (event !== RestaurantEvent.LOADED_REST) return;
        this.setList(model.restaurantModel.getRestaurant());
    }

    updateUserEvent(event?: UserEvent) {
        if (
            event === UserEvent.USER_LOGIN ||
            event === UserEvent.USER_LOGOUT ||
            event === UserEvent.AUTH
        ) {
            this.setList(model.restaurantModel.getRestaurant());
        }
    }

    setList(rest: RestaurantWithCategories) {
        this.element.innerHTML = DishListTemplate(rest);
        if (!model.userModel.getUser()) {
            this.getAll(dishListSelectors.CONTROLS).forEach(
                (element) =>
                    (element.innerHTML = DishButtonTemplate({ isAuth: false })),
            );
        } else {
            this.getAll(dishListSelectors.CARD).forEach((element) => {
                const itemCount = model.cartModel.getDishCount(
                    +element.getAttribute("data-product-id")!,
                );
                element.querySelector(dishListSelectors.CONTROLS)!.innerHTML =
                    DishButtonTemplate({ isAuth: true, itemCount: itemCount });
            });
        }
        this.getAll(dishListSelectors.BUTTON).forEach((element) => {
            element.addEventListener("click", (event) => {
                const target = <HTMLElement>event.target!;
                const productId = target
                    .closest(dishListSelectors.CARD)!
                    .getAttribute("data-product-id");
                if (target.classList.contains(dishListSelectors.UP_BUTTON)) {
                    controller.handleEvent({
                        type: VIEW_EVENT_TYPE.INCREASE_CART,
                        data: productId,
                    });
                } else if (
                    target.classList.contains(dishListSelectors.DOWN_BUTTON)
                ) {
                    controller.handleEvent({
                        type: VIEW_EVENT_TYPE.DECREASE_CART,
                        data: productId,
                    });
                } else if (
                    target.classList.contains(dishListSelectors.SIGNIN_BUTTON)
                ) {
                    this.events.notify({
                        type: UIEventType.NAVBAR_SIGNIN_CLICK,
                    });
                }
            });
        });
    }
}
