import { IController } from "../IController.js";

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
        this.view.bindSubmitHandler(() => {
            const loginData = this.view.formData;

            const validationMsg = this.validateLoginData(loginData);
            if (validationMsg !== null) {
                this.view.showErrorMessage(validationMsg);
                return;
            }

            this._userModel.login(loginData).then(() => {
                router.redirect('/')
            }).catch(() => { //TODO: Добавить вывод ошибки с сервера
                this.view.showErrorMessage("Неверный логин или пароль");
            })
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
     */
    validateLoginData(loginData) {
        if (!loginData.username && !loginData.password) return "Укажите логин и пароль";
        if (!loginData.username) return "Укажите имя пользователя";
        if (!loginData.password) return "Укажите пароль";

        return null;
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
