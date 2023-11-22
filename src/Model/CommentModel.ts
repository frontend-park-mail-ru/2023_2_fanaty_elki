import { EventDispatcher, Listenable } from "../modules/observer";

export const enum CommentEvent {
    CREATE_COMMENT = "CREATE_COMMENT",
    LOAD_COMMENTS = "LOAD_COMMENTS",
}

export type Comment = {
    Text: string;
    Rating: number;
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

    getComments() {
        return this.comments;
    }

    async setComments(restaurantId: number) {
        this.comments = [
            {
                Username: "shysh",
                Icon: "img/defaultIcon.png",
                Text: "Этот ресторан просто имба",
                Rating: 5,
            },
        ];
        this.events_.notify(CommentEvent.LOAD_COMMENTS);
    }

    async createComment(restaurantId: number, comment: Comment) {
        this.events_.notify(CommentEvent.CREATE_COMMENT);
    }
}
