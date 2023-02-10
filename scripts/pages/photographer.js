//Mettre le code JavaScript lié à la page photographer.html

const photographerId = window.location.search.split("?id=").join("");
console.log(photographerId);

/* Medias and photographer Handling */

let aboutPhotographer = [];
let mediasAboutPhotographer = [];

let OurPhotographer = [];

async function fetchMedias() {
    // We fetch our json file with a GET method
     await fetch(`../data/photographers.json`, {
     method: 'GET'
    })
    .then(response => {
     return response.json();
   }).then(aboutPhotographer => {
     // We retrieve our datas and insert them into our array infosPhotographers
    for(i= 0; i < aboutPhotographer.media.length; i++){
        if(aboutPhotographer.media[i].photographerId == photographerId){
            mediasAboutPhotographer.push(aboutPhotographer.media[i])  }   
        else{
            console.log("rentre pas")
        }
    } 
    for(i= 0; i < aboutPhotographer.photographers.length; i++){
        console.log("rentre for")
    if(aboutPhotographer.photographers[i].id == photographerId){
        console.log("rentre if")
        OurPhotographer.push(aboutPhotographer.photographers[i])
        console.log(OurPhotographer)
}else{
    console.log("rentre pas if")
}
        
    }       
   }).catch(err => {
     console.log("error")
   });
     
     // We return our array 
     return ({
         aboutPhotographers: mediasAboutPhotographer, OurPhotographer})
 }
 async function displayData(mediasAboutPhotographer) {
    const mediasSection = document.querySelector(".medias_section");

    mediasAboutPhotographer.forEach((mediasAboutPhotographer) => {
        const photographerModel = mediaFactory(mediasAboutPhotographer);
        const userCardDOM = photographerModel.getMediaCardDOM();
        mediasSection.appendChild(userCardDOM);
    });
};
async function displayDataPhotographer(OurPhotographer) {
    const photographerSection = document.querySelector(".photograph-header");

    OurPhotographer.forEach((OurPhotographer) => {
        const photographerModel = photographerFactory(OurPhotographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographerSection.appendChild(userCardDOM);
    });
};
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await fetchMedias();
    displayData(mediasAboutPhotographer);
    displayDataPhotographer(OurPhotographer);
    console.log(mediasAboutPhotographer)
    console.log(OurPhotographer)
};

init();
/* -------------------------------------------------------------------- */
