import { IController } from "../IController.js";
import { config } from "../../config.js";
import { Router } from "../Router/Router.js";

export class MainController extends IController {
    restaurantModel;
    userModel;

    constructor(view, restaurantModel_, userModel_) {
        super(view);
        this.restaurantModel = restaurantModel_;
        this.userModel = userModel_;

        this.view.bindPersonClick(() => {
            router.redirect('/login');
        });
        this.view.bindExitClick(this.logout.bind(this));
    }
    
    logout() {
        this.userModel.logout().then(() => {
            this.view.setNonAuthUser()
        });
    }

    start() {
        if (this.userModel._currentUser) {
            this.view.setAuthUser(this.userModel._currentUser.username);
        } else {
            this.view.setNonAuthUser();
        }
        this.restaurantModel.getAll().then(list => {
            console.log(list);
            list.restaurants.forEach(element => {
                element.DeliveryTimeMax = element.DeliveryTime + 10;
            });
            this.view.updateList(list);
        })
        this.view.render();
    }

    stop() {
        this.view.clear();
    }
}
