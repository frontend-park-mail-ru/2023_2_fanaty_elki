import { IHTMLElement } from "../../../../types";
import NotificationTemplate from "../ui/Notification.hbs";
import ContainerTemplate from "../ui/Container.hbs";
import "../ui/Notification.scss";

const ROOT = "#js_notification-container";
const NOTIFICATION_ROOT = ".js_notification";

const stateAttrib = "current-state";
const liveTime = 2000;
const animationTime = 1000;

const enum States {
    DISABLED = "DISABLED",
    ACTIVE = "ACTIVE",
}

export const enum Value {
    ERROR = "error-notification",
    EVENT = "event-notification",
    NOTHING = "nothing-notification",
}

class Notification extends IHTMLElement {
    constructor(message: string, value: Value) {
        super(
            NotificationTemplate({ message: message, value: value }),
            NOTIFICATION_ROOT,
        );
    }
}

export class Notifier extends IHTMLElement {
    private count;
    constructor() {
        super(ContainerTemplate(), ROOT);
        this.count = 0;
    }

    show(message: string, value: Value) {
        const notification = new Notification(message, value);
        this.element.prepend(notification.element);
        setTimeout(() => {
            notification.element.setAttribute(stateAttrib, States.DISABLED);
            setTimeout(() => {
                notification.element.parentElement?.removeChild(
                    notification.element,
                );
            }, animationTime);
        }, liveTime);
    }
}
