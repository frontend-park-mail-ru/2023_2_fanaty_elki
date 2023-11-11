import { IWidget } from "../../../types";
import restaurantsTemplate from "../ui/RestaurantsList.hbs";
import "../ui/RestaurantsList.scss";
import "../ui/RestaurantCard.scss";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
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
        // this.bindEvents();
    }

    private bindEvents() {
        this.element
            .querySelector(".restaurant-card")!
            .addEventListener("click", (event: any) => {
                event.click = true;
                event.id = ((event as Event).currentTarget as HTMLElement).id;
            });
        this.element
            .querySelector(".restaurants-categories__categories__items")!
            .addEventListener("click", (event: any) => {
                if (event.click) {
                    this.events.notify({
                        type: UIEventType.RESTAURANT_CLICK,
                        data: <number>event.id,
                    });
                }
            });
    }

    update() {
        console.log(this);
        console.log(this.element);
        const r_list = model.restaurantModel.getRestaurants()!;
        this.element.innerHTML = restaurantsTemplate(r_list);
    }

    load() {
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.RESTAURANTS_UPDATE,
            data: null,
        });
    }
}
