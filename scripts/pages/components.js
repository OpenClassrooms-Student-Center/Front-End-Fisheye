/* Import factories */
import { LayoutsFactory } from "../factories/layoutsFactory.js";
import { ComponentsFactory } from "../factories/componentsFactory.js";
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

    /* Get the logo container */
    const logoContainer = document.querySelector(".components-container__logo");

    /* Create the logo component and add it to its container */
    const logo = componentsFactory.getLogoDOM();
    logoContainer.appendChild(logo);

    /* Get the card components container */
    const cardComponentsContainer = document.querySelector(".card-components");

    /* Create the avatar component and add it to its container */
    const avatar = componentsFactory.getAvatarDOM("../../assets/photographers/MarcelNikolic.jpg", "Marcel Nikolic");
    cardComponentsContainer.appendChild(avatar);

    /* Create the user name component and add it to its container */
    const userName = componentsFactory.getUserNameDOM("Marcel Nikolic");
    cardComponentsContainer.appendChild(userName);

    const userLocation = userLocationFactory("Berlin, Germany");
    cardComponentsContainer.appendChild(userLocation);

    const userTagline = userTaglineFactory("Toujours à la recherche de LA photo");
    cardComponentsContainer.appendChild(userTagline);

    const cardsContainer = document.querySelector(".components-container__cards");

    cardsContainer.appendChild(cardComponentsContainer);
}

function init() {
    displayComponents();
}

init();
