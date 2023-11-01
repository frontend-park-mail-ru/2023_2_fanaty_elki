import { Router } from "../src/controllers/Router/Router";
declare global {
    module "*.hbs";
    module "*.ico";
    module "../public/favicon.ico";
    var router: Router;
}
