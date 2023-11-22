import { UIEvent } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";

import orderWidgetTemplate from "../ui/OrderWidget.hbs";
import "../ui/OrderWidget.scss";
import "../ui/Modal.scss";

import orderProductsTemplate from "../ui/orderProducts.hbs";
import "../ui/orderProducts.scss";
import { OrderEvent } from "../../../../Model/OrderModel";

export class OrderWidget extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private orderNum: HTMLElement;
    private deliveryTime: HTMLElement;
    private orderStatus: HTMLElement;
    private orderProducts: HTMLElement;
    private closeButton: HTMLElement;
    private sum: HTMLElement;

    constructor() {
        super(orderWidgetTemplate(), "#order-widget");

        model.orderModel.events.subscribe(this.updateOrderEvent.bind(this));

        this.closeButton = <HTMLElement>this.getChild("#order-widget__close");
        this.orderNum = <HTMLElement>this.getChild("#order-number");
        this.deliveryTime = <HTMLElement>this.getChild("#delivery-time");
        this.orderStatus = <HTMLElement>this.getChild("#order-status");
        this.orderProducts = <HTMLElement>this.getChild("#products");

        this.sum = <HTMLElement>this.getChild("#sum");

        this.bindEvents();
    }

    private presentDeliveryTime(orderDate: Date, deliveryTime: number) {
        const deliveryDate = orderDate;
        deliveryDate.setMinutes(deliveryDate.getMinutes() + deliveryTime);
        return `${deliveryDate.getHours()}:${deliveryDate.getMinutes()}`;
    }

    bindEvents() {
        this.closeButton.addEventListener("click", () => {
            this.close();
        });
        this.getChild(".modal__box").addEventListener("click", (event: any) => {
            event._isClickWithInModal = true;
        });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            this.close();
        });
    }

    updateOrderEvent(event?: OrderEvent) {
        if (event === OrderEvent.LOAD_CURRENT_ORDER) {
            const order = model.orderModel.getCurrentOrder()!;
            console.log(order);

            this.orderNum.innerText = `Заказ ${order.Id}`;
            this.deliveryTime.innerText = `Ожидаемое время доставки ${this.presentDeliveryTime(
                order.Date,
                order.DeliveryTime,
            )}`;
            this.orderStatus.innerText = `${order.Status}`;
            this.sum.innerText = `Сумма заказа ${order.Sum}₽`;

            this.orderProducts.innerHTML = orderProductsTemplate(
                order.OrderItems,
            );

            this.open();
        }
    }

    open() {
        this.element.classList.add("open");
    }

    close() {
        this.element.classList.remove("open");
    }
}
