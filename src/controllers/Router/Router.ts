import IController from "../IController";

type RouteList = {
    [route: string]: IController;
};

/**
 * Роутер для переключения между контроллерами разных страниц
 * @class
 */
export default class Router {
    private routes: RouteList;
    /**
     * Текущий управляющий контроллер
     */
    currentController: IController;

    constructor(routes_: RouteList) {
        this.routes = routes_;
    }

    add_route(path: string, controller: IController) {
        this.routes[path] = controller;
    }
    /**
     * Переход с одной страницы на другую с сохранением
     * в историю
     * @param {string} path - путь на новую страницу
     */
    redirect(path: string) {
        window.history.pushState({}, "", path);
        this.route(path);
    }

    /**
     * Назначение нового главного контроллера
     * @param {string} path - путь к страницы нового главного контроллера
     */
    route(path: string) {
        if (this.currentController) this.currentController.stop();
        this.currentController = this.routes[path];
        this.currentController.start();
    }
}
