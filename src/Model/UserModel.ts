import { apiConfig } from "../modules/api";
import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export type User = {
    Username: string;
    Birthday: string;
    PhoneNumber: string;
    Email: string;
    Password: string;
    Icon: string;
};

export const enum UserEvent {
    USER_LOGIN = "USER_LOGIN",
    USER_REG = "USER_REG",
    USER_LOGOUT = "USER_LOGOUT",
    USER_UPDATE = "USER_UPDATE",
    AUTH = "AUTH",
    ADDRESS_CHANGE = "ADDRESS_CHANGE",
}

export type Address = {
    City: string;
    Street: string;
    House: string;
    Flat: number;
};

/**
 * Модель пользователя
 * @class
 */
export class UserModel implements Listenable<UserEvent> {
    /**
     * Пользователь
     */
    private user: User | null;
    private address: string;
    private errorMsg: string | null;

    private events_: EventDispatcher<UserEvent>;
    get events(): EventDispatcher<UserEvent> {
        return this.events_;
    }

    /**
     * Конструктор
     */
    constructor() {
        this.events_ = new EventDispatcher<UserEvent>();
        this.user = null;
        this.address = "";
    }

    usersDiff(newUserData: { [index: string]: string }, oldUser: User | null) {
        const userDiff = {};
        if (oldUser) {
            for (const [key, value] of Object.entries(oldUser)) {
                if (newUserData[key] && newUserData[key] !== value) {
                    userDiff[key] = newUserData[key];
                }
            }
        }

        return userDiff;
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
        try {
            this.user = await Api.authUser();
            this.user!.Birthday =
                this.user?.Birthday.slice(0, 10) || this.user!.Birthday;
            this.errorMsg = null;
            this.events.notify(UserEvent.AUTH);
            this.events.notify(UserEvent.USER_LOGIN);
        } catch (e) {
            this.events.notify(UserEvent.AUTH);
            console.error("Неудачная авторизация");
            console.error(e);
        }
    }

    async createUser(user: User) {
        try {
            await Api.createUser(user);
            this.errorMsg = null;
        } catch (e: any) {
            this.errorMsg = apiConfig.api.signup.failure[e.status];
            this.events.notify(UserEvent.USER_REG); // Грязный хак
            throw e;
        }
        this.events.notify(UserEvent.USER_REG);
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
            this.user!.Birthday =
                this.user?.Birthday.slice(0, 10) || this.user!.Birthday;
            this.errorMsg = null;
        } catch (e: any) {
            this.errorMsg = apiConfig.api.login.failure[e.status];
        }
        this.events.notify(UserEvent.USER_LOGIN);
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
        } catch (e: any) {
            this.errorMsg = apiConfig.api.logout.failure[e.status];
            console.error("Неудачный логаут");
            console.error(e);
        }
        this.events.notify(UserEvent.USER_LOGOUT);
    }

    /**
     * Обновление данных пользователя
     * @async
     */
    async updateUser(newUserData: { [index: string]: string }) {
        const userFields = this.usersDiff(newUserData, this.user);
        try {
            await Api.updateUser(userFields);
            this.user = await Api.authUser();
            this.user!.Birthday =
                this.user?.Birthday.slice(0, 10) || this.user!.Birthday;
            this.errorMsg = null;
        } catch (e: any) {
            this.errorMsg = apiConfig.api.updateUser.failure[e.status];
            console.error("Неудачное обновление пользователя");
            console.error(e);
        }
        this.events.notify(UserEvent.USER_UPDATE);
    }

    setAddress(address: string) {
        this.address = address;
        this.events.notify(UserEvent.ADDRESS_CHANGE);
    }

    getAddress() {
        return this.address;
    }
}
