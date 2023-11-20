import { IWidget } from "../../../types";

import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

import addressChooserTemplate from "../ui/AddressChooser.hbs";
import suggestsTemplate from "../ui/Suggests.hbs";
import "../ui/AddressChooser.scss";

import { ISuggestResult } from "yandex-maps";
import { UserEvent } from "../../../../Model/UserModel";
import { addressChooserConfig, addressSelectors } from "./config";

export class AddressChooser extends IWidget {
    message: HTMLElement;
    constructor() {
        super(
            addressChooserTemplate(addressChooserConfig),
            addressSelectors.ROOT,
        );
        model.userModel.events.subscribe(this.update.bind(this));
        this.message = this.getChild(addressSelectors.ERROR_MSG);
        this.bindEvents();
    }

    private bindEvents() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.close();
            }
        });
        this.getChild(addressSelectors.INPUT_FIELD).addEventListener(
            "input",
            async () => {
                try {
                    const suggests: ISuggestResult[] = await ymaps.suggest(
                        this.value,
                    );
                    if (this.value !== "" && suggests.length === 0) {
                        this.disableForm();
                    } else {
                        this.enableForm();
                    }
                    this.setSuggests(suggests);
                } catch (e) {
                    console.error("Error on get suggests");
                    console.error(e);
                }
            },
        );
        this.getChild(addressSelectors.INPUT_FORM).addEventListener(
            "submit",
            (event) => {
                event.preventDefault();
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.ADDRESS_UPDATE,
                    data: this.value,
                });
            },
        );
        this.getChild(".modal__box").addEventListener("click", (event: any) => {
            event._isClickWithInModal = true;
        });
        this.element.addEventListener("click", (event: any) => {
            if (event._isClickWithInModal) return;
            this.close();
        });
        this.element
            .querySelector("#address-chooser__close")
            ?.addEventListener("click", () => {
                this.close();
            });
    }

    load() {
        this.value = model.userModel.getAddress();
    }

    update(event?: UserEvent) {
        if (event === UserEvent.ADDRESS_CHANGE) {
            this.close();
        }
    }

    setSuggests(suggests: ISuggestResult[]) {
        this.getChild(addressSelectors.SUGGESTS).innerHTML =
            suggestsTemplate(suggests);
        this.getAll(addressSelectors.SUGGEST).forEach((x) => {
            x.addEventListener("click", (event) => {
                this.value = (<HTMLElement>event.currentTarget).querySelector(
                    addressSelectors.SUGGEST_VALUE,
                )!.innerHTML;
                this.getChild(addressSelectors.SUGGESTS).innerHTML = "";
                this.getChild(addressSelectors.INPUT_FIELD).focus();
            });
        });
    }

    open() {
        this.load();
        this.element.classList.add("open");
    }

    close() {
        this.setSuggests([]);
        this.enableForm();
        this.element.classList.remove("open");
    }

    disableForm() {
        this.getChild(addressSelectors.SUBMIT_BUTTON).setAttribute(
            "disabled",
            "true",
        );
        this.message.classList.add("visible");
    }

    enableForm() {
        this.getChild(addressSelectors.SUBMIT_BUTTON).removeAttribute(
            "disabled",
        );
        this.message.classList.remove("visible");
    }

    get value() {
        return (<HTMLInputElement>(
            this.element.querySelector(addressSelectors.INPUT_FIELD)!
        )).value.trim();
    }

    set value(address: string) {
        (<HTMLInputElement>(
            this.element.querySelector(addressSelectors.INPUT_FIELD)!
        )).value = address;
    }
}
