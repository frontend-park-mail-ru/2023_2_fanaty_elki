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

import RestaurantModel from "../src/models/RestaurantModel";
import UserModel from "../src/models/UserModel/UserModel";
import DishModel from "../src/models/DishModel/DishModel";

import { ROUTES } from "../src/config";

import "./index.scss";
import favIconImg from "./favicon.ico";
import Navbar from "../src/components/Navbar/Navbar";
import CartController from "../src/controllers/CartController/CartController";
import CartView from "../src/views/CartView/CartView";
import CartModel from "../src/models/CartModel/CartModel";
import OrderModel from "../src/models/OrderModel/OrderModel";
import ProfileView from "../src/views/ProfileView/ProfileView";
import ProfileController from "../src/controllers/ProfileController/ProfileController";

const rootElement: HTMLElement = document.querySelector("#root")!;

globalThis.navbar = new Navbar(MainViewConfig.navbar);
globalThis.userModel = new UserModel();
try {
    await userModel.auth();
} catch (e) {
    console.log(e);
}

const mainView = new MainView(rootElement, "Главная");
const signupView = new SignUpView(rootElement, "Регистрация");
const loginView = new LoginView(rootElement, "Войти");
const restaurantView = new RestaurantView(rootElement, "Рестораны");
const cartView = new CartView(rootElement, "Корзина");
const profileView = new ProfileView(rootElement, "Профиль");

const restaurantModel = new RestaurantModel();
const dishModel = new DishModel();
const cartModel = new CartModel(dishModel);
const orderModel = new OrderModel();

const mainController = new MainController(mainView, restaurantModel, userModel);
const restaurantController = new RestaurantController(
    restaurantView,
    dishModel,
    userModel,
    restaurantModel,
    cartModel,
);
const signup_controller = new SignUpController(signupView, userModel);
const login_controller = new LoginController(loginView, userModel);
const cartController = new CartController(
    cartView,
    cartModel,
    dishModel,
    orderModel,
    userModel,
);
const profileController = new ProfileController(
    userModel,
    orderModel,
    profileView,
);

globalThis.router = new Router({
    [ROUTES.signup]: signup_controller,
    [ROUTES.login]: login_controller,
    [ROUTES.main]: mainController,
    [ROUTES.restaurants]: restaurantController,
    [ROUTES.default]: mainController,
    [ROUTES.cart]: cartController,
    [ROUTES.profile]: profileController,
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
