import { UserEvent } from "../../../../Model/UserModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";
import { AddressDropdown } from "../entities/AddressDropdown";
import navbarTemplate from "../ui/Navbar.hbs";

export class Navbar extends IWidget implements Listenable<UIEvent> {
    private userNameElement: HTMLElement;
    private addressDropdown: AddressDropdown;
    private addressButton: HTMLElement;
    private signInButton: HTMLElement;
    private cartButton: HTMLElement;
    private backButton: HTMLElement;

    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor(navbarConfig: { noFields: boolean } | undefined) {
        super(navbarTemplate(navbarConfig), ".navbar");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.update.bind(this));
        model.cartModel.events.subscribe(this.updateCartIcon.bind(this));

        this.userNameElement = <HTMLElement>(
            this.element.querySelector("#name-container")
        );
        this.signInButton = <HTMLElement>(
            this.element.querySelector("#signin-button")
        );
        this.cartButton = <HTMLElement>this.element.querySelector("#cart");
        this.backButton = this.getChild("#navbar__back");
        this.addressDropdown = new AddressDropdown();
        this.getChild(".js_address_dropdown").appendChild(
            this.addressDropdown.element,
        );
        this.addressButton = this.getChild(".js_address_dropdown");

        this.bindEvents();
        this.setNonAuthUser();
    }

    get searchValue() {
        if (window.matchMedia("(max-width: 400px)").matches) {
            return (<HTMLInputElement>(
                (<HTMLFormElement>this.getAll(".js_search-input")[1])[0]
            )).value.trim();
        } else {
            return (<HTMLInputElement>(
                (<HTMLFormElement>this.getAll(".js_search-input")[0])[0]
            )).value.trim();
        }
    }

    set searchValue(value: string) {
        const search_forms = this.getAll(".js_search-input");
        search_forms.forEach((form) => {
            (<HTMLInputElement>(<HTMLFormElement>form)[0]).value = value;
        });
    }

    private bindEvents() {
        const search_forms = this.getAll(".js_search-input");
        search_forms.forEach((form) => {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const query = this.searchValue;
                console.log(this.searchValue);
                if (query.length > 2) {
                    this.searchValue = "";
                    this.events.notify({
                        type: UIEventType.NAVBAR_SEARCH_SUBMIT,
                        data: query,
                    });
                }
            });
        });
        this.element.querySelector("#logo")!.addEventListener("click", () => {
            this.events.notify({ type: UIEventType.NAVBAR_LOGO_CLICK });
        });
        this.element
            .querySelector("#address-button")!
            .addEventListener("click", () => {
                this.addressDropdown.toggle();
            });
        this.element.querySelector("#cart")!.addEventListener("click", () => {
            this.events.notify({ type: UIEventType.NAVBAR_CART_CLICK });
        });
        this.element
            .querySelector("#signin-button")!
            .addEventListener("click", () => {
                this.events.notify({ type: UIEventType.NAVBAR_SIGNIN_CLICK });
            });
        this.element
            .querySelector("#name-container")!
            .addEventListener("click", () => {
                this.events.notify({ type: UIEventType.NAVBAR_NAME_CLICK });
            });
        this.backButton.addEventListener("click", () => {
            history.back();
        });

        this.addressDropdown.bindAddClick(() => {
            this.addressDropdown.toggle();
            this.events.notify({ type: UIEventType.NAVBAR_ADDRESS_CLICK });
        });
    }

    updateCartIcon() {
        this.cartButton.querySelector("#sum")!.innerHTML =
            model.cartModel.getSumm() + "₽";
    }

    update(event?: UserEvent) {
        switch (event) {
            case UserEvent.USER_LOGIN: {
                const user = model.userModel.getUser();
                if (user) {
                    this.setAuthUser(user.Username);
                } else {
                    this.setNonAuthUser();
                }
                break;
            }
            case UserEvent.USER_LOGOUT: {
                const user = model.userModel.getUser();
                if (!user) {
                    this.setNonAuthUser();
                }
                break;
            }
            case UserEvent.ADDRESS_CHANGE: {
                const address = model.userModel.getAddress();
                this.addressButton.querySelector(
                    ".navbar__fields__address__title",
                )!.innerHTML =
                    address === 0
                        ? "Укажите адрес"
                        : model.userModel.getAddressText()!;
                this.addressDropdown.update(
                    model.userModel.getAddresses(),
                    address,
                );
                break;
            }
            default:
                break;
        }
    }

    private setAuthUser(username: string) {
        this.userNameElement.firstElementChild!.innerHTML = username;
        this.element
            .querySelector(".navbar_main")!
            .appendChild(this.userNameElement);
        this.element
            .querySelector(".navbar__fields")!
            .appendChild(this.addressButton);
        this.element
            .querySelector(".navbar__fields")!
            .appendChild(this.cartButton);
        this.updateCartIcon();
        if (this.signInButton.parentNode) {
            this.element
                .querySelector(".navbar_main")!
                .removeChild(this.signInButton);
        }
        (this.getChild("#navbar__icon") as HTMLImageElement).src =
            model.userModel.getUser()!.Icon;
        this.getChild(".js_search-input").classList.remove("max_width");
    }

    private setNonAuthUser() {
        this.element
            .querySelector(".navbar_main")!
            .appendChild(this.signInButton);
        if (this.userNameElement.parentNode) {
            this.element
                .querySelector(".navbar_main")!
                .removeChild(this.userNameElement);
        }
        if (this.cartButton.parentNode) {
            this.element
                .querySelector(".navbar__fields")!
                .removeChild(this.cartButton);
        }
        if (this.addressButton.parentNode) {
            this.element
                .querySelector(".navbar__fields")!
                .removeChild(this.addressButton);
        }
        this.getChild(".js_search-input").classList.add("max_width");
    }

    load() {
        const user = model.userModel.getUser();
        if (user) this.setAuthUser(user!.Username);
    }
}
