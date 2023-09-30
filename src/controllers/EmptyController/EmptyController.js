import { IController } from "../IController.js";
import { config } from "../../config.js";

export class EmptyController extends IController {
    constructor(view) {
        super(view);
    }

    start() {
        console.log('show');
    }
    stop() {
        console.log('hide');
    }
}
