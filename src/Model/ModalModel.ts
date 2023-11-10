import { IObservable } from "../modules/observer";

/**
 * Модель модального окна
 */
export class ModalModel extends IObservable {
    /**
     * Состояние модального окна
     */
    private isOpened: boolean;

    /**
     * Конструктор
     */
    constructor() {
        super();
        this.isOpened = false;
    }

    /**
     * Получение состояния модального окна
     * @returns {boolean} - открыто ли модальное окно
     */
    getIsOpened(): boolean {
        return this.isOpened;
    }

    /**
     * Открытие модального окна
     */
    open() {
        this.isOpened = true;
        this.notifyObservers();
    }

    /**
     * Закрытие модального окна
     */
    close() {
        this.isOpened = false;
        this.notifyObservers();
    }
}
