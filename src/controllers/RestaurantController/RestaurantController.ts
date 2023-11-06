import DishModel from "../../models/DishModel/DishModel";
import RestaurantView from "../../views/RestaurantView/RestaurantView";
import IController from "../IController";
import UserModel from "../../models/UserModel/UserModel";
import RestaurantModel, { Restaurant } from "../../models/RestaurantModel/RestaurantModel";

export default class RestaurantController implements IController {
    private restaurant: Restaurant;

    /**
     * Модель блюда
     */
    private dishModel: DishModel;
    private restaurantModel: RestaurantModel;
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
        restaurantModel_: RestaurantModel,
    ) {
        this.restaurantView = view;
        this.dishModel = dishModel_;
        this.userModel = userModel_;
        this.restaurantModel = restaurantModel_;

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
    async start(params?: URLSearchParams) {
        if (this.userModel.currentUser) {
            if (!this.restaurantView.is_auth)
                this.restaurantView.setAuthUser(
                    this.userModel.currentUser.username,
                );
        } else {
            if (this.restaurantView.is_auth)
                this.restaurantView.setNonAuthUser();
        }
        try {
            if (!params || !params.get("id")) throw Error("no id");
            const id = Number(params.get("id")!);
            if (isNaN(id)) throw Error("id is NaN");
            await this.setCurrentRestaurant(id);
            const list = await this.dishModel.getAllByRestaurant(id);
            this.restaurantView.updateList(list);
            this.restaurantView.setRestaurantTitle(this.restaurant.Name);
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

    async setCurrentRestaurant(restaurantId: number) {
        this.restaurant = await this.restaurantModel.getRestaurantById(restaurantId);
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
