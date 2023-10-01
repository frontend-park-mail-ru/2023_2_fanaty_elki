import { request, get, post } from "/modules/ajax.js";

export class Restaurant {
    getAll() {
        const headers = {
            'Content-Type': 'application/json'
        };
        return get('/restaurant/all', headers);
    }
}
