/**
 * Интерфейс контроллера
 * @interface
 */
export default interface IController {
    /**
     * Отрисовка представления
     */
    start(params?: URLSearchParams): void;

    /**
     * Очистка представления
     */
    stop(): void;
}
