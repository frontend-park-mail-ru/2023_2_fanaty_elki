import { UIEvent } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";

import profileWidgetTemplate from "../ui/ProfileWidget.hbs";
import "../ui/ProfileWidget.scss";

export class ProfileWidget extends IWidget implements Listenable<UIEvent> {
    private username: HTMLElement;
    private email: HTMLInputElement;
    private birthday: HTMLInputElement;
    private phoneNumber: HTMLInputElement;
    private icon: HTMLImageElement;

    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    constructor() {
        super(profileWidgetTemplate(), ".profile-info");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.update.bind(this));

        this.username = <HTMLElement>(
            this.element.querySelector(".profile-info__header__username")
        );
        this.email = <HTMLInputElement>this.element.querySelector("#email");
        this.birthday = <HTMLInputElement>(
            this.element.querySelector("#birthday")
        );
        this.phoneNumber = <HTMLInputElement>(
            this.element.querySelector("#phone-number")
        );
        this.icon = <HTMLImageElement>(
            this.element.querySelector(".profile-info__header__image")
        );
    }

    update() {
        this.load();
    }

    load() {
        const user = model.userModel.getUser();
        if (user) {
            console.log(user);

            this.username.innerText = user.Username;
            this.birthday.value = user.Birthday.slice(0, 10);
            this.email.value = user.Email;
            this.phoneNumber.value = user.PhoneNumber;
            this.icon.src = user.Icon;
        }
    }
}
