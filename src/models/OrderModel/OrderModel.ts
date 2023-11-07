import { Api } from "../../modules/api";

export default class OrderModel {
    async getUserOrders() {
        return { orders: await Api.getUserOrders() };
    }

    async createOrder(dishesId: any) {
        return await Api.createOrder(`{ "Products": ${JSON.stringify(await dishesId)} }`);
    }
}