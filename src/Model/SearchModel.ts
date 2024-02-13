import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";
import { Dish, Restaurant } from "./RestaurantModel";

export type SearchResult = Restaurant & {
    Products: Dish[];
};

export const enum SearchModelEventType {
    UPDATED = "UPDATED",
    ERROR = "ERROR",
}

export type SearchEvent = {
    type: SearchModelEventType;
    data: SearchResult[] | null;
};

export class SearchModel implements Listenable<SearchEvent> {
    private events_: EventDispatcher<SearchEvent>;
    get events(): EventDispatcher<SearchEvent> {
        return this.events_;
    }

    /**
     * Конструктор
     */
    constructor() {
        this.events_ = new EventDispatcher<SearchEvent>();
    }

    async getResults(query: string) {
        try {
            const results: SearchResult[] =
                (await Api.getSearchResults(query)) || [];
            this.events.notify({
                type: SearchModelEventType.UPDATED,
                data: results,
            });
        } catch (e) {
            // console.error("Неудачный поиск по запросу");
            // console.error(e);
            this.events.notify({
                type: SearchModelEventType.ERROR,
                data: null,
            });
        }
    }
}
