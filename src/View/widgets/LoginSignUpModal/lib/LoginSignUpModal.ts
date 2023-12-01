import { IWidget } from "../../../types";

import loginSignUpModalTemplate from "../ui/LoginSignUpModal.hbs";

import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { LoginPage } from "../entities/LoginPage";
import { RegUserPage } from "../entities/RegUserPage";
import { RegExtraInfoPage } from "../entities/RegExtraInfoPage";

export class LoginSignUpModal extends IWidget implements Listenable<UIEvent> {
    private page: HTMLElement;

    private loginPage: LoginPage;
    private regUserPage: RegUserPage;
    private regExtraInfoPage: RegExtraInfoPage;

    private currentPage: number;

    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(loginSignUpModalTemplate(), ".modal");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.updateUserEvent.bind(this));

        this.loginPage = new LoginPage();
        this.regUserPage = new RegUserPage();
        this.regExtraInfoPage = new RegExtraInfoPage();

        this.loginPage.events.subscribe(this.updateUIEvent.bind(this));
        this.regUserPage.events.subscribe(this.updateUIEvent.bind(this));
        this.regExtraInfoPage.events.subscribe(this.updateUIEvent.bind(this));

        this.page = <HTMLElement>this.element.querySelector("#login");
        this.setLoginPage();

        this.bindEvents();
    }

    updateUserEvent() {
        if (model.userModel.getUser()) {
            this.close();
        }
    }

    updateUIEvent(event?: UIEvent) {
        if (!event) return;
        switch (event!.type) {
            case UIEventType.LMODAL_SIGNUP_CLICK:
                this.clearInputs();
                this.clearMessages();
                this.setRegUserPage();
                break;
            case UIEventType.LMODAL_CLOSE_CLICK:
                this.close();
                break;
            case UIEventType.LMODAL_AUTH_CLICK:
                this.clearInputs();
                this.clearMessages();
                this.setLoginPage();
                break;
            case UIEventType.LMODAL_BACK_CLICK:
                this.setRegUserPage();
                break;
            case UIEventType.LMODAL_NEXT_CLICK:
                this.setRegExtraInfoPage();
                break;
            case UIEventType.LMODAL_REG_CLICK:
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.REGISTRATION,
                    data: {
                        Email: this.regUserPage.getEmail(),
                        Username: this.regUserPage.getUsername(),
                        Password: this.regUserPage.getPassword(),
                        Birthday: this.regExtraInfoPage.getBirthday(),
                        PhoneNumber: this.regExtraInfoPage.getPhoneNumber(),
                        Icon: "img/defaultIcon.png",
                    },
                });
                break;
        }
    }

    bindEvents() {
        this.element
            .querySelector(".modal__box")!
            .addEventListener("click", (event: any) => {
                event._isClickWithInModal = true;
            });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            this.close();
            this.clearInputs();
            this.clearMessages();
        });
    }

    open() {
        this.element.classList.add("open");
    }

    close() {
        this.element.classList.remove("open");
        setTimeout(() => {
            this.clearInputs();
            this.clearMessages();
            this.setLoginPage();
        }, 200);
    }

    clearInputs() {
        this.loginPage.clearInputs();
        this.regUserPage.clearInputs();
        this.regExtraInfoPage.clearInputs();
    }

    clearMessages() {
        this.loginPage.clearMessage();
        this.regUserPage.clearMessage();
        this.regExtraInfoPage.clearMessage();
    }

    setLoginPage() {
        this.page.innerHTML = "";
        this.page.appendChild(this.loginPage.element);
    }

    setRegUserPage() {
        this.page.innerHTML = "";
        this.page.appendChild(this.regUserPage.element);
    }

    setRegExtraInfoPage() {
        this.page.innerHTML = "";
        this.page.appendChild(this.regExtraInfoPage.element);
    }
}
