import { UIEvent } from "../../../../config";
import { IWidget } from "../../../types";
import { EventDispatcher, Listenable } from "../../../../modules/observer";

import orderListTemplate from "../ui/OrderList.hbs";
import "../ui/OrderList.scss";
import { OrderEvent } from "../../../../Model/OrderModel";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

export class OrderList extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    constructor() {
        super(orderListTemplate(), ".order-list");
        model.orderModel.events.subscribe(this.update.bind(this));
    }

    update(event?: OrderEvent) {
        if (event !== OrderEvent.LOAD_ORDERS) return;
        const orders = model.orderModel.getOrders();
        console.log(orders);
        this.element.innerHTML = orderListTemplate(orders);
    }

    load() {
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.ORDER_UPDATE,
            data: null,
        });
    }
}
