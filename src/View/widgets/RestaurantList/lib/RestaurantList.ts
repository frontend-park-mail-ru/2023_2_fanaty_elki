import { IWidget } from "../../../types";
import restaurantsTemplate from "../ui/RestaurantsList.hbs";
import listTemplate from "../ui/List.hbs";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";

export class RestaurantsList extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(restaurantsTemplate(), ".restaurants-categories");
        this.events_ = new EventDispatcher<UIEvent>();
        model.restaurantModel.events.subscribe(this.update.bind(this));
    }

    update() {
        const r_list = model.restaurantModel.getRestaurants()!;
        this.element.querySelector(
            ".restaurants-categories__categories__items",
        )!.innerHTML = listTemplate(r_list);
        this.element.querySelectorAll(".restaurant-card").forEach((element) =>
            element.addEventListener("click", () => {
                this.events.notify({
                    type: UIEventType.RESTAURANT_CLICK,
                    data: element.id,
                });
            }),
        );
    }

    load() {}
}
