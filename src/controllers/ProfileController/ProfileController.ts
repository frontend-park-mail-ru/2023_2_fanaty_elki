import OrderModel from "../../models/OrderModel/OrderModel";
import UserModel from "../../models/UserModel/UserModel";
import ProfileView from "../../views/ProfileView/ProfileView";
import IController from "../IController";

export default class ProfileController implements IController {
    private userModel: UserModel;
    private orderModel: OrderModel;

    private profileView: ProfileView;

    constructor(
        userModel_: UserModel,
        orderModel_: OrderModel,
        profileView_: ProfileView,
    ) {
        this.userModel = userModel_;
        this.orderModel = orderModel_;
        this.profileView = profileView_;
    }

    async start(params?: URLSearchParams | undefined) {
        this.profileView.mountNavbar();
        try {
            const orders = await this.orderModel.getUserOrders() || {};
            const user = await this.userModel.getCurrentUser();

            this.profileView.setUser(user);
            this.profileView.setOrders(orders);
        } catch (e) {
            console.log(e);
        }
        this.profileView.render();
    }

    stop(): void {
        this.profileView.clear();
    }
}