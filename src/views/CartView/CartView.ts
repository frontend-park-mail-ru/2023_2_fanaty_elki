import IView from "../IView";
import cartTemplate from "./CartView.hbs";
import "./CartView.scss";

import cartList from "../../components/CartList/CartList.hbs";
import "../../components/CartList/CartList.scss";

import cartItem from "../../components/CartItem/CartItem.hbs";
import "../../components/CartItem/CartItem.scss";

import addressChooser from "../../components/AddressChooser/AddressChooser.hbs";
import "../../components/AddressChooser/AddressChooser.scss";

import paymentChooser from "../../components/PaymentChooser/PaymentChooser.hbs";
import "../../components/PaymentChooser/PaymentChooser.scss";

export default class CartView extends IView {
    private cartList: Element;
    private addressChooser: Element;
    private paymentChooser: Element;

    constructor(
        parent_: HTMLElement,
        title_: string,
    ) {
        super(parent_, title_);
        const parser = new DOMParser();
        this.element = parser.parseFromString(cartTemplate(0), "text/html").querySelector("#main")!;
        this.cartList = this.element.querySelector(".cart__content__goods")!;
        this.addressChooser = this.element.querySelector(".address-chooser")!;
        this.paymentChooser = this.element.querySelector(".payment-chooser")!;
    }

    mountNavbar() {
        navbar.mount(this.element.querySelector("#navbar")!);
    }

    setCartSum(cartSum: number) {
        this.element.querySelector(".cart__content__control__payment-approve__title")!.innerHTML = `Сумма заказа ${cartSum}₽`;
    }

    updateCartList(list: any) {
        this.cartList!.innerHTML = cartList(list);
    }

    updateAddress(address: string) {
        (this.addressChooser!.querySelector(".address-chooser__control__input") as any).value = address;
    }
}