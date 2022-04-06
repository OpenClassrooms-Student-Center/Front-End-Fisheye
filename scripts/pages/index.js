import { LayoutsFactory } from "../factories/layoutsFactory.js";
import { ComponentsFactory } from "../factories/ComponentsFactory.js";

async function getPhotographers() {
    let photographers;

    /* 
        If the local storage as a entry with key "photographers", get its value 
        Else, get datas from the json file and store it in the local storage
    */
    if (localStorage.getItem("photographers")) {
        photographers = JSON.parse(localStorage.getItem("photographers"));
    } else {
        const res = await (await fetch("../../data/photographers.json")).json();

        photographers = res.photographers;

        photographers.forEach((photographer) => {
            photographer.medias = res.media.filter((media) => media.photographerId === photographer.id);
            photographer.medias.map((media) => {
                media.isLiked = false;
            });
        });

        localStorage.setItem("photographers", JSON.stringify(photographers));
    }

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
