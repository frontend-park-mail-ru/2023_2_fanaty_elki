import { IView } from "../IView.js";

export class LoginView extends IView {

    constructor(parent_) {
        super(parent_);
        this.setDefaultState();
    }

    setDefaultState() {
        const SignUpTemplate = Handlebars.templates['LoginView.hbs'];
        const parser = new DOMParser();
        this.element = parser.parseFromString(SignUpTemplate(), 'text/html').querySelector('#login_form');

        const inputTemplate = Handlebars.templates['FormInput.hbs'];
        const inputGroup = this.element.querySelector(".loginform-inputgroup");
        const inputs = [
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
            }
        ]
        inputs.forEach((element) => {
            inputGroup.innerHTML += inputTemplate(element);
        })

        const buttonTemplate = Handlebars.templates['Button.hbs'];
        const formControl = this.element.querySelector(".loginform-control");
        const buttons = [
            {
                id: "submit",
                text: "Войти",
                style: "primary"
            },
            {
                id: "reg",
                text: "Зарегистрироваться",
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

    bindSignUpClick(handler) {
        this.element.querySelector('#reg').addEventListener('click', event => {
            event.preventDefault();
            handler(event);
        })
    }

    showErrorMessage() {
        this.element.querySelector(".loginform-error-msg").textContent = "Неверный логин или пароль";
    }

    get formData() {
        const form = this.element.querySelector('.loginform-form');
        return {
            username: form.username.value,
            password: form.password.value,
        };
    }
}
