enum GENERAL_MESSAGE {
    NETWORK_ERROR = "Ошибка сети",
    UNEXPECTED = "Неожиданная ошибка",
}

enum ROUTES {
    signup = "/signup",
    restaurants = "/restaurants",
    login = "/login",
    main = "/main",
    default = "/",
    cart = "/cart",
    profile = "/me",
}

export { GENERAL_MESSAGE, ROUTES };
