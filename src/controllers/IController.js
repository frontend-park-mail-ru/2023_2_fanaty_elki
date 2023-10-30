/**
 * Интерфейс контроллера
 * @interface
 */
export class IController {
    /**
     * Ссылка на представление
     */
    view;

    /**
     * Установка представления
     * @param {IView} view_ - представление
     */
    constructor(view_) {
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
