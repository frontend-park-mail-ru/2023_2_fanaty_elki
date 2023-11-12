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

        this.submitButton = <HTMLElement>this.element.querySelector("#submit");
        this.registrationButton = <HTMLElement>(
            this.element.querySelector("#reg")
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

        // this.bindSubmitClick();
        // this.bindRegistrationButtonClick();
        // this.bindCloseClick();
        // this.bindOuterModalClick();
    }

    open() {
        this.element.classList.add("open");
    }

    close() {
        this.element.classList.remove("open");
    }

    update() {
        // if (model.userModel.getErrorMsg()) {
        //     this.messageBox.innerText = model.userModel.getErrorMsg() as string;
        // }
        // if (model.modalModel.getIsOpened()) {
        //     this.element.classList.add("open");
        // } else {
        //     this.element.classList.remove("open");
        // }
    }

    // bindUsernameInput() {
    //     this.usernameInput.addEventListener("input", () => {
    //         this.messageBox.innerText = "";
    //     });
    // }

    // bindPasswordInput() {
    //     this.passwordInput.addEventListener("input", () => {
    //         this.messageBox.innerText = "";
    //     });
    // }

    // bindSubmitClick() {
    //     this.submitButton.addEventListener("click", () => {
    //         controller.handleEvent({
    //             type: VIEW_EVENT_TYPE.LOGIN,
    //             data: {
    //                 username: this.usernameInput.value,
    //                 password: this.passwordInput.value,
    //             },
    //         });
    //     });
    // }

    // bindRegistrationButtonClick() {
    //     this.registrationButton.addEventListener("click", () => {
    //         controller.handleEvent({
    //             type: VIEW_EVENT_TYPE.MODAL_CHANGE,
    //             data: "close",
    //         });
    //     });
    // }

    // bindCloseClick() {
    //     this.element.querySelector("#close")!.addEventListener("click", () => {
    //         controller.handleEvent({
    //             type: VIEW_EVENT_TYPE.MODAL_CHANGE,
    //             data: "close",
    //         });
    //     });
    // }

    // bindOuterModalClick() {
    //     this.element
    //         .querySelector(".modal__box")!
    //         .addEventListener("click", (event: any) => {
    //             event._isClickWithInModal = true;
    //         });
    //     this.element.addEventListener("click", (event: any) => {
    //         if (event._isClickWithInModal) return;
    //         controller.handleEvent({
    //             type: VIEW_EVENT_TYPE.MODAL_CHANGE,
    //             data: "close",
    //         });
    //     });
    // }
}
