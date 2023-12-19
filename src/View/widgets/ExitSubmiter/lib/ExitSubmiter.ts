import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { UIEvent } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";

import exitSubmiterTemplate from "../ui/ExitSubmiter.hbs";

export class ExitSubmiter extends IWidget implements Listenable<UIEvent> {
    private events_: EventDispatcher<UIEvent>;
    get events() {
        return this.events_;
    }

    private form: HTMLElement;
    private closeBtn: HTMLElement;

    constructor() {
        super(exitSubmiterTemplate(), "#exit-submiter");
        this.events_ = new EventDispatcher<UIEvent>();

        this.form = this.getChild("#exit-submiter__form");
        this.closeBtn = this.getChild("#exit-submiter__close");

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.close();
            }
        });

        this.getChild(".modal__box").addEventListener("click", (event: any) => {
            event._isClickWithInModal = true;
        });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            this.close();
        });

        this.closeBtn.addEventListener("click", () => {
            this.close();
        });

        this.form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            controller.handleEvent({
                type: VIEW_EVENT_TYPE.LOGOUT,
                data: null,
            });
            this.close();
        });
    }

    open() {
        this.element.classList.add("open");
    }

    close() {
        this.element.classList.remove("open");
    }
}
