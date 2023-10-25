import { IView } from "../IView.js";
import { config } from "/config.js"

/**
 * Представление страницы регистрации
 * @extends {IView}
 */
export class SignUpView extends IView {
    /**
     * Добавляет родительский элемент отображения и устанавливает форму в состояние по умолчанию
     * @param {HTMLElement} parent_ - тег-контейнер для содержимого страницы
     * @param {String} title_ - заголовок страницы
     */
    constructor(parent_, title_) {
        super(parent_, title_);
        this.setDefaultState();
    }

    /**
     * Добавляет элементы на страницу и устанавливает состояние по умолчанию
     */
    setDefaultState() {
        const SignUpTemplate = Handlebars.templates["SignUpView.hbs"];
        const parser = new DOMParser();
        this.element = parser.parseFromString(SignUpTemplate(), "text/html").querySelector("#signup");
        if (!this.element) return;

        const inputTemplate = Handlebars.templates["FormInputWithMsg.hbs"];
        const inputGroup = this.element.querySelector(".signup-inputgroup");
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

        const buttonTemplate = Handlebars.templates["Button.hbs"];
        const formControl = this.element.querySelector(".signup-control");
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
    bindEmailKeypressHandler(handler) {
        this.element.querySelector('#email').addEventListener("input", (event) => {
            handler(event);
        });
    }

    /**
     * Устанавливает обработчик на поле ввода username
     * @param {Function} handler - обработчик
     */
    bindUsernameKeypressHandler(handler) {
        this.element.querySelector('#username').addEventListener("input", (event) => {
            handler(event);
        });
    }

    /**
     * Устанавливает обработчик на поле ввода password
     * @param {Function} handler - обработчик
     */
    bindPasswordKeypressHandler(handler) {
        this.element.querySelector('#password').addEventListener("input", (event) => {
            handler(event);
        });
    }

    /**
     * Устанавливает обработчик на поле ввода passwordconfirm
     * @param {Function} handler - обработчик
     */
    bindPasswordConfirmKeypressHandler(handler) {
        this.element.querySelector('#passwordconfirm').addEventListener("input", (event) => {
            handler(event);
        });
    }

    /**
     * Устанавливает обработчик на кнопку отправки формы
     * @param {Function} handler - обработчик
     */
    bindSubmitHandler(handler) {
        this.element.querySelector("#submit").addEventListener("click", (event) => {
            event.preventDefault();
            handler(event);
        });
    }

    /**
     * Устанавливает обработчик на кнопку перенаправления на авторизацию
     * @param {Function} handler - обработчик
     */
    bindLoginClick(handler) {
        this.element.querySelector("#auth").addEventListener("click", (event) => {
            event.preventDefault();
            handler(event);
        });
    }

    /**
     * Устанавливает обработчик на кнопку закрытия формы
     * @param {Function} handler - обработчик
     */
    bindCloseClick(handler) {
        this.element.querySelector(".singup-close").addEventListener("click", (event) => {
            event.preventDefault();
            handler(event);
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
    handleFormValidation(errors) {
        errors.forEach((error) => {
            const errorInputDiv = document.querySelector(`#input-div-${error.field}`);
            const messageDiv = errorInputDiv.querySelector('div');
            const fieldInput = errorInputDiv.querySelector('input');

            if (error.isValid) {
                fieldInput.className = "form-input-with-msg-input__default";
                messageDiv.className = "form-input-with-msg-msg__default";
                messageDiv.innerText = "";
            } else {
                fieldInput.className = "form-input-with-msg-input__error";
                messageDiv.className = "form-input-with-msg-msg__error";
                messageDiv.innerText = error.message;
            }
        });
    }

    /**
     * Выводит сообщения об ошибках со стороны сервера
     */
    showErrorMessage(error) {
        let msg;
        switch (error.type) {
            case config.ERROR_TYPE.FAILURE:
                msg = config.api.signup.failure[error.status];
                break;
            case config.ERROR_TYPE.NETWORK_ERROR:
                msg = config.GENERAL_MESSAGE.NETWORK_ERROR;
                break;
            case config.ERROR_TYPE.UNEXPECTED:
                msg = config.GENERAL_MESSAGE.UNEXPECTED_ERROR;
                break;
        }
        this.element.querySelector(".signup-error-msg").textContent = msg;
    }

    /**
     * Получение данных формы
     * @returns {Object} - данные формы
     */
    get formData() {
        const form = this.element.querySelector(".signup-form");
        return {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
            passwordConfirm: form.passwordconfirm.value,
        };
    }
}
