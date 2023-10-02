import { IController } from "../IController.js";
import { Router } from "../Router/Router.js";

const Errors = {
    userNameError: "Длина должна быть от 3 до 30 символов",
    passwordError: "Длина должна быть от 3 до 20 символов",
    emailError: "Невалидный email"
}

export class SignUpController {
    _userModel;
    _signUpView;

    constructor(signUpView, userModel) {
        this._userModel = userModel;
        this._signUpView = signUpView;
        this._signUpView.bindSubmitHandler(() => {
            const userData = this._signUpView.formData;
            const validateResponce = this.validateFormData(userData)
            if (validateResponce.isValid) {
                this._userModel.signup(userData).then(response => {
                    if (response.ok) {
                        const path = '/main';
                        window.history.pushState({}, "", path);
                        Router.route(path);
                    }
                });
            }
        })
        this._signUpView.bindLoginClick(() => {
            const path = '/login';
            window.history.pushState({}, "", path);
            Router.route(path);
        })
    }

    isValidEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    validateFormData(userData) {
        if (!userData.username || !userData.password || !userData.email) {
            return {
                isValid: false,
                error: "some fields are empty"
            }
        }

        if (3 < userData.username.length && userData.username.length < 30) {
            return {
                isValid: false,
                errorText: Errors.userNameError
            }
        }

        if (3 < userData.password.length && userData.password.length < 20) {
            return {
                isValid: false,
                error: Errors.passwordError
            }
        }

        if (isValidEmail(userData.email)) {
            return {
                isValid: false,
                error: Errors.emailError
            }
        }

        return {
            isValid: true,
            error: null
        }
    }

    start() {
        this._signUpView.render();
    }

    stop() {
        this._signUpView.clear();
    }
}
