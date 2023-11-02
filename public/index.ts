import MainController from "../src/controllers/MainController/MainController";
import SignUpController from "../src/controllers/SignUpController/SignUpController";
import LoginController from "../src/controllers/LoginController/LoginController";
import Router from "../src/controllers/Router/Router";

import { MainView } from "../src/views/MainView/MainView";
import SignUpView from "../src/views/SignUpView/SignUpView";
import LoginView from "../src/views/LoginView/LoginView";

import RestaurantModel from "../src/models/RestaurantModel/RestaurantModel";
import UserModel from "../src/models/UserModel/UserModel";

import { ROUTES } from "../src/config";

import "./index.scss";
import favIconImg from "./favicon.ico";

const rootElement: HTMLElement = document.querySelector("#root")!;

const userModel = new UserModel();
try {
    await userModel.auth();
} catch (e) {
    console.log(e);
}

const main_view = new MainView(rootElement, "Главная");
const signup_view = new SignUpView(rootElement, "Регистрация");
const login_view = new LoginView(rootElement, "Войти");
const restaurantModel = new RestaurantModel();
const main_controller = new MainController(
    main_view,
    restaurantModel,
    userModel,
);
const signup_controller = new SignUpController(signup_view, userModel);
const login_controller = new LoginController(login_view, userModel);
globalThis.router = new Router({
    [ROUTES.signup]: signup_controller,
    [ROUTES.login]: login_controller,
    [ROUTES.main]: main_controller,
    [ROUTES.default]: main_controller,
});

window.onpopstate = (event) => {
    event.preventDefault();
    router.route(window.location.pathname);
};

router.route(window.location.pathname);

const favicon = document.createElement("link");
favicon.setAttribute("rel", "icon");
favicon.setAttribute("href", favIconImg);
favicon.setAttribute("type", "image/x-icon");
document.querySelector("head")!.appendChild(favicon);
