import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export const enum OrderEvent {
    LOAD_ORDERS = "LOAD_ORDERS",
    CREATE_ORDER = "CREATE_ORDER",
}

export type Order = {
    Id: number;
    Status: string;
    Date: string;
    Address: string;
};

export class OrderModel implements Listenable<OrderEvent> {
    private events_: EventDispatcher<OrderEvent>;
    get events() {
        return this.events_;
    }

    private orders: Order[];

    constructor() {
        this.events_ = new EventDispatcher<OrderEvent>();
        this.orders = [];
    }

    getOrders(): Order[] {
        return this.orders;
    }

    async setOrders() {
        try {
            this.orders = await Api.getUserOrders();
            this.events.notify(OrderEvent.LOAD_ORDERS);
        } catch (e) {
            console.error("Неудалось загрузить заказы");
            console.error(e);
        }
    }

    async createOrder(Products: number[], Address: string) {
        try {
            const mocAddress = {
                City: "Moscow",
                Street: Address + "adsad",
                House: "2/73",
                Flat: 637,
            };
            await Api.createOrder(Products, mocAddress);
            this.events.notify(OrderEvent.CREATE_ORDER);
        } catch (e) {
            console.error("Не удалось создать заказ");
            console.error(e);
        }
    }
}
