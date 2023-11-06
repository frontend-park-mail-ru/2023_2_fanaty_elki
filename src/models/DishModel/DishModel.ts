import { Api } from "../../modules/api";

export type Dish = {
    Id: number;
    Icon: string;
    Name: string;
    Price: number;
    CookingTime: number;
    Portion: number;
    Description: string;
};

export type DishCategory = {
    title: string;
    dishes: DishCategory[];
};

export type DishesCategoryListObject = {
    dishesCategory: DishCategory[];
};

/**
 * Модель ресторанов
 *  @class
 */
export default class DishModel {
    /**
     * Запрашивает у сервера список ресторанов
     * @async
     * @return {Promise} - список ресторанов или отклоненный промис
     */
    async getAllByRestaurant(restaurantId: number) {
        const restaurantData = await Api.getRestaurant(restaurantId);

        let dishesWithCategories: DishesCategoryListObject = { dishesCategory: [] };
        restaurantData.RestaurantWithProducts.MenuTypesWithProducts.forEach((menuTypeWithProduct: any) => {
            dishesWithCategories.dishesCategory.push({
                title: menuTypeWithProduct.MenuType.Name,
                dishes: menuTypeWithProduct.Products,
            })
        });

        return dishesWithCategories;
    }
}
