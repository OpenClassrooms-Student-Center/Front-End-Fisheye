//Get the "id" parameter in URL
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get('id')

async function getPhotographers() {
    return fetch("../data/photographers.json")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (data) {
            return data;
        })
        .catch(function (err) {
            alert("Erreur : " + err);
        });
}

async function displayData(medias, photographer) {
    const photographHeader = document.querySelector(".photograph-header");
    const mediasSection = document.querySelector("#medias_section");
    
    //Create section for each media in DOM
    medias.forEach((media) => {
        const photographerMedia = mediaFactory(media, photographer);
        const mediaCardDOM = photographerMedia.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    });

    //Create the header of photographer's informations
    const photographerInfo = photographerFactory(photographer);
    const {img, divPhotographerInfos} = photographerInfo.getPhotographerInfos();
    //Add picture profile
    photographHeader.appendChild(img);
    //Add photographer's informations before contact btn for flexbox
    photographHeader.insertBefore(divPhotographerInfos, photographHeader.firstChild);
};

async function init() {
    //Get data for photographers and media
    const { photographers, media } = await getPhotographers();
    
    //Get properties of photographer's page
    const currentPhotographer = photographers.find(id => id.id == photographerId)

    //Get medias of the current photographer
    const mediasOfPhotographer = media.filter(media => media.photographerId == photographerId)
    
    displayData(mediasOfPhotographer, currentPhotographer);
};

init();
