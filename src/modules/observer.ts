export interface IObserver {
    update(): void;
}

export class IObservable {
    observers: IObserver[];

    constructor() {
        this.observers = [];
    }

    addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    removeObserver(observer: IObserver) {
        const obsInd = this.observers.findIndex((obs: IObserver) => {
            return obs === observer;
        });
        this.observers.splice(obsInd, obsInd);
    }

    notifyObservers() {
        this.observers.forEach((observer: IObserver) => {
            observer.update();
        });
    }
}
