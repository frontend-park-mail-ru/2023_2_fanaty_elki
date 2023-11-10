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
    private errorMsg: string | null;

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
     * Получение сообщения об ошибке
     */
    getErrorMsg(): string | null {
        return this.errorMsg;
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
        try {
            this.user = await Api.loginUser({
                username,
                password,
            });
            this.errorMsg = null;
        } catch (e) {
            this.errorMsg = (e as Error).message;
        }
        this.notifyObservers();
    }

    /**
     * Завершение сессии
     * @async
     */
    async logout() {
        try {
            await Api.logoutUser();
            this.user = null;
            this.errorMsg = null;
        } catch (e) {
            this.errorMsg = (e as Error).message;
        }
        this.notifyObservers;
    }
}
