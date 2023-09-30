import { IController } from "../IController.js";
import { config } from "../../config.js";

export class EmptyController extends IController {
    constructor(view) {
        super(view);
    }

    show() {
        console.log('show');
    }
    hide() {
        console.log('hide');
    }
}
