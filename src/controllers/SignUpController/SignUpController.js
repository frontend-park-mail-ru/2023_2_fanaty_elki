import { IController } from "../IController.js";
import { Router } from "../Router/Router.js";

export class SignUpController {
    _userModel;
    _signUpView;

    constructor(signUpView, userModel) {
        this._userModel = userModel;
        this._signUpView = signUpView;
    }

    bindListeners() {
        this._signUpView.bindSubmitHandler(() => {
            const userData = this._signUpView.formData;
            const validationResponce = this.validateFormData(userData)
            if (!validationResponce.isValid) {
                this._signUpView.handleFormValidation(validationResponce.errors);
                return;
            }

            this._userModel.signup({
                email: userData.email,
                username: userData.username,
                password: userData.password
            })
                .then(() => {
                    router.redirect('/login');
                })
                .catch(() => {

                })
        })

        this._signUpView.bindLoginClick(() => {
            router.redirect('/login');
        });
    }

    validateFormData(userData) {
        let validationResponce = {
            isValid: true,
            errors: []
        }

        const emailValidation = this.validateEmail(userData.email)
        if (!emailValidation.isValid) {
            validationResponce.isValid = false;
            validationResponce.errors.push({
                field: "email",
                message: emailValidation.message
            })
        }

        const usernameValidation = this.validateUsername(userData.username)
        if (!usernameValidation.isValid) {
            validationResponce.isValid = false;
            validationResponce.errors.push({
                field: "username",
                message: usernameValidation.message
            })
        }

        const passwordValidation = this.validatePassword(userData.password, userData.passwordConfirm)
        if (!passwordValidation.isValid) {
            validationResponce.isValid = false;
            validationResponce.errors.push({
                field: "password",
                message: passwordValidation.message
            });
            validationResponce.errors.push({
                field: "passwordconfirm",
                message: ""
            });
        }

        return validationResponce;
    }

    validateEmail(email) {
        if (!email) {
            return {
                isValid: false,
                message: "Email не может быть пустым"
            }
        }

        const emailMatches = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!emailMatches) {
            return {
                isValid: false,
                message: "Невалидный email"
            }
        }

        return {
            isValid: true,
            message: null
        }
    }

    validateUsername(username) {
        if (!username) {
            return {
                isValid: false,
                message: "Имя пользователя не может быть пустым"
            }
        }

        if (!(3 <= String(username).length && String(username).length <= 30)) {
            return {
                isValid: false,
                message: "Длина должна быть от 3 до 30 символов"
            }
        }

        return {
            isValid: true,
            message: null
        }
    }

    validatePassword(password, passwordConfirm) {
        if (!password) {
            return {
                isValid: false,
                message: "Пароль не может быть пустым"
            }
        }

        if (!(3 <= String(password).length && String(password).length <= 20)) {
            return {
                isValid: false,
                message: "Длина должна быть от 3 до 20 символов"
            }
        }

        if (password !== passwordConfirm) {
            return {
                isValid: false,
                message: "Пароли не совпадают"
            }
        }

        return {
            isValid: true,
            message: null
        }
    }

    start() {
        this._signUpView.setDefaultState();
        this.bindListeners();
        this._signUpView.render();
    }

    stop() {
        this._signUpView.clearState();
        this._signUpView.clear();
    }
}
