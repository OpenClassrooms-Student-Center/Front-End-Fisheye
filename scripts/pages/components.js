import { textfieldFactory } from "../factories/textfieldFactory.js";
import { likeBtnFactory } from "../factories/likeBtnFactory.js";
import { sortBtnFactory } from "../factories/sortBtnFactory.js";

function displayComponents() {
    const textfieldContainer = document.querySelector(".form-group-container");
    const textfield = textfieldFactory("Prénom", false);

    textfieldContainer.appendChild(textfield);

    const buttonsContainer = document.querySelector(".buttons-container");
    const likeBtn = likeBtnFactory(12, true);
    const sortBtn = sortBtnFactory();

    buttonsContainer.appendChild(likeBtn);
    buttonsContainer.appendChild(sortBtn);
}

function init() {
    displayComponents();
}

init();
