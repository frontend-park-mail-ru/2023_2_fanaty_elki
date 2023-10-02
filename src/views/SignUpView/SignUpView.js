import { IView } from "../IView.js";

export class SignUpView extends IView {

    constructor(parent_) {
        super(parent_);
        this.setDefaultState();
    }

    setDefaultState() {
        const SignUpTemplate = Handlebars.templates['SignUpView.hbs'];
        const parser = new DOMParser();
        this.element = parser.parseFromString(SignUpTemplate(), 'text/html').querySelector('#signup');

        const inputTemplate = Handlebars.templates['FormInput.hbs'];
        const inputGroup = this.element.querySelector('.signup-inputgroup');
        const inputs = [
            {
                name: "email",
                type: "email",
                placeholder: "email",
                style: "default"
            },
            {
                name: "username",
                type: "text",
                placeholder: "имя пользователя",
                style: "default"
            },
            {
                name: "password",
                type: "password",
                placeholder: "пароль",
                style: "default"
            },
            {
                name: "passwordconfirm",
                type: "password",
                placeholder: "повторите пароль",
                style: "default"
            }
        ]
        inputs.forEach((element) => {
            inputGroup.innerHTML += inputTemplate(element);
        })

        const buttonTemplate = Handlebars.templates['Button.hbs'];
        const formControl = this.element.querySelector('.signup-control');
        const buttons = [
            {
                id: "submit",
                text: "Зарегистрироваться",
                style: "primary"
            },
            {
                id: "auth",
                text: "Уже есть аккаунт?",
                style: "secondary"
            }
        ]
        buttons.forEach((element) => {
            formControl.innerHTML += buttonTemplate(element);
        })

        if (!this.element) return;
    }

    clearState() {
        this.element.innerHTML = "";
    }

    bindSubmitHandler(handler) {
        this.element.querySelector('#submit').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    bindLoginClick(handler) {
        this.element.querySelector('#auth').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    handleFormValidation(errors) {
        const inputWithMsg = Handlebars.templates["FormInputWithMsg.hbs"];

        errors.forEach((error) => {
            const inputToReplace = this.element.querySelector(`#${error.field}`);

            const placeholder = document.createElement("div");
            placeholder.innerHTML = inputWithMsg({
                style: "error",
                type: inputToReplace.type,
                name: inputToReplace.name,
                placeholder: inputToReplace.placeholder,
                value: inputToReplace.value,
                message: error.message
            })
            const newInput = placeholder.firstChild;

            inputToReplace.replaceWith(newInput);
        })

    }

    get formData() {
        const form = this.element.querySelector('.signup-form');
        return {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
            passwordConfirm: form.passwordconfirm.value
        };
    }
}
