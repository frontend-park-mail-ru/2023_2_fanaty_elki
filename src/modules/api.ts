import { ApiElement, ERROR_TYPE, config } from "../config";
import { LoginData, SignUpData } from "../models/UserModel/UserModel";

function checkResponse(response: Response, local_config: ApiElement) {
    const status = response.status;
    if (status in local_config.success) {
        for (const restr in local_config.restrictions) {
            if (
                response.headers.get(restr) !== local_config.restrictions[restr]
            ) {
                throw {
                    type: ERROR_TYPE.UNEXPECTED,
                };
            }
        }
        return;
    }
    if (status in local_config.failure) {
        throw {
            type: ERROR_TYPE.FAILURE,
            status: status,
        };
    }
    throw {
        type: ERROR_TYPE.UNEXPECTED,
    };
}

/**
 * Приводит ошибки Fetch API к общему виду
 * @async
 */
async function ajax(url: string, params: { [index: string]: string }) {
    try {
        return await fetch(url, params);
    } catch {
        throw {
            type: ERROR_TYPE.NETWORK_ERROR,
        };
    }
}

/**
 * Отправляет на сервер запрос об аутентификации по кукам
 * @async
 */
export async function authUser() {
    const auth_config: ApiElement = config.api.auth;
    const response = await ajax(
        `${config.backend}${auth_config.url}`,
        auth_config.params(""),
    );
    checkResponse(response, auth_config);
    const json = await response.json();
    return json.Body;
}

/**
 * Отправляет на сервер запрос о входе в аккаунт
 * @async
 * @param {Object} login_data - данные пользователя
 */
export async function loginUser(login_data: LoginData) {
    const login_config: ApiElement = config.api.login;
    const body = JSON.stringify(login_data);
    const response = await ajax(
        `${config.backend}${login_config.url}`,
        login_config.params(body),
    );
    checkResponse(response, login_config);
    const json = await response.json();
    return json.Body;
}

/**
 * Отправляет на сервер запрос о создании пользователя
 * @async
 * @param {Object} signup_data - данные пользователя
 */
export async function createUser(signup_data: SignUpData) {
    const signup_config: ApiElement = config.api.signup;
    const body = JSON.stringify(signup_data);
    const response = await ajax(
        `${config.backend}${signup_config.url}`,
        signup_config.params(body),
    );
    checkResponse(response, signup_config);
    return;
}

/**
 * Отправляет на сервер запрос о выходе из аккаунта
 * @async
 */
export async function logoutUser() {
    const logout_config = config.api.logout;
    const response = await ajax(
        `${config.backend}${logout_config.url}`,
        logout_config.params(""),
    );
    checkResponse(response, logout_config);
    return;
}

/**
 * Отправляет на сервер запрос на получение списка ресторанов
 * @async
 */
export async function getRestaurants() {
    const restaurants_config = config.api.restaurants;
    const response = await ajax(
        `${config.backend}${restaurants_config.url}`,
        restaurants_config.params(""),
    );
    checkResponse(response, restaurants_config);
    const json = await response.json();
    return json.Body;
}
