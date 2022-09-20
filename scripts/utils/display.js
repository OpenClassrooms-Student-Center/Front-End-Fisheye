import { photographerFactory } from "../factories/photographer.js";
import { photoCardFactory } from "../factories/media.js"


var nblikes = 0;

async function displayDataPhotographer(photographe) {
    const photographersSection = document.querySelector(".section-info");
    const photographerModel = photographerFactory(photographe);
    const userCardDOM = photographerModel.infoUserDom();
    photographersSection.appendChild(userCardDOM);
}

async function displayImage(data){
    const photographersSection = document.querySelector(".section-gallery");
    photographersSection.innerHTML=""; //On vide le contenu
    data[1].forEach((photo) => {
        const photographerModel = photoCardFactory(photo, data[0]);
        const userCardDOM = photographerModel.getPhotoDOM();
        photographersSection.appendChild(userCardDOM);
    });
} 

async function displayPrice(price){
    const priceP = document.querySelector(".section-stat-prix");
    priceP.textContent = price + "€ / jour";
}

async function displayContactName(name){
    const n = document.querySelector(".contact_modal_titre");
    n.textContent ="Contactez-moi " + name;
}

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