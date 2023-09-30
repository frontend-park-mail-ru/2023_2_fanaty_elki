import { UserModel } from "../../models/UserModel/UserModel";
import { SignUpView } from "../../views/SignUpView/SignUpView";

export class SignUpController {
    _userModel;
    _signUpView;

    constructor() {
        this._userModel = new UserModel();
        this._signUpView = new SignUpView();
    }

    start() {
        document.querySelector('.regform-form').addEventListener('onsubmit', this.onSubmit);
        this._signUpView.render();
    }

    onSubmit(event) {
        event.preventDefault();

        let form = document.querySelector('.regform-form');
        let user = {
            username: form.username,
            password: form.password,
            email: form.email
        }

        this._userModel.createUser(user);
    }
}