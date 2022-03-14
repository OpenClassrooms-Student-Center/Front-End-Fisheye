import { LayoutsFactory } from "../factories/LayoutsFactory.js";
import { ComponentsFactory } from "../factories/ComponentsFactory.js";

async function getPhtotgrapher(photographerId) {
    const res = await (await fetch("../../data/photographers.json")).json();

    const photographers = res.photographers;

    photographers.forEach((photographer) => {
        photographer.medias = res.media.filter((media) => media.photographerId === photographer.id);
    });

    const photographer = photographers.filter((user) => user.id == photographerId)[0];

    return photographer;
}

function displayData(data) {
    const layoutsFactory = new LayoutsFactory();
    const componentsFactory = new ComponentsFactory();

    const header = layoutsFactory.getPhotographerHeaderDOM(componentsFactory.getLogoDOM());
    const main = layoutsFactory.getPhotographerMainDOM(data, componentsFactory);

    document.querySelector("body").prepend(main);
    document.querySelector("body").prepend(header);
}

async function init() {
    const photographer = await getPhtotgrapher(window.location.search.split("=")[1]);
    displayData(photographer);
}

init();
