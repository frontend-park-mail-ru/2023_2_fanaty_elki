import inputTemplate from "./Input.hbs";
import "./Input.scss";

export function createInput(
    type: string,
    name: string,
    placeholder: string,
    autocomplete: string,
): HTMLElement {
    const tmp = document.createElement("div");
    tmp.innerHTML = inputTemplate({ type, name, placeholder, autocomplete });
    return tmp.firstChild as HTMLElement;
}
