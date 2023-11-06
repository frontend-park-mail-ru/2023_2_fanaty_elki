import { Api } from "../../modules/api";

export type Dish = {
    Icon: string;
    Name: string;
    Price: number;
    CookingTime: number;
    Portion: number;
    Description: string;
};

export type DishCategory = {
    title: string;
    restaurants: DishCategory[];
};

export type DishesCategoryListObject = {
    dishesCategory: DishCategory[];
};

/**
 * Модель ресторанов
 *  @class
 */
export default class DishModel {
    /**
     * Запрашивает у сервера список ресторанов
     * @async
     * @return {Promise} - список ресторанов или отклоненный промис
     */
    async getAllByRestaurant(restaurantId: number) {
        return await Api.getRestaurant(restaurantId);
    }
}
