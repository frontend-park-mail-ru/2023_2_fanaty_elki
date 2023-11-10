import { ROUTES } from "../config";

export enum VIEW_EVENT_TYPE {
    URL_CHANGE = "URL_CHANGE",
    MODAL_CHANGE = "MODAL_CHANGE",
}

export type ViewEvent = {
    type: VIEW_EVENT_TYPE;
    data: string;
};

export class Controller {
    handleEvent(event: ViewEvent) {
        console.log("Сontroller event", event);
        if (event.type == VIEW_EVENT_TYPE.URL_CHANGE) {
            if (event.data == ROUTES.main || event.data == ROUTES.default) {
                model.restaurantModel.setRestaurantList();
            }
            model.URLModel.setURL(event.data);
        }
    }
}
