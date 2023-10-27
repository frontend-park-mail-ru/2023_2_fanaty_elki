import { MainController } from "../src/controllers/MainController/MainController.js";
import { SignUpController } from "../src/controllers/SignUpController/SignUpController.js";
import { LoginController } from "../src/controllers/LoginController/LoginController.js";

import { MainView } from "../src/views/MainView/MainView.js";
import { SignUpView } from "../src/views/SignUpView/SignUpView.js";
import { LoginView } from "../src/views/LoginView/LoginView.js";

import { Router } from "../src/controllers/Router/Router.js";

import { RestaurantModel } from "../src/models/RestaurantModel/RestaurantModel.js";
import { UserModel } from "../src/models/UserModel/UserModel.js";

import './index.scss';
import favIconImg from './favicon.ico';

const rootElement = document.querySelector('#root');

window.backendURL = 'http://localhost:3333';
window.GET = 'GET';
window.POST = 'POST';

const userModel = new UserModel();
await userModel.auth();

const router = new Router();
window.router = router;
const main_view = new MainView(rootElement, 'Главная');
const signup_view = new SignUpView(rootElement, 'Регистрация');
const login_view = new LoginView(rootElement, 'Войти');
const restaurantModel = new RestaurantModel();
router.main_controller = new MainController(main_view, restaurantModel, userModel);
router.signup_controller = new SignUpController(signup_view, userModel);
router.login_controller = new LoginController(login_view, userModel);

window.onpopstate = (event) => {
    event.preventDefault();
    router.route(window.location.pathname)
};

router.route(window.location.pathname);

const favicon = document.createElement('link');
favicon.setAttribute('rel', 'icon');
favicon.setAttribute('href', favIconImg);
favicon.setAttribute('type', 'image/x-icon');
document.querySelector('head').appendChild(favicon);
