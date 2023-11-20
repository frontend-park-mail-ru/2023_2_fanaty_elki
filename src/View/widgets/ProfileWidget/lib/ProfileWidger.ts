import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
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
    private iconInput: HTMLInputElement;
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
        this.iconInput = <HTMLInputElement>(
            this.element.querySelector("#icon-input")
        );
        this.icon = <HTMLImageElement>this.element.querySelector("#icon");

        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener("submit", (event: Event) => {
            event.preventDefault();

            controller.handleEvent({
                type: VIEW_EVENT_TYPE.USER_UPDATE,
                data: {
                    userFields: {
                        Birthday: this.birthday.value.trim(),
                        Email: this.email.value.trim(),
                        PhoneNumber: this.phoneNumber.value.trim(),
                    },
                    icon: this.iconInput.files![0],
                },
            });
        });

        this.iconInput.addEventListener("change", () => {
            this.icon.src = URL.createObjectURL(this.iconInput.files![0]);
        });
    }

    update() {
        this.load();
    }

    load() {
        const user = model.userModel.getUser();
        if (user) {
            this.username.innerText = user.Username;
            this.birthday.value = user.Birthday;
            this.email.value = user.Email;
            this.phoneNumber.value = user.PhoneNumber;
            this.icon.src = user.Icon;
        }
    }
}
