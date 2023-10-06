import { authUser, logoutUser, createUser, loginUser } from "/modules/api.js"

/**
 * Модель пользователя
 * Хранит сессию текущего пользователя и предоставляет интефейс для получения данных о пользователях с бекэнд
 * @class
 */
export class UserModel {
    /**
     * Текущий пользователь
     */
    _currentUser;

    /**
     * Конструктор
     * Инициализирует текущего пользователя null'ом
     */
    constructor() {
        this._currentUser = null;
    }

    /**
     * Получает ответ на запрос об авторизации,
     * сохраняет данные в _currentUser, если операция успешна
     * @async
     * @param {Object} login_data - данные пользователя
     */
    async login(login_data) {
        await loginUser(login_data).then(data =>{
            this._currentUser = data;
        }).catch(err => {})
    }

    /**
     * Получает ответ на запрос о регистрации
     * и возвращает
     * @async
     * @param {Object} signup_data - данные пользователя
     */
    async signup(signup_data) {
        return createUser(signup_data);
    }

    /**
     * Получает ответ на запрос об аутентификации по cookies,
     * сохраняет данные пользователя в _currentUser, если операция успешна
     * @async
     */
    async auth() {
        await authUser().then(data =>{
            this._currentUser = data;
        }).catch(err => {})
    }

    /**
     * Получает ответ на запрос о выходе из аккаунта,
     * сохраняет null в _currentUser, если операция успешна
     * @async
     */
    async logout() {
        await logoutUser().then(data => {
            this._currentUser = null;
        }).catch(err => {})
    }
}
