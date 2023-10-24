import { IController } from "../IController.js";

/**
 * Контроллер главной страницы
 * @class 
 * @extends {IController} 
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
     * @param {MainView} view - представление главной страницы
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
        this.view.bindLogoClick(()=>{
            router.redirect('/');
        });
    }

    /**
     * Функция передачи управления контроллеру,
     * подготавливает страницу и инициирует её отрисовку
     */
    async start() {
        if (this.userModel._currentUser) {
            if (!this.view.is_auth)
                this.view.setAuthUser(this.userModel._currentUser.username);
        } else {
            if (this.view.is_auth)
                this.view.setNonAuthUser();
        }
        try {
            const list = await this.restaurantModel.getAll();
            list.restaurants.forEach(element => {
                element.DeliveryTimeMax = element.DeliveryTime + 10; // грязый хак
            });
            this.view.updateList(list);
        } catch(e) {
            // ошибка получения ресторана, а точнее все ошибки => придумать, что делать
            // console.log(e);
        }
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
