import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import {
    SearchEvent,
    SearchModelEventType,
} from "../../../../Model/SearchModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { LoginSignUpModal } from "../../../widgets/LoginSignUpModal";
import { Navbar } from "../../../widgets/Navbar";
import searchPageTemplate from "../ui/SearchPage.hbs";
// import searchResultsTemplate from "../ui/SearchResults.hbs";
import "../ui/SearchPage.scss";
import "../ui/SearchResults.scss";
import { searchElement } from "./config";

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

        this.navbar = new Navbar();
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

    updateResults(event?: SearchEvent) {
        if (event!.type === SearchModelEventType.UPDATED) {
            console.log("get results: ");
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
                break;
        }
        this.events_.notify(event);
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
