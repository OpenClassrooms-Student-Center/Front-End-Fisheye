/* Import factories */
import { LayoutsFactory } from "../factories/layoutsFactory.js";
import { ComponentsFactory } from "../factories/componentsFactory.js";
import { btnFactory } from "../factories/btnFactory.js";
import { logoFactory } from "../factories/logoFactory.js";
import { avatarFactory } from "../factories/avatarFactory.js";
import { userNameFactory } from "../factories/userNameFactory.js";
import { userLocationFactory } from "../factories/userLocationFactory.js";
import { userTaglineFactory } from "../factories/userTaglineFactory.js";

function displayComponents() {
    /* Facotries initialisation */
    const layoutsFactory = new LayoutsFactory();
    const componentsFactory = new ComponentsFactory();

    /* Create the components layout and add it to the body */
    const componentsContainer = layoutsFactory.getComponentsContainerDOM();
    document.querySelector("body").prepend(componentsContainer);

    /* Get the textfield container */
    const textfieldContainer = document.querySelector(".components-container__textfield");

    /* Create the textfield component and add it to its container */
    const textfield = componentsFactory.getTextfieldDOM("Prénom", false);
    textfieldContainer.appendChild(textfield);

    /* Get the buttons container */
    const buttonsContainer = document.querySelector(".components-container__buttons");

    /* Create the like button component and add it to its container */
    const likeBtn = componentsFactory.getLikeBtnDOM(12, true);
    buttonsContainer.appendChild(likeBtn);

    /* Create the sort button component and add it to its container */
    const sortBtn = componentsFactory.getSortBtnDOM();
    buttonsContainer.appendChild(sortBtn);

    /* Create the main button component and add it to its container */
    const mainBtn = componentsFactory.getMainBtnDOM("Contactez-moi");
    buttonsContainer.appendChild(mainBtn);

    const logoContainer = document.querySelector(".components-container__logo");
    const logo = logoFactory();

    logoContainer.appendChild(logo);

    const cardsContainer = document.querySelector(".components-container__cards");
    const cardComponentsContainer = document.querySelector(".card-components");

    const avatar = avatarFactory("../../assets/photographers/MarcelNikolic.jpg", "Marcel Nikolic");
    const userName = userNameFactory("Marcel Nikolic");
    const userLocation = userLocationFactory("Berlin, Germany");
    const userTagline = userTaglineFactory("Toujours à la recherche de LA photo");

    cardComponentsContainer.appendChild(avatar);
    cardComponentsContainer.appendChild(userName);
    cardComponentsContainer.appendChild(userLocation);
    cardComponentsContainer.appendChild(userTagline);

    cardsContainer.appendChild(cardComponentsContainer);
}

function init() {
    displayComponents();
}

init();
