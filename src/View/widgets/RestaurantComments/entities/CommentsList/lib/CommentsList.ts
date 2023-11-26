import { CommentEvent } from "../../../../../../Model/CommentModel";
import { UIEvent, UIEventType } from "../../../../../../config";
import {
    EventDispatcher,
    Listenable,
} from "../../../../../../modules/observer";
import { IHTMLElement } from "../../../../../types";

import commentsList from "../ui/CommentsList.hbs";
import commentsListTemplate from "../ui/CommentsListTemplate.hbs";

export class CommentsList extends IHTMLElement implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private comments: HTMLElement;
    private commentButton: HTMLElement;
    private closeButton: HTMLElement;
    private errorMsg: HTMLElement;

    constructor() {
        super(commentsList(), "#comments-list");
        this.events_ = new EventDispatcher<UIEvent>();

        this.comments = this.getChild("#comments");
        this.commentButton = this.getChild("#make-comment");
        this.closeButton = this.getChild("#comments-list__close");
        this.errorMsg = this.getChild("#comments-list__error");

        model.commentModel.events.subscribe(this.updateCommentEvent.bind(this));

        this.bindEvents();
    }

    bindEvents() {
        this.commentButton.addEventListener("click", () => {
            if (model.userModel.getUser()) {
                this.events.notify({
                    type: UIEventType.CMODAL_MAKE_COMMENT_CLICK,
                    data: null,
                });
            } else {
                this.errorMsg.innerText =
                    "Комментарии могут оставлять авторизированные пользователи";
            }
        });
        this.closeButton.addEventListener("click", () => {
            this.events.notify({
                type: UIEventType.CMODAL_CLOSE_CLICK,
                data: null,
            });
        });
    }

    updateCommentEvent(event?: CommentEvent) {
        if (event == CommentEvent.LOAD_COMMENTS) {
            const comments = model.commentModel.getComments();
            this.comments.innerHTML = commentsListTemplate(comments);
        }
    }

    clearFields() {
        this.errorMsg.innerText = "";
    }
}
