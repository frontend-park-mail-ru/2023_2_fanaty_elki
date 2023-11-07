import { Api } from "../../modules/api";
import DishModel, { Dish } from "../DishModel/DishModel";

export type CartItem = {
    dish: Dish;
    count: number;
};

export default class CartModel {
    private dishes: CartItem[];

    private dishModel: DishModel;

    constructor(dishModel_: DishModel) {
        this.dishes = [];
        this.dishModel = dishModel_;
    }

    async addDish(dishId: number) {
        let dishIndex = this.dishes.findIndex((item) => {
            return item.dish.ID === dishId;
        });

        if (dishIndex === -1) {
            this.dishes.push({
                dish: await this.dishModel.getDishById(dishId),
                count: 1,
            });
            console.log(this.dishes);
            await this.addDishToCart(dishId);
        } else {
            this.dishes[dishIndex].count++;
            //TODO: добавить запрос на бэк на увеличение
        }
    }

    async removeDish(dishId: number) {
        let dishIndex = this.dishes.findIndex((item) => {
            return item.dish.ID === dishId;
        });

        if (this.dishes[dishIndex].count == 0) {
            this.dishes.splice(dishIndex, 1);
            this.removeDishFromCart(dishId);
        } else {
            this.dishes[dishIndex].count--;
            //TODO: добавить запрос на бэк на уменьшение товара
        }
    }

    cartSum(): number {
        let cartSum = 0;
        this.dishes.forEach((dish) => {
            cartSum += dish.dish.Price * dish.count;
        });

        return cartSum;
    }

    async getDishesId() {
        let cartData = await Api.getCart();
        let dishesId = [] as any;

        cartData.Cart.forEach((element: any) => {
            dishesId.push(element.Product.ID);
        });

        return dishesId;
    }

    async getAllItems() {
        let cartData = await Api.getCart();
        let data = { dishes: [] as any };

        cartData.Cart.forEach((element: any) => {
            data.dishes.push({
                icon: "deficon",
                Name: element.Product.Name,
                decBtnId: `${element.Product.ID}1`,
                Count: element.ItemCount,
                incBtnId: `${element.Product.ID}2`,
                Price: element.Product.Price,
            })
        });

        return data;
    }

    async addDishToCart(dishId: number) {
        Api.addDishToCart(dishId);
    }

    async removeDishFromCart(dishId: number) {
        Api.removeDishFromCart(dishId);
    }
}
