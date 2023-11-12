import IView from "../IView";
import profileTemplate from "./ProfileView.hbs";
import "./ProfileView.scss";

import profile from "../../components/ProfileInfo/ProfileInfo.hbs";
import "../../components/ProfileInfo/ProfileInfo.scss";

import orderList from "../../components/OrderList/OrderList.hbs";
import "../../components/OrderList/OrderList.scss";
import { User } from "../../models/UserModel/UserModel";

export default class ProfileView extends IView {
    private profile: Element;
    private orders: Element;

    constructor(parent_: HTMLElement, title_: string) {
        super(parent_, title_);
        const parser = new DOMParser();
        this.element = parser
            .parseFromString(profileTemplate(0), "text/html")
            .querySelector("#main")!;
        this.profile = this.element.querySelector(
            ".profile__content__user-data",
        )!;
        this.orders = this.element.querySelector(".profile__content__orders")!;
    }

    mountNavbar() {
        navbar.mount(this.element.querySelector("#navbar")!);
    }

    setUser(user: User) {
        this.profile!.innerHTML = profile(user);
    }

    setOrders(orders: any) {
        this.orders!.innerHTML = orderList(orders);
    }
}
