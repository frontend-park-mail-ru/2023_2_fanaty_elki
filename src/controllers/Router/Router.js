/**
 * Роутер для переключения между контроллерами разных страниц
 * @class
 */
export class Router {
    /**
     * Текущий управляющий контроллер
     */
    controller;

    /**
     * Переход с одной страницы на другую с сохранением
     * в историю
     * @param {string} path - путь на новую страницу
     */
    redirect(path) {
        window.history.pushState({}, "", path);
        this.route(path);
    }

    /**
     * Назначение нового главного контроллера
     * @param {string} path - путь к страницы нового главного контроллера
     */
    route(path) {
        if (this.controller) this.controller.stop();
        this.controller = this.map(path);
        this.controller.start();
    }

    /**
     * Поиск контроллера по пути
     * @param {string} path - путь
     * @returns {IController} - контроллер определенного пути
     */
    map(path) {
        switch (path) {
            case "/signup":
                return this.signup_controller;
            case "/login":
                return this.login_controller;
            case "/main":
                return this.main_controller;
            default:
                return this.main_controller;
        }
    }
}
