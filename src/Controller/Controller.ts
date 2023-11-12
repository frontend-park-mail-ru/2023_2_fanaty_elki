import { User } from "../Model/UserModel";

export enum VIEW_EVENT_TYPE {
    LOGIN = "LOGIN",
    REGISTRATION = "REGISTRATION",
    RESTAURANTS_UPDATE = "RESTAURANTS_UPDATE",
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
            case VIEW_EVENT_TYPE.LOGIN:
                model.userModel.login(
                    (<{ username: string; password: string }>event.data)
                        .username,
                    (<{ username: string; password: string }>event.data)
                        .password,
                );
                break;
            case VIEW_EVENT_TYPE.REGISTRATION:
                model.userModel.createUser(event.data as User).then(() => {
                    model.userModel.login(
                        (<User>event.data).Username,
                        (<User>event.data).Password,
                    );
                });
                break;
        }
    }
}
