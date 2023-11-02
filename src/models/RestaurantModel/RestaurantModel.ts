import { getRestaurants } from "../../modules/api";

export type Restaurant = {
    Icon: string;
    Name: string;
    DeliveryPrice: number;
    DeliveryTime: number;
    DeliveryTimeMax: number;
};

export type RestaurantCategory = {
    title: string;
    restaurants: Restaurant[];
}

export type RestaurantCategoryListObject = {
    restaurantsCategories: RestaurantCategory[];
}

/**
 * Модель ресторанов
 *  @class
 */
export class RestaurantModel {
    /**
     * Запрашивает у сервера список ресторанов
     * @async
     * @return {Promise} - список ресторанов или отклоненный промис
     */
    async getAll() {
        let data = await getRestaurants();
        data.restaurants.forEach((element: Restaurant) => {
            element.DeliveryTimeMax = element.DeliveryTime + 10; // грязый хак
        });
        console.log(data);
        return {
            restaurantsCategories: [
                {
                    title: "Все рестораны",
                    restaurants: data.restaurants,
                },
            ]
        }
    }
}
