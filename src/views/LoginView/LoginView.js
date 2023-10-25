import { IView } from "../IView.js";
import loginTemplate from './LoginView.hbs';
import './LoginView.css';

import inputTemplate from '../../components/FormInputWithMsg/FormInputWithMsg.hbs';
import '../../components/FormInputWithMsg/FormInputWithMsg.css';

import buttonTemplate from '../../components/Button/Button.hbs';
import '../../components/Button/Button.css';

/**
 * Представление страницы авторизации
 * @class
 * @extends {IView}
 */
export class LoginView extends IView {
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
        const parser = new DOMParser();
        this.element = parser.parseFromString(loginTemplate(), 'text/html').querySelector('#login');

        const inputGroup = this.element.querySelector(".loginform-inputgroup");
        const inputs = [
            {
                name: "username",
                type: "text",
                placeholder: "имя пользователя",
                style: "default",
                autocomplete: "off"
            },
            {
                name: "password",
                type: "password",
                placeholder: "пароль",
                style: "default",
                autocomplete: "off"
            }
        ]
        inputs.forEach((element) => {
            inputGroup.innerHTML += inputTemplate(element);
        })

        const formControl = this.element.querySelector(".loginform-control");
        const buttons = [
            {
                id: "submit",
                text: "Войти",
                style: "primary"
            },
            {
                id: "reg",
                text: "Зарегистрироваться",
                style: "secondary"
            }
        ]
        buttons.forEach((element) => {
            formControl.innerHTML += buttonTemplate(element);
        })

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
    bindSubmitHandler(handler) {
        this.element.querySelector('#submit').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    /**
     * Устанавливает обработчик на кнопку перенаправления на регистрацию
     * @param {Function} handler - обработчик 
     */
    bindSignUpClick(handler) {
        this.element.querySelector('#reg').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    /**
     * Устанавливает обработчик на кнопку закрытия формы
     * @param {Function} handler - обработчик
     */
    bindCloseClick(handler) {
        this.element.querySelector('.login-close').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    /**
     * Выводит сообщения об ошибках со стороны сервера
     */
    showErrorMessage(msg) {
        this.element.querySelector(".loginform-error-msg").textContent = msg;
    }

    /**
     * Получение данных формы
     */
    get formData() {
        const form = this.element.querySelector('.loginform-form');
        return {
            username: form.username.value,
            password: form.password.value,
        };
    }
}
