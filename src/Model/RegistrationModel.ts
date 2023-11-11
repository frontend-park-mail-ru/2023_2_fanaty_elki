import { IObservable } from "../modules/observer";

export enum REG_STATE {
    LOGIN = 1,
    REG_USER = 2,
    REG_EXTRA_INFO = 3,
}

export class RegistrationModel extends IObservable {
    private regStates: REG_STATE[];
    private currentState: number;

    constructor() {
        super();

        this.regStates = [
            REG_STATE.LOGIN,
            REG_STATE.REG_USER,
            REG_STATE.REG_EXTRA_INFO,
        ];
        this.currentState = 0;
    }

    getRegState(): REG_STATE {
        return this.regStates[this.currentState];
    }

    setNextState() {
        this.currentState++;
        this.notifyObservers();
    }

    setPrevState() {
        this.currentState--;
        this.notifyObservers();
    }

    setState(state: number) {
        this.currentState = state;
        this.notifyObservers();
    }
}
