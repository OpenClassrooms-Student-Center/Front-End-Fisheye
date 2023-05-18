const qStr = window.location.search;
const urlParams = new URLSearchParams(qStr);
const id = urlParams.get('id');

async function getPhotographDetails() {
    const response = await fetch('data/photographers.json');
    const photographersData = await response.json();
    const photographDetails = photographersData.photographers.find(item => item.id === parseInt(id))
    return photographDetails;
}

async function getMediaDetails() {
    const response = await fetch('data/photographers.json');
    const mediaData = await response.json();
    const mediaDetails = [];
    
    mediaData.media.forEach(item => {
        if (item.photographerId === parseInt(id)) {
            mediaDetails.push(item);
        }
    });
    
    return mediaDetails;
}

async function displayPhotographDetails() {
    const photograph = await getPhotographDetails();
    const photographHeader = document.querySelector(".photograph-header");
    
    const photographModel = photographHeaderFactory(photograph);
    const userHeaderDOM = photographModel.getUserHeaderDOM();
    
    photographHeader.appendChild(userHeaderDOM);
};

async function displayPhotographMedias() {
    const mediaData = await getMediaDetails();
    const mediasContainer = document.querySelector('.medias-container');

    const mediaFactory = createMediaFactory(mediaData);
    const mediaDOM = Array.from(mediaFactory.getMediaDOM());

    mediaDOM.forEach((mediaElement) => {
        mediasContainer.appendChild(mediaElement);
    });
}

async function init() {
    const { photograph } = await getPhotographDetails();
    const { media } = await getMediaDetails();
    displayPhotographDetails(photograph);
    displayPhotographMedias(media);
};

init();