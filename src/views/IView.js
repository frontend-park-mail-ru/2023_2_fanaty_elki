/**
 * Интерфейс отображения
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
     * Инициализирует родительский элемент
     * @param {HTMLElement} parent_ 
     */
    constructor(parent_) {
        this.parent = parent_;
    }

    /**
     * Функция отображения
     * Добавляет встраиваемый элемент в родительский
     */
    render() {
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
