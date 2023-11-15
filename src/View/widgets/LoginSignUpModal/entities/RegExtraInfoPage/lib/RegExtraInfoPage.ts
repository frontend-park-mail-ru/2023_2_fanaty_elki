import { UserEvent } from "../../../../../../Model/UserModel";
import { UIEventType, UIEvent } from "../../../../../../config";
import {
    EventDispatcher,
    Listenable,
} from "../../../../../../modules/observer";
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

    private birthdayInput: HTMLInputElement;
    private phoneNumberInput: HTMLInputElement;

    private submitButton: HTMLElement;
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

        this.birthdayInput = <HTMLInputElement>(
            this.element.querySelector("#reg-extra-info-page__birthday")
        );
        this.phoneNumberInput = <HTMLInputElement>(
            this.element.querySelector("#reg-extra-info-page__phone-number")
        );

        this.submitButton = <HTMLElement>(
            this.element.querySelector("#reg-extra-info-page__submit")
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
        const birthdayMessageBox = <HTMLElement>(
            this.element.querySelector("#reg-extra-info-page__birthday__msg")
        );
        const phoneNumberMessageBox = <HTMLElement>(
            this.element.querySelector(
                "#reg-extra-info-page__phone-number__msg",
            )
        );

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
            birthdayMessageBox.innerText = "";
        });

        this.phoneNumberInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
            phoneNumberMessageBox.innerText = "";
        });

        this.submitButton.addEventListener("click", () => {
            const birthdayValidation = this.validateBirthday(
                this.birthdayInput.value.trim(),
            );
            const phoneNumberValidation = this.validatePhoneNumber(
                this.phoneNumberInput.value.trim(),
            );

            if (!birthdayValidation && !phoneNumberValidation) {
                this.events_.notify({
                    type: UIEventType.LMODAL_REG_CLICK,
                    data: null,
                });
            } else {
                birthdayMessageBox.innerText = birthdayValidation;
                phoneNumberMessageBox.innerText = phoneNumberValidation;
            }
        });
        this.authButton.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.LMODAL_AUTH_CLICK,
                data: null,
            });
        });
    }

    validateBirthday(birthday: string): string {
        if (!birthday) {
            return "Укажите дату рождения";
        }

        return "";
    }

    validatePhoneNumber(phoneNumber: string): string {
        if (!phoneNumber) {
            return "Укажите номер телефона";
        }

        if (
            !phoneNumber.match(
                /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/,
            )
        ) {
            return "Невалидный номер телефона";
        }

        return "";
    }

    clearInputs() {
        this.birthdayInput.value = "";
        this.phoneNumberInput.value = "";
    }

    clearMessage() {
        this.messageBox.innerText = "";
    }

    getBirthday(): string {
        return this.birthdayInput.value.trim();
    }

    getPhoneNumber(): string {
        return this.phoneNumberInput.value.trim();
    }
}
