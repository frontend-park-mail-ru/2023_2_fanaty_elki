export class Router {
    controller;
    main_controller;
    empty_controller;
    signup_controller;
    login_controller;

    redirect(path) {
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
