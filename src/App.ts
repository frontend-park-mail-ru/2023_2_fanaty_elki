import { Controller } from "./Controller/Controller";
import { Model } from "./Model/Model";
import { View } from "./View/app";

export function start() {
    globalThis.model = new Model();
    globalThis.view = new View();
    globalThis.controller = new Controller();
}
