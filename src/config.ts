export enum ERROR_TYPE {
    FAILURE,
    NETWORK_ERROR,
    UNEXPECTED,
}

export enum GENERAL_MESSAGE {
    NETWORK_ERROR = "Ошибка сети",
    UNEXPECTED = "Неожиданная ошибка",
}

enum REQUEST_METHOD {
    POST = "POST",
    GET = "GET",
}

export type ApiElement = {
    url: string;
    params: (body: string) => { [index: string]: string };
    success: { [index: string]: string };
    failure: { [index: string]: string };
    restrictions: { [index: string]: string };
};

type Config = {
    backend: string;
    api: { [index: string]: ApiElement };
};

export const config: Config = {
    // backend: "http://84.23.53.216:8001",
    backend: "http://localhost:8080/api",
    api: {
        auth: {
            url: "/auth",
            params: () => {
                return {
                    method: REQUEST_METHOD.GET,
                    credentials: "include",
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                401: "Не авторизован",
                500: "Ошибка сервера",
            },
            restrictions: {
                "content-type": "application/json",
            },
        },
        login: {
            url: "/login",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.POST,
                    body: body,
                    credentials: "include",
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                404: "Неверный логин или пароль",
                500: "Ошибка сервера",
            },
            restrictions: {
                "content-type": "application/json",
            },
        },
        signup: {
            url: "/users",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.POST,
                    body: body,
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                400: "Такой пользователь уже существует",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        logout: {
            url: "/logout",
            params: () => {
                return {
                    method: REQUEST_METHOD.POST,
                    credentials: "include",
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                401: "Не авторизован",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        restaurants: {
            url: "/restaurants",
            params: () => {
                return {
                    method: REQUEST_METHOD.GET,
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
    },
};
