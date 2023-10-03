
/**
 * Роутер для переключения между контроллерами разных страниц
 * @class
 */
export class Router {
    /**
     * Текущий управляющий контроллер
     */
    controller;

    redirect(path) {
        console.log(path)
        window.history.pushState({}, "", path);
        this.route(path);
    }

    route(path) {
        if (this.controller) this.controller.stop();
        this.controller = this.map(path);
        this.controller.start();
    }

    map(path) {
        switch (path) {
            case '/signup':
                return this.signup_controller;
            case '/login':
                return this.login_controller;
            case '/main':
                return this.main_controller;
            default:
                return this.main_controller;

        }
    }
}
