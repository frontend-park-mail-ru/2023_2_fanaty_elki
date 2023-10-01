import { IView } from "../IView.js";

export class SignUpView extends IView {

    constructor(parent_) {
        super(parent_);
        const SignUpTemplate = Handlebars.templates['SignUpView.hbs'];
        const parser = new DOMParser();
        this.element = parser.parseFromString(SignUpTemplate(), 'text/html').querySelector('#regform');
        if (!this.element) return;
    }

    bindSubmitHandler(handler) {
        this.element.querySelector('.regform-submit').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    bindLoginClick(handler) {
        this.element.querySelector('.regform-auth').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    get formData() {
        const form = this.element.querySelector('.regform-form');
        return {
            name: form.username.value,
            email: form.email.value,
            password: form.password.value,
        };
    }
}
