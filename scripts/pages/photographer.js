/*
Code JavaScript lié à la page photographer.html
*/

/**
 * Get id in URL
 * @returns id
 */
function getId(){
    let paramsUrl = new URLSearchParams(window.location.search);
    let id = paramsUrl.get('id');
    return id;
}

/**
 * Get a photographer if he has the same id.
 * @param {*} id 
 * @returns a photographer
 */
async function getData(id) {
    //Va chercher les données
    let response = fetch("../../data/photographers.json")
    let data = await (await response).json()
    let dataReturn = [];
    //Pour les infos sur le photographe
    let photographers = data.photographers;
    let photographe;
    photographers.forEach(function(p){
        if(p.id == id){
            photographe = p;
        }
    });
    dataReturn.push(photographe);
    //Va chercher le tableau de photo
    let allPhotos = data.media;
    let photos= [];
    allPhotos.forEach(function(photo){
        if(photo.photographerId == id){
            photos.push(photo);
        }
    });
    dataReturn.push(photos);

    return dataReturn;
}


async function displayDataPhotographer(photographe) {
    const photographersSection = document.querySelector(".section-info");
    const photographerModel = photographerFactory(photographe);
    const userCardDOM = photographerModel.infoUserDom();
    photographersSection.appendChild(userCardDOM);
}

async function displayImage(data){
    const photographersSection = document.querySelector(".section-gallery");
    console.log(data);
    data[1].forEach((photo) => {
        const photographerModel = photoCardFactory(photo, data[0]);
        const userCardDOM = photographerModel.getPhotoDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

function sumLike(photos){
    let sumlike = 0;
    photos.forEach(function(photo){
        sumlike += photo.likes; 
    });
    return sumlike;
}

async function displayLikes(nblikes){
    let p = document.querySelector(".section-stat-like-nombre");
    p.textContent = nblikes;
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

async function init() {
    let data = await getData(getId());
    displayDataPhotographer(data[0]);
    displayImage(data);
    displayLikes(sumLike(data[1]));
    displayPrice(data[0].price);
    displayContactName(data[0].name);
    urlForm();
}



init();