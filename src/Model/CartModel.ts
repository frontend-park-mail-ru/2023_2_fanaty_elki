import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";
import { Dish, Restaurant } from "./RestaurantModel";
import { AppEvent, AppModel } from "./AppModel";

export type CartPosition = {
    Product: Dish;
    ItemCount: number;
    Sum: number;
};

export type Cart = CartPosition[];

export const enum CartEvent {
    UPDATE = "UPDATE",
    NOT_SAME_RESTAURANT = "NOT_SAME_RESTAURANT",
}

/**
 * Модель пользователя
 * @class
 */
export class CartModel implements Listenable<CartEvent> {
    private cart: Cart;
    requestBuffer: Map<number, number>;

    private events_: EventDispatcher<CartEvent>;
    get events(): EventDispatcher<CartEvent> {
        return this.events_;
    }

    private currentRestaurant: Restaurant | null;

    /**
     * Конструктор
     */
    constructor(appModel: AppModel) {
        this.events_ = new EventDispatcher<CartEvent>();
        this.currentRestaurant = null;
        this.cart = [];
        this.requestBuffer = new Map<number, number>();
        appModel.events.subscribe(this.clearBuffer.bind(this));
    }

    async clearBuffer(event?: AppEvent) {
        if (event !== AppEvent.ONLINE) return;
        try {
            for (const [id, value] of this.requestBuffer) {
                if (value > 0) {
                    for (let i = 0; i < value; i++) {
                        await Api.addDishToCart(id);
                    }
                } else if (value < 0) {
                    for (let i = value; i < 0; i++) {
                        await Api.removeDishFromCart(id);
                    }
                }
            }
        } catch (e) {
            console.log("Не удалось синхронизировать корзину");
        }
        this.requestBuffer.clear();
        this.setCart();
    }

    async setCart() {
        try {
            const cartInfo = await Api.getCart();
            this.cart = cartInfo.Products;
            this.currentRestaurant = cartInfo.Restaurant;
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
            if (!model.appModel.isOnline()) {
                const val = this.requestBuffer.get(id);
                this.requestBuffer.set(id, val ? val + 1 : 1);
            } else {
                await Api.addDishToCart(id);
            }
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
        } catch (e) {
            console.error("Неудачное добавление");
            console.error(e);
        }
        this.events.notify();
        console.log("buffer: ", this.requestBuffer);
    }

    async decrease(id: number) {
        try {
            if (!model.appModel.isOnline()) {
                const val = this.requestBuffer.get(id);
                this.requestBuffer.set(id, val ? val - 1 : -1);
            } else {
                await Api.removeDishFromCart(id);
            }
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
        console.log("buffer: ", this.requestBuffer);
    }

    async clearCart() {
        await Api.clearCart();
        this.cart = [];
        this.currentRestaurant = null;
        this.events.notify();
    }

    async setCurrentRestaurant(restaurant: Restaurant) {
        this.currentRestaurant = restaurant;
    }

    isSameRestaurant(restaurant: Restaurant) {
        return (
            !this.currentRestaurant ||
            this.currentRestaurant.ID === restaurant.ID
        );
    }

    getCurrentRestaurant() {
        return this.currentRestaurant;
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
