import { textfieldFactory } from "../factories/textfieldFactory.js";
import { likeBtnFactory } from "../factories/likeBtnFactory.js";
import { sortBtnFactory } from "../factories/sortBtnFactory.js";
import { btnFactory } from "../factories/btnFactory.js";
import { logoFactory } from "../factories/logoFactory.js";
import { avatarFactory } from "../factories/avatarFactory.js";
import { userNameFactory } from "../factories/userNameFactory.js";

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
        "width: 33%; display: flex; flex-direction: column; gap: 0.5rem;";

    const avatar = avatarFactory(
        "../../assets/photographers/MarcelNikolic.jpg",
        "Marcel Nikolic"
    );
    const userName = userNameFactory("Marcel Nikolic");

    cardComponentsContainer.appendChild(avatar);
    cardComponentsContainer.appendChild(userName);

    cardsContainer.appendChild(cardComponentsContainer);
}

function init() {
    displayComponents();
}

init();
