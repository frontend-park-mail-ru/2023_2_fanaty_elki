/**
 * Интерфейс контроллера
 * @interface
 */
export default interface IController {
    /**
     * Отрисовка представления
     */
    start(): void;

    /**
     * Очистка представления
     */
    stop(): void;
}
