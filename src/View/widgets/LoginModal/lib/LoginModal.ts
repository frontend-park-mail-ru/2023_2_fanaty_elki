import { IWidget } from "../../../types";

import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

import loginModalTemplate from "../ui/LoginModal.hbs";
import "../ui/LoginModal.scss";

import "../ui/inputWithMsg.scss";

import "../ui/Button.scss";
import { UIEvent, UIEventType } from "../../../../config";
import { UserEvent } from "../../../../Model/UserModel";
import { EventDispatcher, Listenable } from "../../../../modules/observer";

export class LoginModal extends IWidget implements Listenable<UIEvent> {
    private submitButton: HTMLElement;
    private registrationButton: HTMLElement;

    private messageBox: HTMLElement;

    private usernameInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(loginModalTemplate(), ".modal");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.update.bind(this));

        this.submitButton = <HTMLElement>this.element.querySelector("#submit");
        this.registrationButton = <HTMLElement>(
            this.element.querySelector("#reg")
        );

        this.messageBox = <HTMLElement>this.element.querySelector("#msg");

        this.usernameInput = <HTMLInputElement>(
            this.element.querySelector("#username")
        );
        this.passwordInput = <HTMLInputElement>(
            this.element.querySelector("#password")
        );

        this.bindEvents();
    }

    open() {
        this.element.classList.add("open");
    }

    close() {
        this.element.classList.remove("open");
    }

    update(event?: UserEvent) {
        // if (model.userModel.getErrorMsg()) {
        //     this.messageBox.innerText = model.userModel.getErrorMsg() as string;
        // }
        // if (model.modalModel.getIsOpened()) {
        //     this.element.classList.add("open");
        // } else {
        //     this.element.classList.remove("open");
        // }
    }

    private bindEvents() {
        this.usernameInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
        });
        this.usernameInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
        });
        this.passwordInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
        });
        this.submitButton.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.LOGIN,
                data: {
                    username: this.usernameInput.value,
                    password: this.passwordInput.value,
                },
            });
        });
        this.registrationButton.addEventListener("click", () => {
            this.events.notify({ type: UIEventType.LMODAL_SIGNUP_CLICK });
        });
        this.element.querySelector("#close")!.addEventListener("click", () => {
            this.close();
            this.events.notify({ type: UIEventType.LMODAL_CLOSE_CLICK });
        });
        this.element
            .querySelector(".modal__box")!
            .addEventListener("click", (event: any) => {
                event._isClickWithInModal = true;
            });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            this.close();
            this.events.notify({ type: UIEventType.LMODAL_CLOSE_CLICK });
        });
    }
}
