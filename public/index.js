import { MainController } from "/controllers/MainController/MainController.js";
import { EmptyController } from "/controllers/EmptyController/EmptyController.js";
import { MainView } from "/views/MainView/MainView.js";
import { Router } from "/controllers/Router/Router.js";
import { Restaurant } from "/models/RestaurantModel/RestaurantModel.js";

const rootElement = document.querySelector('#root');

window.backendURL = '127.0.0.1:3000';
window.GET = 'GET';
window.POST = 'POST';
const router = new Router();
window.router = router;
const main_view = new MainView(rootElement);
const restaurantModel = new Restaurant();
router.main_controller = new MainController(main_view, restaurantModel);
router.empty_controller = new EmptyController();

window.onpopstate = (event) => {
    // event.preventDefault();
    router.route(window.location.pathname)
};

router.route(window.location.pathname);
