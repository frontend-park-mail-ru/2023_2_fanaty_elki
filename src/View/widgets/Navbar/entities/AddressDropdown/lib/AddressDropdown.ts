import { VIEW_EVENT_TYPE } from "../../../../../../Controller/Controller";
import { Address } from "../../../../../../Model/UserModel";
import { IHTMLElement } from "../../../../../types";
import addressListTemplate from "../ui/AddressList.hbs";
import dropDownContent from "../ui/DropDownContent.hbs";
import { DropDownElements } from "./config";

export class AddressDropdown extends IHTMLElement {
    private isOpen: boolean;
    private closeCallback;

    constructor() {
        super(dropDownContent(), DropDownElements.ROOT);
        this.closeCallback = null;
        this.isOpen = false;
    }

    update(
        addresses: (Address & { Id: number })[] | undefined,
        current: number,
    ) {
        const addressList = addresses?.map((addr) => ({
            address: addr.Street + ", " + addr.House,
            isMain: +addr.Id === current,
            Id: addr.Id,
        }));
        this.getChild(DropDownElements.CONTENT).innerHTML =
            addressListTemplate(addressList);
        this.getAll(DropDownElements.DDELEMENT).forEach((x) => {
            x.addEventListener("click", () => {
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.ADDRESS_PATCH,
                    data: x.getAttribute("data-id"),
                });
            });
        });
    }

    toggle() {
        if (!this.isOpen) {
            this.closeCallback = (event) => {
                if (!this.element.parentElement!.contains(event.target)) {
                    this.toggle();
                }
            };
            document.addEventListener("click", this.closeCallback);
        } else {
            document.removeEventListener("click", this.closeCallback);
            this.closeCallback = null;
        }
        this.isOpen = !this.isOpen;
        this.element.classList.toggle("disabled");
    }

    bindAddClick(callback) {
        this.getChild(DropDownElements.ADD_BUTTON).addEventListener(
            "click",
            callback,
        );
    }
}
