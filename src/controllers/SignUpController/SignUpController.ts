import apiConfig from "../../modules/config";
import { ERROR_TYPE } from "../../modules/api";
import type { RequestError } from "../../modules/api";
import { GENERAL_MESSAGE } from "../../config";
import IController from "../IController";
import SignUpView from "../../views/SignUpView/SignUpView";
import type {
    SignUpFormData,
    ValidationError,
} from "../../views/SignUpView/SignUpView";
import UserModel from "../../models/UserModel/UserModel";

/**
 * Контроллер регистрации
 * @class
 * @extends {IController}
 */
export default class SignUpController implements IController {
    /**
     * Ссылка на модель пользователя
     */
    private userModel: UserModel;

    private signUpView: SignUpView;

    /**
     * Устанавливает модель пользователя и соответствующее представление
     * @param {SignUpView} signUpView - представление регистрации
     * @param {UserModel} userModel - модель пользователя
     */
    constructor(view: SignUpView, model: UserModel) {
        this.signUpView = view;
        this.userModel = model;
    }

    /**
     * Добавляет обработчики на все интерактивные элементы страницы
     */
    bindListeners() {
        this.signUpView.bindEmailInputHandler((event: Event) => {
            const validationResponce = this.validateEmail(
                (<HTMLInputElement>event.currentTarget).value,
            );
            this.signUpView.handleFormValidation([validationResponce]);
            this.signUpView.showErrorMessage("");
        });

        this.signUpView.bindUsernameInputHandler((event: Event) => {
            const validationResponce = this.validateUsername(
                (<HTMLInputElement>event.currentTarget).value,
            );
            this.signUpView.handleFormValidation([validationResponce]);
            this.signUpView.showErrorMessage("");
        });

        this.signUpView.bindPasswordInputHandler((event: Event) => {
            const passwordValidationPResponce = this.validatePassword(
                (<HTMLInputElement>event.currentTarget).value,
            );
            const passwordConfirm = <string>(
                this.signUpView.formData.passwordConfirm
            );
            const passwordConfirmValidationResponce =
                this.validatePasswordConfirm(
                    (<HTMLInputElement>event.currentTarget).value,
                    passwordConfirm,
                );
            this.signUpView.handleFormValidation([
                passwordValidationPResponce,
                passwordConfirmValidationResponce,
            ]);
            this.signUpView.showErrorMessage("");
        });

        this.signUpView.bindPasswordConfirmInputHandler((event: Event) => {
            const password = <string>this.signUpView.formData.password;
            const validationResponce = this.validatePasswordConfirm(
                password,
                (<HTMLInputElement>event.currentTarget).value,
            );
            this.signUpView.handleFormValidation([validationResponce]);
            this.signUpView.showErrorMessage("");
        });

        this.signUpView.bindSubmitHandler(async () => {
            const userData: SignUpFormData = this.signUpView.formData;
            const validationResponce: {
                isValid: boolean;
                errors: ValidationError[];
            } = this.validateFormData(userData);
            if (!validationResponce.isValid) {
                this.signUpView.handleFormValidation(validationResponce.errors);
                return;
            }

            try {
                await this.userModel.signup(userData);
            } catch (error) {
                let msg;
                switch ((<RequestError>error).type) {
                    case ERROR_TYPE.FAILURE:
                        msg =
                            apiConfig.api.signup.failure[
                                (<RequestError>error).status
                            ];
                        break;
                    case ERROR_TYPE.NETWORK_ERROR:
                        msg = GENERAL_MESSAGE.NETWORK_ERROR;
                        break;
                    case ERROR_TYPE.UNEXPECTED:
                        msg = GENERAL_MESSAGE.UNEXPECTED;
                        break;
                }
                this.signUpView.showErrorMessage(msg);
                return;
            }

            try {
                await this.userModel.login(userData);
            } catch (e) {
                return;
            }
            router.redirect("/");
        });

        this.signUpView.bindLoginClick(() => {
            router.redirect("/login");
        });

        this.signUpView.bindCloseClick(() => {
            router.redirect("/");
        });
    }

    /**
     * Функция валидации данных пользователя при регистрации
     * @param {Object} userData - данные формы
     * @param {string} userData.username - имя пользователя
     * @param {string} userData.email - email пользователя
     * @param {string} userData.password - пароль пользователя
     * @param {string} userData.passwordConfirm - подтверждение пароля пользователя
     * @returns {Object} - результат валидации
     */
    validateFormData(userData: SignUpFormData) {
        const validationResponce: {
            isValid: boolean;
            errors: ValidationError[];
        } = {
            isValid: true,
            errors: [],
        };

        const emailValidation = this.validateEmail(userData.email);
        if (!emailValidation.isValid) {
            validationResponce.isValid = false;
        }
        validationResponce.errors.push(emailValidation);

        const usernameValidation = this.validateUsername(userData.username);
        if (!usernameValidation.isValid) {
            validationResponce.isValid = false;
        }
        validationResponce.errors.push(usernameValidation);

        const passwordValidation = this.validatePassword(userData.password);
        if (!passwordValidation.isValid) {
            validationResponce.isValid = false;
        }
        validationResponce.errors.push(passwordValidation);

        const passwordConfirmValidation = this.validatePasswordConfirm(
            userData.password,
            userData.passwordConfirm,
        );
        if (!passwordConfirmValidation.isValid) {
            validationResponce.isValid = false;
        }
        validationResponce.errors.push(passwordConfirmValidation);

        return validationResponce;
    }

    /**
     * Валидация email
     * @param {string} email - email пользователя
     * @returns {Object} - результат валидации, валидируемое поле и сообщение об ошибке
     */
    validateEmail(email: string) {
        if (!email) {
            return {
                isValid: false,
                field: "email",
                message: "Email не может быть пустым",
            };
        }

        if (!String(email).match(/^[\x00-\x7F]*@[\x00-\x7F]*$/)) {
            return {
                isValid: false,
                field: "email",
                message: "Невалидный email",
            };
        }

        return {
            isValid: true,
            field: "email",
            message: "",
        };
    }

    /**
     * Валидация имени пользователя
     * @param {string} username - имя пользователя
     * @returns {Object} - результат валидации, валидируемое поле и сообщение об ошибке
     */
    validateUsername(username: string) {
        if (!username) {
            return {
                isValid: false,
                field: "username",
                message: "Имя пользователя не может быть пустым",
            };
        }

        if (!String(username).match(/^[a-zA-Z0-9_-]*$/)) {
            return {
                isValid: false,
                field: "username",
                message:
                    'Имя пользователя должно состоять из латинских букв, цифр, символов "-", "_"',
            };
        }

        if (!String(username).match(/^.{3,30}$/)) {
            return {
                isValid: false,
                field: "username",
                message:
                    "Имя пользователя должно иметь длину от 3 до 30 символов",
            };
        }

        return {
            isValid: true,
            field: "username",
            message: "",
        };
    }

    /**
     * Валидация пароля пользователя
     * @param {string} password - пароль
     * @returns {Object} - результат валидации, валидируемое поле и сообщение об ошибке
     */
    validatePassword(password: string) {
        if (!password) {
            return {
                isValid: false,
                field: "password",
                message: "Пароль не может быть пустым",
            };
        }

        if (!String(password).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            return {
                isValid: false,
                field: "password",
                message:
                    "Пароль должен быть длиннее 8 символов и содержать хотя бы одну букву и цифру",
            };
        }

        return {
            isValid: true,
            field: "password",
            message: "",
        };
    }

    /**
     * Валидация подтверждения пароля
     * @param {string} password - пароль
     * @param {string} passwordConfirm - подтверждение пароля
     * @returns {Object} - результат валидации, валидируемое поле и сообщение об ошибке
     */
    validatePasswordConfirm(password: string, passwordConfirm: string) {
        if (!passwordConfirm) {
            return {
                isValid: false,
                field: "passwordconfirm",
                message: "Подтвердите пароль",
            };
        }

        if (password !== passwordConfirm) {
            return {
                isValid: false,
                field: "passwordconfirm",
                message: "Пароли не совпадают",
            };
        }

        return {
            isValid: true,
            field: "passwordconfirm",
            message: "",
        };
    }

    /**
     * Отрисовка страницы регистрации
     */
    start() {
        this.signUpView.setDefaultState();
        this.bindListeners();
        this.signUpView.render();
    }

    /**
     * Очистка страницы регистрации
     */
    stop() {
        this.signUpView.clearState();
        this.signUpView.clear();
    }
}
