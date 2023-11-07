import type { ApiConfig } from "./api";

enum REQUEST_METHOD {
    POST = "POST",
    GET = "GET",
    DELETE = "DELETE",
}

const apiConfig: ApiConfig = {
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
                201: "OK",
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
                    method: REQUEST_METHOD.DELETE,
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
        restaurants_all: {
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
        restaurants_get: {
            url: "/restaurants",
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
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
    },
};

export default apiConfig;
