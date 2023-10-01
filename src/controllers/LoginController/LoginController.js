import { IController } from "../IController.js";
import { Router } from "../Router/Router.js";

export class LoginController {
    _userModel;
    _loginView;

    constructor(loginView, userModel) {
        this._userModel = userModel;
        this._loginView = loginView;
        this._loginView.bindSubmitHandler(() => {
            const data = this.loginView.formData;
            this._userModel.login(data).then(response => {
            });
        });
        this._loginView.bindSignUpClick(() => {
            const path = '/signup';
            console.log('push');
            window.history.pushState({}, "", path);
            router.route(path);
        })
    }

    start() {
        this._loginView.render();
    }

    stop() {
        this._loginView.clear();
    }
}
