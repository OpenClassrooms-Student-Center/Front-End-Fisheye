import { textfieldFactory } from "../factories/textfieldFactory.js";
import { likeBtnFactory } from "../factories/likeBtnFactory.js";
import { sortBtnFactory } from "../factories/sortBtnFactory.js";
import { btnFactory } from "../factories/btnFactory.js";
import { logoFactory } from "../factories/logoFactory.js";
import { avatarFactory } from "../factories/avatarFactory.js";

function displayComponents() {
    const textfieldContainer = document.querySelector(".form-group-container");
    const textfield = textfieldFactory("Prénom", false);

    textfieldContainer.appendChild(textfield);

    const buttonsContainer = document.querySelector(".buttons-container");
    const likeBtn = likeBtnFactory(12, true);
    const sortBtn = sortBtnFactory();
    const btn = btnFactory("Contactez-moi");

    buttonsContainer.appendChild(likeBtn);
    buttonsContainer.appendChild(sortBtn);
    buttonsContainer.appendChild(btn);

    const logoContainer = document.querySelector(".logo-container");
    const logo = logoFactory();

    logoContainer.appendChild(logo);

    const cardsContainer = document.querySelector(".cards-container");
    const cardComponentsContainer = document.createElement("div");
    cardComponentsContainer.style =
        "width: 33%; display: flex; flex-direction: column;";

    const avatar = avatarFactory(
        "../../assets/photographers/MarcelNikolic.jpg",
        "Marcel Nikolic"
    );

    cardComponentsContainer.appendChild(avatar);

    cardsContainer.appendChild(cardComponentsContainer);
}

function init() {
    displayComponents();
}

init();
