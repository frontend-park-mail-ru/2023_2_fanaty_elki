import { IView } from "../IView.js";

export class LoginView extends IView {

    constructor(parent_) {
        super(parent_);
        const SignUpTemplate = Handlebars.templates['LoginView.hbs'];
        const parser = new DOMParser();
        this.element = parser.parseFromString(SignUpTemplate(), 'text/html').querySelector('#login_form');
        if (!this.element) return;
    }

    bindSubmitHandler(handler) {
        this.element.querySelector('.loginform-submit').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    bindSignUpClick(handler) {
        this.element.querySelector('.loginform-auth').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    get formData() {
        const form = this.element.querySelector('.loginform-form');
        return {
            name: form.username.value,
            password: form.password.value,
        };
    }
}
