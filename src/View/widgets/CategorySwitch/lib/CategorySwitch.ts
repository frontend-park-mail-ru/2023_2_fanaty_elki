import { UIEvent } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";

import categorySwitch from "../ui/CategorySwitch.hbs";
import categorySwitchTemplate from "../ui/CategorySwitchTemplate.hbs";
import "../ui/CategorySwitch.scss";
import { RestaurantEvent } from "../../../../Model/RestaurantModel";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

export class CategorySwitch extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private switch: HTMLElement;
    private title: HTMLElement;
    private selectedCategory: HTMLElement;

    constructor() {
        super(categorySwitch(), "#category-switch");
        this.events_ = new EventDispatcher<UIEvent>();
        this.switch = this.getChild("#switch");
        this.title = this.getChild("#switch__title");

        model.restaurantModel.events.subscribe(
            this.updateRestaurantEvent.bind(this),
        );

        this.bindEvents();
    }

    bindEvents() {
        this.getAll(".category-switch__switch__category").forEach(
            (category) => {
                category.addEventListener("click", (event: any) => {
                    this.title.innerText = event.target!.id;

                    this.selectedCategory.classList.remove(
                        "category-switch__switch__category_selected",
                    );
                    this.selectedCategory = event.target!;
                    this.selectedCategory.classList.add(
                        "category-switch__switch__category_selected",
                    );

                    controller.handleEvent({
                        type: VIEW_EVENT_TYPE.RESTAURANTS_CATEGORY_UPDATE,
                        data: this.selectedCategory.id,
                    });
                });
            },
        );
    }

    updateRestaurantEvent(event?: RestaurantEvent) {
        if (event == RestaurantEvent.LOADED_CATEGORIES) {
            this.title.innerText = "Все рестораны";
            this.switch.innerHTML = categorySwitchTemplate(
                model.restaurantModel.getCategories(),
            );
            this.selectedCategory = this.getChild("#Рестораны");
            this.bindEvents();
        }
    }

    load() {
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.LOAD_CATEGORIES,
            data: null,
        });
    }
}
