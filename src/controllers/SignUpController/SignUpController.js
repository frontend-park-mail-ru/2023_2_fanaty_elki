/**
 * Контроллер регистрации
 * @class
 */
export class SignUpController {
    /**
     * Ссылка на модель пользователя
     */
    _userModel;

    /**
     * Ссылка на представление регистрации
     */
    _signUpView;

    /**
     * Устанавливает модель пользователя и соответствующее представление
     * @param {SignUpView} signUpView - представление регистрации
     * @param {UserModel} userModel - модель пользователя
     */
    constructor(signUpView, userModel) {
        this._userModel = userModel;
        this._signUpView = signUpView;
    }

    /**
     * Добавляет обработчики на все интерактивные элементы страницы
     */
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
                    return this._userModel.login({
                        username: userData.username,
                        password: userData.password
                    })
                })
                .then(() => {
                    router.redirect('/')
                })
                .catch(() => {
                    this._signUpView.showErrorMessage();
                })
        });

        this._signUpView.bindLoginClick(() => {
            router.redirect('/login');
        });

        this._signUpView.bindCloseClick(() => {
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

    /**
     * Валидация email
     * @param {string} email - email пользователя 
     * @returns {Object} - результат валидации и сообщение об ошибке
     */
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

    /**
     * Валидация имени пользователя
     * @param {string} username - имя пользователя 
     * @returns {Object} - результат валидации и сообщение об ошибке
     */
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

    /**
     * Валидация пароля пользователя
     * @param {string} password - пароль
     * @param {string} passwordConfirm - подтверждение пароля 
     * @returns {Object} - результат валидации и сообщение об ошибке
     */
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

    /**
     * Отрисовка страницы регистрации
     */
    start() {
        this._signUpView.setDefaultState();
        this.bindListeners();
        this._signUpView.render();
    }

    /**
     * Очистка страницы регистрации
     */
    stop() {
        this._signUpView.clearState();
        this._signUpView.clear();
    }
}
