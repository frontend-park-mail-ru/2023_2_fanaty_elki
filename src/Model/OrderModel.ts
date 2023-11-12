import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export const enum OrderEvent {
    LOAD_ORDERS = "LOAD_ORDERS",
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
        this.orders = await Api.getUserOrders();
        this.events.notify(OrderEvent.LOAD_ORDERS);
    }

    async createOrder(Products: number[], Address: string) {
        const mocAddress = {
            City: "Moscow",
            Street: Address,
            House: "2/73",
            Flat: 637,
        };
        Api.createOrder(Products, mocAddress);
        this.events.notify(OrderEvent.LOAD_ORDERS);
    }
}
