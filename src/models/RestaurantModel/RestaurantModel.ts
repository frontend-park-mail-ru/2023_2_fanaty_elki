import { Api } from "../../modules/api";
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
        return await Api.getRestaurants();
    }
}
