/**
 * Интерфейс контроллера
 * @interface
 */
export abstract class IController {
    /**
     * Ссылка на представление
     */
    // view: IView;

    // /**
    //  * Установка представления
    //  * @param {IView} view_ - конкретное представление
    //  */
    // constructor(view_: IView) {
    //     this.view = view_;
    // }

    /**
     * Отрисовка представления
     */
    abstract start(): void;

    /**
     * Очистка представления
     */
    abstract stop(): void;
}
