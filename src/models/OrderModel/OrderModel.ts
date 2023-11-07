import { Api } from "../../modules/api";

export default class OrderModel {
    async getUserOrders() {
        return await Api.getUserOrders();
    }
}