import { EventDispatcher, Listenable } from "../modules/observer";

export enum AppEvent {
    OFFLINE = "OFFLINE",
    ONLINE = "ONLINE",
}

export class AppModel implements Listenable<AppEvent> {
    private events_: EventDispatcher<AppEvent>;
    get events(): EventDispatcher<AppEvent> {
        return this.events_;
    }
    private status: boolean;
    constructor() {
        this.events_ = new EventDispatcher<AppEvent>();

        this.status = navigator.onLine;
        window.addEventListener("online", this.updateOnlineStatus.bind(this));
        window.addEventListener("offline", this.updateOnlineStatus.bind(this));
    }

    isOnline() {
        return this.status;
    }

    updateOnlineStatus() {
        this.status = navigator.onLine;
        this.events_.notify(this.status ? AppEvent.ONLINE : AppEvent.OFFLINE);
    }
}
