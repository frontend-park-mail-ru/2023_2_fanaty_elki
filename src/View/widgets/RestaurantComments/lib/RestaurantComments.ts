import { CommentEvent } from "../../../../Model/CommentModel";
import { RestaurantEvent } from "../../../../Model/RestaurantModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";
import { CommentForm } from "../entities/CommentForm";
import { CommentsList } from "../entities/CommentsList";

import restaurantCommentsTemplate from "../ui/RestaurantComments.hbs";
import "../ui/RestaurantComments.scss";

export class RestaurantComments extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private pageContainer: HTMLElement;

    private commentsList: CommentsList;
    private commentForm: CommentForm;

    constructor() {
        super(restaurantCommentsTemplate(), "#restaurant-comment");
        this.events_ = new EventDispatcher<UIEvent>();

        this.pageContainer = this.getChild("#page-container");

        this.commentsList = new CommentsList();
        this.commentForm = new CommentForm();

        this.commentsList.events.subscribe(this.updateUIEvent.bind(this));
        this.commentForm.events.subscribe(this.updateUIEvent.bind(this));

        model.commentModel.events.subscribe(this.updateCommentEvent.bind(this));

        this.setCommentsList();

        this.bindEvents();
    }

    bindEvents() {
        this.element
            .querySelector(".modal__box")!
            .addEventListener("click", (event: any) => {
                event._isClickWithInModal = true;
            });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            event.currentTarget!.classList.remove("open");
        });
    }

    updateUIEvent(event?: UIEvent) {
        if (!event) return;
        switch (event!.type) {
            case UIEventType.CMODAL_CLOSE_CLICK:
                this.close();
                break;
            case UIEventType.CMODAL_MAKE_COMMENT_CLICK:
                this.setCommentForm();
                break;
            case UIEventType.CMODAL_BACK_CLICK:
                this.setCommentsList();
                break;
        }
    }

    

    updateCommentEvent(event?: CommentEvent) {
        if (event == CommentEvent.CREATE_COMMENT) {
            this.setCommentsList();
        }
    }

    setCommentsList() {
        this.pageContainer.innerHTML = "";
        this.pageContainer.appendChild(this.commentsList.element);
    }

    setCommentForm() {
        this.pageContainer.innerHTML = "";
        this.pageContainer.appendChild(this.commentForm.element);
    }

    open() {
        this.element.classList.add("open");
    }

    close() {
        this.element.classList.remove("open");
    }
}
