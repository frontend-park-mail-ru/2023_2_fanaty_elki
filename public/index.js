import { MainController } from "/controllers/MainController/MainController.js";
import { SignUpController } from "/controllers/SignUpController/SignUpController.js";
import { LoginController } from "/controllers/LoginController/LoginController.js";
import { EmptyController } from "/controllers/EmptyController/EmptyController.js";
import { MainView } from "/views/MainView/MainView.js";
import { SignUpView } from "/views/SignUpView/SignUpView.js";
import { LoginView } from "/views/LoginView/LoginView.js";
import { Router } from "/controllers/Router/Router.js";
import { Restaurant } from "/models/RestaurantModel/RestaurantModel.js";
import { UserModel } from "/models/UserModel/UserModel.js";

const rootElement = document.querySelector('#root');

window.backendURL = '127.0.0.1:3000';
window.GET = 'GET';
window.POST = 'POST';
const router = new Router();
window.router = router;
const main_view = new MainView(rootElement);
const signup_view = new SignUpView(rootElement);
const login_view = new LoginView(rootElement);
const restaurantModel = new Restaurant();
const userModel = new UserModel();
router.main_controller = new MainController(main_view, restaurantModel, userModel);
router.signup_controller = new SignUpController(signup_view, userModel);
router.login_controller = new LoginController(login_view, userModel);
router.empty_controller = new EmptyController();

window.onpopstate = (event) => {
    // event.preventDefault();
    router.route(window.location.pathname)
};

router.route(window.location.pathname);
