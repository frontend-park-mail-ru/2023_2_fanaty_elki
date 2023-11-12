import { CartModel } from "./CartModel";
import { RestaurantModel } from "./RestaurantModel";
import { UserModel } from "./UserModel";

export class Model {
    private restaurantModel_: RestaurantModel;
    private userModel_: UserModel;
    private cartModel_: CartModel;

    constructor() {
        this.restaurantModel_ = new RestaurantModel();
        this.userModel_ = new UserModel();
        this.cartModel_ = new CartModel();
    }

    get restaurantModel() {
        return this.restaurantModel_;
    }
    get userModel() {
        return this.userModel_;
    }
    get cartModel() {
        return this.cartModel_;
    }
}
