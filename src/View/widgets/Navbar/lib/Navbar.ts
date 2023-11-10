import { IWidget } from "../../../types";
import navbarTemplate from "../ui/Navbar.hbs";
import "../ui/Navbar.scss";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { ROUTES } from "../../../../config";

export class Navbar extends IWidget {
    private userNameElement: HTMLElement;
    private signInButton: HTMLElement;

    constructor() {
        super(navbarTemplate(), ".navbar");

        model.userModel.addObserver(this);

        this.userNameElement = <HTMLElement>(
            this.element.querySelector("#name-container")
        );
        this.signInButton = <HTMLElement>(
            this.element.querySelector("#signin-button")
        );

        this.setNonAuthUser();

        this.bindLogoClick();
        this.bindAdressClick();
        this.bindSingInClick();
    }

    update() {
        const user = model.userModel.getUser();
        if (user) {
            this.setAuthUser(user.Username);
        } else {
            this.setNonAuthUser();
        }
    }

    private setAuthUser(username: string) {
        this.userNameElement.firstElementChild!.innerHTML = username;
        this.element.appendChild(this.userNameElement);
        if (this.signInButton.parentNode) {
            this.element.removeChild(this.signInButton);
        }
    }

    private setNonAuthUser() {
        this.element.appendChild(this.signInButton);
        if (this.userNameElement.parentNode) {
            this.element.removeChild(this.userNameElement);
        }
    }

    private bindLogoClick() {
        this.element.querySelector("#logo")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.URL_CHANGE,
                data: ROUTES.main,
            });
        });
    }

    private bindSingInClick() {
        this.element
            .querySelector("#signin-button")!
            .addEventListener("click", () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.MODAL_CHANGE,
                    data: "open",
                });
            });
    }

    private bindAdressClick() {
        this.element
            .querySelector("#address-modal")!
            .addEventListener("click", () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.MODAL_CHANGE,
                    data: "open",
                });
            });
    }
}
