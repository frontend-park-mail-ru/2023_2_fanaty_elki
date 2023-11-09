import { Api } from "../modules/api";
import { IObservable } from "../modules/observer";

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

/**
 * Модель ресторана
 * @class
 */

export class RestaurantModel extends IObservable {
    /**
     * Список ресторанов
     */
    private restaurants: Restaurant[] | null;

    /**
     * Конструктор
     */
    constructor() {
        super();
        this.restaurants = null;
    }

    /**
     * Получение списка ресторанов
     * @async
     * @returns {Restaurant[] | null} - список ресторанов
     */
    async getRestaurants(): Promise<Restaurant[] | null> {
        if (!this.restaurants) {
            this.setRestaurantList(await Api.getRestaurants());
        }
        return this.restaurants;
    }

    /**
     * Установка списка ресторанов
     * @param {Restaurant[]} restautants - список ресторанов
     */
    setRestaurantList(restautants: Restaurant[]) {
        this.restaurants = restautants;
        this.notifyObservers();
    }
}
