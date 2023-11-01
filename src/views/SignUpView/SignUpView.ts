import { IView } from "../IView";
import SignUpTemplate from "./SignUpView.hbs";
import "./SignUpView.scss";

import inputTemplate from "../../components/FormInputWithMsg/FormInputWithMsg.hbs";
import "../../components/FormInputWithMsg/FormInputWithMsg.scss";

import buttonTemplate from "../../components/Button/Button.hbs";
import "../../components/Button/Button.scss";

export type ValidationError = {
    isValid: boolean;
    field: string;
    message: string;
};

export type SignUpFormData = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

/**
 * Представление страницы регистрации
 * @extends {IView}
 */
export class SignUpView extends IView {
    element: HTMLElement;
    /**
     * Добавляет родительский элемент отображения и устанавливает форму в состояние по умолчанию
     * @param {HTMLElement} parent_ - тег-контейнер для содержимого страницы
     * @param {String} title_ - заголовок страницы
     */
    constructor(parent_: HTMLElement, title_: string) {
        super(parent_, title_);
        this.setDefaultState();
    }

    /**
     * Добавляет элементы на страницу и устанавливает состояние по умолчанию
     */
    setDefaultState() {
        const parser = new DOMParser();
        const element: HTMLElement | null = parser
            .parseFromString(SignUpTemplate(), "text/html")
            .querySelector("#signup");
        if (!element) {
            console.log("Error on parse");
            return;
        }
        this.element = element;

        const inputGroup = this.element.querySelector("#input-container")!;
        const inputs = [
            {
                style: "default",
                message: "",
                type: "email",
                name: "email",
                placeholder: "email",
                value: "",
                autocomplete: "email",
            },
            {
                style: "default",
                message: "",
                type: "text",
                name: "username",
                placeholder: "имя пользователя",
                value: "",
                autocomplete: "username",
            },
            {
                style: "default",
                message: "",
                type: "password",
                name: "password",
                placeholder: "пароль",
                value: "",
                autocomplete: "new-password",
            },
            {
                style: "default",
                message: "",
                type: "password",
                name: "passwordconfirm",
                placeholder: "повторите пароль",
                value: "",
                autocomplete: "new-password",
            },
        ];
        inputs.forEach((element) => {
            inputGroup.innerHTML += inputTemplate(element);
        });

        const formControl = this.element.querySelector("#button-container")!;
        const buttons = [
            {
                id: "submit",
                text: "Зарегистрироваться",
                style: "primary",
            },
            {
                id: "auth",
                text: "Уже есть аккаунт?",
                style: "secondary",
            },
        ];
        buttons.forEach((element) => {
            formControl.innerHTML += buttonTemplate(element);
        });
    }

    /**
     * Очищает станицу и состояние
     */
    clearState() {
        this.element.innerHTML = "";
    }

    /**
     * Устанавливает обработчик на поле ввода email
     * @param {Function} handler - обработчик
     */
    bindEmailInputHandler(handler: (event: Event) => void) {
        this.element
            .querySelector("#email")!
            .addEventListener("input", handler);
    }

    /**
     * Устанавливает обработчик на поле ввода username
     * @param {Function} handler - обработчик
     */
    bindUsernameInputHandler(handler: (event: Event) => void) {
        this.element
            .querySelector("#username")!
            .addEventListener("input", handler);
    }

    /**
     * Устанавливает обработчик на поле ввода password
     * @param {Function} handler - обработчик
     */
    bindPasswordInputHandler(handler: (event: Event) => void) {
        this.element
            .querySelector("#password")!
            .addEventListener("input", handler);
    }

    /**
     * Устанавливает обработчик на поле ввода passwordconfirm
     * @param {Function} handler - обработчик
     */
    bindPasswordConfirmInputHandler(handler: (event: Event) => void) {
        this.element
            .querySelector("#passwordconfirm")!
            .addEventListener("input", handler);
    }

    /**
     * Устанавливает обработчик на кнопку отправки формы
     * @param {Function} handler - обработчик
     */
    bindSubmitHandler(handler: () => void) {
        this.element
            .querySelector("#submit")!
            .addEventListener("click", (event) => {
                event.preventDefault();
                handler();
            });
    }

    /**
     * Устанавливает обработчик на кнопку перенаправления на авторизацию
     * @param {Function} handler - обработчик
     */
    bindLoginClick(handler: () => void) {
        this.element
            .querySelector("#auth")!
            .addEventListener("click", (event) => {
                event.preventDefault();
                handler();
            });
    }

    /**
     * Устанавливает обработчик на кнопку закрытия формы
     * @param {Function} handler - обработчик
     */
    bindCloseClick(handler: () => void) {
        this.element
            .querySelector("#close")!
            .addEventListener("click", (event) => {
                event.preventDefault();
                handler();
            });
    }

    /**
     * Обработчик результатов валидации формы
     * Вывод сообщения об ошибках
     * @param {Object[]} errors
     * @param {string} errors[].isValid - результат валидации
     * @param {string} errors[].field - поле
     * @param {string} errors[].message - сообщение об ошибке
     */
    handleFormValidation(errors: ValidationError[]) {
        errors.forEach((error: ValidationError) => {
            const errorInputDiv = document.querySelector(
                `#input-div-${error.field}`,
            )!;
            const messageDiv = errorInputDiv.querySelector("div")!;
            const fieldInput = errorInputDiv.querySelector("input")!;

            if (error.isValid) {
                fieldInput.className = "input-with-msg__input_default";
                messageDiv.className = "input-with-msg__msg_default";
                messageDiv.innerText = "";
            } else {
                fieldInput.className = "input-with-msg__input_error";
                messageDiv.className = "input-with-msg__msg_error";
                messageDiv.innerText = error.message;
            }
        });
    }

    /**
     * Выводит сообщения об ошибках со стороны сервера
     */
    showErrorMessage(msg: string) {
        this.element.querySelector("#msg")!.textContent = msg;
    }

    /**
     * Получение данных формы
     * @returns {Object} - данные формы
     */
    get formData(): SignUpFormData {
        const htmlForm = this.element.querySelector("#form") as HTMLFormElement;
        const formData: FormData = new FormData(htmlForm);
        return {
            username: <string>formData.get("username"),
            email: <string>formData.get("email"),
            password: <string>formData.get("password"),
            passwordConfirm: <string>formData.get("passwordconfirm"),
        };
    }
}
