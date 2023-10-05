import { request, get, post } from "/modules/ajax.js";
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
     * Отправляет на сервер запрос об авторизации,
     * сохраняет данные в _currentUser, если операция успешна
     * @async
     * @param {Object} login_data - данные пользователя
     * @return {Promise} - разрешенный или отклоненный промис,
     * в зависимости от ответа сервера 
     */
    async login(login_data) {
        const body = JSON.stringify(login_data);
        const response = await fetch(backendURL + '/login', {
            method: POST,
            body: body,
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            this._currentUser = data.Body;
            return Promise.resolve();
        }
        return Promise.reject();
    }

    /**
     * Отправляет на сервер запрос о регистрации
     * @async
     * @param {Object} signup_data - данные пользователя
     * @return {Promise} - разрешенный или отклоненный промис,
     * в зависимости от ответа сервера 
     */
    async signup(signup_data) {
        const body = JSON.stringify(signup_data);
        const response = await fetch(backendURL + '/users', {
            method: POST,
            body: body,
        });
        if (response.ok) return Promise.resolve();
        return Promise.reject();
    }

    /**
     * Отправляет на сервер запрос об аутентификации по cookies,
     * сохраняет данные пользователя в _currentUser, если операция успешна
     * @async
     * @return {Promise} - разрешенный или отклоненный промис,
     * в зависимости от ответа сервера 
     */
    async auth() {
        const response = await fetch(backendURL + '/auth', {
            method: GET,
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            this._currentUser = data.Body;
            return Promise.resolve();
        }
        return Promise.reject();
    }


    /**
     * Отправляет на сервер запрос о выходе из аккаунта,
     * сохраняет null в _currentUser, если операция успешна
     * @async
     * @return {Promise} - разрешенный или отклоненный промис,
     * в зависимости от ответа сервера 
     */
    async logout() {
        const response = await fetch(backendURL + '/logout', {
            method: POST,
            credentials: 'include'
        });
        if (response.ok) {
            this._currentUser = null;
            return Promise.resolve();
        }
        return Promise.reject();
    }
}
