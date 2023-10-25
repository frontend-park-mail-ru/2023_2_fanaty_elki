/**
 * Интерфейс представления
 * @interface
 */
export class IView {
    /**
     * Родительский элемент, куда встраивается отображение
     */
    parent;

    /**
     * Встраиваемый элемент
     */
    element;

    /**
     * Заголовок страницы
     */
    title;

    /**
     * Инициализирует родительский элемент
     * @param {HTMLElement} parent_ - родительский элемент, куда встраивается представление
     * @param {String} title_ - заголовок страницы
     */
    constructor(parent_, title_) {
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
