import { Controller } from "../src/Controller/Controller";
import { Model } from "../src/Model/Model";
import { View } from "../src/View/app";

declare global {
    module "*.hbs";
    module "*.ico";
    var model: Model;
    var view: View;
    var controller: Controller;
    const ymaps;
}
