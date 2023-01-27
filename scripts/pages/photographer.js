async function displayPhotographerInformation(photographer) {

    const photographerModel = photographerFactory(photographer);

    const { photographerPresentationElement, photographerPictureElement } = photographerModel.getUserCardDOM(true)

    const photographerHeader = document.querySelector('.photograph-header')

    const contactButton = document.querySelector('.contact_button')

    photographerHeader.append(photographerPresentationElement, contactButton, photographerPictureElement)

}


function displayMedia(photographerName, media) {

    const mediaModel = MediaFactory(photographerName, media)
    
    const mediaElement = mediaModel.getUserMediaDOM(media)

    const galleryElement = document.querySelector('.gallery')

    galleryElement.appendChild(mediaElement)
}

async function init() {
    // Récupère les datas des photographes
    const { photographer, photographerMedias } = await getPhotographerData();
    displayPhotographerInformation(photographer);

    photographerMedias.forEach(media => {
        displayMedia(photographer.name, media)
    })
};

init();
