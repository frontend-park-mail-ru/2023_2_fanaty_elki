import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export const enum OrderEvent {
    LOAD_ORDERS = "LOAD_ORDERS",
    CREATE_ORDER = "CREATE_ORDER",
    LOAD_CURRENT_ORDER = "LOAD_CURRENT_ORDER",
    OFFLINE = "OFFLINE",
}

export const enum OrderStatus {
    MAKING = "Готовится",
    DRIVING = "Курьер в пути",
    DONE = "Доставлен",
}

export type Order = {
    Id: number;
    Status: OrderStatus;
    Date: Date;
    Address: { [index: string]: string | number };
    Sum: number;
    DeliveryTime: number;
};

export type Product = {
    Id: number;
    Name: string;
    Price: number;
    Icon: string;
    Count: number;
    Sum: number;
};

export type OrderItem = {
    RestaurantName: string;
    Products: Product[];
};

export type OrderWithProducts = Order & {
    OrderItems: OrderItem[];
};

export class OrderModel implements Listenable<OrderEvent> {
    private events_: EventDispatcher<OrderEvent>;
    get events() {
        return this.events_;
    }

    private orders: Order[];
    private currentOrder: OrderWithProducts | null;

    constructor() {
        this.events_ = new EventDispatcher<OrderEvent>();
        this.orders = [];
        this.currentOrder = null;
    }

    private statusMapper(status: number) {
        switch (status) {
            case 0:
                return OrderStatus.MAKING;
            case 1:
                return OrderStatus.DRIVING;
            case 2:
                return OrderStatus.DONE;
        }
        return OrderStatus.MAKING;
    }

    getOrders(): Order[] {
        return this.orders;
    }

    async setOrders() {
        try {
            const orders = await Api.getUserOrders();
            orders.forEach((order) => {
                order.Status = this.statusMapper(order.Status);
            });
            this.orders = orders;
            this.events.notify(OrderEvent.LOAD_ORDERS);
        } catch (e) {
            console.error("Неудалось загрузить заказы");
            console.error(e);
        }
    }

    async createOrder(Address: string) {
        try {
            const mocAddress = {
                City: "Moscow",
                Street: Address + "adsad",
                House: "2/73",
                Flat: 637,
            };
            await Api.createOrder(mocAddress);
            this.events.notify(OrderEvent.CREATE_ORDER);
        } catch (e) {
            if (!model.appModel.isOnline()) {
                this.events.notify(OrderEvent.OFFLINE);
                throw e;
            }
            console.error("Не удалось создать заказ");
            console.error(e);
        }
    }

    async setCurrentOrder(orderId: number) {
        try {
            const order = await Api.getOrder(orderId);

            order.Status = this.statusMapper(order.Status);
            order.Date = new Date(order.Date);
            order.OrderItems.forEach((item) => {
                item.Products.forEach((product) => {
                    product.Sum = product.Price * product.Count;
                });
            });

            this.currentOrder = order;
            this.events.notify(OrderEvent.LOAD_CURRENT_ORDER);
        } catch (e) {
            console.error("Не удалось загрузить заказ");
            console.error(e);
        }
    }

    getCurrentOrder() {
        return this.currentOrder;
    }
}
