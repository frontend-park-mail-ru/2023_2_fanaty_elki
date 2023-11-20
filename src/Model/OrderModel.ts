import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export const enum OrderEvent {
    LOAD_ORDERS = "LOAD_ORDERS",
    CREATE_ORDER = "CREATE_ORDER",
    LOAD_CURRENT_ORDER = "LOAD_CURRENT_ORDER",
}

export const enum OrderStatus {
    MAKING = "MAKING",
    DRIVING = "DRIVING",
    DONE = "DONE",
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

    private statusMapper(status: string) {
        switch (status) {
            case "1":
                return OrderStatus.MAKING;
        }
        return OrderStatus.MAKING;
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

    async setCurrentOrder(orderId: number) {
        this.currentOrder = {
            Id: orderId,
            Status: this.statusMapper("1"),
            Date: new Date("December 17, 1995 03:24:00"),
            Address: {
                City: "Москва",
                Street: "6-я парковая улица",
                House: "2/73",
                Flat: 637,
            },
            OrderItems: [
                {
                    RestaurantName: "Бургер-Кинг",
                    Products: [
                        {
                            Id: 1,
                            Name: "Борщ",
                            Price: 199,
                            Icon: "img/borsh.png",
                            Count: 1,
                            Sum: 199,
                        },
                        {
                            Id: 1,
                            Name: "Борщ",
                            Price: 199,
                            Icon: "img/borsh.png",
                            Count: 1,
                            Sum: 199,
                        },
                        {
                            Id: 1,
                            Name: "Борщ",
                            Price: 199,
                            Icon: "img/borsh.png",
                            Count: 1,
                            Sum: 199,
                        },
                    ],
                },
                {
                    RestaurantName: "Бургер-Кинг",
                    Products: [
                        {
                            Id: 1,
                            Name: "Борщ",
                            Price: 199,
                            Icon: "img/borsh.png",
                            Count: 1,
                            Sum: 199,
                        },
                        {
                            Id: 1,
                            Name: "Борщ",
                            Price: 199,
                            Icon: "img/borsh.png",
                            Count: 1,
                            Sum: 199,
                        },
                        {
                            Id: 1,
                            Name: "Борщ",
                            Price: 199,
                            Icon: "img/borsh.png",
                            Count: 1,
                            Sum: 199,
                        },
                    ],
                },
            ],
            Sum: 19999,
            DeliveryTime: 35, // в минутах
        };
        this.events.notify(OrderEvent.LOAD_CURRENT_ORDER);
    }

    getCurrentOrder() {
        return this.currentOrder;
    }
}
