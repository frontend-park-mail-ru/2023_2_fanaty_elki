import { config } from "../../config.js";
import { IView } from "../IView.js";

export class MainView extends IView {
    navbarTemplate;
    categoryTemplate;

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
    }

    setAuthUser(userId){
        this.element.querySelector('.address_title').innerHTML = userId;
        this.element.querySelector('.person').setAttribute('hidden', 'hidden');
    }

    setNonAuthUser() {
        this.element.querySelector('.address_title').innerHTML = config.navbar.address;
        this.element.querySelector('.person').removeAttribute('hidden');
    }

    bindBacketClick(handler) {
        this.element.querySelector('.backet').addEventListener('click', handler);
    }

    bindAddressClick(handler) {
        this.element.querySelector('.address').addEventListener('click', handler);
    }

    bindPersonClick(handler) {
        console.log(this.element)
        this.element.querySelector('.person').addEventListener('click', handler);
    }


    // bindFormSubmit(handler) {
    //     this.element.querySelector('#signup').querySelector('.submit').addEventListener('click', event => {
    //         event.preventDefault();
    //         handler(event);
    //     })
    // }

    // get signup_data() {
    //     const data = this.element.querySelector('#signup');
    //     return {
    //         name: data.name.value,
    //         login: data.login.value,
    //         password: data.password.value,
    //         email: data.email.value
    //     };
    // }

}
