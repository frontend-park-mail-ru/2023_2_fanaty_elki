const REQUEST_METHOD = {
    POST: "POST",
    GET: "GET",
};

export const config = {
    // backend: "http://84.23.53.216:8001",
    backend: "http://127.0.0.1:3000",
    api: {
        auth: {
            url: "/auth",
            params: {
                method: REQUEST_METHOD.GET,
                credentials: "include",
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
        },
        logout: {
            url: "/logout",
            params: {
                method: REQUEST_METHOD.POST,
                credentials: "include",
            },
            success: {
                200: "OK",
            },
            failure: {
                401: "Не авторизован",
                500: "Ошибка сервера",
            },
        },
        restaurants: {
            url: "/restaurants",
            params: {
                method: REQUEST_METHOD.GET,
                credentials: "include",
            },
            success: {
                200: "OK",
            },
            failure: {
                500: "Ошибка сервера",
            },
        },
    },
    ERROR_TYPE: {
        FAILURE: -1,
        NETWORK_ERROR: -2,
        UNEXPECTED: -3,
    },
    GENERAL_MESSAGE: {
        NETWORK_ERROR: "Ошибка сети",
        UNEXPECTED: "Неожиданная ошибка",
    },
};
