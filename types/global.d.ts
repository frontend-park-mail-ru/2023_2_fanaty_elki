import { Router } from "../src/controllers/Router/Router";
import Navbar from "../src/views/Navbar";
declare global {
    module "*.hbs";
    module "*.ico";
    var router: Router;
    var navbar: Navbar;
}
