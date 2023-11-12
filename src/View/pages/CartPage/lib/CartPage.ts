import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { Navbar } from "../../../widgets/Navbar";
import cartTemplate from "../ui/CartView.hbs";
import cartListTemplate from "../ui/CartList.hbs";
import cartControlsTemplate from "../ui/CartControls.hbs";
import "../ui/CartView.scss";
import "../ui/CartItem.scss";
import "../ui/PaymentChooser.scss";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { control } from "yandex-maps";

export class CartPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private address: AddressChooser;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(cartTemplate(), "#cart_page");
        this.element.querySelector(".cart__content__control")!.innerHTML =
            cartControlsTemplate();
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar();
        this.element.querySelector("#navbar")!.appendChild(this.navbar.element);

        this.address = new AddressChooser("Укажите адрес");
        this.element
            .querySelector("#address")!
            .appendChild(this.address.element);

        this.navbar.events.subscribe(this.update.bind(this));
        model.cartModel.events.subscribe(this.updateCart.bind(this));
    }

    updateCart() {
        const cart = model.cartModel.getCart();
        console.log("cart", cart);
        if (cart) {
            cart.sort((a, b) => {
                return a.Product.ID - b.Product.ID;
            });
        }
        this.element.querySelector(".cart__content__goods")!.innerHTML =
            cartListTemplate(cart);
        this.element
            .querySelectorAll(".cart-item__info__count-control__button.down")!
            .forEach((element) => {
                element.addEventListener("click", () => {
                    controller.handleEvent({
                        type: VIEW_EVENT_TYPE.DECREASE_CART,
                        data: element.getAttribute("data"),
                    });
                });
            });
        this.element
            .querySelectorAll(".cart-item__info__count-control__button.up")!
            .forEach((element) => {
                element.addEventListener("click", () => {
                    controller.handleEvent({
                        type: VIEW_EVENT_TYPE.INCREASE_CART,
                        data: element.getAttribute("data"),
                    });
                });
            });
    }

    update(event?: UIEvent) {
        console.log(event);
        switch (event!.type) {
            case UIEventType.NAVBAR_ADDRESS_CLICK:
                this.address.open();
                break;
            default:
                break;
        }
        this.events_.notify(event);
    }

    load() {
        this.navbar.load();
        this.address.load();
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.LOAD_CART,
            data: null,
        });
    }
}
