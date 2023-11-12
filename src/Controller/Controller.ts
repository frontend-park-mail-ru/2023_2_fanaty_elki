export enum VIEW_EVENT_TYPE {
    LOGIN = "LOGIN",
    RESTAURANTS_UPDATE = "RESTAURANTS_UPDATE",
    ADD_DISH = "ADD_DISH",
    RESTAURANT_UPDATE = "RESTAURANT_UPDATE",
}

export type ViewEvent = {
    type: VIEW_EVENT_TYPE;
    data: unknown;
};

export class Controller {
    handleEvent(event: ViewEvent) {
        console.log("Сontroller event", event);
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
        }
    }
}
