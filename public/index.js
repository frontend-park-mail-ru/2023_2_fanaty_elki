import { MainController } from "/controllers/MainController/MainController.js";
import { EmptyController } from "/controllers/EmptyController/EmptyController.js";
import { MainView } from "/views/MainView/MainView.js";
import { Router } from "/controllers/Router/Router.js";

const rootElement = document.querySelector('#root');

const router = new Router();
window.router = router;
const main_view = new MainView(rootElement);
router.main_controller = new MainController(main_view);
router.empty_controller = new EmptyController();

window.onpopstate = (event) => {
    // event.preventDefault();
    router.route(window.location.pathname)
};

router.route(window.location.pathname);
