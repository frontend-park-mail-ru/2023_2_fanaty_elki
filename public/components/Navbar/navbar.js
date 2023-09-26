export class Navbar {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    get config() {
        return this.#config;
    }

    render() {
        const template = Handlebars.templates['navbar.hbs'];
        this.#parent.innerHTML = template(this.#config);
    }
}
