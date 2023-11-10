import { RestaurantModel } from "./RestaurantModel";
import { IObservable } from "../modules/observer";
import { URLModel } from "./UrlModel";

export class Model extends IObservable {
    private restaurantModel_: RestaurantModel;
    private URLModel_: URLModel;

    get restaurantModel() {
        return this.restaurantModel_;
    }
    get URLModel() {
        return this.URLModel_;
    }

    constructor() {
        super();
        this.restaurantModel_ = new RestaurantModel();
        this.URLModel_ = new URLModel();
    }
}
