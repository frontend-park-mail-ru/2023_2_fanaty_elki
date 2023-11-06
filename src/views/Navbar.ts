import navbarTemplate from "../components/Navbar/Navbar.hbs";
import "../components/Navbar/Navbar.scss";

class AddressPopup {
    private modal: HTMLElement;
    constructor(modal_: HTMLElement) {
        this.modal = modal_;
        this.modal
            .querySelector(".modal__box")!
            .addEventListener("click", (event: any) => {
                event._isClickWithInModal = true;
            });
        this.modal.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            event.currentTarget!.classList.remove("open");
        });
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.modal.classList.remove("open");
            }
        });
    }
    // show() {
    //     console.log("modal=", this.modal);
    //     // this.modal.classList.add("open");
    // }
    // hide() {
    //     // this.modal.classList.remove("open");
    // }
}

export default class Navbar {
    private userNameElement: HTMLElement;
    private signInButton: HTMLElement;
    private element: HTMLElement;
    private address: AddressPopup;

    constructor(placeHolders: { search_ph: string; address: string }) {
        const parser = new DOMParser();
        const element: HTMLElement | null = parser
            .parseFromString(navbarTemplate(placeHolders), "text/html")
            .querySelector(".navbar");

        if (!element) {
            console.log("error");
            return;
        }
        this.element = element;
        this.userNameElement = <HTMLElement>(
            this.element.querySelector("#name-container")
        );
        this.signInButton = <HTMLElement>(
            this.element.querySelector("#signin-button")
        );
        this.setNonAuthUser();
        this.address = new AddressPopup(
            this.element.querySelector("#address-modal")!,
        );
        // this.address.show();
        this.bindAddressClick(() => {
            this.element.querySelector("#address-modal")!.classList.add("open");
        });
    }

    mount(root: HTMLElement) {
        root.appendChild(this.element);
    }
    /**
     * Устанавливает navbar для авторизованного пользователя
     * @param {string} userName - имя пользователя
     */
    setAuthUser(userName: string) {
        this.userNameElement.firstElementChild!.innerHTML = userName;
        this.element.appendChild(this.userNameElement);
        if (this.signInButton.parentNode) {
            this.element.removeChild(this.signInButton);
        }
    }

    /**
     * Устанавливает navbar для неавторизованного пользователя
     */
    setNonAuthUser() {
        this.element.appendChild(this.signInButton);
        if (this.userNameElement.parentNode) {
            this.element.removeChild(this.userNameElement);
        }
    }

    /**
     * Устанавливает обработчик на кнопку выхода из аккаунта
     * @param {Function} handler - обработчик
     */
    bindExitClick(handler: () => void) {
        this.userNameElement
            .querySelector("#exit-button")!
            .addEventListener("click", handler);
    }

    /**
     * Устанавливает обработчик на кнопку с адресом
     * @param {Function} handler - обработчик
     */
    private bindAddressClick(handler: () => void) {
        this.element
            .querySelector("#address-button")!
            .addEventListener("click", handler);
    }

    /**
     * Устанавливает обработчик на логотип
     * @param {Function} handler - обработчик
     */
    bindLogoClick(handler: () => void) {
        this.element.querySelector("#logo")!.addEventListener("click", handler);
    }

    /**
     * Устанавливает обработчик на кнопку 'Войти'
     * @param {Function} handler - обработчик
     */
    bindPersonClick(handler: () => void) {
        this.signInButton.addEventListener("click", handler);
    }
}
