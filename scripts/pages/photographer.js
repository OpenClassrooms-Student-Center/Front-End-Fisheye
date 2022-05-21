async function getOnePhotographer() {
    // Penser à remplacer par les données récupérées dans le json
    const media = fetch('./data/photographers.json')
    .then(response => response.json())
    .catch(err => {
    console.log('Error' + err); 
    });
    return media ;  
}


/*async function displayMainUser(media){
    const headerPhotographer = document.querySelector(".photographer_header"); 
        const photographerModel = photographerFactory(media);
        const userCardDOM = photographerModel.getUserIdDOM();
        headerPhotographer.appendChild(userCardDOM);
}
async function displayMedia(media) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((media) => {
        const photographerModel = photographerFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });
};*/

async function init() {
    // Récupère les datas des photographes
    const { media } = await getOnePhotographer();
    //const { media } = await getOnePhotographer();
    //displayMainUser(photographers); 
    //displayMainUser(media);
}

init()