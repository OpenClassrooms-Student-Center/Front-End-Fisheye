// Layouts factory class
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
        const photographerName = photographer.name;

        const main = document.createElement("main");
        main.classList.add("photographer-section");

        const banner = componentsFactory.getPhotographerHeaderDOM(photographer, "Contactez-moi");

        const contactBtn = banner.querySelector("#contact-btn");

        contactBtn.addEventListener("click", () => {
            const contactForm = componentsFactory.getContactFromDOM({ photographerName });
            document.body.appendChild(contactForm);

            contactForm.setAttribute("aria-hidden", "false");
            contactForm.setAttribute("open", "true");
            document.body.classList.add("body-modal");
            document.body.setAttribute("aria-hidden", "true");
            document.getElementById("close-contact-form").focus();

            contactForm.querySelector(".contact-form").addEventListener("submit", (e) => {
                e.preventDefault();
                document.body.removeChild(contactForm);
                document.body.setAttribute("aria-hidden", "false");
                contactForm.setAttribute("aria-hidden", "true");
                document.body.classList.remove("body-modal");
                contactBtn.focus();
            });

            const closeContactForm = contactForm.querySelector("#close-contact-form");
            closeContactForm.addEventListener("click", () => {
                document.body.removeChild(contactForm);
                document.body.setAttribute("aria-hidden", "false");
                contactForm.setAttribute("aria-hidden", "true");
                document.body.classList.remove("body-modal");
                contactBtn.focus();
            });

            document.addEventListener("keydown", (e) => {
                const key = e.key;

                if (key === "Esc" || key === "Escape") {
                    document.body.removeChild(contactForm);
                    document.body.setAttribute("aria-hidden", "false");
                    contactForm.setAttribute("aria-hidden", "true");
                    document.body.classList.remove("body-modal");
                    contactBtn.focus();
                }
            });
        });

        const mediasSection = document.createElement("section");
        mediasSection.classList.add("medias-section");

        const sortMedias = document.createElement("div");
        sortMedias.classList.add("medias-section__sort");

        const sortBtn = componentsFactory.getSortBtnDOM(photographer.id);

        sortMedias.appendChild(sortBtn);

        const medias = document.createElement("div");
        medias.classList.add("medias-section__medias");

        if (window.location.search.includes("sort=")) {
            const sortBy = window.location.search.split("&")[1].split("=")[1];

            switch (sortBy) {
                case "Popularit%C3%A9":
                    photographer.medias.sort((a, b) => b.likes - a.likes);
                    break;
                case "Date":
                    photographer.medias.sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);

                        return dateB - dateA;
                    });
                    break;
                case "Titre":
                    photographer.medias.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                default:
                    break;
            }
        }

        photographer.medias.forEach((media, index) => {
            const mediaDOM = media.hasOwnProperty("image")
                ? componentsFactory.getImageDOM(media, photographerName, false)
                : componentsFactory.getVideoDOM(media, photographerName, false);

            const mediaButton = mediaDOM.querySelector("button");

            mediaButton.addEventListener("click", () => {
                const lightbox = componentsFactory.getLightboxDOM({ medias: photographer.medias, index, photographerName });
                document.body.appendChild(lightbox);

                lightbox.setAttribute("aria-hidden", "false");
                lightbox.setAttribute("open", "true");
                document.body.classList.add("body-modal");
                document.body.setAttribute("aria-hidden", "true");
                document.getElementById("close-lightbox").focus();

                const closeLightBoxBtn = document.getElementById("close-lightbox");

                closeLightBoxBtn.addEventListener("click", () => {
                    document.body.removeChild(lightbox);
                    document.body.setAttribute("aria-hidden", "false");
                    lightbox.setAttribute("aria-hidden", "true");
                    document.body.classList.remove("body-modal");
                    mediaButton.focus();
                });

                document.addEventListener("keydown", (e) => {
                    const key = e.key;

                    if (key === "Esc" || key === "Escape") {
                        document.body.removeChild(lightbox);
                        document.body.setAttribute("aria-hidden", "false");
                        lightbox.setAttribute("aria-hidden", "true");
                        document.body.classList.remove("body-modal");
                        mediaButton.focus();
                    }
                });
            });

            medias.appendChild(mediaDOM);
        });

        mediasSection.appendChild(sortMedias);
        mediasSection.appendChild(medias);

        const likes = componentsFactory.getPhotographerLikesDOM(photographer);

        main.appendChild(banner);
        main.appendChild(mediasSection);
        main.appendChild(likes);

        return main;
    };
}
