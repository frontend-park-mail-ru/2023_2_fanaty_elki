import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";
import { Dish } from "./RestaurantModel";

export type CartPosition = {
    Product: Dish;
    ItemCount: number;
};

export type Cart = CartPosition[];

export const enum CartEvent {
    UPDATE = "UPDATE",
}

/**
 * Модель пользователя
 * @class
 */
export class CartModel implements Listenable<CartEvent> {
    private cart: Cart;

    private events_: EventDispatcher<CartEvent>;
    get events(): EventDispatcher<CartEvent> {
        return this.events_;
    }

    /**
     * Конструктор
     */
    constructor() {
        this.events_ = new EventDispatcher<CartEvent>();
        this.cart = [];
    }

    async setCart() {
        console.log("set cart");
        try {
            this.cart = await Api.getCart();
        } catch (e) {
            console.log("Неудачный запрос корзины");
        }
        this.events.notify();
    }

    async increase(id: number) {
        try {
            await Api.addDishToCart(id);
            this.cart = await Api.getCart();
            console.log(this.cart);
        } catch (e) {
            console.log("Неудачное добавление");
        }
        this.events.notify();
    }

    async decrease(id: number) {
        try {
            await Api.removeDishFromCart(id);
            this.cart = await Api.getCart();
            console.log(this.cart);
        } catch (e) {
            console.log("Неудачное удаление");
        }
        this.events.notify();
    }

    getCart() {
        return this.cart;
    }
}
