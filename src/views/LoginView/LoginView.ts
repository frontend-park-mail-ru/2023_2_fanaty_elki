import { IView } from "../IView";
import loginTemplate from "./LoginView.hbs";
import "./LoginView.scss";

import inputTemplate from "../../components/FormInputWithMsg/FormInputWithMsg.hbs";
import "../../components/FormInputWithMsg/FormInputWithMsg.scss";

import buttonTemplate from "../../components/Button/Button.hbs";
import "../../components/Button/Button.scss";

/**
 * Представление страницы авторизации
 * @class
 * @extends {IView}
 */
export class LoginView extends IView {
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
            .parseFromString(loginTemplate(), "text/html")
            .querySelector("#login");
        if (!element) {
            console.log("Error on parse");
            return;
        }
        this.element = element;

        const inputGroup = this.element.querySelector("#input-container")!;
        const inputs = [
            {
                name: "username",
                type: "text",
                placeholder: "имя пользователя",
                style: "default",
                autocomplete: "off",
            },
            {
                name: "password",
                type: "password",
                placeholder: "пароль",
                style: "default",
                autocomplete: "off",
            },
        ];
        inputs.forEach((element) => {
            inputGroup.innerHTML += inputTemplate(element);
        });

        const formControl = this.element.querySelector("#button-container")!;
        const buttons = [
            {
                id: "submit",
                text: "Войти",
                style: "primary",
            },
            {
                id: "reg",
                text: "Зарегистрироваться",
                style: "secondary",
            },
        ];
        buttons.forEach((element) => {
            formControl.innerHTML += buttonTemplate(element);
        });

        if (!this.element) return;
    }

    /**
     * Очищает станицу и состояние
     */
    clearState() {
        this.element.innerHTML = "";
    }

    /**
     * Устанавливает обработчик на отправку формы
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
     * Устанавливает обработчик на кнопку перенаправления на регистрацию
     * @param {Function} handler - обработчик
     */
    bindSignUpClick(handler: () => void) {
        this.element
            .querySelector("#reg")!
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
     * Выводит сообщения об ошибках со стороны сервера
     */
    showErrorMessage(msg: string) {
        this.element.querySelector("#msg")!.textContent = msg;
    }

    /**
     * Получение данных формы
     */
    get formData() {
        const htmlForm: HTMLFormElement = this.element.querySelector("#form")!;
        const formData: FormData = new FormData(htmlForm);
        return {
            username: formData.get("username"),
            password: formData.get("password"),
        };
    }
}
