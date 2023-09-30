import { IController } from "../IController.js";
import { config } from "../../config.js";
import { Router } from "../Router/Router.js";

export class MainController extends IController {
    constructor(view) {
        super(view);
    }

    start() {
        this.view.update({
            address: config.navbar.address,
            search_ph: config.navbar.search_ph,
            title: config.categories.category1.title,
            cards: config.categories.category1.cards
        });
        this.view.render();
        this.view.bindAddressClick(() => {
            const path = '/empty';
            window.history.pushState({}, "", path);
            router.route(path);
        });
    }

    stop() {
        this.view.clear();
    }
}
