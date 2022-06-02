//Get the "id" parameter in URL
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get('id')
console.log(photographerId);

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

async function displayData(medias) {
    const mediasSection = document.querySelector("#medias_section");

    medias.forEach((media) => {
        const photographerMedias = mediaFactory(media);
        // console.log(photographerModel);
        const mediaCardDOM = photographerMedias.getMediaCardDOM();
        // console.warn(userCardDOM);
        mediasSection.appendChild(mediaCardDOM);
    });
};

async function init() {
    // Get photographers data and media data
    const { photographers, media } = await getPhotographers();

    // console.log(photographers);
    // console.log(media);
    
    const currentPhotographer = photographers.find(id => id.id == photographerId)
    console.log(currentPhotographer);

    const mediasOfPhotographer = media.filter(media => media.photographerId == photographerId)
    console.warn(mediasOfPhotographer);
    // displayData(responsePhotographers);
};

init();
