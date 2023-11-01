/**
 * Интерфейс представления
 * @interface
 */
export abstract class IView {
    /**
     * Родительский элемент, куда встраивается отображение
     */
    protected parent: HTMLElement;
    /**
     * Встраиваемый элемент
     */
    protected abstract element: HTMLElement;

    /**
     * Заголовок страницы
     */
    protected title: string;

    /**
     * Инициализирует родительский элемент
     * @param {HTMLElement} parent_ - родительский элемент, куда встраивается представление
     * @param {String} title_ - заголовок страницы
     */
    constructor(parent_: HTMLElement, title_: string) {
        this.parent = parent_;
        this.title = title_;
    }

    /**
     * Функция отображения
     * Добавляет встраиваемый элемент в родительский
     * Изменяет заголовок страницы
     */
    render() {
        document.title = this.title;
        this.parent.appendChild(this.element);
    }

    /**
     * Функция очистки
     * Удаляет встраиваемый элемент из родительского
     */
    clear() {
        this.parent.removeChild(this.element);
    }
}
