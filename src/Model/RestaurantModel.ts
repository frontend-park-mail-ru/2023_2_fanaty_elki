import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export type Restaurant = {
    Id: number;
    Name: string;
    Rating: number;
    Icon: string;
    DeliveryPrice: number;
    MinDeliveryTime: number;
    MaxDeliveryTime: number;
    Category: string;
    CommentsCount: number;
};

export enum RestaurantEvent {
    LOADED = "LOADED",
}

/**
 * Модель ресторана
 * @class
 */

export class RestaurantModel implements Listenable<RestaurantEvent> {
    private events_: EventDispatcher<RestaurantEvent>;
    get events(): EventDispatcher<RestaurantEvent> {
        return this.events_;
    }
    /**
     * Список ресторанов
     */
    private restaurants: Restaurant[] | null;

    /**
     * Сообщение об ошибке
     */
    private errorMsg: string | null;

    /**
     * Конструктор
     */
    constructor() {
        this.events_ = new EventDispatcher<RestaurantEvent>();
        this.restaurants = null;
    }

    /**
     * Получение списка ресторанов
     * @returns {Restaurant[] | null} - список ресторанов
     */
    getRestaurants(): Restaurant[] | null {
        return this.restaurants;
    }

    /**
     * Установка списка ресторанов
     * @async
     */
    async setRestaurantList() {
        try {
            this.restaurants = await Api.getRestaurants();
            this.errorMsg = null;
        } catch (e) {
            this.errorMsg = (e as Error).message;
        }
        this.events.notify();
    }
}
