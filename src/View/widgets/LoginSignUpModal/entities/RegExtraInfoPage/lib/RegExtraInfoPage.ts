import { UserEvent } from "../../../../../../Model/UserModel";
import { UIEventType, UIEvent } from "../../../../../../config";
import {
    EventDispatcher,
    Listenable,
} from "../../../../../../modules/observer";
import {
    validateBirthday,
    validatePhoneNumber,
} from "../../../../../../modules/validations";
import { IHTMLElement } from "../../../../../types";

import regExtraInfoPageTemplate from "../ui/RegExtraInfoPage.hbs";

export class RegExtraInfoPage
    extends IHTMLElement
    implements Listenable<UIEvent>
{
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private closeButton: HTMLElement;
    private backButton: HTMLElement;

    private messageBox: HTMLElement;

    private birthdayMessageBox: HTMLElement;
    private birthdayInput: HTMLInputElement;
    private phoneNumberMessageBox: HTMLElement;
    private phoneNumberInput: HTMLInputElement;

    private form: HTMLFormElement;
    private authButton: HTMLElement;

    constructor() {
        super(regExtraInfoPageTemplate(), "#reg-extra-info-page");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.updateUserEvent.bind(this));

        this.closeButton = <HTMLElement>(
            this.element.querySelector("#reg-extra-info-page__close")
        );
        this.backButton = <HTMLElement>(
            this.element.querySelector("#reg-extra-info-page__back")
        );

        this.messageBox = <HTMLElement>(
            this.element.querySelector("#reg-extra-info-page__msg")
        );

        this.birthdayMessageBox = <HTMLElement>(
            this.element.querySelector("#reg-extra-info-page__birthday__msg")
        );

        this.birthdayInput = <HTMLInputElement>(
            this.element.querySelector("#reg-extra-info-page__birthday")
        );
        this.phoneNumberMessageBox = <HTMLElement>(
            this.element.querySelector(
                "#reg-extra-info-page__phone-number__msg",
            )
        );
        this.phoneNumberInput = <HTMLInputElement>(
            this.element.querySelector("#reg-extra-info-page__phone-number")
        );

        this.form = <HTMLFormElement>(
            this.element.querySelector("#login-signup-form")
        );
        this.authButton = <HTMLElement>(
            this.element.querySelector("#reg-extra-info-page__auth")
        );

        this.bindEvents();
    }

    updateUserEvent(event?: UserEvent) {
        if (event === UserEvent.USER_REG) {
            if (model.userModel.getErrorMsg()) {
                this.messageBox.innerText = model.userModel.getErrorMsg()!;
            }
        }
    }

    bindEvents() {
        this.backButton.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.LMODAL_BACK_CLICK,
                data: null,
            });
        });

        this.closeButton.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.LMODAL_CLOSE_CLICK,
                data: null,
            });
        });

        this.birthdayInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
            this.birthdayMessageBox.innerText = "";
        });

        this.phoneNumberInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
            this.phoneNumberMessageBox.innerText = "";
        });

        this.form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            const birthdayValidation = validateBirthday(
                this.birthdayInput.value.trim(),
            );
            const phoneNumberValidation = validatePhoneNumber(
                this.phoneNumberInput.value.trim(),
            );

            if (!birthdayValidation && !phoneNumberValidation) {
                this.events_.notify({
                    type: UIEventType.LMODAL_REG_CLICK,
                    data: null,
                });
            } else {
                this.birthdayMessageBox.innerText = birthdayValidation;
                this.phoneNumberMessageBox.innerText = phoneNumberValidation;
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
        this.birthdayInput.value = "";
        this.phoneNumberInput.value = "";
    }

    clearMessage() {
        this.messageBox.innerText = "";
        this.birthdayMessageBox.innerText = "";
        this.phoneNumberMessageBox.innerText = "";
    }

    getBirthday(): string {
        return this.birthdayInput.value.trim();
    }

    getPhoneNumber(): string {
        return this.phoneNumberInput.value.trim();
    }
}
