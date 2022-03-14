import { LayoutsFactory } from "../factories/layoutsFactory.js";
import { ComponentsFactory } from "../factories/ComponentsFactory.js";

async function getPhotographers() {
    const res = await (await fetch("../../data/photographers.json")).json();

    const photographers = res.photographers;

    photographers.forEach((photographer) => {
        photographer.medias = res.media.filter((media) => media.photographerId === photographer.id);
    });

    return photographers;
}

async function displayData(photographers) {
    const layoutsFactory = new LayoutsFactory();
    const componentsFactory = new ComponentsFactory();

    const header = layoutsFactory.getIndexHeaderDOM(componentsFactory.getLogoDOM());
    const main = layoutsFactory.getIndexMainDOM(photographers, componentsFactory);

    document.querySelector("body").prepend(main);
    document.querySelector("body").prepend(header);
}

async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
