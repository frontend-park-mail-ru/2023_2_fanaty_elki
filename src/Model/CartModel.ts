import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";
import { Dish, Restaurant } from "./RestaurantModel";
import { AppEvent, AppModel } from "./AppModel";
import { apiConfig } from "../modules/api";

export type CartPosition = {
    Product: Dish;
    ItemCount: number;
    Sum: number;
};

export type Cart = CartPosition[];

export const enum PromoType {
    DISCOUNT = 0,
    FREE_DELIVERY = 1,
}

export type Promo = {
    Type: PromoType;
    Discount: number;
    Promo: string;
};

export const enum CartEvent {
    UPDATE = "UPDATE",
    NOT_SAME_RESTAURANT = "NOT_SAME_RESTAURANT",
    PROMO = "PROMO",
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

    private currentRestaurant: Restaurant | null;
    private promo: Promo | null;
    private errorMsg: string | null;

    /**
     * Конструктор
     */
    constructor(appModel: AppModel) {
        this.events_ = new EventDispatcher<CartEvent>();

        this.currentRestaurant = null;
        this.cart = [];
        this.promo = null;
        this.errorMsg = null;

        appModel.events.subscribe(this.clearBuffer.bind(this));
    }

    async clearBuffer(event?: AppEvent) {
        if (event !== AppEvent.ONLINE) return;
        try {
            await Api.clearCart();
            for (const product of this.cart) {
                for (let i = 0; i < product.ItemCount; i++) {
                    await Api.addDishToCart(product.Product.ID);
                }
            }
        } catch (e) {
            // console.error("Не удалось синхронизировать корзину");
            // console.error(e);
        }
        this.setCart();
    }

    async setCart() {
        try {
            const cartInfo = await Api.getCart();

            this.cart = cartInfo.Products || [];
            this.currentRestaurant = cartInfo.Restaurant;
            this.promo = cartInfo.Promo;

            if (this.promo) {
                this.promo.Discount = 1 - this.promo?.Discount / 100;
            }

            this.cart?.forEach((cartPos) => {
                cartPos.Sum = Math.round(
                    cartPos.Product.Price * cartPos.ItemCount,
                );
            });
            this.events.notify();
        } catch (e) {
            // console.error("Неудачный запрос корзины");
            // console.error(e);
        }
    }

    async increase(id: number) {
        try {
            if (model.appModel.isOnline()) {
                await Api.addDishToCart(id);
            }
            const lineItem = this.cart.find((x) => x.Product.ID === +id);
            if (lineItem) {
                lineItem.ItemCount++;
                lineItem.Sum += Math.round(lineItem.Product.Price);
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
            this.events.notify();
        } catch (e) {
            // console.error("Неудачное добавление в корзину");
            // console.error(e);
        }
    }

    async decrease(id: number) {
        try {
            if (model.appModel.isOnline()) {
                await Api.removeDishFromCart(id);
            }
            const lineItem = this.cart.find((x) => x.Product.ID === +id);
            if (lineItem) {
                lineItem.ItemCount--;
                lineItem.Sum -= Math.round(lineItem.Product.Price);
                if (lineItem.ItemCount === 0) {
                    const index = this.cart.indexOf(lineItem);
                    this.cart.splice(index, 1);
                }
            }

            if (this.cart.length === 0) {
                this.setCurrentRestaurant(null);
            }

            this.events.notify();
        } catch (e) {
            // console.error("Неудачное удаление из корзины");
            // console.error(e);
        }
    }

    async clearCart() {
        try {
            if (model.appModel.isOnline()) {
                await Api.clearCart();
            }
            this.cart = [];
            this.currentRestaurant = null;
            this.events.notify();
        } catch (e) {
            // console.error("Неудачная очистка корзины");
            // console.error(e);
        }
    }

    async setCurrentRestaurant(restaurant: Restaurant | null) {
        this.currentRestaurant = restaurant;
    }

    async releasePromo(promo: string) {
        try {
            this.promo = await Api.releasePromo(promo);
            this.promo!.Discount = 1 - this.promo!.Discount / 100;
        } catch (e: any) {
            this.errorMsg = apiConfig.api.releasePromo.failure[e.status];
        }

        this.events.notify(CartEvent.PROMO);
    }

    async cancelPromo() {
        try {
            await Api.cancelPromo(this.promo!.Promo);
            this.promo = null;
        } catch (e: any) {
            this.errorMsg = apiConfig.api.releasePromo.failure[e.status];
        }
        this.events.notify(CartEvent.PROMO);
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
        this.currentRestaurant = null;
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

    getPromo() {
        return this.promo;
    }

    getError() {
        return this.errorMsg;
    }

    clearError() {
        this.errorMsg = null;
    }
}
