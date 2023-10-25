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
        this.view.bindSubmitHandler(async () => {
            try {
                await this._userModel.login(this.view.formData);
            } catch(e) {
                this.view.showErrorMessage(e);
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
