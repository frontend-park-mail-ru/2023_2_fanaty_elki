import { IController } from "../IController.js";

/**
 * Контроллер главной страницы
 * @class 
 * @extends {IController}
 * @category Controllers 
 */
export class MainController extends IController {
    /**
     * Модель ресторана
     */
    restaurantModel;
    /**
     * Модель пользователя 
     */
    userModel;

    /**
     * Создает экземляр контроллера и инициализирует его
     * @param {MainView} view - view главной страницы
     * @param {RestaurantModel} restaurantModel_ 
     * @param {UserModel} userModel_ 
     */
    constructor(view, restaurantModel_, userModel_) {
        super(view);
        this.restaurantModel = restaurantModel_;
        this.userModel = userModel_;

        this.view.bindPersonClick(() => {
            router.redirect('/login');
        });
        this.view.bindExitClick(this.logout.bind(this));
    }

    /**
     * Функция передачи управления контроллеру,
     * подготавливает страницу и инициирует её отрисовку
     */
    start() {
        if (this.userModel._currentUser) {
            if (!this.view.is_auth)
                this.view.setAuthUser(this.userModel._currentUser.username);
        } else {
            if (this.view.is_auth)
                this.view.setNonAuthUser();
        }
        this.restaurantModel.getAll().then(list => {
            console.log(list);
            list.restaurants.forEach(element => {
                element.DeliveryTimeMax = element.DeliveryTime + 10;
            });
            this.view.updateList(list);
        }).catch(() => { })
        this.view.render();
    }

    /**
     * Конец управления контроллера перед передачей управления другому
     */
    stop() {
        this.view.clear();
    }

    /**
     * Коллбек для выхода из аккаунта по нажатию на кнопку
     */
    logout() {
        this.userModel.logout().then(() => {
            this.view.setNonAuthUser()
        });
    }
}
