export const addressChooserConfig = {
    title: "Укажите адрес доставки",
    input_ph: "Введите адрес",
    error_message:
        "Приносим свои извинения, но мы не можем доставить заказ сюда",
    button_text: "OK",
};

export enum addressSelectors {
    ROOT = "#address-chooser",
    ERROR_MSG = ".address-chooser__error_msg",
    INPUT_FIELD = "#address-value",
    INPUT_FORM = ".address-chooser__form",
    SUGGEST_VALUE = ".suggest-value",
    SUGGEST = ".suggest",
    SUGGESTS = ".suggest-container",
    SUBMIT_BUTTON = ".address-chooser__control",
}
