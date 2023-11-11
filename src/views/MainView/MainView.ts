import { config } from "./config";
import { IView } from "../IView";
import MainTemplate from "./MainView.hbs";
import "./MainView.scss";

import Handlebars from "handlebars";
import cardTemplate from "../../components/Card/card.hbs";
import "../../components/Card/card.scss";

import navbarTemplate from "../../components/Navbar/navbar.hbs";
import "../../components/Navbar/navbar.scss";

import categoryTemplate from "../../components/Category/category.hbs";
import "../../components/Category/category.scss";

export type Restaurant = {
    Icon: string;
    Name: string;
    DeliveryPrice: number;
    DeliveryTime: number;
    DeliveryTimeMax: number;
};

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
    userNameElement: HTMLElement;
    /**
     * Кнопка "Войти", отображается, если пользователь не авторизован
     */
    signInButton: HTMLElement;

    element: HTMLElement;
    is_auth: boolean;

    /**
     * Создает из шаблонов главную страницу
     * @param {HTMLElement} parent_ - тег-контейнер для содержимого страницы
     * @param {String} title_ - заголовок страницы
     */
    constructor(parent_: HTMLElement, title_: string) {
        super(parent_, title_);
        const parser = new DOMParser();
        const element: HTMLElement | null = parser
            .parseFromString(MainTemplate(), "text/html")
            .querySelector("#main");

        if (!element) {
            console.log("error");
            return;
        }
        this.element = element;

        Handlebars.registerPartial("cardTemplate", cardTemplate);
        this.element.querySelector("#navbar")!.innerHTML = navbarTemplate(
            config.navbar,
        );
        this.element.querySelector("#categories")!.innerHTML =
            categoryTemplate();
        this.userNameElement = <HTMLElement>(
            this.element.querySelector("#name-container")
        );
        this.signInButton = <HTMLElement>(
            this.element.querySelector("#signin-button")
        );
        this.setNonAuthUser();
    }

    /**
     * Обновляет содержимое списка ресторанов
     * @param {Object} list  - новый список ресторанов
     */
    updateList(list: any) {
        this.element.querySelector("#categories")!.innerHTML =
            categoryTemplate(list);
    }

    /**
     * Устанавливает navbar для авторизованного пользователя
     * @param {string} userName - имя пользователя
     */
    setAuthUser(userName: string) {
        this.is_auth = true;
        this.userNameElement.firstElementChild!.innerHTML = userName;
        this.signInButton.parentNode!.appendChild(this.userNameElement);
        this.signInButton.parentNode!.removeChild(this.signInButton);
    }

    /**
     * Устанавливает navbar для неавторизованного пользователя
     */
    setNonAuthUser() {
        this.is_auth = false;
        this.userNameElement.parentNode!.appendChild(this.signInButton);
        this.userNameElement.parentNode!.removeChild(this.userNameElement);
    }

    /**
     * Устанавливает обработчик на кнопку выхода из аккаунта
     * @param {Function} handler - обработчик
     */
    bindExitClick(handler: () => void) {
        this.userNameElement
            .querySelector("#exit-button")!
            .addEventListener("click", handler);
    }

    /**
     * Устанавливает обработчик на кнопку с адресом
     * @param {Function} handler - обработчик
     */
    bindAddressClick(handler: () => void) {
        this.element
            .querySelector("#address-button")!
            .addEventListener("click", handler);
    }

    /**
     * Устанавливает обработчик на логотип
     * @param {Function} handler - обработчик
     */
    bindLogoClick(handler: () => void) {
        this.element.querySelector("#logo")!.addEventListener("click", handler);
    }

    /**
     * Устанавливает обработчик на кнопку 'Войти'
     * @param {Function} handler - обработчик
     */
    bindPersonClick(handler: () => void) {
        this.signInButton.addEventListener("click", handler);
    }
}
