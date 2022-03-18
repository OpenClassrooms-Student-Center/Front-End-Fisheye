export class LayoutsFactory {
    constructor() {}

    /* Return the components layout */
    getComponentsContainerDOM = () => {
        const componentsContainer = document.createElement("div");
        componentsContainer.classList.add("components-container");

        const textfield = document.createElement("div");
        textfield.classList.add("components-container__textfield");
        const buttons = document.createElement("div");
        buttons.classList.add("components-container__buttons");
        const logo = document.createElement("div");
        logo.classList.add("components-container__logo");
        const cards = document.createElement("div");
        cards.classList.add("components-container__cards");

        const cardComponents = document.createElement("div");
        cardComponents.classList.add("card-components");

        cards.appendChild(cardComponents);

        componentsContainer.appendChild(textfield);
        componentsContainer.appendChild(buttons);
        componentsContainer.appendChild(logo);
        componentsContainer.appendChild(cards);

        return componentsContainer;
    };

    /* Return the index header layout */
    getIndexHeaderDOM = (logo) => {
        const header = document.createElement("header");
        header.classList.add("header");

        logo.classList.add("header__logo");

        const title = document.createElement("h1");
        title.classList.add("header__title");
        title.textContent = "Nos photographes";

        header.appendChild(logo);
        header.appendChild(title);

        return header;
    };

    /* Return the index main layout */
    getIndexMainDOM = (photographers, componentsFactory) => {
        const main = document.createElement("main");
        main.classList.add("photographers-section");

        photographers.forEach((photographer) => {
            const userCard = componentsFactory.getUserCardDOM(photographer);
            main.appendChild(userCard);
        });

        return main;
    };

    /* Return the photographer header layout */
    getPhotographerHeaderDOM = (logo) => {
        const header = document.createElement("header");
        header.classList.add("header");

        logo.classList.add("header__logo");

        header.appendChild(logo);

        return header;
    };

    /* Return the photographer main layout */
    getPhotographerMainDOM = (photographer, componentsFactory) => {
        const main = document.createElement("main");
        main.classList.add("photographer-section");

        const banner = componentsFactory.getPhotographerHeaderDOM(photographer, "Contactez-moi");

        const mediasSection = document.createElement("section");
        mediasSection.classList.add("medias-section");

        const sortMedias = document.createElement("div");
        sortMedias.classList.add("medias-section__sort");

        const sortBtn = componentsFactory.getSortBtnDOM();

        sortMedias.appendChild(sortBtn);

        const medias = document.createElement("div");
        medias.classList.add("medias-section__medias");

        mediasSection.appendChild(sortMedias);
        mediasSection.appendChild(medias);

        main.appendChild(banner);
        main.appendChild(mediasSection);

        return main;
    };
}
