import { IWidget } from "../../../types";

import loginSignUpModalTemplate from "../ui/LoginSignUpModal.hbs";
import "../ui/LoginSignUpModal.scss";
import "../ui/InputWithMsg.scss";
import "../ui/Button.scss";

import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent } from "../../../../config";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

export class LoginSignUpModal extends IWidget implements Listenable<UIEvent> {
    private page: HTMLElement;

    private loginPage: HTMLElement;
    private regUserPage: HTMLElement;
    private regExtraInfoPage: HTMLElement;

    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(loginSignUpModalTemplate(), ".modal");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.update.bind(this));

        this.loginPage = <HTMLElement>this.element.querySelector("#login-page");
        this.regUserPage = <HTMLElement>(
            this.element.querySelector("#reg-user-page")
        );
        this.regExtraInfoPage = <HTMLElement>(
            this.element.querySelector("#reg-extra-info-page")
        );

        this.bindLoginPageEvents();
        this.bindRegUserPageEvents();
        this.bindRegExtraInfoPage();

        this.bindEvents();
    }

    update() {
        if (model.userModel.getUser()) {
            this.close();
        } else {
            (
                this.regExtraInfoPage.querySelector(
                    "#reg-extra-info-page__msg",
                ) as HTMLElement
            ).innerText = model.userModel.getErrorMsg() || "";
            (
                this.loginPage.querySelector("#login-page__msg") as HTMLElement
            ).innerText = model.userModel.getErrorMsg() || "";
        }
    }

    open() {
        this.element.classList.add("open");
    }

    close() {
        this.clearInputs();
        this.clearMessages();
        this.element.classList.remove("open");
    }

    clearInputs() {
        (<HTMLInputElement>(
            this.loginPage.querySelector("#login-page__username")
        )).value = "";
        (<HTMLInputElement>(
            this.loginPage.querySelector("#login-page__password")
        )).value = "";

        (<HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__email")
        )).value = "";
        (<HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__username")
        )).value = "";
        (<HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__password")
        )).value = "";
        (<HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__passwordconfirm")
        )).value = "";

        (<HTMLInputElement>(
            this.regExtraInfoPage.querySelector(
                "#reg-extra-info-page__birthday",
            )
        )).value = "";
        (<HTMLInputElement>(
            this.regExtraInfoPage.querySelector(
                "#reg-extra-info-page__phone-number",
            )
        )).value = "";
    }

    clearMessages() {
        (<HTMLElement>(
            this.loginPage.querySelector("#login-page__msg")
        )).innerText = "";
        (<HTMLElement>(
            this.regUserPage.querySelector("#reg-user-page__msg")
        )).innerText = "";
        (<HTMLElement>(
            this.regExtraInfoPage.querySelector("#reg-extra-info-page__msg")
        )).innerText = "";
    }

    bindEvents() {
        this.element
            .querySelector(".modal__box")!
            .addEventListener("click", (event: any) => {
                event._isClickWithInModal = true;
            });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            this.close();
        });
    }

    bindLoginPageEvents() {
        const closeButton = <HTMLElement>(
            this.loginPage.querySelector("#login-page__close")
        );

        const messageBox = <HTMLElement>(
            this.loginPage.querySelector("#login-page__msg")
        );

        const usernameInput = <HTMLInputElement>(
            this.loginPage.querySelector("#login-page__username")
        );
        const passwordInput = <HTMLInputElement>(
            this.loginPage.querySelector("#login-page__password")
        );

        const submitButton = <HTMLElement>(
            this.loginPage.querySelector("#login-page__submit")
        );
        const regButton = <HTMLElement>(
            this.loginPage.querySelector("#login-page__reg")
        );

        usernameInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });
        passwordInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });

        closeButton.addEventListener("click", () => {
            this.close();
        });
        submitButton.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.LOGIN,
                data: {
                    username: usernameInput.value.trim(),
                    password: passwordInput.value.trim(),
                },
            });
        });
        regButton.addEventListener("click", () => {
            this.loginPage.classList.add("display-none");
            this.regUserPage.classList.remove("display-none");
        });
    }

    bindRegUserPageEvents() {
        const closeButton = <HTMLElement>(
            this.regUserPage.querySelector("#reg-user-page__close")
        );
        const backButton = <HTMLElement>(
            this.regUserPage.querySelector("#reg-user-page__back")
        );

        // const messageBox = <HTMLElement>(
        //     this.regUserPage.querySelector("#reg-user-page__msg")
        // );

        const emailMessageBox = <HTMLElement>(
            this.regUserPage.querySelector("#reg-user-page__email__msg")
        );
        const emailInput = <HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__email")
        );

        const usernameMessageBox = <HTMLElement>(
            this.regUserPage.querySelector("#reg-user-page__username__msg")
        );
        const usernameInput = <HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__username")
        );

        const passwordMessageBox = <HTMLElement>(
            this.regUserPage.querySelector("#reg-user-page__password__msg")
        );
        const passwordInput = <HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__password")
        );

        const passwordConfirmMessageBox = <HTMLElement>(
            this.regUserPage.querySelector(
                "#reg-user-page__passwordconfirm__msg",
            )
        );
        const passwordConfirmInput = <HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__passwordconfirm")
        );

        const nextButton = <HTMLElement>(
            this.regUserPage.querySelector("#reg-user-page__next")
        );
        const authButton = <HTMLElement>(
            this.regUserPage.querySelector("#reg-user-page__auth")
        );

        closeButton.addEventListener("click", () => {
            this.close();
        });
        backButton.addEventListener("click", () => {
            this.regUserPage.classList.add("display-none");
            this.clearMessages();
            this.loginPage.classList.remove("display-none");
        });

        emailInput.addEventListener("input", () => {
            emailMessageBox.innerText = "";
        });
        usernameInput.addEventListener("input", () => {
            usernameMessageBox.innerText = "";
        });
        passwordInput.addEventListener("input", () => {
            passwordMessageBox.innerText = "";
        });
        passwordConfirmInput.addEventListener("input", () => {
            passwordConfirmMessageBox.innerText = "";
        });

        nextButton.addEventListener("click", () => {
            const emailValidation = this.validateEmail(emailInput.value.trim());
            const usernameValidation = this.validateUsername(
                usernameInput.value.trim(),
            );
            const passwordValidation = this.validatePassword(
                passwordInput.value.trim(),
            );
            const passwordConfirmValidation = this.validatePasswordConfirm(
                passwordInput.value.trim(),
                passwordConfirmInput.value.trim(),
            );

            if (
                !emailValidation &&
                !usernameValidation &&
                !passwordValidation &&
                !passwordConfirmValidation
            ) {
                this.regUserPage.classList.add("display-none");
                this.clearMessages();
                this.regExtraInfoPage.classList.remove("display-none");
            } else {
                emailMessageBox.innerText = emailValidation;
                usernameMessageBox.innerText = usernameValidation;
                passwordMessageBox.innerText = passwordValidation;
                passwordConfirmMessageBox.innerText = passwordConfirmValidation;
            }
        });
        authButton.addEventListener("click", () => {
            this.regUserPage.classList.add("display-none");
            this.clearMessages();
            this.loginPage.classList.remove("display-none");
        });
    }

    bindRegExtraInfoPage() {
        const closeButton = <HTMLElement>(
            this.regExtraInfoPage.querySelector("#reg-extra-info-page__close")
        );
        const backButton = <HTMLElement>(
            this.regExtraInfoPage.querySelector("#reg-extra-info-page__back")
        );

        const messageBox = <HTMLElement>(
            this.regExtraInfoPage.querySelector("#reg-extra-info-page__msg")
        );

        const birthdayMessageBox = <HTMLElement>(
            this.regExtraInfoPage.querySelector(
                "#reg-extra-info-page__birthday__msg",
            )
        );
        const birthdayInput = <HTMLInputElement>(
            this.regExtraInfoPage.querySelector(
                "#reg-extra-info-page__birthday",
            )
        );
        const phoneNumberMessageBox = <HTMLElement>(
            this.regExtraInfoPage.querySelector(
                "#reg-extra-info-page__phone-number__msg",
            )
        );
        const phoneNumberInput = <HTMLInputElement>(
            this.regExtraInfoPage.querySelector(
                "#reg-extra-info-page__phone-number",
            )
        );

        const emailInput = <HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__email")
        );
        const usernameInput = <HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__username")
        );
        const passwordInput = <HTMLInputElement>(
            this.regUserPage.querySelector("#reg-user-page__password")
        );

        const submitButton = <HTMLElement>(
            this.regExtraInfoPage.querySelector("#reg-extra-info-page__submit")
        );
        const authButton = <HTMLElement>(
            this.regExtraInfoPage.querySelector("#reg-extra-info-page__auth")
        );

        backButton.addEventListener("click", () => {
            this.regExtraInfoPage.classList.add("display-none");
            this.clearMessages();
            this.regUserPage.classList.remove("display-none");
        });
        closeButton.addEventListener("click", () => {
            this.close();
        });

        birthdayInput.addEventListener("input", () => {
            messageBox.innerText = "";
            birthdayMessageBox.innerText = "";
        });
        phoneNumberInput.addEventListener("input", () => {
            messageBox.innerText = "";
            phoneNumberMessageBox.innerText = "";
        });

        submitButton.addEventListener("click", () => {
            const birthdayValidation = this.validateBirthday(
                birthdayInput.value.trim(),
            );
            const phoneNumberValidation = this.validatePhoneNumber(
                phoneNumberInput.value.trim(),
            );

            if (!birthdayValidation && !phoneNumberValidation) {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.REGISTRATION,
                    data: {
                        Email: emailInput.value.trim(),
                        Username: usernameInput.value.trim(),
                        Password: passwordInput.value.trim(),
                        Birthday: birthdayInput.value.trim(),
                        PhoneNumber: phoneNumberInput.value.trim(),
                        Icon: "img/defaultIcon.png",
                    },
                });
            } else {
                birthdayMessageBox.innerText = birthdayValidation;
                phoneNumberMessageBox.innerText = phoneNumberValidation;
            }
        });
        authButton.addEventListener("click", () => {
            this.regExtraInfoPage.classList.add("display-none");
            this.clearMessages();
            this.loginPage.classList.remove("display-none");
        });
    }

    validateEmail(email: string): string {
        if (!email) {
            return "Email не может быть пустым";
        }

        if (!email.match(/^[\x00-\x7F]*@[\x00-\x7F]*$/)) {
            return "Невалидный email";
        }

        return "";
    }

    validateUsername(username: string): string {
        if (!username) {
            return "Имя пользователя не может быть пустым";
        }

        if (!username.match(/^[a-zA-Z0-9_-]*$/)) {
            return 'Имя пользователя должно состоять из латинских букв, цифр, символов "-", "_"';
        }

        if (!String(username).match(/^.{4,29}$/)) {
            return "Имя пользователя должно иметь длину от 4 до 29 символов";
        }

        return "";
    }

    validatePassword(password: string): string {
        if (!password) {
            return "Пароль не может быть пустым";
        }

        if (
            !password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&-_\d]{8,}$/)
        ) {
            return "Пароль должен быть длиннее 8 символов и содержать хотя бы одну букву и цифру";
        }

        return "";
    }

    validatePasswordConfirm(password: string, passwordConfirm: string): string {
        if (!passwordConfirm) {
            return "Подтвердите пароль";
        }

        if (password !== passwordConfirm) {
            return "Пароли не совпадают";
        }

        return "";
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

        if (!phoneNumber.match(/^\+7[0-9]{10}$/)) {
            return "Невалидный номер телефона";
        }

        return "";
    }
}
