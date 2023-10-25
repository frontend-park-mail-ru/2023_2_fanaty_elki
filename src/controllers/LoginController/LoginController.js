import { IController } from "../IController.js";
import { config } from "/config.js"

/**
 * Контроллер авторизации
 * @class
 * @extends {IController}
 */
export class LoginController extends IController {
    /**
     * Ссылка на модель пользователя
     */
    _userModel;

    /**
     * Ссылка на представление регистрации
     */
    _loginView;

    /**
     * Устанавливает модель пользователя и соответствующее представление
     * @param {LoginView} loginView - представление авторизации
     * @param {UserModel} userModel - модель пользователя
     */
    constructor(loginView, userModel) {
        super(loginView);
        this._userModel = userModel;
    }

    /**
     * Добавляет обработчики на все интерактивные элементы страницы
     */
    bindListeners() {
        this.view.bindSubmitHandler(async () => {
            const loginData = this.view.formData;

            const validationMsg = this.validateLoginData(loginData);
            if (!validationMsg) {
                this.view.showErrorMessage(validationMsg);
                return;
            }

            try {
                await this._userModel.login(loginData);
            } catch(e) {
                let msg;
                switch (error.type) {
                    case config.ERROR_TYPE.FAILURE:
                        msg = config.api.login.failure[error.status];
                        break;
                    case config.ERROR_TYPE.NETWORK_ERROR:
                        msg = config.GENERAL_MESSAGE.NETWORK_ERROR;
                        break;
                    case config.ERROR_TYPE.UNEXPECTED:
                        msg = config.GENERAL_MESSAGE.UNEXPECTED_ERROR;
                        break;
                }
                this.view.showErrorMessage(msg);
                return;
            }
            router.redirect('/')
        });

        this.view.bindSignUpClick(() => {
            router.redirect('/signup');
        });

        this.view.bindCloseClick(() => {
            router.redirect("/");
        });
    }

    /**
     * Проверка данных формы
     * @param {Object} loginData - данные формы 
     * @param {String} loginData.username - имя пользователя
     * @param {String} loginData.password - пароль
     * @returns {(String)}
     */
    validateLoginData(loginData) {
        if (!loginData.username && !loginData.password) return "Укажите логин и пароль";
        if (!loginData.username) return "Укажите имя пользователя";
        if (!loginData.password) return "Укажите пароль";

        return "";
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
