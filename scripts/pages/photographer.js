let photographerName = "";
let photosFromJSON = "";
/**
 * Récupération de l'id du photographe depuis l'url
 */
function getPhotographerId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    return id;
}

/**
 * Récupération des données du photographe depuis le fichier JSON
 */
async function getPhotographerInfos(idPhotographer) {
    const photographers = await getJSON();

    const dataPhotographer = photographers.photographers.filter(photographers => photographers.id == idPhotographer);

    photographerName = dataPhotographer[0].name;

    return dataPhotographer[0];
}

/** 
 * Affichage des données du photographe
*/
async function displayInfos(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerDataDOM();
    photographerHeader.appendChild(userCardDOM);

    // dans la modale
    const photographerNameElt = document.getElementById("photographer-name");
    photographerNameElt.textContent = photographer.name;
};

/**
 * Récupération des photos du photographe depuis le fichier JSON
 */
async function getPhotographerPhotos(id) {
    if (photosFromJSON == "") {
        const photographers = await getJSON();
        photosFromJSON = photographers;
        return photographers.media.filter(media => media.photographerId == id);
    } else {
        return photosFromJSON.media.filter(media => media.photographerId == id);
    }
}

/** 
 * Affichage des photos du photographe
*/
function displayPhotos(photos) {
    const listPhotos = document.querySelector(".photos-list");
    listPhotos.innerHTML = '';

    let cptr = 0;
    photos.forEach((photo) => {
        const photosModel = mediaFactory(photo, photographerName, cptr);
        const photosDOM = photosModel.getPhotosDOM();
        listPhotos.appendChild(photosDOM);
        cptr++;
    });
};

/** 
 * Affichage des prix du photographe
*/
function displayPrice(price) {
    const priceHtml = document.getElementById("price");
    priceHtml.textContent = price + "€ / jour";
};



/**
 * recupère les données du fichier JSON
 */
async function getJSON() {
    const reponse = await fetch("data/photographers.json");
    const photographers = await reponse.json();
    return photographers;
}

/**
 * Récupère les données du photographe
 */
async function init() {

    const id = getPhotographerId();

    const data = await getPhotographerInfos(id);
    displayInfos(data);

    const photos = await getPhotographerPhotos(id);
    displayPhotos(photos);

};

init();



