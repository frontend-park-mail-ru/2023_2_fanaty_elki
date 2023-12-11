import type { ApiConfig } from "./api";

export enum REQUEST_METHOD {
    POST = "POST",
    GET = "GET",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export const apiConfig: ApiConfig = {
    backend: "https://prinesy-poday.ru/api",
    //backend: "http://localhost:8080/api",
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
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                401: "Неверный логин или пароль",
                500: "Ошибка сервера",
            },
            restrictions: {
                "content-type": "application/json",
            },
        },
        me: {
            url: "/me",
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
        signup: {
            url: "/users",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.POST,
                    body: body,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
            success: {
                201: "OK",
            },
            failure: {
                400: "Такой пользователь уже существует",
                491: "Пользователь с таким именем уже существует",
                492: "Пользователь с такой почтой уже существует",
                493: "Пользователь с таким номером телефона уже существует",
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
        updateUser: {
            url: "/users/me",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.PATCH,
                    body,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                400: "Таких полей у пользователя не существует",
                401: "Отсутствует авторизация",
                491: "Совпадает имя",
                492: "Совпадает почта",
                493: "Совпадает телефон",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        updateUserIcon: {
            url: "/users/me/icon",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.PATCH,
                    "Content-Type": "multipart/form-data",
                    body: body,
                    credentials: "include",
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                400: "Таких полей у пользователя не существует",
                401: "Отсутствует авторизация",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        getRestaurants: {
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
        getCategories: {
            url: "/categories",
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
        dishes: {
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
        cart: {
            url: "/cart",
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
                401: "Отсутствует авторизация",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        cartAdd: {
            url: "/cart",
            params: (id) => {
                return {
                    method: REQUEST_METHOD.POST,
                    body: id,
                    credentials: "include",
                };
            },
            success: {
                201: "OK",
            },
            failure: {
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        cartDelete: {
            url: "/cart",
            params: (id) => {
                return {
                    method: REQUEST_METHOD.DELETE,
                    body: id,
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
        cartIncItem: {
            url: "/cart/update/up",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.PATCH,
                    body,
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
        cartDecItem: {
            url: "/cart/update/down",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.PATCH,
                    body,
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
        cartClear: {
            url: "/cart/clear",
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
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        dishGetById: {
            url: "/product",
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
        getOrders: {
            url: "/orders",
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
        getOrder: {
            url: "/orders",
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
                404: "Не найден заказ",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        createOrder: {
            url: "/orders",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.POST,
                    credentials: "include",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
            success: {
                201: "OK",
            },
            failure: {
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        csrf: {
            url: "/csrf",
            params: () => {
                return {
                    method: REQUEST_METHOD.POST,
                    credentials: "include",
                };
            },
            success: {
                201: "OK",
            },
            failure: {
                401: "Не авторизован",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        search: {
            url: "/restaurants/",
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
        getCommentsByRestaurantId: {
            url: "/comments",
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
        createComment: {
            url: "/comments",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.POST,
                    body,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
            success: {
                201: "OK",
            },
            failure: {
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
    },
};
