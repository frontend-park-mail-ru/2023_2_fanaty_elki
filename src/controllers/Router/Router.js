export class Router {
    controller;
    main_controller;
    empty_controller;

    route(path) {
        if (this.controller) this.controller.hide();
        switch (path) {
            case '/empty':
                this.controller = this.empty_controller;
                break;
            case '/main':
                this.controller = this.main_controller;
                break;
            default:
                this.controller = this.main_controller;
                break;
        }
        this.controller.show();
    }
}
