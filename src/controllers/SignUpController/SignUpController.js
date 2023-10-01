import { IController } from "../IController.js";
import { Router } from "../Router/Router.js";

export class SignUpController{
    _userModel;
    _signUpView;

    constructor(signUpView, userModel) {
        this._userModel = userModel;
        this._signUpView = signUpView;
        this._signUpView.bindSubmitHandler(() => {
            const data = this._signUpView.formData;
            this._userModel.signup(data).then(response => {
            });
        })
        this._signUpView.bindLoginClick(() => {
            const path = '/login';
            window.history.pushState({}, "", path);
            router.route(path);
        })
    }

    start() {
        this._signUpView.render();
    }

    stop() {
        this._signUpView.clear();
    }
}
