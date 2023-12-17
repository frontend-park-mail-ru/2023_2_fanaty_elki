export const paymentConfig = {
    summ_phrase: "Сумма заказа: ",
    delivery_phrase: "Сумма доставки: ",
};

export const navbarConfig = {
    noFields: true,
};

export enum cartElement {
    ROOT = "#cart_page",
    BUTTON = ".cart-item__info__count-control__button",
    CART_CONTENT = ".cart__content__goods",
    ORDER_SUBMIT = ".cart__content__control__payment-approve__approve",
    NAVBAR = "#navbar",
    ADDRESS = "#address",
    CONTROLS = ".cart__content__control",
    TOTAL_TITLE = "#cart__sum",
    DELIVERY_PRICE = "#cart__delivery",
    ERROR_BOX = "#cart__error",
}
