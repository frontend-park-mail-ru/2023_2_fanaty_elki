import DishModel from "../../models/DishModel/DishModel";
import { RestaurantView } from "../../views/RestaurantView/RestaurantView";
import IController from "../IController";
import UserModel from "../../models/UserModel/UserModel";
import { Restaurant } from "../../models/RestaurantModel/RestaurantModel";

class RestaurantController implements IController {
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
     * @param {restaurantView} view - представление главной страницы
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

        this.restaurantView.bindPersonClick(() => {
            router.redirect("/login");
        });
        this.restaurantView.bindExitClick(this.logout.bind(this));
        this.restaurantView.bindLogoClick(() => {
            router.redirect("/");
        });
    }

    /**
     * Функция передачи управления контроллеру,
     * подготавливает страницу и инициирует её отрисовку
     */
    async start() {
        if (this.userModel.currentUser) {
            if (!this.restaurantView.is_auth)
                this.restaurantView.setAuthUser(this.userModel.currentUser.username);
        } else {
            if (this.restaurantView.is_auth) this.restaurantView.setNonAuthUser();
        }
        try {
            const list = await this.dishModel.getAllByRestaurant(resta);
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
            this.restaurantView.setNonAuthUser();
        } catch (e) {
            console.log(e);
        }
    }
}