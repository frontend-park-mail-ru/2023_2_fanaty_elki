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
        // this.bindEvents();
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

    load() {
        this.navbar.load();
        this.address.load();
    }
}
