export class ComponentsFactory {
    constructor() {}

    getTextfieldDOM = (textfieldName, isTextArea) => {
        const textfield = document.createElement("fieldset");
        textfield.classList.add("form-group");

        const label = document.createElement("label");
        label.classList.add("form-group__label");
        label.setAttribute("for", textfieldName);
        label.textContent = textfieldName;

        let input;

        if (isTextArea) {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.setAttribute("type", "text");
        }

        input.classList.add("form-group__textfield");
        input.id = textfieldName;
        input.setAttribute("name", textfieldName);
        input.setAttribute("placeholder", textfieldName);

        textfield.appendChild(label);
        textfield.appendChild(input);

        return textfield;
    };
}
