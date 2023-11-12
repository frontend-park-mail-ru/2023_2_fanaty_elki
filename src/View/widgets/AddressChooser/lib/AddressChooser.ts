import { IWidget } from "../../../types";

import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

import addressChooserTemplate from "../ui/AddressChooser.hbs";
import suggestsTemplate from "../ui/Suggests.hbs";
import "../ui/AddressChooser.scss";

import { ISuggestResult } from "yandex-maps";
import { UserEvent } from "../../../../Model/UserModel";

async function getSuggests(word: string) {
    const suggests = await ymaps.suggest(word);
    return suggests;
}

export class AddressChooser extends IWidget {
    constructor(address_ph: string) {
        super(addressChooserTemplate(), "#address-chooser");
        (<HTMLInputElement>(
            this.element.querySelector("#address-value")!
        )).setAttribute("placeholder", address_ph);
        model.userModel.events.subscribe(this.update.bind(this));
        this.bindEvents();
    }

    private bindEvents() {
        // window.addEventListener("keydown", (e) => {
        //     if (e.key === "Escape") {
        //         this.modal.classList.remove("open");
        //     }
        // });
        // this.element.querySelector("#close")!.addEventListener("click", () => {
        //     this.close();
        // });
        this.element
            .querySelector("#address-value")!
            .addEventListener("input", async (event) => {
                try {
                    const input = (<HTMLInputElement>event.target).value;
                    const suggests = await getSuggests(input);
                    this.setSuggests(suggests);
                } catch {
                    console.log("error on get suggests");
                }
            });
        this.element
            .querySelector("#choose-address")!
            .addEventListener("click", () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.ADDRESS_UPDATE,
                    data: this.value,
                });
            });
        this.element
            .querySelector(".modal__box")!
            .addEventListener("click", (event: any) => {
                event._isClickWithInModal = true;
            });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            this.close();
        });
    }

    load() {
        this.value = model.userModel.getAddress();
    }

    update(event?: UserEvent) {
        if (event === UserEvent.ADDRESS_CHANGE) {
            this.value = model.userModel.getAddress();
            this.close();
        }
    }

    setSuggests(suggests: ISuggestResult[]) {
        this.element.querySelector(".suggest-container")!.innerHTML =
            suggestsTemplate(suggests);
        this.element.querySelectorAll(".suggest")!.forEach((x) => {
            x.addEventListener("click", (event) => {
                this.value = (<HTMLElement>event.currentTarget).querySelector(
                    ".value",
                )!.innerHTML;
                this.element.querySelector(".suggest-container")!.innerHTML =
                    "";
            });
        });
    }

    open() {
        this.element.classList.add("open");
    }

    close() {
        this.element.classList.remove("open");
    }

    get value() {
        return (<HTMLInputElement>this.element.querySelector("#address-value")!)
            .value;
    }

    set value(address: string) {
        (<HTMLInputElement>(
            this.element.querySelector("#address-value")!
        )).value = address;
    }
}
