import DishModel from "../../models/DishModel/DishModel";
import RestaurantView from "../../views/RestaurantView/RestaurantView";
import IController from "../IController";
import UserModel from "../../models/UserModel/UserModel";
import { Restaurant } from "../../models/RestaurantModel/RestaurantModel";

export default class RestaurantController implements IController {
    private restaurant: Restaurant;

    /**
     * Модель блюда
     */
    private dishModel: DishModel;
    /**
     * Модель пользователя
     */
    private userModel: UserModel;
    private restaurantView: RestaurantView;

    /**
     * Создает экземляр контроллера и инициализирует его
     * @param {restaurantView} view - представление страницы ресторана страницы
     * @param {DishModel} dishModel_
     * @param {UserModel} userModel_
     */
    constructor(
        view: RestaurantView,
        dishModel_: DishModel,
        userModel_: UserModel,
    ) {
        this.restaurantView = view;
        this.dishModel = dishModel_;
        this.userModel = userModel_;

        navbar.bindPersonClick(() => {
            router.redirect("/login");
        });
        navbar.bindExitClick(this.logout.bind(this));
        navbar.bindLogoClick(() => {
            router.redirect("/");
        });
    }

    /**
     * Функция передачи управления контроллеру,
     * подготавливает страницу и инициирует её отрисовку
     */
    async start(params?: URLSearchParams) {
        this.restaurantView.mountNavbar();
        try {
            if (!params || !params.get("id")) throw Error("no id");
            const id = Number(params.get("id")!);
            if (isNaN(id)) throw Error("id is NaN");
            const list = await this.dishModel.getAllByRestaurant(id);
            this.restaurantView.updateList(list);
        } catch (e) {
            console.log(e);
        }
        this.restaurantView.render();
    }

    /**
     * Конец управления контроллера перед передачей управления другому
     */
    stop() {
        this.restaurantView.clear();
    }

    /**
     * Коллбек для выхода из аккаунта по нажатию на кнопку
     */
    async logout() {
        try {
            await this.userModel.logout();
            navbar.setNonAuthUser();
        } catch (e) {
            console.log(e);
        }
    }
}
