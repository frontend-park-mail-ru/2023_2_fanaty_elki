import { MainController } from "/controllers/MainController/MainController.js";
import { SignUpController } from "/controllers/SignUpController/SignUpController.js";
import { LoginController } from "/controllers/LoginController/LoginController.js";
import { MainView } from "/views/MainView/MainView.js";
import { SignUpView } from "/views/SignUpView/SignUpView.js";
import { LoginView } from "/views/LoginView/LoginView.js";
import { Router } from "/controllers/Router/Router.js";
import { RestaurantModel } from "/models/RestaurantModel/RestaurantModel.js";
import { UserModel } from "/models/UserModel/UserModel.js";

const rootElement = document.querySelector('#root');

window.backendURL = 'http://84.23.53.216:8001';
window.GET = 'GET';
window.POST = 'POST';

const userModel = new UserModel();
await userModel.auth();

const router = new Router();
window.router = router;
const main_view = new MainView(rootElement);
const signup_view = new SignUpView(rootElement);
const login_view = new LoginView(rootElement);
const restaurantModel = new RestaurantModel();
router.main_controller = new MainController(main_view, restaurantModel, userModel);
router.signup_controller = new SignUpController(signup_view, userModel);
router.login_controller = new LoginController(login_view, userModel);

window.onpopstate = (event) => {
    event.preventDefault();
    router.route(window.location.pathname)
};

router.route(window.location.pathname);
