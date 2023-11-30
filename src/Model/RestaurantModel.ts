import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export type Restaurant = {
    ID: number;
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
    LOADED_CATEGORIES = "LOADED_CATEGORIES",
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
    private currentRestaurant: RestaurantWithCategories | null;
    private categories: string[];

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

    getRestaurant() {
        return this.currentRestaurant;
    }

    getCategories() {
        return this.categories;
    }

    getDish(id: number) {
        for (const cat of this.currentRestaurant!.Categories) {
            for (const dish of cat.Products) {
                if (dish.ID === +id) {
                    return dish;
                }
            }
        }
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
            this.currentRestaurant = null;
            console.error("Не удалось загрузить блюда ресторана", id);
            console.error(e);
        }
        console.log(RestaurantEvent.LOADED_REST);
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

    async setRestaurantListByCategory(category: string) {
        try {
            this.restaurants = await Api.getRestaurantsByCategory(category);
            this.errorMsg = null;
        } catch (e) {
            this.errorMsg = (e as Error).message;
            console.error("Не удалось загрузить категорию");
            console.error(e);
        }
        this.events.notify(RestaurantEvent.LOADED_LIST);
    }

    async setCategories() {
        this.categories = await Api.getCategories();
        this.events.notify(RestaurantEvent.LOADED_CATEGORIES);
    }
}
