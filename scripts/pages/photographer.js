//Mettre le code JavaScript lié à la page photographer.html

//let photographerId = new URL(document.location).searchParams.get('id');

async function getPhotographerById(id) {
        const response = await fetch('../../data/photographers.json');
        const photographersData = await response.json();

        const photographers = photographersData.photographers;
        const photographermedia = photographersData.media;
        const photographer = photographers.find((photographer) => photographer.id === id);
        let media = photographermedia.filter((item) => item.photographerId === id);
        console.log(media);
        return { photographer, media};
    } 

async function displayPhotographer(photographer) {
    const headerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    headerSection.appendChild(userCardDOM);
}

async function displayMedia(media) {
    const mediaSection = document.querySelector(".photographer_media");
    media.forEach((media) =>{
        const mediaModel = phototographerMedia(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
  

}

async function display(photographer, media) {
    displayPhotographer(photographer)
    displayMedia(media)
}

async function init() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");

    const { photographer, media } = await getPhotographerById(parseInt(id));
        display(photographer, media)
}

init();

