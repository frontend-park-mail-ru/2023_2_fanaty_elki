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
    private stars: NodeListOf<HTMLElement>;

    constructor() {
        super(commentForm(), "#comment-from");
        this.events_ = new EventDispatcher<UIEvent>();

        this.backButton = this.getChild("#comments-list__back");
        this.closeButton = this.getChild("#comments-list__close");

        this.stars = this.getAll(
            ".restaurant-comments__comment-form__rating__stars__star",
        );

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
        this.element.addEventListener("submit", () => {
            const formData = new FormData(this.element as HTMLFormElement);
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.CREATE_COMMENT,
                data: {
                    rating: parseInt(formData.get("rating") as string),
                    text: formData.get("comment"),
                },
            });
        });
    }

    clearField() {
        this.getAll("input[type=radio]").forEach((radio) => {
            (<HTMLInputElement>radio).checked = false;
        });
        (<HTMLInputElement>this.getChild("#comment")).value = "";
    }
}
