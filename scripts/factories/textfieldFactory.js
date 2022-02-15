export function textfieldFactory(fieldName, isTextArea) {
    const textfield = document.createElement("fieldset");
    textfield.classList.add("form-group");

    const label = document.createElement("label");
    label.classList.add("form-group__label");
    label.setAttribute("for", fieldName);
    label.textContent = fieldName;

    let input;

    if (isTextArea) {
        input = document.createElement("textarea");
    } else {
        input = document.createElement("input");
        input.setAttribute("type", "text");
    }

    input.classList.add("form-group__textfield");
    input.id = fieldName;
    input.setAttribute("name", fieldName);
    input.setAttribute("placeholder", fieldName);

    textfield.appendChild(label);
    textfield.appendChild(input);

    return textfield;
}
