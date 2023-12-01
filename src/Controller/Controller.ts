import { Comment } from "../Model/CommentModel";
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
    USER_UPDATE = "USER_UPDATE",
    SEARCH = "SEARCH",
    LOAD_ORDER = "LOAD_ORDER",
    CREATE_COMMENT = "CREATE_COMMENT",
    LOAD_COMMENTS = "LOAD_COMMENTS",
    LOAD_CATEGORIES = "LOAD_CATEGORIES",
    RESTAURANTS_CATEGORY_UPDATE = "RESTAURANTS_CATEGORY_UPDATE",
    CHANGE_ORDER_RESTAURANT = "CHANGE_ORDER_RESTAURANT",
}

export type ViewEvent = {
    type: VIEW_EVENT_TYPE;
    data: unknown;
};

export class Controller {
    async handleEvent(event: ViewEvent) {
        switch (event.type) {
            case VIEW_EVENT_TYPE.RESTAURANTS_UPDATE:
                model.restaurantModel.setRestaurantList();
                break;
            case VIEW_EVENT_TYPE.RESTAURANT_UPDATE:
                model.restaurantModel.setRestaurant(<number>event.data);
                model.commentModel.setComments(<number>event.data);
                break;
            case VIEW_EVENT_TYPE.RESTAURANTS_CATEGORY_UPDATE:
                if (<string>event.data == "Рестораны") {
                    model.restaurantModel.setRestaurantList();
                    break;
                }
                model.restaurantModel.setRestaurantListByCategory(
                    <string>event.data,
                );
                break;
            case VIEW_EVENT_TYPE.LOGIN:
                await model.userModel.login(
                    (<{ username: string; password: string }>event.data)
                        .username,
                    (<{ username: string; password: string }>event.data)
                        .password,
                );
                if (model.userModel.getUser()) {
                    model.cartModel.setCart();
                }
                break;
            case VIEW_EVENT_TYPE.AUTH:
                await model.userModel.auth();
                if (model.userModel.getUser()) {
                    model.cartModel.setCart();
                }
                break;
            case VIEW_EVENT_TYPE.LOGOUT:
                await model.userModel.logout();
                model.cartModel.clearLocalCart();
                break;
            case VIEW_EVENT_TYPE.USER_UPDATE:
                await model.userModel.updateUser(
                    (
                        event.data as {
                            userFields: { [index: string]: string };
                            icon: File;
                        }
                    ).userFields,
                );

                if (
                    (
                        event.data as {
                            userFields: { [index: string]: string };
                            icon: File;
                        }
                    ).icon !== undefined
                ) {
                    model.userModel.updateUserIcon(
                        (
                            event.data as {
                                userFields: { [index: string]: string };
                                icon: File;
                            }
                        ).icon,
                    );
                }
                break;
            case VIEW_EVENT_TYPE.REGISTRATION:
                try {
                    await model.userModel.createUser(event.data as User);
                    model.userModel.login(
                        (<User>event.data).Username,
                        (<User>event.data).Password,
                    );
                } catch (e) {
                    console.error("Неудачная регистрация");
                    console.error(e);
                }
                break;
            case VIEW_EVENT_TYPE.ADDRESS_UPDATE:
                model.userModel.setAddress(<string>event!.data);
                break;
            case VIEW_EVENT_TYPE.CHANGE_ORDER_RESTAURANT:
                await model.cartModel.clearCart();
                await model.cartModel.increase(event!.data as number);
                break;
            case VIEW_EVENT_TYPE.ORDER_UPDATE:
                model.orderModel.setOrders();
                break;
            case VIEW_EVENT_TYPE.DECREASE_CART:
                model.cartModel.decrease(<number>event!.data);
                break;
            case VIEW_EVENT_TYPE.INCREASE_CART:
                model.cartModel.increase(<number>event!.data);
                model.cartModel.setCurrentRestaurant(
                    model.restaurantModel.getRestaurant()!.RestaurantInfo,
                );
                break;
            case VIEW_EVENT_TYPE.LOAD_CART:
                model.cartModel.setCart();
                break;
            case VIEW_EVENT_TYPE.CREATE_ORDER:
                {
                    if (!model.cartModel.getCart()) return;

                    const address = model.userModel.getAddress();
                    await model.orderModel.createOrder(address);
                    model.cartModel.clearCart();
                }
                break;
            case VIEW_EVENT_TYPE.CLEAR_CART:
                model.cartModel.clearCart();
                break;
            case VIEW_EVENT_TYPE.SEARCH:
                model.searchModel.getResults(<string>event.data);
                break;
            case VIEW_EVENT_TYPE.LOAD_ORDER:
                model.orderModel.setCurrentOrder(event.data as number);
                break;
            case VIEW_EVENT_TYPE.CREATE_COMMENT:
                await model.commentModel.createComment(
                    model.restaurantModel.getRestaurant()!.RestaurantInfo.ID,
                    event.data as Comment,
                );
                await model.commentModel.setComments(
                    model.restaurantModel.getRestaurant()!.RestaurantInfo.ID,
                );
                await model.restaurantModel.setRestaurant(
                    model.restaurantModel.getRestaurant()!.RestaurantInfo.ID,
                );
                break;
            case VIEW_EVENT_TYPE.LOAD_COMMENTS:
                model.commentModel.setComments(
                    model.restaurantModel.getRestaurant()!.RestaurantInfo.ID,
                );
                break;
            case VIEW_EVENT_TYPE.LOAD_CATEGORIES:
                model.restaurantModel.setCategories();
                break;
        }
    }
}
