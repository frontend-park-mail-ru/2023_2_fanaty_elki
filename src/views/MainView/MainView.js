import { config } from "../../config.js";
import { IView } from "../IView.js";

export class MainView extends IView {
    userNameElement;
    signInButton;

    constructor(parent_) {
        super(parent_);
        const MainTemplate = Handlebars.templates['MainView.hbs'];
        const parser = new DOMParser();
        this.element = parser.parseFromString(MainTemplate(), 'text/html').querySelector('#main');
        if (!this.element) return;

        const cardTemplate = Handlebars.templates['card.hbs'];
        Handlebars.registerPartial('cardTemplate', cardTemplate);
        this.navbarTemplate = Handlebars.templates['navbar.hbs'];
        this.categoryTemplate = Handlebars.templates['category.hbs'];
        this.element.querySelector('#navbar').innerHTML = this.navbarTemplate();
        this.element.querySelector('#categories').innerHTML = this.categoryTemplate();
        this.element.querySelector('.address_title').innerHTML = config.navbar.address;
        this.userNameElement = this.element.querySelector('.name_container');
        this.signInButton = this.element.querySelector('.signin');
    }

    updateList(list) {
        this.element.querySelector('#categories').innerHTML = this.categoryTemplate(list);
    }

    setAuthUser(userName) {
        this.userNameElement.firstElementChild.innerHTML = userName;
        this.signInButton.parentNode.appendChild(this.userNameElement);
        this.signInButton.parentNode.removeChild(this.signInButton);
    }

    setNonAuthUser() {
        this.userNameElement.parentNode.appendChild(this.signInButton);
        this.userNameElement.parentNode.removeChild(this.userNameElement);
    }

    bindExitClick(handler) {
        this.element.querySelector('.exit').addEventListener('click', handler);
    }

    bindAddressClick(handler) {
        this.element.querySelector('.address').addEventListener('click', handler);
    }

    bindPersonClick(handler) {
        this.element.querySelector('.signin').addEventListener('click', handler);
    }

}
