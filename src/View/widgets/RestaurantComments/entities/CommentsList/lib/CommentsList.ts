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

    constructor() {
        super(commentsList(), "#comments-list");
        this.events_ = new EventDispatcher<UIEvent>();

        this.comments = this.getChild("#comments");
        this.commentButton = this.getChild("#make-comment");
        this.closeButton = this.getChild("#comments-list__close");

        model.commentModel.events.subscribe(this.updateCommentEvent.bind(this));

        this.bindEvents();
    }

    bindEvents() {
        this.commentButton.addEventListener("click", () => {
            this.events.notify({
                type: UIEventType.CMODAL_MAKE_COMMENT_CLICK,
                data: null,
            });
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
}
