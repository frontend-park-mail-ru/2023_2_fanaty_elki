export interface IObserver<Event> {
    update(event?: Event): void;
}

export class IObservable<Event> {
    observers: IObserver<Event>[];

    constructor() {
        this.observers = [];
    }

    addObserver(observer: IObserver<Event>) {
        this.observers.push(observer);
    }

    removeObserver(observer: IObserver<Event>) {
        const obsInd = this.observers.findIndex((obs: IObserver<Event>) => {
            return obs === observer;
        });
        this.observers.splice(obsInd, obsInd);
    }

    notifyObservers(event?: Event) {
        this.observers.forEach((observer: IObserver<Event>) => {
            observer.update(event);
        });
    }
}

export type Handler<Event> = (event?: Event) => void;

export interface Listenable<Event> {
    get events(): EventDispatcher<Event>;
}
export class EventDispatcher<Event> {
    callbacks: Set<Handler<Event>>;

    constructor() {
        this.callbacks = new Set<Handler<Event>>();
    }

    subscribe(callback: Handler<Event>) {
        this.callbacks.add(callback);
    }

    remove(callback: Handler<Event>) {
        this.callbacks.delete(callback);
    }

    notify(event?: Event) {
        for (const cb of this.callbacks) {
            cb(event);
        }
    }
}
