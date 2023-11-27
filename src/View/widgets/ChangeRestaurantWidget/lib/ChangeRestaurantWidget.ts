import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { UIEvent } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";

import changeRestaurantWidgetTemplate from "../ui/ChangeRestaurantWidget.hbs";
import "../ui/ChangeRestaurantWidget.scss";

export class ChangeRestaurantWidget
    extends IWidget
    implements Listenable<UIEvent>
{
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private productId: number;
    private form: HTMLElement;
    private closeBtn: HTMLElement;

    constructor() {
        super(changeRestaurantWidgetTemplate(), "#change-restaurant");
        this.events_ = new EventDispatcher<UIEvent>();
        this.form = this.getChild("#change-restaurant__form");
        this.closeBtn = this.getChild("#change-restaurant__close");

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.close();
            }
        });

        this.getChild(".modal__box").addEventListener("click", (event: any) => {
            event._isClickWithInModal = true;
        });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            this.close();
        });

        this.closeBtn.addEventListener("click", () => {
            this.close();
        });

        this.form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.CHANGE_ORDER_RESTAURANT,
                data: this.productId,
            });
            this.close();
        });
    }

    setNewProduct(productId: number) {
        this.productId = productId;
    }

    open() {
        this.element.classList.add("open");
        this.load();
    }

    close() {
        this.element.classList.remove("open");
    }

    load() {
        this.getChild(
            "#new-restaurant",
        ).innerText = `Оформить заказ из ресторана ${
            model.restaurantModel.getRestaurant().RestaurantInfo.Name
        }`;

        this.getChild(
            "#old-restaurant",
        ).innerText = `Все ранее добавленные блюда из ресторанa ${model.cartModel.getCurrentRestaurant()
            ?.Name} будут удалены из корзины`;
    }
}
