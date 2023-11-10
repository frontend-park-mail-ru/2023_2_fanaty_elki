import { ROUTES } from "../config";

export enum VIEW_EVENT_TYPE {
    URL_CHANGE = "URL_CHANGE",
    MODAL_CHANGE = "MODAL_CHANGE",
    LOGIN = "LOGIN",
}

export type ViewEvent = {
    type: VIEW_EVENT_TYPE;
    data: unknown;
};

export class Controller {
    handleEvent(event: ViewEvent) {
        console.log("Сontroller event", event);
        switch (event.type) {
            case VIEW_EVENT_TYPE.URL_CHANGE:
                if (event.data == ROUTES.main || event.data == ROUTES.default) {
                    model.restaurantModel.setRestaurantList();
                }
                model.URLModel.setURL(event.data as string);
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
