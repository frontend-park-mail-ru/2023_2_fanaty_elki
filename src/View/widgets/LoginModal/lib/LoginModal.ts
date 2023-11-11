import { IWidget } from "../../../types";

import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

import loginModalTemplate from "../ui/LoginModal.hbs";
import "../ui/LoginModal.scss";
import "../ui/inputWithMsg.scss";
import "../ui/Button.scss";

import loginPage from "../ui/pages/Login.hbs";
import regUserPage from "../ui/pages/RegUser.hbs";
import regExtraInfoPage from "../ui/pages/RegExtraInfo.hbs";
import { REG_STATE } from "../../../../Model/RegistrationModel";

export class LoginModal extends IWidget {
    private page: HTMLElement;

    private login: HTMLElement;
    private regUser: HTMLElement;
    private regExtraInfo: HTMLElement;

    constructor() {
        super(loginModalTemplate(), ".modal");

        model.userModel.addObserver(this);
        model.modalModel.addObserver(this);
        model.registrationModel.addObserver(this);

        this.page = <HTMLElement>this.element.querySelector("#login");

        const parser = new DOMParser();
        this.login = <HTMLElement>(
            parser
                .parseFromString(loginPage(), "text/html")
                .querySelector("#login-page")
        );
        this.regUser = <HTMLElement>(
            parser
                .parseFromString(regUserPage(), "text/html")
                .querySelector("#reg-user-page")
        );
        this.regExtraInfo = <HTMLElement>(
            parser
                .parseFromString(regExtraInfoPage(), "text/html")
                .querySelector("#reg-extra-info-page")
        );

        this.bindLoginPage();
        this.bindRegUserPage();
        this.bindRegExtraInfoPage();

        this.bindOuterModalClick();
        this.page.appendChild(this.login);
    }

    update() {
        if (model.modalModel.getIsOpened()) {
            this.element.classList.add("open");
        } else {
            this.element.classList.remove("open");
        }

        switch (model.registrationModel.getRegState()) {
            case REG_STATE.LOGIN:
                this.page.innerHTML = "";
                this.page.appendChild(this.login);
                break;
            case REG_STATE.REG_USER:
                this.page.innerHTML = "";
                this.page.appendChild(this.regUser);
                break;
            case REG_STATE.REG_EXTRA_INFO:
                this.page.innerHTML = "";
                this.page.appendChild(this.regExtraInfo);
                break;
        }
    }

    bindOuterModalClick() {
        this.element
            .querySelector(".modal__box")!
            .addEventListener("click", (event: any) => {
                event._isClickWithInModal = true;
            });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.MODAL_CHANGE,
                data: "close",
            });
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                data: 0,
            });
        });
    }

    bindLoginPage() {
        const usernameInput = <HTMLInputElement>(
            this.login.querySelector("#username")
        );
        const passwordInput = <HTMLInputElement>(
            this.login.querySelector("#password")
        );
        const messageBox = <HTMLElement>this.login.querySelector("#msg");

        usernameInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });

        passwordInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });

        this.login.querySelector("#submit")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.LOGIN,
                data: {
                    username: usernameInput.value,
                    password: passwordInput.value,
                },
            });
        });

        this.login.querySelector("#reg")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                data: "next",
            });
        });

        this.login.querySelector("#close")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.MODAL_CHANGE,
                data: "close",
            });
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                data: 0,
            });
        });
    }

    bindRegUserPage() {
        const usernameInput = <HTMLInputElement>(
            this.regUser.querySelector("#username")
        );
        const emailInput = <HTMLInputElement>(
            this.regUser.querySelector("#email")
        );
        const passwordInput = <HTMLInputElement>(
            this.regUser.querySelector("#password")
        );
        const passwordConfirmInput = <HTMLInputElement>(
            this.regUser.querySelector("#passwordconfirm")
        );
        const messageBox = <HTMLElement>this.regUser.querySelector("#msg");

        usernameInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });
        emailInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });
        passwordInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });
        passwordConfirmInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });

        this.regUser.querySelector("#next")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                data: "next",
            });
        });
        this.regUser.querySelector("#back")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                data: "prev",
            });
        });
        this.regUser.querySelector("#auth")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                data: 0,
            });
        });
        this.regUser.querySelector("#close")!.addEventListener("click", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.MODAL_CHANGE,
                data: "close",
            });
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                data: 0,
            });
        });
    }

    bindRegExtraInfoPage() {
        const birthdayInput = <HTMLInputElement>(
            this.regExtraInfo.querySelector("#birthday")
        );
        const dateInput = <HTMLInputElement>(
            this.regExtraInfo.querySelector("#phone-number")
        );
        const messageBox = <HTMLElement>this.regUser.querySelector("#msg");

        birthdayInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });
        dateInput.addEventListener("input", () => {
            messageBox.innerText = "";
        });

        this.regExtraInfo
            .querySelector("#submit")!
            .addEventListener("click", () => {
                controller.handleEvent({});
            });
        this.regExtraInfo
            .querySelector("#back")!
            .addEventListener("click", () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                    data: "prev",
                });
            });

        this.regExtraInfo
            .querySelector("#close")!
            .addEventListener("click", () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.MODAL_CHANGE,
                    data: "close",
                });
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.REG_STATE_CHANGE,
                    data: 0,
                });
            });
    }
}
