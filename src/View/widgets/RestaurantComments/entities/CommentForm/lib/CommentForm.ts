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
    private errorMsg: HTMLElement;

    constructor() {
        super(commentForm(), "#comment-from");
        this.events_ = new EventDispatcher<UIEvent>();

        this.backButton = this.getChild("#comment-form__back");
        this.closeButton = this.getChild("#comment-form__close");
        this.errorMsg = this.getChild("#comment-form__error");

        this.bindEvents();
    }

    bindEvents() {
        this.backButton.addEventListener("click", () => {
            this.events.notify({
                type: UIEventType.CMODAL_BACK_CLICK,
                data: null,
            });
        });
        this.closeButton.addEventListener("click", () => {
            this.events_.notify({
                type: UIEventType.CMODAL_CLOSE_CLICK,
                data: null,
            });
        });
        this.element.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            const formData = new FormData(this.element as HTMLFormElement);
            const rating = parseInt(formData.get("rating") as string);
            const text = formData.get("comment") as string;

            if (!rating) {
                this.errorMsg.innerText = "Поставьте оценку";
            } else {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.CREATE_COMMENT,
                    data: {
                        rating,
                        text,
                    },
                });
            }
        });
    }

    clearField() {
        this.getAll("input[type=radio]").forEach((radio) => {
            (<HTMLInputElement>radio).checked = false;
        });
        (<HTMLInputElement>this.getChild("#comment")).value = "";
        this.errorMsg.innerText = "";
    }
}
