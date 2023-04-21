import { PhotographersModel } from "./models/photographersModel.js";

async function init() {
    let photographersModel = new PhotographersModel('data/photographers.json');

    const photographers = await photographersModel.getPhotographers();
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};
    
init();
    