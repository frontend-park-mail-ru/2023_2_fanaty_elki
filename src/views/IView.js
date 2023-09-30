export class IView {
    parent;
    element;

    constructor(parent_) {
        this.parent = parent_;
    }

    render() {
        this.parent.appendChild(this.element);
    }

    clear() {
        this.parent.removeChild(this.element);
    }
}
