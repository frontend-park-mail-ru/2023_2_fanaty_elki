import CartModel from "../../models/CartModel/CartModel";
import DishModel from "../../models/DishModel/DishModel";
import OrderModel from "../../models/OrderModel/OrderModel";
import UserModel from "../../models/UserModel/UserModel";
import CartView from "../../views/CartView/CartView";
import IController from "../IController";


export default class CartController implements IController {
    private cartModel: CartModel;
    private dishModel: DishModel;
    private orderModel: OrderModel;
    private userModel: UserModel;

    private cartView: CartView;

    constructor(
        cartView_: CartView,
        cartModel_: CartModel,
        dishModel_: DishModel,
        orderModel_: OrderModel,
        userModel_: UserModel,
    ) {
        this.cartView = cartView_;

        this.cartModel = cartModel_;
        this.dishModel = dishModel_;
        this.orderModel = orderModel_;
        this.userModel = userModel_;
    }

    async start(params?: URLSearchParams | undefined) {
        this.cartView.mountNavbar();
        try {
            const cartItems = this.cartModel.getAllItems();
            const address = this.userModel.getAddress() || "";
            const cartSum = this.cartModel.cartSum();

            this.cartView.updateCartList(cartItems);
            this.cartView.updateAddress(address);
            this.cartView.setCartSum(cartSum);
        } catch (e) {
            console.log(e);
        }

        this.cartView.render();

        //TODO: Добавить все бинды
        navbar.bindPersonClick(() => {
            router.redirect("/login");
        });
        navbar.bindExitClick(this.logout.bind(this));
        navbar.bindLogoClick(() => {
            router.redirect("/");
        });
    }

    stop(): void {
        this.cartView.clear();
    }

    async logout() {
        try {
            await this.userModel.logout();
            navbar.setNonAuthUser();
        } catch (e) {
            console.log(e);
        }
    }
}