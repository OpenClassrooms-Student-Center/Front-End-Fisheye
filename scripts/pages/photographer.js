let media = []; 

const getMedia = async () => {
    // Penser à remplacer par les données récupérées dans le json
    await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((dataPhotographers) => { 
        media = dataPhotographers.media; 
        return media; 
    })
    .catch((err )=> {
    console.log(err); 
    }); 
}


async function displayMainUser(media){
    const headerPhotographer = document.querySelectorAll(".photographer_header"); 
    media.forEach((media) => { 
        const photographerModel = singlePageFactory(media);
        const userCardDOM = photographerModel.getMedia();
        headerPhotographer.innerHTML = userCardDOM;
    });
}
/*async function displayMedia(media) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((media) => {
        const photographerModel = photographerFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });
};*/

async function init() {
    // Récupère les datas des photographes
    await getMedia(media);
    displayMainUser(media); 
}

init()