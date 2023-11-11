import { RestaurantModel } from "./RestaurantModel";
import { UserModel } from "./UserModel";

export class Model {
    private restaurantModel_: RestaurantModel;
    private userModel_: UserModel;

    constructor() {
        this.restaurantModel_ = new RestaurantModel();
        this.userModel_ = new UserModel();
    }

    get restaurantModel() {
        return this.restaurantModel_;
    }
    get userModel() {
        return this.userModel_;
    }
}
