import { IObservable } from "../modules/observer";

/**
 * Модель URL
 * @class
 */
export class URLModel extends IObservable {
    /**
     * Текущий URL
     */
    private url: string;

    /**
     * Конструктор
     */
    constructor() {
        super();
        this.url = "/";
    }

    /**
     * Получение URL
     * @returns {string} - URL
     */
    getURL(): string {
        return this.url;
    }

    /**
     * Установка URL
     * @param {string} url - URL
     */
    setURL(url: string) {
        this.url = url;
        this.notifyObservers();
    }
}
