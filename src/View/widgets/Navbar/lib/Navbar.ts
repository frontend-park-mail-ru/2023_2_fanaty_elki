import { IWidget } from "../../../types";
import navbarTemplate from "../ui/Navbar.hbs";
import "../ui/Navbar.scss";
import { ViewEventType } from "../../../../Controller/Controller";
import { ROUTES } from "../../../../config";

export class Navbar extends IWidget {
    private userNameElement: HTMLElement;
    private signInButton: HTMLElement;

    constructor(placeHolders: { search_ph: string; address: string }) {
        super(navbarTemplate(placeHolders), ".navbar");
        this.userNameElement = <HTMLElement>(
            this.element.querySelector("#name-container")
        );
        this.signInButton = <HTMLElement>(
            this.element.querySelector("#signin-button")
        );
        this.bindLogoClick(() => {
            controller.handleEvent({
                type: ViewEventType.URL_CHANGE,
                data: ROUTES.main,
            });
        });
        this.setNonAuthUser();
    }

    update() {}

    private setAuthUser(userName: string) {
        this.userNameElement.firstElementChild!.innerHTML = userName;
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

    private bindLogoClick(handler: () => void) {
        this.element.querySelector("#logo")!.addEventListener("click", handler);
    }
}
