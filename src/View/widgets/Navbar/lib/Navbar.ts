import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { UserEvent } from "../../../../Model/UserModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";
import navbarTemplate from "../ui/Navbar.hbs";
import "../ui/Navbar.scss";

export class Navbar extends IWidget implements Listenable<UIEvent> {
    private userNameElement: HTMLElement;
    private signInButton: HTMLElement;
    private cartButton: HTMLElement;

    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(navbarTemplate(), ".navbar");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.update.bind(this));

        this.userNameElement = <HTMLElement>(
            this.element.querySelector("#name-container")
        );
        this.signInButton = <HTMLElement>(
            this.element.querySelector("#signin-button")
        );
        this.cartButton = <HTMLElement>this.element.querySelector("#cart");

        this.bindEvents();
        this.setNonAuthUser();
    }

    private bindEvents() {
        this.element.querySelector("#logo")!.addEventListener("click", () => {
            this.events.notify({ type: UIEventType.NAVBAR_LOGO_CLICK });
        });
        this.element
            .querySelector("#address-button")!
            .addEventListener("click", () => {
                this.events.notify({ type: UIEventType.NAVBAR_ADDRESS_CLICK });
            });
        this.element.querySelector("#cart")!.addEventListener("click", () => {
            this.events.notify({ type: UIEventType.NAVBAR_CART_CLICK });
        });
        this.element
            .querySelector("#signin-button")!
            .addEventListener("click", () => {
                this.events.notify({ type: UIEventType.NAVBAR_SIGNIN_CLICK });
            });
        this.element.querySelector("#me")!.addEventListener("click", () => {
            this.events.notify({ type: UIEventType.NAVBAR_NAME_CLICK });
        });
        this.element
            .querySelector("#exit-button")!
            .addEventListener("click", () => {
                this.events.notify({ type: UIEventType.NAVBAR_EXIT_CLICK });
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.LOGOUT,
                    data: null,
                });
            });
    }

    update(event?: UserEvent) {
        switch (event) {
            case UserEvent.USER_CHANGE: {
                const user = model.userModel.getUser();
                if (user) {
                    this.setAuthUser(user.Username);
                } else {
                    this.setNonAuthUser();
                }
                break;
            }
            case UserEvent.ADDRESS_CHANGE:
                this.element.querySelector(
                    ".navbar__fields__address__title",
                )!.innerHTML = model.userModel.getAddress();
                break;
            default:
                break;
        }
    }

    private setAuthUser(username: string) {
        this.userNameElement.firstElementChild!.innerHTML = username;
        this.element.appendChild(this.userNameElement);
        this.element
            .querySelector(".navbar__fields")!
            .appendChild(this.cartButton);
        if (this.signInButton.parentNode) {
            this.element.removeChild(this.signInButton);
        }
    }

    private setNonAuthUser() {
        this.element.appendChild(this.signInButton);
        if (this.userNameElement.parentNode) {
            this.element.removeChild(this.userNameElement);
        }
        // if (this.cartButton.parentNode) {
        //     this.element
        //         .querySelector(".navbar__fields")!
        //         .removeChild(this.cartButton);
        // }
    }

    load() {}
}
