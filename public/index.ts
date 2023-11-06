import MainController from "../src/controllers/MainController/MainController";
import SignUpController from "../src/controllers/SignUpController/SignUpController";
import LoginController from "../src/controllers/LoginController/LoginController";
import RestaurantController from "../src/controllers/RestaurantController/RestaurantController";
import Router from "../src/controllers/Router/Router";

import MainViewConfig from "../src/views/MainView/MainViewConfig";
import MainView from "../src/views/MainView/MainView";
import SignUpView from "../src/views/SignUpView/SignUpView";
import LoginView from "../src/views/LoginView/LoginView";
import RestaurantView from "../src/views/RestaurantView/RestaurantView";

import RestaurantModel from "../src/models/RestaurantModel/RestaurantModel";
import UserModel from "../src/models/UserModel/UserModel";
import DishModel from "../src/models/DishModel/DishModel";

import { ROUTES } from "../src/config";

import "./index.scss";
import favIconImg from "./favicon.ico";
import Navbar from "../src/views/Navbar";

const rootElement: HTMLElement = document.querySelector("#root")!;

globalThis.navbar = new Navbar(MainViewConfig.navbar);
const userModel = new UserModel();
try {
    await userModel.auth();
    navbar.setAuthUser(userModel.currentUser!.username);
} catch (e) {
    console.log(e);
}

const mainView = new MainView(rootElement, "Главная");
const signupView = new SignUpView(rootElement, "Регистрация");
const loginView = new LoginView(rootElement, "Войти");
const restaurantView = new RestaurantView(rootElement, "Рестораны");
const restaurantModel = new RestaurantModel();
const dishModel = new DishModel();
const mainController = new MainController(mainView, restaurantModel, userModel);
const restaurantController = new RestaurantController(
    restaurantView,
    dishModel,
    userModel,
);
const signup_controller = new SignUpController(signupView, userModel);
const login_controller = new LoginController(loginView, userModel);
globalThis.router = new Router({
    [ROUTES.signup]: signup_controller,
    [ROUTES.login]: login_controller,
    [ROUTES.main]: mainController,
    [ROUTES.restaurants]: restaurantController,
    [ROUTES.default]: mainController,
});

window.onpopstate = (event) => {
    event.preventDefault();
    router.route(window.location.pathname, window.location.search);
};

router.route(window.location.pathname, window.location.search);

const favicon = document.createElement("link");
favicon.setAttribute("rel", "icon");
favicon.setAttribute("href", favIconImg);
favicon.setAttribute("type", "image/x-icon");
document.querySelector("head")!.appendChild(favicon);
