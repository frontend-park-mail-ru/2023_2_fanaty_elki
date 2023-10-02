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
        this.view.bindBacketClick(this.logout.bind(this));
    }
    
    logout() {
        this.userModel.logout().then(() => {
            this.view.setNonAuthUser()
        });
    }

    start() {
        console.log(this.userModel._currentUser);
        if (this.userModel._currentUser) {
            this.view.setAuthUser(this.userModel._currentUser);
        } else {
            this.view.setNonAuthUser();
        }
        this.view.render();
    }

    stop() {
        this.view.clear();
    }
}
