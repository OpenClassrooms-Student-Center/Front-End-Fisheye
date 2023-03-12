async function getMedias() {
    // get datas with fetch
    const media = await fetch('../data/photographers.json')
        // promise => response
        .then((data) => data.json())
    // return promise
    return media
}

async function displayData(medias) {
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerBody = document.querySelector('.photograph-body');
};

// get the id of photographers from URL
function getPhotographerId() {
    const parameters = new URLSearchParams(window.location.search);
    const idString = parameters.get('id');
    return parseInt(idString);
}

async function init() {
    // Récupère les datas de l'array media
    const { media } = await getMedias();
    displayData(media);
};

init();

