import { config } from "../../config.js";
import { IView } from "../IView.js";

/**
 * Представление главной страницы
 * @class 
 * @extends {IView}
 * @category Views 
 */
export class MainView extends IView {
    /**
     * Элемент, содержащий имя пользователя и кнопку
     * выхода из аккаунта, отображается только если пользователь
     * авторизован
     */
    userNameElement;
    /**
     * Кнопка "Войти", отображается, если пользователь не авторизован
     */
    signInButton;

    /**
     * Создает из шаблонов главную страницу
     * @param {HTMLElement} parent_ - тег-контейнер для содержимового страницы  
     */
    constructor(parent_) {
        super(parent_);
        const MainTemplate = Handlebars.templates['MainView.hbs'];
        const parser = new DOMParser();
        this.element = parser.parseFromString(MainTemplate(), 'text/html').querySelector('#main');
        if (!this.element) return;

        const cardTemplate = Handlebars.templates['card.hbs'];
        Handlebars.registerPartial('cardTemplate', cardTemplate);
        this.navbarTemplate = Handlebars.templates['navbar.hbs'];
        this.categoryTemplate = Handlebars.templates['category.hbs'];
        this.element.querySelector('#navbar').innerHTML = this.navbarTemplate(config.navbar);
        this.element.querySelector('#categories').innerHTML = this.categoryTemplate();
        this.userNameElement = this.element.querySelector('.name_container');
        this.signInButton = this.element.querySelector('.signin');
        this.setNonAuthUser();
    }

    /**
     * Обновляет содержимое списка ресторанов
     * @param {Object} list  - новый список ресторанов
     */
    updateList(list) {
        this.element.querySelector('#categories').innerHTML = this.categoryTemplate(list);
    }

    /**
     * Устанавливает navbar для авторизованного пользователя
     * @param {string} userName - имя пользователя 
     */
    setAuthUser(userName) {
        this.is_auth = true;
        this.userNameElement.firstElementChild.innerHTML = userName;
        this.signInButton.parentNode.appendChild(this.userNameElement);
        this.signInButton.parentNode.removeChild(this.signInButton);
    }

    /**
     * Устанавливает navbar для неавторизованного пользователя
     */
    setNonAuthUser() {
        this.is_auth = false;
        this.userNameElement.parentNode.appendChild(this.signInButton);
        this.userNameElement.parentNode.removeChild(this.userNameElement);
    }

    /**
     * Устанавливает обработчик на кнопку выхода из аккаунта
     * @param {Function} handler - обработчик
     */
    bindExitClick(handler) {
        this.userNameElement.querySelector('.exit').addEventListener('click', handler);
    }

    /**
     * Устанавливает обработчик на кнопку с адресом
     * @param {Function} handler - обработчик
     */
    bindAddressClick(handler) {
        this.element.querySelector('.address').addEventListener('click', handler);
    }

    /**
     * Устанавливает обработчик на логотип
     * @param {Function} handler - обработчик
     */
    bindLogoClick(handler) {
        this.element.querySelector('.logo').addEventListener('click', handler);
    }

    /**
     * Устанавливает обработчик на кнопку 'Войти'
     * @param {Function} handler - обработчик
     */
    bindPersonClick(handler) {
        this.signInButton.addEventListener('click', handler);
    }

}
