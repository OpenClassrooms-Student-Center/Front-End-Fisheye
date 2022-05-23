/* IMPORTS */
import { LayoutsFactory } from "../factories/layoutsFactory.js";
import { ComponentsFactory } from "../factories/componentsFactory.js";
// END IMPORTS

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
    const avatar = componentsFactory.getAvatarDOM("../../assets/photographers/MarcelNikolic.jpg", "Marcel Nikolic", false);
    cardComponentsContainer.appendChild(avatar);

    /* Create the user name component and add it to its container */
    const userName = componentsFactory.getUserNameDOM("Marcel Nikolic", false);
    cardComponentsContainer.appendChild(userName);

    /* Create the user location component and add it to its container */
    const userLocation = componentsFactory.getUserLocationDOM("Berlin, Germany", false);
    cardComponentsContainer.appendChild(userLocation);

    /* Create the user tagline component and add it to its container */
    const userTagline = componentsFactory.getUserTaglineDOM("Toujours à la recherche de LA photo", false);
    cardComponentsContainer.appendChild(userTagline);

    /* Get the cards container */
    const cardsContainer = document.querySelector(".components-container__cards");

    /* Add the card components container to the cards container */
    cardsContainer.appendChild(cardComponentsContainer);

    /* Create the media component and add it to its container */
    const media = componentsFactory.getMediaDOM("../../assets/images/Marcel/Architecture_Corner_Room.jpg", "Corner Building and Blue Sky", 12, true);
    cardsContainer.appendChild(media);

    /* Create the user card component and add it to its container */
    const userCard = componentsFactory.getUserCardDOM(
        "../../assets/photographers/MarcelNikolic.jpg",
        "Marcel Nikolic",
        "Berlin, Germany",
        "Toujours à la recherche de LA photo",
        300
    );
    cardsContainer.appendChild(userCard);

    /* Create the photographer header component and add it to its container */
    const photographerHeader = componentsFactory.getPhotographerHeaderDOM(
        "../../assets/photographers/MarcelNikolic.jpg",
        "Marcel Nikolic",
        "Berlin, Germany",
        "Toujours à la recherche de LA photo",
        "Contactez-moi"
    );

    componentsContainer.appendChild(photographerHeader);
}

// Init function
// Display all the components
function init() {
    displayComponents();
}

// First function call when the page is loaded
init();
