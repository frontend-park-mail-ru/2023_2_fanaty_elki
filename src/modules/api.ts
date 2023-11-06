import apiConfig from "./config";

enum ERROR_TYPE {
    FAILURE,
    NETWORK_ERROR,
    UNEXPECTED,
}

type ApiElementConfig = {
    url: string;
    params: (body: string) => { [index: string]: string };
    success: { [index: number]: string };
    failure: { [index: number]: string };
    restrictions: { [index: string]: string };
};

type ApiConfig = {
    backend: string;
    api: { [index: string]: ApiElementConfig };
};

type LoginData = {
    username: string;
    password: string;
};

type SignUpData = LoginData & {
    email: string;
};
class RequestError {
    type: ERROR_TYPE;
    status: number;

    constructor(type_: ERROR_TYPE, status_: number = -1) {
        this.type = type_;
        this.status = status_;
    }
}

function checkResponse(
    response: Response,
    apiElementConfig: ApiElementConfig,
): void {
    const status = response.status;
    if (status in apiElementConfig.success) {
        for (const restr in apiElementConfig.restrictions) {
            if (
                response.headers.get(restr) !==
                apiElementConfig.restrictions[restr]
            ) {
                throw new RequestError(ERROR_TYPE.UNEXPECTED);
            }
        }
        return;
    }
    if (status in apiElementConfig.failure) {
        throw new RequestError(ERROR_TYPE.FAILURE, status);
    }
    throw new RequestError(ERROR_TYPE.UNEXPECTED);
}

/**
 * Приводит ошибки Fetch API к общему виду
 * @async
 */
async function ajax(url: string, params: { [index: string]: string }) {
    try {
        return await fetch(url, params);
    } catch {
        throw new RequestError(ERROR_TYPE.NETWORK_ERROR);
    }
}
const Api = {
    /**
     * Отправляет на сервер запрос об аутентификации по кукам
     * @async
     */
    async authUser() {
        const auth_config: ApiElementConfig = apiConfig.api.auth;
        const response = await ajax(
            `${apiConfig.backend}${auth_config.url}`,
            auth_config.params(""),
        );
        checkResponse(response, auth_config);
        const json = await response.json();
        return json.Body;
    },

    /**
     * Отправляет на сервер запрос о входе в аккаунт
     * @async
     * @param {Object} login_data - данные пользователя
     */
    async loginUser(login_data: LoginData) {
        const login_config: ApiElementConfig = apiConfig.api.login;
        const body = JSON.stringify(login_data);
        const response = await ajax(
            `${apiConfig.backend}${login_config.url}`,
            login_config.params(body),
        );
        checkResponse(response, login_config);
        const json = await response.json();
        return json.Body;
    },

    /**
     * Отправляет на сервер запрос о создании пользователя
     * @async
     * @param {Object} signup_data - данные пользователя
     */
    async createUser(signup_data: SignUpData) {
        const signup_config: ApiElementConfig = apiConfig.api.signup;
        const body = JSON.stringify(signup_data);
        const response = await ajax(
            `${apiConfig.backend}${signup_config.url}`,
            signup_config.params(body),
        );
        checkResponse(response, signup_config);
        return;
    },

    /**
     * Отправляет на сервер запрос о выходе из аккаунта
     * @async
     */
    async logoutUser() {
        const logout_config = apiConfig.api.logout;
        const response = await ajax(
            `${apiConfig.backend}${logout_config.url}`,
            logout_config.params(""),
        );
        checkResponse(response, logout_config);
        return;
    },

    /**
     * Отправляет на сервер запрос на получение списка ресторанов
     * @async
     */
    async getAllRestaurants() {
        const config = apiConfig.api.restaurants_all;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async getRestaurant(restaurantId: number) {
        const config = apiConfig.api.restaurants_get;
        const response = await ajax(
            `${apiConfig.backend}${config.url}/${restaurantId}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },
};

export { Api, ERROR_TYPE };
export type { ApiConfig, RequestError, LoginData, SignUpData };
