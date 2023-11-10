import { RestaurantModel } from "./RestaurantModel";
import { IObservable } from "../modules/observer";
import { URLModel } from "./UrlModel";
import { UserModel } from "./UserModel";

export class Model extends IObservable {
    private restaurantModel_: RestaurantModel;
    private URLModel_: URLModel;
    private userModel_: UserModel;

    constructor() {
        super();
        this.restaurantModel_ = new RestaurantModel();
        this.URLModel_ = new URLModel();
        this.userModel_ = new UserModel();
    }

    get restaurantModel() {
        return this.restaurantModel_;
    }
    get URLModel() {
        return this.URLModel_;
    }
    get userModel() {
        return this.userModel_;
    }
}
