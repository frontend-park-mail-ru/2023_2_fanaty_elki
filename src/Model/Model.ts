import { OrderModel } from "./OrderModel";
import { CartModel } from "./CartModel";
import { RestaurantModel } from "./RestaurantModel";
import { UserModel } from "./UserModel";
import { CommentModel } from "./CommentModel";
import { SearchModel } from "./SearchModel";
import { AppModel } from "./AppModel";

export class Model {
    private appModel_: AppModel;
    private restaurantModel_: RestaurantModel;
    private userModel_: UserModel;
    private orderModel_: OrderModel;
    private cartModel_: CartModel;
    private commentModel_: CommentModel;
    private searchModel_: SearchModel;

    constructor() {
        this.appModel_ = new AppModel();
        this.restaurantModel_ = new RestaurantModel();
        this.userModel_ = new UserModel();
        this.orderModel_ = new OrderModel();
        this.cartModel_ = new CartModel(this.appModel);
        this.commentModel_ = new CommentModel();
        this.searchModel_ = new SearchModel();
    }

    get appModel() {
        return this.appModel_;
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

    get cartModel() {
        return this.cartModel_;
    }

    get commentModel() {
        return this.commentModel_;
    }

    get searchModel() {
        return this.searchModel_;
    }
}
