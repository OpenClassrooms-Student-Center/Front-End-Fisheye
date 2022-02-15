import { textfieldFactory } from "../factories/textfieldFactory.js";

function displayComponents() {
    const textfieldContainer = document.querySelector(".form-group-container");
    const textfield = textfieldFactory("Prénom", false);

    textfieldContainer.appendChild(textfield);
}

function init() {
    displayComponents();
}

init();
