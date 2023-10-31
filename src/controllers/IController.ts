import { IView } from "../views/IView";
/**
 * Интерфейс контроллера
 * @interface
 */
export abstract class IController {
    /**
     * Ссылка на представление
     */
    view;

    /**
     * Установка представления
     * @param {IView} view_ - представление
     */
    constructor(view_: IView) {
        this.view = view_;
    }

    /**
     * Отрисовка представления
     */
    start() {
        console.log("show");
    }

    /**
     * Очистка представления
     */
    stop() {
        console.log("hide");
    }
}
