import buttonTemplate from "./Button.hbs";
import "./Button.scss";

export function createButton(
    style: string,
    id: number,
    text: string,
): HTMLElement {
    const tmp = document.createElement("div");
    tmp.innerHTML = buttonTemplate({ style, id, text });
    return tmp.firstChild as HTMLElement;
}
