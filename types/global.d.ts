import { Router } from "../src/controllers/Router/Router";
import Navbar from "../src/components/Navbar/Navbar";
import UserModel from "../src/models/UserModel/UserModel";
declare global {
    module "*.hbs";
    module "*.ico";
    var router: Router;
    var navbar: Navbar;
    var userModel: UserModel;
    const ymaps;
}
