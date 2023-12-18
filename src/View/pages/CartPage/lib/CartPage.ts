import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { Navbar } from "../../../widgets/Navbar";
import cartTemplate from "../ui/CartView.hbs";
import cartListTemplate from "../ui/CartList.hbs";
import cartControlsTemplate from "../ui/CartControls.hbs";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { OrderEvent } from "../../../../Model/OrderModel";
import { cartElement, paymentConfig, navbarConfig } from "./config";
import { Cart, CartEvent, PromoType } from "../../../../Model/CartModel";
import { UserEvent } from "../../../../Model/UserModel";

export class CartPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private address: AddressChooser;

    private addressInput: HTMLInputElement;
    private addressButton: HTMLElement;
    private cardPayment: HTMLElement;
    private promo: HTMLInputElement;
    private promoButton: HTMLElement;
    private promoError: HTMLElement;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(cartTemplate(), cartElement.ROOT);
        this.getChild(cartElement.CONTROLS).innerHTML = cartControlsTemplate();
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar(navbarConfig);
        this.getChild(cartElement.NAVBAR).appendChild(this.navbar.element);
        model.orderModel.events.subscribe(this.updateControls.bind(this));

        this.address = new AddressChooser();
        this.getChild(cartElement.ADDRESS).appendChild(this.address.element);

        this.addressInput = <HTMLInputElement>this.getChild("#cart__address");
        this.addressButton = this.getChild("#cart__change-address");
        this.cardPayment = this.getChild("#card-payment");

        this.promo = <HTMLInputElement>this.getChild("#promo__value");
        this.promoButton = this.getChild("#promo__submit");
        this.promoError = this.getChild("#promo__error");

        this.navbar.events.subscribe(this.update.bind(this));

        model.cartModel.events.subscribe(this.updateCart.bind(this));
        model.userModel.events.subscribe(this.updateUserEvent.bind(this));

        this.bindEvents();
    }

    private bindEvents() {
        this.getChild("#form").addEventListener("submit", (event: Event) => {
            event.preventDefault();
            if (model.userModel.getAddress()) {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.CREATE_ORDER,
                    data: null,
                });
            } else {
                this.getChild(cartElement.ERROR_BOX).innerText =
                    "Укажите адрес доставки";
            }
        });

        this.element.addEventListener("click", () => {
            this.getChild(cartElement.ERROR_BOX).innerText = "";
            this.promoError.innerText = "";
        });

        this.getChild("#courier-cash").addEventListener("input", () => {
            this.disableCardInputs();
        });
        this.getChild("#courier-card").addEventListener("input", () => {
            this.disableCardInputs();
        });
        this.getChild("#online-card").addEventListener("input", () => {
            this.enableCardInputs();
        });

        this.addressButton.addEventListener("click", () => {
            this.getChild(cartElement.ERROR_BOX).innerText = "";
            this.address.open();
        });

        this.promoButton.addEventListener("click", () => {
            if (this.promoButton.dataset.Action === "release") {
                if (!this.promo.value) return;
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.RELEASE_PROMO,
                    data: this.promo.value,
                });
            } else {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.CANCEL_PROMO,
                    data: this.promo.value,
                });
            }
        });
    }

    enableCardInputs() {
        this.cardPayment.style.gap = "15px";

        this.getChild("#card-number").classList.remove("hide-input");
        (this.getChild("#card-number") as HTMLInputElement).disabled = false;

        this.getChild("#card-valid-thru").classList.remove("hide-input");
        (this.getChild("#card-valid-thru") as HTMLInputElement).disabled =
            false;

        this.getChild("#card-cvv").classList.remove("hide-input");
        (this.getChild("#card-cvv") as HTMLInputElement).disabled = false;
    }

    disableCardInputs() {
        this.getChild("#card-number").classList.add("hide-input");
        (this.getChild("#card-number") as HTMLInputElement).disabled = true;

        this.getChild("#card-valid-thru").classList.add("hide-input");
        (this.getChild("#card-valid-thru") as HTMLInputElement).disabled = true;

        this.getChild("#card-cvv").classList.add("hide-input");
        (this.getChild("#card-cvv") as HTMLInputElement).disabled = true;

        this.cardPayment.style.gap = "0";
    }

    updateCart(event?: CartEvent) {
        let cart: Cart | null = model.cartModel.getCart();
        if (cart) {
            cart.sort((a, b) => {
                return a.Product.ID - b.Product.ID;
            });
        }
        if (cart && cart.length === 0) {
            cart = null;
        }
        this.getChild(cartElement.CART_CONTENT).innerHTML =
            cartListTemplate(cart);
        this.getAll(cartElement.BUTTON).forEach((element) => {
            element.addEventListener("click", () => {
                controller.handleEvent({
                    type: element.classList.contains("up")
                        ? VIEW_EVENT_TYPE.INCREASE_CART
                        : VIEW_EVENT_TYPE.DECREASE_CART,
                    data: element.getAttribute("data"),
                });
            });
        });
        const summ = model.cartModel.getSumm();
        const deliveryPrice =
            model.cartModel.getCurrentRestaurant()?.DeliveryPrice || 0;
        const promo = model.cartModel.getPromo();
        const errorMsg = model.cartModel.getError();

        this.summ = summ;
        this.deliveryPrice = deliveryPrice;
        this.promoButton.innerText = "Применить";
        this.promoButton.dataset.Action = "release";
        this.promo.value = "";

        if (errorMsg) {
            this.promoError.innerText = errorMsg;
        } else {
            this.promoError.innerText = "";
        }

        if (promo) {
            this.promoButton.innerText = "Отменить";
            this.promoButton.dataset.Action = "cancel";
            this.promo.value = promo.Promo;

            switch (promo.Type) {
                case PromoType.DISCOUNT:
                    this.setDiscountedSumm(summ, promo.Discount);
                    break;
                case PromoType.FREE_DELIVERY:
                    this.setFreeDelivery(deliveryPrice);
                    break;
            }
        }
    }

    updateUserEvent(event: UserEvent | undefined) {
        if (event == UserEvent.ADDRESS_CHANGE) {
            const address = model.userModel.getAddressText();
            this.addressInput.value = address ? address : "";
        }
    }

    update(event?: UIEvent) {
        switch (event!.type) {
            case UIEventType.NAVBAR_ADDRESS_CLICK:
                this.address.open();
                break;
            default:
                break;
        }
        this.events_.notify(event);
    }

    updateControls(event?: OrderEvent) {}

    load() {
        this.navbar.load();
        this.address.load();
        this.updateCart();
    }

    set summ(total: number) {
        this.getChild(
            cartElement.TOTAL_TITLE,
        ).innerHTML = `${paymentConfig.summ_phrase}${total} ₽`;
    }

    set deliveryPrice(deliveryPrice: number) {
        this.getChild(
            cartElement.DELIVERY_PRICE,
        ).innerHTML = `${paymentConfig.delivery_phrase}${deliveryPrice} ₽`;
    }

    setDiscountedSumm(summ: number, discount: number) {
        this.getChild(cartElement.TOTAL_TITLE).innerHTML = `${
            paymentConfig.summ_phrase
        }&nbsp;<del><i>${summ}₽</i></del>&nbsp;${(summ * discount).toFixed(
            2,
        )} ₽`;
    }

    setFreeDelivery(deliveryPrice: number) {
        this.getChild(
            cartElement.DELIVERY_PRICE,
        ).innerHTML = `${paymentConfig.delivery_phrase}&nbsp;<del><i>${deliveryPrice}₽</i></del>&nbsp;0 ₽`;
    }
}
