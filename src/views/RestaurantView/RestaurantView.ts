import IView from "../IView";
import RestaurantViewConfig from "./RestaurantViewConfig";
import restaurantTemplate from "./RestaurantView.hbs";
import "./RestaurantView.scss";

import Handlebars from "handlebars";
import dishCardTemplate from "../../components/DishCard/DishCard.hbs";
import "../../components/DishCard/DishCard.scss";

import navbarTemplate from "../../components/Navbar/Navbar.hbs";
import "../../components/Navbar/Navbar.scss";

import dishCategoryTemplate from "../../components/DishesCategory/DishesCategory.hbs";
import "../../components/DishesCategory/DishesCategory.scss";

import { DishesCategoryListObject } from "../../models/DishModel/DishModel";

/**
 * Представление страницы ресторана
 * @class
 * @extends {IView}
 */
export default class RestaurantView extends IView {
    /**
     * Элемент, содержащий имя пользователя и кнопку
     * выхода из аккаунта, отображается только если пользователь
     * авторизован
     */
    private userNameElement: HTMLElement;
    /**
     * Кнопка "Войти", отображается, если пользователь не авторизован
     */
    private signInButton: HTMLElement;

    private _is_auth: boolean;

    get is_auth() {
        return this._is_auth;
    }

    /**
     * Создает из шаблонов страницу ресторана
     * @param {HTMLElement} parent_ - тег-контейнер для содержимого страницы
     * @param {String} title_ - заголовок страницы
     */
    constructor(parent_: HTMLElement, title_: string) {
        super(parent_, title_);
        const parser = new DOMParser();
        const element: HTMLElement | null = parser
            .parseFromString(restaurantTemplate(), "text/html")
            .querySelector("#main");

        if (!element) {
            console.log("error");
            return;
        }
        this.element = element;

        Handlebars.registerPartial("dishCardTemplate", dishCardTemplate);

        this.element.querySelector("#navbar")!.innerHTML = navbarTemplate(
            RestaurantViewConfig.navbar,
        );
        this.element.querySelector("#categories")!.innerHTML =
            dishCategoryTemplate();
        this.userNameElement = <HTMLElement>(
            this.element.querySelector("#name-container")
        );
        this.signInButton = <HTMLElement>(
            this.element.querySelector("#signin-button")
        );
        this.setNonAuthUser();
    }

    /**
     * Обновляет содержимое списка блюд
     * @param {Object} list  - новый список блюд
     */
    updateList(list: DishesCategoryListObject) {
        console.log(list);
        this.element.querySelector("#categories")!.innerHTML =
            dishCategoryTemplate(list);
    }

    setRestaurantTitle(title: string) {
        this.element.querySelector('#title')!.innerHTML = title;
    }

    /**
     * Устанавливает navbar для авторизованного пользователя
     * @param {string} userName - имя пользователя
     */
    setAuthUser(userName: string) {
        this._is_auth = true;
        this.userNameElement.firstElementChild!.innerHTML = userName;
        this.signInButton.parentNode!.appendChild(this.userNameElement);
        this.signInButton.parentNode!.removeChild(this.signInButton);
    }

    /**
     * Устанавливает navbar для неавторизованного пользователя
     */
    setNonAuthUser() {
        this._is_auth = false;
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
