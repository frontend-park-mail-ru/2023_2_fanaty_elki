import { VIEW_EVENT_TYPE } from "../../../../../../Controller/Controller";
import { UIEvent, UIEventType } from "../../../../../../config";
import {
    EventDispatcher,
    Listenable,
} from "../../../../../../modules/observer";
import { IHTMLElement } from "../../../../../types";

import commentForm from "../ui/CommentForm.hbs";

export class CommentForm extends IHTMLElement implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private backButton: HTMLElement;
    private closeButton: HTMLElement;

    constructor() {
        super(commentForm(), "#comment-from");
        this.events_ = new EventDispatcher<UIEvent>();

        this.backButton = this.getChild("#comments-list__back");
        this.closeButton = this.getChild("#comments-list__close");

        this.bindEvents();
    }

    bindEvents() {
        this.backButton.addEventListener("click", () => {
            this.events.notify({
                type: UIEventType.CMODAL_BACK_CLICK,
                data: null,
            });
        });
        this.element.addEventListener("submit", () => {
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.CREATE_COMMENT,
                data: {
                    // И тут магическим образом надо подтянуть данные рейтинга и id ресторана
                }
            })
        })
    }
}
