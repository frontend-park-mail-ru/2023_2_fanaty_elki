import { getRestaurants } from "../../modules/api.js";
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
        const data = await getRestaurants();
        return data;
    }
}
