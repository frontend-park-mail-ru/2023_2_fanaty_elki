import { IWidget } from "../../../types";

import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";

import addressChooserTemplate from "../ui/AddressChooser.hbs";
import suggestsTemplate from "../ui/Suggests.hbs";

import { ISuggestResult } from "yandex-maps";
import { Address, UserEvent } from "../../../../Model/UserModel";
import {
    AddressInputMessages,
    addressChooserConfig,
    addressSelectors,
} from "./config";

export class AddressChooser extends IWidget {
    message: HTMLElement;
    constructor() {
        super(
            addressChooserTemplate(addressChooserConfig),
            addressSelectors.ROOT,
        );
        model.userModel.events.subscribe(this.update.bind(this));
        this.message = this.getChild(addressSelectors.ERROR_MSG);
        this.setMessage(AddressInputMessages.NO_SUGGEST_ERROR);
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
                        this.setMessage(AddressInputMessages.NO_SUGGEST_ERROR);
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
                if (this.value === "") {
                    this.setMessage(AddressInputMessages.DOESNT_FILLED);
                    this.disableForm();
                    return;
                }
                this.geocode();
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
        const address = model.userModel.getAddressText();
        this.value = address ? address : "";
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
                this.enableForm();
            });
        });
    }

    async geocode() {
        const res = await ymaps.geocode(this.value);
        const obj = res.geoObjects.get(0);
        let error: string | undefined;

        if (obj) {
            switch (
                obj.properties.get(
                    "metaDataProperty.GeocoderMetaData.precision",
                )
            ) {
                case "exact":
                    break;
                case "number":
                case "near":
                case "range":
                    error = AddressInputMessages.CLARIFICATION_REQUIRED;
                    break;
                case "street":
                    error = AddressInputMessages.CLARIFICATION_REQUIRED;
                    break;
                case "other":
                default:
                    error = AddressInputMessages.CLARIFICATION_REQUIRED;
            }
        } else {
            error = AddressInputMessages.NO_SUGGEST_ERROR;
        }

        if (error) {
            this.setMessage(error);
            this.disableForm();
            return;
        }
        const address = obj.properties.get(
            "metaDataProperty.GeocoderMetaData.Address.Components",
        );
        const country = address.find((element) => element.kind === "country");
        if (country.name !== "Россия") {
            this.setMessage(AddressInputMessages.NO_SUGGEST_ERROR);
            this.disableForm();
            return;
        }
        const city = address.find((element) => element.kind === "locality");
        const street = address.find((element) => element.kind === "street");
        const house = address.find((element) => element.kind === "house");
        const distinct = address
            .filter((element) => element.kind === "distinct")
            .map((element) => element.name)
            .join(",");
        const separateAddress: Address = {
            City: city.name,
            Street: street ? street.name : distinct,
            House: house.name,
            Flat: 0,
        };
        controller.handleEvent({
            type: VIEW_EVENT_TYPE.ADDRESS_UPDATE,
            data: separateAddress,
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

    setMessage(value: string) {
        this.message.innerText = value;
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
