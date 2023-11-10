import { RestaurantModel } from "./RestaurantModel";
import { IObservable } from "../modules/observer";

export class Model extends IObservable {
    private restaurantModel_: RestaurantModel;
    private url_: string;
    get restaurantModel() {
        return this.restaurantModel_;
    }
    get url() {
        return this.url_;
    }
    constructor() {
        super();
        this.restaurantModel_ = new RestaurantModel();
        this.url_ = "/";
    }
    updateUrl(url: string) {
        this.url_ = url;
        this.notifyObservers();
    }
}
