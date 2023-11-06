import { Api } from "../../modules/api";

export type Restaurant = {
    Id: number;
    Icon: string;
    Name: string;
    DeliveryPrice: number;
    DeliveryTime: number;
    DeliveryTimeMax: number;
};

export type RestaurantCategory = {
    title: string;
    restaurants: Restaurant[];
};

export type RestaurantCategoryListObject = {
    restaurantsCategories: RestaurantCategory[];
};

/**
 * Модель ресторанов
 *  @class
 */
export default class RestaurantModel {
    /**
     * Запрашивает у сервера список ресторанов
     * @async
     * @return {Promise} - список ресторанов или отклоненный промис
     */
    async getAll() {
        const data = await Api.getAllRestaurants();
        data.restaurants.forEach((element: Restaurant) => {
            element.DeliveryTimeMax = element.DeliveryTime + 10; // грязый хак
        });
        return {
            restaurantsCategories: [
                {
                    title: "Все рестораны",
                    restaurants: data.restaurants,
                },
            ],
        };
    }
}
