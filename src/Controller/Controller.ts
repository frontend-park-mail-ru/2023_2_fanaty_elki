export enum ViewEvent {
    URL_CHANGE = "URL_CHANGE",
}

export class Controller {
    handleEvent(event: ViewEvent) {
        if (event == ViewEvent.URL_CHANGE) {
            model.restaurantModel.setRestaurantList();
        }
    }
}
