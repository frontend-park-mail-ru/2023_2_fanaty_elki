import { IView } from "../IView.js";
/**
 * Представление страницы регистрации
 * @extends {IView}
 */
export class SignUpView extends IView {
    /**
     * Добавляет родительский элемент отображения и устанавливает форму в состояние по умолчанию
     * @param {HTMLElement} parent_ - тег-контейнер для содержимого страницы
     */
    constructor(parent_) {
        super(parent_);
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
     * @param {string} errors[].field - невалидное поле
     * @param {string} errors[].message - сообщение об ошибке
     */
    handleFormValidation(errors) {
        const inputWithMsg = Handlebars.templates["FormInputWithMsg.hbs"];

        errors.forEach((error) => {
            const inputDivToReplace = this.element.querySelector(`#input-div-${error.field}`);
            const inputToReplace = inputDivToReplace.querySelector(`#${error.field}`);

            const placeholder = document.createElement("div");
            placeholder.innerHTML = inputWithMsg({
                style: "error",
                message: error.message,
                type: inputToReplace.type,
                name: inputToReplace.name,
                placeholder: inputToReplace.placeholder,
                value: inputToReplace.value,
                autocomplete: inputToReplace.autocomplete,
            });
            const newInputDiv = placeholder.firstChild;

            inputDivToReplace.replaceWith(newInputDiv);
        });
    }

    /**
     * Выводит сообщения об ошибках со стороны сервера
     */
    showErrorMessage() {
        this.element.querySelector(".signup-error-msg").textContent = "Такой пользователь уже существует";
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
