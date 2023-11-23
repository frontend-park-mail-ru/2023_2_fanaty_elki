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
    Categories: string[];
    CommentsCount: number;
};

export type Dish = {
    ID: number;
    Name: string;
    Price: number;
    CookingTime: number;
    Portion: string;
    Description: string;
    Icon: string;
};

export type Category = {
    MenuType: {
        ID: number;
        Name: string;
        RestaurantID: number;
    };
    Products: Dish[];
};

export type RestaurantWithCategories = {
    RestaurantInfo: Restaurant;
    Categories: Category[];
};

export enum RestaurantEvent {
    LOADED_LIST = "LOADED_LIST",
    LOADED_REST = "LOADED_REST",
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
    private currentRestaurant: RestaurantWithCategories;

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

    getRestaurant(): RestaurantWithCategories {
        return this.currentRestaurant;
    }

    async setRestaurant(id: number) {
        try {
            const restaurant = await Api.getRestaurant(id);
            const dishes = await Api.getDishes(id);
            this.currentRestaurant = {
                RestaurantInfo: restaurant,
                Categories: dishes,
            };
            this.errorMsg = null;
        } catch (e) {
            this.errorMsg = (e as Error).message;
            console.error("Не удалось загрузить блюда ресторана", id);
            console.error(e);
        }
        this.events.notify(RestaurantEvent.LOADED_REST);
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
            console.error("Не удалось загрузить рестораны");
            console.error(e);
        }
        this.events.notify(RestaurantEvent.LOADED_LIST);
    }
}
