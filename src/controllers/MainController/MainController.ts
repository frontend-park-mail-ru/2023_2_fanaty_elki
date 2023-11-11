import { RestaurantModel } from "../../models/RestaurantModel/RestaurantModel";
import { UserModel } from "../../models/UserModel/UserModel";
import { MainView } from "../../views/MainView/MainView";
import { Restaurant } from "../../views/MainView/MainView";
import { IController } from "../IController";

/**
 * Контроллер главной страницы
 * @class
 * @extends {IController}
 */
export class MainController extends IController {
    /**
     * Модель ресторана
     */
    restaurantModel: RestaurantModel;
    /**
     * Модель пользователя
     */
    userModel: UserModel;
    mainView: MainView;

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
        super();
        this.mainView = view;
        this.restaurantModel = restaurantModel_;
        this.userModel = userModel_;

        this.mainView.bindPersonClick(() => {
            router.redirect("/login");
        });
        this.mainView.bindExitClick(this.logout.bind(this));
        this.mainView.bindLogoClick(() => {
            router.redirect("/");
        });
    }

    /**
     * Функция передачи управления контроллеру,
     * подготавливает страницу и инициирует её отрисовку
     */
    async start() {
        if (this.userModel._currentUser) {
            if (!this.mainView.is_auth)
                this.mainView.setAuthUser(this.userModel._currentUser.username);
        } else {
            if (this.mainView.is_auth) this.mainView.setNonAuthUser();
        }
        try {
            const list = await this.restaurantModel.getAll();
            console.log(list);
            this.mainView.updateList({ restaurants: list });
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

    /**
     * Коллбек для выхода из аккаунта по нажатию на кнопку
     */
    async logout() {
        try {
            await this.userModel.logout();
            this.mainView.setNonAuthUser();
        } catch (e) {
            console.log(e);
        }
    }
}
