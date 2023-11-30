import { RestaurantEvent } from "../../../../Model/RestaurantModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";

import restaurantHeader from "../ui/RestaurantHeader.hbs";
import restaurantHeaderTemplate from "../ui/RestaurantHeaderTemplate.hbs";

export class RestaurantHeader extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private commentsLabel: HTMLElement;
    private back: HTMLElement;

    constructor() {
        super(restaurantHeader(), "#restaurant-header");
        this.events_ = new EventDispatcher<UIEvent>();

        model.restaurantModel.events.subscribe(
            this.updateRestaurantEvent.bind(this),
        );
    }

    bindEvents() {
        this.commentsLabel = this.getChild("#comments");
        this.back = this.getChild("#back");

        this.commentsLabel.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.RESTAURANT_COMMENTS_CLICK,
                data: null,
            });
        });

        this.back.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.BACK_TO_RESTAUTANTS_CLICK,
                data: null,
            });
        });
    }

    updateRestaurantEvent(event?: RestaurantEvent) {
        if (event === RestaurantEvent.LOADED_REST) {
            this.element.innerHTML = restaurantHeaderTemplate(
                model.restaurantModel.getRestaurant().RestaurantInfo,
            );
            this.bindEvents();
        }
    }
}
