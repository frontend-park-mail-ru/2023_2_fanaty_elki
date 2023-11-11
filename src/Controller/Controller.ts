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
                switch (event.data) {
                    case ROUTES.default:
                    case ROUTES.main:
                        model.restaurantModel.setRestaurantList();
                        break;

                    default:
                        break;
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
            case VIEW_EVENT_TYPE.MODAL_CHANGE:
                if ((event.data as string) === "open") {
                    model.modalModel.open();
                } else {
                    model.modalModel.close();
                }
                break;
        }
    }
}
