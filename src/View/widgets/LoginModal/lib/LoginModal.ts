import { IWidget } from "../../../types";

import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

import loginModalTemplate from "../ui/LoginModal.hbs";
import "../ui/LoginModal.scss";

import "../ui/inputWithMsg.scss";

import "../ui/Button.scss";

export class LoginModal extends IWidget {
    private submitButton: HTMLElement;
    private registrationButton: HTMLElement;

    private messageBox: HTMLElement;

    private usernameInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;

    constructor() {
        super(loginModalTemplate(), ".login-form");

        model.userModel.addObserver(this);

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

        this.bindSubmitClick();
        this.bindRegistrationButtonClick();
        this.bindCloseClick();
    }

    update() {
        if (model.userModel.getErrorMsg()) {
            this.messageBox.innerText = model.userModel.getErrorMsg() as string;
        }
    }

    bindUsernameInput() {
        this.usernameInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
        });
    }

    bindPasswordInput() {
        this.passwordInput.addEventListener("input", () => {
            this.messageBox.innerText = "";
        });
    }

    bindSubmitClick() {
        this.submitButton.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.LOGIN,
                data: {
                    username: this.usernameInput.value,
                    password: this.passwordInput.value,
                },
            });
        });
    }

    bindRegistrationButtonClick() {
        this.registrationButton.addEventListener("click", () => {
            controller.handleEvent({});
        });
    }

    bindCloseClick() {
        this.element.querySelector("#close")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.MODAL_CHANGE,
                data: "close",
            });
        });
    }
}