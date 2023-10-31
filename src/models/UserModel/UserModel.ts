import {
    authUser,
    logoutUser,
    createUser,
    loginUser,
} from "../../modules/api.js";

type User = {
    username: string;
};

type LoginData = {
    username: string;
    password: string;
};

type SignUpData = LoginData & {
    email: string;
};

/**
 * Модель пользователя
 * Хранит сессию текущего пользователя и предоставляет интефейс для получения данных о пользователях с бекэнд
 * @class
 */
export class UserModel {
    /**
     * Текущий пользователь
     */
    _currentUser: User | null;

    /**
     * Конструктор
     * Инициализирует текущего пользователя null'ом
     */
    constructor() {
        this._currentUser = null;
    }

    /**
     * Получает ответ на запрос об аутентификации по cookies,
     * сохраняет данные пользователя в _currentUser, если операция успешна
     * @async
     */
    async auth() {
        this._currentUser = null;
        this._currentUser = await authUser();
    }

    /**
     * Получает ответ на запрос об авторизации,
     * сохраняет данные в _currentUser, если операция успешна
     * @async
     * @param {Object} login_data - данные пользователя
     */
    async login(login_data: LoginData) {
        this._currentUser = null;
        this._currentUser = await loginUser(login_data);
    }

    /**
     * Получает ответ на запрос о регистрации
     * и возвращает
     * @async
     * @param {Object} signup_data - данные пользователя
     */
    async signup(signup_data: SignUpData) {
        await createUser(signup_data);
    }

    /**
     * Получает ответ на запрос о выходе из аккаунта,
     * сохраняет null в _currentUser, если операция успешна
     * @async
     */
    async logout() {
        await logoutUser();
        this._currentUser = null;
    }
}
