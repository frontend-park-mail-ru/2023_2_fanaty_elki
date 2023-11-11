import { RestaurantModel } from "./RestaurantModel";
import { IObservable } from "../modules/observer";
import { URLModel } from "./URLModel";
import { UserModel } from "./UserModel";
import { ModalModel } from "./ModalModel";
import { RegistrationModel } from "./RegistrationModel";

export class Model extends IObservable {
    private restaurantModel_: RestaurantModel;
    private URLModel_: URLModel;
    private userModel_: UserModel;
    private modalModel_: ModalModel;
    private registrationModel_: RegistrationModel;

    constructor() {
        super();
        this.restaurantModel_ = new RestaurantModel();
        this.URLModel_ = new URLModel();
        this.userModel_ = new UserModel();
        this.modalModel_ = new ModalModel();
        this.registrationModel_ = new RegistrationModel();
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
    get modalModel() {
        return this.modalModel_;
    }
    get registrationModel() {
        return this.registrationModel_;
    }
}
