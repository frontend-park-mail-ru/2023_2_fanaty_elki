import { User, Address } from "../../../Model/UserModel";
import { Comment } from "../../../Model/CommentModel";
import { apiConfig } from "./config";
import { REQUEST_METHOD } from "./config";

enum ERROR_TYPE {
    FAILURE,
    NETWORK_ERROR,
    UNEXPECTED,
}

type ApiElementConfig = {
    url: string;
    params: (body: string | FormData) => RequestInit;
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
async function ajax(url: string, params: RequestInit) {
    if (params.method !== REQUEST_METHOD.GET) {
        const csrf_config: ApiElementConfig = apiConfig.api.csrf;
        const csrfResponse = await fetch(
            `${apiConfig.backend}${csrf_config.url}`,
            csrf_config.params(""),
        );

        const csrfToken = csrfResponse.headers.get("X-CSRF-Token");
        if (csrfToken !== null) {
            if (!params.headers) {
                params.headers = {};
            }
            params.headers["X-Csrf-Token"] = csrfToken;
        }
    }
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
        const body = JSON.stringify({
            Username: login_data.username,
            Password: login_data.password,
        });
        const response = await ajax(
            `${apiConfig.backend}${login_config.url}`,
            login_config.params(body),
        );
        checkResponse(response, login_config);
        const json = await response.json();
        return json.Body;
    },

    async me() {
        const config = apiConfig.api.me;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    /**
     * Отправляет на сервер запрос о создании пользователя
     * @async
     * @param {User} user - данные пользователя
     */
    async createUser(user: User) {
        const signupConfig: ApiElementConfig = apiConfig.api.signup;
        const body = JSON.stringify(user);
        const response = await ajax(
            `${apiConfig.backend}${signupConfig.url}`,
            signupConfig.params(body),
        );
        checkResponse(response, signupConfig);
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

    async updateUser(userFields: { [index: string]: string }) {
        const config = apiConfig.api.updateUser;
        const body = JSON.stringify(userFields);
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(body),
        );
        checkResponse(response, config);
        return;
    },

    async updateUserIcon(icon: File) {
        const config = apiConfig.api.updateUserIcon;
        const body = new FormData();
        body.append("image", icon);
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(body),
        );
        checkResponse(response, config);
        return;
    },

    /**
     * Отправляет на сервер запрос на получение списка ресторанов
     * @async
     */
    async getRestaurants() {
        const config = apiConfig.api.getRestaurants;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async getSearchResults(query: string) {
        const config = apiConfig.api.search;
        const response = await ajax(
            `${apiConfig.backend}${config.url}?search=${query}`,
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

    async getDishes(restaurantId: number) {
        const config = apiConfig.api.dishes;
        const response = await ajax(
            `${apiConfig.backend}${config.url}/${restaurantId}/products`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async getCart() {
        const config = apiConfig.api.cart;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async clearCart() {
        const config = apiConfig.api.cartClear;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(""),
        );
        checkResponse(response, config);
        return;
    },

    async addDishToCart(dishId: number) {
        const config = apiConfig.api.cartAdd;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(String(dishId)),
        );
        checkResponse(response, config);
        return;
    },

    async removeDishFromCart(dishId: number) {
        const config = apiConfig.api.cartDelete;
        const response = await ajax(
            `${apiConfig.backend}${config.url}/${dishId}`,
            config.params(""),
        );
        checkResponse(response, config);
        return;
    },

    async incProductInCart(dishId: number) {
        const config = apiConfig.api.cartIncItem;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(`{ ProductID: ${dishId} }`),
        );
        checkResponse(response, config);
        return;
    },

    async decProductInCart(dishId: number) {
        const config = apiConfig.api.cartDecItem;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(`{ ProductID: ${dishId} }`),
        );
        checkResponse(response, config);
        return;
    },

    async getDishById(dishId: number) {
        const config = apiConfig.api.dishGetById;
        const response = await ajax(
            `${apiConfig.backend}${config.url}/${dishId}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async getUserOrders() {
        const config = apiConfig.api.getOrders;
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async getOrder(orderId: number) {
        const config = apiConfig.api.getOrder;
        const response = await ajax(
            `${apiConfig.backend}${config.url}/${orderId}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async createOrder(Address: Address) {
        const config = apiConfig.api.createOrder;
        const body = JSON.stringify({ Address });
        const response = await ajax(
            `${apiConfig.backend}${config.url}`,
            config.params(body),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async getCommentsByRestaurantId(restaurantId: number) {
        const config = apiConfig.api.getCommentsByRestaurantId;
        const response = await ajax(
            `${apiConfig.backend}${config.url}/${restaurantId}`,
            config.params(""),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },

    async createComment(restaurantId: number, comment: Comment) {
        const config = apiConfig.api.createComment;
        const body = JSON.stringify(comment);
        const response = await ajax(
            `${apiConfig.backend}${config.url}/${restaurantId}`,
            config.params(body),
        );
        checkResponse(response, config);
        const json = await response.json();
        return json.Body;
    },
};

export { Api, ERROR_TYPE };
export type { ApiConfig, RequestError, LoginData, SignUpData };
