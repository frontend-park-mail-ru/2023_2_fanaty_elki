import { UIEvent, UIEventType } from "../../../../config";
import { IWidget } from "../../../types";
import { EventDispatcher, Listenable } from "../../../../modules/observer";

import orderListTemplate from "../ui/OrderList.hbs";
import { OrderEvent } from "../../../../Model/OrderModel";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

export class OrderList extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    constructor() {
        super(orderListTemplate(), "#order-list");
        this.events_ = new EventDispatcher<UIEvent>();
        model.orderModel.events.subscribe(this.update.bind(this));

        this.bindEvents();
    }

    bindEvents() {
        this.bindOrderClick();
    }

    bindOrderClick() {
        this.getAll(".order-list__item").forEach((item) => {
            item.addEventListener("click", () => {
                this.events.notify({
                    type: UIEventType.ORDER_CLICK,
                    data: item.dataset.orderId,
                });
            });
        });
    }

    update(event?: OrderEvent) {
        if (event !== OrderEvent.LOAD_ORDERS) return;
        const orders = model.orderModel.getOrders();
        this.element.innerHTML = orderListTemplate(orders);
        this.bindOrderClick();
    }

    load() {
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.ORDER_UPDATE,
            data: null,
        });
    }
}
