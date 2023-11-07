import { Dish } from "../DishModel/DishModel";

export type CartItem = {
    dish: Dish;
    count: number;
}

export default class CartModel {
    private dishes: CartItem[];

    constructor() {
        this.dishes = [];
    }

    addDish(dish: Dish) {
        let dishIndex = this.dishes.findIndex(item => { return item.dish === dish });

        if (dishIndex === -1) {
            this.dishes.push({ dish, count: 1 });
        } else {
            this.dishes[dishIndex].count++;
        }

        //TODO: добавить запрос на бэк для добавления товара в корзину
    }

    removeDish(dish: Dish) {
        let dishIndex = this.dishes.findIndex(item => { return item.dish === dish });

        if (this.dishes[dishIndex].count == 0) {
            this.dishes.splice(dishIndex, 1);
        } else {
            this.dishes[dishIndex].count--;
        }

        //TODO: добавить запрос на бэк для добавления товара в корзину
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