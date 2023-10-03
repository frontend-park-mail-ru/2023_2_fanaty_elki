import { request, get, post } from "/modules/ajax.js";

export class RestaurantModel {
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
