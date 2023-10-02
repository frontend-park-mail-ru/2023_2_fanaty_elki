import { IController } from "../IController.js";
import { Router } from "../Router/Router.js";

export class SignUpController {
    _userModel;
    _signUpView;

    constructor(signUpView, userModel) {
        this._userModel = userModel;
        this._signUpView = signUpView;
        this._signUpView.bindSubmitHandler(this.submitForm.bind(this));
        this._signUpView.bindLoginClick(() => {
            router.redirect('/login');
        });
    }

    submitForm() {
        const data = this._signUpView.formData;
        this._userModel.signup(data).then(() => {
            router.redirect('/login')
        }).catch(() => { });
    }

    start() {
        this._signUpView.render();
    }

    stop() {
        this._signUpView.clear();
    }
}
