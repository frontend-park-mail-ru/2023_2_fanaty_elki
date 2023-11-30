import { IHTMLElement } from "../../../../types";
import StatusMessageTemplate from "../ui/StatusMessage.hbs";
import "../ui/StatusMessage.scss";

const ROOT = "#js_status-message";

const stateAttrib = "current-state";
// const timeout = 2000;

const enum States {
    OFFLINE = "OFFLINE",
    BACK_ONLINE = "BACK_ONLINE",
    ONLINE = "ONLINE",
}

export class StatusMessage extends IHTMLElement {
    private goodMessage;
    private badMessage;
    constructor(_goodMessage: string, _badMessage: string) {
        super(StatusMessageTemplate(), ROOT);
        this.goodMessage = _goodMessage;
        this.badMessage = _badMessage;
    }

    changeState(state: boolean) {
        if (state) {
            this.element.innerText = this.goodMessage;
            const current_state = this.element.getAttribute(stateAttrib);
            if (current_state === States.OFFLINE) {
                this.element.setAttribute(stateAttrib, States.BACK_ONLINE);
                // setTimeout(() => {
                //     this.element.setAttribute(stateAttrib, States.ONLINE);
                // }, timeout);
            }
        } else {
            this.element.innerText = this.badMessage;
            this.element.setAttribute(stateAttrib, States.OFFLINE);
        }
    }
}
