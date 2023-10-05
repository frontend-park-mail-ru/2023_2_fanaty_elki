/**
 * Контроллер авторизации
 * @class
 */
export class LoginController {
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
     * @param {LoginView} signUpView - представление авторизации
     * @param {UserModel} userModel - модель пользователя
     */
    constructor(loginView, userModel) {
        this._userModel = userModel;
        this._loginView = loginView;
    }

    /**
     * Добавляет обработчики на все интерактивные элементы страницы
     */
    bindListeners() {
        this._loginView.bindSubmitHandler(() => {
            const data = this._loginView.formData;
            this._userModel.login(data).then(() => {
                router.redirect('/')
            }).catch(() => {
                this._loginView.showErrorMessage();
            })
        });

        this._loginView.bindSignUpClick(() => {
            router.redirect('/signup');
        });

        this._loginView.bindCloseClick(() => {
            router.redirect("/");
        });
    }

    /**
     * Отрисовка страницы регистрации
     */
    start() {
        this._loginView.setDefaultState();
        this.bindListeners();
        this._loginView.render();
    }

    /**
     * Очистка страницы регистрации
     */
    stop() {
        this._loginView.clearState();
        this._loginView.clear();
    }
}
