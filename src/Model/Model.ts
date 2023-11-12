import { OrderModel } from "./OrderModel";
import { RestaurantModel } from "./RestaurantModel";
import { UserModel } from "./UserModel";

export class Model {
    private restaurantModel_: RestaurantModel;
    private userModel_: UserModel;
    private orderModel_: OrderModel;

    constructor() {
        this.restaurantModel_ = new RestaurantModel();
        this.userModel_ = new UserModel();
        this.orderModel_ = new OrderModel();
    }

    get restaurantModel() {
        return this.restaurantModel_;
    }
    get userModel() {
        return this.userModel_;
    }
    get orderModel() {
        return this.orderModel_;
    }
}
