import { config } from "./config.js";
import { IView } from "../IView.js";
import MainTemplate from './MainView.hbs';
import './MainView.css';

import cardTemplate from '../../components/Card/card.hbs';
import '../../components/Card/card.css';

import navbarTemplate from '../../components/Navbar/navbar.hbs';
import '../../components/Navbar/navbar.css';

import categoryTemplate from '../../components/Category/category.hbs';
import '../../components/Category/category.css';

/**
 * Представление главной страницы 
 * @class
 * @extends {IView} 
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
     * @param {HTMLElement} parent_ - тег-контейнер для содержимого страницы
     * @param {String} title_ - заголовок страницы
     */
    constructor(parent_, title_) {
        super(parent_, title_);
        const parser = new DOMParser();
        this.element = parser.parseFromString(MainTemplate(), 'text/html').querySelector('#main');
        if (!this.element) return;

        Handlebars.registerPartial('cardTemplate', cardTemplate);
        this.navbarTemplate = navbarTemplate;
        this.categoryTemplate = categoryTemplate;
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
