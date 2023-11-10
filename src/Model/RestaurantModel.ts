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
        const response = await Api.getRestaurants();
        console.log("Список ресторанов", response);
        this.restaurants = response.restaurants;
        this.notifyObservers();
    }
}
