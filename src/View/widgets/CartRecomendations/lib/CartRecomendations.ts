import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { CartEvent } from "../../../../Model/CartModel";
import { Dish, RestaurantEvent } from "../../../../Model/RestaurantModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";

import cartRecommendationsTemplate from "../ui/CartRecommendations.hbs";
import cartRecommedationsItemsTemplate from "../ui/CartRecommendationsItems.hbs";
import { cartRecommendationsSelectors } from "./config";

export class CartRecommendations
    extends IWidget
    implements Listenable<UIEvent>
{
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    constructor() {
        super(cartRecommendationsTemplate(), "#cart-recomendations");
        this.events_ = new EventDispatcher<UIEvent>();

        model.restaurantModel.events.subscribe(
            this.updateRestaurantEvent.bind(this),
        );

        this.bindEvents();
    }

    bindEvents() {}

    updateRestaurantEvent(event?: RestaurantEvent) {
        if (event !== RestaurantEvent.LOADED_CART_RECOMENDATIONS) return;
        this.setList(model.restaurantModel.getCartRecomendations());
    }

    setList(dishes: Dish[]) {
        this.element.innerHTML = cartRecommedationsItemsTemplate(dishes);

        this.getAll(cartRecommendationsSelectors.BUTTON).forEach((element) => {
            element.addEventListener("click", (event) => {
                const target = <HTMLElement>event.target!;
                const productId = target
                    .closest(cartRecommendationsSelectors.CARD)!
                    .getAttribute("data-product-id");
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.INCREASE_CART,
                    data: productId,
                });
            });
        });
    }

    load() {
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.LOAD_CART_RECOMENDATIONS,
            data: null,
        });
    }
}
