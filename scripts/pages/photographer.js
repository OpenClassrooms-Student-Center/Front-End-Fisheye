async function getOnePhotographer() {
    // Penser à remplacer par les données récupérées dans le json
    const datas = fetch('./data/photographers.json')
    .then(function(res) {
        if (res.ok) {
            return res.json(); 
        }
    })
    .catch(err => {
        console.log('Error' + err); 
    }); 
    // et bien retourner le tableau photographers seulement une fois
    return datas;
}


async function displayMainUser(photographers){
    const headerPhotographer = document.querySelector(".photographer_header"); 
    const photographerSinglePage= photographerFactory(photographers);
    const userHeaderDOM = photographerSinglePage.getUserIdDOM();  
    headerPhotographer.appendChild(userHeaderDOM); 
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
    const { photographers } = await getOnePhotographer();
    //const { media } = await getOnePhotographer();
    //displayMainUser(photographers); 
    displayMainUser(photographers);
};

init();