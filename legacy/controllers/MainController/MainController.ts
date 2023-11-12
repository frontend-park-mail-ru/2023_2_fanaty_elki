import RestaurantModel from "../../models/RestaurantModel";
import UserModel from "../../models/UserModel/UserModel";
import MainView from "../../views/MainView/MainView";
import IController from "../IController";

/**
 * Контроллер главной страницы
 * @class
 * @extends {IController}
 */
export default class MainController implements IController {
    /**
     * Модель ресторана
     */
    private restaurantModel: RestaurantModel;
    /**
     * Модель пользователя
     */
    private userModel: UserModel;
    private mainView: MainView;

    /**
     * Создает экземляр контроллера и инициализирует его
     * @param {MainView} view - представление главной страницы
     * @param {RestaurantModel} restaurantModel_
     * @param {UserModel} userModel_
     */
    constructor(
        view: MainView,
        restaurantModel_: RestaurantModel,
        userModel_: UserModel,
    ) {
        this.mainView = view;
        this.restaurantModel = restaurantModel_;
        this.userModel = userModel_;
    }

    /**
     * Функция передачи управления контроллеру,
     * подготавливает страницу и инициирует её отрисовку
     */
    async start() {
        this.mainView.mountNavbar();
        try {
            const list = await this.restaurantModel.getAll();
            this.mainView.updateList(list);
        } catch (e) {
            console.log(e);
        }
        this.mainView.render();
    }

    /**
     * Конец управления контроллера перед передачей управления другому
     */
    stop() {
        this.mainView.clear();
    }
}