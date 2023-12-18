export const addressChooserConfig = {
    title: "Укажите адрес доставки",
    input_ph: "Введите адрес",
    button_text: "OK",
};

export enum AddressInputMessages {
    NO_SUGGEST_ERROR = "Приносим свои извинения, но мы не можем доставить заказ сюда",
    CLARIFICATION_REQUIRED = "Неточный адрес, требуется уточнение",
    DOESNT_FILLED = "Зполните поле адреса",
}

export enum addressSelectors {
    ROOT = "#address-chooser",
    ERROR_MSG = ".js_address-chooser__error_msg",
    INPUT_FIELD = "#address-value",
    INPUT_FORM = ".address-chooser__form",
    SUGGEST_VALUE = ".suggest-value",
    SUGGEST = ".suggest",
    SUGGESTS = ".suggest-container",
    SUBMIT_BUTTON = ".address-chooser__control",
}
