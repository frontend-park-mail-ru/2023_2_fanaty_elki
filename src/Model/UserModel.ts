import { Api } from "../modules/api";
import { IObservable } from "../modules/observer";

export type User = {
    Username: string;
    Birthday: string;
    PhoneNumber: string;
    Email: string;
    Password: string;
    Icon: string;
};

/**
 * Модель пользователя
 * @class
 */
export class UserModel extends IObservable {
    /**
     * Пользователь
     */
    private user: User | null;

    /**
     * Конструктор
     */
    constructor() {
        super();
        this.user = null;
    }

    /**
     * Получение пользователя
     * @returns {User} - пользователь
     */
    getUser(): User | null {
        return this.user;
    }

    /**
     * Авторизация по cookie
     * @async
     */
    async auth() {
        this.user = await Api.authUser();
        this.notifyObservers();
    }

    /**
     * Авторизация по имени пользователя и паролю
     * @async
     * @param username - имя пользователя
     * @param password - пароль
     */
    async login(username: string, password: string) {
        this.user = await Api.loginUser({
            username,
            password,
        });
        this.notifyObservers();
    }

    /**
     * Завершение сессии
     * @async
     */
    async logout() {
        await Api.logoutUser();
        this.user = null;
        this.notifyObservers;
    }
}
