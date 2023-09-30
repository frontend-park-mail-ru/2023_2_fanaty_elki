export class Router {
    controller;
    main_controller;
    empty_controller;

    route(path) {
        if (this.controller) this.controller.stop();
        this.controller = this.map(path);
        this.controller.start();
    }

    map(path) {
        switch (path) {
            case '/empty':
                return this.empty_controller;
            case '/main':
                return this.main_controller;
            default:
                return this.main_controller;

        }
    }
}
