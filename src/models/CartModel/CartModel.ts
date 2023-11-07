import DishModel, { Dish } from "../DishModel/DishModel";

export type CartItem = {
    dish: Dish;
    count: number;
}

export default class CartModel {
    private dishes: CartItem[];

    private dishModel: DishModel;

    constructor(dishModel_: DishModel) {
        this.dishes = [];
        this.dishModel = dishModel_;
    }

    async addDish(dishId: number) {
        let dishIndex = this.dishes.findIndex(item => { return item.dish.ID === dishId });

        if (dishIndex === -1) {
            this.dishes.push({ dish: await this.dishModel.getDishById(dishId), count: 1 });
        } else {
            this.dishes[dishIndex].count++;
        }

        //TODO: добавить запрос на бэк для добавления товара в корзину
    }

    async removeDish(dishId: number) {
        let dishIndex = this.dishes.findIndex(item => { return item.dish.ID === dishId });

        if (this.dishes[dishIndex].count == 0) {
            this.dishes.splice(dishIndex, 1);
            //TODO: Бахнуть запрос на удаление товара
        } else {
            this.dishes[dishIndex].count--;
        }

        //TODO: добавить запрос на бэк для удаления товара в корзину
    }

    cartSum(): number {
        let cartSum = 0;
        this.dishes.forEach(dish => {
            cartSum += dish.dish.Price * dish.count;
        })

        return cartSum;
    }

    getAllItems() {
        //TODO: Сделать поход к апишке через конфиг и добавить запись текущего состояния + предобработку для вьюхи
    }
}