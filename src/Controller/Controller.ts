import { User } from "../Model/UserModel";

export enum VIEW_EVENT_TYPE {
    LOGIN = "LOGIN",
    REGISTRATION = "REGISTRATION",
    RESTAURANTS_UPDATE = "RESTAURANTS_UPDATE",
    ADD_DISH = "ADD_DISH",
    RESTAURANT_UPDATE = "RESTAURANT_UPDATE",
    ADDRESS_UPDATE = "ADDRESS_UPDATE",
    INCREASE_CART = "INCREASE_UPDATE",
    DECREASE_CART = "DECREASE_UPDATE",
    LOGOUT = "LOGOUT",
    ORDER_UPDATE = "ORDER_UPDATE",
    AUTH = "AUTH",
    LOAD_CART = "LOAD_CART",
    CREATE_ORDER = "CREATE_ORDER",
    CLEAR_CART = "CLEAR_CART",
}

export type ViewEvent = {
    type: VIEW_EVENT_TYPE;
    data: unknown;
};

export class Controller {
    handleEvent(event: ViewEvent) {
        console.log("Controller event", event);
        switch (event.type) {
            case VIEW_EVENT_TYPE.RESTAURANTS_UPDATE:
                model.restaurantModel.setRestaurantList();
                break;
            case VIEW_EVENT_TYPE.RESTAURANT_UPDATE:
                model.restaurantModel.setRestaurant(<number>event.data);
                break;
            case VIEW_EVENT_TYPE.LOGIN:
                model.userModel.login(
                    (<{ username: string; password: string }>event.data)
                        .username,
                    (<{ username: string; password: string }>event.data)
                        .password,
                );
                break;
            case VIEW_EVENT_TYPE.AUTH:
                model.userModel.auth();
                break;
            case VIEW_EVENT_TYPE.LOGOUT:
                model.userModel.logout();
                break;
            case VIEW_EVENT_TYPE.REGISTRATION:
                model.userModel.createUser(event.data as User).then(() => {
                    model.userModel.login(
                        (<User>event.data).Username,
                        (<User>event.data).Password,
                    );
                });
                break;
            case VIEW_EVENT_TYPE.ADDRESS_UPDATE:
                model.userModel.setAddress(<string>event!.data);
                break;
            case VIEW_EVENT_TYPE.ORDER_UPDATE:
                model.orderModel.setOrders();
                break;
            case VIEW_EVENT_TYPE.DECREASE_CART:
                model.cartModel.decrease(<number>event!.data);
                break;
            case VIEW_EVENT_TYPE.INCREASE_CART:
                model.cartModel.increase(<number>event!.data);
                break;
            case VIEW_EVENT_TYPE.LOAD_CART:
                model.cartModel.setCart();
                break;
            case VIEW_EVENT_TYPE.CREATE_ORDER:
                {
                    const products = model.cartModel
                        .getCart()!
                        .map((element) => {
                            return element.Product.ID;
                        });

                    const address = model.userModel.getAddress();
                    model.orderModel.createOrder(products, address);
                }
                break;
            case VIEW_EVENT_TYPE.CLEAR_CART:
                model.cartModel.clearCart();
                break;
        }
    }
}
