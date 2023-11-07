import IView from "../IView";
import restaurantTemplate from "./RestaurantView.hbs";
import "./RestaurantView.scss";

import Handlebars from "handlebars";
import dishCardTemplate from "../../components/DishCard/DishCard.hbs";
import "../../components/DishCard/DishCard.scss";

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
    }

    mountNavbar() {
        navbar.mount(this.element.querySelector("#navbar")!);
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
        this.element.querySelector("#title")!.innerHTML = title;
    }

    getButtons() {
        return this.element.querySelectorAll(".button_primary-green");
    }
}
