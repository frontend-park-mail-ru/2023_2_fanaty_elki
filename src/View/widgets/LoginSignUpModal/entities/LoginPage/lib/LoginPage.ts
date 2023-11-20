import { VIEW_EVENT_TYPE } from "../../../../../../Controller/Controller";
import { UserEvent } from "../../../../../../Model/UserModel";
import { UIEvent, UIEventType } from "../../../../../../config";
import {
    EventDispatcher,
    Listenable,
} from "../../../../../../modules/observer";
import { IHTMLElement } from "../../../../../types";

import loginPageTemplate from "../ui/LoginPage.hbs";

export class LoginPage extends IHTMLElement implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private closeButton: HTMLElement;
    private messageBox: HTMLElement;
    private usernameInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;
    private form: HTMLFormElement;
    private regButton: HTMLElement;

    constructor() {
        super(loginPageTemplate(), "#login-page");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.updateUserEvent.bind(this));

        this.closeButton = <HTMLElement>(
            this.element.querySelector("#login-page__close")
        );

        this.messageBox = <HTMLElement>(
            this.element.querySelector("#login-page__msg")
        );

        this.usernameInput = <HTMLInputElement>(
            this.element.querySelector("#login-page__username")
        );
        this.passwordInput = <HTMLInputElement>(
            this.element.querySelector("#login-page__password")
        );

        this.form = <HTMLFormElement>(
            this.element.querySelector("#login-signup-form")
        );
        this.regButton = <HTMLElement>(
            this.element.querySelector("#login-page__reg")
        );

        this.bindEvents();
    }

    updateUserEvent(event?: UserEvent) {
        if (event === UserEvent.USER_LOGIN) {
            if (model.userModel.getErrorMsg()) {
                this.messageBox.innerText = model.userModel.getErrorMsg()!;
            }
        }
    }

    bindEvents() {
        this.usernameInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
        });
        this.passwordInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
        });

        this.closeButton.addEventListener("click", () => {
            this.events.notify({
                type: UIEventType.LMODAL_CLOSE_CLICK,
                data: null,
            });
        });

        this.form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.LOGIN,
                data: {
                    username: this.usernameInput.value.trim(),
                    password: this.passwordInput.value.trim(),
                },
            });
        });

        this.regButton.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.LMODAL_SIGNUP_CLICK,
                data: null,
            });
        });
    }

    clearInputs() {
        this.usernameInput.value = "";
        this.passwordInput.value = "";
    }

    clearMessage() {
        this.messageBox.innerText = "";
    }
}
