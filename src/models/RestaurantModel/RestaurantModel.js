import { request, get, post } from "/modules/ajax.js";

/**
 * Модель ресторанов
 *  
 */
export class RestaurantModel {
    /**
     * Запрашивает у сервера список ресторанов
     * @async
     * @return {Promise} - список ресторанов или отклоненный промис
     */
    async getAll() {
        const response = await fetch(backendURL + '/restaurants', {
            method: GET,
            credentials: 'include',
        });
        if (response.ok) {
            const res = await response.json();
            return res.Body;
        }
        return Promise.reject();
    }
}
