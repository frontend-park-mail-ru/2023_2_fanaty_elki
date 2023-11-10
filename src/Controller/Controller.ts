import { ROUTES } from "../config";

export enum ViewEventType {
    URL_CHANGE = "URL_CHANGE",
}

export type ViewEvent = {
    type: ViewEventType;
    data: string;
};

export class Controller {
    handleEvent(event: ViewEvent) {
        console.log("Сontroller event", event);
        if (event.type == ViewEventType.URL_CHANGE) {
            if (event.data == ROUTES.main) {
                model.restaurantModel.setRestaurantList();
            }
            model.URLModel.setURL(event.data);
        }
    }
}
