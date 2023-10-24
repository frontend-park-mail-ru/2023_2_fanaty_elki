import { IController } from "../IController.js";

/**
 * Контроллер регистрации
 * @class
 * @extends {IController}
 */
export class SignUpController extends IController {
    /**
     * Ссылка на модель пользователя
     */
    _userModel;

    /**
     * Устанавливает модель пользователя и соответствующее представление
     * @param {SignUpView} signUpView - представление регистрации
     * @param {UserModel} userModel - модель пользователя
     */
    constructor(signUpView, userModel) {
        super(signUpView);
        this._userModel = userModel;
    }

    /**
     * Добавляет обработчики на все интерактивные элементы страницы
     */
    bindListeners() {
        this.view.bindEmailInputHandler((event) => {
            const validationResponce = this.validateEmail(event.currentTarget.value);
            this.view.handleFormValidation([validationResponce]);
            this.view.showErrorMessage("");
        });

        this.view.bindUsernameInputHandler((event) => {
            const validationResponce = this.validateUsername(event.currentTarget.value);
            this.view.handleFormValidation([validationResponce]);
            this.view.showErrorMessage("");
        });

        this.view.bindPasswordInputHandler((event) => {
            const validationResponce = this.validatePassword(event.currentTarget.value);
            this.view.handleFormValidation([validationResponce]);
            this.view.showErrorMessage("");
        });

        this.view.bindPasswordConfirmInputHandler((event) => {
            const password = this.view.formData.password;
            const validationResponce = this.validatePasswordConfirm(password, event.currentTarget.value);
            this.view.handleFormValidation([validationResponce]);
            this.view.showErrorMessage("");
        });

        this.view.bindSubmitHandler(() => {
            const userData = this.view.formData;
            const validationResponce = this.validateFormData(userData)
            if (!validationResponce.isValid) {
                this.view.handleFormValidation(validationResponce.errors);
                return;
            }

            this._userModel.signup({
                email: userData.email,
                username: userData.username,
                password: userData.password
            })
                .then(() => {
                    return this._userModel.login({
                        username: userData.username,
                        password: userData.password
                    })
                })
                .then(() => {
                    router.redirect('/')
                })
                .catch(() => {
                    this.view.showErrorMessage("Такой пользователь уже существует");
                })
        });

        this.view.bindLoginClick(() => {
            router.redirect('/login');
        });

        this.view.bindCloseClick(() => {
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
    validateFormData(userData) {
        let validationResponce = {
            isValid: true,
            errors: []
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

        const passwordConfirmValidation = this.validatePasswordConfirm(userData.password, userData.passwordConfirm);
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
    validateEmail(email) {
        if (!email) {
            return {
                isValid: false,
                field: "email",
                message: "Email не может быть пустым"
            }
        }

        if (!String(email).match(/^\w*@\w*$/)) {
            return {
                isValid: false,
                field: "email",
                message: "Невалидный email"
            }
        }

        return {
            isValid: true,
            field: "email",
            message: null
        }
    }

    /**
     * Валидация имени пользователя
     * @param {string} username - имя пользователя 
     * @returns {Object} - результат валидации, валидируемое поле и сообщение об ошибке
     */
    validateUsername(username) {
        if (!username) {
            return {
                isValid: false,
                field: "username",
                message: "Имя пользователя не может быть пустым"
            }
        }

        if (!String(username).match(/^[a-zA-Z0-9_-]*$/)) {
            return {
                isValid: false,
                field: "username",
                message: "Имя пользователя должно состоять из латинских букв, цифр, символов \"-\", \"_\""
            }
        }

        if (!String(username).match(/^.{3,30}$/)) {
            return {
                isValid: false,
                field: "username",
                message: "Имя пользователя должно иметь длину от 3 до 30 символов"
            }
        }

        return {
            isValid: true,
            field: "username",
            message: null
        }
    }

    /**
     * Валидация пароля пользователя
     * @param {string} password - пароль
     * @returns {Object} - результат валидации, валидируемое поле и сообщение об ошибке
     */
    validatePassword(password) {
        if (!password) {
            return {
                isValid: false,
                field: "password",
                message: "Пароль не может быть пустым"
            }
        }

        if (!String(password).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            return {
                isValid: false,
                field: "password",
                message: "Пароль должен быть длиннее 8 символов и содержать хотя бы одну букву и цифру"
            }
        }

        return {
            isValid: true,
            field: "password",
            message: null
        }
    }

    /**
     * Валидация подтверждения пароля
     * @param {string} password - пароль
     * @param {string} passwordConfirm - подтверждение пароля 
     * @returns {Object} - результат валидации, валидируемое поле и сообщение об ошибке
     */
    validatePasswordConfirm(password, passwordConfirm) {
        if (!passwordConfirm) {
            return {
                isValid: false,
                field: "passwordconfirm",
                message: "Подтвердите пароль"
            }
        }

        if (password !== passwordConfirm) {
            return {
                isValid: false,
                field: "passwordconfirm",
                message: "Пароли не совпадают"
            }
        }

        return {
            isValid: true,
            field: "passwordconfirm",
            message: null
        }
    }

    /**
     * Отрисовка страницы регистрации
     */
    start() {
        this.view.setDefaultState();
        this.bindListeners();
        this.view.render();
    }

    /**
     * Очистка страницы регистрации
     */
    stop() {
        this.view.clearState();
        this.view.clear();
    }
}
