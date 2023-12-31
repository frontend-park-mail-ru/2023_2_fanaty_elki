import { UIEvent, UIEventType } from "../../../../../../config";
import {
    EventDispatcher,
    Listenable,
} from "../../../../../../modules/observer";
import {
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateUsername,
} from "../../../../../../modules/validations";
import { IHTMLElement } from "../../../../../types";

import regUserPageTemplate from "../ui/RegUserPage.hbs";

export class RegUserPage extends IHTMLElement implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private closeButton: HTMLElement;
    private backButton: HTMLElement;

    private emailMessageBox: HTMLElement;
    private emailInput: HTMLInputElement;
    private usernameMessageBox: HTMLElement;
    private usernameInput: HTMLInputElement;
    private passwordMessageBox: HTMLElement;
    private passwordInput: HTMLInputElement;
    private passwordConfirmMessageBox: HTMLElement;
    private passwordConfirmInput: HTMLInputElement;

    private form: HTMLFormElement;
    private authButton: HTMLElement;

    constructor() {
        super(regUserPageTemplate(), "#reg-user-page");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.updateUserEvent.bind(this));

        this.closeButton = <HTMLElement>(
            this.element.querySelector("#reg-user-page__close")
        );
        this.backButton = <HTMLElement>(
            this.element.querySelector("#reg-user-page__back")
        );

        this.emailMessageBox = <HTMLElement>(
            this.element.querySelector("#reg-user-page__email__msg")
        );
        this.emailInput = <HTMLInputElement>(
            this.element.querySelector("#reg-user-page__email")
        );
        this.usernameMessageBox = <HTMLElement>(
            this.element.querySelector("#reg-user-page__username__msg")
        );
        this.usernameInput = <HTMLInputElement>(
            this.element.querySelector("#reg-user-page__username")
        );
        this.passwordMessageBox = <HTMLElement>(
            this.element.querySelector("#reg-user-page__password__msg")
        );
        this.passwordInput = <HTMLInputElement>(
            this.element.querySelector("#reg-user-page__password")
        );
        this.passwordConfirmMessageBox = <HTMLElement>(
            this.element.querySelector("#reg-user-page__passwordconfirm__msg")
        );
        this.passwordConfirmInput = <HTMLInputElement>(
            this.element.querySelector("#reg-user-page__passwordconfirm")
        );

        this.form = <HTMLFormElement>(
            this.element.querySelector("#login-signup-form")
        );
        this.authButton = <HTMLElement>(
            this.element.querySelector("#reg-user-page__auth")
        );

        this.bindEvents();
    }

    updateUserEvent() {
        // TODO: Добавить потенциальную обработку событий
    }

    bindEvents() {
        this.closeButton.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.LMODAL_CLOSE_CLICK,
                data: null,
            });
        });

        this.backButton.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.LMODAL_AUTH_CLICK,
                data: null,
            });
        });

        this.emailInput.addEventListener("input", () => {
            this.emailMessageBox.innerText = "";
        });
        this.usernameInput.addEventListener("input", () => {
            this.usernameMessageBox.innerText = "";
        });
        this.passwordInput.addEventListener("input", () => {
            this.passwordMessageBox.innerText = "";
        });
        this.passwordConfirmInput.addEventListener("input", () => {
            this.passwordConfirmMessageBox.innerText = "";
        });

        this.form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            const emailValidation = validateEmail(this.emailInput.value.trim());
            const usernameValidation = validateUsername(
                this.usernameInput.value.trim(),
            );
            const passwordValidation = validatePassword(
                this.passwordInput.value.trim(),
            );
            const passwordConfirmValidation = validatePasswordConfirm(
                this.passwordInput.value.trim(),
                this.passwordConfirmInput.value.trim(),
            );

            if (
                !emailValidation &&
                !usernameValidation &&
                !passwordValidation &&
                !passwordConfirmValidation
            ) {
                this.events_.notify({
                    type: UIEventType.LMODAL_NEXT_CLICK,
                    data: null,
                });
            } else {
                this.emailMessageBox.innerText = emailValidation;
                this.usernameMessageBox.innerText = usernameValidation;
                this.passwordMessageBox.innerText = passwordValidation;
                this.passwordConfirmMessageBox.innerText =
                    passwordConfirmValidation;
            }
        });

        this.authButton.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.LMODAL_AUTH_CLICK,
                data: null,
            });
        });
    }

    clearInputs() {
        this.emailInput.value = "";
        this.usernameInput.value = "";
        this.passwordInput.value = "";
        this.passwordConfirmInput.value = "";
    }

    clearMessage() {
        this.emailMessageBox.innerText = "";
        this.usernameMessageBox.innerText = "";
        this.passwordMessageBox.innerText = "";
        this.passwordConfirmMessageBox.innerText = "";
    }

    getEmail(): string {
        return this.emailInput.value.trim();
    }

    getUsername(): string {
        return this.usernameInput.value.trim();
    }

    getPassword(): string {
        return this.passwordInput.value.trim();
    }
}
