import { Controller, VIEW_EVENT_TYPE } from "./Controller/Controller";
import { Model } from "./Model/Model";
import { View } from "./View/app";

export function start() {
    globalThis.model = new Model();
    globalThis.controller = new Controller();
    globalThis.view = new View();
    controller.handleEvent({
        type: VIEW_EVENT_TYPE.URL_CHANGE,
        data: window.location.pathname,
    });
}
