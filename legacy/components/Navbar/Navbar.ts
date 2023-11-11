import navbarTemplate from "./Navbar.hbs";
import addressTemplate from "../AddressChooser/AddressChooser.hbs";
import suggestsTemplate from "../AddressChooser/Suggests.hbs";
import "./Navbar.scss";
import "../AddressChooser/AddressChooser.scss";

class AddressPopup {
    private modal: HTMLElement;
    constructor(modal_: HTMLElement) {
        this.modal = modal_;
        this.modal.innerHTML = addressTemplate();
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
        this.modal
            .querySelector("#address-value")!
            .addEventListener("input", (event) => {
                this.addSuggests((<HTMLInputElement>event.target).value);
            });
        this.modal
            .querySelector("#choose-address")!
            .addEventListener("click", () => {
                const address = (<HTMLInputElement>(
                    this.modal.querySelector("#address-value")!
                )).value;
                if (address) {
                    userModel.address = address;
                    navbar.setAddress(address);
                    this.modal.classList.remove("open");
                }
            });
    }

    async addSuggests(word: string) {
        try {
            const suggests = await ymaps.suggest(word);
            this.modal.querySelector(".suggest-container")!.innerHTML =
                suggestsTemplate(suggests);
            this.modal.querySelectorAll(".suggest")!.forEach((x) => {
                x.addEventListener("click", (event) => {
                    (<HTMLInputElement>(
                        this.modal.querySelector("#address-value")!
                    )).value = (<HTMLElement>event.currentTarget).querySelector(
                        ".value",
                    )!.innerHTML;
                    this.modal.querySelector(".suggest-container")!.innerHTML =
                        "";
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    setAddress(address: string) {
        (<HTMLInputElement>this.modal.querySelector("#address-value")!).value =
            address;
    }

    setAddressPh(pc: string) {
        (<HTMLInputElement>(
            this.modal.querySelector("#address-value")!
        )).setAttribute("placeholder", pc);
    }
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
        this.address = new AddressPopup(
            this.element.querySelector("#address-modal")!,
        );
        this.address.setAddressPh("Укажите адрес");
        this.bindAddressClick(() => {
            this.element.querySelector("#address-modal")!.classList.add("open");
            if (userModel.address) {
                this.address.setAddress(userModel.address);
            }
        });
        this.bindPersonClick(() => {
            router.redirect("/login");
        });
        this.bindExitClick(this.logout.bind(this));
        this.bindLogoClick(() => {
            router.redirect("/");
        });
        this.bindCartHandler(() => {
            router.redirect("/cart");
        })
        this.bindUsernameHandler(() => {
            router.redirect("/me");
        })
        this.setNonAuthUser();
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

    setAddress(pc: string) {
        this.element.querySelector(
            ".navbar__fields__address__title",
        )!.innerHTML = pc;
        this.address.setAddress(pc);
    }

    bindCartHandler(handler: () => void) {
        this.element.querySelector("#cart")?.addEventListener('click', handler);
    }

    bindUsernameHandler(handler: () => void) {
        this.element.querySelector("#me")?.addEventListener('click', handler);
    }

    /**
     * Коллбек для выхода из аккаунта по нажатию на кнопку
     */
    async logout() {
        try {
            await userModel.logout();
            navbar.setNonAuthUser();
        } catch (e) {
            console.log(e);
        }
    }
}
