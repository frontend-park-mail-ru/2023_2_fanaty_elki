import { ROUTES } from "../config";

export enum VIEW_EVENT_TYPE {
    URL_CHANGE = "URL_CHANGE",
    MODAL_CHANGE = "MODAL_CHANGE",
    LOGIN = "LOGIN",
    REG_STATE_CHANGE = "REG_STATE_CHANGE",
}

export type ViewEvent = {
    type: VIEW_EVENT_TYPE;
    data: unknown;
};

export class Controller {
    handleEvent(event: ViewEvent) {
        console.log("Controller event", event);
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
            case VIEW_EVENT_TYPE.MODAL_CHANGE:
                if ((event.data as string) === "open") {
                    model.modalModel.open();
                } else {
                    model.modalModel.close();
                }
                break;
            case VIEW_EVENT_TYPE.REG_STATE_CHANGE:
                if ((event.data as string) === "next") {
                    model.registrationModel.setNextState();
                } else if ((event.data as string) === "prev") {
                    model.registrationModel.setPrevState();
                } else {
                    model.registrationModel.setState(1);
                }
                break;
        }
    }
}
