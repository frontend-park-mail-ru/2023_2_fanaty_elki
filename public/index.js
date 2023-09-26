import {Navbar} from './components/Navbar/navbar.js';

const rootElement = document.querySelector('#root');
const a = 1;

const config = {
    navbar : {
        search_ph: "Find food",
        address: "Измайловский проспект",
    }
};

const navbar = new Navbar(rootElement, config.navbar);
navbar.render();
