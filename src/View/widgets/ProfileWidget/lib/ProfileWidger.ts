import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";

import profileWidgetTemplate from "../ui/ProfileWidget.hbs";
import {
    validateEmail,
    validatePhoneNumber,
} from "../../../../modules/validations";

export class ProfileWidget extends IWidget implements Listenable<UIEvent> {
    private username: HTMLElement;
    private email: HTMLInputElement;
    private emailMsg: HTMLElement;
    private birthday: HTMLInputElement;
    private birthdayMsg: HTMLElement;
    private phoneNumber: HTMLInputElement;
    private phoneNumberMsg: HTMLElement;
    private iconInput: HTMLInputElement;
    private icon: HTMLImageElement;

    private msg: HTMLElement;

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
        this.emailMsg = <HTMLElement>this.element.querySelector("#email__msg");

        this.birthday = <HTMLInputElement>(
            this.element.querySelector("#birthday")
        );
        this.birthdayMsg = <HTMLElement>(
            this.element.querySelector("#birthday__msg")
        );

        this.phoneNumber = <HTMLInputElement>(
            this.element.querySelector("#phone-number")
        );
        this.phoneNumberMsg = <HTMLElement>(
            this.element.querySelector("#phone-number__msg")
        );

        this.iconInput = <HTMLInputElement>(
            this.element.querySelector("#icon-input")
        );
        this.icon = <HTMLImageElement>this.element.querySelector("#icon");

        this.msg = <HTMLElement>this.element.querySelector("#msg");

        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener("submit", (event: Event) => {
            event.preventDefault();

            const emailValidation = validateEmail(this.email.value.trim());
            const phoneNumberValidation = validatePhoneNumber(
                this.phoneNumber.value.trim(),
            );

            if (!emailValidation && !phoneNumberValidation) {
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
            } else {
                this.emailMsg.innerText = emailValidation;
                this.phoneNumberMsg.innerText = phoneNumberValidation;
            }
        });

        this.iconInput.addEventListener("change", () => {
            this.icon.src = URL.createObjectURL(this.iconInput.files![0]);
        });

        this.getChild("#profile-widget__exit").addEventListener(
            "click",
            (event: Event) => {
                event.preventDefault();
                this.events.notify({
                    type: UIEventType.EXIT_CLICK,
                });
            },
        );
    }

    update() {
        this.load();
        this.msg.innerText = model.userModel.getErrorMsg() || "";
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

    clearError() {
        this.phoneNumberMsg.innerText = "";
        this.emailMsg.innerText = "";
        this.msg.innerText = "";
    }
}
