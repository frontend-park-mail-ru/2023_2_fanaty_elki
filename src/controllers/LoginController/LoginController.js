import { IController } from "../IController.js";
import { Router } from "../Router/Router.js";

export class LoginController {
    _userModel;
    _loginView;

    constructor(loginView, userModel) {
        this._userModel = userModel;
        this._loginView = loginView;
    }

    bindListeners() {
        this._loginView.bindSubmitHandler(this.submitForm.bind(this));
        this._loginView.bindSignUpClick(() => {
            router.redirect('/signup');
        });
    }

    submitForm() {
        const data = this._loginView.formData;
        this._userModel.login(data).then(() => {
            router.redirect('/')
        }).catch(() => { 
            this._loginView.showErrorMessage();
        })
    }

    start() {
        this._loginView.setDefaultState();
        this.bindListeners();
        this._loginView.render();
    }

    stop() {
        this._loginView.clearState();
        this._loginView.clear();
    }
}
