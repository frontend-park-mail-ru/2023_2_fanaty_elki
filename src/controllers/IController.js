export class IController {
    view;

    constructor(view_) {
        this.view = view_;
    }

    start() {
        console.log('show');
    }
    
    stop() {
        console.log('hide');
    }
}
