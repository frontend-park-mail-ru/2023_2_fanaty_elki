import { OrderModel } from "./OrderModel";
import { CartModel } from "./CartModel";
import { RestaurantModel } from "./RestaurantModel";
import { UserModel } from "./UserModel";
import { CommentModel } from "./CommentModel";

export class Model {
    private restaurantModel_: RestaurantModel;
    private userModel_: UserModel;
    private orderModel_: OrderModel;
    private cartModel_: CartModel;
    private commentModel_: CommentModel;

    constructor() {
        this.restaurantModel_ = new RestaurantModel();
        this.userModel_ = new UserModel();
        this.orderModel_ = new OrderModel();
        this.cartModel_ = new CartModel();
        this.commentModel_ = new CommentModel();
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
}
