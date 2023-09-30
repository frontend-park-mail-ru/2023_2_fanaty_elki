import { IView } from "../IView.js";

export class MainView extends IView {
    navbarTemplate;
    categoryTemplate;

    constructor (parent_) {
        super(parent_);
        const MainTemplate = Handlebars.templates['MainView.hbs'];
        const parser = new DOMParser();
        this.element = parser.parseFromString(MainTemplate(), 'text/html').querySelector('#main');
        if (!this.element) return;

        const cardTemplate = Handlebars.templates['card.hbs'];
        Handlebars.registerPartial('cardTemplate', cardTemplate);
        this.navbarTemplate = Handlebars.templates['navbar.hbs'];
        this.categoryTemplate = Handlebars.templates['category.hbs'];
    }
    
    update(context) {
        this.element.querySelector('#navbar').innerHTML = this.navbarTemplate(context); 
        this.element.querySelector('#categories').innerHTML = this.categoryTemplate(context);
    }

    bindAddressClick(handler) {
        this.element.querySelector('.address').addEventListener('click', handler);
    }

}
