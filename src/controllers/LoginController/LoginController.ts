import { config } from "../../config";
import { ERROR_TYPE } from "../../config";
import { GENERAL_MESSAGE } from "../../config";
import { LoginView } from "../../views/LoginView/LoginView";
import { LoginData, UserModel } from "../../models/UserModel/UserModel";
import { IController } from "../IController";

type Error = {
    type: ERROR_TYPE;
    status: string;
};

/**
 * Контроллер авторизации
 * @class
 * @extends {IController}
 */
export class LoginController extends IController {
    /**
     * Ссылка на модель пользователя
     */
    _userModel: UserModel;

    /**
     * Ссылка на представление регистрации
     */
    loginView: LoginView;

    /**
     * Устанавливает модель пользователя и соответствующее представление
     * @param {LoginView} loginView - представление авторизации
     * @param {UserModel} userModel - модель пользователя
     */
    constructor(view: LoginView, userModel: UserModel) {
        super();
        this.loginView = view;
        this._userModel = userModel;
    }

    /**
     * Добавляет обработчики на все интерактивные элементы страницы
     */
    bindListeners() {
        this.loginView.bindSubmitHandler(async () => {
            const loginData: LoginData = this.loginView.formData;

            const validationMsg = this.validateLoginData(loginData);
            if (validationMsg) {
                this.loginView.showErrorMessage(validationMsg);
                return;
            }

            try {
                await this._userModel.login(loginData);
            } catch (error) {
                let msg;
                switch ((<Error>error).type) {
                    case ERROR_TYPE.FAILURE:
                        msg = config.api.login.failure[(<Error>error).status];
                        break;
                    case ERROR_TYPE.NETWORK_ERROR:
                        msg = GENERAL_MESSAGE.NETWORK_ERROR;
                        break;
                    case ERROR_TYPE.UNEXPECTED:
                        msg = GENERAL_MESSAGE.UNEXPECTED;
                        break;
                }
                this.loginView.showErrorMessage(msg);
                return;
            }
            router.redirect("/");
        });

        this.loginView.bindSignUpClick(() => {
            router.redirect("/signup");
        });

        this.loginView.bindCloseClick(() => {
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
    validateLoginData(loginData: LoginData) {
        if (!loginData.username && !loginData.password)
            return "Укажите логин и пароль";
        if (!loginData.username) return "Укажите имя пользователя";
        if (!loginData.password) return "Укажите пароль";

        return "";
    }

    /**
     * Отрисовка страницы регистрации
     */
    start() {
        this.loginView.setDefaultState();
        this.bindListeners();
        this.loginView.render();
    }

    /**
     * Очистка страницы регистрации
     */
    stop() {
        this.loginView.clearState();
        this.loginView.clear();
    }
}
