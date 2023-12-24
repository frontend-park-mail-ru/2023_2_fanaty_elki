import { apiConfig } from "../modules/api";
import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export type User = {
    Username: string;
    Birthday: string;
    PhoneNumber: string;
    Addresses: (Address & { Id: number })[];
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
    USER_ICON_UPDATE = "USER_ICON_UPDATE",
    OFFLINE = "OFFLINE",
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
    private address: number;
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
        this.address = 0;
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
            const user = await Api.authUser();
            this.user = user;
            this.address = +user.CurrentAddressId;
            this.user!.Birthday =
                this.user?.Birthday.slice(0, 10) || this.user!.Birthday;
            this.errorMsg = null;
            this.events.notify(UserEvent.AUTH);
            this.events.notify(UserEvent.USER_LOGIN);
            this.events.notify(UserEvent.ADDRESS_CHANGE);
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
            if (!model.appModel.isOnline()) {
                this.events.notify(UserEvent.OFFLINE);
                throw e;
            }
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
            const user = await Api.loginUser({
                username,
                password,
            });
            this.user = user;
            this.address = +user.CurrentAddressId;
            this.user!.Birthday =
                this.user?.Birthday.slice(0, 10) || this.user!.Birthday;
            this.errorMsg = null;
            this.events.notify(UserEvent.ADDRESS_CHANGE);
        } catch (e: any) {
            if (!model.appModel.isOnline()) {
                this.events.notify(UserEvent.OFFLINE);
                throw e;
            }
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
            if (!model.appModel.isOnline()) {
                this.events.notify(UserEvent.OFFLINE);
                throw e;
            }
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
            if (!model.appModel.isOnline()) {
                this.events.notify(UserEvent.OFFLINE);
                throw e;
            }
            this.errorMsg = apiConfig.api.updateUser.failure[e.status];
            console.error("Неудачное обновление пользователя");
            console.error(e);
        }
        this.events.notify(UserEvent.USER_UPDATE);
    }

    async updateUserIcon(icon: File) {
        try {
            await Api.updateUserIcon(icon);
            this.user = await Api.authUser();
            this.user!.Birthday =
                this.user?.Birthday.slice(0, 10) || this.user!.Birthday;
            this.errorMsg = null;
        } catch (e: any) {
            if (!model.appModel.isOnline()) {
                this.events.notify(UserEvent.OFFLINE);
                throw e;
            }
            this.errorMsg = apiConfig.api.updateUser.failure[e.status];
            console.error("Неудачное обновление фотографии пользователя");
            console.error(e);
        }
        this.events.notify(UserEvent.USER_ICON_UPDATE);
    }

    async addAddress(address: Address) {
        try {
            await Api.addAddress(address);
        } catch (e: any) {
            if (e.status === 496) {
                const Address = this.user?.Addresses.find(
                    (addr) =>
                        addr.City === address.City &&
                        addr.Flat === address.Flat &&
                        addr.House === address.House &&
                        addr.Street === address.Street,
                );
                if (Address) {
                    this.patchAddress(Address.Id);
                }
                return;
            }
            console.error("Неудачное добавление адреса");
            console.error(e);
        }
    }

    async patchAddress(addressId: number) {
        try {
            await Api.updateAddress(addressId);
            this.address = +addressId;
            this.events.notify(UserEvent.ADDRESS_CHANGE);
        } catch (e: any) {
            console.error("Неудачное обновление адреса");
            console.error(e);
        }
    }

    async updateAddress() {
        try {
            const user = await Api.getUserInfo();
            this.user!.Addresses = user.Addresses;
            this.address = user.CurrentAddressId;
            this.events.notify(UserEvent.ADDRESS_CHANGE);
        } catch (e: any) {
            console.error("Неудачное обновление адреса");
            console.error(e);
        }
    }

    getAddress() {
        return this.address;
    }

    getAddressText() {
        if (!this.user) {
            return null;
        }
        if (!this.user.Addresses) {
            return null;
        }
        console.log(this.user.Addresses);
        const current = this.user.Addresses.find(
            (address) => address.Id === this.address,
        );
        if (!current) {
            return null;
        }
        return current.City + ", " + current.Street + ", " + current.House;
    }

    getAddresses() {
        return this.user?.Addresses;
    }
}
