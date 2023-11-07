import DishModel from "../../models/DishModel/DishModel";
import RestaurantView from "../../views/RestaurantView/RestaurantView";
import IController from "../IController";
import UserModel from "../../models/UserModel/UserModel";
import RestaurantModel, {
    Restaurant,
} from "../../models/RestaurantModel/RestaurantModel";
import CartModel from "../../models/CartModel/CartModel";

export default class RestaurantController implements IController {
    private restaurant: Restaurant;

    /**
     * Модель блюда
     */
    private dishModel: DishModel;
    private restaurantModel: RestaurantModel;
    private cartModel: CartModel;
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
        cartModel_: CartModel,
    ) {
        this.restaurantView = view;
        this.dishModel = dishModel_;
        this.userModel = userModel_;
        this.restaurantModel = restaurantModel_;
        this.cartModel = cartModel_;
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
            await this.setCurrentRestaurant(id);
            const list = await this.dishModel.getAllByRestaurant(id);
            this.restaurantView.updateList(list);
            // this.restaurantView.setRestaurantTitle(this.restaurant.Name);
        } catch (e) {
            console.log(e);
        }
        this.restaurantView.render();
        this.restaurantView.getButtons().forEach((button) => {
            button.addEventListener("click", () => {
                this.cartModel.addDish(Number(button.id));
            });
        });
    }

    /**
     * Конец управления контроллера перед передачей управления другому
     */
    stop() {
        this.restaurantView.clear();
    }

    async setCurrentRestaurant(restaurantId: number) {
        this.restaurant =
            await this.restaurantModel.getRestaurantById(restaurantId);
    }
}
