import { IController } from "../IController";
import { LoginController } from "../LoginController/LoginController";
import { MainController } from "../MainController/MainController";
import { SignUpController } from "../SignUpController/SignUpController";

/**
 * Роутер для переключения между контроллерами разных страниц
 * @class
 */
export class Router {
    main_controller: MainController;
    signup_controller: SignUpController;
    login_controller: LoginController;
    /**
     * Текущий управляющий контроллер
     */
    currentController: IController;

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
        this.currentController = this.map(path);
        this.currentController.start();
    }

    /**
     * Поиск контроллера по пути
     * @param {string} path - путь
     * @returns {IController} - контроллер определенного пути
     */
    map(path: string) {
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
