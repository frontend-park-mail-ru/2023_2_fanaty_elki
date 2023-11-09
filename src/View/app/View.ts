import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";

export function initiateView() {
    const root = <HTMLElement>document.querySelector("#root")!;
    const mainPage = new MainPage();
    const routes = new Map<string, Page>([
        [ROUTES.main, mainPage],
        [ROUTES.default, mainPage],
    ]);
    new Router(routes, root);
}
