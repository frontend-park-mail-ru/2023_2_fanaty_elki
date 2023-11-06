import IView from "../IView";
import MainTemplate from "./MainView.hbs";
import "./MainView.scss";

import Handlebars from "handlebars";
import restaurantCardTemplate from "../../components/RestaurantCard/RestaurantCard.hbs";
import "../../components/RestaurantCard/RestaurantCard.scss";

import restaurantsCategoryTemplate from "../../components/RestaurantsCategory/RestaurantsCategory.hbs";
import "../../components/RestaurantsCategory/RestaurantsCategory.scss";

import { RestaurantCategoryListObject } from "../../models/RestaurantModel/RestaurantModel";

/**
 * Представление главной страницы
 * @class
 * @extends {IView}
 */
export default class MainView extends IView {
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

        Handlebars.registerPartial(
            "restaurantCardTemplate",
            restaurantCardTemplate,
        );
        this.element.querySelector("#categories")!.innerHTML =
            restaurantsCategoryTemplate();
    }

    mountNavbar() {
        navbar.mount(this.element.querySelector("#navbar")!);
    }

    /**
     * Обновляет содержимое списка ресторанов
     * @param {Object} list  - новый список ресторанов
     */
    updateList(list: RestaurantCategoryListObject) {
        console.log(list);
        this.element.querySelector("#categories")!.innerHTML =
            restaurantsCategoryTemplate(list);
    }
}
