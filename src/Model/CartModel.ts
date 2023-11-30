import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";
import { Dish } from "./RestaurantModel";

export type CartPosition = {
    Product: Dish;
    ItemCount: number;
    Sum: number;
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
        try {
            this.cart = await Api.getCart();
            this.cart?.forEach((cartPos) => {
                cartPos.Sum = Math.round(
                    cartPos.Product.Price * cartPos.ItemCount,
                );
            });
        } catch (e) {
            console.error("Неудачный запрос корзины");
            console.error(e);
        }
        this.events.notify();
    }

    async increase(id: number) {
        try {
            await Api.addDishToCart(id);
            const lineItem = this.cart.find((x) => x.Product.ID === +id);
            if (lineItem) {
                lineItem.ItemCount++;
                lineItem.Sum += lineItem.Product.Price;
            } else {
                const dish = model.restaurantModel.getDish(id);
                if (dish) {
                    this.cart.push({
                        Product: dish,
                        ItemCount: 1,
                        Sum: dish.Price,
                    });
                }
            }
            console.log(this.cart);
        } catch (e) {
            console.error("Неудачное добавление");
            console.error(e);
        }
        this.events.notify();
    }

    async decrease(id: number) {
        try {
            await Api.removeDishFromCart(id);
            const lineItem = this.cart.find((x) => x.Product.ID === +id);
            if (lineItem) {
                lineItem.ItemCount--;
                lineItem.Sum -= lineItem.Product.Price;
                if (lineItem.ItemCount === 0) {
                    const index = this.cart.indexOf(lineItem);
                    this.cart.splice(index, 1);
                }
            }
        } catch (e) {
            console.error("Неудачное удаление");
            console.error(e);
        }
        this.events.notify();
    }

    async clearCart() {
        await Api.clearCart();
        this.cart = [];
        this.events.notify();
    }

    clearLocalCart() {
        this.cart = [];
        this.events.notify();
    }

    getCart() {
        return this.cart;
    }

    getDishCount(id: number) {
        if (!this.cart) {
            return 0;
        }
        const dish = this.cart!.find((element) => {
            return element.Product.ID === id;
        });
        return dish ? dish.ItemCount : 0;
    }

    getSumm() {
        if (!this.cart) {
            return 0;
        }
        let summ = 0;
        for (const product of this.cart) {
            summ += product.Product.Price * product.ItemCount;
        }
        return Math.round(summ);
    }
}
