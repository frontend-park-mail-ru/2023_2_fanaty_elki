import { IController } from "../IController.js";
import { config } from "../../config.js";
import { Router } from "../Router/Router.js";

export class MainController extends IController {
    restaurantModel;

    constructor(view, restaurantModel_) {
        super(view);
        this.restaurantModel = restaurantModel_;
    }

    start() {
        this.view.updateNavbar({
            address: config.navbar.address,
            search_ph: config.navbar.search_ph
        });

        (async () => {
            const cards = await this.restaurantModel.getAll()
            this.view.updateRestoraunt({
                title: config.categories.category1.title,
                cards: cards
            });
        })();

        // this.restaurantModel.getAll().then(data => {
        //     this.view.updateRestoraunt({
        //         title: config.categories.category1.title,
        //         cards: data
        //     });
        // });
        this.view.render();
        // this.view.bindAddressClick((event) => {
        //     const path = '/empty';
        //     window.history.pushState({}, "", path);
        //     router.route(path);
        // });
        this.view.bindAddressClick(event => {
            this.restaurantModel.getAll().then(data => {
                this.view.updateRestoraunt({
                    title: config.categories.category1.title,
                    cards: data
                });
            });

        });
    }

    stop() {
        this.view.clear();
    }
}
