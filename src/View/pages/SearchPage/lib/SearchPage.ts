import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import {
    SearchEvent,
    SearchModelEventType,
    SearchResult,
} from "../../../../Model/SearchModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { LoginSignUpModal } from "../../../widgets/LoginSignUpModal";
import { Navbar } from "../../../widgets/Navbar";
import searchPageTemplate from "../ui/SearchPage.hbs";
import searchResultsTemplate from "../ui/SearchResults.hbs";
import { navbarConfig, searchElement } from "./config";

export class SearchPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private address: AddressChooser;
    private login: LoginSignUpModal;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(searchPageTemplate(), searchElement.ROOT);
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar(navbarConfig);
        this.getChild(searchElement.NAVBAR).appendChild(this.navbar.element);

        this.address = new AddressChooser();
        this.getChild(searchElement.ADDRESS).appendChild(this.address.element);

        this.login = new LoginSignUpModal();
        this.getChild(searchElement.LOGIN).appendChild(this.login.element);

        this.navbar.events.subscribe(this.update.bind(this));
        this.login.events.subscribe(this.update.bind(this));
        model.searchModel.events.subscribe(this.updateResults.bind(this));
        // this.bindEvents();
    }

    setResultList(list: SearchResult[]) {
        this.getChild(searchElement.SEARCH_RESULTS).innerHTML =
            searchResultsTemplate(list.length === 0 ? null : list);
        this.getAll(searchElement.RESULT).forEach((result) => {
            const restaurantCard = result.querySelector(
                searchElement.RESTAURANT,
            )!;
            const restaurantId =
                restaurantCard.getAttribute("data-restaurant-id");
            restaurantCard.addEventListener("click", () => {
                this.events.notify({
                    type: UIEventType.RESTAURANT_CLICK,
                    data: restaurantId,
                });
            });
            result.querySelectorAll(searchElement.CARD).forEach((card) => {
                card.addEventListener("click", () => {
                    this.events.notify({
                        type: UIEventType.DISH_CARD_CLICK,
                        data: [
                            restaurantId,
                            card.getAttribute("data-product-id"),
                        ],
                    });
                });
            });
        });
    }

    updateResults(event?: SearchEvent) {
        if (event!.type === SearchModelEventType.UPDATED) {
            this.setResultList(event!.data!);
        }
    }

    update(event?: UIEvent) {
        switch (event!.type) {
            case UIEventType.NAVBAR_SIGNIN_CLICK:
                this.login.open();
                break;
            case UIEventType.NAVBAR_ADDRESS_CLICK:
                this.address.open();
                break;
            default:
                this.events_.notify(event);
                break;
        }
    }

    unload() {
        this.getChild(searchElement.SEARCH_RESULTS).innerHTML = "";
    }

    load(params?: URLSearchParams) {
        this.navbar.load();
        this.address.load();
        if (!params || !params.get("query")) {
            console.error("No query");
            return;
        }
        const query = params.get("query")!;
        if (query.length === 0) {
            console.error("Empty query");
        }
        this.navbar.searchValue = query;
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.SEARCH,
            data: query,
        });
    }
}
