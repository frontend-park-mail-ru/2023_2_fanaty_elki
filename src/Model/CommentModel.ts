import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export const enum CommentEvent {
    CREATE_COMMENT = "CREATE_COMMENT",
    LOAD_COMMENTS = "LOAD_COMMENTS",
}

export type Comment = {
    Text: string;
    Rating: number;
    Date?: string;
};

export type UserComment = Comment & {
    Username: string;
    Icon: string;
};

export class CommentModel implements Listenable<CommentEvent> {
    private events_: EventDispatcher<CommentEvent>;
    get events() {
        return this.events_;
    }

    private comments: UserComment[];

    constructor() {
        this.events_ = new EventDispatcher<CommentEvent>();
        this.comments = [];
    }

    private presentDate(commentDate: string) {
        const date = new Date(commentDate);

        const fmtDate = (date: number) => {
            return String(date).padStart(2, "0");
        };

        return `${fmtDate(date.getDate())}.${fmtDate(
            date.getMonth() + 1,
        )}.${date.getFullYear()}`;
    }

    getComments() {
        return this.comments;
    }

    async setComments(restaurantId: number) {
        try {
            const comments = await Api.getCommentsByRestaurantId(restaurantId);
            comments.forEach((comment) => {
                comment.Date = this.presentDate(comment.Date);
            });
            this.events_.notify(CommentEvent.LOAD_COMMENTS);
        } catch (e) {
            console.error("Неудалось загрузить отзывы");
            console.error(e);
        }
    }

    async createComment(restaurantId: number, comment: Comment) {
        try {
            await Api.createComment(restaurantId, comment);
            this.events_.notify(CommentEvent.CREATE_COMMENT);
        } catch (e) {
            console.error("Неудалось создать отзыв");
            console.error(e);
        }
    }
}
