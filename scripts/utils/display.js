/**
 * Takes care of the different displays.
 */

import { photographerFactory } from "../factories/photographer.js";
import { photoCardFactory } from "../factories/media.js"


var nblikes = 0;

/**
 * Displays photographer data.
 * @param {*} photographe 
 */
async function displayDataPhotographer(photographe) {
    const photographersSection = document.querySelector(".section-info");
    const photographerModel = photographerFactory(photographe);
    const userCardDOM = photographerModel.infoUserDom();
    photographersSection.appendChild(userCardDOM);
}

/**
 * Displays all photos of a photographer.
 * @param {*} data 
 */
async function displayImage(data){
    const photographersSection = document.querySelector(".section-gallery");
    photographersSection.innerHTML=""; //On vide le contenu
    data[1].forEach((photo) => {
        const photographerModel = photoCardFactory(photo, data[0]);
        const userCardDOM = photographerModel.getPhotoDOM();
        photographersSection.appendChild(userCardDOM);
    });
} 

/**
 * Displays the price of a photographer.
 * @param {*} price 
 */
async function displayPrice(price){
    const priceP = document.querySelector(".section-stat-prix");
    priceP.textContent = price + "€ / jour";
}

/**
 * Displays the contact's name in the form
 * @param {*} name 
 */
async function displayContactName(name){
    const n = document.querySelector(".contact_modal_titre");
    n.textContent ="Contactez-moi " + name;
}

/**
 * Form returns the link.
 */
async function urlForm(){
    const url = window.location.href;
    const form = document.querySelector("#reserve");
    form.setAttribute("action", url);
}

export {displayDataPhotographer,
    displayImage,
    displayPrice,
    displayContactName,
    urlForm,
    nblikes
};