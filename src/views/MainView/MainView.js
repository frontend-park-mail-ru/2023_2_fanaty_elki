import { IView } from "../IView.js";

export class MainView extends IView {
    root;
    navbar;
    categories;
    navbarTemplate;
    categoryTemplate;

    constructor (parent_) {
        super(parent_);
        const MainTemplate = Handlebars.templates['MainView.hbs'];
        const parser = new DOMParser();
        this.root = parser.parseFromString(MainTemplate(), 'text/html').querySelector('#main');
        if (!root) return;
        this.navbar = this.root.querySelector('#navbar');
        this.categories = this.root.querySelector('#categories');
        this.parent.appendChild(this.root);

        const cardTemplate = Handlebars.templates['card.hbs'];
        Handlebars.registerPartial('cardTemplate', cardTemplate);
        this.navbarTemplate = Handlebars.templates['navbar.hbs'];
        this.categoryTemplate = Handlebars.templates['category.hbs'];
    }

    render(context) {
        this.navbar.innerHTML = this.navbarTemplate(context); 
        this.categories.innerHTML = this.categoryTemplate(context);
    }

    bindAddressClick(handler) {
        this.root.querySelector('.address').addEventListener('click', handler);
    }

    clear() {
        this.parent.removeChild(this.root);
    }
}
