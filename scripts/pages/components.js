import { textfieldFactory } from "../factories/textfieldFactory.js";

async function displayComponents() {
    const body = document.querySelector(".form-group-container");
    const textfield = textfieldFactory("Prénom", false);

    body.appendChild(textfield);
}

async function init() {
    await displayComponents();
}

init();
