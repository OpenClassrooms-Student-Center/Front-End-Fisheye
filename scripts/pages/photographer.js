//Mettre le code JavaScript lié à la page photographer.html

const photographerId = window.location.search.split("?id=").join("");
console.log(photographerId);
let aboutPhotographer = [];
let mediasAboutPhotographer = [];

/*
 Fonction asynchrone permettant de fetch un photograhe
 Les données du photographe iront dans la variable (tableau) aboutPhotographer
*/
/*const fetchMedias = async () => {
  await fetch(`../data/photographers.json`)
    .then((res) => res.json())
    .then((promise) => {
        aboutPhotographer = promise;
      console.log(promise);
    });
    return ({
        aboutPhotographer: mediasAboutPhotographer})
}
*/
async function fetchMedias() {
    // We fetch our json file with a GET method
     await fetch(`../data/photographers.json`, {
     method: 'GET'
    })
    .then(response => {
     return response.json();
   }).then(aboutPhotographer => {
    console.log(aboutPhotographer)
     // We retrieve our datas and insert them into our array infosPhotographers
    for(i= 0; i < aboutPhotographer.media.length; i++){
        if(aboutPhotographer.media[i].photographerId == photographerId){
            mediasAboutPhotographer.push(aboutPhotographer.media[i])     
     console.log(mediasAboutPhotographer)
     
        }else{
            console.log("rentre pas")
        }
        
    }       
   }).catch(err => {
     console.log("error")
   });
     
     // We return our array 
     return ({
         aboutPhotographers: mediasAboutPhotographer})
 }
 async function displayData(mediasAboutPhotographer) {
    const mediasSection = document.querySelector(".medias_section");

    mediasAboutPhotographer.forEach((mediasAboutPhotographer) => {
        const photographerModel = mediaFactory(mediasAboutPhotographer);
        const userCardDOM = photographerModel.getMediaCardDOM();
        mediasSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await fetchMedias();
    displayData(mediasAboutPhotographer);
    console.log(mediasAboutPhotographer)
};

init();