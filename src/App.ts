import { Controller } from "./Controller/Controller";
import { Model } from "./Model/Model";
import { View } from "./View/app";

export function start() {
    globalThis.model = new Model();
    globalThis.controller = new Controller();
    globalThis.view = new View();
}
