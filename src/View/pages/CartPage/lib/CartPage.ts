import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { Page } from "../../../types";
import { AddressChooser } from "../../../widgets/AddressChooser";
import { Navbar } from "../../../widgets/Navbar";
import cartTemplate from "../ui/CartView.hbs";
import cartListTemplate from "../ui/CartList.hbs";
import cartControlsTemplate from "../ui/CartControls.hbs";
import "../ui/CartView.scss";
import "../ui/CartList.scss";
import "../ui/CartControls.scss";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { OrderEvent } from "../../../../Model/OrderModel";
import { cartElement, paymentConfig } from "./config";

export class CartPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;
    private address: AddressChooser;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(cartTemplate(), cartElement.ROOT);
        this.getChild(cartElement.CONTROLS).innerHTML = cartControlsTemplate();
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar();
        this.getChild(cartElement.NAVBAR).appendChild(this.navbar.element);
        model.orderModel.events.subscribe(this.updateControls.bind(this));

        this.address = new AddressChooser();
        this.getChild(cartElement.ADDRESS).appendChild(this.address.element);

        this.navbar.events.subscribe(this.update.bind(this));
        model.cartModel.events.subscribe(this.updateCart.bind(this));
        this.bindEvents();
    }

    private bindEvents() {
        this.getChild(cartElement.ORDER_SUBMIT).addEventListener(
            "click",
            () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.CREATE_ORDER,
                    data: null,
                });
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.CLEAR_CART,
                    data: null,
                });
            },
        );
        this.getChild("#courier-cash").addEventListener("input", () => {
            this.disableCardInputs();
        });
        this.getChild("#courier-card").addEventListener("input", () => {
            this.disableCardInputs();
        });
        this.getChild("#online-card").addEventListener("input", () => {
            this.enableCardInputs();
        });
    }

    enableCardInputs() {
        console.log(this.element);
        (this.getChild("#card-number") as HTMLInputElement).disabled = false;
        (this.getChild("#card-valid-thru") as HTMLInputElement).disabled =
            false;
        (this.getChild("#card-cvv") as HTMLInputElement).disabled = false;
    }

    disableCardInputs() {
        (this.getChild("#card-number") as HTMLInputElement).disabled = true;
        (this.getChild("#card-valid-thru") as HTMLInputElement).disabled = true;
        (this.getChild("#card-cvv") as HTMLInputElement).disabled = true;
    }

    updateCart() {
        let cart = model.cartModel.getCart();
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
        this.summ = model.cartModel.getSumm();
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

    updateControls(event?: OrderEvent) {
        if (event === OrderEvent.CREATE_ORDER) {
            alert("заказ создан");
        }
    }

    load() {
        this.navbar.load();
        this.address.load();
    }

    set summ(total: number) {
        this.getChild(
            cartElement.TOTAL_TITLE,
        ).innerHTML = `${paymentConfig.summ_phrase}${total}₽`;
    }
}
